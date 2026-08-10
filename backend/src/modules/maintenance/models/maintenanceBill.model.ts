import mongoose, { Schema, Document } from 'mongoose';

export interface IMaintenanceBill extends Document {
  billId: string;
  tenantId: string;
  unitId: string;
  projectId: string;
  billPeriod: string;
  carpetArea: number;
  ratePerSqft: number;
  totalAmount: number;
  billingRoute: 'DIRECT_OWNER' | 'AUTO_DEDUCT_RENTAL';
  recipientId: string;
  status: 'GENERATED' | 'SENT' | 'PAID' | 'OVERDUE' | 'SETTLED_INTERNALLY';
  paidDate?: Date;
  paymentMode?: string;
  createdAt: Date;
  updatedAt: Date;
}

const MaintenanceBillSchema: Schema = new Schema(
  {
    billId: { type: String, required: true, unique: true, index: true },
    tenantId: { type: String, required: true, index: true },
    unitId: { type: String, required: true, index: true },
    projectId: { type: String, required: true, index: true },
    billPeriod: { type: String, required: true },
    carpetArea: { type: Number, required: true },
    ratePerSqft: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    billingRoute: { type: String, enum: ['DIRECT_OWNER', 'AUTO_DEDUCT_RENTAL'], required: true },
    recipientId: { type: String, required: true },
    status: { type: String, enum: ['GENERATED', 'SENT', 'PAID', 'OVERDUE', 'SETTLED_INTERNALLY'], default: 'GENERATED', index: true },
    paidDate: { type: Date },
    paymentMode: { type: String }
  },
  { timestamps: true }
);

MaintenanceBillSchema.index({ tenantId: 1, unitId: 1, billPeriod: 1 }, { unique: true });

export const MaintenanceBillModel = mongoose.model<IMaintenanceBill>('MaintenanceBill', MaintenanceBillSchema);
