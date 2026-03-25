---
sidebar_position: 13
title: "Workflow Templates"
description: "Package, distribute, and deploy FlowMattic workflow templates across sites."
---

# Workflow Templates

Workflow templates let you package FlowMattic workflows for repeatable deployment across multiple sites. Instead of manually recreating workflows on each site, you can export them once and import everywhere.

## Use Cases

- **Multi-site agencies** — Deploy the same automation workflows to every client site
- **Team collaboration** — Share proven workflow patterns with team members
- **Customer distribution** — Package workflows as part of a product or service offering
- **Backup and migration** — Move workflows between staging and production environments

## What Gets Included

A workflow template package contains:
- **Workflow definitions** — The complete FlowMattic workflow configuration, including all steps, triggers, and logic
- **Associated variables** — FlowMattic variables used by the workflows are exported alongside them

What is **not** included:
- **Credentials and API keys** — Sensitive values (API tokens, passwords, secrets) are automatically scrubbed during export. You need to configure these on each destination site after import.
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

## Exporting Workflow Templates

Exporting requires the **Package Builder** module.

1. Install and activate Package Builder (see [First-Party Module Guides](modules/module-guides#package-builder))
2. Select the FlowMattic workflows you want to package
3. Package Builder collects the workflows and their associated variables
4. Sensitive values are automatically detected and scrubbed
5. Everything is encrypted and signed into a `.sytepkg` file

The resulting file can be distributed to any SyteOps site with a valid license.

## Deploying to Managed Endpoints

If you manage multiple sites through SyteOps Server Connections, you can push workflow templates to endpoints directly:

1. From the Server tab, select an endpoint connection
2. Use the **FlowMattic: Manage Workflows** action
3. Select the workflow template package to deploy
4. The endpoint receives, decrypts, and imports the workflows

This combines the distribution convenience of Server Connections with the security of encrypted packages. See [Server Connections](server-connections) for more on managing endpoints.

## Troubleshooting

| Issue | Cause | Solution |
|---|---|---|
| "FlowMattic unavailable" | FlowMattic not installed or inactive | Install and activate FlowMattic before importing |
| Imported variables are empty | Sensitive values are scrubbed by design | Configure credentials and API keys on the destination site after import |
| Workflow conflict on import | A workflow with the same name already exists | Choose Overwrite to replace, Create New to keep both, or Skip to keep existing |
| "Package key not available" | License not validated | Recheck your Product License in the Admin tab |
| Variables not syncing after import | Master sync may need a nudge | Use the Resync All Variables button in the Debug Tool |
