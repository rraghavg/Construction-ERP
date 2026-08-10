import { TicketModel } from '../models/ticket.model';

export class TicketService {
  static async createTicket(tenantId: string, customerId: string, ticketData: any) {
    const ticketId = `TKT-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const ticket = new TicketModel({
      ...ticketData,
      ticketId,
      tenantId,
      customerId,
      status: 'OPEN'
    });
    return ticket.save();
  }

  static async listTickets(tenantId: string, filters: any = {}) {
    return TicketModel.find({ tenantId, ...filters }).sort({ createdAt: -1 });
  }

  static async getById(tenantId: string, ticketId: string) {
    const ticket = await TicketModel.findOne({ tenantId, ticketId });
    if (!ticket) throw new Error('Ticket not found');
    return ticket;
  }

  static async updateStatus(tenantId: string, ticketId: string, status: string, assignedTo?: string) {
    const ticket = await TicketModel.findOne({ tenantId, ticketId });
    if (!ticket) throw new Error('Ticket not found');
    ticket.status = status as any;
    if (assignedTo) ticket.assignedTo = assignedTo;
    return ticket.save();
  }

  static async resolveTicket(tenantId: string, ticketId: string, resolution: string) {
    const ticket = await TicketModel.findOne({ tenantId, ticketId });
    if (!ticket) throw new Error('Ticket not found');
    ticket.status = 'RESOLVED';
    ticket.resolution = resolution;
    ticket.resolvedAt = new Date();
    return ticket.save();
  }
}
