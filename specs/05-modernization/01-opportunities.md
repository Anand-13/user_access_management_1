# Modernization — Opportunities

| # | Opportunity | Benefit |
|---|-------------|---------|
| 1 | **Migrate off the deprecated MariaDB Data Source.** The connected-system XML carries Appian's own notice that MariaDB→Aurora MySQL connections will be unsupported in future versions. Move to the **Aurora MySQL connected system** (`jdbc:mysql:aws:` URL). | Removes a platform end-of-support risk before it forces an emergency migration. |
| 2 | **Consolidate the duplicated approval process models.** There are near-parallel `…Approval`, `…Approval Recent`, `…Access New`, `…Revoke`, `…Revoke New` variants. Refactor to a single parameterized grant/revoke flow. | Cuts maintenance surface (38 → fewer models), reduces drift between "new" and "old" variants. |
| 3 | **Remove practice / non-production objects** (`UAM_practice_interface`, `UAM_exampleShuffleBetweenLists`, `UAM_coding_functionKnowledge`, `UAM_qry_practiceQuestionsSet2..5`, `UAM_INT_REF_VALUE_ID_CATEGORY*`, the site "Test" page). | Shrinks the deployable, removes confusing developer scaffolding from a governance app, tightens security review. |
| 4 | **Formalize segregation of duties on self-service.** `Self Grant Access By PM` / `Self Removable By Manager` let a manager grant their own access; confirm and document whether a manager can approve their *own* request. | Closes a potential SoD gap in an access-governance system — the exact control auditors will look for. |
| 5 | **Add automated test coverage.** No test suite exists yet. Generate interface + workflow tests (`/build-test-spec`, `/generate-workflow-tests`) for the approval and org-hierarchy flows. | Protects the core approval logic against regressions during the refactors above. |
| 6 | **Fix naming/spelling drift** (`Definiation`, `consuctor`, `visiblity`, `Hichearcy`) via a controlled rename pass. | Improves maintainability and searchability; reduces onboarding friction. |

## Confidence & Evidence

- **Confidence:** Medium
- **Evidence:** Connected-system deprecation notice (source XML), duplicated process-model names (`get_capabilities`), practice objects in interface/rule/constant inventories, absence of a `repo/test/` suite, no assessment report yet.
- **Assumptions:** No `/assess` report was available to fold in anti-pattern findings — run `/assess UAT_1` to enrich this list. Opportunities are inferred from structure/names. No intent summaries.
