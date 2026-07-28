# Actions

UAM exposes **record actions** (20 `REFERENCES_RECORD_ACTION` edges) and site quick-actions that launch the create/update/lifecycle process models. Related-action targets are declared as constants.

| Action | Launches (process model) | Constant |
|--------|--------------------------|----------|
| New Organization | UAM Create or Update Organization | `UAM_RELATEDACTION_NEW_ORGANIZATION` |
| New Team | UAM Create or Update Team | `UAM_RELATEDACTION_NEW_TEAM` |
| New Application | UAM Create Application | `UAM_RELATEDACTION_NEW_APPLICATION` |
| New / Update User | UAM Create Or Update User | `UAM_RELATEDACTION_UPDATE_USER_DETAILS` |
| Deactivate User | UAM Deactivate The User | `UAM_RELATEDACTION_DEACTIVIATE_USER` |
| Activate deactivated User | UAM Activate The User | `UAM_RELATEDACTION_ACTIVE_DEACTIVED_USERS` |
| Request/Approve Team Access | UAM User Team Request Approval Access (+New) | `UAM_PM_USER_TEAM_REQUEST_APPROVAL_ACCESS(_NEW)` |
| Revoke Team Access | UAM User Team Request Approval Revoke / Revoke Access New | `UAM_PM_USER_TEAM_REQUEST_APPROVAL_REVOKE`, `UAM_PM_USER_TEAM_REQUEST_REVOKE_ACCESS_NEW` |

Interfaces `UAM_recordAction_createTeam`, `UAM_titlebarandrelatedaction_organization`, and `UAM_sectionlayout_quickActions` surface these actions in the UI; `UAM_startprocess_taskLink` links into task-driven process starts.

## Confidence & Evidence

- **Confidence:** Medium
- **Evidence:** 20 `REFERENCES_RECORD_ACTION` edges, `UAM_RELATEDACTION_*` and `UAM_PM_*` process-model constants with descriptions, record-action interfaces.
- **Assumptions:** Action-to-record binding (which record type hosts each related action) inferred from constant descriptions + process-model names, not from expanded record-type action definitions. No intent summaries.
