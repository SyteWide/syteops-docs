---
sidebar_position: 5
title: LinkCentral Integration
description: Automatic keyword linking and internal cross-linking for your WordPress content.
---

# LinkCentral Integration

SyteOps integrates with [LinkCentral](https://designforwp.com/linkcentral/) to automatically insert keyword links and internal cross-links into your WordPress posts. When combined with the ContentPen publishing workflow, links are inserted automatically as posts are created — no manual editing required.

The result: every article gets relevant affiliate links, product links, and internal cross-links inserted in natural positions, with proper SEO attributes, all controlled by your LinkCentral link library and SyteOps settings.

## What It Does

When you trigger the LinkCentral integration on a post, SyteOps:

- Scans the post content for keywords that match links in your LinkCentral library
- Inserts those links with the correct nofollow and sponsored attributes
- Finds related posts on your site and adds internal cross-links to strengthen your SEO
- Respects density limits so your content reads naturally — no link spam

## Requirements

- SyteOps installed and activated
- LinkCentral installed and activated on the same WordPress site
- FlowMattic installed and activated (for workflow automation)

## Setup

### 1. Enable the Integration

1. Navigate to the **Integrations** tab in SyteOps settings
2. Find **LinkCentral** in the SEO & Content category
3. Toggle it **ON**
4. Click **Save Changes**

### 2. Configure Settings

1. Go to the **System / API** tab
2. Scroll to the **LinkCentral Auto-Linking** card
3. Set your **API Token** — this is a password that FlowMattic will use to authenticate when calling the endpoint. Choose any strong random string (e.g., generate one with a password manager)
4. Adjust the linking settings to your preference (see Settings Reference below)
5. Click **Save Changes**

The card also displays the **Process Links Endpoint** URL. Copy this — you'll need it for the FlowMattic step.

### 3. Add the FlowMattic Workflow Step

This step adds automatic link processing to your content publishing workflow. Add it after the step that creates the WordPress post.

1. Open your FlowMattic workflow (e.g., the ContentPen Publishing Workflow)
2. Find the step that creates the WordPress post (the one that outputs a `post_id`)
3. Add a new step **after** it
4. Choose **API by FlowMattic** as the app
5. Configure the step:

| Field | Value |
|-------|-------|
| **Method** | POST |
| **API Endpoint** | Paste the Process Links Endpoint URL from your SyteOps settings |
| **Authentication** | Bearer Token |
| **Token** | The API token you set in step 2 |
| **Content-Type** | application/json |

6. Set the request body to:

```json
{"post_id": {wordpress_step.post_id}}
```

Replace `{wordpress_step.post_id}` with the actual FlowMattic variable reference from your post creation step (e.g., `{wordpress10.post_id}`).

7. Save the workflow

The integration works with any FlowMattic workflow that creates or updates posts — not just ContentPen workflows.

## Settings Reference

| Setting | Default | Description |
|---------|---------|-------------|
| **API Token** | — | Authentication token for the REST endpoint. Set this to any strong random string and use the same value in FlowMattic. |
| **Max LC Links per 500 Words** | 3 | Controls link density. A 1,000-word post would get up to 6 keyword links. |
| **Max Cross-Links per Post** | 3 | Maximum internal links to related posts. Set to 0 to disable cross-linking. |
| **First Occurrence Only** | On | When enabled, each keyword is linked only once (the first time it appears). |
| **Open Links in New Tab** | Off | When enabled, auto-inserted links open in a new browser tab. |
| **Cross-Link Mode** | Heuristic | Choose between taxonomy-based matching (free, fast) or AI-enhanced scoring (requires OpenAI). |
| **Min Word Gap** | 50 | Minimum number of words between consecutive auto-inserted links. Prevents link clustering. |
| **LC Category Filter** | All | Comma-separated LinkCentral category IDs. Leave empty to use keywords from all categories. |
| **Cross-Link Post Types** | post | Comma-separated post types to consider for cross-linking (e.g., post,page). |

## How It Works

When the endpoint is called with a post ID:

1. **Load keywords** — SyteOps reads your LinkCentral link library and builds an index of keywords mapped to their link URLs, SEO attributes, and density settings.
2. **Clean previous runs** — Any links from a previous auto-linking run are removed first, so the process always starts fresh. Manual links you added yourself are never touched.
3. **Scan paragraphs** — The engine walks through your post content paragraph by paragraph, skipping headings, existing links, code blocks, and shortcodes.
4. **Insert keyword links** — When a keyword match is found, it inserts a link to the corresponding LinkCentral URL with the correct nofollow/sponsored attributes.
5. **Insert cross-links** — Related posts are identified by shared categories and tags, and contextual links are placed in relevant paragraphs.
6. **Save** — The updated content is saved back to the post (unless you used dry-run mode).

The process is **idempotent**: running it again on the same post produces the same result. It removes its own previous links before re-processing, so you can safely re-run it after updating your LinkCentral keywords.

## Cross-Link Modes

### Heuristic (Default)

Finds related posts by looking at shared categories and tags. Posts that share more taxonomy terms with your article score higher. Recent posts get a small bonus.

This mode is fast, free, and works well for most sites.

### AI-Enhanced

Uses OpenAI to score candidate posts for relevance and generate natural-sounding anchor text. Produces higher quality cross-links but adds a small delay and uses your OpenAI API quota.

**Requirements:**
- OpenAI integration enabled in the SyteOps Integrations tab
- OpenAI API key configured in the System / API tab

If OpenAI is unavailable (API error, rate limit, etc.), the integration automatically falls back to heuristic mode.

## Dry Run / Preview

You can test the integration without saving changes to the post. This is useful for verifying your settings before going live.

**Option 1:** Use the preview endpoint. Send a POST request to:

```
https://yoursite.com/wp-json/syteops/v1/linkcentral/preview-links
```

with the same body as the main endpoint. This always returns proposed changes without modifying the post.

**Option 2:** Add `"dry_run": true` to your request body:

```json
{"post_id": 12345, "dry_run": true}
```

Both options return the full response showing which links would be inserted, where they would go, and any warnings.

## Troubleshooting

**"No keywords found in LinkCentral index"**
LinkCentral doesn't have any published links with keywords configured. Open LinkCentral and make sure your links have keywords assigned.

**"LinkCentral integration is not enabled" (503 error)**
The LinkCentral toggle is off. Go to the Integrations tab, enable LinkCentral, and save.

**"Unauthorized" or "Invalid token" (401 error)**
The API token in your FlowMattic step doesn't match the one saved in SyteOps settings. Copy the exact token from your SyteOps System / API tab into your FlowMattic Bearer Token field.

**"API token not configured" (401 error)**
No API token has been saved in SyteOps yet. Go to the System / API tab, enter a token in the LinkCentral card, and save.

**Links not appearing in the post**
- Verify the post is in draft, publish, pending, or future status
- Verify the post has actual content (not empty)
- Check the response from the endpoint — the `total_links_inserted` field tells you how many links were added. If zero, check the `warnings` array for details.
- Make sure your LinkCentral keywords actually appear in the post content

**Cross-links not appearing**
- The post needs to have categories or tags assigned for the cross-linker to find related posts
- There must be other published posts sharing those categories or tags
- If using AI mode: verify the OpenAI integration is enabled and the API key is valid
