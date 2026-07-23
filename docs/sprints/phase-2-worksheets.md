# Phase 2: Worksheet Core

> **Sprint Duration:** Week 5–7
> **Status:** 🔲 Not Started
> **Prerequisite:** Phase 1 complete ✅
> **Goal:** Full worksheet browsing, all 3 worksheet types playable in-app, offline sync working.

---

## Objectives

1. Class + Subject browser working
2. All 3 worksheet types renderable: INTERACTIVE, ORAL, IMAGE_BASED
3. Interactive worksheet player (MCQ, Fill-blank, True/False, Match, Short-answer)
4. Oral worksheet player (audio playback + visible notes)
5. Image-based worksheet viewer (zoom, pan)
6. Public worksheets (admin-approved) visible to all mentors and children
7. Mentor's own worksheets listed separately
8. Favorites / Bookmarks
9. Offline caching — assigned worksheets available without internet

---

## Backend Checklist

### Seed Data
- [ ] Seed classes: Pre-KG, LKG, UKG, Class 1, Class 2, Class 3, Class 4, Class 5
- [ ] Seed subjects: Mathematics, English, Hindi, Science, EVS, General Knowledge, Computer, Moral Science
- [ ] Map subjects to appropriate classes
- [ ] Seed 3–5 sample public worksheets per class/subject (admin pre-created)

### Worksheet APIs
- [ ] `GET /api/classes` — list all active classes
- [ ] `GET /api/classes/{classId}/subjects` — subjects for a class
- [ ] `GET /api/worksheets` — list worksheets (filters: classId, subjectId, type, difficulty, language, isPublic, createdById)
- [ ] `GET /api/worksheets/{id}` — worksheet detail with questions
- [ ] `GET /api/worksheets/{id}/questions` — paginated questions
- [ ] `POST /api/worksheets/{id}/bookmark` — add to favorites
- [ ] `DELETE /api/worksheets/{id}/bookmark` — remove from favorites
- [ ] `GET /api/bookmarks` — mentor's bookmarked worksheets

### Assignment APIs
- [ ] `POST /api/assignments` — assign worksheet to child(ren)
- [ ] `GET /api/assignments?childId=` — list assignments for a child
- [ ] `PATCH /api/assignments/{id}/status` — update status

### Progress APIs
- [ ] `POST /api/submissions` — start a submission (creates record)
- [ ] `PUT /api/submissions/{id}` — update answers (auto-save)
- [ ] `POST /api/submissions/{id}/submit` — final submit, calculate score
- [ ] `GET /api/submissions/{id}` — fetch submission details + score

---

## Mobile Checklist

### Class & Subject Browser
- [ ] Home screen: class pills (horizontal scroll) → Pre-KG, LKG, UKG, Class 1–5
- [ ] Select class → Subject grid (2-col, colored cards with icon)
- [ ] Select subject → Worksheet list (filter bar: All / Mine / Public / Bookmarked)
- [ ] Search bar (search by worksheet title)
- [ ] Filter: type (Interactive / Oral / Image), difficulty (Easy / Medium / Hard), language (EN / HI)

### Worksheet Card
- [ ] Thumbnail image (or subject-colored placeholder)
- [ ] Title, class name, subject name
- [ ] Type badge (Interactive / Oral / Image-based)
- [ ] Difficulty badge (Easy / Medium / Hard) — only if applicable
- [ ] Estimated time
- [ ] Bookmark button (filled/unfilled)
- [ ] Public badge if admin-approved

### Worksheet Detail Screen
- [ ] Full info: title, description, class, subject, type, difficulty, language, total marks
- [ ] Creator info (Mentor name or "KidWorksheets Team" for admin)
- [ ] Preview of first question (blurred if not assigned)
- [ ] "Assign to Child" button (Mentor) / "Start" button (Child)
- [ ] Share button (→ Share Module, Phase 4)

### Interactive Worksheet Player
- [ ] Progress bar at top (question X of N)
- [ ] Question card with question text + optional image
- [ ] MCQ: 4-option button grid (tap to select, highlight selected)
- [ ] Fill in the Blank: text input inline in question sentence
- [ ] True/False: two large buttons (True / False)
- [ ] Match the Following: drag-and-drop pairs OR tap-to-connect lines
- [ ] Short Answer: multiline text input
- [ ] Next / Previous navigation
- [ ] Auto-save answers every 30 seconds (API PUT)
- [ ] Submit button on last question → confirmation dialog → submit
- [ ] Results screen: score, percentage, star rating (1–3 stars), correct answers review
- [ ] Confetti Lottie animation on 80%+ score

### Oral Worksheet Player
- [ ] Title + description
- [ ] Audio player (play/pause/seek) — loads from S3 pre-signed URL
- [ ] Transcript/notes shown below audio (for mentor reference)
- [ ] Mark as "Listened" button → marks assignment complete

### Image-Based Worksheet Viewer
- [ ] Full-screen zoomable image viewer (pinch to zoom, double-tap)
- [ ] Image loaded from S3 pre-signed URL
- [ ] Download to device button (saves to camera roll)
- [ ] Mark as "Viewed" → marks assignment as complete

### Offline Support
- [ ] WatermelonDB schema: classes, subjects, worksheets, questions, assignments, submissions
- [ ] Sync service: on app foreground, sync assigned worksheets for all children
- [ ] Download worksheet assets (images, audio) to expo-file-system on assignment
- [ ] Offline queue: submissions saved locally, pushed to server when online
- [ ] Network status indicator banner ("You're offline — showing cached content")

---

## Screen List

| Screen | Route | Role |
|---|---|---|
| Home / Class Browser | `/(mentor)/home` | Mentor |
| Subject Grid | `/(mentor)/classes/[classId]` | Mentor |
| Worksheet List | `/(mentor)/classes/[classId]/[subjectId]` | Mentor |
| Worksheet Detail | `/(mentor)/worksheets/[id]` | Mentor |
| Worksheet Player | `/(mentor)/worksheets/[id]/play` | Mentor + Child |
| Child Home | `/(child)/home` | Child |
| Child Worksheet List | `/(child)/worksheets` | Child |
| Child Worksheet Player | `/(child)/play/[id]` | Child |
| Results Screen | `/(child)/results/[submissionId]` | Child |

---

## Definition of Done

- [ ] All 3 worksheet types render correctly on iOS + Android
- [ ] Interactive player records answers and calculates score on submit
- [ ] Oral player streams audio from S3
- [ ] Image viewer loads and zooms image from S3
- [ ] Bookmarks persist between sessions
- [ ] App works in airplane mode for previously synced worksheets
- [ ] Offline submissions queue and sync when back online
