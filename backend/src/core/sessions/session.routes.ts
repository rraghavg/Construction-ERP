import { Router } from 'express';
import { SessionController } from './session.controller.js';
import { authenticateJwt } from '../../middleware/auth.middleware.js';
import { resolveTenant } from '../../middleware/tenant.middleware.js';

const router = Router();

router.use(authenticateJwt, resolveTenant);

router.get('/', SessionController.listActiveSessions);
router.delete('/:sessionId', SessionController.revokeSession);
router.delete('/user/:userId', SessionController.revokeAllUserSessions);

export default router;
