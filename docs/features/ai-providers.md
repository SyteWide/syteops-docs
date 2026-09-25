---
sidebar_position: 15
title: AI Providers
description: Configure one or more AI providers for the features and integrations that use AI — provider list, per-feature selection, balance display, and model recommendations.
---

# AI Providers

Several SyteOps features call AI models — LinkCentral keyword enrichment and cross-link scoring, Content Pipelines drafting, GEO readiness analysis, content ingest mapping, social content generation, and more. SyteOps supports six providers and lets each feature pick its own provider, model, and token budget so you can match the model to the job.

## Supported providers

| Provider | Typical use | Notable features |
|---|---|---|
| **OpenAI** | General chat and reasoning models (GPT-4o, GPT-5, o-series) | Mature API; broad model catalog |
| **Anthropic** | Claude family (Opus, Sonnet, Haiku) | Strong instruction-following; long context |
| **OpenRouter** (recommended) | Aggregated access to models from most major providers | One key unlocks every listed model — including Perplexity Sonar |
| **Gemini** | Google's Gemini 1.5 / 2.x / 3.x families | Long context; native Google integration |
| **Perplexity** | Sonar models with built-in web search | Real-time web context for destination-site lookups |

**Why OpenRouter is the recommended default:** one API key gives you access to models from every other provider. If you're not sure which provider to use for a given feature, start with OpenRouter and pick a model from the provider you prefer.

**Perplexity's web-search exclusivity:** the Context AI step in LinkCentral keyword enrichment requires a model that can perform web search. Only Perplexity and OpenRouter can serve those models. SyteOps automatically filters the Context AI provider dropdown to show only providers that can access them.

## Where API keys live

1. Open the **System / API** tab in SyteOps settings
2. Find the **API Keys** tile
3. Paste each provider's key into the matching field
4. Click **Save Changes**

All five keys are encrypted at rest. They are never displayed in plaintext after save — you see a masked value.

**Test a saved key:** each tile has a **Test key** button (shown once a key is saved). It makes a quick live call to the provider and reports back — "Key valid — N models available", or the provider's error message if the key is rejected. Useful for providers that don't expose a balance you can sanity-check against.

### SyteHero image AI (fal)

Below the provider tiles, an **Image AI** group holds one more tile: **SyteHero image AI (fal)**. SyteHero generates and modifies pictures through fal, and normally holds that key itself. Turn **Manage this key here** on and SyteOps holds it instead — you paste the fal key once, on this card, and SyteHero borrows it.

**Update SyteHero to version 1.0.139 or newer before you turn the toggle on.** An older SyteHero does not know to ask, so the toggle would simply do nothing while its own key controls stayed live. Nothing breaks either way — SyteHero falls back to whatever key it already has — but the setting will not take effect until it is updated.

What changes while the toggle is on:

- SyteHero uses the key from this tile for every image call, and never stores a copy of it.
- On SyteHero's own Integrations page, the fal card's key field, enable switch, clear checkbox and Test Connection button are disabled, with a "Managed by SyteOps" note and a link back here. Its own stored key is left untouched and comes back the moment you turn the toggle off.
- Each capability row on the tile — generate a picture, remix a picture, picture to video, remove background, upscale, extend edges — pins a model id for that job. When SyteHero is active, each row is a dropdown of the models SyteHero supports, showing each model's name and cost ($ to $$$$). Choose **Let SyteHero choose** to leave that job to SyteHero. Until you save your own picks, value-for-money models are preselected: good quality at a modest per-image price. Save to use them, or change any row. Without SyteHero active, the rows are plain text fields for a model id.

The key is encrypted at rest, never shown again after save ("Leave blank to keep current key" plus a **Clear key on save** checkbox), and excluded from configuration exports and backups, exactly like the provider keys above.

**fal billing key (optional).** The same fal key you paste above can generate images fine while still being refused when SyteOps tries to check your account balance — fal only allows balance reads from an **Admin** key on the account that pays the bill, not from a **Team** key. If you see the balance explain that it can't read your account, paste that Admin key into the **fal billing key** field on the same tile. It is used for balance reads only — never for image generation — and is encrypted, masked, and excluded from exports the same way every other key here is.

**Default collection.** SyteOps Admins see a read-only **Default collection** line under this tile once one is set in SyteHero's AI Studio — the collection new pictures are filed into by default. It shows the collection's name, with a link to open SyteHero's AI Studio Assets view. Nothing here can create or change a collection; that stays entirely inside SyteHero's own AI Studio.

### Other service keys

Some services SyteOps talks to are not AI providers, so their keys live further down the same **System / API** tab, with the other service credentials rather than in the API Keys tile:

- **Erlin API Key** — for [Erlin AI](https://erlin.ai), an AI-search visibility service. Generate the key in Erlin under **Settings → Accounts → MCP**; it begins with `ek_live_`. The field simply stores the key — nothing in SyteOps contacts Erlin yet.

Like the provider keys, it is encrypted at rest, masked after save, and excluded from configuration exports.

## Per-provider default model and token limit

Each provider tile on the **API Keys** card has its own **Preferred model** and **Max tokens** fields, right below the key field:

1. Enter and save the provider's API key.
2. Click **Fetch Models** to load that provider's live model list, then pick a model (or choose **Custom** to type a model ID by hand).
3. Set **Max tokens**, or click the refresh (↻) button to snap it to the selected model's maximum.

These give you a single, provider-level default — handy when you want every automation that uses a provider to share the same model and token ceiling. Each field also has a **copy icon** that copies its FlowMattic variable (wrapped in `{{ }}`) so you can drop it straight into a workflow:

- `{{syteops_std_systm_openai_model_001_preferred}}` / `{{syteops_std_systm_openai_model_001_max_tokens}}`
- …and the matching `anthropic`, `openrouter`, `gemini`, and `perplexity` variables.

The model and token-limit fields appear on a provider tile once that provider's key is saved (so the model list has a key to load with).

**Used as a fallback:** when a feature that runs AI in SyteOps (e.g. LinkCentral cross-linking and keyword matching) has no model of its own set, it falls back to the matching provider's default model and token limit here — so you can set a sensible default once per provider instead of per feature.

## Site default provider

The **API Keys** card carries one **Site default provider** select, above the provider tiles. It lists only providers whose key is saved, and it decides what happens for any AI area you have not pointed at a provider of its own: that area uses the site default, along with that provider's Preferred model and Max tokens from its tile.

Leave it on **Auto-pick** and SyteOps chooses for you — OpenRouter when its key is saved, otherwise the first provider in the list that has one. The hint under the select names the provider auto-pick would land on, so the fallback is never a mystery.

Two things to know:

- **Setting it changes nothing you have already configured.** An area with its own provider always wins; the site default only fills in for areas you left blank.
- **It fails safe.** If the chosen provider's key is later cleared, the site default is ignored and areas fall back to auto-pick rather than stopping — the select shows the stale choice flagged "no API key" so you can change it.

Where an area is running on the site default, SyteOps says so wherever a provider·model pair is shown — the AI Models card's own line (below), and the provider line on the Review Portal's Remix and Agent prompts panels — as "Anthropic (site default)" with the model that will actually run.

## Per-feature provider and model selection: the AI Models card

The Content Pipelines → Review Portal view carries one **AI Models** card, one row per feature, named by what it powers rather than by an internal area slug:

- **Article writing & remix** (Content) — AI-suggested categories, tags, and meta descriptions for content sources and the Review Portal, plus the Text AI Remixer. See [Content Pipelines](./content-pipelines.md).
- **Answer-engine analysis** (GEO) — AI readiness analysis that scores how well a post is positioned for AI answer engines. See [Content Pipelines](./content-pipelines.md).
- **Ingest field mapping** (Ingest) — proposes how an inbound content-source payload maps to your post fields when you set up a new content source. See [Content Pipelines](./content-pipelines.md).
- **Social posts** (Social) — AI-generated social posts from your published content. Its provider/model/max-tokens fields render on this card and save with it; the Social Publishing card below keeps its own voice profiles, destinations, and enable toggle.
- **Image alt & captions** (Image SEO, carries a **Vision** badge) — **Generate SEO with AI** in the Review Portal. It writes an image's alt text, title, and caption from the picture itself rather than the surrounding words. It uses that provider's key on **System / API**, not SyteHero (SyteHero is **Modify with AI**). This area must point at a model that accepts image input; a text-only model is refused rather than asked to guess, so a provider that cannot take an image shows disabled here. See [Review & Publish Your Post](./review-and-publish-your-post.md).
- **Agent prompts** — turns a page reviewer's notes into an implementation prompt. A per-site preamble template (with a **Restore default** option) sits beside it, in its own card just below.

Two more rows are status-only, with no controls of their own:

- **Lead scoring** — shown when the Leads module is active. Links straight to the Leads page, where its own AI provider/model fields live (used for **Auto-map with AI**).
- **LinkCentral** — shown when the LinkCentral integration is on, as three rows (Cross-Link AI, Keyword AI, Context AI). Each links to the [LinkCentral integration page](../integrations/linkcentral.md)'s Enrichment Settings on **System / API**, where its own controls live.

### Reading and using a row

Each row shows:

- **A readiness pill, with a tooltip naming the provider it is about** — **Ready** (a provider is chosen, explicitly or inherited, and that provider has an API key on **System / API**), **Needs key** (a provider is chosen but that provider's key is missing — or, for Image SEO, the resolved model lost image capability), or **Not configured** (nothing resolves at all — only happens when no provider anywhere on the site holds a key). This applies to the LinkCentral rows too, reading their own provider choice the same way every other row does.
- **A "Powers: …" line** — one sentence naming what the area actually does.
- **"Uses site default (Provider · Model)"** — shown whenever the row has no explicit provider of its own, with the resolved pair that will actually run. An **Override** toggle sits beside it.

Turn **Override** on to reveal the provider and model selects and pick your own. Turn it back off and save: the row's provider and model are cleared back to `''`, which is exactly what "inherit the site default" means everywhere else in SyteOps — the change takes effect on the next Save, not the moment you flip the toggle.

An **Advanced** disclosure under each row holds **Max tokens** — a per-area setting, editable independent of Override. To use a model that isn't in the fetched list, choose **Custom** in the model select (still inside the main row, not inside Advanced) and type the exact model ID.

The card's header links to **API keys & site default**, on **System / API**, for the keys and the site-default provider setting themselves.

### Image generation & modify (SyteHero)

At the foot of the same card sits a read-only **Image generation & modify (SyteHero)** row. It reports whether SyteHero is installed and active, whether its image-AI key is configured, and — once you've checked it from the balance popup or the Review Portal's own image tools — its cached credit balance. When SyteHero is active, the row links straight to **Open SyteHero settings**; when it isn't, the row simply says image AI needs SyteHero. This row has no controls of its own — it powers picture remix, generate-new-picture, and the listing-image watermark repair. Where its key and models are configured depends on one setting: SyteHero's own settings page by default, or the **SyteHero image AI (fal)** tile on **System / API** when you have turned management on there, in which case the row says so and links straight at the tile. If a balance has never been read successfully because your fal key can't check it, the row shows the same fal billing key hint the balance popup shows, instead of staying blank.

### The other way to set AI configuration

Some integrations and modules also offer a **Configure AI Provider** modal — click it on the integration card (Integrations tab) or the module dropdown (Modules tab). It opens with provider, model, and max-tokens fields and saves directly via AJAX, without navigating to the feature's own settings tab. It is a separate path from the AI Models card above — a feature whose controls already render on that card (Content, GEO, Ingest, Image SEO, Agent prompts, Social) is set there instead.

## Live balance display

Each provider's card on the **API Keys** tile shows your current balance (or credit/usage, depending on what the provider returns):

- The balance row only appears once you've saved a key for that provider — providers with no key entered don't show a balance (and won't surface a balance-lookup error).
- Click the refresh icon to re-fetch the balance.
- If a provider doesn't expose a balance endpoint, the field shows "—".

Use this to catch low-balance states before an enrichment run or content-pipeline batch exhausts your credit.

## Provider branding modal

Clicking the plugin logo in the top corner of the settings screen opens a small information panel with:

- Link to the provider's primary documentation
- Link to the provider's pricing / models page
- The SyteOps-side field the provider's key maps to (useful when you're verifying keys by provider)

## Model max-tokens behavior

- When you select a model, SyteOps auto-populates the **Max Tokens** field with the model's maximum output size (when the provider exposes per-model metadata).
- A hint below the field reads "Model maximum: X tokens" so you can see the ceiling without opening provider docs.
- The refresh (↻) button next to the Max Tokens field resets the value to the model's maximum.
- If you use a custom model ID (a model not in the dropdown), the max-tokens ceiling falls back to the provider's default.

## Model recommendations by use-case

| Use-case | Model class | Examples |
|---|---|---|
| Keyword generation (LinkCentral Keyword AI) | Fast, lightweight chat | GPT-5.4 Mini, GPT-4o Mini, Claude Haiku |
| Cross-link relevance scoring | Standard chat | Same as keyword, or a step up like GPT-5.4 |
| Web-search context (LinkCentral Context AI) | Search-enabled (Sonar family) | Sonar, Sonar Pro |
| Drafting / longer-form content | Capable chat or reasoning | Claude Sonnet, GPT-5, Gemini 2.5 Pro |
| Structured extraction / classification | Fast, lightweight chat | Haiku, Mini variants |

Reasoning / thinking modes add latency. For short tasks like keyword generation, a plain chat model is typically better.

## Troubleshooting

**"Models not loading" in the model dropdown**

- Confirm the provider's API key is saved (the field should show a masked value, not be empty).
- Click **Fetch Models** on the AI area to force a refresh of the cache.
- Provider model caches are cleared automatically on plugin update; other providers refresh on demand.

**"Balance shows —"**

- The provider either doesn't expose a balance endpoint, or the response format changed. Try the per-provider refresh icon.
- Check the provider dashboard directly as a fallback.

**fal balance shows "This fal key can't read the balance…"**

- Your fal key can generate images but is a **Team** key, and fal only allows balance reads from an **Admin** key on the account that pays the bill. Paste that Admin key into the **fal billing key** field on the SyteHero image AI (fal) tile — see [SyteHero image AI (fal)](#sytehero-image-ai-fal) above. Nothing else about image generation changes; the billing key is used only to read the balance.

**"Perplexity doesn't appear as a Context AI provider"**

- The Context AI dropdown is filtered to Perplexity-capable providers (Perplexity, OpenRouter). If you selected a different provider for Keyword AI, the Context AI dropdown still shows only the eligible providers — this is by design.

## Related

- [LinkCentral Integration](../integrations/linkcentral.md) — three-area AI configuration (Cross-Link, Keyword, Context)
- [Content Pipelines](./content-pipelines.md) — AI-suggested categories, tags, and meta descriptions for content
- [Troubleshooting](../troubleshooting.md) — AI provider-specific troubleshooting
