---
sidebar_position: 5
title: LinkCentral Integration
description: Automatic keyword linking and internal cross-linking for your WordPress content.
---

# LinkCentral Integration

**Tier: AI-Powered** — Full admin experience with deep AI features. You pick which AI provider and model to use for keyword matching and enrichment; SyteOps runs the work in the background with built-in quality gating.

SyteOps integrates with [LinkCentral](https://designforwp.com/linkcentral/) to automatically insert keyword links and internal cross-links into your WordPress posts. When combined with a content-source publishing workflow, links are inserted automatically as posts are created — no manual editing required.

The result: every article gets relevant affiliate links, product links, and internal cross-links inserted in natural positions, with proper SEO attributes, all controlled by your LinkCentral link library and SyteOps settings.

## What It Does

When you trigger the LinkCentral integration on a post, SyteOps:

- Scans the post content for keywords that match links in your LinkCentral library
- Inserts those links with the correct nofollow and sponsored attributes
- Finds related posts on your site and adds internal cross-links to strengthen your SEO
- Respects density limits so your content reads naturally — no link spam

Your managed links are also available in the [Review Portal](../features/review-and-publish-your-post.md#formatting-and-links): a reviewer editing a draft can search the library and drop a managed link straight into the body text.

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
3. Open the **API & FlowMattic** section (at the bottom of the card) and set your **API Token** — this is a password that FlowMattic will use to authenticate when calling the endpoint. Choose any strong random string (e.g., generate one with a password manager)
4. Adjust the linking settings to your preference (see Settings Reference below)
5. Click **Save Changes**

The **API & FlowMattic** section also shows the **Process Links Endpoint** URL. Copy this — you'll need it for the FlowMattic step.

### 3. Add the FlowMattic Workflow Step

This step adds automatic link processing to your content publishing workflow. Add it after the step that creates the WordPress post.

1. Open your FlowMattic workflow (e.g., your content-source publishing workflow)
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

The integration works with any FlowMattic workflow that creates or updates posts — not just content-source workflows.

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
| **Keyword Matching Mode** | Exact match | How SyteOps finds keyword phrases in your post: **Exact match** links only when the keyword text appears as whole words. **AI semantic match** asks your configured LinkCentral AI to map each library keyword to a phrase that actually appears in the article (useful when wording differs). **Fallback** tries exact matching first, then uses AI only if no keyword links were inserted. AI modes need a valid AI provider and model for LinkCentral (same as cross-link AI). |
| **Max Internal Links per Page** | 12 | The most links to your own site a page body may hold, counting the ones you wrote and the ones SyteOps added. SyteOps adds no link that would go past it, and never removes a link of yours to get under it. Links to other sites do not count. Set to 0 for no limit. |
| **Min Inbound Links per Article** | 2 | Every published article should keep at least this many links pointing at it from other posts. SyteOps keeps its own earlier link to an article when taking it away would leave that article below this number, and favors articles below it when it chooses what to link. Set to 0 to turn this off. |
| **LC Category Filter** | All | Comma-separated LinkCentral category IDs. Leave empty to use keywords from all categories. |
| **Cross-Link Post Types** | post | Comma-separated post types to consider for cross-linking (e.g., post,page). |

### Large articles and keyword libraries (AI modes)

When you use **AI semantic match** or **Fallback**, SyteOps may trim very long post text and very large keyword lists so the request stays within model limits. If that happens, the processing response includes a short warning explaining what was trimmed. You can split work across multiple posts or reduce the number of active keywords per category if you routinely hit these limits.

## Keyword Enrichment

Links in your LinkCentral library need keywords before the auto-linker can insert them into posts. If you have links with no keywords, or links whose keywords were added manually and you want AI to improve them, use the **Enrich Keywords with AI** tool.

### Running Bulk Enrichment

1. Go to the **System / API** tab in SyteOps settings
2. Scroll to the **LinkCentral** card — the **Keyword Status & Actions** section is open by default and shows your library at a glance: how many links are **Enriched**, **Missing** keywords, and **Flagged** for review
3. Click **Enrich Keywords with AI** to start enriching all eligible links

SyteOps processes your eligible links in parallel, generating keyword phrases for each one based on the link title, destination URL, and optional additional context. Progress is shown in real time. Click **Stop Enriching** at any time to pause — already-enriched links are saved immediately.

When enrichment is complete, a summary shows how many links were enriched and lists any that were skipped with the reason.

### Enrich a single link (with overrides)

For one-off refreshes or to test different models before committing them to your full library, you can enrich a single link from the link's edit screen in LinkCentral:

1. Open any LinkCentral link (Links → Library → click a link)
2. In the SyteOps **Enrich Single Link** panel, click **Enrich Now** to run with the defaults saved on the System / API tab, **or** expand the override controls first
3. Override controls available per run:
   - **Provider / Model (override)** — choose a different AI provider or model for just this link (useful when comparing models side-by-side). The override dropdown is filtered to models the provider can actually serve, and for the Context AI step it is locked to Perplexity-capable providers (Perplexity, OpenRouter).
   - **Max Tokens (override)** — override the provider's max-output tokens for this run. A shortcut action sets the value to the model's maximum when the model exposes one.
4. Click **Enrich Now** and watch the per-step feedback; the run uses the overrides for that link only

Overrides are not persisted — the next run of bulk enrichment uses the values saved on the System / API tab. Use single-link enrichment to evaluate a model before rolling it out to your whole library.

Single-link enrichment is also what powers **Process All Flagged Keywords**, so the same override values apply when you reprocess flagged links in bulk (below).

### Reprocess flagged links in one click

If links are marked as **Flagged** in the Keyword Status card, click **Process All Flagged Keywords** to run keyword generation again for every flagged link.

- SyteOps uses the same single-link keyword processor it uses for manual one-off runs.
- It uses the **Enrich Single Link** override controls for **Context AI Model** and **Max Tokens** while processing flagged links in bulk.
- Progress is shown as each flagged link is processed.
- When the run finishes, you get a summary of successes and failures so you can follow up on any links that still need review.

### Enrichment checkboxes

Before you click **Enrich Keywords with AI**, you can choose two independent options:

| Option | What it does |
|--------|----------------|
| **Re-enrich existing AI-generated keywords** | When **checked**, links that already have AI-generated keywords (including older links where the source was not recorded) are included so the AI can generate fresh keywords—for example after you change the enrichment model or custom prompt. When **unchecked**, those links are skipped; only links that still have **no** keywords are eligible, plus manual-keyword links if you enable the next option. |
| **Include manually-edited keywords (overwrites manual edits)** | When **checked**, links whose keywords were edited manually in LinkCentral are included and will be **replaced** by new AI-generated keywords. You can use this on a normal run (without re-enrich) to target only new links and manual-keyword links, or together with re-enrich to refresh your whole library. SyteOps asks for confirmation before overwriting manual keywords. When **unchecked**, manual-keyword links are not overwritten on a normal run; on a re-enrich run they stay protected unless you check this box. |

You can combine the checkboxes in any way that matches your goal. The status line above the button updates to show how many links are eligible for the combination you selected.

### Enrichment Settings

These settings live in the **Enrichment Settings** section of the LinkCentral card.

| Setting | Default | Description |
|---------|---------|-------------|
| **Quality Tier** | Standard | Controls the enrichment pipeline depth. **Quick** makes one AI call with no web context (10–15 keywords) — use for large libraries where speed matters and links are well-described. **Standard** adds a Perplexity context lookup (20–30 keywords) — the default and a good balance. **Thorough** makes two AI calls with Perplexity context (25–40 keywords) — use for high-value links where anchor-text quality matters more than cost or speed. |
| **Target Keywords** | 25 | The number of keywords to generate per URL (5–60). The quality tier caps this (Quick ≤ 15, Thorough ≤ 40); Standard uses the value as-is. |
| **Batch Size** | 1 | How many links each worker processes per request (1–50). Keep this low (1–5) when using multiple concurrent workers. Larger values reduce round-trips but increase the work done per request. |
| **Concurrent Workers** | 2 | Number of links processed in parallel (1–5). Increasing this speeds up large enrichment runs — for example, 3 workers process roughly 3× as fast as 1. Higher values consume more AI API quota simultaneously. |
| **Context Layers** | All on | Three optional sources of context the AI uses to generate better keywords: **Perplexity AI web search** (looks up the destination URL to describe what the page offers), **Page metadata fetch** (reads Open Graph tags and JSON-LD from the destination URL), and **LinkCentral categories** (your link's assigned categories). Disabling layers speeds up enrichment at some cost to keyword quality. |
| **Custom Prompt** | — | Additional instructions appended to every AI keyword request. Use this to guide the style or focus of keywords (e.g., "Focus on buyer-intent phrases" or "Use UK English spelling"). |

### Saving settings vs running enrichment

You can change enrichment providers, models, batch size, context layers, and other controls on the System / API tab and run **Enrich Keywords with AI** right away. The plugin uses the values currently shown on that page for the enrichment run, even if you have not clicked **Save Changes** on the main SyteOps settings form. Click **Save Changes** when you want those values stored for the next time you load the settings screen.

How enrichment methods work:

- **Cross-Link AI:** analyzes each destination link to identify the best internal cross-link opportunities. **Recommended model type:** standard chat models. **Recommended models:** GPT-5.4-mini, GPT-4o-mini, Claude Haiku.
- **Keyword AI:** generates the actual keywords. **Recommended model type:** fast, lightweight chat models. **Recommended models:** GPT-5.4-mini, GPT-4o-mini, Claude Haiku.
- **Context AI:** optional second model that uses Perplexity web search to gather information about each link destination before keywords are generated. **Recommended model type:** search-enabled models (Sonar family). **Recommended models:** Sonar, Sonar Pro. Only Perplexity and OpenRouter can access Perplexity search models.

When web-search context is enabled, keyword enrichment runs in two AI steps (Context AI then Keyword AI). If something fails, messages identify which step had the issue when possible. If Context AI fails but keyword generation still completes, you may see a warning even though keywords were saved.

### AI Providers

All AI configurations for LinkCentral are managed in the **AI Providers** section of the LinkCentral card. Open this section to configure three independent areas:

| Area | Used for |
|------|----------|
| **Cross-Link AI** | Scoring candidate posts for relevance and generating anchor text in AI-Enhanced cross-link mode. Recommended model type: standard chat models. Recommended models: GPT-5.4-mini, GPT-4o-mini, Claude Haiku |
| **Keyword AI** | Generating keyword phrases during enrichment. Recommended model type: fast, lightweight chat models. Recommended models: GPT-5.4-mini, GPT-4o-mini, Claude Haiku |
| **Context AI** | Fetching Perplexity web search summaries of destination sites before keywords are generated. Recommended model type: search-enabled models (Sonar family). Recommended models: Sonar, Sonar Pro. Only Perplexity and OpenRouter can access Perplexity search models |

You can also click **Configure AI Provider** in the card header to quickly set the primary AI configuration via the provider modal.

[OpenRouter](https://openrouter.ai/) is recommended for all areas because it aggregates models from all major providers under a single API key.

### Tips for Large Libraries

- **Throughput settings:** Start with **Concurrent Workers: 3** and **Batch Size: 1** for a good balance of speed and reliability. If a provider reports an oversize-context-style error, SyteOps retries that link once with a minimal prompt (title, destination URL, and categories only)
- If you see links skipped due to timeouts, SyteOps automatically retries each failed request once with a longer timeout before marking it as skipped
- Run enrichment in smaller passes (using the stop button) if you want to review results incrementally
- After enrichment, re-run your content-source publishing workflow on existing posts to pick up the new keywords

## How It Works

When the endpoint is called with a post ID:

1. **Load keywords** — SyteOps reads your LinkCentral link library and builds an index of keywords mapped to their link URLs, SEO attributes, and density settings. Keyword enrichment uses layered context — combining Perplexity web search, page metadata, and link categories — to produce more accurate keyword matches.
2. **Clean previous runs** — Links from a previous auto-linking run are removed first, so the process starts fresh. Links you added yourself are never touched, and neither is an auto-placed link you later changed in any way (its text, its address, its formatting, or added nofollow or a class). If SyteOps cannot be sure a link is its own, it leaves it alone.
3. **Scan paragraphs** — The engine walks through your post content paragraph by paragraph, skipping headings, existing links, code blocks, and shortcodes. Page-builder layouts (Divi, WPBakery and similar) are linked normally.
4. **Insert keyword links** — Depending on **Keyword Matching Mode**, SyteOps either matches whole words exactly, or uses AI to pick verbatim phrases from the article that correspond to your library keywords, then inserts links to the correct LinkCentral URLs with the right nofollow/sponsored attributes.
5. **Insert cross-links** — Related posts are identified by shared categories and tags, and contextual links are placed in relevant paragraphs.
6. **Save** — The updated content is saved back to the post (unless you used dry-run mode). When nothing was linked or removed, the post is not saved at all.

### What auto-linking never does

- It never changes, moves or removes a link you placed by hand, or one you edited after it was added.
- It never changes anything else you wrote. Only the link tags it adds or removes differ; your quotes, spacing, special characters, line breaks and every other character stay exactly as they were.
- It never adds a keyword link or cross-link to a page the article already links, however you wrote the address (with or without `www`, a trailing slash or a tracking query, as a relative path, or using your site's front-end address).
- It only links whole words. "cause" is never linked inside "because", and "lender" is not linked inside "lender's" or "no-doc". A phrase still matches when its words are separated by a non-breaking space or two spaces.
- It never links text inside an existing link, a heading, a button, code, an image caption, a shortcode or an HTML comment, and never touches image alt text.

### Spreading links across your site

Two settings keep links from piling up on a few pages while others go without. The page limit stops a page from collecting more internal links than an SEO audit tolerates. The inbound minimum stops a re-run from taking the last links away from a thin article.

You can also tell SyteOps which articles need links most, such as the priority targets and orphan pages from your SEO tool. Priority articles are preferred when SyteOps chooses what to link. A page that already holds the limit in links you wrote gets no automatic links, and keyword links that point to your own site's redirect addresses count toward the limit and are placed first. An article whose type is not in Cross-Link Post Types (pages, on default settings) gets no preference; the command warns you when that happens. They still need a natural, descriptive phrase in the article, so a priority is a nudge, never a forced link. Set the list from the command line:

```
wp syteops linkcentral priority-targets set '[123, {"url":"https://example.com/guide/","weight":8}]'
wp syteops linkcentral priority-targets get
wp syteops linkcentral priority-targets clear
```

Each entry is a post ID or a page address on your site, with an optional weight from 1 to 10 (5 if left out). Only published posts and pages of your own site are accepted, up to 50. If any entry is not valid, nothing is saved.

### Anchors that say what the page is about

Search engines learn what a page is about from the words that link to it, so SyteOps only uses anchors that name the target's topic. For a related post, the topic is the post's focus keyword in your active SEO plugin (Squirrly SEO, Yoast SEO or Rank Math), or its SEO title if there is no focus keyword, or its title if there is no SEO title or no SEO plugin. A long title is shortened to its main topic first, so "The Complete Guide to Hotel Financing Options for First-Time Owners" is treated as "hotel financing options".

A phrase is linked only when it:

- is two to six words long;
- contains the keyword or a close variant (a plural or other word form, or at least 60% of the keyword's main words);
- ends on the topic itself or a natural follow-on word such as "options", "rates" or "lenders", never on a verb;
- is made mostly of meaningful words, and does not start or end with a filler word, a verb or a small word such as "the" or "before".

So "right lender", "before long" and "lenders best matched" are never used as links. A single word is used only when the page's keyword is that one word. This also applies to phrases suggested by AI: they are checked with the same rules, and the AI is asked for descriptive anchors that contain the keyword. Phrases that fail are skipped, and an AI keyword run reports how many.

The process is **idempotent**: running it again on the same post produces the same result. It removes its own previous links before re-processing, so you can safely re-run it after updating your LinkCentral keywords.

## When Links Are Added Automatically

The automatic pass runs **once per article, the first time it is published**. Editing, updating, unpublishing and republishing, or rescheduling an article that has already been linked does not run it again, so links you adjusted by hand are never swapped out by a later save.

- **Articles already cross-linked** (including everything linked before this behavior shipped) are never re-linked automatically, even if you unpublish and republish them.
- **Live articles that were never linked, or whose first pass was missed,** are not linked automatically. Link them with Manual Process in the admin, or by calling process-links with `"options": {"force": true}`.
- **Asking for a run still works.** Manual Process in the admin and a manual pipeline run always process the article. The process-links endpoint follows the same once-only rule as the automatic pass (so a "post updated" workflow cannot re-link every edit), but a call made right after an article's first publish still runs, and `"options": {"force": true}` always runs it.
- **Opt a single article out.** An opted-out article is never touched by any pass, automatic or requested. Turn it on or off from the command line:

```
wp syteops linkcentral skip 123
wp syteops linkcentral unskip 123
wp syteops linkcentral status 123
```

A requested run on an opted-out article is refused with a clear message instead of silently doing nothing: process-links answers HTTP 409 with the code `opted_out`, and `force` does not override it.

## Cross-Link Modes

### Heuristic (Default)

Finds related posts by looking at shared categories and tags. Posts that share more taxonomy terms with your article score higher. Recent posts get a small bonus.

This mode is fast, free, and works well for most sites. If shared taxonomy terms are sparse (for example, on lightly-categorized sites), the cross-linker also performs a **title-keyword fallback** — searching published posts for those of your library keywords that match the current article's subject — so cross-link coverage stays useful even without deep category assignments.

### AI-Enhanced

Uses your configured AI provider to score candidate posts for relevance and generate natural-sounding anchor text. Produces higher quality cross-links but adds a small delay and uses your AI provider's API quota.

SyteOps supports five AI providers for cross-link scoring: **OpenAI**, **Anthropic**, **OpenRouter** (recommended), **Gemini**, and **Perplexity**. OpenRouter is recommended because it gives you access to models from all providers with a single API key.

**Requirements:**
- At least one AI provider API key configured in the **System / API** tab
- An AI provider and model selected for the **Cross-Link AI** area (open the **AI Providers** section in the LinkCentral card, or click **Configure AI Provider** in the card header)

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
- Make sure your LinkCentral keywords actually appear in the post content (for **Exact match** mode), or that your AI provider is configured if you use **AI semantic match** or **Fallback**

**Elementor-built pages**

Elementor stores your layout in Elementor’s own data, not in the regular WordPress content field. SyteOps reads the same rendered HTML a visitor would see when matching keywords and cross-links. If you run a live (non–dry-run) process, SyteOps may report proposed links in the response but **not** write them into the post automatically, and you will see a warning explaining that Elementor pages must be updated in Elementor (or use a block/classic post if you need automatic saving into the post body).

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
| `keyword_matching_mode` | string | `exact`, `ai`, or `fallback` — same meaning as the Keyword Matching Mode setting. |
| `force` | boolean | Process an article that was already linked. Without it, an already-linked article returns `"skipped": true` with a `skip_reason`. It never overrides an article's opt-out, which answers HTTP 409 with the code `opted_out`. |

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
  "keyword_matching_mode": "exact",
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
  "settings": {
    "max_lc_links_per_500_words": 3,
    "max_crosslinks": 3,
    "first_occurrence_only": true,
    "default_crosslink_mode": "heuristic"
  }
}
```

