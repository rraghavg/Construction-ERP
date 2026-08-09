import mongoose, { Schema, Document } from 'mongoose';

// Building
export interface IBuilding extends Document {
  buildingId: string;
  tenantId: string;
  projectId: string;
  name: string;
  code: string;
  plannedFloors?: number;
  plannedUnits?: number;
  status: 'active' | 'inactive';
  description?: string;
  createdBy?: string;
  updatedBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

const BuildingSchema: Schema = new Schema(
  {
    buildingId: { type: String, required: true, unique: true, index: true },
    tenantId: { type: String, required: true, index: true },
    projectId: { type: String, required: true, index: true },
    name: { type: String, required: true, trim: true },
    code: { type: String, required: true, uppercase: true, trim: true },
    plannedFloors: Number,
    plannedUnits: Number,
    status: { type: String, enum: ['active', 'inactive'], default: 'active', index: true },
    description: String,
    createdBy: String,
    updatedBy: String
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
  plannedFloors?: number;
  plannedUnits?: number;
  status: 'active' | 'inactive';
  description?: string;
  createdBy?: string;
  updatedBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

const TowerSchema: Schema = new Schema(
  {
    towerId: { type: String, required: true, unique: true, index: true },
    tenantId: { type: String, required: true, index: true },
    projectId: { type: String, required: true, index: true },
    buildingId: { type: String, index: true },
    name: { type: String, required: true, trim: true },
    code: { type: String, required: true, uppercase: true, trim: true },
    plannedFloors: Number,
    plannedUnits: Number,
    status: { type: String, enum: ['active', 'inactive'], default: 'active', index: true },
    description: String,
    createdBy: String,
    updatedBy: String
  },
  { timestamps: true }
);

TowerSchema.index({ tenantId: 1, projectId: 1, code: 1 }, { unique: true });

// Floor
export interface IFloor extends Document {
  floorId: string;
  tenantId: string;
  projectId: string;
  parentType: 'PROJECT' | 'BUILDING' | 'TOWER';
  towerId?: string;
  buildingId?: string;
  levelNumber?: number;
  displayOrder?: number;
  floorNo: number;
  code?: string;
  name: string;
  floorType?: 'RESIDENTIAL' | 'COMMERCIAL' | 'PARKING' | 'BASEMENT' | 'SERVICE' | 'AMENITY' | 'OTHER';
  plannedUnits?: number;
  status: 'active' | 'inactive';
  createdBy?: string;
  updatedBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

const FloorSchema: Schema = new Schema(
  {
    floorId: { type: String, required: true, unique: true, index: true },
    tenantId: { type: String, required: true, index: true },
    projectId: { type: String, required: true, index: true },
    parentType: { type: String, enum: ['PROJECT', 'BUILDING', 'TOWER'], required: true, index: true },
    towerId: { type: String, index: true },
    buildingId: { type: String, index: true },
    levelNumber: Number,
    displayOrder: Number,
    floorNo: { type: Number, required: true },
    code: { type: String, uppercase: true, trim: true },
    name: { type: String, required: true, trim: true },
    floorType: {
      type: String,
      enum: ['RESIDENTIAL', 'COMMERCIAL', 'PARKING', 'BASEMENT', 'SERVICE', 'AMENITY', 'OTHER'],
      default: 'RESIDENTIAL'
    },
    plannedUnits: Number,
    status: { type: String, enum: ['active', 'inactive'], default: 'active', index: true },
    createdBy: String,
    updatedBy: String
  },
  { timestamps: true }
);

FloorSchema.index({ tenantId: 1, projectId: 1, parentType: 1, buildingId: 1, towerId: 1, code: 1 }, { unique: true });

export const BuildingModel = mongoose.model<IBuilding>('Building', BuildingSchema);
export const TowerModel = mongoose.model<ITower>('Tower', TowerSchema);
export const FloorModel = mongoose.model<IFloor>('Floor', FloorSchema);
