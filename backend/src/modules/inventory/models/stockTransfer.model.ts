import mongoose, { Schema, Document } from 'mongoose';

export interface ITransferItem {
  itemId: string;
  quantity: number;
  uom: string;
}

export interface IStockTransfer extends Document {
  transferId: string;
  tenantId: string;
  transferNumber: string;
  fromWarehouseId: string;
  toWarehouseId: string;
  status: 'INITIATED' | 'IN_TRANSIT' | 'COMPLETED' | 'CANCELLED';
  items: ITransferItem[];
  transferredBy: string;
  receivedBy?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const TransferItemSchema = new Schema({
  itemId: { type: String, required: true },
  quantity: { type: Number, required: true, min: 0.01 },
  uom: { type: String, required: true, default: 'NOS' }
});

const StockTransferSchema: Schema = new Schema(
  {
    transferId: { type: String, required: true, unique: true, index: true },
    tenantId: { type: String, required: true, index: true },
    transferNumber: { type: String, required: true, index: true },
    fromWarehouseId: { type: String, required: true, index: true },
    toWarehouseId: { type: String, required: true, index: true },
    status: { type: String, enum: ['INITIATED', 'IN_TRANSIT', 'COMPLETED', 'CANCELLED'], default: 'INITIATED' },
    items: [TransferItemSchema],
    transferredBy: { type: String, required: true },
    receivedBy: String,
    notes: String
  },
  { timestamps: true }
);

StockTransferSchema.index({ tenantId: 1, transferNumber: 1 }, { unique: true });

export const StockTransferModel = mongoose.model<IStockTransfer>('StockTransfer', StockTransferSchema);
