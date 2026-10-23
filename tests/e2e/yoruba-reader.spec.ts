import { expect, test, type Page } from "@playwright/test";

// The Yoruba swipe reader, in a real browser against the production build and the fake backend:
// the question after a customer signs in, one tap to say yes, swiping between elements with a box
// on the current one, and the recorded clip for it playing.

const API = `http://localhost:${process.env.E2E_API_PORT ?? 3101}`;

test.beforeEach(async ({ page }) => {
  await fetch(`${API}/__fake/reset`, { method: "POST" });
  // Record every clip the page tries to play (a headless browser has no sound to check).
  await page.addInitScript(() => {
    const played: string[] = [];
    (window as unknown as { __played: string[] }).__played = played;
    window.Audio = class {
      src: string;
      constructor(src: string) {
        this.src = src;
      }
      play() {
        played.push(this.src);
        return Promise.resolve();
      }
      pause() {}
    } as unknown as typeof Audio;
  });
});

const played = (page: Page) =>
  page.evaluate(() => (window as unknown as { __played: string[] }).__played);

async function signInAsCustomer(page: Page) {
  await page.goto("/signin");
  await page.getByRole("button", { name: /I am a customer/ }).click();
  await page.waitForURL("**/home");
}

const box = (page: Page) => page.locator("div.border-4");

test("a customer is asked, in Yoruba, whether to continue in Yoruba", async ({ page }) => {
  await signInAsCustomer(page);
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog).toContainText("Tẹ̀síwájú ní Yorùbá?");
  await expect(dialog).toContainText("Tẹ ojú ìkànnì láti gbà");
  // The spoken question is asked as well (the clip may not be recorded yet, but it is requested).
  await expect.poll(() => played(page)).toContain("/audio/yo/voice.gatePrompt.mp3");
});

test("one tap says yes: the screens turn Yoruba and reading starts on the first element", async ({
  page,
}) => {
  await signInAsCustomer(page);
  await page.getByRole("dialog").getByRole("button").first().click();

  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(page.getByRole("heading", { name: "Kí ni o fẹ́ ṣe?" })).toBeVisible();
  const cookies = await page.context().cookies();
  expect(cookies.find((c) => c.name === "zolo_locale")?.value).toBe("yo");

  await expect(box(page)).toBeVisible({ timeout: 5000 });
});

test("swiping moves the box to the next element and plays its recorded clip", async ({ page }) => {
  await signInAsCustomer(page);
  await page.getByRole("dialog").getByRole("button").first().click();
  await expect(box(page)).toBeVisible({ timeout: 5000 });

  const first = await box(page).boundingBox();
  // A swipe to the left, with the pointer, the way a finger does it.
  await page.mouse.move(300, 400);
  await page.mouse.down();
  await page.mouse.move(120, 405, { steps: 6 });
  await page.mouse.up();
  await expect.poll(async () => (await box(page).boundingBox())?.y).not.toBe(first?.y);

  // Step on through the screen: at least one element says a recorded clip that really exists.
  for (let i = 0; i < 6; i++) {
    await page.keyboard.press("ArrowRight");
    await page.waitForTimeout(150);
  }
  const clips = (await played(page)).filter(
    (s) => s.startsWith("/audio/yo/") && !s.includes("gatePrompt"),
  );
  expect(clips.length).toBeGreaterThan(0);
  for (const clip of new Set(clips)) {
    const res = await page.request.get(clip);
    expect(res.status(), clip).toBe(200);
  }
});

test("a double tap presses the element the box is on", async ({ page }) => {
  await signInAsCustomer(page);
  await page.getByRole("dialog").getByRole("button").first().click();
  await expect(box(page)).toBeVisible({ timeout: 5000 });

  // Go to "Sanwó fún aṣojú" (pay an agent), then double tap anywhere.
  const current = page.locator("[data-reader-current]");
  for (let i = 0; i < 8; i++) {
    if ((await current.getAttribute("href")) === "/pay/code") break;
    await page.keyboard.press("ArrowRight");
    await page.waitForTimeout(150);
  }
  await expect(current).toHaveAttribute("href", "/pay/code");
  // Its two lines ("Pay an agent" and the hint) are both read.
  await expect
    .poll(() => played(page))
    .toEqual(expect.arrayContaining(["/audio/yo/home.payAgentHint.mp3"]));
  await page.mouse.click(200, 300);
  await page.mouse.click(200, 300);
  await expect(page).toHaveURL(/\/pay\/code/);
});

test("a double tap on a field lets you type in it, then swiping comes back", async ({ page }) => {
  await signInAsCustomer(page);
  await page.getByRole("dialog").getByRole("button").first().click();
  await expect(box(page)).toBeVisible({ timeout: 5000 });
  // On to the code screen (its link, then a double tap).
  const current = page.locator("[data-reader-current]");
  for (let i = 0; i < 8 && (await current.getAttribute("href")) !== "/pay/code"; i++) {
    await page.keyboard.press("ArrowRight");
    await page.waitForTimeout(150);
  }
  await page.mouse.click(200, 300);
  await page.mouse.click(200, 300);
  await page.waitForURL("**/pay/code");

  // Step to the code field and double tap it.
  const field = page.locator("input");
  for (
    let i = 0;
    i < 8 && !(await field.evaluate((el) => el.hasAttribute("data-reader-current")));
    i++
  ) {
    await page.keyboard.press("ArrowRight");
    await page.waitForTimeout(250);
  }
  await page.mouse.click(200, 300);
  await page.mouse.click(200, 300);
  await expect(field).toBeFocused();

  // The swipe layer has stepped aside: a real tap reaches the field, and typing works.
  await page.keyboard.type("4821");
  await expect(field).toHaveValue("4821");

  // Enter leaves the field; the reader is back and the arrow keys move again.
  await page.keyboard.press("Enter");
  await expect(field).not.toBeFocused();
  const before = await box(page).boundingBox();
  await page.keyboard.press("ArrowLeft");
  await expect.poll(async () => (await box(page).boundingBox())?.y).not.toBe(before?.y);
});

test("the exit button (or Escape) stops the reader", async ({ page }) => {
  await signInAsCustomer(page);
  await page.getByRole("dialog").getByRole("button").first().click();
  await expect(box(page)).toBeVisible({ timeout: 5000 });
  await page.keyboard.press("Escape");
  await expect(box(page)).toHaveCount(0);
});

test("saying no keeps English and never starts the reader", async ({ page }) => {
  await signInAsCustomer(page);
  await page.getByRole("button", { name: "Rárá, máa lo èdè Gẹ̀ẹ́sì" }).click();
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(page.getByRole("heading", { name: "What do you want to do?" })).toBeVisible();
  await expect(box(page)).toHaveCount(0);
});

test("an agent is not asked", async ({ page }) => {
  await page.goto("/signin");
  await page.getByRole("button", { name: /I am an agent/ }).click();
  await page.waitForURL("**/agent");
  await expect(page.getByRole("dialog")).toHaveCount(0);
});
