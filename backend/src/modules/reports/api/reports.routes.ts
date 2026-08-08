import { Router, Response } from 'express';
import { authenticateJwt, AuthenticatedRequest } from '../../../middleware/auth.middleware.js';
import { resolveTenant } from '../../../middleware/tenant.middleware.js';
import { ReportsService } from '../services/reports.service.js';
import { sendSuccess, sendError } from '../../../utils/apiResponse.js';

const router = Router();

router.use(authenticateJwt);
router.use(resolveTenant);

router.get('/executive-overview', async (req: AuthenticatedRequest, res: Response) => {
  try {
    const overview = await ReportsService.getExecutiveDashboardOverview(req.tenantId!);
    return sendSuccess(res, overview);
  } catch (err: any) {
    return sendError(res, err.errorCode || 'REPORTS_FETCH_FAILED', err.message, err.statusCode || 500);
  }
});

export default router;
