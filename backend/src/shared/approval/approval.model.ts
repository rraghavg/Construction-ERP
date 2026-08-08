import mongoose, { Schema, Document } from 'mongoose';

export interface IApprovalStep {
  order: number;
  approverType: 'ROLE' | 'USER';
  approverRoleId?: string;
  approverUserId?: string;
}

export interface IApprovalWorkflow extends Document {
  workflowId: string;
  tenantId: string;
  module: string;
  entityType: string; // e.g. 'booking', 'purchase_order', 'leave_request'
  name: string;
  isActive: boolean;
  minThresholdAmount?: number;
  steps: IApprovalStep[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IStepHistory {
  stepOrder: number;
  approverUserId: string;
  action: 'APPROVED' | 'REJECTED';
  comments?: string;
  actedAt: Date;
}

export interface IApprovalInstance extends Document {
  instanceId: string;
  tenantId: string;
  workflowId: string;
  entityType: string;
  entityId: string;
  requestedBy: string;
  currentStep: number;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  stepHistory: IStepHistory[];
  createdAt: Date;
  updatedAt: Date;
}

const ApprovalWorkflowSchema: Schema = new Schema(
  {
    workflowId: { type: String, required: true, unique: true, index: true },
    tenantId: { type: String, required: true, index: true },
    module: { type: String, required: true },
    entityType: { type: String, required: true, index: true },
    name: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    minThresholdAmount: Number,
    steps: [
      {
        order: { type: Number, required: true },
        approverType: { type: String, enum: ['ROLE', 'USER'], required: true },
        approverRoleId: String,
        approverUserId: String
      }
    ]
  },
  { timestamps: true }
);

const ApprovalInstanceSchema: Schema = new Schema(
  {
    instanceId: { type: String, required: true, unique: true, index: true },
    tenantId: { type: String, required: true, index: true },
    workflowId: { type: String, required: true, index: true },
    entityType: { type: String, required: true },
    entityId: { type: String, required: true, index: true },
    requestedBy: { type: String, required: true },
    currentStep: { type: Number, default: 1 },
    status: { type: String, enum: ['PENDING', 'APPROVED', 'REJECTED'], default: 'PENDING', index: true },
    stepHistory: [
      {
        stepOrder: Number,
        approverUserId: String,
        action: { type: String, enum: ['APPROVED', 'REJECTED'] },
        comments: String,
        actedAt: { type: Date, default: Date.now }
      }
    ]
  },
  { timestamps: true }
);

export const ApprovalWorkflowModel = mongoose.model<IApprovalWorkflow>('ApprovalWorkflow', ApprovalWorkflowSchema);
export const ApprovalInstanceModel = mongoose.model<IApprovalInstance>('ApprovalInstance', ApprovalInstanceSchema);
