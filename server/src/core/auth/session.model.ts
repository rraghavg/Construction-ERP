import mongoose, { Schema, Document } from 'mongoose';

export interface ISession extends Document {
  sessionId: string;
  tenantId: string;
  userId: string;
  tokenHash: string;
  ipAddress: string;
  userAgent: string;
  location?: string;
  isValid: boolean;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const SessionSchema: Schema = new Schema(
  {
    sessionId: { type: String, required: true, unique: true, index: true },
    tenantId: { type: String, required: true, index: true },
    userId: { type: String, required: true, index: true },
    tokenHash: { type: String, required: true },
    ipAddress: { type: String, default: '127.0.0.1' },
    userAgent: { type: String, default: 'Unknown' },
    location: { type: String, default: 'Local' },
    isValid: { type: Boolean, default: true },
    expiresAt: { type: Date, required: true }
  },
  { timestamps: true }
);

export const SessionModel = mongoose.model<ISession>('Session', SessionSchema);
