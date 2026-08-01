export class ApiError extends Error {
  public statusCode: number;
  public errorCode: string;
  public details?: any;

  constructor(statusCode: number, errorCode: string, message: string, details?: any) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.details = details;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
