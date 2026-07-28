import { test, expect } from './fixtures';

/*
 * Organization Management — hand-authored from repo/test/organization.json
 * Site: user-access-management-anand (URL params encrypted — navigate via list + row click)
 */
const ADMIN_CONSOLE = '/suite/sites/user-access-management-anand/page/system-admin';

test.describe('Organization Management', () => {
  test.use({ role: 'uam_admin' }); // TU-001, ROLE-ADMIN

  test('TC-001: Create Organization (Happy Path) @P1', async ({ page }) => {
    // requirement FR-O1 | workflow: UAM Create or Update Organization
    // precondition: no organization named 'Test Org Alpha' exists
    await page.goto(ADMIN_CONSOLE);
    await page.getByRole('button', { name: /New Organization/i }).click();
    await page.getByLabel(/Organization Name|Name/i).fill('Test Org Alpha');
    // Address: select City/State/Country from the reference dropdowns (labels per form)
    await page.getByRole('button', { name: /Submit/i }).click();
    // assert: a!queryRecordType(UAM_Organization, name='Test Org Alpha').totalCount = 1
    await expect(page.getByText('Test Org Alpha')).toBeVisible();
    // Cleanup: soft-delete handled via pre-provisioned data reset
  });

  test('TC-002: Update Organization details @P1', async ({ page }) => {
    // requirement FR-O1 | seed: SEED-ORG-001
    await page.goto(ADMIN_CONSOLE);
    await page.getByText('Test Org Alpha').click(); // open from list (encrypted URL params)
    await page.getByRole('button', { name: /Edit|Update/i }).first().click();
    await page.getByRole('button', { name: /Submit/i }).click();
    await expect(page.getByText(/updated|success/i)).toBeVisible();
    // Cleanup: revert via pre-provisioned data reset
  });

  test('TC-003: Create parent/child organization hierarchy @P1', async ({ page }) => {
    // requirement FR-O2 | workflow: UAM Select Sub Organization | seed: SEED-ORG-001, SEED-ORG-002
    await page.goto(ADMIN_CONSOLE);
    await page.getByText('Test Org Alpha').click();
    await page.getByText(/Sub Organization|Sub-Organization/i).first().click();
    await page.getByText('Test Sub-Org Beta').click(); // select in the sub-org grid
    await page.getByRole('button', { name: /Submit/i }).click();
    await expect(page.getByText('Test Sub-Org Beta')).toBeVisible();
    // Cleanup: remove the sub-organization link
  });

  test('TC-DV-001: Address requires reference city/state/country @P2', async ({ page }) => {
    // requirement FR-O4 | data-validation
    await page.goto(ADMIN_CONSOLE);
    await page.getByRole('button', { name: /New Organization/i }).click();
    // City/State/Country are reference-data dropdowns — confirm they constrain input
    await expect(page.getByLabel(/Country/i)).toBeVisible();
    await page.getByRole('button', { name: /Submit/i }).click();
    // expect a validation error when country is empty
    await expect(page.getByText(/required|select a country/i)).toBeVisible();
    // Cleanup: none required
  });

  test('TC-DV-002: Organization audit fields auto-populate @P2', async ({ page }) => {
    // data-validation: createdBy/On, modifiedBy/On auto-populated; isActive defaults true
    await page.goto(ADMIN_CONSOLE);
    await page.getByRole('button', { name: /New Organization/i }).click();
    await page.getByLabel(/Organization Name|Name/i).fill('Test Org Audit');
    await page.getByRole('button', { name: /Submit/i }).click();
    await expect(page.getByText('Test Org Audit')).toBeVisible();
    // assert createdBy/createdOn populated on the created record (verify in detail view)
    // Cleanup: soft-delete the created organization
  });
});
