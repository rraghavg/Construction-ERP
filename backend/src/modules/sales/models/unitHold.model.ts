import mongoose, { Schema, Document } from 'mongoose';

export interface IUnitHold extends Document {
  holdNumber: string;
  tenantId: string;
  projectId: string;
  unitId: string;
  heldBy: string;
  holdExpiresAt: Date;
  reason?: string;
  status: 'ACTIVE' | 'EXPIRED' | 'RELEASED' | 'CONVERTED';
  createdAt: Date;
  updatedAt: Date;
}

const UnitHoldSchema: Schema = new Schema(
  {
    holdNumber: { type: String, required: true, unique: true, index: true },
    tenantId: { type: String, required: true, index: true },
    projectId: { type: String, required: true, index: true },
    unitId: { type: String, required: true, index: true },
    heldBy: { type: String, required: true, index: true },
    holdExpiresAt: { type: Date, required: true, index: true },
    reason: String,
    status: {
      type: String,
      enum: ['ACTIVE', 'EXPIRED', 'RELEASED', 'CONVERTED'],
      default: 'ACTIVE',
      index: true
    }
  },
  { timestamps: true }
);

UnitHoldSchema.index({ tenantId: 1, unitId: 1, status: 1 });

export const UnitHoldModel = mongoose.model<IUnitHold>('UnitHold', UnitHoldSchema);
