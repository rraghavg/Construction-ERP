import { Router } from 'express';
import { CustomerController } from './customer.controller';

const router = Router();

router.get('/', CustomerController.getCustomers);
router.post('/', CustomerController.createCustomer);
router.post('/convert-crm', CustomerController.convertCrmLead);
router.post('/kyc', CustomerController.submitKyc);
router.patch('/kyc/verify', CustomerController.verifyKyc);

// Nominee routes
router.post('/:customerId/nominees', CustomerController.addNominee);
router.get('/:customerId/nominees', CustomerController.listNominees);
router.patch('/nominees/:nomineeId/revoke', CustomerController.revokeNominee);

// Ticket routes
router.post('/tickets', CustomerController.createTicket);
router.get('/tickets', CustomerController.listTickets);
router.patch('/tickets/:ticketId/resolve', CustomerController.resolveTicket);

// NOC routes
router.post('/nocs', CustomerController.requestNoc);
router.patch('/nocs/:nocId/issue', CustomerController.issueNoc);
router.get('/:customerId/nocs', CustomerController.listNocs);

// Communication routes
router.post('/communications', CustomerController.logCommunication);
router.get('/:customerId/communications', CustomerController.getCommunicationHistory);

export default router;
