import { expect, test, type Page } from "@playwright/test";

type LocaleCase = {
  locale: "en" | "fa" | "de";
  direction: "ltr" | "rtl";
  homePath: string;
  xoPath: string;
  manifestPath: string;
  manifestScope: string;
  manifestName: string;
  heroLine1: string;
  heroLine2: string;
  headerRole: string;
  formName: string;
  xoTitle: string;
  xoBack: string;
};

const localeCases: LocaleCase[] = [
  {
    locale: "en",
    direction: "ltr",
    homePath: "/",
    xoPath: "/projects/xo-arena",
    manifestPath: "/manifest.webmanifest",
    manifestScope: "/",
    manifestName: "Signal Atelier Portfolio",
    heroLine1: "I build for scalability,",
    heroLine2: "performance, and creativity.",
    headerRole: "Product engineering · Web + Mobile",
    formName: "Your name",
    xoTitle: "Real-time play, engineered end to end.",
    xoBack: "Back to selected work",
  },
  {
    locale: "fa",
    direction: "rtl",
    homePath: "/fa",
    xoPath: "/fa/projects/xo-arena",
    manifestPath: "/fa/manifest.webmanifest",
    manifestScope: "/",
    manifestName: "نمونه‌کار Signal Atelier",
    heroLine1: "محصولاتی مقیاس‌پذیر،",
    heroLine2: "پربازده و خلاق می‌سازم.",
    headerRole: "مهندسی محصول · وب + موبایل",
    formName: "نام شما",
    xoTitle: "بازی بلادرنگ، مهندسی‌شده از ابتدا تا انتها.",
    xoBack: "بازگشت به پروژه‌های برگزیده",
  },
  {
    locale: "de",
    direction: "ltr",
    homePath: "/de",
    xoPath: "/de/projects/xo-arena",
    manifestPath: "/de/manifest.webmanifest",
    manifestScope: "/",
    manifestName: "Signal Atelier Portfolio",
    heroLine1: "Ich entwickle mit Fokus auf Skalierbarkeit,",
    heroLine2: "Performance und Kreativität.",
    headerRole: "Produktentwicklung · Web + Mobile",
    formName: "Ihr Name",
    xoTitle: "Echtzeitspiel – von Anfang bis Ende konsequent entwickelt.",
    xoBack: "Zurück zu den ausgewählten Projekten",
  },
];

function normalizedPath(pathname: string) {
  return pathname === "/" ? pathname : pathname.replace(/\/$/, "");
}

async function waitForLanding(page: Page) {
  await expect(page.locator(".landing-preloader")).toHaveCount(0, {
    timeout: 12_000,
  });
}

async function expectNoHorizontalOverflow(page: Page) {
  await expect
    .poll(() =>
      page.evaluate(() => {
        const root = document.documentElement;
        return root.scrollWidth - root.clientWidth;
      }),
    )
    .toBeLessThanOrEqual(1);
}

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
});

for (const localeCase of localeCases) {
  test(`${localeCase.locale} localizes home, XO, and manifest`, async ({
    page,
    request,
  }) => {
    await page.goto(localeCase.homePath);
    await waitForLanding(page);

    await expect(page.locator("html")).toHaveAttribute(
      "lang",
      localeCase.locale,
    );
    await expect(page.locator("html")).toHaveAttribute(
      "dir",
      localeCase.direction,
    );

    const hero = page.locator("#hero-title");
    await expect(hero).toContainText(localeCase.heroLine1);
    await expect(hero.locator("span")).toHaveText(localeCase.heroLine2);
    await expect(page.locator(".site-header__identity small")).toHaveText(
      localeCase.headerRole,
    );
    await expect(
      page.getByLabel(localeCase.formName, { exact: true }),
    ).toBeAttached();
    await expectNoHorizontalOverflow(page);

    const openGraphImage = await page
      .locator('meta[property="og:image"]')
      .getAttribute("content");
    expect(openGraphImage).not.toBeNull();
    const openGraphUrl = new URL(openGraphImage ?? "", page.url());
    const openGraphResponse = await request.get(
      `${openGraphUrl.pathname}${openGraphUrl.search}`,
    );
    expect(openGraphResponse.ok()).toBe(true);
    expect(openGraphResponse.headers()["content-type"]).toContain("image/png");

    const manifestResponse = await request.get(localeCase.manifestPath);
    expect(manifestResponse.ok()).toBe(true);
    expect(manifestResponse.headers()["content-type"]).toContain(
      "application/manifest+json",
    );
    const manifest = (await manifestResponse.json()) as {
      id: string;
      name: string;
      start_url: string;
      scope: string;
      lang: string;
      dir: string;
    };
    expect(manifest).toMatchObject({
      id: "/",
      name: localeCase.manifestName,
      start_url: localeCase.homePath,
      scope: localeCase.manifestScope,
      lang: localeCase.locale,
      dir: localeCase.direction,
    });

    await page.goto(localeCase.xoPath);
    await expect(
      page.getByRole("heading", { name: localeCase.xoTitle, exact: true }),
    ).toBeVisible();
    await expect(page.locator("html")).toHaveAttribute(
      "lang",
      localeCase.locale,
    );
    await expect(page.locator("html")).toHaveAttribute(
      "dir",
      localeCase.direction,
    );

    const returnLink = page.getByRole("link", {
      name: localeCase.xoBack,
      exact: true,
    });
    const returnHref = await returnLink.getAttribute("href");
    expect(returnHref).not.toBeNull();
    const returnUrl = new URL(returnHref ?? "", page.url());
    expect(normalizedPath(returnUrl.pathname)).toBe(localeCase.homePath);
    expect(returnUrl.hash).toBe("#work");

    await returnLink.click();
    await expect
      .poll(() => {
        const current = new URL(page.url());
        return {
          pathname: normalizedPath(current.pathname),
          hash: current.hash,
        };
      })
      .toEqual({ pathname: localeCase.homePath, hash: "#work" });
    await expect(page.locator("#work")).toBeInViewport();
    await expectNoHorizontalOverflow(page);
  });
}

test("locale switcher preserves the current section hash", async ({ page }) => {
  await page.goto("/?ref=i18n-test#contact");
  await waitForLanding(page);

  const persianLink = page.locator('.locale-switcher a[hreflang="fa"]');
  await expect(persianLink).toHaveAttribute(
    "href",
    /\/fa\/?\?ref=i18n-test#contact$/,
  );
  await persianLink.click();
  await expect
    .poll(() => {
      const current = new URL(page.url());
      return {
        pathname: normalizedPath(current.pathname),
        search: current.search,
        hash: current.hash,
      };
    })
    .toEqual({
      pathname: "/fa",
      search: "?ref=i18n-test",
      hash: "#contact",
    });
  await expect(page.locator("html")).toHaveAttribute("lang", "fa");
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");

  const germanLink = page.locator('.locale-switcher a[hreflang="de"]');
  await expect(germanLink).toHaveAttribute(
    "href",
    /\/de\/?\?ref=i18n-test#contact$/,
  );
  await germanLink.click();
  await expect
    .poll(() => {
      const current = new URL(page.url());
      return {
        pathname: normalizedPath(current.pathname),
        search: current.search,
        hash: current.hash,
      };
    })
    .toEqual({
      pathname: "/de",
      search: "?ref=i18n-test",
      hash: "#contact",
    });
  await expect(page.locator("html")).toHaveAttribute("lang", "de");
  await expect(page.locator("html")).toHaveAttribute("dir", "ltr");
});

test("desktop hero mirrors copy and workstation order for Persian", async ({
  page,
}, testInfo) => {
  test.skip(
    testInfo.project.name !== "chromium",
    "Horizontal hero order is a desktop-layout assertion.",
  );
  await page.setViewportSize({ width: 1440, height: 900 });

  async function readCenters(pathname: string) {
    await page.goto(pathname);
    await waitForLanding(page);
    const [copy, workstation] = await Promise.all([
      page.locator(".hero__copy").boundingBox(),
      page.locator(".hero__workstation").boundingBox(),
    ]);
    if (!copy || !workstation) {
      throw new Error(`Hero geometry was unavailable for ${pathname}`);
    }
    return {
      copy: copy.x + copy.width / 2,
      workstation: workstation.x + workstation.width / 2,
    };
  }

  const english = await readCenters("/");
  const persian = await readCenters("/fa");

  expect(english.copy).toBeLessThan(english.workstation);
  expect(persian.copy).toBeGreaterThan(persian.workstation);
});

test("hero copy stays inside the viewport at the desktop breakpoint", async ({
  page,
}, testInfo) => {
  test.skip(
    testInfo.project.name !== "chromium",
    "This regression targets the desktop breakpoint transition.",
  );
  await page.setViewportSize({ width: 1024, height: 900 });

  for (const pathname of ["/", "/fa", "/de"]) {
    await page.goto(pathname);
    await waitForLanding(page);
    const copy = await page.locator(".hero__copy").boundingBox();
    expect(
      copy,
      `Hero geometry was unavailable for ${pathname}`,
    ).not.toBeNull();
    if (!copy) continue;
    expect(copy.x, `${pathname} clips at inline-start`).toBeGreaterThanOrEqual(
      0,
    );
    expect(
      copy.x + copy.width,
      `${pathname} clips at inline-end`,
    ).toBeLessThanOrEqual(1024);
  }
});

test("Persian display typography stays thirty percent smaller across breakpoints", async ({
  page,
}, testInfo) => {
  test.skip(
    testInfo.project.name !== "chromium",
    "Computed display geometry is covered once in Chromium.",
  );

  const selectors = [
    ".hero h1",
    ".section-heading__copy h2",
    ".project-card h3",
    ".capability-timeline__copy h3",
    ".contact__heading h2",
  ] as const;

  async function readFontSizes(pathname: string) {
    // Keep each locale measurement independent. Visiting a prefixed locale sets
    // NEXT_LOCALE, which would otherwise make the next unprefixed `/` request
    // resolve to that locale and compare Persian against itself.
    await page.context().clearCookies();
    await page.goto(pathname);
    await waitForLanding(page);
    return Promise.all(
      selectors.map((selector) =>
        page
          .locator(selector)
          .first()
          .evaluate((element) =>
            Number.parseFloat(getComputedStyle(element).fontSize),
          ),
      ),
    );
  }

  for (const viewport of [
    { width: 1440, height: 900 },
    { width: 768, height: 900 },
    { width: 390, height: 844 },
  ]) {
    await page.setViewportSize(viewport);
    const english = await readFontSizes("/");
    const persian = await readFontSizes("/fa");

    selectors.forEach((selector, index) => {
      const ratio = persian[index] / english[index];
      expect(
        ratio,
        `${selector} at ${viewport.width}px should use the Persian display scale`,
      ).toBeGreaterThanOrEqual(0.68);
      expect(
        ratio,
        `${selector} at ${viewport.width}px should use the Persian display scale`,
      ).toBeLessThanOrEqual(0.72);
    });
  }
});

test("section depth transitions do not create inline drift in LTR or RTL", async ({
  page,
}, testInfo) => {
  test.skip(
    testInfo.project.name !== "chromium",
    "Transition geometry is covered once in Chromium.",
  );
  await page.emulateMedia({ reducedMotion: "no-preference" });

  for (const viewport of [
    { width: 1440, height: 900 },
    { width: 390, height: 844 },
  ]) {
    await page.setViewportSize(viewport);

    for (const pathname of ["/", "/fa"]) {
      await page.goto(pathname);
      await waitForLanding(page);
      const about = page.locator("#about");
      const aboutTop = await about.evaluate(
        (section) => section.getBoundingClientRect().top + window.scrollY,
      );
      await page.evaluate(
        ({ top, height }) => window.scrollTo(0, top - height * 0.72),
        { top: aboutTop, height: viewport.height },
      );
      await expect(about).toHaveAttribute("data-depth-phase", "entering");
      await expectNoHorizontalOverflow(page);

      const plane = await about.locator("[data-depth-plane]").boundingBox();
      expect(plane, `Missing depth plane for ${pathname}`).not.toBeNull();
      if (!plane) continue;
      expect(plane.x).toBeGreaterThanOrEqual(-1);
      expect(plane.x + plane.width).toBeLessThanOrEqual(viewport.width + 1);
    }
  }
});

test("desktop experience chapters stay inside the rendered book paper", async ({
  page,
}, testInfo) => {
  test.skip(
    testInfo.project.name !== "chromium",
    "Desktop book geometry is covered once in Chromium.",
  );
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: "no-preference" });

  for (const pathname of ["/", "/fa", "/de"]) {
    await page.goto(pathname);
    await waitForLanding(page);
    await page.evaluate(() => {
      document.documentElement.style.scrollBehavior = "auto";
    });

    const book = page.locator(".experience-book");
    test.skip(
      (await book.count()) === 0,
      "WebGL is unavailable in this browser runtime.",
    );
    const experienceRoles = await book.locator(".sr-only h3").allTextContents();

    for (const [index, role] of experienceRoles.entries()) {
      await book.evaluate(
        (element, { pageIndex, pageCount }) => {
          const bookElement = element as HTMLElement;
          const top = bookElement.getBoundingClientRect().top + window.scrollY;
          const travel = Math.max(
            bookElement.offsetHeight - window.innerHeight,
            0,
          );
          window.scrollTo({
            top: top + travel * (pageIndex / Math.max(pageCount - 1, 1)),
            behavior: "auto",
          });
        },
        { pageIndex: index, pageCount: experienceRoles.length },
      );

      const activeRole = page.locator(".experience-book__page-copy h3");
      await expect(activeRole).toHaveText(role);

      const geometry = await page.evaluate(() => {
        const paper = document.querySelector<HTMLElement>(
          ".experience-book__page-copy",
        );
        if (!paper) return null;
        const bounds = paper.getBoundingClientRect();
        const pages = Array.from(
          paper.querySelectorAll<HTMLElement>(".experience-book__page"),
        );

        return {
          paper: {
            left: bounds.left,
            right: bounds.right,
            top: bounds.top,
            bottom: bounds.bottom,
          },
          pageOverflow: pages.map((bookPage) => ({
            inline: bookPage.scrollWidth - bookPage.clientWidth,
            block: bookPage.scrollHeight - bookPage.clientHeight,
          })),
          documentOverflow:
            document.documentElement.scrollWidth -
            document.documentElement.clientWidth,
        };
      });

      expect(geometry).not.toBeNull();
      if (!geometry) continue;
      expect(geometry.paper.left).toBeGreaterThanOrEqual(-1);
      expect(geometry.paper.right).toBeLessThanOrEqual(1441);
      expect(geometry.paper.top).toBeGreaterThanOrEqual(-1);
      expect(geometry.paper.bottom).toBeLessThanOrEqual(901);
      expect(geometry.documentOverflow).toBeLessThanOrEqual(1);
      for (const overflow of geometry.pageOverflow) {
        expect(overflow.inline).toBeLessThanOrEqual(1);
        expect(overflow.block).toBeLessThanOrEqual(1);
      }
    }
  }
});

test("Persian capability cards follow an RTL drag gesture", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/fa#capabilities");
  await waitForLanding(page);

  const timeline = page.locator(".capability-timeline");
  const stage = page.locator(".capability-timeline__stage");
  const viewport = page.locator(".capability-timeline__viewport");
  await timeline.evaluate((element) => {
    window.scrollTo(
      0,
      element.getBoundingClientRect().top + window.scrollY - 80,
    );
  });
  await expect(stage).toHaveAttribute("data-horizontal-drag-ready", "true");
  await viewport.evaluate((element) => element.scrollTo({ left: 0 }));

  const card = page.locator(".capability-timeline__card").first();
  const bounds = await card.boundingBox();
  expect(bounds).not.toBeNull();
  if (!bounds) return;

  const startX = bounds.x + bounds.width * 0.28;
  const startY = bounds.y + bounds.height * 0.5;
  await page.mouse.move(startX, startY);
  await page.mouse.down();
  await page.mouse.move(startX + 120, startY + 2, { steps: 8 });
  await expect(stage).toHaveAttribute("data-horizontal-drag-state", "dragging");
  await expect
    .poll(() => viewport.evaluate((element) => element.scrollLeft))
    .toBeLessThan(-60);
  await page.mouse.up();
});
