import { test } from 'node:test';
import assert from 'node:assert/strict';
import { renderResourcePage, renderIndex, groupByResource, resourceSlug } from '../render-api-reference.mjs';

const OPS = [
  { resource: 'users', action: 'create', summary: 'Create a user.', destructive: false, capability: 'manage_options', params: { first_name: { type: 'string', required: true } } },
  { resource: 'users', action: 'delete', summary: 'Soft-delete a user.', destructive: true, capability: 'manage_options', params: { user_num: { type: 'string', required: true } } },
];

test('resource page includes destructive badge + confirm in sample', () => {
  const md = renderResourcePage('users', OPS);
  assert.match(md, /## `create`/);
  assert.match(md, /## `delete`/);
  assert.match(md, /🔴 Destructive/);
  assert.match(md, /"confirm": true/);
  assert.match(md, /GENERATED — do not edit/);
});

test('index lists resources with counts', () => {
  const md = renderIndex(groupByResource(OPS));
  assert.match(md, /\| \[`users`\]\(\.\/users\) \| 2 \| yes \|/);
});

test('underscore resource keys slug to kebab-case URLs but keep the key in display', () => {
  assert.equal(resourceSlug('notes_items'), 'notes-items');
  assert.equal(resourceSlug('users'), 'users');
  const md = renderIndex(groupByResource([
    { resource: 'notes_items', action: 'create', destructive: false, capability: 'manage_options', params: {} },
  ]));
  // Display text keeps the literal resource key; the link target is kebab-cased for the filename/URL.
  assert.match(md, /\| \[`notes_items`\]\(\.\/notes-items\) \|/);
});
