import mongoose, { Schema, Document } from 'mongoose';

export interface ICustomerProjectRelationship extends Document {
  tenantId: string;
  partyId: string;
  customerProfileId: string;
  projectId: string;
  relationshipType: 'PROSPECT' | 'BUYER' | 'TENANT' | 'INVESTOR';
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: Date;
  updatedAt: Date;
}

const CustomerProjectRelationshipSchema: Schema = new Schema(
  {
    tenantId: { type: String, required: true, index: true },
    partyId: { type: String, required: true, index: true },
    customerProfileId: { type: String, required: true, index: true },
    projectId: { type: String, required: true, index: true },
    relationshipType: {
      type: String,
      enum: ['PROSPECT', 'BUYER', 'TENANT', 'INVESTOR'],
      default: 'BUYER',
      index: true
    },
    status: {
      type: String,
      enum: ['ACTIVE', 'INACTIVE'],
      default: 'ACTIVE',
      index: true
    }
  },
  { timestamps: true }
);

CustomerProjectRelationshipSchema.index({ tenantId: 1, partyId: 1, projectId: 1 }, { unique: true });

export const CustomerProjectRelationshipModel = mongoose.model<ICustomerProjectRelationship>(
  'CustomerProjectRelationship',
  CustomerProjectRelationshipSchema
);
