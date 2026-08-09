import { UnitModel } from '../../master-data/models/unit.model';
import { ProgramEnrollmentModel } from '../../rental/models/programEnrollment.model';

export class BuybackService {
  /**
   * Processes a buyback for a sold unit.
   * This immediately halts any maintenance billing and rental management payouts
   * by cancelling enrollments and resetting the unit to company inventory.
   */
  static async processBuyback(tenantId: string, unitId: string, userId: string, notes?: string) {
    const unit = await UnitModel.findOne({ tenantId, unitId });
    if (!unit) {
      throw new Error('Unit not found');
    }

    if (unit.ownershipStatus !== 'SOLD') {
      throw new Error('Only SOLD units can be bought back.');
    }

    // 1. Cancel any active rental or maintenance program enrollment
    if (unit.programEnrollment !== 'NONE') {
      const activeEnrollment = await ProgramEnrollmentModel.findOne({
        tenantId,
        unitId,
        status: 'ACTIVE'
      });

      if (activeEnrollment) {
        activeEnrollment.status = 'CANCELLED';
        activeEnrollment.endDate = new Date();
        activeEnrollment.notes = `Cancelled due to unit buyback. ${notes || ''}`;
        activeEnrollment.updatedBy = userId;
        await activeEnrollment.save();
      }
    }

    // 2. Revert the unit ownership and commercial status
    unit.ownershipStatus = 'COMPANY_OWNED';
    unit.programEnrollment = 'NONE';
    unit.commercialStatus = 'AVAILABLE';
    unit.updatedBy = userId;
    
    // Note: In a complete implementation, this would also trigger financial events,
    // generate a refund voucher, and update the Sales Booking status to 'CANCELLED_BUYBACK'.
    
    await unit.save();

    return unit;
  }
}
