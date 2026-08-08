import { Response } from 'express';
import { AuthenticatedRequest } from '../../middleware/auth.middleware.js';
import { PlatformAdminService } from './platformAdmin.service.js';
import { sendSuccess, sendError } from '../../utils/apiResponse.js';

export class PlatformAdminController {
  static async listTenants(req: AuthenticatedRequest, res: Response) {
    try {
      const tenants = await PlatformAdminService.listTenants();
      return sendSuccess(res, tenants);
    } catch (err: any) {
      return sendError(res, err.code || 'LIST_TENANTS_FAILED', err.message, err.statusCode || 500);
    }
  }

  static async createTenant(req: AuthenticatedRequest, res: Response) {
    try {
      const tenant = await PlatformAdminService.createTenant(req.body, req.user.userId);
      return sendSuccess(res, tenant, {}, 201);
    } catch (err: any) {
      return sendError(res, err.code || 'CREATE_TENANT_FAILED', err.message, err.statusCode || 500);
    }
  }

  static async updateTenantStatus(req: AuthenticatedRequest, res: Response) {
    try {
      const { tenantId } = req.params;
      const { status } = req.body;
      const tenant = await PlatformAdminService.updateTenantStatus(tenantId, status, req.user.userId);
      return sendSuccess(res, tenant);
    } catch (err: any) {
      return sendError(res, err.code || 'UPDATE_TENANT_FAILED', err.message, err.statusCode || 500);
    }
  }

  static async configureTenantModules(req: AuthenticatedRequest, res: Response) {
    try {
      const { tenantId } = req.params;
      const { modules } = req.body;
      const result = await PlatformAdminService.configureTenantModules(tenantId, modules, req.user.userId);
      return sendSuccess(res, result);
    } catch (err: any) {
      return sendError(res, err.code || 'CONFIGURE_MODULES_FAILED', err.message, err.statusCode || 500);
    }
  }
}
