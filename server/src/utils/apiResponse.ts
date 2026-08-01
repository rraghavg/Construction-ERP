import { Response } from 'express';

export const sendSuccess = (
  res: Response,
  data: any,
  meta: Record<string, any> = {},
  statusCode: number = 200
) => {
  return res.status(statusCode).json({
    success: true,
    data,
    meta
  });
};

export const sendError = (
  res: Response,
  errorCode: string,
  message: string,
  statusCode: number = 400,
  details: any = null
) => {
  return res.status(statusCode).json({
    success: false,
    error: {
      code: errorCode,
      message,
      ...(details ? { details } : {})
    }
  });
};
