# KidWorksheets — Enterprise App: Final Implementation Plan v4.0

> **Architect Mode:** Senior Architect | 13+ Year Experience
> **Platform:** React Native (Expo) + Microservices Backend (Express.js + .NET Core) + AWS + Linux
> **Target:** iOS App Store + Google Play Store + Web Admin Panel
> **Status:** ✅ v4.0 — Updated per Session 3 — Pending Final Approval

---

## Vision Statement

**KidWorksheets** is a full-stack, multi-role, production-grade educational platform where:
- **Mentors** (Parents + Teachers / Coaching Centers) create their own classes, subjects, and interactive worksheets; enroll students with full CRM profiles; and track progress.
- **Students (Children)** access their personalized worksheets via a PIN-based profile under their mentor's account.
- **Admins** have full visibility and control over all mentor/student content, can edit anything, and can promote mentor-created classes/subjects as **Public** for discovery by others.

The platform supports **interactive Q&A (Written)** and **oral revision** worksheets, with **manual creation**, **AI-assisted generation**, and **image-based recreation**, **offline access**, **bilingual support** (English + Hindi), and a **freemium model** powered by **Razorpay**.

---

## Confirmed Requirements (v4.0)

| Area | Decision |
|---|---|
| **Subjects** | All subjects for Pre-Primary → Class 5 (and beyond). Mentor creates freely. |
| **Worksheet Types** | Written (Interactive Q&A) \| Oral (audio revision) |
| **Worksheet Creation** | Manual (typing or handwriting) \| AI-assisted (prompt) \| Image upload (AI recreation) |
| **Question Types** | MCQ, Fill in the Blank, True/False, Match the Following, Short Answer |
| **Writing Styles** | 10 options: Textbox, 4/3/2/1 Lines (Straight + Dotted), Grid, Blank Canvas |
| **Child Response Modes** | Typing (keyboard) \| Writing (finger on lined canvas) \| Drawing (blank canvas) |
| **Mentor Input Modes** | Typing (keyboard in form) \| Writing (finger draw in question field) |
| **Difficulty Level** | EASY / MEDIUM / HARD — on Manual + AI worksheets only |
| **Roles** | Mentor (Parent/Teacher), Student (PIN-based), Admin (web panel only) |
| **Class Ownership** | Mentor creates own classes (free-text name). Admin can mark public. |
| **Subject Ownership** | Mentor creates own subjects per class. Admin can mark public. |
| **Public Content** | Admin promotes mentor classes/subjects to Public → visible in all dashboards |
| **Student Profile** | Full CRM: name, parents, contacts, DOB, school, fees, photo, notes |
| **Student Login** | Select profile → PIN entry (sub-profile under mentor) |
| **Multi-Subject Enrollment** | Student enrolled in specific subjects per class (not all) |
| **Business Model** | Freemium — all free in Phase 1. Razorpay stub for future. |
| **Ads** | None |
| **Backend** | Node.js + Express (Auth/Share/File/Notif) + .NET Core (Worksheet/Progress/Admin) |
| **Database** | Supabase (PostgreSQL) via Prisma ORM |
| **Storage** | AWS S3 (files) + CloudFront (CDN) |
| **Offline** | WatermelonDB + TanStack Query cache + expo-file-system |
| **Languages** | English + Hindi |
| **Progress Tracking** | Per student, per worksheet, per subject |
| **Admin Dashboard** | Full access — Next.js web panel (before go-live) |
| **Push Notifications** | Firebase Cloud Messaging (FCM) |
| **AI (server-side only)** | n8n + Gemini API — zero client AI access |
| **Grading** | Auto-grade MCQ/TF/Match/FillBlank. Manual for Short Answer + Writing/Drawing |

---

## System Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                                  │
│  ┌─────────────────────────────┐   ┌────────────────────────────┐   │
│  │   Mobile App (iOS/Android)  │   │  Admin Web Panel (Next.js) │   │
│  │   React Native + Expo       │   │  Full CMS + Analytics      │   │
│  └──────────────┬──────────────┘   └──────────────┬─────────────┘   │
└─────────────────┼────────────────────────────────┼─────────────────┘
                  │ HTTPS / WSS                     │ HTTPS
┌─────────────────▼────────────────────────────────▼─────────────────┐
│                     API GATEWAY (AWS API Gateway)                    │
│           Rate Limiting | Auth Middleware | CORS | Logging           │
└─────────────────────────────┬───────────────────────────────────────┘
                              │
┌─────────────────────────────▼───────────────────────────────────────┐
│                    MICROSERVICES (Node.js + .NET Core)               │
│  AuthService | WorksheetService | AIService | ShareService           │
│  ProgressService | StudentService | NotificationService | AdminService│
└────────────────────────────┬────────────────────────────────────────┘
                             │
┌────────────────────────────▼────────────────────────────────────────┐
│  Supabase (PostgreSQL/Prisma) | Redis | AWS S3 + CloudFront | Firebase│
│  MySQL (analytics) | n8n (AI workflows) | Grafana + Loki + Prometheus │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Tech Stack

### Mobile (React Native + Expo)
| Layer | Technology |
|---|---|
| Framework | React Native + Expo SDK 52+ |
| Language | TypeScript 5.x (strict) |
| Navigation | Expo Router v4 (file-based) |
| Architecture | Micro-frontends (independent feature modules) |
| State | Zustand + TanStack Query v5 |
| Forms | React Hook Form + Zod |
| Styling | NativeWind v4 |
| Animations | React Native Reanimated v3 + Lottie |
| Auth | Firebase Auth + Google Sign-In + expo-local-authentication |
| Canvas | react-native-skia (worksheet canvas, drawing input) |
| PDF | expo-print + HTML template |
| Offline | WatermelonDB (SQLite) + TanStack Query cache |
| Storage | expo-secure-store (tokens) + expo-file-system (assets) |
| Sharing | expo-sharing + Google Drive API |
| Push Notif. | expo-notifications + FCM + Apple APNS |
| i18n | i18next + react-i18next |
| Analytics | Firebase Analytics |
| Crash | Sentry (mobile only, free tier) |
| AI (client) | ❌ NONE — all AI is server-side via n8n |
| Testing | Jest + RNTL |
| Dev Testing | **Expo Go** (primary), EAS Preview (pre-release) |

### Backend — Microservices
| Service | Technology | Database |
|---|---|---|
| Auth Service | Express.js + TypeScript | Supabase (PostgreSQL) |
| Worksheet Service | .NET Core 8 (C#) | Supabase (PostgreSQL) |
| Student Service | .NET Core 8 (C#) | Supabase (PostgreSQL) |
| Progress Service | .NET Core 8 (C#) | Supabase (PostgreSQL) |
| AI/Automation Service | n8n + Firebase Cloud Functions + Gemini API | MySQL (Linux) |
| Share Service | Express.js + TypeScript | — |
| File Service | Express.js + TypeScript | AWS S3 |
| Notification Service | Express.js + TypeScript | Supabase |
| Admin Service | .NET Core 8 (C#) | MySQL (Linux) |

### Infrastructure
| Resource | Provider | Notes |
|---|---|---|
| API Gateway | AWS API Gateway | Rate limiting, routing |
| File Storage | AWS S3 | Private bucket |
| CDN | AWS CloudFront | S3 delivery |
| Job Queue | AWS SQS | Async AI jobs |
| Primary DB | Supabase (PostgreSQL) | NOT AWS RDS |
| Analytics DB | MySQL (Linux server) | Self-hosted |
| Cache | Redis (Linux server) | Self-hosted |
| Auth + FCM | Firebase (Google Cloud) | |
| AI Workflows | n8n (Linux server) | Server-side AI |
| AI Model | Gemini API (Google Cloud) | Via n8n only |
| Process Manager | PM2 (Linux server) | NOT Docker |
| Monitoring | Grafana + Loki + OTel + Prometheus | Open-source, free |
| Payments | Razorpay (stub Phase 1) | |

### Admin Panel
| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Styling | Tailwind CSS + shadcn/ui |
| Charts | Recharts |
| Auth | Firebase Auth (Admin role only) |

---

## Data Models (Core Entities — v4.0)

### Enums (Updated)
```
UserRole:          MENTOR | ADMIN
WorksheetStyle:    WRITTEN | ORAL
DifficultyLevel:   EASY | MEDIUM | HARD
QuestionType:      MCQ | FILL_BLANK | TRUE_FALSE | MATCH | SHORT_ANSWER
Language:          EN | HI | BILINGUAL
WorksheetStatus:   DRAFT | PUBLISHED | ARCHIVED
Gender:            MALE | FEMALE | OTHER
MentorInputMode:   TYPING | WRITING
ChildResponseMode: TYPING | WRITING | DRAWING

WritingStyle:
  TEXTBOX
  LINES_4_STRAIGHT | LINES_4_DOTTED
  LINES_3_STRAIGHT | LINES_3_DOTTED
  LINES_2_STRAIGHT | LINES_2_DOTTED
  LINES_1_STRAIGHT | LINES_1_DOTTED
  GRID
  BLANK_CANVAS
```

### Core Entities (v4.0)
- **User** — Mentor or Admin (Firebase UID, email, role, plan)
- **MentorClass** — Mentor-owned class (free-text name, mentor-scoped)
- **MentorSubject** — Mentor-owned subject (free-text, belongs to MentorClass, has defaultWritingStyle)
- **Student** — Full CRM profile (name, parents, contacts, DOB, school, fees, photo)
- **StudentEnrollment** — Links Student ↔ MentorClass under a Mentor
- **StudentSubjectAccess** — Which subjects a student is enrolled in (subset of class subjects)
- **Worksheet** — Core content (style=WRITTEN|ORAL, writingStyle, mentorInputMode, childResponseMode)
- **Question** — Part of WRITTEN worksheets (all question types, writingStyleOverride)
- **WorksheetAssignment** — Mentor assigns worksheet to student
- **Submission** — Student's answers + score + time
- **AnswerDetail** — Per-question answer (text or S3 image key for drawing mode)
- **Notification** — In-app + push records
- **Subscription** — Razorpay plan tracking

> Full Prisma schema: see [data-models.md](./architecture/data-models.md)

---

## Authentication Architecture (v4.0)

### Mentor Flows
1. **First Login:** Google Sign-In → Firebase Auth → JWT → Profile Setup → Passkey prompt
2. **Returning (Passkey):** Biometric → Refresh JWT silently → Dashboard
3. **Apple Sign-In:** Required by Apple App Store

### Student (Child) Flow
1. App home: select "Student Login"
2. Mentor selects or finds student profile in their list
3. Student enters 6-digit PIN on secure custom keypad
4. Student session token (4h JWT, student-scoped)
5. Student sees: Classes → Subjects → Worksheets

### Security
- JWT: 15-minute access + 7-day refresh tokens
- Stored: iOS Keychain / Android Keystore (expo-secure-store)
- Student PIN: bcrypt hashed (cost 12) — never stored plain
- S3: pre-signed URLs (15-min expiry)
- Rate limiting: 100 req/min per user

> Full flows: see [auth-flow.md](./architecture/auth-flow.md)

---

## Worksheet Creation — 3 Modes

### Mode 1: Manual Builder (Phase 2)
1. Mentor sets: class, subject, worksheet style (Written/Oral), language, difficulty, writing style
2. Mentor sets: child response mode (Typing/Writing/Drawing)
3. Mentor sets: mentor input mode (Typing/Writing)
4. Mentor adds questions (MCQ/Fill Blank/True-False/Match/Short Answer)
5. Each question field: mentor types OR draws with finger
6. Review → Draft → Publish

### Mode 2: AI-Assisted (Phase 4)
1. Mentor selects: class, subject, difficulty, language, question types, count
2. Mentor writes a prompt: "10 questions about addition for Class 2"
3. Backend → n8n → Gemini API → structured JSON returned
4. Mentor reviews, edits, saves
5. Rate limit: 10 generations/day (free tier)

### Mode 3: Image Upload (Phase 4)
1. Mentor takes photo of physical worksheet (camera) or uploads image
2. Image sent to backend → n8n → Gemini Vision → extracts questions + structure
3. Returns digital worksheet matching the image
4. Mentor reviews and publishes

---

## Design System

### Dual Persona
- **Mentor Mode:** Dark background (`#0F0F1A`), Inter font, professional animations
- **Student Mode:** Warm cream (`#FFF8E7`), Nunito font, bouncy playful animations

### Colors
- Primary: `#6C63FF` (Violet)
- Secondary: `#FF8C42` (Warm Orange)
- Accent: `#43D9A2` (Mint Green)
- Danger: `#FF5C5C`

### Fonts
- Inter (Mentor UI) + Nunito (Student UI) + Hind (Hindi text)

### Writing Style Canvas (react-native-skia)
- Lines rendered as actual SVG paths on canvas
- Dotted lines use dashed path style
- Grid uses SVG grid pattern (configurable cell size)
- Blank canvas = plain bordered rectangle
- All styles render identically in PDF export

> Full system: see [design-system.md](./design/design-system.md)

---

## OOP & Design Patterns

| Pattern | Usage |
|---|---|
| Repository | WorksheetRepo, StudentRepo, ClassRepo, ProgressRepo |
| Service Layer | AuthService, WorksheetService, StudentService, AIService, ShareService |
| Strategy | DriveShare, PDFShare, DeepLinkShare strategies |
| Factory | QuestionFactory (per question type), WritingStyleFactory |
| Observer | Real-time progress, notification triggers |
| Singleton | Firebase App, Prisma Client, Redis Client |
| Decorator | withAuth, withMentorRole, withStudentSession route guards |
| Command | Undo/redo in worksheet builder |
| Builder | WorksheetBuilder (step-by-step wizard) |
| Adapter | FirebaseUserAdapter → app User model |

---

## Sprint Roadmap (v4.0 — 18 Weeks)

| Phase | Topic | Weeks | Doc |
|---|---|---|---|
| 0 | Foundation: Monorepo, AWS, Firebase, CI/CD | 1–2 | [phase-0](./sprints/phase-0-foundation.md) |
| 1 | Auth: Mentor (Google/Apple/Passkey) + Student PIN | 3–4 | [phase-1](./sprints/phase-1-auth.md) |
| 2 | Core Flow: Class → Subject → Manual Worksheet Builder | 5–7 | [phase-2](./sprints/phase-2-core-flow.md) |
| 3 | Student Module: CRM + Enrollment + Student Play Experience | 8–9 | [phase-3](./sprints/phase-3-students.md) |
| 4 | AI Creation: Prompt-based + Image Upload (server-side) | 10–11 | [phase-4](./sprints/phase-4-ai-creation.md) |
| 5 | Progress Tracking + Push Notifications | 12 | [phase-5](./sprints/phase-5-progress-notifications.md) |
| 6 | Sharing: Drive, PDF, Deep Link | 13 | [phase-6](./sprints/phase-6-sharing.md) |
| 7 | i18n (EN+HI) + Accessibility + Polish | 14 | [phase-7](./sprints/phase-7-i18n-polish.md) |
| 8 | Admin Panel (Next.js) | 15–16 | [phase-8](./sprints/phase-8-admin-panel.md) |
| 9 | Production Readiness + Store Submission | 17–18 | [phase-9](./sprints/phase-9-production.md) |

---

## Monorepo Structure

```
KidWorksheets/
├── apps/
│   ├── mobile/          ← React Native (Expo)
│   └── admin/           ← Next.js Admin Panel
├── backend/
│   ├── auth-service/    ← Express.js
│   ├── worksheet-service/ ← .NET Core
│   ├── student-service/ ← .NET Core
│   ├── progress-service/ ← .NET Core
│   ├── ai-service/      ← n8n workflows (config)
│   ├── share-service/   ← Express.js
│   ├── file-service/    ← Express.js
│   ├── notification-service/ ← Express.js
│   └── admin-service/   ← .NET Core
├── packages/
│   ├── shared-types/    ← TypeScript types shared across apps
│   └── shared-utils/    ← Shared utilities
├── docs/
│   ├── DISCUSSION_LOG.md
│   ├── DISCUSSION_LOG_S2.md
│   ├── DISCUSSION_LOG_S3.md
│   ├── architecture/    ← system-design, data-models, auth-flow, share-flow
│   ├── design/          ← design-system, screen-map, design-specifications
│   ├── sprints/         ← phase-0 through phase-9
│   └── adr/             ← Architecture Decision Records (ADR-001 to ADR-015)
├── .github/
│   └── workflows/       ← CI/CD pipelines
├── README.md
└── CHANGELOG.md
```

---

## Screen Count (v4.0)

| Client | Screens |
|---|---|
| Mobile — Unauthenticated | 6 |
| Mobile — Mentor | 35 |
| Mobile — Student | 12 |
| Admin Web Panel | 12 |
| **Total** | **65** |

> Full inventory: see [screen-map.md](./design/screen-map.md)

---

## App Store Compliance

### Apple (iOS)
- Sign In with Apple (required alongside Google Sign-In)
- Privacy Policy URL (required)
- Age Rating: 4+ (children's educational content)
- COPPA compliance (student data handling)

### Google Play (Android)
- Designed for Families program (targeting under 13)
- Data Safety form filled
- Content rating: Everyone / Everyone 10+

---

## Architecture Decision Records

| ADR | Decision |
|---|---|
| ADR-001 | React Native + Expo (cross-platform, Expo Go for dev) |
| ADR-002 | Microservices: Express.js + .NET Core per service |
| ADR-003 | WatermelonDB for offline-first |
| ADR-004 | Gemini API via n8n (server-side only) |
| ADR-005 | 3-strategy sharing (Drive + PDF + Deep Link) |
| ADR-006 | Zustand + TanStack Query (no Redux) |
| ADR-007 | Razorpay (India-first, UPI + cards) |
| ADR-008 | Supabase (PostgreSQL) — NOT AWS RDS |
| ADR-009 | Linux server for Redis, MySQL, n8n, admin, monitoring |
| ADR-010 | Grafana + Loki + OTel + Prometheus (open-source observability) |
| ADR-011 | Micro-frontend mobile architecture |
| ADR-012 | No Docker — PM2 process manager |
| ADR-013 | Mentor-owned Classes & Subjects (not admin-seeded) |
| ADR-014 | react-native-skia for worksheet canvas (writing + drawing) |
| ADR-015 | Student as sub-profile under Mentor (PIN-based, no independent login) |

> Full reasoning: see [adr/decisions.md](./adr/decisions.md)

---

*Plan Version: 4.0 | Created: 2026-07-23 | Updated: 2026-07-24 (Session 3) | Status: ✅ v4.0 In Progress*
