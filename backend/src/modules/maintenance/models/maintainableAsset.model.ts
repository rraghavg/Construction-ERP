import mongoose, { Schema, Document } from 'mongoose';

export interface IMaintainableAsset extends Document {
  assetId: string;
  tenantId: string;
  companyId: string;
  projectId: string;
  assetNumber: string;
  name: string;
  assetType: 'EQUIPMENT' | 'LIFT' | 'GENERATOR' | 'HVAC' | 'PLUMBING';
  location: string;
  commissionDate?: Date;
  warrantyExpiryDate?: Date;
  status: 'OPERATIONAL' | 'UNDER_MAINTENANCE' | 'DECOMMISSIONED';
  createdAt: Date;
  updatedAt: Date;
}

const MaintainableAssetSchema: Schema = new Schema(
  {
    assetId: { type: String, required: true, unique: true, index: true },
    tenantId: { type: String, required: true, index: true },
    companyId: { type: String, required: true, index: true },
    projectId: { type: String, required: true, index: true },
    assetNumber: { type: String, required: true, index: true },
    name: { type: String, required: true, trim: true },
    assetType: { type: String, enum: ['EQUIPMENT', 'LIFT', 'GENERATOR', 'HVAC', 'PLUMBING'], default: 'EQUIPMENT' },
    location: { type: String, required: true },
    commissionDate: Date,
    warrantyExpiryDate: Date,
    status: { type: String, enum: ['OPERATIONAL', 'UNDER_MAINTENANCE', 'DECOMMISSIONED'], default: 'OPERATIONAL', index: true }
  },
  { timestamps: true }
);

MaintainableAssetSchema.index({ tenantId: 1, assetNumber: 1 }, { unique: true });

export const MaintainableAssetModel = mongoose.model<IMaintainableAsset>('MaintainableAsset', MaintainableAssetSchema);
