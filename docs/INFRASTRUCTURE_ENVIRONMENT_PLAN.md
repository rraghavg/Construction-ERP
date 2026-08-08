# APEX Construction ERP — Infrastructure & Environment Plan

**Document Version:** 1.0  
**Status:** Frozen Architectural Contract  

---

## 1. Target Infrastructure Topology

```text
                                  ┌────────────────────────┐
                                  │   Application Client   │
                                  │ (React 19 / Vite SPA)  │
                                  └───────────┬────────────┘
                                              │
                                              ▼
                                  ┌────────────────────────┐
                                  │   API Gateway / Load   │
                                  │   Balancer (Nginx/ALB) │
                                  └───────────┬────────────┘
                                              │
                                              ▼
                                  ┌────────────────────────┐
                                  │  Express Node.js Monolith│
                                  │   (Multi-Tenant Core)  │
                                  └─┬─────────┬──────────┬─┘
                                    │         │          │
                 ┌──────────────────┘         │          └──────────────────┐
                 ▼                            ▼                             ▼
    ┌────────────────────────┐   ┌────────────────────────┐   ┌────────────────────────┐
    │     MongoDB Cluster    │   │  Redis Cache / Queue   │   │  S3 Object Storage     │
    │ (Authoritative DB)     │   │  (Sessions/Jobs/Limiter)│  │ (KYC/Receipts/Plans)   │
    └────────────────────────┘   └────────────┬───────────┘   └────────────────────────┘
                                              │
                                              ▼
                                 ┌─────────────────────────┐
                                 │ Background Worker Nodes │
                                 │ (PDFs/Emails/Demands)   │
                                 └─────────────────────────┘
```

---

## 2. Infrastructure Layer Specifications

### 2.1 Database Migration Strategy (Memory Server → Production MongoDB)
- **Development & Local QA:** In-memory fallback (`mongodb-memory-server`) automatically initializes when `MONGODB_URI` is unspecified, enabling instant local development without local DB installation.
- **Staging & Production:** `database.ts` connects via Mongoose to an external MongoDB Replica Set specified by `process.env.MONGODB_URI`.
- **Migration Plan:** Mandatory index initialization on server startup via Mongoose schemas; seed script populates default platform roles (`SUPER_ADMIN`, `ADMIN`, `SALES_EXEC`, `FINANCE_MGR`).

### 2.2 Redis Caching & Asynchronous Queueing
- **Session Cache:** Active sessions cached in Redis with TTL matching `JWT_EXPIRATION` (8h).
- **Rate Limiting:** API rate limiting enforced per IP/Tenant using Redis-backed token bucket algorithm.
- **Async Job Queue:** Long-running tasks (demand letter generation, PDF generation, notification delivery) dispatched to Redis queues powered by BullMQ.

### 2.3 Object Storage (S3-Compatible)
- **Bucket Layout:**
  - `apex-tenant-kyc/`: Confidential customer KYC documents and agreement attachments (private, encrypted at rest).
  - `apex-masterdata-assets/`: Public project floor plans, unit brochures, company logos.
- **Upload Flow:** Client requests presigned S3 upload URL from API; direct client-to-S3 upload bypasses Node server.

### 2.4 Observability & Monitoring
- **Structured Logging:** JSON logs with `x-request-id`, `tenantId`, `actorUserId`, and execution latency.
- **Health Checks:**
  - Liveness: `GET /api/v1/health` (HTTP 200)
  - Readiness: `GET /api/v1/qa/dashboard` (Verifies DB connection, Redis status)

---

## 3. Environment Variables Contract

| Variable Name | Environment | Default Value / Target | Description |
|---------------|-------------|-----------------------|-------------|
| `PORT` | All | `3000` | Express server port |
| `NODE_ENV` | All | `development` \| `staging` \| `production` | Execution environment |
| `MONGODB_URI` | Prod / Staging | `mongodb://mongodb:27017/apex-erp` | Authoritative DB connection string |
| `REDIS_URI` | Prod / Staging | `redis://redis:6379` | Cache & Job queue connection string |
| `JWT_SECRET` | All | Change in production | HS256 JWT signature secret |
| `JWT_EXPIRATION` | All | `8h` | Auth token TTL |
| `S3_ENDPOINT` | Prod / Staging | `https://s3.amazonaws.com` | S3-compatible storage endpoint |
| `S3_BUCKET_PRIVATE` | Prod / Staging | `apex-tenant-kyc` | Private storage bucket |
