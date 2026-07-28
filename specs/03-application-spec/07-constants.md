# Constants

32 constants. Grouped by purpose; no secret values are stored in constants (credentials live in the connected system).

## Group references
| Constant | Purpose |
|----------|---------|
| `UAM_GRP_SYSTEMADMIN` | System Admins group |
| `UAM_GRP_MANAGERS` | Managers group |
| `UAM_GROUP_ORGANIZATION_MANAGERS` | Organization managers group |
| `UAM_GROUP_ACTIVE_USER` | Active-users group |
| `UAM_GROUP_ALL_APPLICATION_USERS` / `UAM_GRP_ALL_APPLICATION_USER_GROUP` | All-application-users group |
| `UAM_PROCESS_MODEL_ALERT_RECEVIERS` | Alert-receiver group for process exceptions |

## Reference-data enumerations
| Constant | Values |
|----------|--------|
| `UAM_INT_REF_VALUE_ID_TASK_STATUS` | In progress / Approved / Rejected / Cancelled |
| `UAM_INT_REF_VALUE_ID_TASK_DEFINITATION` | Team Access Add / Revoke Approval Task |
| `UAM_INT_REF_VALUE_ID_CATEGORY` | basic / medium / hard (practice) |
| `UAM_INT_REF_VALUE_ID_CATEGORY_SUB_CATEGORY` | Array/List, Conditional/Logic, Text… (practice) |

## Process-model pointers
`UAM_PM_USER_TEAM_REQUEST_APPROVAL_ACCESS(_NEW)`, `_APPROVAL_REVOKE`, `_REVOKE_ACCESS_NEW`, and the `UAM_RELATEDACTION_*` set (new org/team/app/user, activate/deactivate, update user) — pointers used by record/related actions to launch process models.

## UI action values & site
`UAM_TXT_BUTTON_VALUE_APPROVE/REJECT/CANCEL/SUBMIT`, `UAM_SAFELINK_BACK_TO_DASHBOARD`, `UAM_SITE_DISPLAY_NAME`, `UAM_TXT_SITE_ACCENT_COLOR`, `UAM_TXT_SITE_BACKGROUND_COLOR`, `UAM_TXT_SITE_LOADING_BAR_COLOR`, `UAM_TXT_SITE_PAGE_HIGHLIGHT_COLOR`, `UAM_TIME_FORMEXPECTION`.

## Confidence & Evidence

- **Confidence:** Medium
- **Evidence:** `list_nodes Constant` (32 with descriptions/values), `REFERENCES_CONSTANT` edge (1 explicit; most constants referenced via process-model config), site branding exprs binding to color constants.
- **Assumptions:** Some constants (CATEGORY / practice) belong to non-production practice content. Exact stored group UUIDs not expanded. No intent summaries.
