# Workflows & Decisions

38 process models implement UAM's workflows, grouped below by capability. No intent summaries were available, so behavior is derived from process-model names, their called rules/constants, and record references.

## Access Request & Approval (the core workflow)

**Grant path:**
1. `UAM Initiate User Team Access` (or `…New`) — user selects an organization/team; `UAM_getTeamManager` resolves the approver; `UAM_constructor_setTeam` assembles the request; `UAM_requestaccess_generateEmailBodyForManager` emails the manager. A **Task Request** is created with status *In Progress* and task definition *Team Access Add Approval Task*.
2. `UAM User Team Request Access Approval` (or `…Recent`) — manager task. **Decision point:** Approve (`UAM_TXT_BUTTON_VALUE_APPROVE`) vs Reject (`UAM_TXT_BUTTON_VALUE_REJECT`). Approve → grant User Team + application roles (`UAM_consuctor_UserTeamData`), email approval (`UAM_revokeaccess_generateEmailBodyForApprove`); Reject → capture reason, email rejection (`UAM_generateEmailBodyForReject`).

**Revoke path:** `UAM Initiate User Team Revoke` (+`New`) → `UAM User Team Request Access Revoke` (+`New`), task definition *Team Access Revoke Approval Task*; removes the User Team (`UAM_toRemoveOrganizationUserTeam`).

**Manager self-service (bypass):** `UAM Self Grant Access By PM` and `UAM Self Removable By Manager` — a manager grants/removes their own access without a separate approval, gated by `UAM_qry_selfCheckManager`.

## Organization Management
- `UAM Create or Update Organization` — create/update org + address + contacts.
- `UAM Select Sub Organization` / `UAM Remove Sub Organization` / `UAM Selecting Or Deselecting Sub Organizations` — build/maintain the parent-child hierarchy (`UAM_setOrganizationHierarchy`).

## Team & Membership Management
- `UAM Create or Update Team`, `UAM Map Org Team`, `UAM Remove Mapped Organization Team`.
- `UAM Mapping/Unmapping Organization User`, `UAM Selecting Or Deselecting Org Users/Teams/Team Roles`.

## Application & Role Governance
- `UAM Create Application`, `UAM Application Group`, `UAM Remove Application Group`.
- `UAM Organization Application`, `UAM Remove Organization Application`, `UAM Team Application`, `UAM Remove Team Application Roles`, `UAM Selecting Or Deselecting Org Applications/Team Roles`.

## User Lifecycle
- `UAM Create Or Update User`, `UAM Activate The User`, `UAM Deactivate The User`, `UAM Remove User`, `UAM Add/Remove User To Group`.

## Cross-cutting
- `UAM Send Email` — reusable notification subprocess used across the grant/revoke flows; on exception, alerts route to `UAM Process Model Alert Receivers`.

## Key decision points

| Decision | Where | Outcomes |
|----------|-------|----------|
| Approve vs Reject access | Approval process models | Grant (User Team + roles) / Reject (reason captured) |
| Task type | Task Definition constant | Add Approval / Revoke Approval |
| Task status | Task Status constant | In progress / Approved / Rejected / Cancelled |
| Is requester a manager? | `UAM_qry_selfCheckManager` | Self-service bypass vs standard approval |
| Is logged-in user a manager? | `UAM_qry_checkWhetherLoggedInUserIsManager` | Manager Tasks visibility |

## Confidence & Evidence

- **Confidence:** Medium
- **Evidence:** 38 ProcessModel nodes with descriptions, `get_capabilities` member rules/constants, approval process-model outgoing edges (Approve/Reject constants, email-body rules, Task Request record), Task Status / Task Definition constant values.
- **Assumptions:** Internal node graphs (gateways, exact START→END sequences, error handling) were not parsed from process-model XML; flows are reconstructed from called objects and names. No intent summaries.
