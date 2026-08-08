import apiClient from '../api/apiClient';

export const salesService = {
  // Get Bookings Ledger
  async getBookings() {
    try {
      const response = await apiClient.get('/sales/bookings');
      return response.data;
    } catch (err) {
      console.warn('Sales Bookings API unavailable, using fallback dataset:', err);
      return null;
    }
  },

  // Create Unit Booking
  async createBooking(bookingData) {
    const response = await apiClient.post('/sales/bookings', bookingData);
    return response.data;
  },

  // Hold Unit Reservation
  async holdUnit(holdData) {
    const response = await apiClient.post('/sales/hold', holdData);
    return response.data;
  },

  // Create Cost Sheet Quote
  async createQuote(quoteData) {
    const response = await apiClient.post('/sales/quotes', quoteData);
    return response.data;
  },

  // Create Price List
  async createPriceList(priceListData) {
    const response = await apiClient.post('/sales/price-lists', priceListData);
    return response.data;
  }
};
