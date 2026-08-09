import { Router } from 'express';
import { authenticateJwt } from '../../../middleware/auth.middleware.js';
import { resolveTenant } from '../../../middleware/tenant.middleware.js';
import { checkModuleLicense } from '../../../middleware/license.middleware.js';
import { checkPermission } from '../../../middleware/rbac.middleware.js';
import { checkProjectScope } from '../../../middleware/scope.middleware.js';
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
router.get('/companies/:companyId', checkPermission('master.company.view'), MasterDataController.getCompanyById);
router.patch('/companies/:companyId', checkPermission('master.company.update'), MasterDataController.updateCompany);
router.post('/companies/:companyId/deactivate', checkPermission('master.company.update'), MasterDataController.deactivateCompany);
router.post('/companies/:companyId/reactivate', checkPermission('master.company.update'), MasterDataController.reactivateCompany);

// Project Routes
router.get('/projects', checkPermission('master.project.view'), MasterDataController.listProjects);
router.post('/projects', checkPermission('master.project.create'), MasterDataController.createProject);
router.get('/projects/:projectId', checkPermission('master.project.view'), checkProjectScope('projectId'), MasterDataController.getProjectById);
router.patch('/projects/:projectId', checkPermission('master.project.create'), checkProjectScope('projectId'), MasterDataController.updateProject);
router.post('/projects/:projectId/status', checkPermission('master.project.create'), checkProjectScope('projectId'), MasterDataController.updateProjectStatus);
router.post('/projects/:projectId/deactivate', checkPermission('master.project.create'), checkProjectScope('projectId'), MasterDataController.deactivateProject);
router.post('/projects/:projectId/reactivate', checkPermission('master.project.create'), checkProjectScope('projectId'), MasterDataController.reactivateProject);

// Building Routes
router.get('/projects/:projectId/buildings', checkPermission('master.project.view'), checkProjectScope('projectId'), MasterDataController.listBuildings);
router.post('/projects/:projectId/buildings', checkPermission('master.project.create'), checkProjectScope('projectId'), MasterDataController.createBuilding);
router.get('/buildings/:buildingId', checkPermission('master.project.view'), MasterDataController.getBuildingById);
router.patch('/buildings/:buildingId', checkPermission('master.project.create'), MasterDataController.updateBuilding);
router.post('/buildings/:buildingId/deactivate', checkPermission('master.project.create'), MasterDataController.deactivateBuilding);

// Tower Routes
router.get('/projects/:projectId/towers', checkPermission('master.project.view'), checkProjectScope('projectId'), MasterDataController.listTowers);
router.post('/projects/:projectId/towers', checkPermission('master.project.create'), checkProjectScope('projectId'), MasterDataController.createTower);
router.get('/towers/:towerId', checkPermission('master.project.view'), MasterDataController.getTowerById);
router.patch('/towers/:towerId', checkPermission('master.project.create'), MasterDataController.updateTower);
router.post('/towers/:towerId/deactivate', checkPermission('master.project.create'), MasterDataController.deactivateTower);

import { asyncHandler } from '../../../utils/asyncHandler.js';

// Floor Routes
router.get('/projects/:projectId/floors', checkPermission('master.project.view'), checkProjectScope('projectId'), asyncHandler(MasterDataController.listFloors));
router.post('/projects/:projectId/floors', checkPermission('master.project.create'), checkProjectScope('projectId'), asyncHandler(MasterDataController.createFloor));
router.get('/floors/:floorId', checkPermission('master.project.view'), asyncHandler(MasterDataController.getFloorById));
router.patch('/floors/:floorId', checkPermission('master.project.create'), asyncHandler(MasterDataController.updateFloor));
router.post('/floors/:floorId/deactivate', checkPermission('master.project.create'), asyncHandler(MasterDataController.deactivateFloor));

// Unit Routes
router.get('/units', checkPermission('master.unit.view'), MasterDataController.listUnits);
router.get('/projects/:projectId/units', checkPermission('master.unit.view'), checkProjectScope('projectId'), MasterDataController.listUnits);
router.post('/projects/:projectId/units', checkPermission('master.unit.create'), checkProjectScope('projectId'), MasterDataController.createUnit);
router.get('/units/:unitId', checkPermission('master.unit.view'), MasterDataController.getUnitById);
router.patch('/units/:unitId', checkPermission('master.unit.create'), MasterDataController.updateUnit);
router.post('/units/:unitId/deactivate', checkPermission('master.unit.change_status'), MasterDataController.deactivateUnit);
router.post('/units/:unitId/reactivate', checkPermission('master.unit.change_status'), MasterDataController.reactivateUnit);
router.patch('/units/:unitId/commercial-status', checkPermission('master.unit.change_status'), MasterDataController.updateUnitCommercialStatus);

// UnitType Routes
router.get('/unit-types', checkPermission('master.unit.view'), MasterDataController.listUnitTypes);
router.post('/unit-types', checkPermission('master.unit.create'), MasterDataController.createUnitType);
router.get('/unit-types/:unitTypeId', checkPermission('master.unit.view'), MasterDataController.getUnitTypeById);
router.patch('/unit-types/:unitTypeId', checkPermission('master.unit.create'), MasterDataController.updateUnitType);
router.post('/unit-types/:unitTypeId/deactivate', checkPermission('master.unit.create'), MasterDataController.deactivateUnitType);
router.post('/unit-types/:unitTypeId/reactivate', checkPermission('master.unit.create'), MasterDataController.reactivateUnitType);

// Property Reference Routes
router.get('/references', checkPermission('master.unit.view'), MasterDataController.listPropertyReferences);
router.post('/references', checkPermission('master.unit.create'), MasterDataController.createPropertyReference);
router.patch('/references/:referenceId', checkPermission('master.unit.create'), MasterDataController.updatePropertyReference);
router.post('/references/:referenceId/deactivate', checkPermission('master.unit.create'), MasterDataController.deactivatePropertyReference);
// Hierarchy Resolution & Bulk Setup Routes
router.get('/units/:unitId/hierarchy', checkPermission('master.unit.view'), MasterDataController.resolveUnitHierarchy);
router.get('/resolve-project', checkPermission('master.project.view'), MasterDataController.resolveResourceProject);
router.get('/projects/:projectId/hierarchy-tree', checkPermission('master.project.view'), checkProjectScope('projectId'), MasterDataController.getProjectHierarchyTree);
router.post('/projects/:projectId/bulk-setup', checkPermission('master.unit.create'), checkProjectScope('projectId'), MasterDataController.bulkPropertySetup);

// Vendor Routes
router.get('/vendors', checkPermission('master.vendor.view'), MasterDataController.listVendors);

export default router;
