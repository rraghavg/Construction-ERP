import mongoose, { Schema, Document } from 'mongoose';

export interface IRequisitionItem {
  itemId: string;
  descriptionSnapshot: string;
  quantity: number;
  uom: string;
  estimatedRate?: number;
  estimatedAmount?: number;
  requiredByDate?: Date;
  deliveryLocation?: string;
}

export interface IPurchaseRequisition extends Document {
  requisitionId: string;
  tenantId: string;
  companyId: string;
  projectId: string;
  requisitionNumber: string;
  requestedBy: string;
  requestedAt: Date;
  requiredByDate?: Date;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  status: 'DRAFT' | 'SUBMITTED' | 'PENDING_APPROVAL' | 'APPROVED' | 'REJECTED' | 'CANCELLED' | 'PROCUREMENT_IN_PROGRESS' | 'PARTIALLY_ORDERED' | 'ORDERED' | 'CLOSED';
  purpose: string;
  notes?: string;
  items: IRequisitionItem[];
  createdAt: Date;
  updatedAt: Date;
}

const RequisitionItemSchema = new Schema({
  itemId: { type: String, required: true },
  descriptionSnapshot: { type: String, required: true },
  quantity: { type: Number, required: true, min: 0.01 },
  uom: { type: String, required: true, default: 'NOS' },
  estimatedRate: { type: Number, default: 0 },
  estimatedAmount: { type: Number, default: 0 },
  requiredByDate: Date,
  deliveryLocation: String
});

const PurchaseRequisitionSchema: Schema = new Schema(
  {
    requisitionId: { type: String, required: true, unique: true, index: true },
    tenantId: { type: String, required: true, index: true },
    companyId: { type: String, required: true, index: true },
    projectId: { type: String, required: true, index: true },
    requisitionNumber: { type: String, required: true, index: true },
    requestedBy: { type: String, required: true },
    requestedAt: { type: Date, default: Date.now },
    requiredByDate: Date,
    priority: { type: String, enum: ['LOW', 'MEDIUM', 'HIGH', 'URGENT'], default: 'MEDIUM' },
    status: {
      type: String,
      enum: ['DRAFT', 'SUBMITTED', 'PENDING_APPROVAL', 'APPROVED', 'REJECTED', 'CANCELLED', 'PROCUREMENT_IN_PROGRESS', 'PARTIALLY_ORDERED', 'ORDERED', 'CLOSED'],
      default: 'DRAFT',
      index: true
    },
    purpose: { type: String, required: true },
    notes: String,
    items: [RequisitionItemSchema]
  },
  { timestamps: true }
);

PurchaseRequisitionSchema.index({ tenantId: 1, requisitionNumber: 1 }, { unique: true });

export const PurchaseRequisitionModel = mongoose.model<IPurchaseRequisition>('PurchaseRequisition', PurchaseRequisitionSchema);
