import { Request, Response } from 'express';
import { CustomerService } from '../services/customer.service';

export class CustomerController {
  static async getCustomers(req: Request, res: Response): Promise<void> {
    try {
      const tenantId = (req as any).user?.tenantId || 'TENANT-ABC';
      const list = await CustomerService.getCustomerDirectory(tenantId);
      res.status(200).json({ success: true, count: list.length, data: list });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  static async createCustomer(req: Request, res: Response): Promise<void> {
    try {
      const tenantId = (req as any).user?.tenantId || 'TENANT-ABC';
      const party = await CustomerService.findOrCreateParty({ ...req.body, tenantId });
      const profile = await CustomerService.createCustomerProfile({ tenantId, partyId: party._id.toString() });
      res.status(201).json({ success: true, data: { party, profile } });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
    }
  }

  static async convertCrmLead(req: Request, res: Response): Promise<void> {
    try {
      const tenantId = (req as any).user?.tenantId || 'TENANT-ABC';
      const result = await CustomerService.convertCrmOpportunityToCustomer({ ...req.body, tenantId });
      res.status(200).json({ success: true, data: result });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
    }
  }

  static async submitKyc(req: Request, res: Response): Promise<void> {
    try {
      const tenantId = (req as any).user?.tenantId || 'TENANT-ABC';
      const doc = await CustomerService.submitKyc({ ...req.body, tenantId });
      res.status(200).json({ success: true, data: doc });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
    }
  }

  static async verifyKyc(req: Request, res: Response): Promise<void> {
    try {
      const tenantId = (req as any).user?.tenantId || 'TENANT-ABC';
      const { partyId, documentType, status, rejectionReason } = req.body;
      const verifiedBy = (req as any).user?.fullName || 'Admin';
      const doc = await CustomerService.verifyKyc(tenantId, partyId, documentType, status, verifiedBy, rejectionReason);
      res.status(200).json({ success: true, data: doc });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
    }
  }
}
