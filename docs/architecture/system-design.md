# System Architecture v3.0 — KidWorksheets

> **Document Type:** Architecture Overview
> **Version:** 3.0 (Updated 2026-07-23 — Session 2 requirements)
> **Previous Version:** 2.0

---

## Architecture Overview

KidWorksheets uses a **microservices backend** served through **AWS API Gateway**, with a **micro-frontend mobile app** built in React Native (Expo). The platform is designed so any single service or module can fail without bringing down the whole app.

---

## Full Architecture Diagram

```
┌────────────────────────────────────────────────────────────────────────────────┐
│                              CLIENT LAYER                                       │
│                                                                                 │
│  ┌──────────────────────────────────────────────────┐                          │
│  │         Mobile App (React Native + Expo)          │                          │
│  │              MICRO-FRONTEND MODULES               │                          │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────────────┐ │                          │
│  │  │Auth Mod. │ │Worksheet │ │  Player Module   │ │                          │
│  │  │          │ │ Browser  │ │                  │ │                          │
│  │  └──────────┘ └──────────┘ └──────────────────┘ │                          │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────────────┐ │                          │
│  │  │Creation  │ │Progress  │ │  Child Module    │ │                          │
│  │  │ Module   │ │ Module   │ │                  │ │                          │
│  │  └──────────┘ └──────────┘ └──────────────────┘ │                          │
│  └──────────────────────────────────────────────────┘                          │
│                                                                                 │
│  ┌────────────────────────────┐                                                 │
│  │  Admin Web Panel (Next.js) │                                                 │
│  └────────────────────────────┘                                                 │
└─────────────────────────────────────┬──────────────────────────────────────────┘
                                      │ HTTPS
┌─────────────────────────────────────▼──────────────────────────────────────────┐
│                         AWS API GATEWAY                                         │
│            Rate Limiting | Auth Middleware | CORS | Routing | Logging           │
│         Routes to correct microservice based on path prefix                     │
└──────────┬──────────┬──────────┬──────────┬──────────┬──────────┬─────────────┘
           │          │          │          │          │          │
    /auth  │  /ws     │  /prog   │  /share  │  /files  │  /notif  │  /admin
           │          │          │          │          │          │
┌──────────▼──┐ ┌─────▼──────┐ ┌▼─────────┐ ┌────────▼──┐ ┌─────▼───────────┐
│ Auth Service│ │ Worksheet  │ │ Progress │ │Share Svc  │ │ Notification   │
│ Express.js  │ │ Service    │ │ Service  │ │ Express.js│ │ Service        │
│             │ │ .NET Core  │ │ .NET Core│ │           │ │ Express.js     │
└──────┬──────┘ └─────┬──────┘ └────┬─────┘ └────┬──────┘ └───────┬─────────┘
       │              │             │             │                │
       │         ┌────▼─────┐  ┌───▼─────┐  ┌───▼──────────┐    │
       │         │ File Svc │  │Admin Svc│  │ AI/Auto Svc  │    │
       │         │ Express  │  │.NET Core│  │ n8n + GCloud │    │
       │         └────┬─────┘  └───┬─────┘  └───┬──────────┘    │
       │              │             │             │                │
└──────┴──────────────┴─────────────┴─────────────┴────────────────┴─────────────┐
│                              DATA & INFRA LAYER                                  │
│                                                                                  │
│  ┌─────────────────┐  ┌────────────┐  ┌──────────┐  ┌──────────┐  ┌─────────┐ │
│  │ Supabase        │  │  MySQL     │  │  Redis   │  │  AWS S3  │  │Firebase │ │
│  │ (PostgreSQL)    │  │  (Linux)   │  │  (Linux) │  │ + CDN    │  │Auth+FCM │ │
│  │ Core app data   │  │ Admin data │  │  Cache   │  │  Files   │  │         │ │
│  │ Worksheets      │  │ n8n data   │  │  Sessions│  │          │  │         │ │
│  │ Users, Progress │  │ Analytics  │  │          │  │          │  │         │ │
│  └─────────────────┘  └────────────┘  └──────────┘  └──────────┘  └─────────┘ │
│                                                                                  │
│  ┌─────────────────────────────────────────────────────────────────────────┐    │
│  │              OBSERVABILITY (Linux server)                                │    │
│  │  Loki (logs) + OpenTelemetry (traces) + Prometheus (metrics) + Grafana  │    │
│  └─────────────────────────────────────────────────────────────────────────┘    │
│                                                                                  │
│  ┌──────────────────────────────────────────┐                                   │
│  │  AWS SQS — Async Job Queue               │                                   │
│  │  PDF generation, batch notifications     │                                   │
│  └──────────────────────────────────────────┘                                   │
└──────────────────────────────────────────────────────────────────────────────────┘
```

---

## Microservices Breakdown

### 1. Auth Service (Express.js + TypeScript)
- **Route prefix:** `/api/auth/`
- **Tech:** Node.js 20 + Express.js + Firebase Admin SDK
- **Database:** Supabase (users table)
- **Responsibilities:**
  - Firebase ID token verification
  - JWT access + refresh token issuance
  - User profile CRUD
  - Child PIN verification + child session tokens
- **Why Express:** Firebase Admin SDK most mature in Node.js

---

### 2. Worksheet Service (.NET Core + C#)
- **Route prefix:** `/api/worksheets/`, `/api/classes/`, `/api/subjects/`
- **Tech:** .NET 8 + Entity Framework + Supabase PostgreSQL
- **Database:** Supabase (worksheets, questions, classes, subjects)
- **Responsibilities:**
  - Worksheet CRUD (create, read, update, delete, archive)
  - Question management (all types)
  - Filtering by class, subject, type, difficulty, language, status
  - Public worksheet listing (admin-approved)
  - Bookmarks
- **Why .NET Core:** Complex filtering queries, high-performance reads, LINQ for advanced querying

---

### 3. Progress Service (.NET Core + C#)
- **Route prefix:** `/api/progress/`, `/api/submissions/`, `/api/assignments/`
- **Tech:** .NET 8 + Entity Framework + Supabase PostgreSQL
- **Database:** Supabase (submissions, assignments, progress)
- **Responsibilities:**
  - Assignment management (mentor assigns to child)
  - Submission recording (answers auto-saved)
  - Score calculation (marks, percentage)
  - Progress analytics (per child, per subject, streaks)
  - Badge award logic
- **Why .NET Core:** Computation-heavy scoring, complex aggregation queries

---

### 4. AI/Automation Service (n8n + Google Cloud Functions)
- **Route prefix:** `/api/ai/`
- **Tech:** n8n workflows (Linux server) + Firebase Cloud Functions + Gemini API
- **Database:** MySQL (Linux, n8n metadata), Supabase (save results)
- **Responsibilities:**
  - Worksheet generation from mentor prompt
  - Image analysis (extract questions from uploaded homework image)
  - Short-answer scoring and feedback
  - Worksheet quality check before publish
- **Flow:** Client → API Gateway → n8n webhook → Gemini API → structured result → Supabase
- **Why n8n:** Visual workflow editor, no custom AI code, realtime processing, easy to modify workflows

---

### 5. Share Service (Express.js + TypeScript)
- **Route prefix:** `/api/share/`
- **Tech:** Node.js + Express.js + googleapis + Firebase Dynamic Links
- **Responsibilities:**
  - PDF generation trigger (sends to SQS queue)
  - Google Drive upload + link return
  - Firebase Dynamic Link generation
- **Why Express:** Google Drive and Dynamic Links SDKs best in Node

---

### 6. File Service (Express.js + TypeScript)
- **Route prefix:** `/api/files/`
- **Tech:** Node.js + Express.js + AWS SDK v3
- **Responsibilities:**
  - Generate S3 pre-signed upload URLs
  - Generate S3 pre-signed download URLs (time-limited)
  - Delete files from S3
  - Validate file types and sizes
- **Storage:** AWS S3 + CloudFront CDN

---

### 7. Notification Service (Express.js + TypeScript)
- **Route prefix:** `/api/notifications/`
- **Tech:** Node.js + Express.js + Firebase Admin (FCM) + Apple APNS
- **Database:** Supabase (notification records)
- **Responsibilities:**
  - Register/update FCM tokens
  - Send push notifications via FCM (Android + iOS via APNS bridge)
  - In-app notification CRUD
  - Batch notifications via SQS

---

### 8. Admin Service (.NET Core + C#)
- **Route prefix:** `/api/admin/`
- **Tech:** .NET 8 + MySQL (Linux server)
- **Database:** MySQL for analytics; Supabase for worksheet moderation
- **Responsibilities:**
  - Worksheet approval/rejection
  - User management
  - Platform analytics (DAU, MAU, top subjects)
  - Content management (classes, subjects seed data)
- **Why .NET Core + MySQL:** Analytics-heavy reporting, fast aggregations on MySQL

---

## Infrastructure Map

| Resource | Provider | Purpose |
|---|---|---|
| API Gateway | AWS | Routing, rate limiting, auth middleware |
| File Storage | AWS S3 | Worksheets, images, audio files |
| CDN | AWS CloudFront | Fast S3 file delivery globally |
| Job Queue | AWS SQS | PDF generation, batch push notifications |
| Primary DB | Supabase (PostgreSQL) | Core app data |
| Analytics DB | MySQL (Linux server) | Admin analytics, n8n |
| Cache | Redis (Linux server) | Sessions, hot data, API cache |
| Auth | Firebase (Google Cloud) | Google/Apple OAuth, JWT |
| Push Notifications | FCM + Apple APNS | Push notifications |
| AI Workflows | n8n (Linux server) | Worksheet AI automation |
| AI Model | Gemini API (Google Cloud) | Text + vision AI |
| AI Functions | Firebase Cloud Functions | Server-side AI invocation |
| App Backend | Linux server (PM2) | Microservices process manager |
| Admin Panel | Linux server | Next.js admin web app |
| Monitoring | Linux server | Grafana + Loki + Prometheus + OTel |

---

## Observability Stack (Open Source)

### Tools
| Tool | Role |
|---|---|
| **Loki** | Log aggregation (replaces CloudWatch logs) |
| **OpenTelemetry (OTel)** | Distributed tracing + metrics instrumentation |
| **Prometheus** | Metrics scraping + alerting rules |
| **Grafana** | Unified dashboard — logs, traces, metrics |

### What's Monitored
| Metric | Tool |
|---|---|
| API latency per service | OTel + Grafana |
| Error rates (4xx, 5xx) per service | OTel + Grafana |
| Request volume per endpoint | OTel + Grafana |
| CPU + Memory per server | Prometheus node_exporter + Grafana |
| Database query performance | OTel + Grafana |
| Redis hit/miss rate | Prometheus Redis exporter |
| SQS queue depth | OTel + Grafana |
| Push notification delivery rate | Grafana |
| App crash rate | OTel (mobile instrumentation) |
| Downtime alerts | Grafana alerting → Email/Slack |

### Log Structure (Loki)
Every service logs in structured JSON:
```json
{
  "timestamp": "2026-07-23T10:00:00Z",
  "service": "worksheet-service",
  "level": "INFO",
  "traceId": "abc123",
  "userId": "user_xyz",
  "action": "GET_WORKSHEET",
  "duration_ms": 45,
  "status": 200
}
```

---

## Micro-Frontend Architecture (Mobile)

Each module is an independent React Native feature module with:
- Its own navigation stack
- Its own state store (Zustand slice)
- Its own API client (TanStack Query)
- Its own error boundary

```
App Shell (Expo Router root layout)
├── AuthModule          → /auth/*
├── WorksheetBrowserModule → /worksheets/*
├── WorksheetPlayerModule  → /play/*
├── CreationModule      → /create/*
├── ProgressModule      → /progress/*
├── ChildModule         → /child/*
├── SettingsModule      → /settings/*
└── NotificationModule  → /notifications/*
```

If `CreationModule` throws an error → Error boundary catches it → Only that module shows error screen → Rest of app continues normally.

---

## n8n AI Workflow Details

### Workflow 1: Worksheet Generation
```
Trigger: POST /api/ai/generate (from API Gateway)
    │
    ▼
n8n Webhook receives: { classId, subjectId, difficulty, language, prompt, questionTypes, count }
    │
    ▼
n8n → HTTP Request → Gemini API (structured JSON prompt)
    │
    ▼
n8n → Parse JSON response (validate structure)
    │
    ▼
n8n → Save to Supabase (Worksheet + Questions as DRAFT)
    │
    ▼
n8n → Return worksheetId to caller
```

### Workflow 2: Image → Worksheet
```
Trigger: POST /api/ai/analyze-image
    │
    ▼
n8n Webhook receives: { s3ImageUrl, classId, subjectId, mentorId }
    │
    ▼
n8n → Download image from S3 pre-signed URL
    │
    ▼
n8n → Gemini Vision API: "Extract questions from this homework sheet"
    │
    ▼
n8n → Parse + structure questions
    │
    ▼
n8n → Save as IMAGE_BASED Worksheet in Supabase
    │
    ▼
n8n → Notify mentor via FCM: "Your worksheet is ready!"
```

### Workflow 3: Auto-Scoring (Short Answer)
```
Trigger: POST /api/ai/score-answer (from Progress Service)
    │
    ▼
n8n receives: { question, expectedAnswer, childAnswer, marks }
    │
    ▼
n8n → Gemini API: evaluate correctness + give feedback
    │
    ▼
n8n → Returns: { isCorrect, marksAwarded, feedback }
    │
    ▼
n8n → Updates AnswerDetail in Supabase
```

---

## Deployment Architecture (Linux Server)

```
Linux Server
├── /apps/
│   ├── auth-service/        → PM2 process: auth-svc (port 3001)
│   ├── share-service/       → PM2 process: share-svc (port 3002)
│   ├── file-service/        → PM2 process: file-svc (port 3003)
│   ├── notification-service/→ PM2 process: notif-svc (port 3004)
│   ├── worksheet-service/   → PM2 process: ws-svc (port 5001, .NET)
│   ├── progress-service/    → PM2 process: prog-svc (port 5002, .NET)
│   ├── admin-service/       → PM2 process: admin-svc (port 5003, .NET)
│   └── admin-panel/         → PM2 process: admin-web (port 3000, Next.js)
├── /data/
│   ├── redis/               → Redis server (port 6379)
│   └── mysql/               → MySQL server (port 3306)
├── /monitoring/
│   ├── grafana/             → Grafana (port 3100)
│   ├── loki/                → Loki (port 3101)
│   └── prometheus/          → Prometheus (port 9090)
└── /n8n/                    → n8n (port 5678)
```

---

## Caching Strategy (Redis — Linux Server)

| Cache Key | TTL | Service |
|---|---|---|
| `session:{userId}` | 15 min | Auth Service |
| `child_session:{childId}` | 4 hours | Auth Service |
| `worksheets:list:{classId}:{subjectId}` | 10 min | Worksheet Service |
| `worksheet:{id}` | 15 min | Worksheet Service |
| `classes:all` | 1 hour | Worksheet Service |
| `subjects:{classId}` | 1 hour | Worksheet Service |
| `progress:{childId}:summary` | 5 min | Progress Service |
| `user:{userId}:profile` | 5 min | Auth Service |

---

## Security Architecture

| Layer | Security Measure |
|---|---|
| API Gateway | Rate limiting (100 req/min/user), WAF rules |
| Auth | Firebase ID token → JWT (15m access + 7d refresh) |
| Token storage (mobile) | expo-secure-store → iOS Keychain / Android Keystore |
| Child PIN | bcrypt hash (cost 12) — never in plaintext |
| File access | S3 pre-signed URLs (15-min expiry) |
| DB access | Supabase Row Level Security (RLS) |
| Transport | TLS 1.3 on all connections |
| Secrets | Environment variables on Linux server (not in code) |
| AI access | Zero direct client → AI calls; all via n8n server-side |

---

## Expo Testing Strategy
1. **Phase 0–5:** Test exclusively via **Expo Go** on physical devices
2. **Phase 6:** Expo Go + QA device matrix
3. **Phase 7–8:** EAS Preview build → TestFlight (iOS) / Internal Track (Android)
4. **v1.0.0:** EAS Production build → App Store + Play Store

---

*Architecture Version: 3.0 | Updated: 2026-07-23*
