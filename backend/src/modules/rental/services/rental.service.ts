import { LeaseAgreementModel, ILeaseAgreement } from '../models/leaseAgreement.model.js';
import { RentScheduleModel, IRentSchedule } from '../models/rentSchedule.model.js';
import { RentalDepositModel, IRentalDeposit } from '../models/rentalDeposit.model.js';
import { FinanceService } from '../../finance/services/finance.service.js';
import { ApiError } from '../../../utils/apiError.js';
import { logAuditEvent } from '../../../shared/audit/audit.model.js';

export class RentalService {
  private static lseSeq = 100;
  private static schSeq = 100;
  private static depSeq = 100;

  // 1. Create Lease Agreement
  static async createLeaseAgreement(data: Partial<ILeaseAgreement> & { tenantId: string; companyId: string; projectId: string; unitId: string; customerId: string; startDate: Date; endDate: Date; monthlyRent: number; securityDepositAmount: number }): Promise<{ lease: ILeaseAgreement; deposit: IRentalDeposit }> {
    // Overlap Check: Ensure unit is not actively leased
    const existingActiveLease = await LeaseAgreementModel.findOne({
      tenantId: data.tenantId,
      unitId: data.unitId,
      status: 'ACTIVE'
    });
    if (existingActiveLease) {
      throw new ApiError(400, 'UNIT_ALREADY_LEASED', `Unit ${data.unitId} currently has an ACTIVE lease (${existingActiveLease.leaseNumber})`);
    }

    const leaseNumber = `LSE-2026-${String(++this.lseSeq).padStart(6, '0')}`;
    const leaseId = `LSE-${Date.now().toString().slice(-6)}`;

    const lease = new LeaseAgreementModel({
      ...data,
      leaseId,
      leaseNumber,
      status: 'ACTIVE'
    });

    const savedLease = await lease.save();

    // Create Deposit Record
    const depositId = `DEP-${Date.now().toString().slice(-6)}`;
    const deposit = new RentalDepositModel({
      depositId,
      tenantId: data.tenantId,
      leaseId,
      amount: data.securityDepositAmount,
      status: 'HELD'
    });
    const savedDeposit = await deposit.save();

    // Auto-generate 12 Monthly Rent Schedules
    const start = new Date(data.startDate);
    for (let i = 0; i < 12; i++) {
      const dueDate = new Date(start.getFullYear(), start.getMonth() + i, 1);
      const periodName = dueDate.toLocaleString('default', { month: 'long', year: 'numeric' });
      const scheduleId = `SCH-${Date.now().toString().slice(-6)}-${i + 1}`;

      await RentScheduleModel.create({
        scheduleId,
        tenantId: data.tenantId,
        leaseId,
        dueDate,
        periodName,
        rentAmount: data.monthlyRent,
        status: 'PENDING'
      });
    }

    await logAuditEvent({
      tenantId: data.tenantId,
      actorUserId: 'SYSTEM',
      module: 'rental',
      action: 'LEASE_AGREEMENT_CREATED',
      recordType: 'LeaseAgreement',
      recordId: leaseId,
      status: 'success',
      severity: 'high'
    });

    return { lease: savedLease, deposit: savedDeposit };
  }

  static async listLeases(tenantId: string, projectId?: string): Promise<ILeaseAgreement[]> {
    const query: any = { tenantId };
    if (projectId) query.projectId = projectId;
    return await LeaseAgreementModel.find(query).sort({ createdAt: -1 });
  }

  // 2. Record Rent Collection & Finance Integration
  static async recordRentCollection(tenantId: string, leaseId: string, scheduleId: string, amount: number, paymentMode: 'CASH' | 'BANK_TRANSFER' | 'CHEQUE' | 'UPI' | 'CARD', receivedBy: string) {
    const lease = await LeaseAgreementModel.findOne({ tenantId, leaseId });
    if (!lease) {
      throw new ApiError(404, 'LEASE_NOT_FOUND', 'Lease Agreement record not found');
    }

    const schedule = await RentScheduleModel.findOne({ tenantId, scheduleId });
    if (!schedule) {
      throw new ApiError(404, 'RENT_SCHEDULE_NOT_FOUND', 'Rent schedule record not found');
    }

    // Call Finance subledger collection recording
    const financeRes = await FinanceService.recordCollection({
      tenantId,
      projectId: lease.projectId,
      customerId: lease.customerId,
      bookingId: lease.leaseNumber,
      amount,
      paymentMode,
      receivedBy
    });

    schedule.status = 'PAID';
    schedule.collectionId = financeRes.collection._id.toString();
    await schedule.save();

    return { schedule, collection: financeRes.collection, receipt: financeRes.receipt };
  }

  // 3. Lease Termination
  static async terminateLease(tenantId: string, leaseId: string, terminationReason: string): Promise<ILeaseAgreement> {
    const lease = await LeaseAgreementModel.findOne({ tenantId, leaseId });
    if (!lease) {
      throw new ApiError(404, 'LEASE_NOT_FOUND', 'Lease Agreement not found');
    }

    lease.status = 'TERMINATED';
    const updated = await lease.save();

    await logAuditEvent({
      tenantId,
      actorUserId: 'SYSTEM',
      module: 'rental',
      action: 'LEASE_TERMINATED',
      recordType: 'LeaseAgreement',
      recordId: leaseId,
      status: 'success',
      severity: 'high'
    });

    return updated;
  }

  // 4. Analytics
  static async getRentalAnalytics(tenantId: string) {
    const activeLeasesCount = await LeaseAgreementModel.countDocuments({ tenantId, status: 'ACTIVE' });
    const totalDepositsAgg = await RentalDepositModel.aggregate([
      { $match: { tenantId, status: 'HELD' } },
      { $group: { _id: null, totalHeld: { $sum: '$amount' } } }
    ]);

    const monthlyRentAgg = await LeaseAgreementModel.aggregate([
      { $match: { tenantId, status: 'ACTIVE' } },
      { $group: { _id: null, totalRent: { $sum: '$monthlyRent' } } }
    ]);

    const overdueSchedules = await RentScheduleModel.countDocuments({ tenantId, status: 'OVERDUE' });

    return {
      activeLeases: activeLeasesCount,
      totalSecurityDepositsHeld: totalDepositsAgg[0]?.totalHeld || 0,
      monthlyRentalIncome: monthlyRentAgg[0]?.totalRent || 0,
      overdueRentSchedulesCount: overdueSchedules
    };
  }
}
