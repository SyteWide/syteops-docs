---
sidebar_position: 2
title: User Management
description: Managing users, system roles, custom roles, and user data in SyteOps.
---

# User Management

SyteOps supports up to 20 users with comprehensive profile management, role assignments, and FlowMattic variable sync.

## User Profiles

Each user has 31+ fields organized into categories:
- **Identity** — Name, email, phone
- **Contact Information** — Address, additional contacts
- **CRM IDs** — Identifiers across 15 supported CRM systems
- **Profile Pictures** — Upload or link to user avatars
- **Notes** — Per-user notes (requires Notes module)
- **Estimates** — Per-user estimates (requires Estimates module)

## System Roles

System roles are single-assignment — only one user can hold each role at a time.

| Role | Purpose |
|---|---|
| Site Owner | Primary site owner/administrator |
| Technical Contact | Primary technical contact for the site |
| Marketing Contact | Primary marketing contact |

To assign a system role:
1. Navigate to the **Users** tab
2. Open the user's card
3. Check the role checkbox
4. Save

When a system role is unchecked, it is cleared from the user and removed from FlowMattic.

## Custom Roles

Create your own roles beyond the built-in system roles.

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

Custom roles appear as checkboxes on each user card. Check the role to assign it, uncheck to remove it.

### FlowMattic Variables

Custom roles automatically generate FlowMattic variables:
- `syteops_user_NNN_is_{role_slug}` — Whether each user has the role
- Aggregator variables for team communication (names, emails, Slack handles)

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
