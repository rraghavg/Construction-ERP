# APEX Construction ERP — Database Ownership Architecture

**Document Version:** 1.0  
**Status:** Frozen Architectural Contract  
**Database Engine:** MongoDB (via Mongoose ODM)

---

## 1. Trusted Server Context Enforcement

> **MANDATORY RULE:** Every tenant-owned business document must derive its `tenantId` context strictly from trusted server context (`req.tenantId` / JWT claims validated by `resolveTenant` middleware)—**NEVER** from untrusted client payload input.

If a client sends `{ "tenantId": "FOREIGN-TENANT", ... }` in the HTTP body or query string, the server controller MUST ignore or overwrite it with `req.tenantId`.

---

## 2. Naming Conventions & Schema Structure

1. **Collection Names:** Lowercase, pluralized (e.g., `tenants`, `users`, `auditevents`, `companies`, `projects`, `units`, `leads`, `bookings`).
2. **Primary Identifiers:** Custom readable String IDs generated at service layer (e.g., `TENANT-ABC`, `USR-1001`, `COMP-001`, `PRJ-001`, `UNT-101`, `LEAD-9012`, `BKG-2026-001`).
3. **Timestamps:** Every schema must include `{ timestamps: true }` generating `createdAt` and `updatedAt`.
4. **Soft Deletion:** Business entities implement soft deletion via:
   - `isDeleted`: `{ type: Boolean, default: false, index: true }`
   - `deletedAt`: `{ type: Date, default: null }`

---

## 3. Ancestry & Indexing Architecture

| Document Level | Required Stored Ancestry IDs | Required Index Patterns |
|----------------|------------------------------|-------------------------|
| **Tenant Level** | `tenantId` | `{ tenantId: 1 }` (Unique) |
| **Company Level** | `tenantId`, `companyId`, `code` | `{ tenantId: 1, code: 1 }` (Unique) |
| **Project Level** | `tenantId`, `companyId`, `projectId`, `code` | `{ tenantId: 1, code: 1 }` (Unique), `{ tenantId: 1, companyId: 1 }` |
| **Hierarchy Level** (Building/Tower/Floor) | `tenantId`, `projectId`, direct parent ID | `{ tenantId: 1, projectId: 1, code: 1 }` |
| **Unit Level** | `tenantId`, `companyId`, `projectId`, `unitId`, `unitNumber` | `{ tenantId: 1, projectId: 1, unitNumber: 1 }` (Unique), `{ tenantId: 1, status: 1 }` |
| **Lead / Booking / Receipt** | `tenantId`, `projectId`, entity custom ID | `{ tenantId: 1, projectId: 1 }`, `{ tenantId: 1, status: 1 }` |

---

## 4. Single-Query Project Scoping
To satisfy resource-scope security (`checkProjectScope`) without expensive multi-collection joins:
- Every document bounded by a project **MUST store `projectId` explicitly** in its collection.
- Queries bounded by project scope evaluate `{ tenantId: req.tenantId, projectId: { $in: req.user.allowedProjects } }`.

---

## 5. Audit Metadata Chaining
- All mutating operations (Create, Update Status, Soft Delete) must trigger `logAuditEvent()` in `backend/src/shared/audit/audit.model.ts`.
- Audit logs generate SHA-256 `checksum` chained against `prevChecksum` to maintain tamper-evident integrity.
