import { Router } from 'express';
import { RoleController } from './role.controller.js';
import { authenticateJwt } from '../../middleware/auth.middleware.js';
import { resolveTenant } from '../../middleware/tenant.middleware.js';
import { checkPermission } from '../../middleware/rbac.middleware.js';

const router = Router();

router.use(authenticateJwt, resolveTenant);

router.get('/', RoleController.listRoles);
router.post('/', checkPermission('admin.role.manage'), RoleController.createRole);
router.get('/:roleKey', RoleController.getRoleByKey);
router.patch('/:roleKey', checkPermission('admin.role.manage'), RoleController.updateRole);
router.delete('/:roleKey', checkPermission('admin.role.manage'), RoleController.deleteRole);

export default router;
