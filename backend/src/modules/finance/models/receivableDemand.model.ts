import mongoose, { Schema, Document } from 'mongoose';

export interface IReceivableDemand extends Document {
  demandNumber: string;
  tenantId: string;
  projectId: string;
  bookingId: string;
  customerId: string;
  installmentReference: number;
  milestoneName: string;
  demandDate: Date;
  dueDate: Date;
  principalAmount: number;
  taxAmount: number;
  totalAmount: number;
  allocatedAmount: number;
  outstandingAmount: number;
  status: 'OPEN' | 'PARTIALLY_PAID' | 'PAID' | 'CANCELLED';
  createdAt: Date;
  updatedAt: Date;
}

const ReceivableDemandSchema: Schema = new Schema(
  {
    demandNumber: { type: String, required: true, unique: true, index: true },
    tenantId: { type: String, required: true, index: true },
    projectId: { type: String, required: true, index: true },
    bookingId: { type: String, required: true, index: true },
    customerId: { type: String, required: true, index: true },
    installmentReference: { type: Number, required: true },
    milestoneName: { type: String, required: true },
    demandDate: { type: Date, default: Date.now, required: true },
    dueDate: { type: Date, required: true, index: true },
    principalAmount: { type: Number, required: true },
    taxAmount: { type: Number, default: 0 },
    totalAmount: { type: Number, required: true },
    allocatedAmount: { type: Number, default: 0 },
    outstandingAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ['OPEN', 'PARTIALLY_PAID', 'PAID', 'CANCELLED'],
      default: 'OPEN',
      index: true
    }
  },
  { timestamps: true }
);

ReceivableDemandSchema.index({ tenantId: 1, bookingId: 1, status: 1 });

export const ReceivableDemandModel = mongoose.model<IReceivableDemand>('ReceivableDemand', ReceivableDemandSchema);
