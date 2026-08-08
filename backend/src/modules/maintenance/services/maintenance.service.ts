import { MaintainableAssetModel, IMaintainableAsset } from '../models/maintainableAsset.model.js';
import { MaintenanceRequestModel, IMaintenanceRequest } from '../models/maintenanceRequest.model.js';
import { WorkOrderModel, IWorkOrder } from '../models/workOrder.model.js';
import { PreventiveMaintenanceModel, IPreventiveMaintenance } from '../models/preventiveMaintenance.model.js';
import { ApiError } from '../../../utils/apiError.js';
import { logAuditEvent } from '../../../shared/audit/audit.model.js';

export class MaintenanceService {
  private static astSeq = 100;
  private static reqSeq = 100;
  private static woSeq = 100;
  private static pmSeq = 100;

  // 1. Asset Registry
  static async createAsset(data: Partial<IMaintainableAsset> & { tenantId: string; companyId: string; projectId: string; name: string; location: string }): Promise<IMaintainableAsset> {
    const assetNumber = `AST-2026-${String(++this.astSeq).padStart(6, '0')}`;
    const assetId = `AST-${Date.now().toString().slice(-6)}`;
    const asset = new MaintainableAssetModel({
      ...data,
      assetId,
      assetNumber
    });
    return await asset.save();
  }

  static async listAssets(tenantId: string, projectId?: string): Promise<IMaintainableAsset[]> {
    const query: any = { tenantId };
    if (projectId) query.projectId = projectId;
    return await MaintainableAssetModel.find(query).sort({ name: 1 });
  }

  // 2. Maintenance Requests
  static async createRequest(data: Partial<IMaintenanceRequest> & { tenantId: string; companyId: string; projectId: string; reportedBy: string; category: string; description: string }): Promise<IMaintenanceRequest> {
    const requestNumber = `REQ-2026-${String(++this.reqSeq).padStart(6, '0')}`;
    const requestId = `REQ-${Date.now().toString().slice(-6)}`;
    const req = new MaintenanceRequestModel({
      ...data,
      requestId,
      requestNumber,
      status: 'SUBMITTED'
    });
    return await req.save();
  }

  static async listRequests(tenantId: string, projectId?: string): Promise<IMaintenanceRequest[]> {
    const query: any = { tenantId };
    if (projectId) query.projectId = projectId;
    return await MaintenanceRequestModel.find(query).sort({ createdAt: -1 });
  }

  // 3. Work Orders
  static async createWorkOrder(data: { tenantId: string; companyId: string; projectId: string; requestId: string; assetId?: string; assignedTechnician?: string; vendorId?: string; scheduledDate?: Date }): Promise<IWorkOrder> {
    const workOrderNumber = `WO-2026-${String(++this.woSeq).padStart(6, '0')}`;
    const workOrderId = `WO-${Date.now().toString().slice(-6)}`;

    const wo = new WorkOrderModel({
      ...data,
      workOrderId,
      workOrderNumber,
      status: 'ASSIGNED'
    });

    // Update request status to ASSIGNED
    await MaintenanceRequestModel.updateOne({ tenantId: data.tenantId, requestId: data.requestId }, { status: 'ASSIGNED' });

    const saved = await wo.save();
    await logAuditEvent({
      tenantId: data.tenantId,
      actorUserId: 'SYSTEM',
      module: 'maintenance',
      action: 'WORK_ORDER_CREATED',
      recordType: 'WorkOrder',
      recordId: workOrderId,
      status: 'success',
      severity: 'medium'
    });

    return saved;
  }

  static async completeWorkOrder(tenantId: string, workOrderId: string, laborCost: number, sparePartsCost: number): Promise<IWorkOrder> {
    const wo = await WorkOrderModel.findOne({ tenantId, workOrderId });
    if (!wo) {
      throw new ApiError(404, 'WORK_ORDER_NOT_FOUND', 'Work order record not found');
    }

    wo.status = 'COMPLETED';
    wo.completionDate = new Date();
    wo.laborCost = laborCost;
    wo.sparePartsCost = sparePartsCost;
    wo.totalCost = laborCost + sparePartsCost;

    const updated = await wo.save();

    // Mark original request COMPLETED
    await MaintenanceRequestModel.updateOne({ tenantId, requestId: wo.requestId }, { status: 'COMPLETED' });

    return updated;
  }

  static async listWorkOrders(tenantId: string, projectId?: string): Promise<IWorkOrder[]> {
    const query: any = { tenantId };
    if (projectId) query.projectId = projectId;
    return await WorkOrderModel.find(query).sort({ createdAt: -1 });
  }

  // 4. Analytics
  static async getMaintenanceAnalytics(tenantId: string) {
    const totalAssets = await MaintainableAssetModel.countDocuments({ tenantId, status: 'OPERATIONAL' });
    const openRequests = await MaintenanceRequestModel.countDocuments({ tenantId, status: { $in: ['SUBMITTED', 'ASSIGNED', 'IN_PROGRESS'] } });
    const openWorkOrders = await WorkOrderModel.countDocuments({ tenantId, status: { $in: ['ASSIGNED', 'IN_PROGRESS'] } });

    const costAgg = await WorkOrderModel.aggregate([
      { $match: { tenantId, status: { $in: ['COMPLETED', 'CLOSED'] } } },
      { $group: { _id: null, totalMaintenanceCost: { $sum: '$totalCost' } } }
    ]);

    return {
      operationalAssets: totalAssets,
      openMaintenanceRequests: openRequests,
      activeWorkOrders: openWorkOrders,
      totalMaintenanceCost: costAgg[0]?.totalMaintenanceCost || 0
    };
  }
}
