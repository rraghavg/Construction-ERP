import mongoose, { Schema, Document } from 'mongoose';

export interface IAttendance extends Document {
  attendanceId: string;
  tenantId: string;
  employeeId: string;
  date: Date;
  status: 'PRESENT' | 'ABSENT' | 'HALF_DAY' | 'ON_LEAVE' | 'HOLIDAY';
  checkInTime?: string;
  checkOutTime?: string;
  workHours: number;
  remarks?: string;
  createdAt: Date;
}

const AttendanceSchema: Schema = new Schema(
  {
    attendanceId: { type: String, required: true, unique: true, index: true },
    tenantId: { type: String, required: true, index: true },
    employeeId: { type: String, required: true, index: true },
    date: { type: Date, required: true, index: true },
    status: { type: String, enum: ['PRESENT', 'ABSENT', 'HALF_DAY', 'ON_LEAVE', 'HOLIDAY'], default: 'PRESENT' },
    checkInTime: String,
    checkOutTime: String,
    workHours: { type: Number, default: 8 },
    remarks: String
  },
  { timestamps: true }
);

AttendanceSchema.index({ tenantId: 1, employeeId: 1, date: 1 }, { unique: true });

export const AttendanceModel = mongoose.model<IAttendance>('Attendance', AttendanceSchema);
