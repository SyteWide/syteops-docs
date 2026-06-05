---
title: FlowMattic
description: MCP tools provided by FlowMattic (provider id flowmattic).
---

<!-- GENERATED — do not edit by hand; run `npm run docs:generate` -->

# FlowMattic

Provider id: `flowmattic` · 16 tool(s).

## `fflow_create_connection`

Create a FlowMattic connection (bearer/basic/api-key) from a secret REFERENCE, not the literal. Stage the credential out-of-band (a SyteOps api_ variable or a WP option) and pass its name as "secret_ref"; the MCP resolves it server-side and never returns or logs it. OAuth-redirect connections must be created in the FlowMattic UI. Returns the new connection id to reference as a step's connect_id.

**🔴 Destructive** — supports a `dry_run` preview flag.  
**Profiles:** `full`, `flowmattic`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `app` | string | yes | App slug this connection is for. |
| `name` | string | yes | Human label for the connection. |
| `auth_type` | string | yes | bearer \| basic \| api. |
| `secret_ref` | string | yes | Reference name of the staged secret (SyteOps api_ var or WP option). NOT the secret itself. |
| `secret_ref_user` | string | no | For basic auth: reference for the username (resolved server-side), or a literal non-secret username. |
| `key_name` | string | no | For api auth: the header/query parameter name. |
| `add_to` | string | no | For api auth: header (default) or query. |


## `fflow_create_workflow`

Author a new FlowMattic workflow from a trigger + ordered actions (each naming an app/action slug from fflow_list_apps with a config object). Validates required fields (use fflow_describe_action); unknown fields pass through with a warning. Provide an optional "key" for deterministic, idempotent re-runs (fleet-safe); omit for a one-off. Ships disabled (status off) by default; pass status:"on" to create AND activate it (this also registers the trigger — schedule/polling cron, plugin-action hooks), or activate later with fflow_set_workflow_status. The result's "registration" field reports what was registered. Note: a webhook-triggered workflow created with status:on begins accepting unauthenticated POSTs at its capture URL immediately.

**🔴 Destructive** — supports a `dry_run` preview flag.  
**Profiles:** `full`, `flowmattic`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `title` | string | yes | Workflow title. |
| `key` | string | no | Optional logical key for idempotent upsert + deterministic id. |
| `trigger` | object | yes | Trigger step: \{ app, action, config? \}. |
| `actions` | array | yes | Ordered action steps: [ \{ app, action, config?, connect_id? \} ]. |
| `status` | string | no | on or off (default off). |
| `allow_php` | boolean | no | Permit executable PHP config (php-functions/code apps or PHP: values); default false. |


## `fflow_delete_variable`

Delete a NATIVE FlowMattic custom variable by "name". Refuses syteops_* names (delete those via syteops_dispatch variables.delete).

**🔴 Destructive** — supports a `dry_run` preview flag.  
**Profiles:** `full`, `flowmattic`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `name` | string | yes | Variable name to delete (must not start with syteops_). |


## `fflow_describe_action`

Describe one app trigger or action: its input fields (name, label, type, required, options, repeatable), whether it requires a connection, and the field source (parsed/override/merged). Use this before fflow_create_workflow to know each step's config keys.

**Profiles:** `full`, `lean`, `flowmattic`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `app` | string | yes | App slug (from fflow_list_apps). |
| `action` | string | yes | Trigger OR action slug within the app. |


## `fflow_get_variable`

Get a single FlowMattic variable by exact "name" (without braces), including its origin and the value FlowMattic would substitute for &#123;&#123;name}}.

**Profiles:** `full`, `flowmattic`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `name` | string | yes | Variable name without braces, e.g. syteops_std_systm_company_name_001. |


## `fflow_list_apps`

List the FlowMattic integrations (apps) available on this site to build workflows from — each tagged core or integration, with its triggers and actions and whether it requires a saved connection. Includes a field_map drift block (installed vs reviewed FlowMattic version + unreviewed apps). Filter by "type" (trigger/action), "base" (core/integration), or "search".

**Profiles:** `full`, `lean`, `flowmattic`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `type` | string | no | Filter: all (default), trigger, or action. |
| `base` | string | no | Filter: all (default), core, or integration. |
| `search` | string | no | Filter by app name/slug substring. |


## `fflow_list_connections`

List saved FlowMattic connections (id, name, app, auth_type) that workflow steps can reference by id. Never returns the stored credential. Filter by "app".

**Profiles:** `full`, `flowmattic`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `app` | string | no | Filter by app slug. |


## `fflow_list_templates`

List the SyteWide FlowMattic workflow templates available to provision (key, version, title, and required plugins). Use a key with fflow_provision_workflow.

**Profiles:** `full`, `flowmattic`

**Parameters**

_No parameters._


## `fflow_list_variables`

List the FlowMattic variables available to reference in workflows as &#123;&#123;name}} — FlowMattic system variables, the custom pool, and SyteOps-synced variables — each tagged with its origin (fm_system, fm_custom, syteops). Filter by "origin", "search" (name/description substring), or omit values with include_values:false.

**Profiles:** `full`, `lean`, `flowmattic`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `origin` | string | no | Filter by origin: all (default), fm_system, fm_custom, or syteops. |
| `search` | string | no | Filter by name/description substring. |
| `include_values` | boolean | no | Include current values (default true). |


## `fflow_list_workflows`

List FlowMattic workflows on this site: id (numeric), workflow_id (FlowMattic string id), title, status (active/inactive), trigger application (e.g. "webhook"), the derived webhook capture URL, and the SyteWide logical_key + version (when the workflow was provisioned by SyteWide). Use this to find a workflow to trigger or remove.

**Profiles:** `full`, `flowmattic`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `search` | string | no | Filter by title substring. |
| `status` | string | no | Filter by status: active or inactive. |


## `fflow_provision_workflow`

Idempotently install a FlowMattic workflow from a SyteWide template "key" (see fflow_list_templates). Re-running is safe: it creates the workflow if absent, updates it if the template version is newer, and is a no-op if already current. Skips with a warning if the template's required plugins are not active.

**🔴 Destructive** — supports a `dry_run` preview flag.  
**Profiles:** `full`, `flowmattic`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `key` | string | yes | Template key to provision. |


## `fflow_remove_workflow`

Remove a SyteWide-provisioned FlowMattic workflow by its logical "key". Only affects workflows that were provisioned by SyteWide (stamped with that key).

**🔴 Destructive** — supports a `dry_run` preview flag.  
**Profiles:** `full`, `flowmattic`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `key` | string | yes | Logical key of the provisioned workflow to remove. |


## `fflow_set_variable`

Create or update a NATIVE FlowMattic custom variable (referenced in workflows as &#123;&#123;name}}). Refuses syteops_* names (those are SyteOps-managed — use syteops_dispatch variables.set). Refuses values starting with "PHP:" unless allow_php:true (FlowMattic eval()s such values at runtime).

**🔴 Destructive** — supports a `dry_run` preview flag.  
**Profiles:** `full`, `flowmattic`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `name` | string | yes | Variable name (letters/digits/underscore; must not start with syteops_). |
| `value` | string | yes | Variable value. |
| `description` | string | no | Optional human description. |
| `allow_php` | boolean | no | Permit a leading "PHP:" executable value (default false). |


## `fflow_set_workflow_status`

Activate (status on) or deactivate (off) a FlowMattic workflow by "id" or "key". Registers the trigger correctly for ALL trigger types: webhook/integration-event run on activation with no extra setup; schedule/polling register a WP-Cron event; plugin-action hooks register their dynamic hook. Closes the gap where workflows had to be toggled in the FlowMattic UI.

**🔴 Destructive** — supports a `dry_run` preview flag.  
**Profiles:** `full`, `flowmattic`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | integer | no | Numeric workflow id. |
| `key` | string | no | Logical key (alternative to id). |
| `status` | string | yes | on or off. |


## `fflow_trigger_workflow`

Trigger a FlowMattic workflow on demand by numeric "id" or "key", posting an optional JSON "payload" to its webhook capture URL. The workflow must be active (status on) and its trigger must be a webhook — event-triggered workflows fire on their own event, not on demand. Returns a run acknowledgement; the workflow then runs asynchronously in the background.

**🔴 Destructive** — supports a `dry_run` preview flag.  
**Profiles:** `full`, `flowmattic`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | integer | no | Numeric workflow id (from fflow_list_workflows). |
| `key` | string | no | SyteWide logical key of a provisioned workflow, or the FlowMattic workflow_id string (alternative to id). |
| `payload` | object | no | JSON body delivered to the workflow webhook. |


## `fflow_update_workflow`

Re-author an existing FlowMattic workflow by "id" or "key" — including hand-built ones. The prior version is auto-backed-up first. If the workflow was built in FlowMattic's visual (v2) canvas, the rewrite emits a v1 flat graph: it still runs and re-lays-out when reopened, but loses saved canvas positioning (a warning is returned). The result includes a "previous" snapshot (before/after).

**🔴 Destructive** — supports a `dry_run` preview flag.  
**Profiles:** `full`, `flowmattic`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | integer | no | Numeric workflow id (from fflow_list_workflows). |
| `key` | string | no | Logical key (alternative to id). |
| `title` | string | no | New title. |
| `trigger` | object | yes | New trigger: \{ app, action, config? \}. |
| `actions` | array | yes | New actions: [ \{ app, action, config?, connect_id? \} ]. |
| `status` | string | no | on or off (default: keep current). |
| `allow_php` | boolean | no | Permit executable PHP config (php-functions/code apps or PHP: values); default false. |

