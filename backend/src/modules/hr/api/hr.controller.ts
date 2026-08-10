import { Response } from 'express';
import { AuthenticatedRequest } from '../../../middleware/auth.middleware.js';
import { HrService } from '../services/hr.service.js';
import { RecruitmentService } from '../services/recruitment.service.js';
import { ReviewService } from '../services/review.service.js';
import { TrainingService } from '../services/training.service.js';
import { PolicyService } from '../services/policy.service.js';
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
  // Recruitment
  static async createJob(req: AuthenticatedRequest, res: Response) {
    try {
      const job = await RecruitmentService.createJob(req.tenantId!, { ...req.body, createdBy: req.user?.fullName || 'Admin' });
      return sendSuccess(res, job, { message: 'Job created successfully' }, 201);
    } catch (err: any) {
      return sendError(res, err.errorCode || 'JOB_CREATE_FAILED', err.message, err.statusCode || 500);
    }
  }

  static async listJobs(req: AuthenticatedRequest, res: Response) {
    try {
      const jobs = await RecruitmentService.listJobs(req.tenantId!, req.query.status as string);
      return sendSuccess(res, jobs);
    } catch (err: any) {
      return sendError(res, err.errorCode || 'JOB_LIST_FAILED', err.message, err.statusCode || 500);
    }
  }

  static async closeJob(req: AuthenticatedRequest, res: Response) {
    try {
      const job = await RecruitmentService.closeJob(req.tenantId!, req.params.jobId);
      return sendSuccess(res, job, { message: 'Job closed successfully' });
    } catch (err: any) {
      return sendError(res, err.errorCode || 'JOB_CLOSE_FAILED', err.message, err.statusCode || 500);
    }
  }

  static async addApplicant(req: AuthenticatedRequest, res: Response) {
    try {
      const applicant = await RecruitmentService.addApplicant(req.tenantId!, { ...req.body, createdBy: req.user?.fullName || 'System' });
      return sendSuccess(res, applicant, { message: 'Applicant added successfully' }, 201);
    } catch (err: any) {
      return sendError(res, err.errorCode || 'APPLICANT_ADD_FAILED', err.message, err.statusCode || 500);
    }
  }

  static async listApplicants(req: AuthenticatedRequest, res: Response) {
    try {
      const applicants = await RecruitmentService.listApplicants(req.tenantId!, req.query.jobId as string);
      return sendSuccess(res, applicants);
    } catch (err: any) {
      return sendError(res, err.errorCode || 'APPLICANT_LIST_FAILED', err.message, err.statusCode || 500);
    }
  }

  static async updateApplicantStatus(req: AuthenticatedRequest, res: Response) {
    try {
      const applicant = await RecruitmentService.updateApplicantStatus(req.tenantId!, req.params.applicantId, req.body.status, req.body.interviewDate, req.body.notes);
      return sendSuccess(res, applicant, { message: 'Applicant status updated' });
    } catch (err: any) {
      return sendError(res, err.errorCode || 'APPLICANT_UPDATE_FAILED', err.message, err.statusCode || 500);
    }
  }

  static async hireApplicant(req: AuthenticatedRequest, res: Response) {
    try {
      const applicant = await RecruitmentService.hireApplicant(req.tenantId!, req.params.applicantId);
      return sendSuccess(res, applicant, { message: 'Applicant hired successfully' });
    } catch (err: any) {
      return sendError(res, err.errorCode || 'APPLICANT_HIRE_FAILED', err.message, err.statusCode || 500);
    }
  }

  // Reviews
  static async createReview(req: AuthenticatedRequest, res: Response) {
    try {
      const review = await ReviewService.createReview(req.tenantId!, req.body);
      return sendSuccess(res, review, { message: 'Review created successfully' }, 201);
    } catch (err: any) {
      return sendError(res, err.errorCode || 'REVIEW_CREATE_FAILED', err.message, err.statusCode || 500);
    }
  }

  static async listReviews(req: AuthenticatedRequest, res: Response) {
    try {
      const reviews = await ReviewService.listReviews(req.tenantId!, req.query.employeeId as string);
      return sendSuccess(res, reviews);
    } catch (err: any) {
      return sendError(res, err.errorCode || 'REVIEW_LIST_FAILED', err.message, err.statusCode || 500);
    }
  }

  static async submitReview(req: AuthenticatedRequest, res: Response) {
    try {
      const review = await ReviewService.submitReview(req.tenantId!, req.params.reviewId);
      return sendSuccess(res, review, { message: 'Review submitted successfully' });
    } catch (err: any) {
      return sendError(res, err.errorCode || 'REVIEW_SUBMIT_FAILED', err.message, err.statusCode || 500);
    }
  }

  static async acknowledgeReview(req: AuthenticatedRequest, res: Response) {
    try {
      const review = await ReviewService.acknowledgeReview(req.tenantId!, req.params.reviewId);
      return sendSuccess(res, review, { message: 'Review acknowledged successfully' });
    } catch (err: any) {
      return sendError(res, err.errorCode || 'REVIEW_ACKNOWLEDGE_FAILED', err.message, err.statusCode || 500);
    }
  }

  // Training
  static async createTraining(req: AuthenticatedRequest, res: Response) {
    try {
      const training = await TrainingService.createTraining(req.tenantId!, req.body);
      return sendSuccess(res, training, { message: 'Training created successfully' }, 201);
    } catch (err: any) {
      return sendError(res, err.errorCode || 'TRAINING_CREATE_FAILED', err.message, err.statusCode || 500);
    }
  }

  static async listTrainings(req: AuthenticatedRequest, res: Response) {
    try {
      const trainings = await TrainingService.listTrainings(req.tenantId!, req.query.status as string);
      return sendSuccess(res, trainings);
    } catch (err: any) {
      return sendError(res, err.errorCode || 'TRAINING_LIST_FAILED', err.message, err.statusCode || 500);
    }
  }

  static async enrollEmployee(req: AuthenticatedRequest, res: Response) {
    try {
      const training = await TrainingService.enrollEmployee(req.tenantId!, req.params.trainingId, req.body.employeeId);
      return sendSuccess(res, training, { message: 'Employee enrolled successfully' });
    } catch (err: any) {
      return sendError(res, err.errorCode || 'ENROLL_FAILED', err.message, err.statusCode || 500);
    }
  }

  static async completeTraining(req: AuthenticatedRequest, res: Response) {
    try {
      const training = await TrainingService.completeTraining(req.tenantId!, req.params.trainingId);
      return sendSuccess(res, training, { message: 'Training marked as completed' });
    } catch (err: any) {
      return sendError(res, err.errorCode || 'TRAINING_COMPLETE_FAILED', err.message, err.statusCode || 500);
    }
  }

  static async recordTrainingScore(req: AuthenticatedRequest, res: Response) {
    try {
      const training = await TrainingService.recordScore(req.tenantId!, req.params.trainingId, req.params.employeeId, req.body.score);
      return sendSuccess(res, training, { message: 'Training score recorded successfully' });
    } catch (err: any) {
      return sendError(res, err.errorCode || 'RECORD_SCORE_FAILED', err.message, err.statusCode || 500);
    }
  }

  // Policies
  static async createPolicy(req: AuthenticatedRequest, res: Response) {
    try {
      const policy = await PolicyService.createPolicy(req.tenantId!, { ...req.body, createdBy: req.user?.fullName || 'System' });
      return sendSuccess(res, policy, { message: 'Policy created successfully' }, 201);
    } catch (err: any) {
      return sendError(res, err.errorCode || 'POLICY_CREATE_FAILED', err.message, err.statusCode || 500);
    }
  }

  static async listPolicies(req: AuthenticatedRequest, res: Response) {
    try {
      const policies = await PolicyService.listPolicies(req.tenantId!, req.query.status as string);
      return sendSuccess(res, policies);
    } catch (err: any) {
      return sendError(res, err.errorCode || 'POLICY_LIST_FAILED', err.message, err.statusCode || 500);
    }
  }

  static async publishPolicy(req: AuthenticatedRequest, res: Response) {
    try {
      const policy = await PolicyService.publishPolicy(req.tenantId!, req.params.policyId);
      return sendSuccess(res, policy, { message: 'Policy published successfully' });
    } catch (err: any) {
      return sendError(res, err.errorCode || 'POLICY_PUBLISH_FAILED', err.message, err.statusCode || 500);
    }
  }

  static async archivePolicy(req: AuthenticatedRequest, res: Response) {
    try {
      const policy = await PolicyService.archivePolicy(req.tenantId!, req.params.policyId);
      return sendSuccess(res, policy, { message: 'Policy archived successfully' });
    } catch (err: any) {
      return sendError(res, err.errorCode || 'POLICY_ARCHIVE_FAILED', err.message, err.statusCode || 500);
    }
  }
}
