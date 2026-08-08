import { AuthenticatedRequest } from '../../middleware/auth.middleware.js';

export type ScopeLevel = 'TENANT' | 'PROJECT_SET' | 'NONE';

export class ScopeService {
  static getEffectiveScope(req: AuthenticatedRequest): { level: ScopeLevel; allowedProjects: string[] } {
    const user = req.user;
    if (!user) {
      return { level: 'NONE', allowedProjects: [] };
    }

    if (user.isSuperAdmin) {
      return { level: 'TENANT', allowedProjects: [] };
    }

    if (Array.isArray(user.allowedProjects) && user.allowedProjects.includes('NONE')) {
      return { level: 'NONE', allowedProjects: [] };
    }

    if (!user.allowedProjects || user.allowedProjects.length === 0) {
      return { level: 'TENANT', allowedProjects: [] };
    }

    return { level: 'PROJECT_SET', allowedProjects: user.allowedProjects };
  }

  static buildProjectQueryFilter(req: AuthenticatedRequest, baseFilter: Record<string, any> = {}): Record<string, any> {
    const tenantId = req.tenantId;
    const scope = ScopeService.getEffectiveScope(req);

    if (scope.level === 'NONE') {
      return { ...baseFilter, tenantId, _id: null }; // Evaluates 0 documents, 0 count
    }

    if (scope.level === 'PROJECT_SET') {
      return { ...baseFilter, tenantId, projectId: { $in: scope.allowedProjects } };
    }

    // TENANT Scope
    return { ...baseFilter, tenantId };
  }
}
