import mongoose, { Schema, Document } from 'mongoose';

export interface IDepartment extends Document {
  departmentId: string;
  tenantId: string;
  companyId: string;
  code: string;
  name: string;
  headEmployeeId?: string;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: Date;
  updatedAt: Date;
}

const DepartmentSchema: Schema = new Schema(
  {
    departmentId: { type: String, required: true, unique: true, index: true },
    tenantId: { type: String, required: true, index: true },
    companyId: { type: String, required: true, index: true },
    code: { type: String, required: true, uppercase: true, trim: true },
    name: { type: String, required: true, trim: true },
    headEmployeeId: String,
    status: { type: String, enum: ['ACTIVE', 'INACTIVE'], default: 'ACTIVE' }
  },
  { timestamps: true }
);

DepartmentSchema.index({ tenantId: 1, code: 1 }, { unique: true });

export const DepartmentModel = mongoose.model<IDepartment>('Department', DepartmentSchema);
