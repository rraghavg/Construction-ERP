import mongoose, { Schema, Document } from 'mongoose';

export interface ISetting extends Document {
  tenantId: string;
  category: string;
  key: string;
  value: any;
  updatedBy: string;
  createdAt: Date;
  updatedAt: Date;
}

const SettingSchema: Schema = new Schema(
  {
    tenantId: { type: String, required: true, index: true },
    category: { type: String, required: true, index: true },
    key: { type: String, required: true },
    value: { type: Schema.Types.Mixed, required: true },
    updatedBy: { type: String, required: true }
  },
  { timestamps: true }
);

SettingSchema.index({ tenantId: 1, key: 1 }, { unique: true });

export const SettingModel = mongoose.model<ISetting>('Setting', SettingSchema);
