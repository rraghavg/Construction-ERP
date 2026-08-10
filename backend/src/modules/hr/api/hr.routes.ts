import { Router } from 'express';
import { authenticateJwt } from '../../../middleware/auth.middleware.js';
import { resolveTenant } from '../../../middleware/tenant.middleware.js';
import { checkModuleLicense } from '../../../middleware/license.middleware.js';
import { HrController } from './hr.controller.js';

const router = Router();

router.use(authenticateJwt);
router.use(resolveTenant);
router.use(checkModuleLicense('hr'));

// Employees
router.post('/employees', HrController.createEmployee);
router.get('/employees', HrController.listEmployees);

// Attendance
router.post('/attendance', HrController.recordAttendance);

// Leaves
router.post('/leaves', HrController.submitLeaveRequest);
router.patch('/leaves/:leaveRequestId/approve', HrController.approveLeaveRequest);

// Payroll
router.post('/payroll/calculate', HrController.calculatePayroll);
router.post('/payroll/:payrollRunId/post', HrController.postPayrollToFinance);

// Analytics
router.get('/analytics', HrController.getAnalytics);

// Recruitment
router.post('/jobs', HrController.createJob);
router.get('/jobs', HrController.listJobs);
router.patch('/jobs/:jobId/close', HrController.closeJob);

router.post('/applicants', HrController.addApplicant);
router.get('/applicants', HrController.listApplicants);
router.patch('/applicants/:applicantId/status', HrController.updateApplicantStatus);
router.patch('/applicants/:applicantId/hire', HrController.hireApplicant);

// Reviews
router.post('/reviews', HrController.createReview);
router.get('/reviews', HrController.listReviews);
router.patch('/reviews/:reviewId/submit', HrController.submitReview);
router.patch('/reviews/:reviewId/acknowledge', HrController.acknowledgeReview);

// Training
router.post('/trainings', HrController.createTraining);
router.get('/trainings', HrController.listTrainings);
router.post('/trainings/:trainingId/enroll', HrController.enrollEmployee);
router.patch('/trainings/:trainingId/complete', HrController.completeTraining);
router.patch('/trainings/:trainingId/employees/:employeeId/score', HrController.recordTrainingScore);

// Policies
router.post('/policies', HrController.createPolicy);
router.get('/policies', HrController.listPolicies);
router.patch('/policies/:policyId/publish', HrController.publishPolicy);
router.patch('/policies/:policyId/archive', HrController.archivePolicy);

export default router;
