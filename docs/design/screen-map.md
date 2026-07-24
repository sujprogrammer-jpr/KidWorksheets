# Screen Inventory — KidWorksheets

> **Document Type:** UX Screen Map
> **Version:** 2.0
> **Last Updated:** 2026-07-24 (Session 3)

---

## Mentor Screens

### Unauthenticated
| # | Screen Name | Route | Description |
|---|---|---|---|
| 1 | Splash | `/` | Lottie animation, auto-redirect |
| 2 | Onboarding Slide 1 | `/onboarding` | Welcome — app overview |
| 3 | Onboarding Slide 2 | `/onboarding` | Feature — Create worksheets |
| 4 | Onboarding Slide 3 | `/onboarding` | Feature — Track progress |
| 5 | Login Type | `/(auth)/select-login` | Choose: Mentor Login / Student Login |
| 6 | Mentor Login | `/(auth)/login` | Google + Apple sign-in |
| 7 | Profile Setup | `/(auth)/profile-setup` | Name, school/org, language (first-login) |

### Mentor — Dashboard & Navigation
| # | Screen Name | Route | Description |
|---|---|---|---|
| 8 | Dashboard | `/(mentor)/home` | Class cards, quick stats, recent activity |
| 9 | Notifications | `/(mentor)/notifications` | In-app notification center |

### Mentor — Class & Subject Management
| # | Screen Name | Route | Description |
|---|---|---|---|
| 10 | My Classes | `/(mentor)/classes` | List of mentor's classes + Create button |
| 11 | Create Class | `/(mentor)/classes/create` | Free-text class name |
| 12 | Class Detail | `/(mentor)/classes/[classId]` | Subjects list + Students tab + actions |
| 13 | Create Subject | `/(mentor)/classes/[classId]/subjects/create` | Name, icon, color, default writing style |
| 14 | Subject Detail | `/(mentor)/classes/[classId]/subjects/[subjectId]` | Worksheets list + Create button |

### Mentor — Worksheet Creation
| # | Screen Name | Route | Description |
|---|---|---|---|
| 15 | Create Worksheet — Choose Mode | `/(mentor)/create/[subjectId]` | Manual / AI-Assisted / Image Upload |
| 16 | Create Worksheet — Settings | `/(mentor)/create/[subjectId]/settings` | Style (Written/Oral), writing style, modes |
| 17 | Worksheet Canvas Editor | `/(mentor)/create/[subjectId]/editor` | Add & edit questions on notebook canvas |
| 18 | Question Editor — MCQ | Modal | 4 options + correct answer picker |
| 19 | Question Editor — Fill Blank | Modal | Sentence with blank + correct fill |
| 20 | Question Editor — True/False | Modal | Statement + True/False toggle |
| 21 | Question Editor — Match | Modal | Left-right pairs (up to 8) |
| 22 | Question Editor — Short Answer | Modal | Question + optional model answer |
| 23 | Worksheet Review | `/(mentor)/create/[subjectId]/review` | Preview as student sees it |
| 24 | AI Worksheet Generator | `/(mentor)/create/[subjectId]/ai` | Prompt + settings → Generate |
| 25 | AI Preview & Edit | `/(mentor)/create/[subjectId]/ai/preview` | Review + edit AI questions |
| 26 | Image Upload Creator | `/(mentor)/create/[subjectId]/image` | Camera/gallery → AI recreation |
| 27 | My Worksheets | `/(mentor)/my-worksheets` | Drafts + Published + Archived tabs |
| 28 | Worksheet Detail (Mentor) | `/(mentor)/worksheets/[id]` | Full info, preview, assign, share actions |

### Mentor — Student Management
| # | Screen Name | Route | Description |
|---|---|---|---|
| 29 | Student List | `/(mentor)/classes/[classId]/students` | Enrolled students for this class |
| 30 | Enroll Student | `/(mentor)/classes/[classId]/enroll` | Create new or link existing student |
| 31 | Student Profile | `/(mentor)/students/[studentId]` | Full CRM card — all details |
| 32 | Edit Student | `/(mentor)/students/[studentId]/edit` | Edit all CRM fields |
| 33 | Student Subject Access | `/(mentor)/students/[studentId]/subjects` | Which subjects student is enrolled in |
| 34 | Student PIN Setup | `/(mentor)/students/[studentId]/pin` | Create / change PIN |
| 35 | Assign Worksheet | `/(mentor)/students/[studentId]/assign` | Select worksheets to assign |

### Mentor — Progress Tracking
| # | Screen Name | Route | Description |
|---|---|---|---|
| 36 | Progress Dashboard | `/(mentor)/progress` | All students overview |
| 37 | Student Progress Detail | `/(mentor)/progress/[studentId]` | Per-student stats, subject breakdown |
| 38 | Submission Review | `/(mentor)/progress/[studentId]/submissions/[id]` | Question-by-question + grade drawings |

### Mentor — Settings & Legal
| # | Screen Name | Route | Description |
|---|---|---|---|
| 39 | Settings | `/(mentor)/settings` | Profile, language, passkey, subscription |
| 40 | Edit Profile | `/(mentor)/settings/profile` | Name, avatar, school/org |
| 41 | Language Settings | `/(mentor)/settings/language` | EN / HI |
| 42 | Passkey Setup | `/(mentor)/settings/passkey` | Enable/disable biometric |
| 43 | Subscription | `/(mentor)/settings/subscription` | Plan info (all free in Phase 1) |
| 44 | Privacy Policy | `/(mentor)/legal/privacy` | In-app privacy policy |
| 45 | Terms of Service | `/(mentor)/legal/terms` | In-app terms |

---

## Student (Child) Screens

| # | Screen Name | Route | Description |
|---|---|---|---|
| 46 | Student Login | `/(auth)/student-login` | Mentor selects student profile from list |
| 47 | PIN Entry | `/(auth)/student-pin/[studentId]` | Secure 6-digit PIN keypad |
| 48 | Student Home | `/(student)/home` | Animated, colorful dashboard |
| 49 | My Classes | `/(student)/classes` | Classes student is enrolled in |
| 50 | Subject List | `/(student)/classes/[classId]/subjects` | Subjects for this class |
| 51 | Worksheet List | `/(student)/subjects/[subjectId]/worksheets` | Assigned + Public worksheets |
| 52 | Worksheet Detail (Student) | `/(student)/worksheets/[id]` | Info + Start button |
| 53 | Interactive Player (Written) | `/(student)/play/[id]` | Full Q&A interaction engine |
| 54 | Oral Player | `/(student)/oral/[id]` | Audio playback + notes |
| 55 | Results Screen | `/(student)/results/[submissionId]` | Score, stars, confetti Lottie |
| 56 | My Progress | `/(student)/progress` | Stars, badges, streaks |
| 57 | My Badges | `/(student)/badges` | All earned badges |

---

## Admin Panel (Web — Next.js)

| # | Screen Name | Route | Description |
|---|---|---|---|
| 58 | Admin Login | `/login` | Google Sign-In (admin role only) |
| 59 | Dashboard | `/dashboard` | Platform-wide analytics overview |
| 60 | All Mentors | `/mentors` | Mentor list, search, status |
| 61 | Mentor Detail | `/mentors/[id]` | Mentor's classes, subjects, students, worksheets |
| 62 | All Classes | `/classes` | Classes from all mentors — filter/search |
| 63 | All Subjects | `/subjects` | Subjects from all mentors — mark public |
| 64 | All Worksheets | `/worksheets` | Full worksheet table — approve/archive |
| 65 | Worksheet Moderation | `/worksheets/pending` | Pending public approval queue |
| 66 | All Students | `/students` | Cross-mentor student list |
| 67 | Analytics | `/analytics` | DAU, MAU, usage charts, per-subject stats |
| 68 | Public Content | `/public` | Manage publicly promoted classes/subjects |
| 69 | Create Content | `/content/create` | Admin creates global worksheets |

---

## Total Screen Count (v2.0)

| Client | Count |
|---|---|
| Mobile — Unauthenticated | 7 |
| Mobile — Mentor | 38 |
| Mobile — Student | 12 |
| Admin Web Panel | 12 |
| **Grand Total** | **69** |

---

*Version: 2.0 | Updated: 2026-07-24 (Session 3)*
*Changes: Added mentor class/subject create screens, full student CRM screens, AI/Image creation screens, updated student flow (no independent login), expanded admin panel to 12 screens*
