# Connected Systems

One connected system backs the entire application.

| System | Connector type | Protocol | Auth | Details |
|--------|----------------|----------|------|---------|
| UAM Data Source | MariaDB Data Source (`MariaDbConnectedSystem`) | JDBC / MariaDB | BASIC | URL `jdbc:mariadb://database:3306/UAMS`; username `UAMS.dsuser`; password `ENCRYPTED` (masked); max pool size default (100) |

Description: *"Data source of the entire application through connected system."* Visibility: hierarchy/indexable/searchable enabled, not advertised. Role map: `readers` → UAM Users group, `administrators` → UAM Administrators group.

> **Deprecation notice (from the XML):** Connecting to an Aurora MySQL database via a **MariaDB** Data Source connected system will not be supported in future Appian versions; Appian recommends the Aurora MySQL connected system with a `jdbc:mysql:aws:` URL. Flagged as a modernization item.

## Confidence & Evidence

- **Confidence:** High
- **Evidence:** Full connected-system XML (`repo/src/connectedSystem/`): template key `MariaDbConnectedSystem`, connection URL, username, `authType BASIC`, encrypted password, role map, deprecation notice.
- **Assumptions:** None material — this section is read directly from source XML (hence High despite absent intent summaries; it is structural, not intent-based).
