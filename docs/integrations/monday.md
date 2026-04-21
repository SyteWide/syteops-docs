---
sidebar_position: 8
title: Monday.com Integration
description: Enable the Monday.com toggle in SyteOps and drive board items, updates, and project coordination from FlowMattic workflows.
---

# Monday.com Integration

**Tier: Basic** — Toggle-only integration. Flips Monday.com on and keeps your credentials available to FlowMattic as variables.

The Monday.com integration in SyteOps is a **toggle** — enabling it unlocks Monday-related configuration fields and keeps your credentials available as FlowMattic variables. Board interactions (creating items, updating statuses, adding updates) are performed by FlowMattic using the Monday.com API.

## What the toggle does

- Makes Monday-related configuration fields visible on the relevant settings tabs.
- Makes your Monday.com API token (if configured) available to FlowMattic as a SyteOps-synced variable.
- Keeps the feature surface out of client-facing admin views when toggled off.

## Setup

1. Navigate to **SyteOps → Integrations**.
2. Find **Monday.com** in the **Communication** category.
3. Toggle it **ON** and click **Save Changes**.

Monday.com is a SaaS/API integration — there's no WordPress plugin to detect.

## Connect Monday.com to your FlowMattic workflow

1. In Monday.com, generate an **API token** (Admin → API). Copy the token.
2. In SyteOps **System / API** tab, save your Monday.com API token in the Monday credentials field so it's available to FlowMattic as a variable.
3. In FlowMattic, open the workflow that should interact with Monday.
4. Add a step using **Webhook / HTTP Request**:
   - **Method:** POST
   - **URL:** `https://api.monday.com/v2`
   - **Headers:**
     - `Authorization: {monday_api_token_variable}`
     - `Content-Type: application/json`
   - **Body:** a GraphQL query, for example to create a new item:

    ```json
    {
      "query": "mutation { create_item (board_id: 123456789, item_name: \"{syteops_item_name}\") { id } }"
    }
    ```

5. Replace `{monday_api_token_variable}` with the FlowMattic variable name that holds your token, and `{syteops_item_name}` with any SyteOps-synced variable (user name, project title, CRM field, etc.).
6. Save the workflow and run a test.

## Common use-cases

- Create a Monday item when a SyteOps user is added or a role is assigned.
- Push CRM-system updates as Monday item updates.
- Coordinate onboarding workflows — new user form submission creates a task on the onboarding board.
- Sync FlowMattic job completions as status changes on a board.

## Related

- [FlowMattic Integration](flowmattic.md)
- [Integrations Overview](overview.md)
- [CRM](../features/crm.md) — CRM systems whose fields sync to FlowMattic variables you can push into Monday
