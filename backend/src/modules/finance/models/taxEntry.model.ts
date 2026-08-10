import mongoose, { Schema, Document } from 'mongoose';

export interface ITaxEntry extends Document {
  taxEntryId: string;
  tenantId: string;
  taxType: 'GST' | 'TDS' | 'SERVICE_TAX';
  transactionId: string;
  transactionType: 'INVOICE' | 'EXPENSE' | 'RECEIPT';
  taxableAmount: number;
  taxRate: number;
  taxAmount: number;
  filingPeriod: string;
  status: 'COMPUTED' | 'FILED' | 'PAID';
}

const TaxEntrySchema: Schema = new Schema({
  taxEntryId: { type: String, required: true, unique: true, index: true },
  tenantId: { type: String, required: true, index: true },
  taxType: {
    type: String,
    enum: ['GST', 'TDS', 'SERVICE_TAX'],
    required: true
  },
  transactionId: { type: String, required: true },
  transactionType: {
    type: String,
    enum: ['INVOICE', 'EXPENSE', 'RECEIPT'],
    required: true
  },
  taxableAmount: { type: Number, required: true },
  taxRate: { type: Number, required: true },
  taxAmount: { type: Number, required: true },
  filingPeriod: { type: String, required: true },
  status: {
    type: String,
    enum: ['COMPUTED', 'FILED', 'PAID'],
    default: 'COMPUTED'
  }
}, { timestamps: true });

export const TaxEntryModel = mongoose.model<ITaxEntry>('TaxEntry', TaxEntrySchema);
