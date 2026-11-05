---
title: LinkedIn Groups
sidebar_label: LinkedIn Groups
description: Manage API operations for the linkedin_groups resource.
---

{/* GENERATED — do not edit by hand; run `npm run docs:generate` */}

# `linkedin_groups`

3 operation(s). All run through `POST /syteops/v1/manage/dispatch` (reads may use the documented GET form).

## `add`

Save one LinkedIn group to one person's list, as their hub card does, and answer the updated list. address is either the numeric group id (1234567) or the group's own page address (https://www.linkedin.com/groups/1234567/, on linkedin.com or www.linkedin.com, with or without the closing slash; a query string or fragment is dropped); only the numeric id is stored. Any other host, a look-alike host, another scheme, a slug address, an extra path, a port, a user name in the address or a value with spaces is 422 invalid_address. name is plain text of 1 to 80 characters with no angle brackets: blank is 422 name_required and anything else wrong is 422 name_invalid (it is refused, never cleaned): too long, an angle bracket, a control character, an invisible or direction-changing character (zero-width and bidi marks; the joiner inside an emoji sequence is fine), or no visible character at all. A control character anywhere in address (a tab, a carriage return, a newline, a NUL) is 422 invalid_address; only plain spaces around it are ignored. The same group twice is 409 duplicate_group; a 21st group is 409 list_full (a person keeps at most 20); an unknown person is 404 user_not_found; a save that did not stick is 500 write_failed. Writes for one person are serialized on the server (a lock per person, so two calls cannot erase each other's add): a call that cannot get it within about 5 seconds is 409 busy, retryable, and nothing is written. Works whether or not the Share to LinkedIn dialog is offered to that person, so groups can be staged before it is. Not destructive. Writes only that person's list and leaves a debug-log line (person and group id only).

**Access:** SyteOps Admin or API key.

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `user_id` | integer | yes | WordPress user id of the person whose saved LinkedIn groups to use. 404 user_not_found when no such user. Digits only; the list read or written is that person's and nobody else's. |
| `name` | string | yes | The group's name as the person will see it in the dialog: plain text, 1 to 80 characters, no angle brackets, control characters or invisible characters. A JSON string only. |
| `address` | string | yes | The LinkedIn group: its numeric id (1234567) or its page address (https://www.linkedin.com/groups/1234567/). A JSON string only; a number, boolean or list is 422 invalid_params. |


**Returns**

data: &#123;user_id, groups[], count, max}; groups is the person's whole list after the call, in saved order, each &#123;id, name, url}: id is LinkedIn's numeric group id as a string, name the saved name, url the page the group opens at (https://www.linkedin.com/groups/&#123;id}/); count is the number saved and max the most one person may save (20)

**Request**

```json
{
  "resource": "linkedin_groups",
  "action": "add",
  "params": {
    "user_id": 12,
    "name": "Marketing Leaders",
    "address": "https://www.linkedin.com/groups/1234567/"
  }
}
```

## `list`

Read one person's saved LinkedIn groups, the list their Share to LinkedIn dialog offers. Read-only. Works whether or not the dialog is offered to that person right now. 404 user_not_found when user_id is not a WordPress user.

**Access:** SyteOps Admin or API key.

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `user_id` | integer | yes | WordPress user id of the person whose saved LinkedIn groups to use. 404 user_not_found when no such user. Digits only; the list read or written is that person's and nobody else's. |


**Returns**

data: &#123;user_id, groups[], count, max}; groups is the person's whole list after the call, in saved order, each &#123;id, name, url}: id is LinkedIn's numeric group id as a string, name the saved name, url the page the group opens at (https://www.linkedin.com/groups/&#123;id}/); count is the number saved and max the most one person may save (20)

**Request**

```json
{
  "resource": "linkedin_groups",
  "action": "list",
  "params": {
    "user_id": 12
  }
}
```

## `remove`

Remove one saved LinkedIn group from one person's list and answer the updated list. Destructive: send confirm:true on every call, or the answer is 409 confirmation_required and nothing changes. id is the group's numeric id exactly as list returns it (an address is not accepted here): a value that is not a numeric group id is 422 invalid_group_id, and an id that is not in that person's list is 404 group_not_found with nothing changed. An unknown person is 404 user_not_found; a save that did not stick is 500 write_failed; a call that cannot get the person's write lock within about 5 seconds is 409 busy, retryable, and nothing changes. Leaves a lasting activity row in the Content Pipelines ledger (a manage_destructive row with the person's user id and the group id, and no name or address), and a debug-log line. Works whether or not the Share to LinkedIn dialog is offered to that person.

**🔴 Destructive**  
**Access:** SyteOps Admin or API key, plus `confirm: true`.

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `user_id` | integer | yes | WordPress user id of the person whose saved LinkedIn groups to use. 404 user_not_found when no such user. Digits only; the list read or written is that person's and nobody else's. |
| `id` | string | yes | The numeric LinkedIn group id to remove, as list returns it (digits only, no leading zero). A JSON string only. |
| `confirm` | boolean | no | Must be true. |


**Returns**

data: &#123;user_id, groups[], count, max}; groups is the person's whole list after the call, in saved order, each &#123;id, name, url}: id is LinkedIn's numeric group id as a string, name the saved name, url the page the group opens at (https://www.linkedin.com/groups/&#123;id}/); count is the number saved and max the most one person may save (20)

**Request**

```json
{
  "resource": "linkedin_groups",
  "action": "remove",
  "params": {
    "user_id": 12,
    "id": "1234567"
  },
  "confirm": true
}
```
