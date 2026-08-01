import mongoose, { Schema, Document } from 'mongoose';

export interface IRole extends Document {
  tenantId: string;
  roleKey: string;
  name: string;
  description?: string;
  permissions: string[]; // e.g. ['sales.booking.view', 'sales.booking.create']
  isSystemRole: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const RoleSchema: Schema = new Schema(
  {
    tenantId: { type: String, required: true, index: true },
    roleKey: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    description: String,
    permissions: [{ type: String, required: true }],
    isSystemRole: { type: Boolean, default: false }
  },
  { timestamps: true }
);

RoleSchema.index({ tenantId: 1, roleKey: 1 }, { unique: true });

export const RoleModel = mongoose.model<IRole>('Role', RoleSchema);
