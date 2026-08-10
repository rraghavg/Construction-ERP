import mongoose, { Schema, Document } from 'mongoose';

export interface INoc extends Document {
  nocId: string;
  tenantId: string;
  customerId: string;
  bookingId?: string;
  unitId?: string;
  nocType: 'BANK' | 'SOCIETY' | 'TRANSFER' | 'OTHER';
  status: 'REQUESTED' | 'PROCESSING' | 'ISSUED' | 'REJECTED';
  issuedDate?: Date;
  issuedBy?: string;
  remarks?: string;
  createdAt: Date;
  updatedAt: Date;
}

const NocSchema: Schema = new Schema(
  {
    nocId: { type: String, required: true, unique: true, index: true },
    tenantId: { type: String, required: true, index: true },
    customerId: { type: String, required: true, index: true },
    bookingId: String,
    unitId: String,
    nocType: {
      type: String,
      enum: ['BANK', 'SOCIETY', 'TRANSFER', 'OTHER'],
      required: true,
      index: true
    },
    status: {
      type: String,
      enum: ['REQUESTED', 'PROCESSING', 'ISSUED', 'REJECTED'],
      default: 'REQUESTED',
      index: true
    },
    issuedDate: Date,
    issuedBy: String,
    remarks: String
  },
  { timestamps: true }
);

export const NocModel = mongoose.model<INoc>('Noc', NocSchema);
