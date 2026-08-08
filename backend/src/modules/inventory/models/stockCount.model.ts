import mongoose, { Schema, Document } from 'mongoose';

export interface ICountItem {
  itemId: string;
  systemQuantity: number;
  countedQuantity: number;
  variance: number;
  notes?: string;
}

export interface IStockCount extends Document {
  countId: string;
  tenantId: string;
  countNumber: string;
  warehouseId: string;
  countDate: Date;
  status: 'DRAFT' | 'IN_PROGRESS' | 'SUBMITTED' | 'APPROVED';
  items: ICountItem[];
  conductedBy: string;
  approvedBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

const CountItemSchema = new Schema({
  itemId: { type: String, required: true },
  systemQuantity: { type: Number, required: true },
  countedQuantity: { type: Number, required: true },
  variance: { type: Number, required: true },
  notes: String
});

const StockCountSchema: Schema = new Schema(
  {
    countId: { type: String, required: true, unique: true, index: true },
    tenantId: { type: String, required: true, index: true },
    countNumber: { type: String, required: true, index: true },
    warehouseId: { type: String, required: true, index: true },
    countDate: { type: Date, default: Date.now },
    status: { type: String, enum: ['DRAFT', 'IN_PROGRESS', 'SUBMITTED', 'APPROVED'], default: 'DRAFT' },
    items: [CountItemSchema],
    conductedBy: { type: String, required: true },
    approvedBy: String
  },
  { timestamps: true }
);

StockCountSchema.index({ tenantId: 1, countNumber: 1 }, { unique: true });

export const StockCountModel = mongoose.model<IStockCount>('StockCount', StockCountSchema);
