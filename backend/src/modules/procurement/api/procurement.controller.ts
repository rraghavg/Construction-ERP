import { Response } from 'express';
import { AuthenticatedRequest } from '../../../middleware/auth.middleware.js';
import { ProcurementService } from '../services/procurement.service.js';
import { sendSuccess, sendError } from '../../../utils/apiResponse.js';

export class ProcurementController {
  // Vendors
  static async createVendor(req: AuthenticatedRequest, res: Response) {
    try {
      const vendor = await ProcurementService.createVendor({
        ...req.body,
        tenantId: req.tenantId!
      });
      return sendSuccess(res, vendor, { message: 'Vendor created successfully' }, 201);
    } catch (err: any) {
      return sendError(res, err.errorCode || 'VENDOR_CREATE_FAILED', err.message, err.statusCode || 500);
    }
  }

  static async listVendors(req: AuthenticatedRequest, res: Response) {
    try {
      const status = req.query.status as string;
      const vendors = await ProcurementService.listVendors(req.tenantId!, status);
      return sendSuccess(res, vendors);
    } catch (err: any) {
      return sendError(res, err.errorCode || 'VENDOR_FETCH_FAILED', err.message, err.statusCode || 500);
    }
  }

  static async updateVendorStatus(req: AuthenticatedRequest, res: Response) {
    try {
      const { vendorId } = req.params;
      const { status } = req.body;
      const vendor = await ProcurementService.updateVendorStatus(req.tenantId!, vendorId, status);
      return sendSuccess(res, vendor, { message: 'Vendor status updated' });
    } catch (err: any) {
      return sendError(res, err.errorCode || 'VENDOR_UPDATE_FAILED', err.message, err.statusCode || 500);
    }
  }

  // Purchase Requisitions
  static async createRequisition(req: AuthenticatedRequest, res: Response) {
    try {
      const pr = await ProcurementService.createRequisition({
        ...req.body,
        tenantId: req.tenantId!,
        requestedBy: req.user?.fullName || 'User'
      });
      return sendSuccess(res, pr, { message: 'Purchase Requisition submitted' }, 201);
    } catch (err: any) {
      return sendError(res, err.errorCode || 'REQUISITION_CREATE_FAILED', err.message, err.statusCode || 500);
    }
  }

  static async listRequisitions(req: AuthenticatedRequest, res: Response) {
    try {
      const projectId = req.query.projectId as string;
      const prs = await ProcurementService.listRequisitions(req.tenantId!, projectId);
      return sendSuccess(res, prs);
    } catch (err: any) {
      return sendError(res, err.errorCode || 'REQUISITION_FETCH_FAILED', err.message, err.statusCode || 500);
    }
  }

  static async approveRequisition(req: AuthenticatedRequest, res: Response) {
    try {
      const { requisitionId } = req.params;
      const pr = await ProcurementService.approveRequisition(req.tenantId!, requisitionId, req.user?.fullName || 'System');
      return sendSuccess(res, pr, { message: 'Requisition approved' });
    } catch (err: any) {
      return sendError(res, err.errorCode || 'REQUISITION_APPROVE_FAILED', err.message, err.statusCode || 500);
    }
  }

  // RFQ & Quotations
  static async createRFQ(req: AuthenticatedRequest, res: Response) {
    try {
      const rfq = await ProcurementService.createRFQ({
        ...req.body,
        tenantId: req.tenantId!
      });
      return sendSuccess(res, rfq, { message: 'RFQ created and issued' }, 201);
    } catch (err: any) {
      return sendError(res, err.errorCode || 'RFQ_CREATE_FAILED', err.message, err.statusCode || 500);
    }
  }

  static async listRFQs(req: AuthenticatedRequest, res: Response) {
    try {
      const projectId = req.query.projectId as string;
      const rfqs = await ProcurementService.listRFQs(req.tenantId!, projectId);
      return sendSuccess(res, rfqs);
    } catch (err: any) {
      return sendError(res, err.errorCode || 'RFQ_FETCH_FAILED', err.message, err.statusCode || 500);
    }
  }

  static async submitVendorQuotation(req: AuthenticatedRequest, res: Response) {
    try {
      const quote = await ProcurementService.submitVendorQuotation({
        ...req.body,
        tenantId: req.tenantId!
      });
      return sendSuccess(res, quote, { message: 'Vendor quotation submitted' }, 201);
    } catch (err: any) {
      return sendError(res, err.errorCode || 'QUOTATION_SUBMIT_FAILED', err.message, err.statusCode || 500);
    }
  }

  static async compareQuotations(req: AuthenticatedRequest, res: Response) {
    try {
      const { rfqId } = req.params;
      const quotes = await ProcurementService.compareQuotations(req.tenantId!, rfqId);
      return sendSuccess(res, quotes);
    } catch (err: any) {
      return sendError(res, err.errorCode || 'QUOTATION_COMPARE_FAILED', err.message, err.statusCode || 500);
    }
  }

  // Purchase Orders
  static async createPurchaseOrder(req: AuthenticatedRequest, res: Response) {
    try {
      const po = await ProcurementService.createPurchaseOrder({
        ...req.body,
        tenantId: req.tenantId!
      });
      return sendSuccess(res, po, { message: 'Purchase Order created and issued' }, 201);
    } catch (err: any) {
      return sendError(res, err.errorCode || 'PO_CREATE_FAILED', err.message, err.statusCode || 500);
    }
  }

  static async listPurchaseOrders(req: AuthenticatedRequest, res: Response) {
    try {
      const projectId = req.query.projectId as string;
      const pos = await ProcurementService.listPurchaseOrders(req.tenantId!, projectId);
      return sendSuccess(res, pos);
    } catch (err: any) {
      return sendError(res, err.errorCode || 'PO_FETCH_FAILED', err.message, err.statusCode || 500);
    }
  }

  // Analytics
  static async getAnalytics(req: AuthenticatedRequest, res: Response) {
    try {
      const analytics = await ProcurementService.getProcurementAnalytics(req.tenantId!);
      return sendSuccess(res, analytics);
    } catch (err: any) {
      return sendError(res, err.errorCode || 'ANALYTICS_FAILED', err.message, err.statusCode || 500);
    }
  }
}
