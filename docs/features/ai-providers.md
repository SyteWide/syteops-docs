---
sidebar_position: 15
title: AI Providers
description: Configure one or more AI providers for the features and integrations that use AI — provider list, per-feature selection, balance display, and model recommendations.
---

# AI Providers

Several SyteOps features call AI models — LinkCentral keyword enrichment and cross-link scoring, ContentPen drafting, Notes and Estimates AI suggestions, and more. SyteOps supports six providers and lets each feature pick its own provider, model, and token budget so you can match the model to the job.

## Supported providers

| Provider | Typical use | Notable features |
|---|---|---|
| **OpenAI** | General chat and reasoning models (GPT-4o, GPT-5, o-series) | Mature API; broad model catalog |
| **Anthropic** | Claude family (Opus, Sonnet, Haiku) | Strong instruction-following; long context |
| **OpenRouter** (recommended) | Aggregated access to models from most major providers | One key unlocks every listed model — including Perplexity Sonar |
| **Gemini** | Google's Gemini 1.5 / 2.x / 3.x families | Long context; native Google integration |
| **Straico** | Proxy to many underlying models | v2 OpenAI-compatible as of v1.3.038 |
| **Perplexity** | Sonar models with built-in web search | Real-time web context for destination-site lookups |

**Why OpenRouter is the recommended default:** one API key gives you access to models from every other provider. If you're not sure which provider to use for a given feature, start with OpenRouter and pick a model from the provider you prefer.

**Perplexity's web-search exclusivity:** the Context AI step in LinkCentral keyword enrichment requires a model that can perform web search. Only Perplexity, OpenRouter, and Straico can serve those models. SyteOps automatically filters the Context AI provider dropdown to show only providers that can access them.

## Where API keys live

1. Open the **System / API** tab in SyteOps settings
2. Find the **API Keys** tile
3. Paste each provider's key into the matching field
4. Click **Save Changes**

All six keys are encrypted at rest. They are never displayed in plaintext after save — you see a masked value.

## Per-feature provider and model selection

Each AI-using feature stores its own provider, model, and max-tokens values. You can point different features at different providers — for example, a cheap keyword model via OpenRouter and a reasoning model via Anthropic for estimates.

Features that have per-feature AI configuration:

- **LinkCentral** — three independent AI areas (Cross-Link, Keyword, Context). See the [LinkCentral integration page](../integrations/linkcentral.md) for detail.
- **ContentPen** — drafting and content operations. See the [ContentPen integration page](../integrations/contentpen.md).
- **Notes** — AI suggestions on notes (configurable per install).
- **Estimates** — AI line-item assistance.

There are two ways to set per-feature AI configuration:

1. **From the feature's settings card** — the AI Providers / Enrichment Settings / similar section on the System / API tab.
2. **From the integration or module tile** — click **Configure AI Provider** on the integration card (Integrations tab) or the dropdown on the Modules tab. A modal opens with provider, model, and max-tokens fields. Saving the modal writes directly via AJAX — you don't need to navigate to the feature's settings tab first.

## Live balance display

Each provider's card on the **API Keys** tile shows your current balance (or credit/usage, depending on what the provider returns):

- Click the refresh icon to re-fetch the balance.
- The last-updated timestamp shows when the balance was most recently pulled.
- If a provider doesn't expose a balance endpoint, the field shows "—".

Use this to catch low-balance states before an enrichment run or content-pipeline batch exhausts your credit.

## Provider branding modal

Clicking a provider's logo on the **API Keys** tile opens a small branding modal with:

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
- Provider model caches are cleared automatically on plugin update (Straico v1.3.038); other providers refresh on demand.

**"Balance shows —"**

- The provider either doesn't expose a balance endpoint, or the response format changed. Try the per-provider refresh icon.
- Check the provider dashboard directly as a fallback.

**"Perplexity doesn't appear as a Context AI provider"**

- The Context AI dropdown is filtered to Perplexity-capable providers (Perplexity, OpenRouter, Straico). If you selected a different provider for Keyword AI, the Context AI dropdown still shows only the three eligible providers — this is by design.

## Related

- [LinkCentral Integration](../integrations/linkcentral.md) — three-area AI configuration (Cross-Link, Keyword, Context)
- [ContentPen Integration](../integrations/contentpen.md) — drafting and content operations
- [Troubleshooting](../troubleshooting.md) — AI provider-specific troubleshooting
