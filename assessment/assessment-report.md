# User Access Management Assessment Report

**Application:** User Access Management (UAT_1)
**Assessment Date:** 2026-07-28
**Assessed Against:** Appian Best Practices Guide (47 rules / 14 categories) + 17 anti-patterns + application spec
**Platform:** Appian

## Executive Summary

User Access Management is a well-structured, capability-organized Appian application: all 31 record types are data-synced from a single MariaDB source, security groups are correctly split into administrator/viewer tiers and kept closed, expression logic is heavily reused, and the knowledge graph is clean (0 orphan/dependency findings). The application is fundamentally sound.

The assessment surfaces **one CRITICAL performance issue** — an N+1 query pattern in the team grids (a per-row rule that runs three chained queries plus a per-group membership loop) — plus several MEDIUM hygiene items: missing mobile-stacking on most side-by-side layouts, a hardcoded user reference left in an interface, and non-production "practice"/test objects shipped in the export.

**Spec Compliance:** The application spec was reverse-engineered from this same source (`/build-spec`), so it reflects the as-built system rather than an independent contract — spec-vs-source drift is therefore near-zero by construction. The one substantive gap is **test coverage**: only 1 of 104 interfaces has generated test cases (~1%).

### Overall Score Summary

| # | Category | Findings | Score |
|---|----------|----------|-------|
| 1 | Application Config & Naming | Consistent prefix; spelling drift + non-prod objects | ⚠️ Needs Improvement |
| 2 | Security | Admin+Viewer groups, closed membership, encrypted creds | ✅ Compliant |
| 3 | Data Modeling | All synced; lookups present; camelCase fields | ✅ Compliant |
| 4 | Process Models | Alert routing present; topology sampled | ✅ Compliant (sampled) |
| 5 | Interface Performance | **N+1 per-row query in team grids** | ❌ Non-Compliant |
| 6 | Query Performance | Grids use recordData; no fetchTotalCount misuse | ✅ Compliant |
| 7 | Expression Best Practices | Strong reuse; 1 hardcoded user value | ⚠️ Needs Improvement |
| 8 | Anti-Pattern Scan | 1 CRITICAL (N+1), missing stackWhen | ❌ Non-Compliant |
| 9 | Connected Systems & Integrations | MariaDB JDBC, BASIC auth, encrypted password | ✅ Compliant |
| 10 | Site & Navigation | 3 pages, encrypted URL params; Test page in prod | ⚠️ Needs Improvement |
| 11 | Knowledge Graph Health | 0 findings; non-prod objects present | ✅ Compliant |
| 12 | SPEC-REQ — Requirements Coverage | As-built spec matches source | ✅ Compliant |
| 13 | SPEC-DATA — Domain Model | Entities/relationships match record types | ✅ Compliant |
| 14 | SPEC-WF — Workflows | Process models present per capability | ✅ Compliant |
| 15 | SPEC-SEC — Security Model | Groups/role maps match spec | ✅ Compliant |
| 16 | SPEC-BR — Business Rules | Status/definition constants traceable | ✅ Compliant |
| 17 | SPEC-INT — Integration | Single connected system documented | ✅ Compliant |
| 18 | SPEC-TEST — Test Coverage | 1/104 interfaces tested (~1%) | ⚠️ Needs Improvement |

---

## Detailed Findings

### 1. Application Configuration & Naming
**Status:** ⚠️ Needs Improvement

| Rule | Finding | Severity |
|------|---------|----------|
| NAME-001 | Consistent `UAM` prefix applied across all objects | ✅ (compliant) |
| NAME-002 | Recurring spelling errors in object/field names: `Definiation`, `consuctor`, `Hichearcy`, `visiblity` | LOW |
| NAME-002 | Interface names mix conventions (`UAM_gridlayout_*`, `UAM_form*`, `UAM_readonly_*`) — object-type-prefixed rather than PascalCase feature names | LOW |

**Recommendations:** Run a controlled rename pass to correct the misspellings (they hurt searchability and onboarding). Naming is otherwise consistent and self-documenting.

### 2. Security
**Status:** ✅ Compliant

| Rule | Finding | Severity |
|------|---------|----------|
| SEC-001 | Object security is two-tier (Administrators = edit, Users = view) | ✅ |
| SEC-002 | Application has both an Administrator group (`UAM Administrators`) and a Viewer group (`UAM Users`) | ✅ |
| SEC-004 | All 7 groups are `MEMBERPOLICY_CLOSED` | ✅ |
| SEC-005 | Layered security present, but System-Admin/Manager gating is enforced via **expression-rule visibility** (`UAM_visiblityrule_managersTask`, page-view rules) rather than object role maps | INFO |
| SEC-006 | Connected-system password stored `ENCRYPTED`; no sensitive-data logging observed | ✅ |

**Recommendations:** Confirm the rule-based visibility gating (Manager/System-Admin surfaces) is applied consistently, since it sits outside object security. Verify segregation of duties on manager self-service (see §14).

### 3. Data Modeling
**Status:** ✅ Compliant

| Rule | Finding | Severity |
|------|---------|----------|
| DATA-001 | All 31 record types are data-synced (`RecordsReplica`) from the MariaDB source | ✅ |
| DATA-002 | One business concept per record type; junction tables used for M:N | ✅ |
| DATA-003 | Lookup record types present for status, task-definition, role, and geography (country/state/city) | ✅ |
| DATA-004 | Field names are camelCase; `UAM Task Request` carries `createdBy/On`, `modifiedBy/On` audit fields, `id` primary key | ✅ |

**Recommendations:** None material. Correct the `Definiation`/`Hichearcy` misspellings on the affected record types during the naming pass.

### 4. Process Models
**Status:** ✅ Compliant (sampled)

| Rule | Finding | Severity |
|------|---------|----------|
| PROC-004 | No external (non-DB) integrations exist, so external-failure retry loops are not applicable | N/A |
| PROC-005 | Every non-trivial process routes exceptions to the `UAM Process Model Alert Receivers` group — a consistent alerting convention | ✅ |
| PROC-001/002/003 | Node topology (gateways, end events, size) was **not exhaustively grepped** across all 38 models | — (sampled) |

**Recommendations:** A focused pass grepping process XML for gateways/end-events would fully verify PROC-001/002. Consolidating the duplicated approval variants (`…Approval` vs `…Approval Recent`, `…Access` vs `…Access New`, revoke variants) would reduce model count and drift risk (see §5/§8).

### 5. Interface Performance
**Status:** ❌ Non-Compliant

| Rule | Finding | Severity |
|------|---------|----------|
| PERF-INT-002 | **N+1 per-row query.** `UAM_gridlayout_TeamNamesOnly`'s *Access Status* column calls `UAM_qry_togetRolesFromTeam` per rendered row; that rule runs **3 chained record queries** (Org Team → Team Role → Group) and then a `forEach` issuing one `a!isUserMemberOfGroup` per group. For M rows ≈ 3M queries + membership checks per evaluation. | **CRITICAL** |
| PERF-INT-001 | No `a!asyncVariable()` in use — acceptable here (no external/slow integrations; all data is synced records) | ✅ |
| PERF-INT-003/004 | No `a!selectionFields()`, no extra-long-text/real-time fields in grids observed | ✅ |

**Recommendations:** Hoist the group lookup out of the per-row column: query the full visible team set once into a `Map<teamId → groupIds>`, index it by row, and resolve the manager's group memberships once. Collapse `UAM_qry_togetRolesFromTeam`'s 3-query chain into a single relationship-based query. The `showWhen` gate (managers only) limits blast radius but doesn't remove the per-row cost. Check sibling grids that render the same Access Status tag.

### 6. Query Performance
**Status:** ✅ Compliant

| Rule | Finding | Severity |
|------|---------|----------|
| PERF-QRY-001 | Grids source data via `a!recordData()` over record types | ✅ |
| PERF-QRY-002 | No unnecessary `fetchTotalCount: true` found; records are synced (no cost) | ✅ |

**Note:** The per-row rule query in §5 is the real query-cost issue; it manifests at the interface layer rather than the grid data source.

### 7. Expression Best Practices
**Status:** ⚠️ Needs Improvement

| Rule | Finding | Severity |
|------|---------|----------|
| EXPR-001 | Extensive reuse — 77 expression rules for queries, constructors, email bodies, visibility | ✅ |
| EXPR-003 | **Hardcoded user** `touser("prabhakar")` embedded in `UAM_richtextdisplay_toShowTheOrgTeamRoles` — an environment-specific literal that will not resolve across environments | MEDIUM |
| EXPR-003 | Config values (groups, task statuses/definitions, button labels, site colors) are correctly externalized as constants | ✅ |
| EXPR-001 | Practice/learning rules (`UAM_qry_practiceQuestionsSet2..5`, `UAM_coding_functionKnowledge`) present in the application | LOW (hygiene) |

**Recommendations:** Remove the hardcoded `touser("prabhakar")` reference. Delete the practice expression rules before production.

### 8. Anti-Pattern Scan
**Status:** ❌ Non-Compliant

| Pattern | Severity | Object(s) | Detail |
|---------|----------|-----------|--------|
| Query Inside forEach (N+1) | **CRITICAL** | `UAM_gridlayout_TeamNamesOnly` (+ likely siblings rendering Access Status) | Per-row rule → 3 queries + per-group membership loop |
| Missing `stackWhen` on `sideBySideLayout` | WARNING | ~9 of 12 interfaces using `sideBySideLayout` (only `UAM_OrganizationTeamSummary` and two `columnsLayout` cases set `stackWhen`) | Side-by-side content will compress unreadably on mobile |
| Hardcoded value | WARNING | `UAM_richtextdisplay_toShowTheOrgTeamRoles` | `touser("prabhakar")` literal |
| Deprecated `a!queryEntity` | — | none | ✅ Not found — all queries use record types |
| Nested `forEach` | — | none material | ✅ No O(n·m) nested loops found |

**Recommendations:** Fix the N+1 (highest priority). Add `stackWhen: {"PHONE","TABLET_PORTRAIT"}` to the side-by-side layouts that render on user-facing pages. Remove the hardcoded user.

### 9. Connected Systems & Integrations
**Status:** ✅ Compliant

| Rule | Finding | Severity |
|------|---------|----------|
| INT-001 | Single MariaDB **JDBC** connected system (`UAM Data Source`) — appropriate protocol for a relational backing store. *Per KB INT-001, MariaDB is a supported JDBC connector and is NOT flagged as deprecated.* | ✅ |
| INT-001 (informational) | The connected-system XML carries Appian's own notice that connecting to **Aurora MySQL** specifically via a MariaDB Data Source will be unsupported in future versions — an app-specific migration note, not a generic deprecation | INFO |
| SEC-006 | Password stored `ENCRYPTED`; BASIC auth over an internal data-source host | ✅ |

**Recommendations:** If the underlying database is (or will become) Aurora MySQL, plan a migration to the Aurora MySQL connected system per the embedded notice. Otherwise no action.

### 10. Site & Navigation
**Status:** ⚠️ Needs Improvement

| Rule | Finding | Severity |
|------|---------|----------|
| PORTAL-004 | Single site, 3 top-level pages (≤ 8) | ✅ |
| — | Site URL parameters are encrypted (`areUrlParamsEncrypted: true`) | ✅ |
| UI-002 | Manager Tasks page correctly gated by `isUserMemberOfGroup(<managers>)` | ✅ |
| — | A **"Test" page** (`urlStub: test`, `visibilityExpr: fn!true()`) is shipped and visible to all users | MEDIUM (hygiene) |
| UI-003 | Responsive design undercut by the missing `stackWhen` gaps (see §8) | MEDIUM |

**Recommendations:** Remove the "Test" page before production. Address mobile stacking.

### 11. Knowledge Graph Health
**Status:** ✅ Compliant

| Finding | Category | Count |
|---------|----------|-------|
| Orphan objects | Health | 0 |
| Unreferenced objects | Health | 0 |
| Missing dependencies | Health | 0 |
| "Unknown"-typed nodes | Inventory | 4 |

**Recommendations:** The graph is well-connected. Investigate the 4 `Unknown`-typed nodes (likely the practice/test artifacts) and remove them with the non-production cleanup.

### 12–18. Spec Compliance
**Status:** ✅ Compliant (12–17), ⚠️ 18

The application spec (`repo/specs/`) was reverse-engineered from this source via `/build-spec`, so it is an **as-built** description: entities map 1:1 to record types (SPEC-DATA), capabilities map to process models/interfaces (SPEC-REQ/WF), the security model matches the group definitions (SPEC-SEC), policy values (task status/definition) are traceable to constants (SPEC-BR), and the single connected system is documented (SPEC-INT). Because the spec is descriptive rather than an independent contract, **spec-vs-source drift is near-zero by construction** — these categories pass but do not represent independent validation.

**SPEC-TEST (18) — ⚠️ Needs Improvement:** Only **1 of 104 interfaces** (`UAM_gridlayout_TeamNamesOnly`) has generated test cases (5 cases), and that suite currently has an unresolved navigation target (embedded child grid). Effective automated coverage is ~1%.

**Recommendations:** Author an independent requirements spec (via `/gather-requirements`) if a contractual baseline is needed. Expand test coverage to the core workflows — the access request/approval and org-hierarchy flows especially (`/generate-workflow-tests`).

---

## Summary of Recommendations

### High Priority
1. **[CRITICAL] Fix the N+1 query in `UAM_gridlayout_TeamNamesOnly`** (and any sibling grids rendering Access Status) — hoist the group lookup out of the per-row column; batch the membership check. This is the single biggest runtime risk.
2. **[MEDIUM] Remove the hardcoded `touser("prabhakar")`** in `UAM_richtextdisplay_toShowTheOrgTeamRoles`.
3. **[MEDIUM] Remove non-production content** before release — the "Test" site page, `UAM_practice_interface`, `UAM_exampleShuffleBetweenLists`, and the `UAM_qry_practiceQuestionsSet*` / `UAM_coding_functionKnowledge` rules and their category constants.

### Medium Priority
4. Add `stackWhen` to the ~9 side-by-side layouts lacking it, for mobile usability.
5. Confirm segregation of duties on manager self-service (`UAM_qry_selfCheckManager`) — can a manager approve their own request?
6. Expand automated test coverage beyond the single interface (workflow tests for grant/revoke/approval).

### Low Priority
7. Correct spelling drift in object/field names (`Definiation`, `consuctor`, `Hichearcy`, `visiblity`).
8. Consolidate duplicated approval process-model variants to reduce maintenance surface.
9. Investigate/remove the 4 `Unknown`-typed graph nodes.

---

## Compliance Matrix

| Rule ID | Rule Name | Status | Notes |
|---------|-----------|--------|-------|
| NAME-001 | Object naming prefix | ✅ | Consistent `UAM` prefix |
| NAME-002 | Consistent naming standards | ⚠️ | Spelling drift |
| SEC-001 | Minimal permission levels | ✅ | Admin/Viewer two-tier |
| SEC-002 | Application security groups | ✅ | Admin + Viewer present |
| SEC-004 | Keep groups closed | ✅ | All `MEMBERPOLICY_CLOSED` |
| SEC-005 | Layered security | ✅ (note) | Rule-based visibility for privileged surfaces |
| SEC-006 | Sensitive data in integrations | ✅ | Encrypted password; no logging |
| DATA-001 | Enable data sync | ✅ | All 31 records synced |
| DATA-002 | One record per concept | ✅ | Junctions for M:N |
| DATA-003 | Lookup record types | ✅ | Status/role/geo lookups |
| DATA-004 | Field naming conventions | ✅ | camelCase + audit fields |
| PROC-005 | Configure process alerts | ✅ | Alert-receiver group convention |
| PERF-INT-002 | Expensive work in local vars | ❌ | N+1 per-row query in grid |
| PERF-QRY-001 | Use record data for grids | ✅ | `a!recordData()` used |
| EXPR-001 | Reusable expression rules | ✅ | 77 rules, high reuse |
| EXPR-003 | Avoid hardcoded values | ⚠️ | Hardcoded `touser("prabhakar")` |
| INT-001 | Appropriate protocol | ✅ | MariaDB JDBC (not deprecated) |
| INT-003 | Require TLS 1.2+ | ✅ (n/a) | Internal JDBC data source |
| PORTAL-004 | Portal navigation | ✅ | 3 pages ≤ 8 |
| UI-003 | Responsive design | ⚠️ | Missing `stackWhen` |
| — | Query Inside forEach (N+1) | ❌ | CRITICAL anti-pattern |
| — | Missing `stackWhen` | ⚠️ | ~9 interfaces |
| — | Deprecated `a!queryEntity` | ✅ | None found |

---

## Appendix: Object Inventory

| Type | Count |
|------|------:|
| Application | 1 |
| Site | 1 |
| Web API | 1 |
| Connected System | 1 |
| Group | 7 |
| Record Type | 31 |
| Process Model | 38 |
| Interface | 104 |
| Expression Rule | 77 |
| Constant | 32 |
| Folder | 4 |
| Unknown | 4 |
| **Total nodes** | **301** |
| **Total edges** | **1366** |
| Health findings | 0 |

**Scan coverage:** Full SAIL scan via knowledge-graph `search_code` (queries, anti-patterns, layouts); full read of groups, connected system, and site XML; record-type sync + relationships from the graph and source. Process-model node topology (gateways/end events) was sampled, not exhaustively grepped across all 38 models — noted in Category 4.
