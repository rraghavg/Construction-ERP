import mongoose, { Schema, Document } from 'mongoose';

// Unit Type
export interface IUnitType extends Document {
  unitTypeId: string;
  tenantId: string;
  name: string;
  code: string;
  category: 'FLAT' | 'SHOP' | 'OFFICE' | 'VILLA' | 'PLOT' | 'OTHER';
  carpetArea?: number;
  builtUpArea?: number;
  superBuiltUpArea?: number;
  areaUnit?: 'SQFT' | 'SQMTR' | 'SQYD';
  status: 'active' | 'inactive';
  createdBy?: string;
  updatedBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UnitTypeSchema: Schema = new Schema(
  {
    unitTypeId: { type: String, required: true, unique: true, index: true },
    tenantId: { type: String, required: true, index: true },
    name: { type: String, required: true, trim: true },
    code: { type: String, required: true, uppercase: true, trim: true },
    category: {
      type: String,
      enum: ['FLAT', 'SHOP', 'OFFICE', 'VILLA', 'PLOT', 'OTHER'],
      default: 'FLAT',
      index: true
    },
    carpetArea: Number,
    builtUpArea: Number,
    superBuiltUpArea: Number,
    areaUnit: { type: String, enum: ['SQFT', 'SQMTR', 'SQYD'], default: 'SQFT' },
    status: { type: String, enum: ['active', 'inactive'], default: 'active', index: true },
    createdBy: String,
    updatedBy: String
  },
  { timestamps: true }
);

UnitTypeSchema.index({ tenantId: 1, code: 1 }, { unique: true });

// Unit
export interface IUnit extends Document {
  unitId: string;
  tenantId: string;
  companyId: string;
  projectId: string;
  buildingId?: string;
  towerId?: string;
  floorId: string;
  unitNumber: string;
  code: string;
  unitTypeId?: string;
  category: 'FLAT' | 'SHOP' | 'OFFICE' | 'VILLA' | 'PLOT' | 'OTHER';
  facing?: string;
  carpetArea?: number;
  builtUpArea?: number;
  superBuiltUpArea?: number;
  areaUnit: 'SQFT' | 'SQMTR' | 'SQYD';
  bedrooms?: number;
  bathrooms?: number;
  basePrice: number;
  status: 'active' | 'inactive';
  commercialStatus: 'AVAILABLE' | 'RESERVED' | 'BOOKED' | 'SOLD' | 'LEASED' | 'NOT_FOR_SALE';
  createdBy?: string;
  updatedBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UnitSchema: Schema = new Schema(
  {
    unitId: { type: String, required: true, unique: true, index: true },
    tenantId: { type: String, required: true, index: true },
    companyId: { type: String, required: true, index: true },
    projectId: { type: String, required: true, index: true },
    buildingId: { type: String, index: true },
    towerId: { type: String, index: true },
    floorId: { type: String, required: true, index: true },
    unitNumber: { type: String, required: true, trim: true },
    code: { type: String, required: true, uppercase: true, trim: true },
    unitTypeId: { type: String, index: true },
    category: {
      type: String,
      enum: ['FLAT', 'SHOP', 'OFFICE', 'VILLA', 'PLOT', 'OTHER'],
      default: 'FLAT'
    },
    facing: String,
    carpetArea: Number,
    builtUpArea: Number,
    superBuiltUpArea: Number,
    areaUnit: { type: String, enum: ['SQFT', 'SQMTR', 'SQYD'], default: 'SQFT' },
    bedrooms: Number,
    bathrooms: Number,
    basePrice: { type: Number, required: true, default: 0 },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
      index: true
    },
    commercialStatus: {
      type: String,
      enum: ['AVAILABLE', 'RESERVED', 'BOOKED', 'SOLD', 'LEASED', 'NOT_FOR_SALE'],
      default: 'AVAILABLE',
      index: true
    },
    createdBy: String,
    updatedBy: String
  },
  { timestamps: true }
);

UnitSchema.index({ tenantId: 1, projectId: 1, unitNumber: 1 }, { unique: true });
UnitSchema.index({ tenantId: 1, projectId: 1, code: 1 }, { unique: true });
UnitSchema.index({ tenantId: 1, projectId: 1, status: 1, commercialStatus: 1 });

export const UnitTypeModel = mongoose.model<IUnitType>('UnitType', UnitTypeSchema);
export const UnitModel = mongoose.model<IUnit>('Unit', UnitSchema);
