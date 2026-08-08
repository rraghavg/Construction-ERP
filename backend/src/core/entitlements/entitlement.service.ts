import { TenantModuleModel } from '../module-registry/licensing.model.js';
import { SYSTEM_MODULE_MANIFESTS } from '../module-registry/moduleRegistry.catalog.js';
import { ApiError } from '../../utils/apiError.js';
import { logAuditEvent } from '../../shared/audit/audit.model.js';

export class EntitlementService {
  static async getTenantEntitlements(tenantId: string): Promise<string[]> {
    const records = await TenantModuleModel.find({ tenantId, isEnabled: true });
    const enabledSet = new Set<string>(records.map((r) => r.moduleKey));

    // Core modules are implicitly enabled for all tenants
    SYSTEM_MODULE_MANIFESTS.filter((m) => m.isCore).forEach((m) => enabledSet.add(m.moduleKey));

    return Array.from(enabledSet);
  }

  static validateModuleDependencies(requestedModules: string[]): { valid: boolean; missingDependencies: string[] } {
    const enabledSet = new Set(requestedModules);
    const missing: string[] = [];

    for (const modKey of requestedModules) {
      const manifest = SYSTEM_MODULE_MANIFESTS.find((m) => m.moduleKey === modKey);
      if (manifest && manifest.dependencies) {
        for (const dep of manifest.dependencies) {
          if (!enabledSet.has(dep)) {
            missing.push(`Module '${modKey}' requires dependency '${dep}'`);
          }
        }
      }
    }

    return { valid: missing.length === 0, missingDependencies: missing };
  }

  static async updateTenantEntitlements(tenantId: string, moduleKeys: string[], actorUserId: string) {
    const validation = EntitlementService.validateModuleDependencies(moduleKeys);
    if (!validation.valid) {
      throw new ApiError(422, `Invalid entitlement combination: ${validation.missingDependencies.join(', ')}`, 'INVALID_ENTITLEMENT');
    }

    await TenantModuleModel.deleteMany({ tenantId });

    const newDocs = moduleKeys.map((moduleKey) => ({
      tenantId,
      moduleKey,
      isEnabled: true
    }));

    await TenantModuleModel.create(newDocs);

    await logAuditEvent({
      tenantId,
      actorUserId,
      module: 'core.entitlements',
      action: 'ENTITLEMENTS_UPDATED',
      recordType: 'TenantModule',
      recordId: tenantId,
      afterState: { enabledModules: moduleKeys },
      status: 'success',
      severity: 'high'
    });

    return EntitlementService.getTenantEntitlements(tenantId);
  }
}
