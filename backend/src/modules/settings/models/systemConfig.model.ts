import mongoose, { Schema, Document } from 'mongoose';

export interface ISystemConfig extends Document {
  tenantId: string;
  companyName: string;
  companyAddress: string;
  taxRegistrationNumber: string;
  currency: string;
  fiscalYearStartMonth: number;
  dateFormat: string;
  timezone: string;
  supportEmail: string;
  theme: 'LIGHT' | 'DARK' | 'SYSTEM';
  updatedBy: string;
  createdAt: Date;
  updatedAt: Date;
}

const SystemConfigSchema: Schema = new Schema(
  {
    tenantId: { type: String, required: true, unique: true, index: true },
    companyName: { type: String, required: true, default: 'Apex Construction Group' },
    companyAddress: { type: String, default: '100 Construction Plaza, Tech Corridor' },
    taxRegistrationNumber: { type: String, default: 'GSTIN-27AAAAA0000A1Z5' },
    currency: { type: String, default: 'INR' },
    fiscalYearStartMonth: { type: Number, default: 4 }, // April
    dateFormat: { type: String, default: 'DD/MM/YYYY' },
    timezone: { type: String, default: 'Asia/Kolkata' },
    supportEmail: { type: String, default: 'admin@apexconstruction.com' },
    theme: { type: String, enum: ['LIGHT', 'DARK', 'SYSTEM'], default: 'LIGHT' },
    updatedBy: { type: String, default: 'SYSTEM' }
  },
  { timestamps: true }
);

export const SystemConfigModel = mongoose.model<ISystemConfig>('SystemConfig', SystemConfigSchema);
