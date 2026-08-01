import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from './auth.middleware.js';
import { sendError } from '../utils/apiResponse.js';

export const checkProjectScope = (projectIdParam: string = 'projectId') => {
  return async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const user = req.user;
      if (!user) {
        return sendError(res, 'AUTH_REQUIRED', 'User identity missing', 401);
      }

      if (user.isSuperAdmin) {
        return next();
      }

      const targetProjectId = req.params[projectIdParam] || req.body[projectIdParam] || req.query[projectIdParam];

      // If user has empty allowedProjects array, treat as unrestricted within tenant
      if (!user.allowedProjects || user.allowedProjects.length === 0) {
        return next();
      }

      if (targetProjectId && !user.allowedProjects.includes(targetProjectId)) {
        return sendError(
          res,
          'RESOURCE_SCOPE_DENIED',
          `Access to project '${targetProjectId}' is out of resource scope for user`,
          403
        );
      }

      next();
    } catch (err) {
      return sendError(res, 'SCOPE_CHECK_FAILED', 'Failed to check resource scope', 500);
    }
  };
};
