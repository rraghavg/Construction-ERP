import mongoose, { Schema, Document } from 'mongoose';

// Vendor
export interface IVendor extends Document {
  vendorId: string;
  tenantId: string;
  name: string;
  code: string;
  category: string;
  contactPerson?: string;
  phone?: string;
  email?: string;
  gstin?: string;
  bankDetails?: {
    accountName?: string;
    accountNumber?: string;
    bankName?: string;
    ifscCode?: string;
  };
  status: 'active' | 'inactive';
}

const VendorSchema: Schema = new Schema(
  {
    vendorId: { type: String, required: true, unique: true, index: true },
    tenantId: { type: String, required: true, index: true },
    name: { type: String, required: true, trim: true },
    code: { type: String, required: true, uppercase: true, trim: true },
    category: { type: String, default: 'Material Supplier' },
    contactPerson: String,
    phone: String,
    email: String,
    gstin: String,
    bankDetails: {
      accountName: String,
      accountNumber: String,
      bankName: String,
      ifscCode: String
    },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' }
  },
  { timestamps: true }
);

VendorSchema.index({ tenantId: 1, code: 1 }, { unique: true });

// Dealer
export interface IDealer extends Document {
  dealerId: string;
  tenantId: string;
  name: string;
  code: string;
  agencyName?: string;
  phone?: string;
  email?: string;
  commissionPct?: number;
  status: 'active' | 'inactive';
}

const DealerSchema: Schema = new Schema(
  {
    dealerId: { type: String, required: true, unique: true, index: true },
    tenantId: { type: String, required: true, index: true },
    name: { type: String, required: true, trim: true },
    code: { type: String, required: true, uppercase: true, trim: true },
    agencyName: String,
    phone: String,
    email: String,
    commissionPct: { type: Number, default: 2.0 },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' }
  },
  { timestamps: true }
);

DealerSchema.index({ tenantId: 1, code: 1 }, { unique: true });

// Bank Account
export interface IBank extends Document {
  bankId: string;
  tenantId: string;
  companyId?: string;
  bankName: string;
  branch?: string;
  accountName: string;
  accountNumber: string;
  ifscCode: string;
  status: 'active' | 'inactive';
}

const BankSchema: Schema = new Schema(
  {
    bankId: { type: String, required: true, unique: true, index: true },
    tenantId: { type: String, required: true, index: true },
    companyId: String,
    bankName: { type: String, required: true },
    branch: String,
    accountName: { type: String, required: true },
    accountNumber: { type: String, required: true },
    ifscCode: { type: String, required: true },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' }
  },
  { timestamps: true }
);

BankSchema.index({ tenantId: 1, bankId: 1 });

export const VendorModel = mongoose.model<IVendor>('Vendor', VendorSchema);
export const DealerModel = mongoose.model<IDealer>('Dealer', DealerSchema);
export const BankModel = mongoose.model<IBank>('Bank', BankSchema);
