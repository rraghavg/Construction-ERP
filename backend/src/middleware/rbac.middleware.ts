import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from './auth.middleware.js';
import { sendError } from '../utils/apiResponse.js';
import { RoleModel } from '../core/roles/role.model.js';
import { ErrorCodes } from '../utils/apiError.js';

export const checkPermission = (requiredPermission: string) => {
  return async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const user = req.user;
      if (!user) {
        return sendError(res, ErrorCodes.AUTHENTICATION_REQUIRED, 'User identity missing', 401);
      }

      // Platform Super Admins bypass permission check
      if (user.isSuperAdmin) {
        return next();
      }

      const roles = await RoleModel.find({
        tenantId: req.tenantId,
        roleKey: { $in: user.roleKeys }
      });

      const effectivePermissions = new Set<string>();
      roles.forEach((r) => r.permissions.forEach((p) => effectivePermissions.add(p)));

      if (!effectivePermissions.has(requiredPermission)) {
        return sendError(
          res,
          ErrorCodes.FORBIDDEN,
          `User lacks required permission: '${requiredPermission}'`,
          403
        );
      }

      next();
    } catch (err) {
      return sendError(res, 'RBAC_CHECK_FAILED', 'Failed to check RBAC permissions', 500);
    }
  };
};
