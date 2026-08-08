import mongoose, { Schema, Document } from 'mongoose';

export interface IStageHistory {
  fromStage: string;
  toStage: string;
  changedBy: string;
  changedAt: Date;
  reason?: string;
}

export interface IAssignmentHistory {
  fromUser?: string;
  toUser: string;
  assignedBy: string;
  assignedAt: Date;
  reason?: string;
}

export interface IOpportunity extends Document {
  opportunityNumber: string;
  tenantId: string;
  leadId: string;
  projectId: string;
  assignedTo?: string;
  pipelineId: string;
  stageId: 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'SITE_VISIT' | 'NEGOTIATION' | 'WON' | 'LOST';
  budgetMin?: number;
  budgetMax?: number;
  propertyTypeInterest?: string;
  unitTypeInterest?: string;
  configurationInterest?: string;
  purchaseTimeline?: string;
  fundingPreference?: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  stageEnteredAt: Date;
  lostReasonId?: string;
  lostNotes?: string;
  lostAt?: Date;
  status: 'ACTIVE' | 'WON' | 'LOST' | 'CONVERTED';
  stageHistory: IStageHistory[];
  assignmentHistory: IAssignmentHistory[];
  createdBy: string;
  updatedBy: string;
  createdAt: Date;
  updatedAt: Date;
}

const StageHistorySchema = new Schema(
  {
    fromStage: { type: String, required: true },
    toStage: { type: String, required: true },
    changedBy: { type: String, required: true },
    changedAt: { type: Date, default: Date.now },
    reason: String
  },
  { _id: false }
);

const AssignmentHistorySchema = new Schema(
  {
    fromUser: String,
    toUser: { type: String, required: true },
    assignedBy: { type: String, required: true },
    assignedAt: { type: Date, default: Date.now },
    reason: String
  },
  { _id: false }
);

const OpportunitySchema: Schema = new Schema(
  {
    opportunityNumber: { type: String, required: true, unique: true, index: true },
    tenantId: { type: String, required: true, index: true },
    leadId: { type: String, required: true, index: true },
    projectId: { type: String, required: true, index: true },
    assignedTo: { type: String, index: true },
    pipelineId: { type: String, default: 'STANDARD_PIPELINE' },
    stageId: {
      type: String,
      enum: ['NEW', 'CONTACTED', 'QUALIFIED', 'SITE_VISIT', 'NEGOTIATION', 'WON', 'LOST'],
      default: 'NEW',
      index: true
    },
    budgetMin: Number,
    budgetMax: Number,
    propertyTypeInterest: String,
    unitTypeInterest: String,
    configurationInterest: String,
    purchaseTimeline: String,
    fundingPreference: String,
    priority: {
      type: String,
      enum: ['LOW', 'MEDIUM', 'HIGH', 'URGENT'],
      default: 'MEDIUM',
      index: true
    },
    stageEnteredAt: { type: Date, default: Date.now },
    lostReasonId: String,
    lostNotes: String,
    lostAt: Date,
    status: {
      type: String,
      enum: ['ACTIVE', 'WON', 'LOST', 'CONVERTED'],
      default: 'ACTIVE',
      index: true
    },
    stageHistory: [StageHistorySchema],
    assignmentHistory: [AssignmentHistorySchema],
    createdBy: { type: String, required: true, default: 'SYSTEM' },
    updatedBy: { type: String, required: true, default: 'SYSTEM' }
  },
  { timestamps: true }
);

OpportunitySchema.index({ tenantId: 1, leadId: 1 });
OpportunitySchema.index({ tenantId: 1, projectId: 1, stageId: 1 });
OpportunitySchema.index({ tenantId: 1, assignedTo: 1 });

export const OpportunityModel = mongoose.model<IOpportunity>('Opportunity', OpportunitySchema);
