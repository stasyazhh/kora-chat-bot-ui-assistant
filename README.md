# Kora — clickable prototype

**Kora** is an embeddable AI chatbot builder for businesses. This repository contains a frontend-only, launch-ready clickable prototype: a landing page plus a multi-screen SaaS application.

## What is implemented

### Landing page (`/`)
- Hero section with the value proposition and a working ChatPanel preview.
- Steps section.
- Header with navigation anchors and CTAs that lead into the app.
- The landing page is visually unchanged from the approved design.

### Application shell (`/app/*`)
- Left desktop sidebar with the current assistant selector, navigation and user area.
- Compact mobile hamburger menu with a slide-out drawer (closes via overlay, close button, Escape or selecting a route).
- Warm off-white background, white surfaces, soft shadows and coral `#FF5C35` accent.

### Routes

| Route | Description |
|-------|-------------|
| `/` | Landing page |
| `/app/onboarding` | Create assistant form (name, description, tone) |
| `/app/knowledge` | Upload area, source list, “Add URL”, readiness card |
| `/app/test` | ChatGPT-like test chat with default demo conversation |
| `/app/widget` | Widget builder: appearance, install snippet, live preview |
| `/app/billing` | Pricing cards, usage summary, plan upgrade |
| `/app/overview`, `/app/analytics`, `/app/settings` | Lightweight “Coming soon” placeholders |

### Key interactions
- **Onboarding** → creates assistant and navigates to Knowledge.
- **Knowledge** → shows 3 demo sources by default; upload/URL adds a “Processing → Ready” source; “Reset demo content” restores the demo workspace.
- **Test chat** → default assistant greeting + demo Q&A; suggested questions filter out already-asked ones; free-form input works with Enter / Shift+Enter.
- **Widget builder** → live website preview with one open Kora widget; position, accent color, name, welcome message and launcher style update instantly; Install tab copies embed code with “Copied!” feedback.
- **Billing** → “Upgrade to Growth” updates plan state and shows a success toast; locked branding control opens an upgrade modal on Starter.
- **Mobile** → settings-first widget layout with a “Preview widget ↓” shortcut that smoothly scrolls to the live preview.

## Demo workspace

Shared across all app routes:

- **Assistant:** Acme Support Assistant — Ready
- **Sources:** FAQ (128 questions), Product Guide (42 sections), Return Policy (Updated Aug 12)
- **Indexed chunks:** 182
- **Default chat:** assistant greeting → “Can I return my order?” → answer with “Source · Return Policy” chip

## Tech stack

- React 19 + TypeScript
- Vite
- Tailwind CSS
- React Router
- Framer Motion (landing ChatPanel)
- Lucide React

No backend, authentication, file upload service or real AI API is used. All state is client-side and persisted to `localStorage`.

## How to run

```bash
cd kora
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Production build

```bash
cd kora
npm run build
```

**Last build result:** successful, no errors.

## Project structure (app)

```
kora/src/
├── app/
│   ├── state.tsx              # shared app state + localStorage persistence
│   ├── AppShell.tsx           # sidebar + mobile navigation
│   ├── components/
│   │   ├── PageHeader.tsx
│   │   └── Modal.tsx
│   └── routes/
│       ├── Onboarding.tsx
│       ├── Knowledge.tsx
│       ├── TestChat.tsx
│       ├── Widget.tsx
│       ├── Billing.tsx
│       ├── Overview.tsx
│       ├── Analytics.tsx
│       └── Settings.tsx
├── components/                # landing page components
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── Steps.tsx
│   ├── ChatPanel.tsx
│   └── Logo.tsx
├── App.tsx                    # routing
└── main.tsx
```

## QA summary

Verified end-to-end flow:

1. Landing page → “Get started” / “Build your assistant”
2. `/app/onboarding` → Create assistant
3. `/app/knowledge` → populated demo sources visible
4. “Test your assistant” → `/app/test`
5. Suggested and custom questions produce predefined answers with matching source chips
6. `/app/widget` → appearance controls update the single live preview widget
7. Install tab → Copy code shows “Copied!”
8. Locked “Remove Kora branding” → upgrade modal
9. “View plans” → `/app/billing`
10. “Upgrade to Growth” → plan state updates + success toast
11. Mobile menu opens/closes correctly; no horizontal overflow on key screens

All defects found during QA (branding toggle not enabling after upgrade) were fixed and the production build was re-run.
