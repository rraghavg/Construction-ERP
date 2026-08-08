import mongoose, { Schema, Document } from 'mongoose';

export interface ILeaveRequest extends Document {
  leaveRequestId: string;
  tenantId: string;
  employeeId: string;
  leaveType: 'CASUAL' | 'SICK' | 'EARNED' | 'MATERNITY';
  startDate: Date;
  endDate: Date;
  totalDays: number;
  status: 'SUBMITTED' | 'APPROVED' | 'REJECTED' | 'CANCELLED';
  reason: string;
  approvedBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

const LeaveRequestSchema: Schema = new Schema(
  {
    leaveRequestId: { type: String, required: true, unique: true, index: true },
    tenantId: { type: String, required: true, index: true },
    employeeId: { type: String, required: true, index: true },
    leaveType: { type: String, enum: ['CASUAL', 'SICK', 'EARNED', 'MATERNITY'], default: 'CASUAL' },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    totalDays: { type: Number, required: true, min: 0.5 },
    status: { type: String, enum: ['SUBMITTED', 'APPROVED', 'REJECTED', 'CANCELLED'], default: 'SUBMITTED', index: true },
    reason: { type: String, required: true },
    approvedBy: String
  },
  { timestamps: true }
);

LeaveRequestSchema.index({ tenantId: 1, leaveRequestId: 1 }, { unique: true });

export const LeaveRequestModel = mongoose.model<ILeaveRequest>('LeaveRequest', LeaveRequestSchema);
