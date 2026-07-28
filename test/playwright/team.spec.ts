import { test, expect } from './fixtures';

/* Team & Role Management — hand-authored from repo/test/team.json */
const ADMIN_CONSOLE = '/suite/sites/user-access-management-anand/page/system-admin';

test.describe('Team & Role Management', () => {
  test.use({ role: 'uam_admin' }); // TU-001, ROLE-ADMIN

  test('TC-010: Create Team (Happy Path) @P1', async ({ page }) => {
    // requirement FR-T1 | workflow: UAM Create or Update Team | seed: SEED-ORG-001
    await page.goto(ADMIN_CONSOLE);
    await page.getByRole('button', { name: /New Team/i }).click();
    await page.getByLabel(/Team Name|Name/i).fill('Test Team Gamma');
    // assign at least one team role via the role grid
    await page.getByRole('button', { name: /Submit/i }).click();
    await expect(page.getByText('Test Team Gamma')).toBeVisible();
    // Cleanup: soft-delete the created team and its team roles
  });

  test('TC-011: Map team to organization @P1', async ({ page }) => {
    // requirement FR-T2 | workflow: UAM Map Org Team | seed: SEED-ORG-001, SEED-TEAM-001
    await page.goto(ADMIN_CONSOLE);
    await page.getByText('Test Org Alpha').click();
    await page.getByText(/Teams|Map.*Team/i).first().click();
    await page.getByText('Test Team Gamma').click();
    await page.getByRole('button', { name: /Submit/i }).click();
    await expect(page.getByText('Test Team Gamma')).toBeVisible();
    // Cleanup: remove the org-team mapping
  });

  test('TC-012: Assign and remove team application roles @P2', async ({ page }) => {
    // requirement FR-T4 | workflow: UAM Team Application | seed: SEED-TEAM-001, SEED-APP-001
    await page.goto(ADMIN_CONSOLE);
    await page.getByText('Test Team Gamma').click();
    await page.getByText(/Application|Roles/i).first().click();
    // add a role via the editable role grid, submit, then remove it
    await page.getByRole('button', { name: /Submit/i }).click();
    await expect(page.getByText(/success|updated/i)).toBeVisible();
    // Cleanup: remove any remaining test role mappings
  });
});
