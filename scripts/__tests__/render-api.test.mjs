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

test('resource page states the real access rule, never the manifest capability', () => {
  const md = renderResourcePage('users', OPS);
  assert.doesNotMatch(md, /Capability:/);
  assert.doesNotMatch(md, /manage_options/);
  const [create, del] = md.split('## `delete`');
  assert.match(create, /\*\*Access:\*\* SyteOps Admin or API key\.\n/);
  assert.match(del, /\*\*Access:\*\* SyteOps Admin or API key, plus `confirm: true`\./);
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

test('an array param samples as a JSON list and an object param as a JSON object', () => {
  const md = renderResourcePage('calendar', [
    { resource: 'calendar', action: 'query', summary: 'Q.', destructive: false, capability: 'manage_options', params: { post_types: { type: 'array' }, mapping: { type: 'object' } } },
  ]);
  assert.match(md, /"post_types": \[\]/);
  assert.match(md, /"mapping": \{\}/);
});

test('an operation that carries its own example prints it, not the generic sample', () => {
  const md = renderResourcePage('ai_images', [
    { resource: 'ai_images', action: 'cleanup', summary: 'C.', destructive: true, capability: 'manage_options',
      params: { ids: { type: 'array' }, offset: { type: 'integer' } }, example: { ids: [123, 124] } },
    { resource: 'ai_images', action: 'scan', summary: 'S.', destructive: false, capability: 'manage_options',
      params: { limit: { type: 'integer' } } },
  ]);
  const [cleanup, scan] = md.split('## `scan`');
  assert.match(cleanup, /"ids": \[\s+123,\s+124\s+\]/);
  assert.doesNotMatch(cleanup, /"offset"/);
  assert.match(cleanup, /"confirm": true/);
  assert.match(scan, /"limit": 0/, 'an operation with no example keeps the generic sample');
});
