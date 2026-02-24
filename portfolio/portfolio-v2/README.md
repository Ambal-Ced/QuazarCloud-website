# Portfolio v2 — New Stack

Recreated portfolio: **different language/framework**, **minimalist**, **fast**, **smooth**, with a **fixed background** and **section-jump navigation** (no continuous scroll).

---

## Architecture (your spec)

- **Fixed background** — Stays still; text, images, and content scroll/transition over it (detached feel).
- **Section-jump navigation** — Scrolling doesn’t move `y` smoothly; it **jumps** to the next/prev section with a **transition** (fade, push, wipe, reveal, flip).
- **Transitions** — Fade in/out, push up/down, wipe left/right, reveal, flip between full-page sections.
- **Fast & lightweight** — Minimal JS; no heavy fullpage libraries.

Full details: **[ARCHITECTURE.md](./ARCHITECTURE.md)** (layers, patterns, component structure).

---

## Recommended stack (for this architecture)

| Layer | Choice | Why |
|-------|--------|-----|
| **Framework** | **React + Vite** | State for current section; simple component tree; fast build. |
| **Styling** | **Tailwind CSS** | Layout (fixed background, full-height sections, z-index) with minimal CSS. |
| **Transitions** | **Framer Motion** | Declarative fade/push/wipe/reveal/flip; `AnimatePresence` for section enter/exit; tree-shakeable. |
| **Logic** | **Custom section manager** | One hook: `currentSection`, next/prev, wheel + touch + nav/key. No heavy fullpage lib. |

**Alternative:** Svelte + Vite + Svelte transitions — same idea, smaller bundle if you prefer Svelte.

---

## Quick start

```bash
# From repo root
cd portfolio-v2
npm create vite@latest . -- --template react-ts
npm install
npm install framer-motion tailwindcss @tailwindcss/vite
# Add Tailwind to vite.config, then implement Background + SectionContainer + useSectionNavigation
```

---

## Next steps

1. Scaffold React + Vite + Tailwind + Framer Motion in this folder (or a subfolder).
2. Implement the **fixed background** and **section-index** flow from [ARCHITECTURE.md](./ARCHITECTURE.md).
3. Add sections (Hero, About, Projects, etc.) and wire nav + wheel/touch to `currentSection`.
4. Implement transition variants (fade, push, wipe, reveal, flip) in your section component.
5. Reuse content/assets from the repo root (`logo_resource/`, `placeholder.jpg`, copy from `index.html`).

Your original portfolio stays unchanged in the repo root.
