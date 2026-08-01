import mongoose, { Schema, Document } from 'mongoose';
import crypto from 'crypto';

export interface IAuditEvent extends Document {
  auditId: string;
  tenantId: string;
  actorUserId: string;
  module: string;
  action: string;
  recordType?: string;
  recordId?: string;
  beforeState?: Record<string, any>;
  afterState?: Record<string, any>;
  ipAddress?: string;
  deviceInfo?: Record<string, any>;
  status: 'success' | 'failed';
  severity: 'low' | 'medium' | 'high' | 'critical';
  checksum: string;
  prevChecksum: string;
  createdAt: Date;
}

const AuditEventSchema: Schema = new Schema(
  {
    auditId: { type: String, required: true, unique: true, index: true },
    tenantId: { type: String, required: true, index: true },
    actorUserId: { type: String, required: true, index: true },
    module: { type: String, required: true, index: true },
    action: { type: String, required: true },
    recordType: String,
    recordId: String,
    beforeState: Object,
    afterState: Object,
    ipAddress: { type: String, default: '127.0.0.1' },
    deviceInfo: Object,
    status: { type: String, enum: ['success', 'failed'], default: 'success' },
    severity: { type: String, enum: ['low', 'medium', 'high', 'critical'], default: 'low', index: true },
    checksum: { type: String, required: true },
    prevChecksum: { type: String, default: 'GENESIS' }
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

AuditEventSchema.index({ tenantId: 1, createdAt: -1 });

export const AuditEventModel = mongoose.model<IAuditEvent>('AuditEvent', AuditEventSchema);

export interface AuditEventInput {
  tenantId: string;
  actorUserId: string;
  module: string;
  action: string;
  recordType?: string;
  recordId?: string;
  beforeState?: Record<string, any>;
  afterState?: Record<string, any>;
  ipAddress?: string;
  deviceInfo?: Record<string, any>;
  status?: 'success' | 'failed';
  severity?: 'low' | 'medium' | 'high' | 'critical';
}

export const logAuditEvent = async (event: AuditEventInput) => {
  try {
    const lastEvent = await AuditEventModel.findOne({ tenantId: event.tenantId }).sort({ createdAt: -1 });
    const prevChecksum = lastEvent ? lastEvent.checksum : 'GENESIS';
    const auditId = `AUD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    const payloadToHash = `${auditId}:${event.tenantId}:${event.actorUserId}:${event.module}:${event.action}:${prevChecksum}`;
    const checksum = crypto.createHash('sha256').update(payloadToHash).digest('hex');

    return await AuditEventModel.create({
      ...event,
      auditId,
      checksum,
      prevChecksum
    });
  } catch (err) {
    console.error('[Audit Log Error]: Failed to write append-only audit event:', err);
    return null;
  }
};
