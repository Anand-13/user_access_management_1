# Deployment Dependencies

Deploying UAM to a fresh Appian environment requires the following, in order.

## Platform prerequisites
1. **MariaDB `UAMS` database** reachable at the environment's data-source host, with the UAM schema (31 tables) provisioned and the service account (`UAMS.dsuser`) granted access.
2. **UAM Data Source connected system** configured with the environment's connection URL + encrypted password (the password is not carried in the export — it must be re-entered per environment).
3. **Security groups** created and populated: UAM System Admins, Administrators, managers, Users, Active User, Application User, Process Model Alert Receivers.

## Object dependency order
1. Connected system → 2. Record types (synced; require the DB tables to exist) → 3. Constants (incl. group + process-model pointer constants) → 4. Expression rules → 5. Interfaces → 6. Process models → 7. Web API → 8. Site.

The `APPLICATION_CONTAINS` edges (300) plus `CALLS` (544), `REFERENCES_RECORD_TYPE` (103), and `USES_GROUP` (157) edges define a densely interconnected package — record types, constants, and the manager/admin groups are the highest-fan-in dependencies (single points of failure at deploy time).

## Environment-specific values to re-point
- Connected-system connection URL + credentials.
- Group memberships (closed groups start empty).
- Site URL stub / branding constants (optional).

## Confidence & Evidence

- **Confidence:** Medium
- **Evidence:** Edge inventory (`APPLICATION_CONTAINS` 300, `CALLS` 544, `REFERENCES_RECORD_TYPE` 103, `USES_GROUP` 157), connected-system XML (per-env password), synced-record dependency on DB tables, group definitions.
- **Assumptions:** DDL for the 31 tables assumed to exist externally (synced records need pre-existing tables). Standard Appian object dependency order applied. No intent summaries.
