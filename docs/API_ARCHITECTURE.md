# APEX Construction ERP — API Architecture & Contracts

**Document Version:** 1.0  
**Status:** Frozen Architectural Contract  
**API Base Route:** `/api/v1`

---

## 1. Route Naming Conventions
1. **Base Prefix:** All API endpoints must start with `/api/v1/`.
2. **Resource Paths:** Use lowercase, kebab-case, plural nouns for collection resources:
   - `/api/v1/master-data/companies`
   - `/api/v1/master-data/projects`
   - `/api/v1/master-data/units`
   - `/api/v1/crm/leads`
   - `/api/v1/sales/bookings/:projectId`
   - `/api/v1/finance/ledgers`

---

## 2. HTTP Method Semantics

| Method | Usage | Response Code | Description |
|--------|-------|---------------|-------------|
| `GET` | Read Resource | 200 OK | Idempotent fetch of single or list items. |
| `POST` | Create Resource | 201 Created / 200 OK | Non-idempotent action or entity creation. |
| `PATCH` | Partial Update | 200 OK | Partial property or status modification. |
| `PUT` | Replace Resource | 200 OK | Complete replacement of entity payload. |
| `DELETE` | Soft Delete | 200 OK | Soft delete entity (sets `isDeleted: true`). |

---

## 3. Standardized Response Envelopes

### Success Envelope (`sendSuccess`)
```json
{
  "success": true,
  "data": { ... },
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "totalPages": 5,
    "requestId": "REQ-3926b5ec",
    "timestamp": "2026-08-02T18:16:00.000Z"
  }
}
```

### Error Envelope (`sendError`)
```json
{
  "success": false,
  "error": {
    "code": "PERMISSION_DENIED",
    "message": "User lacks required permission: 'crm.lead.create'",
    "details": null
  },
  "meta": {
    "requestId": "REQ-751d0841",
    "timestamp": "2026-08-02T18:16:00.000Z"
  }
}
```

---

## 4. Query Parameters Standard
- Pagination: `page` (integer, default: 1), `limit` (integer, default: 20, max: 100).
- Search: `search` (string, case-insensitive partial match on name/code).
- Sorting: `sortBy` (field name, default: `createdAt`), `sortOrder` (`asc` \| `desc`, default: `desc`).
- Filtering: `status` (string enum filter).

---

## 5. Middleware Authorization Pipeline
Every protected route must execute through the frozen core middleware chain:
```text
requestLogger
  └─► authenticateJwt
        └─► resolveTenant
              └─► checkModuleLicense('<moduleKey>')
                    └─► checkPermission('<permission.key>')
                          └─► checkProjectScope('projectId')
                                └─► Controller Action
                                      └─► globalErrorHandler
```

---

## 6. Concurrency Strategy
- **Optimistic Locking:** Critical entity updates (e.g. unit status, sales booking creation) enforce status transition checks and version counters to prevent double-booking or lost updates.
