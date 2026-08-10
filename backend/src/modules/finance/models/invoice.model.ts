import mongoose, { Schema, Document } from 'mongoose';

export interface IInvoiceItem {
  description: string;
  quantity: number;
  rate: number;
  amount: number;
  taxRate: number;
  taxAmount: number;
}

export interface IInvoice extends Document {
  invoiceId: string;
  tenantId: string;
  invoiceNumber: string;
  customerId: string;
  bookingId?: string;
  items: IInvoiceItem[];
  subtotal: number;
  totalTax: number;
  grandTotal: number;
  status: 'DRAFT' | 'SENT' | 'PAID' | 'PARTIALLY_PAID' | 'CANCELLED';
  dueDate: Date;
  paidAmount: number;
}

const InvoiceItemSchema = new Schema({
  description: { type: String, required: true },
  quantity: { type: Number, required: true },
  rate: { type: Number, required: true },
  amount: { type: Number, required: true },
  taxRate: { type: Number, required: true },
  taxAmount: { type: Number, required: true }
}, { _id: false });

const InvoiceSchema: Schema = new Schema({
  invoiceId: { type: String, required: true, unique: true, index: true },
  tenantId: { type: String, required: true, index: true },
  invoiceNumber: { type: String, required: true },
  customerId: { type: String, required: true },
  bookingId: { type: String },
  items: { type: [InvoiceItemSchema], default: [] },
  subtotal: { type: Number, required: true },
  totalTax: { type: Number, required: true },
  grandTotal: { type: Number, required: true },
  status: {
    type: String,
    enum: ['DRAFT', 'SENT', 'PAID', 'PARTIALLY_PAID', 'CANCELLED'],
    default: 'DRAFT'
  },
  dueDate: { type: Date, required: true },
  paidAmount: { type: Number, default: 0 }
}, { timestamps: true });

export const InvoiceModel = mongoose.model<IInvoice>('Invoice', InvoiceSchema);
