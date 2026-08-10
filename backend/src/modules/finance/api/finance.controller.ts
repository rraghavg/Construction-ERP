import { Request, Response } from 'express';
import { FinanceService } from '../services/finance.service';
import { InvoiceService } from '../services/invoice.service';
import { ExpenseService } from '../services/expense.service';
import { BudgetService } from '../services/budget.service';
import { TaxService } from '../services/tax.service';
import { FixedAssetService } from '../services/fixedAsset.service';

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

  // --- Invoice Endpoints ---
  static async createInvoice(req: Request, res: Response): Promise<void> {
    try {
      const tenantId = (req as any).user?.tenantId || 'TENANT-ABC';
      const invoice = await InvoiceService.createInvoice(tenantId, req.body);
      res.status(201).json({ success: true, data: invoice });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
    }
  }

  // --- Expense Endpoints ---
  static async recordExpense(req: Request, res: Response): Promise<void> {
    try {
      const tenantId = (req as any).user?.tenantId || 'TENANT-ABC';
      const expense = await ExpenseService.recordExpense(tenantId, req.body);
      res.status(201).json({ success: true, data: expense });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
    }
  }

  // --- Budget Endpoints ---
  static async createBudget(req: Request, res: Response): Promise<void> {
    try {
      const tenantId = (req as any).user?.tenantId || 'TENANT-ABC';
      const budget = await BudgetService.createBudget(tenantId, req.body);
      res.status(201).json({ success: true, data: budget });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
    }
  }

  // --- Tax Endpoints ---
  static async computeTax(req: Request, res: Response): Promise<void> {
    try {
      const tenantId = (req as any).user?.tenantId || 'TENANT-ABC';
      const taxEntry = await TaxService.computeTax(tenantId, req.body);
      res.status(201).json({ success: true, data: taxEntry });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
    }
  }

  // --- FixedAsset Endpoints ---
  static async registerAsset(req: Request, res: Response): Promise<void> {
    try {
      const tenantId = (req as any).user?.tenantId || 'TENANT-ABC';
      const asset = await FixedAssetService.registerAsset(tenantId, req.body);
      res.status(201).json({ success: true, data: asset });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
    }
  }
}
