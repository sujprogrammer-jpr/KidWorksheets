# Data Models — KidWorksheets

> **Document Type:** Database Schema & TypeScript Models
> **Version:** 2.0
> **Last Updated:** 2026-07-24 (Session 3)
> **ORM:** Prisma | **Database:** PostgreSQL (Supabase)

---

## Prisma Schema (v2.0)

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

enum WorksheetStyle {
  WRITTEN   // Interactive Q&A with question types
  ORAL      // Audio-based oral revision
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

// Writing style = visual layout of the answer area
// Each line count has STRAIGHT and DOTTED variants
enum WritingStyle {
  TEXTBOX           // Plain text input box
  LINES_4_STRAIGHT  // 4 straight ruled lines
  LINES_4_DOTTED    // 4 dotted lines
  LINES_3_STRAIGHT  // 3 straight ruled lines
  LINES_3_DOTTED    // 3 dotted lines
  LINES_2_STRAIGHT  // 2 straight ruled lines
  LINES_2_DOTTED    // 2 dotted lines
  LINES_1_STRAIGHT  // 1 straight line
  LINES_1_DOTTED    // 1 dotted line
  GRID              // Graph paper grid (math calculations)
  BLANK_CANVAS      // Plain empty area (drawing / free-form)
}

// How the MENTOR enters questions during creation
enum MentorInputMode {
  TYPING    // Mentor types via keyboard
  WRITING   // Mentor draws/writes with finger on canvas
}

// How the CHILD/STUDENT responds to questions
enum ChildResponseMode {
  TYPING    // Child types via keyboard
  WRITING   // Child writes with finger (on lined/dotted canvas)
  DRAWING   // Child draws freely (blank canvas)
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

enum Gender {
  MALE
  FEMALE
  OTHER
}

enum NotificationType {
  NEW_WORKSHEET
  ASSIGNMENT
  DEADLINE_REMINDER
  PROGRESS_UPDATE
  SYSTEM
}

enum ContentVisibility {
  PRIVATE   // Only mentor can see
  PUBLIC    // Admin-promoted, visible to all mentors/students in dashboard
}

// ─────────────────────────────────────────
// USER / AUTH
// ─────────────────────────────────────────

model User {
  id                String           @id @default(cuid())
  firebaseUid       String           @unique
  email             String           @unique
  name              String
  avatarUrl         String?
  role              UserRole         @default(MENTOR)
  plan              SubscriptionPlan @default(FREE)
  preferredLanguage Language         @default(EN)
  schoolOrOrg       String?          // school name or coaching center name
  isActive          Boolean          @default(true)
  createdAt         DateTime         @default(now())
  updatedAt         DateTime         @updatedAt

  // Relations
  classes           MentorClass[]
  students          Student[]        @relation("MentorStudents")
  enrollments       StudentEnrollment[]
  worksheets        Worksheet[]
  subscriptions     Subscription[]
  notifications     Notification[]

  @@map("users")
}

// ─────────────────────────────────────────
// CLASSES & SUBJECTS (Mentor-Owned)
// ─────────────────────────────────────────

model MentorClass {
  id           String            @id @default(cuid())
  mentorId     String
  mentor       User              @relation(fields: [mentorId], references: [id], onDelete: Cascade)
  name         String                             // Free text: "Class 5A", "Morning Batch", "UKG"
  displayOrder Int               @default(0)
  visibility   ContentVisibility @default(PRIVATE)  // Admin can set to PUBLIC
  isActive     Boolean           @default(true)
  createdAt    DateTime          @default(now())
  updatedAt    DateTime          @updatedAt

  // Relations
  subjects    MentorSubject[]
  enrollments StudentEnrollment[]
  worksheets  Worksheet[]

  @@map("mentor_classes")
}

model MentorSubject {
  id                  String            @id @default(cuid())
  mentorId            String
  mentor              User              @relation(fields: [mentorId], references: [id]) // Denormalized for fast lookup
  classId             String
  class               MentorClass       @relation(fields: [classId], references: [id], onDelete: Cascade)
  name                String                             // Free text: "Mathematics", "English", anything
  iconEmoji           String?                            // e.g., "📐" for Maths
  colorHex            String?                            // Subject brand color
  defaultWritingStyle WritingStyle      @default(LINES_4_STRAIGHT)  // Set by mentor at subject creation
  visibility          ContentVisibility @default(PRIVATE)
  isActive            Boolean           @default(true)
  createdAt           DateTime          @default(now())
  updatedAt           DateTime          @updatedAt

  // Relations
  worksheets    Worksheet[]
  subjectAccess StudentSubjectAccess[]

  @@map("mentor_subjects")
}

// ─────────────────────────────────────────
// STUDENTS (Full CRM Profile)
// ─────────────────────────────────────────

model Student {
  id               String    @id @default(cuid())
  // Sub-profile under mentor — primary key is mentor-assigned, not self-registered
  name             String
  fatherName       String?
  motherName       String?
  primaryMobile    String                    // For contact reference; NOT used as login
  emergencyContact String?
  whatsappContact  String?
  gender           Gender?
  dateOfBirth      DateTime?
  email            String?
  schoolName       String?
  notes            String?                   // Mentor's private notes
  feesAmount       Int?                      // ₹ per month (informational)
  profileImageUrl  String?                   // S3 key
  pinHash          String                    // bcrypt hashed 6-digit PIN
  isActive         Boolean   @default(true)
  createdAt        DateTime  @default(now())
  updatedAt        DateTime  @updatedAt

  // A student is always under a primary mentor (the one who created the profile)
  createdByMentorId String
  createdByMentor   User      @relation("MentorStudents", fields: [createdByMentorId], references: [id])

  // Relations
  enrollments  StudentEnrollment[]
  submissions  Submission[]
  notifications Notification[]

  @@map("students")
}

// Links a student to a specific mentor's class
model StudentEnrollment {
  id          String      @id @default(cuid())
  studentId   String
  student     Student     @relation(fields: [studentId], references: [id], onDelete: Cascade)
  mentorId    String
  mentor      User        @relation(fields: [mentorId], references: [id])
  classId     String
  class       MentorClass @relation(fields: [classId], references: [id])
  enrolledAt  DateTime    @default(now())
  isActive    Boolean     @default(true)

  // Relations
  subjectAccess     StudentSubjectAccess[]
  worksheetAssignments WorksheetAssignment[]

  @@unique([studentId, mentorId, classId])
  @@map("student_enrollments")
}

// Which subjects a student is enrolled in (subset of class subjects)
model StudentSubjectAccess {
  id           String           @id @default(cuid())
  enrollmentId String
  enrollment   StudentEnrollment @relation(fields: [enrollmentId], references: [id], onDelete: Cascade)
  subjectId    String
  subject      MentorSubject    @relation(fields: [subjectId], references: [id])

  @@unique([enrollmentId, subjectId])
  @@map("student_subject_access")
}

// ─────────────────────────────────────────
// WORKSHEETS
// ─────────────────────────────────────────

model Worksheet {
  id                String           @id @default(cuid())
  title             String
  description       String?
  classId           String
  class             MentorClass      @relation(fields: [classId], references: [id])
  subjectId         String
  subject           MentorSubject    @relation(fields: [subjectId], references: [id])
  createdById       String
  createdBy         User             @relation(fields: [createdById], references: [id])

  // Content type
  style             WorksheetStyle                    // WRITTEN or ORAL
  status            WorksheetStatus  @default(DRAFT)
  language          Language         @default(EN)
  difficulty        DifficultyLevel?                  // null for ORAL
  estimatedMinutes  Int?
  totalMarks        Int?

  // Writing & interaction settings
  writingStyle      WritingStyle     @default(LINES_4_STRAIGHT)  // overrides subject default
  mentorInputMode   MentorInputMode  @default(TYPING)
  childResponseMode ChildResponseMode @default(TYPING)

  // AI / creation flags
  isAiGenerated     Boolean          @default(false)
  isImageBased      Boolean          @default(false)  // created from uploaded image

  // Oral worksheet media
  audioUrl          String?          // S3 key (for ORAL type)
  audioTranscript   String?          // Text notes/transcript for oral worksheet

  // Visibility
  visibility        ContentVisibility @default(PRIVATE)

  createdAt         DateTime         @default(now())
  updatedAt         DateTime         @updatedAt

  // Relations
  questions    Question[]
  assignments  WorksheetAssignment[]
  submissions  Submission[]

  @@map("worksheets")
}

model Question {
  id                   String       @id @default(cuid())
  worksheetId          String
  worksheet            Worksheet    @relation(fields: [worksheetId], references: [id], onDelete: Cascade)
  type                 QuestionType
  questionText         String?                        // null if mentor drew the question (writing mode)
  questionImageUrl     String?                        // S3 key — mentor's drawn question image
  questionAudioUrl     String?                        // S3 key (future: voice question)
  options              Json?                          // MCQ: [{id, text}], MATCH: [{left, right}]
  correctAnswer        Json                           // string | string[] | {left:right} pairs
  explanation          String?                        // Shown to student after answering
  marks                Int          @default(1)
  orderIndex           Int
  language             Language     @default(EN)
  writingStyleOverride WritingStyle?                  // null = use worksheet default
  createdAt            DateTime     @default(now())

  // Relations
  answerDetails AnswerDetail[]

  @@map("questions")
}

// ─────────────────────────────────────────
// ASSIGNMENTS & PROGRESS
// ─────────────────────────────────────────

model WorksheetAssignment {
  id           String            @id @default(cuid())
  worksheetId  String
  worksheet    Worksheet         @relation(fields: [worksheetId], references: [id])
  enrollmentId String
  enrollment   StudentEnrollment @relation(fields: [enrollmentId], references: [id])
  studentId    String            // denormalized for fast lookup
  dueDate      DateTime?
  status       AssignmentStatus  @default(PENDING)
  assignedAt   DateTime          @default(now())

  // Relations
  submission Submission?

  @@unique([worksheetId, enrollmentId])
  @@map("worksheet_assignments")
}

model Submission {
  id            String           @id @default(cuid())
  assignmentId  String?          @unique
  assignment    WorksheetAssignment? @relation(fields: [assignmentId], references: [id])
  studentId     String
  student       Student          @relation(fields: [studentId], references: [id])
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
  givenAnswer  Json?      // TYPING mode: text answer as JSON string
  drawnAnswer  String?    // WRITING/DRAWING mode: S3 key for canvas image
  isCorrect    Boolean?   // null for SHORT_ANSWER / DRAWING (manual grading)
  marksAwarded Int?
  gradedAt     DateTime?  // when mentor manually graded
  createdAt    DateTime   @default(now())

  @@map("answer_details")
}

// ─────────────────────────────────────────
// NOTIFICATIONS
// ─────────────────────────────────────────

model Notification {
  id        String           @id @default(cuid())
  userId    String?
  user      User?            @relation(fields: [userId], references: [id])
  studentId String?
  student   Student?         @relation(fields: [studentId], references: [id])
  title     String
  body      String
  type      NotificationType
  data      Json?
  isRead    Boolean          @default(false)
  createdAt DateTime         @default(now())

  @@map("notifications")
}

// ─────────────────────────────────────────
// SUBSCRIPTIONS (Razorpay — stub Phase 1)
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

## TypeScript Types (Shared Package — v2.0)

```typescript
// packages/shared-types/src/index.ts

export type UserRole = 'MENTOR' | 'ADMIN';
export type Language = 'EN' | 'HI' | 'BILINGUAL';
export type WorksheetStyle = 'WRITTEN' | 'ORAL';
export type WorksheetStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
export type DifficultyLevel = 'EASY' | 'MEDIUM' | 'HARD';
export type QuestionType = 'MCQ' | 'FILL_BLANK' | 'TRUE_FALSE' | 'MATCH' | 'SHORT_ANSWER';
export type MentorInputMode = 'TYPING' | 'WRITING';
export type ChildResponseMode = 'TYPING' | 'WRITING' | 'DRAWING';
export type ContentVisibility = 'PRIVATE' | 'PUBLIC';
export type Gender = 'MALE' | 'FEMALE' | 'OTHER';

export type WritingStyle =
  | 'TEXTBOX'
  | 'LINES_4_STRAIGHT' | 'LINES_4_DOTTED'
  | 'LINES_3_STRAIGHT' | 'LINES_3_DOTTED'
  | 'LINES_2_STRAIGHT' | 'LINES_2_DOTTED'
  | 'LINES_1_STRAIGHT' | 'LINES_1_DOTTED'
  | 'GRID'
  | 'BLANK_CANVAS';

export interface User {
  id: string;
  firebaseUid: string;
  email: string;
  name: string;
  avatarUrl?: string;
  role: UserRole;
  plan: 'FREE' | 'PREMIUM';
  preferredLanguage: Language;
  schoolOrOrg?: string;
}

export interface MentorClass {
  id: string;
  mentorId: string;
  name: string;
  displayOrder: number;
  visibility: ContentVisibility;
  subjectCount?: number;
  studentCount?: number;
}

export interface MentorSubject {
  id: string;
  mentorId: string;
  classId: string;
  name: string;
  iconEmoji?: string;
  colorHex?: string;
  defaultWritingStyle: WritingStyle;
  visibility: ContentVisibility;
  worksheetCount?: number;
}

export interface Student {
  id: string;
  createdByMentorId: string;
  name: string;
  fatherName?: string;
  motherName?: string;
  primaryMobile: string;
  emergencyContact?: string;
  whatsappContact?: string;
  gender?: Gender;
  dateOfBirth?: string;
  email?: string;
  schoolName?: string;
  notes?: string;
  feesAmount?: number;
  profileImageUrl?: string;
  // pinHash never sent to client
}

export interface StudentEnrollment {
  id: string;
  studentId: string;
  mentorId: string;
  classId: string;
  enrolledAt: string;
  subjectIds: string[];  // enrolled subjects
}

export interface Worksheet {
  id: string;
  title: string;
  description?: string;
  classId: string;
  subjectId: string;
  createdById: string;
  style: WorksheetStyle;
  status: WorksheetStatus;
  language: Language;
  difficulty?: DifficultyLevel;
  estimatedMinutes?: number;
  totalMarks?: number;
  writingStyle: WritingStyle;
  mentorInputMode: MentorInputMode;
  childResponseMode: ChildResponseMode;
  isAiGenerated: boolean;
  isImageBased: boolean;
  audioUrl?: string;
  audioTranscript?: string;
  visibility: ContentVisibility;
  questionCount?: number;
  createdAt: string;
}

export interface Question {
  id: string;
  worksheetId: string;
  type: QuestionType;
  questionText?: string;
  questionImageUrl?: string;
  options?: MCQOption[] | MatchPair[];
  correctAnswer: string | string[] | Record<string, string>;
  explanation?: string;
  marks: number;
  orderIndex: number;
  language: Language;
  writingStyleOverride?: WritingStyle;
}

export interface MCQOption {
  id: string;
  text: string;
}

export interface MatchPair {
  left: string;
  right: string;
}

export interface Submission {
  id: string;
  worksheetId: string;
  studentId: string;
  score?: number;
  totalMarks?: number;
  percentage?: number;
  timeSpentSecs?: number;
  status: 'IN_PROGRESS' | 'SUBMITTED';
  startedAt: string;
  submittedAt?: string;
}

export interface ProgressSummary {
  studentId: string;
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
-- Class and subject lookups
CREATE INDEX idx_classes_mentor ON mentor_classes(mentor_id, is_active);
CREATE INDEX idx_subjects_class ON mentor_subjects(class_id, is_active);
CREATE INDEX idx_subjects_mentor ON mentor_subjects(mentor_id);
CREATE INDEX idx_public_classes ON mentor_classes(visibility) WHERE visibility = 'PUBLIC';
CREATE INDEX idx_public_subjects ON mentor_subjects(visibility) WHERE visibility = 'PUBLIC';

-- Worksheet queries
CREATE INDEX idx_worksheets_subject ON worksheets(subject_id, status);
CREATE INDEX idx_worksheets_created_by ON worksheets(created_by_id);
CREATE INDEX idx_worksheets_visibility ON worksheets(visibility, status);

-- Student lookups
CREATE INDEX idx_students_mentor ON students(created_by_mentor_id);
CREATE INDEX idx_enrollments_student ON student_enrollments(student_id);
CREATE INDEX idx_enrollments_mentor_class ON student_enrollments(mentor_id, class_id);

-- Assignments and progress
CREATE INDEX idx_assignments_student ON worksheet_assignments(student_id, status);
CREATE INDEX idx_submissions_student ON submissions(student_id, worksheet_id);

-- Notifications
CREATE INDEX idx_notifications_user ON notifications(user_id, is_read);
CREATE INDEX idx_notifications_student ON notifications(student_id, is_read);
```

---

## Writing Style Default Map

| Subject | Recommended Default |
|---|---|
| Pre-KG / LKG / UKG (any) | LINES_4_DOTTED (handwriting practice) |
| Mathematics | GRID |
| English | LINES_4_STRAIGHT |
| Hindi | LINES_3_STRAIGHT |
| Science / EVS | LINES_3_STRAIGHT |
| General Knowledge | LINES_2_STRAIGHT |
| Computer | TEXTBOX |
| Custom / Other | LINES_3_STRAIGHT |

> These are recommendations shown when mentor creates a subject.
> Mentor can freely change the default for any subject.

---

*Version: 2.0 | Updated: 2026-07-24 (Session 3) | Major revision — mentor-owned classes/subjects, full student CRM, WritingStyle enum v2*
