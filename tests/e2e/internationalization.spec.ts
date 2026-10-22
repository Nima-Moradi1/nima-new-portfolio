import { expect, test } from "@playwright/test";

for (const [locale, path, dir, title] of [
  ["en", "/", "ltr", "Senior Frontend Engineer"],
  ["fa", "/fa", "rtl", "مهندس ارشد فرانت‌اند"],
  ["de", "/de", "ltr", "Senior Frontend Engineer"],
] as const) {
  test(`${locale} preserves language, direction, case-study paths and mobile reflow`, async ({
    page,
  }) => {
    await page.goto(path);
    await expect(page.locator("html")).toHaveAttribute("lang", locale);
    await expect(page.locator("html")).toHaveAttribute("dir", dir);
    await expect(
      page.getByRole("heading", { level: 1, name: title }),
    ).toBeVisible();
    const prefix = locale === "en" ? "" : `/${locale}`;
    await expect(
      page.locator(`#work a[href='${prefix}/projects/3d-online-shop']`),
    ).toHaveCount(1);
    for (const width of [320, 390, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      expect(
        await page.evaluate(
          () =>
            document.documentElement.scrollWidth -
            document.documentElement.clientWidth,
        ),
      ).toBeLessThanOrEqual(1);
    }
    await page.goto(`${prefix}/projects/3d-online-shop`);
    await expect(page.locator("html")).toHaveAttribute("lang", locale);
    await expect(page.locator("link[rel='canonical']")).toHaveAttribute(
      "href",
      `https://nimamoradirad.com${prefix}/projects/3d-online-shop`,
    );
  });
}
