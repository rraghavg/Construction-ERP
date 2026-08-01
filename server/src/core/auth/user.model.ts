import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  userId: string;
  tenantId: string;
  fullName: string;
  email: string;
  passwordHash: string;
  roleKeys: string[];
  allowedCompanies: string[]; // Scope boundary
  allowedProjects: string[];  // Scope boundary
  isSuperAdmin: boolean;
  status: 'active' | 'inactive' | 'locked' | 'deactivated';
  failedLoginAttempts: number;
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    userId: { type: String, required: true, unique: true, index: true },
    tenantId: { type: String, required: true, index: true },
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true, index: true },
    passwordHash: { type: String, required: true },
    roleKeys: [{ type: String, required: true }],
    allowedCompanies: [{ type: String }],
    allowedProjects: [{ type: String }],
    isSuperAdmin: { type: Boolean, default: false },
    status: { type: String, enum: ['active', 'inactive', 'locked', 'deactivated'], default: 'active', index: true },
    failedLoginAttempts: { type: Number, default: 0 },
    lastLoginAt: Date
  },
  { timestamps: true }
);

UserSchema.index({ tenantId: 1, email: 1 }, { unique: true });

export const UserModel = mongoose.model<IUser>('User', UserSchema);
