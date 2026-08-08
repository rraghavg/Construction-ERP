import { Router } from 'express';
import { SalesController } from './sales.controller';

const router = Router();

router.get('/bookings', SalesController.getBookings);
router.post('/bookings', SalesController.createBooking);
router.post('/hold', SalesController.holdUnit);
router.post('/quotes', SalesController.createQuote);
router.post('/price-lists', SalesController.createPriceList);

export default router;
