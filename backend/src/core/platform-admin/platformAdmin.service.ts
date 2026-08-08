import { TenantModel } from '../tenant/tenant.model.js';
import { TenantModuleModel } from '../module-registry/licensing.model.js';
import { ApiError } from '../../utils/apiError.js';
import { logAuditEvent } from '../../shared/audit/audit.model.js';

export class PlatformAdminService {
  static async listTenants() {
    return TenantModel.find().sort({ createdAt: -1 });
  }

  static async createTenant(data: {
    tenantId: string;
    name: string;
    code: string;
    contactEmail: string;
    deploymentMode?: 'shared' | 'dedicated';
    modules?: string[];
  }, actorUserId: string) {
    const { tenantId, name, code, contactEmail, deploymentMode = 'shared', modules = ['master-data'] } = data;

    const existing = await TenantModel.findOne({ $or: [{ tenantId }, { code: code.toUpperCase() }] });
    if (existing) {
      throw new ApiError(409, 'TENANT_EXISTS', 'Tenant ID or Tenant Code already exists');
    }

    const tenant = await TenantModel.create({
      tenantId,
      name,
      code: code.toUpperCase(),
      contactEmail: contactEmail.toLowerCase(),
      deploymentMode,
      status: 'active'
    });

    // Configure initial entitlements
    const entitlements = modules.map((moduleKey) => ({
      tenantId,
      moduleKey,
      isEnabled: true
    }));
    await TenantModuleModel.create(entitlements);

    await logAuditEvent({
      tenantId: 'PLATFORM',
      actorUserId,
      module: 'core.platform-admin',
      action: 'TENANT_CREATED',
      recordType: 'Tenant',
      recordId: tenant.tenantId,
      afterState: { name, code, contactEmail, modules },
      status: 'success',
      severity: 'medium'
    });

    return tenant;
  }

  static async updateTenantStatus(tenantId: string, status: 'active' | 'suspended' | 'trial', actorUserId: string) {
    const tenant = await TenantModel.findOne({ tenantId });
    if (!tenant) {
      throw new ApiError(404, 'TENANT_NOT_FOUND', 'Tenant not found');
    }

    const beforeState = { status: tenant.status };
    tenant.status = status;
    await tenant.save();

    await logAuditEvent({
      tenantId: 'PLATFORM',
      actorUserId,
      module: 'core.platform-admin',
      action: `TENANT_STATUS_CHANGED_${status.toUpperCase()}`,
      recordType: 'Tenant',
      recordId: tenant.tenantId,
      beforeState,
      afterState: { status: tenant.status },
      status: 'success',
      severity: 'high'
    });

    return tenant;
  }

  static async configureTenantModules(tenantId: string, enabledModuleKeys: string[], actorUserId: string) {
    const tenant = await TenantModel.findOne({ tenantId });
    if (!tenant) {
      throw new ApiError(404, 'TENANT_NOT_FOUND', 'Tenant not found');
    }

    // Reset module entitlements
    await TenantModuleModel.deleteMany({ tenantId });

    const newEntitlements = enabledModuleKeys.map((moduleKey) => ({
      tenantId,
      moduleKey,
      isEnabled: true
    }));

    await TenantModuleModel.create(newEntitlements);

    await logAuditEvent({
      tenantId: 'PLATFORM',
      actorUserId,
      module: 'core.platform-admin',
      action: 'TENANT_LICENSES_UPDATED',
      recordType: 'TenantModule',
      recordId: tenantId,
      afterState: { enabledModuleKeys },
      status: 'success',
      severity: 'high'
    });

    return { tenantId, enabledModules: enabledModuleKeys };
  }
}
