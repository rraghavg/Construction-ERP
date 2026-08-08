import { Request, Response, NextFunction } from 'express';
import { isDatabaseConnected } from '../config/database.js';
import { sendError } from '../utils/apiResponse.js';

export const checkDatabaseConnection = (req: Request, res: Response, next: NextFunction) => {
  // Allow health endpoint even if DB is re-connecting
  if (req.path === '/api/v1/health') {
    return next();
  }

  if (!isDatabaseConnected()) {
    return sendError(res, 'SERVICE_NOT_READY', 'Database service is currently unavailable', 503);
  }

  next();
};
