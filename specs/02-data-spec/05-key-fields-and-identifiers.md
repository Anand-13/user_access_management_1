# Key Fields & Identifiers

## Primary keys

Every UAM record type uses a surrogate integer primary key `id` (source column `ID`), consistent with Appian synced records over a relational schema. Confirmed on `UAM Task Request` (`id` → `ID`).

## Foreign keys (representative)

| Entity | Foreign keys |
|--------|--------------|
| UAM Task Request | taskDefinitionId → Task Definiation, taskStatusId → Task Status, orgid → Organization, taskRequestTeam → Team |
| UAM User Organization | user → User, organization → Organization |
| UAM User Team | user → User, team → Team, organization → Organization |
| UAM Organization Team | organization → Organization, team → Team |
| UAM Organization Address | organizationData → Organization, city/state/country → Ref City/State/Country |
| UAM Organization Hierarchy Data | parentorganizationData → Organization, childorganizationData → Organization |
| UAM Team Role | team → Team, group → Group |
| UAM Application Role | application → Application, group → Group |
| UAM Task Request Event History | taskRequest → Task Request, eventUser → User, eventType → Event Type, replyThread → Reply Thread |

## Audit / system fields

`UAM Task Request` (representative) carries standard audit fields: `createdBy`, `createdOn`, `modifiedBy`, `modifiedOn`, plus workflow fields `assignedBy`, `assignedOn`, `assignedTo`, `taskName`, `reasonForRejection`, `isActive`, and event-window fields (`minEventTimestamp`/`maxEventTimestamp` → Start/End Timestamp, `duration`). Organizations similarly carry `createdByUser` / `modifiedByUser` relationships.

## Natural / business keys

Business identifiers are names (organization name, team name, application name, username). The Appian system `User` record (`SYSTEM_RECORD_TYPE_USER`) is referenced by username across event-history, subscriber, and organization records.

## Confidence & Evidence

- **Confidence:** Medium
- **Evidence:** `get_object_details` on `UAM Task Request` (17 fields incl. `id`→`ID`, audit + rejection fields), 52 relationship rows (FK targets), `REFERENCES_RECORD_FIELD` edges (232).
- **Assumptions:** PK pattern (`id`) generalized from the sampled record; not every table's field list was expanded. No intent summaries.
