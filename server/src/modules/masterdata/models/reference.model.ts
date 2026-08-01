import mongoose, { Schema, Document } from 'mongoose';

// Tax Config
export interface ITax extends Document {
  taxId: string;
  tenantId: string;
  name: string;
  code: string;
  taxType: 'GST' | 'VAT' | 'SERVICE_TAX' | 'OTHER';
  rate: number;
  effectiveFrom?: Date;
  effectiveTo?: Date;
  status: 'active' | 'inactive';
}

const TaxSchema: Schema = new Schema(
  {
    taxId: { type: String, required: true, unique: true, index: true },
    tenantId: { type: String, required: true, index: true },
    name: { type: String, required: true },
    code: { type: String, required: true, uppercase: true },
    taxType: { type: String, enum: ['GST', 'VAT', 'SERVICE_TAX', 'OTHER'], default: 'GST' },
    rate: { type: Number, required: true },
    effectiveFrom: Date,
    effectiveTo: Date,
    status: { type: String, enum: ['active', 'inactive'], default: 'active' }
  },
  { timestamps: true }
);

TaxSchema.index({ tenantId: 1, code: 1 }, { unique: true });

// Payment Mode
export interface IPaymentMode extends Document {
  paymentModeId: string;
  tenantId: string;
  name: string;
  code: string;
  type: 'CASH' | 'BANK_TRANSFER' | 'CHEQUE' | 'UPI' | 'CARD' | 'OTHER';
  requiresReferenceNo: boolean;
  status: 'active' | 'inactive';
}

const PaymentModeSchema: Schema = new Schema(
  {
    paymentModeId: { type: String, required: true, unique: true, index: true },
    tenantId: { type: String, required: true, index: true },
    name: { type: String, required: true },
    code: { type: String, required: true, uppercase: true },
    type: { type: String, enum: ['CASH', 'BANK_TRANSFER', 'CHEQUE', 'UPI', 'CARD', 'OTHER'], default: 'BANK_TRANSFER' },
    requiresReferenceNo: { type: Boolean, default: true },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' }
  },
  { timestamps: true }
);

PaymentModeSchema.index({ tenantId: 1, code: 1 }, { unique: true });

// Complaint Category
export interface IComplaintCategory extends Document {
  complaintCategoryId: string;
  tenantId: string;
  name: string;
  code: string;
  defaultPriority: 'Low' | 'Medium' | 'High' | 'Critical';
  description?: string;
  status: 'active' | 'inactive';
}

const ComplaintCategorySchema: Schema = new Schema(
  {
    complaintCategoryId: { type: String, required: true, unique: true, index: true },
    tenantId: { type: String, required: true, index: true },
    name: { type: String, required: true },
    code: { type: String, required: true, uppercase: true },
    defaultPriority: { type: String, enum: ['Low', 'Medium', 'High', 'Critical'], default: 'Medium' },
    description: String,
    status: { type: String, enum: ['active', 'inactive'], default: 'active' }
  },
  { timestamps: true }
);

ComplaintCategorySchema.index({ tenantId: 1, code: 1 }, { unique: true });

export const TaxModel = mongoose.model<ITax>('Tax', TaxSchema);
export const PaymentModeModel = mongoose.model<IPaymentMode>('PaymentMode', PaymentModeSchema);
export const ComplaintCategoryModel = mongoose.model<IComplaintCategory>('ComplaintCategory', ComplaintCategorySchema);
