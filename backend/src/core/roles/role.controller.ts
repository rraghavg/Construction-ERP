import { Response } from 'express';
import { AuthenticatedRequest } from '../../middleware/auth.middleware.js';
import { RoleService } from './role.service.js';
import { sendSuccess, sendError } from '../../utils/apiResponse.js';

export class RoleController {
  static async listRoles(req: AuthenticatedRequest, res: Response) {
    try {
      const roles = await RoleService.listRoles(req.tenantId!);
      return sendSuccess(res, roles);
    } catch (err: any) {
      return sendError(res, err.code || 'LIST_ROLES_FAILED', err.message, err.statusCode || 500);
    }
  }

  static async getRoleByKey(req: AuthenticatedRequest, res: Response) {
    try {
      const { roleKey } = req.params;
      const role = await RoleService.getRoleByKey(req.tenantId!, roleKey);
      return sendSuccess(res, role);
    } catch (err: any) {
      return sendError(res, err.code || 'GET_ROLE_FAILED', err.message, err.statusCode || 500);
    }
  }

  static async createRole(req: AuthenticatedRequest, res: Response) {
    try {
      const role = await RoleService.createRole(req.tenantId!, req.body, req.user.userId);
      return sendSuccess(res, role, {}, 201);
    } catch (err: any) {
      return sendError(res, err.code || 'CREATE_ROLE_FAILED', err.message, err.statusCode || 500);
    }
  }

  static async updateRole(req: AuthenticatedRequest, res: Response) {
    try {
      const { roleKey } = req.params;
      const role = await RoleService.updateRole(req.tenantId!, roleKey, req.body, req.user.userId);
      return sendSuccess(res, role);
    } catch (err: any) {
      return sendError(res, err.code || 'UPDATE_ROLE_FAILED', err.message, err.statusCode || 500);
    }
  }

  static async deleteRole(req: AuthenticatedRequest, res: Response) {
    try {
      const { roleKey } = req.params;
      const result = await RoleService.deleteRole(req.tenantId!, roleKey, req.user.userId);
      return sendSuccess(res, result);
    } catch (err: any) {
      return sendError(res, err.code || 'DELETE_ROLE_FAILED', err.message, err.statusCode || 500);
    }
  }
}
