import mongoose, { Schema, Document } from 'mongoose';

export interface IProcurementReference extends Document {
  tenantId: string;
  categoryType: 'PURCHASE_TYPE' | 'REQUISITION_TYPE' | 'PAYMENT_TERMS' | 'DELIVERY_TERMS' | 'REJECTION_REASON';
  code: string;
  label: string;
  description?: string;
  isActive: boolean;
}

const ProcurementReferenceSchema: Schema = new Schema(
  {
    tenantId: { type: String, required: true, index: true },
    categoryType: {
      type: String,
      enum: ['PURCHASE_TYPE', 'REQUISITION_TYPE', 'PAYMENT_TERMS', 'DELIVERY_TERMS', 'REJECTION_REASON'],
      required: true,
      index: true
    },
    code: { type: String, required: true, uppercase: true, trim: true },
    label: { type: String, required: true, trim: true },
    description: { type: String },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

ProcurementReferenceSchema.index({ tenantId: 1, categoryType: 1, code: 1 }, { unique: true });

export const ProcurementReferenceModel = mongoose.model<IProcurementReference>('ProcurementReference', ProcurementReferenceSchema);
