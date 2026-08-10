import { InvoiceModel, IInvoice } from '../models/invoice.model';

export class InvoiceService {
  private static invoiceSeq = 100;

  static async createInvoice(tenantId: string, data: any): Promise<IInvoice> {
    const invoiceNumber = `INV-2026-${String(++this.invoiceSeq).padStart(6, '0')}`;
    const invoiceId = `INV-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    const invoice = new InvoiceModel({
      ...data,
      invoiceId,
      tenantId,
      invoiceNumber,
      status: 'DRAFT',
      paidAmount: 0
    });

    return await invoice.save();
  }

  static async listInvoices(tenantId: string, filters: any = {}): Promise<IInvoice[]> {
    return await InvoiceModel.find({ tenantId, ...filters }).sort({ createdAt: -1 });
  }

  static async getById(tenantId: string, invoiceId: string): Promise<IInvoice | null> {
    return await InvoiceModel.findOne({ tenantId, invoiceId });
  }

  static async markAsPaid(tenantId: string, invoiceId: string, amount: number): Promise<IInvoice | null> {
    const invoice = await InvoiceModel.findOne({ tenantId, invoiceId });
    if (!invoice) throw new Error('Invoice not found');

    invoice.paidAmount += amount;
    if (invoice.paidAmount >= invoice.grandTotal) {
      invoice.status = 'PAID';
    } else {
      invoice.status = 'PARTIALLY_PAID';
    }

    return await invoice.save();
  }

  static async cancelInvoice(tenantId: string, invoiceId: string): Promise<IInvoice | null> {
    const invoice = await InvoiceModel.findOne({ tenantId, invoiceId });
    if (!invoice) throw new Error('Invoice not found');

    invoice.status = 'CANCELLED';
    return await invoice.save();
  }
}
