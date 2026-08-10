import { Router } from 'express';
import { authenticateJwt } from '../../../middleware/auth.middleware.js';
import { resolveTenant } from '../../../middleware/tenant.middleware.js';
import { checkModuleLicense } from '../../../middleware/license.middleware.js';
import { DocumentController } from './document.controller.js';

const router = Router();

// Middleware applied to all doc-mgmt routes
router.use(authenticateJwt);
router.use(resolveTenant);
router.use(checkModuleLicense('docMgmt'));

router.get('/search', DocumentController.search);
router.get('/', DocumentController.list);
router.post('/', DocumentController.upload);
router.get('/:id', DocumentController.getById);
router.get('/categories/:category', DocumentController.listByCategory);
router.patch('/:id/archive', DocumentController.archive);

export default router;
