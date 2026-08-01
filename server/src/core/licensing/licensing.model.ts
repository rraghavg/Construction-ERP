import mongoose, { Schema, Document } from 'mongoose';

export interface IModuleRegistry extends Document {
  moduleKey: string;
  name: string;
  description: string;
  category: string;
  isCore: boolean;
  version: string;
}

export interface ITenantModule extends Document {
  tenantId: string;
  moduleKey: string;
  isEnabled: boolean;
  expiresAt?: Date;
  customConfig?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

const ModuleRegistrySchema: Schema = new Schema(
  {
    moduleKey: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    description: String,
    category: { type: String, default: 'business' },
    isCore: { type: Boolean, default: false },
    version: { type: String, default: '1.0.0' }
  },
  { timestamps: true }
);

const TenantModuleSchema: Schema = new Schema(
  {
    tenantId: { type: String, required: true, index: true },
    moduleKey: { type: String, required: true, index: true },
    isEnabled: { type: Boolean, default: true },
    expiresAt: Date,
    customConfig: Object
  },
  { timestamps: true }
);

TenantModuleSchema.index({ tenantId: 1, moduleKey: 1 }, { unique: true });

export const ModuleRegistryModel = mongoose.model<IModuleRegistry>('ModuleRegistry', ModuleRegistrySchema);
export const TenantModuleModel = mongoose.model<ITenantModule>('TenantModule', TenantModuleSchema);
