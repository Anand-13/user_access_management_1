# Modernization — Risks & Gaps

| Risk | Severity | Affected objects | Recommendation |
|------|----------|------------------|----------------|
| Deprecated MariaDB Data Source connector | High | UAM Data Source + all 31 synced records | Migrate to Aurora MySQL connected system before Appian drops support |
| Non-production content shipped in a governance app | Medium | `UAM_practice_interface`, `UAM_exampleShuffleBetweenLists`, `UAM_coding_functionKnowledge`, `UAM_qry_practiceQuestionsSet2..5`, `UAM_INT_REF_VALUE_ID_CATEGORY*`, site "Test" page | Remove before production release |
| Possible self-approval (segregation of duties) | Medium | `Self Grant Access By PM`, `Self Removable By Manager`, `UAM_qry_selfCheckManager` | Verify a manager cannot approve their own request; enforce/​document the control |
| High-fan-in single points of failure | Medium | UAM managers/Administrators groups, Task Request record, `UAM_PROCESS_MODEL_ALERT_RECEVIERS` | Change carefully — many objects depend on these; add regression tests |
| Duplicated approval models risk logic drift | Medium | `…Approval` vs `…Approval Recent`, `…Access` vs `…Access New`, revoke variants | Consolidate to one parameterized flow |
| No automated tests | Medium | Entire app | Generate + run Playwright tests for approval/org flows |
| No application spec baseline before this run | Low (now resolved) | — | This spec establishes the baseline; keep it in sync via `/assess` |

## Health findings

The knowledge graph reports **no orphan / unreferenced / missing-dependency findings** (`get_findings` clean, `health_findings` empty) — structurally the graph is well-connected, so the risks above are design/lifecycle concerns rather than broken references.

## Confidence & Evidence

- **Confidence:** Medium
- **Evidence:** `get_findings` (0 issues), connected-system deprecation notice, practice objects in inventories, self-service process models + `selfCheckManager`, edge fan-in (managers/admins groups, Task Request).
- **Assumptions:** Severities are analyst-assigned (no `/assess` findings to import). Self-approval risk is unconfirmed pending SAIL review. No intent summaries.
