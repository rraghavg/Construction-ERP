import mongoose, { Schema, Document } from 'mongoose';

export interface IProgramEnrollment extends Document {
  enrollmentId: string;
  tenantId: string;
  unitId: string;
  ownerId: string;
  programType: 'RENTAL_PROGRAM' | 'MAINTENANCE_ONLY';
  status: 'ACTIVE' | 'SUSPENDED' | 'CANCELLED';
  startDate: Date;
  endDate?: Date;
  notes?: string;
  createdBy?: string;
  updatedBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProgramEnrollmentSchema: Schema = new Schema(
  {
    enrollmentId: { type: String, required: true, unique: true, index: true },
    tenantId: { type: String, required: true, index: true },
    unitId: { type: String, required: true, index: true, ref: 'Unit' },
    ownerId: { type: String, required: true, index: true, ref: 'Customer' },
    programType: {
      type: String,
      enum: ['RENTAL_PROGRAM', 'MAINTENANCE_ONLY'],
      required: true,
      index: true
    },
    status: {
      type: String,
      enum: ['ACTIVE', 'SUSPENDED', 'CANCELLED'],
      default: 'ACTIVE',
      index: true
    },
    startDate: { type: Date, required: true, default: Date.now },
    endDate: Date,
    notes: String,
    createdBy: String,
    updatedBy: String
  },
  { timestamps: true }
);

ProgramEnrollmentSchema.index({ tenantId: 1, unitId: 1, status: 1 });
ProgramEnrollmentSchema.index({ tenantId: 1, ownerId: 1 });

export const ProgramEnrollmentModel = mongoose.model<IProgramEnrollment>('ProgramEnrollment', ProgramEnrollmentSchema);
