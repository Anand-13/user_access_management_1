# Data Stores

UAM has a **single backing data store**: the MariaDB database `UAMS`, reached through the **UAM Data Source** connected system.

| Data store | Type | Connection | Auth | Backs |
|-----------|------|-----------|------|-------|
| UAM Data Source | MariaDB (JDBC) | `jdbc:mariadb://database:3306/UAMS` | BASIC (user `UAMS.dsuser`, encrypted password) | All 31 record types (synced) |

All record types are Appian **synced records** (`RecordsReplica`) that replicate from tables in this one schema. There are no secondary data sources, no Appian Business Data Store (BDS) entities beyond the synced records, and no external service data stores — the application's entire persistence surface is this database.

> The connected-system XML carries a deprecation notice: connecting to Aurora MySQL via a **MariaDB** Data Source will not be supported in future Appian versions — a migration consideration (see [Modernization → Opportunities](../05-modernization/01-opportunities.md)).

## Confidence & Evidence

- **Confidence:** Medium
- **Evidence:** `repo/src/connectedSystem/` XML (`MariaDbConnectedSystem`, `connectionUrl jdbc:mariadb://database:3306/UAMS`, `username UAMS.dsuser`, `authType BASIC`), all record types `RecordsReplica`.
- **Assumptions:** The `database` host in the connection URL is an environment-internal alias; actual host resolved per environment. No intent summaries.
