# Business Rules

UAM's business rules are expressed as (a) reference-data constants that encode enumerations and policy values, and (b) expression rules that enforce validation, visibility, and access logic.

## Policy / enumeration values (constants)

| Constant | Enforces / encodes | Values |
|----------|-------------------|--------|
| `UAM_INT_REF_VALUE_ID_TASK_STATUS` | Access-request lifecycle states | In progress, Approved, Rejected, Cancelled |
| `UAM_INT_REF_VALUE_ID_TASK_DEFINITATION` | Approval task types | Team Access Add Approval Task, Team Access Revoke Approval Task |
| `UAM_TXT_BUTTON_VALUE_APPROVE` / `_REJECT` / `_CANCEL` / `_SUBMIT` | Canonical action button values | Approve / Reject / Cancel / Submit |
| `UAM_GRP_MANAGERS`, `UAM_GRP_SYSTEMADMIN`, `UAM_GROUP_ORGANIZATION_MANAGERS`, `UAM_GROUP_ACTIVE_USER`, `UAM_GROUP_ALL_APPLICATION_USERS` | Group-membership policy anchors | Appian group references |
| `UAM_TIME_FORMEXPECTION` | Form timeout window | Time value |
| `UAM_SITE_DISPLAY_NAME`, `UAM_TXT_SITE_*_COLOR` | Site branding | Display name + theme colors |

## Rule-enforced logic (expression rules)

| Rule | Enforces | Where used |
|------|----------|-----------|
| `UAM_getTeamManager` | Approval routes to the team's manager | Initiate Access/Revoke, Approval flows |
| `UAM_qry_checkWhetherLoggedInUserIsManager` | Only managers act on approval tasks | Manager task visibility |
| `UAM_qry_selfCheckManager` | Manager self-service bypass eligibility | Self Grant/Removable |
| `UAM_visiblityrule_managersTask` | "Only Managers can see the Task" | Manager Tasks page/interfaces |
| `UAM_setVisiblity_manageRolesForManagersAndAdmins` | Role-management action visible only to Managers & Admins | Role management |
| `UAM_qry_visiblityOfOrganization` | Organization record visibility | Org pages |
| `UAM_QRY_setUserPageView` / `setTeamPageView` / `setApplicationPageView` | Per-page record visibility | User/Team/Application pages |
| `UAM_determineTeamRequest` / `UAM_determineTeamRequestRevoke` | Distinguish add vs revoke requests | Access request flows |
| `UAM_qry_excludeteamsToAlreadyAdd` | Prevent requesting teams already held | Team selection |

## Rejection rule

A rejected request must record a **Reason For Rejection** (`UAM Task Request.reasonForRejection` field + `UAM_generateEmailBodyForReject`) — rejections cannot be silent.

## Confidence & Evidence

- **Confidence:** Medium
- **Evidence:** 32 constants with descriptions/values, 77 expression rules with descriptions, Task Request `reasonForRejection` field, approval process-model edges.
- **Assumptions:** Validation specifics (field-level required/format rules) live inside interface SAIL that was not fully expanded; rules are mapped from names/descriptions. No intent summaries meant validation lists could not be read from `intentSummary.validations`.
