import mongoose, { Schema, Document } from 'mongoose';

export interface IInstallmentSchedule {
  installmentNumber: number;
  milestoneName: string;
  percentage: number;
  amount: number;
  dueDate?: Date;
  status: 'PENDING' | 'DUE' | 'PARTIALLY_PAID' | 'PAID';
}

export interface IBooking extends Document {
  bookingNumber: string;
  tenantId: string;
  companyId: string;
  projectId: string;
  unitId: string;
  primaryCustomerId: string;
  coApplicantCustomerIds: string[];
  opportunityId?: string;
  quoteId?: string;
  bookingDate: Date;
  pricingSnapshot: {
    superBuiltUpArea: number;
    baseRate: number;
    baseValue: number;
    plcCharge: number;
    floorRiseCharge: number;
    parkingCharge: number;
    otherCharges: number;
    discountAmount: number;
    totalConsideration: number;
  };
  paymentPlanSchedule: IInstallmentSchedule[];
  status: 'DRAFT' | 'PENDING_APPROVAL' | 'CONFIRMED' | 'ACTIVE' | 'CANCELLED' | 'COMPLETED';
  cancellationReason?: string;
  cancelledAt?: Date;
  cancelledBy?: string;
  createdBy: string;
  updatedBy: string;
  createdAt: Date;
  updatedAt: Date;
}

const InstallmentScheduleSchema = new Schema(
  {
    installmentNumber: { type: Number, required: true },
    milestoneName: { type: String, required: true },
    percentage: { type: Number, required: true },
    amount: { type: Number, required: true },
    dueDate: Date,
    status: {
      type: String,
      enum: ['PENDING', 'DUE', 'PARTIALLY_PAID', 'PAID'],
      default: 'PENDING'
    }
  },
  { _id: false }
);

const BookingSchema: Schema = new Schema(
  {
    bookingNumber: { type: String, required: true, unique: true, index: true },
    tenantId: { type: String, required: true, index: true },
    companyId: { type: String, required: true, index: true },
    projectId: { type: String, required: true, index: true },
    unitId: { type: String, required: true, index: true },
    primaryCustomerId: { type: String, required: true, index: true },
    coApplicantCustomerIds: [{ type: String }],
    opportunityId: String,
    quoteId: String,
    bookingDate: { type: Date, default: Date.now },
    pricingSnapshot: {
      superBuiltUpArea: { type: Number, required: true },
      baseRate: { type: Number, required: true },
      baseValue: { type: Number, required: true },
      plcCharge: { type: Number, default: 0 },
      floorRiseCharge: { type: Number, default: 0 },
      parkingCharge: { type: Number, default: 0 },
      otherCharges: { type: Number, default: 0 },
      discountAmount: { type: Number, default: 0 },
      totalConsideration: { type: Number, required: true }
    },
    paymentPlanSchedule: [InstallmentScheduleSchema],
    status: {
      type: String,
      enum: ['DRAFT', 'PENDING_APPROVAL', 'CONFIRMED', 'ACTIVE', 'CANCELLED', 'COMPLETED'],
      default: 'DRAFT',
      index: true
    },
    cancellationReason: String,
    cancelledAt: Date,
    cancelledBy: String,
    createdBy: { type: String, required: true, default: 'SYSTEM' },
    updatedBy: { type: String, required: true, default: 'SYSTEM' }
  },
  { timestamps: true }
);

BookingSchema.index({ tenantId: 1, projectId: 1, status: 1 });
BookingSchema.index({ tenantId: 1, primaryCustomerId: 1 });

export const BookingModel = mongoose.model<IBooking>('Booking', BookingSchema);
