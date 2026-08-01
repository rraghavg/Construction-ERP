import mongoose, { Schema, Document } from 'mongoose';

export interface ITenant extends Document {
  tenantId: string;
  name: string;
  code: string;
  status: 'active' | 'suspended' | 'trial';
  deploymentMode: 'shared' | 'dedicated';
  contactEmail: string;
  branding?: {
    logoUrl?: string;
    theme?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const TenantSchema: Schema = new Schema(
  {
    tenantId: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true, trim: true },
    code: { type: String, required: true, uppercase: true, trim: true },
    status: { type: String, enum: ['active', 'suspended', 'trial'], default: 'active', index: true },
    deploymentMode: { type: String, enum: ['shared', 'dedicated'], default: 'shared' },
    contactEmail: { type: String, required: true, lowercase: true, trim: true },
    branding: {
      logoUrl: String,
      theme: String
    }
  },
  { timestamps: true }
);

export const TenantModel = mongoose.model<ITenant>('Tenant', TenantSchema);
