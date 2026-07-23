# Phase 5: Progress Tracking + Push Notifications

> **Sprint Duration:** Week 11
> **Status:** 🔲 Not Started
> **Prerequisite:** Phase 2 + Phase 3 complete ✅
> **Goal:** Mentor can track every child's progress. Push notifications delivered for key events.

---

## Objectives

1. Per-child progress dashboard (scores, completion rate, subject breakdown)
2. Streaks and gamification (stars, badges, daily streaks)
3. Mentor notification when child completes a worksheet
4. Firebase Cloud Messaging (FCM) push notifications
5. In-app notification center

---

## Backend Checklist

### Progress APIs
- [ ] `GET /api/progress/{childId}` — overall summary (total assigned, completed, avg score, streak)
- [ ] `GET /api/progress/{childId}/subjects` — breakdown by subject
- [ ] `GET /api/progress/{childId}/worksheets` — all submissions with scores
- [ ] `GET /api/progress/{childId}/streak` — current streak + longest streak
- [ ] `GET /api/progress/mentor-overview` — all children summary (for mentor dashboard)

### Badges & Gamification
- [ ] Badge definitions seeded in DB: "First Worksheet", "Perfect Score", "7-Day Streak", "Subject Master", etc.
- [ ] Badge award logic triggered on submission
- [ ] `GET /api/children/{childId}/badges` — earned badges
- [ ] `GET /api/children/{childId}/stars` — total stars earned

### Notification Service (Backend)
- [ ] FCM Admin SDK initialized (`firebase-admin`)
- [ ] Store FCM tokens: `POST /api/notifications/register-token`
- [ ] `POST /api/notifications/send` — internal API to send FCM notification
- [ ] Event triggers:
  - [ ] Child submits worksheet → notify Mentor: "Riya completed 'Maths - Fractions' 🎉 Score: 80%"
  - [ ] Mentor assigns worksheet → notify Child (via parent device): "New worksheet assigned!"
  - [ ] Deadline approaching (24h before dueDate) → notify Mentor + Child
  - [ ] New public worksheet in child's class → notify Mentor
  - [ ] Weekly progress summary → push to Mentor every Sunday 10 AM
- [ ] Notification stored in DB for in-app notification center
- [ ] `GET /api/notifications` — paginated list (unread first)
- [ ] `PATCH /api/notifications/{id}/read` — mark as read
- [ ] `PATCH /api/notifications/read-all` — mark all as read

---

## Mobile Checklist

### Mentor Progress Dashboard
- [ ] "Progress" tab in bottom navigation
- [ ] Child selector (horizontal avatars at top)
- [ ] Overall stats cards: Total Assigned, Completed, Avg Score, Current Streak
- [ ] Streak calendar (heatmap — days active)
- [ ] Subject performance bar chart (horizontal bars per subject)
- [ ] Recent submissions list (worksheet title, score, date)
- [ ] Tap submission → detailed results (questions + child's answers)

### Child Progress (Kid Mode)
- [ ] Stars collected (animated star count)
- [ ] Badge shelf (earned badges displayed)
- [ ] Streak indicator (flame icon + "X day streak")
- [ ] "My Progress" section on child home

### Gamification
- [ ] Star rating on results: 1 star (< 50%), 2 stars (50–79%), 3 stars (80%+)
- [ ] Confetti animation on 3-star score
- [ ] Badge unlock animation (pop-in + glow)
- [ ] Streak counter increments each day child completes at least 1 worksheet

### Push Notifications (Mobile)
- [ ] `expo-notifications` permission request on first launch (after login)
- [ ] FCM token retrieved and sent to `POST /api/notifications/register-token`
- [ ] Handle foreground notifications (in-app banner)
- [ ] Handle background tap → navigate to relevant screen (worksheet, progress)
- [ ] Handle notification received when app is closed → navigate on open

### In-App Notification Center
- [ ] Bell icon in header with unread count badge
- [ ] Notification list screen: icon + title + body + time + unread dot
- [ ] Tap notification → navigate to relevant content
- [ ] Swipe to dismiss / Mark as read
- [ ] "Mark all as read" button

---

## Definition of Done

- [ ] Mentor can view all children's progress in one dashboard
- [ ] Subject breakdown chart is accurate against submission data
- [ ] Streaks increment correctly on daily usage
- [ ] At least 3 badge types award correctly
- [ ] Push notification received when child submits worksheet (tested on real device)
- [ ] In-app notification bell shows unread count
- [ ] Tapping notification navigates to correct screen
