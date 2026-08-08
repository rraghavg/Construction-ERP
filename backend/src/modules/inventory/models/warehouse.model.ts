import mongoose, { Schema, Document } from 'mongoose';

export interface IWarehouse extends Document {
  warehouseId: string;
  tenantId: string;
  companyId: string;
  projectId: string;
  code: string;
  name: string;
  type: 'MAIN_SITE' | 'STORE' | 'CENTRAL_DEPOT';
  location: string;
  managerName: string;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: Date;
  updatedAt: Date;
}

const WarehouseSchema: Schema = new Schema(
  {
    warehouseId: { type: String, required: true, unique: true, index: true },
    tenantId: { type: String, required: true, index: true },
    companyId: { type: String, required: true, index: true },
    projectId: { type: String, required: true, index: true },
    code: { type: String, required: true, uppercase: true, trim: true },
    name: { type: String, required: true, trim: true },
    type: { type: String, enum: ['MAIN_SITE', 'STORE', 'CENTRAL_DEPOT'], default: 'STORE' },
    location: { type: String, required: true },
    managerName: { type: String, default: 'Warehouse Manager' },
    status: { type: String, enum: ['ACTIVE', 'INACTIVE'], default: 'ACTIVE' }
  },
  { timestamps: true }
);

WarehouseSchema.index({ tenantId: 1, code: 1 }, { unique: true });

export const WarehouseModel = mongoose.model<IWarehouse>('Warehouse', WarehouseSchema);
