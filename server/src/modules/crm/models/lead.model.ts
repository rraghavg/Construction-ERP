import mongoose, { Schema, Document } from 'mongoose';

export interface ILead extends Document {
  leadId: string;
  tenantId: string;
  companyId?: string;
  projectId?: string;
  name: string;
  phone: string;
  email?: string;
  source: 'WEBSITE' | 'REFERRAL' | 'DEALER' | 'WALK_IN' | 'SOCIAL_MEDIA' | 'OTHER';
  budget?: number;
  preferredUnitType?: string;
  status: 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'SITE_VISIT' | 'NEGOTIATION' | 'WON' | 'LOST';
  leadScore: number;
  assignedUserId?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const LeadSchema: Schema = new Schema(
  {
    leadId: { type: String, required: true, unique: true, index: true },
    tenantId: { type: String, required: true, index: true },
    companyId: String,
    projectId: String,
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, lowercase: true, trim: true },
    source: {
      type: String,
      enum: ['WEBSITE', 'REFERRAL', 'DEALER', 'WALK_IN', 'SOCIAL_MEDIA', 'OTHER'],
      default: 'WEBSITE',
      index: true
    },
    budget: Number,
    preferredUnitType: String,
    status: {
      type: String,
      enum: ['NEW', 'CONTACTED', 'QUALIFIED', 'SITE_VISIT', 'NEGOTIATION', 'WON', 'LOST'],
      default: 'NEW',
      index: true
    },
    leadScore: { type: Number, default: 50 },
    assignedUserId: String,
    notes: String
  },
  { timestamps: true }
);

LeadSchema.index({ tenantId: 1, status: 1 });
LeadSchema.index({ tenantId: 1, projectId: 1 });

export const LeadModel = mongoose.model<ILead>('Lead', LeadSchema);
