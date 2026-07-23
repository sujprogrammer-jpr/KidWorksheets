# System Architecture — KidWorksheets

> **Document Type:** Architecture Overview
> **Version:** 1.0
> **Last Updated:** 2026-07-23

---

## Overview

KidWorksheets is a **multi-tier, multi-role** educational platform built on a cloud-native architecture. It consists of three client applications backed by a unified API layer on AWS.

---

## Architecture Diagram

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
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌────────────┐ │
│  │  Auth Service│ │Worksheet Svc │ │  Share Svc   │ │Progress Svc│ │
│  └──────────────┘ └──────────────┘ └──────────────┘ └────────────┘ │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌────────────┐ │
│  │  Child Svc   │ │   AI Svc     │ │Notif. Service│ │ Admin Svc  │ │
│  └──────────────┘ └──────────────┘ └──────────────┘ └────────────┘ │
└────────────────────────────┬────────────────────────────────────────┘
                             │
┌────────────────────────────▼────────────────────────────────────────┐
│                        DATA LAYER                                    │
│  ┌──────────────────┐  ┌────────────┐  ┌──────────┐  ┌──────────┐  │
│  │  PostgreSQL       │  │  Redis     │  │  AWS S3  │  │ Firebase │  │
│  │  (AWS RDS /      │  │  Cache     │  │  Storage │  │  Auth +  │  │
│  │   Supabase)      │  │ (ElastiCch)│  │ + CDN    │  │  FCM     │  │
│  └──────────────────┘  └────────────┘  └──────────┘  └──────────┘  │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Services Breakdown

### AuthService
- Verifies Firebase ID tokens on every request
- Issues short-lived JWT (15m) + refresh token (7d)
- Creates/retrieves User records in PostgreSQL
- Handles role assignment (MENTOR / ADMIN)

### WorksheetService
- CRUD for Worksheets, Questions
- Filtering by Class, Subject, Difficulty, Type, Language
- Public worksheet listing (admin-approved only)
- Status management (DRAFT → PUBLISHED → ARCHIVED)

### AIService
- Accepts prompt + class + subject + difficulty
- Calls OpenAI/Gemini API with structured prompt
- Returns JSON with questions array
- Mentor reviews and approves before saving

### ShareService
- **Strategy 1:** PDF generation → AWS S3 upload → Pre-signed URL
- **Strategy 2:** PDF generation → Direct file share via expo-sharing
- **Strategy 3:** Dynamic deep link generation (Firebase Dynamic Links)
- **Strategy 4:** Google Drive upload via Drive API v3

### ProgressService
- Records child's answers for each question
- Calculates score, percentage, time spent
- Updates worksheet assignment status
- Generates progress summaries for mentor dashboard

### NotificationService
- Firebase Cloud Messaging (FCM) integration
- Event triggers: new assignment, deadline reminder, new public worksheet
- Stores notification history in PostgreSQL

### ChildService
- Manages ChildProfile CRUD
- PIN verification (bcrypt compare, never stored in plain text)
- Class-child mapping
- Child session management (separate from Mentor JWT)

### AdminService
- Worksheet moderation (approve/reject for public listing)
- User analytics (DAU, WAU, MAU)
- Content management (seed/manage classes, subjects)
- Subscription management

---

## Caching Strategy (Redis)

| Cache Key Pattern | TTL | Purpose |
|---|---|---|
| `public:worksheets:{class}:{subject}` | 10 min | Public worksheet lists |
| `user:{userId}:profile` | 5 min | User profile data |
| `worksheet:{id}` | 15 min | Worksheet detail |
| `progress:{childId}:{worksheetId}` | 2 min | Live progress |
| `classes:all` | 1 hour | Class list |
| `subjects:{classId}` | 1 hour | Subjects for class |

---

## Offline Strategy (Mobile)

1. **WatermelonDB** — SQLite-based local DB for offline-first data
2. **TanStack Query cache** — API response caching with stale-while-revalidate
3. **expo-file-system** — Downloaded worksheet assets (images, audio)
4. **Sync queue** — Pending progress submissions synced when online
5. **Conflict resolution** — Server wins for content; client wins for progress drafts

---

## Security Architecture

| Layer | Security Measure |
|---|---|
| API Gateway | Rate limiting (100 req/min/user), WAF |
| Auth | Firebase ID token verification + JWT |
| Token storage | iOS Keychain / Android Keystore (never AsyncStorage) |
| Child PIN | bcrypt hash (cost factor 12) |
| File access | S3 pre-signed URLs (15-min expiry) |
| Database | Row-level security (Supabase RLS) / Prisma + service layer |
| Transport | TLS 1.3 everywhere |
| API secrets | AWS Secrets Manager |

---

## Environments

| Environment | Purpose | EAS Profile |
|---|---|---|
| Development | Local dev, hot reload | `development` |
| Staging | QA testing, TestFlight/Internal | `preview` |
| Production | App Store / Play Store | `production` |
