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

export default router;
