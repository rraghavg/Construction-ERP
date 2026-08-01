import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { sendError } from '../utils/apiResponse.js';
import { UserModel } from '../core/auth/user.model.js';
import { SessionModel } from '../core/auth/session.model.js';

export interface AuthenticatedRequest extends Request {
  user?: any;
  tenantId?: string;
  session?: any;
}

export const authenticateJwt = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return sendError(res, 'AUTH_REQUIRED', 'Authentication token required', 401);
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, env.JWT_SECRET) as any;

    if (!decoded || !decoded.userId || !decoded.tenantId) {
      return sendError(res, 'TOKEN_INVALID', 'Invalid token payload', 401);
    }

    // Verify Session
    const session = await SessionModel.findOne({ sessionId: decoded.sessionId, isValid: true });
    if (!session) {
      return sendError(res, 'SESSION_INVALID', 'Session expired or revoked', 401);
    }

    // Fetch User
    const user = await UserModel.findOne({ userId: decoded.userId, tenantId: decoded.tenantId });
    if (!user || user.status !== 'active') {
      return sendError(res, 'USER_INACTIVE', 'User account is inactive or locked', 403);
    }

    req.user = user;
    req.tenantId = decoded.tenantId;
    req.session = session;

    next();
  } catch (err) {
    return sendError(res, 'TOKEN_EXPIRED', 'Token invalid or expired', 401);
  }
};
