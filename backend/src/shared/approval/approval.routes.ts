import { Router, Response } from 'express';
import { authenticateJwt, AuthenticatedRequest } from '../../middleware/auth.middleware.js';
import { resolveTenant } from '../../middleware/tenant.middleware.js';
import { ApprovalService } from './approval.service.js';
import { sendSuccess, sendError } from '../../utils/apiResponse.js';

const router = Router();

router.use(authenticateJwt);
router.use(resolveTenant);

// Workflow Definitions
router.post('/workflows', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const wf = await ApprovalService.createWorkflow({
      ...req.body,
      tenantId: req.tenantId!
    });
    return sendSuccess(res, wf, { message: 'Approval workflow created' }, 201);
  } catch (err: any) {
    return sendError(res, err.errorCode || 'WF_CREATE_FAILED', err.message, err.statusCode || 500);
  }
});

router.get('/workflows', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const moduleName = req.query.module as string;
    const wfs = await ApprovalService.listWorkflows(req.tenantId!, moduleName);
    return sendSuccess(res, wfs);
  } catch (err: any) {
    return sendError(res, err.errorCode || 'WF_FETCH_FAILED', err.message, err.statusCode || 500);
  }
});

// Universal Approval Inbox
router.get('/inbox', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const inbox = await ApprovalService.getPendingApprovalsForUser(req.tenantId!);
    return sendSuccess(res, inbox);
  } catch (err: any) {
    return sendError(res, err.errorCode || 'INBOX_FETCH_FAILED', err.message, err.statusCode || 500);
  }
});

// Process Decision
router.post('/instances/:instanceId/decision', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { instanceId } = req.params;
    const { action, comments } = req.body;
    const instance = await ApprovalService.processApprovalDecision(req.tenantId!, instanceId, req.user?.fullName || 'Approver', action, comments);
    return sendSuccess(res, instance, { message: `Approval decision ${action} recorded` });
  } catch (err: any) {
    return sendError(res, err.errorCode || 'DECISION_FAILED', err.message, err.statusCode || 500);
  }
});

export default router;
