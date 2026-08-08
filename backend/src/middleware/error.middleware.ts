import { Request, Response, NextFunction } from 'express';
import { ApiError, ErrorCodes } from '../utils/apiError.js';
import { sendError } from '../utils/apiResponse.js';
import { env } from '../config/env.js';

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ApiError) {
    return sendError(res, err.errorCode, err.message, err.statusCode, err.details);
  }

  // Log full error internally for operational diagnostics
  console.error('[Unhandled Operational Error]:', err);

  // Production Security Rule: Do not expose raw internal database strings or stack traces to clients
  const clientMessage = env.NODE_ENV === 'production'
    ? 'An unexpected server error occurred'
    : (err.message || 'An unexpected server error occurred');

  return sendError(res, ErrorCodes.INTERNAL_SERVER_ERROR, clientMessage, 500);
};
