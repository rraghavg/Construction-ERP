import mongoose, { Schema, Document } from 'mongoose';

export interface IMaintenanceRequest extends Document {
  requestId: string;
  tenantId: string;
  companyId: string;
  projectId: string;
  requestNumber: string;
  assetId?: string;
  reportedBy: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'EMERGENCY';
  category: string;
  description: string;
  status: 'SUBMITTED' | 'ASSIGNED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  createdAt: Date;
  updatedAt: Date;
}

const MaintenanceRequestSchema: Schema = new Schema(
  {
    requestId: { type: String, required: true, unique: true, index: true },
    tenantId: { type: String, required: true, index: true },
    companyId: { type: String, required: true, index: true },
    projectId: { type: String, required: true, index: true },
    requestNumber: { type: String, required: true, index: true },
    assetId: String,
    reportedBy: { type: String, required: true },
    priority: { type: String, enum: ['LOW', 'MEDIUM', 'HIGH', 'EMERGENCY'], default: 'MEDIUM' },
    category: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ['SUBMITTED', 'ASSIGNED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'], default: 'SUBMITTED', index: true }
  },
  { timestamps: true }
);

MaintenanceRequestSchema.index({ tenantId: 1, requestNumber: 1 }, { unique: true });

export const MaintenanceRequestModel = mongoose.model<IMaintenanceRequest>('MaintenanceRequest', MaintenanceRequestSchema);
