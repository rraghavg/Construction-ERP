import { Router } from 'express';
import { authenticateJwt } from '../../../middleware/auth.middleware.js';
import { resolveTenant } from '../../../middleware/tenant.middleware.js';
import { checkModuleLicense } from '../../../middleware/license.middleware.js';
import { RentalController } from './rental.controller.js';

const router = Router();

router.use(authenticateJwt);
router.use(resolveTenant);
router.use(checkModuleLicense('rental'));

// Leases
router.post('/leases', RentalController.createLeaseAgreement);
router.get('/leases', RentalController.listLeases);
router.patch('/leases/:leaseId/terminate', RentalController.terminateLease);

// Collections
router.post('/collections', RentalController.recordRentCollection);

// Analytics
router.get('/analytics', RentalController.getAnalytics);

// Program Enrollments
router.post('/enrollments', RentalController.enrollUnit);
router.get('/enrollments', RentalController.getActiveEnrollments);
router.post('/enrollments/:enrollmentId/cancel', RentalController.cancelEnrollment);

// Buyback
router.post('/buyback/:unitId', RentalController.processBuyback);

export default router;
