# Web APIs

One Web API is defined.

| Web API | Description | Source |
|---------|-------------|--------|
| `WebApiRequest?list` | "organization web api" — exposes organization data as a list endpoint | `repo/src/webApi/6ca0597f-9f96-4956-8cc3-37748c3de560.xml` |

Based on its name (`?list`) and description, it is a read/list endpoint over organization data, reachable from the capability graph (it appears as a top-level capability entry point touching 17 record types via the org/team/user query rules). The specific HTTP method, URL alias, authentication, and the expression behind it were not expanded from the Web API XML.

## Confidence & Evidence

- **Confidence:** Low
- **Evidence:** 1 WebAPI node (`get_node`), its description and source file; `get_capabilities` shows it reaching 17 records / 25 interfaces / 22 rules.
- **Assumptions:** Endpoint method/auth/response shape inferred from the name; the Web API body SAIL was not expanded. No intent summaries.
