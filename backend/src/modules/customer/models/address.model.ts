import mongoose, { Schema, Document } from 'mongoose';

export interface IAddress extends Document {
  tenantId: string;
  partyId: string;
  type: 'PERMANENT' | 'CORRESPONDENCE' | 'BILLING' | 'OTHER';
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isPrimary: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const AddressSchema: Schema = new Schema(
  {
    tenantId: { type: String, required: true, index: true },
    partyId: { type: String, required: true, index: true },
    type: {
      type: String,
      enum: ['PERMANENT', 'CORRESPONDENCE', 'BILLING', 'OTHER'],
      default: 'CORRESPONDENCE',
      required: true
    },
    line1: { type: String, required: true, trim: true },
    line2: String,
    city: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
    postalCode: { type: String, required: true, trim: true },
    country: { type: String, default: 'India', trim: true },
    isPrimary: { type: Boolean, default: false }
  },
  { timestamps: true }
);

AddressSchema.index({ tenantId: 1, partyId: 1 });

export const AddressModel = mongoose.model<IAddress>('Address', AddressSchema);
