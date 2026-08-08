import mongoose, { Schema, Document } from 'mongoose';

export interface IItemMaster extends Document {
  itemId: string;
  tenantId: string;
  itemCode: string;
  name: string;
  category: string;
  uom: string;
  baseUom: string;
  trackInventory: boolean;
  minimumStock: number;
  reorderLevel: number;
  unitCost: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ItemMasterSchema: Schema = new Schema(
  {
    itemId: { type: String, required: true, unique: true, index: true },
    tenantId: { type: String, required: true, index: true },
    itemCode: { type: String, required: true, uppercase: true, trim: true },
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true, index: true },
    uom: { type: String, required: true, default: 'NOS' },
    baseUom: { type: String, required: true, default: 'NOS' },
    trackInventory: { type: Boolean, default: true },
    minimumStock: { type: Number, default: 0 },
    reorderLevel: { type: Number, default: 10 },
    unitCost: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

ItemMasterSchema.index({ tenantId: 1, itemCode: 1 }, { unique: true });

export const ItemMasterModel = mongoose.model<IItemMaster>('ItemMaster', ItemMasterSchema);
