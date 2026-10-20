/* eslint-disable @typescript-eslint/no-require-imports -- Standalone Node CommonJS evidence utility. */
/* Internal, read-only reference QA. No source/model extraction or app asset reuse. */
const { chromium } = require('../../../nima-new-portfolio/node_modules/@playwright/test');
const fs = require('node:fs/promises');
const path = require('node:path');

const outputFlag = process.argv.indexOf('--output');
const root = outputFlag >= 0 ? path.resolve(process.argv[outputFlag + 1]) : path.resolve(__dirname, '../reference-captures/2026-10-20');
const probe = process.argv.includes('--probe');
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const checkpoints = [0, .025, .05, .10, .15, .20, .30, .40, .50, .60, .70, .80, .90, 1];

async function run() {
  await fs.mkdir(root, { recursive: true });
  const browser = await chromium.launch({ channel: 'chrome', headless: true, timeout: 20000 });
  const environment = { utc: new Date().toISOString(), browser: browser.version(), headless: true, probe, profiles: [] };
  try {
    for (const profile of (probe ? ['desktop'] : ['desktop', 'mobile'])) {
      const viewport = profile === 'desktop' ? { width: 1440, height: 900 } : { width: 390, height: 844 };
      const dir = path.join(root, profile);
      await fs.mkdir(dir, { recursive: true });
      const context = await browser.newContext({ viewport, deviceScaleFactor: 1, isMobile: profile === 'mobile', hasTouch: profile === 'mobile', recordVideo: probe ? undefined : { dir, size: viewport } });
      const page = await context.newPage();
      page.setDefaultTimeout(12000);
      page.setDefaultNavigationTimeout(30000);
      const started = Date.now();
      const log = { profile, viewport, dpr: 1, startedUtc: new Date(started).toISOString(), errors: [], checkpoints: [] };
      const eventFile = path.join(dir, probe ? 'probe-events.jsonl' : 'events.jsonl');
      const event = value => fs.appendFile(eventFile, JSON.stringify({ utc: new Date().toISOString(), elapsedMs: Date.now() - started, ...value }) + '\n').catch(() => {});
      await event({ phase: 'start', browser: browser.version() });
      page.on('requestfailed', request => event({ phase: 'requestfailed', url: request.url().split('?')[0], error: request.failure()?.errorText }));
      page.on('console', message => { if (message.type() === 'error' || message.type() === 'warning') event({ phase: 'console', type: message.type(), text: message.text().slice(0, 600) }); });
      page.on('pageerror', error => log.errors.push(String(error)));
      page.on('requestfailed', request => log.errors.push({ url: request.url().split('?')[0], error: request.failure()?.errorText }));
      await page.addInitScript(() => {
        window.__captureFrames = [];
        let last = 0;
        function sample(t) {
          if (t - last >= 30) {
            window.__captureFrames.push({ t, y: scrollY, h: document.documentElement.scrollHeight, viewportH: innerHeight });
            last = t;
          }
          requestAnimationFrame(sample);
        }
        requestAnimationFrame(sample);
      });
      try {
        const response = await page.goto('https://www.ciaoenergy.com/', { waitUntil: 'domcontentloaded', timeout: 30000 });
        log.status = response.status();
        await event({ phase: 'domcontentloaded', status: log.status });
        await page.screenshot({ path: path.join(dir, 'first-dom.png'), timeout: 12000 });
        await page.waitForLoadState('load', { timeout: 15000 }).catch(error => log.errors.push('load: ' + error.message));
        await sleep(probe ? 8000 : 12000);
        await event({ phase: 'post-load-wait' });
        async function capture(label, requestedProgress) {
          const data = await page.evaluate(() => {
            const box = element => {
              const r = element.getBoundingClientRect();
              const s = getComputedStyle(element);
              let effectiveOpacity = 1;
              let visibleAncestors = true;
              for (let node = element; node; node = node.parentElement) {
                const style = getComputedStyle(node);
                effectiveOpacity *= Number(style.opacity);
                if (style.display === 'none' || style.visibility === 'hidden') visibleAncestors = false;
              }
              return { tag: element.tagName, class: String(element.className).slice(0, 160), x: r.x, y: r.y, width: r.width, height: r.height, opacity: s.opacity, effectiveOpacity, visibleAncestors, display: s.display, position: s.position, zIndex: s.zIndex, transform: s.transform, clipPath: s.clipPath, text: (element.textContent || '').trim().slice(0, 180) };
            };
            return {
              t: performance.now(), scrollY, scrollHeight: document.documentElement.scrollHeight, innerHeight, innerWidth, dpr: devicePixelRatio,
              overflow: { html: getComputedStyle(document.documentElement).overflowY, body: getComputedStyle(document.body).overflowY },
              canvas: [...document.querySelectorAll('canvas')].map(c => ({ ...box(c), bufferWidth: c.width, bufferHeight: c.height })),
              overlays: [...document.querySelectorAll('h1,h2,h3,a,button,[role=button],details,summary')].map(box).filter(x => x.width && x.height && x.y < innerHeight && x.y + x.height > 0),
              sections: [...document.querySelectorAll('section')].map(box),
              webgl: (() => { const c = document.querySelector('canvas'); if (!c) return null; const gl = c.getContext('webgl2') || c.getContext('webgl'); if (!gl) return null; const ext = gl.getExtension('WEBGL_debug_renderer_info'); return { renderer: ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER), version: gl.getParameter(gl.VERSION) }; })(),
              textExcerpt: document.body.innerText.slice(0, 1200)
            };
          });
          const png = `${label}.png`;
          await page.screenshot({ path: path.join(dir, png), timeout: 12000 });
          log.checkpoints.push({ label, png, requestedProgress, elapsedMs: Date.now() - started, capturedUtc: new Date().toISOString(), ...data, actualProgress: data.scrollY / Math.max(1, data.scrollHeight - data.innerHeight) });
          await fs.writeFile(path.join(dir, probe ? 'probe.json' : 'measurements.json'), JSON.stringify(log, null, 2));
          await event({ phase: 'checkpoint', label, actualProgress: log.checkpoints.at(-1).actualProgress });
        }
        await capture('settled-hero', 0);
        if (!probe) {
          for (const p of checkpoints) {
            await page.evaluate(p => window.scrollTo(0, p * (document.documentElement.scrollHeight - innerHeight)), p);
            await sleep(1000);
            await capture(`forward-${String(p).replace('.', '_')}`, p);
          }
          for (const p of [1, .8, .6, .4, .2, 0]) {
            await page.evaluate(p => window.scrollTo(0, p * (document.documentElement.scrollHeight - innerHeight)), p);
            await sleep(700);
            await capture(`reverse-${String(p).replace('.', '_')}`, p);
          }
          await page.mouse.move(viewport.width / 2, viewport.height / 2);
          for (const delta of [120, 600, -300]) { await page.mouse.wheel(0, delta); await sleep(900); await capture(`wheel-${delta}`, null); }
          await page.keyboard.press('End'); await sleep(900); await capture('keyboard-end', null);
          await page.keyboard.press('Home'); await sleep(900); await capture('keyboard-home', null);
          await page.emulateMedia({ reducedMotion: 'reduce' }); await sleep(800); await capture('reduced-motion', null);
          await page.emulateMedia({ reducedMotion: 'no-preference' });
          const question = page.getByText("Qu'est-ce qui distingue Ciao Energy des autres boissons énergisantes ?", { exact: true }).first();
          if (await question.count()) {
            await question.scrollIntoViewIfNeeded(); await sleep(800); await capture('faq-before', null);
            await question.click(); await sleep(120); await capture('faq-opening', null);
            await sleep(500); await capture('faq-open', null);
            await question.click(); await sleep(600); await capture('faq-closed', null);
          }
          const menu = page.getByText('MENU', { exact: true }).first();
          if (await menu.count()) {
            await menu.click(); await sleep(800); await capture('menu-open', null);
            await page.keyboard.press('Escape'); await sleep(600); await capture('menu-after-escape', null);
          }
          await page.setViewportSize(profile === 'mobile' ? { width: 844, height: 390 } : { width: 1024, height: 768 });
          await sleep(1000); await capture('resized', null);
        }
        log.frames = await page.evaluate(() => window.__captureFrames);
      } catch (error) { log.errors.push(error.stack); }
      await fs.writeFile(path.join(dir, probe ? 'probe.json' : 'measurements.json'), JSON.stringify(log, null, 2));
      const videoPath = page.video() ? await page.video().path() : null;
      await context.close();
      environment.profiles.push({ profile, path: dir, checkpoints: log.checkpoints.length, status: log.status, errors: log.errors.length, videoPath });
      console.log(JSON.stringify(environment.profiles.at(-1)));
    }
  } finally { await browser.close(); await fs.writeFile(path.join(root, probe ? 'probe-environment.json' : 'environment.json'), JSON.stringify(environment, null, 2)); }
}
run().catch(error => { console.error(error); process.exitCode = 1; });
