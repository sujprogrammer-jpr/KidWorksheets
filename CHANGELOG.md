# CHANGELOG

All notable changes to the KidWorksheets project are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [Unreleased — Planning Complete]

### Added — 2026-07-23 (Planning Session)

#### Project Documentation
- `README.md` — Full project overview with tech stack, roles, screen count, milestones
- `CHANGELOG.md` — Version history and release plan
- `docs/IMPLEMENTATION_PLAN.md` — Complete enterprise implementation plan v2.0 (✅ Approved)
- `docs/DISCUSSION_LOG.md` — Full requirements Q&A session log (all decisions recorded)

#### Architecture Documentation
- `docs/architecture/system-design.md` — AWS + Firebase 4-tier architecture
- `docs/architecture/data-models.md` — Full Prisma schema + TypeScript shared types
- `docs/architecture/auth-flow.md` — 6 auth flows (Mentor, Child, Apple, Admin, Refresh, Passkey)
- `docs/architecture/share-flow.md` — 3 sharing strategies (Drive, PDF, Deep Link)

#### Design Documentation
- `docs/design/design-system.md` — Color palette, typography, spacing, component library, animations, accessibility
- `docs/design/screen-map.md` — Complete inventory of all 58 screens

#### Architecture Decision Records
- `docs/adr/decisions.md` — 7 ADRs: Tech Stack, Backend, Offline, AI, Sharing, State Management, Payments

#### Sprint Plans
- `docs/sprints/phase-0-foundation.md` — Week 1–2: Monorepo, AWS, Firebase, CI/CD
- `docs/sprints/phase-1-auth.md` — Week 3–4: Google, Apple, Passkey, Child PIN
- `docs/sprints/phase-2-worksheets.md` — Week 5–7: Core browse, all 3 types, offline
- `docs/sprints/phase-3-ai-creation.md` — Week 8–9: AI generator, manual builder, image upload
- `docs/sprints/phase-4-sharing.md` — Week 10: Drive, PDF, Dynamic Links
- `docs/sprints/phase-5-progress-notifications.md` — Week 11: Progress tracking, FCM push
- `docs/sprints/phase-6-i18n-polish.md` — Week 12: EN+HI, accessibility, animations
- `docs/sprints/phase-7-admin-panel.md` — Week 12–13: Next.js admin web panel
- `docs/sprints/phase-8-production.md` — Week 13–14: Store submission + go-live

---

## Planned Releases

| Version | Phase | Target Week | Description |
|---|---|---|---|
| **v0.1.0** | Phase 0 + 1 | Week 4 | Foundation + Authentication |
| **v0.2.0** | Phase 2 | Week 7 | Worksheet Core + Offline |
| **v0.3.0** | Phase 3 + 4 | Week 10 | AI Creation + Sharing |
| **v0.4.0** | Phase 5 | Week 11 | Progress Tracking + Notifications |
| **v0.5.0** | Phase 6 + 7 | Week 13 | i18n + Polish + Admin Panel |
| **v1.0.0** | Phase 8 | Week 14 | 🚀 Production Release |

---

## Key Decisions Logged
- Framework: React Native + Expo SDK 52+
- Backend: Node.js + Express + PostgreSQL + Redis + AWS
- Auth: Firebase Auth + JWT + expo-secure-store
- Offline: WatermelonDB + TanStack Query cache
- AI: Google Gemini API (primary) + OpenAI (fallback)
- Sharing: Strategy pattern — Drive API + expo-print + Firebase Dynamic Links
- Payments: Razorpay (stub in Phase 1, active in Phase 2+)
- Admin: Next.js 15 + Tailwind + shadcn/ui
- i18n: English + Hindi (i18next + Hind font)
- 58 total screens across all roles
