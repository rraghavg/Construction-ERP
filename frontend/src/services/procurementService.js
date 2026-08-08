import apiClient from '../api/apiClient';

export const procurementService = {
  // Vendors
  createVendor: (data) => apiClient.post('/procurement/vendors', data),
  getVendors: (params) => apiClient.get('/procurement/vendors', { params }),
  updateVendorStatus: (vendorId, status) => apiClient.patch(`/procurement/vendors/${vendorId}/status`, { status }),

  // Requisitions
  createRequisition: (data) => apiClient.post('/procurement/requisitions', data),
  getRequisitions: (params) => apiClient.get('/procurement/requisitions', { params }),
  approveRequisition: (requisitionId) => apiClient.patch(`/procurement/requisitions/${requisitionId}/approve`),

  // RFQ & Quotations
  createRFQ: (data) => apiClient.post('/procurement/rfqs', data),
  getRFQs: (params) => apiClient.get('/procurement/rfqs', { params }),
  submitQuotation: (data) => apiClient.post('/procurement/quotations', data),
  compareQuotations: (rfqId) => apiClient.get(`/procurement/rfqs/${rfqId}/compare`),

  // Purchase Orders
  createPurchaseOrder: (data) => apiClient.post('/procurement/purchase-orders', data),
  getPurchaseOrders: (params) => apiClient.get('/procurement/purchase-orders', { params }),

  // Analytics
  getAnalytics: () => apiClient.get('/procurement/analytics')
};
