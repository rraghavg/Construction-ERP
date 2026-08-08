import { SystemConfigModel, ISystemConfig } from '../models/systemConfig.model.js';
import { logAuditEvent } from '../../../shared/audit/audit.model.js';

export class SettingsService {
  static async getSystemConfig(tenantId: string): Promise<ISystemConfig> {
    let config = await SystemConfigModel.findOne({ tenantId });
    if (!config) {
      config = await SystemConfigModel.create({ tenantId });
    }
    return config;
  }

  static async updateSystemConfig(tenantId: string, updates: Partial<ISystemConfig>, updatedBy: string): Promise<ISystemConfig> {
    let config = await SystemConfigModel.findOne({ tenantId });
    if (!config) {
      config = new SystemConfigModel({ tenantId, ...updates, updatedBy });
    } else {
      Object.assign(config, updates, { updatedBy });
    }
    const saved = await config.save();
    await logAuditEvent({
      tenantId,
      actorUserId: updatedBy,
      module: 'settings',
      action: 'SYSTEM_SETTINGS_UPDATED',
      recordType: 'SystemConfig',
      recordId: tenantId,
      status: 'success',
      severity: 'medium'
    });
    return saved;
  }
}
