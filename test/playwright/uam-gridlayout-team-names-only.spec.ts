import { test, expect } from './fixtures';
import { waitForAppianLoad, waitForGrid, getGridRowCount, appian, SITE_URL } from './helpers';

test.use({ role: 'uam_users' });

// Auto-generated Playwright tests for UAM_gridlayout_TeamNamesOnly
// Pattern: GRID

test.describe('UAM Gridlayout Team Names Only', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${SITE_URL}/page/system-admin`);
    await waitForAppianLoad(page);
  });

  test('page loads with content', async ({ page }) => {
    await expect(page.locator(appian.contentLayout).first()).toBeVisible();
  });

  test('grid loads with data', async ({ page }) => {
    try {
      await waitForGrid(page);
      const count = await getGridRowCount(page);
      expect(count).toBeGreaterThan(0);
    } catch {
      await expect(page.getByText(/no (items?|records?|data|results?)/i).first()).toBeVisible({ timeout: 5000 });
    }
  });

  test('grid headers are visible', async ({ page }) => {
    const headers = page.locator('table thead th, [class*="GridHeaderCell"]');
    await expect(headers.first()).toBeVisible({ timeout: 10000 });
  });

});
