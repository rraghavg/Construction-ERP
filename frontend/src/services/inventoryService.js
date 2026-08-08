import apiClient from '../api/apiClient';

export const inventoryService = {
  // Items
  createItem: (data) => apiClient.post('/inventory/items', data),
  getItems: (params) => apiClient.get('/inventory/items', { params }),

  // Warehouses
  createWarehouse: (data) => apiClient.post('/inventory/warehouses', data),
  getWarehouses: (params) => apiClient.get('/inventory/warehouses', { params }),

  // Operations
  processGoodsReceipt: (data) => apiClient.post('/inventory/goods-receipt', data),
  issueMaterial: (data) => apiClient.post('/inventory/issue-material', data),

  // Analytics
  getAnalytics: () => apiClient.get('/inventory/analytics')
};
