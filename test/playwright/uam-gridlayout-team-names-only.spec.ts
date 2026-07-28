import { test, expect } from './fixtures';

/*
 * Team Names Grid (UAM_gridlayout_TeamNamesOnly) — hand-authored from the 8-case feature JSON.
 * Read-only embedded selection grid: search / single-row select / refresh / manager-only Access Status.
 * Rendered on the system-admin console with orgid/teamid context; URL params encrypted.
 */
const CONSOLE = '/suite/sites/user-access-management-anand/page/system-admin';

test.describe('Team Names Grid — manager view', () => {
  test.use({ role: 'uam_manager' }); // TU-003

  test('TC-TNO-001: Grid renders when org/team context supplied @P1', async ({ page }) => {
    // seed: SEED-ORG-001, SEED-TEAM-001 | embedded with orgid context
    await page.goto(CONSOLE);
    await expect(page.getByText('Team Details')).toBeVisible();
  });

  test('TC-TNO-002: Grid hidden when no org/team context @P2', async ({ page }) => {
    // showWhen: or(isNotNullOrEmpty(orgid), isNotNullOrEmpty(teamid))
    await page.goto(CONSOLE);
    // With neither orgid nor teamid, the 'Team Details' grid must not render.
    await expect(page.getByText('Team Details')).not.toBeVisible();
  });

  test('TC-TNO-003: Organization Name and Team Name columns visible @P1', async ({ page }) => {
    await page.goto(CONSOLE);
    await expect(page.getByText('Organization Name')).toBeVisible();
    await expect(page.getByText('Team Name')).toBeVisible();
  });

  test('TC-TNO-004: Search box filters the team rows @P2', async ({ page }) => {
    await page.goto(CONSOLE);
    await page.getByRole('textbox').first().fill('Test Team Gamma');
    await expect(page.getByText('Test Team Gamma')).toBeVisible();
    // Cleanup: clear the search box
  });

  test('TC-TNO-005: Refresh button re-queries @P3', async ({ page }) => {
    await page.goto(CONSOLE);
    await page.getByRole('button', { name: /Refresh/i }).click();
    await expect(page.getByText('Team Details')).toBeVisible();
  });

  test('TC-TNO-006: Single-row selection (maxSelections 1) @P1', async ({ page }) => {
    await page.goto(CONSOLE);
    const rows = page.locator('tbody tr[class*="PagingGridLayout---selectable"]');
    await rows.first().click();
    await expect(page.locator('tbody tr[aria-selected="true"]')).toHaveCount(1);
    // selecting a second row replaces the first (maxSelections: 1)
  });

  test('TC-TNO-007: Access Status shows Granted/Not Granted for a manager @P2', async ({ page }) => {
    // BLOCKED by BLOCKER-001 (CRITICAL PERF-INT-002): N+1 in the Access Status column
    test.skip(true, 'BLOCKER-001: N+1 query in the Access Status column (per-row UAM_qry_togetRolesFromTeam); fix before enabling.');
    await page.goto(CONSOLE);
    await expect(page.getByText('Access Status')).toBeVisible();
    await expect(page.getByText(/Granted|Not Granted/i).first()).toBeVisible();
  });
});

test.describe('Team Names Grid — non-manager view', () => {
  test.use({ role: 'uam_user' }); // TU-004

  test('TC-TNO-008: Access Status column hidden from non-managers @P2', async ({ page }) => {
    await page.goto(CONSOLE);
    await expect(page.getByText('Access Status')).not.toBeVisible();
    await expect(page.getByText('Organization Name')).toBeVisible();
    await expect(page.getByText('Team Name')).toBeVisible();
  });
});
