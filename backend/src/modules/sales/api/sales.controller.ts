import { Response } from 'express';
import { AuthenticatedRequest } from '../../../middleware/auth.middleware.js';
import { sendSuccess, sendError } from '../../../utils/apiResponse.js';
import { SalesService } from '../services/sales.service.js';
import { InstallmentService } from '../services/installment.service.js';
import { CancellationService } from '../services/cancellation.service.js';
import { PossessionService } from '../services/possession.service.js';

export class SalesController {
  static async getBookings(req: AuthenticatedRequest, res: Response) {
    try {
      const tenantId = req.tenantId!;
      const list = await SalesService.getBookings(tenantId);
      return sendSuccess(res, list, { count: list.length });
    } catch (err: any) {
      return sendError(res, 'INTERNAL_ERROR', err.message, 500);
    }
  }

  static async createBooking(req: AuthenticatedRequest, res: Response) {
    try {
      const tenantId = req.tenantId!;
      const companyId = req.user?.companyId || 'CMP-101';
      const booking = await SalesService.createBooking({ ...req.body, tenantId, companyId });
      return sendSuccess(res, booking, {}, 201);
    } catch (err: any) {
      return sendError(res, 'BAD_REQUEST', err.message, 400);
    }
  }

  static async holdUnit(req: AuthenticatedRequest, res: Response) {
    try {
      const tenantId = req.tenantId!;
      const heldBy = req.user?.fullName || 'Sales Executive';
      const hold = await SalesService.holdUnit({ ...req.body, tenantId, heldBy });
      return sendSuccess(res, hold, {}, 201);
    } catch (err: any) {
      return sendError(res, 'BAD_REQUEST', err.message, 400);
    }
  }

  static async createQuote(req: AuthenticatedRequest, res: Response) {
    try {
      const tenantId = req.tenantId!;
      const quote = await SalesService.createQuote({ ...req.body, tenantId });
      return sendSuccess(res, quote, {}, 201);
    } catch (err: any) {
      return sendError(res, 'BAD_REQUEST', err.message, 400);
    }
  }

  static async createPriceList(req: AuthenticatedRequest, res: Response) {
    try {
      const tenantId = req.tenantId!;
      const pl = await SalesService.createPriceList({ ...req.body, tenantId });
      return sendSuccess(res, pl, {}, 201);
    } catch (err: any) {
      return sendError(res, 'BAD_REQUEST', err.message, 400);
    }
  }

  // INSTALLMENTS
  static async generateInstallments(req: AuthenticatedRequest, res: Response) {
    try {
      const tenantId = req.tenantId!;
      const { bookingId, paymentPlan } = req.body;
      const result = await InstallmentService.generateInstallments(tenantId, bookingId, paymentPlan);
      return sendSuccess(res, result, {}, 201);
    } catch (err: any) {
      return sendError(res, 'BAD_REQUEST', err.message, 400);
    }
  }

  static async listInstallments(req: AuthenticatedRequest, res: Response) {
    try {
      const tenantId = req.tenantId!;
      const { bookingId } = req.params;
      const list = await InstallmentService.listByBooking(tenantId, bookingId);
      return sendSuccess(res, list);
    } catch (err: any) {
      return sendError(res, 'INTERNAL_ERROR', err.message, 500);
    }
  }

  static async listOverdueInstallments(req: AuthenticatedRequest, res: Response) {
    try {
      const tenantId = req.tenantId!;
      const list = await InstallmentService.listOverdue(tenantId);
      return sendSuccess(res, list);
    } catch (err: any) {
      return sendError(res, 'INTERNAL_ERROR', err.message, 500);
    }
  }

  static async recordPayment(req: AuthenticatedRequest, res: Response) {
    try {
      const tenantId = req.tenantId!;
      const userId = req.user?.userId || 'SYSTEM';
      const { installmentId } = req.params;
      const { amount, paymentMode } = req.body;
      const result = await InstallmentService.recordPayment(tenantId, installmentId, amount, paymentMode, userId);
      return sendSuccess(res, result);
    } catch (err: any) {
      return sendError(res, 'BAD_REQUEST', err.message, 400);
    }
  }

  static async sendDemandLetter(req: AuthenticatedRequest, res: Response) {
    try {
      const tenantId = req.tenantId!;
      const userId = req.user?.userId || 'SYSTEM';
      const { installmentId } = req.params;
      const result = await InstallmentService.sendDemandLetter(tenantId, installmentId, userId);
      return sendSuccess(res, result);
    } catch (err: any) {
      return sendError(res, 'BAD_REQUEST', err.message, 400);
    }
  }

  // CANCELLATION
  static async cancelBooking(req: AuthenticatedRequest, res: Response) {
    try {
      const tenantId = req.tenantId!;
      const userId = req.user?.userId || 'SYSTEM';
      const { bookingId } = req.params;
      const { reason, refundAmount } = req.body;
      const result = await CancellationService.cancelBooking(tenantId, bookingId, reason, refundAmount, userId);
      return sendSuccess(res, result);
    } catch (err: any) {
      return sendError(res, 'BAD_REQUEST', err.message, 400);
    }
  }

  static async listCancellations(req: AuthenticatedRequest, res: Response) {
    try {
      const tenantId = req.tenantId!;
      const list = await CancellationService.listCancellations(tenantId);
      return sendSuccess(res, list);
    } catch (err: any) {
      return sendError(res, 'INTERNAL_ERROR', err.message, 500);
    }
  }

  // POSSESSION
  static async initiatePossession(req: AuthenticatedRequest, res: Response) {
    try {
      const tenantId = req.tenantId!;
      const userId = req.user?.userId || 'SYSTEM';
      const { bookingId } = req.params;
      const { possessionDate } = req.body;
      const result = await PossessionService.initiatePossession(tenantId, bookingId, possessionDate, userId);
      return sendSuccess(res, result);
    } catch (err: any) {
      return sendError(res, 'BAD_REQUEST', err.message, 400);
    }
  }

  static async completePossession(req: AuthenticatedRequest, res: Response) {
    try {
      const tenantId = req.tenantId!;
      const userId = req.user?.userId || 'SYSTEM';
      const { bookingId } = req.params;
      const result = await PossessionService.completePossession(tenantId, bookingId, userId);
      return sendSuccess(res, result);
    } catch (err: any) {
      return sendError(res, 'BAD_REQUEST', err.message, 400);
    }
  }
}
