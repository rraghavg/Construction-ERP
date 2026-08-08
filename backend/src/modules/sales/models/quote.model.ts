import mongoose, { Schema, Document } from 'mongoose';

export interface IQuote extends Document {
  quoteNumber: string;
  tenantId: string;
  projectId: string;
  unitId: string;
  customerId: string;
  opportunityId?: string;
  priceListVersion: number;
  pricingSnapshot: {
    superBuiltUpArea: number;
    baseRate: number;
    baseValue: number;
    plcCharge: number;
    floorRiseCharge: number;
    parkingCharge: number;
    otherCharges: number;
    discountAmount: number;
    taxableSubtotal: number;
    taxAmount: number;
    totalConsideration: number;
  };
  validUntil: Date;
  status: 'DRAFT' | 'ISSUED' | 'ACCEPTED' | 'EXPIRED' | 'CANCELLED';
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

const QuoteSchema: Schema = new Schema(
  {
    quoteNumber: { type: String, required: true, unique: true, index: true },
    tenantId: { type: String, required: true, index: true },
    projectId: { type: String, required: true, index: true },
    unitId: { type: String, required: true, index: true },
    customerId: { type: String, required: true, index: true },
    opportunityId: String,
    priceListVersion: { type: Number, required: true },
    pricingSnapshot: {
      superBuiltUpArea: { type: Number, required: true },
      baseRate: { type: Number, required: true },
      baseValue: { type: Number, required: true },
      plcCharge: { type: Number, default: 0 },
      floorRiseCharge: { type: Number, default: 0 },
      parkingCharge: { type: Number, default: 0 },
      otherCharges: { type: Number, default: 0 },
      discountAmount: { type: Number, default: 0 },
      taxableSubtotal: { type: Number, required: true },
      taxAmount: { type: Number, default: 0 },
      totalConsideration: { type: Number, required: true }
    },
    validUntil: { type: Date, required: true },
    status: {
      type: String,
      enum: ['DRAFT', 'ISSUED', 'ACCEPTED', 'EXPIRED', 'CANCELLED'],
      default: 'DRAFT',
      index: true
    },
    createdBy: { type: String, required: true, default: 'SYSTEM' }
  },
  { timestamps: true }
);

QuoteSchema.index({ tenantId: 1, customerId: 1 });
QuoteSchema.index({ tenantId: 1, unitId: 1 });

export const QuoteModel = mongoose.model<IQuote>('Quote', QuoteSchema);
