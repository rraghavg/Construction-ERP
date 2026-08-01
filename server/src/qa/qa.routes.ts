import { Router } from 'express';
import { authenticateJwt } from '../middleware/auth.middleware.js';
import { resolveTenant } from '../middleware/tenant.middleware.js';
import { QaController } from './qa.controller.js';

const router = Router();

router.use(authenticateJwt);
router.use(resolveTenant);

router.get('/dashboard', QaController.getDashboard);
router.get('/traceability', QaController.getTraceabilityMatrix);
router.get('/integrity-scan', QaController.runIntegrityScan);
router.get('/release-readiness', QaController.getReleaseReadiness);

export default router;
