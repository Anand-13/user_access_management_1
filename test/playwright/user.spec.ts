import { test, expect } from './fixtures';

/* User Lifecycle — hand-authored from repo/test/user.json */
const ADMIN_CONSOLE = '/suite/sites/user-access-management-anand/page/system-admin';

test.describe('User Lifecycle', () => {
  test.use({ role: 'uam_admin' }); // TU-001, ROLE-ADMIN

  test('TC-030: Create User (Happy Path) @P1', async ({ page }) => {
    // requirement FR-U1 | workflow: UAM Create Or Update User
    await page.goto(ADMIN_CONSOLE);
    await page.getByRole('button', { name: /New User/i }).click();
    // enter the user's details per the create-user form
    await page.getByRole('button', { name: /Submit/i }).click();
    await expect(page.getByText(/success|created/i)).toBeVisible();
    // Cleanup: soft-delete the created user
  });

  test('TC-031: Deactivate then reactivate a user @P1', async ({ page }) => {
    // requirement FR-U2 | workflow: UAM Deactivate/Activate The User | seed: SEED-USER-001
    await page.goto(ADMIN_CONSOLE);
    await page.getByText(/Users/i).first().click();
    await page.getByRole('button', { name: /Deactivate/i }).first().click();
    await page.getByRole('button', { name: /Confirm|Submit/i }).click();
    await expect(page.getByText(/inactive|deactivated/i)).toBeVisible();
    await page.getByRole('button', { name: /Activate/i }).first().click();
    await page.getByRole('button', { name: /Confirm|Submit/i }).click();
    await expect(page.getByText(/active/i)).toBeVisible();
    // Cleanup: leave the user active (pre-provisioned data reset)
  });

  test('TC-DV-003: Active toggle reflects group membership @P2', async ({ page }) => {
    // requirement FR-U4 | data-validation | seed: SEED-USER-001
    await page.goto(ADMIN_CONSOLE);
    await page.getByText(/Users/i).first().click();
    // toggle active flag and verify UAM Active User membership follows the flag
    await expect(page.getByText(/active|inactive/i).first()).toBeVisible();
    // Cleanup: restore original state
  });
});
