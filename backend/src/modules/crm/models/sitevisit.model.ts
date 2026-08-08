import mongoose, { Schema, Document } from 'mongoose';

export interface ISiteVisit extends Document {
  visitNumber: string;
  tenantId: string;
  opportunityId?: string;
  leadId: string;
  projectId: string;
  scheduledAt: Date;
  completedAt?: Date;
  assignedTo: string;
  visitorCount: number;
  pickupRequired?: boolean;
  pickupAddress?: string;
  status: 'SCHEDULED' | 'COMPLETED' | 'CANCELLED' | 'NO_SHOW';
  outcome?: string;
  rating?: number;
  notes?: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

const SiteVisitSchema: Schema = new Schema(
  {
    visitNumber: { type: String, required: true, unique: true, index: true },
    tenantId: { type: String, required: true, index: true },
    opportunityId: { type: String, index: true },
    leadId: { type: String, required: true, index: true },
    projectId: { type: String, required: true, index: true },
    scheduledAt: { type: Date, required: true, index: true },
    completedAt: Date,
    assignedTo: { type: String, required: true, index: true },
    visitorCount: { type: Number, default: 1 },
    pickupRequired: { type: Boolean, default: false },
    pickupAddress: String,
    status: {
      type: String,
      enum: ['SCHEDULED', 'COMPLETED', 'CANCELLED', 'NO_SHOW'],
      default: 'SCHEDULED',
      index: true
    },
    outcome: String,
    rating: { type: Number, min: 1, max: 5 },
    notes: String,
    createdBy: { type: String, required: true, default: 'SYSTEM' }
  },
  { timestamps: true }
);

SiteVisitSchema.index({ tenantId: 1, projectId: 1 });
SiteVisitSchema.index({ tenantId: 1, assignedTo: 1, status: 1 });

export const SiteVisitModel = mongoose.model<ISiteVisit>('SiteVisit', SiteVisitSchema);
