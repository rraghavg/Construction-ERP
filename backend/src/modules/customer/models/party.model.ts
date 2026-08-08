import mongoose, { Schema, Document } from 'mongoose';

export interface IParty extends Document {
  partyNumber: string;
  tenantId: string;
  partyType: 'INDIVIDUAL' | 'ORGANIZATION';
  displayName: string;
  primaryPhone: string;
  alternatePhone?: string;
  primaryEmail?: string;
  // Individual fields
  firstName?: string;
  middleName?: string;
  lastName?: string;
  dateOfBirth?: Date;
  gender?: string;
  // Organization fields
  legalName?: string;
  tradeName?: string;
  taxIdentifier?: string;
  status: 'ACTIVE' | 'INACTIVE';
  createdBy: string;
  updatedBy: string;
  createdAt: Date;
  updatedAt: Date;
}

const PartySchema: Schema = new Schema(
  {
    partyNumber: { type: String, required: true, unique: true, index: true },
    tenantId: { type: String, required: true, index: true },
    partyType: {
      type: String,
      enum: ['INDIVIDUAL', 'ORGANIZATION'],
      default: 'INDIVIDUAL',
      required: true,
      index: true
    },
    displayName: { type: String, required: true, trim: true, index: true },
    primaryPhone: { type: String, required: true, trim: true, index: true },
    alternatePhone: String,
    primaryEmail: { type: String, lowercase: true, trim: true, index: true },
    firstName: String,
    middleName: String,
    lastName: String,
    dateOfBirth: Date,
    gender: String,
    legalName: String,
    tradeName: String,
    taxIdentifier: String,
    status: {
      type: String,
      enum: ['ACTIVE', 'INACTIVE'],
      default: 'ACTIVE',
      index: true
    },
    createdBy: { type: String, required: true, default: 'SYSTEM' },
    updatedBy: { type: String, required: true, default: 'SYSTEM' }
  },
  { timestamps: true }
);

PartySchema.index({ tenantId: 1, primaryPhone: 1 });
PartySchema.index({ tenantId: 1, primaryEmail: 1 });

export const PartyModel = mongoose.model<IParty>('Party', PartySchema);
