# Integrations

UAM's only integration is with its **own backing database** — there are **no third-party/REST integrations** (every capability reports 0 integration members in `get_capabilities`).

## Database integration (UAM Data Source)

All data access flows through synced record types over the MariaDB **UAM Data Source** connected system. Query expression rules (`UAM_qry_*`, `UAM_qrc_*`) read from these synced records; write paths use `a!writeRecords`-style persistence via process models and constructor rules (`UAM_consuctor_UserTeamData`, `UAM_constructor_setTeam`). The connection is used for:

- Organization / team / application / user CRUD.
- Access-request lifecycle (Task Request + event-history writes).
- Reference-data reads (city/state/country/role).

## Email notifications

Outbound email (via Appian's send-email node in `UAM Send Email` and the `generateEmailBodyFor*` rules) notifies managers of pending requests and users of approve/reject/revoke outcomes. This uses the platform mail service, not a configured external connected system.

## Web API

A single Web API (`WebApiRequest?list`, described "organization web api") exposes organization data — see [Web APIs](../04-technology-spec/02-web-apis.md). It is the one outward-facing HTTP surface.

## Confidence & Evidence

- **Confidence:** Medium
- **Evidence:** `get_capabilities` (integrations column = 0 across all entry points), connected-system XML (MariaDB), 1 WebAPI node, `UAM Send Email` process model + email-body rules.
- **Assumptions:** Email uses the platform default mail service (no SMTP connected system found). Persistence pattern inferred; write SAIL not expanded. No intent summaries.
