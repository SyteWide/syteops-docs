---
sidebar_position: 2
title: User Management
description: Managing users, system roles, custom roles, and FlowMattic automation variables in SyteOps.
---

# User Management

SyteOps provides structured user profile management and role-based FlowMattic automation. Every user you configure and every role you define becomes part of your automation infrastructure — without you ever updating a workflow.

## User Profiles

Each user slot has 31+ fields organized into categories:
- **Identity** — Name, email, phone
- **Contact Information** — Address, additional contacts
- **CRM IDs** — Identifiers across 15 supported CRM systems
- **Profile Pictures** — Upload or link to user avatars
- **Module Data** — Additional per-user data from active modules

SyteOps supports up to 20 user slots. All user data syncs to FlowMattic as named variables — `syteops_user_001_name`, `syteops_user_001_email`, etc. — making user data available to every workflow without manual maintenance.

## System Roles

System roles are single-assignment — exactly one user can hold each role at a time.

| Role | Purpose |
|---|---|
| Site Owner | Primary site owner/administrator |
| Technical Contact | Primary technical contact for the site |
| Marketing Contact | Primary marketing contact |

System roles generate stable alias variable families in FlowMattic:
- `syteops_user_owner_*` — The current Site Owner's full profile
- `syteops_user_contact_tech_*` — The current Technical Contact's full profile
- `syteops_user_contact_marketing_*` — The current Marketing Contact's full profile

Reassign a system role and these variables update automatically on the next save.

## Custom Roles

Create your own roles beyond the built-in system roles. Custom roles are the foundation for team-aware automation. See [Roles & Automation Variables](roles-and-automation) for the full story.

### Creating a Custom Role

1. Navigate to the **Users** tab
2. Scroll to the **Custom Roles** section
3. Click **+ Add Role**
4. Fill in: Name, Description, Icon, Color
5. Choose a constraint:
   - **Unique** — Only one user can have this role
   - **Max Count** — Up to N users can have this role
   - **Unlimited** — No limit on assignments
6. Save

### Assigning Custom Roles

Custom roles appear as checkboxes on each user card. Check the role to assign it, uncheck to remove it. FlowMattic aggregator variables update on save.

### FlowMattic Variables Generated Per Custom Role

| Variable | Contains |
|---|---|
| `syteops_std_systm_contact_{slug}_all_emails` | All emails for users in this role |
| `syteops_std_systm_contact_{slug}_all_names` | All display names for users in this role |
| `syteops_std_systm_contact_{slug}_slack` | Slack aggregator for this role group |
| `syteops_user_NNN_is_{slug}` | Per-user boolean: does user 001–020 hold this role |

These variables are generated and synced automatically. Reference them in FlowMattic to build team-aware workflows that never need editing when your team changes.

## SyteOps Admin Role

The **SyteOps Admin** is a special WordPress role with elevated permissions:
- Full access to all SyteOps features
- Required for destructive operations (wipes, debug tool)
- Only existing SyteOps Admins can assign this role to others
- The role auto-recovers if capabilities are lost

The first user to complete Initial Setup becomes a SyteOps Admin.

## Export and Import

- **Single user export** — Export one user card with all fields, roles, notes, and estimates
- **Import** — Import remaps to the chosen target user slot; profile pictures are link-only
- **Master export** includes all user data
- Role assignments are preserved across export/import

## Roles & Users Admin Page

For a dedicated role management interface, navigate to **SyteOps > Roles & Users** in the WordPress admin sidebar. This standalone page shows all system and custom roles, their current user assignments, assignment counts, and aggregator variable status.
