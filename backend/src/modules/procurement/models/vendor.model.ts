import mongoose, { Schema, Document } from 'mongoose';

export interface IVendor extends Document {
  vendorId: string;
  tenantId: string;
  partyId?: string;
  vendorNumber: string;
  legalName: string;
  tradeName?: string;
  vendorType: 'ORGANIZATION' | 'INDIVIDUAL' | 'CONTRACTOR' | 'SERVICE_PROVIDER' | 'MATERIAL_SUPPLIER';
  status: 'ACTIVE' | 'INACTIVE' | 'BLACKLISTED' | 'UNDER_REVIEW';
  taxProfile: {
    gstin?: string;
    pan?: string;
    taxCategory?: string;
  };
  paymentTerms: string;
  currency: string;
  categories: string[];
  serviceCategories: string[];
  contactPerson: {
    name: string;
    email: string;
    phone: string;
  };
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  rating: number;
  riskStatus: 'LOW' | 'MEDIUM' | 'HIGH';
  createdAt: Date;
  updatedAt: Date;
}

const VendorSchema: Schema = new Schema(
  {
    vendorId: { type: String, required: true, unique: true, index: true },
    tenantId: { type: String, required: true, index: true },
    partyId: { type: String, index: true },
    vendorNumber: { type: String, required: true, index: true },
    legalName: { type: String, required: true, trim: true },
    tradeName: { type: String, trim: true },
    vendorType: {
      type: String,
      enum: ['ORGANIZATION', 'INDIVIDUAL', 'CONTRACTOR', 'SERVICE_PROVIDER', 'MATERIAL_SUPPLIER'],
      default: 'ORGANIZATION'
    },
    status: {
      type: String,
      enum: ['ACTIVE', 'INACTIVE', 'BLACKLISTED', 'UNDER_REVIEW'],
      default: 'ACTIVE',
      index: true
    },
    taxProfile: {
      gstin: { type: String, trim: true },
      pan: { type: String, trim: true },
      taxCategory: { type: String, default: 'REGISTERED_REGULAR' }
    },
    paymentTerms: { type: String, default: 'NET_30' },
    currency: { type: String, default: 'INR' },
    categories: [{ type: String }],
    serviceCategories: [{ type: String }],
    contactPerson: {
      name: { type: String, required: true },
      email: { type: String, required: true, lowercase: true, trim: true },
      phone: { type: String, required: true }
    },
    address: {
      street: { type: String, default: '' },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zip: { type: String, default: '' },
      country: { type: String, default: 'India' }
    },
    rating: { type: Number, default: 4.5, min: 1, max: 5 },
    riskStatus: { type: String, enum: ['LOW', 'MEDIUM', 'HIGH'], default: 'LOW' }
  },
  { timestamps: true }
);

VendorSchema.index({ tenantId: 1, vendorNumber: 1 }, { unique: true });

export const VendorModel = mongoose.model<IVendor>('Vendor', VendorSchema);
