import mongoose, { Schema, Document } from 'mongoose';

export interface IInstallment extends Document {
  installmentId: string;
  tenantId: string;
  bookingId: string;
  installmentNumber: number;
  dueDate: Date;
  amount: number;
  status: 'PENDING' | 'PAID' | 'OVERDUE' | 'PARTIALLY_PAID';
  paidAmount: number;
  paidDate?: Date;
  paymentMode?: string;
  receiptId?: string;
  demandLetterSent: boolean;
  demandLetterDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const InstallmentSchema: Schema = new Schema(
  {
    installmentId: { type: String, required: true, unique: true, index: true },
    tenantId: { type: String, required: true, index: true },
    bookingId: { type: String, required: true, index: true },
    installmentNumber: { type: Number, required: true },
    dueDate: { type: Date, required: true },
    amount: { type: Number, required: true },
    status: {
      type: String,
      enum: ['PENDING', 'PAID', 'OVERDUE', 'PARTIALLY_PAID'],
      default: 'PENDING',
      index: true
    },
    paidAmount: { type: Number, default: 0 },
    paidDate: Date,
    paymentMode: String,
    receiptId: String,
    demandLetterSent: { type: Boolean, default: false },
    demandLetterDate: Date,
  },
  { timestamps: true }
);

InstallmentSchema.index({ tenantId: 1, bookingId: 1 });
InstallmentSchema.index({ tenantId: 1, status: 1 });

export const InstallmentModel = mongoose.model<IInstallment>('Installment', InstallmentSchema);
