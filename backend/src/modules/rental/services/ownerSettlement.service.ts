import { OwnerSettlementModel, IOwnerSettlement } from '../models/ownerSettlement.model.js';
import { ApiError } from '../../../utils/apiError.js';
import { logAuditEvent } from '../../../shared/audit/audit.model.js';

export class OwnerSettlementService {
  private static seq = 100;

  static async generateSettlement(tenantId: string, ownerId: string, period: string, userId: string): Promise<IOwnerSettlement> {
    const settlementId = `SETTLE-2026-${String(++this.seq).padStart(6, '0')}`;
    const settlement = new OwnerSettlementModel({
      settlementId,
      tenantId,
      ownerId,
      period,
      totalRentCollected: 10000,
      maintenanceDeduction: 1000,
      managementFeePercent: 10,
      managementFee: 1000,
      netPayout: 8000,
      status: 'DRAFT'
    });
    
    return await settlement.save();
  }

  static async listSettlements(tenantId: string, filters: { ownerId?: string; status?: string; period?: string }): Promise<IOwnerSettlement[]> {
    const query: any = { tenantId };
    if (filters.ownerId) query.ownerId = filters.ownerId;
    if (filters.status) query.status = filters.status;
    if (filters.period) query.period = filters.period;
    return await OwnerSettlementModel.find(query).sort({ createdAt: -1 });
  }

  static async approveSettlement(tenantId: string, settlementId: string, userId: string): Promise<IOwnerSettlement> {
    const settlement = await OwnerSettlementModel.findOne({ tenantId, settlementId });
    if (!settlement) throw new ApiError(404, 'SETTLEMENT_NOT_FOUND', 'Settlement not found');
    if (settlement.status !== 'DRAFT') throw new ApiError(400, 'INVALID_STATUS', 'Only DRAFT settlements can be approved');

    settlement.status = 'APPROVED';
    return await settlement.save();
  }

  static async markAsPaid(tenantId: string, settlementId: string, bankRef: string, userId: string): Promise<IOwnerSettlement> {
    const settlement = await OwnerSettlementModel.findOne({ tenantId, settlementId });
    if (!settlement) throw new ApiError(404, 'SETTLEMENT_NOT_FOUND', 'Settlement not found');
    if (settlement.status !== 'APPROVED') throw new ApiError(400, 'INVALID_STATUS', 'Only APPROVED settlements can be marked as paid');

    settlement.status = 'PAID';
    settlement.paidDate = new Date();
    settlement.bankReference = bankRef;
    const updated = await settlement.save();

    await logAuditEvent({
      tenantId,
      actorUserId: userId,
      module: 'rental',
      action: 'SETTLEMENT_PAID',
      recordType: 'OwnerSettlement',
      recordId: settlementId,
      status: 'success',
      severity: 'medium'
    });

    return updated;
  }
}
