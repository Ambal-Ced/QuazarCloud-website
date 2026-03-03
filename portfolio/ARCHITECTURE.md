# Portfolio v2 — Architecture Spec

**Goals:** Fast, smooth, lightweight. Fixed background (content feels detached). Section-jump navigation (no continuous scroll). Rich transitions: fade, push, wipe, reveal, flip.

---

## 1. Visual model: fixed background + scrolling content

```
┌─────────────────────────────────────────┐
│  BACKGROUND (fixed, full viewport)      │  ← Stays still (image/gradient/video)
│  ┌─────────────────────────────────┐   │
│  │ CONTENT LAYER (scrolls/transitions)│   │  ← Text, images, cards move over it
│  │  Section 1 (Hero)                │   │
│  │  Section 2 (About)                │   │
│  │  Section 3 (Projects)             │   │
│  │  ...                              │   │
│  └─────────────────────────────────┘   │
└─────────────────────────────────────────┘
```

- **Background:** One full-viewport layer with `position: fixed` (or equivalent). Never scrolls.
- **Content:** All sections live in a layer on top. Only this layer “moves” (scroll or transition), so content feels **detached** from the background.

---

## 2. Navigation: section-jump, not continuous scroll

- **Not:** Traditional scroll where `y` goes smoothly from 15 → 1 (continuous).
- **Yes:** User scrolls (or uses nav/keys) → **jump to next/prev section** with a **smooth transition** (e.g. fade, push, wipe, reveal, flip).

So the behavior is:

- **Inputs:** Mouse wheel, touch swipe, nav links, arrow keys.
- **Logic:** Map input to “next section” or “prev section” (index ± 1).
- **Output:** Animate **from** current section **to** target section using the chosen transition type.

---

## 3. Transition types to support

| Type    | Description |
|--------|-------------|
| **Fade**   | Current section fades out; next fades in (optionally crossfade). |
| **Push**   | Next section pushes current up or down (or vice versa). |
| **Wipe**   | Next section wipes in from left/right (or top/bottom) like a slide. |
| **Reveal** | Current section slides away to reveal the next underneath. |
| **Flip**   | Card-like flip (e.g. 3D rotate) from current to next. |
| **Line reveal** | Invisible vertical line: content appears left → right, vanishes right → left (clip-path). |

These are **section-to-section** transitions (between full-viewport sections), not just small UI animations.

---

## 3.1 One transition per section (saved)

- **Each section has its own transition type.** The transition is fixed per section (e.g. Section 1 = Fade, Section 2 = Push up, Section 7 = Line reveal).
- **The transition you see is the one for the section you’re viewing.** When you jump to a section, that section enters with its assigned transition; when you leave, it exits with the same type.
- **Section content = box layouts.** Each section will contain box-style content (like the wireframes): e.g. grid/masonry of cards, image + text blocks, video list, large media cards, or single item with description. The **whole section** (all boxes and text inside it) uses that section’s single transition when entering and leaving. Individual boxes inside a section do not change the section transition; they’re just the layout inside the box.

---

## 3.2 “View more” sections (e.g. Certificates)

- **Some sections have “View more”.** For example, the Certificates section shows a few items by default; “View more” expands to show the rest. While expanded, the section content can scroll (user scrolls down within that section to see more).
- **Scroll-to-next-section when at bottom.** When the user is at the **very bottom** of an expanded section and scrolls down again, “View more” / inner scroll is inactive — the next scroll gesture **advances to the next section** (section-jump). So: scroll inside section until bottom → one more scroll down → go to next section.
- **Implementation note:** The section needs an inner scroll container when expanded. Wheel/touch handler: if the section is expanded and the inner container is **not** at scroll bottom, consume the event and scroll the container; if it **is** at bottom (or section not expanded), advance to next section.

---

## 4. Recommended architecture

### Layer structure

1. **Background layer**  
   - Single full-viewport element, `position: fixed`, `inset: 0`, `z-index: 0`.  
   - Content has `z-index > 0`.

2. **Section container (content layer)**  
   - One wrapper that either:
     - **A) Scroll-based:** Contains full-height sections and uses **scroll-snap** so each “scroll” snaps to a section (jump feel), or  
     - **B) JS-based:** Contains sections stacked/positioned by index; no real scroll — **current section index** is in state; wheel/touch/nav update index and run a transition.

3. **Section stack**  
   - Each section = full viewport height (e.g. `100dvh` or `100vh`).  
   - Only one section “active” at a time in terms of visibility (in JS-based approach) or scroll position (in scroll-snap approach).

### Two implementation patterns

| Pattern        | How it works | Transitions | Weight | Best for |
|----------------|--------------|------------|--------|----------|
| **Scroll-snap**| Native scroll; `scroll-snap-type: y mandatory`; sections snap. | Enter/exit animations per section (e.g. fade in when in view). Between-section wipe/flip is limited. | Lightest | Fast, lightweight, “good enough” section jump. |
| **JS section index** | No real scroll; `currentSection` in state; wheel/touch/nav change index; you run exit + enter animation. | Full control: fade, push, wipe, reveal, flip between sections. | Slightly heavier | Exact transition control and “detached” feel. |

**Recommendation for your spec (smooth + transitions + lightweight):**  
Use the **JS section-index** approach so you can implement **fade, push, wipe, reveal, flip** exactly. Keep the rest of the app minimal so it stays fast and lightweight.

---

## 5. Tech stack that fits this architecture

- **Framework:** **React + Vite** (or Svelte + Vite). You need:
  - State for `currentSection`.
  - One component that renders all sections and runs transitions when `currentSection` changes.
- **Styling:** **Tailwind CSS** for layout (full viewport, fixed background, z-index).
- **Transitions:** Prefer **Framer Motion** (React) or **Svelte transitions** (Svelte):
  - Encapsulate “section in/out” with variants (fade, slide, wipe, etc.).
  - Optional: small **GSAP** usage only for flip/reveal if you want maximum control with minimal bundle.
- **Scroll/wheel handling:**  
  - **Wheel:** Throttled handler that maps delta to next/prev section and updates `currentSection`.  
  - **Touch:** Swipe left/right or up/down to next/prev.  
  - **Nav/keys:** Buttons and arrow keys set `currentSection`.

Avoid heavy “fullpage” libraries; a thin custom section manager (~50–100 lines) is enough and keeps the bundle small.

---

## 6. Suggested file / component structure

```
portfolio-v2/
├── index.html
├── src/
│   ├── main.tsx
│   ├── App.tsx                    # Layout: background + SectionContainer
│   ├── components/
│   │   ├── Background.tsx         # Fixed full-viewport layer
│   │   ├── SectionContainer.tsx   # Manages currentSection, wheel/touch/nav
│   │   ├── Section.tsx            # Wrapper for one section (with Motion)
│   │   └── transitions/           # Optional: fade, push, wipe, reveal, flip variants
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Projects.tsx
│   │   └── ...
│   └── hooks/
│       └── useSectionNavigation.ts # currentSection, next/prev, wheel/touch/key handlers
```

- **Background:** Renders once; no logic.
- **SectionContainer:** Holds `currentSection`, renders all sections; only the active one is visible (or others are off-screen/opacity 0). On index change, run exit animation on old section, enter on new (Framer Motion `AnimatePresence` + variants).
- **useSectionNavigation:** Returns `{ currentSection, setSection, next, prev }` and attaches wheel/touch/key listeners (throttled/debounced).

---

## 7. Summary

| Requirement           | Approach |
|-----------------------|----------|
| Fast & smooth         | React + Vite, minimal JS; CSS for layout; Framer Motion for transitions only. |
| Lightweight           | No heavy fullpage libs; custom section manager + Framer Motion (tree-shakeable). |
| Fixed background      | One `position: fixed` full-viewport layer; content in a separate scrolling/transitioning layer. |
| Content “detached”    | Only the content layer moves; background never moves. |
| Section-jump (no continuous scroll) | JS-driven `currentSection`; wheel/touch/nav trigger index change + transition. |
| Transitions           | Fade, push, wipe, reveal, flip implemented as Framer Motion (or Svelte) variants in `Section`/`SectionContainer`. |

**Best architecture:** React + Vite + Tailwind + Framer Motion, with a **fixed background**, **JS-driven section index**, and a **custom section container** that runs your chosen transition (fade/push/wipe/reveal/flip) between sections.
