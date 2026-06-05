import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { BANNER, frontmatter, paramsTable, schemaToParams, escapeText } from './lib/render-helpers.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, '..');

export function renderProviderPage(provider, tools) {
  const sorted = [...tools].sort((a, b) => a.name.localeCompare(b.name));
  const parts = [
    frontmatter({ title: provider.label, description: `MCP tools provided by ${provider.label} (provider id ${provider.id}).` }),
    BANNER, '',
    `# ${escapeText(provider.label)}`, '',
    `Provider id: \`${provider.id}\` · ${sorted.length} tool(s).`, '',
  ];
  for (const t of sorted) {
    parts.push(`## \`${t.name}\``, '');
    if (t.description) parts.push(escapeText(t.description), '');
    const meta = [];
    if (t.destructive) meta.push('**🔴 Destructive** — supports a `dry_run` preview flag.');
    const router = /_(request|list_routes)$/.test(t.name);
    if (router) meta.push('**Passthrough router** — available in every toolset profile.');
    meta.push(`**Profiles:** ${t.always ? 'all profiles' : t.profiles.map((p) => `\`${p}\``).join(', ')}`);
    parts.push(meta.join('  \n'), '');
    parts.push('**Parameters**', '', paramsTable(schemaToParams(t.inputSchema)), '');
  }
  return parts.join('\n');
}

export function renderIndex(providers, toolsByProvider) {
  const parts = [
    frontmatter({ title: 'Overview', sidebar_position: 0, description: 'All MCP providers and tool counts.' }),
    BANNER, '', '# Tool Reference', '',
    'Tools are grouped by provider. Each provider registers only when its plugin is detected on the site; this reference lists the complete catalog.', '',
    '| Provider | id | Tools |', '|---|---|---|',
  ];
  for (const p of providers) {
    const n = (toolsByProvider[p.id] || []).length;
    parts.push(`| [${escapeText(p.label)}](./${p.id}) | \`${p.id}\` | ${n} |`);
  }
  return parts.join('\n') + '\n';
}

function main() {
  const manifest = JSON.parse(readFileSync(resolve(ROOT, 'data/mcp-tool-manifest.json'), 'utf8'));
  const outDir = resolve(ROOT, 'docs/mcp/reference');
  mkdirSync(outDir, { recursive: true });
  const byProvider = {};
  for (const t of manifest.tools) (byProvider[t.provider] ||= []).push(t);
  writeFileSync(resolve(outDir, 'index.md'), renderIndex(manifest.providers, byProvider));
  for (const p of manifest.providers) {
    writeFileSync(resolve(outDir, `${p.id}.md`), renderProviderPage(p, byProvider[p.id] || []));
  }
  process.stderr.write(`Rendered ${manifest.providers.length} provider pages\n`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main();
