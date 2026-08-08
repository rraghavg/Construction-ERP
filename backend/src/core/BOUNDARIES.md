# Core, Shared, and Module Boundary Definitions

## 1. CORE (`backend/src/core/`, `frontend/src/core/`)
- Purpose: Platform capabilities required for the ERP system itself to operate.
- Scope: Multi-tenancy resolution, JWT authentication, user management, session management, RBAC permission evaluation, resource scope enforcement, module registry, and licensing entitlements.
- Rule: Business domain logic (e.g., Company, Project, Lead, Booking, Invoice) MUST NOT be placed in Core.

## 2. SHARED (`backend/src/shared/`, `frontend/src/shared/`)
- Purpose: Reusable cross-domain infrastructure capabilities.
- Scope: Append-only audit logging, approval workflows, domain events, document/attachment storage contracts, notification dispatchers, activity timelines, sequence generators, and background job definitions.
- Rule: Shared capabilities must be domain-agnostic and usable across any licensed business module.

## 3. MODULE (`backend/src/modules/`, `frontend/src/modules/`)
- Purpose: Independently licensable business features and domain capabilities.
- Scope: Master Data, CRM, Customer, Sales, Finance, Procurement, Inventory, HR, Maintenance, Rental, Reports.
- Rule: Every business entity belongs to exactly ONE authoritative owner module.
