export const BANNER = '<!-- GENERATED — do not edit by hand; run `npm run docs:generate` -->';

export function frontmatter({ title, description, sidebar_position }) {
  const lines = ['---', `title: ${jsonish(title)}`];
  if (description) lines.push(`description: ${jsonish(description)}`);
  if (sidebar_position != null) lines.push(`sidebar_position: ${sidebar_position}`);
  lines.push('---', '');
  return lines.join('\n');
}

function jsonish(s) {
  const v = String(s ?? '');
  return /[:#"']/.test(v) ? JSON.stringify(v) : v;
}

/** Render a {name:{type,required,description}} map as a markdown params table. */
export function paramsTable(params) {
  const rows = Object.entries(params || {});
  if (!rows.length) return '_No parameters._\n';
  const out = ['| Parameter | Type | Required | Description |', '|---|---|---|---|'];
  for (const [name, def] of rows) {
    const type = def?.type ?? '—';
    const req = def?.required ? 'yes' : 'no';
    const desc = escapeCell(def?.description ?? '');
    out.push(`| \`${name}\` | ${type} | ${req} | ${desc} |`);
  }
  return out.join('\n') + '\n';
}

/** JSON Schema {properties,required} → {name:{type,required,description}}. */
export function schemaToParams(schema) {
  const props = schema?.properties || {};
  const required = new Set(schema?.required || []);
  const out = {};
  for (const [name, def] of Object.entries(props)) {
    if (name === 'dry_run') continue; // injected on destructive tools; documented globally
    out[name] = { type: def?.type ?? 'any', required: required.has(name), description: def?.description ?? '' };
  }
  return out;
}

/** Escape a value for safe inclusion in a markdown table cell (also MDX-safe). */
export function escapeCell(s) {
  return String(s ?? '')
    .replace(/\|/g, '\\|')
    .replace(/\r?\n/g, ' ')
    .replace(/[<>{}]/g, (c) => '\\' + c);
}

/** Escape MDX-significant chars in free-text printed as a markdown paragraph. */
export function escapeText(s) {
  return String(s ?? '').replace(/</g, '&lt;').replace(/{/g, '&#123;');
}
