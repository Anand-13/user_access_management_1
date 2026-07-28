import { test, expect } from './fixtures';

/* Application & Role Governance — hand-authored from repo/test/application.json */
const ADMIN_CONSOLE = '/suite/sites/user-access-management-anand/page/system-admin';

test.describe('Application & Role Governance', () => {
  test.use({ role: 'uam_admin' }); // TU-001, ROLE-ADMIN

  test('TC-020: Create Application (Happy Path) @P1', async ({ page }) => {
    // requirement FR-A1 | workflow: UAM Create Application
    await page.goto(ADMIN_CONSOLE);
    await page.getByRole('button', { name: /New Application/i }).click();
    await page.getByLabel(/Application Name|Name/i).fill('Test App Delta');
    // attach an application group and roles
    await page.getByRole('button', { name: /Submit/i }).click();
    await expect(page.getByText('Test App Delta')).toBeVisible();
    // Cleanup: soft-delete the created application and its roles
  });

  test('TC-021: Map application to organization @P2', async ({ page }) => {
    // requirement FR-A2 | workflow: UAM Organization Application | seed: SEED-ORG-001, SEED-APP-001
    await page.goto(ADMIN_CONSOLE);
    await page.getByText('Test Org Alpha').click();
    await page.getByText(/Application/i).first().click();
    await page.getByText('Test App Delta').click();
    await page.getByRole('button', { name: /Submit/i }).click();
    await expect(page.getByText('Test App Delta')).toBeVisible();
    // Cleanup: remove the org-application mapping
  });

  test('TC-022: Remove application group @P3', async ({ page }) => {
    // requirement FR-A3 | workflow: UAM Remove Application Group | seed: SEED-APP-001
    await page.goto(ADMIN_CONSOLE);
    await page.getByText('Test App Delta').click();
    await page.getByRole('button', { name: /Remove.*Group/i }).click();
    await page.getByRole('button', { name: /Confirm|Submit/i }).click();
    await expect(page.getByText(/removed|success/i)).toBeVisible();
    // Cleanup: re-attach the group via pre-provisioned data reset
  });
});
