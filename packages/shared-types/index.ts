/**
 * Shared Type Definitions for APEX Construction ERP.
 * Decoupled from MongoDB/Mongoose ORM persistence schemas.
 */

export interface ITenantContext {
  tenantId: string;
  name: string;
  code: string;
  status: 'active' | 'suspended' | 'trial';
}

export interface IUserIdentity {
  userId: string;
  tenantId: string;
  fullName: string;
  email: string;
  roles: string[];
  allowedProjects: string[];
  isSuperAdmin?: boolean;
}

export interface IApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
    requestId?: string;
    timestamp?: string;
  };
}

export interface IPaginatedQuery {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}
