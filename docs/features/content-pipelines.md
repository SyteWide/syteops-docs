---
sidebar_position: 12
title: Content Pipelines
description: Building self-routing content workflows with ContentPen, FlowMattic, ACF, and SyteOps roles.
---

# Content Pipelines

SyteOps is the configuration backbone that makes content automation self-routing. When you connect ContentPen, FlowMattic, ACF, and Squirrly SEO around SyteOps user and role data, you get a pipeline where content arrives, finds its owner, builds to spec, and lands ready to publish — without manual assignment or workflow edits.

## How It Comes Together

The pieces:

| Tool | Role in the pipeline |
|---|---|
| **ContentPen** | Generates content and sends it as a webhook payload |
| **SyteOps** | Routes the webhook to FlowMattic; provides user and role variables for assignment |
| **FlowMattic** | Executes the workflow logic: field mapping, author assignment, metadata injection |
| **ACF** | Provides the field structure that the workflow populates |
| **Squirrly SEO** | Applies SEO metadata using field values from ACF + SyteOps data |

## A Complete Example

**The goal:** An article created in ContentPen should arrive in WordPress, assigned to the correct author, with ACF fields populated and SEO metadata ready. All with one click in ContentPen.

**Step 1: ContentPen sends the payload**

ContentPen delivers a webhook to your SyteOps endpoint:
```
POST /wp-json/syteops-int-cp/v1/webhook
```

The payload includes article content, metadata, and optionally the assigned author or content category.

**Step 2: SyteOps verifies and relays**

SyteOps verifies the webhook signature (HMAC-SHA256), then relays the payload to the configured FlowMattic webhook URL.

**Step 3: FlowMattic detects the author**

The FlowMattic workflow uses SyteOps role variables to identify who the article belongs to. For example:
- Check `syteops_user_NNN_is_content_lead` to find the current Content Lead
- Or match the article's metadata to a user slot's CRM ID
- Or route based on article category → role mapping using SyteOps custom variables

**Step 4: ACF fields get populated**

FlowMattic maps the payload fields to the ACF field keys for the post. SyteOps variable sets can store the mapping (ACF field keys, post type slugs, category IDs) so they're available in FlowMattic without hardcoding.

**Step 5: Squirrly SEO applies metadata**

Squirrly SEO reads from the ACF fields populated by the workflow. SyteOps System/API settings include the Squirrly SEO field mappings, making them available as FlowMattic variables for the workflow.

**Step 6: Article lands in review**

The WordPress post is created in draft status, assigned to the correct author, with all fields populated and SEO metadata set. The author gets a notification (using their email from SyteOps user data). They review, approve, and publish.

**The result:** One click in ContentPen. One workflow. Zero manual assignment. Zero workflow editing when the team changes.

## Why This Works Without Workflow Edits

The key is that SyteOps decouples the "who" and "how" from the workflow itself:

- **Who** — Author assignment comes from SyteOps role variables. Change the Content Lead in SyteOps, the next article routes to them automatically.
- **How** — Field mappings, API keys, and configuration live in SyteOps as FlowMattic variables. Change a mapping, every workflow that references it picks it up.
- **What** — The workflow logic (steps, conditions, actions) stays stable. It references named variables, not hardcoded values.

## Setting Up the ContentPen Integration

See the full setup guide: [ContentPen Integration](../integrations/contentpen)

Short version:
1. Enable **ContentPen** in the Integrations tab
2. Add your ContentPen API credentials in the **System/API** tab
3. Set your ContentPen webhook URL to `https://yoursite.com/wp-json/syteops-int-cp/v1/webhook`
4. Configure your FlowMattic workflow to handle the relayed payload

## Storing Configuration in Variable Sets

Use [Variable Sets](variable-sets) to store the mapping data your content workflow needs:

- ACF field keys for your post types
- Post type slugs for different content categories
- Category or tag IDs used in routing conditions
- Any other repeating values your workflow references

Change a value in SyteOps → it propagates to FlowMattic → every workflow that uses it is automatically current.

## Role-Aware Routing Without Per-Author Workflows

A common pattern: one workflow handles all articles, regardless of author.

**How:** The workflow uses conditional logic that checks `syteops_user_NNN_is_{role}` variables to find the current holder of a role, then acts accordingly. Because these are SyteOps-managed variables, the workflow logic doesn't need to know who the person is — only which role they hold.

**Result:** One workflow. Many authors. No duplicates. No edits when teams change.

## Squirrly SEO Integration

When the **Squirrly SEO** integration is enabled, SyteOps provides additional field mapping configuration in the System/API tab:

- ACF title key
- Product name/description field mapping
- Social image dimensions
- Custom JS path overrides

These settings are available as FlowMattic variables, enabling workflows to set SEO fields correctly without hardcoding Squirrly-specific configuration into workflow definitions.

## Other Supported Content Sources

The ContentPen relay pattern works for any webhook-based content source. If your content tool can send a webhook with a verifiable signature, SyteOps can route it to FlowMattic using the same pattern. The role-awareness and user data that make ContentPen powerful are available to any workflow.
