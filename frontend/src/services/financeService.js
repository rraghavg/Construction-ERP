import apiClient from '../api/apiClient';

export const financeService = {
  // Seed Chart of Accounts
  async seedCoa() {
    const response = await apiClient.post('/finance/coa/seed');
    return response.data;
  },

  // Raise Demand
  async raiseDemand(demandData) {
    const response = await apiClient.post('/finance/demands', demandData);
    return response.data;
  },

  // Record Payment Collection
  async recordCollection(collectionData) {
    const response = await apiClient.post('/finance/collections', collectionData);
    return response.data;
  },

  // Post Double-Entry Journal Entry
  async postJournal(journalData) {
    const response = await apiClient.post('/finance/journals', journalData);
    return response.data;
  },

  // Fetch Subledger Analytics
  async getAnalytics() {
    try {
      const response = await apiClient.get('/finance/analytics');
      return response.data;
    } catch (err) {
      console.warn('Finance Analytics API unavailable, using fallback dataset:', err);
      return null;
    }
  }
};
