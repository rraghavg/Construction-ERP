import mongoose, { Schema, Document } from 'mongoose';

export interface IReceipt extends Document {
  receiptNumber: string;
  tenantId: string;
  collectionId: string;
  customerId: string;
  bookingId?: string;
  amount: number;
  issuedAt: Date;
  status: 'ISSUED' | 'CANCELLED';
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

const ReceiptSchema: Schema = new Schema(
  {
    receiptNumber: { type: String, required: true, unique: true, index: true },
    tenantId: { type: String, required: true, index: true },
    collectionId: { type: String, required: true, unique: true, index: true },
    customerId: { type: String, required: true, index: true },
    bookingId: String,
    amount: { type: Number, required: true },
    issuedAt: { type: Date, default: Date.now },
    status: {
      type: String,
      enum: ['ISSUED', 'CANCELLED'],
      default: 'ISSUED',
      index: true
    },
    createdBy: { type: String, required: true, default: 'SYSTEM' }
  },
  { timestamps: true }
);

ReceiptSchema.index({ tenantId: 1, customerId: 1 });

export const ReceiptModel = mongoose.model<IReceipt>('Receipt', ReceiptSchema);
