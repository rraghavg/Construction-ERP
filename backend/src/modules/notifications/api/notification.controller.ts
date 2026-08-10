import { Response } from 'express';
import { AuthenticatedRequest } from '../../../middleware/auth.middleware.js';
import { sendSuccess, sendError } from '../../../utils/apiResponse.js';
import { NotificationService } from '../services/notification.service.js';
import { NotificationPreferenceModel } from '../models/notificationPreference.model.js';

export class NotificationController {
  static async listNotifications(req: AuthenticatedRequest, res: Response) {
    try {
      const result = await NotificationService.getByUser(req.tenantId!, req.user!.userId, req.query);
      return sendSuccess(res, result);
    } catch (err: any) {
      return sendError(res, err.errorCode || 'NOTIF_FETCH_FAILED', err.message, err.statusCode || 500);
    }
  }

  static async getUnreadCount(req: AuthenticatedRequest, res: Response) {
    try {
      const result = await NotificationService.getUnreadCount(req.tenantId!, req.user!.userId);
      return sendSuccess(res, result);
    } catch (err: any) {
      return sendError(res, err.errorCode || 'NOTIF_COUNT_FAILED', err.message, err.statusCode || 500);
    }
  }

  static async markAsRead(req: AuthenticatedRequest, res: Response) {
    try {
      const { id } = req.params;
      const result = await NotificationService.markAsRead(req.tenantId!, id, req.user!.userId);
      return sendSuccess(res, result, { message: 'Notification marked as read' });
    } catch (err: any) {
      return sendError(res, err.errorCode || 'NOTIF_UPDATE_FAILED', err.message, err.statusCode || 500);
    }
  }

  static async markAllAsRead(req: AuthenticatedRequest, res: Response) {
    try {
      const result = await NotificationService.markAllAsRead(req.tenantId!, req.user!.userId);
      return sendSuccess(res, result, { message: 'All notifications marked as read' });
    } catch (err: any) {
      return sendError(res, err.errorCode || 'NOTIF_UPDATE_FAILED', err.message, err.statusCode || 500);
    }
  }

  static async getPreferences(req: AuthenticatedRequest, res: Response) {
    try {
      let prefs = await NotificationPreferenceModel.findOne({ tenantId: req.tenantId!, userId: req.user!.userId });
      if (!prefs) {
        prefs = await NotificationPreferenceModel.create({
          preferenceId: `PREF-${Date.now()}`,
          tenantId: req.tenantId!,
          userId: req.user!.userId
        });
      }
      return sendSuccess(res, prefs);
    } catch (err: any) {
      return sendError(res, err.errorCode || 'PREF_FETCH_FAILED', err.message, err.statusCode || 500);
    }
  }

  static async updatePreferences(req: AuthenticatedRequest, res: Response) {
    try {
      const prefs = await NotificationPreferenceModel.findOneAndUpdate(
        { tenantId: req.tenantId!, userId: req.user!.userId },
        { $set: req.body },
        { new: true, upsert: true }
      );
      return sendSuccess(res, prefs, { message: 'Preferences updated successfully' });
    } catch (err: any) {
      return sendError(res, err.errorCode || 'PREF_UPDATE_FAILED', err.message, err.statusCode || 500);
    }
  }
}
