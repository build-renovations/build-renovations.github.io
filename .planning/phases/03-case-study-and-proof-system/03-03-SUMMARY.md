---
phase: 03-case-study-and-proof-system
plan: 03
subsystem: ui
tags: [jekyll, liquid, case-studies, proof-system, bilingual]
requires:
  - phase: 03-01
    provides: dedicated /projects/ routes and dossier layout
  - phase: 03-02
    provides: publishable case-study content and route-ready dossier data
provides:
  - featured dossier routing on home, process, and representative service/property pages
  - publishable proof-card upgrades for module-driven proof surfaces
  - bilingual supporting-page bridges into the dossier system
affects: [phase-03-validation, phase-04-premium-ux-and-layout-hardening, phase-05-seo-and-regression-hardening]
tech-stack:
  added: []
  patterns: [shared case-study featured sets, module-scoped proof replacement, bilingual route bridging]
key-files:
  created: []
  modified: [_data/case_studies.yml, _data/service_pages.yml, _data/trust_foundation.yml, _includes/sourced-proof.html, _layouts/home.html, _layouts/process.html, _layouts/service_detail.html, about/index.md, en/about/index.md, services/index.md, en/services/index.md, scripts/phase1_render_checks.mjs]
key-decisions:
  - "Featured dossier selection now lives in _data/case_studies.yml so home, process, and service routes pull from one shared mapping contract."
  - "Default sourced-proof cards remain visibly temporary for legacy surfaces, while module-driven proof blocks upgrade to publishable dossier-backed cards when real evidence exists."
  - "About and services index pages keep the inherited sourced-proof module for Phase 1 parity but add lightweight dossier bridges instead of long duplicate proof copy."
patterns-established:
  - "Route-group pattern: service and property routes can resolve dossier refs and bridge copy from case_studies.route_groups before local page data."
  - "Proof-upgrade pattern: sourced-proof modules can swap placeholder cards for publishable replacements through shared proof metadata without changing legacy placeholder surfaces."
requirements-completed: [CASE-01, CASE-03, CASE-04]
duration: 11min
completed: 2026-03-11
---

# Phase 03 Plan 03: Route Integration Summary

**Shared dossier routing now drives homepage, process, service, and supporting-page proof paths, while module-level proof cards upgrade from demo placeholders to publishable case-backed evidence where real dossiers exist.**

## Performance

- **Duration:** 11 min
- **Started:** 2026-03-11T19:44:16Z
- **Completed:** 2026-03-11T19:55:02Z
- **Tasks:** 3
- **Files modified:** 12

## Accomplishments
- Routed home, process, and representative service/property pages into curated dossier sets from shared case-study data instead of scattered per-layout refs.
- Upgraded module-selected proof cards to publishable dossier-backed content with source, attribution, and direct dossier links while leaving legacy placeholder surfaces honest.
- Added bilingual dossier bridges on the about and services index pages so supporting routes now lead into the proof system without becoming separate copy-heavy proof pages.

## Task Commits

Each task was committed atomically:

1. **Task 1: Map dossiers into the routes where buyers need deeper proof next** - `745390c` (feat)
2. **Task 2: Replace temporary proof cards with publishable dossier-backed proof where available** - `94ef0fe` (feat)
3. **Task 3: Tighten supporting route parity around the new proof system** - `9139615` (feat)

## Files Created/Modified
- `_data/case_studies.yml` - Added featured dossier sets, route-group mappings, and proof-replacement keys.
- `_data/service_pages.yml` - Extended representative service routes with dossier refs for shared route resolution.
- `_data/trust_foundation.yml` - Split placeholder proof from publishable module replacements in both languages.
- `_includes/sourced-proof.html` - Swaps in publishable dossier-backed proof for module-driven surfaces and links to the source dossier.
- `_layouts/home.html` - Pulls homepage featured dossiers from shared case-study mappings.
- `_layouts/process.html` - Pulls process-page featured dossiers from shared case-study mappings.
- `_layouts/service_detail.html` - Resolves dossier refs and bridge copy from shared route-group mappings.
- `about/index.md` - Adds a lightweight Ukrainian dossier bridge section.
- `en/about/index.md` - Adds the English dossier bridge section.
- `services/index.md` - Adds a Ukrainian dossier bridge from the service index.
- `en/services/index.md` - Adds the English dossier bridge from the service index.
- `scripts/phase1_render_checks.mjs` - Accepts publishable proof badges on upgraded routes while preserving placeholder-label enforcement.

## Decisions Made
- Featured dossier curation is centralized in `_data/case_studies.yml` instead of being split between trust, process, and service-specific data branches.
- Proof replacement happens only when a page passes a module with explicit proof keys, which prevents legacy placeholder surfaces from being silently converted.
- Supporting pages use lightweight in-content dossier bridges rather than replacing the inherited Phase 1 proof module, preserving bilingual parity and existing QA guarantees.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Updated stale Phase 1 proof assertions to allow publishable proof on upgraded routes**
- **Found during:** Task 2 (Replace temporary proof cards with publishable dossier-backed proof where available)
- **Issue:** `./scripts/qa.sh` still enforced placeholder badges on routes this plan explicitly upgrades to publishable dossier-backed proof.
- **Fix:** Adjusted `scripts/phase1_render_checks.mjs` to require a visible proof-status badge on all checked routes, while keeping placeholder disclaimer enforcement only where placeholder cards still render.
- **Files modified:** `scripts/phase1_render_checks.mjs`
- **Verification:** `./scripts/qa.sh`
- **Committed in:** `94ef0fe`

---

**Total deviations:** 1 auto-fixed (Rule 3)
**Impact on plan:** Verification now matches the intended CASE-03 behavior without weakening placeholder honesty checks.

## Issues Encountered
- Phase 1 render checks initially failed because they assumed every sourced-proof surface must remain demo-labeled forever. The check was narrowed to the real requirement: placeholders must stay visibly labeled, but upgraded routes may show publishable proof.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- Phase 3 route integration is in place and fully covered by `./scripts/qa.sh`.
- Phase 4 can now refine layout hierarchy and visual treatment around stable dossier-entry components instead of inventing new proof wiring.

## Self-Check: PASSED
- Found `.planning/phases/03-case-study-and-proof-system/03-03-SUMMARY.md`
- Verified commits `745390c`, `94ef0fe`, and `9139615`
