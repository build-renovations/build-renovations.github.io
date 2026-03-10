# Codebase Concerns

**Analysis Date:** 2026-03-10
**Focus:** concerns
**Tool mode:** `repo_only`
**MCP:** not needed

This repository is small and currently builds with `./scripts/qa.sh`, but several risks are hidden by the static-site model. The main pattern is heavy reliance on manual content synchronization and environment-specific tooling around an old GitHub Pages Jekyll stack.

## Highest-Risk Findings

### Published artifact leak from repository root

- Issue: `mobile-home-before.md` is a browser snapshot artifact committed at the site root. It is not excluded in `_config.yml`, has no front matter, and is copied directly into the built site as `_site/mobile-home-before.md`.
- Evidence:
  - `_config.yml` excludes `.playwright-cli/` but not `mobile-home-before.md`.
  - `mobile-home-before.md` contains a raw accessibility snapshot of the homepage.
  - Local build output confirms publication at `_site/mobile-home-before.md`.
- Impact:
  - Internal working artifacts become publicly accessible on GitHub Pages.
  - Future snapshots may expose navigation structure, test content, or sensitive notes.
  - This weakens content governance because any stray root-level file can ship silently.
- Files: `mobile-home-before.md`, `_config.yml`, `_site/mobile-home-before.md`
- Fix approach:
  - Remove the artifact from the site root.
  - Add explicit exclusions for local research/snapshot outputs in `_config.yml`.
  - Keep browser-capture artifacts under an already excluded directory such as `.playwright-cli/` or `agents/`.

### Launch-blocking placeholder business data is embedded globally

- Issue: placeholder contact data is injected into visible UI and JSON-LD.
- Evidence:
  - `_config.yml` still contains `+380000000000` and `hello@example.com`.
  - `_includes/footer.html` renders both values on every page.
  - `contact/index.md` and `en/contact/index.md` render them in page content.
  - `_includes/head.html` embeds them in structured data.
- Impact:
  - Broken lead flow on production.
  - Invalid business metadata for search engines.
  - Trust damage if the site is indexed or shared before launch readiness.
- Files: `_config.yml`, `_includes/footer.html`, `_includes/head.html`, `contact/index.md`, `en/contact/index.md`
- Fix approach:
  - Replace placeholders before any public deployment.
  - Add a QA guard that fails builds when placeholder values remain in `_config.yml`.

### Production indexing is disabled by a hardcoded config flag

- Issue: `_config.yml` sets `seo.allow_indexing: false`, and both `<meta name="robots">` and `robots.txt` are wired from that flag.
- Evidence:
  - `_config.yml` line 52 sets `allow_indexing: false`.
  - `_includes/head.html` injects `noindex, nofollow, noarchive`.
  - `robots.txt` switches to `Disallow: /` unless indexing is enabled.
- Impact:
  - A launch can appear technically successful while remaining invisible to search engines.
  - This is easy to miss because local QA passes with indexing disabled.
- Files: `_config.yml`, `_includes/head.html`, `robots.txt`
- Fix approach:
  - Move launch state into an explicit deployment checklist or environment-specific config.
  - Add a release gate that requires deliberate confirmation before shipping with `allow_indexing: false`.

## Tech Debt

### Manual bilingual and cross-data synchronization

- Issue: the site duplicates service information across several independent sources:
  - `_data/services.yml`
  - `_data/service_pages.yml`
  - `_data/work_examples.yml`
  - individual page front matter under `services/` and `en/services/`
- Why it exists: the content model favors simple Jekyll data files and page-level control without custom plugins.
- Impact:
  - Easy drift between list pages, detail pages, galleries, SEO metadata, and language variants.
  - Adding one new service requires edits in many places, increasing regression risk.
  - Broken assumptions are not validated anywhere in `scripts/qa.sh`.
- Fragile examples:
  - `_layouts/home.html` reads `_data/services.yml`.
  - `_layouts/service_detail.html` reads `_data/service_pages.yml`.
  - `_includes/work-examples.html` reads `_data/work_examples.yml`.
- Fix approach:
  - Centralize service identity and routing into one primary data source.
  - Derive secondary views from that source where possible.
  - Add a consistency check script for service keys, URLs, and language coverage.

### Unused and misleading Jekyll collection config

- Issue: `_config.yml` defines `collections.pages_en.output: false`, but the repository uses normal pages under `en/` rather than that collection.
- Impact:
  - Creates confusion about the actual multilingual architecture.
  - Increases the chance of future contributors trying to use an unused collection path.
- Files: `_config.yml`, `en/`
- Fix approach:
  - Remove the unused collection or migrate to it intentionally.

### Ruby compatibility shim patches `Object` globally

- Issue: `scripts/jekyll_compat.rb` monkey-patches `Object#tainted?` to keep the legacy Jekyll stack running on modern Ruby.
- Impact:
  - The build currently depends on a workaround rather than a clean dependency path.
  - Future Ruby/Jekyll upgrades may fail in less obvious ways.
  - This is a maintenance trap for anyone expecting stock GitHub Pages behavior locally.
- Evidence: local build emitted Jekyll/Ruby warnings even though the build completed.
- Files: `scripts/jekyll_compat.rb`, `Gemfile`, `README.md`
- Fix approach:
  - Document the exact supported local Ruby/Bundler versions.
  - Revisit whether local development should target the GitHub Pages gem runtime more strictly, or move to a modern Jekyll toolchain outside GitHub Pages constraints.

## Known Issues

### Browser automation artifacts can be published accidentally

- Symptoms: stray root-level files like `mobile-home-before.md` are copied into the generated site.
- Trigger: saving capture artifacts outside excluded directories.
- Root cause: Jekyll treats unknown root files as static assets unless excluded.
- Files: `mobile-home-before.md`, `_config.yml`
- Workaround: manually delete the artifact before build.

### English 404 experience is incomplete

- Symptoms:
  - Only one `404.html` exists, and it is Ukrainian-only.
  - The page has `translation_key: not-found`, but there is no English sibling page.
  - The language switcher falls back to `/en/`, not an English 404.
- Impact:
  - English users who hit a broken URL on GitHub Pages get a mismatched-language error page.
  - `hreflang` handling for the 404 translation key is incomplete.
- Files: `404.html`, `_includes/header.html`, `_includes/head.html`
- Fix approach:
  - Decide whether to keep a single bilingual 404 page or render copy conditionally for `lang`.
  - Avoid implying a two-page translation pair when only one 404 page exists.

### Related services section is content-only and easy to leave half-wired

- Symptoms: `_layouts/service_detail.html` renders related services as plain cards with no links or images.
- Impact:
  - Users can see adjacent services but cannot navigate from those cards.
  - Future contributors may assume the cards are functional because the rest of the site is link-heavy.
- Files: `_layouts/service_detail.html`, `_data/service_pages.yml`
- Fix approach:
  - Either add route-aware links based on service keys or simplify the section to explicit text recommendations.

## Security and Content Governance

### Static publish model has weak guardrails against accidental disclosure

- Risk: any unexcluded file in the repository root can ship publicly.
- Current mitigation:
  - `_config.yml` excludes some operational directories such as `agents/`, `docs/`, `scripts/`, and `.playwright-cli/`.
- Gap:
  - The policy is directory-based, not output-based.
  - There is no denylist for common research artifacts, exports, notes, or captures placed in the root.
- Files: `_config.yml`
- Recommendation:
  - Add exclusions for known scratch patterns.
  - Consider a positive allowlist mindset for published top-level content.
  - Add a QA step that flags unexpected root-level published files.

### JSON-LD can silently publish invalid business identity

- Risk: `_includes/head.html` always emits schema using values from `_config.yml`, even if they are placeholders or incomplete.
- Impact:
  - Search engines ingest low-quality or false business metadata.
  - This becomes harder to notice because the visible site still "works."
- Files: `_includes/head.html`, `_config.yml`
- Recommendation:
  - Validate required business fields in QA before building for release.

## Performance and Build Risks

### Gate 4 verification is nondeterministic and network-dependent

- Issue:
  - `scripts/gates.sh` pulls `lighthouse`, `pa11y`, and `linkinator` via `npx --yes` on each run.
  - There is no `package.json` or pinned tool version set.
- Impact:
  - Results can change over time without repository changes.
  - CI or local verification can fail because of transient npm/network issues.
  - The repository cannot guarantee reproducible gate behavior.
- Files: `scripts/gates.sh`
- Fix approach:
  - Pin versions in `package.json`.
  - Prefer local installs or a controlled execution environment for release gates.

### Accessibility/performance checks cover only homepages

- Issue:
  - `run_gate_4()` checks `/` and `/en/` for Lighthouse and pa11y.
  - Interior pages such as services, FAQ, process, and contact are not audited.
- Impact:
  - Regressions in key conversion and SEO pages can pass the current gates unnoticed.
  - The most complex templates, especially `_layouts/service_detail.html` and `_includes/work-examples.html`, have no automated rendered-page coverage.
- Files: `scripts/gates.sh`, `_layouts/service_detail.html`, `_includes/work-examples.html`, `_layouts/process.html`
- Fix approach:
  - Extend gate coverage to one page per major template type in both languages.

### Animation logic scales with DOM size and lacks reduced-motion handling

- Issue:
  - `assets/js/site.js` attaches pointer listeners to all `.hero__shot`, `.service-card`, and `.feature-band__media figure` nodes.
  - It also adds reveal attributes and observes a long selector list across every page.
  - There is no `prefers-reduced-motion` guard.
- Impact:
  - The current site is small, but richer galleries or longer landing pages will accumulate more event handlers and style writes.
  - Motion-sensitive users are not respected.
- Files: `assets/js/site.js`
- Fix approach:
  - Skip motion features when `prefers-reduced-motion: reduce` is set.
  - Scope expensive effects to pages/components that actually need them.

### Build warnings already signal dependency drift

- Evidence from `./scripts/qa.sh`:
  - `Logger not initialized properly`
  - `Jekyll::Stevenson#initialize: does not call super probably`
  - `To use retry middleware with Faraday v2.0+, install faraday-retry gem`
- Impact:
  - The build is passing, but the toolchain is not clean.
  - Warning-only failures tend to become hard failures during routine environment updates.
- Files: `scripts/qa.sh`, `Gemfile`
- Fix approach:
  - Capture and track known warnings explicitly.
  - Periodically test the stack in a clean environment instead of relying on one working machine.

## Fragile Areas

### Translation and language-switch behavior depend on `site.pages` lookups

- Why fragile:
  - `_includes/head.html` and `_includes/header.html` both discover siblings by filtering `site.pages` on `translation_key`.
  - This only works while all translated documents remain regular pages and every pair is maintained manually.
- Common failures:
  - Missing sibling pages.
  - Incorrect `translation_key`.
  - Future migration to collections without updating sibling discovery.
- Files: `_includes/head.html`, `_includes/header.html`, every page under `about/`, `contact/`, `faq/`, `process/`, `services/`, `en/`
- Safe modification:
  - Treat `translation_key`, `lang`, and permalink edits as a coupled change.
  - Rebuild and inspect both canonical and `hreflang` output after any routing change.
- Coverage gap:
  - `scripts/qa.sh` only checks for a few built files; it does not validate canonical/hreflang correctness.

### Service-detail rendering assumes valid service keys everywhere

- Why fragile:
  - `_layouts/service_detail.html` assumes `page.service_key` resolves cleanly into `_data/service_pages.yml`.
  - There is no defensive fallback or validation for missing keys, missing `related` entries, or incomplete language blocks.
- Common failures:
  - Broken builds or empty content if a new service page is added incorrectly.
  - Silent content gaps if a related key is misspelled.
- Files: `_layouts/service_detail.html`, `_data/service_pages.yml`, `services/*/index.md`, `en/services/*/index.md`
- Safe modification:
  - Add automated validation for `service_key`, `related`, and language presence before changing the service map.

### Root-level static publishing behavior is easy to forget

- Why fragile:
  - Jekyll’s safe static-file behavior is simple, but it means accidental files ship unless excluded.
  - This repository already mixes implementation files, process docs, agent outputs, and local tooling.
- Common failures:
  - Research artifacts or exports appear in production.
  - Teams assume “not linked” means “not public.”
- Files: repository root, `_config.yml`
- Safe modification:
  - Keep publishable content in clearly scoped directories and audit top-level files before release.

## Testing and Validation Gaps

### No automated checks for metadata integrity

- Missing coverage:
  - canonical URLs
  - `hreflang` pairs
  - `x-default`
  - structured-data correctness
  - placeholder business fields
- Files involved: `_includes/head.html`, `_includes/header.html`, `_config.yml`
- Risk: SEO regressions can ship with no failing test.

### No content-model consistency tests

- Missing coverage:
  - matching service keys across `_data/services.yml`, `_data/service_pages.yml`, `_data/work_examples.yml`
  - bilingual parity across `services/` and `en/services/`
  - related-service key validity
- Risk: the repository’s main maintenance burden is structural sync, but nothing enforces it.

### No browser behavior validation for navigation states

- Missing coverage:
  - mobile nav open/close behavior
  - keyboard/escape handling
  - language switch behavior on incomplete translation pairs
  - reduced-motion behavior
- Files involved: `assets/js/site.js`, `_includes/header.html`, `404.html`
- Risk: interaction regressions can slip through because current QA is largely build-level.

## Recommended Priorities

1. Remove `mobile-home-before.md` from the published surface and harden `_config.yml` exclusions.
2. Replace placeholder business/contact data and add a QA guard for it.
3. Decide and document launch indexing behavior instead of relying on `_config.yml` defaults.
4. Pin Node-based gate tools and widen rendered-page coverage beyond the two homepages.
5. Add a repo-level validation script for translation pairs, service keys, and metadata invariants.

## Verification Notes

- Local build executed successfully with `./scripts/qa.sh` on 2026-03-10.
- The build emitted Ruby/Jekyll warnings, which strengthens the dependency-drift concern rather than disproving it.
- No MCP was used because the requested concern analysis was fully supported by repository inspection and local build evidence.
