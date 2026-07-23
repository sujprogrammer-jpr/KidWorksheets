# Data Models — KidWorksheets

> **Document Type:** Database Schema & TypeScript Models
> **Version:** 1.0
> **Last Updated:** 2026-07-23
> **ORM:** Prisma | **Database:** PostgreSQL

---

## Prisma Schema

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ─────────────────────────────────────────
// ENUMS
// ─────────────────────────────────────────

enum UserRole {
  MENTOR
  ADMIN
}

enum SubscriptionPlan {
  FREE
  PREMIUM
}

enum Language {
  EN
  HI
  BILINGUAL
}

enum WorksheetType {
  INTERACTIVE   // Q&A in-app
  ORAL          // Audio-based oral revision
  IMAGE_BASED   // Scanned homework image
}

enum WorksheetStatus {
  DRAFT
  PUBLISHED
  ARCHIVED
}

enum DifficultyLevel {
  EASY
  MEDIUM
  HARD
}

enum QuestionType {
  MCQ
  FILL_BLANK
  TRUE_FALSE
  MATCH
  SHORT_ANSWER
}

enum AssignmentStatus {
  PENDING
  IN_PROGRESS
  COMPLETED
}

enum SubmissionStatus {
  IN_PROGRESS
  SUBMITTED
}

enum NotificationType {
  NEW_WORKSHEET
  ASSIGNMENT
  DEADLINE_REMINDER
  PROGRESS_UPDATE
  SYSTEM
}

// ─────────────────────────────────────────
// USER / AUTH
// ─────────────────────────────────────────

model User {
  id                  String    @id @default(cuid())
  firebaseUid         String    @unique
  email               String    @unique
  name                String
  avatarUrl           String?
  role                UserRole  @default(MENTOR)
  plan                SubscriptionPlan @default(FREE)
  preferredLanguage   Language  @default(EN)
  schoolOrFamily      String?
  isActive            Boolean   @default(true)
  createdAt           DateTime  @default(now())
  updatedAt           DateTime  @updatedAt

  // Relations
  children            ChildProfile[]
  worksheets          Worksheet[]
  assignments         WorksheetAssignment[]  @relation("AssignedBy")
  subscriptions       Subscription[]
  notifications       Notification[]

  @@map("users")
}

model ChildProfile {
  id          String   @id @default(cuid())
  mentorId    String
  mentor      User     @relation(fields: [mentorId], references: [id], onDelete: Cascade)
  name        String
  avatarUrl   String?
  age         Int?
  pinHash     String   // bcrypt hashed PIN
  isActive    Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  // Relations
  classMappings     ChildClassMapping[]
  assignments       WorksheetAssignment[]
  submissions       Submission[]
  notifications     Notification[]

  @@map("child_profiles")
}

model ChildClassMapping {
  id          String       @id @default(cuid())
  childId     String
  child       ChildProfile @relation(fields: [childId], references: [id], onDelete: Cascade)
  classId     String
  class       Class        @relation(fields: [classId], references: [id])
  assignedAt  DateTime     @default(now())

  @@unique([childId, classId])
  @@map("child_class_mappings")
}

// ─────────────────────────────────────────
// CONTENT HIERARCHY
// ─────────────────────────────────────────

model Class {
  id           String   @id @default(cuid())
  name         String   @unique   // "Pre-KG", "LKG", "UKG", "Class 1" .. "Class 5"
  displayOrder Int
  isActive     Boolean  @default(true)
  createdAt    DateTime @default(now())

  // Relations
  subjects         ClassSubjectMapping[]
  worksheets       Worksheet[]
  childMappings    ChildClassMapping[]

  @@map("classes")
}

model Subject {
  id        String   @id @default(cuid())
  name      String   @unique   // "Mathematics", "English", "Hindi", "Science", "EVS", "GK"
  iconUrl   String?
  colorHex  String?
  isActive  Boolean  @default(true)
  createdAt DateTime @default(now())

  // Relations
  classes      ClassSubjectMapping[]
  worksheets   Worksheet[]

  @@map("subjects")
}

model ClassSubjectMapping {
  id        String  @id @default(cuid())
  classId   String
  class     Class   @relation(fields: [classId], references: [id])
  subjectId String
  subject   Subject @relation(fields: [subjectId], references: [id])

  @@unique([classId, subjectId])
  @@map("class_subject_mappings")
}

// ─────────────────────────────────────────
// WORKSHEETS
// ─────────────────────────────────────────

model Worksheet {
  id              String          @id @default(cuid())
  title           String
  description     String?
  classId         String
  class           Class           @relation(fields: [classId], references: [id])
  subjectId       String
  subject         Subject         @relation(fields: [subjectId], references: [id])
  type            WorksheetType
  difficulty      DifficultyLevel? // null for IMAGE_BASED
  createdById     String?
  createdBy       User?           @relation(fields: [createdById], references: [id])
  isPublic        Boolean         @default(false)  // admin-approved public worksheet
  isAiGenerated   Boolean         @default(false)
  language        Language        @default(EN)
  thumbnailUrl    String?         // S3 key
  audioUrl        String?         // S3 key (for ORAL type)
  imageUrl        String?         // S3 key (for IMAGE_BASED type)
  status          WorksheetStatus @default(DRAFT)
  estimatedMinutes Int?
  totalMarks      Int?
  createdAt       DateTime        @default(now())
  updatedAt       DateTime        @updatedAt

  // Relations
  questions   Question[]
  assignments WorksheetAssignment[]
  submissions Submission[]

  @@map("worksheets")
}

model Question {
  id              String       @id @default(cuid())
  worksheetId     String
  worksheet       Worksheet    @relation(fields: [worksheetId], references: [id], onDelete: Cascade)
  type            QuestionType
  questionText    String
  questionImageUrl String?      // S3 key
  options         Json?        // For MCQ: [{id, text}], MATCH: [{left, right}]
  correctAnswer   Json         // Flexible: string, string[], {left: right} pairs
  explanation     String?      // Optional explanation after answer
  marks           Int          @default(1)
  orderIndex      Int
  language        Language     @default(EN)
  createdAt       DateTime     @default(now())

  // Relations
  answerDetails AnswerDetail[]

  @@map("questions")
}

// ─────────────────────────────────────────
// ASSIGNMENTS & PROGRESS
// ─────────────────────────────────────────

model WorksheetAssignment {
  id          String           @id @default(cuid())
  worksheetId String
  worksheet   Worksheet        @relation(fields: [worksheetId], references: [id])
  childId     String
  child       ChildProfile     @relation(fields: [childId], references: [id])
  assignedById String
  assignedBy  User             @relation("AssignedBy", fields: [assignedById], references: [id])
  dueDate     DateTime?
  status      AssignmentStatus @default(PENDING)
  assignedAt  DateTime         @default(now())

  // Relations
  submission Submission?

  @@unique([worksheetId, childId])
  @@map("worksheet_assignments")
}

model Submission {
  id            String           @id @default(cuid())
  assignmentId  String?          @unique
  assignment    WorksheetAssignment? @relation(fields: [assignmentId], references: [id])
  childId       String
  child         ChildProfile     @relation(fields: [childId], references: [id])
  worksheetId   String
  worksheet     Worksheet        @relation(fields: [worksheetId], references: [id])
  score         Int?
  totalMarks    Int?
  percentage    Float?
  timeSpentSecs Int?
  status        SubmissionStatus @default(IN_PROGRESS)
  startedAt     DateTime         @default(now())
  submittedAt   DateTime?

  // Relations
  answerDetails AnswerDetail[]

  @@map("submissions")
}

model AnswerDetail {
  id           String     @id @default(cuid())
  submissionId String
  submission   Submission @relation(fields: [submissionId], references: [id], onDelete: Cascade)
  questionId   String
  question     Question   @relation(fields: [questionId], references: [id])
  givenAnswer  Json       // What the child answered
  isCorrect    Boolean?
  marksAwarded Int?
  createdAt    DateTime   @default(now())

  @@map("answer_details")
}

// ─────────────────────────────────────────
// NOTIFICATIONS
// ─────────────────────────────────────────

model Notification {
  id          String           @id @default(cuid())
  userId      String?
  user        User?            @relation(fields: [userId], references: [id])
  childId     String?
  child       ChildProfile?    @relation(fields: [childId], references: [id])
  title       String
  body        String
  type        NotificationType
  data        Json?            // Extra payload (worksheetId, assignmentId, etc.)
  isRead      Boolean          @default(false)
  createdAt   DateTime         @default(now())

  @@map("notifications")
}

// ─────────────────────────────────────────
// SUBSCRIPTIONS (Razorpay)
// ─────────────────────────────────────────

model Subscription {
  id                     String           @id @default(cuid())
  userId                 String
  user                   User             @relation(fields: [userId], references: [id])
  plan                   SubscriptionPlan
  status                 String           // active, cancelled, expired
  razorpaySubscriptionId String?
  razorpayCustomerId     String?
  startsAt               DateTime
  expiresAt              DateTime?
  createdAt              DateTime         @default(now())
  updatedAt              DateTime         @updatedAt

  @@map("subscriptions")
}
```

---

## TypeScript Types (Shared Package)

```typescript
// packages/shared-types/src/index.ts

export type UserRole = 'MENTOR' | 'ADMIN';
export type Language = 'EN' | 'HI' | 'BILINGUAL';
export type WorksheetType = 'INTERACTIVE' | 'ORAL' | 'IMAGE_BASED';
export type WorksheetStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
export type DifficultyLevel = 'EASY' | 'MEDIUM' | 'HARD';
export type QuestionType = 'MCQ' | 'FILL_BLANK' | 'TRUE_FALSE' | 'MATCH' | 'SHORT_ANSWER';

export interface User {
  id: string;
  firebaseUid: string;
  email: string;
  name: string;
  avatarUrl?: string;
  role: UserRole;
  plan: 'FREE' | 'PREMIUM';
  preferredLanguage: Language;
  schoolOrFamily?: string;
}

export interface ChildProfile {
  id: string;
  mentorId: string;
  name: string;
  avatarUrl?: string;
  age?: number;
  // pinHash never sent to client
}

export interface ClassModel {
  id: string;
  name: string;
  displayOrder: number;
}

export interface Subject {
  id: string;
  name: string;
  iconUrl?: string;
  colorHex?: string;
}

export interface Worksheet {
  id: string;
  title: string;
  description?: string;
  classId: string;
  subjectId: string;
  type: WorksheetType;
  difficulty?: DifficultyLevel;
  createdById?: string;
  isPublic: boolean;
  isAiGenerated: boolean;
  language: Language;
  thumbnailUrl?: string;
  audioUrl?: string;
  imageUrl?: string;
  status: WorksheetStatus;
  estimatedMinutes?: number;
  totalMarks?: number;
  questionCount?: number;
  createdAt: string;
}

export interface Question {
  id: string;
  worksheetId: string;
  type: QuestionType;
  questionText: string;
  questionImageUrl?: string;
  options?: MCQOption[] | MatchPair[];
  correctAnswer: string | string[] | Record<string, string>;
  explanation?: string;
  marks: number;
  orderIndex: number;
  language: Language;
}

export interface MCQOption {
  id: string;
  text: string;
}

export interface MatchPair {
  left: string;
  right: string;
}

export interface WorksheetAssignment {
  id: string;
  worksheetId: string;
  worksheet: Worksheet;
  childId: string;
  dueDate?: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
  assignedAt: string;
}

export interface Submission {
  id: string;
  worksheetId: string;
  childId: string;
  score?: number;
  totalMarks?: number;
  percentage?: number;
  timeSpentSecs?: number;
  status: 'IN_PROGRESS' | 'SUBMITTED';
  startedAt: string;
  submittedAt?: string;
}

export interface ProgressSummary {
  childId: string;
  totalAssigned: number;
  totalCompleted: number;
  averageScore: number;
  streakDays: number;
  lastActiveAt?: string;
}
```

---

## Database Indexes (Performance)

```sql
-- High-frequency queries optimized
CREATE INDEX idx_worksheets_class_subject ON worksheets(class_id, subject_id);
CREATE INDEX idx_worksheets_public ON worksheets(is_public, status);
CREATE INDEX idx_worksheets_created_by ON worksheets(created_by_id);
CREATE INDEX idx_assignments_child ON worksheet_assignments(child_id, status);
CREATE INDEX idx_submissions_child ON submissions(child_id, worksheet_id);
CREATE INDEX idx_notifications_user ON notifications(user_id, is_read);
CREATE INDEX idx_notifications_child ON notifications(child_id, is_read);
CREATE INDEX idx_child_profiles_mentor ON child_profiles(mentor_id);
```
