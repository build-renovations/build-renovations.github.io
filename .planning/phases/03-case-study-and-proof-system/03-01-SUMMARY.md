---
phase: 03-case-study-and-proof-system
plan: 01
subsystem: ui
tags: [jekyll, qa, case-studies, bilingual, proof-system]
requires:
  - phase: 02-content-architecture-expansion
    provides: shared bilingual route structure, Phase 1 and Phase 2 render checks, service/process data contracts
provides:
  - bilingual `/projects/` index routes and two dossier route pairs
  - shared `_data/case_studies.yml` proof contract plus service/process case-study references
  - Phase 3 rendered QA coverage for project routes, proof markers, and metadata parity
affects: [phase-03-plan-02, phase-03-plan-03, phase-03-plan-04, qa]
tech-stack:
  added: [node-render-check-script]
  patterns: [data-driven case-study rendering, bilingual route parity checks, shared case-study references on service records]
key-files:
  created: [_data/case_studies.yml, _includes/featured-case-studies.html, _layouts/case_study.html, projects/index.md, en/projects/index.md, scripts/phase3_render_checks.mjs, .planning/phases/03-case-study-and-proof-system/03-01-SUMMARY.md]
  modified: [_data/service_pages.yml, _data/process_page.yml, _data/trust_foundation.yml, _layouts/home.html, _layouts/process.html, _layouts/service_detail.html, _includes/sourced-proof.html, scripts/qa.sh, .planning/phases/03-case-study-and-proof-system/03-VALIDATION.md]
key-decisions:
  - "Phase 3 proof routing uses a dedicated `/projects/` family instead of stretching service galleries into dossier pages."
  - "Service and process routes store stable case-study refs at the shared record level so bilingual pages can render the same proof targets without copy duplication."
  - "Phase 3 QA is additive: `scripts/phase3_render_checks.mjs` runs after Phase 1 and Phase 2 checks and enforces markers plus metadata parity on project routes."
patterns-established:
  - "Case-study cards expose stable buyer-relevance, proof-status, and related-route markers for rendered QA."
  - "Dossier pages are thin frontmatter routes backed by `_data/case_studies.yml` and the `case_study` layout."
requirements-completed: [CASE-01, CASE-03]
duration: 13min
completed: 2026-03-11
---

# Phase 3 Plan 01: Wave 0 Foundation Summary

**Bilingual project-proof routes with shared case-study data, dossier layouts, and rendered Phase 3 QA guardrails**

## Performance

- **Duration:** 13 min
- **Started:** 2026-03-11T19:19:34Z
- **Completed:** 2026-03-11T19:32:36Z
- **Tasks:** 4
- **Files modified:** 19

## Accomplishments
- Added `_data/case_studies.yml`, bilingual project index routes, and two dossier route pairs backed by shared data and a reusable `case_study` layout.
- Wired Phase 3 rendered checks into `./scripts/qa.sh` so project routes, proof markers, and bilingual metadata parity fail the default QA path when they drift.
- Connected homepage, process, apartment, house, plumbing, and electrical routes to shared case-study references instead of page-local proof copy.

## Task Commits

Each task was committed atomically:

1. **Task 1: Install Phase 3 QA guardrails and rendered proof markers first** - `a1405b9` (feat)
2. **Task 2: Define the shared case-study and proof-link contracts** - `6fab189` (refactor)
3. **Task 3: Create the reusable case-study render layer and index routes** - `41c2779` (feat)
4. **Task 4: Update the validation artifact with Wave 0 ownership** - `c9aac19` (docs)

**Plan metadata:** recorded in the final docs commit for this plan

## Files Created/Modified
- `_data/case_studies.yml` - Source of truth for dossier routes, proof-source status, buyer relevance, stages, and gallery assets.
- `_data/service_pages.yml` - Shared service-level case-study refs and bridge copy for key Phase 3 entry routes.
- `_data/process_page.yml` - Process-page bridge copy and stable dossier refs.
- `_data/trust_foundation.yml` - Explicit proof-source status labels plus homepage case-study bridge content.
- `_includes/featured-case-studies.html` - Reusable featured dossier card renderer with stable QA markers.
- `_layouts/case_study.html` - Data-driven dossier layout for bilingual project pages.
- `projects/index.md` - Ukrainian project-proof index route.
- `en/projects/index.md` - English project-proof index route.
- `scripts/phase3_render_checks.mjs` - Rendered route and metadata parity checks for Phase 3.
- `.planning/phases/03-case-study-and-proof-system/03-VALIDATION.md` - Wave 0 verification ownership recorded as implemented.

## Decisions Made
- Dedicated project-proof routes were introduced immediately so later proof waves inherit a route family and a render contract instead of retrofitting service galleries.
- Service-level case-study refs were centralized at the shared item level because Phase 3 needs route-level consistency across both languages and across future entry surfaces.
- Buyer-relevance, proof-source status, stage timeline, and related-route markers were encoded as stable rendered attributes instead of relying on free-text matching in QA.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Fixed YAML parsing in `_data/case_studies.yml`**
- **Found during:** Task 1 (Install Phase 3 QA guardrails and rendered proof markers first)
- **Issue:** Colon-heavy buyer-relevance strings in the new case-study contract broke YAML parsing and blocked both build and verification.
- **Fix:** Quoted the affected bilingual strings so the data file loads cleanly in Ruby and Jekyll.
- **Files modified:** `_data/case_studies.yml`
- **Verification:** `bundle exec ruby -e 'require "yaml"; YAML.load_file("_data/case_studies.yml")'`
- **Committed in:** `a1405b9` (part of task commit)

**2. [Rule 3 - Blocking] Normalized service proof links to the shared record contract**
- **Found during:** Task 2 (Define the shared case-study and proof-link contracts)
- **Issue:** Initial case-study refs lived only inside locale branches, which conflicted with the intended shared service-record contract and broke Phase 3 validation expectations.
- **Fix:** Moved stable refs and bilingual bridge copy to the top-level service records and removed duplicated locale-level fields.
- **Files modified:** `_data/service_pages.yml`, `_layouts/service_detail.html`
- **Verification:** `./scripts/qa.sh`
- **Committed in:** `6fab189` (part of task commit)

---

**Total deviations:** 2 auto-fixed (2 blocking)
**Impact on plan:** Both fixes were required to make the planned Wave 0 scaffold verifiable. No scope creep.

## Issues Encountered
- The initial render-check contract was stricter than the actual route model for dossier pages, so the dossier-only marker set was narrowed to the route types that should carry it.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- Phase 3 plan 02 can now add richer dossier content onto a tested route family instead of creating route logic from scratch.
- Placeholder proof remains visible where no publishable project-backed material exists, so later plans still need selective replacement work for CASE-02 and CASE-04 depth.

## Self-Check: PASSED

- Verified `.planning/phases/03-case-study-and-proof-system/03-01-SUMMARY.md` exists.
- Verified task commits `a1405b9`, `6fab189`, `41c2779`, and `c9aac19` exist in git history.

---
*Phase: 03-case-study-and-proof-system*
*Completed: 2026-03-11*
