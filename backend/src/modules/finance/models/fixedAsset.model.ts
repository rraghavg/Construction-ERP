import mongoose, { Schema, Document } from 'mongoose';

export interface IFixedAsset extends Document {
  assetId: string;
  tenantId: string;
  name: string;
  category: 'LAND' | 'BUILDING' | 'VEHICLE' | 'EQUIPMENT' | 'FURNITURE' | 'IT_EQUIPMENT';
  purchaseDate: Date;
  purchaseValue: number;
  currentValue: number;
  depreciationMethod: 'SLM' | 'WDV';
  depreciationRate: number;
  location?: string;
  status: 'ACTIVE' | 'DISPOSED' | 'UNDER_MAINTENANCE';
}

const FixedAssetSchema: Schema = new Schema({
  assetId: { type: String, required: true, unique: true, index: true },
  tenantId: { type: String, required: true, index: true },
  name: { type: String, required: true },
  category: {
    type: String,
    enum: ['LAND', 'BUILDING', 'VEHICLE', 'EQUIPMENT', 'FURNITURE', 'IT_EQUIPMENT'],
    required: true
  },
  purchaseDate: { type: Date, required: true },
  purchaseValue: { type: Number, required: true },
  currentValue: { type: Number, required: true },
  depreciationMethod: {
    type: String,
    enum: ['SLM', 'WDV'],
    required: true
  },
  depreciationRate: { type: Number, required: true },
  location: { type: String },
  status: {
    type: String,
    enum: ['ACTIVE', 'DISPOSED', 'UNDER_MAINTENANCE'],
    default: 'ACTIVE'
  }
}, { timestamps: true });

export const FixedAssetModel = mongoose.model<IFixedAsset>('FixedAsset', FixedAssetSchema);
