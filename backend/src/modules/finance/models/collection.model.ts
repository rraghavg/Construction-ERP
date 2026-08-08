import mongoose, { Schema, Document } from 'mongoose';

export interface IPaymentAllocation {
  demandId: string;
  amountAllocated: number;
  allocatedAt: Date;
}

export interface ICollection extends Document {
  collectionNumber: string;
  tenantId: string;
  projectId?: string;
  customerId: string;
  bookingId?: string;
  amount: number;
  receivedAt: Date;
  paymentMode: 'BANK_TRANSFER' | 'CHEQUE' | 'UPI' | 'CARD' | 'CASH';
  bankAccountId?: string;
  referenceNumber?: string;
  allocations: IPaymentAllocation[];
  unallocatedBalance: number;
  status: 'RECORDED' | 'REVERSED';
  receivedBy: string;
  createdAt: Date;
  updatedAt: Date;
}

const PaymentAllocationSchema = new Schema(
  {
    demandId: { type: String, required: true },
    amountAllocated: { type: Number, required: true },
    allocatedAt: { type: Date, default: Date.now }
  },
  { _id: false }
);

const CollectionSchema: Schema = new Schema(
  {
    collectionNumber: { type: String, required: true, unique: true, index: true },
    tenantId: { type: String, required: true, index: true },
    projectId: String,
    customerId: { type: String, required: true, index: true },
    bookingId: String,
    amount: { type: Number, required: true },
    receivedAt: { type: Date, default: Date.now, required: true },
    paymentMode: {
      type: String,
      enum: ['BANK_TRANSFER', 'CHEQUE', 'UPI', 'CARD', 'CASH'],
      required: true,
      index: true
    },
    bankAccountId: String,
    referenceNumber: String,
    allocations: [PaymentAllocationSchema],
    unallocatedBalance: { type: Number, required: true },
    status: {
      type: String,
      enum: ['RECORDED', 'REVERSED'],
      default: 'RECORDED',
      index: true
    },
    receivedBy: { type: String, required: true, default: 'SYSTEM' }
  },
  { timestamps: true }
);

CollectionSchema.index({ tenantId: 1, customerId: 1 });
CollectionSchema.index({ tenantId: 1, bookingId: 1 });

export const CollectionModel = mongoose.model<ICollection>('Collection', CollectionSchema);
