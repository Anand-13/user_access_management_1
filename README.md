# User Access Management (UAM)

User Access Management (UAM) is an Appian application that governs *who* can access *which* business applications across an enterprise. It maintains the organizational structure — organizations and their parent/child hierarchy, the teams within them, the applications and roles under governance, and the users themselves — and controls every access change through a manager-approved request workflow with full audit history. Users request access to a team, the team's manager approves or rejects, and access can later be revoked; each decision is emailed and captured in an auditable event trail. The application is delivered as a single Appian site with a dedicated manager approval inbox and is backed by a MariaDB database.

| Attribute          | Value                                                        |
|--------------------|--------------------------------------------------------------|
| Application Code   | `UAT_1`                                                      |
| Appian Prefix      | `UAM`                                                        |
| Platform           | Appian                                                       |
| Primary Site       | User Access Management Anand (`user-access-management-anand`) |
| URL Params         | Encrypted                                                    |
| Data Source        | MariaDB — UAM Data Source (`UAMS` database)                  |
| Authoritative Spec | [specs/application-spec.md](specs/application-spec.md)       |

---

## 1. What the Platform Does

- **Manages organizations** — creates and maintains organizations with addresses, contacts, and a parent/child organization hierarchy (sub-organizations).
- **Manages teams** — creates teams, maps them to organizations, assigns team roles, and links teams to applications.
- **Governs applications and roles** — registers business applications under governance and maps applications and application roles to organizations and teams.
- **Administers users** — creates, updates, activates, deactivates, and removes users, and manages their Appian group membership.
- **Maps membership** — assigns and unassigns users to organizations and teams.
- **Runs the access request workflow** — routes a user's team-access request to the team's manager for approval, grants team and application roles on approval, and supports the reverse revoke flow.
- **Notifies stakeholders** — emails managers when a request awaits approval and emails requesters when a request is approved, rejected, or revoked.
- **Captures an audit trail** — records every request event (submit, approve, reject, revoke) with threaded replies and subscribers.

See [specs/application-spec.md](specs/application-spec.md) for the complete specification (TOC) plus the 27 leaf files under `specs/0{1-5}-*/`.

---

## 2. Who Uses It

Access is governed by seven closed-membership security groups:

- **UAM System Admins** — highest-privilege configuration; the System Admin console.
- **UAM Administrators** — full create/update across organizations, teams, applications, users, and mappings; site administrator. Backs the majority of object-security assignments.
- **UAM managers** — approve or reject access requests; see the manager-gated Manager Tasks page; manage roles; self-grant/self-remove. Authority spans parent and child organizations.
- **UAM Users** — read application data and request team access; site viewer.
- **UAM Active User** — membership marker for activated accounts.
- **UAM Application User** — broad membership group for all application users.
- **UAM Process Model Alert Receivers** — a system group (not a human role) that receives process-exception alerts.

Object security is effectively two-tier (Administrators = edit, Users = view); the System Admin and Manager distinctions are enforced through expression-rule visibility (e.g. "Only Managers can see the Task") rather than object role maps.

---

## 3. Architecture at a Glance

UAM is a single-module application organized by **capability** rather than by naming-convention module prefixes. All capabilities share one data source and one site.

```
                         +-----------------------------+
                         |  MariaDB `UAMS` database     |
                         |  (UAM Data Source)           |
                         +--------------+--------------+
                                        |
                         +--------------+--------------+
                         |  31 synced Record Types      |   Data layer
                         +--------------+--------------+
                                        |
   +--------------+--------------+------+------+--------------+--------------+
   | Organization | Team         | Application | Org          | User         |
   | Management   | Management   | & Role Gov. | Membership   | Lifecycle    |   Capabilities
   +--------------+--------------+-------------+--------------+--------------+
                                        |
                         +--------------+--------------+
                         |  Access Request & Approval   |   Core workflow
                         |  (manager routing + email)   |
                         +--------------+--------------+
                                        |
                         +--------------+--------------+
                         |  Site: User Access Mgmt      |   Presentation
                         |  (Admin console / Manager     |
                         |   Tasks / Test pages)         |
                         +-----------------------------+
```

### Capability registry

| Capability | Responsibility |
|-----------|----------------|
| Access Request & Approval | Request/grant/revoke team access; manager approval; email + audit trail |
| Organization Management | Organizations, addresses, contacts, parent/child hierarchy |
| Team Management | Teams, team roles, org-team and team-application mapping |
| Application & Role Governance | Applications, application roles, application groups |
| Org Membership Mapping | User-to-organization and user-to-team assignment |
| User Lifecycle | Create/update/activate/deactivate/remove users; group membership |

---

## 4. Object Inventory (current export)

| Object class | Count |
|--------------|------:|
| Applications | 1 |
| Sites | 1 |
| Web APIs | 1 |
| Connected Systems | 1 |
| Groups | 7 |
| Record Types | 31 |
| Process Models | 38 |
| Interfaces | 104 |
| Expression Rules | 77 |
| Constants | 32 |
| Folders | 4 |
| Other / unclassified | 4 |
| **Knowledge-graph nodes** | **301** |
| **Knowledge-graph edges** | **1366** |
| Health findings | 0 |

---

## 5. Data Layer

The entire data layer is a single **MariaDB** database (`UAMS`) reached through the **UAM Data Source** connected system. All 31 record types are Appian **synced records** (`RecordsReplica`) that replicate from tables in this one schema — there is no secondary store.

Records fall into four families: **core entities** (User, Organization, Team, Application, Group, Task Request), **junction/mapping tables** (User Organization, User Team, Organization Team, Organization Application), the **task/event-history family** (Task Request/Team event history, reply threads, subscribers, event types), and **reference/lookup data** (Country, State, City, Ref Role, Task Status, Task Definition). Most core and reference tables have scheduled sync enabled; the event-history and reply-thread tables sync on demand.

The three highest-connectivity entities are **UAM Organization** (hub — address, contacts, hierarchy, memberships, ownership), **UAM Task Request** (the access-request record — status, definition, org, team, event history, subscribers), and **UAM User** (referenced across memberships and every event/audit record). The organization hierarchy is modeled with a self-referencing `UAM Organization Hierarchy Data` record (parent and child both point at Organization).

See [specs/02-data-spec/02-record-types.md](specs/02-data-spec/02-record-types.md) and [specs/02-data-spec/04-relationships.md](specs/02-data-spec/04-relationships.md).

---

## 6. External Integrations

| System | Purpose | Connection Pattern |
|--------|---------|--------------------|
| MariaDB `UAMS` database (UAM Data Source) | System of record for all 31 record types | JDBC / MariaDB connected system, BASIC auth (service account `UAMS.dsuser`, encrypted password) |
| Appian platform mail service | Manager and requester notifications | Outbound email via the Send Email process + email-body rules |
| `WebApiRequest?list` Web API | Exposes organization data to external HTTP callers | Appian Web API (organization list endpoint) |

Constraints: site URL parameters are encrypted; the Manager Tasks page is restricted to the managers group.

> Modernization note: the MariaDB Data Source connector carries Appian's deprecation notice for Aurora MySQL connections — migration to the Aurora MySQL connected system is recommended. See [specs/05-modernization/01-opportunities.md](specs/05-modernization/01-opportunities.md).

---

## 7. Installed Appian Plugins

No third-party Appian plugins or add-on connected systems are referenced. The only connected system is the built-in MariaDB Data Source; email uses the platform mail service.

---

## 8. Repository Contents

```
user_access_management_1/
  src/                        Raw Appian XML export (source of truth)
    application/              Application object + role map
    connectedSystem/          UAM Data Source (MariaDB)
    content/                  Interfaces, expression rules, constants
    group/                    Security groups
    processModel/             Process models
    recordType/               Record types (synced)
    site/                     UAM site definition
    webApi/                   Organization Web API
  specs/
    application-spec.md       Object-centric enterprise spec (TOC + 27 leaf files in 5 domains)
    01-business-spec/         Purpose, capabilities, roles, workflows, rules
    02-data-spec/             CDTs, record types, data stores, relationships, keys
    03-application-spec/      Sites, interfaces, forms, actions, processes, rules, constants, integrations
    04-technology-spec/       Connected systems, web APIs, groups, external systems, deps
    05-modernization/         Opportunities, risks & gaps, rebuild considerations
  docs/                       Delivery documents (FRD, User Manual)
  graphs/                     Committed knowledge-graph snapshot
  README.md                   This file
```

### Object Storage Convention

Source objects are stored as XML files named by their Appian UUID (e.g. `content/_a-0000ef9e-…_1328203.xml`). To find an object by name, grep its display name inside the relevant `src/<category>/` folder rather than guessing the filename.

### XML Wrapper Elements

| Object type | Root wrapper element |
|-------------|----------------------|
| Interface / Expression Rule / Constant | `<contentHaul>` |
| Process Model | `<processModelHaul>` |
| Record Type | `<recordTypeHaul>` |
| Connected System | `<connectedSystemHaul>` |
| Site | `<siteHaul>` |
| Group | `<groupHaul>` |

---

## 9. Naming Conventions

All objects are prefixed `UAM_` (or `UAM ` for records/groups). Object-type intent is encoded in the second segment:

| Pattern | Meaning | Example |
|---------|---------|---------|
| `UAM <Entity>` | Record type | `UAM Task Request` |
| `UAM_form* / UAM_formlayout_*` | Data-entry form | `UAM_form_createorUpdateOrganization` |
| `UAM_gridlayout_* / UAM_readonlygrid_*` | Grid / list view | `UAM_gridlayout_userTeamRequest` |
| `UAM_editablegrid_*` | Add/remove selection grid | `UAM_editablegrid_selectAndDeselectTeams` |
| `UAM_qry_* / UAM_qrc_*` | Query / constructor rule | `UAM_qry_getTeamDetails` |
| `UAM_constructor_* / UAM_consuctor_*` | Data-assembly rule | `UAM_constructor_setTeam` |
| `UAM_*generateEmailBodyFor*` | Notification body rule | `UAM_generateEmailBodyForReject` |
| `UAM_GRP_* / UAM_GROUP_*` | Group-reference constant | `UAM_GRP_MANAGERS` |
| `UAM_PM_* / UAM_RELATEDACTION_*` | Process-model pointer constant | `UAM_PM_USER_TEAM_REQUEST_APPROVAL_ACCESS` |
| `UAM_TXT_* / UAM_INT_REF_*` | Text/reference-value constant | `UAM_INT_REF_VALUE_ID_TASK_STATUS` |

Note: some objects carry spelling drift (`Definiation`, `consuctor`, `visiblity`, `Hichearcy`) — see modernization opportunities.

---

## 10. Documentation

- [specs/application-spec.md](specs/application-spec.md) — object-centric enterprise specification (28 files, 5 domains).
- [docs/uat_1-frd.md](docs/uat_1-frd.md) — Functional Requirements Document (business analysts / product owners).
- [docs/uat_1-user-manual.md](docs/uat_1-user-manual.md) — end-user User Manual.

No module design docs, assessment report, PIA, or SIA have been generated yet. Run `/assess UAT_1` for a best-practices assessment.

---

## 11. Key Constraints

- **Single data source.** All persistence depends on the MariaDB `UAMS` database; there is no secondary store or failover integration.
- **Deprecated connector.** The MariaDB Data Source is flagged by Appian as unsupported for Aurora MySQL connections in future versions — plan a migration to the Aurora MySQL connected system.
- **Closed-group membership.** All seven groups are `MEMBERPOLICY_CLOSED`; members are added only by group administrators (closed groups start empty on a fresh deploy).
- **Rule-based privilege gating.** System Admin and Manager surfaces are gated by expression-rule visibility, not object role maps — changes to those rules affect access control.
- **Segregation of duties (open item).** Manager self-service (self-grant/self-remove) exists; confirm a manager cannot approve their own request.
- **Non-production content.** A "Test" site page and practice interfaces/rules ship in the export and should be removed before production.
- **Synced records require pre-existing tables.** Deployment to a fresh environment needs the `UAMS` schema provisioned before record types will sync.

---

## 12. License

Proprietary — internal enterprise application. See the `src/` export metadata for platform and version details.
