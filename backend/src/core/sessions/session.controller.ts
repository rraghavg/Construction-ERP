import { Response } from 'express';
import { AuthenticatedRequest } from '../../middleware/auth.middleware.js';
import { SessionService } from './session.service.js';
import { sendSuccess, sendError } from '../../utils/apiResponse.js';

export class SessionController {
  static async listActiveSessions(req: AuthenticatedRequest, res: Response) {
    try {
      const sessions = await SessionService.listActiveSessions(req.tenantId!, req.user.userId);
      return sendSuccess(res, sessions);
    } catch (err: any) {
      return sendError(res, err.code || 'LIST_SESSIONS_FAILED', err.message, err.statusCode || 500);
    }
  }

  static async revokeSession(req: AuthenticatedRequest, res: Response) {
    try {
      const { sessionId } = req.params;
      const result = await SessionService.revokeSession(sessionId, req.tenantId!, req.user.userId);
      return sendSuccess(res, result);
    } catch (err: any) {
      return sendError(res, err.code || 'REVOKE_SESSION_FAILED', err.message, err.statusCode || 500);
    }
  }

  static async revokeAllUserSessions(req: AuthenticatedRequest, res: Response) {
    try {
      const { userId } = req.params;
      const result = await SessionService.revokeAllUserSessions(userId, req.tenantId!, req.user.userId);
      return sendSuccess(res, result);
    } catch (err: any) {
      return sendError(res, err.code || 'FORCE_LOGOUT_FAILED', err.message, err.statusCode || 500);
    }
  }
}
