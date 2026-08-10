import mongoose, { Schema, Document } from 'mongoose';

export interface IApplicant extends Document {
  applicantId: string;
  tenantId: string;
  jobId: string;
  name: string;
  email: string;
  phone: string;
  resumeUrl: string;
  experience: number;
  currentCTC?: number;
  expectedCTC?: number;
  status: 'APPLIED' | 'SCREENING' | 'INTERVIEW' | 'OFFERED' | 'HIRED' | 'REJECTED';
  interviewDate?: Date;
  notes?: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

const ApplicantSchema: Schema = new Schema(
  {
    applicantId: { type: String, required: true, unique: true, index: true },
    tenantId: { type: String, required: true, index: true },
    jobId: { type: String, required: true, index: true },
    name: { type: String, required: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, required: true },
    resumeUrl: { type: String, required: true },
    experience: { type: Number, required: true },
    currentCTC: { type: Number },
    expectedCTC: { type: Number },
    status: { type: String, enum: ['APPLIED', 'SCREENING', 'INTERVIEW', 'OFFERED', 'HIRED', 'REJECTED'], default: 'APPLIED', index: true },
    interviewDate: { type: Date },
    notes: { type: String },
    createdBy: { type: String, required: true }
  },
  { timestamps: true }
);

ApplicantSchema.index({ tenantId: 1, jobId: 1, status: 1 });

export const ApplicantModel = mongoose.model<IApplicant>('Applicant', ApplicantSchema);
