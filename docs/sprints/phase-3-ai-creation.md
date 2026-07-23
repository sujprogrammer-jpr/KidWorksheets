# Phase 3: AI Worksheet Creation + Manual Builder + Image Upload

> **Sprint Duration:** Week 8–9
> **Status:** 🔲 Not Started
> **Prerequisite:** Phase 2 complete ✅
> **Goal:** Mentors can create worksheets manually, with AI assistance, or by uploading a homework image.

---

## Objectives

1. Manual worksheet builder — full step-by-step form (all question types)
2. AI worksheet generator — prompt-based with Gemini API
3. Image upload — camera or gallery, stored to S3
4. Draft → Review → Publish workflow
5. Assign created worksheet to children

---

## Backend Checklist

### Worksheet Creation APIs
- [ ] `POST /api/worksheets` — create new worksheet (DRAFT status)
- [ ] `PUT /api/worksheets/{id}` — update worksheet metadata
- [ ] `POST /api/worksheets/{id}/questions` — add a question
- [ ] `PUT /api/worksheets/{id}/questions/{qId}` — update question
- [ ] `DELETE /api/worksheets/{id}/questions/{qId}` — delete question
- [ ] `PATCH /api/worksheets/{id}/questions/reorder` — reorder questions (drag & drop)
- [ ] `PATCH /api/worksheets/{id}/publish` — change status DRAFT → PUBLISHED
- [ ] `PATCH /api/worksheets/{id}/archive` — PUBLISHED → ARCHIVED
- [ ] `DELETE /api/worksheets/{id}` — delete worksheet (DRAFT only)

### AI Generation API
- [ ] `POST /api/ai/generate-worksheet` — body: { classId, subjectId, difficulty, language, prompt, questionCount, questionTypes[] }
- [ ] Backend calls Gemini API with structured system prompt
- [ ] Returns: `{ title, description, questions: Question[] }`
- [ ] Mentor saves → `POST /api/worksheets` with isAiGenerated: true
- [ ] Rate limit: 10 AI generations/day per mentor (FREE tier)

### Image Upload API
- [ ] `POST /api/uploads/worksheet-image` — multipart, returns S3 key + pre-signed URL
- [ ] `POST /api/uploads/question-image` — per-question image upload
- [ ] `POST /api/uploads/audio` — oral worksheet audio upload
- [ ] Validation: max file size (image: 10MB, audio: 50MB)
- [ ] S3 key structure: `worksheets/{mentorId}/{worksheetId}/{filename}`

### Admin Moderation API (stub)
- [ ] `POST /api/admin/worksheets/{id}/approve` — marks worksheet as public (isPublic: true)
- [ ] `POST /api/admin/worksheets/{id}/reject` — keeps private with rejection note

---

## Mobile Checklist

### Creation Entry Point
- [ ] "Create Worksheet" FAB on worksheet list screen
- [ ] Bottom sheet: 3 options — Manual, AI-Assisted, Image Upload
- [ ] Each option has icon + title + description

### Manual Worksheet Builder
- [ ] Step 1 — Worksheet Info: title, description, class, subject, language, difficulty (optional), estimated time
- [ ] Step 2 — Add Questions:
  - [ ] Question type selector (MCQ / Fill Blank / True-False / Match / Short Answer)
  - [ ] MCQ builder: question text + 4 options + mark correct option
  - [ ] Fill in the blank builder: sentence with `[blank]` placeholder
  - [ ] True/False builder: question text + correct answer toggle
  - [ ] Match the Following: add pairs (left ↔ right, up to 8 pairs)
  - [ ] Short Answer: question text + optional expected answer for mentor reference
  - [ ] Optional: add image to any question (camera or gallery)
  - [ ] Marks per question (default: 1)
  - [ ] Reorder questions (drag handle)
  - [ ] Delete question (swipe left or long-press)
- [ ] Step 3 — Review: preview all questions as child would see them
- [ ] Save as Draft / Publish buttons

### AI Worksheet Generator
- [ ] Select class + subject + language + difficulty
- [ ] Prompt input: "Generate 10 MCQ questions about fractions for Class 3"
- [ ] Question types selector (checkboxes): MCQ, Fill Blank, True/False, Match
- [ ] Number of questions slider (5–20)
- [ ] "Generate" button → loading state with fun animation ("AI is thinking...")
- [ ] Preview screen: all generated questions shown as cards
- [ ] Mentor can: Edit any question, Delete question, Add new question
- [ ] Save as Draft / Publish buttons
- [ ] Error state: API failure, rate limit exceeded (with upgrade prompt placeholder)

### Image Upload (Homework/Scan Worksheet)
- [ ] Option 1: Take photo (expo-camera)
- [ ] Option 2: Choose from gallery (expo-image-picker)
- [ ] Image preview + crop/rotate tool
- [ ] Add title + class + subject (no difficulty for IMAGE_BASED type)
- [ ] Upload to S3 → save worksheet (type: IMAGE_BASED)
- [ ] Publish immediately (no question builder needed)

### Oral Worksheet Creator
- [ ] Title + description
- [ ] Audio file upload (from device files) OR record in-app (expo-av)
- [ ] Transcript/notes text input (what the child should practice)
- [ ] Save as ORAL type worksheet

### Worksheet Management (Mentor's Worksheets)
- [ ] "My Worksheets" tab showing: drafts + published + archived
- [ ] Status badge on each card (DRAFT / PUBLISHED / ARCHIVED)
- [ ] Edit → re-opens builder
- [ ] Archive / Delete actions

---

## AI Prompt Engineering (Gemini)

```
System Prompt:
You are an educational worksheet generator for Indian school students.
Generate worksheets for Class: {class}, Subject: {subject}, Language: {language}, 
Difficulty: {difficulty}.

Return ONLY valid JSON in this format:
{
  "title": "string",
  "description": "string",
  "questions": [
    {
      "type": "MCQ" | "FILL_BLANK" | "TRUE_FALSE" | "MATCH" | "SHORT_ANSWER",
      "questionText": "string",
      "options": [...],   // for MCQ
      "correctAnswer": "string | string[]",
      "marks": 1,
      "orderIndex": 1
    }
  ]
}

User Prompt: {mentor's prompt}
Generate {count} questions of types: {types}.
```

---

## Definition of Done

- [ ] Mentor can create, save, and publish a worksheet with all 5 question types
- [ ] AI generator produces valid JSON from Gemini, renders correctly in preview
- [ ] Image upload stores to S3 and is viewable in worksheet viewer
- [ ] Oral worksheet plays uploaded audio correctly
- [ ] Draft worksheets auto-save every 60 seconds
- [ ] Published worksheets appear in the mentor's worksheet list immediately
