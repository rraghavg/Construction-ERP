import { ItemMasterModel, IItemMaster } from '../models/itemMaster.model.js';
import { WarehouseModel, IWarehouse } from '../models/warehouse.model.js';
import { InventoryTransactionModel, IInventoryTransaction } from '../models/inventoryTransaction.model.js';
import { GoodsReceiptModel, IGoodsReceipt } from '../models/goodsReceipt.model.js';
import { StockTransferModel, IStockTransfer } from '../models/stockTransfer.model.js';
import { StockCountModel, IStockCount } from '../models/stockCount.model.js';
import { PurchaseOrderModel } from '../../procurement/models/purchaseOrder.model.js';
import { ApiError } from '../../../utils/apiError.js';
import { logAuditEvent } from '../../../shared/audit/audit.model.js';

export class InventoryService {
  private static itemSeq = 100;
  private static whSeq = 100;
  private static grnSeq = 100;
  private static stSeq = 100;
  private static scSeq = 100;

  // 1. Item Master
  static async createItem(data: Partial<IItemMaster> & { tenantId: string; name: string; category: string }): Promise<IItemMaster> {
    const itemCode = `ITM-2026-${String(++this.itemSeq).padStart(6, '0')}`;
    const itemId = `ITM-${Date.now().toString().slice(-6)}`;
    const item = new ItemMasterModel({
      ...data,
      itemId,
      itemCode
    });
    return await item.save();
  }

  static async listItems(tenantId: string, category?: string): Promise<IItemMaster[]> {
    const query: any = { tenantId, isActive: true };
    if (category) query.category = category;
    return await ItemMasterModel.find(query).sort({ name: 1 });
  }

  // 2. Warehouses
  static async createWarehouse(data: Partial<IWarehouse> & { tenantId: string; companyId: string; projectId: string; code: string; name: string; location: string }): Promise<IWarehouse> {
    const warehouseId = `WH-${Date.now().toString().slice(-6)}`;
    const wh = new WarehouseModel({
      ...data,
      warehouseId
    });
    return await wh.save();
  }

  static async listWarehouses(tenantId: string, projectId?: string): Promise<IWarehouse[]> {
    const query: any = { tenantId, status: 'ACTIVE' };
    if (projectId) query.projectId = projectId;
    return await WarehouseModel.find(query).sort({ name: 1 });
  }

  // 3. Goods Receipt (GRN) Process & Stock Addition
  static async processGoodsReceipt(data: {
    tenantId: string;
    companyId: string;
    projectId: string;
    poId: string;
    vendorId: string;
    warehouseId: string;
    receivedBy: string;
    remarks?: string;
    items: { itemId: string; orderedQty: number; receivedQty: number; acceptedQty: number; rejectedQty: number; unitCost: number }[];
  }): Promise<IGoodsReceipt> {
    const grnNumber = `GRN-2026-${String(++this.grnSeq).padStart(6, '0')}`;
    const grnId = `GRN-${Date.now().toString().slice(-6)}`;

    const grn = new GoodsReceiptModel({
      ...data,
      grnId,
      grnNumber,
      status: 'ACCEPTED'
    });

    const savedGrn = await grn.save();

    // Post Inventory Transactions & update PO received quantity
    const po = await PurchaseOrderModel.findOne({ tenantId: data.tenantId, poId: data.poId });

    for (const item of data.items) {
      if (item.acceptedQty > 0) {
        const txnId = `TXN-${Date.now().toString().slice(-6)}-${Math.random().toString(36).substr(2, 4)}`;
        await InventoryTransactionModel.create({
          txnId,
          tenantId: data.tenantId,
          companyId: data.companyId,
          projectId: data.projectId,
          warehouseId: data.warehouseId,
          itemId: item.itemId,
          txnType: 'GRN_RECEIPT',
          quantity: item.acceptedQty,
          unitCost: item.unitCost,
          totalValue: item.acceptedQty * item.unitCost,
          referenceType: 'GRN',
          referenceId: grnId,
          notes: `GRN Receipt from PO ${data.poId}`,
          performedBy: data.receivedBy
        });
      }

      // Update PO line received quantity if PO exists
      if (po) {
        const poLine = po.items.find((line) => line.itemId === item.itemId);
        if (poLine) {
          poLine.receivedQuantity = (poLine.receivedQuantity || 0) + item.acceptedQty;
        }
      }
    }

    if (po) {
      const allFullyReceived = po.items.every((line) => line.receivedQuantity >= line.quantity);
      po.status = allFullyReceived ? 'RECEIVED' : 'PARTIALLY_RECEIVED';
      await po.save();
    }

    await logAuditEvent({
      tenantId: data.tenantId,
      actorUserId: data.receivedBy,
      module: 'inventory',
      action: 'GOODS_RECEIPT_PROCESSED',
      recordType: 'GoodsReceipt',
      recordId: grnId,
      status: 'success',
      severity: 'high'
    });

    return savedGrn;
  }

  // 4. Material Issue / Consumption
  static async issueMaterial(data: {
    tenantId: string;
    companyId: string;
    projectId: string;
    warehouseId: string;
    itemId: string;
    quantity: number;
    uom: string;
    unitCost?: number;
    notes?: string;
    issuedTo: string;
    performedBy: string;
  }): Promise<IInventoryTransaction> {
    const txnId = `TXN-${Date.now().toString().slice(-6)}-${Math.random().toString(36).substr(2, 4)}`;
    
    // Check available stock
    const balanceAgg = await InventoryTransactionModel.aggregate([
      { $match: { tenantId: data.tenantId, warehouseId: data.warehouseId, itemId: data.itemId } },
      { $group: { _id: null, currentQty: { $sum: '$quantity' } } }
    ]);
    const currentBalance = balanceAgg[0]?.currentQty || 0;
    if (currentBalance < data.quantity) {
      throw new ApiError(400, 'INSUFFICIENT_STOCK', `Insufficient stock. Current available: ${currentBalance}, Requested: ${data.quantity}`);
    }

    const cost = data.unitCost || 0;
    const txn = new InventoryTransactionModel({
      txnId,
      tenantId: data.tenantId,
      companyId: data.companyId,
      projectId: data.projectId,
      warehouseId: data.warehouseId,
      itemId: data.itemId,
      txnType: 'ISSUE_CONSUMPTION',
      quantity: -Math.abs(data.quantity), // negative for issue
      uom: data.uom,
      unitCost: cost,
      totalValue: Math.abs(data.quantity) * cost,
      referenceType: 'MATERIAL_ISSUE',
      notes: data.notes || `Issued to ${data.issuedTo}`,
      performedBy: data.performedBy
    });

    const saved = await txn.save();
    await logAuditEvent({
      tenantId: data.tenantId,
      actorUserId: data.performedBy,
      module: 'inventory',
      action: 'STOCK_ISSUED',
      recordType: 'InventoryTransaction',
      recordId: txnId,
      status: 'success',
      severity: 'medium'
    });

    return saved;
  }

  // 5. Stock Balance & Analytics
  static async getInventoryAnalytics(tenantId: string) {
    const totalItems = await ItemMasterModel.countDocuments({ tenantId, isActive: true });
    const totalWarehouses = await WarehouseModel.countDocuments({ tenantId, status: 'ACTIVE' });
    
    const stockAgg = await InventoryTransactionModel.aggregate([
      { $match: { tenantId } },
      {
        $group: {
          _id: '$itemId',
          totalQuantity: { $sum: '$quantity' },
          totalValue: { $sum: '$totalValue' }
        }
      }
    ]);

    let totalStockQty = 0;
    let totalStockVal = 0;
    let lowStockCount = 0;

    for (const item of stockAgg) {
      totalStockQty += item.totalQuantity;
      totalStockVal += item.totalValue;
      if (item.totalQuantity < 10) lowStockCount++;
    }

    return {
      totalItems,
      activeWarehouses: totalWarehouses,
      totalStockQuantity: totalStockQty,
      totalInventoryValue: totalStockVal,
      lowStockAlertsCount: lowStockCount
    };
  }
}
