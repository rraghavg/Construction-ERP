import { Router } from 'express';
import { AuthController } from './auth.controller.js';
import { authenticateJwt } from '../../middleware/auth.middleware.js';
import { resolveTenant } from '../../middleware/tenant.middleware.js';

const router = Router();

// Public login route
router.post('/login', AuthController.login);

// Protected auth routes
router.post('/logout', authenticateJwt, resolveTenant, AuthController.logout);
router.get('/me', authenticateJwt, resolveTenant, AuthController.me);

export default router;
