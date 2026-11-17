import { readFile } from "node:fs/promises";
import { expect, test } from "@playwright/test";

test("switches languages while retaining the case-study route", async ({
  page,
}) => {
  await page.goto("/projects/hesabo");
  await page.locator("button[aria-haspopup=menu]").click();
  await page.locator("[role=menuitem][hreflang=fa]").click();
  await expect(page).toHaveURL(/\/fa\/projects\/hesabo$/);
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  await page.locator("button[aria-haspopup=menu]").click();
  await page.locator("[role=menuitem][hreflang=de]").click();
  await expect(page).toHaveURL(/\/de\/projects\/hesabo$/);
  await expect(page.locator("html")).toHaveAttribute("dir", "ltr");
});

test("rotates with a horizontal touch gesture on mobile", async ({
  page,
  isMobile,
}) => {
  test.skip(!isMobile, "Touch gesture is exercised in the mobile project");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.getByRole("button", { name: "Explore 3D", exact: true }).tap();
  await expect(page.locator("#hero-workstation")).toHaveAttribute(
    "aria-busy",
    "false",
    { timeout: 20_000 },
  );
  const canvas = page.locator("canvas");
  await canvas.scrollIntoViewIfNeeded();
  const before = await canvas.screenshot();
  const box = (await canvas.boundingBox())!;
  const cdp = await page.context().newCDPSession(page);
  const x = box.x + box.width * 0.3,
    y = box.y + box.height * 0.35;
  await cdp.send("Input.dispatchTouchEvent", {
    type: "touchStart",
    touchPoints: [{ x, y }],
  });
  for (let step = 1; step <= 8; step++)
    await cdp.send("Input.dispatchTouchEvent", {
      type: "touchMove",
      touchPoints: [{ x: x + step * box.width * 0.04, y }],
    });
  await cdp.send("Input.dispatchTouchEvent", {
    type: "touchEnd",
    touchPoints: [],
  });
  await page.waitForTimeout(150);
  expect((await canvas.screenshot()).equals(before)).toBe(false);
  await cdp.detach();
});

test("loads 3D on request, rotates by pointer and keyboard, freezes reduced motion and reopens", async ({
  page,
}) => {
  test.setTimeout(60_000);
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator("canvas")).toHaveCount(0);
  await page.getByRole("button", { name: "Explore 3D", exact: true }).click();
  await expect(page.locator("#hero-workstation")).toHaveAttribute(
    "aria-busy",
    "false",
    { timeout: 20_000 },
  );
  const canvas = page.locator("canvas");
  await expect(canvas).toBeVisible();
  const first = await canvas.screenshot();
  await page.waitForTimeout(250);
  expect((await canvas.screenshot()).equals(first)).toBe(true);
  await page.getByRole("button", { name: "Rotate right", exact: true }).focus();
  await page.keyboard.press("Enter");
  await page.waitForTimeout(150);
  const rotated = await canvas.screenshot();
  expect(rotated.equals(first)).toBe(false);
  const box = (await canvas.boundingBox())!;
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.down();
  await page.mouse.move(box.x + box.width * 0.85, box.y + box.height / 2, {
    steps: 10,
  });
  await page.mouse.up();
  await page.waitForTimeout(150);
  expect((await canvas.screenshot()).equals(rotated)).toBe(false);
  await page.getByRole("button", { name: "Close 3D", exact: true }).click();
  await expect(canvas).toHaveCount(0);
  await page.getByRole("button", { name: "Explore 3D", exact: true }).click();
  await expect(page.locator("#hero-workstation")).toHaveAttribute(
    "aria-busy",
    "false",
  );
  await expect(canvas).toHaveCount(1);
  expect(errors).toEqual([]);
});

test("keeps a static fallback without WebGL", async ({ page }) => {
  await page.addInitScript(`const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function(type, ...args) {
      return /^(webgl2?|experimental-webgl)$/.test(type) ? null : original.call(this, type, ...args);
    };`);
  await page.goto("/");
  await page.getByRole("button", { name: "Explore 3D", exact: true }).click();
  await expect(page.getByRole("status")).toContainText(
    "3D scene is unavailable",
  );
  await expect(page.locator("canvas")).toHaveCount(0);
  await expect(page.locator("#hero-workstation picture img")).toHaveCSS(
    "opacity",
    "1",
  );
});

test("recovers to the still after WebGL context loss", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Explore 3D", exact: true }).click();
  await expect(page.locator("#hero-workstation")).toHaveAttribute(
    "aria-busy",
    "false",
    { timeout: 20_000 },
  );
  await page
    .locator("canvas")
    .evaluate((canvas) =>
      (canvas as HTMLCanvasElement)
        .getContext("webgl2")
        ?.getExtension("WEBGL_lose_context")
        ?.loseContext(),
    );
  await expect(page.getByRole("status")).toContainText(
    "3D scene is unavailable",
  );
  await expect(page.locator("#hero-workstation picture img")).toHaveCSS(
    "opacity",
    "1",
  );
  await expect(page.locator("canvas")).toHaveCount(0);
});

test("serves the original resume bytes and removes the old project in every language", async ({
  page,
  request,
}) => {
  const original = await readFile("public/nima-moradirad-resume.pdf");
  const response = await request.get("/nima-moradirad-resume.pdf");
  expect(response.headers()["content-type"]).toContain("application/pdf");
  expect((await response.body()).equals(original)).toBe(true);
  for (const prefix of ["", "/fa", "/de"]) {
    await page.goto(`${prefix}/projects/tarabari-nima`);
    await expect(
      page.locator('meta[name="robots"][content="noindex"]'),
    ).toHaveCount(1);
    await page.goto(`${prefix}/projects/moradi-gallery`);
    await expect(page.getByText(/MVP/).first()).toBeVisible();
    await expect(page.locator("main [lang=en]")).toHaveCount(0);
  }
});
