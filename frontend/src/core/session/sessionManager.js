/**
 * Frontend Session Manager for APEX Construction ERP.
 */

const TOKEN_KEY = 'apex_token';
const TENANT_KEY = 'apex_tenant_id';
const USER_KEY = 'apex_user';

export const sessionManager = {
  setSession: (token, tenantId, user) => {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(TENANT_KEY, tenantId);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  clearSession: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(TENANT_KEY);
    localStorage.removeItem(USER_KEY);
  },

  getToken: () => localStorage.getItem(TOKEN_KEY),
  getTenantId: () => localStorage.getItem(TENANT_KEY),

  getUser: () => {
    const raw = localStorage.getItem(USER_KEY);
    try {
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },

  isAuthenticated: () => {
    const token = localStorage.getItem(TOKEN_KEY);
    return Boolean(token);
  }
};
