# Expression Rules

77 reusable expression rules, grouped by role. Naming: `qry_`/`qrc_` = queries/constructors, `constructor_`/`consuctor_` = data assembly, `generateEmailBodyFor*` = notification bodies, `set*`/`visiblity*` = UI/visibility, `qry_practice*`/`coding_` = practice/non-production.

## Query & fetch (data access)
`UAM_qry_getOrganizationNames`, `_getOrganizationTeamata`, `_getOrganizationUserData`, `_getOrganizationApplicationData`, `_getOrganizationHichearcyData`, `_getTeamDetails`, `_getTeamRoleDetails`, `_getGroupdetails`, `_getApplicationDetails(WithoutFilters)`, `_getApplicationandRoles`, `_getAppianGroupDetailsForTeams`, `_getUserTeamData`, `_getCity/State/CountryList`, `qrc_getOrganizationDetails`, `qrc_getTaskRequestDetails`, `qrc_getUserDetails`, `qrc_getTeamAccessRequestDetails`.

## Constructors (assemble write payloads)
`UAM_constructor_setTeam`, `_setTeamForRevoke`, `_mappingApplicationRole`, `UAM_consuctor_UserTeamData`, `_UserTeamDataForSystemAdmin`, `UAM_mapping_teamWithApplication`, `UAM_demapping_teamWithApplicationroles`, `UAM_mappingOrganizationApplication`.

## Access / manager logic
`UAM_getTeamManager`, `UAM_getUserID`, `UAM_qry_checkWhetherLoggedInUserIsManager`, `UAM_qry_selfCheckManager`, `UAM_determineTeamRequest(Revoke)`, `UAM_gettingTeamIdsbyTaskId`, `UAM_qry_togetRolesFromTeam`, `UAM_qry_getTeamAndRoleInformation`, `UAM_qry_excludeteamsToAlreadyAdd`.

## Lifecycle / mutation queries
`UAM_qry_activateTheUser`, `_deactivateTheUser`, `_assigningOrganizationUser`, `_removeOrganizationUser(Team)`, `_toRemoveTeamFromOrganization`, `_RemovingGroup`, `UAM_toRemoveOrganizationApplications`, `UAM_toRemoveOrganizationUserTeam`, `UAM_functionality_removeApplicationGroup`.

## Notifications
`UAM_requestaccess_generateEmailBodyForManager`, `UAM_revokeaccess_generateEmailBodyForManager`, `_generateEmailBodyForApprove`, `_generateEmailBodyForRejected`, `UAM_generateEmailBodyForReject`, `UAM_qry_urlForSite`.

## Visibility / UI
`UAM_QRY_setUserPageView`, `_setTeamPageView`, `_setApplicationPageView`, `UAM_qry_visiblityOfOrganization`, `UAM_visiblityrule_managersTask`, `UAM_setVisiblity_manageRolesForManagersAndAdmins`, `UAM_setUserName`, `UAM_setDateTime`, `UAM_setOrganizationHierarchy`, `UAM_indexing_theGroupnumber`, `UAM_stattile_organization`.

## Practice / non-production
`UAM_coding_functionKnowledge`, `UAM_qry_practiceQuestionsSet2`, `_Set2Conditional`, `_Set3Text`, `_Set4TdateAndTime`, `_Set5maths`, `UAM_qry_togetDetailsOfTask` — appear to be developer practice/learning rules (see Risks).

## Confidence & Evidence

- **Confidence:** Medium
- **Evidence:** `list_nodes ExpressionRule` (77 with descriptions), `CALLS` edges (544), capability membership.
- **Assumptions:** Grouping from names/descriptions; rule bodies not fully expanded. No intent summaries.
