import apiClient from '../api/apiClient';

export const customerService = {
  // Get Customer Directory
  async getCustomers() {
    try {
      const response = await apiClient.get('/customers');
      return response.data;
    } catch (err) {
      console.warn('Customer API unavailable, using fallback dataset:', err);
      return null;
    }
  },

  // Create Customer
  async createCustomer(customerData) {
    const response = await apiClient.post('/customers', customerData);
    return response.data;
  },

  // Convert CRM Lead
  async convertCrmLead(conversionData) {
    const response = await apiClient.post('/customers/convert-crm', conversionData);
    return response.data;
  },

  // Submit KYC Document
  async submitKyc(kycData) {
    const response = await apiClient.post('/customers/kyc', kycData);
    return response.data;
  },

  // Verify KYC Document
  async verifyKyc(verifyData) {
    const response = await apiClient.patch('/customers/kyc/verify', verifyData);
    return response.data;
  }
};
