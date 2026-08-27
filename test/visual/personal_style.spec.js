const { test, expect } = require("@playwright/test");
const { preparePage, stabilizeVisuals } = require("./helpers");

const route = (path) => (process.env.PERSONAL_SITE_ROOT === "true" ? path : `/al-folio${path}`);

test("light theme uses the Apple-inspired type and color system", async ({ page }) => {
  await preparePage(page, "light");
  await page.goto(route("/"), { waitUntil: "networkidle" });
  await stabilizeVisuals(page);

  const styles = await page.evaluate(() => {
    const body = window.getComputedStyle(document.body);
    const title = window.getComputedStyle(document.querySelector("h1"));
    return {
      backgroundColor: body.backgroundColor,
      color: body.color,
      fontFamily: body.fontFamily,
      titleLetterSpacing: Number.parseFloat(title.letterSpacing),
    };
  });

  expect(styles.backgroundColor).toBe("rgb(251, 251, 253)");
  expect(styles.color).toBe("rgb(29, 29, 31)");
  expect(styles.fontFamily).toContain("-apple-system");
  expect(styles.titleLetterSpacing).toBeLessThan(0);
});

test("desktop navigation uses a restrained translucent surface", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === "mobile", "desktop navigation geometry is asserted separately from the mobile menu");

  await preparePage(page, "light");
  await page.goto(route("/"), { waitUntil: "networkidle" });
  await stabilizeVisuals(page);

  const styles = await page.locator("#navbar").evaluate((node) => {
    const computed = window.getComputedStyle(node);
    return {
      backgroundColor: computed.backgroundColor,
      backdropFilter: computed.backdropFilter || computed.webkitBackdropFilter,
      borderBottomWidth: computed.borderBottomWidth,
    };
  });

  expect(styles.backgroundColor).toBe("rgba(251, 251, 253, 0.82)");
  expect(styles.backdropFilter).toContain("blur(20px)");
  expect(styles.borderBottomWidth).toBe("1px");
});

test("project cards use premium surface geometry", async ({ page }, testInfo) => {
  await preparePage(page, "light");
  await page.goto(route("/projects/"), { waitUntil: "networkidle" });
  await stabilizeVisuals(page);

  const card = page.locator(".projects .card").first();
  await expect(card).toBeVisible();
  const styles = await card.evaluate((node) => {
    const computed = window.getComputedStyle(node);
    return {
      borderRadius: Number.parseFloat(computed.borderRadius),
      borderTopWidth: computed.borderTopWidth,
      backgroundColor: computed.backgroundColor,
      boxShadow: computed.boxShadow,
    };
  });

  const minimumRadius = testInfo.project.name === "mobile" ? 20 : 24;
  expect(styles.borderRadius).toBeGreaterThanOrEqual(minimumRadius);
  expect(styles.borderTopWidth).toBe("1px");
  expect(styles.backgroundColor).toBe("rgb(255, 255, 255)");
  expect(styles.boxShadow).not.toBe("none");
});

test("dark theme uses true black with elevated graphite surfaces", async ({ page }) => {
  await preparePage(page, "dark");
  await page.goto(route("/projects/"), { waitUntil: "networkidle" });
  await stabilizeVisuals(page);

  const styles = await page.evaluate(() => ({
    bodyBackground: window.getComputedStyle(document.body).backgroundColor,
    bodyColor: window.getComputedStyle(document.body).color,
    cardBackground: window.getComputedStyle(document.querySelector(".projects .card")).backgroundColor,
  }));

  expect(styles.bodyBackground).toBe("rgb(0, 0, 0)");
  expect(styles.bodyColor).toBe("rgb(245, 245, 247)");
  expect(styles.cardBackground).toBe("rgb(29, 29, 31)");
});

test("reduced motion disables decorative card movement", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await preparePage(page, "light");
  await page.goto(route("/projects/"), { waitUntil: "networkidle" });
  await stabilizeVisuals(page);

  const transition = await page
    .locator(".projects .card")
    .first()
    .evaluate((node) => {
      const computed = window.getComputedStyle(node);
      return {
        duration: computed.transitionDuration,
        transform: computed.transform,
      };
    });

  expect(transition.duration).toBe("0s");
  expect(transition.transform).toBe("none");
});

test("footer follows the page content instead of covering it", async ({ page }) => {
  await preparePage(page, "light");
  await page.goto(route("/projects/"), { waitUntil: "networkidle" });
  await stabilizeVisuals(page);

  const geometry = await page.evaluate(() => {
    const main = document.querySelector('[role="main"]');
    const footer = document.querySelector("footer");
    const mainBox = main.getBoundingClientRect();
    const footerBox = footer.getBoundingClientRect();
    return {
      mainBottom: mainBox.bottom + window.scrollY,
      footerTop: footerBox.top + window.scrollY,
    };
  });

  expect(geometry.footerTop).toBeGreaterThanOrEqual(geometry.mainBottom - 1);
});
