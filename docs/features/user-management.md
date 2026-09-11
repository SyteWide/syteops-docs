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
- **Profile Pictures** — Upload or link to user avatars. When Associate WP User is set and the slot has a photo, that photo is used as the WordPress avatar (admin bar, Users list, comments, and author boxes) instead of Gravatar. The same picture can also start as a [Model photo](#model-photos).
- **Model photos** — Extra reference pictures of that person for Review Portal remixes. See [Model photos](#model-photos).
- **Module Data** — Additional per-user data from active modules

SyteOps supports up to 20 user slots. All user data syncs to FlowMattic as named variables — `syteops_user_001_name`, `syteops_user_001_email`, etc. — making user data available to every workflow without manual maintenance.

## Adding a User

When you click **Add User** — from either the **Users** tab in SyteOps settings or the **Roles & Users** admin page — a short fill-in box appears so you can pre-populate the basics up front:

- First name and last name
- Work email
- Company name
- Phone number

Every field is optional: enter what you have and complete the rest on the user's card afterward. The user is created when you confirm, and the details you entered are saved right away.

## Model photos

Each user card can keep several photos of that person for **Modify with AI** in the [Review Portal](review-and-publish-your-post.md#using-a-model). This is not the profile picture used as an avatar — it is a reference set so a remix can match that person's likeness.

The same gallery appears on the **Users** tab and on **SyteOps → Roles & Users**.

### Model consent

A person is offered as a Model only when **Model consent granted** is checked on their card. It starts off.

- Leave it unchecked while you upload and organize photos. They stay on the card and stay out of the Review Portal picker.
- Check it when that person may be used as a Model.
- Unchecking it hides them from new remixes. Existing photos and older tagged files stay on the card.

### Curated photos and tagged files

The card shows two groups:

- **Curated Model photos** — pictures you added, plus any later promote. The profile picture starts in this set. You can exclude it from the curated set without deleting the profile picture — an excluded profile picture shows as **Excluded** on its own tile, with a **Restore** button to bring it back into the curated set.
- **Tagged files** — remixes the Review Portal already made while this person was selected as the Model. They are tagged with the person's current display name. They do **not** automatically become the next remix's references. Only those remixes count: tagging a picture with the person's name by hand in the media library does not make it one of their Model photos.

The card shows the newest 48 tagged files. Click **Show older** under them to load the next 48.

**Select from Media** accepts several photos at once — pick up to 12 in one visit to your media library, rather than adding them one at a time.

### When the profile picture changes

Changing a person's profile picture keeps their Model photos in order:

- The new picture starts in the curated set, even if you had excluded the old one.
- The old picture stays in the curated set as an ordinary curated photo — unless you had excluded it, in which case it leaves the set.
- A profile picture you delete from the media library is gone from the gallery too.

The gallery updates as soon as you select, clear, replace, or delete a profile picture. **Select from Media** and **Clear** are saved only when you save the card, so until then the gallery shows what that save will do.

### Promote a tagged file

When a remix nailed the likeness, promote it into the curated set from the Users card or Roles & Users — not from the Review Portal. Promoted files stay available for later generates.

### Swapping users

Swapping two people on the **Users** card or **Roles & Users** moves their Model consent and their Model photos with them, so each person keeps their own photos and consent state on their new slot.

Deleting a user frees their slot for reuse, and clears that slot's Model consent and Model photos in the same step — a new person added to a reused slot afterward starts with Model consent off and no Model photos, the same as any brand-new user.

### Remote Users editor

On a management connection, the remote Users editor shows the gallery as a preview, locked as soon as the editor loads. Add, exclude, promote, and **Show older** stay on that site's own Users card, because media library ids belong to that site.

**Swap Users** in the remote editor moves each person's details — names, email, phone, links, profile picture, CRM IDs, and roles — to the other person's slot. Internal user IDs stay with their slot. Nothing reaches the other site until you click **Save**.

Swapping there is different from swapping locally in one way: Model photos stay with the slot instead of following the person across a management connection. So a remote swap clears **Model consent** for both people instead of carrying it across, and tells you to review the photos on that site's own Users card before granting consent again.

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
- **Model photos** — The profile-picture exclude choice travels with a user export; Model consent and
  the Model photo selections do not. Consent is recorded per site, so an imported person is never
  offered as a Model until you check **Model consent granted** on the site that imported them. The
  photo selections stay behind because those ids only point at something real on the site that holds
  the pictures. Importing into a slot also clears that slot's existing Model photos
  and its profile-picture media link, so the imported person never inherits the previous occupant's
  pictures. Re-add photos on the target site's Users card after import.

## Roles & Users Admin Page

For a dedicated role management interface, navigate to **SyteOps > Roles & Users** in the WordPress admin sidebar. This standalone page shows all system and custom roles, their current user assignments, assignment counts, and aggregator variable status.
