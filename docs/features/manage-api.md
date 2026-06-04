---
sidebar_position: 18
title: Manage API
description: Control SyteOps entities programmatically over a secure REST API with a rotatable API key.
---

# Manage API

The Manage API lets trusted external tools and automations read and update the things SyteOps manages on your site — over a single, secure REST endpoint. It is **off by default**: nothing can reach it until you generate an API key.

## What it can control

- **Team members** — your SyteOps people records (create, update, remove).
- **Roles** — system and custom roles, and who is assigned to them.
- **Modules** — turn SyteOps modules on or off and read their settings.
- **Integrations** — enable or disable integrations.
- **AI settings** — the provider, model, and limits for each AI-powered area.
- **CRM systems** — your connected CRM records.
- **Automation variables** — the values SyteOps shares with your workflow automations.
- **Notes & Estimates items** — the entries stored by the Notes and Estimates modules (available when those modules are active).
- **Status** — a read-only summary of your plugin version, active modules, and integration counts.

Your product license and management connection are **read-only** here and can never be changed through this API.

## Generating your API key

1. Go to **SyteOps → Admin → Other Options**.
2. Find the **Manage API Key** card.
3. Click **Generate / Rotate Key**.
4. Copy the key shown — **it is displayed only once.** Store it somewhere safe, such as a password manager.

To replace a key, click **Generate / Rotate Key** again — this immediately invalidates the previous one. To switch the API off entirely, click **Revoke Key**.

## Using the key

Give the key to the external tool or automation you want to connect, along with your site's web address. The tool presents the key with each request to prove it is authorized, and can then discover exactly which operations it is allowed to perform.

Logged-in SyteOps administrators working inside WordPress do not need a key — their existing permissions apply automatically.

## Security

- **Off until you opt in.** With no key generated, the API rejects every external request.
- **Key stored encrypted.** Your key is encrypted at rest and shown in full only once, at creation.
- **Rotatable and revocable.** Generating a new key or revoking cuts off the old one instantly.
- **Destructive actions are guarded.** Deleting anything requires an explicit confirmation, so nothing is removed by accident.
- **Secrets are never returned.** Stored credentials (such as AI or CRM keys) can be set through the API but are never sent back in a response.

:::tip
Treat your Manage API key like a password. Anyone holding it can manage the listed entities on your site. Rotate it immediately if you suspect it has been exposed.
:::
