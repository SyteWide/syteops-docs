---
sidebar_position: 3
title: Cloudflare Setup Guide
description: How to configure Cloudflare firewall rules, caching, and WAF settings to work with SyteOps.
---

# Cloudflare Setup Guide

**Tier: Basic** — Toggle-only integration on the SyteOps side. The bulk of this guide is about configuring Cloudflare itself so SyteOps webhooks and scheduled tasks work through it.

If your WordPress site uses Cloudflare, you need to configure a few rules so that SyteOps webhooks and scheduled tasks work correctly. Without these rules, Cloudflare's security features may block legitimate SyteOps requests.

## What Needs Configuration

SyteOps uses several URL paths for webhooks and background tasks. Cloudflare's firewall, WAF, and caching can interfere with these requests if not configured properly.

| Path | Purpose |
|---|---|
| `/wp-json/syteops-int-cp/v1/webhook` | ContentPen webhook delivery |
| `/wp-cron.php` | WordPress scheduled tasks (backups, sync) |
| `/wp-json` | REST API discovery |

---

## Step 1: Allow ContentPen Webhooks

If you use the ContentPen integration, its webhooks are server-to-server requests that Cloudflare's Bot Fight Mode often blocks.

### Create the Rule

1. In **Security > WAF > Custom Rules**, create a new rule
2. Configure:
   - **Rule name:** `Allow ContentPen Webhook`
   - **Expression:**
     ```
     (http.request.uri.path eq "/wp-json/syteops-int-cp/v1/webhook") and
     (http.request.method eq "POST")
     ```
   - **Action:** Allow
3. Save and deploy

SyteOps verifies the webhook signature after the request reaches your server, so the Cloudflare rule only needs to let the request through.

---

## Step 2: Configure WP-Cron Caching

WordPress uses `wp-cron.php` for scheduled tasks like automatic backups and FlowMattic sync. If Cloudflare caches this file, scheduled tasks stop running.

### Create a Cache Bypass Rule

1. Go to **Caching > Cache Rules**
2. Click **Create Rule**
3. Configure:
   - **Rule name:** `Bypass Cache for WP-Cron`
   - **When:** URI Path contains `wp-cron.php`
   - **Then:** Cache Level = Bypass
4. Save and deploy

### Why This Matters

When `wp-cron.php` is cached, only the first request runs PHP. Later requests get the cached response and WordPress never processes scheduled tasks. This affects:
- Automatic backups
- FlowMattic variable sync (when using cron mode)
- Any other scheduled SyteOps operations

---

## Step 3: WAF and Bot Fight Mode

Cloudflare's security features can interfere with legitimate server-to-server requests. Here are the common issues and fixes.

### Bot Fight Mode

Bot Fight Mode can block server-to-server requests (like webhooks) because they don't come from a browser.

**Fix:** If you see 403 errors on SyteOps webhook requests, either:
- Turn off Bot Fight Mode for the zone (Security > Bots)
- Ensure your Allow rules (Step 1) are placed **above** the Bot Fight Mode rules — Allow rules evaluated first will skip later bot checks

### Security Level

If your site is set to "I'm Under Attack" or "High" security level, Cloudflare may challenge or block SyteOps requests.

**Fix:** Add the Allow rule from Step 1. It is evaluated before the security level check, so matched requests pass through without a challenge.

### Managed Rules (WAF)

Cloudflare's managed WAF rules can occasionally flag SyteOps requests.

**Fix:** Check **Security > Events** for blocked requests to SyteOps paths. If you see blocks from managed rules, create a WAF exception for the specific path.

---

## Rule Priority

Cloudflare evaluates rules in order from top to bottom. Place your Allow rules **before** any blocking rules.

**Recommended order:**
1. Allow ContentPen Webhook
2. Bypass Cache for WP-Cron
3. Your other allow rules
4. Your blocking/security rules

---

## Using a Cloudflare Worker for WP-Cron

For more reliable scheduled task execution, you can use a Cloudflare Worker to trigger `wp-cron.php` on a schedule instead of relying on site visitors.

### Setup

1. In Cloudflare, go to **Workers & Pages**
2. Create a new Worker
3. Configure a **Cron Trigger** (e.g., every 5 minutes)
4. The Worker should call `https://yoursite.com/wp-cron.php`

### Important Details

- The trigger URL must be exactly `/wp-cron.php` — not the home page
- Do **not** add `?doing_wp_cron=...` to the URL — WordPress handles the cron lock internally
- Adding a cache-busting query string like `?cf_cron=1&ts=...` is fine and helps prevent cached responses
- In WordPress, set `DISABLE_WP_CRON` to `true` in `wp-config.php` so cron only runs when triggered by your Worker (not on random page loads)

### Optional: Secret Authentication

For extra security, you can set up a shared secret between the Worker and WordPress:

1. Add a secret `CF_WP_CRON_SECRET` to your Worker's environment variables
2. Have the Worker send it as an `X-CF-Cron-Secret` header
3. In WordPress, add a must-use plugin that validates the header

This ensures only your Worker can trigger cron, even if other security rules would normally allow the request.

---

## Testing Your Configuration

After setting up your rules:

### 1. Check Cloudflare Events

1. Go to **Security > Events**
2. Filter by URL containing `syteops` or `wp-cron`
3. Look for any blocked or challenged requests
4. Verify your allowed requests show "Allowed" status

### 2. Test WP-Cron

1. Visit `https://yoursite.com/wp-cron.php` directly in a browser — you should see a blank page (this is normal)
2. Check that your scheduled backups are running on time
3. If using a Cloudflare Worker, check the Worker's logs for successful responses

---

## Troubleshooting

### ContentPen Webhooks Failing

1. **Check Security > Events** — Look for blocks on `/wp-json/syteops-int-cp/v1/webhook`
2. **Check Security > Bots** — Bot Fight Mode is the most common cause
3. **Try the "fix without finding the cause" approach** — Add the Allow ContentPen Webhook rule at the **top** of your Custom Rules list

### Scheduled Tasks Not Running

1. **Check caching** — Visit `wp-cron.php` directly and verify it's not serving a cached response (response headers should not show `cf-cache-status: HIT`)
2. **Check Security > Events** — Look for blocked requests to `wp-cron.php`
3. **Verify the URL** — The trigger must hit `/wp-cron.php`, not the site home page
4. **Check DISABLE_WP_CRON** — When `true`, cron only runs when `wp-cron.php` is requested directly (recommended for external triggers)

### Still Having Issues

- Enable **Debug Mode** in SyteOps (Admin tab) for additional diagnostic information
- Visit [sytewide.com](https://sytewide.com) for support
