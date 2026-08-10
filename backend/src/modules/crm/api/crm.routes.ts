import { Router } from 'express';
import { CrmController } from './crm.controller';

const router = Router();

router.post('/leads', CrmController.createLead);
router.get('/leads', CrmController.getLeads);

router.post('/opportunities', CrmController.createOpportunity);
router.patch('/opportunities/:id/stage', CrmController.updateStage);
router.patch('/opportunities/:id/assign', CrmController.assignOpportunity);

router.post('/interactions', CrmController.createInteraction);
router.post('/site-visits', CrmController.createSiteVisit);

router.get('/analytics', CrmController.getAnalytics);

router.post('/targets', CrmController.setTarget);
router.get('/targets', CrmController.listTargets);
router.get('/targets/leaderboard', CrmController.getLeaderboard);

router.patch('/leads/:id/convert', CrmController.convertLead);

export default router;
