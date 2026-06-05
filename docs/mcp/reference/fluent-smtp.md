---
title: FluentSMTP
description: MCP tools provided by FluentSMTP (provider id fluent-smtp).
---

<!-- GENERATED — do not edit by hand; run `npm run docs:generate` -->

# FluentSMTP

Provider id: `fluent-smtp` · 3 tool(s).

## `fsmtp_get_email_log`

Get a single FluentSMTP email-log record by ID, including recipients, subject, body, and delivery status. Raw transport headers/responses are withheld for security.

**Profiles:** `full`, `smtp`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | integer | yes | Email log ID. |


## `fsmtp_get_settings`

Get FluentSMTP connection configuration (providers, sender emails/names, routing) with all secrets (passwords, API keys, tokens) redacted.

**Profiles:** `full`, `smtp`

**Parameters**

_No parameters._


## `fsmtp_list_email_logs`

List FluentSMTP email-delivery logs (newest first). Filter by status and search; paginate with page/per_page. Email bodies are omitted here — use fsmtp_get_email_log for the full record.

**Profiles:** `full`, `lean`, `smtp`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `status` | string | no | Filter by status (sent, failed, pending, resent). |
| `search` | string | no | Search the subject line. |
| `per_page` | integer | no | Items per page (default 20, max 100). |
| `page` | integer | no | Page number. |

