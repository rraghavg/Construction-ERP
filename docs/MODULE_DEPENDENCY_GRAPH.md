# APEX Construction ERP — Module Dependency Graph

**Document Version:** 1.0  
**Status:** Frozen Architectural Contract  
**Rule:** Circular dependencies between business modules are strictly **prohibited**. A module may only depend on modules located at lower or equal architectural layers.

---

## High-Level Architectural Flow

```text
                 CORE PLATFORM
                      │
                      ▼
               SHARED PLATFORM
                      │
                      ▼
                 MASTER DATA
                      │
           ┌──────────┼──────────┐
           ▼          ▼          ▼
          CRM      CUSTOMER   INVENTORY
           │          │          ▲
           └────┬─────┘          │
                ▼                │
              SALES         PROCUREMENT
                │
                ▼
             FINANCE
                │
       ┌────────┼────────┐
       ▼        ▼        ▼
      RENTAL   REPORTS  MAINTENANCE
```

---

## Module Layer & Allowed Dependency Matrix

| Layer | Module | Allowed Dependencies | Prohibited Dependencies |
|-------|--------|---------------------|------------------------|
| **0** | **CORE** | None | SHARED, Any Business Module |
| **1** | **SHARED** | CORE | Any Business Module |
| **2** | **MASTER DATA** | CORE, SHARED | CRM, CUSTOMER, SALES, FINANCE, etc. |
| **3** | **CRM** | CORE, SHARED, MASTER DATA | SALES, FINANCE, PROCUREMENT, etc. |
| **3** | **CUSTOMER** | CORE, SHARED, MASTER DATA | SALES, FINANCE, RENTAL, etc. |
| **3** | **INVENTORY** | CORE, SHARED, MASTER DATA | PROCUREMENT, SALES, FINANCE |
| **3** | **HR** | CORE, SHARED, MASTER DATA | SALES, FINANCE |
| **4** | **PROCUREMENT** | CORE, SHARED, MASTER DATA, INVENTORY | SALES, FINANCE, RENTAL |
| **4** | **SALES** | CORE, SHARED, MASTER DATA, CRM, CUSTOMER, INVENTORY | FINANCE, RENTAL |
| **5** | **FINANCE** | CORE, SHARED, MASTER DATA, CUSTOMER, SALES | RENTAL, MAINTENANCE |
| **6** | **MAINTENANCE**| CORE, SHARED, MASTER DATA, CUSTOMER, INVENTORY | SALES, FINANCE |
| **6** | **RENTAL** | CORE, SHARED, MASTER DATA, CUSTOMER, FINANCE | MAINTENANCE |
| **6** | **REPORTS** | CORE, SHARED, MASTER DATA, ALL MODULES (Read-Only) | Direct write mutations |

---

## Anti-Circular Enforcement Rules
1. **Unidirectional Import Rule:** `backend/src/modules/master-data/` MUST NEVER import from `backend/src/modules/sales/` or `finance/`.
2. **Event-Driven Coupling:** When an upstream event in a lower module (e.g. Sales Booking created) needs to notify a downstream module (e.g. Finance Demand Generation), it must publish a domain event via `Shared Events` rather than invoking downstream code directly.
3. **Frontend Import Isolation:** A frontend module component under `frontend/src/modules/crm/` must never import internal components directly from `frontend/src/modules/sales/components/`.
