# APEX Construction ERP — Module Ownership Matrix

**Document Version:** 1.0  
**Status:** Frozen Architectural Contract  
**Rule:** Every entity, document schema, and database collection must have **exactly one authoritative owner module**. Cross-module access to an entity must occur via API interfaces, domain events, or reference foreign keys—never direct collection mutation by a non-owner module.

---

## Entity Ownership Table

| Entity / Collection | Authoritative Owner | Tier | Scope Requirements |
|---------------------|---------------------|------|--------------------|
| **Tenant** | Core / Tenant | Core Platform | Global |
| **User** | Core / Users | Core Platform | Tenant Scoped |
| **Session** | Core / Sessions | Core Platform | Tenant & User Scoped |
| **Role** | Core / Roles | Core Platform | Tenant Scoped |
| **ModuleRegistry** | Core / Module Registry | Core Platform | Global |
| **TenantModule** | Core / Entitlements | Core Platform | Tenant Scoped |
| **AuditEvent** | Shared / Audit | Shared Platform | Tenant & User Scoped |
| **ApprovalWorkflow** | Shared / Approval | Shared Platform | Tenant Scoped |
| **ApprovalInstance** | Shared / Approval | Shared Platform | Tenant Scoped |
| **Notification** | Shared / Notifications | Shared Platform | Tenant & User Scoped |
| **Document / Attachment** | Shared / Documents | Shared Platform | Tenant Scoped |
| **Company** | Master Data | Module | Tenant Scoped |
| **Project** | Master Data | Module | Tenant & Company Scoped |
| **Building** | Master Data | Module | Tenant & Project Scoped |
| **Tower** | Master Data | Module | Tenant & Building Scoped |
| **Floor** | Master Data | Module | Tenant & Tower Scoped |
| **Unit** | Master Data | Module | Tenant & Project Scoped |
| **UnitType** | Master Data | Module | Tenant & Project Scoped |
| **Bank / Tax / PaymentMode**| Master Data | Module | Tenant Scoped |
| **Lead** | CRM | Module | Tenant & Project Scoped |
| **FollowUp** | CRM | Module | Tenant & Lead Scoped |
| **SiteVisit** | CRM | Module | Tenant & Lead Scoped |
| **Broker / Dealer** | CRM | Module | Tenant Scoped |
| **Customer** | Customer | Module | Tenant Scoped |
| **KYCDocument** | Customer | Module | Tenant & Customer Scoped |
| **Quotation** | Sales | Module | Tenant & Project Scoped |
| **Reservation** | Sales | Module | Tenant & Project Scoped |
| **Booking** | Sales | Module | Tenant & Project Scoped |
| **PaymentPlan** | Sales | Module | Tenant & Booking Scoped |
| **Agreement / Possession** | Sales | Module | Tenant & Booking Scoped |
| **BankAccount** | Finance | Module | Tenant & Company Scoped |
| **Receipt** | Finance | Module | Tenant & Project Scoped |
| **CustomerLedger** | Finance | Module | Tenant & Customer Scoped |
| **Installment / Demand** | Finance | Module | Tenant & Booking Scoped |
| **Vendor** | Procurement | Module | Tenant Scoped |
| **PurchaseRequest / PO** | Procurement | Module | Tenant & Project Scoped |
| **Material** | Inventory | Module | Tenant Scoped |
| **Store / Warehouse** | Inventory | Module | Tenant & Project Scoped |
| **StockLedger** | Inventory | Module | Tenant & Store Scoped |
| **Employee** | HR | Module | Tenant Scoped |
| **Payroll / Payslip** | HR | Module | Tenant & Employee Scoped |
| **Complaint** | Maintenance | Module | Tenant & Unit Scoped |
| **WorkOrder** | Maintenance | Module | Tenant & Complaint Scoped |
| **Lease / RentSchedule** | Rental | Module | Tenant & Unit Scoped |
| **ReportDefinition** | Reports | Module | Tenant Scoped |

---

## Governance Rules
1. **No Shared Collections:** Two business modules cannot write to the same Mongoose model.
2. **ForeignKey References Only:** Cross-module relationships must store String IDs (e.g. `projectId`, `customerId`, `unitId`), not raw Mongoose object embeddings.
3. **Decoupled User vs Employee:** `User` (Authentication / RBAC identity) and `Employee` (HR record) remain separate entities connected via `userId` foreign reference.
