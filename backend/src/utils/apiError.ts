export const ErrorCodes = {
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  AUTHENTICATION_REQUIRED: 'AUTHENTICATION_REQUIRED',
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  SESSION_EXPIRED: 'SESSION_EXPIRED',
  FORBIDDEN: 'FORBIDDEN',
  RESOURCE_NOT_FOUND: 'RESOURCE_NOT_FOUND',
  CONFLICT: 'CONFLICT',
  MODULE_NOT_ENABLED: 'MODULE_NOT_ENABLED',
  SCOPE_VIOLATION: 'SCOPE_VIOLATION',
  RATE_LIMITED: 'RATE_LIMITED',
  SERVICE_NOT_READY: 'SERVICE_NOT_READY',
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR'
} as const;

export type ErrorCode = typeof ErrorCodes[keyof typeof ErrorCodes] | string;

export class ApiError extends Error {
  public statusCode: number;
  public errorCode: ErrorCode;
  public details?: any;

  constructor(statusCode: number, errorCode: ErrorCode, message: string, details?: any) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.details = details;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
