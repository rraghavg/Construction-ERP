import { Response } from 'express';
import { AuthenticatedRequest } from '../../middleware/auth.middleware.js';
import { sendSuccess, sendError } from '../../utils/apiResponse.js';
import { AuditService } from './audit.service.js';

export class AuditController {
  static async getLogs(req: AuthenticatedRequest, res: Response) {
    try {
      const { limit, skip, ...filters } = req.query;
      const result = await AuditService.getAuditTrail(req.tenantId!, filters, { limit, skip });
      return sendSuccess(res, result);
    } catch (err: any) {
      return sendError(res, err.errorCode || 'AUDIT_FETCH_FAILED', err.message, err.statusCode || 500);
    }
  }

  static async getEntityLogs(req: AuthenticatedRequest, res: Response) {
    try {
      const { entityType, entityId } = req.params;
      const logs = await AuditService.getByEntity(req.tenantId!, entityType, entityId);
      return sendSuccess(res, logs);
    } catch (err: any) {
      return sendError(res, err.errorCode || 'AUDIT_FETCH_FAILED', err.message, err.statusCode || 500);
    }
  }

  static async getAnalytics(req: AuthenticatedRequest, res: Response) {
    try {
      const period = req.query.period ? parseInt(req.query.period as string) : 30;
      const topUsers = await AuditService.getTopUsersByActivity(req.tenantId!, period);
      return sendSuccess(res, { topUsers, period });
    } catch (err: any) {
      return sendError(res, err.errorCode || 'AUDIT_ANALYTICS_FAILED', err.message, err.statusCode || 500);
    }
  }

  static async scheduleReport(req: AuthenticatedRequest, res: Response) {
    try {
      const { startDate, endDate, format } = req.body;
      const result = await AuditService.exportAuditReport(req.tenantId!, { startDate, endDate }, format);
      return sendSuccess(res, result, { message: 'Audit report scheduled' }, 201);
    } catch (err: any) {
      return sendError(res, err.errorCode || 'AUDIT_REPORT_FAILED', err.message, err.statusCode || 500);
    }
  }
}
