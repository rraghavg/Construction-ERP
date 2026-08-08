import mongoose, { Schema, Document } from 'mongoose';

export interface IRfqItem {
  itemId: string;
  description: string;
  quantity: number;
  uom: string;
}

export interface IRFQ extends Document {
  rfqId: string;
  tenantId: string;
  companyId: string;
  projectId: string;
  rfqNumber: string;
  requisitionIds: string[];
  title: string;
  issuedDate: Date;
  submissionDeadline: Date;
  status: 'DRAFT' | 'ISSUED' | 'CLOSED' | 'CANCELLED';
  invitedVendorIds: string[];
  deliveryTerms?: string;
  paymentTerms?: string;
  items: IRfqItem[];
  attachments?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const RfqItemSchema = new Schema({
  itemId: { type: String, required: true },
  description: { type: String, required: true },
  quantity: { type: Number, required: true, min: 0.01 },
  uom: { type: String, required: true, default: 'NOS' }
});

const RFQSchema: Schema = new Schema(
  {
    rfqId: { type: String, required: true, unique: true, index: true },
    tenantId: { type: String, required: true, index: true },
    companyId: { type: String, required: true, index: true },
    projectId: { type: String, required: true, index: true },
    rfqNumber: { type: String, required: true, index: true },
    requisitionIds: [{ type: String }],
    title: { type: String, required: true },
    issuedDate: { type: Date, default: Date.now },
    submissionDeadline: { type: Date, required: true },
    status: { type: String, enum: ['DRAFT', 'ISSUED', 'CLOSED', 'CANCELLED'], default: 'DRAFT', index: true },
    invitedVendorIds: [{ type: String }],
    deliveryTerms: String,
    paymentTerms: String,
    items: [RfqItemSchema],
    attachments: [{ type: String }]
  },
  { timestamps: true }
);

RFQSchema.index({ tenantId: 1, rfqNumber: 1 }, { unique: true });

export const RFQModel = mongoose.model<IRFQ>('RFQ', RFQSchema);
