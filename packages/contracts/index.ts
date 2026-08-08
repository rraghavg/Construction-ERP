/**
 * System Constants & Module Keys for APEX Construction ERP.
 */

export const SYSTEM_MODULE_KEYS = [
  'master-data',
  'crm',
  'customer',
  'sales',
  'finance',
  'procurement',
  'inventory',
  'hr',
  'maintenance',
  'rental',
  'reports',
  'notifications',
  'user-management',
  'settings',
  'audit'
] as const;

export type ModuleKey = typeof SYSTEM_MODULE_KEYS[number];

export enum EntityStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  BLOCKED = 'BLOCKED',
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  CANCELLED = 'CANCELLED'
}
