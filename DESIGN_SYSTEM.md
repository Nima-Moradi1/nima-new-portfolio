# Signal Atelier Design System

## Concept

Signal Atelier presents professional work as a signal moving through a designed system. The interface should feel technical but not cold, expressive but never theatrical at the expense of comprehension.

The 2D and 3D layers share the same grammar:

- Circular fields represent active ideas and areas of influence.
- Thin orbital lines describe relationships and continuity.
- Editorial typography carries the human narrative.
- Monospaced microcopy acts as coordinates, labels, and system status.
- Grid lines provide precision without becoming a dashboard aesthetic.

## Color tokens

| Token            | Value     | Role                         |
| ---------------- | --------- | ---------------------------- |
| `--ink`          | `#090b0a` | Primary background           |
| `--ink-soft`     | `#111411` | Alternate section background |
| `--surface`      | `#151915` | Card surface                 |
| `--surface-lift` | `#1b201b` | Elevated surface             |
| `--paper`        | `#f1f4ec` | Primary text                 |
| `--muted`        | `#9ba399` | Secondary text               |
| `--signal`       | `#b8ff45` | Primary interactive signal   |
| `--violet`       | `#a98cff` | Secondary project frequency  |
| `--coral`        | `#ff7e67` | Tertiary project frequency   |
| `--error`        | `#ff9b8b` | Validation and failure       |

Signal green is used sparingly for status, focus, primary actions, and coordinates. It should not flood large reading surfaces. Light mode remaps these semantic tokens to warm paper surfaces and deeper green accents rather than inverting the page mechanically.

## Typography

- Interface and editorial: Geist Sans
- Coordinates, labels, tags, status, and technical metadata: Geist Mono
- Display headings use tight leading and negative tracking.
- Body copy stays between 60–75 characters per line where possible.
- Section headings use sentence case to avoid a generic technology-template tone.

## Spacing and grid

- Content width: `92rem`
- Fluid gutter: `clamp(1.25rem, 4vw, 4.5rem)`
- Section rhythm: `clamp(6rem, 11vw, 11rem)`
- Desktop section headers use a 0.62 / 1.38 editorial split.
- Primary component gaps use multiples of roughly 8px while retaining fluid `clamp()` values at large scales.

## Radius and elevation

- Small status or error surfaces: `0.6rem`
- Standard controls: `1rem` or pill radius
- Immersive project cards: `1.6rem`
- Elevation is rare and soft; most hierarchy comes from borders, scale, and surface contrast.

## Components

### Styling architecture

Tailwind CSS 4 utilities are the default for layout, spacing, typography,
responsive behavior, state variants, and semantic color use. Reusable class
maps are colocated beside larger components so the preserved BEM tokens remain
stable test and debugging hooks without carrying visual rules in the global
stylesheet.

Accessible controls are composed from the local shadcn-style primitives in
`src/components/ui/`, backed by Radix where interaction semantics require it.
CSS Modules are reserved for genuinely graphical work such as layered CSS
illustrations, pseudo-elements, canvas framing, and component-specific
keyframes. Each exception names its consumer and explains why utilities would
make that artwork harder to maintain. `src/app/globals.css` owns only theme
tokens, document defaults, locale inheritance, and the shared depth system.

### Header

The header begins transparent and becomes a blurred, bordered control surface after scrolling. Desktop navigation is centered; mobile navigation becomes a large editorial index.

### Magnetic link

Hero action links remain spatially fixed. Hover may change only the border color;
the label, icon, background, and position do not animate. The signal-green
primary action always uses black text for reliable contrast.

### Section heading

Each section begins with a numbered coordinate and a large narrative statement. The coordinate becomes a top label on smaller screens.

### Project card

Project cards combine procedural imagery with real case-study content. The first project receives a wider composition on large screens. Hover changes elevation and the procedural core, not text readability.

### Experience book

The experience section stays pinned while scroll progress turns three curved sheets across four résumé chapters. The active chapter is typeset over the visible right page. Previous/next buttons and focused arrow-key navigation change the same scroll position, so every input method shares one source of truth. Reduced-motion or unsupported-WebGL environments receive a complete two-dimensional chapter list.

### Theme lamp

The fixed reading lamp is both scene and control. Pulling its chain beyond the threshold or clicking its accessible button toggles the room: lamp on means dark mode, lamp off means light mode. The preference is persisted locally. The control remains a native button with a state-specific accessible name.

### Contact form

Labels always remain visible. Errors sit directly beneath their fields. Pending, success, unavailable, and failure states are distinct. A missing provider is presented as “not sent,” followed by a mailto path.

### First-frame loader

The first uncached landing visit uses orbiting signal fields, a live percentage, and plain-language loading phases. The portfolio renders behind the overlay so its fonts, assets, and required WebGL frame can settle before reveal. A versioned local marker removes the loader from returning visits.

### XO Arena case study

XO Arena extends the editorial grid into a documented product walkthrough. The video is the primary evidence surface; engineering cards explain the surrounding systems, and lazy image frames use masked grid skeletons until their optimized captures decode.

### Mobile experience reader

Coarse pointers receive a CSS-rendered experience book with native previous/next controls. It preserves the paper, folio, chapter, and spine language while avoiding a continuous WebGL loop and long pinned scroll region.

## Motion rules

| Motion          | Duration | Easing                       | Purpose                        |
| --------------- | -------- | ---------------------------- | ------------------------------ |
| Hover response  | 180ms    | standard ease                | Immediate feedback             |
| UI transition   | 420ms    | `cubic-bezier(0.16,1,0.3,1)` | Surface and control continuity |
| Section reveal  | 780ms    | same expressive ease         | Gentle narrative pacing        |
| Room transition | 650ms    | standard ease                | Lamp-led light/dark atmosphere |

Motion must be interruptible. No transition blocks scrolling or navigation. No sound autoplays. `prefers-reduced-motion` removes spatial transforms and continuous CSS animation while keeping the visual composition complete.

## 3D principles

- Cameras: restrained 32–39° perspective selected per scene
- Hero: emissive core, wireframe shell, orbital meshes, and instanced nodes
- Book: procedural covers, page stacks, curved subdivided sheets, and scroll-derived rotation
- Lamp: procedural metal stand, shade, bulb, cord, handle, animated 3D pull-hand cue, and interpolated point light
- Lighting: bounded ambient, directional, and point lights matched to room theme
- Renderer: DPR capped at 1.5 with adaptive reduction
- No texture downloads, environment maps, postprocessing, or physics
- Shadows are limited to the book and one-frame lamp contact shadow
- Instancing is used for repeated signal nodes
- Off-screen hero and book render loops switch to demand mode
- Canvases are decorative; the narrative and controls remain semantic HTML
- Static and motion-safe fallbacks must remain visually intentional

## Responsive rules

| Range        | Composition                                                          |
| ------------ | -------------------------------------------------------------------- |
| Above 1152px | Full three-column header and split hero                              |
| 864–1152px   | Mobile menu, retained split hero                                     |
| 608–864px    | Stacked hero; book above a compact paper chapter; smaller fixed lamp |
| Below 608px  | Compact lamp, clipped book viewport, paper chapter, full-width forms |

The mobile site is recomposed, not scaled. Hover-only affordances are removed on coarse pointers and all controls preserve comfortable touch targets.

## Accessibility rules

- Target WCAG 2.2 AA.
- Never place critical résumé content only in the canvas.
- Use native controls before ARIA.
- Maintain one logical `h1`, followed by ordered section `h2` elements.
- Preserve visible focus with a two-pixel signal outline.
- Associate errors using `aria-describedby` and announce submission state.
- Never rely only on green, violet, or coral to communicate a state.
- Honor reduced motion, high contrast, forced colors, touch, and keyboard use.
- Keep mobile navigation items out of the tab order while closed.
