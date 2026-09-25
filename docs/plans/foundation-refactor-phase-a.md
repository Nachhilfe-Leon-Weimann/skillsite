# Foundation Refactor - Phase A (Foundation) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or
> superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for
> tracking. **Each task is one slice = one branch = one PR.** Branch from an up-to-date `main`.

**Goal:** Give the repo the foundation the rest of the refactor stands on: an agent anchor, no dead consent code,
Prettier, Vitest, clean CI, a functional smoke test and a design ratchet - without changing anything a visitor sees.

**Architecture:** Seven independent slices (A1-A7 of the spec; A0 is the spec PR itself). Tooling lives at the
repo root and in `packages/config`; every check is reachable through `just check`, which CI's single `check` job
runs. No application behaviour changes in this phase.

**Tech Stack:** pnpm 12.4.2 workspace + Turborepo 2.11.2, Node 26, Next.js 16.3.5, React 19.3.0, TypeScript 7.0.2,
Tailwind CSS 4.3.3; new: Prettier 3.9.9, Vitest 5.0.2 (+ Vite 8, jsdom 30.1.1, Testing Library), Playwright 1.63.0.

**Spec:** [`docs/specs/foundation-refactor.md`](../specs/foundation-refactor.md) - phase A. Read _Rules of the
refactor_ and _Rules for implementing agents_ before starting any task.

## Global Constraints

- English in code, comments, identifiers, specs and commits; German only in visible content.
- Never change what a visitor sees in this phase: rendered text, classes, `<head>` and behaviour stay identical.
- Conventional commits; the PR title is the commit message on `main` (squash). Phase A uses `docs:`, `chore:`,
  `build:`, `ci:`, `test:`, `refactor:` - never `feat:`/`fix:` (they would cut a release).
- **No `Co-Authored-By` trailer.** Do not name the maintainer in any file, commit, PR or issue.
- Push the branch and open the PR; **never merge**, never change repo settings, rulesets, the App or Dokploy.
- `just check` green before every push. Every PR body has a _How to check_ section.
- Tick the matching acceptance boxes in `docs/specs/foundation-refactor.md` in the PR that fulfils them.
- Bulk edits over German files only with UTF-8-safe tools (`perl -CSD -pi -e ...`).
- Tool versions: `prettier@^3.9.9` (no Tailwind plugin), `vitest@^5.0.2`, `vite@^8.3.0`, `jsdom@^30.1.1`,
  `@testing-library/react@^16.3.3`, `@testing-library/dom@^10.4.2`, `@playwright/test@^1.63.0`.

## Review Focus

1. **A test runner that silently runs nothing.** A wrong `include` glob makes Vitest "pass" with fewer tests.
   Task 4 pins the exact count: **44 tests** from the nine migrated files must run.
2. **Console mocks leaking between tests.** `t.mock.method` restored itself; `vi.spyOn` does not unless configured.
   Task 4 sets `restoreMocks: true` and adds a test that proves `console.info` is real again after a mocked test.
3. **Prettier rewriting release-managed files.** `CHANGELOG.md` and `.release-please-manifest.json` are written by
   release-please; formatting them makes every release PR dirty. Task 2 ignores them and keeps
   `tests/release-config.test.mts` green (the `x-release-please-version` annotation in `compose.yml` must survive).
4. **A smoke test that depends on the calendar or the network.** Availability is stubbed per requested month,
   every non-local request is answered locally, so the suite is green on the last day of a month and offline
   (Task 6).
5. **A ratchet that can be gamed or that blocks cleanups.** Counting must ignore stories and tests, a rise must
   fail, and a lowered count must be written back so it cannot rise again later (Task 7 tests both directions).

## Execution order

```
Wave 1 (sequential):  Task 1 (A1) -> merge -> Task 2 (A3, formats everything) -> merge
Wave 2 (parallel):    Task 3 (A2)  |  Task 4 (A4)
Wave 3 (parallel, after Task 4 is merged):  Task 5 (A5)  |  Task 6 (A6)  |  Task 7 (A7)
```

Wave-3 slices all touch `justfile`, the root `package.json`, `CLAUDE.md` and possibly `pnpm-lock.yaml`. After each
merge, rebase the remaining branches on `main`, re-apply the slice's own lines in those files, run `pnpm install`
and `just check`, and force-push the branch (`git push --force-with-lease`).

## File map

| File                                                                                                                                    | Task                       | Responsibility                                     |
| --------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | -------------------------------------------------- |
| `CLAUDE.md`                                                                                                                             | 1 (created), 4-7 (updated) | agent anchor: commands, layout, conventions, traps |
| `apps/marketing/next.config.ts`                                                                                                         | 1                          | `agentRules: false`                                |
| `README.md`                                                                                                                             | 1                          | fix `src/lib/...` paths                            |
| `packages/config/prettier/index.mjs`, `prettier.config.mjs`, `.prettierignore`                                                          | 2                          | formatting rules                                   |
| consent files, `app/layout.tsx`, `components/layout/footer.tsx`                                                                         | 3                          | remove the subsystem                               |
| `vitest.config.mts` (root, marketing, ui), nine `*.test.mts`, `packages/ui/src/*.test.ts(x)`                                            | 4                          | test runner                                        |
| `.github/workflows/ci.yml`, `Dockerfile`, `.github/dependabot.yml`, `turbo.json`, `tests/dockerfile.test.mts`, `.git-blame-ignore-revs` | 5                          | CI and build hygiene                               |
| `apps/marketing/playwright.config.ts`, `apps/marketing/e2e/smoke.spec.ts`                                                               | 6                          | smoke test                                         |
| `scripts/design-ratchet.mjs`, `scripts/design-ratchet.test.mjs`, `design-ratchet.json`                                                  | 7                          | design ratchet                                     |

---

### Task 1: Agent anchor (spec A1)

Branch `docs/agent-anchor`. PR title `docs: add the agent anchor and switch off generated agent files`.

**Files:**

- Create: `CLAUDE.md`
- Modify: `apps/marketing/next.config.ts` (the `nextConfig` object)
- Modify: `README.md` (section _Operating the payment link_)

**Interfaces:**

- Produces: `CLAUDE.md` with the sections `## Commands`, `## Layout`, `## Conventions`, `## Git and PRs`,
  `## Traps` - later tasks append to them.

- [ ] **Step 1: Create `CLAUDE.md`** with exactly this content:

````markdown
# CLAUDE.md

Anchor for AI assistants and quick onboarding: commands, layout, conventions, traps. The _why_ and the current
plan live in [`docs/specs/`](docs/specs/) - start with
[`foundation-refactor.md`](docs/specs/foundation-refactor.md).

## Commands

- `just dev` - run the site (`http://localhost:3000`).
- `just check` - lint, tests and build; CI's `check` job runs the same. **Keep green before every push.**
- `just test` - the tests only.
- `just build` - production build; it is also the type check of `apps/marketing`.
- `just docker-build` / `just docker-run` - build and run the production image locally.
- `pnpm storybook` - the design-system workbench of `packages/ui` (`http://localhost:6006`).

## Layout

```
apps/marketing/        the Next.js site (nachhilfe.leonweimann.de)
  src/app/             routes
  src/components/      booking/, layout/, sections/, ...
  src/content/         all visible text (German)
  src/lib/             booking/, payment/, routes, metadata, health
packages/ui/           @skillsite/ui - tokens (styles/theme.css), primitives, hooks, Storybook
packages/config/       shared tsconfig and ESLint presets
tests/                 repo-level tests (release config, workflows)
docs/specs/            specs: plans and decision records (versioned)
docs/plans/            task-level implementation plans for spec phases
```

The target structure (modules, a grouped `@skillsite/ui`) is described in the foundation refactor spec; code moves
there slice by slice.

## Conventions

- English in code, comments, identifiers, specs and commits; German only in visible content.
- Visible text lives in `apps/marketing/src/content/*.ts`, not in components.
- Build pages from `@skillsite/ui` components and the type scale (`text-display` ... `text-caption`). No arbitrary
  values (`text-[...]`, inline `color-mix(...)`, hand-tuned `clamp()`), no hand-built copies of existing components.
- Motion speaks the brand tokens: `ease-flow`, `ease-soft`, `duration-quick|base|slow`, the `lift` utility, `Reveal`.
- A refactor changes nothing a visitor sees. A bug is fixed in its own `fix:` PR that describes the visible
  change. When it is unclear whether something is a bug or a design choice, stop and ask.
- Next.js 16 differs from older versions: read the guide in `node_modules/next/dist/docs/` before relying on an
  API you are unsure about.
- Unit-tested modules under `src/lib` are import-free (`node --test` cannot resolve `@/`) until the Vitest slice
  of the foundation refactor lands.

## Git and PRs

- Conventional commits; the PR title is the commit message on `main` (squash merge). `feat` and `fix` cut releases;
  use `refactor`, `chore`, `ci`, `build`, `docs`, `test` for everything else.
- One PR per slice of a spec; tick the slice's acceptance boxes in the same PR.
- Push the branch and open the PR - never merge, never change repo settings, rulesets or deployment configuration;
  list settings that need changing in the PR body.
- Every PR body has a _How to check_ section: the routes and states to open, light and dark, phone and desktop
  width, and for fixes the exact visible change to expect.
- Never bump a version or create a tag by hand; release-please does it (see [README](README.md#releasing)).

## Traps

- Bulk edits over German files only with UTF-8-safe tools (`perl -CSD -pi -e ...`); plain `sed`/`perl` destroy
  umlauts and ß.
- `next dev` serving stale CSS: delete `apps/marketing/.next` and restart.
- Tailwind v4 `translate-*` / `scale-*` set the `translate` / `scale` properties, not `transform`;
  `transition-transform` does not cover them. Verify every motion change in a browser.
- `next-themes` runs with `disableTransitionOnChange`: theme switches do not animate, on purpose.
- `next/font/google` downloads the fonts at build time: `just build` needs network access to Google Fonts.
- The iOS 26 Safari toolbar tint follows the `footer` element
  (`apps/marketing/src/components/layout/ios-toolbar-tint.tsx`); keep exactly one `<footer>` in the layout.
- `agentRules: false` in `apps/marketing/next.config.ts` stops `next dev` from writing its own `AGENTS.md` /
  `CLAUDE.md`; this file is the only anchor.
````

- [ ] **Step 2: Switch off Next's agent files.** In `apps/marketing/next.config.ts`, add as the first property of
      `nextConfig`:

```ts
  // This repo keeps one agent anchor (the root CLAUDE.md); `next dev` must not write its own.
  agentRules: false,
```

- [ ] **Step 3: Fix the README paths.** In `README.md`, replace `` `src/lib/payment/invoice-link.ts` `` with
      `` `apps/marketing/src/lib/payment/invoice-link.ts` `` and `` `src/lib/routes.ts` `` with
      `` `apps/marketing/src/lib/routes.ts` ``.

- [ ] **Step 4: Verify.**

Run: `rg -n "src/lib/" README.md CLAUDE.md` - every hit starts with `apps/marketing/`.
Run: `just check` - Expected: green.
Run: `pnpm --filter @skillsite/marketing dev` for ~15 s, stop it, then `ls apps/marketing/AGENTS.md apps/marketing/CLAUDE.md`
Expected: `No such file or directory` for both.

- [ ] **Step 5: Tick spec A1** (both boxes) in `docs/specs/foundation-refactor.md`.

- [ ] **Step 6: Commit, push, open the PR.**

```bash
git add CLAUDE.md README.md apps/marketing/next.config.ts docs/specs/foundation-refactor.md
git commit -m "docs: add the agent anchor and switch off generated agent files"
git push -u origin docs/agent-anchor
gh pr create --title "docs: add the agent anchor and switch off generated agent files" --body "$(cat <<'EOF'
Adds the root `CLAUDE.md` (commands, layout, conventions, traps) and sets `agentRules: false`, so `next dev`
no longer writes its own agent files. Fixes two README paths. Spec: foundation refactor, slice A1.

## How to check

Nothing visible changes. `next dev` no longer creates `apps/marketing/AGENTS.md`.
EOF
)"
```

PR _How to check:_ nothing visible changes; `next dev` no longer creates `apps/marketing/AGENTS.md`.

---

### Task 2: Prettier (spec A3)

Branch `chore/prettier`. PR title `chore: format the repo with Prettier`. **Start only after Task 1 is merged.**

**Files:**

- Create: `packages/config/prettier/index.mjs`
- Create: `prettier.config.mjs`
- Create: `.prettierignore`
- Modify: root `package.json` (devDependencies, scripts), `justfile`
- Modify: every file Prettier rewrites (about 20: see step 5)

**Interfaces:**

- Produces: root scripts `format` and `format:check`; `just format`, `just format-check`; `static-checks` runs
  `format-check`.

- [ ] **Step 1: Shared config.** Create `packages/config/prettier/index.mjs`:

```js
/**
 * Shared Prettier preset. The values are Prettier's defaults, written out so the house style is explicit.
 * No Tailwind class sorting: reordering classes can change which conflicting class `cn` keeps.
 * @type {import("prettier").Config}
 */
export default {
  printWidth: 80,
  semi: true,
  singleQuote: false,
  trailingComma: "all",
};
```

`packages/config/package.json` stays unchanged: like the ESLint and tsconfig presets, the Prettier preset is
imported by its file path. Create `prettier.config.mjs` at the root:

```js
export { default } from "@skillsite/config/prettier/index.mjs";
```

Add `"@skillsite/config": "workspace:*"` and `"prettier": "^3.9.9"` to the root `devDependencies`.

- [ ] **Step 2: Ignore what Prettier must not touch.** Create `.prettierignore`:

```
# Written by release-please - formatting them would dirty every release PR.
CHANGELOG.md
.release-please-manifest.json
pnpm-lock.yaml
# Private notes, not versioned.
docs/ref/
docs/security-audit-*/
docs/wording/
# Build output.
**/.next/
**/.turbo/
**/storybook-static/
**/next-env.d.ts
```

- [ ] **Step 3: Scripts.** Root `package.json` `scripts`:

```json
    "format": "prettier --write .",
    "format:check": "prettier --check .",
```

`justfile`, section _Quality_:

```just
format:
    pnpm format

format-check:
    pnpm format:check

# Types are checked by `next build`, so `build` is the typecheck; there is no separate recipe.
static-checks: format-check lint
```

- [ ] **Step 4: Record the HTML before formatting.**

```bash
pnpm install
pnpm build
node -e '
const fs=require("fs"),p=require("path"),d="apps/marketing/.next/server/app";
const out={};for(const f of fs.readdirSync(d,{recursive:true}))if(String(f).endsWith(".html")){
const h=fs.readFileSync(p.join(d,f),"utf8");
out[f]=[...h.matchAll(/class="([^"]*)"|>([^<]+)</g)].map(m=>m[1]??m[2]).filter(s=>!/_next\/static|__next_f|self\.__next/.test(s));}
fs.writeFileSync(process.argv[1],JSON.stringify(out));' /tmp/html-before.json
```

- [ ] **Step 5: Format.**

Run: `pnpm format`
Expected: about 20 files change - 15 under `apps/marketing/src` (e.g. `app/page.tsx`, `lib/booking/config.ts`),
`packages/ui/src/typography.tsx`, `README.md`, `tests/triage-workflow.test.mts`,
`docs/specs/foundation-refactor.md`, `docs/plans/foundation-refactor-phase-a.md`. No `.github/*.yml`, no
`compose.yml`, no `CHANGELOG.md`.

- [ ] **Step 6: Prove formatting only.**

Run: `pnpm build`, then the node snippet of step 4 with `/tmp/html-after.json`, then
`cmp /tmp/html-before.json /tmp/html-after.json`
Expected: no output (identical text and class attributes).
Run: `pnpm test` - Expected: all tests pass (incl. `tests/release-config.test.mts`).
Run: `echo "const a = 1" > /tmp/x.ts && cp /tmp/x.ts apps/marketing/src/zz.ts && just format-check; rm apps/marketing/src/zz.ts`
Expected: `format-check` fails on `apps/marketing/src/zz.ts`.

- [ ] **Step 7: Tick spec A3** (both boxes).

- [ ] **Step 8: Commit, push, open the PR.** One commit with the config and one with the reformat:

```bash
git add packages/config prettier.config.mjs .prettierignore package.json pnpm-lock.yaml justfile
git commit -m "chore: add the shared Prettier preset"
git add -A
git commit -m "chore: format the repo with Prettier"
git push -u origin chore/prettier
```

PR _How to check:_ nothing visible changes; the diff outside the config is whitespace, quotes and commas.
PR body note: _after the squash merge, the resulting commit hash goes into `.git-blame-ignore-revs` (Task 5)._

---

### Task 3: Delete the consent subsystem (spec A2)

Branch `refactor/remove-consent`. PR title `refactor: remove the unused cookie-consent subsystem`.

**Files:**

- Delete: `apps/marketing/src/components/consent/cookie-consent-banner.tsx`,
  `apps/marketing/src/components/consent/cookie-consent-dialog.tsx`,
  `apps/marketing/src/components/consent/cookie-settings-button.tsx`,
  `apps/marketing/src/providers/consent-provider.tsx`, `apps/marketing/src/lib/consent.ts`
- Modify: `apps/marketing/src/app/layout.tsx`, `apps/marketing/src/components/layout/footer.tsx`
- Keep: `packages/ui/src/dialog.tsx`, `packages/ui/src/switch.tsx` (decision E-11)

- [ ] **Step 1: Delete the files and the empty folders.**

```bash
git rm apps/marketing/src/components/consent/*.tsx apps/marketing/src/providers/consent-provider.tsx apps/marketing/src/lib/consent.ts
```

- [ ] **Step 2: Root layout.** In `apps/marketing/src/app/layout.tsx` remove the import of `ConsentProvider`, the
      comment block "Cookie consent temporarily disabled ..." with its two commented imports, the `<ConsentProvider>`
      wrapper (keep its children in place, dedented) and the three commented lines for the banner and dialog. The
      body becomes:

```tsx
<ThemeProvider>
  <Navbar />
  <main id="main" className="flex-1">
    {children}
  </main>
  <Footer />
</ThemeProvider>
```

- [ ] **Step 3: Footer.** In `apps/marketing/src/components/layout/footer.tsx` remove the three comment lines about
      cookie settings (the note and the commented import) and the line `{/* <CookieSettingsButton ... /> */}`.

- [ ] **Step 4: Verify.**

Run: `rg -il consent apps/marketing/src`
Expected: exactly `apps/marketing/src/components/booking/booking-form.tsx` and `apps/marketing/src/content/testimonials.ts`.
Run: `rg -n "ui/dialog|ui/switch" apps` - Expected: no output (the primitives stay in the package, unused for now).
Run: `just check` - Expected: green.
Run: `ls apps/marketing/src/providers apps/marketing/src/components/consent` - Expected: both missing.
Run (CSS only loses rules): build `main` and the branch, and compare the production CSS rule by rule:

```bash
css() { cat apps/marketing/.next/static/chunks/*.css | tr '}' '\n' | sort -u; }
git stash -u && git switch main && pnpm build && css > /tmp/css-before.txt
git switch refactor/remove-consent && git stash pop && pnpm build && css > /tmp/css-after.txt
comm -13 /tmp/css-before.txt /tmp/css-after.txt   # rules only in the branch
```

Expected: no output - the branch adds no rule; `comm -23` lists only rules the consent components used.

- [ ] **Step 5: Tick spec A2** (both boxes), commit, push, open the PR.

```bash
git add -A
git commit -m "refactor: remove the unused cookie-consent subsystem"
git push -u origin refactor/remove-consent
```

PR _How to check:_ home, `/kontakt` and `/termin` in light and dark - header, footer and page look unchanged; the
footer shows Impressum, Datenschutz, AGB and the theme toggle as before.

---

### Task 4: Vitest (spec A4, closes #90)

Branch `test/vitest`. PR title `test: run the tests with Vitest`.

**Files:**

- Create: `vitest.config.mts` (root), `apps/marketing/vitest.config.mts`, `packages/ui/vitest.config.mts`
- Create: `packages/ui/src/utils.test.ts`, `packages/ui/src/button.test.tsx`
- Modify: root `package.json`, `apps/marketing/package.json`, `packages/ui/package.json`, `turbo.json`
- Modify (migrate): `apps/marketing/src/lib/booking/{anti-spam,availability-guard,log}.test.mts`,
  `apps/marketing/src/lib/{health,routes}.test.mts`, `apps/marketing/src/lib/payment/{invoice-link,log}.test.mts`,
  `tests/{release-config,triage-workflow}.test.mts`
- Modify: `CLAUDE.md` (drop the import-free convention, add the test layout)

**Interfaces:**

- Produces: `pnpm test` = `turbo run test && vitest run` (root); each workspace's `test` = `vitest run`.
- Produces: Vitest projects `unit` (node) and `components` (jsdom) in `packages/ui`; later slices add tests there
  (`*.test.ts` -> unit, `*.test.tsx` -> components). `apps/marketing` has project `unit`; D2 adds `components`.

- [ ] **Step 1: Dependencies.**

```bash
pnpm add -D -w vitest@^5.0.2 vite@^8.3.0
pnpm add -D --filter @skillsite/marketing vitest@^5.0.2 vite@^8.3.0
pnpm add -D --filter @skillsite/ui vitest@^5.0.2 jsdom@^30.1.1 @testing-library/react@^16.3.3 @testing-library/dom@^10.4.2
```

- [ ] **Step 2: Configs.** `apps/marketing/vitest.config.mts`:

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  // Resolve the `@/` alias of tsconfig.json, like the Next build does.
  resolve: { tsconfigPaths: true },
  test: {
    projects: [
      {
        extends: true,
        test: {
          name: "unit",
          include: ["src/**/*.test.{ts,mts}"],
          environment: "node",
        },
      },
    ],
    restoreMocks: true,
  },
});
```

`packages/ui/vitest.config.mts`:

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    projects: [
      {
        extends: true,
        test: {
          name: "unit",
          include: ["src/**/*.test.ts"],
          environment: "node",
        },
      },
      {
        extends: true,
        test: {
          name: "components",
          include: ["src/**/*.test.tsx"],
          environment: "jsdom",
        },
      },
    ],
    restoreMocks: true,
  },
});
```

Root `vitest.config.mts` (repo-level tests only; the workspaces run through turbo):

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["tests/**/*.test.mts", "scripts/**/*.test.mjs"],
    environment: "node",
    restoreMocks: true,
  },
});
```

Scripts: root `"test": "turbo run test && vitest run"`; `apps/marketing` and `packages/ui`: `"test": "vitest run"`.
`turbo.json` stays as is (`"test": {}`).

- [ ] **Step 3: Migrate the imports (mechanical, all nine files).**

```bash
perl -CSD -pi -e 's/^import test from "node:test";$/import { test } from "vitest";/' $(git ls-files '*.test.mts')
```

- [ ] **Step 4: Migrate the console mocks** (the only non-mechanical change). In
      `apps/marketing/src/lib/booking/log.test.mts` the test "every outcome is one greppable line at the matching level"
      becomes:

```ts
test("every outcome is one greppable line at the matching level", () => {
  const info = vi.spyOn(console, "info").mockImplementation(() => {});
  const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
  const error = vi.spyOn(console, "error").mockImplementation(() => {});

  logBooking("created", { calUid: "abc" });
  logBooking("blocked", { signal: "honeypot", honeypot: "line\nbreak" });
  logBooking("failed", {});

  assert.deepEqual(info.mock.calls[0], ['[booking] created {"calUid":"abc"}']);
  // Untrusted input stays on one line - no forged log entries.
  assert.deepEqual(warn.mock.calls[0], [
    '[booking] blocked {"signal":"honeypot","honeypot":"line\\nbreak"}',
  ]);
  assert.deepEqual(error.mock.calls[0], ["[booking] failed {}"]);
});
```

and its import line becomes `import { test, vi } from "vitest";`. In
`apps/marketing/src/lib/payment/log.test.mts` apply the same pattern to the two tests that take `(t)`:
`t.mock.method(console, "<level>", () => {})` -> `vi.spyOn(console, "<level>").mockImplementation(() => {})`,
`<spy>.mock.calls[0]?.arguments` -> `<spy>.mock.calls[0]`, `(t) =>` -> `() =>`, import `{ test, vi }`.
Then add at the end of `payment/log.test.mts`:

```ts
test("console is real again after a mocked test", () => {
  // restoreMocks: a spy from an earlier test must not swallow later output.
  assert.equal(vi.isMockFunction(console.warn), false);
});
```

- [ ] **Step 5: First package tests.** `packages/ui/src/utils.test.ts`:

```ts
import { expect, test } from "vitest";

import { cn } from "./utils";

test("the later of two conflicting utilities wins", () => {
  expect(cn("px-2", "px-4")).toBe("px-4");
});

test("falsy inputs are dropped", () => {
  expect(cn("a", false, undefined, null, "b")).toBe("a b");
});
```

`packages/ui/src/button.test.tsx`:

```tsx
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, test } from "vitest";

import { Button, LinkButton } from "./button";

afterEach(cleanup);

test("a button renders as a button with the primary look by default", () => {
  render(<Button>Termin buchen</Button>);
  const button = screen.getByRole("button", { name: "Termin buchen" });
  expect(button.className).toContain("bg-coral-gradient");
});

test("an internal link button is a link to the route", () => {
  render(<LinkButton href="/termin">Termin</LinkButton>);
  expect(
    screen.getByRole("link", { name: "Termin" }).getAttribute("href"),
  ).toBe("/termin");
});

test("an external link button keeps the external href", () => {
  render(<LinkButton href="mailto:hallo@example.com">Mail</LinkButton>);
  expect(screen.getByRole("link", { name: "Mail" }).getAttribute("href")).toBe(
    "mailto:hallo@example.com",
  );
});
```

- [ ] **Step 6: Run and count.**

Run: `pnpm test`
Expected: PASS with **50** tests: the 44 migrated ones (anti-spam 8, availability-guard 5, booking log 5,
health 2, invoice-link 10, payment log 4, routes 3, release-config 3, triage-workflow 4), the new
"console is real again" test and the 5 new package tests (utils 2, button 3). Fewer means a glob misses a file.
Run: `rg -n "node --test|node:test" --glob '!docs/**' .` - Expected: no output.

- [ ] **Step 7: Update `CLAUDE.md`.** Replace the convention bullet about import-free tested modules with:

```markdown
- Tests run on Vitest (`just test`): `*.test.ts`/`*.test.mts` in node, `*.test.tsx` in jsdom (Testing Library).
  Tested modules may use the `@/` alias.
```

- [ ] **Step 8: Tick spec A4** (both boxes), commit, push, open the PR (`Closes #90` in the body).

```bash
git add -A
git commit -m "test: run the tests with Vitest"
git push -u origin test/vitest
```

PR _How to check:_ nothing visible; CI log shows the Vitest projects and the test count.

---

### Task 5: CI and build hygiene (spec A5)

Branch `ci/hygiene`. PR title `ci: drop the transitional job and add a typecheck`. **After Task 4 is merged.**

**Files:**

- Modify: `.github/workflows/ci.yml` (delete job `lint-build`), `Dockerfile` (turbo pin), `.github/dependabot.yml`
- Modify: `turbo.json`, root `package.json`, `packages/ui/package.json`, `justfile`, `CLAUDE.md`
- Create: `tests/dockerfile.test.mts`, `.git-blame-ignore-revs`

**Interfaces:**

- Consumes: Vitest root config from Task 4 (`tests/**/*.test.mts`).
- Produces: `pnpm typecheck` / `just typecheck`; `static-checks: format-check lint typecheck`.

- [ ] **Step 1: Write the failing guard test** `tests/dockerfile.test.mts`:

```ts
/**
 * The Dockerfile prunes the workspace with `pnpm dlx turbo@<version>`. Dependabot does not update that pin,
 * so it drifts from the workspace's turbo; this test turns the drift into a red `check`.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { test } from "vitest";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (file: string) => readFileSync(path.join(root, file), "utf8");

test("the Dockerfile prunes with the workspace's turbo version", () => {
  const pinned = read("Dockerfile").match(/turbo@(\d+\.\d+\.\d+)/)?.[1];
  const locked = read("pnpm-lock.yaml").match(
    /^ {2}turbo@(\d+\.\d+\.\d+):$/m,
  )?.[1];
  assert.ok(locked, "turbo is missing from pnpm-lock.yaml");
  assert.equal(pinned, locked);
});
```

Run: `pnpm vitest run tests/dockerfile.test.mts` - Expected: FAIL (`'2.10.5' !== '2.11.2'`).

- [ ] **Step 2: Fix the pin.** In `Dockerfile` replace `pnpm dlx turbo@2.10.5 prune` with
      `pnpm dlx turbo@2.11.2 prune`. Re-run the test - Expected: PASS.

- [ ] **Step 3: Drop the transitional job.** In `.github/workflows/ci.yml` delete the comment block
      "Transitional: the `main` ruleset still requires ..." and the whole job `lint-build` ("Lint and build"). The
      ruleset requires only `check` (verified through the rulesets API during the audit).

- [ ] **Step 4: Typecheck task.** `packages/ui/package.json` scripts: `"typecheck": "tsc --noEmit"`. `turbo.json`
      tasks: `"typecheck": {}`. Root scripts: `"typecheck": "turbo run typecheck"`. `justfile`:

```just
typecheck:
    pnpm typecheck

# `next build` type-checks the apps; `typecheck` covers the packages it does not (incl. stories).
static-checks: format-check lint typecheck
```

Run: `just typecheck` - Expected: PASS (packages/ui type-checks clean today).

- [ ] **Step 5: Dependabot.** In `.github/dependabot.yml`, npm entry: restrict the group to minor and patch updates
      and ignore ESLint majors (decision V3):

```yaml
groups:
  javascript-dependencies:
    patterns:
      - "*"
    update-types:
      - "minor"
      - "patch"
ignore:
  # ESLint 10 is blocked by the peer ranges of eslint-config-next's plugins; lift once they allow it.
  - dependency-name: "eslint"
    update-types:
      - "version-update:semver-major"
```

- [ ] **Step 6: Blame ignore.** Record the squash commit of Task 2 so `git blame` skips the reformat:

```bash
git fetch origin main
{ echo "# Prettier reformat (foundation refactor A3)"; git log --format=%H --grep "format the repo with Prettier" -1 origin/main; } > .git-blame-ignore-revs
cat .git-blame-ignore-revs   # expect the comment and one 40-character hash
```

- [ ] **Step 7: CLAUDE.md.** Add to _Commands_: ``- `just typecheck` - type-check the packages `next build` does not cover.``

- [ ] **Step 8: Verify, tick spec A5** (both boxes), commit, push, open the PR.

Run: `just check` - Expected: green. Run: `docker build -t skillsite:local .` - Expected: the pruner stage uses
`turbo@2.11.2` and the image builds.

```bash
git add -A
git commit -m "ci: drop the transitional job and add a typecheck"
git push -u origin ci/hygiene
```

PR _How to check:_ nothing visible. PR body lists one setting to confirm, not to change: the `main` ruleset requires
only `check`.

---

### Task 6: Playwright smoke (spec A6)

Branch `test/smoke`. PR title `test: add a Playwright smoke suite`. **After Task 4 is merged.**

**Files:**

- Create: `apps/marketing/playwright.config.ts`, `apps/marketing/e2e/smoke.spec.ts`
- Modify: `apps/marketing/package.json` (devDependency, script `e2e`), `turbo.json` (task `e2e`), root
  `package.json` (script `smoke`), `justfile` (`smoke`, `check`), `.github/workflows/ci.yml` (browser install),
  `.gitignore`, `CLAUDE.md`, `apps/marketing/vitest.config.mts` (exclude `e2e/`)

**Interfaces:**

- Consumes: `indexablePaths` from `apps/marketing/src/lib/routes.ts`; `AvailabilityResponse` shape from
  `apps/marketing/src/lib/booking/config.ts` (`{ status, timeZone, days: { date, slots: { time, start }[] }[] }`).
- Produces: `just smoke`; `just check` = `static-checks test build smoke`.

- [ ] **Step 1: Dependency and browser.**

```bash
pnpm add -D --filter @skillsite/marketing @playwright/test@^1.63.0
pnpm --filter @skillsite/marketing exec playwright install chromium
```

- [ ] **Step 2: Config** `apps/marketing/playwright.config.ts`:

```ts
import { defineConfig, devices } from "@playwright/test";

const port = 3100;

export default defineConfig({
  testDir: "e2e",
  forbidOnly: !!process.env.CI,
  retries: 0,
  reporter: process.env.CI ? "github" : "list",
  use: { baseURL: `http://127.0.0.1:${port}` },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  // Runs against the production build; `next start` warns about `output: "standalone"` but serves it.
  webServer: {
    command: `pnpm start -p ${port}`,
    url: `http://127.0.0.1:${port}/health`,
    reuseExistingServer: !process.env.CI,
  },
});
```

- [ ] **Step 3: Write the smoke suite** `apps/marketing/e2e/smoke.spec.ts`:

```ts
import { expect, test, type Page } from "@playwright/test";

import { indexablePaths } from "../src/lib/routes";

/** Answer every non-local request locally: the smoke test must not depend on the network (e.g. Umami). */
async function isolate(page: Page) {
  await page
    .context()
    .route(/^https?:\/\/(?!127\.0\.0\.1|localhost)/, (route) =>
      route.fulfill({ status: 204, body: "" }),
    );
}

/** Collect console errors and uncaught exceptions of a page. */
function collectErrors(page: Page): string[] {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(error.message));
  return errors;
}

/** Stub the availability API: one bookable slot at 10:00 on the last day of whichever month is requested. */
async function stubAvailability(page: Page) {
  await page.route(/\/api\/booking\/availability\?/, (route) => {
    const url = new URL(route.request().url());
    const year = Number(url.searchParams.get("year"));
    const month = Number(url.searchParams.get("month"));
    const lastDay = new Date(Date.UTC(year, month, 0)).getUTCDate();
    const date = `${year}-${String(month).padStart(2, "0")}-${String(lastDay).padStart(2, "0")}`;
    return route.fulfill({
      json: {
        status: "ok",
        timeZone: "Europe/Berlin",
        days: [
          {
            date,
            slots: [{ time: "10:00", start: `${date}T10:00:00.000+02:00` }],
          },
        ],
      },
    });
  });
}

for (const path of indexablePaths) {
  test(`${path} renders without errors`, async ({ page }) => {
    await isolate(page);
    await stubAvailability(page);
    const errors = collectErrors(page);
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    await expect(page.locator("main#main")).toBeVisible();
    expect(errors).toEqual([]);
  });
}

for (const path of ["/termin", "/kontakt"]) {
  test(`the booker on ${path} reaches the slot list`, async ({ page }) => {
    await isolate(page);
    await stubAvailability(page);
    await page.goto(path);
    await expect(page.getByRole("button", { name: "10:00" })).toBeVisible();
  });
}

test("a valid payment link redirects to the PayPal checkout", async ({
  request,
}) => {
  const response = await request.get("/zahlung?re=RE-1840&betrag=90,00%20EUR", {
    maxRedirects: 0,
  });
  expect(response.status()).toBe(307);
  expect(response.headers()["location"]).toMatch(
    /^https:\/\/www\.paypal\.com\/cgi-bin\/webscr\?/,
  );
});

test("an invalid payment link renders a page instead of redirecting", async ({
  page,
}) => {
  await isolate(page);
  const errors = collectErrors(page);
  const response = await page.goto("/zahlung?re=x&betrag=abc");
  expect(response?.status()).toBe(200);
  await expect(page.locator("main#main")).toBeVisible();
  expect(errors).toEqual([]);
});

test("an unknown route answers 404", async ({ page }) => {
  await isolate(page);
  const response = await page.goto("/gibt-es-nicht");
  expect(response?.status()).toBe(404);
});
```

- [ ] **Step 4: Wire it up.** `apps/marketing/package.json` scripts: `"e2e": "playwright test"`. `turbo.json`:
      `"e2e": { "dependsOn": ["build"], "cache": false }`. Root scripts: `"smoke": "turbo run e2e"`. `justfile`:

```just
# Functional smoke test against the production build (needs `playwright install chromium` once).
smoke:
    pnpm smoke

# Everything that must be green before a push; CI's `check` job runs the same.
check: static-checks test build smoke
```

`apps/marketing/vitest.config.mts`: add `exclude: ["e2e/**"]` to the `unit` project's `test` block.
`.gitignore`, section _testing_: add `playwright-report/` and `test-results/`.
`.github/workflows/ci.yml`, job `check`, between _Install dependencies_ and _Run checks_:

```yaml
- name: Install the Playwright browser
  run: pnpm --filter @skillsite/marketing exec playwright install --with-deps chromium
```

- [ ] **Step 5: Run it.**

Run: `just smoke`
Expected: PASS - one test per indexable path, two booker tests, two payment tests, one 404 test.
If a route logs a console error on unmodified `main`, do not fix it here and do not weaken the assertion: stop and
report the message in the PR (it is a bug for phase B).

- [ ] **Step 6: Prove it can fail.** Temporarily add `throw new Error("smoke")` to the top of the component in
      `apps/marketing/src/app/preise/page.tsx`, run `pnpm build && just smoke` - Expected: `/preise` fails. Revert.

- [ ] **Step 7: CLAUDE.md** _Commands_: ``- `just smoke` - functional smoke test against the production build
(once: `pnpm --filter @skillsite/marketing exec playwright install chromium`).``

- [ ] **Step 8: Tick spec A6**, commit, push, open the PR.

```bash
git add -A
git commit -m "test: add a Playwright smoke suite"
git push -u origin test/smoke
```

PR _How to check:_ nothing visible; CI shows the smoke results.

---

### Task 7: Design ratchet (spec A7)

Branch `chore/design-ratchet`. PR title `chore: add the design ratchet`. **After Task 4 is merged.**

**Files:**

- Create: `scripts/design-ratchet.mjs`, `scripts/design-ratchet.test.mjs`, `design-ratchet.json`
- Modify: `justfile`, `CLAUDE.md`

**Interfaces:**

- Produces (exported from `scripts/design-ratchet.mjs`):
  - `PATTERNS: { name: string; regex: RegExp; files: RegExp }[]`
  - `countPatterns(files: { path: string; content: string }[], allow: Record<string, { file: string; reason: string }[]>): Record<string, number>`
  - `compare(counts: Record<string, number>, baseline: Record<string, number>): { raised: string[]; lowered: string[] }`
- Produces: `just ratchet` (check), `just ratchet-update` (write lowered counts).

- [ ] **Step 1: Write the failing test** `scripts/design-ratchet.test.mjs`:

```js
import { expect, test } from "vitest";

import { compare, countPatterns } from "./design-ratchet.mjs";

const file = (path, content) => ({ path, content });

test("counts each pattern in the files it applies to", () => {
  const counts = countPatterns(
    [
      file(
        "apps/marketing/src/app/page.tsx",
        '<p className="text-[13px] text-sm">x</p><button>y</button>',
      ),
      file(
        "packages/ui/src/button.tsx",
        "<button className='text-[1.05rem]' />",
      ),
    ],
    {},
  );
  expect(counts["arbitrary-text"]).toBe(2);
  expect(counts["raw-text-size"]).toBe(1);
  // Raw buttons only count in apps: the package is where the button primitive lives.
  expect(counts["raw-button"]).toBe(1);
});

test("stories and tests are not counted", () => {
  const counts = countPatterns(
    [
      file("packages/ui/src/button.stories.tsx", 'className="text-[9px]"'),
      file("apps/marketing/src/lib/x.test.mts", 'const c = "#ff0000";'),
    ],
    {},
  );
  expect(counts["arbitrary-text"]).toBe(0);
  expect(counts["hex-color"]).toBe(0);
});

test("allow-listed files are exempt for their pattern only", () => {
  const counts = countPatterns(
    [file("apps/marketing/src/app/layout.tsx", 'color: "#faf6f0" text-[2px]')],
    {
      "hex-color": [
        {
          file: "apps/marketing/src/app/layout.tsx",
          reason: "theme-color meta",
        },
      ],
    },
  );
  expect(counts["hex-color"]).toBe(0);
  expect(counts["arbitrary-text"]).toBe(1);
});

test("anchors are not hex colours", () => {
  const counts = countPatterns(
    [
      file(
        "apps/marketing/src/lib/routes.ts",
        '"/faecher#faq" "#but" "#discord"',
      ),
    ],
    {},
  );
  expect(counts["hex-color"]).toBe(0);
});

test("a rise and a drop are both reported", () => {
  expect(compare({ a: 3, b: 1 }, { a: 2, b: 2 })).toEqual({
    raised: ["a"],
    lowered: ["b"],
  });
  expect(compare({ a: 2 }, { a: 2 })).toEqual({ raised: [], lowered: [] });
});
```

Run: `pnpm vitest run scripts/design-ratchet.test.mjs` - Expected: FAIL (module not found).

- [ ] **Step 2: Implement** `scripts/design-ratchet.mjs`:

```js
/**
 * Design ratchet: counts patterns that bypass the design system and keeps the counts from rising.
 * `node scripts/design-ratchet.mjs`           check against design-ratchet.json (fails on any difference)
 * `node scripts/design-ratchet.mjs --update`  write lowered counts back (refuses a rise)
 */
import { globSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const TSX = /\.(tsx|ts|mts)$/;
const TSX_OR_CSS = /\.(tsx|ts|mts|css)$/;
const APP_TSX = /^apps\/[^/]+\/src\/.*\.tsx$/;

export const PATTERNS = [
  { name: "arbitrary-text", regex: /(?<![\w-])text-\[/g, files: TSX_OR_CSS },
  {
    name: "raw-text-size",
    regex: /(?<![\w-])text-(xs|sm|base|lg|xl|2xl)(?![\w-])/g,
    files: TSX,
  },
  { name: "color-mix", regex: /color-mix\(/g, files: TSX },
  { name: "arbitrary-shadow", regex: /(?<![\w-])shadow-\[/g, files: TSX },
  {
    name: "arbitrary-radius",
    regex: /(?<![\w-])rounded(-[a-z]{1,2})?-\[/g,
    files: TSX,
  },
  {
    name: "clamp-spacing",
    regex:
      /(?<![\w-])-?(p|px|py|pt|pb|pl|pr|m|mx|my|mt|mb|ml|mr|gap|gap-x|gap-y|space-x|space-y)-\[clamp\(/g,
    files: TSX,
  },
  {
    name: "hex-color",
    regex: /#(?:[0-9a-fA-F]{6}|[0-9a-fA-F]{3})(?![\w])/g,
    files: TSX,
  },
  { name: "raw-button", regex: /<button(?![\w-])/g, files: APP_TSX },
  { name: "inline-style", regex: /style=\{\{/g, files: TSX },
];

const SKIP = /(\.stories\.tsx|\.test\.(ts|tsx|mts|mjs))$/;

export function countPatterns(files, allow) {
  const counts = Object.fromEntries(PATTERNS.map((p) => [p.name, 0]));
  for (const { path: file, content } of files) {
    if (SKIP.test(file)) continue;
    for (const pattern of PATTERNS) {
      if (!pattern.files.test(file)) continue;
      if ((allow[pattern.name] ?? []).some((entry) => entry.file === file))
        continue;
      counts[pattern.name] += content.match(pattern.regex)?.length ?? 0;
    }
  }
  return counts;
}

export function compare(counts, baseline) {
  const names = [
    ...new Set([...Object.keys(counts), ...Object.keys(baseline)]),
  ];
  return {
    raised: names.filter((n) => (counts[n] ?? 0) > (baseline[n] ?? 0)),
    lowered: names.filter((n) => (counts[n] ?? 0) < (baseline[n] ?? 0)),
  };
}

function main() {
  const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
  const baselineFile = path.join(root, "design-ratchet.json");
  const files = globSync(
    ["apps/*/src/**/*.{ts,tsx,mts,css}", "packages/ui/src/**/*.{ts,tsx}"],
    { cwd: root },
  ).map((file) => ({
    path: file,
    content: readFileSync(path.join(root, file), "utf8"),
  }));
  const baseline = JSON.parse(readFileSync(baselineFile, "utf8"));
  const counts = countPatterns(files, baseline.allow ?? {});
  const { raised, lowered } = compare(counts, baseline.counts);

  for (const name of raised)
    console.error(
      `raised  ${name}: ${baseline.counts[name] ?? 0} -> ${counts[name]}`,
    );
  for (const name of lowered)
    console.error(
      `lowered ${name}: ${baseline.counts[name]} -> ${counts[name]}`,
    );

  if (process.argv.includes("--update")) {
    // The very first run (empty baseline) records today's counts; afterwards a rise is refused.
    const initial = Object.keys(baseline.counts).length === 0;
    if (raised.length && !initial) process.exit(1);
    writeFileSync(
      baselineFile,
      `${JSON.stringify({ ...baseline, counts }, null, 2)}\n`,
    );
    return;
  }
  if (raised.length) {
    console.error(
      "A pattern count rose: use the design-system component or token instead.",
    );
    process.exit(1);
  }
  if (lowered.length) {
    console.error(
      "A count dropped - run `just ratchet-update` and commit design-ratchet.json.",
    );
    process.exit(1);
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) main();
```

Run: `pnpm vitest run scripts/design-ratchet.test.mjs` - Expected: PASS (5 tests).

- [ ] **Step 3: Baseline.** Create `design-ratchet.json`:

```json
{
  "allow": {
    "hex-color": [
      {
        "file": "apps/marketing/src/app/layout.tsx",
        "reason": "theme-color meta tags cannot read CSS variables"
      }
    ]
  },
  "counts": {}
}
```

Run: `node scripts/design-ratchet.mjs --update` - it writes today's counts. Put them in the PR body. For
orientation, the audit counted in TSX: `text-[` 34, `color-mix(` 13, `shadow-[` 7, `rounded-[` 3,
`-[clamp(` 24, raw `<button` 14; the script's numbers may differ slightly because of its exact patterns - its
own output is the baseline.

- [ ] **Step 4: Wire it up.** `justfile`:

```just
# Design ratchet: counts of design-system bypasses may only fall (design-ratchet.json).
ratchet:
    node scripts/design-ratchet.mjs

ratchet-update:
    node scripts/design-ratchet.mjs --update

static-checks: format-check lint typecheck ratchet
```

(If Task 5 is not merged yet, leave out `typecheck`; the rebase after its merge restores it.)

- [ ] **Step 5: Prove it.** Add `<p className="text-[13px]" />` to `apps/marketing/src/app/preise/page.tsx`, run
      `just ratchet` - Expected: exit 1 with `raised  arbitrary-text`. Revert; run `just ratchet` - Expected: exit 0.

- [ ] **Step 6: CLAUDE.md.** _Conventions_, after the design-system bullet:

```markdown
- `just ratchet` counts design-system bypasses (`design-ratchet.json`). A count may never rise; when your change
  lowers one, run `just ratchet-update` and commit the file. Exceptions go into its `allow` list with a reason.
```

- [ ] **Step 7: Tick spec A7**, commit, push, open the PR.

```bash
git add -A
git commit -m "chore: add the design ratchet"
git push -u origin chore/design-ratchet
```

PR _How to check:_ nothing visible; the PR body lists the baseline counts.

---

## After phase A

- Flip the spec's status line to "Phase A done" in the last phase-A PR.
- The next plan (`docs/plans/foundation-refactor-phase-b.md`) is written against the merged state of `main`.
