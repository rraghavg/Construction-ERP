import { Router } from 'express';
import { authenticateJwt } from '../../../middleware/auth.middleware.js';
import { resolveTenant } from '../../../middleware/tenant.middleware.js';
import { checkModuleLicense } from '../../../middleware/license.middleware.js';
import { MaintenanceController } from './maintenance.controller.js';

const router = Router();

router.use(authenticateJwt);
router.use(resolveTenant);
router.use(checkModuleLicense('maintenance'));

// Assets
router.post('/assets', MaintenanceController.createAsset);
router.get('/assets', MaintenanceController.listAssets);

// Requests
router.post('/requests', MaintenanceController.createRequest);
router.get('/requests', MaintenanceController.listRequests);

// Work Orders
router.post('/work-orders', MaintenanceController.createWorkOrder);
router.patch('/work-orders/:workOrderId/complete', MaintenanceController.completeWorkOrder);
router.get('/work-orders', MaintenanceController.listWorkOrders);

// Analytics
router.get('/analytics', MaintenanceController.getAnalytics);

// Bills
router.post('/bills/generate', MaintenanceController.generateBills);
router.get('/bills', MaintenanceController.listBills);
router.patch('/bills/:billId/pay', MaintenanceController.markBillPaid);
router.get('/bills/overdue', MaintenanceController.getOverdueBills);

// SLA
router.get('/sla/metrics', MaintenanceController.getSlaMetrics);
router.get('/sla/vendor-performance', MaintenanceController.getVendorPerformance);

export default router;
