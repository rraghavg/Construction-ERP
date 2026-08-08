import { Router } from 'express';
import { ModuleRegistryController } from './moduleRegistry.controller.js';

const router = Router();

router.get('/registry', ModuleRegistryController.listRegisteredModules);

export default router;
