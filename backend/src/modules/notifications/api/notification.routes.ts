import { Router } from 'express';
import { authenticateJwt } from '../../../middleware/auth.middleware.js';
import { resolveTenant } from '../../../middleware/tenant.middleware.js';
import { checkModuleLicense } from '../../../middleware/license.middleware.js';
import { NotificationController } from './notification.controller.js';

const router = Router();

router.use(authenticateJwt);
router.use(resolveTenant);
// Not strictly enforcing module license here or check if module='notifications' is valid
// router.use(checkModuleLicense('notifications')); 

router.get('/', NotificationController.listNotifications);
router.get('/unread-count', NotificationController.getUnreadCount);
router.patch('/:id/read', NotificationController.markAsRead);
router.patch('/read-all', NotificationController.markAllAsRead);

router.get('/preferences', NotificationController.getPreferences);
router.put('/preferences', NotificationController.updatePreferences);

export default router;
