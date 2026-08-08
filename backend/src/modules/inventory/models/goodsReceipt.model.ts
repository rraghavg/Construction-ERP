import mongoose, { Schema, Document } from 'mongoose';

export interface IGrnItem {
  itemId: string;
  orderedQty: number;
  receivedQty: number;
  acceptedQty: number;
  rejectedQty: number;
  unitCost: number;
}

export interface IGoodsReceipt extends Document {
  grnId: string;
  tenantId: string;
  companyId: string;
  projectId: string;
  grnNumber: string;
  poId: string;
  vendorId: string;
  warehouseId: string;
  receivedDate: Date;
  status: 'ACCEPTED' | 'REJECTED' | 'INSPECTED';
  items: IGrnItem[];
  remarks?: string;
  receivedBy: string;
  createdAt: Date;
  updatedAt: Date;
}

const GrnItemSchema = new Schema({
  itemId: { type: String, required: true },
  orderedQty: { type: Number, required: true },
  receivedQty: { type: Number, required: true, min: 0 },
  acceptedQty: { type: Number, required: true, min: 0 },
  rejectedQty: { type: Number, default: 0 },
  unitCost: { type: Number, default: 0 }
});

const GoodsReceiptSchema: Schema = new Schema(
  {
    grnId: { type: String, required: true, unique: true, index: true },
    tenantId: { type: String, required: true, index: true },
    companyId: { type: String, required: true, index: true },
    projectId: { type: String, required: true, index: true },
    grnNumber: { type: String, required: true, index: true },
    poId: { type: String, required: true, index: true },
    vendorId: { type: String, required: true, index: true },
    warehouseId: { type: String, required: true, index: true },
    receivedDate: { type: Date, default: Date.now },
    status: { type: String, enum: ['ACCEPTED', 'REJECTED', 'INSPECTED'], default: 'ACCEPTED' },
    items: [GrnItemSchema],
    remarks: String,
    receivedBy: { type: String, required: true }
  },
  { timestamps: true }
);

GoodsReceiptSchema.index({ tenantId: 1, grnNumber: 1 }, { unique: true });

export const GoodsReceiptModel = mongoose.model<IGoodsReceipt>('GoodsReceipt', GoodsReceiptSchema);
