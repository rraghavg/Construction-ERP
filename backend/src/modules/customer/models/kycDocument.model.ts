import mongoose, { Schema, Document } from 'mongoose';

export interface IKycDocument extends Document {
  tenantId: string;
  partyId: string;
  documentType: 'PAN' | 'AADHAAR' | 'PASSPORT' | 'DRIVING_LICENSE' | 'OTHER';
  documentNumber: string;
  issueDate?: Date;
  expiryDate?: Date;
  verificationStatus: 'PENDING' | 'VERIFIED' | 'REJECTED' | 'EXPIRED';
  verifiedBy?: string;
  verifiedAt?: Date;
  rejectionReason?: string;
  attachmentUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const KycDocumentSchema: Schema = new Schema(
  {
    tenantId: { type: String, required: true, index: true },
    partyId: { type: String, required: true, index: true },
    documentType: {
      type: String,
      enum: ['PAN', 'AADHAAR', 'PASSPORT', 'DRIVING_LICENSE', 'OTHER'],
      required: true,
      index: true
    },
    documentNumber: { type: String, required: true, trim: true, uppercase: true },
    issueDate: Date,
    expiryDate: Date,
    verificationStatus: {
      type: String,
      enum: ['PENDING', 'VERIFIED', 'REJECTED', 'EXPIRED'],
      default: 'PENDING',
      index: true
    },
    verifiedBy: String,
    verifiedAt: Date,
    rejectionReason: String,
    attachmentUrl: String
  },
  { timestamps: true }
);

KycDocumentSchema.index({ tenantId: 1, partyId: 1, documentType: 1 }, { unique: true });

export const KycDocumentModel = mongoose.model<IKycDocument>('KycDocument', KycDocumentSchema);
