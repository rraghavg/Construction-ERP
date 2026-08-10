import { Request, Response } from 'express';
import { CrmService } from '../services/crm.service';
import { SalesTargetService } from '../services/salesTarget.service';

export class CrmController {
  static async createLead(req: Request, res: Response): Promise<void> {
    try {
      const tenantId = (req as any).user?.tenantId || 'TENANT-ABC';
      const lead = await CrmService.createLead({ ...req.body, tenantId });
      res.status(201).json({ success: true, data: lead });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
    }
  }

  static async getLeads(req: Request, res: Response): Promise<void> {
    try {
      const tenantId = (req as any).user?.tenantId || 'TENANT-ABC';
      const leads = await CrmService.getLeads(tenantId);
      res.status(200).json({ success: true, count: leads.length, data: leads });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  static async createOpportunity(req: Request, res: Response): Promise<void> {
    try {
      const tenantId = (req as any).user?.tenantId || 'TENANT-ABC';
      const opp = await CrmService.createOpportunity({ ...req.body, tenantId });
      res.status(201).json({ success: true, data: opp });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
    }
  }

  static async updateStage(req: Request, res: Response): Promise<void> {
    try {
      const tenantId = (req as any).user?.tenantId || 'TENANT-ABC';
      const { id } = req.params;
      const { stageId, changedBy, reason, lostReasonId, lostNotes } = req.body;
      const opp = await CrmService.updateOpportunityStage(
        tenantId,
        id,
        stageId,
        changedBy || 'Admin',
        reason,
        lostReasonId,
        lostNotes
      );
      if (!opp) {
        res.status(404).json({ success: false, error: 'Opportunity not found' });
        return;
      }
      res.status(200).json({ success: true, data: opp });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
    }
  }

  static async assignOpportunity(req: Request, res: Response): Promise<void> {
    try {
      const tenantId = (req as any).user?.tenantId || 'TENANT-ABC';
      const { id } = req.params;
      const { toUser, assignedBy, reason } = req.body;
      const opp = await CrmService.assignOpportunity(tenantId, id, toUser, assignedBy || 'Admin', reason);
      if (!opp) {
        res.status(404).json({ success: false, error: 'Opportunity not found' });
        return;
      }
      res.status(200).json({ success: true, data: opp });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
    }
  }

  static async createInteraction(req: Request, res: Response): Promise<void> {
    try {
      const tenantId = (req as any).user?.tenantId || 'TENANT-ABC';
      const interaction = await CrmService.createInteraction({ ...req.body, tenantId });
      res.status(201).json({ success: true, data: interaction });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
    }
  }

  static async createSiteVisit(req: Request, res: Response): Promise<void> {
    try {
      const tenantId = (req as any).user?.tenantId || 'TENANT-ABC';
      const visit = await CrmService.createSiteVisit({ ...req.body, tenantId });
      res.status(201).json({ success: true, data: visit });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
    }
  }

  static async getAnalytics(req: Request, res: Response): Promise<void> {
    try {
      const tenantId = (req as any).user?.tenantId || 'TENANT-ABC';
      const projectId = req.query.projectId as string;
      const stats = await CrmService.getAnalytics(tenantId, projectId);
      res.status(200).json({ success: true, data: stats });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  static async convertLead(req: Request, res: Response): Promise<void> {
    try {
      const tenantId = (req as any).user?.tenantId || 'TENANT-ABC';
      const { id } = req.params;
      const lead = await CrmService.convertLead(tenantId, id);
      if (!lead) {
        res.status(404).json({ success: false, error: 'Lead not found' });
        return;
      }
      res.status(200).json({ success: true, data: lead });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
    }
  }

  static async setTarget(req: Request, res: Response): Promise<void> {
    try {
      const tenantId = (req as any).user?.tenantId || 'TENANT-ABC';
      const target = await SalesTargetService.setTarget(tenantId, req.body);
      res.status(201).json({ success: true, data: target });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
    }
  }

  static async listTargets(req: Request, res: Response): Promise<void> {
    try {
      const tenantId = (req as any).user?.tenantId || 'TENANT-ABC';
      const targets = await SalesTargetService.listTargets(tenantId, req.query);
      res.status(200).json({ success: true, data: targets });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  static async getLeaderboard(req: Request, res: Response): Promise<void> {
    try {
      const tenantId = (req as any).user?.tenantId || 'TENANT-ABC';
      const period = req.query.period as string;
      const leaderboard = await SalesTargetService.getLeaderboard(tenantId, period);
      res.status(200).json({ success: true, data: leaderboard });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
}
