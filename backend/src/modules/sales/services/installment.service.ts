import { InstallmentModel, IInstallment } from '../models/installment.model.js';
import { BookingModel } from '../models/booking.model.js';

export class InstallmentService {
  private static seq = 100;

  static async generateInstallments(tenantId: string, bookingId: string, paymentPlan: any[]): Promise<IInstallment[]> {
    const booking = await BookingModel.findOne({ tenantId, bookingNumber: bookingId });
    if (!booking) {
      throw new Error(`Booking ${bookingId} not found`);
    }

    const installments = [];
    for (const plan of paymentPlan) {
      const installmentId = `INST-2026-${String(++this.seq).padStart(6, '0')}`;
      const dueDate = plan.dueDate || new Date(Date.now() + 30 * 86400 * 1000);
      
      const installment = new InstallmentModel({
        installmentId,
        tenantId,
        bookingId,
        installmentNumber: plan.installmentNumber,
        dueDate,
        amount: plan.amount,
        status: 'PENDING'
      });
      
      installments.push(await installment.save());
    }

    return installments;
  }

  static async listByBooking(tenantId: string, bookingId: string): Promise<IInstallment[]> {
    return await InstallmentModel.find({ tenantId, bookingId }).sort({ installmentNumber: 1 });
  }

  static async listOverdue(tenantId: string): Promise<IInstallment[]> {
    return await InstallmentModel.find({ 
      tenantId, 
      status: { $in: ['PENDING', 'PARTIALLY_PAID'] },
      dueDate: { $lt: new Date() }
    });
  }

  static async recordPayment(tenantId: string, installmentId: string, amount: number, paymentMode: string, userId: string): Promise<IInstallment> {
    const installment = await InstallmentModel.findOne({ tenantId, installmentId });
    if (!installment) {
      throw new Error(`Installment ${installmentId} not found`);
    }

    installment.paidAmount += amount;
    installment.paymentMode = paymentMode;
    installment.paidDate = new Date();
    
    if (installment.paidAmount >= installment.amount) {
      installment.status = 'PAID';
    } else {
      installment.status = 'PARTIALLY_PAID';
    }

    return await installment.save();
  }

  static async sendDemandLetter(tenantId: string, installmentId: string, userId: string): Promise<IInstallment> {
    const installment = await InstallmentModel.findOne({ tenantId, installmentId });
    if (!installment) {
      throw new Error(`Installment ${installmentId} not found`);
    }

    installment.demandLetterSent = true;
    installment.demandLetterDate = new Date();

    return await installment.save();
  }
}
