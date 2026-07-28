# Capabilities

UAM's 40 capability entry points (from `get_capabilities`) group into **six business capabilities**. Interfaces, rules, and records are organized below under the capability they serve rather than as flat type lists.

| Capability | Primary Entry Points | Interfaces | Records touched | Confidence |
|-----------|----------------------|-----------|-----------------|------------|
| Access Request & Approval | Initiate User Team Access/Revoke (+New), User Team Request Access Approval/Revoke (+Recent/New), Self Grant Access By PM, Self Removable By Manager | ~26 | Task Request, User Team, Team, Application Role, User | Medium |
| Organization Management | Create or Update Organization, Select/Remove Sub Organization, Selecting/Deselecting Sub Organizations | ~29 | Organization, Org Address, Org Contact, Org Hierarchy | Medium |
| Team Management | Create or Update Team, Map Org Team, Remove Mapped Organization Team, Selecting/Deselecting Org Teams/Team Roles | ~7 | Team, Team Role, Organization Team, Group | Medium |
| Application & Role Governance | Create Application, Application Group, Remove Application Group, Organization Application, Remove Organization Application, Remove Team Application Roles | ~6 | Application, Application Role, Group, Organization Application | Medium |
| Org Membership Mapping | Mapping/Unmapping Organization User, Selecting/Deselecting Org Users | ~2 | User Organization, User, Organization | Medium |
| User Lifecycle | Create Or Update User, Activate/Deactivate The User, Remove User, Add/Remove User To Group | ~2 | User, Group | Medium |

## Access Request & Approval

The application's spine. A user requests to join a team (`Initiate User Team Access`); the system resolves the team's manager (`UAM_getTeamManager`), emails them (`UAM_requestaccess_generateEmailBodyForManager`), and creates a **Task Request** with status *In Progress*. The manager approves or rejects on `UAM_richtextdisplay_approvalInterface` / `UAM_taskform_userApplicationRolesApproval`; approval grants the team/role, rejection captures a reason. A parallel revoke flow (`Initiate User Team Revoke`, `User Team Request Access Revoke`) removes access. Managers who are themselves the requester can bypass approval via `Self Grant Access By PM` / `Self Removable By Manager`.

## Organization Management

Create/update organizations with address and contact details (`UAM_form_createorUpdateOrganization` + section layouts), and build a **parent/child organization hierarchy** (`UAM_setOrganizationHierarchy`, `Select/Remove Sub Organization`). The `UAM Organization Hierarchy Data` record self-references organizations to model the tree.

## Team Management

Create/update teams (`UAM_formlayout_createOrUpdateTeam`), map teams to organizations (`Map Org Team`), assign team roles (`Selecting Or Deselecting Team Roles`), and associate teams with applications (`Team Application`).

## Application & Role Governance

Register business applications (`Create Application`), attach application groups (`Application Group`), and map applications + roles to organizations and teams (`Organization Application`, `Remove Team Application Roles`). This is what a granted access ultimately points at.

## Org Membership Mapping

Assign and unassign users to organizations (`Mapping/Unmapping Organization User`, `UAM_qry_assigningOrganizationUser`) via the `UAM User Organization` junction.

## User Lifecycle

Create/update users (`UAM_formlayout_createOrUpdateUser`), activate/deactivate accounts (`UAM_qry_activateTheUser` / `UAM_qry_deactivateTheUser`), remove users, and manage Appian group membership (`Add/Remove User To Group`).

## Confidence & Evidence

- **Confidence:** Medium
- **Evidence:** `get_capabilities` (40 entry points with member interfaces/rules/records), process-model + interface + expression-rule inventories, object descriptions in the knowledge graph.
- **Assumptions:** Capability groupings are inferred from naming conventions and reachability, not from intent summaries. Interface counts are approximate (interfaces are shared across many capabilities).
