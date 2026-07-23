# KidWorksheets — Enterprise App: Final Implementation Plan v3.0

> **Architect Mode:** Senior Architect | 13+ Year Experience
> **Platform:** React Native (Expo) + Microservices Backend (Express.js + .NET Core) + AWS + Linux
> **Target:** iOS App Store + Google Play Store + Web Admin Panel
> **Status:** ✅ v3.0 — Updated per Session 2 requirements — Approved

---

## Vision Statement

**KidWorksheets** is a full-stack, multi-role, production-grade educational platform where:
- **Mentors** (Parents + Teachers) create, assign, and track interactive worksheets for children from Pre-Primary to Class 5.
- **Children** access their personalized learning content via a secure PIN-based profile within the mentor's account.
- **Admins** moderate content, manage public worksheet listings, and monitor platform analytics via a separate web dashboard.

The platform supports **interactive Q&A**, **oral revision**, and **image-based homework** worksheets, with **AI-assisted creation**, **offline access**, **bilingual support** (English + Hindi), and a **freemium business model** powered by **Razorpay**.

---

## Confirmed Requirements

| Area | Decision |
|---|---|
| **Subjects** | All subjects: Math, English, Hindi, Science, EVS, GK, etc. (Pre-Primary → Class 5) |
| **Worksheet Types** | Interactive (Q&A), Oral (audio revision), Image-based (homework scan) |
| **Worksheet Creation** | Admin pre-created + Mentor manual + AI-assisted + Image upload |
| **Difficulty Level** | On AI/Mentor-created only (not image-based) |
| **Roles** | Mentor (Parent/Teacher), Child (PIN-based), Admin (web panel) |
| **Child Access** | PIN-based sub-profile under Mentor account |
| **Multi-Child** | Yes — one Mentor can have unlimited children |
| **Public Worksheets** | Admin-approved worksheets available publicly by class/subject |
| **Business Model** | Freemium (all free in Phase 1) — Razorpay for future subscriptions |
| **Ads** | None |
| **Backend** | Node.js + Express + PostgreSQL + Redis + AWS + Firebase (Auth/FCM) |
| **Storage** | AWS S3 (files) + Google Drive (sharing) |
| **Offline** | Yes — full offline support |
| **Languages** | English + Hindi |
| **Progress Tracking** | Yes — per child, per worksheet |
| **Admin Dashboard** | Yes — separate Next.js web panel (before go-live) |
| **Push Notifications** | Yes — Firebase Cloud Messaging |

---

## System Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                                  │
│  ┌─────────────────────────────┐   ┌────────────────────────────┐   │
│  │   Mobile App (iOS/Android)  │   │  Admin Web Panel (Next.js) │   │
│  │   React Native + Expo       │   │  Analytics + CMS           │   │
│  └──────────────┬──────────────┘   └──────────────┬─────────────┘   │
└─────────────────┼────────────────────────────────┼─────────────────┘
                  │ HTTPS / WSS                     │ HTTPS
┌─────────────────▼────────────────────────────────▼─────────────────┐
│                     API GATEWAY (AWS API Gateway)                    │
│           Rate Limiting | Auth Middleware | CORS | Logging           │
└─────────────────────────────┬───────────────────────────────────────┘
                              │
┌─────────────────────────────▼───────────────────────────────────────┐
│                    APPLICATION LAYER (Node.js + Express.js)          │
│  AuthService | WorksheetService | AIService | ShareService           │
│  ProgressService | ChildService | NotificationService | AdminService  │
└────────────────────────────┬────────────────────────────────────────┘
                             │
┌────────────────────────────▼────────────────────────────────────────┐
│  PostgreSQL (Prisma) | Redis Cache | AWS S3 + CloudFront | Firebase  │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Tech Stack

### Mobile (React Native + Expo) — Micro-Frontend Architecture
| Layer | Technology |
|---|---|
| Framework | React Native + Expo SDK 52+ |
| Language | TypeScript 5.x (strict) |
| Navigation | Expo Router v4 (file-based) |
| Architecture | Micro-frontends (8 independent feature modules) |
| State | Zustand + TanStack Query v5 |
| Forms | React Hook Form + Zod |
| Styling | NativeWind v4 (Tailwind for RN) |
| Animations | React Native Reanimated v3 + **Lottie** (extensive use) |
| Auth | Firebase Auth + Google Sign-In + expo-local-authentication |
| PDF Viewer | react-native-pdf |
| PDF Generator | expo-print + HTML template |
| Offline | WatermelonDB (SQLite) + TanStack Query cache |
| Storage | expo-secure-store (tokens) + expo-file-system (assets) |
| Sharing | expo-sharing + Google Drive API |
| Push Notif. | expo-notifications + FCM + Apple APNS |
| i18n | i18next + react-i18next |
| Analytics | Firebase Analytics |
| Crash | Sentry (free tier) |
| AI (client) | ❌ NONE — all AI is server-side via n8n |
| Testing | Jest + RNTL |
| Dev Testing | **Expo Go** (primary), EAS Preview (pre-release)

### Backend — Microservices
| Service | Technology | Database |
|---|---|---|
| Auth Service | Express.js + TypeScript | Supabase (PostgreSQL) |
| Worksheet Service | **.NET Core 8 (C#)** | Supabase (PostgreSQL) |
| Progress Service | **.NET Core 8 (C#)** | Supabase (PostgreSQL) |
| AI/Automation Service | **n8n + Firebase Cloud Functions + Gemini API** | MySQL (Linux) |
| Share Service | Express.js + TypeScript | — |
| File Service | Express.js + TypeScript | — |
| Notification Service | Express.js + TypeScript | Supabase |
| Admin Service | **.NET Core 8 (C#)** | MySQL (Linux) |

### Infrastructure
| Resource | Provider | Notes |
|---|---|---|
| API Gateway | **AWS API Gateway** | Rate limiting, routing |
| File Storage | **AWS S3** | Private bucket |
| CDN | **AWS CloudFront** | S3 delivery |
| Job Queue | **AWS SQS** | Async jobs |
| Primary DB | **Supabase (PostgreSQL)** | NOT AWS RDS |
| Analytics DB | **MySQL (Linux server)** | Self-hosted |
| Cache | **Redis (Linux server)** | Self-hosted, NOT ElastiCache |
| Auth + FCM | **Firebase (Google Cloud)** | |
| AI Workflows | **n8n (Linux server)** | Server-side AI automation |
| AI Model | **Gemini API (Google Cloud)** | Via n8n/Cloud Functions only |
| Process Manager | **PM2 (Linux server)** | NOT Docker |
| Monitoring | **Grafana + Loki + OTel + Prometheus** | Open-source, free |
| Payments | **Razorpay** (stub in Phase 1) | |

### Admin Panel
| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Styling | Tailwind CSS + shadcn/ui |
| Charts | Recharts |
| Auth | Firebase Auth (Admin role) |

### DevOps
| Tool | Purpose |
|---|---|
| EAS Build | Expo cloud builds |
| EAS Submit | Automated store submission |
| GitHub Actions | CI/CD pipelines |
| Docker | Backend containerization |
| AWS ECS / App Runner | Backend hosting |

---

## Data Models (Core Entities)

### Enums
- `UserRole`: MENTOR | ADMIN
- `WorksheetType`: INTERACTIVE | ORAL | IMAGE_BASED
- `DifficultyLevel`: EASY | MEDIUM | HARD
- `QuestionType`: MCQ | FILL_BLANK | TRUE_FALSE | MATCH | SHORT_ANSWER
- `Language`: EN | HI | BILINGUAL

### Entities
- **User** — Mentor or Admin (Firebase UID, email, role, plan, language)
- **ChildProfile** — Linked to mentor, PIN-protected, avatar
- **ChildClassMapping** — Many-to-many: child ↔ class
- **Class** — Pre-KG, LKG, UKG, Class 1–5
- **Subject** — Math, English, Hindi, Science, EVS, GK, etc.
- **Worksheet** — Core content unit (type, difficulty, status, language)
- **Question** — Part of INTERACTIVE worksheets (all question types)
- **WorksheetAssignment** — Mentor assigns worksheet to child
- **Submission** — Child's answers + score + time spent
- **AnswerDetail** — Per-question child answer record
- **Notification** — In-app + push notification record
- **Subscription** — Razorpay plan tracking

> Full Prisma schema: see [data-models.md](./architecture/data-models.md)

---

## Authentication Architecture

### Mentor Flows
1. **First Login:** Google Sign-In → Firebase Auth → JWT issued → Profile setup → Passkey prompt
2. **Returning with Passkey:** Biometric → Refresh JWT silently → Dashboard
3. **Apple Sign-In:** Required by Apple App Store when Google Sign-In is offered

### Child Flow
Select profile → 6-digit PIN keypad → Child session token (4h) → Kid mode

### Security
- JWT: 15-minute access + 7-day refresh tokens
- Tokens stored: iOS Keychain / Android Keystore via `expo-secure-store`
- Child PIN: bcrypt hashed (cost factor 12) — never stored plain
- S3 files: pre-signed URLs (15-minute expiry)
- Rate limiting: 100 req/min per user

> Full flows: see [auth-flow.md](./architecture/auth-flow.md)

---

## Sharing Module

Three strategies (Strategy Design Pattern):

| Strategy | Flow |
|---|---|
| **Google Drive** | Generate PDF → Upload via Drive API v3 → Return shareable Drive link |
| **PDF File** | Generate PDF locally → expo-sharing → Native OS share sheet |
| **In-App Link** | Firebase Dynamic Link → Opens app to worksheet → Falls back to store |

> Full design: see [share-flow.md](./architecture/share-flow.md)

---

## AI Worksheet Generation

1. Mentor selects: Class + Subject + Difficulty + Language + Question types + Count
2. Optional: uploads reference image for context
3. Sends to backend → Gemini API with structured prompt
4. Returns structured JSON (questions array)
5. Mentor reviews/edits → Saves as Draft → Publishes
6. Rate limit: 10 generations/day (FREE tier)

---

## Design System

### Dual Persona
- **Mentor Mode:** Dark background (`#0F0F1A`), Inter font, subtle animations
- **Child Mode:** Warm cream (`#FFF8E7`), Nunito font, bouncy animations

### Colors
- Primary: `#6C63FF` (Violet)
- Secondary: `#FF8C42` (Warm Orange)
- Accent: `#43D9A2` (Mint Green)
- Danger: `#FF5C5C`

### Fonts
- Inter (Mentor UI) + Nunito (Child UI) + Hind (Hindi text)

> Full system: see [design-system.md](./design/design-system.md)

---

## OOP & Design Patterns

| Pattern | Usage |
|---|---|
| Repository | WorksheetRepository, UserRepository, ProgressRepository |
| Service Layer | AuthService, WorksheetService, ShareService, AIService |
| Strategy | DriveShareStrategy, PDFShareStrategy, DeepLinkStrategy |
| Factory | QuestionFactory, WorksheetFactory |
| Observer | Real-time progress, notification triggers |
| Singleton | Firebase App, Prisma Client, Redis Client |
| Decorator | withAuth, withMentorRole, withChildSession route guards |
| Command | Undo/redo in worksheet builder |
| Builder | WorksheetBuilder (step-by-step creation) |
| Adapter | FirebaseUserAdapter → app User model |

---

## Sprint Roadmap (14 Weeks)

| Phase | Topic | Weeks | Doc |
|---|---|---|---|
| 0 | Foundation, Monorepo, AWS, CI/CD | 1–2 | [phase-0](./sprints/phase-0-foundation.md) |
| 1 | Auth (Google, Apple, Passkey, Child PIN) | 3–4 | [phase-1](./sprints/phase-1-auth.md) |
| 2 | Worksheet Core (browse, play, offline) | 5–7 | [phase-2](./sprints/phase-2-worksheets.md) |
| 3 | AI creation + image upload + builder | 8–9 | [phase-3](./sprints/phase-3-ai-creation.md) |
| 4 | Sharing (Drive, PDF, Deep Link) | 10 | [phase-4](./sprints/phase-4-sharing.md) |
| 5 | Progress tracking + push notifications | 11 | [phase-5](./sprints/phase-5-progress-notifications.md) |
| 6 | i18n (EN+HI) + Accessibility + Polish | 12 | [phase-6](./sprints/phase-6-i18n-polish.md) |
| 7 | Admin Panel (Next.js) | 12–13 | [phase-7](./sprints/phase-7-admin-panel.md) |
| 8 | Production readiness + store submission | 13–14 | [phase-8](./sprints/phase-8-production.md) |

---

## Monorepo Structure

```
KidWorksheets/
├── apps/
│   ├── mobile/          ← React Native (Expo)
│   └── admin/           ← Next.js Admin Panel
├── backend/             ← Node.js + Express API
├── packages/
│   ├── shared-types/    ← TypeScript types shared across apps
│   └── shared-utils/    ← Shared utilities
├── docs/
│   ├── DISCUSSION_LOG.md
│   ├── architecture/    ← system-design, data-models, auth-flow, share-flow
│   ├── design/          ← design-system, screen-map
│   ├── sprints/         ← phase-0 through phase-8
│   └── adr/             ← Architecture Decision Records
├── .github/
│   └── workflows/       ← CI/CD pipelines
├── README.md
└── CHANGELOG.md
```

---

## App Store Compliance

### Apple (iOS)
- Sign In with Apple (required when Google Sign-In is offered)
- Privacy Policy URL (required)
- Age Rating: 4+ (children's content)
- COPPA compliance (child data handling)
- App Tracking Transparency prompt (if tracking used)

### Google Play (Android)
- Designed for Families program (if targeting under 13)
- Data Safety form filled
- Content rating: Everyone / Everyone 10+

---

## Screen Count

| Client | Screens |
|---|---|
| Mobile — Unauthenticated | 6 |
| Mobile — Mentor | 31 |
| Mobile — Child | 12 |
| Admin Web Panel | 9 |
| **Total** | **58** |

> Full inventory: see [screen-map.md](./design/screen-map.md)

---

## Architecture Decisions

| ADR | Decision |
|---|---|
| ADR-001 | React Native + Expo (cross-platform speed, Expo Go for dev) |
| ADR-002 | Microservices: Express.js (Auth/Share/File/Notif) + .NET Core (Worksheet/Progress/Admin) |
| ADR-003 | WatermelonDB for offline-first architecture |
| ADR-004 | Gemini API via n8n — server-side only, zero client AI access |
| ADR-005 | 3-strategy sharing (Drive + PDF + Deep Link) |
| ADR-006 | Zustand + TanStack Query (no Redux) |
| ADR-007 | Razorpay (India-first, UPI + cards + wallets) |
| ADR-008 | Supabase (PostgreSQL) as primary DB — NOT AWS RDS |
| ADR-009 | Linux server for Redis, MySQL, n8n, admin, monitoring |
| ADR-010 | Grafana + Loki + OTel + Prometheus — open-source observability |
| ADR-011 | Micro-frontend mobile architecture — isolated feature modules |
| ADR-012 | No Docker — PM2 process manager on Linux server |

> Full reasoning: see [adr/decisions.md](./adr/decisions.md)

---

*Plan Version: 3.0 | Created: 2026-07-23 | Updated: 2026-07-23 (Session 2) | Status: ✅ Approved*
