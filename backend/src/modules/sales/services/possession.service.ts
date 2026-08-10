import { BookingModel, IBooking } from '../models/booking.model.js';

export class PossessionService {
  static async initiatePossession(tenantId: string, bookingId: string, possessionDate: Date, userId: string): Promise<IBooking> {
    const booking = await BookingModel.findOne({ tenantId, bookingNumber: bookingId });
    if (!booking) {
      throw new Error(`Booking ${bookingId} not found`);
    }

    (booking as any).possessionInitiatedDate = possessionDate;
    (booking as any).possessionInitiatedBy = userId;
    booking.updatedBy = userId;
    return await booking.save();
  }

  static async completePossession(tenantId: string, bookingId: string, userId: string): Promise<IBooking> {
    const booking = await BookingModel.findOne({ tenantId, bookingNumber: bookingId });
    if (!booking) {
      throw new Error(`Booking ${bookingId} not found`);
    }

    booking.status = 'COMPLETED';
    booking.updatedBy = userId;
    
    return await booking.save();
  }
}
