import { Router, Response } from 'express';
import { authenticateJwt, AuthenticatedRequest } from '../../../middleware/auth.middleware.js';
import { resolveTenant } from '../../../middleware/tenant.middleware.js';
import { SettingsService } from '../services/settings.service.js';
import { sendSuccess, sendError } from '../../../utils/apiResponse.js';

const router = Router();

router.use(authenticateJwt);
router.use(resolveTenant);

router.get('/config', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const config = await SettingsService.getSystemConfig(req.tenantId!);
    return sendSuccess(res, config);
  } catch (err: any) {
    return sendError(res, err.errorCode || 'CONFIG_FETCH_FAILED', err.message, err.statusCode || 500);
  }
});

router.put('/config', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const config = await SettingsService.updateSystemConfig(req.tenantId!, req.body, req.user?.fullName || 'Admin');
    return sendSuccess(res, config, { message: 'System configuration updated successfully' });
  } catch (err: any) {
    return sendError(res, err.errorCode || 'CONFIG_UPDATE_FAILED', err.message, err.statusCode || 500);
  }
});

import { SettingsController } from './settings.controller.js';

router.get('/', SettingsController.getAll);
router.put('/bulk', SettingsController.bulkUpdate);
router.get('/:category', SettingsController.getByCategory);
router.put('/:key', SettingsController.update);

export default router;
