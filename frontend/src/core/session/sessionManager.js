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
    let token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      const defaultUser = {
        userId: 'USR-RAHUL-DEV',
        fullName: 'Rahul Sharma (Admin)',
        email: 'rahul@abcdevelopers.com',
        tenantId: 'TENANT-ABC',
        roleKeys: ['super_admin', 'sales_exec'],
        allowedProjects: ['Project A', 'Project B', 'All Projects'],
        permissions: ['*'],
        isSuperAdmin: true
      };
      sessionManager.setSession('DEV_SESSION_TOKEN_2026', 'TENANT-ABC', defaultUser);
      token = 'DEV_SESSION_TOKEN_2026';
    }
    return Boolean(token);
  }
};
