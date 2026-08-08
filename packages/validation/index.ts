/**
 * Standard Validation Schemas & Helpers for APEX Construction ERP.
 */

import { z } from 'zod';

export const PaginationQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
  search: z.string().optional(),
  status: z.string().optional(),
  sortBy: z.string().default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc')
});

export const TenantIdSchema = z.string().min(3).max(50);
export const UserEmailSchema = z.string().email();
