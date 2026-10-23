---
title: WordPress Options (single values)
description: MCP tools provided by WordPress Options (single values) (provider id wp-options).
---

{/* GENERATED — do not edit by hand; run `npm run docs:generate` */}

# WordPress Options (single values)

Provider id: `wp-options` · 2 tool(s).

## `get_option_value`

Read ONE value inside a WordPress option. An array or object is never returned whole: you get &#123;exists, type, count, keys:[&#123;key, type}]} and drill in with path; a key that looks like a credential (license key, UUID, hex), and every key under a credential-named parent, is listed as null. A bool is always returned. A string or number returns &#123;exists, type, value}, except when the option name or any key on the path looks like a credential (key, secret, token, password, pass, auth, credential, private, license, salt, nonce, cookie, session, bearer, authorization, cert, api, and compounds like smtppass or licensekey), or its record does (any of its name, key, header, field, id, label, title or slug fields, or type/input_type password or secret, hides every value in that record): then only &#123;exists, type} plus length for a string. Under a credential-shaped name a number is still returned when its key ends in a structural measure (session_timeout, nonce_lifetime, cache_ttl, token_ttl, token_expiry, key_length, password_min_length, max_login_attempts, api_version), and a string under cache_key, meta_key, sort_key, transient_key, foreign_key, column_key or index_key when it is a plain identifier. A string that looks like a credential is hidden whatever it is called (fail closed: an unbroken 16+ character string unless it is an email, clean URL, hostname, date, number, version or lowercase slug). Credential rows are allowlist-only: flowmattic_settings exposes notification_email and notification_email_connect; sq_options and fluentmail-settings are refused (use the sqseo_* and fsmtp_* tools). SyteWide MCP API keys, SyteOps keys and licensing, WordPress salts and the role map report only &#123;exists}.

**Profiles:** `full`, `wp`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `option` | string | yes | Option name (wp_options.option_name). |
| `path` | array,string | no | Key path inside the option. An array of keys is preferred, e.g. ["rates", 0, "label"], and is required when a key contains a dot; a dot-path string "rates.0.label" also works. Omit for the whole option. |


## `update_option_value`

Change ONE existing scalar value inside a WordPress option: reads the option, sets that leaf, saves with update_option (autoload unchanged), then reads back. If the leaf took, it returns verified:true, plus concurrent_change_detected:true and changed_count (a number; no key names) when another key also changed; nothing is reverted. If the leaf did not take, only that leaf is set back and the call fails. Not atomic: a write by someone else between the read and the save is lost. Send value (the leaf keeps its type: an int takes an integral number or numeric string, a float any number, a bool only true/false, a string a string or integer) or increment (an integer, int leaves only). Never creates an option or key and never writes an array or object. Refused: leaves that get_option_value would hide (strings and numbers under credential-shaped names or records; bools are writable), credential-shaped values (set secrets with wp-cli in a terminal so they stay out of the transcript), options whose reads are filtered (pre_option_/option_ hooks) or differ from the stored row or its name casing, hard-denied options, WordPress core options, SyteOps options (use the syteops_* tools), SyteWide options, role/capability/permission/level data, and credential-row paths outside the allowlist. Defaults to a dry run returning &#123;option, path, old, new, type}; a real write needs dry_run:false AND confirm:true.

**Profiles:** `full`, `wp`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `option` | string | yes | Option name (wp_options.option_name). |
| `path` | array,string | no | Key path inside the option. An array of keys is preferred, e.g. ["rates", 0, "label"], and is required when a key contains a dot; a dot-path string "rates.0.label" also works. Omit for the whole option. |
| `value` | string,integer,number,boolean | no | New scalar value. Not with increment. |
| `increment` | integer | no | Add this to an int leaf (negative to subtract). Not with value. |
| `confirm` | boolean | no | Required (true), together with dry_run:false, for a real write. |

