import { Router } from 'express';
import { authenticateJwt } from '../../middleware/auth.middleware.js';
import { resolveTenant } from '../../middleware/tenant.middleware.js';
import { checkModuleLicense } from '../../middleware/license.middleware.js';
import { checkPermission } from '../../middleware/rbac.middleware.js';
import { MasterDataController } from './masterdata.controller.js';

const router = Router();

// Apply core platform middleware chain to all Master Data endpoints
router.use(authenticateJwt);
router.use(resolveTenant);
router.use(checkModuleLicense('master-data'));

// Summary Dashboard
router.get('/summary', MasterDataController.getSummary);

// Company Routes
router.get('/companies', checkPermission('master.company.view'), MasterDataController.listCompanies);
router.post('/companies', checkPermission('master.company.create'), MasterDataController.createCompany);

// Project Routes
router.get('/projects', checkPermission('master.project.view'), MasterDataController.listProjects);
router.post('/projects', checkPermission('master.project.create'), MasterDataController.createProject);

// Unit Routes
router.get('/units', checkPermission('master.unit.view'), MasterDataController.listUnits);
router.post('/units', checkPermission('master.unit.create'), MasterDataController.createUnit);
router.patch('/units/:unitId/status', checkPermission('master.unit.change_status'), MasterDataController.updateUnitStatus);
router.patch('/units/:unitId/price', checkPermission('master.unit.change_price'), MasterDataController.updateUnitPrice);

// Vendor Routes
router.get('/vendors', checkPermission('master.vendor.view'), MasterDataController.listVendors);

export default router;
