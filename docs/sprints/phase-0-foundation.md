# Phase 0: Foundation & Setup (v2 — Updated)

> **Sprint Duration:** Week 1–2
> **Status:** 🔲 Not Started
> **Updated:** 2026-07-23 (Session 2 requirements)
> **Goal:** Set up the complete project monorepo, tooling, CI/CD, Firebase, AWS S3, Supabase, Linux server services, and observability stack.

---

## Objectives

1. Monorepo: `apps/mobile`, `apps/admin`, `backend/services/*`, `packages/`
2. All tooling: TypeScript, ESLint, Prettier, Husky, CommitLint
3. Firebase project (Auth + FCM)
4. AWS: S3 bucket + CloudFront + API Gateway + SQS queue
5. Supabase project: PostgreSQL + schema migration
6. Linux server: Redis + MySQL + n8n + PM2 installed
7. GitHub Actions CI/CD pipelines
8. Observability: Loki + Prometheus + Grafana + OTel Collector running
9. Base design tokens + NativeWind configured in mobile app
10. Base component library started (Button, Input, Card, Avatar)

---

## Checklist

### Repository & Monorepo Setup
- [ ] Initialize monorepo with `npm workspaces`
- [ ] Folder structure:
  ```
  apps/mobile/
  apps/admin/
  backend/services/auth-service/        (Express.js)
  backend/services/share-service/        (Express.js)
  backend/services/file-service/         (Express.js)
  backend/services/notification-service/ (Express.js)
  backend/services/worksheet-service/    (.NET Core)
  backend/services/progress-service/     (.NET Core)
  backend/services/admin-service/        (.NET Core)
  packages/shared-types/
  packages/shared-utils/
  docs/
  ```
- [ ] Root `.gitignore` (node_modules, .env, build outputs, .vs, bin, obj)
- [ ] Root `package.json` with workspace config
- [ ] `.editorconfig` for consistent formatting
- [ ] `CHANGELOG.md` updated on every phase

### Mobile App (Expo)
- [ ] `npx create-expo-app apps/mobile --template tabs` with TypeScript
- [ ] Expo Router v4 set up (file-based routing)
- [ ] NativeWind v4 installed + `tailwind.config.js` configured
- [ ] Design tokens file: `src/theme/tokens.ts` (all colors, spacing, typography from design-specifications.md)
- [ ] Base components: Button, Input, Card, Avatar, Badge, Skeleton, Spinner
- [ ] Lottie React Native installed (`lottie-react-native`)
- [ ] React Native Reanimated v3 configured
- [ ] i18next + react-i18next: `en.json` + `hi.json` (empty namespaces ready)
- [ ] Sentry RN installed (`@sentry/react-native`)
- [ ] Firebase RN: `@react-native-firebase/app`, `@react-native-firebase/auth`, `@react-native-firebase/messaging`
- [ ] TanStack Query v5 setup with `QueryClientProvider`
- [ ] Zustand installed, root store scaffold
- [ ] WatermelonDB installed + schema defined (offline support)
- [ ] Micro-frontend module folder structure:
  ```
  src/modules/auth/
  src/modules/worksheets/
  src/modules/player/
  src/modules/creation/
  src/modules/progress/
  src/modules/child/
  src/modules/settings/
  ```
- [ ] Error boundary component wrapping each module
- [ ] Expo Go: test basic shell on physical device

### Backend — Express.js Services
- [ ] Scaffold each Express service (TypeScript): auth, share, file, notification
- [ ] Shared middleware: `verifyFirebaseToken`, request logger (→ Loki), OTel instrumentation
- [ ] Health check: `GET /health` → `{ status: 'ok', service: 'auth-service' }`
- [ ] Environment variables: `.env.example` for each service
- [ ] `package.json` per service with start, dev, build scripts
- [ ] PM2 ecosystem file: `ecosystem.config.js` (all services listed)

### Backend — .NET Core Services
- [ ] Scaffold each .NET 8 Web API project: worksheet, progress, admin
- [ ] OTel instrumentation added (traces + metrics)
- [ ] Structured logging: Serilog → Loki sink
- [ ] Health check endpoint: `GET /health`
- [ ] `appsettings.json` + `appsettings.Production.json` templates

### AWS Setup
- [ ] AWS account configured with IAM user (least-privilege)
- [ ] S3 bucket: `kidworksheets-assets` (private, versioning on)
- [ ] S3 bucket policy: only allow access via CloudFront OAC
- [ ] CloudFront distribution → S3 origin (OAC)
- [ ] API Gateway (HTTP API type) created
- [ ] API Gateway routes: `/auth/*`, `/worksheets/*`, `/progress/*`, `/share/*`, `/files/*`, `/notif/*`, `/admin/*`, `/ai/*`
- [ ] API Gateway integration: HTTP proxy to each service port on Linux server
- [ ] SQS queue: `kidworksheets-jobs.fifo` (FIFO queue for ordering)
- [ ] AWS IAM roles: S3 read/write, SQS send/receive

### Firebase / Google Cloud Setup
- [ ] Firebase project: `kidworksheets-prod` + `kidworksheets-dev`
- [ ] Firebase Auth enabled: Google provider + Apple provider
- [ ] FCM enabled, server key stored in env
- [ ] `google-services.json` (Android) + `GoogleService-Info.plist` (iOS) added to `apps/mobile/`
- [ ] Firebase Admin SDK service account key → stored in Linux server env
- [ ] Google Cloud project linked to Firebase
- [ ] Gemini API key obtained + stored in n8n env / Linux server env

### Supabase Setup
- [ ] Supabase project created (free tier or Pro)
- [ ] Database URL stored in backend env files
- [ ] Prisma schema created (see data-models.md)
- [ ] Initial migration run: all tables created
- [ ] Row Level Security (RLS) enabled on sensitive tables
- [ ] Seed data: classes (Pre-KG → Class 5) + subjects (Math, English, Hindi, Science, EVS, GK, Computer, Moral Science)
- [ ] Class-Subject mapping seeded

### Linux Server Setup
- [ ] Server provisioned (Ubuntu 22.04 LTS recommended)
- [ ] Node.js 20 LTS installed
- [ ] .NET 8 SDK installed
- [ ] PM2 installed globally (`npm install pm2 -g`)
- [ ] Redis installed + configured (port 6379, password-protected)
- [ ] MySQL installed + initial DB + user created
- [ ] n8n installed globally (`npm install n8n -g`) + started via PM2
- [ ] Nginx installed as reverse proxy (routes domain → service ports)
- [ ] SSL certificate: Let's Encrypt via Certbot
- [ ] UFW firewall configured (allow 80, 443, internal ports only)

### Observability Stack (Linux Server)
- [ ] Loki installed + started (port 3101)
- [ ] Prometheus installed + started (port 9090) + `prometheus.yml` config
- [ ] Grafana installed + started (port 3100)
- [ ] Grafana Tempo installed + started (port 3200)
- [ ] OTel Collector installed + started (port 4317/4318)
- [ ] node_exporter installed (Linux server metrics)
- [ ] redis_exporter installed
- [ ] Grafana data sources configured: Loki, Prometheus, Tempo
- [ ] Import pre-built Grafana dashboards: Node Exporter Full, Redis dashboard
- [ ] Test: send a test log → verify appears in Grafana Loki view

### CI/CD (GitHub Actions)
- [ ] `.github/workflows/mobile-ci.yml`: TypeScript check + ESLint + Jest on PR
- [ ] `.github/workflows/backend-express-ci.yml`: TypeScript + ESLint + Jest on PR
- [ ] `.github/workflows/backend-dotnet-ci.yml`: .NET build + test on PR
- [ ] `.github/workflows/deploy-backend.yml`: SSH deploy to Linux server on `main` push
- [ ] GitHub Secrets: `SSH_HOST`, `SSH_USER`, `SSH_KEY`, `SENTRY_DSN`, `FIREBASE_SA_KEY`

### EAS Configuration
- [ ] `eas.json` created with `development` (Expo Go), `preview` (EAS), `production` profiles
- [ ] `app.json`: bundle ID `com.kidworksheets.app`, version `1.0.0`
- [ ] Expo Go: initial dev testing — NO EAS builds in Phase 0

---

## Definition of Done

- [ ] Mobile app launches in Expo Go on physical iOS + Android
- [ ] `GET /api/auth/health` returns `200` on API Gateway URL
- [ ] All 7 microservice health checks return `200`
- [ ] Supabase tables visible in Supabase Studio
- [ ] Seed data present: 8 classes + subjects visible
- [ ] Redis pings successfully from auth service
- [ ] n8n UI accessible on Linux server
- [ ] Grafana dashboard loads at server IP:3100
- [ ] Test log from auth service appears in Grafana Loki
- [ ] GitHub Actions CI runs on PR and passes
- [ ] `.env` files NOT committed (verified via `git log`)
