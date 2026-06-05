import { test } from 'node:test';
import assert from 'node:assert/strict';
import { renderProviderPage, renderIndex } from '../render-mcp-reference.mjs';

const PROVIDER = { id: 'fluent-smtp', label: 'FluentSMTP' };
const TOOLS = [
  { name: 'fsmtp_get_settings', provider: 'fluent-smtp', description: 'Get settings.', destructive: false, always: false, profiles: ['full', 'smtp'], inputSchema: { type: 'object', properties: {} } },
  { name: 'fsmtp_request', provider: 'fluent-smtp', description: 'Raw passthrough.', destructive: false, always: true, profiles: ['full', 'smtp'], inputSchema: { type: 'object', properties: { path: { type: 'string', description: 'Route.' } } } },
];

test('provider page renders tools, router note, profiles', () => {
  const md = renderProviderPage(PROVIDER, TOOLS);
  assert.match(md, /## `fsmtp_get_settings`/);
  assert.match(md, /Passthrough router/);
  assert.match(md, /all profiles/);
  assert.match(md, /GENERATED — do not edit/);
});

test('index lists provider with count', () => {
  const md = renderIndex([PROVIDER], { 'fluent-smtp': TOOLS });
  assert.match(md, /\| \[FluentSMTP\]\(\.\/fluent-smtp\) \| `fluent-smtp` \| 2 \|/);
});
