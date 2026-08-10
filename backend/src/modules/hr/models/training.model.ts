import mongoose, { Schema, Document } from 'mongoose';

export interface ITrainingParticipant {
  employeeId: string;
  status: 'ENROLLED' | 'IN_PROGRESS' | 'COMPLETED' | 'DROPPED';
  score?: number;
}

export interface ITraining extends Document {
  trainingId: string;
  tenantId: string;
  title: string;
  description: string;
  trainer: string;
  startDate: Date;
  endDate: Date;
  participants: ITrainingParticipant[];
  category: string;
  status: 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  createdAt: Date;
  updatedAt: Date;
}

const TrainingParticipantSchema: Schema = new Schema(
  {
    employeeId: { type: String, required: true },
    status: { type: String, enum: ['ENROLLED', 'IN_PROGRESS', 'COMPLETED', 'DROPPED'], default: 'ENROLLED' },
    score: { type: Number }
  },
  { _id: false }
);

const TrainingSchema: Schema = new Schema(
  {
    trainingId: { type: String, required: true, unique: true, index: true },
    tenantId: { type: String, required: true, index: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    trainer: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    participants: { type: [TrainingParticipantSchema], default: [] },
    category: { type: String, required: true },
    status: { type: String, enum: ['SCHEDULED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'], default: 'SCHEDULED', index: true }
  },
  { timestamps: true }
);

TrainingSchema.index({ tenantId: 1, status: 1 });

export const TrainingModel = mongoose.model<ITraining>('Training', TrainingSchema);
