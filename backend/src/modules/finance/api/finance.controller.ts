import { Request, Response } from 'express';
import { FinanceService } from '../services/finance.service';

export class FinanceController {
  static async seedCoa(req: Request, res: Response): Promise<void> {
    try {
      const tenantId = (req as any).user?.tenantId || 'TENANT-ABC';
      const count = await FinanceService.seedChartOfAccounts(tenantId);
      res.status(200).json({ success: true, message: `Seeded ${count} accounts` });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  static async raiseDemand(req: Request, res: Response): Promise<void> {
    try {
      const tenantId = (req as any).user?.tenantId || 'TENANT-ABC';
      const demand = await FinanceService.raiseDemand({ ...req.body, tenantId });
      res.status(201).json({ success: true, data: demand });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
    }
  }

  static async recordCollection(req: Request, res: Response): Promise<void> {
    try {
      const tenantId = (req as any).user?.tenantId || 'TENANT-ABC';
      const receivedBy = (req as any).user?.fullName || 'Finance Executive';
      const result = await FinanceService.recordCollection({ ...req.body, tenantId, receivedBy });
      res.status(201).json({ success: true, data: result });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
    }
  }

  static async postJournal(req: Request, res: Response): Promise<void> {
    try {
      const tenantId = (req as any).user?.tenantId || 'TENANT-ABC';
      const createdBy = (req as any).user?.fullName || 'Finance Accountant';
      const journal = await FinanceService.postJournalEntry({ ...req.body, tenantId, createdBy });
      res.status(201).json({ success: true, data: journal });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
    }
  }

  static async getAnalytics(req: Request, res: Response): Promise<void> {
    try {
      const tenantId = (req as any).user?.tenantId || 'TENANT-ABC';
      const stats = await FinanceService.getAnalytics(tenantId);
      res.status(200).json({ success: true, data: stats });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
}
