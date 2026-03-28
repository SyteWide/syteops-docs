---
sidebar_position: 11
title: Roles & Automation Variables
description: How custom roles become live FlowMattic aggregator variables that update without workflow editing.
---

# Roles & Automation Variables

One of the most powerful patterns in SyteOps is the relationship between custom roles and FlowMattic automation. When you define roles and assign users, SyteOps automatically generates and maintains FlowMattic aggregator variables for each role — so your workflows always know who the Managers, Assistants, Reviewers, or any other role are, without you ever touching a workflow definition.

## How It Works

1. Create a custom role in SyteOps (e.g., "Project Manager")
2. Assign users to that role
3. SyteOps generates FlowMattic variables for the role automatically
4. Use those variables in FlowMattic workflows
5. When team membership changes — SyteOps updates the variables. Workflows need no changes.

## FlowMattic Variables Generated Per Role

For each custom role, SyteOps creates and maintains:

| Variable | Contains |
|---|---|
| `syteops_std_systm_contact_{slug}_all_names` | Comma-separated display names of all users in the role |
| `syteops_std_systm_contact_{slug}_all_emails` | Comma-separated email addresses of all users in the role |
| `syteops_std_systm_contact_{slug}_slack` | Slack aggregator for direct notification routing |
| `syteops_user_NNN_is_{slug}` | Per-user boolean: whether user 001–020 holds this role |

These are generated and synced automatically. You reference them in FlowMattic — you never write to them manually.

## System Roles

Three built-in single-assignment system roles also generate dedicated FlowMattic variable families:

| Role | FlowMattic Family |
|---|---|
| **Site Owner** | `syteops_user_owner_*` |
| **Technical Contact** | `syteops_user_contact_tech_*` |
| **Marketing Contact** | `syteops_user_contact_marketing_*` |

System roles are single-assignment — exactly one user holds each role, so the alias variable is always unambiguous.

## Practical Example: Team Notification Routing

You have a workflow that needs to notify all Project Managers when a new estimate arrives.

**Without SyteOps:** You hardcode individual email addresses in the workflow. When a Manager changes, you open the workflow and edit it.

**With SyteOps:** Your workflow uses `syteops_std_systm_contact_project_manager_all_emails`. When you add or remove a Project Manager in SyteOps, that variable updates instantly. The workflow never needs editing.

## Practical Example: Role-Based Content Assignment

An article arrives via ContentPen. The workflow needs to assign it to the correct author based on a role.

1. The incoming webhook includes metadata about the article type or client
2. A FlowMattic condition checks the `syteops_user_NNN_is_content_lead` variable to find the current Content Lead
3. The article gets assigned to that WordPress author
4. When the Content Lead changes in SyteOps, the next article routes to the new person automatically

No workflow editing. The role assignment is the source of truth.

## Creating Custom Roles

1. Navigate to the **Users** tab in SyteOps
2. Scroll to the **Custom Roles** section
3. Click **+ Add Role**
4. Fill in:
   - **Name** — Human-readable role label (e.g., "Project Manager")
   - **Slug** — Used in FlowMattic variable names (e.g., `project_manager`)
   - **Description** — What this role represents
   - **Icon and Color** — Visual identifier in the UI
5. Choose an assignment constraint:
   - **Unique** — Only one user at a time (like system roles)
   - **Max Count** — Up to N users
   - **Unlimited** — No limit
6. Save

The FlowMattic variables for this role are created immediately.

## Assigning Users to Roles

On any user card in the Users tab, custom role checkboxes appear for each defined role. Check a box to assign, uncheck to remove. FlowMattic variables update on save.

## Integration with SyteOps Ecosystem Plugins

SyteOps is designed as the foundation layer for a broader plugin ecosystem. When other SyteOps ecosystem plugins (like SyteHero) are installed alongside SyteOps, they can access your defined roles and user data directly.

For example, a reporting feature in an ecosystem plugin can send reports to "all Managers" by referencing the aggregator variable — without you configuring names or emails in the reporting plugin itself. Add a Manager in SyteOps, they start receiving reports.

## Role Aggregator: Slack

The Slack aggregator variable (`syteops_std_systm_contact_{slug}_slack`) contains the Slack handle or workspace targeting string for all users in the role. When the Slack integration is enabled and users have Slack IDs configured, this variable gives you a single reference to notify an entire role group in Slack from FlowMattic.

## Managing Roles

Access the full Roles management interface at **SyteOps > Roles & Users** in the WordPress admin sidebar. This standalone page shows all system and custom roles, their current assignments, user counts, and aggregator status.
