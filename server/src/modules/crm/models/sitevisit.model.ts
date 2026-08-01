import mongoose, { Schema, Document } from 'mongoose';

export interface ISiteVisit extends Document {
  siteVisitId: string;
  tenantId: string;
  leadId: string;
  projectId?: string;
  unitId?: string;
  conductedBy: string;
  visitedAt: Date;
  rating?: number; // 1 to 5
  feedback?: string;
  status: 'SCHEDULED' | 'COMPLETED' | 'NO_SHOW';
  createdAt: Date;
  updatedAt: Date;
}

const SiteVisitSchema: Schema = new Schema(
  {
    siteVisitId: { type: String, required: true, unique: true, index: true },
    tenantId: { type: String, required: true, index: true },
    leadId: { type: String, required: true, index: true },
    projectId: String,
    unitId: String,
    conductedBy: { type: String, required: true },
    visitedAt: { type: Date, required: true },
    rating: { type: Number, min: 1, max: 5, default: 4 },
    feedback: String,
    status: { type: String, enum: ['SCHEDULED', 'COMPLETED', 'NO_SHOW'], default: 'COMPLETED' }
  },
  { timestamps: true }
);

SiteVisitSchema.index({ tenantId: 1, leadId: 1 });

export const SiteVisitModel = mongoose.model<ISiteVisit>('SiteVisit', SiteVisitSchema);
