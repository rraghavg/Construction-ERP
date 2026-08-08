import { VendorModel, IVendor } from '../models/vendor.model.js';
import { PurchaseRequisitionModel, IPurchaseRequisition } from '../models/purchaseRequisition.model.js';
import { RFQModel, IRFQ } from '../models/rfq.model.js';
import { VendorQuotationModel, IVendorQuotation } from '../models/vendorQuotation.model.js';
import { PurchaseOrderModel, IPurchaseOrder } from '../models/purchaseOrder.model.js';
import { ApiError } from '../../../utils/apiError.js';
import { logAuditEvent } from '../../../shared/audit/audit.model.js';

export class ProcurementService {
  private static vSeq = 100;
  private static prSeq = 100;
  private static rfqSeq = 100;
  private static qSeq = 100;
  private static poSeq = 100;

  // 1. Vendor Management
  static async createVendor(data: Partial<IVendor> & { tenantId: string; legalName: string; contactPerson: any; address: any }): Promise<IVendor> {
    const vendorNumber = `VND-2026-${String(++this.vSeq).padStart(6, '0')}`;
    const vendorId = `VND-${Date.now().toString().slice(-6)}`;
    const vendor = new VendorModel({
      ...data,
      vendorId,
      vendorNumber
    });
    const saved = await vendor.save();
    await logAuditEvent({
      tenantId: data.tenantId,
      actorUserId: 'SYSTEM',
      module: 'procurement',
      action: 'VENDOR_CREATED',
      recordType: 'Vendor',
      recordId: saved.vendorId,
      status: 'success',
      severity: 'medium'
    });
    return saved;
  }

  static async listVendors(tenantId: string, filterStatus?: string): Promise<IVendor[]> {
    const query: any = { tenantId };
    if (filterStatus) query.status = filterStatus;
    return await VendorModel.find(query).sort({ createdAt: -1 });
  }

  static async updateVendorStatus(tenantId: string, vendorId: string, status: 'ACTIVE' | 'INACTIVE' | 'BLACKLISTED' | 'UNDER_REVIEW'): Promise<IVendor> {
    const vendor = await VendorModel.findOne({ tenantId, vendorId });
    if (!vendor) {
      throw new ApiError(404, 'VENDOR_NOT_FOUND', 'Vendor record not found');
    }
    vendor.status = status;
    const updated = await vendor.save();
    await logAuditEvent({
      tenantId,
      actorUserId: 'SYSTEM',
      module: 'procurement',
      action: `VENDOR_STATUS_CHANGED_${status}`,
      recordType: 'Vendor',
      recordId: vendorId,
      status: 'success',
      severity: 'high'
    });
    return updated;
  }

  // 2. Purchase Requisition Lifecycle
  static async createRequisition(data: Partial<IPurchaseRequisition> & { tenantId: string; companyId: string; projectId: string; requestedBy: string; purpose: string; items: any[] }): Promise<IPurchaseRequisition> {
    const requisitionNumber = `PR-2026-${String(++this.prSeq).padStart(6, '0')}`;
    const requisitionId = `PR-${Date.now().toString().slice(-6)}`;
    const pr = new PurchaseRequisitionModel({
      ...data,
      requisitionId,
      requisitionNumber,
      status: 'SUBMITTED'
    });
    return await pr.save();
  }

  static async listRequisitions(tenantId: string, projectId?: string): Promise<IPurchaseRequisition[]> {
    const query: any = { tenantId };
    if (projectId) query.projectId = projectId;
    return await PurchaseRequisitionModel.find(query).sort({ createdAt: -1 });
  }

  static async approveRequisition(tenantId: string, requisitionId: string, approvedBy: string): Promise<IPurchaseRequisition> {
    const pr = await PurchaseRequisitionModel.findOne({ tenantId, requisitionId });
    if (!pr) {
      throw new ApiError(404, 'REQUISITION_NOT_FOUND', 'Purchase Requisition not found');
    }
    pr.status = 'APPROVED';
    const updated = await pr.save();
    await logAuditEvent({
      tenantId,
      actorUserId: approvedBy,
      module: 'procurement',
      action: 'REQUISITION_APPROVED',
      recordType: 'PurchaseRequisition',
      recordId: requisitionId,
      status: 'success',
      severity: 'medium'
    });
    return updated;
  }

  // 3. RFQ & Quotations
  static async createRFQ(data: Partial<IRFQ> & { tenantId: string; companyId: string; projectId: string; title: string; submissionDeadline: Date; items: any[] }): Promise<IRFQ> {
    const rfqNumber = `RFQ-2026-${String(++this.rfqSeq).padStart(6, '0')}`;
    const rfqId = `RFQ-${Date.now().toString().slice(-6)}`;
    const rfq = new RFQModel({
      ...data,
      rfqId,
      rfqNumber,
      status: 'ISSUED'
    });
    return await rfq.save();
  }

  static async listRFQs(tenantId: string, projectId?: string): Promise<IRFQ[]> {
    const query: any = { tenantId };
    if (projectId) query.projectId = projectId;
    return await RFQModel.find(query).sort({ createdAt: -1 });
  }

  static async submitVendorQuotation(data: Partial<IVendorQuotation> & { tenantId: string; rfqId: string; vendorId: string; validUntil: Date; items: any[]; totalAmount: number }): Promise<IVendorQuotation> {
    const quotationNumber = `Q-2026-${String(++this.qSeq).padStart(6, '0')}`;
    const quotationId = `Q-${Date.now().toString().slice(-6)}`;
    const quote = new VendorQuotationModel({
      ...data,
      quotationId,
      quotationNumber,
      status: 'SUBMITTED'
    });
    return await quote.save();
  }

  static async compareQuotations(tenantId: string, rfqId: string): Promise<IVendorQuotation[]> {
    return await VendorQuotationModel.find({ tenantId, rfqId }).sort({ totalAmount: 1 });
  }

  // 4. Purchase Orders
  static async createPurchaseOrder(data: Partial<IPurchaseOrder> & { tenantId: string; companyId: string; projectId: string; vendorId: string; deliveryDate: Date; items: any[] }): Promise<IPurchaseOrder> {
    const poNumber = `PO-2026-${String(++this.poSeq).padStart(6, '0')}`;
    const poId = `PO-${Date.now().toString().slice(-6)}`;
    
    let subtotal = 0;
    let taxTotal = 0;
    const processedItems = data.items.map((item) => {
      const net = (item.quantity * item.unitRate) + (item.taxAmount || 0) - (item.discountAmount || 0);
      subtotal += (item.quantity * item.unitRate);
      taxTotal += (item.taxAmount || 0);
      return { ...item, netAmount: net, receivedQuantity: 0 };
    });

    const po = new PurchaseOrderModel({
      ...data,
      poId,
      poNumber,
      items: processedItems,
      subtotal,
      taxTotal,
      grandTotal: subtotal + taxTotal,
      status: 'ISSUED'
    });

    const saved = await po.save();
    await logAuditEvent({
      tenantId: data.tenantId,
      actorUserId: 'SYSTEM',
      module: 'procurement',
      action: 'PURCHASE_ORDER_ISSUED',
      recordType: 'PurchaseOrder',
      recordId: saved.poId,
      status: 'success',
      severity: 'high'
    });
    return saved;
  }

  static async listPurchaseOrders(tenantId: string, projectId?: string): Promise<IPurchaseOrder[]> {
    const query: any = { tenantId };
    if (projectId) query.projectId = projectId;
    return await PurchaseOrderModel.find(query).sort({ createdAt: -1 });
  }

  // 5. Procurement Analytics
  static async getProcurementAnalytics(tenantId: string) {
    const vendorsCount = await VendorModel.countDocuments({ tenantId, status: 'ACTIVE' });
    const openPrsCount = await PurchaseRequisitionModel.countDocuments({ tenantId, status: { $in: ['SUBMITTED', 'PENDING_APPROVAL', 'PROCUREMENT_IN_PROGRESS'] } });
    const openRfqsCount = await RFQModel.countDocuments({ tenantId, status: 'ISSUED' });
    const openPosCount = await PurchaseOrderModel.countDocuments({ tenantId, status: { $in: ['ISSUED', 'PARTIALLY_RECEIVED'] } });

    const totalPoAgg = await PurchaseOrderModel.aggregate([
      { $match: { tenantId, status: { $ne: 'CANCELLED' } } },
      { $group: { _id: null, totalSpend: { $sum: '$grandTotal' } } }
    ]);

    return {
      activeVendors: vendorsCount,
      openRequisitions: openPrsCount,
      openRFQs: openRfqsCount,
      openPurchaseOrders: openPosCount,
      totalProcurementSpend: totalPoAgg[0]?.totalSpend || 0
    };
  }
}
