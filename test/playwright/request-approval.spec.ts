import { test, expect } from './fixtures';
import { waitForAppianLoad, fillPickerField, clickButton, clickRecordAction, navigateToPage, waitForActionComplete, expectNoErrorAlert, appian, SITE_URL } from './helpers';

test.describe("UAT_1 — Uam Users", () => {
  test.use({ role: 'uam_users' });

  // Preconditions:
  //   - User is logged in as a member of UAM Users
  //   - At least one Organization with an associated Team exists
  //   - The team has an assigned manager
  test("User submits a team access request", async ({ page }) => {
    // Priority: P1
    // A general user requests access to a team; the request is created with status In progress and notifies the team's manager.

    // Step 1: Navigate to the User Access Management console
    await navigateToPage(page, "system-admin");
    // Expected: The console loads with the organizations/teams views

    // Step 2: Select the organization whose team the user wants to join
    // DATA GAP [GAP-001]: TODO: provide an existing Organization name
    // TODO: Resolve this gap before running the test (run /seed-ref-data or provide value manually)
    // await fillPickerField(page, "Organization", /* resolve gap: provide username or record name */ '');
    // Expected: The organization's teams are listed under 'Select Teams to join'

    // Step 3: On the 'Assiged Teams' screen, select the team to request access to
    // DATA GAP [GAP-002]: TODO: provide an existing Team name under the chosen Organization
    // TODO: Resolve this gap before running the test (run /seed-ref-data or provide value manually)
    // await fillPickerField(page, "Team", /* resolve gap: provide username or record name */ '');
    // Expected: The chosen team is selected; the 'Select The Team' button becomes enabled

    // Step 4: Submit the team selection to create the access request
    await clickButton(page, "Select The Team");
    await waitForActionComplete(page);
    // Expected: The request is created and the user returns to the request tracking grid

    // Post-conditions
    // The newly created request shows status In progress
    await expect(page.getByText("In progress").first()).toBeVisible({ timeout: 10000 });
    // TODO: assert "The Task Request record is created with taskStatus = In progress and a Team Access Add Approval Task definition (verify in DB or record view)"
  });

});

test.describe("UAT_1 — Uam Managers", () => {
  test.use({ role: 'uam_managers' });

  // Preconditions:
  //   - A pending Team Access Add Approval request exists for a team the logged-in user manages (created by SCN-001 or seeded)
  //   - User is logged in as a member of UAM managers
  test("Manager approves the pending request", async ({ page }) => {
    // Priority: P1
    // The team's manager opens the Manager Tasks inbox, opens the pending access request via its task-name link, and approves it; the request status becomes Approved.

    // Step 1: Navigate to the Manager Tasks page
    await navigateToPage(page, "manager-tasks");
    // Expected: The manager's pending approval tasks are listed, each as a task-name link

    // Step 2: Open the pending access request by clicking its task-name start-process link
    await clickRecordAction(page, "TODO: the task-name link text (generated per request, e.g. 'Team Access Request - <team>')");
    // Expected: The approval interface opens showing the requester, team, and application roles

    // Step 3: Approve the request
    await clickButton(page, "APPROVE");
    await waitForActionComplete(page);
    // Expected: The task closes and the user is granted the team/roles

    // Post-conditions
    // The request status is now Approved
    await expect(page.getByText("Approved").first()).toBeVisible({ timeout: 10000 });
    // TODO: assert "The Task Request record's taskStatus = Approved and a UAM User Team row is created granting access"
  });

});
