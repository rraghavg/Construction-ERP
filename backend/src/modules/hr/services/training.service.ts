import { TrainingModel, ITraining } from '../models/training.model.js';
import { ApiError } from '../../../utils/apiError.js';

export class TrainingService {
  static async createTraining(tenantId: string, data: Partial<ITraining> & { title: string; description: string; trainer: string; startDate: Date; endDate: Date; category: string }): Promise<ITraining> {
    const trainingId = `TRN-${Date.now().toString().slice(-6)}`;
    const training = new TrainingModel({
      ...data,
      trainingId,
      tenantId
    });
    return await training.save();
  }

  static async listTrainings(tenantId: string, status?: string): Promise<ITraining[]> {
    const query: any = { tenantId };
    if (status) query.status = status;
    return await TrainingModel.find(query).sort({ startDate: -1 });
  }

  static async enrollEmployee(tenantId: string, trainingId: string, employeeId: string): Promise<ITraining> {
    const training = await TrainingModel.findOne({ tenantId, trainingId });
    if (!training) {
      throw new ApiError(404, 'TRAINING_NOT_FOUND', 'Training not found');
    }
    const alreadyEnrolled = training.participants.some(p => p.employeeId === employeeId);
    if (alreadyEnrolled) {
      throw new ApiError(400, 'ALREADY_ENROLLED', 'Employee is already enrolled in this training');
    }
    training.participants.push({ employeeId, status: 'ENROLLED' });
    return await training.save();
  }

  static async completeTraining(tenantId: string, trainingId: string): Promise<ITraining> {
    const training = await TrainingModel.findOne({ tenantId, trainingId });
    if (!training) {
      throw new ApiError(404, 'TRAINING_NOT_FOUND', 'Training not found');
    }
    training.status = 'COMPLETED';
    return await training.save();
  }

  static async recordScore(tenantId: string, trainingId: string, employeeId: string, score: number): Promise<ITraining> {
    const training = await TrainingModel.findOne({ tenantId, trainingId });
    if (!training) {
      throw new ApiError(404, 'TRAINING_NOT_FOUND', 'Training not found');
    }
    const participant = training.participants.find(p => p.employeeId === employeeId);
    if (!participant) {
      throw new ApiError(404, 'PARTICIPANT_NOT_FOUND', 'Employee not found in training participants');
    }
    participant.score = score;
    participant.status = 'COMPLETED';
    return await training.save();
  }
}
