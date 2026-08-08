import apiClient from '../api/apiClient';

export const maintenanceService = {
  // Assets
  createAsset: (data) => apiClient.post('/maintenance/assets', data),
  getAssets: (params) => apiClient.get('/maintenance/assets', { params }),

  // Requests
  createRequest: (data) => apiClient.post('/maintenance/requests', data),
  getRequests: (params) => apiClient.get('/maintenance/requests', { params }),

  // Work Orders
  createWorkOrder: (data) => apiClient.post('/maintenance/work-orders', data),
  completeWorkOrder: (workOrderId, data) => apiClient.patch(`/maintenance/work-orders/${workOrderId}/complete`, data),
  getWorkOrders: (params) => apiClient.get('/maintenance/work-orders', { params }),

  // Analytics
  getAnalytics: () => apiClient.get('/maintenance/analytics')
};
