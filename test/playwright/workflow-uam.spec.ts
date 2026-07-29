import { test, expect } from './fixtures';
import {
  waitForAppianLoad, waitForGrid, waitForDialog, waitForDialogClose, fillTextField, fillParagraphField, fillDateField, clickRecordAction, fieldByLabel, appian, SITE_URL,
} from './helpers';

test.use({ role: 'uam_administrators' });

test.describe.serial('Workflow: UAM — Organization → Team', () => {

  // Names set at runtime to avoid collisions on repeat runs
  let organizationName: string;
  let teamName: string;

  test.beforeAll(() => {
    const ts = Date.now();
    organizationName = `E2E_${ts} Organization`;
    teamName = `E2E_${ts} Team`;
  });

  // ---- CREATE: Organization ----
  test('create Organization', async ({ page }) => {
    await page.goto(`${SITE_URL}/page/system-admin`);
    await waitForAppianLoad(page);
    await clickRecordAction(page, 'New Organization');
    await waitForDialog(page);

    await fillTextField(page, 'ORGANIZATION NAME', organizationName);
    { // fill required picker: Project Manager
      const pickerInput = fieldByLabel(page, 'Project Manager').locator('input');
      await pickerInput.click();
      const realOption = page.locator('[class*="MenuWidget---inPickerWidget"] [role="option"]:not(:has-text("No results"))').first();
      let pickerFilled = false;
      for (const term of ['admin', 'user', 'test']) {
        await pickerInput.click({ clickCount: 3 });
        await page.keyboard.press('Backspace');
        await page.keyboard.type(term);
        try {
          await realOption.waitFor({ state: 'visible', timeout: 2500 });
          await realOption.click();
          pickerFilled = true;
          break;
        } catch { /* term yielded no users — try next */ }
      }
      if (!pickerFilled) throw new Error('Picker "Project Manager" had no selectable users for any of [admin, user, test]');
    }
    await page.locator(appian.dialogButton('Submit')).click();
    await waitForDialogClose(page);
  });

  // ---- VERIFY: Organization in grid ----
  test('verify Organization in grid', async ({ page }) => {
    await page.goto(`${SITE_URL}/page/system-admin`);
    await waitForAppianLoad(page);
    await waitForGrid(page);
    await expect(page.getByText(organizationName, { exact: true }).first()).toBeVisible();
  });

  // ---- CREATE: Team ----
  test('create Team', async ({ page }) => {
    await page.goto(`${SITE_URL}/page/system-admin`);
    await waitForAppianLoad(page);
    await waitForGrid(page);
    await page.getByText(organizationName, { exact: true }).first().click();
    await waitForAppianLoad(page);
    await clickRecordAction(page, 'New Team');
    await waitForDialog(page);

    await fillTextField(page, 'Team Name', teamName);
    await fillTextField(page, 'Team Description', teamName);
    await page.locator(appian.dialogButton('Submit')).click();
    await waitForDialogClose(page);
  });

  // ---- VERIFY: Team in grid ----
  test('verify Team in grid', async ({ page }) => {
    await page.goto(`${SITE_URL}/page/system-admin`);
    await waitForAppianLoad(page);
    await waitForGrid(page);
    await page.getByText(organizationName, { exact: true }).first().click();
    await waitForAppianLoad(page);
    await waitForGrid(page);
    await expect(page.getByText(teamName, { exact: true }).first()).toBeVisible();
  });

  // ---- CLEANUP (best-effort, reverse order) ----
  test.afterAll(async ({ browser }) => {
    const page = await browser.newPage();
    try {
      // Delete Team
      await page.goto(`${SITE_URL}/page/system-admin`);
      await waitForAppianLoad(page);
      await waitForGrid(page);
      await page.getByText(organizationName, { exact: true }).first().click();
      await waitForAppianLoad(page);
      await waitForGrid(page);
      await page.getByText(teamName, { exact: true }).first().click();
      await waitForAppianLoad(page);
      await clickRecordAction(page, 'Delete Team').catch(() => {});
      // Delete Organization
      await page.goto(`${SITE_URL}/page/system-admin`);
      await waitForAppianLoad(page);
      await waitForGrid(page);
      await page.getByText(organizationName, { exact: true }).first().click();
      await waitForAppianLoad(page);
      await clickRecordAction(page, 'Delete Organization').catch(() => {});
    } catch {
      // Cleanup failures are non-fatal
    } finally {
      await page.close();
    }
  });
});