---
sidebar_position: 12
title: Content Pipelines
description: Automate content processing workflows that run on publish — cross-linking, SEO, and llms.txt — with Content Pipelines.
---

# Content Pipelines

Content Pipelines is a built-in SyteOps feature that automatically runs a sequence of content-processing stages when a post is published. Each pipeline recipe defines which stages run, in what order, and under what conditions.

## Getting Started

Content Pipelines is built in to SyteOps — there's nothing to upload or activate. It's available out of the box, and you'll find it in its own **Content Pipelines** tab in the SyteOps admin.

## The Content Pipelines Tab

Open Content Pipelines from the **Content Pipelines** link in the SyteOps admin sidebar (or the Content Pipelines tab in SyteOps settings). The tab has several views, accessible from the quick-nav pills at the top.

### Runs dashboard

The Runs dashboard shows every pipeline execution:

- **Stat cards** show total runs, runs in the last 7 days, posts that were changed, and error counts.
- **Filter pills** let you filter by recipe, status (OK, Errors, Skipped, Held), or source (**Direct** — post-processing runs you trigger or that fire on publish/schedule — or each content source you've registered).
- **Run now** lets you trigger a pipeline manually for any post — choose a recipe, enter a Post ID, and optionally enable dry-run mode to preview changes without writing them.
- **Runs table** lists each execution with the source (**Direct** for post-processing runs, or a content source), the recipe used, post, status, which stages ran, whether the post was changed, and the trigger type. A delivery that couldn't be mapped shows an amber **Held** status rather than a misleading "OK," and a **Reprocess** button appears on held rows once you've fixed and re-approved the source's mapping — see [Reprocess last payload](#reprocess-last-payload) below.
- Each processed row keeps its actions in a stacked list on the right: **Resend email**, **Re-run**, **Open in portal** (when the portal can open that article), and **Delete**. The labels line up on the left so the rest of the row has room. **Delete** asks you to confirm, then removes just that entry and updates the counts on the page. Use it to clear a test delivery or a failure you've already dealt with without losing the rest of the record — **Clear all run history**, at the top of the view, still empties everything at once.
- Click the expand arrow beside the actions to open the **stage drawer**, which shows the result of each stage with its message and duration.

### Provider status cards

At the very top of the Runs view, above the stat cards, a row of cards shows whether each pipeline provider is wired up:

- **Content sources** — one card for each content source you've registered, shown by its name, indicating whether it's connected and receiving content.
- **Link Engines**, **SEO**, and **GEO** — the processing stages.

Each card shows a status — **Ready**, **Off**, **Needs setup**, or **Not installed** — and a
link that takes you straight to that provider's settings to finish wiring it up. Use it as a
quick checklist: every card should read **Ready** before you rely on a recipe that uses that stage.

The **GEO** card adds a one-click **Turn on** / **Turn off** button that enables or disables AI Search Discovery right from the card — no need to leave the page. When the LLMS Amplifier plugin is installed, the card also shows a button to switch which engine generates your `llms.txt` — see [Choosing a GEO engine](#choosing-a-geo-engine) below.

### Recipes

Recipes define how your pipeline behaves:

- The **default recipe** runs all available stages in sequence. It cannot be deleted.
- **Custom recipes** let you configure stage order, enable or disable individual stages, adjust LinkCentral dial-in settings, set trigger conditions (post types, tags), and define policies (skip unchanged posts, stop or continue on error, dry-run mode).
- Use the **Add recipe** button to open the recipe builder.

## Recipe Builder

The builder walks you through four sections:

1. **Recipe name and priority** — Give the recipe a name and set its priority (lower numbers run first when multiple recipes match).
2. **Stages** — Enable or disable individual stages and drag them into the order you want. The Link Engines stage includes LinkCentral dial-in settings to fine-tune cross-linking behavior.
3. **Trigger** — Choose when the recipe fires: on auto-publish or manual trigger only. Optionally restrict to specific post types or tag slugs.
4. **Policy** — Control what happens when content hasn't changed (skip it), when a stage errors (stop or continue), and whether to run in dry-run (preview) mode.

## Available Stages

| Stage | What it does |
|---|---|
| **Link Engines** | Adds cross-links to published content based on your LinkCentral keyword index |
| **SEO** | Writes SEO metadata into whichever SEO plugin you have connected — Squirrly SEO, Yoast SEO or Rank Math |
| **GEO** | Regenerates your llms.txt file to reflect the new content |

Stages that depend on other integrations (LinkCentral, and your SEO plugin) are available only when those integrations are active and configured. Only one SEO plugin can be connected at a time, and the SEO stage follows whichever one that is.

### Choosing a GEO engine

GEO is an either/or step — your site's `llms.txt` is generated by exactly one engine at a time:

- **Native** — the built-in generator. On by default.
- **LLMS Amplifier** — a richer alternative (`llms.txt` plus `llms-full.txt`, drawing from more content sources) from the [LLMS Amplifier](../integrations/llms-amplifier) integration, once its plugin is installed.

You don't pick the engine per recipe — it's one site-wide switch on the **GEO** provider status card at the top of the Runs dashboard. When the LLMS Amplifier plugin is installed, the card shows a button to switch engines: **Use LLMS Amplifier engine** (or **Use native engine** to switch back). Turning the LLMS Amplifier integration on or off from the Integrations tab has the same effect.

Turning LLMS Amplifier on takes care of the rest of the setup for you — it automatically sets Amplifier's own update frequency to **Manual** (so it regenerates only when your pipeline tells it to, not on a separate schedule of its own) and turns AI Search Discovery on. Turning it off switches straight back to the native engine; AI Search Discovery itself is never turned off as a side effect of switching engines.

Switching engines doesn't change the per-article **Analyze GEO readiness** check in the [Review & Publish portal](./review-and-publish-your-post.md#geo--ai-search-and-answer-engine-visibility) — that readiness score and the **Include in llms.txt / AI answer feed** toggle work the same way no matter which engine generates the file.

You can also have GEO analysis run automatically the first time a new article arrives (Review Portal settings → **Analyze GEO when a draft is first created**). It is **off** by default, it needs a GEO AI provider, and later deliveries of the same article are not re-analyzed.

## Social Publishing

Social Publishing's **Enable Social Publishing** switch and its full configuration — AI provider, voice profiles, and destinations — live together in one place on this tab. See [Social Publishing](./social-publishing.md) for setup.

## Dry-Run Mode

Enable **dry-run** on a recipe or on a manual run to preview what would change without actually writing to the database. Dry-run results appear in the Runs dashboard with a "Preview" badge.

## Content Calendar

The **Calendar** view gives you a month-at-a-glance look at your content: recent, draft, scheduled, and published posts, all in one place.

Open it from the quick-nav pills at the top of the Content Pipelines tab, alongside Runs, Recipes, and Content Sources.

Each post appears as a chip with a colored bar on the left showing its status:

| Color | Status |
|---|---|
| Teal | Scheduled |
| Green | Published |
| Amber | Pending review |
| Gray | Draft |

Drafts that don't have a publish date yet appear in the **Unscheduled drafts** list beside the grid, instead of on a specific day. On a narrower screen that list moves below the grid.

### Rescheduling and scheduling posts

- **Pick a date and time** — select any post to open a picker and choose exactly when it goes live. This works on every device, including phones and tablets.
- **Move a scheduled post** — drag its chip from one day to another. Dragging needs a mouse or trackpad; on a touchscreen, select the post instead.
- **Schedule a draft** — drag a post from the **Unscheduled drafts** list onto a day to give it a publish date.

### On a phone or tablet

- On a **smaller tablet screen** (and in portrait), the Unscheduled drafts list moves below the month grid so the grid keeps its full width. On a large tablet in landscape it stays beside the grid, just narrower.
- On any **touchscreen**, buttons and posts grow to comfortable tap sizes.
- On a **phone**, the month grid becomes a compact overview — each day with something scheduled is marked with a dot — and a **schedule list** appears below it with every post for that month, plus your unscheduled drafts. The date picker opens from the bottom of the screen.

A few rules apply:

- You can only move posts you have permission to edit.
- Scheduling a draft (turning it into a scheduled post) requires permission to publish, following the same **Who can publish** rule used in the [Review & Publish portal](./review-and-publish-your-post.md#review--approval-rules).
- Published posts are read-only on the calendar — they can't be dragged or rescheduled.

### Showing all content

By default, the calendar shows only content your pipeline has touched — posts imported from a content source, plus posts a recipe has run against. Turn on **Show all content** at the top of the calendar to also include every post, page, or other content type, whether or not the pipeline has touched it, so you can see everything on your editorial schedule in one view.

## Content Sources

Content Sources let **any** external application — not just ContentPen — send finished articles into SyteOps as review-ready drafts. Each source you register gets its own **Ingest URL** and a **webhook secret**. When the app posts an article to that URL, SyteOps maps the incoming fields onto the editor and creates a draft in the [Review & Publish portal](./review-and-publish-your-post.md), where your team reviews and publishes it.

Open the **Content Sources** view from the quick-nav pills at the top of the Content Pipelines tab.

### Receiving content from an external app

Any external content app can deliver finished articles straight into a content source — **ContentPen** is the built-in example, and existing ContentPen setups are carried over for you automatically. The app posts each article to the source's **Ingest URL**; unless you turn verification off, it signs each request with the source's **webhook secret** so SyteOps can confirm the request is genuine before mapping the fields onto the editor and creating a [Review & Publish](./review-and-publish-your-post.md) draft for your team — nothing is published without a human approving it.

You can tailor how each source proves and processes its content, and every option below is set per source, so different apps can be handled differently:

- **Verification secret** — the shared secret used to check each request. Leave it blank and SyteOps generates one for you (shown once), or paste the sending app's own signing secret if it supplies one (for example, a ContentPen webhook secret). If a sender can't sign at all, you can turn verification off entirely (see **None** below).
- **Signature header** — choose which request header the sending app signs with, so a source can match whatever your app already sends.
- **Author matching** — match the article's stated author to one of your registered team members (by email or last name), falling back to a default author when there's no match.
- **Target tag** — automatically add a tag of your choosing to every post from this source, so you can find and group its content later.
- **Display cleanup** — tidy the article's markup when the post is shown on your site.

### Register a content source

1. In the **Content Sources** card, enter a **Source name** (for example, "Marketing CMS").
2. Choose an **Auth mode** — how the sending app proves each request is genuine:
   - **HMAC signature** (recommended) — the app signs every request with the secret.
   - **Bearer token** — the app sends the secret in an `Authorization` header.
   - **HMAC or bearer** — accept either.
   - **None (no verification)** — accept requests with no signature, token, or secret at all. Choose this only for a sender that can't sign; the unguessable Ingest URL becomes the only thing protecting the source, so treat that URL like a password.
3. *(Optional)* If the sending app supplies its own signing secret, expand the verification fields and paste it into **Verification secret** — leave it blank to have SyteOps generate one for you. You can also set a **custom signature header** here if the app signs with its own header name (for example, `X-Contentpen-Signature`). These fields are hidden when Auth mode is **None**.
4. Click **Add source**.

What SyteOps shows next depends on how the secret was set:

- **SyteOps generated the secret** — a highlighted box labeled **Save this secret now — it is shown only once** displays the **Ingest URL** and the **Webhook secret**. Copy the secret and store it somewhere safe (a password manager, or the sending app's settings). If you ever lose it, use **Rotate secret** on the source to generate a new one — the old secret stops working immediately.
- **You pasted your own secret, or chose None** — there's no secret to reveal (you already have it, or there isn't one), so the box shows just the **Ingest URL** and a **Done** button.

### Point your app at the Ingest URL

Configure the sending application's webhook to POST its article as JSON to the source's **Ingest URL**. How it authenticates depends on the **Auth mode** you chose:

| Auth mode | What the app sends |
|---|---|
| **HMAC signature** | An `X-SyteOps-Signature` header (or your chosen custom header) in the form `t=<timestamp>,v1=<hex>`, signed with the secret. If your secret begins with `whsec_`, drop that prefix and sign with the remaining characters. |
| **Bearer token** | An `Authorization: Bearer <secret>` header using the **full** secret string, including any `whsec_` prefix. |
| **None** | Nothing extra — just the POST to the Ingest URL. SyteOps accepts it without any check, so keep the URL secret. |

You can copy the URL again at any time with **Copy URL** on the source card.

### Send a sample and approve the mapping

Before content flows automatically, SyteOps needs to learn how the app's JSON maps onto editor fields (title, body, excerpt, and so on).

1. Have the app send one article to the Ingest URL. SyteOps captures it and holds the source in a **pending** state — no draft is created yet. (You can also paste an example into the **Sample payload (JSON)** box on the source card.)
2. Click **Learn from sample**. SyteOps proposes a **Field mapping**, filling each row's **Path** (a location inside the payload), an optional **Transform**, and a **Confidence** score. You can hand-write or adjust any row yourself.
3. Click **Test with sample** to preview what each field would receive.
4. When the mapping looks right, click **Approve mapping**.

If a source doesn't send a summary, you don't have to map one. When an article arrives without an
excerpt, SyteOps writes a short summary of it and stores that as both the excerpt and the meta
description — otherwise WordPress falls back to the first words of the article, which for most
sources means the card repeats the opening heading. A summary already written for an article is
never replaced. And once an article exists, a source that maps an excerpt field of its own keeps
control of it: SyteOps fills the gap on the first delivery, then stops competing with the app
sending the article. Scheduled articles are left alone entirely.

This needs the **Content** AI area configured. Without it the excerpt is left empty for a reviewer
to write by hand; the **Generate with AI** button in the review portal uses the same AI area, so it
will not work either until that is set up.

Once approved, the source goes **active**: every future post to its Ingest URL becomes a Review & Publish draft automatically, using the same mapping. Any field the mapping doesn't fill — because that particular delivery genuinely has no value at the mapped location — is simply left blank for the reviewer to complete. SyteOps only pauses (holds) the source when an entire delivery doesn't match the mapping at all, so one article missing a single field never blocks the ones behind it.

Categories and tags are not part of the mapping: SyteOps reads each incoming article and chooses them with AI, preferring your site's existing categories and tags and adding new ones only when nothing fits. Reviewers can adjust the suggestions in the Review & Publish portal before publishing, and the source's **Target tag** (if set) is always added on top.

### Reprocess last payload

If a source's field mapping stops matching what the sending app is actually delivering — for example, the app changes its JSON structure — SyteOps holds further deliveries rather than creating incomplete drafts from them, and (if the "Source held" email is switched on) alerts the site admin. Once you've fixed and re-approved the mapping, you don't have to wait for the app to send another article to confirm it worked:

- **From the source card** — a **Reprocess last payload** button appears whenever SyteOps has a remembered payload for that source (see [Visual payload mapper](#visual-payload-mapper) below) and it isn't too large to replay. Click it to run that payload through the corrected mapping and create the draft right away.
- **Right after approving a mapping** — clicking **Approve mapping** offers to reprocess the last captured payload immediately, so you can confirm the fix worked without leaving the page.
- **From the Runs view** — a held row's **Reprocess** button (see [Runs dashboard](#runs-dashboard) above) does the same thing from the run history.

Each reprocessed draft is recorded in the run history as a **manual** trigger, separate from the automatic deliveries the source normally receives.

:::warning Reprocessing an already-active source overwrites the existing draft

Reprocessing a **held** or never-approved source is the low-risk case — there's no draft yet, so the replay simply creates one.

If the source is already **active**, its last payload has already become a draft (or a published post), and replaying it writes over that draft: any edits made since are replaced, the AI re-reads the article and re-picks categories and tags, and — with the default **Replace** taxonomy mode — categories and tags a reviewer curated by hand can be swapped for the new AI suggestions. Because of that, SyteOps asks you to confirm before reprocessing an active source. Published posts are protected separately: unless the source is set to overwrite, a replay leaves live content untouched.

:::

### Visual payload mapper

Instead of typing a **Path** into a mapping row by hand, you can point and click.

Every source has a sticky **Payload** panel on its card that shows a real payload as a clickable tree:

- If the source has received content before, the panel shows the **last payload it received** — SyteOps automatically remembers the most recent one for each source. This is visible only to you in the SyteOps admin; it's never exposed anywhere public.
- If the source hasn't received anything yet, paste an example into the **Sample payload (JSON)** box and the panel shows that instead.

To map a field visually, use whichever is quicker:

- **Dropdown (fastest):** click into the **Path** box for the field you want to map (in **Field mapping** or a **FlowMattic config variable** — see below). A dropdown of every path in the current payload appears right there — start typing to filter it, then click a row (or use the arrow keys and Enter) to fill it in.
- **Tree:** click into the **Path** box, then in the sticky **Payload** panel click through the tree to find the value you want and click it.

Either way, SyteOps fills in the *location* of the value you picked, not the value itself. That means the mapping keeps working correctly on every future payload, even though the specific text you saw was only ever from one example — nothing is frozen to that one sample.

**Clearing remembered payloads.** Each source's Payload panel has a **Clear** button that forgets just that source's last payload. To forget them all at once, use **Delete all captured payloads** at the top of the Content Sources page (it appears once at least one source has a remembered payload).

### Per-source settings

Expand **Settings** on a source card to control:

| Setting | What it does |
|---|---|
| **Source name** | The label shown for this source. |
| **Default author** | The WordPress user credited as the post author. Tick **Always use this author** to override whatever the payload suggests. |
| **Default post status** | **Draft** or **Publish**. This is set here only — the incoming payload can never publish content on its own. |
| **Auth mode** | Change the accepted authentication style (**HMAC**, **Bearer**, **HMAC or bearer**, or **None**). |
| **Verification secret** | Paste a new secret to replace the current one (for example, when the sending app rotates its own key). Leave it blank to keep the existing secret — for security it's never shown here, only a **(configured)** or **(not set)** indicator. Ignored when Auth mode is **None**. |
| **Inbound signature header** | Whether the sender signs with the standard `X-SyteOps-Signature` header or a custom header name of your choosing. |

Use **Rotate secret** to have SyteOps generate a brand-new secret (and reveal it once), **Verification secret** to paste one the sender gave you, **Disable** to pause a source without deleting it, and **Delete** to remove it permanently.

### Choose where drafts land

By default, every source's drafts are created as regular **Posts**. You can point a source somewhere else instead — either when you register it, or later from its card.

- **Send into an existing content type** — Expand **Settings** on the source's card and choose from **Land drafts into**: Posts, Pages, or any other content type already on your site (including a type created by another content source).
- **Define a brand-new content type** — When registering the source, set **Land drafts into** to **Define a new type**, then fill in:

| Field | What it does |
|---|---|
| **Singular name / Plural name** | What the content type is called (for example "Listing" / "Listings"). |
| **Supports** | Which editing features it has: Title, Content editor, Excerpt, Featured image, Custom fields, Author. |
| **Taxonomies** | Whether it uses Categories, Tags, or both. |

SyteOps creates the content type for you, and every draft from this source lands there from then on. A new type's name, supported features, and taxonomies are locked in when the source is created and can't be changed afterward, so plan them before you register the source. (You can still switch the source to a different **existing** content type later from its card — only defining a brand-new type is a one-time choice.)

### Add custom fields

If a source's articles carry information beyond the standard title, body, and excerpt — a SKU, a price, a source URL — expand **Custom fields (post meta)** on its card and add one row per field:

| Column | What it does |
|---|---|
| **Field key** | A short internal name (lowercase letters, numbers, underscores). |
| **Label** | The friendly name shown in the mapping table. |
| **Type** | How the value is handled: Text, Text area, Number, Yes/No, URL, or Date. |

Click **Add field** for each one you need, then **Save custom fields**. Every field you define shows up as its own row in **Field mapping**, so you can point it at the right location in the incoming payload just like the built-in fields. Once mapped, the values are saved as custom fields (post meta) on the draft.

### FlowMattic config variables

Expand **FlowMattic config variables** on a source's card to define named values that automations can read for that specific source — a brand name, a campaign id, a routing tag, or anything else your workflows need.

1. Enter a **Key** (lowercase letters, numbers, and underscores) and a **Value**.
2. SyteOps shows the resulting **FlowMattic variable** name next to each entry — copy that exact name to reference it in your FlowMattic workflows.
3. Click **Add variable** for each one you need, then **Save FlowMattic variables**.

Because each source's variables are named after that source, two sources can use the same key (for example, both defining a `brand` value) without colliding.

### Dynamic FlowMattic variables

Each FlowMattic config variable row has a **Source** setting, so its value can either stay fixed or change with every article:

- **Static** — a value you type once, same as above. Good for things that never change, like a brand name or a routing tag.
- **From payload** — instead of typing a value, use the payload picker (the same clickable tree described in [Visual payload mapper](#visual-payload-mapper)) to choose where in each incoming article the value should come from. SyteOps resolves it fresh for every article as it arrives, so something like a campaign id or a source URL that's different on every article stays accurate automatically — no manual updates needed.

**From payload** variables are only useful once they're actually sent somewhere, so they travel along with each mapped article to your **Forward to workflow** webhook (see below) — one resolved value per article, per variable. Because of that, **From payload** requires **Forward to workflow** to be turned on for the source. A **Static** variable doesn't have that requirement — it works whether or not forwarding is enabled.

### Forward to a workflow

Expand **Forward to workflow** on a source's card to also send each mapped article to a FlowMattic workflow webhook, in addition to creating the Review & Publish draft.

1. Turn on **Enable forwarding**.
2. Enter the **Workflow webhook URL** from FlowMattic.
3. Pick an **Auth mode** — **None**, **Bearer token**, **Basic auth**, or **Bearer + Basic** — to match what the workflow expects, and enter the matching **Auth secret** (leave it blank to keep whatever secret is already saved).
4. Click **Save forwarding settings**.

Forwarding is optional and never gets in the way: SyteOps always creates the Review & Publish draft first, then sends a copy of the mapped content to your workflow in the background. A slow or unreachable workflow endpoint never delays or blocks the draft.

## Listing image

Blog and archive cards force pictures into a fixed shape and still download the full-size file. **Listing image** crops a card-sized copy so those cards do not stretch or clip the original. Article pages keep the original.

You will find it on the **Content Pipelines** tab, under **Review Portal → Article images**.

### Setting it up

1. Turn on **Crop a copy for listings**.
2. Set the **Card size**. Measure your card and double it for retina screens. If a card is 410 by 308 pixels, enter **820** by **616**. Smaller pictures are not stretched.
3. Choose **Keep this part**. For a corner watermark, crop the opposite side — or use **Remove a watermark** below.
4. Save.

### Removing a watermark

Cropping a watermark out of frame costs you a quarter of every picture. If you would rather keep the
whole composition, SyteOps can repair the corner on the cropped copy instead, so the watermark is gone
and the framing is untouched.

The article page, the media library and social previews all keep the watermark. Only the card loses
it, so your branding still appears wherever the picture is seen at full size.

**This is done by SyteHero's image AI**, which reconstructs what the background behind the watermark
should look like. **Crop a copy for listings** must be on first — the watermark controls stay gray until
it is. Without SyteHero installed and an image AI key saved in it, the setting is switched off and
tells you what is missing.

1. Turn on **Remove a watermark**.
2. Choose **Where the watermark sits** — which corner of the picture carries it.
3. Set the **Area to repair**. Leave a little room around the watermark.
4. If more than one image API is connected in SyteHero, choose **Image API**. With only one connected,
   that row stays hidden. API keys stay in SyteHero either way — SyteOps does not store them.
5. Choose a **Repair model**. The list is only the models that edit the picture you already have and
   leave the rest of it alone. Models that reinvent the whole picture are not offered. A cost line
   under the list names the per-picture estimate when SyteHero can provide one.
6. **Quality** and **Seed** appear only when the chosen model supports them. Quality is Standard, High,
   or Ultra. Seed `0` lets the model pick at random; any other number makes the same repair
   repeatable.
7. Save, then look at a few cards.

**Already-repaired pictures.** Turning this on, or updating SyteOps after a repair already ran, does
not rebuild pictures that already have a cropped copy. Use **Reprocess** (below) on those so they
pick up the current repair.

Changing the model, quality, or seed later rebuilds the cropped copies, which is another image
request per picture. Saving the rest of this panel without changing those choices does not.

**What it costs.** Each picture is one image request against your own SyteHero balance, charged once
per picture rather than once per visit — a card that has been repaired stays repaired. Repairs happen
in the background, so a card may show its original crop for a minute after you turn this on, and a
busy archive warms up over a few page loads rather than all at once.

It is off unless you turn it on, because only you know what your pictures look like and what you are
willing to spend. With it on you can set **Keep this part** back to centered and keep the full
composition.

### Using it on listing pages automatically

Turning on **Use it on listing pages automatically** uses the cropped copy on blog, archive, and search pages. Article pages keep the original.

This covers themes two different ways. Most themes render cards through WordPress's featured-image function; those are handled directly. For a theme that builds cards some other way — or asks for an exact pixel size, which no theme setting can redirect — the cropped copy is supplied by recognizing the article's featured image.

It is off unless you turn it on, because it changes what live pages render.

### Where cards use this copy

The settings screen reports whether listing cards on the pages it has checked are using the cropped copy. Visit your blog, home, or an archive page once, then reload the settings screen.

- **Not checked yet.** No listing page has been seen. Visit one and come back.
- **Using the cropped copy.** The pages checked are serving the cropped copy. If automatic use is on, leftover theme sizes (for example Thumbnail on the blog page) are a note, not a warning — visitors already see the cropped copy. You can still point those pages at the listing size in the theme if you want them to keep working with automatic use off.
- **Not using the cropped copy yet.** Automatic use is off, and those pages asked for a different size. Turn automatic use on, or set those pages to the listing size in your theme.
- **Some listing pages use it; others do not.** Automatic use is off, and only some checked pages are on the listing size. The note names both.

Home page is the front of the site. Blog page is the posts list — often `/blog/`.

On Blocksy the theme setting is **Customizer → Blog → post card → Featured Image → Image Size**. If you used 820 × 616, the card's ratio is 4/3.

The message calls out one case separately, naming the page it means: a card asking for an exact pixel size rather than a named one. There is no theme setting to change in that situation, because there is no size name to point anywhere — so if **Use it on listing pages automatically** is on, SyteOps supplies the cropped copy there itself and the message says so. With it off, the message tells you that turning it on covers the case. Either way, if those pixels happen to match your card size above, SyteOps counts it as working and says so.

### When your theme expects a different shape

Because a fixed pixel request states the shape your theme is expecting, SyteOps can compare it against the card size you entered. When the two disagree it says so, naming both — for example a theme asking for 1920 × 1080 (1.78:1) against a card set to 820 × 616 (1.33:1).

This matters because the shapes have to agree. If they do not, the browser crops or letterboxes the copy you just arranged to have cropped correctly, and the card looks wrong for a reason nothing else on the screen would explain. Fix it from whichever end you prefer: change the card size here to match your theme, or change the card's ratio in your theme to match the size you entered.

The warning only appears when there is a real disagreement. The same shape at a different size — 410 × 308 against a card of 820 × 616 — is exactly what you get by following the advice to double your measurement, so it is not flagged. And a theme asking for a named size is never flagged, because a name says nothing about shape.

A few things worth knowing about the reading:

- **It reports what it saw, not a verdict on your site.** It can only tell you about pages it managed to watch, so "using the cropped copy" does not mean every template is wired — only those it checked.
- **Some themes cannot be followed.** A featured post above the grid, a recent-posts widget, or a page builder that prepares its images in advance can all hide the real card request. On those themes the reading may name the wrong page or stay quiet. SyteOps errs toward saying the cropped copy is not in use rather than claiming success it cannot back up — so if you see that on a site you believe is set up correctly, check the theme setting directly.
- **It updates itself.** Once you fix your theme and load the page again, the reading changes. It does not need clearing, and there is nothing to reset.
- **Only blog posts count.** Product, portfolio and other custom content types are laid out by their own plugin rather than by your blog card setting, so they are left out — naming them here would send you looking for a setting that does not exist.
- **A static front page is watched as "on your home page".** If your home page shows latest posts (for example in a Query Loop), load that page once so the reading can record what size those cards asked for.

SyteOps never changes a theme setting for you. It only reads your pages and reports what it saw.

### Using the same cropped copy elsewhere

The listing size is a normal WordPress image size, so once it is switched on you can choose it anywhere WordPress offers you a size. Look for it by the name shown on the settings screen — it appears in:

- Your theme's blog or archive card image size — the setting the reading above is about.
- The **Image** block in the editor, under **Image size**.
- The media picker, under **Attachment display settings**.
- Any related-posts or recent-posts block that lets you choose an image size.
- Related-post and post-grid cards **below an article** also use this copy when **Use the listing size on blog and archive cards** is on — the article's own featured image stays the full original.

Wherever you choose it, it is the same file — cropped once and reused, watermark repair included.

### Rebuilding one picture

Sometimes a single picture comes out wrong: the repaired corner looks smudged, a leftover logo
fragment sits on the true rim, or the repair could not run at the moment it was tried. SyteOps
records that attempt so it does not keep retrying and charging you for the same failure — which also
means it will not try again on its own.

**Reprocess** is how you ask it to. It forgets the previous failed attempt and starts over, keeping the current cropped copy on cards until the new one is ready.

- **In the review portal**, the **Reprocess images** button beside the publish bar does this for the article's featured image and every picture it imported.
- **In your media library**, each picture has a **Reprocess listing image** link in its row, and you can select several and use **Reprocess listing image** from the bulk actions menu.

A progress window shows a spinner and one picture at a time while that image rebuilds. Reload the listing page when it finishes so cached copies update. If you close the window before every picture is done, remaining work continues in the background. Unattended archive visits still prepare listing copies in the background the first time a page asks for them.

It also gives a picture still named after its file a real name, taken from the article it belongs to.

### Existing pictures

You do not need to regenerate anything. Pictures already in your media library are cropped the first time a listing asks for them, one at a time, and reused from then on. A site with ten pictures and a site with ten thousand behave identically — there is no batch job to start and nothing to wait for.

If you later change the size or the part you keep, existing copies are replaced the next time each one is shown. A picture is only ever cropped when it is at least as large as your card in **both** directions — so a wide, short banner is left alone even though it is not "small", because cropping it to a taller shape would mean stretching it. Those cards keep behaving exactly as they do now. Vector images (SVG) are always left alone too, since they resize by themselves.

If a picture was uploaded at a very large size, WordPress keeps a full-resolution copy of it alongside the one it normally uses. SyteOps will fall back to that copy when your card size is larger than the everyday one — so asking for a big card still works. The one exception is a photo that carries rotation information from a camera or phone: those are skipped rather than risk cropping a portrait photo sideways.

With **Remove a watermark** off, copies are prepared a few at a time — a handful per page view rather than all at once, so the first few visits to a large archive warm it up gradually instead of making one visitor wait for everything. Cards still waiting their turn show the full-size picture in the meantime — exactly what they showed before you turned this on — so nothing looks broken while it catches up.

With **Remove a watermark** on, the cropped copy is prepared in the background together with the repair — listing pages keep your theme's usual image until that repaired file exists. **Use the listing size on blog and archive cards** stays gray until **Crop a copy for listings** is on, so it cannot look like it works on its own.

### If you turn it off again

Switching **Crop a copy for listings** off stops SyteOps preparing any more copies, but it does not remove the ones already made — and your theme is still set to ask for that size. WordPress will keep handing cards the copy it already has, while pictures added from then on have none and fall back to a larger file. The result is a mix of sizes across your cards.

So if you turn it off, change your theme's blog card back to whichever image size it used before. That single change is what actually returns the cards to their previous behavior.
