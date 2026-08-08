import mongoose, { Schema, Document } from 'mongoose';

export interface IRentalDeposit extends Document {
  depositId: string;
  tenantId: string;
  leaseId: string;
  amount: number;
  paymentDate: Date;
  status: 'HELD' | 'REFUNDED' | 'FORFEITED' | 'PARTIALLY_REFUNDED';
  refundAmount?: number;
  createdAt: Date;
  updatedAt: Date;
}

const RentalDepositSchema: Schema = new Schema(
  {
    depositId: { type: String, required: true, unique: true, index: true },
    tenantId: { type: String, required: true, index: true },
    leaseId: { type: String, required: true, index: true },
    amount: { type: Number, required: true, min: 0 },
    paymentDate: { type: Date, default: Date.now },
    status: { type: String, enum: ['HELD', 'REFUNDED', 'FORFEITED', 'PARTIALLY_REFUNDED'], default: 'HELD', index: true },
    refundAmount: { type: Number, default: 0 }
  },
  { timestamps: true }
);

RentalDepositSchema.index({ tenantId: 1, leaseId: 1 });

export const RentalDepositModel = mongoose.model<IRentalDeposit>('RentalDeposit', RentalDepositSchema);
