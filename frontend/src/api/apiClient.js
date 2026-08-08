/**
 * Centralized API HTTP Client for APEX Construction ERP.
 * Enforces unified request/response envelopes, auth headers, and error handling.
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api/v1';

async function request(endpoint, options = {}) {
  const token = localStorage.getItem('apex_token');
  const tenantId = localStorage.getItem('apex_tenant_id');

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(tenantId ? { 'x-tenant-id': tenantId } : {}),
    ...options.headers,
  };

  const config = {
    ...options,
    headers,
  };

  if (config.body && typeof config.body === 'object') {
    config.body = JSON.stringify(config.body);
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
  const data = await response.json().catch(() => ({}));

  if (!response.ok || data.success === false) {
    const error = new Error(data.error?.message || 'API request failed');
    error.code = data.error?.code || 'UNKNOWN_ERROR';
    error.status = response.status;
    error.details = data.error?.details;
    throw error;
  }

  return data;
}

export const apiClient = {
  get: (endpoint, params = {}, options = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const url = queryString ? `${endpoint}?${queryString}` : endpoint;
    return request(url, { ...options, method: 'GET' });
  },
  post: (endpoint, body, options = {}) => {
    return request(endpoint, { ...options, method: 'POST', body });
  },
  put: (endpoint, body, options = {}) => {
    return request(endpoint, { ...options, method: 'PUT', body });
  },
  patch: (endpoint, body, options = {}) => {
    return request(endpoint, { ...options, method: 'PATCH', body });
  },
  delete: (endpoint, options = {}) => {
    return request(endpoint, { ...options, method: 'DELETE' });
  },
};
