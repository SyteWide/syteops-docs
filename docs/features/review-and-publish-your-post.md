---
sidebar_position: 12.5
title: Review & Publish Your Post
description: Open your branded review email, edit the draft in the secure portal, approve it for publishing, and share it with a teammate — all without logging into WordPress directly.
---

# Review & Publish Your Post

When your content source finishes generating a new article, SyteOps sends a branded review email to everyone on the notification list and opens a secure editing portal where reviewers can read, refine, and approve the post before it goes live.

This page explains the full workflow from the moment that email arrives to the moment the post is published.

:::note Part of Content Pipelines
The Review Portal is part of the **Content Pipelines** feature. It becomes available once you have at least one **content source** set up to deliver articles into your site — each incoming article opens as a draft in the secure editor for your team to review before it goes live.
:::

---

## Step 1: You receive a review email

As soon as a new draft arrives from your content source, SyteOps sends a notification email to:

- The **post's author** (the WordPress user the post will be attributed to).
- Anyone listed as a **Default reviewer** or **Default CC reviewer** in your Review Portal settings (see [Who receives the review email](#who-receives-the-review-email) below).

The email comes from your site, uses your site's logo, and includes a summary of the article title and source keyword. Two buttons sit directly under that summary, above the article photo: **Edit/View this article**, which opens this particular draft, and **See all my reviews**, which opens your full review queue. On a phone the two buttons stack one above the other so both stay readable and tappable.

The email follows your device's appearance setting, so it renders in dark mode if that is what you use. Your logo keeps a light backing so it stays legible either way.

The article photo is sent along with the message rather than linked from your site, so it appears even in mail apps that block or fail to load linked images. One trade-off comes with that: if you forward the email or reply to it, most mail apps do not carry the attached photo across, so the recipient of that forward sees a placeholder where the picture was. The article itself is unaffected — the **Edit/View this article** button still opens the full draft, photo included. Unusually large photos are still linked rather than attached, so a message never becomes needlessly heavy.

---

## Step 2: Open the secure editor and sign in

Click **Edit/View this article** in the email. Your browser opens the Review Portal — a page on your own WordPress site.

**The link alone cannot publish or change anything.** It simply takes you to the portal. To make any edits or approve the post, you must be signed in to your WordPress account.

If you are not already logged in, the portal shows its own branded sign-in card. Enter your usual WordPress username and password there and you are taken straight to the draft — you never leave the portal for the WordPress login screen. If your site owner has passkeys switched on, the card also offers a **Sign in with a passkey** button; a password still works either way.

If your site runs a security plugin that challenges a sign-in — asking for a two-factor code, or emailing you a link to verify a login from an unfamiliar device or location — you are taken to the standard WordPress sign-in screen so that plugin can tell you what it needs. Complete the check there and you land on the draft as usual. The portal's own card only reports a wrong username or password, so a message about your credentials always means exactly that.

The first time you open an article is recorded, so the site's owners can see the review email was acted on. Only that first open is listed — later visits add nothing — and nothing is recorded unless you are signed in with permission to edit that article.

:::tip After a plugin update, or after you replace a picture
The review portal brings its own look and scripts. After you install a SyteOps update, reviewers see the new design and behavior the next time they open the portal — you do not have to purge a CDN. Replacing a picture works the same way: the portal shows the new file. Saving stores the original media URL rather than a CDN copy, so the replaced picture still shows after you reload, and it does not bake a cache-buster into the article.
:::

---

## Step 3: Review and edit the draft

Once you are signed in, the portal shows the full draft. The header brand (logo and company name) opens the WordPress Dashboard in a new tab when you click it. In the article editor, the top bar uses two rows — logo and status pill on the first row (status on the far right), nav pills under the logo and **Signed in as** on the right of the second — so logos and names are not squeezed on narrow screens. **See all my reviews** in that bar opens your full review queue without leaving the portal session.

You can edit the core article fields as well as the SEO details, AI visibility settings, and categories and tags.

On a wide screen the article sits on the left with the review panels beside it. On a phone or a smaller tablet the two columns stack, and the **title and article come first** — feedback, reviewers, SEO, GEO and categories follow underneath, so you can start reading straight away.

Tables and other formatting in the article body are shown the way they will look once published, so you can judge the article as your readers will see it.

### Review how it looks on the site

Some reviews open as they will look on your live site, instead of as a body you type into. That is how a **page** is reviewed, and it is also how an article opens when you choose **Review Appearance**.

The preview is a private full-page view (no WordPress admin bar). The toolbar is **Device Preview** (Desktop / Tablet / Mobile), then **Height** (Auto / 800 / 1200 / Full), then **Refresh**. Height **Auto** matches the page content; Tablet and Mobile sit centered. If the preview cannot load inside the portal, you will see **couldn't embed this preview** and an **Open in a new tab** link.

Saving from this view never changes the page or article body. Title, summary, and the other review fields still save as usual.

Click a page element in the preview to leave a note. The click opens a note dialog instead of following the page. Drag across words first if you want the note to quote that phrase; a click with nothing selected still comments on the whole element. Press Escape to drop the highlight and close the note. Clicking an image shows that it is an image, its name, and a small thumbnail. A pin on the preview and its Feedback row share the same color. If that element has moved, the row is marked Moved rather than guessed. Handling or deleting a note in Feedback updates the pin on the preview at the same time — you do not need to refresh.

You can also send **one review link for several pages or posts**. Under **Content Pipelines → Review Portal → Page Reviews**, name the bundle, add the items in the order they should be walked, pick the reviewers, then **Save bundle**. **Send bundle** emails those reviewers a card for every item; **See all my reviews** on that mail opens the review queue filtered to the bundle. Click a page in the list to select it, then **Send page** emails that one page or post as a page review without saving it into a bundle. **Copy link** copies the same walk link without emailing anyone. The reviewer opens a single link and uses the strip above the preview to move to the next or previous item. Comments stay on the item they are looking at.

A copied link is for looking at the site and leaving notes. It does not let that person change the article body or invite someone else with **Send to a Colleague**. **Send bundle** is what gives the listed reviewers their usual editing rights on those items.

### Core article fields

| Field | What it is |
|---|---|
| **Title** | The post headline that appears on your site. |
| **Body** | The full article content. |
| **Web address (slug)** | The URL path for the post (e.g. `your-site.com/your-slug`). |
| **Summary (excerpt)** | A short description used in search results and social sharing previews. |

### Formatting and links

The body editor has a formatting toolbar for **bold**, **italic**, **underline** and **strikethrough**, **headings** (H2/H3), **bulleted** and **numbered** lists, **clear formatting** (removes styling from the selected text), and **undo**/**redo**.

A button lights up when the text you have selected already has that formatting — so you can tell at a glance whether a word is bold, and click the same button again to remove it. This works on text that arrived from your content source, not only on text you typed yourself, and it includes underlining that came from the original article's own styling rather than from this editor. You can take the underline off a whole sentence or just a few words of one, and off a link, without disturbing anything else about how those words look.

One case is deliberately left alone: where an entire paragraph is underlined as a block and you select only part of it, the underline stays, because removing it would mean splitting one paragraph into three. Select the whole paragraph and it comes off.

**How much formatting is offered** is set once for the site, under **Content Pipelines → Review Portal → Formatting controls**:

| Setting | What the toolbar offers |
| --- | --- |
| **Minimal** | Bold, italic, underline, strikethrough, remove link, clear formatting, undo and redo. Pasted pictures are kept at every level. |
| **Editorial** (default) | The above, plus links, bulleted and numbered lists, and H2/H3 headings |
| **Full** | The above, plus block quotes, inline code, superscript, subscript and text alignment |

Choose **Full** if your articles routinely need code snippets or pull quotes. Choose **Minimal** if you would rather reviewers only correct emphasis and leave the structure alone — they can still remove a link that came in with the article, they just cannot add one.

**Pasting from Word or Google Docs** no longer brings that document's fonts, colors and spacing with it. The words, and the formatting your chosen level allows, come through; the rest is dropped. This affects only what you paste in — it never changes formatting that is already in the article.

To check that a link in the article goes where it should, hold **Command** (Mac) or **Ctrl** (Windows) and click it. The address opens in a new tab so you stay in the Review Portal. A regular click still lets you edit the linked words.

The **link** button (🔗) lets you add a hyperlink, and the **remove-link** button (🔗✕) strips the link from selected text:

1. Select the words you want to turn into a link (or place your cursor where the link should go).
2. Click the **link** button to open the link picker.
3. If your site uses **LinkCentral** to manage links, the picker lists your managed links — start typing in the search box to filter, then click one to insert it. The portal inserts the managed link so clicks are tracked and routed by LinkCentral.
4. To link to any other web address, paste it into the **URL** field and click **Insert link**.

To remove a link, select the linked text and click the **remove-link** button. If LinkCentral is not connected on your site, the picker simply shows the paste-a-URL field.

### Featured Image

The **Featured Image** panel shows the image currently set for the post. **Click the image** — or the **Edit image** button below it — to open **Image Details**, the same panel you get by clicking a picture inside the article. From there you can:

- **See where the image comes from.** The **Image Link** field carries a short hint underneath it — *Paste a new link to replace this image* — and while **Image Details** is collapsed, its heading shows the picture's status at a glance: **In your media library** (with a check), **Not in your media library**, **Hosted on this site**, **Embedded in the article**, or **Check the image link**. Open the section and the full sentence takes its place, same as before — a library picture reads **Already in your media library** even when that address is a CDN copy of the file.
- **Replace it with a picture from somewhere else.** Paste the new web address into the Image Link field and click **Apply**. SyteOps fetches the image, adds it to your media library, and sets it as the featured image — so the published article never depends on someone else's site keeping the file.
- **Replace it from your own library.** Click **Choose from library** (marked with a folder icon) to pick an image you already have, or upload a new one from your computer.
- **Describe it.** The **Alt Text** and **Caption** fields are here too, each with a short hint underneath — Alt Text: *Describes the image for screen readers and search engines*; Caption: *Stored with the image in your media library*.

The preview updates as soon as the new image is set. If your account cannot manage media on the site, the Edit image button is disabled and says why.

**Alt Text** describes the image for screen readers and search engines. The **Alt Text** field below the preview is filled in with the current description — with a hint that it is read by screen readers, and shown when the picture cannot load — and you can edit it there without opening the details panel. It saves with the rest of your changes. If a featured image is set but has no alt text, you'll be prompted to add it before you can publish.

Two things worth knowing when you swap the image:

- You'll be asked to write **new alt text**. The box still holds the description of the picture you are replacing, and publishing that against a different photo describes the wrong thing to anyone using a screen reader.
- **Alt Text and captions are shared.** They belong to the image in your media library, not to this one article — so changing them changes how that picture is described everywhere it is used. SyteOps only saves them when you actually edit them, so simply opening an article never rewrites anything.

### Author

The **Author** panel sits just under Featured Image. It lists the same WordPress users as the content source Default author picker. The field is labeled **Post Author**, with a hint that it is shown as the byline. Change who is credited on the article and click **Save** (or wait for autosave). The new author is added to the reviewer list so they can open the portal; the previous author stays on that list too. This does not rebuild who receives review emails.

If an operator has set Author to **View only** for your reviewer type, you can still see who is credited, but the list is disabled. The same happens when **Who can publish** is **Author or designated approver only** and you are a co-reviewer — only the credited author (and administrators) can change the byline, so a co-reviewer cannot assign themselves and then publish.

### Images inside the article

Click any image in the article body — or the featured image — to open its panel. The panel title reads **Article Image**, or **Featured Image** when you opened the featured one. **Notes on This Image** comes first, because a note about the picture is what most people open the panel to write. If any note on that picture is still unresolved, the heading tells you how many.

Below the notes is **Image Details**, a section that starts closed — click its heading, or the chevron beside it, to open it, and the chevron turns to show the section is expanded. It holds three short fields — **Image Link**, **Alt Text** and **Caption** — each with its own gray hint line underneath explaining what it is for, in place of a dash-separated explanation. It stays open as you move from picture to picture, so working through a batch of images costs one click rather than one per image.

Nothing is removed by this, but it does put those three fields one click away rather than in front of you. The alt text and the caption are still edited here and nowhere else, and they still save exactly as before — you open **Image Details** to reach them. The panel opens the section for you whenever it has something to say back about one of those fields — when it asks you to describe a replacement image, and while it reports how a change to the picture went. It won't open itself just to report where the picture is hosted, but you don't need it to: even while the section is collapsed, its heading shows a short status at a glance — **In your media library**, **Linked from another site**, **Hosted on this site**, **Embedded in the article**, or **Check the image link** — and opening the section swaps in the full sentence, as before.

Many drafts arrive with their images still hosted by whatever tool wrote the article. That works, but only for as long as that other site keeps the file: if it is moved or deleted, the picture disappears from your article. Images in that situation are labeled **"Linked from another site — not in your media library"**, and an **Import to media library** button appears next to the label. Click it to bring the file onto your own site; the picture is added to your media library with its alt text, and the article is pointed at your copy.

A picture that is already in your media library is labeled **"Already in your media library"**, and **Import to media library** is hidden — even when Image Link shows a CDN copy of that file rather than the original media URL. Do not Import those; they are already yours. Saving stores the original media URL, so a picture you replaced still shows after you reload.

You can delete any picture in this panel from your media library — including the original, and including the one the article is showing. A picture the article is showing is removed from the article first, then deleted from the library; you are asked to confirm, because this cannot be undone. If another article is using the same file, the delete is refused and the picture stays in the library.

You don't have to do this by hand for every image. **When you publish, images that are still hosted elsewhere are copied across automatically**, so a published article no longer depends on another site keeping the file.

Two things to know about that automatic copy. If an image cannot be fetched — the other site is down, or the address is wrong — publishing still goes ahead and that image stays as a link, so one unreachable picture never blocks your article. And a single publish copies up to 25 images; on an unusually picture-heavy article the rest are left for the next publish. Either way you are told afterwards, so you know which articles still have borrowed pictures in them.

Importing needs permission to add media to the site. If your account does not have it, the Import button does not appear and images are left exactly as they are.

**Swapping a picture for one from your media library.** Next to the image link is a **Choose from library** button, which opens your media library so you can pick a different picture. This works for pictures inside the article as well as for the featured image. Picking one keeps the article properly linked to that library item — something pasting a link cannot do — and the picture brings its own alt text with it, since alt text describes the picture rather than the article.

Its **caption is left exactly as you wrote it**. A caption is your own words about the article, so it is never silently replaced; if it no longer suits the new picture, edit it yourself. The button appears only if your account has permission to add media to the site.

**Turning it off for one article.** Next to the publish controls there is an **Import images** checkbox. It starts from your site's setting and applies to the article you are looking at, so you can leave one article's pictures where they are without changing anything for everyone else.

**Putting the original links back.** If an article's images were copied across and you would rather they were not, a **Revert images** button appears beside the publish controls. It points the pictures back at the addresses they came from. Nothing is deleted from your media library — the copies stay there, in case another article is using them. If someone has changed one of the images by hand since it was copied, that one is left alone and you are told, rather than having your change overwritten. Reverting a live article asks you to confirm first, since the published page will go back to loading its pictures from somewhere else. Reverting also switches **Import images** off for that article, so the next publish leaves the original links alone — turn it back on if you change your mind.

**Modify with AI.** When SyteHero is installed and ready, **Modify with AI** sits below the **Image Details** section in the image panel, and also on the featured-image card. Type a prompt (often pre-filled from the incoming article) — the same box also holds a **Use another picture** pill if you would rather start the remix from a different picture — and click **Generate**. Model and Quality now share one row at equal width, so the model name is never cut off; Strength, for the one model that uses it, wraps onto its own line below with a hint. **Generating no longer swaps the picture in your article** — it makes a new version and puts it in a grid of version cards for you to [choose between](#choosing-between-versions). The original picture is kept so you can **Revert**. Generate with a blank prompt is refused.

**Telling the AI what the article is about.** Under the prompt is a tickbox, **Tell the AI what this article is about**. Ticked, it sends the article's title and summary alongside your prompt, which is what lets an instruction like "make the text on the screen readable" produce text about the right subject rather than plausible-looking nonsense. It is **off unless you tick it**, and it applies only to the generation you are about to run — these models are editing your photograph rather than drawing a new picture, and extra description is not always wanted. The grid of versions still labels each picture with the prompt in your own words; the added context is never shown there as something you typed. This never runs when the article is ingested — only when a reviewer asks. An operator can hide Modify with AI from specific reviewer types in **Reviewer editing permissions**.

### Changing an image with AI

The image panel also has a **Modify with AI** section, below **Image Details**: describe the change you want and press **Generate**. Pressing Generate makes a new version and leaves your article alone — you decide afterwards which version the article uses. The original is kept, so **Revert** always brings it back.

The prompt box and the reference-picture control now share one box. Click the **Use another picture** pill at the bottom of the box to remix from a different picture instead of the one you opened — once you pick one, the pill turns into a chip showing its thumbnail and **Starting from &lt;file name&gt;**. Click the **×** on the chip (its accessible name is **Stop using a different source image**) to drop it and go back to remixing the picture you opened.

#### Using a Model

A **Use a Model** control appears in this same Modify with AI block — not under Generate SEO with AI — but only once your administrator has granted **Model consent** for at least one person on a Users card. With nobody consented, the control does not appear at all. Open it, pick the person, then check which of their photos to send with **this** generate. Nothing starts checked, and closing the popover forgets the checks. Some remix models take Model photos (up to a number the model list shows) and others are scene-only. You can send up to four Model photos with one generate — fewer when the remix model you picked takes fewer pictures. The limit follows the model as you switch, and any checks past a lower limit are cleared. The article picture (or **Use another picture**) stays the picture being edited and does not take a Model-photo slot; Model photos are extra references so the result can match that person.

The photo list only shows pictures that can actually be sent with the generate — other file types and pictures you do not have permission to see are left out. It shows every curated photo and the 24 newest tagged files. People without consent never appear in the person list either.

If you switch to a remix model that can only take one picture, the control stays visible and disabled with a reason, and any person you had chosen is cleared — pick them again once you switch back to a model that accepts Model photos.

If a person's photos fail to load, you are told so and asked to choose them again, rather than being left with a picker that looks stuck.

The new file is tagged with the person's current display name when it is created. Those tagged files show up on the Users cards. Promoting a tagged file into the curated set is an administrator action on the Users card — see [Model photos](user-management.md#model-photos).

Model photos reach the image service only when SyteHero on this site is a release that accepts extra reference photos — see [SyteHero Integration](../integrations/sytehero.md#review-portal-model-photos).

Two things decide whether the picture comes back looking like itself:

- **Model.** The list now names each model and says which ones *keep text and logos*. If a picture has words in it — a sign, a label, packaging — choose one of those. The others are better at reimagining a scene than at preserving one, and they are the reason text has come back garbled.
- **Keep text and logos exactly as they are.** On by default. Turn it off only when you want a genuine reinterpretation rather than an edit.

**Model** and **Quality** now share one row at equal width, so the model name is never cut off. **Quality** is Standard, High or Ultra; several of the models that best preserve text ignore it entirely — they always return their own size — so it applies mainly to the more generative ones. **Strength**, for the one model that actually uses it, wraps onto its own line below Model and Quality, with its own hint. **Generate** (with a sparkle icon), **Revert** and **Stop** sit together on their own row below both checkboxes on this panel — this one and **Tell the AI what this article is about** above — with Generate filling the row.

The picture also keeps its own proportions. A square or portrait photo used to come back cropped to widescreen, because nothing told the image service what shape it started as.

The new version also keeps the original picture's title, alt text, caption and description, rather than arriving in your media library with a made-up name and nothing written about it. The one exception: if the original's title is nothing more than its file name — something like `IMG_4471` — that isn't carried over, since a file name isn't a title anyone chose. This looks past the file names WordPress makes up on your behalf, too: when a name is already taken it adds a number, it saves a smaller copy of a very large photo, it turns a sideways photo the right way up, and it saves a separate copy when you crop. A picture still titled `IMG_4471` is recognized in all of those cases. When the title is refused this way, the new version is named after the original's alt text instead, or after the article if there is no alt text. If the article has no title of its own either, there is nothing left to borrow, and the picture keeps its generated name. The file itself still gets a generated name on your server either way; it's the title, alt text, caption and description shown in the media library that come from the original.

Your site administrator sets the defaults under **Content Pipelines → Review Portal → AI Models → Image generation**; each Generate can override them.

**How much credit is left.** At the end of the **Modify with AI** heading row sits a small pill showing
the image service's remaining balance, with a **Refresh** icon button built into it — its hover title
reads **Refresh**, and screen readers still hear it as **Refresh image AI credit**. With one image
provider configured, the pill reads simply as an amount, something like **$30.01 credit**, and the
provider's name appears only when you hover the pill; with two or more providers, each keeps its own
name in the pill, for example **fal: $30.01 · other: $5.00**. It is the same figure your site
administrator sees in the plugin information panel, which opens from the logo in the top corner of the
settings screen — the image services are listed there rather than on the API Keys screen, because they
bill through a key this plugin does not hold. It lets you tell whether there is credit to spend before
you press Generate, rather than finding out from a generation that fails. Refresh re-checks every image
service at once, and hovering the pill still tells you when it was last checked (**Checked N minutes
ago**). If a balance cannot be read, you are told why instead of being shown a misleading $0.00 — a zero
would read as an empty account rather than a lookup that did not work. The balance appears only when
Modify with AI is available to you.

**While it runs.** A progress bar appears under the controls. Some models report how far along they
are, and the bar fills to match — it deliberately sits near the end for a while, because that is
where the image service holds a job it has not quite finished. Many models say nothing at all while
they work, and for those the bar shows a moving sliver rather than a percentage: the job is running,
but there is no honest number to put on it. It no longer sits frozen at zero, which used to look
like a picture that was never going to arrive. A **Stop** button sits beside **Generate** while a
picture is being made; pressing it abandons the job and gives the controls straight back. (**Apply**
and **Cancel** now sit together in a footer bar pinned to the bottom of the panel, so both stay
reachable however far the popover scrolls; **Cancel** still just closes the panel.)

**If it goes wrong, you are told why.** A refusal now shows the image service's own words — a prompt
it would not accept, a picture it could not read, a request that timed out — instead of a single
"could not modify this image" for every possible cause. Where the reason has a fix you can act on
yourself, such as a permission you do not have, you still get the plain-language version.

**If somebody else is already changing that picture**, you are told so, shown how far along their
job is, and offered **Stop** — so you are not left waiting out a job you cannot see.

### Choosing between versions

Every time you press **Generate** you get another version of that picture, and they all stay. They
appear as a grid of version cards at the top of **Modify with AI**, each an equal size with a larger
thumbnail than before: the picture the article arrived with first, then each version you have made, in
the order you made them. The original's thumbnail carries the **Original** label. The grid appears once
there is more than one picture to choose between — with a single picture there is no choice to make,
so nothing is shown.

Click a card's thumbnail to see that version at full size, with the prompt that produced it underneath
— big enough to judge whether it actually fixed what you asked for, which a small thumbnail cannot tell
you. Click the same thumbnail again to close it. Clicking is only looking: nothing is written and your
article does not change.

Up to three controls sit on each card.

- **Put in article** — formerly labeled **Replace** — puts that version into the article. It is the
  only thing that changes the picture your readers will see, and you can press it as often as you like
  — including on the original, to put things back exactly as they were. The one version you cannot put
  in the article is the one the article is already showing: instead of the button, that card shows
  **In the article** with a check, and asking for it anyway is refused rather than quietly recorded as
  a change nobody made.
- **Keep** (now with a bookmark icon) marks a version worth holding on to, and pressing it again
  releases it — the button reads **Kept** while it is on. Versions you have not kept are tidied away on
  your behalf once a picture's grid has grown past seven cards — the picture the article arrived with,
  plus six versions — oldest first, so a long session of experimenting does not fill your media
  library. A version you have kept is never tidied away, and neither is the newest one — the picture
  you just asked for is always still there when you look at it.
- **Delete** is a trash-icon button (its accessible name is **Delete this version**) on every card,
  including the original and the one the article is showing. It removes that picture from your media
  library for good. If the article is showing it, it is taken out of the article first, and the
  confirm says so. Any notes left on that version move to the picture your article is showing, so a
  note never outlives the picture it is about.

**Put in article can tidy up after itself.** Above the controls sits a checkbox — **Delete the picture
it replaces from the media library** — that applies to **Put in article** and to nothing else. Tick it
and the swap is saved first, then the picture your article moved off is deleted. It starts off every
time you open a picture, so it can never carry over from the last one you were looking at.

It is a tidy-up rather than a shortcut, and every refusal below still applies to it. When one of them
stops the deletion the picture is simply kept, you are told which reason it was, and the replacement
itself still stands — a swap is never undone because the tidying was refused. After you first put a
version in the article, ticking the box can delete the picture the article arrived with, once the
article is no longer showing it. That original then leaves the grid, and **Restore original** is no
longer offered for that picture.

Some versions carry fewer than three controls, because some of them are refused on purpose. A
picture another article is also using is never deleted from the library — whether you pressed
**Delete** or the tidying did it for you. The version your article is currently showing can be
deleted: it is removed from this article first.

Two more refusals apply to the **Delete** button only, because they are about you and about this
moment rather than about the picture:

- nothing is deleted at all if your account is not allowed to delete media on this site;
- and a picture a remix is still running on is left alone — wait for that to finish.

Whenever it is you doing the deleting, you are told which of those applies rather than simply being
refused. The automatic tidying says nothing either way — it only ever passes over a picture it is
not allowed to take.

If a version has already been removed from your media library some other way — from the Media
Library screen, say, while your grid was open — pressing **Delete** on it simply tidies it out of the
grid instead of failing.

If you would rather not choose between versions at all, **Restore original** puts the original
picture back in one click — while that file is still in the grid. Once it has been deleted, the
button is hidden.

### Notes on an image

Click any picture in the article — or the featured image — and **Notes on This Image** is the first thing in the panel. Type what is wrong with the picture and click **Save note**. Under **Save note**, on every one of those panels, is **Attach reference image**, so later Modify with AI remixes start from that tagged picture unless you pick a one-off source for a single generate. If the picture is still only a web address and has not been imported into your media library, **Pick** stays disabled and the panel tells you to import the picture first.

The heading carries a count of the notes on that picture nobody has resolved yet, so you can tell at a glance whether a picture still has something outstanding without reading the list. A picture with nothing outstanding says nothing.

**Saving a note emails nobody.** The note is attached to that picture, everyone who can open the article sees it, and nothing else happens. That is deliberate: most notes are a record, not an interruption.

**A note you have started is kept until you save it.** Close the panel, or click a different picture, and the text is still waiting on that picture when you come back — the box says **Unsaved note — press Save note** while it is holding something, and your browser warns you before you leave the page with one outstanding. That warning applies after you publish too, because the notes panel keeps working on a live article. Nothing is saved on your behalf: a note is only filed when you press **Save note**.

**A started note follows its picture.** Import it, replace it, or change it with AI, and the text you were writing is still there against the new version — even if the change finishes after you have closed the panel. If the picture itself is removed from the article, the note goes with it and the page stops warning you about it. If two pictures end up pointing at the same file, their started notes are joined rather than one being thrown away, and the text that moved is introduced by a line saying it was carried over from another picture — so you can see what you are about to file before you press **Save note**.

When you do want somebody to know, use **Notify** in the action bar at the bottom of the portal — see [Sending the notes to somebody](#sending-the-notes-to-somebody) below.

Each note has a **Resolve** link, in the image panel and again in the Feedback panel further down the page — so you can work through a list of notes without reopening every picture. Anyone can resolve a note, not just whoever wrote it — the person who fixes the picture is usually the one who knows it is handled. Resolved notes stay in the record, grayed out, and can be reopened from either place. Notes never block publishing.

### Sending the notes to somebody

**Notify** sits in the action bar at the bottom of the portal, beside **Request changes**. It is an article-level action because it always was one: the email it sends covers every note on the whole article, not just the picture you happen to be looking at.

Click it, choose who should hear about it, optionally type a message, and press **Send**.

**One email, to one person.** If you work through six photos and then press Send, the recipient gets a single message listing all six, not six messages. Nobody else is emailed — Notify is not a broadcast, and it does not touch the article. Nothing is saved, no schedule changes, and nothing is published.

**The message is optional, in both directions.** You can send the notes with no message at all, or send a message with no notes — a hand-off to a colleague at the end of your shift, for example.

**Your message is kept with the article.** It joins the **Feedback** panel as a note, so the next person to open the article can see the hand-off happened rather than having to take your word for it in an email they may not have.

**The email tells them what changed, not just what is outstanding.** It lists the notes still open, and separately the notes that have been dealt with since you last told them — so somebody who heard about three problems last week can see that two of them are now fixed, instead of receiving the same three again.

**A note you have not saved is saved first.** If the image panel still holds a note you were typing, Send files it so it goes out with the rest; if that save fails, nothing is sent and the modal says so. Notes you started on *other* pictures are not sent — only you can decide a note is finished — so the confirmation tells you how many are still waiting.

**Who you can choose.** The list offers the people already on this article, plus site administrators, who can already open every draft. Telling anybody else would also be giving them access to an unpublished draft, and that is what **Send to a Colleague** is for.

**Nothing new to say?** If that person has already been sent every note on the article, Send tells you so rather than mailing them a duplicate — add a message if you want to reach them anyway.

If your site administrator has turned reviewer-note emails off, the **Notify** button simply is not there; you can still write and resolve notes.

### SEO — keyword and meta description

The **SEO** panel lets you control how the post appears in Google and other search engines.

- **SEO Title** _(shown only when your site has an SEO plugin connected — Squirrly SEO, Yoast SEO or Rank Math)_ — The search-result headline. The hint under the field is **Shown in search results. Leave blank to use your SEO plugin's default title.** What happens when you leave it alone depends on which plugin is connected, and the difference matters:
  - **Squirrly SEO** — the title is **auto-generated** from the post title. Type your own to override it; clearing the field returns it to automatic.
  - **Yoast SEO or Rank Math** — the field stays **empty** unless you type something, and that is correct. Both plugins build the title from your own site-wide template (usually something like `Title | Site Name`), and they use that template only while this field is blank. Filling it in automatically would quietly drop the site name from every article. Type a title here only when one specific article needs to differ; clearing it hands the article back to your template.

  When no SEO plugin is connected, this field is hidden.
- **Primary Keyword** — The main search phrase this article is targeting. Your content source pre-fills this from the keyword used to generate the post. You can change it at any time.
- **Secondary Keywords** — Supporting search phrases for the article, pre-filled from your content source when provided. Enter them comma-separated. They are saved with the post and available to your SEO tools.
- **Description** — The short sentence that appears under the page title in search results, and the WordPress excerpt. Keep it to one or two clear sentences that summarize the article. Click **Generate with AI** to have the AI draft it from the current title and body — the result fills the field for you to review and edit. (This requires a Content provider to be configured in the Review Portal settings.)

Each of the SEO, GEO and Categories & Tags panels has its own **Save** button at the foot of the panel, so you never have to scroll to the bottom of the page to keep your work. It saves everything on the page exactly as shown, not just that one panel. The portal also saves on its own a few seconds after you stop typing — and immediately after any of the AI buttons fills something in — so generated text is never left sitting only in your browser.

As you type, a **search-result preview** updates in real time so you can see exactly how the title and meta description will look to someone finding your post on Google before you publish. When an SEO title is set, the preview uses it as the headline.

### GEO — AI search and answer engine visibility

The **GEO** panel helps you understand how well your article is positioned for AI-powered search tools — such as those that read your site and use the content to answer user questions directly. The heading is **GEO**; the hint under it is **Generative Engine Optimization**.

**Checking your AI readiness score**

Click **Analyze GEO** to run an AI analysis of the post. Within a few seconds the panel shows:

- A **readiness score** indicating how well the article is structured to be picked up and cited by AI answer engines.
- A list of the **questions your article answers** — these are the kinds of questions an AI search tool might recognize your article as a source for.

You can run the analysis as many times as you like; it does not change the article itself. The score and the questions are stored as soon as the analysis finishes, and re-running never discards answers you have edited yourself. If you turn on **Analyze GEO when a draft is first created** on the Review Portal settings, that same analysis also runs once when a new article first arrives, so reviewers do not have to click the button for every new draft. It is off by default, and later deliveries of the same article are not re-analyzed.

Running the analysis writes an answer for each question. Answers are shown in full in this panel (up to 2000 characters) and are never cut off. They stay held back from your answer-engine surfaces until a reviewer ticks **I have reviewed these answers**, which sits under **Pillar Article (Cornerstone)**. On a site where **AI Answers Reviewed** is required before publishing, that checkbox sits in a **Required to publish** box; where the requirement is switched off, the checkbox is still there but the box is not labeled required. If an answer already looks cut off from an earlier review, edit it or tap **Draft answer** again — re-running the analysis keeps your existing wording and will not replace it. See [Publishing the questions your articles answer](./llms-txt.md#publishing-the-questions-your-articles-answer) for the full walkthrough of what that switch does and where the answers get published.

**AI answer feed toggle**

The **Include in llms.txt / AI Answer Feed** toggle controls whether this specific post is listed in your site's AI content feed — the file that AI systems read to discover what your site covers.

- The toggle is **on by default** for every published post, meaning all of your published content is included automatically.
- Turn the toggle **off** if you want to keep a particular post out of the AI feed (for example, a time-sensitive or confidential article).

This setting is saved when you click the panel's **Save** button, **Save draft**, or **Approve & Publish**.

**Pillar Article (Cornerstone)**

Tick **Pillar Article (Cornerstone)** to mark this as one of the articles your site's authority rests
on — the definitive guide on its topic, rather than a routine update.

Your AI files can only hold so much, and without this they simply keep whatever was published or
edited most recently. Marking an article as a pillar changes that in three ways:

- Its questions and answers are **kept ahead of** other articles' when the index has to choose which
  to publish.
- When several of your articles answer the same question, the pillar is the one an AI tool is
  pointed to.
- If your site uses LLMS Amplifier, the article is listed **first** in its index file, so it survives
  even when that list is trimmed.

If you have an SEO plugin connected, ticking this also marks the article there — **cornerstone
content** in Squirrly SEO and Yoast SEO, **pillar content** in Rank Math — so you only have to say
it once.

Use it sparingly. If everything is a pillar, nothing is — the point is to tell AI tools which handful
of pages to trust first.

This setting is saved when you click the panel's **Save** button, **Save draft**, or **Approve & Publish**.

### Categories and tags

The **Categories & Tags** panel shows the categories and tags that will be applied to the post when it is published. They appear as individual chips that you can manage directly in the portal.

- **Add a category or tag** — Type into the field and press Enter, or click a suggestion to add it.
- **Remove a category or tag** — Click the × on any chip to remove it.
- **Get fresh AI suggestions** — Click **Refresh** to ask the AI for a new set of suggested categories and tags based on the current article content. The suggestions are shown as chips you can accept, adjust, or discard — clicking Refresh does not apply anything automatically.

The final set of categories and tags is saved when you click the panel's **Save** button, **Save draft**, or **Approve & Publish**.

---

**Saving your changes**

Once you have finished reviewing all panels, choose one of the action buttons:

- **Save draft** — Saves all your edits (including SEO, GEO settings, and categories/tags) and keeps the post as a draft. The portal stays open so you or a colleague can continue reviewing later. **Saved** appears next to the logo at the top of the page (beside the powered-by line when the header is cramped).
- **Approve & Publish** — Saves all your edits and publishes the post to your site immediately. The portal first asks you to confirm. After you confirm, it shows a live progress list — checking the article is ready, copying images to this site if needed (with a count such as "3 of 12"), publishing, and sending the notification — until the work finishes. When it is done, you can close the dialog or open the live article. By default, the author and reviewers receive an email confirming the post went live (site owners can turn this off — see the rules table below).
- **Schedule** _(if enabled by the site owner)_ — Check the **Schedule** box to pick a date and time, then click **Approve & Schedule**. The same confirm-then-progress dialog tracks the scheduling. A future time publishes automatically at the moment you chose. A past time publishes immediately and keeps that date as the post's publish date. **Scheduling is not final** — see [Changing or cancelling a schedule](#changing-or-cancelling-a-schedule) below.
- **Request changes** — Opens a short note prompt where you can describe what needs updating. Your current edits are saved to the draft, the author and co-reviewers are notified by email, and your note is added to the portal's **Feedback** panel. See [Step 5](#step-5-request-changes) for the full walkthrough.
- **Notify** — Sends this article's notes, and an optional message, to one person who already has the article. Unlike **Request changes** it saves nothing, changes no schedule and emails nobody else. See [Sending the notes to somebody](#sending-the-notes-to-somebody).

#### Setting a time without publishing yet

You do not have to approve a post to record when it should go out. Tick **Schedule**, pick a date
and time, and click **Save draft** — the time is kept with the post, and it is still a draft. Open
it again tomorrow and the time you chose is waiting in the field. A date in the past is kept the
same way: **Save draft** does not snap it to now or drop it. If you later click **Approve & Publish**
without changing that time, the article goes live and keeps the past date. Unticking **Schedule**
before you publish still means live now, with today's date.

This matters when your site reserves publishing slots automatically. If the site's publishing
cadence has already earmarked a moment for the article, the date field opens filled in with that
reserved time. **A time you set by hand replaces it** — yours is what the post publishes at when it
is approved. Clearing the box hands the article back to its reserved slot.

Because the time is a saved value like any other, it counts as an unsaved change: it autosaves
while you work, and the portal warns you before you navigate away with it unsaved.

Recording a time is an edit, not an approval, so you can do it even if you are not allowed to
publish. The post stays a draft until somebody with publish permission approves it. This works from
the calendar too — drag your own draft onto a day and the calendar confirms it saved your preferred
time rather than scheduling it. Moving an article that is **already scheduled** is different, and
still needs publish permission: that changes when something already approved goes live.

On an article that is **already live**, the buttons are different: the main one reads **Save changes**, because there is nothing left to approve, and next to it sits **Revert to draft** for taking the article back off your site. See [Taking a live article back to draft](#taking-a-live-article-back-to-draft).

If you are allowed to publish, a **Published date** field sits with those buttons. Change it to a past or current time and click **Save changes** — the live article keeps that date and stays on your site. A future time is refused: a live article cannot be put back on the schedule. Reviewers who cannot publish do not see the field.

### Changing or cancelling a schedule

A scheduled post is still yours right up until it publishes. Nothing about scheduling is one-way.

When you open a scheduled post, the portal shows you exactly where it stands:

- The badge at the top reads **Scheduled** with the date and time it will go live.
- A banner under it repeats the date and reminds you the schedule can still be changed.
- The **Schedule** box is already ticked and the date field already filled in with the time you chose.
- The main button reads **Update schedule** rather than **Approve & Publish**.

From there you can:

- **Keep editing.** Save as often as you like — your changes are picked up automatically and the post still goes live at the scheduled time.
- **Move it.** Change the date and time, then click **Update schedule**. The same confirm-then-progress dialog tracks the update.
- **Publish it now instead.** Untick **Schedule** and click **Approve & Publish**. The portal will warn you first that this cancels the schedule and makes the post live immediately, then show progress while it publishes.
- **Cancel it.** Click **Unschedule**. The post goes back to being a draft and will not publish until you schedule or publish it again. The date you had chosen is kept in the date field, so scheduling it again is one click away.

You can also cancel a schedule from the calendar — select the post and choose **Unschedule** in the picker.

A few related behaviors worth knowing:

- **Requesting changes cancels the schedule.** If you send a scheduled post back to its author, it returns to a draft so it cannot publish itself while they are still working on it. If you do not have permission to cancel schedules and the post is about to publish, the portal will not accept the request at all — ask an approver rather than risk the post going out mid-rejection.
- **Cancelling needs publish permission.** Stopping a post from going out is treated the same way as sending it out, so it follows the site's **Who can publish** setting. Reviewers who cannot publish will not see the **Unschedule** button, in the portal or on the calendar.
- **If the site owner turns scheduling off** while a post is already scheduled, you can still **Unschedule** it — you just cannot move it to a different time. The post keeps its existing date until you cancel it or publish it.
- **A post publishes when its time arrives, even while you are editing.** If you are still working on a post in the last minute before it is due, saving will publish it — its scheduled moment has come. The portal tells you when this happens and updates the badge, so you are never left looking at a "Scheduled" label on a post that is already live.
- **Publishing is not one-way either.** If a post has already gone live — because its schedule ran out, or because someone published it by hand — you can still take it back to a draft. See [Taking a live article back to draft](#taking-a-live-article-back-to-draft).

Scheduled posts also stay in your review queue (**See all my reviews**), marked with a **Scheduled** label and their publication time — so you can always find one again even if your original email link has expired.

### Before you can publish

To stop half-finished articles going live, **Approve & Publish** first checks that the article is actually ready. If anything is outstanding, a short list appears instead of publishing, and each item has a button that completes it there and then:

| Requirement | What it means | Button |
| --- | --- | --- |
| GEO Analysis | The article has never been analyzed for AI-engine readiness. | **Analyze GEO** |
| GEO Analysis Is Current | The article was edited after it was last analyzed, so the score is out of date. Formatting-only edits — bolding a word, re-wrapping a paragraph — do not count. | **Re-analyze GEO** |
| Description | The description is empty. | **Generate with AI** |
| Categories & Tags | The article has no category, or no tag. "Uncategorized" does not count. | **Suggest categories & tags** |
| AI Answers Reviewed | Nobody has confirmed the AI-written questions and answers for this article. Until someone does, they are held back from your answer-engine surfaces. | **Review the answers** |

Some items finish as soon as you click the button. Others — accepting a generated meta description, or choosing which suggested categories and tags to keep — hand back to you, and the list closes so you can make the choice. Once everything is clear, click **Publish now** and the article goes live.

A requirement is skipped automatically whenever you could not act on it — if you do not have permission to edit that panel, or if the site's AI provider is not set up, it will never block you.

Site owners can switch any of the five requirements off individually — see [Review Portal settings](#review-portal-settings-for-site-owners). Switching **AI Answers Reviewed** off removes it from this checklist only; the answers are still held back until someone reviews them.

:::tip Open the live article or the full WordPress editor

The portal's top bar has two jumps, next to each other:

- **View Live** (once the post is published) or **View Preview** (while it is still a draft or scheduled) — Opens the post in a new tab, rendered by your theme, so you can check the layout. On a draft, **View Preview** saves your current edits first. Preview is shown only to reviewers whose WordPress account can edit the post (Editor role or above). **View Live** is available to anyone already in the portal.
- **Edit in WordPress** _(Editor role or above)_ — Opens the post in the full WordPress block editor in a new tab — handy when you need a capability the streamlined portal doesn't offer, such as reordering blocks or adding an advanced layout.

Your portal tab stays open so you can return to it to keep reviewing or to approve and publish.

:::

:::tip Signing out

Your name sits in the top-right corner of the portal. Hover over it — or tap it on a phone — and a
**Sign out** option appears. Use it when you are on a shared or borrowed computer: it ends your
WordPress session and returns you to the portal's sign-in card, so the next person cannot pick up
where you left off.

:::

:::tip Review links expire

The link in your review email is valid for the number of days your site owner has configured (the default is **7 days**). If you try to open a link after it has expired, you will see an error page. Contact the site owner and ask them to re-send the review link — your draft is still saved and nothing has been lost.

:::

:::note Someone else is editing

If another team member currently has the draft open for editing, you will see a yellow banner at the top of the portal warning you that they are actively editing. You can still make changes, but coordinate with them first to avoid overwriting each other's work. If you know the other person has finished (or has closed their tab), click **Take over editing** in the banner to claim the draft right away instead of waiting for their session to time out.

:::

---

## Step 4: Send to a Colleague (optional)

If you would like another team member to review or edit the draft before you approve it, use the **Send to a Colleague** option in the portal.

1. Click **Send to a Colleague**.
2. A panel opens showing the team members who are available as reviewers on your site.
3. Pick the colleague you want to involve, and optionally type a short note to explain what you need from them.
4. Click **Send**.

Your colleague receives an email with a link to the same draft portal. They will also need to sign in with their WordPress account. Once added, they have the same editing rights as you — they can save edits and approve the post.

**Send to a Colleague** is not available when you opened the draft from a copied appearance-package link that has not been sent yet. Ask the site owner to **Send bundle** if you need to invite someone else, or if you need to edit the article body.

---

## Step 5: Request changes

If the draft needs revisions before it can be approved, use **Request changes** to flag it and keep everyone in the loop — without publishing anything.

1. In the action bar at the bottom of the portal, click **Request changes**.
2. A prompt appears. Type a note describing what needs to change — for example, *"The introduction references last year's figures — please update them"* or *"The featured image needs replacing before this goes live"*.
3. Click **Send & save edits**.

When you submit the note, three things happen at once:

- **Your current edits are saved.** Any changes you made to the title, body, SEO fields, or any other panel are preserved on the draft — just as if you had clicked **Save draft**.
- **An email notification is sent** to the post author and all other reviewers with your note, so they know exactly what to work on.
- **Your note is added to the Feedback panel** on the left side of the portal. Anyone who opens the draft can read the full history of change requests, alongside any [notes left on individual images](#notes-on-an-image) — those are marked with the picture they are about.

The post stays as a draft throughout — nothing is published until someone clicks **Approve & Publish**.

:::note Feedback panel

The **Feedback** panel collects every change request submitted for this draft, oldest first, together with any [notes left on individual images](#notes-on-an-image), notes attached to a page element on the appearance preview, and any message sent with **Notify** — image notes carry the picture they are about, each reviewer's notes use a matching color, and a resolved one is dimmed rather than removed. Handling or deleting a preview note updates its pin on the appearance preview at the same time. Replies sit in a nested card under the note they answer. It is visible to everyone who has access to the portal, so it keeps an honest record of the review conversation.

**Every note in the panel has a Resolve chip**, change requests included. Anyone with access can resolve a note — the person who acts on it is usually the one who knows it is done — and a resolved note can be reopened. Resolving the last outstanding change request also clears the **Changes requested** flag on the review queue, so a draft never shows as handled and not handled at the same time.

**Every note also has a Reply chip.** Click it to type an answer in a box that opens under the note; your reply is added to the panel, indented beneath the note it answers, so the answer and the question stay together instead of the answer ending up in an email nobody can find later. The person who wrote the note is emailed that you have answered it — unless you are answering your own note, in which case nobody is emailed.

**Reply and Resolve** does both at once: it posts your answer and marks the note handled in a single step. If the note cannot be marked handled for any reason, your reply is still posted and the panel tells you the note is still open, rather than showing you a note as done when it is not.

Replies go one level deep — you can answer a note, but not answer an answer. A reply belongs to the note it is under, so it never counts as its own outstanding note in the warning shown when you publish: dealing with the note deals with the whole conversation.

If you posted a note by mistake, click the trash control on your own note. The card outlines in red and asks you to confirm before it is removed (you can only delete notes you wrote; site administrators can remove any note). Confirming delete on a note that has replies removes the note and every reply under it together, in one step. If someone replies to the note after you open the confirmation, nothing is deleted: the confirmation stays open, says someone replied meanwhile, and gives the new number of replies. Confirm again to delete the note with them, or cancel.

**A reply has its own trash control**, separate from the note it answers. Deleting a reply removes only that reply — the note and any other replies stay in place — and works on your own reply even when someone else wrote the note it answers. The confirmation appears under the reply you are deleting.

:::note Describing a picture for search

Open a picture, expand **Image Details**, and click **Generate SEO with AI** (a soft-filled button with a sparkle icon). It looks at the actual photo — not at the words around it — and suggests alt text and a caption, which appear in the boxes for you to edit. That includes a remixed version of the photo, even when the remix file is not attached to the article the usual way. When the page is showing a CDN copy, it still describes the file in your media library: the portal sends both the library id and the address on screen, and the server uses the library file. Nothing is saved until you press **Apply**, the same as everywhere else in the portal. If it cannot run, the portal names the reason instead of a generic failure. If the server does not finish looking at the picture, you see **The server did not finish looking at that picture. Try again.** rather than **That did not work.**

**This is not Modify with AI.** Generate SEO uses **Image SEO** — a vision-capable provider and model under Content Pipelines → Review Portal → AI Models, plus that provider's key on **System / API**. Modify with AI uses SyteHero and remakes the picture. The two are independent: remixing can work while Generate SEO still fails, and the other way around. If Image SEO is not set up, the button is not shown at all.

Alt text written from the surrounding article rather than from the picture is confidently wrong about what is in the frame, and a screen reader reads it out as fact. That is why Image SEO AI must point at a model that can actually see an image. See [AI Providers](./ai-providers.md).

**A pass over every photo.** Generating a meta description, analyzing answer readiness or refreshing categories and tags each end by offering to run SEO on the article's photos too. You get a list of every picture with a checkbox — ticked in advance only where there is no alt text at all, including where the alt box just holds the file's own name, which is not a description of anything. A picture you leave unticked is not touched. Each ticked picture is one AI call, and the count is shown before you start.

:::

:::

---

## Step 6: Use the content calendar

The portal includes a **Calendar** button that opens a month view of your recent, draft, scheduled, and published posts. Each post shows as a chip with a colored bar on the left, and a **color key** above the grid spells out what each color means: gray for draft, amber for pending review, teal for scheduled, and green for published — plus violet with a dashed edge for **Slot held**, an article holding a reserved publishing slot. That last row appears in the key only when slot reservation is switched on. Drafts with no date of any kind appear in an **Unscheduled drafts** list next to the grid.

You don't have to open an article to reach the calendar. The same **Calendar** button also sits on your [review queue](#your-review-queue) page, beside **Sign out**, and opens exactly the month view described below.

From the calendar you can:

- **Select a post** to open its details card — the full title, its featured image, when it publishes, who is reviewing it, how much feedback it has, and a checklist of what it still needs before it can go live. From the same card you can pick an exact date and time. A past date publishes immediately and keeps that date as the post's publish date; a time less than a minute away publishes now. This works on every device, including phones and tablets.
- **Move a live article** to a past or current day — it stays on your site with that new published date. A future day is refused, so a live article cannot be pulled back onto the schedule. This needs publish permission, same as taking the article back to a draft.
- **Drag a scheduled post to a new day** to move it to a different publish date. Dragging needs a mouse or trackpad — on a touchscreen, select the post instead.
- **Drag a post from Unscheduled drafts onto a day** to give it a publish date.
- **Drag an article that is holding a slot to a new day** to turn that hold into a real schedule. It keeps the time the slot reserved — only the day moves.
- **Unschedule a scheduled post** — select it and click **Unschedule** in the picker. It returns to the **Unscheduled drafts** list and will not publish until you give it a new date.

### Articles holding a publishing slot

If your site reserves a publishing slot for each arriving article, those articles are drawn on the grid on the day they are holding, in violet with a dashed left edge. The dashes are there on purpose: the date is provisional. Nothing publishes on its own — the moment is simply being kept for the article until someone approves it. These articles are not in the **Unscheduled drafts** list, because an article holding a date is not unscheduled.

- **Select one** and its card opens with the held date already filled in, labeled **Slot held**. There is no **Unschedule** button, because there is no schedule to cancel yet — approve the article to publish it then, or type a different date.
- **Drag one onto another day** to turn the hold into a real schedule on that day. It keeps the time the slot reserved, so only the day moves. This needs the same publish permission, and raises the same cadence warning, as scheduling any other draft.
- **A slot that has already gone by is not shown on the grid.** Once its moment has passed, nothing will publish the article at that time, so it goes back to the **Unscheduled drafts** list — approving it then publishes right away, or you can pick a new date.
- **A slot in another month** isn't visible on this month's grid, exactly like a post scheduled for next month. It stays out of **Unscheduled drafts** either way, so the same article never appears and disappears as you page between months.

This applies only when **Reserve publishing slots** is switched on. With it off, the calendar behaves exactly as it always has. See [Reserving slots for new articles](content-pipelines.md#reserving-slots-for-new-articles).

### Cadence warnings

If your site has a publishing rhythm, the calendar can tell you when a date breaks it. You describe the rhythm once — which days you publish on, your usual time, the most articles you want in a single day, and the smallest gap you want between two of them — and after that, choosing a date that clashes brings up a short warning before anything is scheduled.

The warning tells you what the problem is, names any articles already booked nearby, and offers the next date and time that fits. (Choosing a day you do not normally publish on is flagged on its own, with nothing to name.) You then choose:

- **Use suggested time** fills the date field with that slot. Nothing is scheduled until you confirm.
- **Schedule anyway** goes ahead with the date you picked.

**It never blocks you.** A cadence warning is advice, not a rule — every date you could schedule before, you can still schedule. If the check itself cannot run for any reason, the schedule simply goes through as normal. And if you close the card before the check has answered, your article is still scheduled — if the date turned out to clash, you get a short note saying so rather than a silent cancellation.

The same check runs when you drag an article onto a day, where it appears as a short confirmation instead of a panel.

Cadence warnings also apply to the article's own **Schedule** control, not just the calendar: clicking **Approve & Schedule** or **Update schedule** with a new or moved time raises the same warning if it clashes. Just recording a time without approving — see [Setting a time without publishing yet](#setting-a-time-without-publishing-yet) — does not, because nothing is actually being scheduled yet.

A reviewer can uncheck **Respect publishing cadence** on a draft to publish that article outside the site rhythm. The checkbox appears only when publishing cadence or reserved slots are on, and never on a live article.

Cadence warnings are **off** until someone turns them on. See [Publishing cadence](content-pipelines.md#publishing-cadence) for the settings.

### On a phone or tablet

The calendar adapts to the screen you are on:

- On a **smaller tablet screen** (and in portrait), the Unscheduled drafts list moves below the month grid so the grid keeps its full width. On a large tablet in landscape it stays beside the grid, just narrower. On any touchscreen, buttons and posts grow to comfortable tap sizes.
- On a **phone**, the month grid becomes a compact overview — each day with something scheduled is marked with a dot — and a **schedule list** appears below it, showing every post for that month with its time, title and status, plus your unscheduled drafts. That list is where you read and tap; the date picker opens from the bottom of the screen.

A few rules apply:

- You can only move posts you're allowed to edit.
- Scheduling a draft (giving it a publish date) requires publish permission, following the same **Who can publish** setting described below. So does unscheduling one, and so does turning a held slot into a real schedule.
- Published posts can't be moved or unscheduled.
- An article holding a publishing slot can be dragged like a scheduled one, but it isn't scheduled until you drop it on a day or approve it.
- **You can open any post's details, even one you can't move.** Reading isn't editing. For a post that isn't yours to change, the card shows what it is and when it publishes, and leaves out the working detail — who's reviewing it, its feedback, and its readiness checklist.

:::note Reviewers see the full calendar

As a reviewer, you see the full upcoming calendar so you have context on everything coming up — but you can only drag or reschedule the posts you have permission to edit. You can open any post to see what it is and when it publishes; everything beyond that is shown only for posts you're on.

:::

---

## Your review queue

Every reviewer-facing email — a new draft, an updated draft, a change request, or an invitation from a colleague — includes a footer link to **Articles Awaiting Your Review**: a single page listing every draft currently waiting on you, so you don't have to hunt through your inbox for the right email. Like every other portal page, it carries your site's logo, name, and colors in a topbar at the top.

- **Sign in required.** Like the portal itself, you must be signed in to your WordPress account to see the queue — SyteOps checks your account against the reviewers assigned to each draft, so you only ever see articles you're actually on.
- **Administrators see everything.** A WordPress administrator opening the queue sees every draft currently assigned to any reviewer, not just their own.
- **No link expiry.** Once you're signed in, opening a draft from your review queue always works, even past the normal review-link expiry window — your WordPress session is what proves who you are, not the link.
- **"Received" means received.** Each row shows the date the article arrived for review, and it keeps showing that date no matter what happens to the article afterwards — scheduling it, moving it, or cancelling the schedule. A scheduled article shows both: when it arrived, and when it will publish.
- **The calendar is here too.** A **Calendar** button sits at the top of the page, next to **Sign out**. It opens the same month view described in [Use the content calendar](#step-6-use-the-content-calendar) — the same grid, the same **Unscheduled drafts** list, color key, phone view, details card and drag-to-reschedule — so you can see what else is coming up without opening an article first. The button appears only for accounts that are allowed to use the calendar; if you don't see it, ask your site administrator. The same permission rules apply once it's open: you can only move articles you're allowed to edit, and scheduling or unscheduling one follows the site's **Who can publish** setting.
- **The newest items first.** The queue lists up to 100 articles, drawn from the most recently updated drafts on the site. If there are more than that, or if the site has a very large backlog of drafts awaiting review, the page tells you so with a note reading *"Older items may not be listed."* When you see that note, older articles may be waiting on you even though they aren't shown — open them from their original review email, or ask your site administrator.
- **A page-review bundle uses the same queue.** **See all my reviews** from a bundle opens this same page filtered to that bundle's remaining items, with the bundle name under **Your Reviews**. If the bundle is missing or you are not listed on it, the page stays empty — it does not fall back to every draft you can review. A bundle list is not limited to the site-wide newest 100 drafts, so older items in that bundle still appear.

Bookmark the queue page, or just click the footer link in your next review email, to check what's waiting on you at any time. Site owners can also reach it from **Content Pipelines → Log**, using the **Open my review queue** button.

Each row also shows how many questions the AI search analysis recorded for that article and how many of them have answers — for example *12 Q · 9 answered* — so you can tell at a glance whether an article's answers still need finishing.

### Live Articles You Can Edit

Beneath the drafts awaiting you, the queue lists any **published** articles you're assigned to, under **Live Articles You Can Edit**. If you have none, the section doesn't appear at all.

These behave differently from drafts, and the page says so:

- **Changes go live immediately.** There's no approval step — opening one of these in the portal and saving publishes the change straight away. If the article shouldn't be live at all, you can take it back to a draft instead — see [below](#taking-a-live-article-back-to-draft).
- **Answer coverage.** Each row shows the same question and answer counts as a draft.
- **"Answers not signed off".** If your site publishes AI-written answers to search engines and nobody has confirmed the answers on that article, the row says so. Those answers are held back from every answer-engine surface until someone reviews them in the article's GEO panel, so this is worth acting on if you want them live.
- **View live article.** A link to the published article as your readers see it. If your site is set up to exclude internal traffic, this link carries that exclusion, so checking your own work doesn't show up in your site's analytics.

### Taking a live article back to draft

Sometimes an article goes live before it should have — a claim needs checking, a client asks for it to come down, or it simply wasn't ready. You don't have to delete it or scramble to edit it in place.

Open the article in the portal and click **Revert to draft** in the action bar. The portal asks you to confirm, then takes the article off your site and turns it back into an ordinary draft you can keep working on. When it's ready again, publish it exactly the way you'd publish any other draft.

A few things worth knowing before you use it:

- **You need permission to publish.** Taking an article down is treated the same way as putting it up, so it follows the site's **Who can publish** setting. Reviewers who can't publish don't see the button at all.
- **The article keeps its date and its web address.** Reverting doesn't reset the publication date, so publishing it again puts the *same* article back at the *same* address — it isn't relaunched as a brand-new post. Anyone who linked to it or bookmarked it still lands in the right place.
- **Your site tidies up after itself.** The article drops out of your blog listings, and the AI files your site publishes — llms.txt and your answer-engine surfaces — are rebuilt without it automatically. There's nothing extra for you to clean up.
- **Save before you revert.** The page reloads once the article comes down, so anything you've typed but not saved is lost. Click **Save changes** first if you want to keep your edits.
- **A private article comes back private — but only if you publish it immediately.** If the article was published privately, so only signed-in staff could read it, publishing it again straight away puts it back exactly that way, and the confirmation email says plainly that it went out privately rather than describing it as live on the site. Scheduling it for a later date does not: WordPress itself handles scheduled publishing, and it publishes to everyone. **Choosing a schedule is the moment the private setting is given up.** Cancelling that schedule afterwards will not bring it back, and neither will publishing by hand from there — your site stops keeping the note as soon as the schedule is accepted. So if the article needs to stay private, publish it immediately rather than scheduling it, and if one has already gone out to everyone, set its visibility back to private in WordPress.
- **Social posts timed for a later date are cancelled; ones set to go out on publishing are kept.** If an announcement for this article was queued for a particular date and time, reverting cancels it, so nothing points your followers at a page that isn't there any more. The confirmation box tells you before you commit, and cancelling can't be undone from here — if you publish the article again, queue that announcement again too. An announcement set to go out *when the article publishes* is left alone instead: it hasn't been sent, it can't go out while the article is a draft, and it will simply go out when you publish the article again — so the wording somebody already wrote isn't thrown away.
- **Social posts already sent are not pulled back.** If publishing the article announced it to a social account, that announcement stays up — it was sent at the time and can't be recalled from here. Remove it on the social network itself if you need it gone.
- **Nobody is emailed.** Like cancelling a schedule, reverting is a quiet action — no notification goes out to the author or the other reviewers. Let them know yourself if they're expecting the article to be live.

---

## Who receives the review email

The notification list for each new draft is made up of two groups:

- **The post author** — always included automatically.
- **Default reviewers and Default CC reviewers** — team members you have added to the notification list in the Review Portal settings.

To configure the default list, go to **SyteOps → Content Pipelines**, open the **Review Portal** settings, and look for the **Default reviewers** and **Default CC reviewers** fields. Make sure each contributor is also linked to a WordPress author on the **Users** tab — this ensures their articles are published under the correct byline and they appear in the reviewer lists.

- **Default reviewers** are the primary recipients of the email and can edit the draft.
- **Default CC reviewers** are copied on the email and can also edit the draft.

A content source can set its own reviewer or CC list. When that list is empty, the Review Portal defaults above are used. When it is not empty, it replaces the defaults for that source only (it does not merge).

### When you change these lists

Adding someone to the reviewer or CC list applies to **articles still awaiting review**, not only to future ones. The next time SyteOps emails about an unpublished article — a resend, or a **changes requested** notification — anyone you have added since it arrived is included, and gains access to that draft. This is what makes adding a new team member work as you would expect: they start receiving the drafts that are still in flight, rather than only articles that arrive afterwards.

This happens when the email is sent, so there is one thing to know: a newly added reviewer will not see those in-flight drafts in **See all my reviews** until one of those emails has gone out for them. If you want someone brought up to date immediately, use **Resend review email** on the articles concerned.

Two limits are deliberate:

- **Published articles are never changed.** An article that has already gone live keeps the reviewer list it had. Adding someone to your defaults never hands them access to your published back catalog.
- **Removing someone does not revoke their access.** Taking a person off the default lists stops them being added to new articles, but it does not remove them from drafts they were already assigned to — SyteOps cannot tell that apart from someone a colleague deliberately invited to that specific article with **Send to a Colleague**. To remove someone from a particular draft, use the reviewer list in the portal for that article.

---

## Email notifications

Every automated portal email is controlled from one place: **SyteOps → Content Pipelines → Review Portal**, in the **What gets sent & published** group, under **Email notifications**. Each can be switched on or off independently:

- **New draft received** *(on by default)* — emails the author and reviewers when a new article arrives and its review draft is created. This is the main review email, with the article preview, who can review it, and the secure editor link. The article date in that email uses the site timezone in 12-hour AM/PM (for example, 7:33 PM), independent of WordPress's 24-hour time setting.
- **Draft updated by source** *(off by default)* — emails the author and reviewers when your content source re-delivers an article **with changed content**, so nobody reviews a stale version. Identical re-deliveries (delivery retries) never send an email.
- **Published or scheduled** *(on by default)* — confirms to the author and reviewers when a draft goes live or is scheduled. If the article was published with private visibility, the email says so and links to it as a private post, rather than describing it as live on the site.
- **Source held (needs attention)** *(on by default)* — alerts the **site admin** (not the reviewers) when a live content source stops matching its approved field mapping: incoming articles are put safely on hold, and this email tells you to re-approve the mapping, then use **Reprocess last payload** on the source to bring in the article that triggered the hold. It sends once per incident, not on every held delivery.
- **Auto-defer limit reached** *(on by default)* — emails the article's author and the reviewers already on it when the [auto-defer](content-pipelines.md#rescheduling-a-slot-nobody-reviewed-in-time) feature runs out of moves for a reserved time and hands the article back for scheduling by hand. This is not sent on every ordinary move forward — only when the article reaches the limit, and nothing is published when it does.
- **Publishing reminder** *(off by default)* — emails the article's author and the reviewers already on it when a publishing time is coming up, whether or not the article has been reviewed yet. How far ahead it looks is set by **Reminder lead time** (1–168 hours, default 24); the check runs hourly, so the email arrives up to that far ahead rather than exactly that far. Each row says which kind of article it is: **Publishing** means it is scheduled and will go out on its own, and **Planned** means it is still a draft that somebody has to approve before that time means anything. Each person hears about a given publishing time once — changing the time arms the reminder again.

  These two emails go only to people already on the article — its author, and the reviewers it was sent to. Standing CC addresses from **Default CCs** are not added on top, so on a site that relies on a standing CC list these two emails reach fewer people than the ones sent when a draft first arrives. That is deliberate: everyone on that list can open the article, and anybody else would get a link that asks them to sign in and then turns them away.
- **Reviewer notes** *(on by default)* — lets a reviewer send [this article's notes](#sending-the-notes-to-somebody), and a message of their own, to one person who already has the article. Nothing is sent automatically: the reviewer picks a name and presses **Send**, and one email covers every note that person has not been sent yet plus anything handled since they were last told. Turning this off removes the **Notify** control from the portal, so nobody presses a button that would go nowhere; reviewers can still write and resolve notes.
- **Include alternate work email** and **Include personal email** *(both off by default)* — widen every email above to also reach a reviewer's other stored addresses (set on the **Users** tab) in addition to their WordPress account email.

A **Reply-To address** field lets replies to the reviewer-facing emails (review requests, update notices, colleague invites, change requests, and published confirmations) go to a person (for example, your editor) instead of the site's sending address — leave it blank to keep the default. The administrator "payload held" alert always replies to the sending address. Two optional fields polish the emails' footer: a **Footer tagline** (a short line about your business) and a **Footer phone** (shown as a click-to-call link). Both appear in the dark footer bar of every portal email, alongside your company name. All emails carry your portal branding — logo, company name, and colors — from the Branding settings below.

You can also see each email's outcome in the run history: each draft-creation row on the Log notes whether the notification was sent, skipped (and why — for example, when no recipients could be resolved), or failed, and held rows note when the admin was alerted — so a missing email is never a mystery.

---

## Review Portal settings (for site owners)

:::tip Publishing cadence

This panel also holds the **Publishing cadence** card, which drives the [cadence warnings](#cadence-warnings) on the calendar. Its settings are described with that feature.

:::

Site owners can configure the Review Portal from **SyteOps → Content Pipelines**, then the **Review Portal** settings view.

The panel is split into four groups so everyday settings stay near the top:

- **Workflow** — who can publish, pre-publish checks, article images, and reviewer permissions. Starts open.
- **What gets sent & published** — review emails and what your AI files publish. Starts open.
- **Social Publishing** — voice profiles and destinations for posting to social. Starts open.
- **Setup** — branding and AI providers. Starts closed, because you usually set these once.

Each group shows an arrow on its colored bar. Click the bar (or press Enter or Space when it is focused) to open or close it. Jump links at the top of the panel take you to a group and open it without closing the others. **Open all** and **Close all** sit on the same row.

Closing a group only hides it on screen. Settings inside a closed group still save when you click **Save settings** at the bottom of the panel, including Social Publishing. That group also has its own **Save Social Publishing** button if you only changed those fields.

### Branding

This lives under **Setup**. Open that group (or use the jump link at the top) if you don't see it.

By default the portal uses the same logo, company name, and colors you have set in your general site branding. If you want the review emails and portal page to display different branding — for example, a client-facing brand rather than your internal agency name — enable **Override branding for the Review Portal** and fill in the alternative company name, logo URL, and color pickers. When you turn the override on, the color fields start from your current branding so you can adjust from there instead of from blank.

Use the **Preview Portal** button to open a read-only preview of the portal — with your current branding applied — right inside the admin, so you can see exactly how it looks before sending a review link. The preview is read-only: nothing in it can save, publish, or change a post. In the preview window's title bar you can click the **expand** icon to grow the preview to fill your whole screen (click again to shrink it back), or the **open-in-new-tab** icon to view the portal as a standalone full page.

### Article images

Under **Article images** you decide what happens to pictures an article is still borrowing from another site.

- **Import images on publish** — copy remote images into your media library. On by default; reviewers can override per article or revert.
- **Keep alt text and title**, **Keep captions** — copy those from the article. Both on by default.
- **Record where each image came from** — store import date and article. The original URL is always kept so revert works.
- **Read metadata from the image file** — read title and description from the file. Off by default — AI images rarely have useful metadata.

If an article has more pictures than one publish can safely fetch, the rest are copied in the background over the following minutes, and the reviewer is told that copying is continuing.

### Pre-publish requirements

Publish is blocked until these are met. All of the following are **on** by default:

- **GEO Analysis has run**
- **GEO Analysis Is Current** — required after the article changes. Formatting-only edits are ignored.
- **Description present**
- **Categories & Tags assigned**
- **AI Answers Reviewed** — required when answers are published

A requirement is skipped when the reviewer cannot act on it (no permission for that area, or the AI behind it is not configured).

Turning **AI Answers Reviewed** off here only removes it from the publish checklist — it does not change what appears on your answer-engine surfaces. An article's questions and answers are held back from every one of those surfaces until someone ticks **I have reviewed these answers** in the article's GEO panel, whether or not this requirement is switched on. See [Reviewing the answers before they go live](./llms-txt.md#reviewing-the-answers-before-they-go-live).

**Analyze GEO when a draft is first created** is **off** by default. When it is on (and a GEO provider is configured), analysis runs once when the article first arrives. Later deliveries of that article are not re-analyzed.

Turn a requirement off if your workflow publishes without it — for example, if you do not use tags. Whatever you leave on is enforced in the portal and on the server.

### AI Models

This is its own group, **AI Models**, with a jump link at the top. Setup is branding only.

Every AI choice the portal makes is here, in three groups.

**Text models.** Any capable text model works for these.

- **Content** — rewrites, meta descriptions and taxonomy suggestions inside the portal.
- **GEO** — the answer-engine analysis in the GEO panel.
- **Ingest** — proposes how an inbound content-source payload maps to your post fields.
- **Social** — composes the post text for **Post to Social**. Saved by the Social Publishing card further down, not by this one.

**Vision models.** These need a model that accepts image input, so any provider that cannot take one is shown unselectable — see [AI Providers](./ai-providers.md) for which those are.

- **Image SEO** — what **Generate SEO with AI** uses for alt text and captions. This is not SyteHero and not Modify with AI.

**Image generation.** These are billed per picture. Each appears only when its provider is available, so you may see one, both, or neither.

- **Modify images with AI** — the model, quality, detail preservation and strength used when a reviewer remakes a picture.
- **Listing image** — the provider, repair model and seed used to repair a watermark on the cropped listing copy. The switch that turns that repair on stays with the rest of the listing-image settings, under **Article images**.

These are the same provider and model settings used by those areas elsewhere in SyteOps. Changing them here updates the same underlying values.

### Review & approval rules

| Setting | What it controls |
|---|---|
| **Who can publish** | **Any selected reviewer**, or **Author or designated approver only**. Under the second option, co-reviewers cannot change the credited author (that would let them become the publisher). |
| **Default publish type** | Pre-selected type in the portal's publish picker. |
| **Soft lock** | Warns before concurrent edits. |
| **Offer passkey sign-in** | Adds a passkey option at sign-in. Password sign-in still works. Gray until Secure Passkeys is active; **on by default** once it is. See below. |
| **Scheduled publishing** | Allows a future publish date. When off, approvals publish immediately. |
| **Review link expiry** | How long the emailed review link stays valid (3, 7, 14, or 30 days; default **7**). Re-send an expired link from the draft — the post is unaffected. |
| **Default reviewers** | Emailed and given edit access on every new draft, plus the author. |
| **Default CC reviewers** | Copied on the email, with the same edit access. |

:::info What "Review link expiry" does and doesn't cover

Expiry protects the **link**, not the post. It stops an old email link from being opened by someone who is *not* signed in — a forwarded email, a link pasted into a chat, a shared inbox.

Anyone who **is** signed in to a WordPress account that's on the draft's reviewer list (and any administrator) can still open that draft after the window has passed, including from their review queue. Once a reviewer is signed in, their WordPress session is what proves who they are — the link is no longer doing that job.

So if you want to remove someone's access to a draft entirely, take them off the reviewer list or deactivate their WordPress account. Setting a shorter expiry won't do it on its own.

:::

### Offering passkey sign-in

Reviewers sign in to the portal with their WordPress account. If you have the
[Secure Passkeys](../integrations/secure-passkeys.md) plugin active, the portal's sign-in card shows a
second button — **Sign in with a passkey** — beneath the usual one.

A passkey cannot be phished, guessed, or reused across sites, so it is the safer way in. Offering it
here simply puts it in front of reviewers at the moment they are signing in.

**The setting** is **Offer passkey sign-in**, under **SyteOps → Content Pipelines → Review Portal →
Review & approval rules**. It is grayed out until Secure Passkeys is active, and **on by default**
once it is.

:::info Signing in with a password still works

This adds an option; it does not take one away. Reviewers who sign in with a password reach the portal
and work exactly as before, and so does anyone on a device with no passkey support — the passkey button
only appears where the browser can actually use one.

Because a password sign-in is still accepted, this is **not** a protection against a stolen or reused
reviewer password. It makes the stronger method available and records which one was used; it does not
block anybody. If you want passkeys *enforced* for signing in to WordPress, that is a Secure Passkeys
setting rather than this one.

:::

The audit trail on each article records whether the person was signed in with a passkey, so you can
tell at a glance how an edit or a publish was authenticated.

### Editing permissions

**Reviewer editing permissions** default to full edit. Change a cell to restrict an area. Admins are never restricted.

**How it works**

Permissions are set by reviewer type (role). The panel shows a row for each role your site uses, plus an **Everyone else (default)** row that applies to anyone who doesn't match a more specific role — if a reviewer's user type has its own row in the table, that row's settings are used; the default row only applies to everyone else. For each row you can choose a restriction for each portal area:

| Area | Restrictions available |
|---|---|
| **Featured Image** | Edit (full) or View only |
| **Author** | Edit (full) or View only |
| **Permalink** | Edit (full) or View only |
| **SEO** | Edit (full) or View only |
| **GEO** | Edit (full) or View only |
| **Reviewers** | Allow (can add/remove reviewers) or Hide (reviewer panel not shown) |
| **Modify with AI** | Allow or Hide (the whole Modify with AI block). This column only appears when SyteHero is installed and active. |
| **Categories & tags** | Edit and create new terms, Edit using existing terms only, or View only |

Choosing **View only** makes the area visible in the portal but all controls are disabled so the reviewer can read but not change it. Choosing **existing terms only** for categories and tags lets reviewers choose from your site's existing terms but prevents them from creating new ones — the add-term field shows a suggestion list of matching existing terms.

**Per-user overrides**

Below the role rows there is a collapsible **Per-user overrides** section. This lets you grant or restrict individual team members differently from their role — useful if one person on a team should have extra access or a tighter restriction than everyone else in their role.

**Admins are never restricted**

WordPress administrators always have full access to every area regardless of what the permissions matrix says. The restrictions only apply to non-admin reviewers.

**Saving changes**

Click **Save settings** at the bottom of the panel to apply your changes. The new permissions take effect the next time a reviewer opens or refreshes a portal link.

### Open the portal for any post

You don't have to wait for a draft from your content source to use the portal. There are three ways in:

- **From the posts list.** In the WordPress **Posts** list, hover over any post you can edit and click the **Review Content** link in its row of actions. For **Posts** and any content type your pipelines publish into, you also get **Review Appearance** for the themed site preview. In the **Pages** list the row action is **Review Appearance**. A draft that already has a publishing time shows that moment in the **Date** column as **Planned** (you chose it) or **Slot held** (cadence reserved it). **Quick Edit** adds a read-only **Publishes** line for the same moment — WordPress **Date** on a draft is still last modified, not that publishing time.
- **From the post itself.** While editing a **post** or a pipeline-target content type in the **classic editor**, the area above the editor offers **Open Review Content** (the editor) and **Open Review Appearance** (the themed preview). In the **block editor**, those same links sit in the **Status & visibility** panel, and the toolbar still offers them. While editing a **page**, only **Open Review Content** appears — it opens the themed preview.
- **From the review editor.** For a post (not a page), use **Review Appearance** in the top bar to open the themed preview.
- **From Review Appearance.** When you are in the themed preview for a post (not a page), use **Review Content** in the top bar to jump back to the full review editor.
- **From the live article.** While signed in and reading a published **post** on your own site, the toolbar offers both **Open Review Content** and **Open Review Appearance**. On a **page**, only **Open Review Content** appears.

:::tip Can't see the toolbar while editing?
The WordPress editor's **fullscreen mode** hides the toolbar. Use **Open Review Content** in the **Status & visibility** panel (block editor), the area above the editor (classic editor), or the posts-list row action.
:::

Any of them issues a fresh secure link for that post and opens the portal in a new tab — the same review window contributors see, with the same expiry window as an emailed link. This lets you put an existing post (or one written by hand) through the same review-and-approve flow.

The **Review Content** action appears on posts and on any other content type your content sources publish into. **Review Appearance** is offered for those same types and for **Pages**. Unrelated content types added by other plugins do not get either action.

---

## Related pages

- [Content Pipelines](./content-pipelines.md) — The feature that drives content ingest and post-publish processing.
- [Content Sources](./content-pipelines.md#content-sources) — How external content apps deliver articles into the Review Portal.
