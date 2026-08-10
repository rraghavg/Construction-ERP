import { SystemConfigModel, ISystemConfig } from '../models/systemConfig.model.js';
import { logAuditEvent } from '../../../shared/audit/audit.model.js';
import { SettingModel } from '../models/setting.model.js';

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
  static async getAll(tenantId: string) {
    return await SettingModel.find({ tenantId });
  }

  static async getByCategory(tenantId: string, category: string) {
    return await SettingModel.find({ tenantId, category });
  }

  static async update(tenantId: string, key: string, value: any, userId: string) {
    const setting = await SettingModel.findOneAndUpdate(
      { tenantId, key },
      { value, updatedBy: userId },
      { new: true, upsert: true } // Assuming we want to create if not exists
    );
    return setting;
  }

  static async bulkUpdate(tenantId: string, settings: { key: string; value: any }[], userId: string) {
    const bulkOps = settings.map((s) => ({
      updateOne: {
        filter: { tenantId, key: s.key },
        update: { value: s.value, updatedBy: userId },
        upsert: true
      }
    }));
    await SettingModel.bulkWrite(bulkOps);
    return { success: true, count: settings.length };
  }
}
