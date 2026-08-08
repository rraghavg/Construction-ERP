import mongoose, { Schema, Document } from 'mongoose';

export interface IWorkOrder extends Document {
  workOrderId: string;
  tenantId: string;
  companyId: string;
  projectId: string;
  workOrderNumber: string;
  requestId: string;
  assetId?: string;
  assignedTechnician?: string;
  vendorId?: string;
  scheduledDate: Date;
  startDate?: Date;
  completionDate?: Date;
  laborCost: number;
  sparePartsCost: number;
  totalCost: number;
  status: 'ASSIGNED' | 'IN_PROGRESS' | 'ON_HOLD' | 'COMPLETED' | 'CLOSED';
  createdAt: Date;
  updatedAt: Date;
}

const WorkOrderSchema: Schema = new Schema(
  {
    workOrderId: { type: String, required: true, unique: true, index: true },
    tenantId: { type: String, required: true, index: true },
    companyId: { type: String, required: true, index: true },
    projectId: { type: String, required: true, index: true },
    workOrderNumber: { type: String, required: true, index: true },
    requestId: { type: String, required: true, index: true },
    assetId: String,
    assignedTechnician: String,
    vendorId: String,
    scheduledDate: { type: Date, default: Date.now },
    startDate: Date,
    completionDate: Date,
    laborCost: { type: Number, default: 0 },
    sparePartsCost: { type: Number, default: 0 },
    totalCost: { type: Number, default: 0 },
    status: { type: String, enum: ['ASSIGNED', 'IN_PROGRESS', 'ON_HOLD', 'COMPLETED', 'CLOSED'], default: 'ASSIGNED', index: true }
  },
  { timestamps: true }
);

WorkOrderSchema.index({ tenantId: 1, workOrderNumber: 1 }, { unique: true });

export const WorkOrderModel = mongoose.model<IWorkOrder>('WorkOrder', WorkOrderSchema);
