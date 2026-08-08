import { Request, Response } from 'express';
import { ModuleRegistryService } from './moduleRegistry.service.js';
import { sendSuccess, sendError } from '../../utils/apiResponse.js';

export class ModuleRegistryController {
  static async listRegisteredModules(req: Request, res: Response) {
    try {
      const modules = await ModuleRegistryService.listRegisteredModules();
      return sendSuccess(res, modules);
    } catch (err: any) {
      return sendError(res, err.code || 'LIST_MODULES_FAILED', err.message, err.statusCode || 500);
    }
  }
}
