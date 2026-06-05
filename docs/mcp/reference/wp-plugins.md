---
title: WordPress Plugins
description: MCP tools provided by WordPress Plugins (provider id wp-plugins).
---

<!-- GENERATED — do not edit by hand; run `npm run docs:generate` -->

# WordPress Plugins

Provider id: `wp-plugins` · 7 tool(s).

## `activate_plugin`

Activate an installed plugin by its file path.

**🔴 Destructive** — supports a `dry_run` preview flag.  
**Profiles:** `full`, `wp`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `plugin` | string | yes | Plugin file path, e.g. akismet/akismet. |


## `create_plugin`

Install a plugin from the WordPress.org directory by slug, optionally activating it.

**🔴 Destructive** — supports a `dry_run` preview flag.  
**Profiles:** `full`, `wp`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `slug` | string | yes | WordPress.org plugin slug, e.g. "classic-editor". |
| `status` | string | no | Set to 'active' to activate after install (default 'inactive'). |


## `deactivate_plugin`

Deactivate an active plugin by its file path.

**🔴 Destructive** — supports a `dry_run` preview flag.  
**Profiles:** `full`, `wp`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `plugin` | string | yes | Plugin file path, e.g. akismet/akismet. |


## `delete_plugin`

Uninstall (delete) a plugin by its file path. The plugin must be INACTIVE — WordPress refuses to delete an active plugin.

**🔴 Destructive** — supports a `dry_run` preview flag.  
**Profiles:** `full`, `wp`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `plugin` | string | yes | Plugin file path, e.g. akismet/akismet. |


## `get_plugin`

Get details for one installed plugin by its file path (e.g. "akismet/akismet").

**Profiles:** `full`, `lean`, `wp`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `plugin` | string | yes | Plugin file path, e.g. akismet/akismet. |


## `list_plugins`

List installed plugins and their active/inactive status.

**Profiles:** `full`, `lean`, `wp`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `search` | string | no | Filter by search term. |
| `status` | string | no | Filter by status (active, inactive). |


## `update_plugin`

Update an installed plugin to its latest version via the WordPress upgrader (there is no core REST route for plugin updates). Pass the plugin file path including .php, e.g. akismet/akismet.php.

**🔴 Destructive** — supports a `dry_run` preview flag.  
**Profiles:** `full`, `wp`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `plugin` | string | yes | Plugin file basename including .php, e.g. akismet/akismet.php. |

