---
sidebar_position: 8
title: RingTonic Integration
description: Keep a lead's pipeline status in sync between SyteOps Leads and your RingTonic CRM — update it in one place and it follows in the other.
---

# RingTonic Integration

**Tier: Extended** — Stores a single credential (your RingTonic API key) and adds a small settings card to the Leads screen. Once it's on, changing a lead's status in SyteOps updates the matching contact in RingTonic, and status changes made in RingTonic are brought back on a regular basis.

[RingTonic](https://ringtonic.app) is an AI call-tracking and attribution tool with a lightweight built-in CRM, built on Twilio. When you connect it to SyteOps, the **pipeline status** of a lead stays in step across both tools: move a lead from **Contacted** to **Qualified** in your SyteOps Leads list and RingTonic hears about it right away — and changes you make inside RingTonic come back to SyteOps on a regular reconcile.

## Requirements

- SyteOps installed and activated, with **Lead Attribution** turned on (see [Lead Attribution](../features/lead-attribution)).
- A RingTonic account on the **Agency plan** — API access is an Agency-plan feature, so this integration will not connect on lower plans.
- Your RingTonic **Agency API key** (from your RingTonic account).

## Setup

Three quick steps: turn the integration on, paste your API key, then change a status to see it flow.

### 1. Turn it on

Go to the **Integrations** tab in SyteOps, toggle **RingTonic** ON, and save. Once it's on, the RingTonic tile shows a **Set API key in Leads** link that jumps straight to the key field described in the next step.

### 2. Add your Agency API key

Open **Leads → Settings** and find the **RingTonic** card (it only appears once the integration is turned on). Paste your RingTonic **Agency API key** into it and save. The key is stored securely (encrypted) and is never shown back to you in full.

:::note For advanced users
Instead of pasting the key into the settings card, you can define it in your site's `wp-config.php` as the constant `SYTEOPS_LEADS_RINGTONIC_API_KEY`. When that constant is present it takes precedence, which is handy for keeping the key out of the database on managed or version-controlled environments.
:::

### 3. See it work

In your **Leads** list, change any lead's pipeline status. SyteOps immediately updates the matching contact's stage in RingTonic. That's the whole loop — no mapping or field configuration to set up.

## What syncs, and in which direction

The two tools exchange one thing: a lead's **pipeline status**. Everything else stays where it lives.

### From SyteOps to RingTonic (right away)

When you change a lead's status in SyteOps — **New**, **Contacted**, **Qualified**, **Unqualified**, or **Customer** — the matching RingTonic contact's stage is updated in real time.

There's one nuance when you move a lead **backward** — for example from **Customer** back to **Contacted**. RingTonic only accepts a backward stage move if your API key is allowed to force stage changes. If it isn't, your change still saves in SyteOps as normal, but RingTonic keeps its later stage. Forward moves always go through.

### From RingTonic to SyteOps (on a regular reconcile)

RingTonic doesn't send a live notification when someone changes a stage there, so SyteOps can't update instantly in that direction. Instead, changes you make in RingTonic are **synced back on a regular reconcile** — a periodic check that reconciles the two sides — so your SyteOps Leads list catches up to RingTonic without you doing anything.

## Deleting a lead

RingTonic's API has **no delete** capability, so deleting a lead in SyteOps cannot remove the corresponding contact from RingTonic. Instead:

- SyteOps trashes the lead **locally**, as usual.
- SyteOps makes a **best-effort** move of the matching RingTonic contact to the **Lost** stage.
- RingTonic **keeps its own record** of the contact.

This is expected behavior — plan for RingTonic to retain contacts you delete in SyteOps, marked **Lost** where possible.

## How contacts are matched

To line up a SyteOps lead with the right RingTonic contact, SyteOps tries, in order:

1. An **external id** already linking the two.
2. The contact's **phone number**.
3. The contact's **email address**.

The first match wins. Keeping a phone number or email on your leads gives the match the best chance of landing on the right RingTonic contact.

## Troubleshooting

### Status changes aren't reaching RingTonic

1. Confirm the **RingTonic** integration is toggled ON in the Integrations tab.
2. Confirm your **Agency API key** is saved on the **Leads → Settings** RingTonic card (or defined via the `wp-config.php` constant).
3. Confirm your RingTonic account is on the **Agency plan** — API access isn't available on lower plans.
4. Make sure the lead actually matches a RingTonic contact by **external id, phone, or email** (see [How contacts are matched](#how-contacts-are-matched)).

### A "backward" status change didn't stick in RingTonic

Moving a lead to an earlier stage (for example **Customer → Contacted**) only propagates if your API key is permitted to force stage moves. If it isn't, SyteOps saves your change locally but RingTonic holds its later stage. Ask RingTonic to enable forced stage moves for your key if you need backward moves to sync.

### A change I made in RingTonic hasn't appeared in SyteOps yet

That's normal. RingTonic doesn't push stage changes live, so SyteOps picks them up on a **regular reconcile** rather than instantly — give it a little time and it will catch up.

### A lead I deleted is still in RingTonic

Also expected. RingTonic has no delete via its API, so SyteOps best-effort marks the contact **Lost** and RingTonic keeps its record. See [Deleting a lead](#deleting-a-lead).
