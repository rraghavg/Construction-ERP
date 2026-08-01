import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from './auth.middleware.js';
import { sendError } from '../utils/apiResponse.js';
import { TenantModel } from '../core/tenant/tenant.model.js';

export const resolveTenant = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const tenantIdHeader = req.headers['x-tenant-id'] as string || req.tenantId;

    if (!tenantIdHeader) {
      return sendError(res, 'TENANT_HEADER_MISSING', 'Tenant ID header (x-tenant-id) required', 400);
    }

    const tenant = await TenantModel.findOne({ tenantId: tenantIdHeader });
    if (!tenant) {
      return sendError(res, 'TENANT_NOT_FOUND', 'Tenant account not found', 404);
    }

    if (tenant.status === 'suspended') {
      return sendError(res, 'TENANT_SUSPENDED', 'Tenant account is suspended', 403);
    }

    req.tenantId = tenant.tenantId;
    next();
  } catch (err) {
    return sendError(res, 'TENANT_ERROR', 'Failed to resolve tenant', 500);
  }
};
