import { CommunicationLogModel } from '../models/communication.model';

export class CommunicationService {
  static async logCommunication(tenantId: string, customerId: string, type: string, message: string, userId?: string) {
    const logId = `COMM-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const log = new CommunicationLogModel({
      logId,
      tenantId,
      customerId,
      type,
      message,
      userId
    });
    return log.save();
  }

  static async getHistory(tenantId: string, customerId: string) {
    return CommunicationLogModel.find({ tenantId, customerId }).sort({ createdAt: -1 });
  }
}
