---
sidebar_position: 13
title: "Workflow Templates"
description: "Import and deploy FlowMattic workflow templates across sites."
---

# Workflow Templates

Workflow templates are pre-built FlowMattic workflow packages distributed by SyteWide as encrypted `.sytepkg` files. Instead of manually recreating workflows on each site, you can import a template package and deploy it everywhere.

## Use Cases

- **Multi-site deployment** — Import a SyteWide workflow template once and deploy it to every managed site
- **Staging to production** — Move workflow configurations between environments
- **Standardized automations** — Use proven, tested workflow patterns across your sites

## What Gets Included

A workflow template package contains:
- **Workflow definitions** — The complete FlowMattic workflow configuration, including all steps, triggers, and logic
- **Associated variables** — FlowMattic variables used by the workflows are exported alongside them

What is **not** included:
- **Credentials and API keys** — Sensitive values (API tokens, passwords, secrets) are scrubbed before distribution. You need to configure these on each destination site after import.
- **Site-specific URLs** — Webhook URLs or domain-specific endpoints need to be updated after import
- **External service connections** — OAuth tokens and third-party service links must be established on each site

## Importing a Workflow Template

1. Navigate to the workflow import interface
2. Upload the `.sytepkg` workflow template file
3. Preview the contents — you'll see which workflows are included and whether any conflict with existing workflows on your site
4. Choose a conflict resolution policy:
   - **Skip** — Keep your existing workflow, don't import the conflicting one
   - **Overwrite** — Replace your existing workflow with the imported version
   - **Create New** — Import as a new workflow alongside the existing one (a timestamp suffix is added to avoid name collisions)
5. Optionally import associated variables
6. Click Import

After import, FlowMattic variables are synchronized automatically. Variables that had sensitive values scrubbed will show placeholder values — configure them with your site-specific credentials.

**Requirements:** FlowMattic must be installed and active. A valid SyteWide Product License is required for decrypting the package.

## Deploying to Managed Endpoints

If you manage multiple sites through SyteOps Server Connections, you can push SyteWide-provided workflow template packages to your endpoints directly:

1. From the Server tab, select an endpoint connection
2. Use the **FlowMattic: Manage Workflows** action
3. Select the workflow template package to deploy
4. The endpoint receives, decrypts, and imports the workflows

This combines the management convenience of Server Connections with the security of encrypted packages. See [Server Connections](server-connections) for more on managing endpoints.

## Troubleshooting

| Issue | Cause | Solution |
|---|---|---|
| "FlowMattic unavailable" | FlowMattic not installed or inactive | Install and activate FlowMattic before importing |
| Imported variables are empty | Sensitive values are scrubbed by design | Configure credentials and API keys on the destination site after import |
| Workflow conflict on import | A workflow with the same name already exists | Choose Overwrite to replace, Create New to keep both, or Skip to keep existing |
| "Package key not available" | License not validated | Recheck your Product License in the Admin tab |
| Variables not syncing after import | Master sync may need a nudge | Use the Resync All Variables button in the Debug Tool |
