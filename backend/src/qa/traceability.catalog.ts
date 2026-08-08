export interface ITraceabilityItem {
  requirementId: string;
  module: string;
  requirement: string;
  frontendScreen: string;
  apiEndpoint: string;
  permissionKey: string;
  dbEffect: string;
  auditEvent: string;
  status: 'PASS' | 'FAIL' | 'BLOCKED' | 'NOT_TESTED';
}

export const REQUIREMENT_TRACEABILITY_MATRIX: ITraceabilityItem[] = [
  {
    requirementId: 'CORE-TEN-001',
    module: 'Core Platform',
    requirement: 'Mandatory Tenant Isolation across all collections',
    frontendScreen: 'Global Navigation & Layout',
    apiEndpoint: 'All API Endpoints',
    permissionKey: 'Server-side tenantId context injection',
    dbEffect: 'Compound index { tenantId: 1 } enforced on all queries',
    auditEvent: 'core.tenant.isolated',
    status: 'PASS'
  },
  {
    requirementId: 'CORE-AUTH-002',
    module: 'Core Platform',
    requirement: 'Revocable JWT session & active login lifecycle',
    frontendScreen: 'User Management > Active Sessions',
    apiEndpoint: 'POST /api/v1/auth/login, POST /api/v1/auth/logout',
    permissionKey: 'Public Auth',
    dbEffect: 'Session document created/invalidated in sessions collection',
    auditEvent: 'auth.user_logged_in',
    status: 'PASS'
  },
  {
    requirementId: 'CORE-LIC-003',
    module: 'Core Platform',
    requirement: 'Tenant module licensing engine (rejects unlicensed modules with 403)',
    frontendScreen: 'Sidebar navigation hides unlicensed modules',
    apiEndpoint: 'All business module endpoints',
    permissionKey: 'checkModuleLicense(moduleKey)',
    dbEffect: 'TenantModuleModel check against tenantId + moduleKey',
    auditEvent: 'core.module.license_checked',
    status: 'PASS'
  },
  {
    requirementId: 'CORE-RBAC-004',
    module: 'Core Platform',
    requirement: 'Canonical string permissions & custom role bundles',
    frontendScreen: 'User Management > Roles & Hierarchy',
    apiEndpoint: 'All protected endpoints',
    permissionKey: 'checkPermission(canonicalKey)',
    dbEffect: 'RoleModel permissions array evaluated server-side',
    auditEvent: 'core.rbac.permission_evaluated',
    status: 'PASS'
  },
  {
    requirementId: 'CORE-SCP-005',
    module: 'Core Platform',
    requirement: 'Company & Project resource scope boundary enforcement',
    frontendScreen: 'Header Project Selector & Site-scoped screens',
    apiEndpoint: 'Endpoints accepting projectId parameter',
    permissionKey: 'checkProjectScope(projectId)',
    dbEffect: 'UserModel allowedProjects checked against target resource',
    auditEvent: 'core.scope.resource_checked',
    status: 'PASS'
  },
  {
    requirementId: 'CORE-AUD-006',
    module: 'Core Platform',
    requirement: 'Append-only audit trail with SHA-256 checksum hash chain',
    frontendScreen: 'Audit & Compliance Logs > Activity Inspector',
    apiEndpoint: 'GET /api/v1/audit-events',
    permissionKey: 'core.audit.view',
    dbEffect: 'AuditEventModel write-once INSERT with prevChecksum hash link',
    auditEvent: 'audit_event_logged',
    status: 'PASS'
  },
  {
    requirementId: 'CORE-APP-007',
    module: 'Core Platform',
    requirement: 'Universal Multi-Step Approval Engine',
    frontendScreen: 'Approval Workflows Setup & Pending Approvals',
    apiEndpoint: 'POST /api/v1/approvals/instances',
    permissionKey: 'approval.instance.create',
    dbEffect: 'ApprovalWorkflow & ApprovalInstance state transitions',
    auditEvent: 'approval.workflow_created',
    status: 'PASS'
  },
  {
    requirementId: 'MD-COMP-010',
    module: 'Master Data',
    requirement: 'Company legal entity hierarchy backbone',
    frontendScreen: 'Master Data > Companies',
    apiEndpoint: 'GET/POST /api/v1/master-data/companies',
    permissionKey: 'master.company.view / master.company.create',
    dbEffect: 'CompanyModel inserted with unique code in tenant',
    auditEvent: 'master.company.created',
    status: 'PASS'
  },
  {
    requirementId: 'MD-PRJ-011',
    module: 'Master Data',
    requirement: 'Construction project hierarchy & resource scope link',
    frontendScreen: 'Master Data > Projects',
    apiEndpoint: 'GET/POST /api/v1/master-data/projects',
    permissionKey: 'master.project.view / master.project.create',
    dbEffect: 'ProjectModel inserted under parent companyId',
    auditEvent: 'master.project.created',
    status: 'PASS'
  },
  {
    requirementId: 'MD-UNT-012',
    module: 'Master Data',
    requirement: 'Unit property inventory, state machine & commercial price update',
    frontendScreen: 'Master Data > Units Inventory',
    apiEndpoint: 'PATCH /api/v1/master-data/units/:id/price',
    permissionKey: 'master.unit.change_price',
    dbEffect: 'UnitModel price updated; previous state saved',
    auditEvent: 'master.unit.price_updated',
    status: 'PASS'
  },
  {
    requirementId: 'MD-VEN-013',
    module: 'Master Data',
    requirement: 'Vendor directory & sensitive bank account masking',
    frontendScreen: 'Master Data > Vendors',
    apiEndpoint: 'GET /api/v1/master-data/vendors',
    permissionKey: 'master.vendor.view / master.vendor.view_sensitive',
    dbEffect: 'Bank account number masked XXXX-XXXX-1234 if unauthorized',
    auditEvent: 'master.vendor.viewed',
    status: 'PASS'
  }
];
