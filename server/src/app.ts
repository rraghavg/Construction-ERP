import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { env } from './config/env.js';
import { connectDatabase } from './config/database.js';
import { sendSuccess, sendError } from './utils/apiResponse.js';
import { globalErrorHandler } from './middleware/error.middleware.js';
import { authenticateJwt, AuthenticatedRequest } from './middleware/auth.middleware.js';
import { resolveTenant } from './middleware/tenant.middleware.js';
import { checkModuleLicense } from './middleware/license.middleware.js';
import { checkPermission } from './middleware/rbac.middleware.js';
import { checkProjectScope } from './middleware/scope.middleware.js';
import { TenantModel } from './core/tenant/tenant.model.js';
import { UserModel } from './core/auth/user.model.js';
import { SessionModel } from './core/auth/session.model.js';
import { RoleModel } from './core/rbac/role.model.js';
import { ModuleRegistryModel, TenantModuleModel } from './core/licensing/licensing.model.js';
import { logAuditEvent, AuditEventModel } from './core/audit/audit.model.js';
import { requestLogger } from './middleware/requestLogger.middleware.js';
import masterDataRouter from './modules/masterdata/masterdata.routes.js';
import qaRouter from './qa/qa.routes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(requestLogger);

// G0 Gate: Health Readiness Check
app.get('/api/v1/health', (req, res) => {
  return sendSuccess(res, {
    status: 'healthy',
    version: 'v2.4.1-PROD',
    service: 'Construction ERP Core Platform Monolith',
    timestamp: new Date().toISOString()
  });
});

// Sprint 0 Seeder Route (PRD §17 Acceptance Test Setup)
app.post('/api/v1/seed', async (req, res) => {
  try {
    await connectDatabase();

    // 1. Clean existing records
    await TenantModel.deleteMany({});
    await UserModel.deleteMany({});
    await SessionModel.deleteMany({});
    await RoleModel.deleteMany({});
    await ModuleRegistryModel.deleteMany({});
    await TenantModuleModel.deleteMany({});
    await AuditEventModel.deleteMany({});

    // 2. Global Module Registry
    await ModuleRegistryModel.create([
      { moduleKey: 'master-data', name: 'Master Data', isCore: true },
      { moduleKey: 'crm', name: 'CRM', isCore: false },
      { moduleKey: 'sales', name: 'Sales', isCore: false },
      { moduleKey: 'finance', name: 'Finance', isCore: false }
    ]);

    // 3. Tenant ABC Developers
    const tenant = await TenantModel.create({
      tenantId: 'TENANT-ABC',
      name: 'ABC Developers Pvt Ltd',
      code: 'ABC',
      status: 'active',
      deploymentMode: 'shared',
      contactEmail: 'admin@abcdevelopers.com'
    });

    // 4. Enable Master Data + CRM + Sales (Leave Finance UNLICENSED for testing)
    await TenantModuleModel.create([
      { tenantId: 'TENANT-ABC', moduleKey: 'master-data', isEnabled: true },
      { tenantId: 'TENANT-ABC', moduleKey: 'crm', isEnabled: true },
      { tenantId: 'TENANT-ABC', moduleKey: 'sales', isEnabled: true }
    ]);

    // 5. Tenant Roles
    const salesExecRole = await RoleModel.create({
      tenantId: 'TENANT-ABC',
      roleKey: 'sales_exec',
      name: 'Sales Executive',
      permissions: [
        'crm.lead.view',
        'sales.booking.view',
        'sales.booking.create',
        'master.company.view',
        'master.company.create',
        'master.project.view',
        'master.project.create',
        'master.unit.view',
        'master.unit.create',
        'master.unit.change_status',
        'master.unit.change_price',
        'master.vendor.view'
      ]
    });

    // 6. User Rahul (Scoped to Project A only)
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash('Rahul@12345', salt);

    const rahul = await UserModel.create({
      userId: 'USR-RAHUL',
      tenantId: 'TENANT-ABC',
      fullName: 'Rahul Sharma',
      email: 'rahul@abcdevelopers.com',
      passwordHash: hash,
      roleKeys: ['sales_exec'],
      allowedProjects: ['Project A'], // Denies Project B
      status: 'active'
    });

    // 7. Seed Master Data Records
    const { CompanyModel } = await import('./modules/masterdata/models/company.model.js');
    const { ProjectModel } = await import('./modules/masterdata/models/project.model.js');
    const { UnitModel } = await import('./modules/masterdata/models/unit.model.js');
    const { VendorModel } = await import('./modules/masterdata/models/commercial.model.js');

    await CompanyModel.deleteMany({});
    await ProjectModel.deleteMany({});
    await UnitModel.deleteMany({});
    await VendorModel.deleteMany({});

    const company = await CompanyModel.create({
      companyId: 'COMP-001',
      tenantId: 'TENANT-ABC',
      name: 'Apex Structural Constructions Pvt Ltd',
      code: 'APEX',
      address: 'Plot 42, Hitec City, Hyderabad',
      gstin: '36AAACA0000A1Z5',
      status: 'active'
    });

    const projectA = await ProjectModel.create({
      projectId: 'PRJ-001',
      tenantId: 'TENANT-ABC',
      companyId: 'COMP-001',
      name: 'Project A',
      code: 'PRJ-A',
      city: 'Hyderabad',
      status: 'ACTIVE'
    });

    const projectB = await ProjectModel.create({
      projectId: 'PRJ-002',
      tenantId: 'TENANT-ABC',
      companyId: 'COMP-001',
      name: 'Project B',
      code: 'PRJ-B',
      city: 'Bengaluru',
      status: 'ACTIVE'
    });

    await UnitModel.create([
      { unitId: 'UNT-101', tenantId: 'TENANT-ABC', companyId: 'COMP-001', projectId: 'PRJ-001', unitNumber: 'A-101', category: 'FLAT', carpetArea: 1250, price: 7500000, status: 'AVAILABLE' },
      { unitId: 'UNT-102', tenantId: 'TENANT-ABC', companyId: 'COMP-001', projectId: 'PRJ-001', unitNumber: 'A-102', category: 'FLAT', carpetArea: 1450, price: 8900000, status: 'BLOCKED' },
      { unitId: 'UNT-201', tenantId: 'TENANT-ABC', companyId: 'COMP-001', projectId: 'PRJ-002', unitNumber: 'B-201', category: 'OFFICE', carpetArea: 2100, price: 15000000, status: 'AVAILABLE' }
    ]);

    await VendorModel.create({
      vendorId: 'VEN-001',
      tenantId: 'TENANT-ABC',
      name: 'UltraTech Cement India Ltd',
      code: 'VEN-ULTRA',
      category: 'Material Supplier',
      contactPerson: 'Suresh Rao',
      phone: '+91 98765 43210',
      bankDetails: { accountName: 'UltraTech Cement Ltd', accountNumber: '98765432101234', bankName: 'HDFC Bank', ifscCode: 'HDFC0001234' },
      status: 'active'
    });

    // 8. Audit Seeding
    await logAuditEvent({
      tenantId: 'TENANT-ABC',
      actorUserId: 'SYSTEM',
      module: 'core',
      action: 'Tenant & Master Data Provisioned & Seeded',
      status: 'success',
      severity: 'low'
    });

    return sendSuccess(res, {
      message: 'Sprint 0 Core Platform & Sprint 1 Master Data Seeded Successfully!',
      tenant: tenant.tenantId,
      user: rahul.email,
      password: 'Rahul@12345',
      licensedModules: ['master-data', 'crm', 'sales'],
      company: company.name,
      projectsSeeded: [projectA.name, projectB.name],
      unitsSeeded: 3
    });
  } catch (err: any) {
    return sendError(res, 'SEED_FAILED', err.message, 500);
  }
});

// Authentication Routes
app.post('/api/v1/auth/login', async (req, res) => {
  try {
    const { email, password, tenantId } = req.body;
    if (!email || !password || !tenantId) {
      return sendError(res, 'INVALID_INPUT', 'email, password, and tenantId are required', 400);
    }

    const tenant = await TenantModel.findOne({ tenantId });
    if (!tenant || tenant.status !== 'active') {
      return sendError(res, 'TENANT_SUSPENDED', 'Tenant account not found or suspended', 403);
    }

    const user = await UserModel.findOne({ email, tenantId });
    if (!user) {
      return sendError(res, 'INVALID_CREDENTIALS', 'Invalid email or password', 401);
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      user.failedLoginAttempts += 1;
      if (user.failedLoginAttempts >= 5) {
        user.status = 'locked';
      }
      await user.save();
      return sendError(res, 'INVALID_CREDENTIALS', 'Invalid email or password', 401);
    }

    // Reset failed attempts & update last login
    user.failedLoginAttempts = 0;
    user.lastLoginAt = new Date();
    await user.save();

    // Create Session
    const sessionId = `SES-${Date.now()}`;
    const token = jwt.sign(
      { userId: user.userId, tenantId: user.tenantId, sessionId },
      env.JWT_SECRET as jwt.Secret,
      { expiresIn: '8h' }
    );

    await SessionModel.create({
      sessionId,
      tenantId: user.tenantId,
      userId: user.userId,
      tokenHash: token.slice(-10),
      ipAddress: req.ip || '127.0.0.1',
      userAgent: req.headers['user-agent'] || 'Unknown',
      expiresAt: new Date(Date.now() + 8 * 3600 * 1000)
    });

    await logAuditEvent({
      tenantId: user.tenantId,
      actorUserId: user.userId,
      module: 'auth',
      action: 'User Logged In',
      status: 'success',
      severity: 'low'
    });

    return sendSuccess(res, {
      token,
      sessionId,
      user: {
        userId: user.userId,
        fullName: user.fullName,
        email: user.email,
        tenantId: user.tenantId,
        roles: user.roleKeys,
        allowedProjects: user.allowedProjects
      }
    });
  } catch (err: any) {
    return sendError(res, 'LOGIN_ERROR', err.message, 500);
  }
});

// Verification API Endpoints (Testing PRD §17 Scenarios)

// 1. CRM Module Endpoint (Licensed for ABC Developers)
app.get(
  '/api/v1/crm/leads',
  authenticateJwt,
  resolveTenant,
  checkModuleLicense('crm'),
  checkPermission('crm.lead.view'),
  async (req: AuthenticatedRequest, res) => {
    return sendSuccess(res, {
      module: 'CRM',
      leads: [
        { id: 'LEAD-9012', name: 'Rajesh Kumar', project: 'Project A', status: 'QUALIFIED' }
      ]
    });
  }
);

// 2. Sales Module Endpoint (Licensed, requires sales.booking.create permission & Project A scope)
app.post(
  '/api/v1/sales/bookings/:projectId',
  authenticateJwt,
  resolveTenant,
  checkModuleLicense('sales'),
  checkPermission('sales.booking.create'),
  checkProjectScope('projectId'),
  async (req: AuthenticatedRequest, res) => {
    await logAuditEvent({
      tenantId: req.tenantId!,
      actorUserId: req.user.userId,
      module: 'sales',
      action: 'Created Booking',
      recordType: 'booking',
      recordId: 'BKG-2026-001',
      status: 'success',
      severity: 'medium'
    });

    return sendSuccess(res, {
      bookingId: 'BKG-2026-001',
      project: req.params.projectId,
      status: 'DRAFT',
      createdBy: req.user.fullName
    });
  }
);

// 3. Finance Module Endpoint (UNLICENSED for ABC Developers -> Returns 403 MODULE_NOT_ENABLED)
app.get(
  '/api/v1/finance/ledgers',
  authenticateJwt,
  resolveTenant,
  checkModuleLicense('finance'),
  async (req: AuthenticatedRequest, res) => {
    return sendSuccess(res, { ledgers: [] });
  }
);

// Master Data Production API Surface
app.use('/api/v1/master-data', masterDataRouter);

// QA & Release Governance API Surface
app.use('/api/v1/qa', qaRouter);

// Global Error Middleware
app.use(globalErrorHandler);

// Start Backend Server
const PORT = parseInt(env.PORT, 10);
app.listen(PORT, async () => {
  console.log(`\n==================================================`);
  console.log(`🚀 Apex Construction ERP Backend Monolith Running!`);
  console.log(`📡 Server Address: http://localhost:${PORT}`);
  console.log(`🏥 Health Check:   http://localhost:${PORT}/api/v1/health`);
  console.log(`==================================================\n`);
  await connectDatabase();
});

export default app;
