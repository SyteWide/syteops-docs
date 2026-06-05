---
title: Fluent Support
description: MCP tools provided by Fluent Support (provider id fluent-support).
---

<!-- GENERATED — do not edit by hand; run `npm run docs:generate` -->

# Fluent Support

Provider id: `fluent-support` · 26 tool(s).

## `fsupport_add_agent`

Add a Fluent Support agent (support staff). Requires email + first_name.

**Profiles:** `full`, `support`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `email` | string | yes | Agent email (required). |
| `first_name` | string | yes | First name (required). |
| `last_name` | string | no | Last name. |


## `fsupport_add_ticket_tag`

Attach a tag to a ticket.

**Profiles:** `full`, `support`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `ticket_id` | integer | yes | Ticket ID. |
| `tag_id` | integer | yes | Tag ID to attach. |


## `fsupport_bulk_ticket_action`

Bulk action over tickets. bulk_action: close_tickets, delete_tickets (permanent), assign_agent (needs agent_id), assign_tags (needs tag_ids[]).

**🔴 Destructive** — supports a `dry_run` preview flag.  
**Profiles:** `full`, `support`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `bulk_action` | string | yes | Action to perform. |
| `ticket_ids` | array | yes | Ticket IDs to act on. |
| `agent_id` | integer | no | Agent ID (for assign_agent). |
| `tag_ids` | array | no | Tag IDs (for assign_tags). |


## `fsupport_change_ticket_customer`

Reassign a ticket to a different customer.

**Profiles:** `full`, `support`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `ticket_id` | integer | yes | Ticket ID. |
| `customer_id` | integer | yes | New customer ID. |


## `fsupport_close_ticket`

Close a Fluent Support ticket. Notifies the customer unless "silently" is set.

**🔴 Destructive** — supports a `dry_run` preview flag.  
**Profiles:** `full`, `support`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `ticket_id` | integer | yes | Ticket ID. |
| `silently` | boolean | no | Close without notifying the customer. |


## `fsupport_create_customer`

Create a Fluent Support customer. Requires email + first_name.

**Profiles:** `full`, `support`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `email` | string | yes | Customer email (required, unique). |
| `first_name` | string | yes | First name (required). |
| `last_name` | string | no | Last name. |
| `status` | string | no | Customer status. |
| `address_line_1` | string | no | Address line 1. |
| `city` | string | no | City. |
| `country` | string | no | Country. |
| `note` | string | no | Internal note. |


## `fsupport_create_ticket`

Create a Fluent Support ticket. Requires title + content. Supply customer_id for an existing customer, OR new_customer&#123;email,first_name} to create one (set create_wp_user to also make a WP user, which then requires new_customer.username).

**Profiles:** `full`, `support`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `title` | string | yes | Ticket title. |
| `content` | string | yes | Ticket body (HTML allowed). |
| `customer_id` | integer | no | Existing customer ID. |
| `mailbox_id` | integer | no | Mailbox ID. |
| `product_id` | integer | no | Product ID. |
| `client_priority` | string | no | Client priority. |
| `new_customer` | object | no | New customer \{email, first_name, last_name, username\}. Used when customer_id is absent. |
| `create_wp_user` | boolean | no | Also create a WP user for the new customer (requires new_customer.username). |


## `fsupport_delete_agent`

Permanently delete (remove) a Fluent Support agent.

**🔴 Destructive** — supports a `dry_run` preview flag.  
**Profiles:** `full`, `support`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `agent_id` | integer | yes | Agent ID. |


## `fsupport_delete_customer`

Permanently delete a Fluent Support customer.

**🔴 Destructive** — supports a `dry_run` preview flag.  
**Profiles:** `full`, `support`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `customer_id` | integer | yes | Customer ID. |


## `fsupport_delete_response`

Permanently delete a response (reply) from a ticket.

**🔴 Destructive** — supports a `dry_run` preview flag.  
**Profiles:** `full`, `support`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `ticket_id` | integer | yes | Ticket ID. |
| `response_id` | integer | yes | Response ID. |


## `fsupport_delete_ticket`

Permanently delete a Fluent Support ticket.

**🔴 Destructive** — supports a `dry_run` preview flag.  
**Profiles:** `full`, `support`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `ticket_id` | integer | yes | Ticket ID. |


## `fsupport_get_customer`

Get a Fluent Support customer by ID.

**Profiles:** `full`, `support`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `customer_id` | integer | yes | Customer ID. |


## `fsupport_get_support_reports`

Get Fluent Support overall reports (ticket/response/resolve stats) for an optional date range.

**Profiles:** `full`, `support`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `date_from` | string | no | Range start (Y-m-d). |
| `date_to` | string | no | Range end (Y-m-d). |


## `fsupport_get_ticket`

Get a Fluent Support ticket by ID, including its full conversation (responses), customer, and agent.

**Profiles:** `full`, `support`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `ticket_id` | integer | yes | Ticket ID. |


## `fsupport_list_agents`

List Fluent Support agents.

**Profiles:** `full`, `support`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `search` | string | no | Search term. |
| `per_page` | integer | no | Items per page (default 15). |
| `page` | integer | no | Page number. |


## `fsupport_list_customers`

List Fluent Support customers with optional search and status filter.

**Profiles:** `full`, `support`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `search` | string | no | Search term. |
| `status` | string | no | Filter by status, or "all". |
| `per_page` | integer | no | Items per page (default 15). |
| `page` | integer | no | Page number. |


## `fsupport_list_routes`

List the Fluent Support REST routes registered under /fluent-support/v2 and their HTTP methods. Optional "search" substring filter and "limit" (1-500, default 200). Use this to find a path for fsupport_request.

**Passthrough router** — available in every toolset profile.  
**Profiles:** all profiles

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `search` | string | no | Only return routes whose path contains this substring. |
| `limit` | integer | no | Max routes to return (1-500, default 200). |


## `fsupport_list_tickets`

List Fluent Support tickets with filters (status, priority, agent, mailbox, product) and search.

**Profiles:** `full`, `support`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `search` | string | no | Search term. |
| `status` | string | no | Filter by ticket status (e.g. new, active, closed). |
| `priority` | string | no | Filter by priority. |
| `agent_id` | string | no | Filter by assigned agent ID, or "unassigned". |
| `mailbox_id` | integer | no | Filter by mailbox ID. |
| `product_id` | integer | no | Filter by product ID. |
| `customer_id` | integer | no | Filter by customer ID. |
| `order_by` | string | no | Sort column (default id). |
| `order_type` | string | no | ASC or DESC. |
| `per_page` | integer | no | Items per page (default 15). |
| `page` | integer | no | Page number. |


## `fsupport_remove_ticket_tag`

Detach a tag from a ticket.

**Profiles:** `full`, `support`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `ticket_id` | integer | yes | Ticket ID. |
| `tag_id` | integer | yes | Tag ID to detach. |


## `fsupport_reopen_ticket`

Re-open a closed Fluent Support ticket.

**Profiles:** `full`, `support`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `ticket_id` | integer | yes | Ticket ID. |


## `fsupport_reply_ticket`

Post a reply (response) to a Fluent Support ticket as the current agent. Sends to the customer unless conversation_type is "draft_response". Optionally close the ticket after replying.

**🔴 Destructive** — supports a `dry_run` preview flag.  
**Profiles:** `full`, `support`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `ticket_id` | integer | yes | Ticket ID. |
| `content` | string | yes | Reply body (HTML allowed). |
| `conversation_type` | string | no | "response" (default, customer-visible) or "draft_response" (internal). |
| `close_ticket` | boolean | no | Close the ticket after this reply. |


## `fsupport_request`

Call any Fluent Support REST route (scoped to /fluent-support/v2). GET runs immediately; POST/PUT/PATCH/DELETE require "confirm": true, or pass "dry_run": true to preview the request. Use fsupport_list_routes to discover available paths.

**Passthrough router** — available in every toolset profile.  
**Profiles:** all profiles

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `method` | string | yes | HTTP method: GET, POST, PUT, PATCH, or DELETE. |
| `path` | string | yes | Route path within /fluent-support/v2, e.g. /fluent-support/v2/contacts or /fluent-support/v2/contacts/42. |
| `body` | object | no | Request body for writes (JSON object). |
| `query` | object | no | Query-string arguments (JSON object). |
| `confirm` | boolean | no | Required to execute a write (POST/PUT/PATCH/DELETE). |


## `fsupport_update_agent`

Update a Fluent Support agent by ID. The API (AgentCreateRequest) validates that email + first_name are present, but email is NOT applied to the stored record on update (sanitizeAgentPayload omits it when $includeEmail=false) — supply the agent's current email to satisfy validation.

**Profiles:** `full`, `support`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `agent_id` | integer | yes | Agent ID. |
| `email` | string | yes | Agent's current email — required by validation but cannot be changed via this endpoint. |
| `first_name` | string | yes | First name (required by the API on update). |
| `last_name` | string | no | Last name. |


## `fsupport_update_customer`

Update a Fluent Support customer by ID. The API (CustomerController::update) requires email + first_name on every update call.

**Profiles:** `full`, `support`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `customer_id` | integer | yes | Customer ID. |
| `email` | string | yes | Email (required by the API on update). |
| `first_name` | string | yes | First name (required by the API on update). |
| `last_name` | string | no | Last name. |
| `status` | string | no | Status. |
| `address_line_1` | string | no | Address line 1. |
| `city` | string | no | City. |
| `country` | string | no | Country. |
| `note` | string | no | Internal note. |


## `fsupport_update_response`

Edit an existing response (reply) on a ticket.

**Profiles:** `full`, `support`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `ticket_id` | integer | yes | Ticket ID. |
| `response_id` | integer | yes | Response ID. |
| `content` | string | yes | New response body (HTML allowed). |


## `fsupport_update_ticket_property`

Update a single ticket property (one column per call). prop_name e.g. status, priority, agent_id, mailbox_id. No-op if the value equals the current one. Assigning agent_id needs the fst_assign_agents capability.

**Profiles:** `full`, `support`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `ticket_id` | integer | yes | Ticket ID. |
| `prop_name` | string | yes | Property/column to set (status, priority, agent_id, mailbox_id, ...). |
| `prop_value` | string | yes | New value. |

