import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from './auth.middleware.js';
import { sendError } from '../utils/apiResponse.js';
import { TenantModuleModel } from '../core/module-registry/licensing.model.js';
import { SYSTEM_MODULE_MANIFESTS } from '../core/module-registry/moduleRegistry.catalog.js';
import { ErrorCodes } from '../utils/apiError.js';

export const checkModuleLicense = (requiredModuleKey: string) => {
  return async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const tenantId = req.tenantId;
      if (!tenantId) {
        return sendError(res, 'TENANT_MISSING', 'Tenant context missing', 400);
      }

      // Platform Super Admins bypass module license checks
      if (req.user?.isSuperAdmin) {
        return next();
      }

      // Core modules are implicitly licensed for all active tenants
      const manifest = SYSTEM_MODULE_MANIFESTS.find((m) => m.moduleKey === requiredModuleKey);
      if (manifest && manifest.isCore) {
        return next();
      }

      const tenantModule = await TenantModuleModel.findOne({
        tenantId,
        moduleKey: requiredModuleKey,
        isEnabled: true
      });

      if (!tenantModule) {
        return sendError(
          res,
          ErrorCodes.MODULE_NOT_ENABLED,
          `Module '${requiredModuleKey}' is not licensed or enabled for this tenant`,
          403
        );
      }

      next();
    } catch (err) {
      return sendError(res, 'LICENSE_CHECK_FAILED', 'Failed to verify module license', 500);
    }
  };
};
