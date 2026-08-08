import mongoose, { Schema, Document } from 'mongoose';

export interface IEmployee extends Document {
  employeeId: string;
  tenantId: string;
  companyId: string;
  partyId?: string;
  employeeNumber: string;
  fullName: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  employmentType: 'FULL_TIME' | 'CONTRACT' | 'PART_TIME';
  joinDate: Date;
  status: 'ACTIVE' | 'ON_LEAVE' | 'TERMINATED';
  basicSalary: number;
  allowances: number;
  deductions: number;
  createdAt: Date;
  updatedAt: Date;
}

const EmployeeSchema: Schema = new Schema(
  {
    employeeId: { type: String, required: true, unique: true, index: true },
    tenantId: { type: String, required: true, index: true },
    companyId: { type: String, required: true, index: true },
    partyId: { type: String, index: true },
    employeeNumber: { type: String, required: true, index: true },
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true, index: true },
    phone: { type: String, required: true },
    department: { type: String, required: true, index: true },
    designation: { type: String, required: true },
    employmentType: { type: String, enum: ['FULL_TIME', 'CONTRACT', 'PART_TIME'], default: 'FULL_TIME' },
    joinDate: { type: Date, default: Date.now },
    status: { type: String, enum: ['ACTIVE', 'ON_LEAVE', 'TERMINATED'], default: 'ACTIVE', index: true },
    basicSalary: { type: Number, required: true, min: 0 },
    allowances: { type: Number, default: 0 },
    deductions: { type: Number, default: 0 }
  },
  { timestamps: true }
);

EmployeeSchema.index({ tenantId: 1, employeeNumber: 1 }, { unique: true });

export const EmployeeModel = mongoose.model<IEmployee>('Employee', EmployeeSchema);
