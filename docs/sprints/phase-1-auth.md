# Phase 1: Authentication & Onboarding

> **Sprint Duration:** Week 3–4
> **Status:** 🔲 Not Started
> **Prerequisite:** Phase 0 complete ✅
> **Goal:** Complete Mentor authentication (Google Sign-In + Passkey), Child PIN setup, and app onboarding flow.

---

## Objectives

1. Mentor can sign in with Google → Full auth loop working end-to-end
2. Sign in with Apple implemented (App Store requirement)
3. Biometric/Passkey fast login working on device
4. Child profile creation with secure PIN
5. Child PIN login working (4–6 digit secure keypad)
6. Onboarding slides implemented
7. Auth guards on all protected routes

---

## Checklist

### Onboarding (Unauthenticated)
- [ ] Splash screen with Lottie animation (brand colors, logo)
- [ ] Onboarding slide 1: "Welcome to KidWorksheets" — app overview
- [ ] Onboarding slide 2: "Create & Assign Worksheets" — mentor features
- [ ] Onboarding slide 3: "Track Your Child's Progress" — parent benefits
- [ ] Skip button (goes directly to Login)
- [ ] "Get Started" CTA on last slide

### Login Screen
- [ ] "Continue with Google" button (`@react-native-google-signin/google-signin`)
- [ ] "Continue with Apple" button (`expo-apple-authentication`)
- [ ] Privacy Policy + Terms of Service links (required for store)
- [ ] Error handling: network error, cancelled, account suspended

### Backend: Auth Endpoints
- [ ] `POST /api/auth/login` — verify Firebase token, create/find user, return JWT
- [ ] `POST /api/auth/refresh` — refresh access token using refresh token
- [ ] `POST /api/auth/logout` — invalidate refresh token server-side
- [ ] `GET /api/auth/me` — return current user profile
- [ ] Auth middleware: attach `req.user` to all protected routes

### Profile Setup
- [ ] First-login check: redirect to profile setup if `name` is null
- [ ] Profile setup screen: name, school/organization, preferred language (EN/HI)
- [ ] Avatar selection (preset avatars, no upload in Phase 1)
- [ ] `PUT /api/users/profile` endpoint

### Passkey / Biometrics
- [ ] Passkey setup prompt after first login (dismissible, stored preference)
- [ ] `expo-local-authentication`: check biometric availability
- [ ] On successful biometric → use stored refresh token to silently re-auth
- [ ] "Forgot PIN / Sign in differently" escape hatch → Google Sign-In

### Child Profile
- [ ] "Add Child" screen: name, age, avatar (from preset pack), PIN setup
- [ ] PIN setup: enter PIN + confirm PIN (6-digit)
- [ ] PIN stored: `bcrypt.hash(pin, 12)` — never plain text
- [ ] `POST /api/children` — create child profile
- [ ] Child list screen: avatars + names (scrollable horizontal list)
- [ ] Edit child: name, age, avatar, change PIN
- [ ] Delete child (with confirmation)

### Child PIN Login
- [ ] Select child profile → PIN entry screen
- [ ] Custom secure keypad component (no OS keyboard — prevents shoulder surfing)
- [ ] `POST /api/children/{childId}/verify-pin`
- [ ] Wrong PIN: shake animation, error message
- [ ] 5 wrong attempts: 30-second cooldown (timer shown)
- [ ] Child session token: 4-hour JWT (child-scoped, cannot access mentor endpoints)

### Auth Guards
- [ ] `(auth)/` group: only accessible when NOT logged in
- [ ] `(mentor)/` group: requires valid Mentor JWT
- [ ] `(child)/` group: requires valid Child session token
- [ ] Auto-redirect to login on 401

---

## Screen List

| Screen | Route | Role |
|---|---|---|
| Splash | `/splash` | All |
| Onboarding | `/onboarding` | Guest |
| Login | `/(auth)/login` | Guest |
| Profile Setup | `/(auth)/profile-setup` | New Mentor |
| Child List | `/(mentor)/children` | Mentor |
| Add Child | `/(mentor)/children/add` | Mentor |
| Child PIN Entry | `/(child)/pin` | Child |

---

## Definition of Done

- [ ] Mentor can complete full Google Sign-In → Profile Setup → Dashboard flow
- [ ] Returning mentor skips onboarding and hits biometric prompt
- [ ] Child can be created with PIN and successfully log in
- [ ] Wrong PIN shows error; 5 failed attempts trigger cooldown
- [ ] All tokens stored in Keychain/Keystore (verified in Expo SecureStore)
- [ ] Protected routes redirect unauthenticated users correctly
- [ ] Sign In with Apple works on real iOS device
