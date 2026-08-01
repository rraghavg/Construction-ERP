import mongoose, { Schema, Document } from 'mongoose';

// Building
export interface IBuilding extends Document {
  buildingId: string;
  tenantId: string;
  projectId: string;
  name: string;
  code: string;
  status: 'active' | 'inactive';
  description?: string;
}

const BuildingSchema: Schema = new Schema(
  {
    buildingId: { type: String, required: true, unique: true, index: true },
    tenantId: { type: String, required: true, index: true },
    projectId: { type: String, required: true, index: true },
    name: { type: String, required: true, trim: true },
    code: { type: String, required: true, uppercase: true, trim: true },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    description: String
  },
  { timestamps: true }
);

BuildingSchema.index({ tenantId: 1, projectId: 1, code: 1 }, { unique: true });

// Tower
export interface ITower extends Document {
  towerId: string;
  tenantId: string;
  projectId: string;
  buildingId?: string;
  name: string;
  code: string;
  status: 'active' | 'inactive';
}

const TowerSchema: Schema = new Schema(
  {
    towerId: { type: String, required: true, unique: true, index: true },
    tenantId: { type: String, required: true, index: true },
    projectId: { type: String, required: true, index: true },
    buildingId: String,
    name: { type: String, required: true, trim: true },
    code: { type: String, required: true, uppercase: true, trim: true },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' }
  },
  { timestamps: true }
);

TowerSchema.index({ tenantId: 1, projectId: 1, code: 1 }, { unique: true });

// Floor
export interface IFloor extends Document {
  floorId: string;
  tenantId: string;
  projectId: string;
  towerId?: string;
  buildingId?: string;
  floorNo: number;
  name: string;
  status: 'active' | 'inactive';
}

const FloorSchema: Schema = new Schema(
  {
    floorId: { type: String, required: true, unique: true, index: true },
    tenantId: { type: String, required: true, index: true },
    projectId: { type: String, required: true, index: true },
    towerId: String,
    buildingId: String,
    floorNo: { type: Number, required: true },
    name: { type: String, required: true },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' }
  },
  { timestamps: true }
);

FloorSchema.index({ tenantId: 1, projectId: 1, floorNo: 1 });

export const BuildingModel = mongoose.model<IBuilding>('Building', BuildingSchema);
export const TowerModel = mongoose.model<ITower>('Tower', TowerSchema);
export const FloorModel = mongoose.model<IFloor>('Floor', FloorSchema);
