# Authentication Flows — KidWorksheets

> **Document Type:** Auth Architecture
> **Version:** 1.0
> **Last Updated:** 2026-07-23

---

## Flow 1: Mentor — First-Time Login

```
App Launch
    │
    ▼
Splash Screen (Lottie animation, 2s)
    │
    ▼
AsyncStorage / Keychain check
    │
    ├── No session ──────────────────────────────────┐
    │                                                │
    ▼                                                ▼
Onboarding Slides (3 screens)              ┌──────────────────┐
    │                                      │  RETURNING USER  │
    ▼                                      └──────────────────┘
Google Sign-In Button
    │
    ▼
Firebase Auth (Google OAuth 2.0)
    │
    ├── Error → Show error toast, retry
    │
    ▼
Firebase ID Token obtained
    │
    ▼
POST /api/auth/login (with Firebase ID Token)
    │
    ▼
Backend:
  1. Verify Firebase ID Token (Firebase Admin SDK)
  2. Find or create User record in PostgreSQL
  3. Generate short-lived JWT (15m) + refresh token (7d)
  4. Return: { accessToken, refreshToken, user }
    │
    ▼
Store tokens securely:
  - iOS: Keychain via expo-secure-store
  - Android: Keystore via expo-secure-store
    │
    ▼
Is profile complete?
    ├── NO → Profile Setup Screen (name, school/family, language pref)
    └── YES → Home Dashboard

Passkey Setup Prompt (once, dismissible):
"Enable Face ID / Fingerprint for faster login?"
    ├── YES → expo-local-authentication setup → store biometric preference
    └── SKIP → proceed to dashboard
```

---

## Flow 2: Mentor — Returning User with Passkey

```
App Launch
    │
    ▼
Splash Screen (1.5s)
    │
    ▼
Check stored session in Keychain
    │
    ▼
Valid refresh token found?
    │
    ├── NO → Go to Flow 1 (Google Sign-In)
    │
    ▼
Biometric preference enabled?
    │
    ├── NO → Auto-refresh JWT silently → Home Dashboard
    │
    ▼
Biometric prompt (Face ID / Fingerprint / PIN)
    │
    ├── Success → Refresh JWT using stored refresh token → Home Dashboard
    └── Failed 3x → Fall back to Google Sign-In (Flow 1)
```

---

## Flow 3: Child Login (PIN-based)

```
Mentor Home Dashboard
    │
    ▼
"Switch to Child" button OR "My Children" section
    │
    ▼
Child Profile List (avatars + names of all linked children)
    │
    ▼
Select child profile (tap)
    │
    ▼
PIN Entry Screen (secure keypad, 4–6 digits)
    │
    ▼
POST /api/children/{childId}/verify-pin
    │
    ├── Wrong PIN → Shake animation, "Incorrect PIN" toast
    │             (After 5 attempts: 30-second lockout)
    │
    ▼
Backend verifies bcrypt(PIN) match
    │
    ▼
Returns child session token (short-lived, 4h)
    │
    ▼
Child Dashboard (Kid Mode UI activated)
    │
    ▼
[Child session expires after 4h inactivity → returns to profile selector]
```

---

## Flow 4: Token Refresh

```
API Request made
    │
    ▼
API returns 401 (Unauthorized)
    │
    ▼
Interceptor (TanStack Query / Axios) catches 401
    │
    ▼
POST /api/auth/refresh with refresh token
    │
    ├── Valid → New access token issued → Retry original request
    └── Invalid (expired 7d) → Clear tokens → Redirect to Login (Flow 1)
```

---

## Flow 5: Sign In with Apple (iOS Required)

Apple requires all apps offering third-party login to also offer Sign in with Apple.

```
Login Screen
    │
    ├── "Continue with Google" → Flow 1
    └── "Continue with Apple" →
              │
              ▼
        Apple credential obtained
              │
              ▼
        POST /api/auth/login (with Apple credential)
              │
              ▼
        Firebase Auth (Apple provider)
              │
              ▼
        Same as Flow 1 from "Firebase ID Token obtained"
```

---

## Flow 6: Admin Login (Web Panel)

```
Admin Panel URL → Login Page
    │
    ▼
Google Sign-In (Firebase Auth)
    │
    ▼
Backend verifies: user.role === ADMIN
    │
    ├── Not admin → "Access denied" error
    └── Admin → Admin JWT (separate, longer-lived: 8h)
            → Admin Dashboard
```

---

## Security Rules

| Rule | Implementation |
|---|---|
| Never store plain-text tokens in AsyncStorage | Use expo-secure-store (Keychain/Keystore) |
| Never store plain PIN | bcrypt hash with cost factor 12 |
| Child sessions isolated | Child token cannot access Mentor endpoints |
| Token rotation | Refresh token rotates on each use |
| Brute force protection | PIN lockout after 5 attempts (30s cooldown) |
| Sign out clears all | Keychain cleared, Firebase sign-out, server token invalidated |

---

## Library Choices

| Requirement | Library |
|---|---|
| Google Sign-In | `@react-native-google-signin/google-signin` |
| Apple Sign-In | `expo-apple-authentication` |
| Biometric / Passkey | `expo-local-authentication` |
| Secure storage | `expo-secure-store` |
| HTTP client | `axios` with interceptor |
| Firebase Auth | `@react-native-firebase/auth` |
