import mongoose, { Schema, Document } from 'mongoose';

export interface ICustomerProfile extends Document {
  customerNumber: string;
  tenantId: string;
  partyId: string;
  customerSince: Date;
  category: 'RETAIL' | 'INVESTOR' | 'CORPORATE' | 'VIP';
  status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
  notes?: string;
  createdBy: string;
  updatedBy: string;
  createdAt: Date;
  updatedAt: Date;
}

const CustomerProfileSchema: Schema = new Schema(
  {
    customerNumber: { type: String, required: true, unique: true, index: true },
    tenantId: { type: String, required: true, index: true },
    partyId: { type: String, required: true, index: true },
    customerSince: { type: Date, default: Date.now },
    category: {
      type: String,
      enum: ['RETAIL', 'INVESTOR', 'CORPORATE', 'VIP'],
      default: 'RETAIL',
      index: true
    },
    status: {
      type: String,
      enum: ['ACTIVE', 'INACTIVE', 'SUSPENDED'],
      default: 'ACTIVE',
      index: true
    },
    notes: String,
    createdBy: { type: String, required: true, default: 'SYSTEM' },
    updatedBy: { type: String, required: true, default: 'SYSTEM' }
  },
  { timestamps: true }
);

CustomerProfileSchema.index({ tenantId: 1, partyId: 1 }, { unique: true });

export const CustomerProfileModel = mongoose.model<ICustomerProfile>('CustomerProfile', CustomerProfileSchema);
