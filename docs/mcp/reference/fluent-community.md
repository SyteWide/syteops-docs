---
title: FluentCommunity
description: MCP tools provided by FluentCommunity (provider id fluent-community).
---

{/* GENERATED — do not edit by hand; run `npm run docs:generate` */}

# FluentCommunity

Provider id: `fluent-community` · 71 tool(s).

## `fc_add_manager`

Grant a user FluentCommunity manager rights (provisional body keys; verified at deploy).

**Profiles:** `full`, `community`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `user_id` | integer | yes | The user ID to make a manager. |


## `fc_add_space_member`

Add a user to a FluentCommunity space.

**Profiles:** `full`, `community`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `space_slug` | string | yes | The space slug. |
| `user_id` | integer | yes | The user ID to add. |
| `role` | string | no | Member role (default member). |


## `fc_add_student`

Enroll a user as a student in a FluentCommunity course (provisional body keys; verified at deploy).

**Profiles:** `full`, `community`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `course_id` | integer | yes | The course ID. |
| `user_id` | integer | yes | The user ID to enroll. |


## `fc_bulk_add_space_members`

Add multiple users to a FluentCommunity space at once (provisional body keys; verified at deploy).

**Profiles:** `full`, `community`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `space_slug` | string | yes | The space slug. |
| `user_ids` | array | yes | User IDs to add. |


## `fc_create_comment`

Comment on a FluentCommunity feed post (as the current API user).

**Profiles:** `full`, `community`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `post_id` | integer | yes | The feed (post) ID to comment on. |
| `message` | string | yes | Comment body. |
| `parent_id` | integer | no | Parent comment ID, for a reply. |


## `fc_create_course`

Create a FluentCommunity course. Requires title, description, privacy, and course_type.

**Profiles:** `full`, `community`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `title` | string | yes | Course title (required). |
| `description` | string | yes | Course description (required). |
| `privacy` | string | yes | Privacy (required): public, private, or secret. |
| `course_type` | string | yes | Course type (required): self_paced, structured, or scheduled. |
| `status` | string | no | Course status (e.g. draft, published). Defaults to draft. |
| `slug` | string | no | Optional slug. |


## `fc_create_invitation`

Create a FluentCommunity invitation. Emails the recipient (provisional body keys; verified at deploy).

**🔴 Destructive** — supports a `dry_run` preview flag.  
**Profiles:** `full`, `community`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `email` | string | yes | Recipient email (required). |
| `message` | string | no | Optional invitation message. |


## `fc_create_lesson`

Create a lesson in a FluentCommunity course. Requires title and section_id. (content is set via update_lesson.)

**Profiles:** `full`, `community`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `course_id` | integer | yes | The course ID. |
| `title` | string | yes | Lesson title (required). |
| `section_id` | integer | yes | Section to place the lesson in (required). |
| `content` | string | no | Lesson content (often ignored at create; set via update_lesson). |
| `status` | string | no | Lesson status. |


## `fc_create_post`

Create a FluentCommunity feed post. Posts as the current API user. Only "message" is required; pass "space_slug" to post into a space.

**Profiles:** `full`, `community`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `message` | string | yes | Post body (required). |
| `space_slug` | string | no | Space slug to post into (omit for a profile/global post). |
| `title` | string | no | Optional post title. |
| `content_type` | string | no | Post content type (e.g. text). |
| `topic_ids` | array | no | Topic IDs to attach. |


## `fc_create_section`

Create a section in a FluentCommunity course (provisional body keys; verified at deploy).

**Profiles:** `full`, `community`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `course_id` | integer | yes | The course ID. |
| `title` | string | yes | Section title (required). |


## `fc_create_space`

Create a FluentCommunity space. "title" and "privacy" are required.

**Profiles:** `full`, `community`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `title` | string | yes | Space title (required). |
| `privacy` | string | yes | Privacy, e.g. public or private (required). |
| `slug` | string | no | Optional URL slug. |
| `description` | string | no | Optional description. |
| `og_image` | string | no | Optional Open Graph image URL. |
| `topic_ids` | array | no | Topic IDs to attach. |


## `fc_create_space_group`

Create a FluentCommunity space group (provisional body keys; verified at deploy).

**Profiles:** `full`, `community`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `title` | string | yes | Group title (required). |
| `slug` | string | no | Optional slug. |


## `fc_create_topic`

Create a FluentCommunity topic (provisional body keys; verified at deploy).

**Profiles:** `full`, `community`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `title` | string | yes | Topic title (required). |
| `slug` | string | no | Optional slug. |


## `fc_create_webhook`

Create a FluentCommunity webhook (provisional body keys; verified at deploy).

**Profiles:** `full`, `community`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `title` | string | no | Webhook title. |
| `url` | string | yes | Target URL. |


## `fc_delete_comment`

Delete a comment from a FluentCommunity feed post.

**🔴 Destructive** — supports a `dry_run` preview flag.  
**Profiles:** `full`, `community`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `post_id` | integer | yes | The feed (post) ID the comment belongs to. |
| `comment_id` | integer | yes | The comment ID to delete. |


## `fc_delete_course`

Permanently delete a FluentCommunity course.

**🔴 Destructive** — supports a `dry_run` preview flag.  
**Profiles:** `full`, `community`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `course_id` | integer | yes | The course ID. |


## `fc_delete_lesson`

Permanently delete a lesson from a FluentCommunity course.

**🔴 Destructive** — supports a `dry_run` preview flag.  
**Profiles:** `full`, `community`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `course_id` | integer | yes | The course ID. |
| `lesson_id` | integer | yes | The lesson ID. |


## `fc_delete_post`

Delete a FluentCommunity feed post by ID.

**🔴 Destructive** — supports a `dry_run` preview flag.  
**Profiles:** `full`, `community`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `post_id` | integer | yes | The feed (post) ID. |


## `fc_delete_section`

Permanently delete a section from a FluentCommunity course.

**🔴 Destructive** — supports a `dry_run` preview flag.  
**Profiles:** `full`, `community`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `course_id` | integer | yes | The course ID. |
| `section_id` | integer | yes | The section ID. |


## `fc_delete_space`

Delete a FluentCommunity space by slug.

**🔴 Destructive** — supports a `dry_run` preview flag.  
**Profiles:** `full`, `community`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `space_slug` | string | yes | The space slug to delete. |


## `fc_delete_space_group`

Delete a FluentCommunity space group.

**🔴 Destructive** — supports a `dry_run` preview flag.  
**Profiles:** `full`, `community`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `group_id` | integer | yes | The space group ID. |


## `fc_delete_topic`

Delete a FluentCommunity topic.

**🔴 Destructive** — supports a `dry_run` preview flag.  
**Profiles:** `full`, `community`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `topic_id` | integer | yes | The topic ID. |


## `fc_delete_webhook`

Delete a FluentCommunity webhook.

**🔴 Destructive** — supports a `dry_run` preview flag.  
**Profiles:** `full`, `community`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `webhook_id` | integer | yes | The webhook ID. |


## `fc_duplicate_course`

Duplicate a FluentCommunity course.

**Profiles:** `full`, `community`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `course_id` | integer | yes | The course ID to duplicate. |


## `fc_enroll_in_course`

Enroll the current user in a FluentCommunity course.

**Profiles:** `full`, `community`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `course_id` | integer | yes | The course ID. |


## `fc_get_comment`

Get a single FluentCommunity comment by its ID.

**Profiles:** `full`, `community`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `comment_id` | integer | yes | The comment ID. |


## `fc_get_course`

Get a FluentCommunity course by ID (admin).

**Profiles:** `full`, `community`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `course_id` | integer | yes | The course ID. |


## `fc_get_member_spaces`

List the spaces a FluentCommunity member belongs to.

**Profiles:** `full`, `community`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `username` | string | yes | The member username. |


## `fc_get_post`

Get a single FluentCommunity feed post by its ID.

**Profiles:** `full`, `community`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `post_id` | integer | yes | The feed (post) ID. |


## `fc_get_post_reactions`

List reactions on a FluentCommunity feed post.

**Profiles:** `full`, `community`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `post_id` | integer | yes | The feed (post) ID. |


## `fc_get_profile`

Get a FluentCommunity member profile by username.

**Profiles:** `full`, `community`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `username` | string | yes | The member username. |


## `fc_get_space`

Get a FluentCommunity space by its slug.

**Profiles:** `full`, `community`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `space_slug` | string | yes | The space slug. |


## `fc_join_space`

Join a FluentCommunity space as the current user.

**Profiles:** `full`, `community`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `space_slug` | string | yes | The space slug. |


## `fc_leave_space`

Leave a FluentCommunity space as the current user.

**Profiles:** `full`, `community`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `space_slug` | string | yes | The space slug. |


## `fc_list_bookmarks`

List the current user's bookmarked FluentCommunity feed posts.

**Profiles:** `full`, `community`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `per_page` | integer | no | Items per page. |
| `page` | integer | no | Page number. |


## `fc_list_comments`

List comments on a FluentCommunity feed post.

**Profiles:** `full`, `community`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `post_id` | integer | yes | The feed (post) ID whose comments to list. |


## `fc_list_courses`

List FluentCommunity courses (admin).

**Profiles:** `full`, `community`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `search` | string | no | Search term. |
| `per_page` | integer | no | Items per page. |
| `page` | integer | no | Page number. |


## `fc_list_invitations`

List FluentCommunity invitations.

**Profiles:** `full`, `community`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `per_page` | integer | no | Items per page. |
| `page` | integer | no | Page number. |


## `fc_list_lessons`

List lessons in a FluentCommunity course.

**Profiles:** `full`, `community`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `course_id` | integer | yes | The course ID. |


## `fc_list_managers`

List FluentCommunity managers (admin).

**Profiles:** `full`, `community`

**Parameters**

_No parameters._


## `fc_list_members`

List FluentCommunity community members.

**Profiles:** `full`, `community`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `search` | string | no | Search term. |
| `per_page` | integer | no | Items per page. |
| `page` | integer | no | Page number. |


## `fc_list_notifications`

List the current user's FluentCommunity notifications.

**Profiles:** `full`, `community`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `per_page` | integer | no | Items per page. |
| `page` | integer | no | Page number. |


## `fc_list_posts`

List FluentCommunity feed posts with optional filters (space slug, author, topic, search).

**Profiles:** `full`, `community`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `space_slug` | string | no | Limit to a space by its slug. |
| `user_id` | integer | no | Limit to posts by this user ID. |
| `topic_slug` | string | no | Limit to a topic by slug. |
| `search` | string | no | Search term. |
| `per_page` | integer | no | Items per page. |
| `page` | integer | no | Page number. |


## `fc_list_routes`

List the FluentCommunity REST routes registered under /fluent-community/v2 and their HTTP methods. Optional "search" substring filter and "limit" (1-500, default 200). Use this to find a path for fc_request.

**Passthrough router** — available in every toolset profile.  
**Profiles:** all profiles

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `search` | string | no | Only return routes whose path contains this substring. |
| `limit` | integer | no | Max routes to return (1-500, default 200). |


## `fc_list_sections`

List sections in a FluentCommunity course.

**Profiles:** `full`, `community`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `course_id` | integer | yes | The course ID. |


## `fc_list_space_groups`

List FluentCommunity space groups.

**Profiles:** `full`, `community`

**Parameters**

_No parameters._


## `fc_list_space_members`

List members of a FluentCommunity space (by slug).

**Profiles:** `full`, `community`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `space_slug` | string | yes | The space slug. |
| `search` | string | no | Search members. |
| `status` | string | no | Filter by member status. |


## `fc_list_spaces`

List all FluentCommunity spaces.

**Profiles:** `full`, `community`

**Parameters**

_No parameters._


## `fc_list_students`

List students enrolled in a FluentCommunity course.

**Profiles:** `full`, `community`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `course_id` | integer | yes | The course ID. |
| `search` | string | no | Search students. |
| `per_page` | integer | no | Items per page. |
| `page` | integer | no | Page number. |


## `fc_list_topics`

List FluentCommunity topics (admin).

**Profiles:** `full`, `community`

**Parameters**

_No parameters._


## `fc_list_webhooks`

List FluentCommunity webhooks (admin).

**Profiles:** `full`, `community`

**Parameters**

_No parameters._


## `fc_mark_all_notifications_read`

Mark all of the current user's FluentCommunity notifications as read.

**Profiles:** `full`, `community`

**Parameters**

_No parameters._


## `fc_mark_notification_read`

Mark a single FluentCommunity notification as read.

**Profiles:** `full`, `community`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `notification_id` | integer | yes | The notification ID. |


## `fc_publish_scheduled_post`

Publish a scheduled FluentCommunity feed post immediately.

**Profiles:** `full`, `community`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `post_id` | integer | yes | The scheduled feed (post) ID. |


## `fc_react_to_comment`

Add or toggle a reaction on a FluentCommunity comment (as the current user).

**Profiles:** `full`, `community`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `post_id` | integer | yes | The feed (post) ID the comment belongs to. |
| `comment_id` | integer | yes | The comment ID. |
| `reaction_type` | string | no | Reaction type (e.g. like). Default like. |


## `fc_react_to_post`

Add or toggle a reaction on a FluentCommunity feed post (as the current user).

**Profiles:** `full`, `community`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `post_id` | integer | yes | The feed (post) ID. |
| `reaction_type` | string | no | Reaction type (e.g. like). Default like. |


## `fc_remove_manager`

Revoke a user's FluentCommunity manager rights.

**🔴 Destructive** — supports a `dry_run` preview flag.  
**Profiles:** `full`, `community`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `user_id` | integer | yes | The manager (user) ID to remove. |


## `fc_remove_space_member`

Remove a user from a FluentCommunity space.

**🔴 Destructive** — supports a `dry_run` preview flag.  
**Profiles:** `full`, `community`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `space_slug` | string | yes | The space slug. |
| `user_id` | integer | yes | The user ID to remove. |


## `fc_remove_student`

Unenroll a student from a FluentCommunity course.

**🔴 Destructive** — supports a `dry_run` preview flag.  
**Profiles:** `full`, `community`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `course_id` | integer | yes | The course ID. |
| `student_id` | integer | yes | The student (user) ID to remove. |


## `fc_request`

Call any FluentCommunity REST route (scoped to /fluent-community/v2). GET runs immediately; POST/PUT/PATCH/DELETE require "confirm": true, or pass "dry_run": true to preview the request. Use fc_list_routes to discover available paths.

**Passthrough router** — available in every toolset profile.  
**Profiles:** all profiles

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `method` | string | yes | HTTP method: GET, POST, PUT, PATCH, or DELETE. |
| `path` | string | yes | Route path within /fluent-community/v2, e.g. /fluent-community/v2/contacts or /fluent-community/v2/contacts/42. |
| `body` | object | no | Request body for writes (JSON object). |
| `query` | object | no | Query-string arguments (JSON object). |
| `confirm` | boolean | no | Required to execute a write (POST/PUT/PATCH/DELETE). |


## `fc_set_lesson_completion`

Mark a lesson complete/incomplete for the current user (provisional body keys; verified at deploy).

**Profiles:** `full`, `community`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `course_id` | integer | yes | The course ID. |
| `lesson_id` | integer | yes | The lesson ID. |
| `status` | string | no | Completion status (e.g. completed, incomplete). |


## `fc_update_comment`

Update a comment on a FluentCommunity feed post.

**Profiles:** `full`, `community`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `post_id` | integer | yes | The feed (post) ID the comment belongs to. |
| `comment_id` | integer | yes | The comment ID to update. |
| `message` | string | yes | Updated comment body. |


## `fc_update_course`

Update a FluentCommunity course (only provided fields change).

**Profiles:** `full`, `community`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `course_id` | integer | yes | The course ID. |
| `title` | string | no |  |
| `description` | string | no |  |
| `status` | string | no |  |
| `slug` | string | no |  |


## `fc_update_lesson`

Update a lesson in a FluentCommunity course.

**Profiles:** `full`, `community`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `course_id` | integer | yes | The course ID. |
| `lesson_id` | integer | yes | The lesson ID. |
| `title` | string | no |  |
| `content` | string | no |  |
| `status` | string | no |  |


## `fc_update_member`

Update a FluentCommunity member (role/status; provisional body keys; verified at deploy).

**Profiles:** `full`, `community`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `user_id` | integer | yes | The member (user) ID. |
| `role` | string | no | Member role. |
| `status` | string | no | Member status. |


## `fc_update_post`

Update a FluentCommunity feed post. The native full-update endpoint requires "message" (resend the body even for small edits).

**Profiles:** `full`, `community`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `post_id` | integer | yes | The feed (post) ID. |
| `message` | string | yes | Post body (required by the native update endpoint). |
| `title` | string | no |  |
| `status` | string | no | Post status (e.g. published, draft). |
| `content_type` | string | no |  |
| `topic_ids` | array | no |  |
| `new_space_id` | string | no | Move the post to another space (space ID). |


## `fc_update_profile`

Update a FluentCommunity member profile (provisional body keys; verified at deploy).

**Profiles:** `full`, `community`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `username` | string | yes | The member username. |
| `display_name` | string | no | Display name. |
| `short_description` | string | no | Profile bio/short description. |


## `fc_update_scheduled_post`

Update a scheduled FluentCommunity feed post (provisional body keys; verified at deploy).

**Profiles:** `full`, `community`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `post_id` | integer | yes | The scheduled feed (post) ID. |
| `message` | string | no | Updated post body. |
| `title` | string | no | Updated title. |
| `scheduled_at` | string | no | New scheduled time (Y-m-d H:i:s). |


## `fc_update_section`

Update a section in a FluentCommunity course.

**Profiles:** `full`, `community`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `course_id` | integer | yes | The course ID. |
| `section_id` | integer | yes | The section ID. |
| `title` | string | no |  |


## `fc_update_space`

Update a FluentCommunity space (by slug). Only provided fields change.

**Profiles:** `full`, `community`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `space_slug` | string | yes | The space slug to update. |
| `title` | string | no |  |
| `description` | string | no |  |
| `privacy` | string | no |  |
| `slug` | string | no | New slug. |
| `topic_ids` | array | no |  |


## `fc_update_space_group`

Update a FluentCommunity space group (provisional body keys; verified at deploy).

**Profiles:** `full`, `community`

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `group_id` | integer | yes | The space group ID. |
| `title` | string | no |  |
| `slug` | string | no |  |

