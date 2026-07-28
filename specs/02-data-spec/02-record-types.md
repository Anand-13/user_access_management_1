# Record Types

UAM defines **31 record types**, all **synced** (Appian `RecordsReplica`) from the MariaDB `UAMS` database via the *UAM Data Source* connected system. They fall into four groups: core entities, junction/mapping tables, task/event-history tables, and reference (lookup) data.

## Core entities

| Record Type | Purpose | Scheduled sync (`activated`) |
|-------------|---------|------------------------------|
| UAM User | System users | true |
| UAM Organization | Organizations (with PM, created/modified-by) | true |
| UAM Organization Address | Org postal address (city/state/country FKs) | true |
| UAM Organization Contact Details | Org contacts | true |
| UAM Organization Hierarchy Data | Parent↔child org relationships (self-ref) | true |
| UAM Team | Teams | true |
| UAM Team Role | Roles within a team (→ group) | true |
| UAM Application | Governed business applications | true |
| UAM Application Role | Application ↔ role/group mapping | true |
| UAM Group | App-managed groups (→ refRole) | true |
| UAM Task Request | Access-request records (status/definition/org/team) | true |

## Junction / mapping tables

| Record Type | Associates |
|-------------|-----------|
| UAM User Organization | User ↔ Organization |
| UAM User Team | User ↔ Team ↔ Organization |
| UAM Organization Team | Organization ↔ Team |
| UAM Organization Application | Organization ↔ Application |
| UAM Team Manage | Team management associations |
| UAM Organization Team (mapping) | Org-team membership |

## Task / event-history tables

| Record Type | Purpose | `activated` |
|-------------|---------|-------------|
| UAM Task Request Event History | Business events on a Task Request | false |
| UAM Task Request Event Type | Event-type lookup | false |
| UAM Task Request Reply Thread | Threaded replies on request events | false |
| UAM Task Request Subscriber | Users subscribed to request events | false |
| UAM Task Team Event History | Business events on a Task Team | false |
| UAM Task Team Event Type | Event-type lookup | false |
| UAM Task Team Reply Thread | Threaded replies on team events | false |
| UAM Task Team Subscriber | Users subscribed to team events | false |
| UAM Task Status | Status lookup | true |
| UAM Task Definiation | Task-definition lookup | true |

## Reference (lookup) data

| Record Type | Purpose |
|-------------|---------|
| UAM Ref Country / UAM Ref State / UAM Ref City | Geographic reference data |
| UAM Ref Role | Role reference values |
| UAM Feedback Category | Feedback categories |

> **Sync note:** `activated=true` means a *scheduled* refresh is enabled (most core + reference tables); the event-history / reply-thread / subscriber / event-type tables have `activated=false` (synced on demand, not on a schedule). All 31 are `RecordsReplica` (synced records), not source-backed queries.

## Confidence & Evidence

- **Confidence:** Medium
- **Evidence:** `list_nodes RecordType` (31 with descriptions), `get_app_source recordType` grep showing `a:source xsi:type="a:RecordsReplica"` + `<activated>` per file, connected-system XML (MariaDB `UAMS`).
- **Assumptions:** Table-to-record mapping and per-field types were not fully expanded; grouping is by name/description. Two org-team entries reflect naming overlap in the export.
