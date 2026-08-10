import { NotificationModel } from '../models/notification.model.js';
import { NotificationPreferenceModel } from '../models/notificationPreference.model.js';

export class NotificationService {
  static async create(
    tenantId: string,
    recipientUserId: string,
    title: string,
    message: string,
    type: 'SYSTEM' | 'ALERT' | 'REMINDER' | 'INFO' | 'APPROVAL',
    priority: 'HIGH' | 'MEDIUM' | 'LOW',
    link?: string,
    entityType?: string,
    entityId?: string
  ) {
    const notificationId = `NOT-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    const notification = await NotificationModel.create({
      notificationId,
      tenantId,
      recipientUserId,
      title,
      message,
      type,
      priority,
      link,
      entityType,
      entityId
    });

    return notification;
  }

  static async getByUser(tenantId: string, userId: string, filters: any = {}) {
    const query: any = { tenantId, recipientUserId: userId };
    
    if (filters.isRead !== undefined) {
      query.isRead = filters.isRead === 'true' || filters.isRead === true;
    }

    const limit = filters.limit ? parseInt(filters.limit) : 50;
    const skip = filters.skip ? parseInt(filters.skip) : 0;

    const notifications = await NotificationModel.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await NotificationModel.countDocuments(query);
    
    return { notifications, total, limit, skip };
  }

  static async markAsRead(tenantId: string, notificationId: string, userId: string) {
    const notif = await NotificationModel.findOneAndUpdate(
      { tenantId, notificationId, recipientUserId: userId },
      { isRead: true },
      { new: true }
    );
    if (!notif) throw Object.assign(new Error('Notification not found'), { errorCode: 'NOTIF_NOT_FOUND', statusCode: 404 });
    return notif;
  }

  static async markAllAsRead(tenantId: string, userId: string) {
    const result = await NotificationModel.updateMany(
      { tenantId, recipientUserId: userId, isRead: false },
      { isRead: true }
    );
    return { updatedCount: result.modifiedCount };
  }

  static async getUnreadCount(tenantId: string, userId: string) {
    const count = await NotificationModel.countDocuments({ tenantId, recipientUserId: userId, isRead: false });
    return { unreadCount: count };
  }

  static async deleteOld(tenantId: string, olderThanDays: number) {
    const date = new Date();
    date.setDate(date.getDate() - olderThanDays);
    const result = await NotificationModel.deleteMany({
      tenantId,
      createdAt: { $lt: date }
    });
    return { deletedCount: result.deletedCount };
  }
}
