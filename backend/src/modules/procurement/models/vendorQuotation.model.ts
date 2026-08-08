import mongoose, { Schema, Document } from 'mongoose';

export interface IQuotationItem {
  itemId: string;
  quantity: number;
  unitRate: number;
  discount?: number;
  taxRate?: number;
  netAmount: number;
}

export interface IVendorQuotation extends Document {
  quotationId: string;
  tenantId: string;
  rfqId: string;
  vendorId: string;
  quotationNumber: string;
  submissionDate: Date;
  validUntil: Date;
  status: 'SUBMITTED' | 'UNDER_EVALUATION' | 'ACCEPTED' | 'REJECTED';
  items: IQuotationItem[];
  freightCharges: number;
  totalAmount: number;
  deliveryPeriodDays?: number;
  paymentTerms?: string;
  warrantyTerms?: string;
  commercialDeviations?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const QuotationItemSchema = new Schema({
  itemId: { type: String, required: true },
  quantity: { type: Number, required: true, min: 0.01 },
  unitRate: { type: Number, required: true, min: 0 },
  discount: { type: Number, default: 0 },
  taxRate: { type: Number, default: 18 },
  netAmount: { type: Number, required: true }
});

const VendorQuotationSchema: Schema = new Schema(
  {
    quotationId: { type: String, required: true, unique: true, index: true },
    tenantId: { type: String, required: true, index: true },
    rfqId: { type: String, required: true, index: true },
    vendorId: { type: String, required: true, index: true },
    quotationNumber: { type: String, required: true },
    submissionDate: { type: Date, default: Date.now },
    validUntil: { type: Date, required: true },
    status: { type: String, enum: ['SUBMITTED', 'UNDER_EVALUATION', 'ACCEPTED', 'REJECTED'], default: 'SUBMITTED', index: true },
    items: [QuotationItemSchema],
    freightCharges: { type: Number, default: 0 },
    totalAmount: { type: Number, required: true },
    deliveryPeriodDays: Number,
    paymentTerms: String,
    warrantyTerms: String,
    commercialDeviations: String,
    notes: String
  },
  { timestamps: true }
);

VendorQuotationSchema.index({ tenantId: 1, rfqId: 1, vendorId: 1 }, { unique: true });

export const VendorQuotationModel = mongoose.model<IVendorQuotation>('VendorQuotation', VendorQuotationSchema);
