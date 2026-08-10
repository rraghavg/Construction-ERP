import mongoose, { Schema, Document } from 'mongoose';

export interface IReview extends Document {
  reviewId: string;
  tenantId: string;
  employeeId: string;
  reviewerId: string;
  period: string;
  rating: number;
  strengths: string;
  improvements: string;
  goals: string;
  status: 'DRAFT' | 'SUBMITTED' | 'ACKNOWLEDGED';
  submittedDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ReviewSchema: Schema = new Schema(
  {
    reviewId: { type: String, required: true, unique: true, index: true },
    tenantId: { type: String, required: true, index: true },
    employeeId: { type: String, required: true, index: true },
    reviewerId: { type: String, required: true, index: true },
    period: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    strengths: { type: String, required: true },
    improvements: { type: String, required: true },
    goals: { type: String, required: true },
    status: { type: String, enum: ['DRAFT', 'SUBMITTED', 'ACKNOWLEDGED'], default: 'DRAFT', index: true },
    submittedDate: { type: Date }
  },
  { timestamps: true }
);

ReviewSchema.index({ tenantId: 1, employeeId: 1, period: 1 });

export const ReviewModel = mongoose.model<IReview>('Review', ReviewSchema);
