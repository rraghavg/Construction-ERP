import { RoleModel } from './role.model.js';
import { ApiError } from '../../utils/apiError.js';
import { logAuditEvent } from '../../shared/audit/audit.model.js';

export class RoleService {
  static async listRoles(tenantId: string) {
    return RoleModel.find({ tenantId }).sort({ isSystemRole: -1, name: 1 });
  }

  static async getRoleByKey(tenantId: string, roleKey: string) {
    const role = await RoleModel.findOne({ tenantId, roleKey });
    if (!role) {
      throw new ApiError(404, 'ROLE_NOT_FOUND', 'Role not found');
    }
    return role;
  }

  static async createRole(tenantId: string, data: {
    roleKey?: string;
    name: string;
    description?: string;
    permissions?: string[];
  }, actorUserId: string) {
    const { name, description, permissions = [] } = data;
    const roleKey = data.roleKey || name.toLowerCase().replace(/[^a-z0-9]/g, '_');

    const existing = await RoleModel.findOne({ tenantId, roleKey });
    if (existing) {
      throw new ApiError(409, 'ROLE_EXISTS', 'Role with this key already exists in tenant');
    }

    const role = await RoleModel.create({
      tenantId,
      roleKey,
      name,
      description,
      permissions,
      isSystemRole: false
    });

    await logAuditEvent({
      tenantId,
      actorUserId,
      module: 'core.roles',
      action: 'ROLE_CREATED',
      recordType: 'Role',
      recordId: role.roleKey,
      afterState: { name, roleKey, permissions },
      status: 'success',
      severity: 'medium'
    });

    return role;
  }

  static async updateRole(tenantId: string, roleKey: string, data: {
    name?: string;
    description?: string;
    permissions?: string[];
  }, actorUserId: string) {
    const role = await RoleModel.findOne({ tenantId, roleKey });
    if (!role) {
      throw new ApiError(404, 'ROLE_NOT_FOUND', 'Role not found');
    }

    const beforeState = { name: role.name, permissions: role.permissions };

    if (data.name !== undefined) role.name = data.name;
    if (data.description !== undefined) role.description = data.description;
    if (data.permissions !== undefined) role.permissions = data.permissions;

    await role.save();

    await logAuditEvent({
      tenantId,
      actorUserId,
      module: 'core.roles',
      action: 'ROLE_UPDATED',
      recordType: 'Role',
      recordId: role.roleKey,
      beforeState,
      afterState: { name: role.name, permissions: role.permissions },
      status: 'success',
      severity: 'medium'
    });

    return role;
  }

  static async deleteRole(tenantId: string, roleKey: string, actorUserId: string) {
    const role = await RoleModel.findOne({ tenantId, roleKey });
    if (!role) {
      throw new ApiError(404, 'ROLE_NOT_FOUND', 'Role not found');
    }

    if (role.isSystemRole) {
      throw new ApiError(403, 'SYSTEM_ROLE_PROTECTED', 'System roles cannot be deleted');
    }

    await RoleModel.deleteOne({ tenantId, roleKey });

    await logAuditEvent({
      tenantId,
      actorUserId,
      module: 'core.roles',
      action: 'ROLE_DELETED',
      recordType: 'Role',
      recordId: roleKey,
      status: 'success',
      severity: 'high'
    });

    return { message: 'Role deleted successfully', roleKey };
  }
}
