# U08 - original outline engineering symbols

Owner request: replace the pictured planet/disc treatment with minimal conceptual 3D outline icons, orderly rotation and better physical lighting; commit and push the code. Baseline: clean `master` at `0a29788c4bcbdfe1f42b374e50f05a32aa07cc01`. Fresh GitHub metadata confirms public `Nima-Moradi1/nima-new-portfolio`, owner `Nima-Moradi1` and push access. Remote master matched the baseline; main remains `a18911c0f9f493eed70fd8c65f844d6853be1e44`.

## Implementation and decisions

- Replaced `solar-system.tsx` with `engineering-symbols.tsx` at the existing MonolithScene seam. Removed the sun, tracks, spheres, face plates, solar shader, billboard alignment, emissive ink and beam cones from this chapter.
- `outline-symbols.ts` builds original physical tube silhouettes: interface window, hollow service stack, AI chip/diamond and rocket. Empty centers are real openings protected by raycast tests. Rounded strokes/endpoints give the metal actual volume.
- Four merged meshes: 23,592 total triangles and 610,704 geometry/index bytes. Interface 2,504 triangles; systems 11,648; AI 4,864; delivery 4,576. Tests enforce a combined budget below 30,000, finite positions and real stroke depth. Geometry is disposed on unmount.
- Same native scroll/copy scheduler, one Canvas, theme owner, reduced-motion reading edition and demand renderer. Raised stations, bounded yaw/pitch and foreground scale replace camera-facing discs. The turn is reversible and settles when scrolling stops; no independent ticker or continuous idle spin.
- Broad warm-white area softbox, restrained cool rim and the existing baked studio produce PBR metal reflections. Light mode changes silver to ink metal. Uses existing Three.js LTC lighting support, adding no package, HDR download, shadow map or postprocessing.
- Locale text, type scale, metadata, jobs, project routes/media, contact, theme tokens and deployment workflow are preserved. No raster concept is shipped as UI.

## Visual comparison

Built-in ImageGen chapter preview: `C:/Users/n_moradirad/.codex/generated_images/01a15e39-11d8-7f40-8c5a-10cb5741ee56/exec-19bbc5e4-5fab-48f7-9182-5c33fec3dc47.png`. This was a design aid, not a separately owner-approved screen or production asset. Original code-native geometry implements its outline language.

`view_image` compared concept and final production `concept-native.png` at 1672x941, all four 1440x900 stages, dark/light, mobile AI and landscape. The requested icon treatment matches the adopted visual direction. Comparison ledger:

| Point | Finding / repair |
| --- | --- |
| Silhouette | Solid badges replaced with four open symbols; chip core tightened into a diamond. |
| Stroke/depth | Initial thin strokes thickened; rocket curves smoothed; rounded physical volume retained. |
| Composition | Initial server/window overlap repaired by raising side stations and moving the assembly away from copy. Final four poses and responsive captures inspected. |
| Material/palette | Silver on dark, ink on pearl; real geometry/PBR specular bands, no neon fill. |
| Copy/type/container | Original localized DOM content, top chrome, type scale and evidence actions preserved. Copy diff: zero catalog/content edits. These intentionally differ from the preview's abbreviated typography/copy. |

No material mismatch remains in the requested icon treatment. Existing small-screen chapter eyebrow/header overlap is outside this icon revision and remains a separate chrome follow-up. This original owner-directed scene supersedes U03's solar art, without claiming complete Ciao calibration. Checkpoints are normalized scroll positions, not invented reference timestamps.

## Fresh verification

- `npm run lint`: PASS. `npm run typecheck`: PASS after production generation. An initial parallel attempt raced Next's generated `.next/types`; sequential final check passed.
- `npm test`: PASS, 13 files / 63 tests. An initial strict scale-bound assertion differed by 2e-16; corrected assertion tolerance and reran the full suite. Geometry/choreography subset: 13 tests, including real empty-center rays, finite geometry/volume/budget, station separation and continuous boundaries.
- `npm run build`: PASS once, 24 generated pages.
- Production: `node $env:TEMP/nm-outline-final.cjs`, installed Chrome/Playwright because Browser plugin/skill is unavailable. EN 1440x900, FA 390x844 RTL, DE 430x932, EN 360x640, landscape 844x390, native concept 1672x941. One Canvas, ready scene, localized content, no overflow/framework overlay; final `errors=[]`, `pass=true`.
- Four expected proof headings/readable copy, native wheel forward/reverse (6809 -> 7394 -> 6809), light/dark, Persian light mode, contact open/close, Experience switch and reduced-motion no-Canvas reading edition PASS. No contact message sent.
- Native-wheel video: `node $env:TEMP/nm-outline-motion.cjs`; `%TEMP%/nm-outline-final/native-rotation.webm`. Raw screenshots/video remain in `%TEMP%/nm-outline-final/`; committed `validation.json` and `artifact-hashes.json` preserve results, byte sizes and hashes. Earlier diagnostic scripts `%TEMP%/nm-outline-{first,debug,second,stages}.cjs` and `nm-outline-review/` are not final acceptance.
- Owner dev server 3000 was never stopped. A second dev server was rejected by Next's lock; inspection reused `localhost:3000` after `127.0.0.1:3000` hit its dev-origin restriction. Owned production verifier 3100 is stopped after QA. `next start` prints the existing standalone advisory; served production pages/assets passed.

Limits: emulated mobile, no physical-device GPU/FPS/memory, Safari/Firefox, new Lighthouse, field performance, full reference calibration, contact transmission or live deployment claim. U06 and wider release gates remain open. Publication: normal scoped commits to `origin/master`, followed by exact SHA/clean-status verification. Main, Liara, secrets and workflows are untouched.

## Publication result

Implementation 9728146 and evidence 8f5dfe3 pushed normally to origin/master. Fresh git ls-remote matched local HEAD at 8f5dfe36e9a6262a0cd027792a3eb50d08f5f26d; status was clean and starting-baseline ancestry passed. Main remains a18911c. This additional documentation record is pushed separately and the final SHA is checked before delivery. No deployment occurred.
