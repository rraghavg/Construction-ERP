import { Response } from 'express';
import { AuthenticatedRequest } from '../../middleware/auth.middleware.js';
import { MasterDataService } from './masterdata.service.js';
import { sendSuccess } from '../../utils/apiResponse.js';

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

  // Units
  static async listUnits(req: AuthenticatedRequest, res: Response) {
    const { projectId, status, search, page, limit } = req.query;
    const result = await MasterDataService.listUnits(req.tenantId!, {
      projectId: projectId as string,
      status: status as string,
      search: search as string,
      page: page ? parseInt(page as string, 10) : 1,
      limit: limit ? parseInt(limit as string, 10) : 20
    });

    return sendSuccess(res, result.items, { total: result.total, page: result.page, limit: result.limit });
  }

  static async createUnit(req: AuthenticatedRequest, res: Response) {
    const unit = await MasterDataService.createUnit(req.tenantId!, req.user.userId, req.body);
    return sendSuccess(res, unit, {}, 201);
  }

  static async updateUnitStatus(req: AuthenticatedRequest, res: Response) {
    const { unitId } = req.params;
    const { status } = req.body;
    const unit = await MasterDataService.updateUnitStatus(req.tenantId!, req.user.userId, unitId, status);
    return sendSuccess(res, unit);
  }

  static async updateUnitPrice(req: AuthenticatedRequest, res: Response) {
    const { unitId } = req.params;
    const { price } = req.body;
    const unit = await MasterDataService.updateUnitPrice(req.tenantId!, req.user.userId, unitId, parseFloat(price));
    return sendSuccess(res, unit);
  }

  // Vendors
  static async listVendors(req: AuthenticatedRequest, res: Response) {
    const userPermissions = req.user.permissions || [];
    const canViewSensitive = req.user.isSuperAdmin || userPermissions.includes('master.vendor.view_sensitive');
    const vendors = await MasterDataService.listVendors(req.tenantId!, !canViewSensitive);
    return sendSuccess(res, vendors);
  }
}
