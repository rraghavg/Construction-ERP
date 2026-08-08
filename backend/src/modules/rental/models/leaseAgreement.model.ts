import mongoose, { Schema, Document } from 'mongoose';

export interface ILeaseAgreement extends Document {
  leaseId: string;
  tenantId: string;
  companyId: string;
  projectId: string;
  leaseNumber: string;
  unitId: string;
  customerId: string;
  startDate: Date;
  endDate: Date;
  monthlyRent: number;
  securityDepositAmount: number;
  billingFrequency: 'MONTHLY' | 'QUARTERLY' | 'ANNUAL';
  status: 'DRAFT' | 'ACTIVE' | 'RENEWED' | 'TERMINATED' | 'EXPIRED';
  escalationPercentage: number;
  createdAt: Date;
  updatedAt: Date;
}

const LeaseAgreementSchema: Schema = new Schema(
  {
    leaseId: { type: String, required: true, unique: true, index: true },
    tenantId: { type: String, required: true, index: true },
    companyId: { type: String, required: true, index: true },
    projectId: { type: String, required: true, index: true },
    leaseNumber: { type: String, required: true, index: true },
    unitId: { type: String, required: true, index: true },
    customerId: { type: String, required: true, index: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    monthlyRent: { type: Number, required: true, min: 0 },
    securityDepositAmount: { type: Number, required: true, min: 0 },
    billingFrequency: { type: String, enum: ['MONTHLY', 'QUARTERLY', 'ANNUAL'], default: 'MONTHLY' },
    status: { type: String, enum: ['DRAFT', 'ACTIVE', 'RENEWED', 'TERMINATED', 'EXPIRED'], default: 'ACTIVE', index: true },
    escalationPercentage: { type: Number, default: 5 }
  },
  { timestamps: true }
);

LeaseAgreementSchema.index({ tenantId: 1, leaseNumber: 1 }, { unique: true });

export const LeaseAgreementModel = mongoose.model<ILeaseAgreement>('LeaseAgreement', LeaseAgreementSchema);
