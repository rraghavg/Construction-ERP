import mongoose, { Schema, Document } from 'mongoose';

export interface INotificationPreference extends Document {
  preferenceId: string;
  tenantId: string;
  userId: string;
  emailEnabled: boolean;
  pushEnabled: boolean;
  categories: {
    SYSTEM: boolean;
    ALERT: boolean;
    REMINDER: boolean;
    INFO: boolean;
    APPROVAL: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
}

const NotificationPreferenceSchema = new Schema({
  preferenceId: { type: String, required: true, unique: true, index: true },
  tenantId: { type: String, required: true, index: true },
  userId: { type: String, required: true, index: true },
  emailEnabled: { type: Boolean, default: true },
  pushEnabled: { type: Boolean, default: true },
  categories: {
    SYSTEM: { type: Boolean, default: true },
    ALERT: { type: Boolean, default: true },
    REMINDER: { type: Boolean, default: true },
    INFO: { type: Boolean, default: true },
    APPROVAL: { type: Boolean, default: true }
  }
}, { timestamps: true });

NotificationPreferenceSchema.index({ tenantId: 1, userId: 1 }, { unique: true });

export const NotificationPreferenceModel = mongoose.model<INotificationPreference>('NotificationPreference', NotificationPreferenceSchema);
