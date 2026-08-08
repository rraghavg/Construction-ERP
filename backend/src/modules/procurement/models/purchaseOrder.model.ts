import mongoose, { Schema, Document } from 'mongoose';

export interface IPOItem {
  itemId: string;
  description: string;
  quantity: number;
  uom: string;
  unitRate: number;
  taxAmount: number;
  discountAmount: number;
  netAmount: number;
  receivedQuantity: number;
}

export interface IPurchaseOrder extends Document {
  poId: string;
  tenantId: string;
  companyId: string;
  projectId: string;
  poNumber: string;
  vendorId: string;
  quotationId?: string;
  requisitionId?: string;
  poDate: Date;
  deliveryDate: Date;
  status: 'DRAFT' | 'PENDING_APPROVAL' | 'APPROVED' | 'ISSUED' | 'PARTIALLY_RECEIVED' | 'RECEIVED' | 'CANCELLED' | 'AMENDED' | 'CLOSED';
  items: IPOItem[];
  subtotal: number;
  taxTotal: number;
  grandTotal: number;
  currency: string;
  paymentTerms: string;
  deliveryLocation: string;
  termsAndConditions?: string;
  amendmentVersion: number;
  createdAt: Date;
  updatedAt: Date;
}

const POItemSchema = new Schema({
  itemId: { type: String, required: true },
  description: { type: String, required: true },
  quantity: { type: Number, required: true, min: 0.01 },
  uom: { type: String, required: true, default: 'NOS' },
  unitRate: { type: Number, required: true, min: 0 },
  taxAmount: { type: Number, default: 0 },
  discountAmount: { type: Number, default: 0 },
  netAmount: { type: Number, required: true },
  receivedQuantity: { type: Number, default: 0 }
});

const PurchaseOrderSchema: Schema = new Schema(
  {
    poId: { type: String, required: true, unique: true, index: true },
    tenantId: { type: String, required: true, index: true },
    companyId: { type: String, required: true, index: true },
    projectId: { type: String, required: true, index: true },
    poNumber: { type: String, required: true, index: true },
    vendorId: { type: String, required: true, index: true },
    quotationId: String,
    requisitionId: String,
    poDate: { type: Date, default: Date.now },
    deliveryDate: { type: Date, required: true },
    status: {
      type: String,
      enum: ['DRAFT', 'PENDING_APPROVAL', 'APPROVED', 'ISSUED', 'PARTIALLY_RECEIVED', 'RECEIVED', 'CANCELLED', 'AMENDED', 'CLOSED'],
      default: 'DRAFT',
      index: true
    },
    items: [POItemSchema],
    subtotal: { type: Number, required: true },
    taxTotal: { type: Number, default: 0 },
    grandTotal: { type: Number, required: true },
    currency: { type: String, default: 'INR' },
    paymentTerms: { type: String, default: 'NET_30' },
    deliveryLocation: { type: String, required: true },
    termsAndConditions: String,
    amendmentVersion: { type: Number, default: 1 }
  },
  { timestamps: true }
);

PurchaseOrderSchema.index({ tenantId: 1, poNumber: 1 }, { unique: true });

export const PurchaseOrderModel = mongoose.model<IPurchaseOrder>('PurchaseOrder', PurchaseOrderSchema);
