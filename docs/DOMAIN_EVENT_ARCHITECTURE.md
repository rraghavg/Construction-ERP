# APEX Construction ERP — Domain Event Architecture

**Document Version:** 1.0  
**Status:** Frozen Architectural Contract  

---

## 1. Core Rule: Authoritative Persistence

> **MANDATORY RULE:** MongoDB database documents are the **sole authoritative source of truth**. Domain events facilitate asynchronous cross-module notifications, audit tracking, and integration workflows. Domain events MUST NOT silently become an alternative source of truth or bypass database consistency checks.

---

## 2. Standard Event Payload Schema (`IDomainEvent`)

Every domain event emitted across APEX modules MUST conform to the following contract:

```typescript
export interface IDomainEvent<T = any> {
  eventId: string;          // Format: EVT-<timestamp>-<randomHex>
  eventType: string;        // Dot-notation format: <module>.<entity>.<action>
  tenantId: string;         // Derived strictly from trusted server context
  actorId: string;          // User ID or SYSTEM
  timestamp: string;        // ISO-8601 timestamp string
  entityType: string;       // Name of entity (e.g., 'booking', 'lead', 'receipt')
  entityId: string;         // Unique ID of entity (e.g., 'BKG-2026-001')
  payload: T;               // Strongly typed payload object
  metadata?: {
    ipAddress?: string;
    userAgent?: string;
    requestId?: string;
  };
}
```

---

## 3. Event Naming Convention

Domain event types follow lower-case dot-notation: `<module>.<entity>.<action>`

Examples:
- `sales.booking.created`
- `sales.booking.cancelled`
- `crm.lead.created`
- `crm.lead.converted`
- `finance.receipt.created`
- `inventory.stock.issued`
- `maintenance.complaint.raised`
