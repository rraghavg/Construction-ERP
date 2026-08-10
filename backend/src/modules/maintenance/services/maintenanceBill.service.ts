import { MaintenanceBillModel, IMaintenanceBill } from '../models/maintenanceBill.model.js';
import { ApiError } from '../../../utils/apiError.js';
import { logAuditEvent } from '../../../shared/audit/audit.model.js';

export class MaintenanceBillService {
  static async generateMonthlyBills(tenantId: string, projectId: string, period: string, userId: string): Promise<IMaintenanceBill[]> {
    // Implement monthly bill generation logic here. Returning empty for now as requested.
    return [];
  }

  static async listBills(tenantId: string, filters: { projectId?: string; status?: string; billPeriod?: string }): Promise<IMaintenanceBill[]> {
    const query: any = { tenantId };
    if (filters.projectId) query.projectId = filters.projectId;
    if (filters.status) query.status = filters.status;
    if (filters.billPeriod) query.billPeriod = filters.billPeriod;
    return await MaintenanceBillModel.find(query).sort({ createdAt: -1 });
  }

  static async markAsPaid(tenantId: string, billId: string, paymentMode: string, userId: string): Promise<IMaintenanceBill> {
    const bill = await MaintenanceBillModel.findOne({ tenantId, billId });
    if (!bill) {
      throw new ApiError(404, 'BILL_NOT_FOUND', 'Maintenance bill not found');
    }
    bill.status = 'PAID';
    bill.paidDate = new Date();
    bill.paymentMode = paymentMode;
    const updated = await bill.save();

    await logAuditEvent({
      tenantId,
      actorUserId: userId,
      module: 'maintenance',
      action: 'BILL_PAID',
      recordType: 'MaintenanceBill',
      recordId: billId,
      status: 'success',
      severity: 'medium'
    });
    return updated;
  }

  static async getOverdue(tenantId: string): Promise<IMaintenanceBill[]> {
    return await MaintenanceBillModel.find({ tenantId, status: 'OVERDUE' });
  }
}
