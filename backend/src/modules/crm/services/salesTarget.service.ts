import { SalesTargetModel } from '../models/salesTarget.model.js';
import crypto from 'crypto';

export class SalesTargetService {
  static async setTarget(tenantId: string, data: any) {
    const targetId = `STGT-${Date.now()}-${crypto.randomBytes(4).toString('hex')}`;
    const target = new SalesTargetModel({
      ...data,
      targetId,
      tenantId,
      status: 'ACTIVE'
    });
    return await target.save();
  }

  static async listTargets(tenantId: string, filters: any = {}) {
    return await SalesTargetModel.find({ tenantId, ...filters }).sort({ period: -1 });
  }

  static async updateAchievement(tenantId: string, targetId: string, amount: number, units: number) {
    const target = await SalesTargetModel.findOneAndUpdate(
      { tenantId, targetId },
      { $inc: { achievedAmount: amount, achievedUnits: units } },
      { new: true }
    );
    if (!target) throw new Error('Target not found');
    return target;
  }

  static async getLeaderboard(tenantId: string, period: string) {
    const targets = await SalesTargetModel.find({ tenantId, period, status: 'ACTIVE' })
      .sort({ achievedAmount: -1 })
      .limit(10);
    return targets;
  }
}
