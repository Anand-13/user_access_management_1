# Interfaces

UAM has **104 interfaces**, grouped below by the capability they serve. Naming conventions encode the UI pattern: `form_`/`formlayout_` = data-entry forms, `gridlayout_`/`readonlygrid_` = grids, `editablegrid_` = add/remove selection grids, `readonly_`/`view*` = summary views, `kpi_`/`stattile_`/`card*` = dashboards, `wrapper_` = page shells.

## Access Request & Approval
- **Approval:** `UAM_richtextdisplay_approvalInterface` (manager approval), `UAM_taskform_userApplicationRolesApproval`, `UAM_eventhistory_toUpdateForTheUser`, `UAM_gridlayout_userTeamRequest`.
- **Request/Revoke:** `UAM_formlayout_userTeamRemoveRequest`, `UAM_formlayout_dialogueBox` (manager confirm before joining), `UAM_formlayout_dialogueBox_Revoke_Access`, `UAM_startprocess_taskLink`.
- **Summaries:** `UAM_readonly_summaryDetails`, `UAM_readonly_teamSummaryDetails`, `UAM_Assigned_applicationRoles`, `UAM_readonlygrid_applicationRole`.

## Organization Management
- **Forms:** `UAM_form_createorUpdateOrganization`, `UAM_sectionlayout_CreateOrganizationDetails`, `UAM_sectionlayout_OrganizationAddressDetails`, `UAM_sectionlayout_organizationContactDetails`, `UAM_titlebarandrelatedaction_organization`.
- **Sub-orgs:** `UAM_editablegrid_selectAndDeselectSuborganization`, `UAM_formlayout_subOrganization`, `UAM_gridlayout_subOrganization(List)`, `UAM_view_mappedSuborganizations`, `UAM_columnlayout_summaryDetailsForSubOrganization`.
- **Views:** `UAM_cardgrid_OrganizationData`, `UAM_card_organization`, `UAM_readonlygrid_OrganizationData(NotForSystemAdmins)`, `UAM_gridlayout_toDisplayAllOrganizations`, `UAM_wrapper_organizationData`.

## Team Management
- `UAM_formlayout_createOrUpdateTeam`, `UAM_recordAction_createTeam`, `UAM_readonlygrid_teamDetails`, `UAM_columnlayout_teamDetails`, `UAM_gridlayout_TeamNamesOnly`, `UAM_gridlayout_TeamRole`, `UAM_editablegrid_selectAndDeselect(Team|Teams|TeamRoles|TeamUsers)`, `UAM_richtextdisplay_toDisplayCardLayoutForTeams`, `UAM_wrapper_teamData`.

## Application & Role Governance
- `UAM_formlayout_createorUpdateApplication`, `UAM_columnslayout_ApplicationInterface`, `UAM_readonlygrid_application(Details|GroupDetails|RolesOnly)`, `UAM_editablegridlayout_addOrRemoveApplication`, `UAM_selectable_applicationGroup`, `UAM_selectable_applicationRole`, `UAM_deselectable_applicationRole`, `UAM_dropdownfield_selectingTheRole`, `UAM_formlayout_assigningApplicationTeam`, `UAM_formlayout_deassigningApplicationTeam`, `UAM_wrapper_Application`, `UAM_viewonly_applicationgroup`.

## Org Membership Mapping
- `UAM_formlayout_organizationUser`, `UAM_formlayout_organizationTeam`, `UAM_formlayout_organizationApplication`, `UAM_viewlayout_organizationApplication`, `UAM_editablegrid_selectAndDeselectUsers`, `UAM_viewgridlayout_mappedOrganizationUser`, `UAM_formlayout_removeOrganization(User|Applications)`, `UAM_formlayout_removeOrgTeam`, `UAM_sectionlayout_addorRemoveTeam`.

## User Lifecycle
- `UAM_formlayout_createOrUpdateUser`, `UAM_textfield_createUser`, `UAM_formlayout_toactivateUser`, `UAM_formlayout_toDeactivateUser`, `UAM_togglefield_toCheckActiveOrInactive`, `UAM_gridlayout_userDetails`, `UAM_readonlygrid_getUserDetails`, `UAM_formlayout_removingUsers`.

## Dashboards & shells
- `UAM_kpi_todisplayKPI`, `UAM_kpi_systemAdminInteractionPage`, `UAM_stattile_organization`, `UAM_sectionlayout_quickActions`, `UAM_wrapper_systemAdmin`, `UAM_interface_dynamic_Interface` (renders per logged-in user), `UAM_richtextfield_backToDashboard` (shared across interfaces).

## Practice / non-production
- `UAM_practice_interface`, `UAM_exampleShuffleBetweenLists`, `UAM_formlayout_customerDetails` — appear to be developer practice interfaces (see Risks).

## Confidence & Evidence

- **Confidence:** Medium
- **Evidence:** `list_nodes Interface` (104 with descriptions), `get_capabilities` interface membership per entry point, naming-convention pattern inference.
- **Assumptions:** Pattern classification is from name prefixes + descriptions; individual SAIL bodies were not all expanded. No intent summaries.
