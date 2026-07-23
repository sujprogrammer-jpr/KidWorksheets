# KidWorksheets

> **A premium educational worksheets app for children Pre-Primary to Class 5**
> Built with React Native (Expo) · Node.js · AWS · Firebase · PostgreSQL

---

## 📱 What is KidWorksheets?

KidWorksheets is a full-stack, multi-role educational platform that empowers **Mentors** (Parents + Teachers) to create, assign, and track interactive worksheets for children. **Children** access their personalized content via a secure PIN, and an **Admin** moderates content via a web panel.

---

## 🧑‍💻 Tech Stack

| Layer | Technology |
|---|---|
| Mobile App | React Native + Expo SDK 52+ (TypeScript) |
| Navigation | Expo Router v4 |
| Backend | Node.js + Express.js |
| Database | PostgreSQL (Prisma ORM) |
| Cache | Redis (AWS ElastiCache) |
| Storage | AWS S3 + CloudFront |
| Auth | Firebase Auth + JWT |
| Push Notifications | Firebase Cloud Messaging |
| Admin Panel | Next.js 15 |
| AI | Google Gemini API |
| Payments | Razorpay (Phase 2+) |
| CI/CD | GitHub Actions + EAS Build |

---

## 👥 User Roles

| Role | Access |
|---|---|
| **Mentor** (Parent/Teacher) | Google Sign-In, creates worksheets, manages children, tracks progress |
| **Child** | PIN-based login, completes worksheets, earns stars/badges |
| **Admin** | Web panel only — moderates content, views analytics |

---

## 📁 Documentation Index

| Document | Description |
|---|---|
| [IMPLEMENTATION_PLAN.md](./docs/IMPLEMENTATION_PLAN.md) | ✅ Full approved architecture plan |
| [DISCUSSION_LOG.md](./docs/DISCUSSION_LOG.md) | Complete requirements Q&A session log |
| [System Design](./docs/architecture/system-design.md) | AWS + Firebase architecture overview |
| [Data Models](./docs/architecture/data-models.md) | Prisma schema + TypeScript types |
| [Auth Flows](./docs/architecture/auth-flow.md) | All authentication flows |
| [Share Module](./docs/architecture/share-flow.md) | Drive + PDF + Deep Link sharing |
| [Design System](./docs/design/design-system.md) | Colors, typography, components |
| [Screen Map](./docs/design/screen-map.md) | All 58 screens inventory |
| [ADR Decisions](./docs/adr/decisions.md) | 7 Architecture Decision Records |
| **Sprint Plans** | |
| [Phase 0 — Foundation](./docs/sprints/phase-0-foundation.md) | Monorepo, AWS, CI/CD setup |
| [Phase 1 — Auth](./docs/sprints/phase-1-auth.md) | Google, Apple, Passkey, Child PIN |
| [Phase 2 — Worksheets](./docs/sprints/phase-2-worksheets.md) | Core worksheet browse & play |
| [Phase 3 — AI Creation](./docs/sprints/phase-3-ai-creation.md) | AI generator + manual builder |
| [Phase 4 — Sharing](./docs/sprints/phase-4-sharing.md) | Drive, PDF, Deep Link sharing |
| [Phase 5 — Progress](./docs/sprints/phase-5-progress-notifications.md) | Tracking + push notifications |
| [Phase 6 — i18n + Polish](./docs/sprints/phase-6-i18n-polish.md) | EN+HI + accessibility + animations |
| [Phase 7 — Admin Panel](./docs/sprints/phase-7-admin-panel.md) | Next.js admin web app |
| [Phase 8 — Production](./docs/sprints/phase-8-production.md) | Store submission + go-live |

---

## 🚦 Project Status

| Phase | Name | Status |
|---|---|---|
| Phase 0 | Foundation & Setup | 🔲 Not Started |
| Phase 1 | Auth & Onboarding | 🔲 Not Started |
| Phase 2 | Worksheet Core | 🔲 Not Started |
| Phase 3 | AI Worksheet Creation | 🔲 Not Started |
| Phase 4 | Sharing Module | 🔲 Not Started |
| Phase 5 | Progress Tracking | 🔲 Not Started |
| Phase 6 | i18n & Polish | 🔲 Not Started |
| Phase 7 | Admin Panel | 🔲 Not Started |
| Phase 8 | Production Readiness | 🔲 Not Started |

---

## 🗺️ Screen Count

- **Mobile (Mentor):** 37 screens
- **Mobile (Child):** 12 screens
- **Admin Web Panel:** 9 screens
- **Total:** 58 screens

---

## 📅 Planned Releases

| Version | Milestone | Target Week |
|---|---|---|
| v0.1.0 | Foundation + Auth | Week 4 |
| v0.2.0 | Worksheet Core | Week 7 |
| v0.3.0 | AI Creation + Sharing | Week 10 |
| v0.4.0 | Progress + Notifications | Week 11 |
| v0.5.0 | i18n + Polish + Admin | Week 13 |
| v1.0.0 | 🚀 Production Release | Week 14 |

---

## 🏗️ Monorepo Structure

```
KidWorksheets/
├── apps/
│   ├── mobile/          ← React Native (Expo)
│   └── admin/           ← Next.js Admin Panel
├── backend/             ← Node.js + Express API
├── packages/
│   ├── shared-types/
│   └── shared-utils/
├── docs/                ← All project documentation
├── .github/workflows/   ← CI/CD pipelines
├── README.md
└── CHANGELOG.md
```

---

*Owner: sujprogrammer-jpr | Started: 2026-07-23 | Stack: React Native + Expo + AWS*
