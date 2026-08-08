import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from './auth.middleware.js';
import { sendError } from '../utils/apiResponse.js';
import { TenantModel } from '../core/tenant/tenant.model.js';
import { ErrorCodes } from '../utils/apiError.js';

export const resolveTenant = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const headerTenantId = req.headers['x-tenant-id'] as string;
    let targetTenantId: string | undefined;

    // Rule: Authenticated requests derive tenant context from JWT token (req.user)
    if (req.user && req.user.tenantId) {
      targetTenantId = req.user.tenantId;

      // Anti-Spoofing Check: Client-supplied header must not contradict JWT token
      if (headerTenantId && headerTenantId !== targetTenantId && !req.user.isSuperAdmin) {
        return sendError(
          res,
          ErrorCodes.FORBIDDEN,
          'Cross-tenant token mismatch detected',
          403
        );
      }
    } else {
      // Unauthenticated / Pre-auth routes fallback to header
      targetTenantId = headerTenantId;
    }

    if (!targetTenantId) {
      return sendError(
        res,
        'TENANT_HEADER_MISSING',
        'Tenant context required (x-tenant-id header or auth token)',
        400
      );
    }

    const tenant = await TenantModel.findOne({ tenantId: targetTenantId });
    if (!tenant) {
      return sendError(res, 'TENANT_NOT_FOUND', 'Tenant account not found', 404);
    }

    if (tenant.status === 'suspended') {
      return sendError(res, 'TENANT_SUSPENDED', 'Tenant account is suspended', 403);
    }

    // Set trusted server context property
    req.tenantId = tenant.tenantId;
    next();
  } catch (err: any) {
    return sendError(res, 'TENANT_ERROR', 'Failed to resolve tenant context', 500);
  }
};
