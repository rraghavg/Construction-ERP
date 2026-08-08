import { RequestHandler } from 'express';
import { authenticateJwt } from '../../middleware/auth.middleware.js';
import { resolveTenant } from '../../middleware/tenant.middleware.js';
import { checkModuleLicense } from '../../middleware/license.middleware.js';
import { checkPermission } from '../../middleware/rbac.middleware.js';
import { checkProjectScope } from '../../middleware/scope.middleware.js';

export interface IPolicyConfig {
  moduleKey: string;
  permissionKey: string;
  projectIdParam?: string;
}

/**
 * Authoritative Pipeline Builder for APEX Construction ERP.
 * Chains: authenticateJwt -> resolveTenant -> checkModuleLicense -> checkPermission -> checkProjectScope
 */
export const authorizePolicy = (config: IPolicyConfig): RequestHandler[] => {
  const pipeline: RequestHandler[] = [
    authenticateJwt,
    resolveTenant,
    checkModuleLicense(config.moduleKey),
    checkPermission(config.permissionKey)
  ];

  if (config.projectIdParam) {
    pipeline.push(checkProjectScope(config.projectIdParam));
  }

  return pipeline;
};
