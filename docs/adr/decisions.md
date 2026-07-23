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

# ADR-007: Payments Provider

> **Status:** Accepted (implementation deferred to Phase 2+)
> **Date:** 2026-07-23

## Decision

**Razorpay** for subscription billing.

## Rationale

- User's explicit requirement
- India-first payment provider — UPI, cards, netbanking, wallets
- Supports recurring subscriptions natively
- React Native SDK available: `react-native-razorpay`
- Note: In Phase 1, subscription features are wired but inactive (all content free)

> ⚠️ **App Store Note:** Apple requires in-app purchases for digital content subscriptions to go through Apple's IAP system (30% commission). Android has more flexibility. This needs legal/business review before Phase 8.
