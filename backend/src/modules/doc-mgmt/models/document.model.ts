import mongoose, { Schema, Document } from 'mongoose';

export interface IDocument extends Document {
  documentId: string;
  tenantId: string;
  title: string;
  description?: string;
  category: 'ARCHITECTURAL_PLAN' | 'CONTRACT' | 'LEGAL' | 'CLIENT_FILE' | 'FINANCIAL' | 'HR' | 'OTHER';
  fileUrl: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  projectId?: string;
  unitId?: string;
  customerId?: string;
  uploadedBy: string;
  tags: string[];
  version: number;
  status: 'ACTIVE' | 'ARCHIVED';
  createdAt: Date;
  updatedAt: Date;
}

const DocumentSchema: Schema = new Schema({
  documentId: { type: String, required: true, unique: true },
  tenantId: { type: String, required: true, index: true },
  title: { type: String, required: true },
  description: { type: String },
  category: { 
    type: String, 
    required: true, 
    enum: ['ARCHITECTURAL_PLAN', 'CONTRACT', 'LEGAL', 'CLIENT_FILE', 'FINANCIAL', 'HR', 'OTHER'] 
  },
  fileUrl: { type: String, required: true },
  fileName: { type: String, required: true },
  fileSize: { type: Number, required: true },
  mimeType: { type: String, required: true },
  projectId: { type: String },
  unitId: { type: String },
  customerId: { type: String },
  uploadedBy: { type: String, required: true },
  tags: { type: [String], default: [] },
  version: { type: Number, default: 1 },
  status: { type: String, enum: ['ACTIVE', 'ARCHIVED'], default: 'ACTIVE' }
}, { timestamps: true });

DocumentSchema.index({ tenantId: 1, documentId: 1 });
DocumentSchema.index({ tenantId: 1, category: 1 });
DocumentSchema.index({ tenantId: 1, status: 1 });

export const DocumentModel = mongoose.model<IDocument>('Document', DocumentSchema);
