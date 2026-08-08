import { ModuleRegistryModel } from './licensing.model.js';
import { SYSTEM_MODULE_MANIFESTS } from './moduleRegistry.catalog.js';

export class ModuleRegistryService {
  static async seedModuleRegistry() {
    for (const manifest of SYSTEM_MODULE_MANIFESTS) {
      await ModuleRegistryModel.updateOne(
        { moduleKey: manifest.moduleKey },
        {
          moduleKey: manifest.moduleKey,
          name: manifest.name,
          description: manifest.description,
          category: manifest.category,
          isCore: manifest.isCore,
          version: manifest.version
        },
        { upsert: true }
      );
    }
  }

  static async listRegisteredModules() {
    let modules = await ModuleRegistryModel.find().sort({ category: 1, name: 1 });
    if (modules.length === 0) {
      await ModuleRegistryService.seedModuleRegistry();
      modules = await ModuleRegistryModel.find().sort({ category: 1, name: 1 });
    }
    return modules;
  }
}
