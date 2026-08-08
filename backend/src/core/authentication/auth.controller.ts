import { Response } from 'express';
import { AuthenticatedRequest } from '../../middleware/auth.middleware.js';
import { AuthService } from './auth.service.js';
import { sendSuccess, sendError } from '../../utils/apiResponse.js';

export class AuthController {
  static async login(req: AuthenticatedRequest, res: Response) {
    try {
      const result = await AuthService.login({
        ...req.body,
        ipAddress: req.ip || req.socket.remoteAddress || '127.0.0.1',
        userAgent: req.headers['user-agent'] || 'Unknown'
      });
      return sendSuccess(res, result);
    } catch (err: any) {
      return sendError(res, err.code || 'AUTH_FAILED', err.message, err.statusCode || 500);
    }
  }

  static async logout(req: AuthenticatedRequest, res: Response) {
    try {
      if (req.session?.sessionId && req.tenantId && req.user?.userId) {
        await AuthService.logout(req.session.sessionId, req.tenantId, req.user.userId);
      }
      return sendSuccess(res, { message: 'Logged out successfully' });
    } catch (err: any) {
      return sendError(res, err.code || 'LOGOUT_FAILED', err.message, err.statusCode || 500);
    }
  }

  static async me(req: AuthenticatedRequest, res: Response) {
    try {
      const profile = await AuthService.getProfile(req.user.userId, req.tenantId!);
      return sendSuccess(res, profile);
    } catch (err: any) {
      return sendError(res, err.code || 'PROFILE_FAILED', err.message, err.statusCode || 500);
    }
  }
}
