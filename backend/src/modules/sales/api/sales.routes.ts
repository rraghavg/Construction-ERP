import { Router } from 'express';
import { authenticateJwt } from '../../../middleware/auth.middleware.js';
import { resolveTenant } from '../../../middleware/tenant.middleware.js';
import { checkModuleLicense } from '../../../middleware/license.middleware.js';
import { SalesController } from './sales.controller.js';

const router = Router();

// Apply middlewares as per the requested pattern
router.use(authenticateJwt as any);
router.use(resolveTenant as any);
router.use(checkModuleLicense('sales') as any);

// Existing Sales Routes
router.get('/bookings', SalesController.getBookings as any);
router.post('/bookings', SalesController.createBooking as any);
router.post('/hold', SalesController.holdUnit as any);
router.post('/quotes', SalesController.createQuote as any);
router.post('/price-lists', SalesController.createPriceList as any);

// Installment Routes
router.post('/installments', SalesController.generateInstallments as any);
router.get('/installments/overdue', SalesController.listOverdueInstallments as any);
router.get('/installments/:bookingId', SalesController.listInstallments as any);
router.post('/installments/:installmentId/payment', SalesController.recordPayment as any);
router.post('/installments/:installmentId/demand-letter', SalesController.sendDemandLetter as any);

// Cancellation Routes
router.get('/cancellations', SalesController.listCancellations as any);
router.post('/cancellations/:bookingId', SalesController.cancelBooking as any);

// Possession Routes
router.post('/possession/:bookingId/initiate', SalesController.initiatePossession as any);
router.post('/possession/:bookingId/complete', SalesController.completePossession as any);

export default router;
