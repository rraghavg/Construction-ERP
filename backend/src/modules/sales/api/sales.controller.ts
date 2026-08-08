import { Request, Response } from 'express';
import { SalesService } from '../services/sales.service';

export class SalesController {
  static async getBookings(req: Request, res: Response): Promise<void> {
    try {
      const tenantId = (req as any).user?.tenantId || 'TENANT-ABC';
      const list = await SalesService.getBookings(tenantId);
      res.status(200).json({ success: true, count: list.length, data: list });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  static async createBooking(req: Request, res: Response): Promise<void> {
    try {
      const tenantId = (req as any).user?.tenantId || 'TENANT-ABC';
      const companyId = (req as any).user?.companyId || 'CMP-101';
      const booking = await SalesService.createBooking({ ...req.body, tenantId, companyId });
      res.status(201).json({ success: true, data: booking });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
    }
  }

  static async holdUnit(req: Request, res: Response): Promise<void> {
    try {
      const tenantId = (req as any).user?.tenantId || 'TENANT-ABC';
      const heldBy = (req as any).user?.fullName || 'Sales Executive';
      const hold = await SalesService.holdUnit({ ...req.body, tenantId, heldBy });
      res.status(201).json({ success: true, data: hold });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
    }
  }

  static async createQuote(req: Request, res: Response): Promise<void> {
    try {
      const tenantId = (req as any).user?.tenantId || 'TENANT-ABC';
      const quote = await SalesService.createQuote({ ...req.body, tenantId });
      res.status(201).json({ success: true, data: quote });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
    }
  }

  static async createPriceList(req: Request, res: Response): Promise<void> {
    try {
      const tenantId = (req as any).user?.tenantId || 'TENANT-ABC';
      const pl = await SalesService.createPriceList({ ...req.body, tenantId });
      res.status(201).json({ success: true, data: pl });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
    }
  }
}
