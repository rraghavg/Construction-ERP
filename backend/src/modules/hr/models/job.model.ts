import mongoose, { Schema, Document } from 'mongoose';

export interface IJob extends Document {
  jobId: string;
  tenantId: string;
  title: string;
  department: string;
  location: string;
  type: 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'INTERN';
  description: string;
  requirements: string;
  salaryRange: {
    min: number;
    max: number;
  };
  positions: number;
  status: 'OPEN' | 'CLOSED' | 'ON_HOLD';
  postedDate: Date;
  closingDate?: Date;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

const JobSchema: Schema = new Schema(
  {
    jobId: { type: String, required: true, unique: true, index: true },
    tenantId: { type: String, required: true, index: true },
    title: { type: String, required: true },
    department: { type: String, required: true },
    location: { type: String, required: true },
    type: { type: String, enum: ['FULL_TIME', 'PART_TIME', 'CONTRACT', 'INTERN'], required: true },
    description: { type: String, required: true },
    requirements: { type: String, required: true },
    salaryRange: {
      min: { type: Number, required: true },
      max: { type: Number, required: true }
    },
    positions: { type: Number, required: true, min: 1 },
    status: { type: String, enum: ['OPEN', 'CLOSED', 'ON_HOLD'], default: 'OPEN', index: true },
    postedDate: { type: Date, default: Date.now },
    closingDate: { type: Date },
    createdBy: { type: String, required: true }
  },
  { timestamps: true }
);

JobSchema.index({ tenantId: 1, department: 1 });

export const JobModel = mongoose.model<IJob>('Job', JobSchema);
