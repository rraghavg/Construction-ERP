import { BookingModel, IBooking } from '../models/booking.model.js';

export class CancellationService {
  static async cancelBooking(tenantId: string, bookingId: string, reason: string, refundAmount: number, userId: string): Promise<IBooking> {
    const booking = await BookingModel.findOne({ tenantId, bookingNumber: bookingId });
    if (!booking) {
      throw new Error(`Booking ${bookingId} not found`);
    }

    if (booking.status === 'CANCELLED') {
      throw new Error(`Booking ${bookingId} is already cancelled`);
    }

    booking.status = 'CANCELLED';
    booking.cancellationReason = reason;
    booking.cancelledAt = new Date();
    booking.cancelledBy = userId;
    booking.updatedBy = userId;
    
    return await booking.save();
  }

  static async listCancellations(tenantId: string): Promise<IBooking[]> {
    return await BookingModel.find({ tenantId, status: 'CANCELLED' }).sort({ cancelledAt: -1 });
  }
}
