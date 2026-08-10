import mongoose, { Schema, Document } from 'mongoose';

export interface IOwnerSettlement extends Document {
  settlementId: string;
  tenantId: string;
  ownerId: string;
  period: string; // month/year
  totalRentCollected: number;
  maintenanceDeduction: number;
  managementFee: number;
  managementFeePercent: number;
  netPayout: number;
  status: 'DRAFT' | 'APPROVED' | 'PAID';
  paidDate?: Date;
  paymentMode?: string;
  bankReference?: string;
  createdAt: Date;
  updatedAt: Date;
}

const OwnerSettlementSchema: Schema = new Schema(
  {
    settlementId: { type: String, required: true, unique: true, index: true },
    tenantId: { type: String, required: true, index: true },
    ownerId: { type: String, required: true, index: true },
    period: { type: String, required: true },
    totalRentCollected: { type: Number, required: true, default: 0 },
    maintenanceDeduction: { type: Number, required: true, default: 0 },
    managementFee: { type: Number, required: true, default: 0 },
    managementFeePercent: { type: Number, required: true, default: 0 },
    netPayout: { type: Number, required: true, default: 0 },
    status: { type: String, enum: ['DRAFT', 'APPROVED', 'PAID'], default: 'DRAFT', index: true },
    paidDate: { type: Date },
    paymentMode: { type: String },
    bankReference: { type: String }
  },
  { timestamps: true }
);

OwnerSettlementSchema.index({ tenantId: 1, ownerId: 1, period: 1 }, { unique: true });

export const OwnerSettlementModel = mongoose.model<IOwnerSettlement>('OwnerSettlement', OwnerSettlementSchema);
