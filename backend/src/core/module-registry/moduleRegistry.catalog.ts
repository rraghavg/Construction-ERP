/**
 * Canonical System Module Registry Manifest for APEX Construction ERP.
 */

export interface IModuleManifest {
  moduleKey: string;
  name: string;
  description: string;
  category: 'core' | 'master' | 'crm' | 'sales' | 'finance' | 'operations' | 'admin';
  isCore: boolean;
  version: string;
  dependencies: string[];
}

export const SYSTEM_MODULE_MANIFESTS: IModuleManifest[] = [
  { moduleKey: 'master-data', name: 'Master Data', description: 'Companies, Projects, Buildings, Towers, Floors, Units, Vendors', category: 'master', isCore: true, version: '1.0.0', dependencies: [] },
  { moduleKey: 'crm', name: 'CRM', description: 'Leads, Followups, Site Visits, Broker/Dealer Management', category: 'crm', isCore: false, version: '1.0.0', dependencies: ['master-data'] },
  { moduleKey: 'customer', name: 'Customer', description: 'Customer Profiles, KYC Documents, Applicant Records', category: 'crm', isCore: false, version: '1.0.0', dependencies: ['master-data'] },
  { moduleKey: 'sales', name: 'Sales', description: 'Quotations, Reservations, Bookings, Agreements, Payment Plans', category: 'sales', isCore: false, version: '1.0.0', dependencies: ['master-data', 'crm', 'customer'] },
  { moduleKey: 'finance', name: 'Finance', description: 'Bank Accounts, Customer Ledgers, Receipts, Installment Demands', category: 'finance', isCore: false, version: '1.0.0', dependencies: ['master-data', 'customer', 'sales'] },
  { moduleKey: 'procurement', name: 'Procurement', description: 'Purchase Requests, RFQs, Purchase Orders, Goods Receipts', category: 'operations', isCore: false, version: '1.0.0', dependencies: ['master-data'] },
  { moduleKey: 'inventory', name: 'Inventory', description: 'Materials, Stores/Warehouses, Stock Ledgers, Issues', category: 'operations', isCore: false, version: '1.0.0', dependencies: ['master-data'] },
  { moduleKey: 'hr', name: 'HR & Payroll', description: 'Employee Directory, Attendance, Salary Structures, Payroll', category: 'operations', isCore: false, version: '1.0.0', dependencies: ['master-data'] },
  { moduleKey: 'maintenance', name: 'Maintenance', description: 'Complaints, Work Orders, Unit Maintenance Logs', category: 'operations', isCore: false, version: '1.0.0', dependencies: ['master-data', 'customer'] },
  { moduleKey: 'rental', name: 'Rental & Leases', description: 'Property Leases, Security Deposits, Rent Collections', category: 'sales', isCore: false, version: '1.0.0', dependencies: ['master-data', 'customer', 'finance'] },
  { moduleKey: 'reports', name: 'Reports & Analytics', description: 'Executive Dashboards and Custom Reports', category: 'admin', isCore: false, version: '1.0.0', dependencies: ['master-data'] },
  { moduleKey: 'notifications', name: 'Notifications', description: 'System Notifications and Email/SMS Alerting', category: 'core', isCore: true, version: '1.0.0', dependencies: [] },
  { moduleKey: 'user-management', name: 'User Management', description: 'Tenant Users, Roles, Permissions, Scope Assignment', category: 'admin', isCore: true, version: '1.0.0', dependencies: [] },
  { moduleKey: 'settings', name: 'System Settings', description: 'Company & Tenant Global Settings', category: 'admin', isCore: true, version: '1.0.0', dependencies: [] },
  { moduleKey: 'audit', name: 'Audit Log', description: 'Append-Only SHA-256 Audit Trail Inspection', category: 'admin', isCore: true, version: '1.0.0', dependencies: [] }
];
