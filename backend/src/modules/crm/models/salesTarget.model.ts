import mongoose, { Schema, Document } from 'mongoose';

export interface ISalesTarget extends Document {
  targetId: string;
  tenantId: string;
  employeeId: string;
  period: string; // e.g., 'YYYY-MM'
  targetAmount: number;
  achievedAmount: number;
  targetUnits: number;
  achievedUnits: number;
  status: 'ACTIVE' | 'CLOSED';
  createdAt: Date;
  updatedAt: Date;
}

const SalesTargetSchema: Schema = new Schema({
  targetId: { type: String, required: true, unique: true },
  tenantId: { type: String, required: true, index: true },
  employeeId: { type: String, required: true, index: true },
  period: { type: String, required: true },
  targetAmount: { type: Number, required: true },
  achievedAmount: { type: Number, default: 0 },
  targetUnits: { type: Number, required: true },
  achievedUnits: { type: Number, default: 0 },
  status: { type: String, enum: ['ACTIVE', 'CLOSED'], default: 'ACTIVE' }
}, { timestamps: true });

SalesTargetSchema.index({ tenantId: 1, targetId: 1 });
SalesTargetSchema.index({ tenantId: 1, employeeId: 1, period: 1 }, { unique: true });

export const SalesTargetModel = mongoose.model<ISalesTarget>('SalesTarget', SalesTargetSchema);
