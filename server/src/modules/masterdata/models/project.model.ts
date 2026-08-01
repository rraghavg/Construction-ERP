import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  projectId: string;
  tenantId: string;
  companyId: string;
  name: string;
  code: string;
  city?: string;
  address?: string;
  startDate?: Date;
  endDate?: Date;
  status: 'PLANNED' | 'ACTIVE' | 'ON_HOLD' | 'COMPLETED' | 'CANCELLED';
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema: Schema = new Schema(
  {
    projectId: { type: String, required: true, unique: true, index: true },
    tenantId: { type: String, required: true, index: true },
    companyId: { type: String, required: true, index: true },
    name: { type: String, required: true, trim: true },
    code: { type: String, required: true, uppercase: true, trim: true },
    city: String,
    address: String,
    startDate: Date,
    endDate: Date,
    status: {
      type: String,
      enum: ['PLANNED', 'ACTIVE', 'ON_HOLD', 'COMPLETED', 'CANCELLED'],
      default: 'ACTIVE',
      index: true
    },
    description: String
  },
  { timestamps: true }
);

ProjectSchema.index({ tenantId: 1, code: 1 }, { unique: true });
ProjectSchema.index({ tenantId: 1, companyId: 1, status: 1 });

export const ProjectModel = mongoose.model<IProject>('Project', ProjectSchema);
