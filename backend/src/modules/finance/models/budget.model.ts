import mongoose, { Schema, Document } from 'mongoose';

export interface IBudget extends Document {
  budgetId: string;
  tenantId: string;
  projectId: string;
  fiscalYear: string;
  category: string;
  allocatedAmount: number;
  spentAmount: number;
  remainingAmount: number;
  status: 'DRAFT' | 'ACTIVE' | 'CLOSED';
}

const BudgetSchema: Schema = new Schema({
  budgetId: { type: String, required: true, unique: true, index: true },
  tenantId: { type: String, required: true, index: true },
  projectId: { type: String, required: true },
  fiscalYear: { type: String, required: true },
  category: { type: String, required: true },
  allocatedAmount: { type: Number, required: true },
  spentAmount: { type: Number, default: 0 },
  remainingAmount: { type: Number, required: true },
  status: {
    type: String,
    enum: ['DRAFT', 'ACTIVE', 'CLOSED'],
    default: 'DRAFT'
  }
}, { timestamps: true });

export const BudgetModel = mongoose.model<IBudget>('Budget', BudgetSchema);
