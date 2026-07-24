# Phase 3: Student Module — CRM + Enrollment + PIN + Play Experience

> **Sprint Duration:** Week 8–9
> **Status:** 🔲 Not Started
> **Prerequisite:** Phase 2 complete ✅
> **Goal:** Mentor can enroll students with full CRM profiles. Students log in via PIN. Full student play experience working end-to-end.

---

## Objectives

1. Mentor creates a full student CRM profile (all fields)
2. Mentor enrolls student into a class
3. Mentor selects which subjects student has access to
4. Mentor creates and assigns a PIN to student
5. Mentor assigns worksheets to students
6. Student selects their profile, enters PIN, enters their learning space
7. Student sees classes → subjects → worksheets
8. Full end-to-end: mentor creates worksheet → assigns → student plays → results shown to mentor

---

## Backend Checklist

### Student (CRM) APIs
- [ ] `POST /api/students` — create student profile (full CRM fields)
- [ ] `GET /api/students` — list mentor's students (with search/filter)
- [ ] `GET /api/students/{id}` — student detail
- [ ] `PUT /api/students/{id}` — update student profile
- [ ] `DELETE /api/students/{id}` — soft delete (isActive = false)
- [ ] `POST /api/uploads/student-photo` — profile photo → S3

### Student PIN APIs
- [ ] `POST /api/students/{id}/pin` — set / reset PIN (mentor action)
- [ ] `POST /api/students/{id}/verify-pin` — verify PIN at login (returns student session token)

### Enrollment APIs
- [ ] `POST /api/enrollments` — enroll student in a class (studentId, classId)
- [ ] `GET /api/enrollments?classId=` — list enrollments for a class
- [ ] `DELETE /api/enrollments/{id}` — remove student from class
- [ ] `PUT /api/enrollments/{id}/subjects` — set/update subject access array
- [ ] `GET /api/students/{id}/classes` — all classes a student is enrolled in (for student login view)

### Assignment APIs
- [ ] `POST /api/assignments` — assign worksheet to student (worksheetId, enrollmentId)
- [ ] `GET /api/assignments?studentId=` — list assignments for a student
- [ ] `PATCH /api/assignments/{id}/status` — update status (PENDING → IN_PROGRESS → COMPLETED)

### Student Session
- [ ] Student session JWT: 4-hour token, scoped to student + mentor
- [ ] Payload: { studentId, mentorId, classIds[], subjectIds[] }
- [ ] Cannot access any mentor API endpoints
- [ ] Refresh: re-enter PIN (no silent refresh for students)

---

## Mobile Checklist

### Mentor — Student Management

#### Student List (Screen 29)
- [ ] Class Detail → Students tab: list of enrolled students
- [ ] Student card: photo thumbnail, name, PIN status (Set/Not Set), enrolled subjects count
- [ ] Search bar (by name)
- [ ] "Enroll Student" FAB

#### Enroll Student (Screen 30)
- [ ] Two tabs:
  - [ ] "Create New Student" — full CRM form
  - [ ] "Link Existing Student" — search by name from mentor's other students
- [ ] CRM Form fields:
  - [ ] Student Name* (required)
  - [ ] Father Name
  - [ ] Mother Name
  - [ ] Primary Mobile* (required, for reference only)
  - [ ] Emergency Contact
  - [ ] WhatsApp Contact
  - [ ] Gender (Male / Female / Other — segmented)
  - [ ] Date of Birth (date picker)
  - [ ] Email
  - [ ] School Name
  - [ ] Fees (₹) — numeric input
  - [ ] Notes — multiline text
  - [ ] Profile Photo — camera / gallery → S3
- [ ] "Save & Enroll" button → creates student + creates enrollment

#### Student Profile (Screen 31)
- [ ] Header: photo, name, school, enrollment date
- [ ] Section: Family Info (father, mother, contacts)
- [ ] Section: Academic (enrolled subjects as chips, class name)
- [ ] Section: Fees (amount + "Paid / Unpaid" toggle — display only)
- [ ] Section: Notes
- [ ] Action buttons: Edit | Change PIN | Remove from Class

#### Edit Student (Screen 32)
- [ ] Same CRM form, pre-filled with current data
- [ ] "Save Changes" button → PUT /api/students/{id}

#### Student Subject Access (Screen 33)
- [ ] List of subjects in the class (checkboxes)
- [ ] Toggle which subjects student is enrolled in
- [ ] "Save" → PUT /api/enrollments/{id}/subjects

#### Student PIN Setup (Screen 34)
- [ ] "Set PIN" or "Reset PIN" header
- [ ] 6-digit PIN entry: custom keypad (no OS keyboard)
- [ ] Confirm PIN re-entry
- [ ] Strength indicator (visual only)
- [ ] "Save PIN" → POST /api/students/{id}/pin

#### Assign Worksheet (Screen 35)
- [ ] Multi-step:
  - [ ] Step 1: Select student(s) (checkboxes on student list)
  - [ ] Step 2: Select worksheets (from published worksheets for this subject)
  - [ ] Optional: set due date
- [ ] Assign → confirmation dialog → POST /api/assignments

---

### Student (Child) — Login Flow (Screens 46–47)

#### Student Login Entry (Screen 46)
- [ ] "Student Login" selected from home (/(auth)/select-login)
- [ ] Mentor must be logged in OR student selects from existing mentor account
- [ ] Shows a horizontal scroll of enrolled student profiles (avatar, name)
- [ ] "Select your profile" label
- [ ] Student taps their photo/avatar card → goes to PIN screen

#### PIN Entry (Screen 47)
- [ ] Student's name + avatar shown at top
- [ ] Custom 6-dot PIN display (masked circles, fills as digits entered)
- [ ] Custom numeric keypad (3×4 grid, no OS keyboard — prevents shoulder surfing)
- [ ] Wrong PIN: shake animation + "Wrong PIN. Try again." message
- [ ] 5 wrong attempts: 30-second cooldown with countdown timer
- [ ] "Not you? Go back" link
- [ ] Correct PIN → student session token → Student Home

---

### Student — Learning Experience (Screens 48–57)

#### Student Home (Screen 48)
- [ ] Warm cream background, Nunito font, playful design
- [ ] Greeting: "Hello [Name]! 👋 Ready to learn?"
- [ ] My Classes card grid (classes student is enrolled in)
- [ ] Recent activity section (last played worksheet)
- [ ] Progress summary: stars earned, streak days

#### Class → Subject → Worksheet Navigation (Screens 49–52)
- [ ] Class list: only enrolled classes shown
- [ ] Subject list: only enrolled subjects shown (with colored cards)
- [ ] Worksheet list: Assigned first (with due date badge), then Public
- [ ] Worksheet card: title, type badge, status (New / In Progress / Done / Overdue)
- [ ] Worksheet Detail: full info + "Start" button (or "Continue" if in progress)

---

## Mentor — Progress View After Student Completes

#### Progress Dashboard (Screen 36)
- [ ] Student cards with completion ring
- [ ] Filter by class + subject
- [ ] Sort by: recent activity, score, completion rate

#### Student Progress Detail (Screen 37)
- [ ] Assigned worksheets list with status + score
- [ ] Subject-wise breakdown (bar chart)
- [ ] Streak calendar

#### Submission Review (Screen 38)
- [ ] All questions shown in sequence
- [ ] Auto-graded answers: ✅/❌ shown inline
- [ ] Short answer: mentor sees typed text → manual grade (marks input)
- [ ] Drawing/Writing mode: shows the student's drawn image → manual grade (marks input)
- [ ] "Save Grades" → updates submission score

---

## Data Flow: End-to-End

```
Mentor creates worksheet (Phase 2)
    ↓
Mentor assigns worksheet to student
    [POST /api/assignments]
    ↓
Student logs in → selects profile → enters PIN
    [POST /api/students/{id}/verify-pin] → student JWT
    ↓
Student navigates to worksheet
    [GET /api/assignments?studentId=]
    ↓
Student starts worksheet → auto-save answers
    [POST /api/submissions]
    [PUT /api/submissions/{id}] (every 30s)
    ↓
Student submits
    [POST /api/submissions/{id}/submit]
    → Auto-grade MCQ/TF/Match/FillBlank
    → Flag Short Answer / Drawing for manual review
    ↓
Student sees results screen (score + stars)
    ↓
Mentor sees progress dashboard updated
    [GET /api/progress?studentId=]
```

---

## Definition of Done

- [ ] Mentor creates full student profile with all CRM fields including photo upload
- [ ] PIN setup works: correct PIN lets student in; wrong PIN shows shake + cooldown
- [ ] Student sees only their enrolled classes/subjects/worksheets
- [ ] End-to-end: mentor creates → assigns → student plays → results visible to mentor
- [ ] Auto-grading fires correctly for MCQ/TF/Match/FillBlank questions
- [ ] Drawing submissions save image to S3 and mentor can view + grade them
- [ ] Student home shows correct progress (stars, streaks)
