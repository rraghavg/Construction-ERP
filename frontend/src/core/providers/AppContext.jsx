import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import {
  INITIAL_KPIS,
  INITIAL_TASKS_DATA,
  INITIAL_COMPLAINTS_DATA,
  ROLE_PERMISSIONS,
  MODULES_LIST,
  SETTINGS_MODULE,
  CRM_KPIS,
  INITIAL_LEADS_LIST,
  SALES_KPIS,
  FULL_SALES_BOOKINGS_LIST,
  UPCOMING_INSTALLMENTS_LIST,
  RECENT_RECEIPTS_LIST,
  OVERDUE_INSTALLMENTS_LIST,
  MASTER_DATA_CATEGORIES,
  INITIAL_MASTER_DATA_RECORDS,
  FINANCE_KPIS,
  CUSTOMER_KPIS,
  FULL_CUSTOMERS_LIST,
  UPCOMING_KYC_EXPIRY_LIST,
  RENTAL_KPIS,
  FULL_RENT_COLLECTIONS_LIST,
  UPCOMING_LEASE_RENEWALS_LIST,
  VACANT_UNITS_LIST,
  MAINTENANCE_KPIS,
  FULL_MAINTENANCE_COMPLAINTS_LIST,
  INVENTORY_KPIS,
  FULL_INVENTORY_TRANSACTIONS_LIST,
  LOW_STOCK_ALERTS_LIST,
  FINANCE_PRD_KPIS,
  FULL_FINANCE_TRANSACTIONS_LIST,
  REGISTERED_BANK_ACCOUNTS_LIST,
  HR_KPIS,
  FULL_EMPLOYEES_LIST,
  REPORTS_KPIS,
  RECENT_GENERATED_REPORTS_LIST,
  NOTIFICATIONS_KPIS,
  FULL_NOTIFICATIONS_LIST,
  NOTIFICATION_PREFERENCES_DATA,
  USER_MGMT_KPIS,
  FULL_USERS_LIST,
  ACTIVE_SESSIONS_LIST,
  SETTINGS_KPIS,
  SETTINGS_CATEGORIES_DATA,
  SETTINGS_CHANGE_HISTORY_LIST,
  SYSTEM_HEALTH_DIAGNOSTICS_DATA,
  SYSTEM_INFO_DATA,
  AUDIT_KPIS,
  FULL_AUDIT_LOGS_LIST
} from '../../data/mockData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [activeModule, setActiveModule] = useState('dashboard');
  const [activeSubmodule, setActiveSubmodule] = useState('Main Overview');
  const [activeFilter, setActiveFilter] = useState({ project: 'All Projects', branch: 'All Branches' });
  const [timeRange, setTimeRange] = useState('FY');
  const [userRole, setUserRole] = useState('Admin');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshCountdown, setRefreshCountdown] = useState(60);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState('dark');
  
  // Dynamic Core State
  const [tasks, setTasks] = useState(INITIAL_TASKS_DATA);
  const [complaints, setComplaints] = useState(INITIAL_COMPLAINTS_DATA);
  const [kpis, setKpis] = useState(INITIAL_KPIS);
  const [toast, setToast] = useState(null);
  const [auditLogs, setAuditLogs] = useState([
    { id: 1, action: 'User Logged In', user: 'John Doe', role: 'Admin', time: '10 mins ago' },
    { id: 2, action: 'Viewed Audit & Compliance Hub', user: 'John Doe', role: 'Admin', time: '2 mins ago' }
  ]);

  // CRM State
  const [leads, setLeads] = useState(INITIAL_LEADS_LIST);
  const [selectedLead, setSelectedLead] = useState(INITIAL_LEADS_LIST[0]);
  const [crmKpis, setCrmKpis] = useState(CRM_KPIS);
  const [leadStatusFilter, setLeadStatusFilter] = useState('all');

  // Sales State
  const [salesKpis, setSalesKpis] = useState(SALES_KPIS);
  const [salesBookings, setSalesBookings] = useState(FULL_SALES_BOOKINGS_LIST);
  const [selectedBooking, setSelectedBooking] = useState(FULL_SALES_BOOKINGS_LIST[0]);
  const [salesStatusFilter, setSalesStatusFilter] = useState('all');
  const [upcomingInstallments, setUpcomingInstallments] = useState(UPCOMING_INSTALLMENTS_LIST);
  const [recentReceipts, setRecentReceipts] = useState(RECENT_RECEIPTS_LIST);
  const [overdueInstallments, setOverdueInstallments] = useState(OVERDUE_INSTALLMENTS_LIST);

  const [masterRecords, setMasterRecords] = useState(INITIAL_MASTER_DATA_RECORDS);
  const [activeMasterCategory, setActiveMasterCategory] = useState(null);

  // Dynamic Master Categories with live record counts
  const masterCategories = useMemo(() => {
    return MASTER_DATA_CATEGORIES.map((cat) => {
      const records = masterRecords[cat.id] || [];
      const total = records.length;
      const active = records.filter((r) => ['Active', 'active', 'Available', 'AVAILABLE'].includes(r.status)).length;
      const inactive = total - active;
      return {
        ...cat,
        count: total,
        activeCount: active,
        inactiveCount: inactive
      };
    });
  }, [masterRecords]);

  // Finance State
  const [financeKpis, setFinanceKpis] = useState(FINANCE_KPIS);
  const [financePrdKpis, setFinancePrdKpis] = useState(FINANCE_PRD_KPIS);
  const [financeTransactions, setFinanceTransactions] = useState(FULL_FINANCE_TRANSACTIONS_LIST);
  const [selectedFinanceTxn, setSelectedFinanceTxn] = useState(FULL_FINANCE_TRANSACTIONS_LIST[0]);
  const [bankAccounts, setBankAccounts] = useState(REGISTERED_BANK_ACCOUNTS_LIST);

  // Customer Management State
  const [customerKpis, setCustomerKpis] = useState(CUSTOMER_KPIS);
  const [customers, setCustomers] = useState(FULL_CUSTOMERS_LIST);
  const [selectedCustomer, setSelectedCustomer] = useState(FULL_CUSTOMERS_LIST[0]);
  const [upcomingKycExpiry, setUpcomingKycExpiry] = useState(UPCOMING_KYC_EXPIRY_LIST);

  // Rental Management State
  const [rentalKpis, setRentalKpis] = useState(RENTAL_KPIS);
  const [rentCollections, setRentCollections] = useState(FULL_RENT_COLLECTIONS_LIST);
  const [selectedRentCollection, setSelectedRentCollection] = useState(FULL_RENT_COLLECTIONS_LIST[0]);
  const [upcomingRenewals, setUpcomingRenewals] = useState(UPCOMING_LEASE_RENEWALS_LIST);
  const [vacantUnits, setVacantUnits] = useState(VACANT_UNITS_LIST);

  // Maintenance Management State
  const [maintenanceKpis, setMaintenanceKpis] = useState(MAINTENANCE_KPIS);
  const [maintenanceComplaints, setMaintenanceComplaints] = useState(FULL_MAINTENANCE_COMPLAINTS_LIST);
  const [selectedMaintenanceComplaint, setSelectedMaintenanceComplaint] = useState(FULL_MAINTENANCE_COMPLAINTS_LIST[0]);

  // Inventory Management State
  const [inventoryKpis, setInventoryKpis] = useState(INVENTORY_KPIS);
  const [inventoryTransactions, setInventoryTransactions] = useState(FULL_INVENTORY_TRANSACTIONS_LIST);
  const [selectedInventoryTxn, setSelectedInventoryTxn] = useState(FULL_INVENTORY_TRANSACTIONS_LIST[0]);
  const [lowStockAlerts, setLowStockAlerts] = useState(LOW_STOCK_ALERTS_LIST);

  // HR Management State
  const [hrKpis, setHrKpis] = useState(HR_KPIS);
  const [employees, setEmployees] = useState(FULL_EMPLOYEES_LIST);
  const [selectedEmployee, setSelectedEmployee] = useState(FULL_EMPLOYEES_LIST[0]);

  // Reports Management State
  const [reportsKpis, setReportsKpis] = useState(REPORTS_KPIS);
  const [generatedReports, setGeneratedReports] = useState(RECENT_GENERATED_REPORTS_LIST);
  const [selectedReport, setSelectedReport] = useState(RECENT_GENERATED_REPORTS_LIST[0]);

  // Notifications Centre State
  const [notificationsKpis, setNotificationsKpis] = useState(NOTIFICATIONS_KPIS);
  const [notifications, setNotifications] = useState(FULL_NOTIFICATIONS_LIST);
  const [selectedNotification, setSelectedNotification] = useState(FULL_NOTIFICATIONS_LIST[0]);
  const [notificationPreferences, setNotificationPreferences] = useState(NOTIFICATION_PREFERENCES_DATA);

  // User Management State
  const [userMgmtKpis, setUserMgmtKpis] = useState(USER_MGMT_KPIS);
  const [userMgmtUsers, setUserMgmtUsers] = useState(FULL_USERS_LIST);
  const [selectedUserMgmtUser, setSelectedUserMgmtUser] = useState(FULL_USERS_LIST[0]);
  const [activeSessions, setActiveSessions] = useState(ACTIVE_SESSIONS_LIST);

  // System Settings & Audit State
  const [settingsKpis, setSettingsKpis] = useState(SETTINGS_KPIS);
  const [settingsCategories, setSettingsCategories] = useState(SETTINGS_CATEGORIES_DATA);
  const [settingsChangeHistory, setSettingsChangeHistory] = useState(SETTINGS_CHANGE_HISTORY_LIST);
  const [systemHealthDiagnostics, setSystemHealthDiagnostics] = useState(SYSTEM_HEALTH_DIAGNOSTICS_DATA);
  const [systemInfo, setSystemInfo] = useState(SYSTEM_INFO_DATA);

  // Dedicated Audit & Compliance State
  const [auditKpis, setAuditKpis] = useState(AUDIT_KPIS);
  const [auditLogsList, setAuditLogsList] = useState(FULL_AUDIT_LOGS_LIST);
  const [selectedAuditLog, setSelectedAuditLog] = useState(FULL_AUDIT_LOGS_LIST[0]);

  // Memoized role permissions
  const activePermissions = useMemo(
    () => ROLE_PERMISSIONS[userRole] || ROLE_PERMISSIONS['Admin'],
    [userRole]
  );

  // ---- Stable action callbacks (useCallback) ----

  const showToast = useCallback((message, type = 'info') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => setToast(null), 3500);
  }, []);

  const logAudit = useCallback((action, details) => {
    const newLog = {
      id: Date.now(),
      action,
      details,
      user: 'John Doe',
      role: userRole,
      time: 'Just now'
    };
    setAuditLogs((prev) => [newLog, ...prev.slice(0, 19)]);
  }, [userRole]);

  // Sync browser tab title with active module/submodule
  useEffect(() => {
    const mod = MODULES_LIST.find((m) => m.id === activeModule)
      || (activeModule === 'settings' ? SETTINGS_MODULE : null);
    const moduleName = mod?.title || (activeModule === 'dashboard' ? 'Dashboard' : activeModule);
    const subName = activeSubmodule && activeSubmodule !== 'Main Overview' && activeSubmodule !== 'Overview'
      ? ` — ${activeSubmodule}`
      : '';
    document.title = `${moduleName}${subName} | APEX ERP`;
  }, [activeModule, activeSubmodule]);

  const triggerRefresh = useCallback((silent = false) => {
    setIsRefreshing(true);
    if (!silent) {
      showToast('Refreshing Dashboard KPIs and Analytics...');
    }
    setTimeout(() => {
      setIsRefreshing(false);
      setRefreshCountdown(60);
      logAudit('Manual Data Refresh', 'Refreshed all widget datasets');
    }, 700);
  }, [showToast, logAudit]);

  // Auto-refresh countdown timer (60s loop)
  useEffect(() => {
    const timer = setInterval(() => {
      setRefreshCountdown((prev) => {
        if (prev <= 1) {
          triggerRefresh(true);
          return 60;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [triggerRefresh]);

  const slugify = useCallback((str) => {
    return (str || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }, []);

  const unslugify = useCallback((slug) => {
    return (slug || '').split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  }, []);

  // Sync URL → State on initial mount
  useEffect(() => {
    const path = window.location.pathname.replace(/^\/+|\/+$/g, '');
    if (path) {
      const parts = path.split('/');
      const moduleSlug = parts[0];
      const submoduleSlug = parts.slice(1).join('/');

      // Find matching module by slug
      const matchedModule = MODULES_LIST.find((m) => slugify(m.id) === moduleSlug)
        || (moduleSlug === 'settings' ? SETTINGS_MODULE : null);

      if (matchedModule) {
        setActiveModule(matchedModule.id);
        if (submoduleSlug && matchedModule.submodules) {
          const matchedSub = matchedModule.submodules.find(
            (s) => slugify(s) === submoduleSlug
          );
          setActiveSubmodule(matchedSub || unslugify(submoduleSlug));
        } else {
          setActiveSubmodule(matchedModule.submodules?.[0] || 'Overview');
        }
      } else {
        // Try direct match (e.g., 'dashboard')
        setActiveModule(moduleSlug);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Listen for browser back/forward
  useEffect(() => {
    const handlePopState = (event) => {
      if (event.state) {
        setActiveModule(event.state.module || 'dashboard');
        setActiveSubmodule(event.state.submodule || 'Main Overview');
      } else {
        setActiveModule('dashboard');
        setActiveSubmodule('Main Overview');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = useCallback((moduleId, submoduleName = null, filterState = null) => {
    setActiveModule(moduleId);

    let resolvedSubmodule;
    if (submoduleName) {
      resolvedSubmodule = submoduleName;
    } else {
      const mod = MODULES_LIST.find((m) => m.id === moduleId) || (moduleId === 'settings' ? SETTINGS_MODULE : null);
      resolvedSubmodule = mod?.submodules?.[0] || 'Overview';
    }
    setActiveSubmodule(resolvedSubmodule);

    // Build URL path
    const moduleSlug = slugify(moduleId);
    const subSlug = slugify(resolvedSubmodule);
    const urlPath = moduleId === 'dashboard'
      ? '/'
      : `/${moduleSlug}${subSlug ? '/' + subSlug : ''}`;

    // Push to browser history
    window.history.pushState(
      { module: moduleId, submodule: resolvedSubmodule },
      '',
      urlPath
    );

    if (filterState) {
      setActiveFilter((prev) => ({ ...prev, ...filterState }));
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);
    logAudit('Navigated Module', `Opened module: ${moduleId}`);
  }, [logAudit, slugify]);

  const toggleTaskComplete = useCallback((taskId) => {
    const currentPermissions = ROLE_PERMISSIONS[userRole];
    if (!currentPermissions.canCompleteTasks) {
      showToast('Auditor role is read-only. Action not permitted.', 'warning');
      return;
    }

    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          const nextState = !t.completed;
          showToast(
            nextState ? `Marked task "${t.title}" as Complete!` : `Reopened task "${t.title}"`,
            nextState ? 'success' : 'info'
          );
          logAudit('Updated Task Status', `${taskId} set to ${nextState ? 'Completed' : 'Pending'}`);
          return { ...t, completed: nextState };
        }
        return t;
      })
    );
  }, [userRole, showToast, logAudit]);

  // Audit Module Actions
  const markAuditLogReviewed = useCallback((logId) => {
    setAuditLogsList((prev) =>
      prev.map((l) => (l.id === logId ? { ...l, reviewed: true } : l))
    );
    showToast(`Marked audit log ${logId} as reviewed`, 'success');
    logAudit('Reviewed Audit Log', `Marked ${logId} reviewed`);
  }, [showToast, logAudit]);

  const addAuditNote = useCallback((logId, noteText) => {
    showToast(`Added investigation note to audit log ${logId}`, 'info');
    logAudit('Added Audit Note', `Annotated log ${logId}: ${noteText}`);
  }, [showToast, logAudit]);

  const exportAuditLogs = useCallback((format = 'xlsx') => {
    showToast(`Exporting audit logs in .${format.toUpperCase()} format...`, 'success');
    logAudit('Exported Audit Logs', `Generated export in ${format}`);
  }, [showToast, logAudit]);

  const createSecurityAlertRule = useCallback((ruleData) => {
    showToast(`Configured security alert rule for ${ruleData.severity || 'Critical'} events`, 'success');
    logAudit('Created Security Alert Rule', `Alert threshold created`);
  }, [showToast, logAudit]);

  // System Settings Actions
  const updateSetting = useCallback((categoryName, settingName, oldValue, newValue) => {
    if (userRole === 'Auditor (Read-Only)' || userRole === 'Staff (Sales/Ops)') {
      showToast('System Settings require Admin or Super Admin role.', 'warning');
      return;
    }

    const newChangeEntry = {
      id: `CHG-${Date.now().toString().slice(-4)}`,
      settingName,
      category: categoryName,
      changedBy: 'John Doe (Admin)',
      dateTime: 'Just now',
      action: 'Updated',
      oldValue: oldValue || 'N/A',
      newValue: newValue || 'N/A'
    };

    setSettingsChangeHistory((prev) => [newChangeEntry, ...prev]);
    showToast(`Updated ${settingName} in ${categoryName}`, 'success');
    logAudit('Updated Setting', `Changed ${settingName}: ${oldValue} -> ${newValue}`);
  }, [userRole, showToast, logAudit]);

  const clearSystemCache = useCallback(() => {
    showToast('Flushed Redis, Session & Report Caches successfully!', 'success');
    logAudit('Cleared Cache', 'Flushed Redis session & report caches');
  }, [showToast, logAudit]);

  const runHealthCheck = useCallback(() => {
    showToast('Running System Diagnostic Health Check...', 'info');
    setTimeout(() => {
      showToast('System Health Check Complete: 100% Operational', 'success');
      logAudit('System Health Check', 'Ran live health diagnostics');
    }, 600);
  }, [showToast, logAudit]);

  const triggerManualBackup = useCallback(() => {
    showToast('Initiated manual database snapshot backup...', 'info');
    setTimeout(() => {
      showToast('Manual Database Backup completed successfully (Size: 4.25 GB)', 'success');
      logAudit('Manual Backup', 'Created snapshot backup');
    }, 800);
  }, [showToast, logAudit]);

  const resetSettingsToDefault = useCallback(() => {
    if (userRole !== 'Admin') {
      showToast('Only Admin can reset settings to defaults.', 'warning');
      return;
    }

    showToast('Reset all system configurations to factory defaults', 'warning');
    logAudit('Reset Settings', 'Restored factory settings defaults');
  }, [userRole, showToast, logAudit]);

  // User Management Actions
  const addUser = useCallback((newUserData) => {
    if (userRole === 'Auditor (Read-Only)' || userRole === 'Staff (Sales/Ops)') {
      showToast('User Management requires Admin or Super Admin role.', 'warning');
      return;
    }

    const newId = `USR-10${5 + userMgmtUsers.length + 1}`;
    const nameParts = (newUserData.name || 'New User').trim().split(' ');
    const initials = nameParts.map((n) => n[0]).join('').toUpperCase();

    const newEntry = {
      id: newId,
      name: newUserData.name || 'New User',
      initials,
      email: newUserData.email || 'user@apexerp.com',
      role: newUserData.role || 'Site Engineer',
      department: newUserData.department || 'Projects & Site',
      status: 'Active',
      lastLogin: 'Just registered',
      mobile: newUserData.mobile || '+91 98000 00000',
      jobTitle: newUserData.jobTitle || 'System User'
    };

    setUserMgmtUsers((prev) => [newEntry, ...prev]);
    setSelectedUserMgmtUser(newEntry);
    showToast(`Onboarded new system user ${newEntry.name} (${newId})`, 'success');
    logAudit('Onboarded User', `Created account ${newId} for ${newEntry.name}`);
  }, [userMgmtUsers.length, userRole, showToast, logAudit]);

  const updateUserStatus = useCallback((userId, status) => {
    if (userRole === 'Auditor (Read-Only)' || userRole === 'Staff (Sales/Ops)') {
      showToast('User Management requires Admin or Super Admin role.', 'warning');
      return;
    }

    setUserMgmtUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, status } : u))
    );

    showToast(`Updated status of user ${userId} to "${status}"`, 'info');
    logAudit('Updated User Status', `${userId} set to ${status}`);
  }, [userRole, showToast, logAudit]);

  const resetUserPassword = useCallback((userId) => {
    if (userRole === 'Auditor (Read-Only)') {
      showToast('Auditor role cannot reset passwords.', 'warning');
      return;
    }

    setUserMgmtUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, status: 'Active' } : u))
    );

    showToast(`Sent password reset link & cleared lockouts for user ${userId}`, 'success');
    logAudit('Reset User Password', `Cleared lockout for ${userId}`);
  }, [userRole, showToast, logAudit]);

  const forceLogoutSession = useCallback((sessionId) => {
    if (userRole === 'Auditor (Read-Only)') {
      showToast('Auditor role cannot force logout sessions.', 'warning');
      return;
    }

    setActiveSessions((prev) => prev.filter((s) => s.sessionId !== sessionId));
    showToast(`Forced logout session ${sessionId}`, 'warning');
    logAudit('Force Logout Session', `Revoked token ${sessionId}`);
  }, [userRole, showToast, logAudit]);

  // CRM & Customer Actions
  const addLead = useCallback((formData) => {
    const newLead = {
      id: `LD-${Date.now().toString().slice(-4)}`,
      name: formData.name,
      mobile: formData.mobile || '+91 98765 43210',
      email: formData.email || `${formData.name.toLowerCase().replace(/\s+/g, '.')}@example.com`,
      location: formData.location || 'Hyderabad',
      source: formData.source || 'Website',
      projectInterested: formData.projectInterested || 'Green Heights',
      budget: formData.budget || '₹60L – ₹80L',
      requirement: formData.requirement || '2 BHK Flat',
      status: 'New',
      score: 85,
      assignedTo: formData.assignedTo || 'Anjali Sharma',
      createdAt: 'Just Now',
      remarks: formData.remarks || ''
    };
    setLeads((prev) => [newLead, ...prev]);
    setSelectedLead(newLead);
    showToast(`Created new lead: ${newLead.name} (${newLead.id})`, 'success');
    logAudit('Created Lead', `Created lead ${newLead.id} for ${newLead.name}`);
  }, [showToast, logAudit]);

  const convertToCustomer = useCallback((leadId) => {
    const targetLead = leads.find((l) => l.id === leadId);
    if (!targetLead) return;
    const newCustomer = {
      id: `CUST-${Date.now().toString().slice(-4)}`,
      name: targetLead.name,
      type: 'Owner',
      mobile: targetLead.mobile,
      email: targetLead.email,
      city: targetLead.location || 'Hyderabad',
      kycStatus: 'Verified',
      linkedBooking: 'BKG-NEW',
      dueAmount: '₹0',
      possessionStatus: 'Pending',
      npsScore: 9,
      kycExpiryDate: '2027-12-31'
    };
    setCustomers((prev) => [newCustomer, ...prev]);
    setLeads((prev) => prev.map((l) => (l.id === leadId ? { ...l, status: 'Converted' } : l)));
    showToast(`Converted lead ${targetLead.name} into Customer (${newCustomer.id})!`, 'success');
    logAudit('Converted Lead', `Converted lead ${leadId} to customer ${newCustomer.id}`);
  }, [leads, showToast, logAudit]);

  const scheduleFollowUp = useCallback((leadId, note, dateStr) => {
    setLeads((prev) =>
      prev.map((l) =>
        l.id === leadId
          ? {
              ...l,
              nextFollowUp: dateStr || 'Tomorrow, 2:00 PM',
              remarks: note ? `${l.remarks ? l.remarks + ' | ' : ''}${note}` : l.remarks
            }
          : l
      )
    );
    showToast(`Scheduled follow-up for lead (${leadId})`, 'success');
    logAudit('Scheduled Follow-up', `Lead ${leadId} follow-up set for ${dateStr}`);
  }, [showToast, logAudit]);

  const addCustomer = useCallback((formData) => {
    const newCust = {
      id: `CUST-${Date.now().toString().slice(-4)}`,
      name: formData.name,
      type: formData.type || 'Owner',
      mobile: formData.mobile || '+91 98765 00000',
      email: formData.email || `${formData.name.toLowerCase().replace(/\s+/g, '.')}@example.com`,
      city: formData.city || 'Noida',
      kycStatus: 'Pending Verification',
      linkedBooking: formData.linkedBooking || 'N/A',
      dueAmount: '₹0',
      possessionStatus: 'Pending',
      npsScore: 8,
      kycExpiryDate: '2026-12-31',
      nomineeName: formData.nomineeName,
      nomineeRelation: formData.nomineeRelation
    };
    setCustomers((prev) => [newCust, ...prev]);
    setSelectedCustomer(newCust);
    showToast(`Created customer profile for ${newCust.name}`, 'success');
    logAudit('Created Customer', `Added new customer ${newCust.id}`);
  }, [showToast, logAudit]);

  const updateCustomerKyc = useCallback((customerId, status) => {
    setCustomers((prev) =>
      prev.map((c) => (c.id === customerId ? { ...c, kycStatus: status } : c))
    );
    showToast(`Updated KYC status for customer ${customerId} to "${status}"`, 'success');
    logAudit('Updated Customer KYC', `Customer ${customerId} KYC set to ${status}`);
  }, [showToast, logAudit]);

  // Master Data CRUD Actions (13 Categories)
  const addMasterRecord = useCallback((categoryId, newRecord) => {
    if (userRole === 'Auditor (Read-Only)' || userRole === 'Staff (Sales/Ops)') {
      showToast('Master Data changes require Admin or Super Admin role.', 'warning');
      return;
    }

    const recId = `M-${categoryId.toUpperCase()}-${Date.now().toString().slice(-4)}`;

    // Auto-generate code if missing
    let code = newRecord.code;
    if (!code || !String(code).trim()) {
      const prefix = {
        company: 'CMP', projects: 'PRJ', buildings: 'BLD', towers: 'TWR',
        floors: 'FLR', units: 'UNT', flatTypes: 'FTP', vendors: 'VND',
        dealers: 'DLR', employees: 'EMP', banks: 'BNK', tax: 'TAX',
        paymentModes: 'PAY', complaintCategories: 'CAT'
      }[categoryId] || categoryId.substring(0, 3).toUpperCase();
      const currentRecords = masterRecords[categoryId] || [];
      code = `${prefix}-${(currentRecords.length + 1).toString().padStart(3, '0')}`;
    }

    const formattedRecord = {
      id: recId,
      status: 'Active',
      createdBy: 'John Doe (Admin)',
      createdOn: new Date().toISOString().split('T')[0],
      updatedBy: 'John Doe (Admin)',
      updatedOn: new Date().toISOString().split('T')[0],
      ...newRecord,
      code
    };

    setMasterRecords((prev) => ({
      ...prev,
      [categoryId]: [formattedRecord, ...(prev[categoryId] || [])]
    }));

    showToast(`Added new master record in ${categoryId.toUpperCase()}: ${newRecord.name || code}`, 'success');
    logAudit('Created Master Record', `Added record ${recId} in category ${categoryId}`);
  }, [userRole, masterRecords, showToast, logAudit]);

  const updateMasterRecord = useCallback((categoryId, recordId, updatedFields) => {
    if (userRole === 'Auditor (Read-Only)' || userRole === 'Staff (Sales/Ops)') {
      showToast('Master Data changes require Admin or Super Admin role.', 'warning');
      return;
    }

    setMasterRecords((prev) => ({
      ...prev,
      [categoryId]: (prev[categoryId] || []).map((r) => {
        if (r.id === recordId) {
          return {
            ...r,
            ...updatedFields,
            updatedBy: 'John Doe (Admin)',
            updatedOn: new Date().toISOString().split('T')[0]
          };
        }
        return r;
      })
    }));

    showToast(`Updated master record ${recordId} in ${categoryId.toUpperCase()}`, 'info');
    logAudit('Updated Master Record', `Modified record ${recordId} in ${categoryId}`);
  }, [userRole, showToast, logAudit]);

  const deleteMasterRecord = useCallback((categoryId, recordId) => {
    if (userRole === 'Auditor (Read-Only)' || userRole === 'Staff (Sales/Ops)') {
      showToast('Master Data changes require Admin or Super Admin role.', 'warning');
      return;
    }

    setMasterRecords((prev) => ({
      ...prev,
      [categoryId]: (prev[categoryId] || []).filter((r) => r.id !== recordId)
    }));

    showToast(`Deleted record ${recordId} from ${categoryId.toUpperCase()}`, 'info');
    logAudit('Deleted Master Record', `Removed record ${recordId} from ${categoryId}`);
  }, [userRole, showToast, logAudit]);

  const toggleMasterStatus = useCallback((categoryId, recordId) => {
    if (userRole === 'Auditor (Read-Only)' || userRole === 'Staff (Sales/Ops)') {
      showToast('Master Data changes require Admin or Super Admin role.', 'warning');
      return;
    }

    setMasterRecords((prev) => ({
      ...prev,
      [categoryId]: (prev[categoryId] || []).map((r) => {
        if (r.id === recordId) {
          const isCurrentlyActive = ['Active', 'active', 'Available', 'AVAILABLE'].includes(r.status);
          const nextStatus = isCurrentlyActive ? 'Inactive' : 'Active';
          showToast(`Toggled status of ${r.name || r.code} to ${nextStatus}`, 'info');
          return { ...r, status: nextStatus, updatedOn: new Date().toISOString().split('T')[0] };
        }
        return r;
      })
    }));
  }, [userRole, showToast]);

  const changeRole = useCallback((newRole) => {
    setUserRole(newRole);
    showToast(`Switched RBAC Role to: ${newRole}`, 'info');
    logAudit('Role Switched', `Active role changed to ${newRole}`);
  }, [showToast, logAudit]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const nextTheme = prev === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', nextTheme);
      return nextTheme;
    });
  }, []);

  // Unread notifications count
  const unreadCount = useMemo(() => {
    return notifications.filter((n) => !n.is_read).length;
  }, [notifications]);

  // Memoized context value
  const value = useMemo(() => ({
    activeModule,
    activeSubmodule,
    activeFilter,
    setActiveFilter,
    timeRange,
    setTimeRange,
    userRole,
    changeRole,
    activePermissions,
    isRefreshing,
    triggerRefresh,
    refreshCountdown,
    sidebarCollapsed,
    setSidebarCollapsed,
    mobileMenuOpen,
    setMobileMenuOpen,
    theme,
    toggleTheme,
    tasks,
    toggleTaskComplete,
    complaints,
    kpis,
    toast,
    showToast,
    auditLogs,
    navigateTo,
    // CRM State
    leads,
    selectedLead,
    setSelectedLead,
    crmKpis,
    leadStatusFilter,
    setLeadStatusFilter,
    addLead,
    convertToCustomer,
    scheduleFollowUp,
    // Sales State
    salesKpis,
    salesBookings,
    bookings: salesBookings,
    selectedBooking,
    setSelectedBooking,
    salesStatusFilter,
    setSalesStatusFilter,
    upcomingInstallments,
    recentReceipts,
    overdueInstallments,
    // Master Data State
    masterCategories,
    masterRecords,
    activeMasterCategory,
    setActiveMasterCategory,
    addMasterRecord,
    updateMasterRecord,
    deleteMasterRecord,
    toggleMasterStatus,
    // Finance State
    financeKpis,
    financePrdKpis,
    financeTransactions,
    transactions: financeTransactions,
    selectedFinanceTxn,
    setSelectedFinanceTxn,
    bankAccounts,
    // Customer Management State
    customerKpis,
    customers,
    selectedCustomer,
    setSelectedCustomer,
    upcomingKycExpiry,
    addCustomer,
    updateCustomerKyc,
    // Rental Management State
    rentalKpis,
    rentCollections,
    selectedRentCollection,
    setSelectedRentCollection,
    upcomingRenewals,
    vacantUnits,
    // Maintenance Management State
    maintenanceKpis,
    maintenanceComplaints,
    complaints: maintenanceComplaints,
    selectedMaintenanceComplaint,
    setSelectedMaintenanceComplaint,
    setSelectedComplaint: setSelectedMaintenanceComplaint,
    // Inventory Management State
    inventoryKpis,
    inventoryTransactions,
    inventory: inventoryTransactions,
    selectedInventoryTxn,
    setSelectedInventoryTxn,
    lowStockAlerts,
    // HR Management State
    hrKpis,
    employees,
    selectedEmployee,
    setSelectedEmployee,
    // Reports Management State
    reportsKpis,
    generatedReports,
    selectedReport,
    setSelectedReport,
    // Notifications Centre State
    notificationsKpis,
    notifications,
    selectedNotification,
    setSelectedNotification,
    notificationPreferences,
    unreadCount,
    // User Management State
    userMgmtKpis,
    userMgmtUsers,
    users: userMgmtUsers,
    selectedUserMgmtUser,
    setSelectedUserMgmtUser,
    setSelectedUser: setSelectedUserMgmtUser,
    activeSessions,
    addUser,
    updateUserStatus,
    resetUserPassword,
    forceLogoutSession,
    // System Settings & Audit State
    settingsKpis,
    settingsCategories,
    settingsChangeHistory,
    systemHealthDiagnostics,
    systemInfo,
    updateSetting,
    clearSystemCache,
    runHealthCheck,
    triggerManualBackup,
    resetSettingsToDefault,
    // Dedicated Audit & Compliance State
    auditKpis,
    auditLogsList,
    selectedAuditLog,
    setSelectedAuditLog,
    markAuditLogReviewed,
    addAuditNote,
    exportAuditLogs,
    createSecurityAlertRule
  }), [
    activeModule, activeSubmodule, activeFilter, timeRange, userRole,
    changeRole, activePermissions, isRefreshing, triggerRefresh,
    refreshCountdown, sidebarCollapsed, mobileMenuOpen, theme,
    toggleTheme, tasks, toggleTaskComplete, complaints, kpis, toast,
    showToast, auditLogs, navigateTo, leads, selectedLead, crmKpis,
    leadStatusFilter, salesKpis, salesBookings, selectedBooking,
    salesStatusFilter, upcomingInstallments, recentReceipts,
    overdueInstallments, masterCategories, masterRecords,
    activeMasterCategory, addMasterRecord, updateMasterRecord,
    deleteMasterRecord, toggleMasterStatus, financeKpis, financePrdKpis,
    financeTransactions, selectedFinanceTxn, bankAccounts, customerKpis,
    customers, selectedCustomer, upcomingKycExpiry, rentalKpis,
    rentCollections, selectedRentCollection, upcomingRenewals,
    vacantUnits, maintenanceKpis, maintenanceComplaints,
    selectedMaintenanceComplaint, inventoryKpis, inventoryTransactions,
    selectedInventoryTxn, lowStockAlerts, hrKpis, employees,
    selectedEmployee, reportsKpis, generatedReports, selectedReport,
    notificationsKpis, notifications, selectedNotification,
    notificationPreferences, unreadCount, userMgmtKpis, userMgmtUsers,
    selectedUserMgmtUser, activeSessions, addUser, updateUserStatus,
    resetUserPassword, forceLogoutSession, settingsKpis,
    settingsCategories, settingsChangeHistory, systemHealthDiagnostics,
    systemInfo, updateSetting, clearSystemCache, runHealthCheck,
    triggerManualBackup, resetSettingsToDefault, auditKpis,
    auditLogsList, selectedAuditLog, markAuditLogReviewed, addAuditNote,
    exportAuditLogs, createSecurityAlertRule, addLead, convertToCustomer,
    scheduleFollowUp, addCustomer, updateCustomerKyc
  ]);

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
