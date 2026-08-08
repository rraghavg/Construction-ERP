import mongoose, { Schema, Document } from 'mongoose';

export interface IInventoryTransaction extends Document {
  txnId: string;
  tenantId: string;
  companyId: string;
  projectId: string;
  warehouseId: string;
  itemId: string;
  txnType: 'GRN_RECEIPT' | 'ISSUE_CONSUMPTION' | 'STOCK_TRANSFER_IN' | 'STOCK_TRANSFER_OUT' | 'RETURN_TO_STORE' | 'RETURN_TO_VENDOR' | 'STOCK_ADJUSTMENT';
  quantity: number;
  uom: string;
  unitCost: number;
  totalValue: number;
  referenceType?: string;
  referenceId?: string;
  notes?: string;
  performedBy: string;
  createdAt: Date;
}

const InventoryTransactionSchema: Schema = new Schema(
  {
    txnId: { type: String, required: true, unique: true, index: true },
    tenantId: { type: String, required: true, index: true },
    companyId: { type: String, required: true, index: true },
    projectId: { type: String, required: true, index: true },
    warehouseId: { type: String, required: true, index: true },
    itemId: { type: String, required: true, index: true },
    txnType: {
      type: String,
      enum: ['GRN_RECEIPT', 'ISSUE_CONSUMPTION', 'STOCK_TRANSFER_IN', 'STOCK_TRANSFER_OUT', 'RETURN_TO_STORE', 'RETURN_TO_VENDOR', 'STOCK_ADJUSTMENT'],
      required: true,
      index: true
    },
    quantity: { type: Number, required: true }, // positive for addition, negative for deduction
    uom: { type: String, required: true, default: 'NOS' },
    unitCost: { type: Number, default: 0 },
    totalValue: { type: Number, default: 0 },
    referenceType: String,
    referenceId: String,
    notes: String,
    performedBy: { type: String, required: true }
  },
  { timestamps: true }
);

InventoryTransactionSchema.index({ tenantId: 1, warehouseId: 1, itemId: 1 });

export const InventoryTransactionModel = mongoose.model<IInventoryTransaction>('InventoryTransaction', InventoryTransactionSchema);
