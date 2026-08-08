import { Router } from 'express';
import { UserController } from './user.controller.js';
import { authenticateJwt } from '../../middleware/auth.middleware.js';
import { resolveTenant } from '../../middleware/tenant.middleware.js';

const router = Router();

router.use(authenticateJwt, resolveTenant);

router.get('/', UserController.listUsers);
router.post('/', UserController.createUser);
router.get('/:userId', UserController.getUserById);
router.patch('/:userId', UserController.updateUser);
router.patch('/:userId/status', UserController.setUserStatus);

export default router;
