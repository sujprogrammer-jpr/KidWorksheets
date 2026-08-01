# KidWorksheets PWA

Interactive exam preparation worksheets for **UKG-C Term 1 (2026–27)**  
Vardhman Srikalyan International School

---

## 🚀 How to Run

### Option 1 — npx serve (recommended)
```bash
cd pwa
npx serve .
```
Then open `http://localhost:3000` in your browser.

### Option 2 — Python (if installed)
```bash
cd pwa
python -m http.server 3000
```

### Option 3 — VS Code Live Server
Right-click `pwa/index.html` → **Open with Live Server**

> ⚠️ Service Worker (offline caching) requires `localhost` or HTTPS.  
> Open via `http://localhost:...` not via `file://` for full PWA features.

---

## 📱 Install on Tablet/Phone

1. Open the app in Chrome/Edge
2. Tap the **Install** banner that appears, or use browser menu → "Add to Home Screen"
3. App runs fully offline after first load ✅

---

## 📋 What's Inside

| Subject | Worksheets | Questions |
|---------|------------|-----------|
| 📚 English | 9 | 90 |
| 🔢 Mathematics | 10 | 100 |
| 🇮🇳 Hindi | 5 | 50 |
| 🌍 General Awareness | 5 | 50 |
| 🎨 Art & Craft | 1 | 10 |
| **Total** | **30** | **300** |

---

## ✨ Features

- **Child Mode** — Warm, playful UI with large touch targets
  - Practice all 5 subjects (300 pre-loaded questions)
  - MCQ, True/False, Fill in the Blank question types
  - ✏️ Letter Tracing Canvas — English A-Z and Hindi अ-ह
  - Instant answer feedback with animations
  - Star rating (⭐⭐⭐) and confetti on completion
  - Progress tracking across sessions

- **Mentor Mode** — Dark professional UI  
  - View and manage all worksheets per subject
  - Create custom worksheets (MCQ, T/F, Fill Blank)
  - 🖨️ Print any worksheet — clean A4 format
  - Toggle Answer Key for checking printed work

- **PWA Features**
  - Installable to home screen
  - Works fully offline after first load
  - Fast, app-like experience

---

## 🗂️ Project Structure

```
pwa/
├── index.html          ← App shell
├── manifest.json       ← PWA manifest
├── sw.js               ← Service worker (offline caching)
├── css/
│   └── app.css         ← Full design system
├── js/
│   ├── data.js         ← All 300 pre-loaded questions
│   └── app.js          ← SPA router + all screens
└── icons/
    ├── icon-192.png
    └── icon-512.png
```

---

## 🔮 Next Steps (Phase 2 — React Native)

- Build React Native (Expo) app using the same design system
- Add PIN-based child profiles
- Cloud sync via Supabase
- AI worksheet generation (Gemini)
- Oral revision mode
