# Phase 8: Production Readiness + App Store Submission

> **Sprint Duration:** Week 13–14
> **Status:** 🔲 Not Started
> **Prerequisite:** All phases 0–7 complete ✅
> **Goal:** App is production-hardened, store-compliant, tested on real devices, and submitted to App Store + Play Store.

---

## Objectives

1. Razorpay subscription UI wired (inactive — all free in Phase 1)
2. Privacy Policy + Terms of Service screens in-app
3. COPPA compliance verified
4. Sign In with Apple confirmed working on real device
5. App Store metadata complete (screenshots, description, keywords)
6. Google Play metadata complete (Data Safety form, content rating)
7. TestFlight release (iOS)
8. Google Play Internal Testing release (Android)
9. QA pass on real devices
10. Production deployment

---

## Checklist

### Legal & Compliance
- [ ] Privacy Policy page published at a public URL (e.g., `kidworksheets.app/privacy`)
- [ ] Terms of Service page published at a public URL
- [ ] In-app: "Privacy Policy" + "Terms of Service" links on Login screen + Settings
- [ ] COPPA compliance:
  - [ ] No behavioral advertising to children
  - [ ] Parental consent flow for child data collection
  - [ ] Child data stored securely, not shared with third parties
  - [ ] Data deletion: `DELETE /api/users/account` deletes all user + child data
- [ ] App Tracking Transparency (ATT):
  - [ ] If using analytics that track users across apps → show ATT prompt
  - [ ] Firebase Analytics configured with limited ad measurement

### Apple App Store Requirements
- [ ] Apple Developer account active ($99/yr)
- [ ] App ID registered: `com.kidworksheets.app`
- [ ] Certificates + provisioning profiles configured in EAS
- [ ] Sign In with Apple — working on real device ✓
- [ ] Info.plist permissions justified:
  - [ ] NSCameraUsageDescription (image upload)
  - [ ] NSPhotoLibraryUsageDescription (gallery access)
  - [ ] NSMicrophoneUsageDescription (audio recording for oral worksheets)
- [ ] Age rating: 4+ (no objectionable content)
- [ ] App Privacy "Nutrition Labels" filled in App Store Connect:
  - Data types: Name, Email, User ID, Diagnostics, App Usage Data
- [ ] No private APIs used (check with `nm` / EAS validation)
- [ ] TestFlight build submitted and approved by internal testers
- [ ] Screenshots: 6.7" iPhone, 6.1" iPhone, 12.9" iPad (required by Apple)
- [ ] App Store description (EN) written
- [ ] Keywords (100 chars max): worksheets, kids learning, homework, school, math, english, hindi

### Google Play Store Requirements
- [ ] Google Play Developer account active ($25 one-time)
- [ ] Package name: `com.kidworksheets.app`
- [ ] Content rating questionnaire: "Education" category → expected Everyone/Everyone 10+
- [ ] Designed for Families program (if targeting under 13): enrolled + extra review
- [ ] Data Safety form filled:
  - Data collected: Name, Email address, App interactions, Crash logs
  - Purpose: App functionality, Analytics
  - Data encrypted in transit: Yes
  - Users can request deletion: Yes
- [ ] Permissions declared (camera, storage, notifications)
- [ ] APK/AAB signed with release keystore (stored securely in EAS)
- [ ] Internal Testing track release submitted

### Razorpay Integration (Stub — Inactive)
- [ ] `react-native-razorpay` installed
- [ ] Subscription screen UI built (plans, pricing, CTA) — all shown as "Free"
- [ ] `SubscriptionService.isFeatureEnabled(feature)` always returns `true` in Phase 1
- [ ] `POST /api/subscriptions/create` endpoint created but gated
- [ ] Razorpay Test Mode keys stored in secrets (not production keys yet)

### Security Hardening
- [ ] All API keys + secrets in AWS Secrets Manager (not in code)
- [ ] `.env` files excluded from git (verify .gitignore)
- [ ] SSL certificate valid for backend domain
- [ ] CORS whitelist: only app bundle ID + admin panel domain
- [ ] SQL injection prevention: Prisma parameterized queries (default)
- [ ] XSS prevention: all user content sanitized before render
- [ ] Rate limiting: 100 req/min per user, 1000 req/min per IP
- [ ] Backend security headers: Helmet.js (already configured in Phase 0)

### Final QA Device Matrix

| Device | OS | Test |
|---|---|---|
| iPhone SE (3rd gen) | iOS 16 | Smallest iPhone — layout check |
| iPhone 14 Pro | iOS 17 | Standard |
| iPhone 15 Pro Max | iOS 17 | Largest iPhone — layout check |
| iPad Pro 12.9" | iPadOS 17 | Tablet layout |
| Samsung Galaxy A34 | Android 13 | Mid-range Android |
| Google Pixel 7 | Android 14 | Stock Android |
| OnePlus 12 | Android 14 | OEM Android |

### QA Test Cases
- [ ] Full mentor flow: register → create class → create worksheet → add child → assign → child completes → view progress
- [ ] Full child flow: select profile → PIN → browse → play interactive worksheet → submit → see results
- [ ] Share all 3 strategies on iOS + Android
- [ ] Offline: complete worksheet in airplane mode, sync when reconnected
- [ ] Push notification received on real device
- [ ] Hindi language: full app in Hindi with correct font rendering
- [ ] Deep link: tap link on another device → opens app to correct worksheet

### Production Deployment
- [ ] Backend: Docker image built → pushed to AWS ECR → deployed to AWS ECS or App Runner
- [ ] Database: final migration run on production PostgreSQL
- [ ] Redis: production ElastiCache configured
- [ ] S3: production bucket with CloudFront
- [ ] Admin panel: deployed to Vercel (or AWS Amplify)
- [ ] Health check: `GET https://api.kidworksheets.app/api/health` returns 200
- [ ] EAS Submit: iOS → App Store Connect (manual review submission)
- [ ] EAS Submit: Android → Google Play (production track)

### App Store Review Preparation
- [ ] Test account credentials ready for Apple reviewer (demo mentor + demo child)
- [ ] Review notes: explain child PIN system, no in-app purchases active, etc.
- [ ] Ensure demo child has pre-assigned worksheets so reviewer can test child flow

---

## Go-Live Checklist (Final Sign-off)

- [ ] All automated tests passing (`jest --coverage > 80%`)
- [ ] No critical or high Sentry errors in staging
- [ ] Admin panel live and admin account created
- [ ] Backend monitoring: CloudWatch alerts configured (CPU > 80%, Error rate > 1%)
- [ ] On-call documentation: what to do if production goes down
- [ ] Backup: automated daily PostgreSQL backups enabled (AWS RDS)
- [ ] Firebase Analytics dashboard shows test events correctly

---

## Post-Launch (Next Steps for Future Phases)

| Feature | Priority |
|---|---|
| Razorpay subscription activation | High |
| Art & Drawing worksheets | Medium |
| Class 6–10 expansion | High |
| Video worksheet type | Medium |
| Parent-Teacher messaging | Medium |
| School management (bulk onboarding) | High |
| Web app for worksheets (browser-based) | Medium |
| Freemium feature gating implementation | High |
