import { Response } from 'express';
import { AuthenticatedRequest } from '../../../middleware/auth.middleware.js';
import { RentalService } from '../services/rental.service.js';
import { EnrollmentService } from '../services/enrollment.service.js';
import { BuybackService } from '../../sales/services/buyback.service.js';
import { sendSuccess, sendError } from '../../../utils/apiResponse.js';

export class RentalController {
  // Lease Agreements
  static async createLeaseAgreement(req: AuthenticatedRequest, res: Response) {
    try {
      const result = await RentalService.createLeaseAgreement({
        ...req.body,
        tenantId: req.tenantId!
      });
      return sendSuccess(res, result, { message: 'Lease Agreement activated & rent schedule created' }, 201);
    } catch (err: any) {
      return sendError(res, err.errorCode || 'LEASE_CREATE_FAILED', err.message, err.statusCode || 500);
    }
  }

  static async listLeases(req: AuthenticatedRequest, res: Response) {
    try {
      const projectId = req.query.projectId as string;
      const leases = await RentalService.listLeases(req.tenantId!, projectId);
      return sendSuccess(res, leases);
    } catch (err: any) {
      return sendError(res, err.errorCode || 'LEASE_FETCH_FAILED', err.message, err.statusCode || 500);
    }
  }

  static async terminateLease(req: AuthenticatedRequest, res: Response) {
    try {
      const { leaseId } = req.params;
      const { reason } = req.body;
      const lease = await RentalService.terminateLease(req.tenantId!, leaseId, reason);
      return sendSuccess(res, lease, { message: 'Lease agreement terminated' });
    } catch (err: any) {
      return sendError(res, err.errorCode || 'LEASE_TERMINATE_FAILED', err.message, err.statusCode || 500);
    }
  }

  // Collections Integration
  static async recordRentCollection(req: AuthenticatedRequest, res: Response) {
    try {
      const { leaseId, scheduleId, amount, paymentMode = 'CHEQUE' } = req.body;
      const result = await RentalService.recordRentCollection(
        req.tenantId!,
        leaseId,
        scheduleId,
        amount,
        paymentMode,
        req.user?.fullName || 'Property Executive'
      );
      return sendSuccess(res, result, { message: 'Rent collection recorded & posted to Finance Subledger' });
    } catch (err: any) {
      return sendError(res, err.errorCode || 'RENT_COLLECT_FAILED', err.message, err.statusCode || 500);
    }
  }

  // Analytics
  static async getAnalytics(req: AuthenticatedRequest, res: Response) {
    try {
      const analytics = await RentalService.getRentalAnalytics(req.tenantId!);
      return sendSuccess(res, analytics);
    } catch (err: any) {
      return sendError(res, err.errorCode || 'ANALYTICS_FAILED', err.message, err.statusCode || 500);
    }
  }

  // Program Enrollments
  static async enrollUnit(req: AuthenticatedRequest, res: Response) {
    try {
      const { unitId, ownerId, programType } = req.body;
      if (!unitId || !ownerId || !programType) {
        return sendError(res, 'VALIDATION_FAILED', 'unitId, ownerId, and programType are required', 400);
      }
      const enrollment = await EnrollmentService.enrollUnit(
        req.tenantId!,
        unitId,
        ownerId,
        programType,
        req.user?.id || 'System'
      );
      return sendSuccess(res, enrollment, { message: 'Unit enrolled successfully' }, 201);
    } catch (err: any) {
      return sendError(res, err.errorCode || 'ENROLLMENT_FAILED', err.message, err.statusCode || 500);
    }
  }

  static async getActiveEnrollments(req: AuthenticatedRequest, res: Response) {
    try {
      const enrollments = await EnrollmentService.getActiveEnrollments(req.tenantId!);
      return sendSuccess(res, enrollments);
    } catch (err: any) {
      return sendError(res, err.errorCode || 'FETCH_ENROLLMENTS_FAILED', err.message, err.statusCode || 500);
    }
  }

  static async cancelEnrollment(req: AuthenticatedRequest, res: Response) {
    try {
      const { enrollmentId } = req.params;
      const enrollment = await EnrollmentService.cancelEnrollment(
        req.tenantId!,
        enrollmentId,
        req.user?.id || 'System'
      );
      return sendSuccess(res, enrollment, { message: 'Enrollment cancelled successfully' });
    } catch (err: any) {
      return sendError(res, err.errorCode || 'CANCEL_ENROLLMENT_FAILED', err.message, err.statusCode || 500);
    }
  }

  // Buyback (Cross-Module)
  static async processBuyback(req: AuthenticatedRequest, res: Response) {
    try {
      const { unitId } = req.params;
      const { notes } = req.body;
      const unit = await BuybackService.processBuyback(
        req.tenantId!,
        unitId,
        req.user?.id || 'System',
        notes
      );
      return sendSuccess(res, unit, { message: 'Buyback processed successfully' });
    } catch (err: any) {
      return sendError(res, err.errorCode || 'BUYBACK_FAILED', err.message, err.statusCode || 500);
    }
  }
}
