import { Router } from 'express';
import { PlatformAdminController } from './platformAdmin.controller.js';
import { authenticateJwt, requireSuperAdmin } from '../../middleware/auth.middleware.js';

const router = Router();

// All Platform Admin routes require valid JWT + Platform Super Admin status
router.use(authenticateJwt, requireSuperAdmin);

router.get('/tenants', PlatformAdminController.listTenants);
router.post('/tenants', PlatformAdminController.createTenant);
router.patch('/tenants/:tenantId/status', PlatformAdminController.updateTenantStatus);
router.put('/tenants/:tenantId/modules', PlatformAdminController.configureTenantModules);

export default router;
