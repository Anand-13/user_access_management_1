# External Systems

| External system | What it is | Why UAM talks to it |
|-----------------|-----------|----------------------|
| MariaDB database `UAMS` | Relational database (MariaDB/Aurora-MySQL-compatible), host alias `database:3306` | The single system of record — all 31 record types replicate from its tables; every read/write flows here via the UAM Data Source connected system |
| Platform mail service | Appian outbound email | Sends manager notifications and approve/reject/revoke outcome emails |

No third-party APIs, identity providers, message queues, or file/document services are referenced. The application is self-contained around its own database, with the only outward HTTP surface being its `WebApiRequest?list` Web API.

## Confidence & Evidence

- **Confidence:** Medium
- **Evidence:** Connected-system XML (MariaDB `UAMS`), email-body rules + `UAM Send Email`, absence of other connected systems/integrations.
- **Assumptions:** Email attributed to the platform mail service (no SMTP connected system). Database host is an environment alias. No intent summaries.
