# User Access Management — User Manual

*A practical guide for administrators, managers, and everyday users*

---

## 1. Welcome

User Access Management (UAM) is the tool your organization uses to control who can get into which business applications. It keeps track of your organizations, the teams inside them, the applications people need, and the users themselves — and it handles the whole process of requesting, approving, and removing access in one place.

This manual is written for everyone who touches the system: **administrators** who set up organizations, teams, applications, and users; **managers** who approve or reject access requests; and **everyday users** who request the access they need to do their jobs. You don't need any technical background — this guide walks you through each task step by step, using the actual page names and buttons you'll see on screen.

---

## 2. Getting Started

**To open User Access Management,** go to the site link your administrator gives you (its web address ends in `user-access-management-anand`) and sign in with your normal work credentials.

When you arrive, you'll land on the **User Access Management** home page. From here you can see organizations, teams, applications, and users, and start any of the common tasks using the quick-action buttons.

You'll know the app is working correctly if the home page loads with lists of organizations and teams, and the top navigation bar shows the pages available to you. If a page you expected is missing, that usually means your role doesn't include it — see [Roles & Permissions](#7-roles--permissions).

---

## 3. Navigation Guide

The app has a top navigation bar with these pages:

| Page | What it's for | When you'd visit it |
|------|---------------|---------------------|
| **User Access Management** | The main console — organizations, teams, applications, users, and quick actions | Day-to-day: to view records or start a create/update task |
| **Manager Tasks** | Your inbox of pending access-request approvals | If you're a manager: to approve or reject requests |
| **Test** | A practice/testing page | Not part of everyday work — you can ignore it |

*If you don't see the **Manager Tasks** page, you're not in the managers group — that page is only shown to managers.*

---

## 4. Working with Records

### Organizations

**What this is:** an organization is a business unit you manage in the system. It can have an address, contacts, and sub-organizations beneath it.

**Creating one:** from the home page, choose **New Organization**. Fill in the organization details, add the address (pick the city, state, and country from the drop-down lists), and enter contact details. Click **Submit** to save.

**Editing or viewing:** find the organization in the organizations list and open it. Administrators can edit all details; other users see a read-only summary of the organization, its sub-organizations, teams, users, and applications.

**Adding sub-organizations:** open an organization and use the select/deselect list to add or remove child organizations, building your organization hierarchy.

### Teams

**What this is:** a team is a group inside an organization that people request access to.

**Creating one:** choose **New Team**, enter the team name, and assign its roles. Click **Submit**.

**Editing or viewing:** open a team to see its roles, the applications it's linked to, and its members.

### Applications

**What this is:** an application is a business system whose access you're governing through UAM.

**Creating one:** choose **New Application**, enter the application name, and attach its group and roles. Click **Submit**.

**Editing or viewing:** open an application to see its roles and the organizations and teams it's mapped to.

### Users

**What this is:** a user is a person who can be granted access to teams and applications.

**Creating one:** choose **New User** and fill in the user's details. Click **Submit**.

**Activating or deactivating:** open a user and use the activate or deactivate action. Deactivating a user removes their active access; activating restores it.

*What happens behind the scenes:* creating or updating any of these records saves it immediately and makes it available across the app. Requesting team access (below) is the one action that starts an approval process.

---

## 5. Workflows

### Requesting access to a team

**When this happens:** when you need to join a team to use its applications.

**What you do:** from the console, select the organization and the team you need. Confirm your request. You don't need to know who approves it — the system figures out the right manager for you.

**What the system does:** it creates your request with the status **In progress** and emails the team's manager to let them know a request is waiting. You can track your request's status in the requests list.

**How long it usually takes:** the request itself is immediate; getting approved depends on how quickly the manager responds — usually minutes to a day.

### Approving or rejecting a request (managers)

**When this happens:** when someone requests access to a team you manage.

**What you do:** open the **Manager Tasks** page, select the pending request, and review who's asking and which team and roles are involved. Choose **Approve** or **Reject**. If you reject, you must enter a reason.

**What the system does:** on approval, the user is granted the team and its application roles, and they're emailed that they're approved. On rejection, they're emailed the reason. Either way, the decision is recorded in the request's history.

**How long it usually takes:** the decision takes effect immediately once you click Approve or Reject.

### Removing access (revoke)

**When this happens:** when a user no longer needs access to a team.

**What you do:** start a revoke request for the user and team. It goes to the team's manager the same way a grant request does; the manager approves or rejects it.

**What the system does:** on approval, the user's team access is removed and they're notified.

### Managers granting their own access

If you're a manager, you can grant or remove your **own** access to a team directly, without waiting for a separate approver, when the system confirms you're eligible.

---

## 6. Administration

These tasks are for administrators and system administrators only.

| Task | What it does | Who can use it |
|------|--------------|----------------|
| System Admin console | Central hub with organization/team/application/user views, KPIs, and quick actions | System Admins & Administrators |
| Create/update organizations, teams, applications, users | Set up and maintain the core records | Administrators |
| Map users/teams to organizations, applications/roles to teams | Build the access structure | Administrators |
| Activate/deactivate/remove users | Manage user accounts | Administrators |

Most users won't need this section — day-to-day work is requesting access and (for managers) approving it.

---

## 7. Roles & Permissions

| Role | Can see | Can create | Can edit | Can approve |
|------|---------|-----------|----------|-------------|
| System Admins | Everything, incl. the admin console | Everything | Everything | Yes |
| Administrators | Everything | Organizations, teams, applications, users, mappings | Yes | Yes |
| Managers | Their teams' requests + records | Access requests | Role assignments | **Yes** (their teams) |
| Users | Application records (read-only) | Their own access requests | — | — |

Your role is set by which group your administrator has added you to. If you can't do something you expect to, you're probably in a different group — ask your administrator.

---

## 8. Troubleshooting & FAQ

**I requested access and nothing happened — what should I check?**
Your request was likely created and is waiting on the manager. Find it in the requests list; if it shows **In progress**, the manager hasn't acted yet. Give it a little time or follow up with them.

**I can't see the Manager Tasks page my colleague mentioned — why?**
That page is only shown to members of the managers group. If you should be a manager, ask your administrator to add you to the correct group.

**I'm a manager but I don't see a request I was told about.**
Make sure the request is for a team you manage — approvals only appear for the manager of the requested team. If it's the wrong team, the request went to a different manager.

**When I reject a request, it won't submit.**
A rejection requires a reason. Enter a reason in the field provided, then submit again.

**I created a record but the address won't save.**
Make sure you selected the city, state, and country from the drop-down lists rather than typing them — the address fields use predefined reference values.

**I can't request a team — it's not available to pick.**
You may already have access to that team. The system hides teams you already hold so you can't request them twice.

**I got a notification email but I'm not sure what to do.**
If you're a manager, the email means a request is waiting — open **Manager Tasks** to act on it. If you're the requester, the email is telling you your request was approved or rejected.

**A page I use has disappeared.**
Page access follows your role. If your group membership changed, some pages may no longer be available. Your administrator can confirm and adjust your groups.
