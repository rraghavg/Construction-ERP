import mongoose, { Schema, Document } from 'mongoose';

export interface IChartOfAccount extends Document {
  tenantId: string;
  accountCode: string;
  name: string;
  type: 'ASSET' | 'LIABILITY' | 'EQUITY' | 'INCOME' | 'EXPENSE';
  parentAccountId?: string;
  normalBalance: 'DEBIT' | 'CREDIT';
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ChartOfAccountSchema: Schema = new Schema(
  {
    tenantId: { type: String, required: true, index: true },
    accountCode: { type: String, required: true, trim: true, uppercase: true },
    name: { type: String, required: true, trim: true },
    type: {
      type: String,
      enum: ['ASSET', 'LIABILITY', 'EQUITY', 'INCOME', 'EXPENSE'],
      required: true,
      index: true
    },
    parentAccountId: String,
    normalBalance: {
      type: String,
      enum: ['DEBIT', 'CREDIT'],
      required: true
    },
    isActive: { type: Boolean, default: true, index: true }
  },
  { timestamps: true }
);

ChartOfAccountSchema.index({ tenantId: 1, accountCode: 1 }, { unique: true });

export const ChartOfAccountModel = mongoose.model<IChartOfAccount>('ChartOfAccount', ChartOfAccountSchema);
