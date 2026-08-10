import mongoose, { Schema, Document } from 'mongoose';

export interface ITicket extends Document {
  ticketId: string;
  tenantId: string;
  customerId: string;
  subject: string;
  description: string;
  category: 'COMPLAINT' | 'QUERY' | 'REQUEST' | 'FEEDBACK';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
  assignedTo?: string;
  resolution?: string;
  resolvedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const TicketSchema: Schema = new Schema(
  {
    ticketId: { type: String, required: true, unique: true, index: true },
    tenantId: { type: String, required: true, index: true },
    customerId: { type: String, required: true, index: true },
    subject: { type: String, required: true },
    description: { type: String, required: true },
    category: {
      type: String,
      enum: ['COMPLAINT', 'QUERY', 'REQUEST', 'FEEDBACK'],
      required: true,
      index: true
    },
    priority: {
      type: String,
      enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'],
      default: 'MEDIUM'
    },
    status: {
      type: String,
      enum: ['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'],
      default: 'OPEN',
      index: true
    },
    assignedTo: String,
    resolution: String,
    resolvedAt: Date
  },
  { timestamps: true }
);

export const TicketModel = mongoose.model<ITicket>('Ticket', TicketSchema);
