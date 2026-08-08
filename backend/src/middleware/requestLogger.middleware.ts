import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from './auth.middleware.js';
import crypto from 'crypto';

export const requestLogger = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const startTime = Date.now();
  const requestId = (req.headers['x-request-id'] as string) || `REQ-${crypto.randomUUID().slice(0, 8)}`;

  req.headers['x-request-id'] = requestId;
  res.setHeader('x-request-id', requestId);

  res.on('finish', () => {
    const latencyMs = Date.now() - startTime;
    const logEntry = {
      timestamp: new Date().toISOString(),
      requestId,
      method: req.method,
      path: req.originalUrl || req.url,
      tenantId: req.tenantId || 'UNAUTHENTICATED',
      userId: req.user?.userId || 'ANONYMOUS',
      statusCode: res.statusCode,
      latencyMs
    };

    // Structured JSON log for production observability
    if (res.statusCode >= 400) {
      console.warn(`[API WARN/ERR]`, JSON.stringify(logEntry));
    } else {
      console.log(`[API INFO]`, JSON.stringify(logEntry));
    }
  });

  next();
};
