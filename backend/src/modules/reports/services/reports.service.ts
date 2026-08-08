import { LeadModel } from '../../crm/models/lead.model.js';
import { BookingModel } from '../../sales/models/booking.model.js';
import { CustomerProfileModel } from '../../customer/models/customerProfile.model.js';
import { ReceivableDemandModel } from '../../finance/models/receivableDemand.model.js';
import { CollectionModel } from '../../finance/models/collection.model.js';
import { PurchaseOrderModel } from '../../procurement/models/purchaseOrder.model.js';
import { InventoryTransactionModel } from '../../inventory/models/inventoryTransaction.model.js';
import { EmployeeModel } from '../../hr/models/employee.model.js';
import { MaintainableAssetModel } from '../../maintenance/models/maintainableAsset.model.js';
import { LeaseAgreementModel } from '../../rental/models/leaseAgreement.model.js';

export class ReportsService {
  static async getExecutiveDashboardOverview(tenantId: string) {
    const totalLeads = await LeadModel.countDocuments({ tenantId });
    const totalCustomers = await CustomerProfileModel.countDocuments({ tenantId });
    const activeBookings = await BookingModel.countDocuments({ tenantId, status: 'CONFIRMED' });

    const totalSalesValueAgg = await BookingModel.aggregate([
      { $match: { tenantId, status: { $ne: 'CANCELLED' } } },
      { $group: { _id: null, totalVal: { $sum: '$finalAgreementValue' } } }
    ]);

    const totalCollectionsAgg = await CollectionModel.aggregate([
      { $match: { tenantId, status: 'RECORDED' } },
      { $group: { _id: null, totalColl: { $sum: '$amount' } } }
    ]);

    const totalDemandsAgg = await ReceivableDemandModel.aggregate([
      { $match: { tenantId, status: { $ne: 'CANCELLED' } } },
      { $group: { _id: null, totalDem: { $sum: '$amount' } } }
    ]);

    const procurementSpendAgg = await PurchaseOrderModel.aggregate([
      { $match: { tenantId, status: { $ne: 'CANCELLED' } } },
      { $group: { _id: null, totalSpend: { $sum: '$grandTotal' } } }
    ]);

    const totalInventoryValAgg = await InventoryTransactionModel.aggregate([
      { $match: { tenantId } },
      { $group: { _id: null, totalVal: { $sum: '$totalValue' } } }
    ]);

    const activeEmployees = await EmployeeModel.countDocuments({ tenantId, status: 'ACTIVE' });
    const operationalAssets = await MaintainableAssetModel.countDocuments({ tenantId, status: 'OPERATIONAL' });
    const activeLeases = await LeaseAgreementModel.countDocuments({ tenantId, status: 'ACTIVE' });

    const totalDemanded = totalDemandsAgg[0]?.totalDem || 0;
    const totalCollected = totalCollectionsAgg[0]?.totalColl || 0;

    return {
      crm: {
        totalLeads
      },
      commercial: {
        totalCustomers,
        activeBookings,
        totalSalesValue: totalSalesValueAgg[0]?.totalVal || 0
      },
      finance: {
        totalDemanded,
        totalCollected,
        outstandingBalance: Math.max(0, totalDemanded - totalCollected)
      },
      procurement: {
        totalProcurementSpend: procurementSpendAgg[0]?.totalSpend || 0
      },
      inventory: {
        totalInventoryValue: totalInventoryValAgg[0]?.totalVal || 0
      },
      workforce: {
        activeEmployees
      },
      maintenance: {
        operationalAssets
      },
      rental: {
        activeLeases
      }
    };
  }
}
