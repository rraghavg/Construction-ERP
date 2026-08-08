import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from './auth.middleware.js';
import { sendError } from '../utils/apiResponse.js';
import { ScopeService } from '../core/scope/scope.service.js';
import { ErrorCodes } from '../utils/apiError.js';

export const checkProjectScope = (projectIdParam: string = 'projectId') => {
  return async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const user = req.user;
      if (!user) {
        return sendError(res, ErrorCodes.AUTHENTICATION_REQUIRED, 'User identity missing', 401);
      }

      if (user.isSuperAdmin) {
        return next();
      }

      const scope = ScopeService.getEffectiveScope(req);
      if (scope.level === 'NONE') {
        return sendError(
          res,
          ErrorCodes.SCOPE_VIOLATION,
          'User has zero resource scope assigned',
          403
        );
      }

      const targetProjectId = req.params[projectIdParam] || req.body[projectIdParam] || req.query[projectIdParam];

      if (scope.level === 'PROJECT_SET' && targetProjectId) {
        if (!scope.allowedProjects.includes(targetProjectId)) {
          return sendError(
            res,
            ErrorCodes.SCOPE_VIOLATION,
            `Access to project '${targetProjectId}' is out of resource scope for user`,
            403
          );
        }
      }

      next();
    } catch (err) {
      return sendError(res, 'SCOPE_CHECK_FAILED', 'Failed to check resource scope', 500);
    }
  };
};
