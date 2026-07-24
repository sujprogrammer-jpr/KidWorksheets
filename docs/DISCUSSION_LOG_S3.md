# Requirements Update Session — 2026-07-24 (Session 3)

> **Added to:** [IMPLEMENTATION_PLAN.md](./IMPLEMENTATION_PLAN.md)
> **Session:** App Flow Revision + Clarifications
> **Participants:** Project Owner (sujprogrammer-jpr) + AI Architect (Antigravity)

---

## Summary

In Session 3, the project owner described the complete revised app flow from scratch,
identified gaps in existing documentation (writing area styles), and provided key
clarifications on multiple open questions. This session results in **v4.0** of the plan.

---

## Revised App Flow (As Described by Owner)

### Mentor Flow
1. Sign up via Gmail (Google Sign-In)
2. Dashboard
3. Create or Select Class
4. Go to Class → Create or Select Subject (with default Writing Style)
5. Go to Subject → Create Worksheet (Written or Oral)
   - If Written: Q&A worksheet with question types + writing style
   - If Oral: simple audio/blank canvas
   - Mentor inputs questions by TYPING or WRITING on canvas
   - Mentor sets child response mode (Typing / Writing / Drawing)
   - Review → Save Draft → Publish
6. Dashboard → Class → Enroll Student (full CRM profile)
7. For each student: edit info, assign subjects, create PIN
8. Students log in → select profile → enter PIN → access worksheets

### Student (Child) Flow
1. Select "Child Login" on app
2. Select their profile (from mentor's enrolled students)
3. Enter PIN
4. See assigned worksheets (via mentor → class → subject hierarchy)

---

## Decisions & Clarifications Made

### Decision S3-01 — Worksheet Type = INTERACTIVE (Digital Platform)
**Context:** Owner confirmed worksheet type stays INTERACTIVE for written worksheets
since it's a digital platform. Written = Interactive Q&A. Oral = audio revision.
**Decision:** WorksheetStyle enum = `WRITTEN (INTERACTIVE)` | `ORAL`
IMAGE_BASED remains available via AI image-upload flow.

### Decision S3-02 — AI Creation IS IN SCOPE (Not Deferred)
**Context:** Owner confirmed mentors must have AI-assisted creation options:
- Option A: Mentor prompts AI → AI generates worksheet matching selected style + settings
- Option B: Mentor uploads photo of a physical worksheet → AI recreates it digitally

Both processed **server-side** via n8n + Gemini API (zero client AI).
**Decision:** AI creation is Phase 4 (after core manual flow), not deferred indefinitely.

### Decision S3-03 — Admin Has Full Access to Everything
**Context:** Admin sees all mentor content — classes, subjects, worksheets, students, settings.
Admin can edit anything at any time.
**Key power:** Admin can mark Mentor's classes/subjects as **PUBLIC** → they appear in
other mentors' dashboards as templates/public content.
**Decision:** Admin panel has complete read/write access. Public content system via admin.

### Decision S3-04 — Child Login Stays as Profile Under Mentor
**Context:** Open Question Q10 from session asked about mobile+PIN independent child login.
Owner clarified: "I need better child login — manage it as a profile under mentor only."
**Decision:** Revert to profile-under-mentor model. Child selects their profile from
mentor's list, enters PIN. No independent mobile-number-based login.
Enhancement: better UX — avatar-based profile picker, secure custom keypad.

### Decision S3-05 — Mentor Creates Own Classes and Subjects
**Context:** Confirmed — mentors create their own classes (free-text naming: "Class 5A",
"Morning Batch", "UKG Group") and their own subjects.
Admin can see these and mark them public for others to use.
**Decision:** Classes and subjects are mentor-owned. Admin promotes to public if appropriate.

### Decision S3-06 — Writing Style = 10 Options (Straight + Dotted Variants)
**Context:** Writing Style options clarified with straight/dotted variants for each line count.
**Decision:**
```
TEXTBOX
LINES_4_STRAIGHT | LINES_4_DOTTED
LINES_3_STRAIGHT | LINES_3_DOTTED
LINES_2_STRAIGHT | LINES_2_DOTTED
LINES_1_STRAIGHT | LINES_1_DOTTED
GRID
BLANK_CANVAS
```
Set as default at Subject level. Overridable per Worksheet. Overridable per Question.

### Decision S3-07 — Student Profile = Full CRM Record
**Context:** Student profile confirmed as full coaching-center-style CRM:
name, father name, mother name, primary mobile, emergency contact, WhatsApp,
gender, DOB, email, notes, fees (₹), profile photo, school name.
**Decision:** Student model is a full CRM entity under mentor's account.

### Decision S3-08 — Student Enrolled Per Subject (Not Whole Class)
**Context:** Mentor can choose which subjects a student is enrolled in.
A student in "Class 5" might only study Maths + Science with this mentor.
**Decision:** `StudentSubjectAccess` join table per enrollment.

### Decision S3-09 — Fees Field = Informational Only (Phase 1)
**Context:** Fees field in student profile captures what mentor charges the student.
No Razorpay payment integration in Phase 1 (per existing freemium decision).
**Decision:** Fees stored as informational field. Fee payment tracking in future phase.

### Decision S3-10 — Mentor Question Entry: Structured + Handwriting Input
**Context:** Mentor enters questions "like writing in a notebook, at any position."
Interpreted as: structured question types (MCQ, Fill Blank etc.) added to a page
that visually resembles a notebook (with the selected writing style as background).
Mentor can TYPE or WRITE (draw with finger) into each question field.
**Decision:** Questions remain structured (typed form OR handwritten canvas per field),
presented on a notebook-style page. Not pixel-level free-form positioning in Phase 1.

### Decision S3-11 — Oral Worksheet = Audio + Notes
**Context:** Oral worksheet confirmed as simple — audio content + transcript/notes.
**Decision:** Oral worksheet = mentor uploads audio OR records in-app + optional text notes.
Child listens and marks "done." No Q&A. Child response mode: not applicable for Oral.

### Decision S3-12 — Auto-Grade Where Possible
**Context:** Grading approach derived from digital platform nature.
**Decision:**
- MCQ, True/False, Match, Fill Blank → auto-graded (correct answer known)
- Short Answer → manual grading by mentor (Phase 1: marked complete, graded later)
- Writing Mode submissions → saved as image, mentor views and grades manually

---

## Open Questions (Carry Forward to Next Session)

The following questions from Session 3 planning were NOT explicitly answered.
Will be clarified before implementation begins:

| Q# | Question | Why It Matters |
|---|---|---|
| Q5 | Freeform canvas vs. structured form for mentor question entry | Affects builder architecture |
| Q6 | Fees: just notes, or track paid/unpaid history? | Affects student model |
| Q7 | Admin panel: Can admin create worksheets directly (not from mentor)? | Affects admin create flow |

---

## What Changed vs. v3.0

| Area | Before (v3.0) | After (v4.0) |
|---|---|---|
| Class ownership | Admin-seeded global list | Mentor-created, admin can publicize |
| Subject ownership | Admin-seeded global list | Mentor-created, admin can publicize |
| Worksheet type | INTERACTIVE \| ORAL \| IMAGE_BASED | WRITTEN (Interactive) \| ORAL |
| Writing styles | 7 options | 10 options (straight+dotted variants) |
| AI creation | Deferred to Phase 3-B | Phase 4 (in scope) |
| Student profile | name, age, avatar, PIN | Full CRM (10+ fields) |
| Student-subject | Class-level mapping | Subject-level mapping |
| Child login | Profile under mentor | Profile under mentor (better UX) |
| Admin | Full access confirmed | Full access + public marking power |

---

*Update logged: 2026-07-24 (Session 3) | Major flow revision — v4.0 plan initiated*
