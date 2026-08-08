import { Router } from 'express';
import { FinanceController } from './finance.controller';

const router = Router();

router.post('/coa/seed', FinanceController.seedCoa);
router.post('/demands', FinanceController.raiseDemand);
router.post('/collections', FinanceController.recordCollection);
router.post('/journals', FinanceController.postJournal);
router.get('/analytics', FinanceController.getAnalytics);

export default router;
