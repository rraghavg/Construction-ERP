import mongoose, { Schema, Document } from 'mongoose';

export interface ICrmReference extends Document {
  tenantId: string;
  type: 'SOURCE' | 'LOST_REASON' | 'PRIORITY' | 'PIPELINE_STAGE';
  code: string;
  name: string;
  description?: string;
  order: number;
  isActive: boolean;
  meta?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

const CrmReferenceSchema: Schema = new Schema(
  {
    tenantId: { type: String, required: true, index: true },
    type: {
      type: String,
      enum: ['SOURCE', 'LOST_REASON', 'PRIORITY', 'PIPELINE_STAGE'],
      required: true,
      index: true
    },
    code: { type: String, required: true, trim: true, uppercase: true },
    name: { type: String, required: true, trim: true },
    description: String,
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true, index: true },
    meta: { type: Schema.Types.Mixed, default: {} }
  },
  { timestamps: true }
);

CrmReferenceSchema.index({ tenantId: 1, type: 1, code: 1 }, { unique: true });

export const CrmReferenceModel = mongoose.model<ICrmReference>('CrmReference', CrmReferenceSchema);
