# Design Specifications — KidWorksheets

> **Document Type:** Design Requirements for Figma / Stitch
> **Version:** 1.0
> **Date:** 2026-07-23
> **Purpose:** This document is the single source of truth for all design decisions. Use it when designing screens in Figma, Stitch, or any other design tool.

---

## 1. Brand Identity

### App Name
**KidWorksheets**

### Brand Personality
- **For Children:** Playful, colorful, encouraging, safe, magical
- **For Mentors:** Trustworthy, professional, organized, efficient
- **Combined:** Warm and approachable — not cold or corporate

### Tagline (Proposed)
*"Learning made fun, one worksheet at a time."*

---

## 2. Color System

### Primary Palette
| Token | Hex | HSL | Usage |
|---|---|---|---|
| `primary` | `#6C63FF` | `243, 100%, 69%` | CTAs, active navigation, buttons |
| `primary-light` | `#8B84FF` | `243, 100%, 76%` | Hover, focus rings |
| `primary-dark` | `#4D45D6` | `243, 57%, 56%` | Pressed states |
| `primary-surface` | `#EEF0FF` | `234, 100%, 96%` | Light backgrounds, tinted surfaces |

### Secondary Palette
| Token | Hex | HSL | Usage |
|---|---|---|---|
| `secondary` | `#FF8C42` | `27, 100%, 63%` | Highlights, streak indicators |
| `secondary-light` | `#FFA96B` | `27, 100%, 71%` | |
| `secondary-surface` | `#FFF3EB` | `27, 100%, 96%` | Warm surface areas |

### Accent / Success
| Token | Hex | Usage |
|---|---|---|
| `accent` | `#43D9A2` | Correct answers, success, completion |
| `accent-dark` | `#2BAE7E` | Success button pressed |
| `accent-surface` | `#E8FAF3` | Success backgrounds |

### Semantic Colors
| Token | Hex | Usage |
|---|---|---|
| `danger` | `#FF5C5C` | Errors, wrong answers, delete |
| `warning` | `#FFB74D` | Warnings, deadline alerts |
| `info` | `#42A5F5` | Info messages, tips |

### Mentor Mode (Dark Theme)
| Token | Hex | Usage |
|---|---|---|
| `dark-bg` | `#0F0F1A` | Main background |
| `dark-surface-1` | `#1A1A2E` | Cards, drawers |
| `dark-surface-2` | `#252540` | Elevated cards, modals |
| `dark-border` | `#2E2E4E` | Borders, dividers |
| `dark-text-primary` | `#F0F0FF` | Main text |
| `dark-text-secondary` | `#9090B0` | Secondary text, labels |
| `dark-text-muted` | `#60607A` | Placeholder, muted text |

### Child Mode (Light Theme)
| Token | Hex | Usage |
|---|---|---|
| `light-bg` | `#FFF8E7` | Main background (warm cream) |
| `light-surface` | `#FFFFFF` | Cards, inputs |
| `light-border` | `#E8DFC8` | Borders |
| `light-text-primary` | `#2D2D3A` | Main text |
| `light-text-secondary` | `#7A7A8A` | Secondary text |

### Subject Brand Colors
| Subject | Color | Hex |
|---|---|---|
| Mathematics | Coral Red | `#FF6B6B` |
| English | Teal | `#4ECDC4` |
| Hindi | Saffron Yellow | `#FFD93D` |
| Science | Leaf Green | `#6BCF7F` |
| EVS | Sky Blue | `#56CCF2` |
| General Knowledge | Purple | `#C4B5FD` |
| Computer | Electric Blue | `#60A5FA` |
| Moral Science | Rose Pink | `#F9A8D4` |

---

## 3. Typography

### Font Families
```
Mentor UI:   "Inter"    → Google Fonts → weights: 400, 500, 600, 700
Child UI:    "Nunito"   → Google Fonts → weights: 400, 600, 700, 800
Hindi Text:  "Hind"     → Google Fonts → weights: 400, 500, 600
```

### Type Scale
| Style Name | Size | Weight | Line Height | Letter Spacing | Font | Usage |
|---|---|---|---|---|---|---|
| `display-xl` | 40px | 800 | 48px | -1px | Nunito | Child mode splash, celebration screens |
| `display` | 32px | 700 | 40px | -0.5px | Inter/Nunito | Page headlines |
| `heading-1` | 28px | 700 | 36px | -0.3px | Inter/Nunito | Screen titles |
| `heading-2` | 24px | 600 | 32px | 0px | Inter | Section headings |
| `heading-3` | 20px | 600 | 28px | 0px | Inter | Card titles |
| `heading-4` | 18px | 600 | 26px | 0px | Inter | Sub-headings |
| `body-lg` | 16px | 400 | 26px | 0px | Inter | Body text, descriptions |
| `body` | 14px | 400 | 22px | 0px | Inter | Standard body |
| `body-sm` | 13px | 400 | 20px | 0px | Inter | Secondary content |
| `caption` | 12px | 400 | 18px | 0px | Inter | Timestamps, metadata |
| `label` | 11px | 600 | 16px | 0.5px | Inter | Tags, chips, badges (uppercase) |
| `child-body` | 18px | 500 | 28px | 0px | Nunito | Child mode body text |
| `child-question` | 20px | 600 | 30px | 0px | Nunito | Worksheet questions in child mode |

---

## 4. Spacing System (4pt Grid)

```
space-1:   4px
space-2:   8px
space-3:   12px
space-4:   16px    ← standard inner padding
space-5:   20px
space-6:   24px    ← section gaps
space-7:   28px
space-8:   32px
space-10:  40px
space-12:  48px
space-16:  64px
space-20:  80px
```

### Screen Safe Areas
- **Top:** Status bar + 16px
- **Bottom:** Home indicator + 16px
- **Left/Right:** 16px (24px on tablets)

---

## 5. Border Radius

```
radius-xs:   4px   → inputs, small tags
radius-sm:   8px   → small cards, chips
radius-md:   12px  → standard cards
radius-lg:   16px  → large cards, modals
radius-xl:   20px  → bottom sheets, large modals
radius-2xl:  24px  → hero cards
radius-full: 9999px → buttons, avatars, pills
```

---

## 6. Elevation / Shadow (Light Mode)

```
shadow-xs:  0 1px 2px rgba(0,0,0,0.04)
shadow-sm:  0 2px 8px rgba(108,99,255,0.08)
shadow-md:  0 4px 16px rgba(108,99,255,0.10)
shadow-lg:  0 8px 32px rgba(108,99,255,0.14)
shadow-xl:  0 16px 48px rgba(108,99,255,0.18)
```

For dark mode replace purple tint with neutral:
```
dark-shadow-sm:  0 2px 8px rgba(0,0,0,0.30)
dark-shadow-md:  0 4px 16px rgba(0,0,0,0.40)
```

---

## 7. Iconography

- **Library:** Lucide React Native (for mentor mode)
- **Child mode:** Use larger, bolder icon variants + colored backgrounds
- **Size standards:**
  - Navigation icons: 24×24px
  - Action icons: 20×20px
  - Decorative icons: 32–48px with colored circular background
- **Style:** Stroke icons, 1.5px stroke weight

---

## 8. Component Specifications

### Button
```
Primary Button:
  Background: primary (#6C63FF)
  Text: white, body (16px), weight 600
  Height: 52px
  Border Radius: full (9999px)
  Padding: 0 24px
  Shadow: shadow-md (primary tinted)
  Press state: scale(0.96), opacity 0.9
  Loading state: spinner replaces text

Secondary Button:
  Background: transparent
  Border: 1.5px solid primary
  Text: primary, 600 weight
  (Same size as primary)

Ghost Button:
  No background, no border
  Text: primary, 600 weight

Danger Button:
  Background: danger (#FF5C5C)
  Text: white

Child-mode Button:
  Height: 64px
  Font: Nunito, 18px, 700
  Border radius: full
  Animated: slight bounce on press (Reanimated spring)
```

### Input / Text Field
```
Default state:
  Background: dark-surface-2 (dark) / white (light)
  Border: 1px solid dark-border / light-border
  Border Radius: radius-md (12px)
  Height: 52px
  Padding: 0 16px
  Font: Inter 15px, weight 400

Focused state:
  Border: 2px solid primary
  Background: slightly lighter

Error state:
  Border: 2px solid danger
  Error message: danger color, caption size, below input

Label: Inter 12px, 600, color text-secondary, above input, 4px gap
```

### Worksheet Card (Mentor mode)
```
Width: (screen width - 32px) / 2 columns (grid) OR full width (list)
Background: dark-surface-1
Border Radius: radius-lg (16px)
Shadow: shadow-sm

Thumbnail area:
  Aspect ratio: 4:3
  Border radius top: 16px
  Background: subject color (if no thumbnail)
  Subject icon centered at 40px

Content area (padding: 12px):
  Title: heading-4 (18px, 600), 2 lines max, ellipsis
  Class + Subject: caption (12px, 400), text-muted
  Row: [Type badge] [Difficulty badge] [Bookmark icon]

Bookmark icon: top-right corner, 32×32px touchable

Type badge:
  Interactive: primary-surface bg, primary text
  Oral: secondary-surface bg, secondary text
  Image-based: accent-surface bg, accent-dark text

Difficulty badge:
  Easy: green tint
  Medium: orange tint
  Hard: red tint
```

### Subject Card (Child mode)
```
Aspect ratio: 1:1
Background: subject color at 15% opacity
Border: 2px solid subject color at 30%
Border Radius: radius-xl (20px)
Padding: 16px

Icon: 48×48px, subject color
Subject name: Nunito 16px, 700, text-primary
Count: "12 worksheets", Nunito 13px, 400, text-secondary
```

### PIN Keypad
```
Custom numeric keypad (NO system keyboard)
  Layout: 3×4 grid (1-9, *, 0, backspace)
  Key size: 72×72px circle
  Key background: dark-surface-2
  Key text: Inter 24px, 600
  Press animation: scale(0.9) + haptic (light impact)
  
PIN dots:
  Diameter: 16px each
  Gap: 12px between dots
  Filled: primary color
  Empty: dark-border color
  Shake animation on wrong PIN: Reanimated shake
```

### Bottom Sheet
```
Background: dark-surface-1 (dark) / white (light)
Border radius top: radius-xl (20px)
Drag handle: 40×4px, rounded, dark-border color, centered, 12px from top
Backdrop: black 50% opacity, tap to dismiss

Share Bottom Sheet specifically:
  Each option card:
    Background: dark-surface-2
    Border radius: radius-md (12px)
    Padding: 16px
    Icon: 40×40px colored circle + 24px icon
    Title: body-lg, 600
    Subtitle: caption, text-muted
    Chevron: right side
    Press: scale(0.97) + haptic
```

### Worksheet Player (Interactive)
```
Progress bar:
  Full width, height 6px
  Background: dark-border
  Fill: primary (animated with Reanimated)
  Border radius: full

Question number: caption, text-muted ("Question 3 of 10")
Timer (optional): secondary color pill, top right

Question card:
  Background: dark-surface-1
  Border radius: radius-xl
  Padding: 20px
  Question text: body-lg or child-question (child mode)
  Question image: full width, border radius md, below text

MCQ options:
  Each option: full width card
  Background: dark-surface-2
  Border: 1.5px solid transparent
  Border radius: radius-md
  Padding: 14px 16px
  Text: body, 500

  Selected (unsubmitted): border primary, bg primary-surface
  Correct: border accent, bg accent-surface, checkmark icon
  Wrong: border danger, bg danger-surface, X icon
  Correct (not selected): shown after submit with accent

Lottie animations:
  Correct answer: small sparkle/star burst Lottie (300ms)
  Wrong answer: subtle shake + red flash
  Worksheet complete: full-screen confetti Lottie (1.5s)
```

---

## 9. Motion & Animation Specs

### Timing Functions
```
ease-default:   cubic-bezier(0.4, 0.0, 0.2, 1)   ← Material standard
ease-in:        cubic-bezier(0.4, 0.0, 1, 1)
ease-out:       cubic-bezier(0.0, 0.0, 0.2, 1)
ease-spring:    spring(mass: 1, stiffness: 200, damping: 20) ← Child mode
```

### Animation Catalog
| Element | Type | Duration | Easing |
|---|---|---|---|
| Screen enter | Fade + slide up 16px | 250ms | ease-out |
| Screen exit | Fade + slide down 8px | 200ms | ease-in |
| Button press | Scale to 0.96 | 100ms | ease-in |
| Button release | Scale to 1.0 | 150ms | ease-out |
| Card press | Scale to 0.98 | 120ms | ease-in |
| Modal open | Scale from 0.94 + fade | 280ms | ease-out |
| Bottom sheet open | Slide up | 320ms | ease-out |
| Correct answer flash | Green pulse | 300ms | ease-out |
| Wrong answer shake | Horizontal shake ±8px, 3x | 400ms | ease-default |
| Progress bar fill | Width animated | 600ms | ease-out |
| Confetti | Lottie full screen | 1500ms | — |
| Badge unlock | Scale 0→1.2→1 + glow | 600ms | spring |
| Bookmark toggle | Rotate + fill | 200ms | ease-spring |
| Loading spinner | Rotate 360° continuous | 800ms/cycle | linear |
| Skeleton shimmer | Left→right gradient | 1200ms/cycle | linear |
| Child idle mascot | Breathing/bobbing Lottie | 2000ms loop | — |

---

## 10. Screen-by-Screen Design Requirements

### S01 — Splash Screen
- Full screen, dark background (`#0F0F1A`)
- Animated logo: KidWorksheets wordmark + small book/star icon
- Lottie: pencil writing or stars twinkling
- Duration: 2 seconds then auto-navigate
- Status bar: hidden

### S02 — Onboarding (3 slides)
- Full screen, gradient background
- Large Lottie illustration per slide (center)
- Slide 1: Child reading with glowing worksheets — "Welcome to KidWorksheets"
- Slide 2: Mentor creating worksheet with AI sparkles — "Create & Assign with AI"
- Slide 3: Progress chart + star badges — "Track Every Achievement"
- Dots pagination at bottom
- "Skip" text button (top right)
- "Next" primary button + "Get Started" on slide 3
- Smooth slide transition

### S03 — Login Screen
- Background: dark gradient
- Logo + tagline at top (40% of screen)
- "Continue with Google" button (white bg, Google logo, dark text)
- "Continue with Apple" button (white bg, Apple logo, dark text)
- Divider: "— or —"
- Privacy Policy + Terms links at bottom (caption, muted)
- Subtle animated background: floating geometric shapes (Lottie or Reanimated)

### S04 — Child PIN Entry
- Background: child mode light cream `#FFF8E7`
- Child avatar (64px) + name at top
- "Enter your secret code" — Nunito 20px, friendly
- PIN dots row (6 dots)
- Custom numeric keypad (3×4 grid)
- "Forgot PIN? Ask your parent" — caption, muted, bottom
- Mascot character (Lottie, idle animation) — side decoration

### S05 — Mentor Home / Dashboard
- Top bar: greeting ("Good morning, Priya! 👋"), notification bell, avatar
- Stats strip: Assigned Today, Completed Today, Active Children
- Class pills: horizontal scroll — Pre-KG, LKG, UKG, Class 1–5
- "Quick Access" section: recently viewed subjects
- "Recent Assignments" list
- FAB: "+" create worksheet

### S06 — Subject Grid
- Class name as page title
- 2-column grid of Subject Cards
- Each card: subject color, icon, subject name, worksheet count
- Filter chip row: All / Mine / Public

### S07 — Worksheet List
- Search bar at top
- Filter chips: Type | Difficulty | Language
- Card grid (2-col) or list toggle
- Pull to refresh
- Empty state: friendly illustration + "No worksheets yet"

### S08 — Worksheet Detail
- Hero thumbnail (full width, 200px height)
- Floating back button
- Title, class badge, subject badge
- Creator info + date
- Stats row: Questions, Marks, Duration, Difficulty
- Description (expandable)
- "Assign to Child" button (primary) + "Preview" ghost button
- Share FAB (bottom right)

### S09 — Interactive Worksheet Player
- Full screen, immersive
- Progress bar top (animated fill)
- Question number + timer
- Question card (large, centered)
- Options below (full-width cards)
- Navigation: Previous | Next buttons
- Auto-advance after answer (500ms delay)
- Lottie celebrations on correct answer

### S10 — Results Screen
- Gradient background (primary → secondary)
- Large star rating (1–3 animated stars fill)
- Score: "8 / 10" — display-xl
- Percentage: "80%" — heading-2
- Confetti Lottie (top)
- Breakdown: correct, wrong, skipped
- "Review Answers" + "Next Worksheet" buttons

### S11 — Child Home (Kid Mode)
- Bright, warm background
- "Hello, [Name]! 🌟" — Nunito, display
- Mascot character with idle animation
- "My Worksheets" section: horizontal scroll cards
- "Keep Learning!" section: suggested public worksheets
- Bottom: star count + flame streak indicator
- Large touch targets (56px minimum)

---

## 11. Reference Designs (Inspiration)

These apps and sites should be referenced for design inspiration:

### For Child Mode UI
- **Duolingo** — Gamification, large touch targets, friendly mascot, celebration animations
- **Khan Academy Kids** — Warm colors, large fonts, playful illustrations
- **Photomath** — Clean worksheet-style layouts

### For Mentor Mode UI
- **Notion** — Clean dark surfaces, organized content hierarchy
- **Linear** — Elegant dark theme, smooth micro-interactions
- **Vercel Dashboard** — Professional dark UI with clear data visualization

### For Progress & Analytics
- **Fitbit App** — Progress rings, streak calendar, achievement badges
- **Headspace** — Streak system, badge design

### For Onboarding
- **Airbnb onboarding** — Full screen illustrations, minimal text
- **Calm app onboarding** — Soothing, full-screen illustration slides

> **Note to designer:** When designing in Figma/Stitch, attach screenshots of the above reference apps as frames named `REF_[AppName]` in a dedicated "References" page. This allows AI tools to analyze and draw specific inspiration.

---

## 12. Lottie Animation Requirements

All Lottie files should be sourced from [LottieFiles.com](https://lottiefiles.com) or custom designed:

| File Name | Scene | Loop | Trigger |
|---|---|---|---|
| `splash_logo.json` | Logo write-on animation | No | App open |
| `onboard_1_reading.json` | Child reading glowing book | Yes | Slide 1 |
| `onboard_2_ai.json` | AI sparkles generating worksheet | Yes | Slide 2 |
| `onboard_3_progress.json` | Stars flying, chart growing | Yes | Slide 3 |
| `correct_answer.json` | Sparkle burst, small stars | No | Correct MCQ tap |
| `worksheet_complete.json` | Full confetti celebration | No | Submit worksheet |
| `badge_unlock.json` | Badge glow + pop | No | Badge earned |
| `loading_pencil.json` | Pencil writing | Yes | API loading |
| `ai_thinking.json` | AI brain/sparkles thinking | Yes | AI generation in progress |
| `child_mascot_idle.json` | Friendly character bobbing | Yes | Child home idle |
| `empty_state.json` | Floating books/papers | Yes | Empty list states |
| `streak_fire.json` | Flame burning | Yes | Streak indicator |

---

## 13. Figma File Structure (Recommended)

```
KidWorksheets.fig
├── 📄 Cover (thumbnail)
├── 📄 Design System
│   ├── 🎨 Color Styles
│   ├── 🔤 Text Styles
│   ├── 📦 Components (Atoms)
│   ├── 📦 Components (Molecules)
│   └── 📦 Components (Organisms)
├── 📄 References
│   ├── [Duolingo screenshots]
│   ├── [Khan Academy Kids screenshots]
│   ├── [Notion screenshots]
│   └── [Linear screenshots]
├── 📄 Mobile — Mentor Mode (Dark)
│   ├── Auth flows
│   ├── Home + Navigation
│   ├── Worksheet flows
│   ├── Creation flows
│   ├── Progress flows
│   └── Settings
├── 📄 Mobile — Child Mode (Light)
│   ├── PIN Login
│   ├── Child Home
│   ├── Worksheet Player
│   └── Progress
├── 📄 Admin Panel (Web)
│   ├── Dashboard
│   ├── Moderation
│   └── Analytics
└── 📄 Prototype Flows
    ├── Mentor Complete Flow
    └── Child Complete Flow
```

---

*Design Spec Version: 1.0 | Date: 2026-07-23 | Ready for Figma*
