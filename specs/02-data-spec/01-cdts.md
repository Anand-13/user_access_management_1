# CDTs

*Not applicable to this application.*

The knowledge graph contains **no Custom Data Type (CDT / `DataType`) nodes** for UAM. The application's data layer is modeled entirely through **synced Record Types** sourced from the MariaDB `UAMS` database (see [Record Types](02-record-types.md)); expression rules pass data as record maps and dictionaries rather than typed CDTs.

## Confidence & Evidence

- **Confidence:** Medium
- **Evidence:** `get_stats` node-type breakdown lists no `DataType` nodes (0 of 301); all persistence is via 31 Record Types with `RecordsReplica` sources.
- **Assumptions:** Absence in the knowledge graph is taken as absence in the app. Inline dictionary/map structures used by constructor rules (e.g. `UAM_consuctor_UserTeamData`) are not CDTs.
