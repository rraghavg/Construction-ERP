import mongoose, { Schema, Document } from 'mongoose';

export interface IPolicy extends Document {
  policyId: string;
  tenantId: string;
  title: string;
  category: 'LEAVE' | 'ATTENDANCE' | 'CODE_OF_CONDUCT' | 'TRAVEL' | 'SAFETY' | 'OTHER';
  content: string;
  version: string;
  effectiveDate: Date;
  status: 'DRAFT' | 'ACTIVE' | 'ARCHIVED';
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

const PolicySchema: Schema = new Schema(
  {
    policyId: { type: String, required: true, unique: true, index: true },
    tenantId: { type: String, required: true, index: true },
    title: { type: String, required: true },
    category: { type: String, enum: ['LEAVE', 'ATTENDANCE', 'CODE_OF_CONDUCT', 'TRAVEL', 'SAFETY', 'OTHER'], required: true },
    content: { type: String, required: true },
    version: { type: String, required: true },
    effectiveDate: { type: Date, required: true },
    status: { type: String, enum: ['DRAFT', 'ACTIVE', 'ARCHIVED'], default: 'DRAFT', index: true },
    createdBy: { type: String, required: true }
  },
  { timestamps: true }
);

PolicySchema.index({ tenantId: 1, category: 1, status: 1 });

export const PolicyModel = mongoose.model<IPolicy>('Policy', PolicySchema);
