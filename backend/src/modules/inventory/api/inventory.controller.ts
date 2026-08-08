import { Response } from 'express';
import { AuthenticatedRequest } from '../../../middleware/auth.middleware.js';
import { InventoryService } from '../services/inventory.service.js';
import { sendSuccess, sendError } from '../../../utils/apiResponse.js';

export class InventoryController {
  // Items
  static async createItem(req: AuthenticatedRequest, res: Response) {
    try {
      const item = await InventoryService.createItem({
        ...req.body,
        tenantId: req.tenantId!
      });
      return sendSuccess(res, item, { message: 'Item created successfully' }, 201);
    } catch (err: any) {
      return sendError(res, err.errorCode || 'ITEM_CREATE_FAILED', err.message, err.statusCode || 500);
    }
  }

  static async listItems(req: AuthenticatedRequest, res: Response) {
    try {
      const category = req.query.category as string;
      const items = await InventoryService.listItems(req.tenantId!, category);
      return sendSuccess(res, items);
    } catch (err: any) {
      return sendError(res, err.errorCode || 'ITEM_FETCH_FAILED', err.message, err.statusCode || 500);
    }
  }

  // Warehouses
  static async createWarehouse(req: AuthenticatedRequest, res: Response) {
    try {
      const wh = await InventoryService.createWarehouse({
        ...req.body,
        tenantId: req.tenantId!
      });
      return sendSuccess(res, wh, { message: 'Warehouse created' }, 201);
    } catch (err: any) {
      return sendError(res, err.errorCode || 'WAREHOUSE_CREATE_FAILED', err.message, err.statusCode || 500);
    }
  }

  static async listWarehouses(req: AuthenticatedRequest, res: Response) {
    try {
      const projectId = req.query.projectId as string;
      const whs = await InventoryService.listWarehouses(req.tenantId!, projectId);
      return sendSuccess(res, whs);
    } catch (err: any) {
      return sendError(res, err.errorCode || 'WAREHOUSE_FETCH_FAILED', err.message, err.statusCode || 500);
    }
  }

  // Goods Receipt (GRN)
  static async processGoodsReceipt(req: AuthenticatedRequest, res: Response) {
    try {
      const grn = await InventoryService.processGoodsReceipt({
        ...req.body,
        tenantId: req.tenantId!,
        receivedBy: req.user?.fullName || 'Store Keeper'
      });
      return sendSuccess(res, grn, { message: 'Goods Receipt processed successfully' }, 201);
    } catch (err: any) {
      return sendError(res, err.errorCode || 'GRN_PROCESS_FAILED', err.message, err.statusCode || 500);
    }
  }

  // Material Issue
  static async issueMaterial(req: AuthenticatedRequest, res: Response) {
    try {
      const txn = await InventoryService.issueMaterial({
        ...req.body,
        tenantId: req.tenantId!,
        performedBy: req.user?.fullName || 'Store Keeper'
      });
      return sendSuccess(res, txn, { message: 'Material issued successfully' }, 201);
    } catch (err: any) {
      return sendError(res, err.errorCode || 'MATERIAL_ISSUE_FAILED', err.message, err.statusCode || 500);
    }
  }

  // Analytics
  static async getAnalytics(req: AuthenticatedRequest, res: Response) {
    try {
      const analytics = await InventoryService.getInventoryAnalytics(req.tenantId!);
      return sendSuccess(res, analytics);
    } catch (err: any) {
      return sendError(res, err.errorCode || 'ANALYTICS_FAILED', err.message, err.statusCode || 500);
    }
  }
}
