# Backend Development Implementation Plan: Apex Construction ERP

This document outlines the comprehensive backend development plan to support the Apex Construction ERP frontend. The system is designed as a Multi-Tenant, Modular Node.js (Express) Monolith using TypeScript and MongoDB.

## User Review Required

> [!IMPORTANT]
> Please review this document carefully to ensure all desired features from the frontend design are covered. Once you approve this plan, I will begin implementing the backend schemas and APIs module by module.

## Architecture Overview

The backend will follow a Domain-Driven Design (DDD) inspired modular monolith architecture.
- **Technology Stack**: Node.js, Express.js, TypeScript
- **Database**: MongoDB (via Mongoose ODMs)
- **Authentication**: JWT (JSON Web Tokens) with sliding sessions
- **Tenancy Model**: Logical isolation via `tenantId` indexed on every collection.
- **Data Validation**: Zod schemas for strict payload validation.

## Module Implementation Plan

We will build the backend by implementing the following major domains matching the frontend structure. 

---

### 1. Core Platform & Master Data
*The foundational layer that holds the system structure.*

- **Tenant & Licensing API**: Tenant onboarding, module subscription (`checkModuleLicense`).
- **User & RBAC API**: User provisioning, dynamic roles (`permissions`), sessions.
- **Hierarchy API**: `Company` -> `Project` -> `Building/Tower` -> `Floor` -> `Unit` (Flat/Shop).
- **Global Settings API**: Tax configurations (GST), payment modes, bank registries, global complaint categories.

### 2. CRM & Lead Management

- **Leads API**: Capture inquiries, status tracking (New, Hot, Warm, Cold).
- **Interactions API**: Log calls, follow-ups, and site visits.
- **Pipeline API**: Deal stage tracking.
- **Targets API**: Sales executive targets and performance tracking.

### 3. Sales & Bookings

- **Booking Engine API**: Unit reservation logic, blocking available units.
- **Payment Plans API**: Construction-linked or time-linked installment schedules.
- **Demands & Receipts API**: Generating demand letters and logging payment receipts.
- **Agreements & Possession API**: Tracking agreement signing and unit handover workflows.

### 4. Customer Management

- **Customer Profile API**: KYC documents, co-applicant, and nominee details.
- **Helpdesk API**: Customer portal ticket management.
- **Document NOC API**: Issuing No-Objection Certificates and generating demand notices.

### 5. Rental Management

- **Owner Directory API**: Managing property owners vs. active tenants.
- **Lease API**: Rental agreements, start/end dates, renewals.
- **Rent Collection API**: Monthly rent generation, collection, and owner settlement calculations.
- **Vacancies API**: Tracking unoccupied ready units.

### 6. Maintenance & Facilities

- **Complaints API**: Ticketing system for facility issues (plumbing, electrical, etc.).
- **Service Request API**: Special service requests from residents.
- **Vendor Assignment API**: Assigning complaints to internal staff or external vendors.
- **Maintenance Billing API**: Common Area Maintenance (CAM) invoicing.

### 7. Inventory & Materials

- **Catalog API**: Raw material item master (Cement, Steel, Bricks, etc.).
- **Warehouse API**: Tracking stock across multiple project sites.
- **GRN API**: Goods Receipt Notes logging stock inwards.
- **Stock Issue API**: Material consumption against specific project activities.

### 8. Procurement & Purchasing

- **Requisition API**: Site engineer material requests.
- **RFQ & Quotation API**: Requesting and comparing vendor quotes.
- **Purchase Order (PO) API**: Generating POs for approved quotations.
- **Invoicing API**: Vendor bill processing and linking to GRN.

### 9. Finance & Accounts

- **Chart of Accounts (CoA) API**: Standard ledger heads.
- **Voucher API**: Journal, Payment, Receipt, and Contra entries.
- **AP/AR API**: Accounts Payable (Vendors) and Accounts Receivable (Customers).
- **Bank Reconciliation API**: Matching system entries with bank statements.

### 10. HR & Payroll

- **Employee Directory API**: Staff records and document vaults.
- **Attendance API**: Bio-metric integration endpoints or manual shifts tracking.
- **Leave API**: Leave applications and approval workflows.
- **Payroll API**: Monthly salary generation, deductions, and payslips.

### 11. Document Management & Reports

- **S3/Blob Storage Integration**: Centralized file uploads (Legal docs, architectural plans, KYC).
- **Reporting Engine**: Dynamic aggregation pipelines for Dashboard metrics, Sales Reports, and Financial Statements.
- **Audit Logging API**: Tracking every mutation (Create/Update/Delete) across the system.

## Proposed Execution Strategy (Next Steps)

If this plan looks complete and accurate, the development will proceed in the following Sprints:

1. **Sprint 1**: Finalize Core Platform (Users, Auth, RBAC, Core Tenant logic).
2. **Sprint 2**: Implement Master Data (Projects, Units, Global Settings).
3. **Sprint 3**: Implement CRM & Sales Modules.
4. **Sprint 4**: Implement Customer & Rental Modules.
5. **Sprint 5**: Implement Inventory & Procurement Modules.
6. **Sprint 6**: Implement HR, Maintenance, and Finance.

## Open Questions

> [!WARNING]
> 1. Are there any specific Third-Party Integrations required immediately for the backend? (e.g., AWS S3 for document storage, Twilio/Msg91 for SMS notifications, Razorpay/Stripe for payment gateways?)
> 2. For the database, is MongoDB the strictly preferred database for this project, or should we consider PostgreSQL for strict ACID compliance given the heavy financial and inventory transactions? (The current scaffold is set up for MongoDB via Mongoose).
