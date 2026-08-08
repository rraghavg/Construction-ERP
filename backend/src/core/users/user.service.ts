import bcrypt from 'bcryptjs';
import { UserModel } from './user.model.js';
import { SessionModel } from '../sessions/session.model.js';
import { ApiError } from '../../utils/apiError.js';
import { logAuditEvent } from '../../shared/audit/audit.model.js';

export class UserService {
  static async listUsers(tenantId: string) {
    return UserModel.find({ tenantId }).select('-passwordHash').sort({ createdAt: -1 });
  }

  static async getUserById(tenantId: string, userId: string) {
    const user = await UserModel.findOne({ tenantId, userId }).select('-passwordHash');
    if (!user) {
      throw new ApiError(404, 'USER_NOT_FOUND', 'User not found');
    }
    return user;
  }

  static async createUser(tenantId: string, data: {
    fullName: string;
    email: string;
    password?: string;
    roleKeys?: string[];
    allowedCompanies?: string[];
    allowedProjects?: string[];
  }, actorUserId: string) {
    const { fullName, email, password = 'DefaultPassword@123', roleKeys = [], allowedCompanies = [], allowedProjects = [] } = data;

    const existing = await UserModel.findOne({ tenantId, email: email.toLowerCase() });
    if (existing) {
      throw new ApiError(409, 'USER_EXISTS', 'User email already exists in tenant');
    }

    const userId = `USR-${Date.now()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Rule: Mass assignment of isSuperAdmin or tenantId is prohibited
    const user = await UserModel.create({
      userId,
      tenantId, // Derived strictly from trusted server context
      fullName,
      email: email.toLowerCase(),
      passwordHash,
      roleKeys,
      allowedCompanies,
      allowedProjects,
      isSuperAdmin: false, // Security invariant: Company admin cannot elevate to Super Admin
      status: 'active'
    });

    await logAuditEvent({
      tenantId,
      actorUserId,
      module: 'core.users',
      action: 'USER_CREATED',
      recordType: 'User',
      recordId: user.userId,
      afterState: { fullName, email, roleKeys, allowedProjects },
      status: 'success',
      severity: 'medium'
    });

    const userObj = user.toObject();
    delete (userObj as any).passwordHash;
    return userObj;
  }

  static async updateUser(tenantId: string, userId: string, data: {
    fullName?: string;
    roleKeys?: string[];
    allowedCompanies?: string[];
    allowedProjects?: string[];
  }, actorUserId: string) {
    const user = await UserModel.findOne({ tenantId, userId });
    if (!user) {
      throw new ApiError(404, 'USER_NOT_FOUND', 'User not found');
    }

    const beforeState = { fullName: user.fullName, roleKeys: user.roleKeys, allowedProjects: user.allowedProjects };

    if (data.fullName !== undefined) user.fullName = data.fullName;
    if (data.roleKeys !== undefined) user.roleKeys = data.roleKeys;
    if (data.allowedCompanies !== undefined) user.allowedCompanies = data.allowedCompanies;
    if (data.allowedProjects !== undefined) user.allowedProjects = data.allowedProjects;

    await user.save();

    await logAuditEvent({
      tenantId,
      actorUserId,
      module: 'core.users',
      action: 'USER_UPDATED',
      recordType: 'User',
      recordId: user.userId,
      beforeState,
      afterState: { fullName: user.fullName, roleKeys: user.roleKeys, allowedProjects: user.allowedProjects },
      status: 'success',
      severity: 'medium'
    });

    const userObj = user.toObject();
    delete (userObj as any).passwordHash;
    return userObj;
  }

  static async setUserStatus(tenantId: string, userId: string, status: 'active' | 'inactive' | 'locked' | 'deactivated', actorUserId: string) {
    const user = await UserModel.findOne({ tenantId, userId });
    if (!user) {
      throw new ApiError(404, 'USER_NOT_FOUND', 'User not found');
    }

    const beforeState = { status: user.status };
    user.status = status;
    await user.save();

    // Security Invariant: Deactivated/inactive users lose active session access immediately
    if (status !== 'active') {
      await SessionModel.updateMany({ tenantId, userId: user.userId, isValid: true }, { isValid: false });
    }

    await logAuditEvent({
      tenantId,
      actorUserId,
      module: 'core.users',
      action: `USER_STATUS_CHANGED_${status.toUpperCase()}`,
      recordType: 'User',
      recordId: user.userId,
      beforeState,
      afterState: { status: user.status },
      status: 'success',
      severity: 'high'
    });

    const userObj = user.toObject();
    delete (userObj as any).passwordHash;
    return userObj;
  }
}
