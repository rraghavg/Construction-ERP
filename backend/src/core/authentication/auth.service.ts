import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { env } from '../../config/env.js';
import { ApiError } from '../../utils/apiError.js';
import { TenantModel } from '../tenant/tenant.model.js';
import { UserModel } from '../users/user.model.js';
import { SessionModel } from '../sessions/session.model.js';
import { RoleModel } from '../roles/role.model.js';
import { logAuditEvent } from '../../shared/audit/audit.model.js';

export class AuthService {
  static async login(data: { email: string; password?: string; tenantId?: string; ipAddress?: string; userAgent?: string }) {
    const { email, password, tenantId, ipAddress = '127.0.0.1', userAgent = 'Unknown' } = data;

    if (!email || !password || !tenantId) {
      throw new ApiError(400, 'INVALID_INPUT', 'email, password, and tenantId are required');
    }

    const tenant = await TenantModel.findOne({ tenantId });
    if (!tenant || tenant.status !== 'active') {
      throw new ApiError(403, 'TENANT_SUSPENDED', 'Tenant account not found or suspended');
    }

    const user = await UserModel.findOne({ email: email.toLowerCase(), tenantId });
    if (!user) {
      throw new ApiError(401, 'INVALID_CREDENTIALS', 'Invalid email or password');
    }

    if (user.status !== 'active') {
      throw new ApiError(403, 'USER_INACTIVE', 'User account is inactive or locked');
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      user.failedLoginAttempts += 1;
      if (user.failedLoginAttempts >= 5) {
        user.status = 'locked';
      }
      await user.save();
      throw new ApiError(401, 'INVALID_CREDENTIALS', 'Invalid email or password');
    }

    // Reset failed login attempts on clean login
    user.failedLoginAttempts = 0;
    user.lastLoginAt = new Date();
    await user.save();

    // Create session
    const sessionId = `SES-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
    const expiresAt = new Date(Date.now() + 8 * 3600 * 1000); // 8 Hours TTL

    const session = await SessionModel.create({
      sessionId,
      tenantId,
      userId: user.userId,
      tokenHash: 'JWT_ACTIVE',
      ipAddress,
      userAgent,
      expiresAt,
      isValid: true
    });

    // Generate JWT
    const token = jwt.sign(
      {
        userId: user.userId,
        tenantId: user.tenantId,
        sessionId: session.sessionId,
        roles: user.roleKeys,
        isSuperAdmin: user.isSuperAdmin
      },
      env.JWT_SECRET,
      { expiresIn: env.JWT_EXPIRES_IN as any }
    );

    // Fetch user permissions
    const roles = await RoleModel.find({ tenantId, roleKey: { $in: user.roleKeys } });
    const permissions = Array.from(new Set(roles.flatMap((r) => r.permissions)));

    // Log Audit Event
    await logAuditEvent({
      tenantId,
      actorUserId: user.userId,
      module: 'core.auth',
      action: 'USER_LOGIN',
      recordType: 'Session',
      recordId: session.sessionId,
      afterState: { ipAddress, userAgent },
      status: 'success',
      severity: 'low'
    });

    return {
      token,
      expiresAt,
      user: {
        userId: user.userId,
        fullName: user.fullName,
        email: user.email,
        tenantId: user.tenantId,
        roleKeys: user.roleKeys,
        allowedProjects: user.allowedProjects,
        permissions,
        isSuperAdmin: user.isSuperAdmin
      }
    };
  }

  static async logout(sessionId: string, tenantId: string, actorUserId: string) {
    await SessionModel.updateOne({ sessionId, tenantId }, { isValid: false });

    await logAuditEvent({
      tenantId,
      actorUserId,
      module: 'core.auth',
      action: 'USER_LOGOUT',
      recordType: 'Session',
      recordId: sessionId,
      status: 'success',
      severity: 'low'
    });
  }

  static async getProfile(userId: string, tenantId: string) {
    const user = await UserModel.findOne({ userId, tenantId });
    if (!user) {
      throw new ApiError(404, 'USER_NOT_FOUND', 'User not found');
    }

    const roles = await RoleModel.find({ tenantId, roleKey: { $in: user.roleKeys } });
    const permissions = Array.from(new Set(roles.flatMap((r) => r.permissions)));

    return {
      userId: user.userId,
      fullName: user.fullName,
      email: user.email,
      tenantId: user.tenantId,
      roleKeys: user.roleKeys,
      allowedCompanies: user.allowedCompanies,
      allowedProjects: user.allowedProjects,
      permissions,
      isSuperAdmin: user.isSuperAdmin
    };
  }
}
