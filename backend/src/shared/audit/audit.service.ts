import { AuditEventModel, logAuditEvent } from './audit.model.js';

export class AuditService {
  static async logAction(
    tenantId: string,
    userId: string,
    action: string,
    entityType: string,
    entityId: string,
    changes: { beforeState?: any; afterState?: any },
    ipAddress?: string
  ) {
    const module = entityType || 'system';
    
    return logAuditEvent({
      tenantId,
      actorUserId: userId,
      module,
      action,
      recordType: entityType,
      recordId: entityId,
      beforeState: changes?.beforeState,
      afterState: changes?.afterState,
      ipAddress
    });
  }

  static async getAuditTrail(tenantId: string, filters: any = {}, pagination: any = {}) {
    const query: any = { tenantId };
    
    if (filters.action) query.action = filters.action;
    if (filters.module) query.module = filters.module;
    if (filters.actorUserId) query.actorUserId = filters.actorUserId;

    if (filters.startDate || filters.endDate) {
      query.createdAt = {};
      if (filters.startDate) query.createdAt.$gte = new Date(filters.startDate);
      if (filters.endDate) query.createdAt.$lte = new Date(filters.endDate);
    }
    
    const limit = pagination.limit ? parseInt(pagination.limit) : 50;
    const skip = pagination.skip ? parseInt(pagination.skip) : 0;
    
    const logs = await AuditEventModel.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit);
    const total = await AuditEventModel.countDocuments(query);
    
    return { logs, total, limit, skip };
  }

  static async getByEntity(tenantId: string, entityType: string, entityId: string) {
    return AuditEventModel.find({ tenantId, recordType: entityType, recordId: entityId }).sort({ createdAt: -1 });
  }

  static async getTopUsersByActivity(tenantId: string, periodDays: number = 30) {
    const date = new Date();
    date.setDate(date.getDate() - periodDays);

    return AuditEventModel.aggregate([
      { $match: { tenantId, createdAt: { $gte: date } } },
      { $group: { _id: '$actorUserId', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);
  }

  static async exportAuditReport(tenantId: string, dateRange: { startDate?: string; endDate?: string }, format: string = 'csv') {
    // Generate dummy report URL
    return { message: `Report generated in ${format} format`, url: 'https://cdn.example.com/exports/audit.csv' };
  }
}
