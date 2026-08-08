import { Response } from 'express';
import { AuthenticatedRequest } from '../../../middleware/auth.middleware.js';
import { MasterDataService } from '../services/masterdata.service.js';
import { sendSuccess } from '../../../utils/apiResponse.js';

export class MasterDataController {
  // Summary Dashboard
  static async getSummary(req: AuthenticatedRequest, res: Response) {
    const summary = await MasterDataService.getSummaryCounters(
      req.tenantId!,
      req.user.allowedProjects
    );
    return sendSuccess(res, summary);
  }

  // Companies
  static async listCompanies(req: AuthenticatedRequest, res: Response) {
    const { status, search, page, limit } = req.query;
    const result = await MasterDataService.listCompanies(req.tenantId!, {
      status: status as string,
      search: search as string,
      page: page ? parseInt(page as string, 10) : 1,
      limit: limit ? parseInt(limit as string, 10) : 20
    });

    return sendSuccess(res, result.items, { total: result.total, page: result.page, limit: result.limit });
  }

  static async createCompany(req: AuthenticatedRequest, res: Response) {
    const company = await MasterDataService.createCompany(req.tenantId!, req.user.userId, req.body);
    return sendSuccess(res, company, {}, 201);
  }

  static async getCompanyById(req: AuthenticatedRequest, res: Response) {
    const { companyId } = req.params;
    const company = await MasterDataService.getCompanyById(req.tenantId!, companyId);
    return sendSuccess(res, company);
  }

  static async updateCompany(req: AuthenticatedRequest, res: Response) {
    const { companyId } = req.params;
    const company = await MasterDataService.updateCompany(req.tenantId!, companyId, req.user.userId, req.body);
    return sendSuccess(res, company);
  }

  static async deactivateCompany(req: AuthenticatedRequest, res: Response) {
    const { companyId } = req.params;
    const company = await MasterDataService.deactivateCompany(req.tenantId!, companyId, req.user.userId);
    return sendSuccess(res, company);
  }

  static async reactivateCompany(req: AuthenticatedRequest, res: Response) {
    const { companyId } = req.params;
    const company = await MasterDataService.reactivateCompany(req.tenantId!, companyId, req.user.userId);
    return sendSuccess(res, company);
  }

  // Projects
  static async listProjects(req: AuthenticatedRequest, res: Response) {
    const { companyId, status, search, page, limit } = req.query;
    const result = await MasterDataService.listProjects(
      req.tenantId!,
      req.user.allowedProjects,
      {
        companyId: companyId as string,
        status: status as string,
        search: search as string,
        page: page ? parseInt(page as string, 10) : 1,
        limit: limit ? parseInt(limit as string, 10) : 20
      }
    );

    return sendSuccess(res, result.items, { total: result.total, page: result.page, limit: result.limit });
  }

  static async createProject(req: AuthenticatedRequest, res: Response) {
    const project = await MasterDataService.createProject(req.tenantId!, req.user.userId, req.body);
    return sendSuccess(res, project, {}, 201);
  }

  static async getProjectById(req: AuthenticatedRequest, res: Response) {
    const { projectId } = req.params;
    const project = await MasterDataService.getProjectById(req.tenantId!, projectId);
    return sendSuccess(res, project);
  }

  static async updateProject(req: AuthenticatedRequest, res: Response) {
    const { projectId } = req.params;
    const project = await MasterDataService.updateProject(req.tenantId!, projectId, req.user.userId, req.body);
    return sendSuccess(res, project);
  }

  static async updateProjectStatus(req: AuthenticatedRequest, res: Response) {
    const { projectId } = req.params;
    const { status } = req.body;
    const project = await MasterDataService.updateProjectStatus(req.tenantId!, projectId, req.user.userId, status);
    return sendSuccess(res, project);
  }

  static async deactivateProject(req: AuthenticatedRequest, res: Response) {
    const { projectId } = req.params;
    const project = await MasterDataService.deactivateProject(req.tenantId!, projectId, req.user.userId);
    return sendSuccess(res, project);
  }

  static async reactivateProject(req: AuthenticatedRequest, res: Response) {
    const { projectId } = req.params;
    const project = await MasterDataService.reactivateProject(req.tenantId!, projectId, req.user.userId);
    return sendSuccess(res, project);
  }

  // Buildings
  static async listBuildings(req: AuthenticatedRequest, res: Response) {
    const { projectId } = req.params;
    const { status, search, page, limit } = req.query;
    const result = await MasterDataService.listBuildings(req.tenantId!, projectId, {
      status: status as string,
      search: search as string,
      page: page ? parseInt(page as string, 10) : 1,
      limit: limit ? parseInt(limit as string, 10) : 50
    });
    return sendSuccess(res, result.items, { total: result.total, page: result.page, limit: result.limit });
  }

  static async getBuildingById(req: AuthenticatedRequest, res: Response) {
    const { buildingId } = req.params;
    const building = await MasterDataService.getBuildingById(req.tenantId!, buildingId);
    return sendSuccess(res, building);
  }

  static async createBuilding(req: AuthenticatedRequest, res: Response) {
    const { projectId } = req.params;
    const building = await MasterDataService.createBuilding(req.tenantId!, req.user.userId, projectId, req.body);
    return sendSuccess(res, building, {}, 201);
  }

  static async updateBuilding(req: AuthenticatedRequest, res: Response) {
    const { buildingId } = req.params;
    const building = await MasterDataService.updateBuilding(req.tenantId!, buildingId, req.user.userId, req.body);
    return sendSuccess(res, building);
  }

  static async deactivateBuilding(req: AuthenticatedRequest, res: Response) {
    const { buildingId } = req.params;
    const building = await MasterDataService.deactivateBuilding(req.tenantId!, buildingId, req.user.userId);
    return sendSuccess(res, building);
  }

  // Towers
  static async listTowers(req: AuthenticatedRequest, res: Response) {
    const { projectId } = req.params;
    const { buildingId, status, search, page, limit } = req.query;
    const result = await MasterDataService.listTowers(req.tenantId!, projectId, buildingId as string, {
      status: status as string,
      search: search as string,
      page: page ? parseInt(page as string, 10) : 1,
      limit: limit ? parseInt(limit as string, 10) : 50
    });
    return sendSuccess(res, result.items, { total: result.total, page: result.page, limit: result.limit });
  }

  static async getTowerById(req: AuthenticatedRequest, res: Response) {
    const { towerId } = req.params;
    const tower = await MasterDataService.getTowerById(req.tenantId!, towerId);
    return sendSuccess(res, tower);
  }

  static async createTower(req: AuthenticatedRequest, res: Response) {
    const { projectId } = req.params;
    const tower = await MasterDataService.createTower(req.tenantId!, req.user.userId, projectId, req.body);
    return sendSuccess(res, tower, {}, 201);
  }

  static async updateTower(req: AuthenticatedRequest, res: Response) {
    const { towerId } = req.params;
    const tower = await MasterDataService.updateTower(req.tenantId!, towerId, req.user.userId, req.body);
    return sendSuccess(res, tower);
  }

  static async deactivateTower(req: AuthenticatedRequest, res: Response) {
    const { towerId } = req.params;
    const tower = await MasterDataService.deactivateTower(req.tenantId!, towerId, req.user.userId);
    return sendSuccess(res, tower);
  }

  // Floors
  static async listFloors(req: AuthenticatedRequest, res: Response) {
    const { projectId } = req.params;
    const { buildingId, towerId, status, search, page, limit } = req.query;
    const result = await MasterDataService.listFloors(req.tenantId!, projectId, buildingId as string, towerId as string, {
      status: status as string,
      search: search as string,
      page: page ? parseInt(page as string, 10) : 1,
      limit: limit ? parseInt(limit as string, 10) : 100
    });
    return sendSuccess(res, result.items, { total: result.total, page: result.page, limit: result.limit });
  }

  static async getFloorById(req: AuthenticatedRequest, res: Response) {
    const { floorId } = req.params;
    const floor = await MasterDataService.getFloorById(req.tenantId!, floorId);
    return sendSuccess(res, floor);
  }

  static async createFloor(req: AuthenticatedRequest, res: Response) {
    const { projectId } = req.params;
    const floor = await MasterDataService.createFloor(req.tenantId!, req.user.userId, projectId, req.body);
    return sendSuccess(res, floor, {}, 201);
  }

  static async updateFloor(req: AuthenticatedRequest, res: Response) {
    const { floorId } = req.params;
    const floor = await MasterDataService.updateFloor(req.tenantId!, floorId, req.user.userId, req.body);
    return sendSuccess(res, floor);
  }

  static async deactivateFloor(req: AuthenticatedRequest, res: Response) {
    const { floorId } = req.params;
    const floor = await MasterDataService.deactivateFloor(req.tenantId!, floorId, req.user.userId);
    return sendSuccess(res, floor);
  }

  // Units
  static async listUnits(req: AuthenticatedRequest, res: Response) {
    const projectId = (req.params.projectId || req.query.projectId) as string;
    const { buildingId, towerId, floorId, status, commercialStatus, search, page, limit } = req.query;
    const result = await MasterDataService.listUnits(req.tenantId!, {
      projectId,
      buildingId: buildingId as string,
      towerId: towerId as string,
      floorId: floorId as string,
      status: status as string,
      commercialStatus: commercialStatus as string,
      search: search as string,
      page: page ? parseInt(page as string, 10) : 1,
      limit: limit ? parseInt(limit as string, 10) : 50
    });

    return sendSuccess(res, result.items, { total: result.total, page: result.page, limit: result.limit });
  }

  static async getUnitById(req: AuthenticatedRequest, res: Response) {
    const { unitId } = req.params;
    const unit = await MasterDataService.getUnitById(req.tenantId!, unitId);
    return sendSuccess(res, unit);
  }

  static async createUnit(req: AuthenticatedRequest, res: Response) {
    const projectId = req.params.projectId || req.body.projectId;
    const unit = await MasterDataService.createUnit(req.tenantId!, req.user.userId, projectId, req.body);
    return sendSuccess(res, unit, {}, 201);
  }

  static async updateUnit(req: AuthenticatedRequest, res: Response) {
    const { unitId } = req.params;
    const unit = await MasterDataService.updateUnit(req.tenantId!, unitId, req.user.userId, req.body);
    return sendSuccess(res, unit);
  }

  static async deactivateUnit(req: AuthenticatedRequest, res: Response) {
    const { unitId } = req.params;
    const unit = await MasterDataService.deactivateUnit(req.tenantId!, unitId, req.user.userId);
    return sendSuccess(res, unit);
  }

  static async reactivateUnit(req: AuthenticatedRequest, res: Response) {
    const { unitId } = req.params;
    const unit = await MasterDataService.reactivateUnit(req.tenantId!, unitId, req.user.userId);
    return sendSuccess(res, unit);
  }

  static async updateUnitCommercialStatus(req: AuthenticatedRequest, res: Response) {
    const { unitId } = req.params;
    const { commercialStatus } = req.body;
    const unit = await MasterDataService.updateUnitCommercialStatus(req.tenantId!, unitId, req.user.userId, commercialStatus);
    return sendSuccess(res, unit);
  }

  // Unit Types
  static async listUnitTypes(req: AuthenticatedRequest, res: Response) {
    const { status, search } = req.query;
    const unitTypes = await MasterDataService.listUnitTypes(req.tenantId!, {
      status: status as string,
      search: search as string
    });
    return sendSuccess(res, unitTypes);
  }

  static async getUnitTypeById(req: AuthenticatedRequest, res: Response) {
    const { unitTypeId } = req.params;
    const unitType = await MasterDataService.getUnitTypeById(req.tenantId!, unitTypeId);
    return sendSuccess(res, unitType);
  }

  static async createUnitType(req: AuthenticatedRequest, res: Response) {
    const unitType = await MasterDataService.createUnitType(req.tenantId!, req.user.userId, req.body);
    return sendSuccess(res, unitType, {}, 201);
  }

  static async updateUnitType(req: AuthenticatedRequest, res: Response) {
    const { unitTypeId } = req.params;
    const unitType = await MasterDataService.updateUnitType(req.tenantId!, unitTypeId, req.user.userId, req.body);
    return sendSuccess(res, unitType);
  }

  static async deactivateUnitType(req: AuthenticatedRequest, res: Response) {
    const { unitTypeId } = req.params;
    const unitType = await MasterDataService.deactivateUnitType(req.tenantId!, unitTypeId, req.user.userId);
    return sendSuccess(res, unitType);
  }

  static async reactivateUnitType(req: AuthenticatedRequest, res: Response) {
    const { unitTypeId } = req.params;
    const unitType = await MasterDataService.reactivateUnitType(req.tenantId!, unitTypeId, req.user.userId);
    return sendSuccess(res, unitType);
  }

  // Property References
  static async listPropertyReferences(req: AuthenticatedRequest, res: Response) {
    const { category, status } = req.query;
    const references = await MasterDataService.listPropertyReferences(req.tenantId!, category as string, status as string);
    return sendSuccess(res, references);
  }

  static async createPropertyReference(req: AuthenticatedRequest, res: Response) {
    const refDoc = await MasterDataService.createPropertyReference(req.tenantId!, req.user.userId, req.body);
    return sendSuccess(res, refDoc, {}, 201);
  }

  static async updatePropertyReference(req: AuthenticatedRequest, res: Response) {
    const { referenceId } = req.params;
    const refDoc = await MasterDataService.updatePropertyReference(req.tenantId!, referenceId, req.user.userId, req.body);
    return sendSuccess(res, refDoc);
  }

  static async deactivatePropertyReference(req: AuthenticatedRequest, res: Response) {
    const { referenceId } = req.params;
    const refDoc = await MasterDataService.deactivatePropertyReference(req.tenantId!, referenceId, req.user.userId);
    return sendSuccess(res, refDoc);
  }

  static async reactivatePropertyReference(req: AuthenticatedRequest, res: Response) {
    const { referenceId } = req.params;
    const refDoc = await MasterDataService.reactivatePropertyReference(req.tenantId!, referenceId, req.user.userId);
    return sendSuccess(res, refDoc);
  }

  // Hierarchy Resolution
  static async resolveUnitHierarchy(req: AuthenticatedRequest, res: Response) {
    const { unitId } = req.params;
    const hierarchy = await MasterDataService.resolveUnitHierarchy(req.tenantId!, unitId);
    return sendSuccess(res, hierarchy);
  }

  static async resolveResourceProject(req: AuthenticatedRequest, res: Response) {
    const { resourceType, resourceId } = req.query;
    const resolution = await MasterDataService.resolveResourceProject(
      req.tenantId!,
      resourceType as any,
      resourceId as string
    );
    return sendSuccess(res, resolution);
  }

  static async getProjectHierarchyTree(req: AuthenticatedRequest, res: Response) {
    const { projectId } = req.params;
    const tree = await MasterDataService.getProjectHierarchyTree(req.tenantId!, projectId);
    return sendSuccess(res, tree);
  }

  // Bulk Property Setup
  static async bulkPropertySetup(req: AuthenticatedRequest, res: Response) {
    const { projectId } = req.params;
    const result = await MasterDataService.bulkPropertySetup(req.tenantId!, req.user.userId, projectId, req.body);
    return sendSuccess(res, result);
  }

  // Vendors
  static async listVendors(req: AuthenticatedRequest, res: Response) {
    const userPermissions = req.user.permissions || [];
    const canViewSensitive = req.user.isSuperAdmin || userPermissions.includes('master.vendor.view_sensitive');
    const vendors = await MasterDataService.listVendors(req.tenantId!, !canViewSensitive);
    return sendSuccess(res, vendors);
  }
}
