import { LeaseAgreementModel } from '../models/leaseAgreement.model';

export class LeaseRenewalService {
  static async getUpcomingRenewals(tenantId: string, withinDays: number) {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + withinDays);

    return await LeaseAgreementModel.find({
      tenantId,
      status: 'ACTIVE',
      endDate: { $lte: targetDate, $gte: new Date() }
    });
  }

  static async renewLease(tenantId: string, leaseId: string, newEndDate: Date, newRent: number, userId: string) {
    const lease = await LeaseAgreementModel.findOne({ tenantId, leaseId });
    if (!lease) throw new Error('Lease not found');
    
    lease.endDate = newEndDate;
    lease.monthlyRent = newRent;
    lease.status = 'RENEWED';
    lease.updatedAt = new Date();
    const updated = await lease.save();

    return updated;
  }
}
