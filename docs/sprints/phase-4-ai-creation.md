# Phase 4: AI Worksheet Creation + Image Upload

> **Sprint Duration:** Week 10–11
> **Status:** 🔲 Not Started
> **Prerequisite:** Phase 2 + Phase 3 complete ✅
> **Goal:** Mentor can generate worksheets using AI prompt or by uploading a photo of a physical worksheet. All processing is server-side via n8n + Gemini API.

---

## Objectives

1. AI prompt-based worksheet generation (mentor writes prompt → AI creates questions)
2. Image-upload worksheet recreation (mentor uploads photo → AI extracts and recreates digitally)
3. Both modes respect selected writing style, question types, difficulty, language
4. Mentor reviews, edits, and publishes AI-generated worksheets
5. Rate limiting: 10 AI generations/day per mentor (free tier)
6. All AI processing is strictly server-side (zero client AI access)

---

## Architecture: AI Pipeline (Server-Side Only)

```
Mobile App (mentor tap "Generate")
    ↓
POST /api/ai/generate-worksheet
    ↓
Backend API Service (Express.js)
    ↓ (webhook trigger)
n8n Automation Workflow (Linux server)
    ↓
Google Gemini API (gemini-1.5-pro)
    ↓ (structured JSON response)
n8n formats + validates response
    ↓
Response back to API → back to mobile
    ↓
Mobile: preview screen (mentor edits)
    ↓
Mentor saves → POST /api/worksheets
```

For IMAGE-BASED:
```
Mobile: mentor photos/uploads image
    ↓
POST /api/uploads/worksheet-scan (multipart)
    ↓
File Service → S3 (temp bucket)
    ↓
POST /api/ai/recreate-from-image (with S3 key)
    ↓
n8n → Gemini Vision API (multimodal)
    ↓ (extracts questions from image)
Structured JSON → API → Mobile preview
```

---

## Backend Checklist

### AI Generation APIs
- [ ] `POST /api/ai/generate-worksheet` — body: { classId, subjectId, difficulty, language, prompt, questionCount, questionTypes[], writingStyle }
  - Returns: `{ title, description, questions: Question[] }`
  - Rate limit: 10/day per mentor (Redis counter)
  - Background job via AWS SQS + n8n webhook
- [ ] `GET /api/ai/usage` — get mentor's AI usage today (count + limit)
- [ ] `POST /api/ai/recreate-from-image` — body: { s3Key, classId, subjectId, language }
  - Triggers Gemini Vision analysis
  - Returns extracted worksheet structure

### Upload APIs
- [ ] `POST /api/uploads/worksheet-scan` — mentor uploads worksheet photo
  - Validates: image only (jpg/png/webp), max 20MB
  - Stores to S3: `scans/{mentorId}/{timestamp}.jpg`
  - Returns S3 key for use in recreate-from-image call

### n8n Workflow (Linux Server)

**Workflow 1: Text-Prompt Generation**
```
Webhook trigger (from API)
    ↓
Set Gemini system prompt:
  "You are an educational worksheet creator for Indian school students.
   Class: {class}, Subject: {subject}, Language: {language}, 
   Difficulty: {difficulty}.
   Writing style context: {writingStyle}
   Generate {count} questions of types: {types}.
   Return ONLY valid JSON: { title, description, questions: [...] }"
    ↓
HTTP Request → Gemini API (gemini-1.5-pro)
    ↓
JSON parser + schema validator
    ↓
Return to webhook caller
```

**Workflow 2: Image Recreation**
```
Webhook trigger (with S3 image key)
    ↓
Download image from S3 (pre-signed URL)
    ↓
Encode image as base64
    ↓
Gemini Vision prompt:
  "Analyze this worksheet image. Extract all questions and answers.
   Return as structured JSON with question types (MCQ/Fill Blank/etc.)."
    ↓
JSON parser + structure normalizer
    ↓
Return to webhook caller
```

### Gemini Structured Output Schema
```json
{
  "title": "string",
  "description": "string",
  "questions": [
    {
      "type": "MCQ | FILL_BLANK | TRUE_FALSE | MATCH | SHORT_ANSWER",
      "questionText": "string",
      "options": [{"id": "a", "text": "string"}],
      "correctAnswer": "a",
      "explanation": "string (optional)",
      "marks": 1,
      "orderIndex": 1
    }
  ]
}
```

---

## Mobile Checklist

### Screen 24 — AI Worksheet Generator
- [ ] Entry: "Create Worksheet" → "AI-Assisted" option (now active, not "Coming Soon")
- [ ] Settings pre-filled from subject: class, subject, language, difficulty, writing style
- [ ] Prompt input: large multiline text box
  - Placeholder: "E.g., Generate 10 questions about addition and subtraction for Class 2"
  - Character limit: 500
- [ ] Question types selector (checkboxes):
  - [ ] MCQ / Fill Blank / True-False / Match / Short Answer
  - [ ] At least 1 must be selected
- [ ] Question count slider: 5–20 questions
- [ ] Language selector: EN / HI / Bilingual
- [ ] Difficulty selector: Easy / Medium / Hard
- [ ] Usage indicator: "3/10 AI generations used today"
- [ ] "Generate" button → loading animation ("AI is creating your worksheet...")
  - Fun Lottie animation: stars + pencil drawing
- [ ] Error handling:
  - Rate limit hit → "You've used all 10 daily generations. Try again tomorrow." + upgrade prompt placeholder
  - API failure → retry option
  - Invalid response → "Couldn't generate. Try rephrasing your prompt."

### Screen 25 — AI Preview & Edit
- [ ] Generated worksheet shown in review mode
- [ ] Mentor can: Edit any question (same editors as manual builder), Delete question, Add new question
- [ ] Question count + total marks shown in header
- [ ] "Regenerate" button (uses another generation credit) with confirmation
- [ ] "Save as Draft" / "Publish" buttons → saves with isAiGenerated = true

### Screen 26 — Image Upload Worksheet Creator
- [ ] Entry: "Create Worksheet" → "Upload Image" option (now active)
- [ ] Two upload options:
  - [ ] 📷 Take Photo — opens camera (expo-camera)
  - [ ] 🖼️ Choose from Gallery — expo-image-picker
- [ ] Image preview with crop/rotate tools
- [ ] Upload progress indicator (S3 upload)
- [ ] "Analyze Worksheet" button → sends to AI
- [ ] Loading: "AI is reading your worksheet..." (Lottie animation)
- [ ] Results on Screen 25 (same AI preview screen, isImageBased = true)
- [ ] Error: "Couldn't read the worksheet clearly. Please try a clearer photo."
- [ ] Tips shown below: "For best results: good lighting, flat surface, full page visible"

---

## Rate Limiting Implementation

```typescript
// Redis-based rate limit per mentor
const AI_DAILY_LIMIT = 10;
const key = `ai_usage:${mentorId}:${todayDate}`;

// On each generation request:
const count = await redis.incr(key);
if (count === 1) await redis.expire(key, 86400); // expire at midnight
if (count > AI_DAILY_LIMIT) throw new RateLimitError('Daily AI limit reached');
```

---

## Definition of Done

- [ ] Mentor can generate a worksheet from a text prompt with all question types
- [ ] Generated questions are valid (MCQ has 4 options, etc.) — schema validated
- [ ] Mentor can edit any generated question before saving
- [ ] Image upload sends photo to AI, returns recognizable worksheet structure
- [ ] Rate limit works: 11th request is blocked with clear error message
- [ ] isAiGenerated / isImageBased flags saved correctly in DB
- [ ] Hindi language worksheets generate correctly (Gemini Hindi support)
- [ ] All AI processing is server-side — zero AI SDK in mobile app
