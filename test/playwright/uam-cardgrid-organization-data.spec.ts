import { test, expect } from './fixtures';
import { waitForAppianLoad, appian, SITE_URL } from './helpers';

test.use({ role: 'uam_admin' });

// Auto-generated Playwright tests for UAM_cardgrid_OrganizationData
// Pattern: DASHBOARD

test.describe('UAM Cardgrid Organization Data', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${SITE_URL}/page/system-admin`);
    await waitForAppianLoad(page);
  });

  test('page loads without errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));
    await waitForAppianLoad(page);
    expect(errors).toHaveLength(0);
  });

  test('dashboard cards are visible', async ({ page }) => {
    const cards = page.locator(appian.card);
    await expect(cards.first()).toBeVisible({ timeout: 10000 });
    const count = await cards.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test('site navigation is visible', async ({ page }) => {
    const nav = page.locator('nav, [class*="SiteNav"], [class*="VirtualNavigationMenu"]');
    await expect(nav.first()).toBeVisible();
  });
});
