import { Router } from 'express';
import { authenticateJwt } from '../../../middleware/auth.middleware.js';
import { resolveTenant } from '../../../middleware/tenant.middleware.js';
import { checkModuleLicense } from '../../../middleware/license.middleware.js';
import { ProcurementController } from './procurement.controller.js';

const router = Router();

router.use(authenticateJwt);
router.use(resolveTenant);
router.use(checkModuleLicense('procurement'));

// Vendors
router.post('/vendors', ProcurementController.createVendor);
router.get('/vendors', ProcurementController.listVendors);
router.patch('/vendors/:vendorId/status', ProcurementController.updateVendorStatus);

// Requisitions
router.post('/requisitions', ProcurementController.createRequisition);
router.get('/requisitions', ProcurementController.listRequisitions);
router.patch('/requisitions/:requisitionId/approve', ProcurementController.approveRequisition);

// RFQ & Quotations
router.post('/rfqs', ProcurementController.createRFQ);
router.get('/rfqs', ProcurementController.listRFQs);
router.post('/quotations', ProcurementController.submitVendorQuotation);
router.get('/rfqs/:rfqId/compare', ProcurementController.compareQuotations);

// Purchase Orders
router.post('/purchase-orders', ProcurementController.createPurchaseOrder);
router.get('/purchase-orders', ProcurementController.listPurchaseOrders);

// Analytics
router.get('/analytics', ProcurementController.getAnalytics);

export default router;
