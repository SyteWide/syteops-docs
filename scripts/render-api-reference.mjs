import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { BANNER, frontmatter, paramsTable, escapeText } from './lib/render-helpers.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, '..');

// WHY: resource keys may contain underscores (e.g. notes_items), but the docs naming convention
// (and Docusaurus URLs) require kebab-case filenames. Slug only the filename/URL — the resource
// key itself stays underscored in page titles, headings, and request bodies because that is the
// literal value callers pass to the dispatch endpoint.
export function resourceSlug(resource) {
  return String(resource).replace(/_/g, '-');
}

export function renderResourcePage(resource, ops) {
  const sorted = [...ops].sort((a, b) => a.action.localeCompare(b.action));
  const parts = [
    frontmatter({ title: resource, description: `Manage API operations for the ${resource} resource.` }),
    BANNER, '',
    `# \`${resource}\``, '',
    `${sorted.length} operation(s). All run through \`POST /syteops/v1/manage/dispatch\` (reads may use the documented GET form).`, '',
  ];
  for (const op of sorted) {
    parts.push(`## \`${op.action}\``, '');
    if (op.summary) parts.push(escapeText(op.summary), '');
    const badges = [];
    if (op.destructive) badges.push('**🔴 Destructive** — requires `confirm: true`.');
    if (op.capability) badges.push(`**Capability:** \`${op.capability}\``);
    if (Array.isArray(op.secret_keys) && op.secret_keys.length) {
      badges.push(`**Redacted fields:** ${op.secret_keys.map((k) => `\`${k}\``).join(', ')}`);
    }
    if (badges.length) parts.push(badges.join('  \n'), '');
    parts.push('**Parameters**', '', paramsTable(op.params), '');
    if (op.returns) parts.push('**Returns**', '', escapeText(op.returns), '');
    parts.push(
      '**Request**', '',
      '```json',
      JSON.stringify(
        { resource, action: op.action, params: sampleParams(op.params), ...(op.destructive ? { confirm: true } : {}) },
        null,
        2,
      ),
      '```', '',
    );
  }
  return parts.join('\n');
}

function sampleParams(params) {
  const out = {};
  for (const [k, def] of Object.entries(params || {})) {
    switch (def?.type) {
      case 'object': out[k] = {}; break;
      case 'integer': case 'number': out[k] = 0; break;
      case 'boolean': out[k] = true; break;
      case 'email': out[k] = 'name@example.com'; break;
      case 'url': out[k] = 'https://example.com'; break;
      default: out[k] = 'string';
    }
  }
  return out;
}

export function renderIndex(byResource) {
  const parts = [
    frontmatter({ title: 'Overview', sidebar_position: 0, description: 'All Manage API resources and operation counts.' }),
    BANNER, '', '# Manage API Reference', '',
    'Every operation runs through the single dispatch endpoint. See [Dispatch contract](../dispatch-contract) for the request/response envelope.', '',
    '| Resource | Operations | Has destructive |', '|---|---|---|',
  ];
  for (const resource of Object.keys(byResource).sort()) {
    const ops = byResource[resource];
    const destr = ops.some((o) => o.destructive) ? 'yes' : 'no';
    parts.push(`| [\`${resource}\`](./${resourceSlug(resource)}) | ${ops.length} | ${destr} |`);
  }
  return parts.join('\n') + '\n';
}

export function groupByResource(operations) {
  const by = {};
  for (const op of operations) (by[op.resource] ||= []).push(op);
  return by;
}

function main() {
  const manifest = JSON.parse(readFileSync(resolve(ROOT, 'data/syteops-manifest.json'), 'utf8'));
  const outDir = resolve(ROOT, 'docs/api/reference');
  mkdirSync(outDir, { recursive: true });
  const by = groupByResource(manifest.operations);
  writeFileSync(resolve(outDir, 'index.md'), renderIndex(by));
  for (const [resource, ops] of Object.entries(by)) {
    writeFileSync(resolve(outDir, `${resourceSlug(resource)}.md`), renderResourcePage(resource, ops));
  }
  process.stderr.write(`Rendered ${Object.keys(by).length} resource pages\n`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main();
