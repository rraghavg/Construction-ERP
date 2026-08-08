import mongoose, { Schema, Document } from 'mongoose';

export interface ILead extends Document {
  leadNumber: string;
  tenantId: string;
  firstName: string;
  lastName?: string;
  fullName: string;
  phone: string;
  alternatePhone?: string;
  email?: string;
  sourceId: string;
  subSourceId?: string;
  preferredContactMethod?: 'PHONE' | 'EMAIL' | 'WHATSAPP';
  globalNotes?: string;
  isPotentialDuplicate?: boolean;
  status: 'ACTIVE' | 'ARCHIVED' | 'CONVERTED';
  createdBy: string;
  updatedBy: string;
  createdAt: Date;
  updatedAt: Date;
}

const LeadSchema: Schema = new Schema(
  {
    leadNumber: { type: String, required: true, unique: true, index: true },
    tenantId: { type: String, required: true, index: true },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, trim: true, default: '' },
    fullName: { type: String, required: true, trim: true, index: true },
    phone: { type: String, required: true, trim: true, index: true },
    alternatePhone: { type: String, trim: true },
    email: { type: String, lowercase: true, trim: true, index: true },
    sourceId: { type: String, required: true, default: 'WEBSITE', index: true },
    subSourceId: String,
    preferredContactMethod: {
      type: String,
      enum: ['PHONE', 'EMAIL', 'WHATSAPP'],
      default: 'PHONE'
    },
    globalNotes: String,
    isPotentialDuplicate: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ['ACTIVE', 'ARCHIVED', 'CONVERTED'],
      default: 'ACTIVE',
      index: true
    },
    createdBy: { type: String, required: true, default: 'SYSTEM' },
    updatedBy: { type: String, required: true, default: 'SYSTEM' }
  },
  { timestamps: true }
);

LeadSchema.index({ tenantId: 1, phone: 1 });
LeadSchema.index({ tenantId: 1, email: 1 });
LeadSchema.index({ tenantId: 1, status: 1 });

export const LeadModel = mongoose.model<ILead>('Lead', LeadSchema);
