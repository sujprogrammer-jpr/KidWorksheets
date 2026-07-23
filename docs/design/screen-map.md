# Screen Inventory — KidWorksheets

> **Document Type:** UX Screen Map
> **Version:** 1.0
> **Last Updated:** 2026-07-23

---

## Mentor Screens

### Unauthenticated
| # | Screen Name | Route | Description |
|---|---|---|---|
| 1 | Splash | `/` | Lottie animation, auto-redirect |
| 2 | Onboarding Slide 1 | `/onboarding` | App intro — Welcome |
| 3 | Onboarding Slide 2 | `/onboarding` | Feature — Create worksheets |
| 4 | Onboarding Slide 3 | `/onboarding` | Feature — Track progress |
| 5 | Login | `/(auth)/login` | Google + Apple sign-in |
| 6 | Profile Setup | `/(auth)/profile-setup` | Name, school, language (first-login only) |

### Mentor — Home & Navigation
| # | Screen Name | Route | Description |
|---|---|---|---|
| 7 | Home Dashboard | `/(mentor)/home` | Class browser, quick stats, recent activity |
| 8 | Class Detail | `/(mentor)/classes/[classId]` | Subject grid for selected class |
| 9 | Worksheet List | `/(mentor)/classes/[classId]/[subjectId]` | All worksheets (public + mine) |
| 10 | Worksheet Detail | `/(mentor)/worksheets/[id]` | Full info, preview, actions |
| 11 | Worksheet Player (Mentor preview) | `/(mentor)/worksheets/[id]/preview` | Mentor previews before assigning |

### Mentor — Worksheet Creation
| # | Screen Name | Route | Description |
|---|---|---|---|
| 12 | Create Worksheet — Choose Type | `/(mentor)/create` | Manual / AI / Image / Oral |
| 13 | Manual Builder — Info | `/(mentor)/create/manual/info` | Title, class, subject, difficulty |
| 14 | Manual Builder — Questions | `/(mentor)/create/manual/questions` | Add/edit/reorder questions |
| 15 | Manual Builder — Review | `/(mentor)/create/manual/review` | Preview as child view |
| 16 | AI Generator | `/(mentor)/create/ai` | Prompt input, settings, generate |
| 17 | AI Preview & Edit | `/(mentor)/create/ai/preview` | Review + edit AI questions |
| 18 | Image Upload | `/(mentor)/create/image` | Camera / gallery + crop |
| 19 | Oral Worksheet | `/(mentor)/create/oral` | Audio upload + notes |
| 20 | My Worksheets | `/(mentor)/my-worksheets` | Drafts + Published + Archived |

### Mentor — Children
| # | Screen Name | Route | Description |
|---|---|---|---|
| 21 | Children List | `/(mentor)/children` | All child profiles |
| 22 | Add Child | `/(mentor)/children/add` | Name, avatar, age, PIN setup |
| 23 | Child Detail | `/(mentor)/children/[childId]` | Child info, assigned classes, progress |
| 24 | Assign Worksheet | `/(mentor)/children/[childId]/assign` | Select worksheets to assign |
| 25 | Child Class Mapping | `/(mentor)/children/[childId]/classes` | Map child to classes |

### Mentor — Progress
| # | Screen Name | Route | Description |
|---|---|---|---|
| 26 | Progress Dashboard | `/(mentor)/progress` | Overview + child selector |
| 27 | Child Progress Detail | `/(mentor)/progress/[childId]` | Per-child stats, subject breakdown |
| 28 | Submission Review | `/(mentor)/progress/[childId]/submissions/[id]` | Question-by-question review |

### Mentor — Settings & Misc
| # | Screen Name | Route | Description |
|---|---|---|---|
| 29 | Settings | `/(mentor)/settings` | Profile, language, passkey, subscription |
| 30 | Edit Profile | `/(mentor)/settings/profile` | Name, avatar, school |
| 31 | Language Settings | `/(mentor)/settings/language` | EN / HI |
| 32 | Passkey Setup | `/(mentor)/settings/passkey` | Enable/disable biometric |
| 33 | Subscription | `/(mentor)/settings/subscription` | Plan info (all free in Phase 1) |
| 34 | Notifications | `/(mentor)/notifications` | In-app notification center |
| 35 | Bookmarks | `/(mentor)/bookmarks` | Saved/favorited worksheets |
| 36 | Privacy Policy | `/(mentor)/legal/privacy` | In-app privacy policy |
| 37 | Terms of Service | `/(mentor)/legal/terms` | In-app terms |

---

## Child Screens (Kid Mode)

| # | Screen Name | Route | Description |
|---|---|---|---|
| 38 | Profile Selector | `/(child)/select-profile` | Choose child profile (mentor's children list) |
| 39 | PIN Entry | `/(child)/pin/[childId]` | Secure PIN keypad |
| 40 | Child Home | `/(child)/home` | Animated, colorful dashboard |
| 41 | Assigned Worksheets | `/(child)/worksheets` | My worksheets list (assigned) |
| 42 | Browse Public Worksheets | `/(child)/browse` | Explore public worksheets by subject |
| 43 | Worksheet Detail (Child) | `/(child)/worksheets/[id]` | Info + Start button |
| 44 | Interactive Player | `/(child)/play/[id]` | Full Q&A interaction engine |
| 45 | Oral Player | `/(child)/oral/[id]` | Audio playback + notes |
| 46 | Image Viewer | `/(child)/image/[id]` | Zoomable image worksheet |
| 47 | Results Screen | `/(child)/results/[submissionId]` | Score, stars, confetti |
| 48 | My Progress | `/(child)/progress` | Stars, badges, streaks |
| 49 | Badges | `/(child)/badges` | All earned badges display |

---

## Admin Panel (Web — Next.js)

| # | Screen Name | Route | Description |
|---|---|---|---|
| 50 | Admin Login | `/login` | Google Sign-In (admin only) |
| 51 | Dashboard | `/dashboard` | Analytics overview |
| 52 | Worksheet Moderation | `/worksheets/pending` | Approve/reject queue |
| 53 | All Worksheets | `/worksheets` | Full worksheet table |
| 54 | User Management | `/users` | Mentor list table |
| 55 | User Detail | `/users/[id]` | Mentor's children + worksheets |
| 56 | Classes | `/content/classes` | Manage classes |
| 57 | Subjects | `/content/subjects` | Manage subjects |
| 58 | Create Admin Worksheet | `/worksheets/create` | Admin pre-created worksheets |

---

## Total Screen Count

| Client | Count |
|---|---|
| Mobile — Unauthenticated | 6 |
| Mobile — Mentor | 31 |
| Mobile — Child | 12 |
| **Mobile Total** | **49** |
| Admin Web Panel | 9 |
| **Grand Total** | **58** |
