import mongoose, { Schema, Document } from 'mongoose';

export interface IBankAccount extends Document {
  tenantId: string;
  companyId: string;
  bankName: string;
  accountName: string;
  maskedAccountNumber: string;
  ifsc: string;
  branch: string;
  ledgerAccountId?: string;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: Date;
  updatedAt: Date;
}

const BankAccountSchema: Schema = new Schema(
  {
    tenantId: { type: String, required: true, index: true },
    companyId: { type: String, required: true, index: true },
    bankName: { type: String, required: true, trim: true },
    accountName: { type: String, required: true, trim: true },
    maskedAccountNumber: { type: String, required: true, trim: true },
    ifsc: { type: String, required: true, trim: true, uppercase: true },
    branch: { type: String, required: true, trim: true },
    ledgerAccountId: String,
    status: {
      type: String,
      enum: ['ACTIVE', 'INACTIVE'],
      default: 'ACTIVE',
      index: true
    }
  },
  { timestamps: true }
);

BankAccountSchema.index({ tenantId: 1, companyId: 1 });

export const BankAccountModel = mongoose.model<IBankAccount>('BankAccount', BankAccountSchema);
