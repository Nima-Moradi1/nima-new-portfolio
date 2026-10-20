/* eslint-disable @typescript-eslint/no-require-imports -- Standalone Node CommonJS evidence utility. */
// Read-only baseline. Uses the repository's already-installed Playwright/axe.
// node docs/evidence/T03-2026-10-20/baseline-audit.cjs https://nimamoradirad.com production
const fs = require('node:fs/promises');
const path = require('node:path');
const os = require('node:os');
const crypto = require('node:crypto');
const { chromium, devices, request } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;
const origin = process.argv[2] || 'https://nimamoradirad.com';
const label = process.argv[3] || 'production';
const flowPath = process.argv[4] || '/';
const out = __dirname;
const write = (name, data) => fs.writeFile(path.join(out, `${label}-${name}`), typeof data === 'string' ? data : JSON.stringify(data, null, 2));
const result = {
  generatedAtUtc: new Date().toISOString(), origin,
  environment: { platform: os.platform(), release: os.release(), cpu: os.cpus()[0]?.model, logicalCpus: os.cpus().length, node: process.version },
  method: 'Chrome headless, fresh contexts, no network/CPU throttling, real browser mouse/keyboard input. RAF cadence is a browser scheduling proxy, not GPU/presentation FPS or field INP.',
  ssr: [], flows: [], errors: [],
};

(async () => {
  const api = await request.newContext({ timeout: 20000 });
  const browser = await chromium.launch({ executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', headless: true, chromiumSandbox: true });
  const watchdog = setTimeout(async () => {
    result.errors.push({ step: 'watchdog', error: 'Audit exceeded 180 seconds; browser closed; incomplete evidence retained.' });
    await write('audit.json', result);
    await browser.close().catch(() => {});
    process.exitCode = 1;
  }, 180000);
  result.environment.browser = browser.version();
  const parser = await browser.newPage();
  for (const [locale, suffix] of [['en', '/'], ['fa', '/fa'], ['de', '/de']]) {
    try {
      const response = await api.get(`${origin}${suffix}`, { maxRedirects: 0 });
      const bytes = await response.body();
      const html = bytes.toString('utf8');
      await write(`${locale}-ssr.html`, html);
      const details = await parser.evaluate((html) => {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        return {
          lang: doc.documentElement.lang, dir: doc.documentElement.dir,
          title: doc.title,
          description: doc.querySelector('meta[name="description"]')?.content,
          canonical: doc.querySelector('link[rel="canonical"]')?.href,
          hreflang: [...doc.querySelectorAll('link[rel="alternate"][hreflang]')].map(a => ({ lang: a.hreflang, href: a.href })),
          openGraph: [...doc.querySelectorAll('meta[property^="og:"]')].map(m => ({ property: m.getAttribute('property'), content: m.content })),
          robots: doc.querySelector('meta[name="robots"]')?.content,
          headings: [...doc.querySelectorAll('h1,h2,h3')].map(h => ({ level: h.tagName, text: h.textContent.trim(), ariaHiddenAncestor: !!h.closest('[aria-hidden="true"]') })),
          sections: [...doc.querySelectorAll('main section')].map(s => ({ id: s.id, ariaLabelledBy: s.getAttribute('aria-labelledby') })),
          mainCount: doc.querySelectorAll('main').length,
          canvas: [...doc.querySelectorAll('canvas')].map(c => ({ ariaHidden: c.getAttribute('aria-hidden'), label: c.getAttribute('aria-label') })),
          jsonLd: [...doc.querySelectorAll('script[type="application/ld+json"]')].map(s => { try { return JSON.parse(s.textContent); } catch { return { parseError: true }; } }),
          projectLinks: [...doc.querySelectorAll('a[href*="/projects/"]')].map(a => ({ href: a.getAttribute('href'), text: a.textContent.trim() })),
          bodyTextLength: doc.body.textContent.length,
          bootState: doc.querySelector('[data-boot-state]')?.getAttribute('data-boot-state'),
          initialMainAriaHidden: !!doc.querySelector('main')?.closest('[aria-hidden="true"]'),
        };
      }, html);
      const headers = response.headers();
      delete headers['set-cookie'];
      result.ssr.push({ locale, requestedUrl: `${origin}${suffix}`, finalUrl: response.url(), status: response.status(), bytesDecoded: bytes.length, sha256: crypto.createHash('sha256').update(bytes).digest('hex'), headers, ...details });
    } catch (error) { result.errors.push({ step: `ssr-${locale}`, error: String(error) }); }
    await write('audit.json', result);
  }
  await parser.close();
  for (const profile of ['desktop', 'mobile']) {
    const settings = profile === 'mobile' ? { ...devices['Pixel 7'] } : { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 };
    const context = await browser.newContext(settings);
    await context.addInitScript(() => {
      window.__baseline = { events: [], longTasks: [], errors: [] };
      try { new PerformanceObserver(list => window.__baseline.events.push(...list.getEntries().map(e => ({ name: e.name, duration: e.duration, startTime: e.startTime, processingStart: e.processingStart, processingEnd: e.processingEnd, interactionId: e.interactionId })))).observe({ type: 'event', buffered: true, durationThreshold: 16 }); } catch (e) { window.__baseline.errors.push(String(e)); }
      try { new PerformanceObserver(list => window.__baseline.longTasks.push(...list.getEntries().map(e => ({ startTime: e.startTime, duration: e.duration })))).observe({ type: 'longtask', buffered: true }); } catch (e) { window.__baseline.errors.push(String(e)); }
    });
    const page = await context.newPage();
    page.setDefaultTimeout(10000);
    const flow = { profile, settings, consoleErrors: [], failedRequests: [], interactions: [] };
    page.on('pageerror', error => flow.consoleErrors.push(String(error)));
    page.on('requestfailed', req => flow.failedRequests.push({ url: req.url(), failure: req.failure() }));
    try {
      const response = await page.goto(`${origin}${flowPath}`, { waitUntil: 'domcontentloaded', timeout: 40000 });
      flow.status = response.status();
      flow.finalUrl = page.url();
      try { await page.locator('[data-boot-state="ready"]').waitFor({ timeout: 22000 }); flow.loaderReady = true; }
      catch (e) { flow.loaderReady = false; flow.loaderError = String(e); }
      flow.loaderMeasurement = await page.evaluate(() => ({ observedAtMs: performance.now(), bootState: document.querySelector('[data-boot-state]')?.dataset.bootState, heroReadiness: document.querySelector('[data-hero-readiness]')?.dataset.heroReadiness }));
      await page.screenshot({ path: path.join(out, `${label}-${profile}-initial.png`), fullPage: false });
      flow.dom = await page.evaluate(() => ({ title: document.title, lang: document.documentElement.lang, dir: document.documentElement.dir, viewport: { width: innerWidth, height: innerHeight, dpr: devicePixelRatio }, scrollHeight: document.documentElement.scrollHeight, scrollWidth: document.documentElement.scrollWidth, canvasCount: document.querySelectorAll('canvas').length, h1: [...document.querySelectorAll('h1')].map(h => h.textContent), buttons: [...document.querySelectorAll('header button')].map(b => ({ text: b.textContent.trim(), label: b.getAttribute('aria-label'), hasPopup: b.getAttribute('aria-haspopup') })) }));
      const cdp = await context.newCDPSession(page);
      flow.gpu = await page.evaluate(() => {
        const canvas = document.querySelector('canvas');
        if (!canvas) return { canvasPresent: false };
        const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
        if (!gl) return { canvasPresent: true, contextAvailable: false };
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        return { canvasPresent: true, contextAvailable: true, vendor: ext ? gl.getParameter(ext.UNMASKED_VENDOR_WEBGL) : gl.getParameter(gl.VENDOR), renderer: ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER), drawingBuffer: [gl.drawingBufferWidth, gl.drawingBufferHeight] };
      });
      await cdp.send('Performance.enable');
      flow.performanceBefore = await cdp.send('Performance.getMetrics');
      flow.rafCadence = await page.evaluate(async () => {
        const samples = [];
        const start = performance.now();
        let previous;
        await new Promise(resolve => {
          function tick(now) {
            if (previous !== undefined) samples.push(now - previous);
            previous = now;
            const elapsed = now - start;
            // Deterministic native scroll down for 3s, then reverse for 3s.
            const progress = elapsed < 3000 ? elapsed / 3000 : 1 - (elapsed - 3000) / 3000;
            window.scrollTo({ top: Math.max(0, progress) * Math.min(2600, document.documentElement.scrollHeight - innerHeight), behavior: 'instant' });
            if (elapsed < 6000) requestAnimationFrame(tick); else resolve();
          }
          requestAnimationFrame(tick);
        });
        const ordered = [...samples].sort((a,b) => a-b);
        return { durationMs: performance.now() - start, frames: samples.length, averageRafPerSecond: 1000 / (samples.reduce((a,b)=>a+b,0)/samples.length), intervalMedianMs: ordered[Math.floor(ordered.length*.5)], intervalP95Ms: ordered[Math.floor(ordered.length*.95)], intervalsOver50ms: samples.filter(n=>n>50).length, intervalsMs: samples };
      });
      flow.performanceAfter = await cdp.send('Performance.getMetrics');
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
      const contact = page.locator('header button').filter({ hasText: /contact|let.s talk|work together|تماس|ارتباط/i }).first();
      if (await contact.isVisible()) {
        const start = Date.now();
        await contact.click();
        await page.getByRole('dialog').waitFor({ timeout: 5000 });
        flow.interactions.push({ action: 'Open contact dialog by mouse/touch', automationCompletionMs: Date.now() - start, result: 'dialog visible; no form submitted' });
        await page.getByRole('dialog').evaluate(dialog => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve(dialog.contains(document.activeElement))))));
        await page.keyboard.press('Escape');
        try {
          await page.getByRole('dialog').waitFor({ state: 'hidden', timeout: 3000 });
          flow.interactions.push({ action: 'Escape after contact dialog painted', result: 'dialog closed' });
        } catch (error) {
          flow.interactions.push({ action: 'Escape after contact dialog painted', result: 'dialog remained visible', error: String(error) });
          const close = page.getByRole('dialog').getByRole('button', { name: /close|بستن|schlie/i }).first();
          if (await close.isVisible()) await close.click();
        }
      }
      const languages = page.locator('header button[aria-haspopup="menu"]').first();
      if (await languages.isVisible()) {
        try {
          await languages.click();
          flow.interactions.push({ action: 'Open locale menu; Escape', result: 'menu opened' });
          await page.keyboard.press('Escape');
        } catch (error) { flow.interactions.push({ action: 'Open locale menu', result: 'action failed', error: String(error) }); }
      }
      await page.keyboard.press('Tab');
      flow.keyboardFocus = await page.evaluate(() => ({ tag: document.activeElement?.tagName, text: document.activeElement?.textContent?.trim().slice(0, 120), label: document.activeElement?.getAttribute('aria-label') }));
      flow.axe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze();
      flow.browserEntries = await page.evaluate(() => ({ navigation: performance.getEntriesByType('navigation').map(e=>e.toJSON()), paints: performance.getEntriesByType('paint').map(e=>e.toJSON()), resources: performance.getEntriesByType('resource').map(e=>e.toJSON()), ...window.__baseline }));
      flow.inpProxy = { observedInteractionCount: new Set(flow.browserEntries.events.map(e=>e.interactionId).filter(Boolean)).size, maxRecordedEventDurationMs: Math.max(0,...flow.browserEntries.events.filter(e=>e.interactionId).map(e=>e.duration)), note: 'Event Timing >=16ms observer threshold; a short synthetic lab interaction sample is not field INP. 0 means no qualifying recorded event, not proven zero latency.' };
      await write(`${profile}-axe.json`, flow.axe);
      delete flow.axe;
    } catch (error) { flow.error = String(error); }
    result.flows.push(flow);
    await write('audit.json', result);
    await context.close();
  }
  await api.dispose();
  await browser.close();
  clearTimeout(watchdog);
  console.log(JSON.stringify({ label, ssr: result.ssr.map(s=>({locale:s.locale,status:s.status,title:s.title,lang:s.lang,dir:s.dir,initialMainAriaHidden:s.initialMainAriaHidden})), flows: result.flows.map(f=>({profile:f.profile,loaderReady:f.loaderReady,gpu:f.gpu,raf:f.rafCadence ? {fpsProxy:f.rafCadence.averageRafPerSecond,p95Ms:f.rafCadence.intervalP95Ms} : null,inpProxy:f.inpProxy,error:f.error})), errors:result.errors }, null, 2));
})().catch(async error => { result.errors.push({ step: 'fatal', error: String(error) }); await write('audit.json', result); console.error(error); process.exitCode=1; });
