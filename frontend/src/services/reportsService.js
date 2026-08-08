import apiClient from '../api/apiClient';

export const reportsService = {
  getExecutiveOverview: () => apiClient.get('/reports/executive-overview')
};
