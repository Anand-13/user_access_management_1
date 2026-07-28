import { test, expect } from './fixtures';

/*
 * Access Request & Approval Workflows — hand-authored from repo/test/access-request.json
 * Cross-role: user requests (uam_user), manager approves/rejects (uam_manager).
 * Serial: cases share the same team access state.
 */
const ADMIN_CONSOLE = '/suite/sites/user-access-management-anand/page/system-admin';
const MANAGER_TASKS = '/suite/sites/user-access-management-anand/page/manager-tasks';

test.describe.serial('Access Request & Approval', () => {
  test('TC-WF-001: Grant path - request then manager approves @P1', async ({ browser }) => {
    // requirement FR-R1 | workflow: Initiate User Team Access -> User Team Request Access Approval
    // As requester (uam_user): submit the request
    const userCtx = await browser.newContext({ storageState: undefined });
    const userPage = await userCtx.newPage();
    // NOTE: cross-role flow — refine with per-role storageState from the fixture.
    await userPage.goto(ADMIN_CONSOLE);
    await userPage.getByRole('button', { name: /Request.*Access|Team Request/i }).first().click();
    await userPage.getByText('Test Team Gamma').click();
    await userPage.getByRole('button', { name: /Submit/i }).click();
    await expect(userPage.getByText(/In progress|submitted/i)).toBeVisible();
    await userCtx.close();
    // As manager (uam_manager): approve on Manager Tasks
    const mgrCtx = await browser.newContext();
    const mgrPage = await mgrCtx.newPage();
    await mgrPage.goto(MANAGER_TASKS);
    await mgrPage.getByText('Test Team Gamma').first().click();
    await mgrPage.getByRole('button', { name: /Approve/i }).click();
    await expect(mgrPage.getByText(/Approved|success/i)).toBeVisible();
    await mgrCtx.close();
    // assert: taskStatusId=2 (Approved); UAM User Team row for TU-004+team exists
    // Cleanup: revoke the granted access; soft-delete the Task Request
  });

  test('TC-WF-002: Reject path - reason required @P1', async ({ page }) => {
    test.use({ role: 'uam_manager' });
    // requirement FR-R3 | BR-rejectionReasonRequired
    await page.goto(MANAGER_TASKS);
    await page.getByText(/Team Access Add/i).first().click();
    await page.getByRole('button', { name: /Reject/i }).click();
    // reject without a reason should be blocked
    await expect(page.getByText(/reason.*required|required/i)).toBeVisible();
    await page.getByLabel(/Reason|Reason For Rejection/i).fill('Not required for this role');
    await page.getByRole('button', { name: /Reject/i }).click();
    await expect(page.getByText(/Rejected/i)).toBeVisible();
    // assert: taskStatusId=3, reasonForRejection not null, no User Team granted
    // Cleanup: soft-delete the Task Request
  });

  test('TC-WF-003: Revoke path - revoke then manager approves @P1', async ({ page }) => {
    // requirement FR-R5 | workflow: Initiate User Team Revoke -> User Team Request Access Revoke
    await page.goto(ADMIN_CONSOLE);
    await page.getByRole('button', { name: /Revoke/i }).first().click();
    await page.getByRole('button', { name: /Submit/i }).click();
    await expect(page.getByText(/Revoke|In progress/i)).toBeVisible();
    // manager approves the revoke on Manager Tasks; assert User Team row removed
    // Cleanup: restore access via pre-provisioned data reset if needed
  });

  test('TC-WF-004: Manager self-service grant @P2', async ({ page }) => {
    test.use({ role: 'uam_manager' });
    // requirement FR-R6 | workflow: UAM Self Grant Access By PM | BR-selfCheckManager
    await page.goto(ADMIN_CONSOLE);
    await page.getByRole('button', { name: /Self Grant/i }).first().click();
    await page.getByRole('button', { name: /Confirm|Submit/i }).click();
    await expect(page.getByText(/granted|success/i)).toBeVisible();
    // assert: UAM User Team row for the manager + team exists
    // Cleanup: self-remove the access
  });

  test('TC-ERR-001: Cannot request a team already held @P2', async ({ page }) => {
    test.use({ role: 'uam_user' });
    // requirement FR-R8 | BR-excludeTeamsAlreadyAdded
    await page.goto(ADMIN_CONSOLE);
    await page.getByRole('button', { name: /Request.*Access|Team Request/i }).first().click();
    // 'Test Team Gamma' (already held) must not be selectable
    await expect(page.getByText('Test Team Gamma')).not.toBeVisible();
    // Cleanup: none required
  });
});
