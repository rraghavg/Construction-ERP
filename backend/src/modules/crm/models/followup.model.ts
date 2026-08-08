import mongoose, { Schema, Document } from 'mongoose';

export interface IFollowUp extends Document {
  followUpId: string;
  tenantId: string;
  leadId: string;
  assignedUserId: string;
  scheduledAt: Date;
  type: 'CALL' | 'MEETING' | 'SITE_VISIT' | 'EMAIL';
  notes?: string;
  status: 'PENDING' | 'COMPLETED' | 'CANCELLED';
  createdAt: Date;
  updatedAt: Date;
}

const FollowUpSchema: Schema = new Schema(
  {
    followUpId: { type: String, required: true, unique: true, index: true },
    tenantId: { type: String, required: true, index: true },
    leadId: { type: String, required: true, index: true },
    assignedUserId: { type: String, required: true },
    scheduledAt: { type: Date, required: true },
    type: { type: String, enum: ['CALL', 'MEETING', 'SITE_VISIT', 'EMAIL'], default: 'CALL' },
    notes: String,
    status: { type: String, enum: ['PENDING', 'COMPLETED', 'CANCELLED'], default: 'PENDING', index: true }
  },
  { timestamps: true }
);

FollowUpSchema.index({ tenantId: 1, leadId: 1 });

export const FollowUpModel = mongoose.model<IFollowUp>('FollowUp', FollowUpSchema);
