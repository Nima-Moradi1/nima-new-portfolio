# Visual Preview and Capture Guide

This directory is the review surface for approved screenshots of Signal Atelier. It documents how previews are produced, which states must be covered, and what must be verified before an image is treated as representative of the shipped portfolio.

## Purpose

Preview images serve three distinct goals:

1. Give reviewers a fast, accurate view of the finished experience.
2. Preserve evidence of responsive and interaction quality across releases.
3. Catch visual regressions that DOM assertions alone cannot describe.

Screenshots should always come from a real browser rendering the current production build. Do not add mockups, stale captures, or manually reconstructed states to this directory.

## Current preview status

The browser workflow is configured and the critical lamp and experience-book layouts have been inspected at desktop and mobile sizes. Approved screenshots are added only when they are intentionally selected for long-term documentation; temporary Playwright diagnostics remain test artifacts and are not committed.

## Prerequisites

- Node.js 20.9 or newer
- Project dependencies installed with `npm install`
- Playwright Chromium installed with `npx playwright install chromium`
- A successful production build

Run the complete verification sequence before capturing release previews:

```bash
npm run format:check
npm run lint
npm run typecheck
npm test
npm run build
npm run test:e2e
```

## Production capture workflow

Build and serve the optimized application:

```bash
npm run build
npm run start
```

Open `http://localhost:3000` in Chromium, confirm that the page has settled, and capture the required views below. Production captures are preferred because they exclude development overlays, hot-reload timing, and debug-only behavior.

## Required viewport matrix

| Viewport      | Device class    | Primary review focus                                                 |
| ------------- | --------------- | -------------------------------------------------------------------- |
| `390 x 844`   | Small phone     | Mobile navigation, compact lamp, book-to-copy spacing, touch targets |
| `768 x 1024`  | Tablet portrait | Responsive type scale, book framing, section transitions             |
| `1440 x 900`  | Desktop         | Full composition, lamp geometry, book and heading separation         |
| `1920 x 1080` | Large desktop   | Maximum content width, negative space, fixed-element placement       |
| `2560 x 1080` | Ultrawide       | Scene centering, line lengths, excessive horizontal drift            |

When a release changes responsive layout, also inspect a short viewport such as `1366 x 768` and a narrow viewport near the `54rem` breakpoint.

## Required interaction states

Capture enough states to explain the product rather than repeating nearly identical frames.

### Foundation

- Hero in dark mode after all WebGL scenes have rendered
- Hero in light mode after the theme interpolation has completed
- Mobile navigation open at phone width

### Reading lamp

- Lamp at rest with its arm, shade, cord, and base visibly connected
- Cord held near the activation threshold
- Completed light-mode transition with no blank or lost-context frame

### Experience reader

- First experience page with the section heading fully unobstructed
- A middle page during or immediately after a page turn
- Phone layout showing clear separation between heading, book, page copy, and lamp

### Content and forms

- Featured project composition
- Contact form default state
- Contact form validation state with readable error messaging

## File naming convention

Use lowercase, descriptive filenames with the viewport width and theme:

```text
hero-dark-1440.png
lamp-pulled-dark-1440.png
experience-page-02-light-1440.png
experience-mobile-dark-390.png
contact-validation-light-768.png
```

If a screenshot documents a specific release, append the release identifier rather than replacing a historically relevant image:

```text
experience-mobile-dark-390-v0.2.0.png
```

## Visual quality checklist

### Composition

- No heading, paragraph, image, or control is covered by a WebGL scene.
- Fixed controls do not obscure essential content or navigation.
- Section boundaries remain clear at every target viewport.
- Text remains inside its intended card or book page.

### Lamp interaction

- The stem, joint, arm, and shade form one connected silhouette.
- The pull cord begins at the shade and its HTML hit target matches the visible handle.
- A short pull returns to rest without changing the theme.
- A full pull changes the theme exactly once and releases smoothly.
- Theme changes do not blank a canvas or log a lost WebGL context.

### Experience book

- The book is visually secondary to the section heading.
- Desktop framing keeps the book in the right-hand composition.
- Mobile framing places the book below the heading and above the page copy.
- Page copy remains readable and clear of the floating lamp.
- Page turns do not clip the cover, spine, or active content.

### Rendering and accessibility

- Browser console contains no application errors or Three.js deprecation warnings.
- WebGL fallbacks remain coherent when GPU rendering is unavailable.
- Reduced-motion mode avoids continuous decorative animation.
- Focus outlines, button labels, contrast, and touch targets remain visible.
- Screenshots contain no browser extensions, development badges, personal data, or unrelated desktop UI.

## Approval rules

Before committing a capture:

1. Compare it with the live page at the same viewport.
2. Confirm the related Playwright flow passes.
3. Check the image at 100% scale for clipping, blur, and transient animation frames.
4. Use lossless PNG for interface evidence; use optimized WebP only for presentation-focused previews.
5. Record the approved filename in the root `README.md` when it becomes part of the public project overview.

Temporary screenshots, traces, and failure artifacts belong in Playwright's output directories, not in `docs/previews/`.

## Troubleshooting

### WebGL content is missing

Confirm hardware acceleration is available, reload the production page, and check the console for context-loss messages. The application should render its static fallback when WebGL is unavailable.

### A screenshot contains a partial theme transition

Wait for the theme animation to finish before capturing the resting state. Capture an in-progress state only when the transition itself is under review.

### The book is not aligned with its page copy

Verify the exact viewport dimensions, reset browser zoom to 100%, and ensure the production CSS is current. Re-run the responsive layout regression before approving the image.

### Captures differ between machines

Use the same Chromium version, device scale factor, font availability, theme, and viewport. Small rasterization differences are normal; geometry, spacing, content, and interaction state should remain consistent.

## Maintenance

Update this guide whenever the capture matrix, responsive breakpoints, theme behavior, or visual regression workflow changes. Remove obsolete images only when their replacement has been reviewed and referenced documentation has been updated.
