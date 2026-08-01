import mongoose, { Schema, Document } from 'mongoose';

// Unit Type
export interface IUnitType extends Document {
  unitTypeId: string;
  tenantId: string;
  name: string;
  category: 'FLAT' | 'SHOP' | 'OFFICE' | 'VILLA' | 'PLOT' | 'OTHER';
  carpetArea?: number;
  builtUpArea?: number;
  superBuiltUpArea?: number;
  status: 'active' | 'inactive';
}

const UnitTypeSchema: Schema = new Schema(
  {
    unitTypeId: { type: String, required: true, unique: true, index: true },
    tenantId: { type: String, required: true, index: true },
    name: { type: String, required: true, trim: true },
    category: {
      type: String,
      enum: ['FLAT', 'SHOP', 'OFFICE', 'VILLA', 'PLOT', 'OTHER'],
      default: 'FLAT',
      index: true
    },
    carpetArea: Number,
    builtUpArea: Number,
    superBuiltUpArea: Number,
    status: { type: String, enum: ['active', 'inactive'], default: 'active' }
  },
  { timestamps: true }
);

UnitTypeSchema.index({ tenantId: 1, name: 1 }, { unique: true });

// Unit
export interface IUnit extends Document {
  unitId: string;
  tenantId: string;
  companyId: string;
  projectId: string;
  buildingId?: string;
  towerId?: string;
  floorId?: string;
  unitNumber: string;
  unitTypeId?: string;
  category: string;
  facing?: string;
  carpetArea?: number;
  superBuiltUpArea?: number;
  price: number;
  status: 'AVAILABLE' | 'BLOCKED' | 'BOOKED' | 'SOLD' | 'ON_HOLD' | 'NOT_FOR_SALE';
  createdAt: Date;
  updatedAt: Date;
}

const UnitSchema: Schema = new Schema(
  {
    unitId: { type: String, required: true, unique: true, index: true },
    tenantId: { type: String, required: true, index: true },
    companyId: { type: String, required: true, index: true },
    projectId: { type: String, required: true, index: true },
    buildingId: String,
    towerId: String,
    floorId: String,
    unitNumber: { type: String, required: true, trim: true },
    unitTypeId: String,
    category: { type: String, default: 'FLAT' },
    facing: String,
    carpetArea: Number,
    superBuiltUpArea: Number,
    price: { type: Number, required: true, default: 0 },
    status: {
      type: String,
      enum: ['AVAILABLE', 'BLOCKED', 'BOOKED', 'SOLD', 'ON_HOLD', 'NOT_FOR_SALE'],
      default: 'AVAILABLE',
      index: true
    }
  },
  { timestamps: true }
);

UnitSchema.index({ tenantId: 1, projectId: 1, unitNumber: 1 }, { unique: true });
UnitSchema.index({ tenantId: 1, projectId: 1, status: 1 });

export const UnitTypeModel = mongoose.model<IUnitType>('UnitType', UnitTypeSchema);
export const UnitModel = mongoose.model<IUnit>('Unit', UnitSchema);
