# Relationships

52 record relationships connect UAM's entities. The model centers on **Organization** (hub), the **User↔Team↔Organization** access triangle, and the **Task Request** audit chain.

## Organization hub

| From | To | Cardinality | Name |
|------|----|-------------|------|
| Organization | Organization Address | 1→M | organizationAddress |
| Organization | Organization Contact Details | 1→M | organizationContactDetails |
| Organization | User Organization | 1→M | userOrganization |
| Organization | Organization Hierarchy Data | 1→M | organizationHierarchyData / …2 |
| Organization | User (system) | M→1 | projectManagerUser / createdByUser / modifiedByUser |
| Organization Address | Ref City / Ref State / Ref Country | M→1 | organizationCity / State / Country |
| Organization Hierarchy Data | Organization (parent) & Organization (child) | M→1 each | parentorganizationData / childorganizationData |

The self-referencing hierarchy (parent + child both point at Organization) models the org tree.

## Access triangle

| From | To | Cardinality | Name |
|------|----|-------------|------|
| User | User Organization | 1→M | userOrganization |
| User Organization | Organization / User | M→1 | organization / user |
| User Team | User / Team / Organization | M→1 each | user / team / organization |
| Organization Team | Organization / Team | M→1 each | organization / team |
| Team | Team Role | 1→M | teamRole |
| Team Role | Team / Group | M→1 each | team / group |
| Application Role | Application / Group | M→1 each | application / group |
| Group | Ref Role | M→1 | refRole |

## Task Request audit chain

| From | To | Cardinality | Name |
|------|----|-------------|------|
| Task Request | Task Definiation / Task Status / Organization | M→1 | taskDefiniation / taskStatus / organization |
| Task Request | Team | M→1 | taskRequestTeam |
| Task Request | Task Request Event History | 1→M | eventHistory |
| Task Request | Task Request Subscriber | 1→M | subscriber |
| Task Request Event History | Task Request / User / Event Type / Reply Thread | M→1 / 1→M | taskRequest / eventUser / eventType / replyThread |
| Task Request Reply Thread | Event History / User | M→1 | eventHistory / replyUser |
| Task Team Event History | Team / User / Event Type / Reply Thread | — | (parallel structure for team events) |

## Confidence & Evidence

- **Confidence:** Medium
- **Evidence:** 52 `relationship` rows in `object_details` (target record UUIDs + relationship types), matching `REFERENCES_RECORD_RELATIONSHIP` edges (9) and record descriptions.
- **Assumptions:** Cardinalities are read from the relationship type in the details JSON (MANY_TO_ONE / ONE_TO_MANY) where present; a few were inferred from junction-table semantics. No intent summaries.
