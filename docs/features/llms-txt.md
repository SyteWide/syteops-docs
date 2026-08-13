---
title: llms.txt (AI Search Discovery)
---

# llms.txt — AI Search Discovery

SyteOps can generate and serve an **`llms.txt`** file at your site root — a plain-text map of your most important pages that AI assistants (ChatGPT, Claude, Perplexity) look for when deciding what to cite.

## Enable it

Go to the **Content Pipelines** tab and, on the **GEO (llms.txt)** provider card, click **Turn on**. Once enabled, your `llms.txt` is served at `https://yoursite.com/llms.txt` and refreshes automatically when you publish content (and daily).

### Native generator or LLMS Amplifier

By default the built-in generator produces your `llms.txt` — no extra plugin required. If you install and enable the **LLMS Amplifier** integration, it takes over `llms.txt` generation instead (an either/or choice), and the built-in generator steps aside. Switch between them from the **GEO (llms.txt)** card — **Use LLMS Amplifier engine** / **Use native engine** — with no separate setup step. See [LLMS Amplifier](../integrations/llms-amplifier.md).

## What's in it

A Markdown list of your published Pages and Posts (most-recently-updated first), each with its title, URL, and a short excerpt — plus your site name and tagline.

## Publishing the questions your articles answer

When an article goes through the [Review Portal](review-and-publish-your-post.md), the GEO analysis records the specific questions it answers well — and a short answer for each. Those question-and-answer pairs are what an AI answer engine actually quotes, so SyteOps can publish them in four places.

Each one has its own switch under **Content Pipelines → Review Portal settings → Answer-engine publishing**:

| Switch | What it does |
| --- | --- |
| **Questions in llms.txt entries** | Lists each article's questions and answers directly under its `llms.txt` entry. On by default. |
| **Site-wide questions section** | Adds a **Questions this site answers** section to `llms.txt`, combining every article's questions into one deduplicated list with the pages that answer them. On by default. |
| **FAQ structured data** | Adds FAQ structured data to the published article, which Google and Bing read today. **Off by default** — see the warning below. |
| **Questions feed** | Publishes the whole question set as JSON at `https://yoursite.com/llms-questions.json`. On by default. |

Both `llms.txt` options work the same whether the built-in generator or LLMS Amplifier is producing your `llms.txt`. The questions feed and the FAQ structured data are served by SyteOps either way, so they keep working no matter which generator you use.

If you use LLMS Amplifier, note that its own **Include metadata** option controls whether the per-article block appears — with that switched off in Amplifier, there is no metadata section for the questions to attach to.

:::warning Check before turning on FAQ structured data
Many SEO plugins (Yoast, Rank Math, Squirrly) can already add FAQ structured data to a page. Two FAQ blocks on one page is invalid and search engines may flag it. Turn this on only if nothing else on your site is adding FAQ markup.
:::

### Reviewing the answers before they go live

The questions and answers appear in the **GEO** panel of the [review portal](review-and-publish-your-post.md), where a reviewer can edit any of them, add a question the analysis missed, or remove one.

- **Analyze GEO** never overwrites your work. It keeps the wording and answers you have written, fills in only the blanks, and adds anything new it finds.
- **Draft answer** writes a short answer to a single question straight from the article. If the article genuinely does not answer that question, it tells you instead of inventing something — edit the article, reword the question, or remove the row.
- **I have reviewed these answers** confirms someone has checked them. By default, Approve & Publish waits for this. Re-running the analysis changes the answers, so the confirmation clears and is asked for again.

This requirement is skipped automatically when no answer-engine option is switched on, or when an article has no questions. You can switch it off entirely under **Pre-publish requirements**.

### What gets published

Only information that is already public: the question, its short answer, and the URLs of **published** articles. Draft articles, password-protected articles, and any article you have excluded from `llms.txt` are all left out, and the internal readiness score is never published.

An article shows up on these surfaces only after its GEO analysis has run. Articles analyzed before this release have questions but no answers — they will gain answers the next time they are analyzed.

## Notes

- If a real `llms.txt` file already exists at your site root (from another plugin or a static file), your web server serves that one instead.
- As of now, no major AI vendor has publicly committed to reading `llms.txt` — it's a low-cost, future-proofing step, not a guaranteed ranking change.
