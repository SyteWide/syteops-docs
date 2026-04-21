---
sidebar_position: 7
title: Slack Integration
description: Enable the SyteOps Slack toggle and use Slack as a FlowMattic destination for notifications, alerts, and workflow handoffs.
---

# Slack Integration

**Tier: Basic** — Toggle-only integration. Flips Slack on as a supported channel and keeps your Slack settings available as FlowMattic variables.

The Slack integration in SyteOps is a **toggle** — enabling it signals that your operation uses Slack, unlocks related configuration fields, and keeps Slack-related workflow pieces available. The actual Slack messaging is performed by FlowMattic using SyteOps-synced variables.

## What the toggle does

- Makes Slack-related configuration fields visible on the relevant settings tabs.
- Ensures SyteOps-synced credentials and channel identifiers are available to FlowMattic as variables.
- Keeps the feature surface out of client-facing admin views when toggled off.

## Setup

1. Navigate to **SyteOps → Integrations**.
2. Find **Slack** in the **Communication** category.
3. Toggle it **ON** and click **Save Changes**.

Because Slack is a SaaS/API integration (not a WordPress plugin), there's no install-detection step. Turning the toggle on is enough.

## Connect Slack to your FlowMattic workflow

1. In Slack, create an **Incoming Webhook** (Slack → Apps → Incoming Webhooks) for the channel you want to post to. Copy the webhook URL.
2. In FlowMattic, open the workflow you want to send Slack messages from.
3. Add a step using **Webhook / HTTP Request**:
   - **Method:** POST
   - **URL:** the Slack webhook URL
   - **Content-Type:** `application/json`
   - **Body:**

    ```json
    {"text": "{syteops_variable_here}"}
    ```

4. Replace `{syteops_variable_here}` with any SyteOps-synced FlowMattic variable (a user name, a role aggregator, a CRM field, a custom variable set) or static text.
5. Save the workflow and run a test.

## Common use-cases

- Notify an ops channel when a new user is created or a role assignment changes.
- Alert on endpoint scan failures from the Server Connections page.
- Post daily summaries of FlowMattic workflow runs.
- Escalate errors surfaced by SyteOps logging.

## Related

- [FlowMattic Integration](flowmattic.md) — how SyteOps variables reach your workflows
- [Integrations Overview](overview.md) — all supported integrations
- [Workflow Templates](../features/workflow-templates.md) — pre-built FlowMattic examples
