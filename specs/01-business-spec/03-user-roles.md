# User Roles

UAM defines **seven security groups** (all `MEMBERPOLICY_CLOSED`, custom system-group type), which resolve into the following functional roles. Object security across the app is driven primarily by two of them (Administrators = editor, Users = viewer), while finer distinctions (System Admin, Manager) are enforced by expression-rule visibility.

| Role | Group | What they can do |
|------|-------|------------------|
| System Administrator | UAM System Admins | Highest-privilege configuration; the System Admin interaction/wrapper pages (`UAM_wrapper_systemAdmin`, `UAM_kpi_systemAdminInteractionPage`) target this group. Referenced via `UAM_GRP_SYSTEMADMIN`. |
| Administrator | UAM Administrators | Object-security "editor" — backs **79** `USES_GROUP` assignments. Full create/update across organizations, teams, applications, users, and role mappings; site administrator. |
| Manager | UAM managers | Approve/reject access requests; see the manager-gated **Manager Tasks** site page; manage roles; self-grant/self-remove. Referenced via `UAM_GRP_MANAGERS` and `UAM_GROUP_ORGANIZATION_MANAGERS`; authority spans parent and child organizations. |
| Viewer / General User | UAM Users | Object-security "viewer" — backs **78** `USES_GROUP` assignments. Read app data; request team access. Site viewer. |
| Active User | UAM Active User | Membership marker for activated accounts (`UAM_GROUP_ACTIVE_USER`). |
| Application User | UAM Application User | Broad membership group for all application users (`UAM_GROUP_ALL_APPLICATION_USERS`). |
| Alert Receiver (system) | UAM Process Model Alert Receivers | Not a human role — receives process-model exception alerts (`UAM_PROCESS_MODEL_ALERT_RECEVIERS`). |

**Role gating rules:** `UAM_qry_checkWhetherLoggedInUserIsManager`, `UAM_visiblityrule_managersTask` ("Only Managers can see the Task"), `UAM_setVisiblity_manageRolesForManagersAndAdmins`, and page-view rules (`UAM_QRY_setUserPageView`, `UAM_QRY_setTeamPageView`, `UAM_QRY_setApplicationPageView`) determine what each role sees. The **Manager Tasks** site page carries an `isUserMemberOfGroup` visibility expression gating it to the managers group.

## Confidence & Evidence

- **Confidence:** Medium
- **Evidence:** `repo/src/group/` (7 groups, all `MEMBERPOLICY_CLOSED`), `USES_GROUP` edge counts (Administrators 79, Users 78), site role map (`site_administrator` → Administrators, `site_viewer` → Users), manager-gated site page visibility expression, group-related constants and visibility expression rules.
- **Assumptions:** Membership is closed (managed externally / by admins); actual member lists were not enumerated. The System Admin vs Administrator distinction is inferred from constant/interface naming, not a confirmed permission matrix.
