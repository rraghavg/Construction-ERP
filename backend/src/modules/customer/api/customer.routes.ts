import { Router } from 'express';
import { CustomerController } from './customer.controller';

const router = Router();

router.get('/', CustomerController.getCustomers);
router.post('/', CustomerController.createCustomer);
router.post('/convert-crm', CustomerController.convertCrmLead);
router.post('/kyc', CustomerController.submitKyc);
router.patch('/kyc/verify', CustomerController.verifyKyc);

export default router;
