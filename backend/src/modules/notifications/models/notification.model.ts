import mongoose, { Schema, Document } from 'mongoose';

export interface INotification extends Document {
  notificationId: string;
  tenantId: string;
  recipientUserId: string;
  title: string;
  message: string;
  type: 'SYSTEM' | 'ALERT' | 'REMINDER' | 'INFO' | 'APPROVAL';
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  isRead: boolean;
  link?: string;
  entityType?: string;
  entityId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const NotificationSchema = new Schema({
  notificationId: { type: String, required: true, unique: true, index: true },
  tenantId: { type: String, required: true, index: true },
  recipientUserId: { type: String, required: true, index: true },
  title: { type: String, required: true },
  message: { type: String, required: true },
  type: { type: String, enum: ['SYSTEM', 'ALERT', 'REMINDER', 'INFO', 'APPROVAL'], required: true },
  priority: { type: String, enum: ['HIGH', 'MEDIUM', 'LOW'], required: true },
  isRead: { type: Boolean, default: false, index: true },
  link: { type: String },
  entityType: { type: String },
  entityId: { type: String }
}, { timestamps: true });

NotificationSchema.index({ tenantId: 1, recipientUserId: 1, isRead: 1 });

export const NotificationModel = mongoose.model<INotification>('Notification', NotificationSchema);
