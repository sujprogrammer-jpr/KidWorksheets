# Design System — KidWorksheets

> **Document Type:** Design System & UI Guidelines
> **Version:** 1.0
> **Last Updated:** 2026-07-23
> **Design Tool:** Figma (recommended)

---

## Design Philosophy

### Dual Persona Design
KidWorksheets serves two very different audiences on the same device:

| Dimension | Mentor Mode | Child Mode |
|---|---|---|
| Background | Dark (`#0F0F1A`) — focused, professional | Light cream (`#FFF8E7`) — warm, inviting |
| Typography | Inter — clean, clinical | Nunito — rounded, friendly |
| Icons | Sharp, minimal | Chunky, colorful |
| Animations | Subtle, quick | Playful, bouncy |
| Colors | Desaturated purples + grays | Full saturation — yellows, pinks, teals |
| Touch targets | Standard 44pt | Larger 56pt (child fingers) |

---

## Color Palette

### Core Tokens
```css
/* Primary Brand */
--color-primary:        #6C63FF;  /* Violet — CTA, active states */
--color-primary-light:  #8B84FF;  /* Hover/focus */
--color-primary-dark:   #4D45CC;  /* Pressed state */
--color-primary-bg:     #EEF0FF;  /* Light backgrounds */

/* Secondary */
--color-secondary:      #FF8C42;  /* Warm Orange — highlights, badges */
--color-secondary-light:#FFA96B;
--color-secondary-bg:   #FFF3EB;

/* Accent */
--color-accent:         #43D9A2;  /* Mint Green — success */
--color-accent-dark:    #2BAE7E;

/* Semantic */
--color-danger:         #FF5C5C;  /* Errors */
--color-warning:        #FFB74D;  /* Warnings */
--color-info:           #42A5F5;  /* Info */
--color-success:        #43D9A2;  /* Success */

/* Mentor Mode (Dark) */
--color-mentor-bg:      #0F0F1A;  /* Main background */
--color-mentor-surface: #1A1A2E;  /* Cards, surfaces */
--color-mentor-border:  #2E2E4E;  /* Borders, dividers */

/* Child Mode (Light) */
--color-child-bg:       #FFF8E7;  /* Main background */
--color-child-surface:  #FFFFFF;  /* Cards */
--color-child-border:   #E8E0D0;  /* Borders */

/* Text */
--color-text-primary:   #1A1A2E;  /* Light mode */
--color-text-secondary: #7B7B8D;
--color-text-muted:     #A0A0B0;
--color-text-on-dark:   #F5F5FF;  /* Dark mode */
--color-text-on-primary:#FFFFFF;
```

### Child Mode Vibrant Palette (Subject Colors)
```css
--subject-math:     #FF6B6B;  /* Coral Red */
--subject-english:  #4ECDC4;  /* Teal */
--subject-hindi:    #FFE66D;  /* Yellow */
--subject-science:  #A8E063;  /* Green */
--subject-evs:      #56CCF2;  /* Sky Blue */
--subject-gk:       #F9A8D4;  /* Pink */
--subject-default:  #C4B5FD;  /* Lavender */
```

---

## Typography

### Font Families
```
Mentor UI:    Inter         (weights: 400, 500, 600, 700)
Child UI:     Nunito        (weights: 400, 600, 700, 800)
Hindi Text:   Hind          (weights: 400, 500, 600)
Monospace:    JetBrains Mono (for code snippets in admin)
```

### Scale
```
Display:     32px / 700 weight / -0.5px letter-spacing
H1:          28px / 700 weight
H2:          24px / 600 weight
H3:          20px / 600 weight
H4:          18px / 600 weight
Body Large:  16px / 400 weight / 1.6 line-height
Body:        14px / 400 weight / 1.5 line-height
Caption:     12px / 400 weight / 1.4 line-height
Label:       12px / 600 weight / uppercase / 0.5px letter-spacing
```

---

## Spacing System (4pt Grid)

```
xs:   4px   (0.25rem)
sm:   8px   (0.5rem)
md:   12px  (0.75rem)
lg:   16px  (1rem)
xl:   20px  (1.25rem)
2xl:  24px  (1.5rem)
3xl:  32px  (2rem)
4xl:  40px  (2.5rem)
5xl:  48px  (3rem)
6xl:  64px  (4rem)
```

---

## Border Radius

```
none:   0px
sm:     4px
md:     8px
lg:     12px
xl:     16px
2xl:    20px
3xl:    24px
full:   999px  (pills, avatars, FABs)
```

---

## Elevation / Shadows

```
shadow-xs:  0 1px 2px rgba(0,0,0,0.05)
shadow-sm:  0 2px 8px rgba(0,0,0,0.08)
shadow-md:  0 4px 16px rgba(0,0,0,0.10)
shadow-lg:  0 8px 32px rgba(0,0,0,0.12)
shadow-xl:  0 16px 48px rgba(0,0,0,0.16)
```

---

## Component Library

### Atoms (Basic building blocks)

| Component | Variants |
|---|---|
| Button | Primary, Secondary, Ghost, Danger, Icon-only |
| Input | Default, Password, Search, Multiline |
| Badge | Success, Warning, Danger, Info, Neutral |
| Avatar | Small (24), Medium (40), Large (64), XLarge (96) |
| Chip | Subject chip, Filter chip, Selection chip |
| Icon | 24px base, uses Lucide React Native |
| Toggle | Switch (for settings) |
| Checkbox | With label |
| Radio | With label |
| Spinner | Small, Medium, Large |
| Skeleton | For loading states |
| Divider | Horizontal, Vertical |

### Molecules (Composed components)

| Component | Description |
|---|---|
| WorksheetCard | Thumbnail, title, class, subject, difficulty badge, bookmark |
| SubjectCard | Icon, name, worksheet count, subject color |
| ChildCard | Avatar, name, age, assigned classes |
| QuestionCard | Question text, options (per type), progress indicator |
| ProgressBar | Animated fill, percentage label |
| ScoreCard | Score, percentage, star rating, time taken |
| NotificationItem | Icon, title, body, timestamp, unread dot |
| ShareBottomSheet | 3 share strategy buttons |
| PINKeypad | 6-button secure PIN entry with mask |
| DifficultyBadge | Easy (green), Medium (orange), Hard (red) |
| WorksheetTypeBadge | Interactive, Oral, Image-based |

### Organisms (Full-feature blocks)

| Component | Description |
|---|---|
| WorksheetPlayer | Full Q&A interaction engine |
| WorksheetBuilder | Step-by-step worksheet creation form |
| AIGeneratorPanel | Prompt input + preview for AI creation |
| ChildProgressDashboard | Charts, streaks, subject breakdown |
| ClassSelector | Horizontal scroll of class pills |
| SubjectGrid | 2-column grid of SubjectCards |

---

## Animation Guidelines

| Interaction | Animation | Duration |
|---|---|---|
| Screen transitions | Slide or Fade | 250ms |
| Button press | Scale down to 0.96 | 100ms |
| Card hover | Lift (shadow + scale 1.02) | 150ms |
| Worksheet completion | Confetti Lottie + scale bounce | 1500ms |
| Correct answer | Green pulse + checkmark | 300ms |
| Wrong answer | Red shake | 300ms |
| Loading → Content | Fade in from below | 200ms |
| Skeleton → Real | Cross-fade | 300ms |

### Library: React Native Reanimated v3
- Use `withTiming` for most transitions
- Use `withSpring` for bouncy child-mode interactions
- Use Lottie (`lottie-react-native`) for celebrations

---

## Accessibility (WCAG 2.1 AA)

| Rule | Implementation |
|---|---|
| Touch target min 44pt | All interactive elements ≥ 44x44 (56x56 in child mode) |
| Color contrast 4.5:1 | All text passes contrast check |
| Screen reader labels | `accessibilityLabel` on all icons + images |
| No color-only info | Always pair color with text or icon |
| Focus management | `accessibilityRole` set correctly |
| Dynamic text sizing | All text respects system font size |
