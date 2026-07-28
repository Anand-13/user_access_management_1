# Purpose

**User Access Management (UAM)** is an Appian application that governs *who* can access *what* across an enterprise. It maintains the organizational structure (organizations and their parent/child hierarchy), the teams within those organizations, the business applications and roles being governed, and the users who need access — then controls the granting and revoking of that access through a **manager-approved request workflow**.

In plain terms, UAM answers three questions for an organization:

1. **Who exists?** — Users, organizations (with addresses and contacts), teams, and the applications/roles under governance.
2. **How are they structured?** — Users belong to organizations and teams; organizations nest into parent/child hierarchies; teams map to applications and roles.
3. **Who is allowed to do what?** — A user requests access to a team; the team's manager approves or rejects; access can later be revoked. Every decision is emailed and captured in an auditable event history.

The application is delivered as a single Appian **Site** ("User Access Management Anand") with a dedicated **Manager Tasks** page for approvers, and is backed by a MariaDB database (the `UAMS` schema) through a connected system. It serves everyday users (who request access), managers (who approve), and administrators/system admins (who configure organizations, teams, applications, and users).

The object inventory (301 knowledge-graph nodes) is dominated by **104 interfaces** and **38 process models**, indicating a UI- and workflow-heavy administrative application rather than an integration hub — the only external system is its own backing database.

## Confidence & Evidence

- **Confidence:** Medium
- **Evidence:** Application manifest (`applicationName: User Access Management`), site definition (`repo/src/site/`, 3 pages incl. manager-gated Tasks), connected-system XML (MariaDB `UAMS`), 31 record types, 40 capability entry points from `get_capabilities`, record descriptions in the knowledge graph.
- **Assumptions:** Purpose is synthesized from object names, descriptions, and structure — **no precomputed intent summaries** were available (clone ran without `--summarize`), so business intent is inferred rather than confirmed from generated summaries. The customer's stated "why" (the pain this replaces) was not captured.
