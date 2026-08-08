import mongoose, { Schema, Document } from 'mongoose';

export interface IRentSchedule extends Document {
  scheduleId: string;
  tenantId: string;
  leaseId: string;
  dueDate: Date;
  periodName: string;
  rentAmount: number;
  status: 'PENDING' | 'BILLED' | 'PAID' | 'OVERDUE';
  collectionId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const RentScheduleSchema: Schema = new Schema(
  {
    scheduleId: { type: String, required: true, unique: true, index: true },
    tenantId: { type: String, required: true, index: true },
    leaseId: { type: String, required: true, index: true },
    dueDate: { type: Date, required: true },
    periodName: { type: String, required: true },
    rentAmount: { type: Number, required: true, min: 0 },
    status: { type: String, enum: ['PENDING', 'BILLED', 'PAID', 'OVERDUE'], default: 'PENDING', index: true },
    collectionId: String
  },
  { timestamps: true }
);

RentScheduleSchema.index({ tenantId: 1, leaseId: 1, dueDate: 1 });

export const RentScheduleModel = mongoose.model<IRentSchedule>('RentSchedule', RentScheduleSchema);
