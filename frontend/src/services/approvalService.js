import apiClient from '../api/apiClient';

export const approvalService = {
  createWorkflow: (data) => apiClient.post('/approvals/workflows', data),
  getWorkflows: (params) => apiClient.get('/approvals/workflows', { params }),
  getInbox: () => apiClient.get('/approvals/inbox'),
  submitDecision: (instanceId, action, comments) => apiClient.post(`/approvals/instances/${instanceId}/decision`, { action, comments })
};
