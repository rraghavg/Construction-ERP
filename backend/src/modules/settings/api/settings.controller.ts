import { Response } from 'express';
import { AuthenticatedRequest } from '../../../middleware/auth.middleware.js';
import { sendSuccess, sendError } from '../../../utils/apiResponse.js';
import { SettingsService } from '../services/settings.service.js';

export class SettingsController {
  static async getAll(req: AuthenticatedRequest, res: Response) {
    try {
      const tenantId = req.tenantId!;
      const settings = await SettingsService.getAll(tenantId);
      return sendSuccess(res, settings);
    } catch (error: any) {
      return sendError(res, 'SETTINGS_FETCH_FAILED', error.message || 'Failed to fetch settings', 500);
    }
  }

  static async getByCategory(req: AuthenticatedRequest, res: Response) {
    try {
      const tenantId = req.tenantId!;
      const { category } = req.params;
      const settings = await SettingsService.getByCategory(tenantId, category);
      return sendSuccess(res, settings);
    } catch (error: any) {
      return sendError(res, 'SETTINGS_CATEGORY_FETCH_FAILED', error.message || 'Failed to fetch settings by category', 500);
    }
  }

  static async update(req: AuthenticatedRequest, res: Response) {
    try {
      const tenantId = req.tenantId!;
      const { key } = req.params;
      const { value } = req.body;
      const userId = req.user?.userId || 'SYSTEM';
      const setting = await SettingsService.update(tenantId, key, value, userId);
      return sendSuccess(res, setting);
    } catch (error: any) {
      return sendError(res, 'SETTING_UPDATE_FAILED', error.message || 'Failed to update setting', 500);
    }
  }

  static async bulkUpdate(req: AuthenticatedRequest, res: Response) {
    try {
      const tenantId = req.tenantId!;
      const { settings } = req.body;
      const userId = req.user?.userId || 'SYSTEM';
      const result = await SettingsService.bulkUpdate(tenantId, settings, userId);
      return sendSuccess(res, result);
    } catch (error: any) {
      return sendError(res, 'SETTINGS_BULK_UPDATE_FAILED', error.message || 'Failed to bulk update settings', 500);
    }
  }
}
