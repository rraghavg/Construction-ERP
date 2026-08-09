import { CompanyModel } from '../models/company.model.js';
import { ProjectModel } from '../models/project.model.js';
import { BuildingModel, TowerModel, FloorModel } from '../models/hierarchy.model.js';
import { UnitTypeModel, UnitModel } from '../models/unit.model.js';
import { VendorModel, DealerModel, BankModel } from '../models/commercial.model.js';
import { PropertyReferenceModel, TaxModel, PaymentModeModel, ComplaintCategoryModel } from '../models/reference.model.js';
import { logAuditEvent } from '../../../shared/audit/audit.model.js';
import { ApiError } from '../../../utils/apiError.js';

export class MasterDataService {
  // ---- Company Operations ----
  static async listCompanies(tenantId: string, query: { status?: string; search?: string; page?: number; limit?: number }) {
    const page = query.page || 1;
    const limit = query.limit || 20;
    const skip = (page - 1) * limit;

    const filter: any = { tenantId };
    if (query.status) filter.status = query.status;
    if (query.search) {
      filter.$or = [
        { name: { $regex: query.search, $options: 'i' } },
        { code: { $regex: query.search, $options: 'i' } }
      ];
    }

    const [items, total] = await Promise.all([
      CompanyModel.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      CompanyModel.countDocuments(filter)
    ]);

    return { items, total, page, limit };
  }

  static async getCompanyById(tenantId: string, companyId: string) {
    const company = await CompanyModel.findOne({ tenantId, companyId });
    if (!company) {
      throw new ApiError(404, 'COMPANY_NOT_FOUND', `Company '${companyId}' not found in tenant`);
    }
    return company;
  }

  static async createCompany(tenantId: string, actorUserId: string, data: any) {
    const cleanCode = data.code ? data.code.trim().toUpperCase() : '';
    if (!cleanCode || !/^[A-Z0-9-]+$/.test(cleanCode)) {
      throw new ApiError(400, 'INVALID_INPUT', 'Company code must contain uppercase letters, numbers, or hyphens');
    }

    const existing = await CompanyModel.findOne({ tenantId, code: cleanCode });
    if (existing) {
      throw new ApiError(409, 'RESOURCE_CONFLICT', `Company code '${cleanCode}' already exists in tenant`);
    }

    const companyId = `COMP-${Date.now()}`;
    const company = await CompanyModel.create({
      ...data,
      companyId,
      tenantId, // Trusted server context
      code: cleanCode,
      createdBy: actorUserId,
      status: 'active'
    });

    await logAuditEvent({
      tenantId,
      actorUserId,
      module: 'master-data',
      action: 'Created Company',
      recordType: 'company',
      recordId: companyId,
      afterState: company.toObject(),
      status: 'success',
      severity: 'medium'
    });

    return company;
  }

  static async updateCompany(tenantId: string, companyId: string, actorUserId: string, data: any) {
    const company = await CompanyModel.findOne({ tenantId, companyId });
    if (!company) {
      throw new ApiError(404, 'COMPANY_NOT_FOUND', `Company '${companyId}' not found in tenant`);
    }

    const beforeState = company.toObject();

    // Protect immutable identity properties
    delete data.companyId;
    delete data.tenantId;
    delete data.code;

    Object.assign(company, data);
    company.updatedBy = actorUserId;
    await company.save();

    await logAuditEvent({
      tenantId,
      actorUserId,
      module: 'master-data',
      action: 'Updated Company',
      recordType: 'company',
      recordId: companyId,
      beforeState,
      afterState: company.toObject(),
      status: 'success',
      severity: 'medium'
    });

    return company;
  }

  static async deactivateCompany(tenantId: string, companyId: string, actorUserId: string) {
    const company = await CompanyModel.findOne({ tenantId, companyId });
    if (!company) {
      throw new ApiError(404, 'COMPANY_NOT_FOUND', `Company '${companyId}' not found in tenant`);
    }

    // Referential Protection: Block deactivation if active projects exist for this company
    const activeProjectsCount = await ProjectModel.countDocuments({
      tenantId,
      companyId,
      status: { $ne: 'INACTIVE' }
    });

    if (activeProjectsCount > 0) {
      throw new ApiError(
        403,
        'COMPANY_HAS_ACTIVE_PROJECTS',
        `Cannot deactivate company '${companyId}' because it has ${activeProjectsCount} active or ongoing project(s)`
      );
    }

    const beforeState = { status: company.status };
    company.status = 'inactive';
    company.updatedBy = actorUserId;
    await company.save();

    await logAuditEvent({
      tenantId,
      actorUserId,
      module: 'master-data',
      action: 'Deactivated Company',
      recordType: 'company',
      recordId: companyId,
      beforeState,
      afterState: { status: 'inactive' },
      status: 'success',
      severity: 'high'
    });

    return company;
  }

  static async reactivateCompany(tenantId: string, companyId: string, actorUserId: string) {
    const company = await CompanyModel.findOne({ tenantId, companyId });
    if (!company) {
      throw new ApiError(404, 'COMPANY_NOT_FOUND', `Company '${companyId}' not found in tenant`);
    }

    const beforeState = { status: company.status };
    company.status = 'active';
    company.updatedBy = actorUserId;
    await company.save();

    await logAuditEvent({
      tenantId,
      actorUserId,
      module: 'master-data',
      action: 'Reactivated Company',
      recordType: 'company',
      recordId: companyId,
      beforeState,
      afterState: { status: 'active' },
      status: 'success',
      severity: 'medium'
    });

    return company;
  }

  // ---- Project Operations ----
  static async listProjects(tenantId: string, allowedProjects: string[], query: { companyId?: string; status?: string; search?: string; page?: number; limit?: number }) {
    const page = query.page || 1;
    const limit = query.limit || 20;
    const skip = (page - 1) * limit;

    const filter: any = { tenantId };
    if (query.companyId) filter.companyId = query.companyId;
    if (query.status) filter.status = query.status;

    // Apply Resource Scope
    if (allowedProjects && allowedProjects.length > 0) {
      filter.name = { $in: allowedProjects };
    }

    if (query.search) {
      filter.$or = [
        { name: { $regex: query.search, $options: 'i' } },
        { code: { $regex: query.search, $options: 'i' } }
      ];
    }

    const [items, total] = await Promise.all([
      ProjectModel.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      ProjectModel.countDocuments(filter)
    ]);

    return { items, total, page, limit };
  }

  static async getProjectById(tenantId: string, projectId: string) {
    const project = await ProjectModel.findOne({ tenantId, projectId });
    if (!project) {
      throw new ApiError(404, 'PROJECT_NOT_FOUND', `Project '${projectId}' not found in tenant`);
    }
    return project;
  }

  static async createProject(tenantId: string, actorUserId: string, data: any) {
    const company = await CompanyModel.findOne({ tenantId, companyId: data.companyId, status: 'active' });
    if (!company) {
      throw new ApiError(404, 'COMPANY_NOT_FOUND', `Active Parent Company '${data.companyId}' not found in tenant`);
    }

    const cleanCode = data.code ? data.code.trim().toUpperCase() : '';
    if (!cleanCode || !/^[A-Z0-9-]+$/.test(cleanCode)) {
      throw new ApiError(400, 'INVALID_INPUT', 'Project code must contain uppercase letters, numbers, or hyphens');
    }

    const existing = await ProjectModel.findOne({ tenantId, code: cleanCode });
    if (existing) {
      throw new ApiError(409, 'RESOURCE_CONFLICT', `Project code '${cleanCode}' already exists in tenant`);
    }

    const projectId = `PRJ-${Date.now()}`;
    const project = await ProjectModel.create({
      ...data,
      projectId,
      tenantId, // Server trusted context
      code: cleanCode,
      status: data.status || 'PLANNING',
      structureConfig: {
        buildingEnabled: data.structureConfig?.buildingEnabled ?? true,
        towerEnabled: data.structureConfig?.towerEnabled ?? true,
        towerRequiresBuilding: data.structureConfig?.towerRequiresBuilding ?? false,
        floorEnabled: data.structureConfig?.floorEnabled ?? true
      },
      createdBy: actorUserId
    });

    await logAuditEvent({
      tenantId,
      actorUserId,
      module: 'master-data',
      action: 'Created Project',
      recordType: 'project',
      recordId: projectId,
      afterState: project.toObject(),
      status: 'success',
      severity: 'medium'
    });

    return project;
  }

  static async updateProject(tenantId: string, projectId: string, actorUserId: string, data: any) {
    const project = await ProjectModel.findOne({ tenantId, projectId });
    if (!project) {
      throw new ApiError(404, 'PROJECT_NOT_FOUND', `Project '${projectId}' not found in tenant`);
    }

    const beforeState = project.toObject();

    // Protect immutable identity & company properties
    delete data.projectId;
    delete data.tenantId;
    delete data.companyId; // Immutable company assignment!
    delete data.code;

    // Structure Mutation Protection
    if (data.structureConfig) {
      const newConfig = data.structureConfig;
      if (newConfig.buildingEnabled === false && project.structureConfig.buildingEnabled !== false) {
        const buildingsCount = await BuildingModel.countDocuments({ tenantId, projectId });
        if (buildingsCount > 0) {
          throw new ApiError(
            403,
            'STRUCTURE_MUTATION_DENIED',
            `Cannot disable Building support for project '${projectId}' because ${buildingsCount} building(s) exist`
          );
        }
      }

      if (newConfig.towerEnabled === false && project.structureConfig.towerEnabled !== false) {
        const towersCount = await TowerModel.countDocuments({ tenantId, projectId });
        if (towersCount > 0) {
          throw new ApiError(
            403,
            'STRUCTURE_MUTATION_DENIED',
            `Cannot disable Tower support for project '${projectId}' because ${towersCount} tower(s) exist`
          );
        }
      }

      if (newConfig.towerRequiresBuilding === true && !project.structureConfig.towerRequiresBuilding) {
        const directTowersCount = await TowerModel.countDocuments({ tenantId, projectId, buildingId: { $exists: false } });
        if (directTowersCount > 0) {
          throw new ApiError(
            403,
            'STRUCTURE_MUTATION_DENIED',
            `Cannot require Building for Towers because ${directTowersCount} direct tower(s) without building exist`
          );
        }
      }

      project.structureConfig = { ...project.structureConfig, ...newConfig };
      delete data.structureConfig;
    }

    Object.assign(project, data);
    project.updatedBy = actorUserId;
    await project.save();

    await logAuditEvent({
      tenantId,
      actorUserId,
      module: 'master-data',
      action: 'Updated Project',
      recordType: 'project',
      recordId: projectId,
      beforeState,
      afterState: project.toObject(),
      status: 'success',
      severity: 'medium'
    });

    return project;
  }

  static async updateProjectStatus(tenantId: string, projectId: string, actorUserId: string, newStatus: string) {
    const project = await ProjectModel.findOne({ tenantId, projectId });
    if (!project) {
      throw new ApiError(404, 'PROJECT_NOT_FOUND', `Project '${projectId}' not found in tenant`);
    }

    const currentStatus = project.status;
    const allowedTransitions: Record<string, string[]> = {
      PLANNING: ['ACTIVE', 'INACTIVE'],
      ACTIVE: ['ON_HOLD', 'COMPLETED', 'INACTIVE'],
      ON_HOLD: ['ACTIVE', 'INACTIVE'],
      COMPLETED: ['INACTIVE'],
      INACTIVE: [] // Must use reactivateProject endpoint
    };

    const validNext = allowedTransitions[currentStatus] || [];
    if (!validNext.includes(newStatus)) {
      throw new ApiError(
        422,
        'INVALID_STATUS_TRANSITION',
        `Cannot transition project from '${currentStatus}' to '${newStatus}'`
      );
    }

    const beforeState = { status: currentStatus };
    project.status = newStatus as any;
    project.updatedBy = actorUserId;
    await project.save();

    await logAuditEvent({
      tenantId,
      actorUserId,
      module: 'master-data',
      action: 'Updated Project Status',
      recordType: 'project',
      recordId: projectId,
      beforeState,
      afterState: { status: newStatus },
      status: 'success',
      severity: 'medium'
    });

    return project;
  }

  static async deactivateProject(tenantId: string, projectId: string, actorUserId: string) {
    const project = await ProjectModel.findOne({ tenantId, projectId });
    if (!project) {
      throw new ApiError(404, 'PROJECT_NOT_FOUND', `Project '${projectId}' not found in tenant`);
    }

    if (project.status === 'INACTIVE') {
      return project;
    }

    const beforeState = { status: project.status };
    project.statusBeforeInactive = project.status as any;
    project.status = 'INACTIVE';
    project.updatedBy = actorUserId;
    await project.save();

    await logAuditEvent({
      tenantId,
      actorUserId,
      module: 'master-data',
      action: 'Deactivated Project',
      recordType: 'project',
      recordId: projectId,
      beforeState,
      afterState: { status: 'INACTIVE', statusBeforeInactive: project.statusBeforeInactive },
      status: 'success',
      severity: 'high'
    });

    return project;
  }

  static async reactivateProject(tenantId: string, projectId: string, actorUserId: string) {
    const project = await ProjectModel.findOne({ tenantId, projectId });
    if (!project) {
      throw new ApiError(404, 'PROJECT_NOT_FOUND', `Project '${projectId}' not found in tenant`);
    }

    if (project.status !== 'INACTIVE') {
      throw new ApiError(400, 'PROJECT_NOT_INACTIVE', `Project '${projectId}' is not currently inactive`);
    }

    const restoredStatus = project.statusBeforeInactive || 'ACTIVE';
    const beforeState = { status: project.status };
    project.status = restoredStatus as any;
    project.statusBeforeInactive = undefined;
    project.updatedBy = actorUserId;
    await project.save();

    await logAuditEvent({
      tenantId,
      actorUserId,
      module: 'master-data',
      action: 'Reactivated Project',
      recordType: 'project',
      recordId: projectId,
      beforeState,
      afterState: { status: restoredStatus },
      status: 'success',
      severity: 'medium'
    });

    return project;
  }

  // ---- Building Operations ----
  static async listBuildings(tenantId: string, projectId: string, query: { status?: string; search?: string; page?: number; limit?: number }) {
    const page = query.page || 1;
    const limit = query.limit || 50;
    const skip = (page - 1) * limit;

    const filter: any = { tenantId, projectId };
    if (query.status) filter.status = query.status;
    if (query.search) {
      filter.$or = [
        { name: { $regex: query.search, $options: 'i' } },
        { code: { $regex: query.search, $options: 'i' } }
      ];
    }

    const [items, total] = await Promise.all([
      BuildingModel.find(filter).sort({ code: 1 }).skip(skip).limit(limit),
      BuildingModel.countDocuments(filter)
    ]);

    return { items, total, page, limit };
  }

  static async getBuildingById(tenantId: string, buildingId: string) {
    const building = await BuildingModel.findOne({ tenantId, buildingId });
    if (!building) {
      throw new ApiError(404, 'BUILDING_NOT_FOUND', `Building '${buildingId}' not found in tenant`);
    }
    return building;
  }

  static async createBuilding(tenantId: string, actorUserId: string, projectId: string, data: any) {
    const project = await ProjectModel.findOne({ tenantId, projectId, status: { $ne: 'INACTIVE' } });
    if (!project) {
      throw new ApiError(404, 'PROJECT_NOT_FOUND', `Active Project '${projectId}' not found in tenant`);
    }

    if (project.structureConfig.buildingEnabled === false) {
      throw new ApiError(403, 'BUILDINGS_DISABLED', `Building creation is disabled in project '${projectId}' configuration`);
    }

    const cleanCode = data.code ? data.code.trim().toUpperCase() : '';
    if (!cleanCode || !/^[A-Z0-9-]+$/.test(cleanCode)) {
      throw new ApiError(400, 'INVALID_INPUT', 'Building code must contain uppercase letters, numbers, or hyphens');
    }

    const existing = await BuildingModel.findOne({ tenantId, projectId, code: cleanCode });
    if (existing) {
      throw new ApiError(409, 'RESOURCE_CONFLICT', `Building code '${cleanCode}' already exists in project`);
    }

    const buildingId = `BLD-${Date.now()}`;
    const building = await BuildingModel.create({
      ...data,
      buildingId,
      tenantId, // Server context
      projectId, // Server context
      code: cleanCode,
      status: 'active',
      createdBy: actorUserId
    });

    await logAuditEvent({
      tenantId,
      actorUserId,
      module: 'master-data',
      action: 'Created Building',
      recordType: 'building',
      recordId: buildingId,
      afterState: building.toObject(),
      status: 'success',
      severity: 'medium'
    });

    return building;
  }

  static async updateBuilding(tenantId: string, buildingId: string, actorUserId: string, data: any) {
    const building = await BuildingModel.findOne({ tenantId, buildingId });
    if (!building) {
      throw new ApiError(404, 'BUILDING_NOT_FOUND', `Building '${buildingId}' not found in tenant`);
    }

    const beforeState = building.toObject();

    // Protect immutable identity properties
    delete data.buildingId;
    delete data.tenantId;
    delete data.projectId;
    delete data.code;

    Object.assign(building, data);
    building.updatedBy = actorUserId;
    await building.save();

    await logAuditEvent({
      tenantId,
      actorUserId,
      module: 'master-data',
      action: 'Updated Building',
      recordType: 'building',
      recordId: buildingId,
      beforeState,
      afterState: building.toObject(),
      status: 'success',
      severity: 'medium'
    });

    return building;
  }

  static async deactivateBuilding(tenantId: string, buildingId: string, actorUserId: string) {
    const building = await BuildingModel.findOne({ tenantId, buildingId });
    if (!building) {
      throw new ApiError(404, 'BUILDING_NOT_FOUND', `Building '${buildingId}' not found in tenant`);
    }

    // Check active towers or floors beneath building
    const [towersCount, floorsCount] = await Promise.all([
      TowerModel.countDocuments({ tenantId, buildingId, status: 'active' }),
      FloorModel.countDocuments({ tenantId, buildingId, status: 'active' })
    ]);

    if (towersCount > 0 || floorsCount > 0) {
      throw new ApiError(
        403,
        'BUILDING_HAS_ACTIVE_DESCENDANTS',
        `Cannot deactivate building because it has ${towersCount} active tower(s) and ${floorsCount} active floor(s)`
      );
    }

    const beforeState = { status: building.status };
    building.status = 'inactive';
    building.updatedBy = actorUserId;
    await building.save();

    await logAuditEvent({
      tenantId,
      actorUserId,
      module: 'master-data',
      action: 'Deactivated Building',
      recordType: 'building',
      recordId: buildingId,
      beforeState,
      afterState: { status: 'inactive' },
      status: 'success',
      severity: 'high'
    });

    return building;
  }

  // ---- Tower Operations ----
  static async listTowers(tenantId: string, projectId: string, buildingId?: string, query: { status?: string; search?: string; page?: number; limit?: number } = {}) {
    const page = query.page || 1;
    const limit = query.limit || 50;
    const skip = (page - 1) * limit;

    const filter: any = { tenantId, projectId };
    if (buildingId) filter.buildingId = buildingId;
    if (query.status) filter.status = query.status;
    if (query.search) {
      filter.$or = [
        { name: { $regex: query.search, $options: 'i' } },
        { code: { $regex: query.search, $options: 'i' } }
      ];
    }

    const [items, total] = await Promise.all([
      TowerModel.find(filter).sort({ code: 1 }).skip(skip).limit(limit),
      TowerModel.countDocuments(filter)
    ]);

    return { items, total, page, limit };
  }

  static async getTowerById(tenantId: string, towerId: string) {
    const tower = await TowerModel.findOne({ tenantId, towerId });
    if (!tower) {
      throw new ApiError(404, 'TOWER_NOT_FOUND', `Tower '${towerId}' not found in tenant`);
    }
    return tower;
  }

  static async createTower(tenantId: string, actorUserId: string, projectId: string, data: any) {
    const project = await ProjectModel.findOne({ tenantId, projectId, status: { $ne: 'INACTIVE' } });
    if (!project) {
      throw new ApiError(404, 'PROJECT_NOT_FOUND', `Active Project '${projectId}' not found in tenant`);
    }

    if (project.structureConfig.towerEnabled === false) {
      throw new ApiError(403, 'TOWERS_DISABLED', `Tower creation is disabled in project '${projectId}' configuration`);
    }

    if (project.structureConfig.towerRequiresBuilding && !data.buildingId) {
      throw new ApiError(400, 'BUILDING_REQUIRED', `Tower requires a parent BuildingId in project '${projectId}' configuration`);
    }

    if (data.buildingId) {
      const building = await BuildingModel.findOne({ tenantId, projectId, buildingId: data.buildingId, status: 'active' });
      if (!building) {
        throw new ApiError(404, 'BUILDING_NOT_FOUND', `Active Parent Building '${data.buildingId}' not found in project`);
      }
    }

    const cleanCode = data.code ? data.code.trim().toUpperCase() : '';
    if (!cleanCode || !/^[A-Z0-9-]+$/.test(cleanCode)) {
      throw new ApiError(400, 'INVALID_INPUT', 'Tower code must contain uppercase letters, numbers, or hyphens');
    }

    const existing = await TowerModel.findOne({ tenantId, projectId, code: cleanCode });
    if (existing) {
      throw new ApiError(409, 'RESOURCE_CONFLICT', `Tower code '${cleanCode}' already exists in project`);
    }

    const towerId = `TWR-${Date.now()}`;
    const tower = await TowerModel.create({
      ...data,
      towerId,
      tenantId, // Server context
      projectId, // Server context
      code: cleanCode,
      status: 'active',
      createdBy: actorUserId
    });

    await logAuditEvent({
      tenantId,
      actorUserId,
      module: 'master-data',
      action: 'Created Tower',
      recordType: 'tower',
      recordId: towerId,
      afterState: tower.toObject(),
      status: 'success',
      severity: 'medium'
    });

    return tower;
  }

  static async updateTower(tenantId: string, towerId: string, actorUserId: string, data: any) {
    const tower = await TowerModel.findOne({ tenantId, towerId });
    if (!tower) {
      throw new ApiError(404, 'TOWER_NOT_FOUND', `Tower '${towerId}' not found in tenant`);
    }

    const beforeState = tower.toObject();

    // Protect immutable identity properties
    delete data.towerId;
    delete data.tenantId;
    delete data.projectId;
    delete data.buildingId;
    delete data.code;

    Object.assign(tower, data);
    tower.updatedBy = actorUserId;
    await tower.save();

    await logAuditEvent({
      tenantId,
      actorUserId,
      module: 'master-data',
      action: 'Updated Tower',
      recordType: 'tower',
      recordId: towerId,
      beforeState,
      afterState: tower.toObject(),
      status: 'success',
      severity: 'medium'
    });

    return tower;
  }

  static async deactivateTower(tenantId: string, towerId: string, actorUserId: string) {
    const tower = await TowerModel.findOne({ tenantId, towerId });
    if (!tower) {
      throw new ApiError(404, 'TOWER_NOT_FOUND', `Tower '${towerId}' not found in tenant`);
    }

    // Check active floors beneath tower
    const floorsCount = await FloorModel.countDocuments({ tenantId, towerId, status: 'active' });
    if (floorsCount > 0) {
      throw new ApiError(
        403,
        'TOWER_HAS_ACTIVE_FLOORS',
        `Cannot deactivate tower because it has ${floorsCount} active floor(s)`
      );
    }

    const beforeState = { status: tower.status };
    tower.status = 'inactive';
    tower.updatedBy = actorUserId;
    await tower.save();

    await logAuditEvent({
      tenantId,
      actorUserId,
      module: 'master-data',
      action: 'Deactivated Tower',
      recordType: 'tower',
      recordId: towerId,
      beforeState,
      afterState: { status: 'inactive' },
      status: 'success',
      severity: 'high'
    });

    return tower;
  }

  // ---- Floor Operations ----
  static async listFloors(tenantId: string, projectId: string, query: { parentType?: string; buildingId?: string; towerId?: string; status?: string; search?: string; page?: number; limit?: number } = {}) {
    const page = query.page || 1;
    const limit = query.limit || 100;
    const skip = (page - 1) * limit;

    const filter: any = { tenantId, projectId };
    if (query.parentType) filter.parentType = query.parentType;
    if (query.buildingId) filter.buildingId = query.buildingId;
    if (query.towerId) filter.towerId = query.towerId;
    if (query.status) filter.status = query.status;
    if (query.search) {
      filter.$or = [
        { name: { $regex: query.search, $options: 'i' } },
        { code: { $regex: query.search, $options: 'i' } }
      ];
    }

    const [items, total] = await Promise.all([
      FloorModel.find(filter).sort({ floorNo: 1 }).skip(skip).limit(limit),
      FloorModel.countDocuments(filter)
    ]);

    return { items, total, page, limit };
  }

  static async getFloorById(tenantId: string, floorId: string) {
    const floor = await FloorModel.findOne({ tenantId, floorId });
    if (!floor) {
      throw new ApiError(404, 'FLOOR_NOT_FOUND', `Floor '${floorId}' not found in tenant`);
    }
    return floor;
  }

  static async createFloor(tenantId: string, actorUserId: string, projectId: string, data: any) {
    const project = await ProjectModel.findOne({ tenantId, projectId, status: { $ne: 'INACTIVE' } });
    if (!project) {
      throw new ApiError(404, 'PROJECT_NOT_FOUND', `Active Project '${projectId}' not found in tenant`);
    }

    if (project.structureConfig.floorEnabled === false) {
      throw new ApiError(403, 'FLOORS_DISABLED', `Floor creation is disabled in project '${projectId}' configuration`);
    }

    const { parentType, code } = data;
    const allowedParents = project.structureConfig.allowedFloorParents || ['PROJECT', 'BUILDING', 'TOWER'];
    
    if (!parentType || !['PROJECT', 'BUILDING', 'TOWER'].includes(parentType)) {
      throw new ApiError(400, 'INVALID_INPUT', 'parentType must be PROJECT, BUILDING, or TOWER');
    }
    
    if (!allowedParents.includes(parentType)) {
      throw new ApiError(400, 'PARENT_TYPE_NOT_ALLOWED', `parentType '${parentType}' is not enabled in project structure configuration`);
    }

    let resolvedBuildingId = null;
    let resolvedTowerId = null;

    if (parentType === 'PROJECT') {
      if (data.buildingId || data.towerId) {
        throw new ApiError(400, 'INVALID_INPUT', 'buildingId and towerId must not be provided when parentType is PROJECT');
      }
    } else if (parentType === 'BUILDING') {
      if (!data.buildingId) {
        throw new ApiError(400, 'INVALID_INPUT', 'buildingId is required when parentType is BUILDING');
      }
      const building = await BuildingModel.findOne({ tenantId, projectId, buildingId: data.buildingId, status: 'active' });
      if (!building) {
        throw new ApiError(404, 'BUILDING_NOT_FOUND', `Active Parent Building '${data.buildingId}' not found in project`);
      }
      resolvedBuildingId = data.buildingId;
    } else if (parentType === 'TOWER') {
      if (!data.towerId) {
        throw new ApiError(400, 'INVALID_INPUT', 'towerId is required when parentType is TOWER');
      }
      const tower = await TowerModel.findOne({ tenantId, projectId, towerId: data.towerId, status: 'active' });
      if (!tower) {
        throw new ApiError(404, 'TOWER_NOT_FOUND', `Active Parent Tower '${data.towerId}' not found in project`);
      }
      resolvedTowerId = data.towerId;
      resolvedBuildingId = tower.buildingId || null; // Server-side derivation
    }

    const cleanCode = code ? code.trim().toUpperCase() : '';
    if (!cleanCode || !/^[A-Z0-9-]+$/.test(cleanCode)) {
      throw new ApiError(400, 'INVALID_INPUT', 'Floor code must contain uppercase letters, numbers, or hyphens');
    }

    const existing = await FloorModel.findOne({
      tenantId,
      projectId,
      parentType,
      buildingId: resolvedBuildingId,
      towerId: resolvedTowerId,
      code: cleanCode
    });

    if (existing) {
      throw new ApiError(409, 'RESOURCE_CONFLICT', `Floor code '${cleanCode}' already exists under this parent structure`);
    }

    const floorNo = typeof data.floorNo === 'number' ? data.floorNo : parseInt(data.floorNo || '0', 10);

    const floorId = `FLR-${Date.now()}`;
    const floor = await FloorModel.create({
      ...data,
      floorId,
      tenantId,
      projectId,
      parentType,
      buildingId: resolvedBuildingId,
      towerId: resolvedTowerId,
      floorNo,
      code: cleanCode,
      status: 'active',
      createdBy: actorUserId
    });

    await logAuditEvent({
      tenantId,
      actorUserId,
      module: 'master-data',
      action: 'Created Floor',
      recordType: 'floor',
      recordId: floorId,
      afterState: floor.toObject(),
      status: 'success',
      severity: 'medium'
    });

    return floor;
  }

  static async updateFloor(tenantId: string, floorId: string, actorUserId: string, data: any) {
    const floor = await FloorModel.findOne({ tenantId, floorId });
    if (!floor) {
      throw new ApiError(404, 'FLOOR_NOT_FOUND', `Floor '${floorId}' not found in tenant`);
    }

    const beforeState = floor.toObject();

    // Protect immutable identity & parent properties
    delete data.floorId;
    delete data.tenantId;
    delete data.projectId;
    delete data.parentType;
    delete data.towerId;
    delete data.buildingId;
    delete data.code;

    Object.assign(floor, data);
    floor.updatedBy = actorUserId;
    await floor.save();

    await logAuditEvent({
      tenantId,
      actorUserId,
      module: 'master-data',
      action: 'Updated Floor',
      recordType: 'floor',
      recordId: floorId,
      beforeState,
      afterState: floor.toObject(),
      status: 'success',
      severity: 'medium'
    });

    return floor;
  }

  static async deactivateFloor(tenantId: string, floorId: string, actorUserId: string) {
    const floor = await FloorModel.findOne({ tenantId, floorId });
    if (!floor) {
      throw new ApiError(404, 'FLOOR_NOT_FOUND', `Floor '${floorId}' not found in tenant`);
    }

    // Check active units beneath floor
    const unitsCount = await UnitModel.countDocuments({ tenantId, floorId, status: { $ne: 'INACTIVE' } });
    if (unitsCount > 0) {
      throw new ApiError(
        403,
        'FLOOR_HAS_ACTIVE_UNITS',
        `Cannot deactivate floor because it has ${unitsCount} active unit(s)`
      );
    }

    const beforeState = { status: floor.status };
    floor.status = 'inactive';
    floor.updatedBy = actorUserId;
    await floor.save();

    await logAuditEvent({
      tenantId,
      actorUserId,
      module: 'master-data',
      action: 'Deactivated Floor',
      recordType: 'floor',
      recordId: floorId,
      beforeState,
      afterState: { status: 'inactive' },
      status: 'success',
      severity: 'high'
    });

    return floor;
  }

  // ---- Unit Operations ----
  static async listUnits(tenantId: string, query: { projectId?: string; buildingId?: string; towerId?: string; floorId?: string; status?: string; commercialStatus?: string; search?: string; page?: number; limit?: number }) {
    const page = query.page || 1;
    const limit = query.limit || 50;
    const skip = (page - 1) * limit;

    const filter: any = { tenantId };
    if (query.projectId) filter.projectId = query.projectId;
    if (query.buildingId) filter.buildingId = query.buildingId;
    if (query.towerId) filter.towerId = query.towerId;
    if (query.floorId) filter.floorId = query.floorId;
    if (query.status) filter.status = query.status;
    if (query.commercialStatus) filter.commercialStatus = query.commercialStatus;
    if (query.search) {
      filter.$or = [
        { unitNumber: { $regex: query.search, $options: 'i' } },
        { code: { $regex: query.search, $options: 'i' } }
      ];
    }

    const [items, total] = await Promise.all([
      UnitModel.find(filter).sort({ unitNumber: 1 }).skip(skip).limit(limit),
      UnitModel.countDocuments(filter)
    ]);

    return { items, total, page, limit };
  }

  static async getUnitById(tenantId: string, unitId: string) {
    const unit = await UnitModel.findOne({ tenantId, unitId });
    if (!unit) {
      throw new ApiError(404, 'UNIT_NOT_FOUND', `Unit '${unitId}' not found in tenant`);
    }
    return unit;
  }

  static async createUnit(tenantId: string, actorUserId: string, projectId: string, data: any) {
    const project = await ProjectModel.findOne({ tenantId, projectId, status: { $ne: 'INACTIVE' } });
    if (!project) {
      throw new ApiError(404, 'PROJECT_NOT_FOUND', `Active Project '${projectId}' not found in tenant`);
    }

    if (!data.floorId) {
      throw new ApiError(400, 'FLOOR_REQUIRED', 'Unit creation requires a valid physical floor placement (floorId)');
    }

    const floor = await FloorModel.findOne({ tenantId, projectId, floorId: data.floorId, status: 'active' });
    if (!floor) {
      throw new ApiError(404, 'FLOOR_NOT_FOUND', `Active Parent Floor '${data.floorId}' not found in project`);
    }

    if (data.unitTypeId) {
      const unitType = await UnitTypeModel.findOne({ tenantId, unitTypeId: data.unitTypeId });
      if (!unitType) {
        throw new ApiError(404, 'UNIT_TYPE_NOT_FOUND', `UnitType '${data.unitTypeId}' not found in tenant`);
      }
      if (unitType.status !== 'active') {
        throw new ApiError(403, 'INACTIVE_REFERENCE_ASSIGNMENT_PROHIBITED', `Cannot assign inactive UnitType '${unitType.name}' to new Unit`);
      }
    }

    const unitNumber = data.unitNumber ? data.unitNumber.trim() : '';
    if (!unitNumber) {
      throw new ApiError(400, 'INVALID_INPUT', 'Unit number (unitNumber) is required');
    }

    const cleanCode = data.code ? data.code.trim().toUpperCase() : `U-${unitNumber.toUpperCase()}`;

    // Unique checks
    const [existingNum, existingCode] = await Promise.all([
      UnitModel.findOne({ tenantId, projectId, unitNumber }),
      UnitModel.findOne({ tenantId, projectId, code: cleanCode })
    ]);

    if (existingNum) {
      throw new ApiError(409, 'RESOURCE_CONFLICT', `Unit number '${unitNumber}' already exists in project`);
    }
    if (existingCode) {
      throw new ApiError(409, 'RESOURCE_CONFLICT', `Unit code '${cleanCode}' already exists in project`);
    }

    const unitId = `UNT-${Date.now()}`;
    const unit = await UnitModel.create({
      ...data,
      unitId,
      tenantId, // Server context
      companyId: project.companyId, // Server context from project
      projectId, // Server context
      buildingId: floor.buildingId || data.buildingId,
      towerId: floor.towerId || data.towerId,
      floorId: data.floorId,
      unitNumber,
      code: cleanCode,
      basePrice: data.basePrice || data.price || 0,
      status: 'active',
      commercialStatus: data.commercialStatus || 'AVAILABLE',
      createdBy: actorUserId
    });

    await logAuditEvent({
      tenantId,
      actorUserId,
      module: 'master-data',
      action: 'Created Unit Asset',
      recordType: 'unit',
      recordId: unitId,
      afterState: unit.toObject(),
      status: 'success',
      severity: 'medium'
    });

    return unit;
  }

  static async updateUnit(tenantId: string, unitId: string, actorUserId: string, data: any) {
    const unit = await UnitModel.findOne({ tenantId, unitId });
    if (!unit) {
      throw new ApiError(404, 'UNIT_NOT_FOUND', `Unit '${unitId}' not found in tenant`);
    }

    const beforeState = unit.toObject();

    // Protect immutable identity & physical placement properties
    delete data.unitId;
    delete data.tenantId;
    delete data.companyId;
    delete data.projectId;
    delete data.buildingId;
    delete data.towerId;
    delete data.floorId;
    delete data.unitNumber;
    delete data.code;

    if (data.price !== undefined && data.basePrice === undefined) {
      data.basePrice = data.price;
    }

    Object.assign(unit, data);
    unit.updatedBy = actorUserId;
    await unit.save();

    await logAuditEvent({
      tenantId,
      actorUserId,
      module: 'master-data',
      action: 'Updated Unit Asset',
      recordType: 'unit',
      recordId: unitId,
      beforeState,
      afterState: unit.toObject(),
      status: 'success',
      severity: 'medium'
    });

    return unit;
  }

  static async deactivateUnit(tenantId: string, unitId: string, actorUserId: string) {
    const unit = await UnitModel.findOne({ tenantId, unitId });
    if (!unit) {
      throw new ApiError(404, 'UNIT_NOT_FOUND', `Unit '${unitId}' not found in tenant`);
    }

    // Protection: Block deactivating units with active commercial commitments
    if (['BOOKED', 'SOLD', 'LEASED'].includes(unit.commercialStatus)) {
      throw new ApiError(
        403,
        'UNIT_COMMERCIALLY_COMMITTED',
        `Cannot deactivate unit '${unitId}' because its commercial status is '${unit.commercialStatus}'`
      );
    }

    const beforeState = { status: unit.status };
    unit.status = 'inactive';
    unit.updatedBy = actorUserId;
    await unit.save();

    await logAuditEvent({
      tenantId,
      actorUserId,
      module: 'master-data',
      action: 'Deactivated Unit Asset',
      recordType: 'unit',
      recordId: unitId,
      beforeState,
      afterState: { status: 'inactive' },
      status: 'success',
      severity: 'high'
    });

    return unit;
  }

  static async reactivateUnit(tenantId: string, unitId: string, actorUserId: string) {
    const unit = await UnitModel.findOne({ tenantId, unitId });
    if (!unit) {
      throw new ApiError(404, 'UNIT_NOT_FOUND', `Unit '${unitId}' not found in tenant`);
    }

    const beforeState = { status: unit.status };
    unit.status = 'active';
    unit.updatedBy = actorUserId;
    await unit.save();

    await logAuditEvent({
      tenantId,
      actorUserId,
      module: 'master-data',
      action: 'Reactivated Unit Asset',
      recordType: 'unit',
      recordId: unitId,
      beforeState,
      afterState: { status: 'active' },
      status: 'success',
      severity: 'medium'
    });

    return unit;
  }

  static async updateUnitCommercialStatus(tenantId: string, unitId: string, actorUserId: string, commercialStatus: string) {
    const unit = await UnitModel.findOne({ tenantId, unitId });
    if (!unit) {
      throw new ApiError(404, 'UNIT_NOT_FOUND', `Unit '${unitId}' not found in tenant`);
    }

    const validCommercial = ['AVAILABLE', 'RESERVED', 'BOOKED', 'SOLD', 'LEASED', 'NOT_FOR_SALE'];
    if (!validCommercial.includes(commercialStatus)) {
      throw new ApiError(400, 'INVALID_COMMERCIAL_STATUS', `Commercial status '${commercialStatus}' is not valid`);
    }

    const beforeState = { commercialStatus: unit.commercialStatus };
    unit.commercialStatus = commercialStatus as any;
    unit.updatedBy = actorUserId;
    await unit.save();

    await logAuditEvent({
      tenantId,
      actorUserId,
      module: 'master-data',
      action: 'Updated Unit Commercial Status',
      recordType: 'unit',
      recordId: unitId,
      beforeState,
      afterState: { commercialStatus },
      status: 'success',
      severity: 'high'
    });

    return unit;
  }

  // ---- UnitType Operations ----
  static async listUnitTypes(tenantId: string, query: { status?: string; search?: string } = {}) {
    const filter: any = { tenantId };
    if (query.status) filter.status = query.status;
    if (query.search) {
      filter.$or = [
        { name: { $regex: query.search, $options: 'i' } },
        { code: { $regex: query.search, $options: 'i' } }
      ];
    }
    return UnitTypeModel.find(filter).sort({ name: 1 });
  }

  static async getUnitTypeById(tenantId: string, unitTypeId: string) {
    const unitType = await UnitTypeModel.findOne({ tenantId, unitTypeId });
    if (!unitType) {
      throw new ApiError(404, 'UNIT_TYPE_NOT_FOUND', `UnitType '${unitTypeId}' not found in tenant`);
    }
    return unitType;
  }

  static async createUnitType(tenantId: string, actorUserId: string, data: any) {
    const cleanCode = data.code ? data.code.trim().toUpperCase() : '';
    if (!cleanCode || !/^[A-Z0-9-]+$/.test(cleanCode)) {
      throw new ApiError(400, 'INVALID_INPUT', 'UnitType code must contain uppercase letters, numbers, or hyphens');
    }

    const existing = await UnitTypeModel.findOne({ tenantId, code: cleanCode });
    if (existing) {
      throw new ApiError(409, 'RESOURCE_CONFLICT', `UnitType code '${cleanCode}' already exists in tenant`);
    }

    const unitTypeId = `UTP-${Date.now()}`;
    const unitType = await UnitTypeModel.create({
      ...data,
      unitTypeId,
      tenantId, // Server context
      code: cleanCode,
      status: 'active',
      createdBy: actorUserId
    });

    await logAuditEvent({
      tenantId,
      actorUserId,
      module: 'master-data',
      action: 'Created UnitType Master',
      recordType: 'unitType',
      recordId: unitTypeId,
      afterState: unitType.toObject(),
      status: 'success',
      severity: 'medium'
    });

    return unitType;
  }

  static async updateUnitType(tenantId: string, unitTypeId: string, actorUserId: string, data: any) {
    const unitType = await UnitTypeModel.findOne({ tenantId, unitTypeId });
    if (!unitType) {
      throw new ApiError(404, 'UNIT_TYPE_NOT_FOUND', `UnitType '${unitTypeId}' not found in tenant`);
    }

    const beforeState = unitType.toObject();

    delete data.unitTypeId;
    delete data.tenantId;
    delete data.code;

    Object.assign(unitType, data);
    unitType.updatedBy = actorUserId;
    await unitType.save();

    await logAuditEvent({
      tenantId,
      actorUserId,
      module: 'master-data',
      action: 'Updated UnitType Master',
      recordType: 'unitType',
      recordId: unitTypeId,
      beforeState,
      afterState: unitType.toObject(),
      status: 'success',
      severity: 'medium'
    });

    return unitType;
  }

  static async deactivateUnitType(tenantId: string, unitTypeId: string, actorUserId: string) {
    const unitType = await UnitTypeModel.findOne({ tenantId, unitTypeId });
    if (!unitType) {
      throw new ApiError(404, 'UNIT_TYPE_NOT_FOUND', `UnitType '${unitTypeId}' not found in tenant`);
    }

    const beforeState = { status: unitType.status };
    unitType.status = 'inactive';
    unitType.updatedBy = actorUserId;
    await unitType.save();

    await logAuditEvent({
      tenantId,
      actorUserId,
      module: 'master-data',
      action: 'Deactivated UnitType Master',
      recordType: 'unitType',
      recordId: unitTypeId,
      beforeState,
      afterState: { status: 'inactive' },
      status: 'success',
      severity: 'high'
    });

    return unitType;
  }

  static async reactivateUnitType(tenantId: string, unitTypeId: string, actorUserId: string) {
    const unitType = await UnitTypeModel.findOne({ tenantId, unitTypeId });
    if (!unitType) {
      throw new ApiError(404, 'UNIT_TYPE_NOT_FOUND', `UnitType '${unitTypeId}' not found in tenant`);
    }

    const beforeState = { status: unitType.status };
    unitType.status = 'active';
    unitType.updatedBy = actorUserId;
    await unitType.save();

    await logAuditEvent({
      tenantId,
      actorUserId,
      module: 'master-data',
      action: 'Reactivated UnitType Master',
      recordType: 'unitType',
      recordId: unitTypeId,
      beforeState,
      afterState: { status: 'active' },
      status: 'success',
      severity: 'medium'
    });

    return unitType;
  }

  // ---- Property Reference Operations ----
  static async listPropertyReferences(tenantId: string, category?: string, status?: string) {
    const filter: any = { tenantId };
    if (category) filter.category = category;
    if (status) filter.status = status;
    return PropertyReferenceModel.find(filter).sort({ category: 1, sortOrder: 1, name: 1 });
  }

  static async createPropertyReference(tenantId: string, actorUserId: string, data: any) {
    const cleanCode = data.code ? data.code.trim().toUpperCase() : '';
    if (!cleanCode || !/^[A-Z0-9-]+$/.test(cleanCode)) {
      throw new ApiError(400, 'INVALID_INPUT', 'Reference code must contain uppercase letters, numbers, or hyphens');
    }

    const category = data.category || 'OTHER';

    const existing = await PropertyReferenceModel.findOne({ tenantId, category, code: cleanCode });
    if (existing) {
      throw new ApiError(409, 'RESOURCE_CONFLICT', `Reference code '${cleanCode}' already exists in category '${category}'`);
    }

    const referenceId = `REF-${Date.now()}`;
    const refDoc = await PropertyReferenceModel.create({
      ...data,
      referenceId,
      tenantId, // Server context
      category,
      code: cleanCode,
      status: 'active',
      createdBy: actorUserId
    });

    await logAuditEvent({
      tenantId,
      actorUserId,
      module: 'master-data',
      action: 'Created Property Reference Master',
      recordType: 'propertyReference',
      recordId: referenceId,
      afterState: refDoc.toObject(),
      status: 'success',
      severity: 'medium'
    });

    return refDoc;
  }

  static async updatePropertyReference(tenantId: string, referenceId: string, actorUserId: string, data: any) {
    const refDoc = await PropertyReferenceModel.findOne({ tenantId, referenceId });
    if (!refDoc) {
      throw new ApiError(404, 'REFERENCE_NOT_FOUND', `Property Reference '${referenceId}' not found in tenant`);
    }

    const beforeState = refDoc.toObject();

    delete data.referenceId;
    delete data.tenantId;
    delete data.category;
    delete data.code;

    Object.assign(refDoc, data);
    refDoc.updatedBy = actorUserId;
    await refDoc.save();

    await logAuditEvent({
      tenantId,
      actorUserId,
      module: 'master-data',
      action: 'Updated Property Reference Master',
      recordType: 'propertyReference',
      recordId: referenceId,
      beforeState,
      afterState: refDoc.toObject(),
      status: 'success',
      severity: 'medium'
    });

    return refDoc;
  }

  static async deactivatePropertyReference(tenantId: string, referenceId: string, actorUserId: string) {
    const refDoc = await PropertyReferenceModel.findOne({ tenantId, referenceId });
    if (!refDoc) {
      throw new ApiError(404, 'REFERENCE_NOT_FOUND', `Property Reference '${referenceId}' not found in tenant`);
    }

    const beforeState = { status: refDoc.status };
    refDoc.status = 'inactive';
    refDoc.updatedBy = actorUserId;
    await refDoc.save();

    await logAuditEvent({
      tenantId,
      actorUserId,
      module: 'master-data',
      action: 'Deactivated Property Reference Master',
      recordType: 'propertyReference',
      recordId: referenceId,
      beforeState,
      afterState: { status: 'inactive' },
      status: 'success',
      severity: 'high'
    });

    return refDoc;
  }

  static async reactivatePropertyReference(tenantId: string, referenceId: string, actorUserId: string) {
    const refDoc = await PropertyReferenceModel.findOne({ tenantId, referenceId });
    if (!refDoc) {
      throw new ApiError(404, 'REFERENCE_NOT_FOUND', `Property Reference '${referenceId}' not found in tenant`);
    }

    const beforeState = { status: refDoc.status };
    refDoc.status = 'active';
    refDoc.updatedBy = actorUserId;
    await refDoc.save();

    await logAuditEvent({
      tenantId,
      actorUserId,
      module: 'master-data',
      action: 'Reactivated Property Reference Master',
      recordType: 'propertyReference',
      recordId: referenceId,
      beforeState,
      afterState: { status: 'active' },
      status: 'success',
      severity: 'medium'
    });

    return refDoc;
  }

  // ---- Canonical Property Hierarchy Query & Resolution Layer ----
  static async resolveUnitHierarchy(tenantId: string, unitId: string) {
    const unit = await UnitModel.findOne({ tenantId, unitId });
    if (!unit) {
      throw new ApiError(404, 'UNIT_NOT_FOUND', `Unit '${unitId}' not found in tenant`);
    }

    const [project, floor, tower, building] = await Promise.all([
      ProjectModel.findOne({ tenantId, projectId: unit.projectId }),
      FloorModel.findOne({ tenantId, floorId: unit.floorId }),
      unit.towerId ? TowerModel.findOne({ tenantId, towerId: unit.towerId }) : Promise.resolve(null),
      unit.buildingId ? BuildingModel.findOne({ tenantId, buildingId: unit.buildingId }) : Promise.resolve(null)
    ]);

    if (!project) {
      throw new ApiError(404, 'PROJECT_NOT_FOUND', `Parent project for unit '${unitId}' not found`);
    }

    return {
      project: {
        projectId: project.projectId,
        companyId: project.companyId,
        code: project.code,
        name: project.name,
        status: project.status
      },
      building: building
        ? { buildingId: building.buildingId, code: building.code, name: building.name, status: building.status }
        : null,
      tower: tower
        ? { towerId: tower.towerId, code: tower.code, name: tower.name, status: tower.status }
        : null,
      floor: floor
        ? { floorId: floor.floorId, floorNo: floor.floorNo, code: floor.code, name: floor.name, status: floor.status }
        : null,
      unit: {
        unitId: unit.unitId,
        unitNumber: unit.unitNumber,
        code: unit.code,
        category: unit.category,
        facing: unit.facing,
        carpetArea: unit.carpetArea,
        superBuiltUpArea: unit.superBuiltUpArea,
        basePrice: unit.basePrice,
        status: unit.status,
        commercialStatus: unit.commercialStatus
      }
    };
  }

  static async resolveResourceProject(tenantId: string, resourceType: 'building' | 'tower' | 'floor' | 'unit', resourceId: string) {
    let projectId: string | null = null;
    let companyId: string | null = null;

    if (resourceType === 'building') {
      const bld = await BuildingModel.findOne({ tenantId, buildingId: resourceId });
      if (bld) projectId = bld.projectId;
    } else if (resourceType === 'tower') {
      const twr = await TowerModel.findOne({ tenantId, towerId: resourceId });
      if (twr) projectId = twr.projectId;
    } else if (resourceType === 'floor') {
      const flr = await FloorModel.findOne({ tenantId, floorId: resourceId });
      if (flr) projectId = flr.projectId;
    } else if (resourceType === 'unit') {
      const unt = await UnitModel.findOne({ tenantId, unitId: resourceId });
      if (unt) {
        projectId = unt.projectId;
        companyId = unt.companyId;
      }
    }

    if (!projectId) {
      throw new ApiError(404, 'RESOURCE_NOT_FOUND', `Resource '${resourceId}' of type '${resourceType}' not found`);
    }

    if (!companyId) {
      const prj = await ProjectModel.findOne({ tenantId, projectId });
      if (prj) companyId = prj.companyId;
    }

    return { tenantId, projectId, companyId, resourceType, resourceId };
  }

  static async getProjectHierarchyTree(tenantId: string, projectId: string) {
    const project = await ProjectModel.findOne({ tenantId, projectId });
    if (!project) {
      throw new ApiError(404, 'PROJECT_NOT_FOUND', `Project '${projectId}' not found in tenant`);
    }

    const [buildings, towers, floors, units] = await Promise.all([
      BuildingModel.find({ tenantId, projectId, status: 'active' }).sort({ code: 1 }),
      TowerModel.find({ tenantId, projectId, status: 'active' }).sort({ code: 1 }),
      FloorModel.find({ tenantId, projectId, status: 'active' }).sort({ floorNo: 1 }),
      UnitModel.find({ tenantId, projectId, status: 'active' }).sort({ unitNumber: 1 })
    ]);

    return {
      project: {
        projectId: project.projectId,
        companyId: project.companyId,
        code: project.code,
        name: project.name,
        structureConfig: project.structureConfig,
        status: project.status
      },
      buildings,
      towers,
      floors,
      unitsTotal: units.length,
      unitsSummary: {
        available: units.filter((u) => u.commercialStatus === 'AVAILABLE').length,
        reserved: units.filter((u) => u.commercialStatus === 'RESERVED').length,
        booked: units.filter((u) => u.commercialStatus === 'BOOKED').length,
        sold: units.filter((u) => u.commercialStatus === 'SOLD').length,
        leased: units.filter((u) => u.commercialStatus === 'LEASED').length,
        notForSale: units.filter((u) => u.commercialStatus === 'NOT_FOR_SALE').length
      }
    };
  }

  // ---- Bulk Property Setup / Import Layer ----
  static async bulkPropertySetup(
    tenantId: string,
    actorUserId: string,
    projectId: string,
    data: {
      preview?: boolean;
      floors?: Array<{ floorNo: number; name: string; code?: string; buildingId?: string; towerId?: string }>;
      units?: Array<{ unitNumber: string; code?: string; floorId: string; buildingId?: string; towerId?: string; basePrice?: number; carpetArea?: number; superBuiltUpArea?: number; category?: string }>;
    }
  ) {
    const project = await ProjectModel.findOne({ tenantId, projectId, status: { $ne: 'INACTIVE' } });
    if (!project) {
      throw new ApiError(404, 'PROJECT_NOT_FOUND', `Active Project '${projectId}' not found in tenant`);
    }

    const previewMode = data.preview === true;
    const errors: string[] = [];
    const validFloors: any[] = [];
    const validUnits: any[] = [];

    // 1. Process Floors
    if (data.floors && Array.isArray(data.floors)) {
      const seenFloorNos = new Set<number>();

      for (let i = 0; i < data.floors.length; i++) {
        const f = data.floors[i];
        const rowNum = i + 1;

        if (f.floorNo === undefined || f.floorNo === null || isNaN(Number(f.floorNo))) {
          errors.push(`Floor Row ${rowNum}: Invalid or missing floorNo`);
          continue;
        }

        const floorNo = Number(f.floorNo);
        if (seenFloorNos.has(floorNo)) {
          errors.push(`Floor Row ${rowNum}: Duplicate floorNo ${floorNo} within bulk payload`);
          continue;
        }
        seenFloorNos.add(floorNo);

        // DB uniqueness check
        const existingFloor = await FloorModel.findOne({
          tenantId,
          projectId,
          towerId: f.towerId || { $exists: false },
          buildingId: f.buildingId || { $exists: false },
          floorNo
        });

        if (existingFloor) {
          errors.push(`Floor Row ${rowNum}: Floor number ${floorNo} already exists in project database`);
          continue;
        }

        validFloors.push({
          floorId: `FLR-${Date.now()}-${i}`,
          tenantId,
          projectId,
          buildingId: f.buildingId,
          towerId: f.towerId,
          floorNo,
          name: f.name || `Floor ${floorNo}`,
          code: f.code ? f.code.trim().toUpperCase() : `F-${floorNo}`,
          status: 'active',
          createdBy: actorUserId
        });
      }
    }

    // 2. Process Units
    if (data.units && Array.isArray(data.units)) {
      const seenUnitNums = new Set<string>();
      const seenCodes = new Set<string>();

      for (let i = 0; i < data.units.length; i++) {
        const u = data.units[i];
        const rowNum = i + 1;

        const unitNumber = u.unitNumber ? u.unitNumber.trim() : '';
        if (!unitNumber) {
          errors.push(`Unit Row ${rowNum}: Missing unitNumber`);
          continue;
        }

        if (seenUnitNums.has(unitNumber)) {
          errors.push(`Unit Row ${rowNum}: Duplicate unitNumber '${unitNumber}' within bulk payload`);
          continue;
        }
        seenUnitNums.add(unitNumber);

        const cleanCode = u.code ? u.code.trim().toUpperCase() : `U-${unitNumber.toUpperCase()}`;
        if (seenCodes.has(cleanCode)) {
          errors.push(`Unit Row ${rowNum}: Duplicate unit code '${cleanCode}' within bulk payload`);
          continue;
        }
        seenCodes.add(cleanCode);

        if (!u.floorId) {
          errors.push(`Unit Row ${rowNum}: Missing mandatory floorId`);
          continue;
        }

        // Validate floor existence (either in validFloors or in DB)
        let parentFloor = validFloors.find((vf) => vf.floorId === u.floorId);
        if (!parentFloor) {
          parentFloor = await FloorModel.findOne({ tenantId, projectId, floorId: u.floorId, status: 'active' });
        }

        if (!parentFloor) {
          errors.push(`Unit Row ${rowNum}: Parent Floor '${u.floorId}' not found or inactive`);
          continue;
        }

        // DB uniqueness check
        const [existingNum, existingCode] = await Promise.all([
          UnitModel.findOne({ tenantId, projectId, unitNumber }),
          UnitModel.findOne({ tenantId, projectId, code: cleanCode })
        ]);

        if (existingNum) {
          errors.push(`Unit Row ${rowNum}: Unit number '${unitNumber}' already exists in project database`);
          continue;
        }
        if (existingCode) {
          errors.push(`Unit Row ${rowNum}: Unit code '${cleanCode}' already exists in project database`);
          continue;
        }

        validUnits.push({
          unitId: `UNT-${Date.now()}-${i}`,
          tenantId,
          companyId: project.companyId,
          projectId,
          buildingId: parentFloor.buildingId || u.buildingId,
          towerId: parentFloor.towerId || u.towerId,
          floorId: parentFloor.floorId,
          unitNumber,
          code: cleanCode,
          category: u.category || 'FLAT',
          carpetArea: u.carpetArea,
          superBuiltUpArea: u.superBuiltUpArea,
          basePrice: u.basePrice || 0,
          status: 'active',
          commercialStatus: 'AVAILABLE',
          createdBy: actorUserId
        });
      }
    }

    const totalSubmitted = (data.floors?.length || 0) + (data.units?.length || 0);
    const validCount = validFloors.length + validUnits.length;
    const errorCount = errors.length;

    // 3. Commit if not previewMode and no errors
    let createdFloorsCount = 0;
    let createdUnitsCount = 0;

    if (!previewMode && errorCount === 0 && validCount > 0) {
      if (validFloors.length > 0) {
        const createdFloors = await FloorModel.insertMany(validFloors);
        createdFloorsCount = createdFloors.length;
      }
      if (validUnits.length > 0) {
        const createdUnits = await UnitModel.insertMany(validUnits);
        createdUnitsCount = createdUnits.length;
      }

      await logAuditEvent({
        tenantId,
        actorUserId,
        module: 'master-data',
        action: 'Bulk Property Setup',
        recordType: 'project',
        recordId: projectId,
        afterState: { createdFloorsCount, createdUnitsCount },
        status: 'success',
        severity: 'high'
      });
    }

    return {
      previewOnly: previewMode,
      totalSubmitted,
      validCount,
      errorCount,
      errors,
      created: {
        floorsCount: createdFloorsCount,
        unitsCount: createdUnitsCount
      }
    };
  }

  // ---- Vendor Operations ----
  static async listVendors(tenantId: string, maskBankDetails: boolean = true) {
    const vendors = await VendorModel.find({ tenantId }).sort({ createdAt: -1 });

    if (maskBankDetails) {
      return vendors.map((v) => {
        const obj = v.toObject();
        if (obj.bankDetails?.accountNumber) {
          obj.bankDetails.accountNumber = `XXXX-XXXX-${obj.bankDetails.accountNumber.slice(-4)}`;
        }
        return obj;
      });
    }

    return vendors;
  }

  // ---- Dashboard Summary Counters ----
  static async getSummaryCounters(tenantId: string, allowedProjects: string[]) {
    const projectFilter: any = { tenantId, status: 'ACTIVE' };
    if (allowedProjects && allowedProjects.length > 0) {
      projectFilter.name = { $in: allowedProjects };
    }

    const [totalCompanies, totalProjects, totalUnits, totalVendors] = await Promise.all([
      CompanyModel.countDocuments({ tenantId, status: 'active' }),
      ProjectModel.countDocuments(projectFilter),
      UnitModel.countDocuments({ tenantId }),
      VendorModel.countDocuments({ tenantId, status: 'active' })
    ]);

    return {
      totalCompanies,
      totalProjects,
      totalUnits,
      totalVendors
    };
  }
}
