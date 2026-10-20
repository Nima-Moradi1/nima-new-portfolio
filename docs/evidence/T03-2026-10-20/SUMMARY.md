# T03 baseline evidence — 2026-10-20

Baseline collection completed for the current production revision and an isolated local production build. This is a measurement record, not a claim that the performance or accessibility targets pass. No application source, original checkout, deployment, secrets or contact transport was changed.

## Revision and environment

- Working checkout: `C:\Users\n_moradirad\Desktop\updated-portfolio`.
- Branch: `feat/nm-kinetic-portfolio`; HEAD: `a18911c0f9f493eed70fd8c65f844d6853be1e44`.
- Production EN/FA/DE responses reported the same `x-deployment-sha`.
- Windows 10.0.19045; Intel Core i5-9500, 6 logical CPUs; Node 24.18.0; npm 11.16.0; Chrome 155.0.8059.85; Lighthouse 13.5.0.
- Actual installed packages are recorded in `installed-versions.json`: Next 16.2.10, React 19.2.4, next-intl 4.13.4, Playwright 1.62.0, axe Playwright 4.12.1.
- Existing dependencies were reused through a directory junction from this checkout's `node_modules` to `C:\Users\n_moradirad\Desktop\nima-new-portfolio\node_modules`. No app dependencies or lockfiles were installed/changed. Replace this junction before any future dependency installation, so installation cannot alter the original checkout's dependencies.
- Lighthouse was downloaded into the isolated `%TEMP%\nm-t03-lighthouse-cache`, outside the app. No global installation.
- One local webpack production build passed. Raw log: `local-build.log`; build ID `6AhGeMP8ZfIbPQzrsXuJe`. Compilation 29.4s, TypeScript 9.2s, 21 static pages generated. Original `.next` was preserved.

## Lighthouse — actual single runs

| Run | UTC start | P / A / BP / SEO | FCP | LCP | TBT | CLS | Root document server response | Transfer / JS transfer |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Production EN, mobile | 11:14:02 | 67 / 96 / 100 / 100 | 1.538s | 2.138s | 2596ms | 0.000187 | 373ms | 1,612,330 / 579,729 B |
| Production EN, desktop | 11:14:41 | 70 / 100 / 100 / 100 | 0.492s | 0.565s | 875ms | 0.008061 | 480ms | 1,335,755 / 581,918 B |
| Local FA, mobile | 11:19:52 | 54 / 96 / 100 / 92 | 1.966s | 4.212s | 3470ms | 0.001218 | 35ms | 1,585,510 / 587,151 B |

P = Performance; A = Accessibility; BP = Best Practices. Transfer is Lighthouse's captured navigation resource set, not an app-shell-only budget or a full-site asset total. JS transfer is the sum of network requests classified `Script`, including lazy modules fetched during this navigation; it does not establish the separate 170KB app-shell budget.

- Raw JSON and self-contained HTML reports: `production-mobile.report.*`, `production-desktop.report.*`, `local-fa-mobile.report.*`. Every run also has `*-cli.log`. `metrics-summary.json` retains exact settings, numbers, resource summaries and failed audits.
- Mobile profile: simulated throttling, 412×823, DPR 1.75, 150ms RTT, 1638.4Kbps throughput, 4× CPU slowdown. Desktop: simulated throttling, 1350×940, DPR 1, 40ms RTT, 10240Kbps, 1× CPU. This is emulation on the host, not a real phone.
- The first production mobile run overlapped the beginning of a separate Ciao browser capture. Preserve it as the first recorded baseline, with possible CPU/GPU contention; do not infer precise cross-device differences from these one-off samples. Later Lighthouse runs and browser audits were sequential, with root capture closed.
- Production mobile contrast failed on 3 nodes in the mobile experience reader. Desktop Lighthouse automatic a11y passed; that score is not a WCAG conformance claim.
- Local SEO 92 fails `canonical`: local pages intentionally retain production-domain canonical URLs. Do not report this as a production SEO regression.
- The local EN `/` run failed with `CHROME_INTERSTITIAL_ERROR`; all scores are **null**, not zero. Raw `local-mobile.report.*` and CLI log are retained. HTTP verification found repeatable `307 Location: /`, while `/fa` and `/de` return 200. `local-root-redirect.json` and `local-audit.json` retain evidence. Local root was not fixed within this read-only task. Local `/fa` was used to get a valid baseline; it is a different locale and network path, so it is not a like-for-like production comparison.
- CLI exit code 0 for the 3 valid reports; 1 for failed local root. All runs logged a temporary Chrome-directory cleanup `EPERM` after report generation; that did not invalidate the completed reports. No certificate or sandbox bypass was used.
- Server-response values above are the Lighthouse root document server response audit, not p75 field TTFB. Unthrottled browser Navigation Timing TTFB samples: production mobile 367.3ms; local FA desktop 29.6ms/mobile 28.4ms.

## SSR, metadata and accessibility quick audit

Raw public server HTML is retained for EN/FA/DE under `production-*-ssr.html`; local responses under `local-*-ssr.html`. Parsed headers and semantic facts are in `production-audit.json` / `local-audit.json`.

- Production EN/FA/DE: HTTP 200, correct `lang` (`en/fa/de`) and `dir` (`ltr/rtl/ltr`), correct locale canonicals, EN/FA/DE/x-default alternate links, Open Graph fields and one parseable `Person` JSON-LD block each. Decoded HTML body sizes: 268,406 / 289,973 / 272,800 bytes. These are decoded response sizes, not wire transfer sizes.
- Current production title remains Senior Frontend Engineer (localized in FA); JSON-LD jobTitle is Product Engineer. These are baseline facts for the later positioning review, not claims that the new identity has been implemented.
- Project/experience headings and 4 detailed-project links exist in server HTML. Each response initially contains 2 H1s: loader copy and the main hero headline. The main H1 is under an `aria-hidden="true"` ancestor while boot state is loading. Content presence therefore does not establish that initial content is usable before JS/loader release; a dedicated no-JS/screen-reader check remains to be done.
- Chrome rendered the existing hero with a real WebGL context, ANGLE/Intel UHD Graphics 630 Direct3D11, one canvas observed at the initial checkpoint. `production-*-initial.png` and `local-*-initial.png` are viewport screenshots after the ready-state observation.
- axe WCAG2A/AA, WCAG2.1A/AA, WCAG2.2AA quick scan: production mobile and local mobile each report `color-contrast` on 3 nodes, with 3 incomplete checks requiring human review. Local FA desktop reports 0 violations, 2 incomplete checks. Raw `*-axe.json` retained. Production desktop axe was not reached by the first browser flow; desktop Lighthouse a11y is the available automatic desktop result.
- No JS page exceptions were recorded in the four quick flows. Some Next RSC prefetches reported `net::ERR_ABORTED` during the programmatic scroll/close sequence (production desktop 1, production mobile 6, local mobile 1); these were not treated as successful requests or proved broken routes. Local desktop had no failed requests.
- Production desktop contact opened, but the harness pressed Escape immediately before dialog lifecycle settled; the later locale click was blocked by its overlay and timed out. Raw failure retained. The local harness was adjusted to wait two animation frames and for dialog closure; local desktop contact open/Escape and locale menu then passed. This does not prove an unfixed production Escape defect. No forms were submitted.

## Frame cadence and input proxy

| Site/profile | Ready-state observed at | Mean RAF callbacks/s | p95 frame interval | Intervals >50ms | Recorded Event Timing proxy |
| --- | --- | --- | --- | --- | --- |
| Production EN desktop | 4.158s | 44.54 | 50.1ms | 19 | Not collected after desktop interaction timeout |
| Production EN mobile emulation | 3.069s | 55.93 | 16.8ms | 4 | Max 72ms, 3 qualifying interaction IDs |
| Local FA desktop | 3.070s | 45.33 | 50.1ms | 17 | Max 264ms, 5 qualifying interaction IDs |
| Local FA mobile emulation | 2.596s | 55.43 | 16.8ms | 3 | Max 64ms, 3 qualifying interaction IDs |

Readiness timestamps are observations after the selector became ready, not instrumented exact transition timestamps. RAF sampling moves native scroll down/up across up to 2600px for 6 seconds; raw intervals and CDP performance snapshots are retained in each audit JSON. This measures main-thread scheduling during that sample, **not presented/composited GPU FPS**, sustained scrolling on a phone, or a profiler trace proving no dropped frames. Mobile emulation uses the same desktop Intel GPU.

Event Timing uses real Playwright browser input and a buffered `PerformanceObserver` with a 16ms duration threshold. These are short lab samples of contact/menu actions, **not INP p75, RUM, CrUX or field Core Web Vitals**. No qualifying record would mean no event above the observer threshold, not zero latency. The local desktop 264ms sample exceeds the aspirational 200ms input target, but is not itself a field INP result. Locale navigation, all carousel controls and FAQ do not have complete input samples in this baseline.

## Reproduce / continue without researching again

1. Read this file, then raw JSON only for the metric under investigation. Retain these baseline reports when comparing a later revision.
2. Local production build command already run once: `npm.cmd run build`; server command: `npm.cmd run start -- --hostname 127.0.0.1 --port 3100`. Next warned that `output: standalone` normally expects its standalone server; this session nevertheless served `/fa` and `/de`. Root path redirect is the local blocker to investigate before claiming complete EN preview parity. Do not rebuild unchanged source just to remeasure.
3. Lighthouse command used (desktop adds `--preset=desktop`; local valid run substitutes `http://127.0.0.1:3100/fa` and a separate output prefix):

```powershell
$env:CHROME_PATH = 'C:\Program Files\Google\Chrome\Application\chrome.exe'
npx.cmd --yes --cache "$env:TEMP\nm-t03-lighthouse-cache" lighthouse@13.5.0 https://nimamoradirad.com/ --output=json --output=html --output-path=docs/evidence/T03-2026-10-20/production-mobile --chrome-flags="--headless=new --no-first-run --no-default-browser-check" --max-wait-for-load=60000
```

After installation, subsequent runs called the equivalent cached `lighthouse/cli/index.js` directly with Node. No repeated production Lighthouse runs were made merely to seek a better score.

4. Repeatable audit helpers (use a new label/output directory to preserve baseline):

```powershell
node docs/evidence/T03-2026-10-20/baseline-audit.cjs https://nimamoradirad.com production
node docs/evidence/T03-2026-10-20/baseline-audit.cjs http://127.0.0.1:3100 local /fa
node docs/evidence/T03-2026-10-20/summarize-lighthouse.cjs
```

`baseline-audit.cjs` currently contains the dialog-paint wait added after the first production flow; the retained production raw file records the earlier immediate-Escape attempt. Its browser launch explicitly enables the Chromium sandbox; requests retain normal TLS validation. Browser profile contexts are fresh and isolated. Probe has a 180-second watchdog.

## Acceptance boundary and next exact action

T03 raw lab baseline and limitations are recorded: production mobile/desktop, one local production build and FA mobile report, SSR/metadata, payload, hardware WebGL frame-cadence sample, Event Timing proxy and automatic a11y quick audit. No performance target is marked satisfied by task completion.

Not run: field INP/CWV p75 or RUM, real mobile hardware, true presentation/GPU FPS trace, memory leak/heap trace, dedicated no-JS screen-reader/200% zoom audit, complete keyboard/locale/FAQ interaction suite, repeated statistical Lighthouse validation, cached-vs-uncached comparisons, and local EN preview success. Next metrics work should first resolve the local root redirect in a separately scoped implementation task; later milestone remeasurement should use the same locale, revision, device/network profile and uncontended host. The original application and production remain unchanged.
