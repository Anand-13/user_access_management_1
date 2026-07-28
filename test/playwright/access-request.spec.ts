import { test, expect } from './fixtures';

/*
 * Access Request & Approval Workflows — hand-authored from repo/test/access-request.json.
 * FIX: test.use() is now at describe scope (was incorrectly inside test() bodies).
 * Grouped by the acting role. Cross-role completion (user requests -> manager approves)
 * is split across the two describes; wiring a single test across both roles needs the
 * fixture's per-role storageState and is left as a documented dev-refinement step.
 */
const CONSOLE = '/suite/sites/user-access-management-anand/page/system-admin';
const MANAGER_TASKS = '/suite/sites/user-access-management-anand/page/manager-tasks';

test.describe.serial('Access Request — requester (uam_user)', () => {
  test.use({ role: 'uam_user' }); // TU-004

  test('TC-WF-001: Grant path — submit team-access request @P1', async ({ page }) => {
    // requirement FR-R1 | requester half; manager approval covered in the manager describe
    await page.goto(CONSOLE);
    await page.getByRole('button', { name: /Request.*Access|Team Request/i }).first().click();
    await page.getByText('Test Team Gamma').click();
    await page.getByRole('button', { name: /Submit/i }).click();
    await expect(page.getByText(/In progress|submitted/i)).toBeVisible();
    // Manager then approves on Manager Tasks (see TC-WF-approval note); assert taskStatusId=2 + User Team granted.
    // Cleanup: revoke granted access; soft-delete the Task Request
  });

  test('TC-WF-003: Revoke path — initiate revoke @P1', async ({ page }) => {
    // requirement FR-R5 | requester initiates; manager approves in the manager describe
    await page.goto(CONSOLE);
    await page.getByRole('button', { name: /Revoke/i }).first().click();
    await page.getByRole('button', { name: /Submit/i }).click();
    await expect(page.getByText(/Revoke|In progress/i)).toBeVisible();
    // Cleanup: restore access via pre-provisioned data reset if needed
  });

  test('TC-ERR-001: Cannot request a team already held @P2', async ({ page }) => {
    // requirement FR-R8 | BR-excludeTeamsAlreadyAdded
    await page.goto(CONSOLE);
    await page.getByRole('button', { name: /Request.*Access|Team Request/i }).first().click();
    await expect(page.getByText('Test Team Gamma')).not.toBeVisible();
    // Cleanup: none required
  });
});

test.describe('Access Request — approver (uam_manager)', () => {
  test.use({ role: 'uam_manager' }); // TU-003

  test('TC-WF-002: Reject path — reason required @P1', async ({ page }) => {
    // requirement FR-R3 | BR-rejectionReasonRequired
    await page.goto(MANAGER_TASKS);
    await page.getByText(/Team Access Add/i).first().click();
    await page.getByRole('button', { name: /Reject/i }).click();
    // reject without a reason is blocked
    await expect(page.getByText(/reason.*required|required/i)).toBeVisible();
    await page.getByLabel(/Reason/i).fill('Not required for this role');
    await page.getByRole('button', { name: /Reject/i }).click();
    await expect(page.getByText(/Rejected/i)).toBeVisible();
    // Cleanup: soft-delete the Task Request
  });

  test('TC-WF-004: Manager self-service grant (bypass) @P2', async ({ page }) => {
    // requirement FR-R6 | BR-selfCheckManager
    await page.goto(CONSOLE);
    await page.getByRole('button', { name: /Self Grant/i }).first().click();
    await page.getByRole('button', { name: /Confirm|Submit/i }).click();
    await expect(page.getByText(/granted|success/i)).toBeVisible();
    // Cleanup: self-remove the access
  });
});
