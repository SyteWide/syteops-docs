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
| **Cross-Link Mode** | Heuristic | Choose between taxonomy-based matching (free, fast) or AI-enhanced scoring (requires an AI provider). |
| **Min Word Gap** | 50 | Minimum number of words between consecutive auto-inserted links. Prevents link clustering. |
| **LC Category Filter** | All | Comma-separated LinkCentral category IDs. Leave empty to use keywords from all categories. |
| **Cross-Link Post Types** | post | Comma-separated post types to consider for cross-linking (e.g., post,page). |

## Keyword Enrichment

Links in your LinkCentral library need keywords before the auto-linker can insert them into posts. If you have links with no keywords, or links whose keywords were added manually and you want AI to improve them, use the **Enrich Keywords with AI** tool.

### Running Bulk Enrichment

1. Go to the **System / API** tab in SyteOps settings
2. Scroll to the **LinkCentral** card
3. Click **Enrich Keywords with AI**

SyteOps processes your eligible links in parallel, generating keyword phrases for each one based on the link title, destination URL, and optional additional context. Progress is shown in real time. Click **Stop Enriching** at any time to pause — already-enriched links are saved immediately.

When enrichment is complete, a summary shows how many links were enriched and lists any that were skipped with the reason.

### Re-Enriching

Check **Re-enrich AI-enriched links** before starting if you want to regenerate keywords for links that already have AI-generated keywords (for example, after changing your AI model or custom prompt). Links whose keywords were set manually are never overwritten.

### Enrichment Settings

| Setting | Default | Description |
|---------|---------|-------------|
| **Keywords per Link** | 5 | Number of keyword phrases the AI generates per link. Higher values give the auto-linker more chances to match but may reduce per-keyword quality. Recommended maximum: 25. |
| **Default Density** | Medium | How frequently each keyword link is inserted across posts. **High** inserts the link up to 3 times per post; **Medium** inserts once per post; **Low** inserts once across several posts. The AI may override this per keyword when it has a strong signal. |
| **Batch Size** | 1 | How many links each worker processes per request (1–50). Keep this low (1–5) when using multiple concurrent workers. Larger values reduce round-trips but increase the work done per request. |
| **Concurrent Workers** | 2 | Number of links processed in parallel (1–5). Increasing this speeds up large enrichment runs — for example, 3 workers process roughly 3× as fast as 1. Higher values consume more AI API quota simultaneously. |
| **Context Layers** | All on | Three optional sources of context the AI uses to generate better keywords: **Perplexity AI web search** (looks up the destination URL to describe what the page offers), **Page metadata fetch** (reads Open Graph tags and JSON-LD from the destination URL), and **LinkCentral categories** (your link's assigned categories). Disabling layers speeds up enrichment at some cost to keyword quality. |
| **Custom Prompt** | — | Additional instructions appended to every AI keyword request. Use this to guide the style or focus of keywords (e.g., "Focus on buyer-intent phrases" or "Use UK English spelling"). |

### AI Provider for Enrichment

Enrichment uses a separately configured AI provider from the main cross-link AI settings. Click **Configure AI Provider** in the LinkCentral enrichment section of the System / API tab to choose your provider, model, and token limit.

[OpenRouter](https://openrouter.ai/) is recommended because it aggregates models from all major providers under a single API key.

### Tips for Large Libraries

- Start with **Concurrent Workers: 3** and **Batch Size: 1** for the best combination of speed and reliability
- If you see links skipped due to timeouts, SyteOps automatically retries each failed request once with a longer timeout before marking it as skipped
- Run enrichment in smaller passes (using the stop button) if you want to review results incrementally
- After enrichment, re-run your ContentPen publishing workflow on existing posts to pick up the new keywords

## How It Works

When the endpoint is called with a post ID:

1. **Load keywords** — SyteOps reads your LinkCentral link library and builds an index of keywords mapped to their link URLs, SEO attributes, and density settings. Keyword enrichment uses layered context — combining Perplexity web search, page metadata, and link categories — to produce more accurate keyword matches.
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

Uses your configured AI provider to score candidate posts for relevance and generate natural-sounding anchor text. Produces higher quality cross-links but adds a small delay and uses your AI provider's API quota.

SyteOps supports six AI providers for cross-link scoring: **OpenAI**, **Anthropic**, **OpenRouter** (recommended), **Gemini**, **Perplexity**, and **Straico**. OpenRouter is recommended because it gives you access to models from all providers with a single API key.

**Requirements:**
- At least one AI provider API key configured in the **System / API** tab
- An AI provider and model selected for LinkCentral (click **Configure AI Provider** in the LinkCentral settings card)

If the AI provider is unavailable (API error, rate limit, missing key, etc.), the integration automatically falls back to heuristic mode.

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
- If using AI mode: verify your AI provider API key is valid and a model is selected for LinkCentral

## REST API Reference

All endpoints require Bearer token authentication. Use the API token you configured in the LinkCentral settings card.

```
Authorization: Bearer {your_api_token}
Content-Type: application/json
```

### Process Links

**POST** `/wp-json/syteops/v1/linkcentral/process-links`

Processes a post by inserting keyword links and cross-links.

**Request body:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `post_id` | integer | Yes | The WordPress post ID to process. |
| `dry_run` | boolean | No | When `true`, returns proposed changes without modifying the post. Default: `false`. |
| `options` | object | No | Override default settings for this request (see Options below). |

**Options object** (all fields optional — omit to use your saved settings):

| Field | Type | Description |
|-------|------|-------------|
| `max_lc_links_per_500_words` | integer | Override max keyword links per 500 words. |
| `max_crosslinks` | integer | Override max cross-links per post. |
| `crosslink_mode` | string | `"heuristic"` or `"ai"`. |
| `first_occurrence` | boolean | Override first-occurrence-only setting. |
| `target_blank` | boolean | Override open-in-new-tab setting. |

**Example request:**

```json
{
  "post_id": 12345,
  "dry_run": false,
  "options": {
    "max_crosslinks": 5,
    "crosslink_mode": "ai"
  }
}
```

**Success response (200):**

```json
{
  "ok": true,
  "post_id": 12345,
  "dry_run": false,
  "linkcentral_links_inserted": 5,
  "crosslinks_inserted": 2,
  "total_links_inserted": 7,
  "word_count": 1200,
  "links_per_500_words": 2.92,
  "crosslink_mode": "ai",
  "details": {
    "linkcentral": [
      {"keyword": "project management", "url": "https://...", "position": "paragraph_2"}
    ],
    "crosslinks": [
      {"post_id": 456, "title": "Related Post", "anchor": "related topic", "url": "https://...", "position": "paragraph_4"}
    ]
  },
  "warnings": [],
  "processing_time_ms": 245
}
```

**Error responses:**

| Status | Code | Cause |
|--------|------|-------|
| 400 | `invalid_post_id` | Missing or invalid `post_id`. |
| 401 | `unauthorized` | Missing or invalid Bearer token. |
| 404 | `post_not_found` | Post does not exist. |
| 503 | `integration_disabled` | LinkCentral integration is not enabled. |

### Preview Links

**POST** `/wp-json/syteops/v1/linkcentral/preview-links`

Identical to Process Links but always runs in dry-run mode. The post is never modified.

**Request body:** Same as Process Links (the `dry_run` field is ignored — always treated as `true`).

### Status

**GET** `/wp-json/syteops/v1/linkcentral/status`

Returns integration health, keyword index status, and available configuration.

**Response (200):**

```json
{
  "ok": true,
  "linkcentral_active": true,
  "keyword_count": 42,
  "index_last_built": "2026-03-30 14:22:00",
  "index_ttl_remaining_seconds": 3200,
  "integration_enabled": true,
  "crosslink_modes_available": ["heuristic", "ai"],
  "ai_provider": "openrouter",
  "ai_provider_configured": true,
  "openai_key_configured": true,
  "settings": {
    "max_lc_links_per_500_words": 3,
    "max_crosslinks": 3,
    "first_occurrence_only": true,
    "default_crosslink_mode": "heuristic"
  }
}
```

:::note
The `openai_key_configured` field is kept for backward compatibility. New integrations should use `ai_provider_configured` and `ai_provider` instead.
:::
