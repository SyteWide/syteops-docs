---
title: Integrations
sidebar_label: Integrations
description: Manage API operations for the integrations resource.
---

{/* GENERATED — do not edit by hand; run `npm run docs:generate` */}

# `integrations`

5 operation(s). All run through `POST /syteops/v1/manage/dispatch` (reads may use the documented GET form).

## `compat`

Read-only. The stored compatibility findings for the plugins and themes SyteOps relies on (EWWW Image Optimizer, LiteSpeed Cache, Elementor, Elementor Pro, Avada, Avada Builder, Divi, Blocksy, Blocksy Companion Pro): one row per integration with the installed version, the newest version SyteOps was verified against (verified_max), the status and its severity, and for a major the ids of the failing checks. status is integration_absent (not installed), ok, version_unverified (installed version outside the verified range; soft), indeterminate (a check could not be decided; soft), probe_failed (a hook, function, class, constant or option SyteOps relies on is gone or changed; major) or unchecked (no check has run). first_seen and checked_at are Unix seconds or null; acknowledged and emailed are null until those are tracked. The checks run in the background after a plugin or theme changes and once a day. No path, URL, check target or error text is returned. A plugin older than this operation answers 404 unknown_operation.

**Access:** SyteOps Admin or API key.

**Parameters**

_No parameters._


**Returns**

data.integrations[]: array of &#123;slug, installed, verified_max, status: integration_absent|ok|version_unverified|indeterminate|probe_failed|unchecked, severity: major|soft|'', failing[], first_seen|null, acknowledged: null, emailed: null, checked_at|null}

**Request**

```json
{
  "resource": "integrations",
  "action": "compat",
  "params": {}
}
```

## `compat_check`

Run the compatibility checks now and return the same rows as integrations.compat. Non-destructive: the checks read files and symbols and write only their own stored findings. At most once per 5 minutes after ANY check, the background one included: inside that window it answers 429 cooldown with retry_after in seconds and the stored rows, which the recent check left fresh. 409 compat_disabled when the checks are switched off on this site (the SYTEOPS_COMPAT_CHECKS_DISABLED constant or the syteops/compat/enabled filter). A major found now is a candidate until a second check at least 5 minutes later agrees.

**Access:** SyteOps Admin or API key.

**Parameters**

_No parameters._


**Returns**

data: &#123;integrations[] (as integrations.compat), ran, retry_after}

**Request**

```json
{
  "resource": "integrations",
  "action": "compat_check",
  "params": {}
}
```

## `disable`

Disable an integration.

**🔴 Destructive**  
**Access:** SyteOps Admin or API key, plus `confirm: true`.

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `slug` | string | yes |  |
| `confirm` | boolean | no |  |


**Returns**

data: &#123;slug, enabled: false}

**Request**

```json
{
  "resource": "integrations",
  "action": "disable",
  "params": {
    "slug": "string",
    "confirm": true
  },
  "confirm": true
}
```

## `enable`

Enable an integration (refused if its required plugin is not installed).

**Access:** SyteOps Admin or API key.

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `slug` | string | yes |  |


**Returns**

data: &#123;slug, enabled: true}

**Request**

```json
{
  "resource": "integrations",
  "action": "enable",
  "params": {
    "slug": "string"
  }
}
```

## `list`

List integration toggles with enabled + plugin-installed state.

**Access:** SyteOps Admin or API key.

**Parameters**

_No parameters._


**Returns**

data.integrations[]: array of &#123;slug, enabled, plugin_installed}

**Request**

```json
{
  "resource": "integrations",
  "action": "list",
  "params": {}
}
```
