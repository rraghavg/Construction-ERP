import bcrypt from 'bcryptjs';
import { TenantModel } from '../../core/tenant/tenant.model.js';
import { UserModel } from '../../core/users/user.model.js';
import { SessionModel } from '../../core/sessions/session.model.js';
import { RoleModel } from '../../core/roles/role.model.js';
import { ModuleRegistryModel, TenantModuleModel } from '../../core/module-registry/licensing.model.js';

export async function autoSeedDevelopmentData() {
  try {
    const userCount = await UserModel.countDocuments();
    if (userCount > 0) {
      return; // Already seeded
    }

    console.log('🌱 Auto-seeding development tenant, roles, and default user (rahul@abcdevelopers.com)...');

    // 1. Module Registry
    await ModuleRegistryModel.deleteMany({});
    await ModuleRegistryModel.create([
      { moduleKey: 'master-data', name: 'Master Data', isCore: true },
      { moduleKey: 'crm', name: 'CRM', isCore: false },
      { moduleKey: 'sales', name: 'Sales', isCore: false },
      { moduleKey: 'finance', name: 'Finance', isCore: false }
    ]);

    // 2. Tenant ABC Developers
    await TenantModel.deleteMany({});
    await TenantModel.create({
      tenantId: 'TENANT-ABC',
      name: 'ABC Developers Pvt Ltd',
      code: 'ABC',
      status: 'active',
      deploymentMode: 'shared',
      contactEmail: 'admin@abcdevelopers.com'
    });

    // 3. Enable Modules
    await TenantModuleModel.deleteMany({});
    await TenantModuleModel.create([
      { tenantId: 'TENANT-ABC', moduleKey: 'master-data', isEnabled: true },
      { tenantId: 'TENANT-ABC', moduleKey: 'crm', isEnabled: true },
      { tenantId: 'TENANT-ABC', moduleKey: 'sales', isEnabled: true }
    ]);

    // 4. Role
    await RoleModel.deleteMany({});
    await RoleModel.create({
      tenantId: 'TENANT-ABC',
      roleKey: 'sales_exec',
      name: 'Sales Executive',
      permissions: ['*']
    });

    // 5. User Rahul
    await UserModel.deleteMany({});
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash('Rahul@12345', salt);

    await UserModel.create({
      userId: 'USR-RAHUL',
      tenantId: 'TENANT-ABC',
      fullName: 'Rahul Sharma (Admin)',
      email: 'rahul@abcdevelopers.com',
      passwordHash: hash,
      roleKeys: ['sales_exec'],
      allowedProjects: ['Project A'],
      isSuperAdmin: true,
      status: 'active'
    });

    console.log('✅ Auto-seeding completed! Login credentials: rahul@abcdevelopers.com / Rahul@12345 (TENANT-ABC)');
  } catch (err: any) {
    console.error('⚠️ Auto-seeding notice:', err.message);
  }
}
