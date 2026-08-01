import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/apiError.js';
import { sendError } from '../utils/apiResponse.js';

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ApiError) {
    return sendError(res, err.errorCode, err.message, err.statusCode, err.details);
  }

  console.error('[Unhandled Server Error]:', err);
  return sendError(res, 'INTERNAL_SERVER_ERROR', err.message || 'An unexpected server error occurred', 500);
};
