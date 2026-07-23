# Phase 0: Foundation & Setup

> **Sprint Duration:** Week 1–2
> **Status:** 🔲 Not Started
> **Goal:** Set up the complete project monorepo, tooling, CI/CD, Firebase, and AWS infrastructure so that all subsequent phases can build on a solid foundation.

---

## Objectives

1. Monorepo structure with `apps/mobile`, `apps/admin`, `backend`, `packages/`
2. All tooling configured (TypeScript, ESLint, Prettier, Husky)
3. Firebase project live (Auth, FCM)
4. AWS resources provisioned (S3, RDS, ElastiCache, API Gateway)
5. GitHub Actions CI/CD pipelines running
6. EAS Build profiles configured (dev, staging, production)
7. Design tokens & NativeWind configured in mobile app
8. Base component library started (Button, Input, Card, Avatar)

---

## Checklist

### Repository Setup
- [ ] Initialize monorepo with `npm workspaces` or `Turborepo`
- [ ] Create folder structure: `apps/mobile`, `apps/admin`, `backend`, `packages/shared-types`, `packages/shared-utils`
- [ ] Initialize Git + connect to `sujprogrammer-jpr/KidWorksheets`
- [ ] Create `.gitignore` (node_modules, .env, iOS/Android build artifacts)
- [ ] Create `CHANGELOG.md`

### Mobile App (Expo)
- [ ] `npx create-expo-app apps/mobile --template expo-router`
- [ ] TypeScript strict mode enabled
- [ ] NativeWind v4 installed and configured
- [ ] Expo Router v4 file-based routing set up
- [ ] Design tokens file (`src/theme/tokens.ts`)
- [ ] Base components: Button, Input, Card, Avatar, Badge, Skeleton
- [ ] Lottie React Native installed (`lottie-react-native`)
- [ ] React Native Reanimated v3 configured
- [ ] i18next + react-i18next installed + `en.json` / `hi.json` created
- [ ] Sentry Expo plugin installed
- [ ] Firebase React Native configured (`@react-native-firebase/app`)

### Backend (Node.js)
- [ ] `backend/` Express + TypeScript scaffold
- [ ] Prisma installed + schema created (see data-models.md)
- [ ] PostgreSQL connection (local Docker for dev)
- [ ] Redis connection (local Docker for dev)
- [ ] Middleware: Morgan (logging), Helmet (security), CORS, rate-limit
- [ ] Firebase Admin SDK initialized
- [ ] Auth middleware: `verifyFirebaseToken`
- [ ] Folder: routes, controllers, services, repositories, middleware
- [ ] Environment variables documented in `.env.example`
- [ ] Dockerfile created
- [ ] Prisma migrations run (`npx prisma migrate dev`)
- [ ] Seed script: classes (Pre-KG, LKG, UKG, Class 1–5) + subjects

### AWS Setup
- [ ] S3 bucket created (`kidworksheets-assets-{env}`) with private ACL
- [ ] CloudFront distribution pointing to S3
- [ ] RDS PostgreSQL instance (or Supabase project) provisioned
- [ ] ElastiCache Redis cluster provisioned
- [ ] API Gateway created (HTTP API type)
- [ ] Secrets Manager: DB URL, Redis URL, Firebase service account, OpenAI key
- [ ] IAM roles configured with least-privilege

### Firebase Setup
- [ ] Firebase project created: `kidworksheets-prod`
- [ ] Firebase project created: `kidworksheets-dev`
- [ ] Google Sign-In enabled in Firebase Console
- [ ] Apple Sign-In enabled
- [ ] FCM (Cloud Messaging) configured
- [ ] `google-services.json` (Android) + `GoogleService-Info.plist` (iOS) added

### CI/CD (GitHub Actions)
- [ ] `mobile-ci.yml`: TypeScript check + ESLint + Jest on PR
- [ ] `backend-ci.yml`: TypeScript check + ESLint + Jest + DB migration check on PR
- [ ] `eas-build.yml`: EAS build trigger on push to `main`
- [ ] Secrets added to GitHub: EAS token, AWS credentials, Sentry DSN

### EAS Configuration
- [ ] `eas.json` created with `development`, `preview`, `production` profiles
- [ ] `app.json` configured: bundle ID `com.kidworksheets.app`, version `1.0.0`
- [ ] Dev client build created for physical device testing

---

## Definition of Done

- `npm run lint` passes with zero errors
- `npm run typecheck` passes
- `npm run test` passes (even with zero tests yet)
- EAS dev build installable on a physical iOS and Android device
- Firebase Auth `signIn` flow verifiable in dev environment
- Backend health check endpoint returns 200: `GET /api/health`
- PostgreSQL + Redis connected and verified via health check

---

## Notes & Decisions
- Monorepo tool: **npm workspaces** (simplest, no extra dep). Turborepo if build speeds become an issue.
- Local dev: Docker Compose for PostgreSQL + Redis
- Keep `apps/admin` as placeholder in Phase 0 (scaffold only, not implemented until Phase 7)
