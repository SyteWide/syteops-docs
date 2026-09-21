---
name: fastgate
description: Use when landing a branch in this repo (tests, local gate, push, PR), when a plan's execution rules need the per-branch gate discipline, or when a gate run is slow, about to be rerun, waiting on another agent's tests, or reports SKIP
---

# Fast Gate — one gate per branch

A branch is about ten minutes of mechanical work. It becomes 45 minutes only when the gate runs
more than once, whole suites run inside loops, agents queue on one test database, the hook
re-checks a tree the gate just proved, or the agent waits idle. Every stage still runs. Nothing
here skips a check, and a SKIP is never green.

This file is the same in every SyteWide repo. **The repo's own `CLAUDE.md` / `AGENTS.md` wins**
wherever it names a gate, a version-sync set, a landing route or a push rule.

## 0. Find the gate — the FIRST step of the session, before any test run

The first match below is this repo's gate. Write its command as line one of your plan.

1. Whatever `CLAUDE.md` / `AGENTS.md` names as the gate (search: `gate`, `pre-push`, `before merge`).
2. `scripts/ci/run-all-checks.sh` — the SyteOps runner.
3. `bin/preflight.sh` — the SyteHero runner (its pre-push hook execs it).
4. The pre-push hook (`git config core.hooksPath`, else `.git/hooks/pre-push`, often a symlink
   to `scripts/githooks/pre-push`). Read it and run the stages it runs. Do not invoke the hook
   itself with empty stdin: some hooks read git's ref list and skip their suite when it is empty.
5. `package.json` → `test`; with no `test`, then `build` plus `typecheck` / `tsc`.
6. `vendor/bin/phpunit` with the repo's `phpunit.xml` / `phpunit.xml.dist`.
7. None of these: the repo has no gate. Say so in the PR body; do not invent one.

Then prove the gate can actually run, or its suites SKIP and the gate is INCOMPLETE:

- Dependencies exist in THIS worktree: `node_modules/`, `vendor/`, `tests/vendor/`, and any
  nested package the gate builds (a fresh worktree has none — `npm ci` / `composer install`).
- A WordPress PHPUnit suite needs its test library. With a slot script
  (`scripts/ci/wp-test-env.sh <n>`) take your own slot; otherwise one shared library, and only
  PHPUnit waits on it (macOS has no `flock`: `until mkdir "$LOCK" 2>/dev/null; do sleep 5; done;
  trap 'rmdir "$LOCK"' EXIT`, with `LOCK` a directory in the scratchpad root). `ls` its
  `includes/functions.php` and `wp-tests-config.php` — macOS sweeps `/tmp`.

## 1. Iterate with scoped runs (seconds)

| Changed | Run |
|---|---|
| one PHP test | `vendor/bin/phpunit -c <config> <path>Test.php` — ONE path, or add `--filter test_name` |
| one JS test | `npx vitest run <file>` or `node --test <file>` |
| one shell test | `bash tests/<dir>/test-<name>.sh` |
| syntax | `php -l <file>`, `bash -n <file>`, `npx tsc --noEmit` |

PHPUnit 9 runs only the FIRST path it is given and prints green for the rest. One path per call.

Mutation proof of a new guard: scratch copy → ONE mutation → `shasum` differs → the single test
file with `--filter` → red → `cp` the copy back. Do every mutation of a file in one sitting. A
suite name never appears in a mutation loop. Never restore with `git checkout` or `reset --hard`.

## 2. Land — the one-gate sequence

0. The gate is identified and runnable (§0).
1. Docs for the change in the same branch, per the repo's doc rules.
2. Version bump, if the repo versions shipped changes: its `CLAUDE.md` names the version-sync set
   and the single test that checks it. Run that one test.
3. Build, and commit ALL generated output BEFORE the gate — drift stages diff against git.
4. Commit.
5. Write the PR body and the ≤25-line report FIRST. Then the full gate ONCE, in the FOREGROUND,
   with its own temp dir (tool timeout 10 min):
   `TMPDIR=/tmp/gate-tmp-<n> <gate> > "$SCRATCH/gate.log" 2>&1; tail -25 "$SCRATCH/gate.log"`.
   Never background it and wait for a notification: agents that did sat idle 20+ minutes after
   the gate finished. Read the summary for FAIL and SKIP counts, not just the last word.
6. Red? Fix, scoped-run the failing stage's single test, new commit (never amend), full gate once
   more. A third run needs the operator.
7. Push once. The hook runs its checks. Never `--no-verify`, unless the repo's `CLAUDE.md`
   documents a bypass for exactly this case — then name that rule in your report.
8. Open the PR with the body already written — or land on `main` directly where the repo's
   rules say that is how it lands.

## 3. Reviews on a budget — read on Opus, fix on Sonnet, never both

A review is two agents, never one, and never more than two agents run at once across the arc.
Seven parallel Opus reviewer-fixers burned a quarter of a 5-hour window in under an hour.

**Reviewer (Opus, report-only).** Reads the diff and every touched file in full, fixes NOTHING,
runs no gate, opens no PR. Writes `FINDINGS.md` in its scratch dir, one block per finding:
`file:line` · severity (`BLOCKING` = user-visible, security, data loss, race, guard-cannot-fail;
`important`; `minor`) · what is wrong · proposed fix · the test to add · status `UNFIXED`.
Reports the file path in ≤25 lines.

**Fixer (Sonnet).** Takes one `FINDINGS.md`, applies every item with TDD and mutation proofs,
marks each `FIXED <sha>`, docs in the same branch, version bump, then lands by §2 (one gate,
one push, one PR whose body carries the findings → fixes table). The main thread re-verifies
BLOCKING items in the worktree before the operator merges.

**Sequence.** Reviewers one at a time (or two); fixers one at a time. A reviewer that has
already started fixing when the budget bites: finish only the edit in hand, commit a consistent
WIP, write `FINDINGS.md` with FIXED/UNFIXED status, stop.

## 4. Stalls — what each one looks like, and the one move that clears it

| Symptom | Cause | Fix |
|---|---|---|
| An agent says "waiting for the gate" while nothing runs (its `gate.log` already ends in the summary) | it backgrounded the gate and never woke | `SendMessage` it the summary line and the next step. Never re-dispatch onto its worktree |
| `gh pr merge` answers "not mergeable" seconds after a push | GitHub still recomputing | wait ~20 s, `gh pr view --json mergeable,mergeStateStatus`, retry |
| DB suite red with counts that differ run to run | a second PHPUnit on the same test DB | one slot per agent (§0); rerun once alone |
| A stage says a tool or parser "is not available" in a worktree | that worktree's dependencies are missing or were emptied | install them in THAT worktree, rerun |
| A test's fixed-path temp file is missing while other gates run | gates share macOS `TMPDIR` | `TMPDIR=/tmp/gate-tmp-<n>` per gate |
| After a sibling PR merged, your PR conflicts | both branches bumped the same version files | rebase; version lines: yours wins; changelog entries: keep both, higher first; regenerate generated files AFTER the version files; re-gate (the tree changed) |
| A gate you cannot see finish | started with `nohup … &` and no waiter | prefer the foreground; if backgrounded, ONE waiter polling the log for the summary line |

## Rationalizations

| Excuse | Reality |
|---|---|
| "Run the whole test suite first to be safe" | The gate runs it minutes later. Scoped run, then the gate. |
| "Budget one retry gate" | One gate is the plan. A second is earned by a red line, never scheduled. |
| "Mutation proofs take minutes each" | Copy, mutate, sha, one test file, restore: under a minute. |
| "Another agent's tests are running, I'll wait" | With a slot nothing is shared. Without one, only the DB suite waits. |
| "The gate printed PASS" | Read the SKIP count. Missing dependencies = suites that never ran. |
| "The hook is a second safety net" | Same tree, same checks, nothing new. |
| "The earlier gate passed" | On another tree. Only the current tree's gate counts. |
| "The reviewer understands the code, let it fix too" | That is Opus doing Sonnet work at Opus prices. |
| "I'll background the gate and wait for the notification" | The wait is the stall. Foreground it, PR body written first. |

## Red flags — stop and fix the plan

- No gate command on line one of the plan.
- A second full gate written into the plan before the first has run.
- The whole test suite run right before the gate.
- A suite name inside a mutation loop, or two paths in one `phpunit` call.
- Waiting on a gate with the PR body unwritten.
- `SKIP` on a suite the change touches.
- `--no-verify` with no repo rule named for it.
