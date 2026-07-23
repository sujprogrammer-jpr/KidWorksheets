# ADR-001: Technology Stack Selection

> **Status:** Accepted
> **Date:** 2026-07-23
> **Deciders:** Project Architect

## Context

We needed to select the primary technology stack for a multi-platform educational app targeting iOS, Android, and a web admin panel — with a 14-week delivery target.

## Decision

**React Native + Expo SDK 52+** for mobile. **Node.js + Express** for backend.

## Rationale

| Option | Considered? | Reason For/Against |
|---|---|---|
| React Native + Expo | ✅ Chosen | Fastest cross-platform, OTA updates, EAS Build, huge ecosystem |
| Flutter | Considered | Great performance but smaller ecosystem for our specific libs |
| Native iOS + Android | Rejected | 2x development cost, 2x codebase |
| Ionic / Capacitor | Rejected | Inferior performance for interactive worksheet engine |

---

# ADR-002: Backend Architecture

> **Status:** Accepted
> **Date:** 2026-07-23

## Decision

**AWS-hosted Node.js + Express.js + PostgreSQL + Redis** with **Firebase for Auth and FCM only**.

## Rationale

The user explicitly requested: Firebase, Supabase, PostgreSQL, Node.js, Express.js, API Gateway, Rate Limiting, Redis, AWS. This is a hybrid approach:

- **Firebase** handles Auth (battle-tested, Google-managed) and push notifications (FCM)
- **PostgreSQL** (via Supabase managed or AWS RDS) for relational data with complex queries
- **Redis** (AWS ElastiCache) for caching hot data (worksheet lists, user profiles)
- **AWS S3** for file storage with CloudFront CDN
- **AWS API Gateway** for rate limiting, auth middleware, and CORS
- **Node.js + Express** for custom business logic (AI generation, sharing, progress)

---

# ADR-003: Offline Strategy

> **Status:** Accepted
> **Date:** 2026-07-23

## Decision

**WatermelonDB** (SQLite-based) + **TanStack Query persistent cache** for offline-first architecture.

## Rationale

| Requirement | Solution |
|---|---|
| Child uses app without internet | WatermelonDB syncs assigned worksheets locally |
| Progress saved offline | Submission queue saved locally, synced when online |
| Worksheet assets available offline | expo-file-system downloads images/audio to device |
| No data loss on network drop | Optimistic updates + rollback |

WatermelonDB was chosen over AsyncStorage because:
- Handles complex relational data (worksheets, questions, assignments)
- Performant queries on large datasets
- Built-in sync infrastructure

---

# ADR-004: AI Provider

> **Status:** Accepted (To be finalized pre-Phase 3)
> **Date:** 2026-07-23

## Decision

**Google Gemini API** (primary) with **OpenAI GPT-4o** as fallback.

## Rationale

- Gemini supports Hindi language generation natively (critical for bilingual worksheets)
- Gemini API has lower latency for structured JSON output
- Gemini can process uploaded images for context (mentor uploads a reference image)
- OpenAI as fallback for quality comparison during Phase 3 testing
- Both support structured output (function calling / JSON mode) for question generation

---

# ADR-005: Sharing Strategy

> **Status:** Accepted
> **Date:** 2026-07-23

## Decision

Three-strategy approach using **Strategy Design Pattern**: Google Drive Upload, Native PDF Share, Firebase Dynamic Links.

## Rationale

| Strategy | Why |
|---|---|
| Google Drive | User's explicit requirement. Familiar to parents/teachers. |
| PDF Share | Most versatile — works with WhatsApp, Email, Print, etc. |
| Deep Link | Opens app directly — best UX for app-to-app sharing. No login needed for public worksheets. |

PDF generation done client-side via `expo-print` to avoid S3 egress costs for every share action.

---

# ADR-006: State Management

> **Status:** Accepted
> **Date:** 2026-07-23

## Decision

**Zustand** (local/UI state) + **TanStack Query v5** (server state).

## Rationale

| Concern | Solution |
|---|---|
| Server data (worksheets, children, progress) | TanStack Query — handles caching, refetching, optimistic updates |
| Auth state, UI state, child session | Zustand — simple, boilerplate-free, no Redux complexity |
| Offline persistence | TanStack Query + AsyncStorage persister OR WatermelonDB |

Redux Toolkit was rejected due to boilerplate overhead for a mobile project. MobX rejected due to class-based API clashing with functional React patterns.

---

# ADR-008: Primary Database — Supabase over AWS RDS

> **Status:** Accepted
> **Date:** 2026-07-23 (Session 2)

## Decision
**Supabase** (managed PostgreSQL) instead of AWS RDS.

## Rationale
- No AWS costs for database (user explicitly does not want AWS DB/cache)
- Supabase provides PostgreSQL + Row Level Security + real-time subscriptions + built-in REST API
- Free tier is generous for Phase 1
- Supabase Studio: visual DB management (easier than raw psql)
- Prisma ORM works seamlessly with Supabase PostgreSQL
- Can migrate to self-hosted PostgreSQL or AWS RDS later if needed

---

# ADR-009: Self-Hosted Linux Server for Redis, MySQL, n8n

> **Status:** Accepted
> **Date:** 2026-07-23 (Session 2)

## Decision
**Linux server** hosts Redis cache, MySQL (analytics/n8n DB), n8n AI automation, admin panel, and observability.

## Rationale
- No AWS ElastiCache costs (user preference: AWS for S3, CDN, API Gateway, SQS only)
- Full control over Redis configuration and persistence
- n8n is self-hosted by design (n8n Cloud is paid; self-host is free)
- MySQL on Linux is well-understood, low-cost, performant for analytics
- PM2 as process manager: simple, battle-tested, no Docker overhead
- Let's Encrypt SSL: free certificates via Certbot

---

# ADR-010: Observability — Grafana + Loki + OpenTelemetry + Prometheus

> **Status:** Accepted
> **Date:** 2026-07-23 (Session 2)

## Decision
**Open-source observability stack** replacing AWS CloudWatch + Sentry.

## Rationale
- 100% free (open-source tools, self-hosted)
- Grafana is the industry-standard open-source dashboard
- Loki: purpose-built log aggregation, integrates natively with Grafana
- OpenTelemetry: vendor-neutral distributed tracing (CNCF standard)
- Prometheus: de-facto standard for metrics
- Single Grafana dashboard gives: logs + traces + metrics in one place
- Note: Sentry is kept for **mobile crash reporting** only (free tier)

---

# ADR-011: Micro-Frontend Architecture (Mobile)

> **Status:** Accepted
> **Date:** 2026-07-23 (Session 2)

## Decision
Mobile app organized as **8 independent feature modules** (micro-frontends), each with its own error boundary.

## Rationale
- Failure isolation: if Creation module crashes, Player module is unaffected
- Independent development: each module can be developed in parallel
- Easier testing: each module tested in isolation
- Consistent with microservices philosophy on the backend
- Expo Router file-based routing maps cleanly to module folders

---

# ADR-012: No Docker — PM2 on Linux Server

> **Status:** Accepted
> **Date:** 2026-07-23 (Session 2)

## Decision
**PM2** process manager instead of Docker containers.

## Rationale
- User explicitly requested no Docker
- PM2 is simpler to manage for a small-to-medium app
- PM2 handles process restart, logging, clustering, and monitoring
- Lower memory overhead than Docker containers
- No Docker daemon, no image management complexity
- PM2 ecosystem.config.js gives clear visibility of all running services
- Migration to Docker/Kubernetes is possible in future if scale demands it
