import mongoose, { Schema, Document } from 'mongoose';

export interface ICommunicationLog extends Document {
  logId: string;
  tenantId: string;
  customerId: string;
  type: string;
  message: string;
  userId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const CommunicationLogSchema: Schema = new Schema(
  {
    logId: { type: String, required: true, unique: true, index: true },
    tenantId: { type: String, required: true, index: true },
    customerId: { type: String, required: true, index: true },
    type: { type: String, required: true },
    message: { type: String, required: true },
    userId: String
  },
  { timestamps: true }
);

export const CommunicationLogModel = mongoose.model<ICommunicationLog>('CommunicationLog', CommunicationLogSchema);
