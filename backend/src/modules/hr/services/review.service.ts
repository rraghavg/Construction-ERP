import { ReviewModel, IReview } from '../models/review.model.js';
import { ApiError } from '../../../utils/apiError.js';

export class ReviewService {
  static async createReview(tenantId: string, data: Partial<IReview> & { employeeId: string; reviewerId: string; period: string; rating: number; strengths: string; improvements: string; goals: string }): Promise<IReview> {
    const reviewId = `REV-${Date.now().toString().slice(-6)}`;
    const review = new ReviewModel({
      ...data,
      reviewId,
      tenantId
    });
    return await review.save();
  }

  static async listReviews(tenantId: string, employeeId?: string): Promise<IReview[]> {
    const query: any = { tenantId };
    if (employeeId) query.employeeId = employeeId;
    return await ReviewModel.find(query).sort({ createdAt: -1 });
  }

  static async submitReview(tenantId: string, reviewId: string): Promise<IReview> {
    const review = await ReviewModel.findOne({ tenantId, reviewId });
    if (!review) {
      throw new ApiError(404, 'REVIEW_NOT_FOUND', 'Review not found');
    }
    review.status = 'SUBMITTED';
    review.submittedDate = new Date();
    return await review.save();
  }

  static async acknowledgeReview(tenantId: string, reviewId: string): Promise<IReview> {
    const review = await ReviewModel.findOne({ tenantId, reviewId });
    if (!review) {
      throw new ApiError(404, 'REVIEW_NOT_FOUND', 'Review not found');
    }
    if (review.status !== 'SUBMITTED') {
      throw new ApiError(400, 'REVIEW_NOT_SUBMITTED', 'Review must be submitted before it can be acknowledged');
    }
    review.status = 'ACKNOWLEDGED';
    return await review.save();
  }
}
