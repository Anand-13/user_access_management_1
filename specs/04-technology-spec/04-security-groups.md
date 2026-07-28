# Security Groups

Seven security groups, all custom (`SYSTEM_GROUP_TYPE_CUSTOM`) with **closed membership** (`MEMBERPOLICY_CLOSED` — members added only by group admins, no self-join).

| Group | Role | Scope | Object security |
|-------|------|-------|-----------------|
| UAM System Admins | System administration | App-wide, highest tier | Referenced via `UAM_GRP_SYSTEMADMIN` |
| UAM Administrators | Editor / configuration | App-wide | Backs 79 `USES_GROUP` assignments; site_administrator; connected-system administrators |
| UAM managers | Approver | Parent + child organizations | `UAM_GRP_MANAGERS`; gates Manager Tasks page |
| UAM Users | Viewer | App-wide | Backs 78 `USES_GROUP` assignments; site_viewer; connected-system readers |
| UAM Active User | Membership marker | Activated accounts | `UAM_GROUP_ACTIVE_USER` |
| UAM Application User | General membership | All app users | `UAM_GROUP_ALL_APPLICATION_USERS` |
| UAM Process Model Alert Receivers | System (non-human) | Process exception alerts | `UAM_PROCESS_MODEL_ALERT_RECEVIERS` |

## Role map summary

| Object | Administrator role | Viewer role |
|--------|--------------------|-------------|
| Site | UAM Administrators | UAM Users |
| UAM Data Source (connected system) | UAM Administrators | UAM Users |

Object security is effectively two-tier (Administrators=edit, Users=view); the System Admin / Manager distinctions are enforced through **expression-rule visibility** (`UAM_visiblityrule_managersTask`, `UAM_setVisiblity_manageRolesForManagersAndAdmins`, page-view rules) rather than object role maps.

## Confidence & Evidence

- **Confidence:** Medium
- **Evidence:** `repo/src/group/` (7 groups, `MEMBERPOLICY_CLOSED`, custom type), site + connected-system role maps (Administrators/Users), `USES_GROUP` counts (79/78), group constants + visibility rules.
- **Assumptions:** Group member lists not enumerated; System Admin/Manager privilege boundaries inferred from constants/rules, not a formal permission matrix. No intent summaries.
