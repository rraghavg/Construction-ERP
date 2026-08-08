import mongoose, { Schema, Document } from 'mongoose';

export interface IChecklistItem {
  description: string;
  isCompleted: boolean;
}

export interface IPreventiveMaintenance extends Document {
  scheduleId: string;
  tenantId: string;
  assetId: string;
  title: string;
  frequency: 'WEEKLY' | 'MONTHLY' | 'QUARTERLY' | 'ANNUAL';
  nextDueDate: Date;
  checklistItems: IChecklistItem[];
  status: 'SCHEDULED' | 'COMPLETED' | 'OVERDUE';
  createdAt: Date;
  updatedAt: Date;
}

const ChecklistItemSchema = new Schema({
  description: { type: String, required: true },
  isCompleted: { type: Boolean, default: false }
});

const PreventiveMaintenanceSchema: Schema = new Schema(
  {
    scheduleId: { type: String, required: true, unique: true, index: true },
    tenantId: { type: String, required: true, index: true },
    assetId: { type: String, required: true, index: true },
    title: { type: String, required: true },
    frequency: { type: String, enum: ['WEEKLY', 'MONTHLY', 'QUARTERLY', 'ANNUAL'], default: 'MONTHLY' },
    nextDueDate: { type: Date, required: true },
    checklistItems: [ChecklistItemSchema],
    status: { type: String, enum: ['SCHEDULED', 'COMPLETED', 'OVERDUE'], default: 'SCHEDULED' }
  },
  { timestamps: true }
);

PreventiveMaintenanceSchema.index({ tenantId: 1, assetId: 1 });

export const PreventiveMaintenanceModel = mongoose.model<IPreventiveMaintenance>('PreventiveMaintenance', PreventiveMaintenanceSchema);
