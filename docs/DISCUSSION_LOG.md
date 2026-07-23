# Project Discussion Log — KidWorksheets

> **Session Date:** 2026-07-23
> **Participants:** Project Owner (sujprogrammer-jpr) + AI Architect (Antigravity)
> **Purpose:** Dream project planning — full requirements gathering and architecture design

---

## Summary

This document captures the complete discussion that led to the enterprise architecture plan for the KidWorksheets app. It records every requirement, decision, and clarification made during the planning session.

---

## Part 1: Initial Request

**Owner said:**
> "Do planning for my project concept first and let me know how you will build this app as an overview, feel free to ask any time if you have any doubts and confirm or clear everything before starting. This is my dream project and I want to complete it with all accuracy. Make sure whatever you plan, executes, tasks list, task phases, sprints, logics must be recorded for future reference or for my project understanding. Manage markdown files by your own, manage skills, design principles, OOPs concepts, design patterns and everything at an enterprise level. Think as a senior architect to design an enterprise/production level app. And build the app as like 13+ year experienced designer, and developer who knows the react native app development along with expo features. Make sure you follow the app building guidelines required to host the app on apple and google play store."

**Core features stated upfront:**
- Parent logs in via Google account
- Parents can create passkeys for fast access
- Parents and children can share the app/worksheets to anyone
- Sharing options: PDF over Drive OR normal PDF OR share worksheet to open inside app
- React Native + Expo
- Enterprise/production level

---

## Part 2: Requirements Q&A

### Q1.1 — Subjects?
**Answer:** Subjects can be anything which is real for pre-primary to 12th and even college students. But this time the focus is pre-primary to Class 5 for all possible subjects. NOT for Art and Drawing this time (may be later).

**Decision recorded:** Subjects = Math, English, Hindi, Science, EVS, GK, and all standard school subjects for Pre-Primary → Class 5. Art/Drawing excluded from Phase 1.

---

### Q1.2 — Who creates worksheets?
**Answer:** Both. Pre-created for selected subjects, OR parents and mentors can create by their own OR with the help of AI OR based on an attached image. Sometimes worksheets can be added for oral communications too which is for oral revisions only and not for writing purpose. (In major cases, worksheets are for writing purpose.)

**Decision recorded:**
- 4 creation modes: Admin pre-created, Mentor manual, AI-assisted, Image-upload (homework scan)
- 3 worksheet types: INTERACTIVE (Q&A), ORAL (audio revision), IMAGE_BASED (homework)

---

### Q1.3 — Worksheet format?
**Answer:** In an interactive in-app exercises with questions & answers mode. But while sharing, app can generate PDF file too to share it via drive link.

**Decision recorded:** Interactive in-app Q&A is primary format. PDF is generated on-demand for sharing only (not stored permanently).

---

### Q1.4 — Difficulty levels?
**Answer:** Yes, there must be a difficulty level enabling feature, but for those worksheets which is created by mentors using AI or by its own. (Not for worksheets created based on attached image, as it is just a homework kind of worksheet.)

**Decision recorded:** Difficulty level (EASY / MEDIUM / HARD) applies only to AI-generated and manually-created worksheets. IMAGE_BASED worksheets have no difficulty level.

---

### Q2.1 — User roles?
**Answer:** Only Mentor (Parent/Teacher) and Child can have app access. Admin can view the tracks, analytics, and keep an eye on each parent and child activity from admin panel built on top of the app but admin work is not required initially. It is required before going live. This time only app is required for mentor and child.

**Decision recorded:**
- 2 app roles: MENTOR (parent or teacher), CHILD (PIN-based)
- Admin panel: separate web app (Next.js), required before go-live but built in Phase 7
- Admin does NOT use the mobile app

---

### Q2.2 — Child accounts?
**Answer:** Admin can select the worksheets created by the mentors for public listing. Based on that there may be public classes for which child can login to start working on public worksheets designed for class subjects. But the app main flow is through mentors. Mentors can create or select class if any exists, then can create or select subjects if any, and can see public worksheets approved by admin for selected class and subjects and even mentors can create by their own as defined earlier. Once worksheets are added, mentors can add as many children and map classes for their children along with child pin, so that child can have access to their child account based on that pin.

**Decision recorded:**
- Child accounts are sub-profiles under mentor's account
- Child login = select profile → enter PIN
- Public worksheets: admin-approved, accessible to all children
- Main flow: Mentor creates class → adds subjects → creates/selects worksheets → adds children → maps classes to children

---

### Q2.3 — Multiple children per parent?
**Answer:** Yes.

**Decision recorded:** One mentor can have unlimited child profiles.

---

### Q2.4 — Separate teacher login?
**Answer:** Yes.

**Decision recorded:** Teachers log in the same way as parents — both are "Mentors". The Mentor role covers both.

---

### Q3.1 — Free/paid/freemium?
**Answer:** Freemium. We will mark some of the features as paid. But this time everything is free in this phase.

**Decision recorded:** Freemium model. All features free in Phase 1. Paywall logic to be added in future phase.

---

### Q3.2 — What's free vs. paid?
**Answer:** Will discuss later.

**Decision recorded:** Deferred. Placeholder in code — subscription check returns `true` (everything unlocked) in Phase 1.

---

### Q3.3 — In-app purchases / subscriptions?
**Answer:** Yes, but this time all these are free. We will integrate Razorpay for this.

**Decision recorded:** Razorpay integration planned. UI scaffolded in Phase 1, payment flow activated in future phase.

---

### Q3.4 — Ads?
**Answer:** No. We will plan it later.

**Decision recorded:** No ads. Ad framework NOT integrated in Phase 1.

---

### Q4.1 — Backend preference?
**Answer:** Firebase, Supabase, PostgreSQL, Node.js, Express.js, API Gateway, Rate Limiting, Redis cache, AWS architecture.

**Decision recorded:** Hybrid AWS stack:
- Firebase: Auth + FCM (push notifications)
- Node.js + Express.js: Custom API server
- PostgreSQL: Primary database (Supabase managed or AWS RDS)
- Redis: Caching layer (AWS ElastiCache)
- AWS API Gateway: Rate limiting, CORS, auth middleware
- All hosted on AWS

---

### Q4.2 — File storage?
**Answer:** AWS S3 and share via Google Drive.

**Decision recorded:**
- AWS S3: Primary file storage (worksheet images, audio, PDFs)
- CloudFront CDN for S3 delivery
- Google Drive API: Used for sharing — files uploaded to user's Drive on-demand

---

### Q4.3 — Offline support?
**Answer:** Yes.

**Decision recorded:** Full offline-first architecture using WatermelonDB (SQLite) + TanStack Query cache + expo-file-system for asset downloads.

---

### Q5 — Design & Branding?
*(Not explicitly answered — designing from scratch)*

**Decision recorded:** Design system created from scratch with:
- Dual persona: Mentor mode (dark, professional) + Child mode (light, playful)
- Primary color: Violet (`#6C63FF`)
- Secondary: Warm Orange (`#FF8C42`)
- Fonts: Inter (mentor) + Nunito (child) + Hind (Hindi)

---

### Q6.1 — Languages?
**Answer:** English and Hindi this time.

**Decision recorded:** i18n with i18next. Two locales: `en.json` + `hi.json`. Hind font for Devanagari script.

---

### Q7.1 — Progress tracking?
**Answer:** Yes.

**Decision recorded:** Full progress tracking — score, percentage, time spent, streaks, stars, badges. Per-child dashboard for mentors.

---

### Q7.2 — Admin dashboard?
**Answer:** Yes.

**Decision recorded:** Next.js admin web panel. Features: worksheet moderation, user analytics, content management, activity monitoring. Required before go-live (Phase 7).

---

### Q8.1 — Push notifications?
**Answer:** Yes.

**Decision recorded:** Firebase Cloud Messaging (FCM) via `expo-notifications`. Events: new worksheet assigned, deadline reminder, new public worksheet, progress milestone.

---

## Part 3: Architecture Decisions Made

| Decision | Choice | Reason |
|---|---|---|
| Mobile framework | React Native + Expo SDK 52+ | Cross-platform, EAS Build, OTA updates |
| Language | TypeScript (strict) | Enterprise safety, IntelliSense |
| Navigation | Expo Router v4 (file-based) | Type-safe, deep linking |
| State | Zustand + TanStack Query v5 | Lightweight local + server state |
| Backend | Node.js + Express.js | User's explicit requirement |
| Database | PostgreSQL (Supabase/RDS) | Relational, complex queries |
| Cache | Redis (ElastiCache) | Performance, session |
| Auth | Firebase Auth + JWT | Google OAuth, Apple OAuth, battle-tested |
| Storage | AWS S3 + CloudFront | Scalable, CDN-backed |
| AI | Google Gemini (primary) + OpenAI (fallback) | Hindi support, structured output |
| Offline | WatermelonDB + TanStack Query | SQLite-based offline-first |
| Sharing | Strategy pattern: Drive + PDF + Deep Link | User's explicit requirement |
| Payments | Razorpay | User's explicit requirement, India-first |
| Admin | Next.js + Tailwind + shadcn/ui | Rapid web dashboard development |
| Analytics | Firebase Analytics + Mixpanel | Free tier + product analytics |
| Crash | Sentry | Production error tracking |
| CI/CD | GitHub Actions + EAS Build + EAS Submit | Automated store deployment |

---

## Part 4: Final Architecture Agreed

```
CLIENT LAYER
├── Mobile App: React Native (Expo) — Mentor + Child
└── Admin Web: Next.js — Admin only

API LAYER
└── AWS API Gateway (rate limiting, auth, CORS)

APPLICATION LAYER (Node.js + Express)
├── AuthService
├── WorksheetService
├── AIService (Gemini/OpenAI)
├── ShareService (Drive + PDF + Deep Link)
├── ProgressService
├── ChildService
├── NotificationService
└── AdminService

DATA LAYER
├── PostgreSQL — primary data (Prisma ORM)
├── Redis — caching
├── AWS S3 + CloudFront — files
└── Firebase — auth tokens + FCM
```

---

## Part 5: Sprint Roadmap Agreed

| Phase | Topic | Weeks |
|---|---|---|
| 0 | Foundation, monorepo, AWS, CI/CD | 1–2 |
| 1 | Auth (Google, Apple, Passkey, Child PIN) | 3–4 |
| 2 | Worksheet core (browse, play, offline) | 5–7 |
| 3 | AI creation + image upload + manual builder | 8–9 |
| 4 | Sharing (Drive, PDF, Deep Link) | 10 |
| 5 | Progress tracking + push notifications | 11 |
| 6 | i18n (EN+HI) + accessibility + polish | 12 |
| 7 | Admin panel (Next.js) | 12–13 |
| 8 | Production readiness + store submission | 13–14 |

---

*Discussion logged: 2026-07-23 | Owner: sujprogrammer-jpr | Version: 1.0*
