import { Request, Response } from 'express';
import { CustomerService } from '../services/customer.service';
import { NomineeService } from '../services/nominee.service';
import { TicketService } from '../services/ticket.service';
import { NocService } from '../services/noc.service';
import { CommunicationService } from '../services/communication.service';

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

  // Nominee Endpoints
  static async addNominee(req: Request, res: Response): Promise<void> {
    try {
      const tenantId = (req as any).user?.tenantId || 'TENANT-ABC';
      const userId = (req as any).user?.userId || 'Admin';
      const { customerId } = req.params;
      const nominee = await NomineeService.addNominee(tenantId, customerId, req.body, userId);
      res.status(201).json({ success: true, data: nominee });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
    }
  }

  static async listNominees(req: Request, res: Response): Promise<void> {
    try {
      const tenantId = (req as any).user?.tenantId || 'TENANT-ABC';
      const { customerId } = req.params;
      const nominees = await NomineeService.listByCustomer(tenantId, customerId);
      res.status(200).json({ success: true, data: nominees });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
    }
  }

  static async revokeNominee(req: Request, res: Response): Promise<void> {
    try {
      const tenantId = (req as any).user?.tenantId || 'TENANT-ABC';
      const userId = (req as any).user?.userId || 'Admin';
      const { nomineeId } = req.params;
      const nominee = await NomineeService.revokeNominee(tenantId, nomineeId, userId);
      res.status(200).json({ success: true, data: nominee });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
    }
  }

  // Ticket Endpoints
  static async createTicket(req: Request, res: Response): Promise<void> {
    try {
      const tenantId = (req as any).user?.tenantId || 'TENANT-ABC';
      const { customerId } = req.body;
      const ticket = await TicketService.createTicket(tenantId, customerId, req.body);
      res.status(201).json({ success: true, data: ticket });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
    }
  }

  static async listTickets(req: Request, res: Response): Promise<void> {
    try {
      const tenantId = (req as any).user?.tenantId || 'TENANT-ABC';
      const tickets = await TicketService.listTickets(tenantId, req.query);
      res.status(200).json({ success: true, data: tickets });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
    }
  }

  static async resolveTicket(req: Request, res: Response): Promise<void> {
    try {
      const tenantId = (req as any).user?.tenantId || 'TENANT-ABC';
      const { ticketId } = req.params;
      const { resolution } = req.body;
      const ticket = await TicketService.resolveTicket(tenantId, ticketId, resolution);
      res.status(200).json({ success: true, data: ticket });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
    }
  }

  // NOC Endpoints
  static async requestNoc(req: Request, res: Response): Promise<void> {
    try {
      const tenantId = (req as any).user?.tenantId || 'TENANT-ABC';
      const { customerId } = req.body;
      const noc = await NocService.requestNoc(tenantId, customerId, req.body);
      res.status(201).json({ success: true, data: noc });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
    }
  }

  static async issueNoc(req: Request, res: Response): Promise<void> {
    try {
      const tenantId = (req as any).user?.tenantId || 'TENANT-ABC';
      const { nocId } = req.params;
      const issuedBy = (req as any).user?.fullName || 'Admin';
      const { remarks } = req.body;
      const noc = await NocService.issueNoc(tenantId, nocId, issuedBy, remarks);
      res.status(200).json({ success: true, data: noc });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
    }
  }

  static async listNocs(req: Request, res: Response): Promise<void> {
    try {
      const tenantId = (req as any).user?.tenantId || 'TENANT-ABC';
      const { customerId } = req.params;
      const nocs = await NocService.listByCustomer(tenantId, customerId);
      res.status(200).json({ success: true, data: nocs });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
    }
  }

  // Communication Endpoints
  static async logCommunication(req: Request, res: Response): Promise<void> {
    try {
      const tenantId = (req as any).user?.tenantId || 'TENANT-ABC';
      const userId = (req as any).user?.userId || 'Admin';
      const { customerId, type, message } = req.body;
      const log = await CommunicationService.logCommunication(tenantId, customerId, type, message, userId);
      res.status(201).json({ success: true, data: log });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
    }
  }

  static async getCommunicationHistory(req: Request, res: Response): Promise<void> {
    try {
      const tenantId = (req as any).user?.tenantId || 'TENANT-ABC';
      const { customerId } = req.params;
      const history = await CommunicationService.getHistory(tenantId, customerId);
      res.status(200).json({ success: true, data: history });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message });
    }
  }
}
