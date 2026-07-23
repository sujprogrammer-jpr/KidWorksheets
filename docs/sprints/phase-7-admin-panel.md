# Phase 7: Admin Panel (Next.js Web App)

> **Sprint Duration:** Week 12–13
> **Status:** 🔲 Not Started
> **Prerequisite:** Phase 2 complete (worksheets exist to moderate) ✅
> **Goal:** Full admin panel for content moderation, analytics, and platform management. Required before go-live.

---

## Objectives

1. Admin login (Firebase Auth, ADMIN role only)
2. Worksheet moderation — approve/reject mentor-created worksheets for public listing
3. User management — view all mentors, child counts
4. Analytics dashboard — platform-wide stats
5. Content management — manage seed data (classes, subjects, pre-created worksheets)

---

## Tech Stack

- Framework: **Next.js 15** (App Router)
- Styling: **Tailwind CSS + shadcn/ui**
- Charts: **Recharts**
- Auth: **Firebase Auth (Admin role check)**
- API calls: **TanStack Query (React Query)**
- Table: **TanStack Table**
- Forms: **React Hook Form + Zod**

---

## Backend Checklist (Admin APIs)

### Admin Middleware
- [ ] `requireAdmin` middleware — checks `user.role === 'ADMIN'`
- [ ] Separate admin route prefix: `/api/admin/`

### Worksheet Moderation
- [ ] `GET /api/admin/worksheets?status=PUBLISHED&isPublic=false` — pending moderation
- [ ] `PATCH /api/admin/worksheets/{id}/approve` — set isPublic: true
- [ ] `PATCH /api/admin/worksheets/{id}/reject` — add rejectionNote, notify mentor
- [ ] `GET /api/admin/worksheets` — all worksheets with full filters

### User Management
- [ ] `GET /api/admin/users` — paginated mentor list (name, email, plan, childCount, worksheetCount, lastActiveAt)
- [ ] `GET /api/admin/users/{id}` — mentor detail
- [ ] `PATCH /api/admin/users/{id}/suspend` — suspend account

### Analytics APIs
- [ ] `GET /api/admin/analytics/overview` — { totalUsers, totalChildren, totalWorksheets, totalSubmissions, DAU, MAU }
- [ ] `GET /api/admin/analytics/worksheets` — worksheets created per day (last 30 days)
- [ ] `GET /api/admin/analytics/submissions` — submissions per day (last 30 days)
- [ ] `GET /api/admin/analytics/top-subjects` — most-used subjects
- [ ] `GET /api/admin/analytics/top-worksheets` — most-completed worksheets

### Content Management
- [ ] `GET /api/admin/classes` + `POST` + `PATCH` + `DELETE`
- [ ] `GET /api/admin/subjects` + `POST` + `PATCH` + `DELETE`
- [ ] `POST /api/admin/worksheets` — create admin-curated public worksheet (no mentor attribution)

---

## Admin Panel Screens

### Login
- [ ] `/login` — Google Sign-In button
- [ ] On login: check Firebase custom claim `role: ADMIN`
- [ ] If not admin → "Access denied" page
- [ ] Redirect to `/dashboard`

### Dashboard (Analytics Overview)
- [ ] Stats cards: Total Mentors, Total Children, Total Worksheets, Today's Submissions
- [ ] Line chart: Daily Active Users (last 30 days)
- [ ] Bar chart: Submissions per day (last 30 days)
- [ ] Pie chart: Worksheet type breakdown (Interactive / Oral / Image-based)
- [ ] Top 5 subjects by worksheet count
- [ ] Top 5 most-completed worksheets

### Worksheet Moderation
- [ ] Table: pending worksheets (title, mentor, class, subject, type, difficulty, created at)
- [ ] Preview button → opens modal with worksheet detail + all questions
- [ ] "Approve" button → marks isPublic: true → appears in public listing
- [ ] "Reject" button → opens modal: enter rejection reason → sends notification to mentor
- [ ] Filter: by class, subject, type, mentor
- [ ] Search by title

### All Worksheets
- [ ] Full table with all worksheets (approved + pending + archived)
- [ ] Filter: isPublic, status, class, subject, type
- [ ] Inline approve/revoke public status toggle

### User Management
- [ ] Table: mentors (name, email, plan, children count, worksheets created, last active)
- [ ] Click row → user detail drawer: all their children, worksheets, submissions
- [ ] Suspend/Activate account toggle

### Content Management
- [ ] Classes tab: table + add/edit/delete
- [ ] Subjects tab: table + add/edit/delete (name, icon, color)
- [ ] Class-Subject Mapping tab: visual grid showing which subjects are in which class

### Pre-created Worksheets
- [ ] Create worksheet form (same builder as mobile, web version)
- [ ] Admin worksheets show "KidWorksheets Team" as creator
- [ ] Auto-set isPublic: true on creation

---

## Definition of Done

- [ ] Admin can log in with Google (only ADMIN role granted access)
- [ ] Dashboard analytics load and display accurate data
- [ ] Mentor-submitted worksheets appear in moderation queue
- [ ] Approve action makes worksheet appear in public listing (verified via mobile app)
- [ ] Reject action sends notification to mentor (verified via FCM)
- [ ] User list shows accurate child counts and last active dates
- [ ] Classes and subjects can be added/edited/deleted
- [ ] Admin panel is deployed to Vercel or AWS Amplify
