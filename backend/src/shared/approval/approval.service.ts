import { ApprovalWorkflowModel, ApprovalInstanceModel, IApprovalWorkflow, IApprovalInstance } from './approval.model.js';
import { ApiError } from '../../utils/apiError.js';
import { logAuditEvent } from '../audit/audit.model.js';

export class ApprovalService {
  private static wfSeq = 100;
  private static instSeq = 100;

  // 1. Definition
  static async createWorkflow(data: Partial<IApprovalWorkflow> & { tenantId: string; module: string; entityType: string; name: string; steps: any[] }): Promise<IApprovalWorkflow> {
    const workflowId = `WF-${Date.now().toString().slice(-6)}`;
    const wf = new ApprovalWorkflowModel({
      ...data,
      workflowId
    });
    return await wf.save();
  }

  static async listWorkflows(tenantId: string, module?: string): Promise<IApprovalWorkflow[]> {
    const query: any = { tenantId, isActive: true };
    if (module) query.module = module;
    return await ApprovalWorkflowModel.find(query).sort({ name: 1 });
  }

  // 2. Trigger Workflow
  static async triggerApprovalInstance(data: { tenantId: string; module: string; entityType: string; entityId: string; requestedBy: string; amount?: number }): Promise<IApprovalInstance> {
    const wf = await ApprovalWorkflowModel.findOne({ tenantId: data.tenantId, module: data.module, entityType: data.entityType, isActive: true });
    
    const instanceId = `INST-${Date.now().toString().slice(-6)}`;
    const workflowId = wf ? wf.workflowId : 'DEFAULT_AUTO';

    const instance = new ApprovalInstanceModel({
      instanceId,
      tenantId: data.tenantId,
      workflowId,
      entityType: data.entityType,
      entityId: data.entityId,
      requestedBy: data.requestedBy,
      currentStep: 1,
      status: 'PENDING'
    });

    const saved = await instance.save();
    await logAuditEvent({
      tenantId: data.tenantId,
      actorUserId: data.requestedBy,
      module: 'workflow',
      action: 'APPROVAL_TRIGGERED',
      recordType: 'ApprovalInstance',
      recordId: instanceId,
      status: 'success',
      severity: 'medium'
    });

    return saved;
  }

  // 3. Process Decision
  static async processApprovalDecision(tenantId: string, instanceId: string, approverUserId: string, action: 'APPROVED' | 'REJECTED', comments?: string): Promise<IApprovalInstance> {
    const instance = await ApprovalInstanceModel.findOne({ tenantId, instanceId });
    if (!instance) {
      throw new ApiError(404, 'APPROVAL_INST_NOT_FOUND', 'Approval instance not found');
    }
    if (instance.status !== 'PENDING') {
      throw new ApiError(400, 'APPROVAL_ALREADY_CLOSED', `Approval instance is already ${instance.status}`);
    }

    const wf = await ApprovalWorkflowModel.findOne({ tenantId, workflowId: instance.workflowId });
    const totalSteps = wf ? wf.steps.length : 1;

    instance.stepHistory.push({
      stepOrder: instance.currentStep,
      approverUserId,
      action,
      comments,
      actedAt: new Date()
    });

    if (action === 'REJECTED') {
      instance.status = 'REJECTED';
    } else {
      if (instance.currentStep >= totalSteps) {
        instance.status = 'APPROVED';
      } else {
        instance.currentStep += 1;
      }
    }

    const updated = await instance.save();
    await logAuditEvent({
      tenantId,
      actorUserId: approverUserId,
      module: 'workflow',
      action: `APPROVAL_${action}`,
      recordType: 'ApprovalInstance',
      recordId: instanceId,
      status: 'success',
      severity: 'high'
    });

    return updated;
  }

  // 4. Universal Inbox
  static async getPendingApprovalsForUser(tenantId: string): Promise<IApprovalInstance[]> {
    return await ApprovalInstanceModel.find({ tenantId, status: 'PENDING' }).sort({ createdAt: -1 });
  }
}
