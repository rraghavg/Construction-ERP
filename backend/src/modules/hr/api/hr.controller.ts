import { Response } from 'express';
import { AuthenticatedRequest } from '../../../middleware/auth.middleware.js';
import { HrService } from '../services/hr.service.js';
import { sendSuccess, sendError } from '../../../utils/apiResponse.js';

export class HrController {
  // Employees
  static async createEmployee(req: AuthenticatedRequest, res: Response) {
    try {
      const emp = await HrService.createEmployee({
        ...req.body,
        tenantId: req.tenantId!
      });
      return sendSuccess(res, emp, { message: 'Employee profile created' }, 201);
    } catch (err: any) {
      return sendError(res, err.errorCode || 'EMPLOYEE_CREATE_FAILED', err.message, err.statusCode || 500);
    }
  }

  static async listEmployees(req: AuthenticatedRequest, res: Response) {
    try {
      const companyId = req.query.companyId as string;
      const emps = await HrService.listEmployees(req.tenantId!, companyId);
      return sendSuccess(res, emps);
    } catch (err: any) {
      return sendError(res, err.errorCode || 'EMPLOYEE_FETCH_FAILED', err.message, err.statusCode || 500);
    }
  }

  // Attendance
  static async recordAttendance(req: AuthenticatedRequest, res: Response) {
    try {
      const att = await HrService.recordAttendance({
        ...req.body,
        tenantId: req.tenantId!
      });
      return sendSuccess(res, att, { message: 'Attendance recorded' }, 201);
    } catch (err: any) {
      return sendError(res, err.errorCode || 'ATTENDANCE_RECORD_FAILED', err.message, err.statusCode || 500);
    }
  }

  // Leave Requests
  static async submitLeaveRequest(req: AuthenticatedRequest, res: Response) {
    try {
      const leave = await HrService.submitLeaveRequest({
        ...req.body,
        tenantId: req.tenantId!
      });
      return sendSuccess(res, leave, { message: 'Leave request submitted' }, 201);
    } catch (err: any) {
      return sendError(res, err.errorCode || 'LEAVE_SUBMIT_FAILED', err.message, err.statusCode || 500);
    }
  }

  static async approveLeaveRequest(req: AuthenticatedRequest, res: Response) {
    try {
      const { leaveRequestId } = req.params;
      const leave = await HrService.approveLeaveRequest(req.tenantId!, leaveRequestId, req.user?.fullName || 'Manager');
      return sendSuccess(res, leave, { message: 'Leave request approved' });
    } catch (err: any) {
      return sendError(res, err.errorCode || 'LEAVE_APPROVE_FAILED', err.message, err.statusCode || 500);
    }
  }

  // Payroll Engine
  static async calculatePayroll(req: AuthenticatedRequest, res: Response) {
    try {
      const { companyId, payrollPeriod } = req.body;
      const run = await HrService.calculatePayroll(req.tenantId!, companyId, payrollPeriod);
      return sendSuccess(res, run, { message: 'Payroll run calculated' }, 201);
    } catch (err: any) {
      return sendError(res, err.errorCode || 'PAYROLL_CALCULATE_FAILED', err.message, err.statusCode || 500);
    }
  }

  static async postPayrollToFinance(req: AuthenticatedRequest, res: Response) {
    try {
      const { payrollRunId } = req.params;
      const run = await HrService.postPayrollToFinance(req.tenantId!, payrollRunId, req.user?.fullName || 'Finance Controller');
      return sendSuccess(res, run, { message: 'Payroll posted to Finance Subledger' });
    } catch (err: any) {
      return sendError(res, err.errorCode || 'PAYROLL_POST_FAILED', err.message, err.statusCode || 500);
    }
  }

  // Analytics
  static async getAnalytics(req: AuthenticatedRequest, res: Response) {
    try {
      const analytics = await HrService.getHrAnalytics(req.tenantId!);
      return sendSuccess(res, analytics);
    } catch (err: any) {
      return sendError(res, err.errorCode || 'ANALYTICS_FAILED', err.message, err.statusCode || 500);
    }
  }
}
