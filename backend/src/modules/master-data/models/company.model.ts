import mongoose, { Schema, Document } from 'mongoose';

export interface ICompany extends Document {
  companyId: string;
  tenantId: string;
  name: string;
  legalName?: string;
  code: string;
  companyType?: 'PVT_LTD' | 'PUBLIC_LTD' | 'LLP' | 'PROPRIETORSHIP' | 'OTHER';
  address?: string;
  gstin?: string;
  pan?: string;
  tan?: string;
  cin?: string;
  status: 'active' | 'inactive';
  createdBy?: string;
  updatedBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

const CompanySchema: Schema = new Schema(
  {
    companyId: { type: String, required: true, unique: true, index: true },
    tenantId: { type: String, required: true, index: true },
    name: { type: String, required: true, trim: true },
    legalName: { type: String, trim: true },
    code: { type: String, required: true, uppercase: true, trim: true },
    companyType: {
      type: String,
      enum: ['PVT_LTD', 'PUBLIC_LTD', 'LLP', 'PROPRIETORSHIP', 'OTHER'],
      default: 'PVT_LTD'
    },
    address: String,
    gstin: { type: String, uppercase: true, trim: true },
    pan: { type: String, uppercase: true, trim: true },
    tan: { type: String, uppercase: true, trim: true },
    cin: { type: String, uppercase: true, trim: true },
    status: { type: String, enum: ['active', 'inactive'], default: 'active', index: true },
    createdBy: String,
    updatedBy: String
  },
  { timestamps: true }
);

CompanySchema.index({ tenantId: 1, code: 1 }, { unique: true });
CompanySchema.index({ tenantId: 1, status: 1 });

export const CompanyModel = mongoose.model<ICompany>('Company', CompanySchema);
