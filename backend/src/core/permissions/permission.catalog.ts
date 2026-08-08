/**
 * Canonical System Permission Catalog for APEX Construction ERP.
 * Standard Format: <module>.<entity>.<action>
 */

export interface IPermissionDefinition {
  key: string;
  name: string;
  description: string;
  moduleKey: string;
}

export const SYSTEM_PERMISSIONS: IPermissionDefinition[] = [
  // Master Data Module
  { key: 'master.company.view', name: 'View Company Master', description: 'View company profiles and GSTIN records', moduleKey: 'master-data' },
  { key: 'master.company.create', name: 'Create Company Master', description: 'Create new company entities', moduleKey: 'master-data' },
  { key: 'master.company.update', name: 'Update Company Master', description: 'Modify existing company profiles', moduleKey: 'master-data' },
  { key: 'master.project.view', name: 'View Project Master', description: 'View real estate construction projects', moduleKey: 'master-data' },
  { key: 'master.project.create', name: 'Create Project Master', description: 'Create new real estate projects', moduleKey: 'master-data' },
  { key: 'master.unit.view', name: 'View Property Units', description: 'View inventory property units', moduleKey: 'master-data' },
  { key: 'master.unit.create', name: 'Create Property Units', description: 'Create property units in projects', moduleKey: 'master-data' },
  { key: 'master.unit.change_status', name: 'Change Unit Status', description: 'Update unit availability status (AVAILABLE, RESERVED, BOOKED)', moduleKey: 'master-data' },
  { key: 'master.unit.change_price', name: 'Change Unit Price', description: 'Modify base selling price for units', moduleKey: 'master-data' },
  { key: 'master.vendor.view', name: 'View Vendor Master', description: 'View vendor and supplier master records', moduleKey: 'master-data' },

  // CRM Module
  { key: 'crm.lead.view', name: 'View Leads', description: 'View sales leads and inquiries', moduleKey: 'crm' },
  { key: 'crm.lead.create', name: 'Create Lead', description: 'Add new prospective buyer lead', moduleKey: 'crm' },
  { key: 'crm.lead.update', name: 'Update Lead', description: 'Update lead contact and status details', moduleKey: 'crm' },
  { key: 'crm.lead.convert', name: 'Convert Lead', description: 'Convert lead to active customer', moduleKey: 'crm' },

  // Customer Module
  { key: 'customer.profile.view', name: 'View Customer Profile', description: 'View customer KYC and unit holdings', moduleKey: 'customer' },
  { key: 'customer.kyc.update', name: 'Manage Customer KYC', description: 'Upload and verify customer KYC documents', moduleKey: 'customer' },

  // Sales Module
  { key: 'sales.booking.view', name: 'View Bookings', description: 'View unit reservations and bookings', moduleKey: 'sales' },
  { key: 'sales.booking.create', name: 'Create Booking', description: 'Create new unit booking document', moduleKey: 'sales' },
  { key: 'sales.booking.approve', name: 'Approve Booking', description: 'Approve unit booking and lock price', moduleKey: 'sales' },

  // Finance Module
  { key: 'finance.ledger.view', name: 'View Financial Ledgers', description: 'View customer ledgers and receipts', moduleKey: 'finance' },
  { key: 'finance.receipt.create', name: 'Create Receipt', description: 'Issue customer payment receipt', moduleKey: 'finance' },
  { key: 'finance.demand.generate', name: 'Generate Demand Letter', description: 'Issue milestone demand letters', moduleKey: 'finance' },

  // User & Settings Core Admin
  { key: 'admin.user.manage', name: 'Manage Users', description: 'Create, update, and deactivate tenant users', moduleKey: 'user-management' },
  { key: 'admin.role.manage', name: 'Manage Roles', description: 'Create and assign custom tenant roles', moduleKey: 'user-management' },
  { key: 'admin.audit.view', name: 'View Audit Trail', description: 'Inspect append-only audit trail logs', moduleKey: 'audit' }
];

export const getAllPermissionKeys = (): string[] => SYSTEM_PERMISSIONS.map((p) => p.key);
