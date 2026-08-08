import mongoose, { Schema, Document } from 'mongoose';

export interface IProjectStructureConfig {
  buildingEnabled: boolean;
  towerEnabled: boolean;
  towerRequiresBuilding: boolean;
  floorEnabled: boolean;
}

export interface IProject extends Document {
  projectId: string;
  tenantId: string;
  companyId: string;
  name: string;
  code: string;
  city?: string;
  address?: string;
  reraRegistrationNo?: string;
  totalLandArea?: number;
  startDate?: Date;
  endDate?: Date;
  status: 'PLANNING' | 'ACTIVE' | 'ON_HOLD' | 'COMPLETED' | 'INACTIVE';
  statusBeforeInactive?: 'PLANNING' | 'ACTIVE' | 'ON_HOLD' | 'COMPLETED';
  structureConfig: IProjectStructureConfig;
  description?: string;
  createdBy?: string;
  updatedBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema: Schema = new Schema(
  {
    projectId: { type: String, required: true, unique: true, index: true },
    tenantId: { type: String, required: true, index: true },
    companyId: { type: String, required: true, index: true },
    name: { type: String, required: true, trim: true },
    code: { type: String, required: true, uppercase: true, trim: true },
    city: String,
    address: String,
    reraRegistrationNo: { type: String, trim: true },
    totalLandArea: Number,
    startDate: Date,
    endDate: Date,
    status: {
      type: String,
      enum: ['PLANNING', 'ACTIVE', 'ON_HOLD', 'COMPLETED', 'INACTIVE'],
      default: 'PLANNING',
      index: true
    },
    statusBeforeInactive: {
      type: String,
      enum: ['PLANNING', 'ACTIVE', 'ON_HOLD', 'COMPLETED']
    },
    structureConfig: {
      buildingEnabled: { type: Boolean, default: true },
      towerEnabled: { type: Boolean, default: true },
      towerRequiresBuilding: { type: Boolean, default: false },
      floorEnabled: { type: Boolean, default: true }
    },
    description: String,
    createdBy: String,
    updatedBy: String
  },
  { timestamps: true }
);

ProjectSchema.index({ tenantId: 1, code: 1 }, { unique: true });
ProjectSchema.index({ tenantId: 1, companyId: 1, status: 1 });

export const ProjectModel = mongoose.model<IProject>('Project', ProjectSchema);
