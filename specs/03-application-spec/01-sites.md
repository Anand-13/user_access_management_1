# Sites

UAM is delivered as **one Appian Site**: *UAM User Access Management Anand* (URL stub `user-access-management-anand`), described as "Site for User Access Management System". Navigation is a top bar (`TOPBAR`, STYLE1) with uppercase page names and site branding driven by theme constants.

## Pages

| Page | URL stub | Visibility | Serves |
|------|----------|-----------|--------|
| User Access Management | `system-admin` | `fn!true()` (all) — page inputs `search`, `section` (URL-param encrypted) | Main admin console (organizations, teams, applications, users). Backs the System Admin capability. |
| Manager Tasks | `manager-tasks` | Gated by `isUserMemberOfGroup(loggedInUser(), <managers group>)` | Approver inbox — access-request approvals/rejections. Backs Access Request & Approval. |
| Test | `test` | `fn!true()` | Practice/test page (see Risks — non-production content). |

## Branding

Header background, selected-tab background, accent, and loading-bar colors are bound to constants (`UAM_TXT_SITE_*_COLOR`); the display name is expression-driven (`UAM_SITE_DISPLAY_NAME`). Rounded buttons, semi-rounded inputs, uppercase page/button labels, default favicon/logo. Tempo link hidden; record news shown.

## Role map

- `site_administrator` → UAM Administrators
- `site_viewer` → UAM Users

## Confidence & Evidence

- **Confidence:** Medium
- **Evidence:** `repo/src/site/` XML (1 site, 3 pages with URL stubs + visibility expressions, branding exprs, role map). The Manager Tasks visibility expression references the managers group UUID.
- **Assumptions:** Which specific interface each page renders (its `ContentFreeformRule` target) was not resolved to an object name. "Test" page treated as non-production. No intent summaries.
