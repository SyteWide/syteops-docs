---
title: llms.txt (AI Search Discovery)
---

# llms.txt — AI Search Discovery

SyteOps can generate and serve an **`llms.txt`** file at your site root — a plain-text map of your most important pages that AI assistants (ChatGPT, Claude, Perplexity) look for when deciding what to cite.

## Enable it

Go to **Admin settings → AI Search Discovery (llms.txt)** and turn on **Generate llms.txt**. Once enabled, your `llms.txt` is served at `https://yoursite.com/llms.txt` and refreshes automatically when you publish content (and daily).

## What's in it

A Markdown list of your published Pages and Posts (most-recently-updated first), each with its title, URL, and a short excerpt — plus your site name and tagline.

## Notes

- If a real `llms.txt` file already exists at your site root (from another plugin or a static file), your web server serves that one instead.
- As of now, no major AI vendor has publicly committed to reading `llms.txt` — it's a low-cost, future-proofing step, not a guaranteed ranking change.
