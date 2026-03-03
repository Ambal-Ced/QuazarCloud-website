# Which file loads what (portfolio-v2)

When you open **http://localhost:5173/** in the browser, this is the order things run:

---

## 1. `index.html` (project root)

- **What it is:** The single HTML file the browser loads.
- **What it does:**
  - Defines the page (`<html>`, `<body>`, `<title>Ambal — Portfolio</title>`).
  - Contains a `<div id="root">` with “Loading…” (replaced as soon as React mounts).
  - Has a **critical `<style>` block** so `.app-layout`, `.app-sidebar`, and `.app-main` are always visible (flex, sidebar width, main area background).
  - Loads the app with: `<script type="module" src="/src/main.tsx"></script>`.

**So:** The browser loads `index.html` → then requests and runs `/src/main.tsx`.

---

## 2. `src/main.tsx`

- **What it is:** The JavaScript entry. Runs when the script in `index.html` loads.
- **What it does:**
  - Imports global CSS: `import './index.css'`.
  - Imports the root React component: `import App from './App'`.
  - Finds the DOM node `#root` and renders `<App />` into it (so “Loading…” is replaced by the React app).

**So:** `index.html` loads → runs `main.tsx` → `main.tsx` renders `App` into `#root`.

---

## 3. `src/App.tsx`

- **What it is:** The root React component.
- **What it does:** Renders:
  1. **Background** — full-page dark gradient (from `./components/Background`).
  2. A **layout div** with class `app-layout` (styled in `index.html`):
     - **Sidebar** — from `./components/Sidebar` (uses class `app-sidebar`).
     - **WireframeContent** — from `./components/WireframeContent` (uses class `app-main`).

**So:** `main.tsx` renders `App` → `App` renders `Background` + layout with `Sidebar` + `WireframeContent`.

---

## 4. Components (used by App)

| File | Used by | Role |
|------|---------|------|
| `src/components/Background.tsx` | App.tsx | Full-page fixed dark gradient behind everything. |
| `src/components/Sidebar.tsx` | App.tsx | Left panel: “Ambal.” + nav links (Home, About, …). Uses class `app-sidebar` so it’s visible. |
| `src/components/WireframeContent.tsx` | App.tsx | Main scrollable area: Hero, About, Projects, Experience, Credentials, Resume. Uses class `app-main`. |

---

## 5. `src/index.css`

- **What it is:** Global CSS.
- **Loaded by:** `main.tsx` (`import './index.css'`).
- **What it does:** Imports Tailwind (`@import "tailwindcss"`) and sets base styles for `html`, `body`, `#root`.

---

## Summary

```
Browser opens http://localhost:5173/
    → Server sends index.html
    → index.html loads /src/main.tsx
    → main.tsx runs: imports index.css + App, then render(<App />, #root)
    → App renders: Background + (Sidebar + WireframeContent inside .app-layout)
```

**To see the app:** Run `npm run dev` **from the `portfolio-v2` folder**, then open **http://localhost:5173/** (root URL, not `/index`).
