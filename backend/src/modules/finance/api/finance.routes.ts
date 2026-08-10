import { Router } from 'express';
import { FinanceController } from './finance.controller';

const router = Router();

router.post('/coa/seed', FinanceController.seedCoa);
router.post('/demands', FinanceController.raiseDemand);
router.post('/collections', FinanceController.recordCollection);
router.post('/journals', FinanceController.postJournal);
router.get('/analytics', FinanceController.getAnalytics);

// Additional Endpoints
router.post('/invoices', FinanceController.createInvoice);
router.post('/expenses', FinanceController.recordExpense);
router.post('/budgets', FinanceController.createBudget);
router.post('/taxes', FinanceController.computeTax);
router.post('/assets', FinanceController.registerAsset);

export default router;
