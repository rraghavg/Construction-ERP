import { Response } from 'express';
import { AuthenticatedRequest } from '../../../middleware/auth.middleware.js';
import { MaintenanceService } from '../services/maintenance.service.js';
import { MaintenanceBillService } from '../services/maintenanceBill.service.js';
import { SlaService } from '../services/sla.service.js';
import { sendSuccess, sendError } from '../../../utils/apiResponse.js';

export class MaintenanceController {
  // Assets
  static async createAsset(req: AuthenticatedRequest, res: Response) {
    try {
      const asset = await MaintenanceService.createAsset({
        ...req.body,
        tenantId: req.tenantId!
      });
      return sendSuccess(res, asset, { message: 'Asset registered' }, 201);
    } catch (err: any) {
      return sendError(res, err.errorCode || 'ASSET_CREATE_FAILED', err.message, err.statusCode || 500);
    }
  }

  static async listAssets(req: AuthenticatedRequest, res: Response) {
    try {
      const projectId = req.query.projectId as string;
      const assets = await MaintenanceService.listAssets(req.tenantId!, projectId);
      return sendSuccess(res, assets);
    } catch (err: any) {
      return sendError(res, err.errorCode || 'ASSET_FETCH_FAILED', err.message, err.statusCode || 500);
    }
  }

  // Requests
  static async createRequest(req: AuthenticatedRequest, res: Response) {
    try {
      const request = await MaintenanceService.createRequest({
        ...req.body,
        tenantId: req.tenantId!,
        reportedBy: req.user?.fullName || 'User'
      });
      return sendSuccess(res, request, { message: 'Maintenance request submitted' }, 201);
    } catch (err: any) {
      return sendError(res, err.errorCode || 'REQUEST_CREATE_FAILED', err.message, err.statusCode || 500);
    }
  }

  static async listRequests(req: AuthenticatedRequest, res: Response) {
    try {
      const projectId = req.query.projectId as string;
      const requests = await MaintenanceService.listRequests(req.tenantId!, projectId);
      return sendSuccess(res, requests);
    } catch (err: any) {
      return sendError(res, err.errorCode || 'REQUEST_FETCH_FAILED', err.message, err.statusCode || 500);
    }
  }

  // Work Orders
  static async createWorkOrder(req: AuthenticatedRequest, res: Response) {
    try {
      const wo = await MaintenanceService.createWorkOrder({
        ...req.body,
        tenantId: req.tenantId!
      });
      return sendSuccess(res, wo, { message: 'Work order created and assigned' }, 201);
    } catch (err: any) {
      return sendError(res, err.errorCode || 'WORK_ORDER_CREATE_FAILED', err.message, err.statusCode || 500);
    }
  }

  static async completeWorkOrder(req: AuthenticatedRequest, res: Response) {
    try {
      const { workOrderId } = req.params;
      const { laborCost = 0, sparePartsCost = 0 } = req.body;
      const wo = await MaintenanceService.completeWorkOrder(req.tenantId!, workOrderId, laborCost, sparePartsCost);
      return sendSuccess(res, wo, { message: 'Work order completed' });
    } catch (err: any) {
      return sendError(res, err.errorCode || 'WORK_ORDER_COMPLETE_FAILED', err.message, err.statusCode || 500);
    }
  }

  static async listWorkOrders(req: AuthenticatedRequest, res: Response) {
    try {
      const projectId = req.query.projectId as string;
      const wos = await MaintenanceService.listWorkOrders(req.tenantId!, projectId);
      return sendSuccess(res, wos);
    } catch (err: any) {
      return sendError(res, err.errorCode || 'WORK_ORDER_FETCH_FAILED', err.message, err.statusCode || 500);
    }
  }

  // Analytics
  static async getAnalytics(req: AuthenticatedRequest, res: Response) {
    try {
      const analytics = await MaintenanceService.getMaintenanceAnalytics(req.tenantId!);
      return sendSuccess(res, analytics);
    } catch (err: any) {
      return sendError(res, err.errorCode || 'ANALYTICS_FAILED', err.message, err.statusCode || 500);
    }
  }

  // Maintenance Bills
  static async generateBills(req: AuthenticatedRequest, res: Response) {
    try {
      const { projectId, period } = req.body;
      const bills = await MaintenanceBillService.generateMonthlyBills(req.tenantId!, projectId, period, req.user?.id || 'System');
      return sendSuccess(res, bills, { message: 'Maintenance bills generated' }, 201);
    } catch (err: any) {
      return sendError(res, err.errorCode || 'BILL_GENERATE_FAILED', err.message, err.statusCode || 500);
    }
  }

  static async listBills(req: AuthenticatedRequest, res: Response) {
    try {
      const bills = await MaintenanceBillService.listBills(req.tenantId!, req.query);
      return sendSuccess(res, bills);
    } catch (err: any) {
      return sendError(res, err.errorCode || 'BILL_FETCH_FAILED', err.message, err.statusCode || 500);
    }
  }

  static async markBillPaid(req: AuthenticatedRequest, res: Response) {
    try {
      const { billId } = req.params;
      const { paymentMode } = req.body;
      const bill = await MaintenanceBillService.markAsPaid(req.tenantId!, billId, paymentMode, req.user?.id || 'System');
      return sendSuccess(res, bill, { message: 'Bill marked as paid' });
    } catch (err: any) {
      return sendError(res, err.errorCode || 'BILL_PAY_FAILED', err.message, err.statusCode || 500);
    }
  }

  static async getOverdueBills(req: AuthenticatedRequest, res: Response) {
    try {
      const bills = await MaintenanceBillService.getOverdue(req.tenantId!);
      return sendSuccess(res, bills);
    } catch (err: any) {
      return sendError(res, err.errorCode || 'BILL_FETCH_FAILED', err.message, err.statusCode || 500);
    }
  }

  // SLA
  static async getSlaMetrics(req: AuthenticatedRequest, res: Response) {
    try {
      const { period } = req.query;
      const metrics = await SlaService.calculateSlaMetrics(req.tenantId!, period as string);
      return sendSuccess(res, metrics);
    } catch (err: any) {
      return sendError(res, err.errorCode || 'SLA_METRICS_FAILED', err.message, err.statusCode || 500);
    }
  }

  static async getVendorPerformance(req: AuthenticatedRequest, res: Response) {
    try {
      const performance = await SlaService.getVendorPerformance(req.tenantId!);
      return sendSuccess(res, performance);
    } catch (err: any) {
      return sendError(res, err.errorCode || 'VENDOR_PERF_FAILED', err.message, err.statusCode || 500);
    }
  }
}
