# Forms

The data-entry (write-path) interfaces in UAM — the subset of the 104 interfaces that create or update records.

| Form | Creates/Updates | Notes |
|------|-----------------|-------|
| `UAM_form_createorUpdateOrganization` | Organization (+ address, contact sections) | Multi-section form; city/state/country dropdowns from reference data |
| `UAM_sectionlayout_CreateOrganizationDetails` | Organization core | Section of the org form |
| `UAM_sectionlayout_OrganizationAddressDetails` | Organization Address | City/State/Country reference lookups |
| `UAM_sectionlayout_organizationContactDetails` | Organization Contact Details | |
| `UAM_formlayout_createOrUpdateTeam` | Team | |
| `UAM_formlayout_createOrUpdateUser` / `UAM_textfield_createUser` | User | |
| `UAM_formlayout_createorUpdateApplication` | Application | |
| `UAM_formlayout_organizationUser` | User Organization (assign user to org) | |
| `UAM_formlayout_organizationTeam` | Organization Team (assign team to org) | |
| `UAM_formlayout_organizationApplication` | Organization Application | |
| `UAM_formlayout_assigningApplicationTeam` / `_deassigningApplicationTeam` | Team ↔ Application mapping | |
| `UAM_formlayout_toactivateUser` / `_toDeactivateUser` | User.isActive | Activation/deactivation |
| `UAM_formlayout_userTeamRemoveRequest` | Task Request (revoke) | User-initiated revoke |
| `UAM_formlayout_dialogueBox` / `_Revoke_Access` | Confirm dialog (manager) | Pre-join / pre-remove confirmation |
| `UAM_formlayout_removeOrganization(User\|Applications)`, `_removeOrgTeam`, `_removingUsers`, `_removingApplicationGroup` | Remove mappings | Delete-path forms |

## Validations

Validation logic (required fields, format checks) is embedded in interface SAIL and enforced by rules such as `UAM_qry_excludeteamsToAlreadyAdd` (prevent duplicate team requests) and reference-data dropdowns constraining city/state/country/role selection. A **Reason For Rejection** is required on the approval-reject path.

## Confidence & Evidence

- **Confidence:** Low
- **Evidence:** Interface names/descriptions indicating write paths; record write targets inferred from process-model record references.
- **Assumptions:** Field-level validation rules were not read from SAIL (no intent summaries; `intentSummary.validations` unavailable). Form→record mapping inferred from names. Confidence is Low because write-path specifics rest on naming rather than expanded SAIL.
