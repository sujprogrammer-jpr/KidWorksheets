# Phase 6: Internationalization (i18n) + Accessibility + Polish

> **Sprint Duration:** Week 12
> **Status:** 🔲 Not Started
> **Prerequisite:** Phases 1–5 complete ✅
> **Goal:** Full English + Hindi language support, WCAG 2.1 AA accessibility, and UI polish across all screens.

---

## Objectives

1. Every string in the app translated to both English and Hindi
2. Language switcher working (Mentor can switch in Settings)
3. WCAG 2.1 AA compliance on all screens
4. Hindi font (Hind) rendering correctly on both platforms
5. Skeleton loaders on all data-fetching screens
6. Empty states on all list screens
7. Error states with retry actions
8. Haptic feedback on key interactions
9. 60fps animation audit

---

## Backend Checklist
- [ ] API error messages support localization headers (`Accept-Language: hi`)
- [ ] Backend returns subject/class names in the requested language (store both EN + HI names in DB)
- [ ] AI generation: pass `language` parameter to Gemini correctly

---

## Mobile Checklist

### i18next Setup
- [ ] `i18next` + `react-i18next` + `expo-localization` installed
- [ ] Language detection from device locale (defaulting to EN)
- [ ] Translation files:
  - [ ] `src/i18n/en.json` — all English strings
  - [ ] `src/i18n/hi.json` — all Hindi strings
- [ ] Namespace structure: `common`, `auth`, `worksheets`, `progress`, `settings`, `child`, `errors`

### Strings to Translate (All Screens)
- [ ] Auth: onboarding, login, profile setup, child PIN screens
- [ ] Home: class browser, subject grid, worksheet list, worksheet detail
- [ ] Worksheet player: all question types, results screen
- [ ] Progress: dashboard labels, badge names, streak messages
- [ ] Notifications: notification titles and body templates
- [ ] Settings: all settings labels
- [ ] Errors: all error messages and empty states
- [ ] Sharing: share bottom sheet labels

### Language Switcher
- [ ] Settings → Language → English / हिंदी
- [ ] Immediate app-wide language switch (no restart required)
- [ ] Preference stored in AsyncStorage + synced to user profile (API)

### Hindi Typography
- [ ] Hind font installed via `@expo-google-fonts/hind`
- [ ] `fontFamily: 'Hind_400Regular'` applied to Hindi text nodes
- [ ] Line height adjusted for Devanagari (1.8 recommended)
- [ ] Test all screens in Hindi mode on both platforms

### Accessibility
- [ ] All images have `accessibilityLabel`
- [ ] All icons have `accessibilityLabel` and `accessibilityRole="button"` where tappable
- [ ] All buttons have `accessibilityRole="button"` and descriptive labels
- [ ] Color contrast audit: all text/background combos pass 4.5:1 ratio
- [ ] All touch targets ≥ 44×44pt (mentor) / 56×56pt (child)
- [ ] Dynamic type: all text scales with system font size
- [ ] VoiceOver test (iOS): navigate full app with VoiceOver
- [ ] TalkBack test (Android): navigate full app with TalkBack
- [ ] Focus order: logical tab order on all screens
- [ ] No color-only information conveyed (always paired with icon/text)

### Loading States (Skeleton Screens)
- [ ] Worksheet list: skeleton cards while loading
- [ ] Worksheet detail: skeleton placeholder
- [ ] Progress dashboard: skeleton charts
- [ ] Child list: skeleton avatars
- [ ] Notification list: skeleton items

### Empty States
- [ ] No worksheets assigned (child home)
- [ ] No children added yet (mentor)
- [ ] No worksheets in subject
- [ ] No notifications
- [ ] No bookmarks
- [ ] Search with no results
- Each empty state: illustration + friendly message + CTA button

### Error States
- [ ] Network error → "No internet connection" with retry
- [ ] API error → generic error message with retry
- [ ] Session expired → redirect to login with message
- All error states: icon + message + retry/action button

### Micro-Animations & Polish
- [ ] Button press: scale 0.96 (100ms) — all primary buttons
- [ ] Card press: scale 0.98 (150ms)
- [ ] Tab switch: fade transition (200ms)
- [ ] Screen transition: slide (250ms)
- [ ] Bookmark toggle: heart fill animation
- [ ] Badge unlock: scale bounce + glow (500ms)
- [ ] Progress bar: animated fill on screen enter
- [ ] Haptic feedback:
  - [ ] Button press → light impact
  - [ ] Correct answer → notification haptic
  - [ ] Wrong answer → error haptic
  - [ ] Worksheet submit → success haptic
  - [ ] Badge unlocked → heavy impact

### Performance Audit
- [ ] FlashList (not FlatList) for all long lists (worksheet list, notification list)
- [ ] Image lazy loading (only load when visible)
- [ ] Memoization: `React.memo` + `useCallback` on heavy components
- [ ] No unnecessary re-renders (React DevTools check)
- [ ] Bundle size check: remove unused dependencies
- [ ] Hermes engine enabled (should be by default in Expo SDK 52)

---

## Definition of Done

- [ ] All screens display correctly in Hindi with no text overflow
- [ ] Language switch in Settings instantly changes the entire app
- [ ] VoiceOver can navigate the full mentor flow without issues
- [ ] All skeleton loaders appear while data is loading
- [ ] All empty states render correctly with correct messages
- [ ] 60fps maintained on worksheet list scroll (FlashList)
- [ ] Haptic feedback fires on key interactions (tested on physical device)
