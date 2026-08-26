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

A Markdown list of your published Posts (most-recently-updated first), each with its title, URL, and a short excerpt — plus your site name and tagline.

## Choosing which content types are covered

**Content Pipelines → Review Portal settings → Answer-engine publishing → Content types** decides which content your AI files describe. It covers all of them at once: `llms.txt`, the questions feed, FAQ structured data, and the LLMS Amplifier index.

Out of the box only **Posts** are covered. Pages are usually site furniture — your contact page, your privacy policy, a landing page — rather than content that answers a question worth citing, so listing them mostly pads the file. Tick **Pages**, or any other public content type, if your site is the exception.

At least one type is always covered, so clearing every box puts you back to Posts.

Changing this rebuilds your AI files right away, so the change is live within a couple of minutes rather than at the next scheduled rebuild.

:::note If you use LLMS Amplifier with a separate front end
LLMS Amplifier can serve a decoupled ("headless") front end, in which case it works out each article's public address from its own **public routing** settings. A content type with no route there has no address Amplifier can publish, so its entries appear without a link. SyteOps tells you when that happens — beside the **Content types** setting, and in Amplifier's own health panel — so you can either add the route in Amplifier or untick the type here.
:::

## Publishing the questions your articles answer

When an article goes through the [Review Portal](review-and-publish-your-post.md), the GEO analysis records the specific questions it answers well — and a short answer for each. Those question-and-answer pairs are what an AI answer engine actually quotes, so SyteOps can publish them in five places.

Each one has its own switch under **Content Pipelines → Review Portal settings → Answer-engine publishing**:

| Switch | What it does |
| --- | --- |
| **Questions in llms.txt entries** | Lists each article's questions and answers directly under its `llms.txt` entry. On by default. |
| **Site-wide questions section** | Adds a **Questions this site answers** section to `llms.txt`, combining every article's questions into one deduplicated list with the pages that answer them. On by default. |
| **FAQ structured data** | Adds FAQ structured data to the published article, which Google and Bing read today. **Off by default** — see the warning below. |
| **Questions feed** | Publishes the whole question set as JSON at `https://yoursite.com/llms-questions.json`. On by default. |
| **Questions in the LLMS Amplifier index** | Adds the question set to the FAQ section of LLMS Amplifier's `llms-index.json`. On by default. This switch appears only when LLMS Amplifier is installed and switched on. Any FAQ entries you uploaded to Amplifier yourself are kept, and take precedence over these. |

Both `llms.txt` options work the same whether the built-in generator or LLMS Amplifier is producing your `llms.txt`. The questions feed and the FAQ structured data are served by SyteOps either way, so they keep working no matter which generator you use.

### Leaving an article out

The Review Portal lets you exclude an individual article from `llms.txt`. That exclusion now applies no matter which generator you use — including every file LLMS Amplifier produces, such as its knowledge bundle. Previously it applied only while SyteOps generated the file, so an excluded article reappeared once LLMS Amplifier took over.

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

### Pillar articles

The AI files can only hold so much, and by default they keep whatever was published or edited most
recently. That means a routine news post can push your definitive guide off the end of the list.

Ticking **Pillar article (cornerstone)** in the portal's GEO panel says which articles your site's
authority actually rests on. It does three things:

- Its questions and answers are kept **ahead of** other articles' when the index has to choose which
  to publish, and when several articles answer the same question, the pillar is the one an AI tool is
  pointed to. This applies whichever generator you use.
- With **LLMS Amplifier** generating your files, a pillar is listed first — and in the index file
  (`llms-index.json`) that means it survives the file's size limit rather than being trimmed. In
  `llms.txt` itself the ordering gives it prominence, but the size limit is applied before SyteOps can
  intervene, so it does not rescue an article from trimming there.
- If you have an SEO plugin connected, the same tick marks the article there too — cornerstone content in **Squirrly SEO** and **Yoast SEO**, pillar content in **Rank Math**.

Use it for a handful of pages, not for everything — the point is to say which few to trust first.

### Keeping the files current

SyteOps rebuilds your AI files shortly afterwards, on its own, whenever something changes what they
should say: editing an article's answers, marking it as a pillar, excluding it from `llms.txt`,
publishing a page, or unpublishing, trashing or deleting an article. That last group matters most —
without it, a retracted article's title, address and answers would stay in your AI files indefinitely.

Rebuilds are batched, so a run of edits produces one rebuild rather than one per save, and they happen
in the background — you never wait for one. If something else rebuilt the files in the meantime,
SyteOps skips its own pass rather than repeating the work.

### When another plugin also makes an llms.txt

Only one plugin can answer `https://yoursite.com/llms.txt`. Some SEO plugins — Squirrly SEO from
version 14.2 onward, for example — have added their own llms.txt feature, and because of when it runs
it takes the address before SyteOps gets a chance. When that happens, your visitors and any AI tool
asking for the file receive that plugin's version instead of the one SyteOps builds for you, and
nothing on screen would otherwise tell you.

So when GEO is switched on and SyteOps is generating your AI files, **SyteOps switches the other
plugin's llms.txt feature off for you.** Your file is the one that gets served. Nothing else in that
plugin is changed — its own AI usage rules are left exactly as you wrote them, and every other setting
is untouched.

If you later switch GEO off, or deactivate SyteOps, the other plugin's feature is switched **back on**
automatically, so your site is never left without an `llms.txt` at all. And if you had already turned
that feature off yourself, SyteOps leaves it that way — it only gives back what it took.

If the switch cannot be made for some reason, you'll see a warning naming the plugin on the
**Answer-engine publishing** card, so you can turn it off yourself.

### When another plugin removes your FAQ answers

The same kind of clash affects structured data. Several SEO plugins offer a setting along the lines of
*"remove other Json-LD from page"*, which deletes every other plugin's structured data from the page
before it reaches a search engine. If that setting is on, the reviewed questions and answers SyteOps
publishes are deleted too — so FAQ schema looks switched on in SyteOps, is built correctly, and never
arrives anywhere.

When SyteOps is actually publishing FAQ structured data, it switches that setting off for you as well.
It only touches the *"remove other people's data"* setting — the other plugin keeps publishing its own
structured data exactly as before. Turn FAQ schema back off, or deactivate SyteOps, and the setting is
handed back.

### SyteOps tells you when it does this

Each time SyteOps switches one of these settings off, you get a message in your dashboard saying which
setting it was and where to find it. If someone later switches it back on, SyteOps switches it off
again and shows you a warning, so a change that would quietly stop your AI files working is never
silent.

You'll also see a note on the other plugin's own settings screen explaining why the switch is off and
what to do if you want it back — turning off the matching SyteOps feature, rather than fighting the
switch.

### When another plugin serves your robots.txt

Some SEO plugins also take over `robots.txt`, and for the same timing reason they replace the version
WordPress builds rather than adding to it. That quietly drops the lines pointing AI crawlers at your
answer-engine files — including the one that tells them where your questions and business details
live. Your files are still there and still correct; nothing is telling anyone about them.

**SyteOps does not switch that plugin's robots feature off.** Your robots.txt holds your own crawling
rules, and they are yours to keep — turning the feature off would take them out of the served file
along with everything else.

Instead, the **Answer-engine publishing** card shows you exactly which lines are missing and offers
to **add them for you**. SyteOps adds only those lines. Every rule you wrote stays exactly where it
is, and there is an **Undo this change** button that puts the file back the way it was.

If you would rather do it yourself, the same card links straight to that plugin's robots editor.

A few things worth knowing:

- SyteOps checks what that plugin is already serving first, so it only ever adds lines you do not
  already have.
- If you later switch off the feature those lines point at, SyteOps takes them back out on its own —
  you are never left advertising a file that is no longer published.
- If you edit one of the lines yourself, SyteOps treats it as yours and leaves it alone.
- If one of your own rules blocks the file a line points at, SyteOps tells you, because adding the
  line would otherwise look like it worked while changing nothing.
- robots.txt is usually cached by your CDN, so SyteOps clears it where it can and tells you when it
  could not — a change at your site is not the same as a change a crawler can see.

### A setup review when you switch answer-engine publishing on

The clashes above are all detected the same way, and none of them announces itself. So when
answer-engine publishing is switched on and LLMS Amplifier is producing your files, SyteOps shows
you a short review of what it found — in two halves, because they need different things from you.

**Already handled** lists what SyteOps has done on its own: taking back your `llms.txt` address, and
switching off another plugin's *"remove other Json-LD from page"* setting so your FAQ answers
survive. Both are reversible and both are handed back if you turn the feature off.

**Needs your approval** lists what SyteOps will not do without being asked: adding the discovery
lines to another plugin's robots file, and switching on the LLMS Amplifier settings that publish the
index file your answer surfaces write into. Each has a button.

The review never blocks anything — answer-engine publishing is already on by the time you see it, and
closing it changes nothing. **Not now** is remembered against *what the review said*, not as a
permanent "never show this", so if a new problem appears later you will be told about that one.

The **Review answer-engine setup** button on the **Answer-engine publishing** card opens it again
whenever you want it. It stays on the card once answer-engine publishing is on with LLMS Amplifier,
including when everything is in order — open it on a healthy site and it tells you so, rather than
disappearing and leaving you to guess whether there was nothing to report or nothing loaded. The
review only opens *by itself* when something is actually outstanding.

## Notes

- If a real `llms.txt` file already exists at your site root (from another plugin or a static file), your web server serves that one instead.
- As of now, no major AI vendor has publicly committed to reading `llms.txt` — it's a low-cost, future-proofing step, not a guaranteed ranking change.
