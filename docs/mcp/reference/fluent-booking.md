---
title: FluentBooking
description: MCP tools provided by FluentBooking (provider id fluent-booking).
---

<!-- GENERATED — do not edit by hand; run `npm run docs:generate` -->

# FluentBooking

Provider id: `fluent-booking` · 21 tool(s).

## `fbook_create_booking`

Book an appointment on a host's behalf. Emails attendees after creation. event_time is interpreted in the supplied timezone. The event must be published/active regardless of ignore_availability — ignore_availability only bypasses the slot-availability check, not the event-active check. Use extra to pass additional fields not listed in the schema.

**🔴 Destructive** — supports a `dry_run` preview flag.  
**Profiles:** `full`, `booking`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `event_id` | integer | yes | Event (meeting type) ID. |
| `name` | string | yes | Attendee full name. |
| `email` | string | yes | Attendee email. |
| `timezone` | string | yes | Attendee timezone (e.g. America/Chicago). |
| `event_time` | string | yes | Slot start time in the attendee's timezone (Y-m-d H:i:s). |
| `location_type` | string | no | Location type override. |
| `location_description` | string | no | Location description. |
| `guests` | array | no | Additional guest emails (strings) or \{name,email\} objects for multi-guest events. |
| `message` | string | no | Attendee message. |
| `phone_number` | string | no | Attendee phone number. |
| `status` | string | no | Initial booking status (defaults to plugin default). |
| `source` | string | no | Booking source (default: admin). |
| `host_user_id` | integer | no | Host WordPress user ID to override the event's default host. |
| `ignore_availability` | boolean | no | If true, bypass availability checks. |
| `custom_fields` | object | no | Custom field values keyed by field name. |
| `extra` | object | no | Additional body fields merged in before all named params. |


## `fbook_create_calendar`

Create a FluentBooking calendar (host). Body is wrapped under a top-level "calendar" key. Required slot keys: duration (≥5), event_type, availability_type, schedule_type, title (plus weekly_schedules/location_settings as needed). Use the "calendar" escape object to merge additional fields last.

**Profiles:** `full`, `booking`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `author_timezone` | string | no | IANA timezone for the calendar host (e.g. America/New_York). |
| `type` | string | no | Calendar type (e.g. simple = default host calendar, one per user; or team). |
| `title` | string | no | Calendar title. |
| `slug` | string | no | URL slug; auto-generated if omitted. |
| `slot` | object | no | Meeting-type config. Required keys: duration (int, ≥5 min), event_type (string), availability_type (string), schedule_type (string), title (string). Include weekly_schedules and location_settings as needed. |
| `calendar` | object | no | Escape hatch: additional fields merged into the calendar object last, overriding named params. |


## `fbook_create_event`

Create a FluentBooking event type (meeting type) on a calendar. Body is FLAT (not wrapped). Required settings keys: schedule_type and weekly_schedules. Use "extra" to merge additional fields first.

**Profiles:** `full`, `booking`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `calendar_id` | integer | yes | Calendar ID to add the event to. |
| `title` | string | yes | Event type title. |
| `duration` | integer | yes | Meeting duration in minutes (≥5). |
| `event_type` | string | yes | Event type (e.g. one_to_one, group). |
| `status` | string | no | active (default) or draft. |
| `description` | string | no | Event description. |
| `location_settings` | array | no | Location config items (each an object with type, etc.). |
| `settings` | object | no | Availability settings. Must include schedule_type and weekly_schedules. |
| `extra` | object | no | Additional fields merged into the request body first. |


## `fbook_delete_booking`

Permanently delete a FluentBooking appointment (schedule) by ID.

**🔴 Destructive** — supports a `dry_run` preview flag.  
**Profiles:** `full`, `booking`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `booking_id` | integer | yes | Booking (schedule) ID. |


## `fbook_delete_calendar`

Permanently delete a FluentBooking calendar and all its event types.

**🔴 Destructive** — supports a `dry_run` preview flag.  
**Profiles:** `full`, `booking`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `calendar_id` | integer | yes | Calendar ID to delete. |


## `fbook_delete_event`

Permanently delete a FluentBooking event type from a calendar.

**🔴 Destructive** — supports a `dry_run` preview flag.  
**Profiles:** `full`, `booking`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `calendar_id` | integer | yes | Calendar ID. |
| `event_id` | integer | yes | Event type ID to delete. |


## `fbook_duplicate_event`

Duplicate a FluentBooking event type (creates a "(clone)" draft). Optionally clone into a different calendar via new_calendar_id; defaults to the source calendar.

**Profiles:** `full`, `booking`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `calendar_id` | integer | yes | Source calendar ID. |
| `event_id` | integer | yes | Source event type ID. |
| `new_calendar_id` | integer | no | Target calendar ID; defaults to source calendar if omitted. |


## `fbook_get_available_slots`

Get available booking time slots for an event type, optionally from a start date and in a timezone.

**Profiles:** `full`, `lean`, `booking`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `event_id` | integer | yes | Event (meeting type) ID. |
| `start_date` | string | no | Start date (Y-m-d); defaults to now. |
| `timezone` | string | no | Timezone (e.g. America/Chicago); defaults to UTC. |


## `fbook_get_booking`

Get a FluentBooking appointment (schedule) by ID.

**Profiles:** `full`, `lean`, `booking`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `id` | integer | yes | Schedule (booking) ID. |
| `with_all_data` | boolean | no | Include extended meta/info. |


## `fbook_get_booking_activities`

Get the activity log for a FluentBooking appointment (schedule).

**Profiles:** `full`, `booking`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `booking_id` | integer | yes | Booking (schedule) ID. |


## `fbook_get_calendar`

Get a FluentBooking calendar by ID, including its event types ("slots").

**Profiles:** `full`, `booking`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `calendar_id` | integer | yes | Calendar ID. |


## `fbook_get_event`

Get a FluentBooking event type (meeting type) by calendar ID and event ID, with full settings.

**Profiles:** `full`, `booking`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `calendar_id` | integer | yes | Calendar ID. |
| `event_id` | integer | yes | Event (meeting type) ID. |


## `fbook_get_reports`

Get FluentBooking booking report summary. Defaults to the last 30 days when start_time/end_time are omitted.

**Profiles:** `full`, `booking`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `start_time` | string | no | Report start time (Y-m-d or datetime string). Defaults to 30 days ago. |
| `end_time` | string | no | Report end time (Y-m-d or datetime string). Defaults to now. |


## `fbook_list_bookings`

List FluentBooking appointments (schedules). Defaults to upcoming; pass period="all" for everything. Filter by host/calendar, event, and date range.

**Profiles:** `full`, `lean`, `booking`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `period` | string | no | upcoming, completed, cancelled, pending, no_show, latest_bookings, or all. |
| `author` | string | no | Host/calendar filter: a user ID, calendar ID, "me", or "all". |
| `event` | integer | no | Limit to a specific event (meeting type) ID. |
| `email` | string | no | Filter by attendee email. |
| `date_from` | string | no | Range start (Y-m-d). Requires date_to. |
| `date_to` | string | no | Range end (Y-m-d). Requires date_from. |
| `search` | string | no | Search term. |
| `per_page` | integer | no | Items per page (default 15). |
| `page` | integer | no | Page number. |


## `fbook_list_calendars`

List FluentBooking calendars (hosts). Each calendar embeds its event types ("slots").

**Profiles:** `full`, `lean`, `booking`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `search` | string | no | Search term. |
| `calendar_type` | string | no | Filter by calendar type (e.g. simple) or "all". |
| `per_page` | integer | no | Items per page (default 15). |
| `page` | integer | no | Page number. |


## `fbook_list_routes`

List the FluentBooking REST routes registered under /fluent-booking/v2 and their HTTP methods. Optional "search" substring filter and "limit" (1-500, default 200). Use this to find a path for fbook_request.

**Passthrough router** — available in every toolset profile.  
**Profiles:** all profiles

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `search` | string | no | Only return routes whose path contains this substring. |
| `limit` | integer | no | Max routes to return (1-500, default 200). |


## `fbook_request`

Call any FluentBooking REST route (scoped to /fluent-booking/v2). GET runs immediately; POST/PUT/PATCH/DELETE require "confirm": true, or pass "dry_run": true to preview the request. Use fbook_list_routes to discover available paths.

**Passthrough router** — available in every toolset profile.  
**Profiles:** all profiles

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `method` | string | yes | HTTP method: GET, POST, PUT, PATCH, or DELETE. |
| `path` | string | yes | Route path within /fluent-booking/v2, e.g. /fluent-booking/v2/contacts or /fluent-booking/v2/contacts/42. |
| `body` | object | no | Request body for writes (JSON object). |
| `query` | object | no | Query-string arguments (JSON object). |
| `confirm` | boolean | no | Required to execute a write (POST/PUT/PATCH/DELETE). |


## `fbook_send_confirmation_email`

Send (or resend) the confirmation email for a booking. Triggers real email delivery.

**🔴 Destructive** — supports a `dry_run` preview flag.  
**Profiles:** `full`, `booking`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `booking_id` | integer | yes | Booking (schedule) ID. |
| `email_to` | string | no | Recipient: guest (default) or host. |


## `fbook_set_booking_status`

Update a booking's status via a single-field status update (PUT /schedules/&#123;id}). Accepted statuses: scheduled, completed, cancelled, rejected, no_show. Pass reason (sent as cancel_reason or reject_reason) for cancelled/rejected — the API reads it raw so an empty string is sent when omitted. Pass refund_payment=true to trigger a refund for cancelled/rejected bookings. Pass update_all=true to bulk-update a multi-guest group for no_show/completed. Note: the API rejects setting a value equal to the current one ("No changes found").

**🔴 Destructive** — supports a `dry_run` preview flag.  
**Profiles:** `full`, `booking`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `booking_id` | integer | yes | Booking (schedule) ID. |
| `status` | string | yes | New status. |
| `reason` | string | no | Reason used as cancel_reason (cancelled) or reject_reason (rejected). |
| `refund_payment` | boolean | no | Trigger a payment refund; only honored for cancelled/rejected. |
| `update_all` | boolean | no | Bulk-update all guests in a multi-guest group; only honored for no_show/completed. |


## `fbook_update_booking_field`

Edit one attendee or booking field via a single-field update (PUT /schedules/&#123;id}); edits one stored booking field per call. Note: the API rejects setting a value equal to the current one ("No changes found").

**Profiles:** `full`, `booking`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `booking_id` | integer | yes | Booking (schedule) ID. |
| `field` | string | yes | Field to update. |
| `value` | string | yes | New value for the field. |


## `fbook_update_event_details`

Update a FluentBooking event type's details (POST to /details endpoint). Body is FLAT. title and duration are always required by the API (it is a full-details save, not a partial patch). For group events, max_book_per_slot and is_display_spots are also required. Use "extra" to merge additional fields first.

**Profiles:** `full`, `booking`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `calendar_id` | integer | yes | Calendar ID. |
| `event_id` | integer | yes | Event type ID. |
| `title` | string | yes | New title. |
| `duration` | integer | yes | New duration in minutes. |
| `status` | string | no | active or draft. |
| `description` | string | no | Event description. |
| `color_schema` | string | no | Hex color string (e.g. #ff0000). |
| `max_book_per_slot` | integer | no | Max bookings per slot (required for group events). |
| `is_display_spots` | integer | no | 0 or 1 — whether to show remaining spots (required for group events). |
| `location_settings` | array | no | Location config items. |
| `settings` | object | no | Event settings object (e.g. multi_duration). Does NOT update availability schedules or booking limits — those are separate endpoints (use fbook_request). |
| `extra` | object | no | Additional fields merged into the request body first. |

