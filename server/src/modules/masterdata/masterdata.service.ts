import { CompanyModel } from './models/company.model.js';
import { ProjectModel } from './models/project.model.js';
import { BuildingModel, TowerModel, FloorModel } from './models/hierarchy.model.js';
import { UnitTypeModel, UnitModel } from './models/unit.model.js';
import { VendorModel, DealerModel, BankModel } from './models/commercial.model.js';
import { TaxModel, PaymentModeModel, ComplaintCategoryModel } from './models/reference.model.js';
import { logAuditEvent } from '../../core/audit/audit.model.js';
import { ApiError } from '../../utils/apiError.js';

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

  static async createCompany(tenantId: string, actorUserId: string, data: any) {
    const existing = await CompanyModel.findOne({ tenantId, code: data.code.toUpperCase() });
    if (existing) {
      throw new ApiError(409, 'RESOURCE_CONFLICT', `Company code '${data.code}' already exists in tenant`);
    }

    const companyId = `COMP-${Date.now()}`;
    const company = await CompanyModel.create({
      ...data,
      companyId,
      tenantId,
      code: data.code.toUpperCase()
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

  static async createProject(tenantId: string, actorUserId: string, data: any) {
    const company = await CompanyModel.findOne({ tenantId, companyId: data.companyId });
    if (!company) {
      throw new ApiError(404, 'COMPANY_NOT_FOUND', `Parent Company '${data.companyId}' not found in tenant`);
    }

    const existing = await ProjectModel.findOne({ tenantId, code: data.code.toUpperCase() });
    if (existing) {
      throw new ApiError(409, 'RESOURCE_CONFLICT', `Project code '${data.code}' already exists`);
    }

    const projectId = `PRJ-${Date.now()}`;
    const project = await ProjectModel.create({
      ...data,
      projectId,
      tenantId,
      code: data.code.toUpperCase()
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

  // ---- Unit Operations ----
  static async listUnits(tenantId: string, query: { projectId?: string; status?: string; search?: string; page?: number; limit?: number }) {
    const page = query.page || 1;
    const limit = query.limit || 20;
    const skip = (page - 1) * limit;

    const filter: any = { tenantId };
    if (query.projectId) filter.projectId = query.projectId;
    if (query.status) filter.status = query.status;
    if (query.search) filter.unitNumber = { $regex: query.search, $options: 'i' };

    const [items, total] = await Promise.all([
      UnitModel.find(filter).sort({ unitNumber: 1 }).skip(skip).limit(limit),
      UnitModel.countDocuments(filter)
    ]);

    return { items, total, page, limit };
  }

  static async createUnit(tenantId: string, actorUserId: string, data: any) {
    const existing = await UnitModel.findOne({ tenantId, projectId: data.projectId, unitNumber: data.unitNumber });
    if (existing) {
      throw new ApiError(409, 'RESOURCE_CONFLICT', `Unit Number '${data.unitNumber}' already exists in this project`);
    }

    const unitId = `UNT-${Date.now()}`;
    const unit = await UnitModel.create({
      ...data,
      unitId,
      tenantId
    });

    await logAuditEvent({
      tenantId,
      actorUserId,
      module: 'master-data',
      action: 'Created Unit',
      recordType: 'unit',
      recordId: unitId,
      afterState: unit.toObject(),
      status: 'success',
      severity: 'medium'
    });

    return unit;
  }

  static async updateUnitStatus(tenantId: string, actorUserId: string, unitId: string, newStatus: string) {
    const unit = await UnitModel.findOne({ tenantId, unitId });
    if (!unit) {
      throw new ApiError(404, 'UNIT_NOT_FOUND', `Unit '${unitId}' not found`);
    }

    const beforeState = { status: unit.status };
    unit.status = newStatus as any;
    await unit.save();

    await logAuditEvent({
      tenantId,
      actorUserId,
      module: 'master-data',
      action: 'Updated Unit Status',
      recordType: 'unit',
      recordId: unitId,
      beforeState,
      afterState: { status: unit.status },
      status: 'success',
      severity: 'high'
    });

    return unit;
  }

  static async updateUnitPrice(tenantId: string, actorUserId: string, unitId: string, newPrice: number) {
    const unit = await UnitModel.findOne({ tenantId, unitId });
    if (!unit) {
      throw new ApiError(404, 'UNIT_NOT_FOUND', `Unit '${unitId}' not found`);
    }

    const beforeState = { price: unit.price };
    unit.price = newPrice;
    await unit.save();

    await logAuditEvent({
      tenantId,
      actorUserId,
      module: 'master-data',
      action: 'Updated Unit Commercial Price',
      recordType: 'unit',
      recordId: unitId,
      beforeState,
      afterState: { price: unit.price },
      status: 'success',
      severity: 'critical'
    });

    return unit;
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
