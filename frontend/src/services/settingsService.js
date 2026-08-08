import apiClient from '../api/apiClient';

export const settingsService = {
  getConfig: () => apiClient.get('/settings/config'),
  updateConfig: (data) => apiClient.put('/settings/config', data)
};
