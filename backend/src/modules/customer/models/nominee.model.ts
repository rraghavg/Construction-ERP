import mongoose, { Schema, Document } from 'mongoose';

export interface INominee extends Document {
  nomineeId: string;
  tenantId: string;
  customerId: string;
  name: string;
  relation: string;
  phone?: string;
  email?: string;
  aadhaarNumber?: string;
  panNumber?: string;
  sharePercentage: number;
  status: 'ACTIVE' | 'REVOKED';
  createdAt: Date;
  updatedAt: Date;
}

const NomineeSchema: Schema = new Schema(
  {
    nomineeId: { type: String, required: true, unique: true, index: true },
    tenantId: { type: String, required: true, index: true },
    customerId: { type: String, required: true, index: true },
    name: { type: String, required: true },
    relation: { type: String, required: true },
    phone: String,
    email: String,
    aadhaarNumber: String,
    panNumber: String,
    sharePercentage: { type: Number, required: true, min: 0, max: 100 },
    status: {
      type: String,
      enum: ['ACTIVE', 'REVOKED'],
      default: 'ACTIVE',
      index: true
    }
  },
  { timestamps: true }
);

export const NomineeModel = mongoose.model<INominee>('Nominee', NomineeSchema);
