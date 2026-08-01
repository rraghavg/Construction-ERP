import mongoose, { Schema, Document } from 'mongoose';

export interface ICompany extends Document {
  companyId: string;
  tenantId: string;
  name: string;
  code: string;
  address?: string;
  gstin?: string;
  status: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
}

const CompanySchema: Schema = new Schema(
  {
    companyId: { type: String, required: true, unique: true, index: true },
    tenantId: { type: String, required: true, index: true },
    name: { type: String, required: true, trim: true },
    code: { type: String, required: true, uppercase: true, trim: true },
    address: String,
    gstin: { type: String, uppercase: true, trim: true },
    status: { type: String, enum: ['active', 'inactive'], default: 'active', index: true }
  },
  { timestamps: true }
);

CompanySchema.index({ tenantId: 1, code: 1 }, { unique: true });
CompanySchema.index({ tenantId: 1, status: 1 });

export const CompanyModel = mongoose.model<ICompany>('Company', CompanySchema);
