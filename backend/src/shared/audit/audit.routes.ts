import { Router } from 'express';
import { authenticateJwt } from '../../middleware/auth.middleware.js';
import { resolveTenant } from '../../middleware/tenant.middleware.js';
import { AuditController } from './audit.controller.js';

const router = Router();

router.use(authenticateJwt);
router.use(resolveTenant);

router.get('/logs', AuditController.getLogs);
router.get('/logs/:entityType/:entityId', AuditController.getEntityLogs);
router.get('/analytics', AuditController.getAnalytics);
router.post('/reports/schedule', AuditController.scheduleReport);

export default router;
