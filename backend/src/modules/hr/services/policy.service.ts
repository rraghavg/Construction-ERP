import { PolicyModel, IPolicy } from '../models/policy.model.js';
import { ApiError } from '../../../utils/apiError.js';

export class PolicyService {
  static async createPolicy(tenantId: string, data: Partial<IPolicy> & { title: string; category: string; content: string; version: string; effectiveDate: Date; createdBy: string }): Promise<IPolicy> {
    const policyId = `POL-${Date.now().toString().slice(-6)}`;
    const policy = new PolicyModel({
      ...data,
      policyId,
      tenantId
    });
    return await policy.save();
  }

  static async listPolicies(tenantId: string, status?: string): Promise<IPolicy[]> {
    const query: any = { tenantId };
    if (status) query.status = status;
    return await PolicyModel.find(query).sort({ effectiveDate: -1 });
  }

  static async publishPolicy(tenantId: string, policyId: string): Promise<IPolicy> {
    const policy = await PolicyModel.findOne({ tenantId, policyId });
    if (!policy) {
      throw new ApiError(404, 'POLICY_NOT_FOUND', 'Policy not found');
    }
    policy.status = 'ACTIVE';
    return await policy.save();
  }

  static async archivePolicy(tenantId: string, policyId: string): Promise<IPolicy> {
    const policy = await PolicyModel.findOne({ tenantId, policyId });
    if (!policy) {
      throw new ApiError(404, 'POLICY_NOT_FOUND', 'Policy not found');
    }
    policy.status = 'ARCHIVED';
    return await policy.save();
  }
}
