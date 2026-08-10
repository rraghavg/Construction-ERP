import mongoose, { Schema, Document } from 'mongoose';

export interface IExpense extends Document {
  expenseId: string;
  tenantId: string;
  category: 'MATERIALS' | 'LABOR' | 'OVERHEAD' | 'UTILITIES' | 'ADMIN' | 'OTHER';
  description: string;
  amount: number;
  vendorId?: string;
  projectId?: string;
  paymentMode?: string;
  receiptUrl?: string;
  status: 'PENDING_APPROVAL' | 'APPROVED' | 'PAID' | 'REJECTED';
  approvedBy?: string;
}

const ExpenseSchema: Schema = new Schema({
  expenseId: { type: String, required: true, unique: true, index: true },
  tenantId: { type: String, required: true, index: true },
  category: {
    type: String,
    enum: ['MATERIALS', 'LABOR', 'OVERHEAD', 'UTILITIES', 'ADMIN', 'OTHER'],
    required: true
  },
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  vendorId: { type: String },
  projectId: { type: String },
  paymentMode: { type: String },
  receiptUrl: { type: String },
  status: {
    type: String,
    enum: ['PENDING_APPROVAL', 'APPROVED', 'PAID', 'REJECTED'],
    default: 'PENDING_APPROVAL'
  },
  approvedBy: { type: String }
}, { timestamps: true });

export const ExpenseModel = mongoose.model<IExpense>('Expense', ExpenseSchema);
