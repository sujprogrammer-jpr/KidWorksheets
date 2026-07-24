# Phase 2: Core Flow — Class → Subject → Manual Worksheet Builder

> **Sprint Duration:** Week 5–7
> **Status:** 🔲 Not Started
> **Prerequisite:** Phase 1 complete ✅
> **Goal:** Mentor can create classes, subjects, and manually build all worksheet types. Student can browse and play worksheets. Offline sync working.

---

## Objectives

1. Mentor creates and manages own classes (free-text, no admin dependency)
2. Mentor creates subjects per class with default writing style
3. Mentor builds a WRITTEN worksheet (all 5 question types) using typed input
4. Mentor builds an ORAL worksheet (audio + notes)
5. Mentor sets child response mode per worksheet
6. Draft → Publish workflow working
7. Student can browse: Classes → Subjects → Worksheets
8. Student plays a WRITTEN worksheet (Interactive Player)
9. Student plays an ORAL worksheet (Audio Player)
10. Auto-grading for MCQ, True/False, Match, Fill Blank
11. Offline caching — assigned worksheets available without internet

---

## Backend Checklist

### Class APIs
- [ ] `POST /api/classes` — create new class (mentor-scoped, free-text name)
- [ ] `GET /api/classes` — list mentor's classes
- [ ] `PUT /api/classes/{id}` — update class name
- [ ] `DELETE /api/classes/{id}` — delete class (only if no enrolled students)
- [ ] `GET /api/classes/public` — list admin-promoted public classes (for discovery)

### Subject APIs
- [ ] `POST /api/classes/{classId}/subjects` — create subject (name, icon, color, defaultWritingStyle)
- [ ] `GET /api/classes/{classId}/subjects` — list subjects for class
- [ ] `PUT /api/subjects/{id}` — update subject (name, icon, color, defaultWritingStyle)
- [ ] `DELETE /api/subjects/{id}` — delete subject (only if no worksheets)
- [ ] `GET /api/subjects/public` — list admin-promoted public subjects

### Worksheet CRUD APIs
- [ ] `POST /api/worksheets` — create worksheet shell (DRAFT)
- [ ] `PUT /api/worksheets/{id}` — update metadata
- [ ] `GET /api/worksheets?subjectId=&status=` — list worksheets
- [ ] `GET /api/worksheets/{id}` — worksheet detail with questions
- [ ] `PATCH /api/worksheets/{id}/publish` — DRAFT → PUBLISHED
- [ ] `PATCH /api/worksheets/{id}/archive` — PUBLISHED → ARCHIVED
- [ ] `DELETE /api/worksheets/{id}` — delete (DRAFT only)

### Question APIs
- [ ] `POST /api/worksheets/{id}/questions` — add question
- [ ] `PUT /api/worksheets/{id}/questions/{qId}` — update question
- [ ] `DELETE /api/worksheets/{id}/questions/{qId}` — delete question
- [ ] `PATCH /api/worksheets/{id}/questions/reorder` — bulk reorder

### Upload APIs
- [ ] `POST /api/uploads/question-image` — mentor draws question → upload PNG → S3
- [ ] `POST /api/uploads/audio` — oral worksheet audio → S3
- [ ] `POST /api/uploads/drawing` — student drawn answer → S3

### Submission APIs
- [ ] `POST /api/submissions` — start submission
- [ ] `PUT /api/submissions/{id}` — auto-save answers (every 30s)
- [ ] `POST /api/submissions/{id}/submit` — final submit + auto-grade
- [ ] `GET /api/submissions/{id}` — fetch submission details

---

## Mobile Checklist

### Mentor — Class Management
- [ ] Dashboard: class cards (grid layout), "Create Class" FAB
- [ ] Create Class screen: text input for name, confirm button
- [ ] Class card: name, subject count, student count
- [ ] Class Detail: subjects tab + students tab + actions menu

### Mentor — Subject Management
- [ ] Subject list in Class Detail (2-col grid, colored cards)
- [ ] Create Subject: name, emoji picker (inline grid), color picker, writing style selector
- [ ] Writing Style Selector UI:
  - [ ] 10 visual option cards (2-col grid)
  - [ ] Each card renders actual lines/grid/dots preview (using react-native-skia)
  - [ ] Options: Textbox, 4L Straight, 4L Dotted, 3L Straight, 3L Dotted, 2L Straight, 2L Dotted, 1L Straight, 1L Dotted, Grid, Blank Canvas
  - [ ] Selected card: violet border + checkmark
- [ ] Subject card: name, emoji, color, worksheet count, default writing style badge

### Mentor — Worksheet Builder (Written)
- [ ] Screen 15: Choose creation mode — Manual (active) | AI (Coming Soon) | Image (Coming Soon)
- [ ] Screen 16: Worksheet Settings:
  - [ ] Worksheet style: Written / Oral toggle
  - [ ] Title, description, language, difficulty (Written only)
  - [ ] Writing style picker (pre-filled from subject default)
  - [ ] Mentor input mode: Typing / Writing toggle
  - [ ] Child response mode: Typing / Writing / Drawing selector
  - [ ] Estimated time
- [ ] Screen 17: Canvas Editor:
  - [ ] Notebook-style page with selected writing style as visual background
  - [ ] Question list (ordered) shown on page
  - [ ] "+" Add Question FAB → type picker bottom sheet (MCQ / Fill Blank / True-False / Match / Short Answer)
  - [ ] Each question card: type icon, question preview, marks, edit/delete
  - [ ] Drag handle for reorder (Reanimated v3)
  - [ ] Swipe left → delete (undo snackbar)
- [ ] Question Editors (Modals):
  - [ ] MCQ: question text OR canvas draw field + 4 options + correct selector + marks + explanation
  - [ ] Fill Blank: sentence with [blank] button + correct fill + marks
  - [ ] True/False: statement + True/False toggle + marks
  - [ ] Match: left-right pair rows (2–8) + add/remove pair buttons + marks
  - [ ] Short Answer: question + model answer (mentor ref only) + marks + writing style override
  - [ ] ALL: optional question image (camera/gallery → S3)
  - [ ] ALL: if mentor input mode = WRITING → show canvas draw field (react-native-skia) instead of text input
- [ ] Screen 23: Review — renders worksheet as student will see it (read-only with writing areas)
- [ ] Save Draft / Publish buttons + publish confirmation dialog
- [ ] Auto-save every 60 seconds when isDirty

### Mentor — Worksheet Builder (Oral)
- [ ] Screen 16 with style = Oral: hides question-related fields
- [ ] Audio: upload from files OR record in-app (expo-av)
- [ ] Transcript/notes text input
- [ ] Save + Publish

### Mentor — My Worksheets (Screen 27)
- [ ] Tabs: All | Drafts | Published | Archived
- [ ] Card: title, subject, class, style badge (Written/Oral), writing style badge, response mode badge
- [ ] Actions: Edit | Publish | Archive | Delete | Assign
- [ ] Pull-to-refresh

### Student — Browse Flow (Screens 48–52)
- [ ] Student Home: class cards
- [ ] Class → Subject list (filtered to enrolled subjects only)
- [ ] Subject → Worksheet list (assigned + public visible)
- [ ] Worksheet card: title, type badge, difficulty badge, status (Assigned/New/Completed)
- [ ] Worksheet Detail: info + "Start" button

### Student — Interactive Player (Written) (Screen 53)
- [ ] Progress bar: Question X of N
- [ ] Question text OR drawn question image
- [ ] Writing area rendered per WritingStyle:
  - [ ] TEXTBOX: plain TextInput box
  - [ ] LINES_4_STRAIGHT: 4-line ruled TextInput (rendered with Skia lines behind)
  - [ ] LINES_4_DOTTED: 4-line dotted TextInput
  - [ ] LINES_3_STRAIGHT / DOTTED: 3-line variants
  - [ ] LINES_2_STRAIGHT / DOTTED: 2-line variants
  - [ ] LINES_1_STRAIGHT / DOTTED: 1-line variants
  - [ ] GRID: grid-background TextInput (monospace font)
  - [ ] BLANK_CANVAS: drawing canvas (react-native-skia)
- [ ] ChildResponseMode rendering:
  - [ ] TYPING: keyboard TextInput styled with writing style
  - [ ] WRITING: Skia canvas with writing style guidelines + finger draw
  - [ ] DRAWING: Skia blank canvas + color/size tools
- [ ] MCQ: tap option buttons (no writing area)
- [ ] True/False: two large tap buttons (no writing area)
- [ ] Match: drag-and-drop pairs (no writing area)
- [ ] Fill Blank: inline text input in sentence
- [ ] Short Answer: writing area as configured
- [ ] Next/Prev navigation
- [ ] Auto-save every 30s
- [ ] Submit → confirmation → results

### Student — Oral Player (Screen 54)
- [ ] Audio player: play/pause/seek + progress bar
- [ ] Transcript/notes shown below
- [ ] "Mark as Done" button → completes assignment

### Student — Results Screen (Screen 55)
- [ ] Score, percentage, star rating (1–3 stars)
- [ ] Auto-graded questions: show correct/wrong
- [ ] Short answer / Drawing: "Awaiting review by mentor"
- [ ] Confetti Lottie on 80%+

### Offline Support
- [ ] WatermelonDB schema: classes, subjects, worksheets, questions, assignments, submissions
- [ ] Sync on app foreground: assigned worksheets + assets
- [ ] Offline queue: submissions saved locally, pushed when online
- [ ] Network banner: "You're offline — showing cached content"

---

## Writing Style Canvas Component (react-native-skia)

```typescript
// WritingArea component — used in both player and builder
interface WritingAreaProps {
  style: WritingStyle;
  mode: ChildResponseMode;
  value?: string;
  onChangeText?: (text: string) => void;
  onDrawingComplete?: (imageUri: string) => void;
  readOnly?: boolean;
  width: number;
  height: number;
}
```

- Lines rendered as Skia `Path` elements (horizontal lines at equal spacing)
- Dotted lines use `dashEffect` on Skia paths
- Grid uses cross-hatch Skia paths (configurable cell size: 20px for GRID)
- Drawing canvas: Skia `Canvas` with touch gesture path drawing
- Clear button: resets all Skia paths
- PDF export: same Skia paths converted to SVG → embedded in HTML template

---

## QuestionFactory (OOP)

```typescript
class QuestionFactory {
  static getBuilder(type: QuestionType): QuestionBuilder
}

// Each builder implements:
abstract class QuestionBuilder {
  buildQuestion(data: QuestionFormData): Question
  buildValidationSchema(): ZodSchema
  buildEditorComponent(): React.ComponentType<QuestionEditorProps>
  supportsWritingArea(): boolean
  defaultWritingStyle(): WritingStyle
}
```

---

## Screen List

| Screen | Route | Role |
|---|---|---|
| Dashboard | `/(mentor)/home` | Mentor |
| My Classes | `/(mentor)/classes` | Mentor |
| Create Class | `/(mentor)/classes/create` | Mentor |
| Class Detail | `/(mentor)/classes/[classId]` | Mentor |
| Create Subject | `/(mentor)/classes/[classId]/subjects/create` | Mentor |
| Subject Detail | `/(mentor)/classes/[classId]/subjects/[subjectId]` | Mentor |
| Create Worksheet — Mode | `/(mentor)/create/[subjectId]` | Mentor |
| Worksheet Settings | `/(mentor)/create/[subjectId]/settings` | Mentor |
| Canvas Editor | `/(mentor)/create/[subjectId]/editor` | Mentor |
| Worksheet Review | `/(mentor)/create/[subjectId]/review` | Mentor |
| My Worksheets | `/(mentor)/my-worksheets` | Mentor |
| Student Home | `/(student)/home` | Student |
| Student Classes | `/(student)/classes` | Student |
| Student Subjects | `/(student)/classes/[classId]/subjects` | Student |
| Student Worksheets | `/(student)/subjects/[subjectId]/worksheets` | Student |
| Interactive Player | `/(student)/play/[id]` | Student |
| Oral Player | `/(student)/oral/[id]` | Student |
| Results | `/(student)/results/[submissionId]` | Student |

---

## Definition of Done

- [ ] Mentor creates class + subject + worksheet with all 5 question types → publishes
- [ ] Writing style visually renders correctly in player (lines/grid/dots visible)
- [ ] Writing mode: student draws answer, image saved to S3
- [ ] Typing mode: student types answer, auto-graded (MCQ/TF/Match/FillBlank)
- [ ] Oral worksheet: audio plays from S3, student marks done
- [ ] App works in airplane mode for previously synced worksheets
- [ ] Auto-save works — draft not lost on close
