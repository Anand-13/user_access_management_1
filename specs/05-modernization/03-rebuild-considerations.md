# Modernization — Rebuild Considerations

What it would take to rebuild or migrate UAM elsewhere (Appian upgrade, another low-code platform, or custom).

## Capabilities to re-implement (6)
User lifecycle; organization management (incl. self-referencing parent/child hierarchy); team management; application & role governance; org membership mapping; and the **access request & approval workflow** with manager routing, email notifications, and an auditable event history. The approval workflow is the differentiator and the hardest to reproduce faithfully (manager resolution, grant/revoke symmetry, self-service bypass, rejection reasons, event history + reply threads).

## Data model to recreate (31 entities)
The `UAMS` relational schema: 11 core entities, ~6 junction tables (User↔Org, User↔Team↔Org, Org↔Team, Org↔Application, Application↔Role), the Task Request audit chain (request → event history → reply thread → subscriber, mirrored for team events), and reference tables (country/state/city/role). Preserve the self-referencing org hierarchy and the surrogate-`id` PK + FK relationships (52 relationships documented in [Relationships](../02-data-spec/04-relationships.md)).

## Integrations to re-establish
- One relational database connection (migrate MariaDB → Aurora MySQL per the deprecation notice).
- Outbound email for notifications.
- Optionally the organization-list Web API if external consumers depend on it.

## Security model to reproduce
Seven closed-membership groups; two-tier object security (admin/viewer) plus rule-based visibility for System Admin and Manager roles; manager authority scoped across the org hierarchy; the manager-gated Tasks surface.

## Deployment dependencies
See [Deployment Dependencies](../04-technology-spec/06-deployment-dependencies.md): DB tables must pre-exist for synced records; connected-system credentials and closed-group memberships are environment-specific.

## Effort signal
301 objects (104 interfaces, 38 process models, 77 rules) — a **medium-to-large** rebuild dominated by UI (interfaces) and workflow (process models). Consolidating duplicated approval variants and dropping practice objects first would meaningfully reduce the rebuild scope.

## Confidence & Evidence

- **Confidence:** Medium
- **Evidence:** Synthesis of the four other domains — capability inventory (`get_capabilities`), data model (31 records + 52 relationships), connected system, security groups, edge/deployment analysis.
- **Assumptions:** Rebuild-effort framing is directional, not an estimate. Assumes the DB schema can be exported from the current environment. No intent summaries.
