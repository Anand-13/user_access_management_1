# Integration Objects

*Not applicable to this application.*

UAM defines **no Appian Integration objects** (HTTP/REST connectors). The knowledge graph contains no `Integration` nodes, and every capability reports zero integration members. All external interaction is via the single MariaDB connected system ([Connected Systems](01-connected-systems.md)) through synced records, plus platform email. The lone HTTP surface is the outward `WebApiRequest?list` Web API ([Web APIs](02-web-apis.md)), which is an *exposed* endpoint rather than an *outbound* integration object.

## Confidence & Evidence

- **Confidence:** Medium
- **Evidence:** `get_stats` (no Integration node type present), `get_capabilities` integrations = 0 everywhere.
- **Assumptions:** Absence in the graph = absence in the app. No intent summaries.
