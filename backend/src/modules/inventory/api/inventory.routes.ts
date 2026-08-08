import { Router } from 'express';
import { authenticateJwt } from '../../../middleware/auth.middleware.js';
import { resolveTenant } from '../../../middleware/tenant.middleware.js';
import { checkModuleLicense } from '../../../middleware/license.middleware.js';
import { InventoryController } from './inventory.controller.js';

const router = Router();

router.use(authenticateJwt);
router.use(resolveTenant);
router.use(checkModuleLicense('inventory'));

// Items
router.post('/items', InventoryController.createItem);
router.get('/items', InventoryController.listItems);

// Warehouses
router.post('/warehouses', InventoryController.createWarehouse);
router.get('/warehouses', InventoryController.listWarehouses);

// Operations
router.post('/goods-receipt', InventoryController.processGoodsReceipt);
router.post('/issue-material', InventoryController.issueMaterial);

// Analytics
router.get('/analytics', InventoryController.getAnalytics);

export default router;
