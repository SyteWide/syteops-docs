---
sidebar_position: 9
title: AWS SES Integration
description: Enable the AWS SES toggle so SyteOps can coordinate transactional email delivery through Amazon SES from your FlowMattic workflows.
---

# AWS SES Integration

**Tier: Basic** — Toggle-only integration. Flips AWS SES on as a supported email channel and keeps your SES credentials available as FlowMattic variables.

The AWS SES integration signals that your operation uses Amazon Simple Email Service for transactional email delivery. Actual email sending is performed by FlowMattic workflows using the SyteOps-synced variables that hold your SES credentials and region.

## What the toggle does

- Marks AWS SES as a supported email channel inside SyteOps.
- Reveals the **AWS IAM Access Key** and **AWS IAM Access Key Secret** fields in the System / API tab.
- Keeps your SES-related credentials (if configured in the System / API tab) available to FlowMattic as masked variables.
- Hides SES configuration fields from client-facing admin views when toggled off.

## Credential variables

When AWS SES is on, the System / API tab shows two credential fields. Both are stored encrypted and synced to FlowMattic as masked variables. Each field has a copy button that copies the FlowMattic variable name so you can paste it straight into a workflow:

| Field | FlowMattic variable |
| --- | --- |
| AWS IAM Access Key | `{{syteops_std_systm_aws_iam_access_key}}` |
| AWS IAM Access Key Secret | `{{syteops_std_systm_aws_iam_access_key_secret}}` |

The **AWS IAM Access Key Secret** field also offers a **Clear this value on save** option so you can remove the stored secret without replacing it.

## Setup

1. Navigate to **SyteOps → Integrations**.
2. Find **AWS SES** in the **Email & Delivery** category.
3. Toggle it **ON** and click **Save Changes**.

AWS SES is a SaaS / API integration — there's no WordPress plugin to detect, so turning the toggle on is enough.

## Connect AWS SES to your FlowMattic workflow

1. In the AWS Console, create or locate the IAM user access key and secret you want to use (an IAM user with SES permissions).
2. In the SyteOps **System / API** tab, paste them into the **AWS IAM Access Key** and **AWS IAM Access Key Secret** fields and click **Save Changes**.
3. In FlowMattic, open the workflow that should send email.
4. Add a step using **Webhook / HTTP Request** (or a dedicated AWS SES step if your FlowMattic version includes one):
   - Reference the synced variables `{{syteops_std_systm_aws_iam_access_key}}` and `{{syteops_std_systm_aws_iam_access_key_secret}}` (use each field's copy button), plus your target region.
   - Build the standard AWS SES request payload (recipient, subject, body).
5. Save the workflow and run a test.

## Common use-cases

- Transactional emails triggered by SyteOps role or user events (new user onboarding, role assignment notifications).
- Client-facing email relays where your branded SES domain is the sender.
- High-volume email delivery that sits behind rate-limiting and bounce handling better than standard SMTP.

## Related

- [FlowMattic Integration](flowmattic.md) — how your SES credentials reach workflows
- [Integrations Overview](overview.md) — all supported integrations
- [Workflow Templates](../features/workflow-templates.md) — pre-built FlowMattic examples
