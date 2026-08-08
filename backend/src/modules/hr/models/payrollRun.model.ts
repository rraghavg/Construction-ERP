import mongoose, { Schema, Document } from 'mongoose';

export interface IPayrollItem {
  employeeId: string;
  basicSalary: number;
  allowances: number;
  deductions: number;
  grossSalary: number;
  netSalary: number;
}

export interface IPayrollRun extends Document {
  payrollRunId: string;
  tenantId: string;
  companyId: string;
  payrollPeriod: string; // e.g. '2026-08'
  runDate: Date;
  status: 'DRAFT' | 'CALCULATED' | 'REVIEWED' | 'APPROVED' | 'POSTED' | 'LOCKED';
  items: IPayrollItem[];
  totalGross: number;
  totalDeductions: number;
  totalNet: number;
  postedJournalId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const PayrollItemSchema = new Schema({
  employeeId: { type: String, required: true },
  basicSalary: { type: Number, required: true },
  allowances: { type: Number, default: 0 },
  deductions: { type: Number, default: 0 },
  grossSalary: { type: Number, required: true },
  netSalary: { type: Number, required: true }
});

const PayrollRunSchema: Schema = new Schema(
  {
    payrollRunId: { type: String, required: true, unique: true, index: true },
    tenantId: { type: String, required: true, index: true },
    companyId: { type: String, required: true, index: true },
    payrollPeriod: { type: String, required: true, index: true },
    runDate: { type: Date, default: Date.now },
    status: {
      type: String,
      enum: ['DRAFT', 'CALCULATED', 'REVIEWED', 'APPROVED', 'POSTED', 'LOCKED'],
      default: 'DRAFT',
      index: true
    },
    items: [PayrollItemSchema],
    totalGross: { type: Number, default: 0 },
    totalDeductions: { type: Number, default: 0 },
    totalNet: { type: Number, default: 0 },
    postedJournalId: String
  },
  { timestamps: true }
);

PayrollRunSchema.index({ tenantId: 1, companyId: 1, payrollPeriod: 1 }, { unique: true });

export const PayrollRunModel = mongoose.model<IPayrollRun>('PayrollRun', PayrollRunSchema);
