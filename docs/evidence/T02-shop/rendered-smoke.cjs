/* eslint-disable @typescript-eslint/no-require-imports -- Standalone Node CommonJS evidence utility. */
// Read-only canonical smoke. Run only after other Chrome audits have released the browser slot.
const fs = require('node:fs');
const path = require('node:path');
const { performance } = require('node:perf_hooks');
const pwPath = path.resolve(__dirname, '../../../../nima-new-portfolio/node_modules/@playwright/test');
const { chromium } = require(pwPath);
const origin = 'https://3d-shop-design.ir';
const began = performance.now();
const report = {
  startedAt: new Date().toISOString(), target: origin,
  renderer: 'Installed Chrome, isolated headless context; no device emulation of GPU',
  playwrightVersion: require(path.join(pwPath, 'package.json')).version,
  viewport: { width: 1280, height: 900 },
  boundaries: ['No fresh generation action', 'All unsafe HTTP methods blocked', 'Provider domains blocked', 'No contact, checkout, uploads, source edits or deployment'],
  phases: [], console: [], pageErrors: [], failedRequests: [], httpErrors: [], blockedRequests: [],
};
let browser, context, page;
const stamp = () => ({ at: new Date().toISOString(), elapsedMs: Math.round(performance.now() - began) });
async function save(name) {
  const file = `${name}.png`;
  await page.screenshot({ path: path.join(__dirname, file), timeout: 8000 });
  report.screenshots ??= [];
  report.screenshots.push({ ...stamp(), name: file });
}
async function phase(name, operation) {
  const start = performance.now();
  const item = { name, ...stamp() };
  report.phases.push(item);
  try { item.result = await operation(); item.status = 'passed'; }
  catch (error) { item.status = 'failed'; item.error = String(error.stack || error); throw error; }
  finally { item.durationMs = Math.round(performance.now() - start); }
}
async function photoState() {
  return page.evaluate(() => {
    const canvas = document.querySelector('.vto-photo-frame.is-entering');
    const mirror = document.querySelector('.vto-mirror');
    let hash = null, nontransparent = 0;
    if (canvas?.width && canvas?.height) {
      const pixels = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height).data;
      hash = 2166136261;
      for (let i = 0; i < pixels.length; i += 16) {
        hash = Math.imul(hash ^ pixels[i], 16777619) >>> 0;
        nontransparent += Number(pixels[i + 3] > 0);
      }
    }
    return {
      product: document.querySelector('.vto-current-garment strong')?.textContent,
      counter: document.querySelector('.vto-current-garment bdi')?.textContent,
      busy: mirror?.getAttribute('aria-busy'),
      canvas: canvas ? { width: canvas.width, height: canvas.height, hash, nontransparentSamples: nontransparent } : null,
      selectedPants: [...document.querySelectorAll('.vto-palette button[aria-pressed="true"]')].map(node => node.getAttribute('aria-label')),
      documentWidth: document.documentElement.scrollWidth, viewportWidth: innerWidth,
    };
  });
}
async function waitPhoto() {
  await page.waitForSelector('.vto-mirror[aria-busy="false"] .vto-photo-frame.is-entering', { timeout: 18000 });
  await page.waitForFunction(() => {
    const node = document.querySelector('.vto-photo-frame.is-entering');
    return node?.width > 0 && node?.height > 0;
  }, { timeout: 10000 });
}
(async () => {
  const deadline = setTimeout(() => { report.deadlineReached = stamp(); void browser?.close(); }, 150000);
  try {
    browser = await chromium.launch({ channel: 'chrome', headless: true, timeout: 30000 });
    report.browserVersion = browser.version();
    context = await browser.newContext({ viewport: report.viewport, deviceScaleFactor: 1 });
    await context.route('**/*', async route => {
      const request = route.request();
      const isUnsafe = !['GET', 'HEAD', 'OPTIONS'].includes(request.method());
      const isProvider = /huggingface\.co|hf\.space|api\.openai\.com|replicate\.|fal\.ai|gradio\./i.test(request.url());
      if (isUnsafe || isProvider) {
        report.blockedRequests.push({ ...stamp(), method: request.method(), url: request.url(), reason: isUnsafe ? 'unsafe-method' : 'provider-domain' });
        await route.abort('blockedbyclient');
      } else await route.continue();
    });
    page = await context.newPage();
    page.setDefaultTimeout(12000);
    page.on('console', message => {
      if (['error', 'warning'].includes(message.type())) report.console.push({ ...stamp(), type: message.type(), text: message.text(), location: message.location() });
    });
    page.on('pageerror', error => report.pageErrors.push({ ...stamp(), message: error.message, stack: error.stack }));
    page.on('requestfailed', request => report.failedRequests.push({ ...stamp(), method: request.method(), url: request.url(), error: request.failure()?.errorText }));
    page.on('response', response => {
      if (response.status() >= 400) report.httpErrors.push({ ...stamp(), status: response.status(), url: response.url() });
    });
    await phase('canonical-scene-ready', async () => {
      const response = await page.goto(origin, { waitUntil: 'domcontentloaded', timeout: 30000 });
      await page.waitForSelector('.shop-experience[aria-busy="false"]', { timeout: 75000 });
      const result = await page.evaluate(() => {
        const canvas = document.querySelector('.boutique-surface canvas');
        const gl = canvas?.getContext('webgl2');
        const info = gl?.getExtension('WEBGL_debug_renderer_info');
        return {
          title: document.title, dir: document.querySelector('.shop-experience')?.getAttribute('dir'),
          loaderReady: document.querySelector('.boutique-loader')?.getAttribute('data-ready'),
          canvas: canvas ? { width: canvas.width, height: canvas.height } : null,
          gpu: info ? gl.getParameter(info.UNMASKED_RENDERER_WEBGL) : null,
          navigation: [...document.querySelectorAll('.keyboard-zones button')].map(node => node.textContent),
          timing: performance.getEntriesByType('navigation').map(entry => ({ domContentLoadedMs: entry.domContentLoadedEventEnd, loadMs: entry.loadEventEnd })),
        };
      });
      await save('01-desktop-overview');
      return { status: response.status(), ...result };
    });
    await phase('keyboard-rack-entry-and-browse', async () => {
      const rack = page.getByRole('navigation', { name: 'انتخاب بخش بوتیک' }).getByRole('button', { name: 'رگال پیراهن', exact: true });
      await rack.focus();
      await page.keyboard.press('Enter');
      const open = page.getByRole('button', { name: 'نمایش محصول', exact: true });
      await open.waitFor({ state: 'visible' });
      await page.waitForFunction(() => !document.querySelector('.product-caption .text-button')?.disabled);
      const before = await page.locator('.product-caption>span').innerText();
      const arrow = page.locator('.browse-arrow:not(:disabled)').first();
      await arrow.click();
      await page.waitForFunction(previous => document.querySelector('.product-caption>span')?.textContent !== previous, before);
      await page.waitForFunction(() => !document.querySelector('.product-caption .text-button')?.disabled);
      const after = await page.locator('.product-caption>span').innerText();
      await save('02-desktop-rack-browse');
      return { before, after, index: await page.locator('.product-index').innerText() };
    });
    await phase('product-information-and-gallery', async () => {
      await page.getByRole('button', { name: 'نمایش محصول', exact: true }).click();
      await page.locator('.desktop-product-info h1').waitFor();
      const thumbnails = page.locator('.desktop-source-gallery .gallery-thumbnails button');
      const count = await thumbnails.count();
      const selection = Math.min(1, count - 1);
      if (selection >= 0) {
        await thumbnails.nth(selection).click();
        await thumbnails.nth(selection).getAttribute('aria-pressed').then(value => { if (value !== 'true') throw new Error('Gallery selection did not commit'); });
      }
      await page.waitForFunction(() => !document.querySelector('#vto-product-desktop')?.disabled);
      const result = {
        product: await page.locator('.desktop-product-info h1').innerText(),
        galleryCount: count, selectedGallery: selection,
        galleryLabel: selection >= 0 ? await thumbnails.nth(selection).getAttribute('aria-label') : null,
        canonicalLink: await page.locator('.desktop-product-info .source-link').getAttribute('href'),
        freshness: await page.locator('.desktop-product-info .freshness').innerText(),
      };
      await save('03-desktop-product-info-gallery');
      return result;
    });
    await phase('prepared-fitting-room-and-pants-color', async () => {
      await page.locator('#vto-product-desktop').click();
      await page.locator('.vto-dialog[open]').waitFor();
      await waitPhoto();
      const before = await photoState();
      report.preparedPhotoCheckpoints = { before };
      await page.locator('.vto-palette').getByRole('button', { name: 'کرم', exact: true }).click();
      await page.waitForFunction(previousHash => {
        const canvas = document.querySelector('.vto-photo-frame.is-entering');
        if (!canvas?.width) return false;
        const pixels = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height).data;
        let hash = 2166136261;
        for (let i = 0; i < pixels.length; i += 16) hash = Math.imul(hash ^ pixels[i], 16777619) >>> 0;
        return hash !== previousHash;
      }, before.canvas.hash);
      const cream = await photoState();
      report.preparedPhotoCheckpoints.cream = cream;
      await page.getByRole('button', { name: 'لباس بعدی', exact: true }).click();
      await page.waitForFunction(previous => document.querySelector('.vto-current-garment bdi')?.textContent !== previous, before.counter);
      await waitPhoto();
      const next = await photoState();
      report.preparedPhotoCheckpoints.next = next;
      if (!next.selectedPants.includes('کرم')) throw new Error('Pants color did not persist across prepared apparel change');
      await save('04-desktop-prepared-fitting-room');
      return { before, cream, next, generationButtonVisible: await page.locator('.vto-generate').isVisible() };
    });
    await phase('mobile-fitting-room-and-return', async () => {
      await page.setViewportSize({ width: 390, height: 844 });
      await waitPhoto();
      const mobile = await photoState();
      await save('05-mobile-prepared-fitting-room');
      await page.getByRole('button', { name: 'بستن پرو مجازی و بازگشت به فروشگاه', exact: true }).click();
      await page.locator('.vto-dialog[open]').waitFor({ state: 'detached' });
      await page.waitForFunction(() => !document.querySelector('.shop-experience')?.inert);
      await save('06-mobile-product-return');
      return { mobile, returnedProduct: await page.locator('.product-caption>span').innerText(), productInfoButtonVisible: await page.getByRole('button', { name: 'اطلاعات محصول', exact: false }).isVisible() };
    });
    report.status = 'completed';
  } catch (error) {
    report.status = 'partial'; report.error = String(error.stack || error);
    if (page && !page.isClosed()) await save('failure-state').catch(failure => { report.failureScreenshotError = String(failure); });
  } finally {
    clearTimeout(deadline);
    report.finishedAt = new Date().toISOString();
    report.durationMs = Math.round(performance.now() - began);
    await browser?.close().catch(() => {});
    fs.writeFileSync(path.join(__dirname, 'rendered-smoke.json'), JSON.stringify(report, null, 2) + '\n');
    process.stdout.write(JSON.stringify({ status: report.status, durationMs: report.durationMs, phases: report.phases.map(({name,status,durationMs}) => ({name,status,durationMs})), errors: {page:report.pageErrors.length,console:report.console.length,failedRequests:report.failedRequests.length,http:report.httpErrors.length,blocked:report.blockedRequests.length}, report: path.join(__dirname, 'rendered-smoke.json') }) + '\n');
    if (report.status !== 'completed') process.exitCode = 1;
  }
})();
