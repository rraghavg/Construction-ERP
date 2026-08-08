import apiClient from '../api/apiClient';

export const rentalService = {
  // Leases
  createLeaseAgreement: (data) => apiClient.post('/rental/leases', data),
  getLeases: (params) => apiClient.get('/rental/leases', { params }),
  terminateLease: (leaseId, reason) => apiClient.patch(`/rental/leases/${leaseId}/terminate`, { reason }),

  // Collections
  recordRentCollection: (data) => apiClient.post('/rental/collections', data),

  // Analytics
  getAnalytics: () => apiClient.get('/rental/analytics')
};
