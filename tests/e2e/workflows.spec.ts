import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('homepage, progressive structure and criterion detail', async ({ page }) => {
  await page.goto('./');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Rámec pro porozumění');
  await expect(page.locator('.area-card')).toHaveCount(6);
  await expect(page.locator('.needs-grid .need-card')).toHaveCount(6);
  await expect(page.locator('.criterion-row')).toHaveCount(0);
  await page.locator('.area-card').nth(3).click();
  await expect(page).toHaveURL(/ramec\/oblasti\/4\/$/);
  await page.locator('.competency-card>a').nth(1).click();
  await expect(page).toHaveURL(/ramec\/kompetence\/4\.2\/$/);
  await page.locator('.criterion-row').filter({ hasText: '4.2.2' }).click();
  await expect(page.locator('.level-card:visible')).toHaveCount(4);
  await expect(page.locator('.source-reference')).toContainText('strana 19');
});
test('situation search, comparison, highlighted phrases and role', async ({ page }) => {
  await page.goto('./hledat/');
  await page.getByLabel('Co ve výuce řešíte?').fill('zaci se nezapojuji');
  await page.getByRole('button', { name: 'Hledat', exact: true }).click();
  await expect(page.locator('.search-result').first()).toContainText('4.2.2');
  await page.locator('.search-result').first().getByRole('link').click();
  await page.getByRole('button', { name: 'Porovnat dvě úrovně' }).click();
  await expect(page.locator('.level-card:visible')).toHaveCount(2);
  await page.getByLabel('Zvýraznit podstatné rozdíly').check();
  await expect(page.locator('.level-card mark')).toHaveCount(2);
  await expect(page).toHaveURL(/porovnat=1%2C2&rozdily=1/);
  const text = await page.locator('.level-card[data-level="1"] p').textContent();
  await page.getByLabel('Používám rámec jako').selectOption('mentor');
  await expect(page.locator('.reflection-list')).toContainText('Na co se studujícího zeptat');
  expect(await page.locator('.level-card[data-level="1"] p').textContent()).toBe(text);
  await page.getByLabel('Druhá úroveň').selectOption('1');
  await expect(page.locator('.level-status')).toContainText('dvě různé');
  await expect(page.locator('.level-card:visible')).toHaveCount(2);
  await page.getByLabel('První úroveň').selectOption('3');
  await expect(page.getByLabel('První úroveň')).toHaveValue('2');
  await expect(page.getByLabel('Druhá úroveň')).toHaveValue('3');
  await expect(page.locator('.level-card:visible').first()).toHaveAttribute('data-level', '2');
  await expect(page).toHaveURL(/porovnat=2%2C3/);
});
test('filters confirm explicitly, exclusion wins and back restores', async ({ page, isMobile }) => {
  await page.goto('./hledat/?q=4.2.2');
  await expect(page.locator('.search-result')).toHaveCount(1);
  if (isMobile) await page.locator('.filter-panel>summary').click();
  await page.locator('input[name="oblast"][value="5"]').check();
  await expect(page.locator('.search-result')).toHaveCount(1);
  await page.getByRole('button', { name: 'Použít filtry' }).click();
  await expect(page.locator('.empty-state')).toBeVisible();
  await expect(page).toHaveURL(/oblast=5/);
  await page.getByRole('button', { name: 'Zrušit filtry a zachovat dotaz' }).click();
  await expect(page.locator('.search-result')).toHaveCount(1);
  await page.goBack();
  await expect(page.locator('.empty-state')).toBeVisible();
  await expect(page.locator('input[name="oblast"][value="5"]')).toBeChecked();
});
test('shared comparison, invalid pair, level and legacy URL', async ({ page }) => {
  await page.goto('./ramec/kriteria/4.2.2/?porovnat=3,1&uroven=2&rozdily=1#urovne');
  await expect(page.locator('.level-card:visible')).toHaveCount(2);
  await expect(page.locator('.level-card[data-level="1"]')).toBeVisible();
  await expect(
    page.getByText('Pro tuto dvojici není zpracovaný metodický komentář.'),
  ).toBeVisible();
  await page.goto('./ramec/kriteria/4.2.2/?porovnat=1,1&uroven=2');
  await expect(page.locator('.level-card:visible')).toHaveCount(4);
  await expect(page.locator('.level-status')).toContainText('dvě různé');
  await page.goto('./kriteria/4-2-2/?uroven=2#urovne');
  await expect(page).toHaveURL(/ramec\/kriteria\/4\.2\.2\/\?uroven=2#urovne/);
  await expect(page.locator('.level-card.targeted')).toHaveAttribute('data-level', '2');
});
test('catalog filters and model example with multiple criterion links', async ({
  page,
  isMobile,
}) => {
  await page.goto('./ukazky/');
  await expect(page.locator('.search-result')).toHaveCount(6);
  if (isMobile) await page.locator('.filter-panel>summary').click();
  await page.locator('input[name="ukazka"][value="transkript"]').check();
  await page.getByRole('button', { name: 'Použít filtry' }).click();
  await expect(page.locator('.search-result')).toHaveCount(2);
  await page
    .locator('.search-result')
    .filter({ hasText: 'Prostor pro každý hlas' })
    .getByRole('link')
    .click();
  await expect(page.locator('.notice')).toContainText('Nejde o záznam skutečné výuky');
  await expect(page.locator('.evidence-link')).toHaveCount(2);
});
test('clipboard failure exposes selectable URL and print includes all descriptors', async ({
  page,
}) => {
  await page.goto('./ramec/kriteria/5.1.1/?porovnat=1,2');
  await page.evaluate(() =>
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: () => Promise.reject(new Error('denied')) },
      configurable: true,
    }),
  );
  await page.getByRole('button', { name: 'Kopírovat odkaz na toto zobrazení úrovní' }).click();
  await expect(page.getByLabel('Odkaz na zobrazení úrovní')).toBeVisible();
  await expect(page.getByLabel('Odkaz na zobrazení úrovní')).toHaveValue(/porovnat=1%2C2#urovne/);
  await page.emulateMedia({ media: 'print' });
  await expect(page.locator('.level-card:visible')).toHaveCount(4);
  await expect(page.locator('.source-reference')).toBeVisible();
});
test('content and navigation work without JavaScript', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(`${baseURL}ramec/kriteria/4.2.2/`);
  await expect(page.locator('.level-card')).toHaveCount(4);
  await expect(page.locator('.mindset')).toBeVisible();
  await page.goto(`${baseURL}hledat/`);
  await expect(page.getByText('Hledání vyžaduje JavaScript.')).toBeVisible();
  await page.getByRole('link', { name: 'úplném přehledu rámce' }).click();
  await expect(page.getByRole('heading', { name: 'Prozkoumat rámec', exact: true })).toBeVisible();
  await context.close();
});
test('accessibility and reflow on primary screens', async ({ page }, testInfo) => {
  for (const [number, route] of [
    './',
    './hledat/?q=4.2.2',
    './ramec/kriteria/4.2.2/?porovnat=1,2&rozdily=1',
    './ukazky/prostor-pro-kazdy-hlas/',
  ].entries()) {
    await page.goto(route);
    await page
      .locator('astro-island[ssr]')
      .first()
      .waitFor({ state: 'detached' })
      .catch(() => {});
    const violations = (
      await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
        .analyze()
    ).violations;
    expect(
      violations,
      JSON.stringify(violations.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.target) }))),
    ).toEqual([]);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > innerWidth + 1,
    );
    expect(overflow, route).toBe(false);
    await page.screenshot({ path: testInfo.outputPath(`screen-${number}.png`), fullPage: false });
  }
  await page.goto('./');
  await page.screenshot({ path: testInfo.outputPath('homepage.png'), fullPage: true });
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto('./ramec/kriteria/3.2.2/');
  expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1)).toBe(
    false,
  );
});
test('unknown page has actual 404 status', async ({ page }) => {
  const response = await page.goto('./stranka-ktera-neexistuje/');
  expect(response?.status()).toBe(404);
});

test('keyboard skip link and mobile menu return focus', async ({ page, isMobile }) => {
  await page.goto('./');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Přeskočit na obsah' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('#main')).toBeFocused();
  if (isMobile) {
    const menu = page.locator('.mobile-menu>summary');
    await menu.focus();
    await page.keyboard.press('Enter');
    await expect(page.getByRole('navigation', { name: 'Mobilní navigace' })).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(menu).toBeFocused();
    await expect(page.getByRole('navigation', { name: 'Mobilní navigace' })).not.toBeVisible();
  }
});

test('failed search index has a working retry and fallback', async ({ page }) => {
  let attempts = 0;
  await page.route('**/search-index.json', async (route) => {
    attempts++;
    if (attempts === 1) await route.fulfill({ status: 503, body: 'Unavailable' });
    else await route.continue();
  });
  await page.goto('./hledat/?q=4.2.2');
  await expect(page.getByRole('alert')).toContainText('nepodařilo načíst');
  await page.getByRole('button', { name: 'Zkusit znovu' }).click();
  await expect(page.locator('.search-result')).toHaveCount(1);
});
