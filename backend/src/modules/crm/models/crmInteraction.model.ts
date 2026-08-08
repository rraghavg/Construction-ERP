import mongoose, { Schema, Document } from 'mongoose';

export interface ICrmInteraction extends Document {
  interactionNumber: string;
  tenantId: string;
  opportunityId?: string;
  leadId: string;
  projectId?: string;
  type: 'CALL' | 'EMAIL' | 'WHATSAPP' | 'MEETING' | 'NOTE' | 'OTHER';
  direction?: 'INBOUND' | 'OUTBOUND';
  scheduledAt?: Date;
  completedAt?: Date;
  assignedTo: string;
  purpose: string;
  outcome?: string;
  notes?: string;
  status: 'PENDING' | 'COMPLETED' | 'CANCELLED' | 'MISSED';
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

const CrmInteractionSchema: Schema = new Schema(
  {
    interactionNumber: { type: String, required: true, unique: true, index: true },
    tenantId: { type: String, required: true, index: true },
    opportunityId: { type: String, index: true },
    leadId: { type: String, required: true, index: true },
    projectId: { type: String, index: true },
    type: {
      type: String,
      enum: ['CALL', 'EMAIL', 'WHATSAPP', 'MEETING', 'NOTE', 'OTHER'],
      required: true,
      index: true
    },
    direction: {
      type: String,
      enum: ['INBOUND', 'OUTBOUND'],
      default: 'OUTBOUND'
    },
    scheduledAt: { type: Date, index: true },
    completedAt: Date,
    assignedTo: { type: String, required: true, index: true },
    purpose: { type: String, required: true, trim: true },
    outcome: String,
    notes: String,
    status: {
      type: String,
      enum: ['PENDING', 'COMPLETED', 'CANCELLED', 'MISSED'],
      default: 'PENDING',
      index: true
    },
    createdBy: { type: String, required: true, default: 'SYSTEM' }
  },
  { timestamps: true }
);

CrmInteractionSchema.index({ tenantId: 1, leadId: 1 });
CrmInteractionSchema.index({ tenantId: 1, opportunityId: 1 });
CrmInteractionSchema.index({ tenantId: 1, assignedTo: 1, status: 1 });

export const CrmInteractionModel = mongoose.model<ICrmInteraction>('CrmInteraction', CrmInteractionSchema);
