import { PriceListModel, IPriceList } from '../models/priceList.model';
import { UnitHoldModel, IUnitHold } from '../models/unitHold.model';
import { QuoteModel, IQuote } from '../models/quote.model';
import { BookingModel, IBooking } from '../models/booking.model';

export class SalesService {
  private static priceSeq = 100;
  private static holdSeq = 100;
  private static quoteSeq = 100;
  private static bkgSeq = 100;

  // 1. Create Price List Version (S6-P6.3)
  static async createPriceList(data: Partial<IPriceList> & { tenantId: string; projectId: string; baseRatePerSqFt: number }): Promise<IPriceList> {
    const priceListNumber: string = `PRC-2026-${String(++this.priceSeq).padStart(6, '0')}`;
    const priceList = new PriceListModel({
      ...data,
      priceListNumber,
      version: 1
    });
    return await priceList.save();
  }

  // 2. Unit Pricing Engine Calculation (S6-P6.4)
  static calculateUnitPrice(params: {
    superBuiltUpArea: number;
    baseRatePerSqFt: number;
    floorNumber?: number;
    floorRisePerFloor?: number;
    plcCharge?: number;
    parkingCharge?: number;
    otherCharges?: number;
    discountAmount?: number;
  }) {
    const area = params.superBuiltUpArea || 0;
    const baseRate = params.baseRatePerSqFt || 0;
    const baseValue = area * baseRate;

    const floorNum = Math.max(0, (params.floorNumber || 1) - 1);
    const floorRiseRate = params.floorRisePerFloor || 0;
    // Floor rise calculated per sqft for floor height above ground
    const floorRise = floorNum * floorRiseRate * (area > 0 ? area : 1);

    const plc = params.plcCharge || 0;
    const parking = params.parkingCharge || 0;
    const other = params.otherCharges || 0;
    const discount = params.discountAmount || 0;

    const subtotal = Math.max(0, baseValue + floorRise + plc + parking + other - discount);
    const taxAmount = Math.round(subtotal * 0.05); // 5% GST standard reference
    const totalConsideration = subtotal + taxAmount;

    return {
      superBuiltUpArea: area,
      baseRate,
      baseValue,
      plcCharge: plc,
      floorRiseCharge: floorRise,
      parkingCharge: parking,
      otherCharges: other,
      discountAmount: discount,
      taxableSubtotal: subtotal,
      taxAmount,
      totalConsideration
    };
  }

  // 3. Atomic Unit Hold / Lock (S6-P6.6)
  static async holdUnit(data: {
    tenantId: string;
    projectId: string;
    unitId: string;
    heldBy: string;
    durationHours?: number;
    reason?: string;
  }): Promise<IUnitHold> {
    // Concurrency Check: Ensure unit is not currently active held
    const existingHold = await UnitHoldModel.findOne({
      tenantId: data.tenantId,
      unitId: data.unitId,
      status: 'ACTIVE',
      holdExpiresAt: { $gt: new Date() }
    });

    if (existingHold) {
      throw new Error(`Unit ${data.unitId} is currently held by ${existingHold.heldBy}`);
    }

    const durationHours = data.durationHours || 48;
    const holdExpiresAt = new Date(Date.now() + durationHours * 3600 * 1000);
    const holdNumber = `HLD-2026-${String(++this.holdSeq).padStart(6, '0')}`;

    const hold = new UnitHoldModel({
      ...data,
      holdNumber,
      holdExpiresAt,
      status: 'ACTIVE'
    });

    return await hold.save();
  }

  // 4. Generate Quote Cost Sheet (S6-P6.5)
  static async createQuote(data: {
    tenantId: string;
    projectId: string;
    unitId: string;
    customerId: string;
    opportunityId?: string;
    superBuiltUpArea: number;
    baseRatePerSqFt: number;
    floorNumber?: number;
    discountAmount?: number;
    validDays?: number;
    createdBy?: string;
  }): Promise<IQuote> {
    const calc = this.calculateUnitPrice({
      superBuiltUpArea: data.superBuiltUpArea,
      baseRatePerSqFt: data.baseRatePerSqFt,
      floorNumber: data.floorNumber,
      discountAmount: data.discountAmount
    });

    const quoteNumber = `QTE-2026-${String(++this.quoteSeq).padStart(6, '0')}`;
    const validDays = data.validDays || 15;
    const validUntil = new Date(Date.now() + validDays * 86400 * 1000);

    const quote = new QuoteModel({
      quoteNumber,
      tenantId: data.tenantId,
      projectId: data.projectId,
      unitId: data.unitId,
      customerId: data.customerId,
      opportunityId: data.opportunityId,
      priceListVersion: 1,
      pricingSnapshot: calc,
      validUntil,
      status: 'ISSUED',
      createdBy: data.createdBy || 'SYSTEM'
    });

    return await quote.save();
  }

  // 5. Create Booking & Generate Payment Schedule (S6-P6.7, S6-P6.10)
  static async createBooking(data: {
    tenantId: string;
    companyId: string;
    projectId: string;
    unitId: string;
    primaryCustomerId: string;
    coApplicantCustomerIds?: string[];
    opportunityId?: string;
    quoteId?: string;
    superBuiltUpArea: number;
    baseRatePerSqFt: number;
    discountAmount?: number;
    createdBy?: string;
  }): Promise<IBooking> {
    const calc = this.calculateUnitPrice({
      superBuiltUpArea: data.superBuiltUpArea,
      baseRatePerSqFt: data.baseRatePerSqFt,
      discountAmount: data.discountAmount
    });

    const total = calc.totalConsideration;

    // Standard 4-Stage Construction Milestone Schedule
    const paymentPlanSchedule = [
      { installmentNumber: 1, milestoneName: 'Booking Amount (10%)', percentage: 10, amount: Math.round(total * 0.1), status: 'DUE' },
      { installmentNumber: 2, milestoneName: 'Excavation & Foundation (30%)', percentage: 30, amount: Math.round(total * 0.3), status: 'PENDING' },
      { installmentNumber: 3, milestoneName: 'Superstructure Slab Cast (30%)', percentage: 30, amount: Math.round(total * 0.3), status: 'PENDING' },
      { installmentNumber: 4, milestoneName: 'Finishing & Handover (30%)', percentage: 30, amount: Math.round(total * 0.3), status: 'PENDING' }
    ] as any[];

    const bookingNumber = `BKG-2026-${String(++this.bkgSeq).padStart(6, '0')}`;

    const booking = new BookingModel({
      ...data,
      bookingNumber,
      bookingDate: new Date(),
      pricingSnapshot: calc,
      paymentPlanSchedule,
      status: 'CONFIRMED'
    });

    return await booking.save();
  }

  // 6. Get Bookings Ledger
  static async getBookings(tenantId: string, filter: Record<string, any> = {}): Promise<IBooking[]> {
    return await BookingModel.find({ tenantId, ...filter }).sort({ createdAt: -1 });
  }
}
