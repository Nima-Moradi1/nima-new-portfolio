import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("shows useful content immediately, with all roles and direct contact", async ({
  page,
}) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { level: 1, name: "Senior Frontend Engineer" }),
  ).toBeVisible();
  await expect(page.locator(".landing-preloader")).toHaveCount(0);
  await expect(page.locator("canvas")).toHaveCount(0);
  await expect(page.locator("#experience article")).toHaveCount(4);
  for (const role of await page.locator("#experience article").all())
    await expect(role).toBeVisible();
  const titles = await page.locator("#work h3").allTextContents();
  expect(titles.slice(0, 3)).toEqual(["Hesabo", "XO Arena", "3D Online Shop"]);
  await page.getByRole("link", { name: "View work", exact: true }).click();
  await expect(page).toHaveURL(/#work$/);
  await expect(
    page.locator("#contact a[href='mailto:nimamoradirad@gmail.com']"),
  ).toBeVisible();
  await expect(page.locator("#contact a[download]")).toHaveAttribute(
    "href",
    "/nima-moradirad-resume.pdf",
  );
});

test("supports menu navigation and independent persistent theme selection", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Switch to light theme" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.getByRole("button", { name: "Menu", exact: true }).click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await dialog.getByRole("link", { name: "Contact", exact: true }).click();
  await expect(dialog).toBeHidden();
  await expect(page).toHaveURL(/#contact$/);
});

test("preserves case study routes, real media, and status-specific links", async ({
  page,
}) => {
  for (const slug of [
    "hesabo",
    "xo-arena",
    "3d-online-shop",
    "emerald-case",
    "moradi-gallery",
    "tarabari-nima",
  ]) {
    const response = await page.goto(`/projects/${slug}`);
    expect(response?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  }
  await page.goto("/projects/hesabo");
  await expect(
    page.getByRole("link", { name: "Company website" }),
  ).toHaveAttribute("href", "https://hesabo.com/");
  await page.goto("/projects/3d-online-shop");
  await expect(
    page.getByRole("link", { name: "Live demo", exact: true }),
  ).toHaveAttribute("href", "https://3d-shop-design.ir/");
  await page.goto("/projects/xo-arena");
  await expect(page.locator("video")).toHaveAttribute("preload", "none");
  expect(await page.locator("video").getAttribute("autoplay")).toBeNull();
  await expect(
    page.getByRole("link", { name: "Source code", exact: true }),
  ).toHaveAttribute("href", "https://github.com/Nima-Moradi1/xo-arena");
});

test("keeps a readable static page when optional scripts are unavailable", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.locator("#work h3")).toHaveCount(7);
  await expect(page.locator("#experience article")).toHaveCount(4);
  await expect(page.locator("#contact a[href^='mailto:']")).toBeVisible();
  await context.close();
});

test("passes automated accessibility checks in both themes", async ({
  page,
}) => {
  await page.goto("/");
  for (const theme of ["dark", "light"]) {
    if (theme === "light")
      await page.getByRole("button", { name: "Switch to light theme" }).click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(result.violations).toEqual([]);
  }
});
