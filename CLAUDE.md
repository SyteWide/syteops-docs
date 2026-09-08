# Documentation Portal — rules for `docs-site/`

Loaded when you touch this tree. Root `CLAUDE.md` carries the rules that apply everywhere.

## What this is

`docs-site/` is the end-user-facing Docusaurus site and the **source of truth** for public
documentation, published to a separate public repo (https://github.com/SyteWide/syteops-docs) by
`sync-docs.yml` on each release.

**Audience: end users (WordPress administrators), NOT developers.** Keep language non-technical.

`docs-site/docs/` is canonical for all end-user content. The former internal mirror under the
developer docs tree was removed on 2026-04-18 to eliminate drift — **do not re-create it**. The
ghost-path detector in the Docs Validation gate fails the build on any reference to it, and it reads
text rather than intent, so do not name that path even to explain that it is gone.

## When to update

Before completing a PR that touches user-facing behavior, **ask the user**.

- **Likely yes:** new/changed feature, module, setting, default, error code, UI workflow, integration.
- **Likely no:** internal refactors with no behavior change, bug fixes restoring already-documented
  behavior, developer-only changes (tests, build, architecture), CSS tweaks that don't change workflow.

## Changelog

`docs-site/docs/changelog.md` is public-facing and updated **every release** with user-facing changes
only — no dev-only entries, no specific module names — in the same commit as the version bump. It is
one of the five version-sync files; `tests/architecture/VersionSyncTest.php` fails the build if it
drifts from `syteops.php`.

Write entries for someone who administers a WordPress site, not someone who reads the code. When a
release genuinely changes nothing a user can see, say so plainly rather than dressing up an internal
refactor.

## Generated files

`docs-site/data/syteops-manifest.json` is generated — regenerate via `npm run docs:generate` and commit
the result. The `Node Build / Docs CI` gate stage runs `git diff --exit-code` over
`docs/api/reference`, `docs/mcp/reference` and that manifest, so uncommitted regenerated output is a
gate failure. **Commit generated output before running the complete gate**, not after.

## Do not commit

`docs-site/node_modules/`, `docs-site/build/`, `docs-site/.docusaurus/`.

## Integration pages are mandatory

Every integration MUST ship with a dedicated end-user page at
`docs-site/docs/integrations/<hyphenated-slug>.md`, plus its overview section, its
`syteops_get_integration_docs_page_slugs()` entry, and its `sidebars.ts` entry. Enforced by
`tests/architecture/IntegrationDocsPageTest.php`. This is **not** an "ask first" case.

## Vendor URLs

Any third-party vendor URL on a docs-site page must match the `Preferred URL` in
`docs/developer/integrations/affiliate-links-registry.md` exactly. Enforced by
`tests/architecture/AffiliateLinksRegistryTest.php` for every strict-host domain.

## US spelling applies here too

`tests/architecture/UsEnglishSpellingTest.php` reads text, not intent — **do not quote a British
spelling as an example**, even to illustrate one. Reword instead.

## Full detail

`.cursor/rules/09-documentation-taxonomy.mdc` § End-User Documentation
