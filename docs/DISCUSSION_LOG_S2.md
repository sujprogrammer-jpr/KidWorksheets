# Requirements Update Session — 2026-07-23 (Session 2)

> Added to: [DISCUSSION_LOG.md](./DISCUSSION_LOG.md)
> Session: Architecture Refinement after initial plan approval

---

## Updated Decisions

### Infrastructure — What Changed

| Area | Before (Plan v2.0) | After (Plan v3.0) |
|---|---|---|
| **Database** | AWS RDS (PostgreSQL) | **Supabase** (managed PostgreSQL) — NO AWS for DB |
| **Cache** | AWS ElastiCache (Redis) | **Redis on Linux server** (self-hosted) |
| **AI (Server)** | OpenAI / Gemini API | **Google Cloud Functions + Gemini API** — server-side only via **n8n automation** |
| **AI (Client)** | Possible direct calls | **Strictly NO** — zero AI access from client app |
| **Monitoring** | AWS CloudWatch + Sentry | **Loki + OpenTelemetry + Grafana** (open-source, free) |
| **Backend style** | Express.js monolith | **Microservices** — mix of Express.js AND .NET Core per service |
| **Mobile style** | Standard RN modules | **Micro-frontends** — each feature module independent |
| **Hosting (backend)** | AWS ECS / Docker | **Linux server** (admin, n8n, Redis, MySQL) — NO Docker |
| **Deployment** | EAS → direct store | **Expo Go** for testing first, store later |
| **Containerization** | Docker | **None** (Linux server processes) |

### AWS — Reduced Scope (Only These Services)
- ✅ **AWS S3** — file storage (worksheets, images, audio)
- ✅ **AWS CloudFront** — CDN for S3 files
- ✅ **AWS API Gateway** — rate limiting, routing, auth middleware
- ✅ **AWS SQS** — async job queue (PDF generation, notifications)
- ❌ No AWS RDS, ElastiCache, ECS, App Runner, Amplify

### Google Cloud — Expanded Scope
- ✅ **Firebase Auth** — Google/Apple OAuth, JWT
- ✅ **Firebase Cloud Messaging (FCM)** — push notifications (+ Apple APNS)
- ✅ **Firebase Cloud Functions** — server-side AI triggers
- ✅ **Google Gemini API** — AI worksheet generation, image analysis
- ✅ **Google Drive API** — worksheet sharing

### Linux Server — Self-Hosted
- ✅ **Redis** — caching, session management
- ✅ **MySQL** — analytics DB, n8n metadata, admin data
- ✅ **n8n** — AI automation workflows (server-side, realtime)
- ✅ **Admin Panel** — Next.js admin web app hosted here
- ✅ **Backend microservices** — deployed as Linux processes (PM2)

### n8n — AI Automation Platform
n8n runs on the Linux server and handles all AI workflows:
- Worksheet generation from mentor prompt → Gemini API → structured JSON → saved to DB
- Image analysis from uploaded homework → Gemini Vision → extract questions → structured worksheet
- Auto-scoring of short-answer submissions → Gemini → score + feedback
- Worksheet quality check before publishing
- All triggered via webhook from the API services — never from client

### Microservices Architecture
Instead of one Node.js server, split into independent services:
- Each service has its own codebase, deployment, and (possibly) database
- API Gateway routes traffic to correct microservice
- If one service goes down, others continue working

### Micro-frontends (Mobile)
Each feature module in the React Native app is independently developed:
- `AuthModule` — login, onboarding, profile
- `WorksheetBrowserModule` — browse, search, filter
- `WorksheetPlayerModule` — play, submit, results
- `CreationModule` — manual + AI + image builder
- `ProgressModule` — dashboard, charts, badges
- `ChildModule` — child mode entire experience
- `SettingsModule` — settings, subscription, notifications

If the CreationModule crashes, the WorksheetPlayerModule still works.

### Observability Stack (Open Source, Free)
- **Loki** — log aggregation (replaces CloudWatch logs)
- **OpenTelemetry** — distributed tracing, metrics collection
- **Prometheus** — metrics scraping
- **Grafana** — unified dashboard for logs, metrics, traces
- Dashboards: API latency, error rates, server CPU/memory, downtime alerts, request volumes per service

### API Technology Decisions

| Service | Technology | Why |
|---|---|---|
| Auth Service | Express.js | Firebase Admin SDK easiest in Node.js |
| Worksheet Service | .NET Core (C#) | High-performance queries, complex filtering |
| Progress Service | .NET Core (C#) | Computation-heavy scoring logic |
| AI/Automation Service | n8n + Cloud Functions | No custom code; workflow-based |
| Share Service | Express.js | expo-print + Drive API simpler in Node |
| Notification Service | Express.js | FCM SDK best in Node.js |
| File Service | Express.js | AWS S3 SDK well-supported in Node |
| Admin Service | .NET Core (C#) | Analytics + reporting needs performance |

### Database Decisions per Service

| Service | Database | Why |
|---|---|---|
| Users, Children, Classes, Subjects, Worksheets, Questions | **Supabase (PostgreSQL)** | Relational, complex joins |
| Submissions, Progress, Scores | **Supabase (PostgreSQL)** | Relational + RLS for child data |
| Admin analytics, reports | **MySQL (Linux server)** | Fast reads, aggregation |
| n8n workflow data | **MySQL (Linux server)** | n8n default DB |
| Cache (sessions, hot data) | **Redis (Linux server)** | Sub-millisecond reads |

### Lottie — Expanded Role
- Interactive worksheet animations (correct answer celebrations, progress fills)
- Worksheet player transitions between questions
- Child mode idle animations (mascot character)
- Loading states (instead of just skeleton screens)
- Badge unlock sequences

### Design Specifications
A new doc `design-specifications.md` will be created with:
- Full color palette + dark/light mode tokens
- Typography specifications (font sizes, weights, line heights)
- Component-level design specs (dimensions, padding, states)
- Screen-by-screen design requirements
- Reference designs from competitor apps
- Figma/Stitch-ready specifications

### CI/CD & Testing
- GitHub Actions for CI/CD (keep)
- Expo Go for all development testing (not TestFlight initially)
- Store submission only after app fully stable on Expo Go
- Jira for issue tracking (to be integrated later)
- No Docker — PM2 process manager on Linux server

---

*Update logged: 2026-07-23 (Session 2) | Major infrastructure refinement*
