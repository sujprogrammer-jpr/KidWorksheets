# CHANGELOG

All notable changes to the KidWorksheets project are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [Unreleased — Planning In Progress]

### Updated — 2026-07-24 (Session 3 — App Flow Revision → Plan v4.0)

#### Major Flow Changes
- **Mentor-Owned Classes:** Mentors now create their own classes (free-text). Admin can promote to PUBLIC.
- **Mentor-Owned Subjects:** Mentors create subjects per class with default writing style.
- **Worksheet Types:** Renamed to WRITTEN (Interactive Q&A) | ORAL. IMAGE_BASED via AI image upload (Phase 4).
- **AI Creation IN SCOPE:** Both prompt-based + image-upload AI creation added to Phase 4 (not deferred).
- **Student Profile = Full CRM:** name, parents, contacts, DOB, fees, photo, school (10+ fields).
- **Student Login:** Reverted to PIN-based sub-profile under mentor (not independent mobile+PIN login).
- **Subject Enrollment:** Students enrolled per subject (not entire class).
- **Admin Full Access:** Admin sees everything, can edit anything, marks content as PUBLIC.
- **Writing Styles:** Expanded to 10 options (straight + dotted variants per line count).

#### New Documents Added
- `docs/DISCUSSION_LOG_S3.md` — Session 3 requirements update + all clarifications
- `docs/sprints/phase-2-core-flow.md` — New Phase 2 sprint (Class/Subject/Worksheet + Student Play)
- `docs/sprints/phase-3-students.md` — New Phase 3 sprint (Student CRM + Enrollment + PIN)
- `docs/sprints/phase-4-ai-creation.md` — New Phase 4 sprint (AI prompt + Image upload)

#### Updated Documents
- `docs/IMPLEMENTATION_PLAN.md` → v4.0 (major rewrite with all new decisions)
- `docs/architecture/data-models.md` → v2.0 (MentorClass, MentorSubject, Student CRM, WritingStyle v2)
- `docs/design/screen-map.md` → v2.0 (69 screens total, new class/subject/student screens)
- `docs/adr/decisions.md` → Added ADR-013 (Mentor Classes), ADR-014 (react-native-skia), ADR-015 (Student sub-profile)
- Sprint roadmap expanded: Phase 0–9 (18 weeks total)

#### New Tech Decision
- **react-native-skia** added for worksheet canvas rendering (lines, grids, drawing input)

### Updated — 2026-07-23 (Session 2 — Architecture Refinement)

#### Infrastructure Changes
- **Database:** Changed from AWS RDS → **Supabase** (managed PostgreSQL)
- **Cache:** Changed from AWS ElastiCache → **Redis on Linux server** (self-hosted)
- **AWS scope reduced:** Only S3, CloudFront, API Gateway, SQS — nothing else
- **AI:** Now server-side only via **n8n + Gemini API** — zero client AI access
- **Monitoring:** Changed from CloudWatch → **Grafana + Loki + OTel + Prometheus** (open-source)
- **Backend:** Changed from Express.js monolith → **Microservices** (Express.js + .NET Core per service)
- **Mobile:** Changed to **micro-frontend** architecture (8 isolated feature modules)
- **Docker:** Removed — using **PM2** on Linux server instead
- **Testing:** Dev testing via **Expo Go** first — store publish only when stable

#### New Documents Added
- `docs/DISCUSSION_LOG_S2.md` — Session 2 requirements update log
- `docs/architecture/observability.md` — Grafana+Loki+OTel+Prometheus stack
- `docs/design/design-specifications.md` — Full Figma-ready design spec (colors, typography, components, Lottie catalog)

#### Updated Documents
- `docs/architecture/system-design.md` → v3.0 (complete microservices rewrite)
- `docs/IMPLEMENTATION_PLAN.md` → v3.0 (tech stack + infrastructure updates)
- `docs/adr/decisions.md` → Added ADR-008 through ADR-012
- `docs/sprints/phase-0-foundation.md` → Updated for new infra

---

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
