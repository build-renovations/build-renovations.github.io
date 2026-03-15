---
phase: 07-qa-coverage-extension
plan: 01
subsystem: testing
tags: [qa, render-checks, dossier-routes, service-routes, coverage]

# Dependency graph
requires:
  - phase: 06-identity-contact-and-navigation-completion
    provides: final identity/contact surface established and qa.sh pipeline in place
provides:
  - Full render-check coverage for all 5 dossier routes (uk + en) in phase3 and phase4
  - Full render-check coverage for all 8 service routes in phase5
  - qa.sh green for entire v1.0 site surface
affects: [deploy-readiness, regression-detection, v1.0-sign-off]

# Tech tracking
tech-stack:
  added: []
  patterns: [additive-only extension of declarative route arrays in render check scripts]

key-files:
  created: []
  modified:
    - scripts/phase3_render_checks.mjs
    - scripts/phase4_render_checks.mjs
    - scripts/phase5_render_checks.mjs

key-decisions:
  - "QA coverage extended additively — no existing entries, check logic, or marker constants modified"
  - "Service schema checks in phase5 fire on all 8 service routes including the 5 newly added"

patterns-established:
  - "Render check scripts are extended by appending to declarative arrays only — logic stays unchanged"

requirements-completed: [CASE-01, CASE-04, SEO-02, SEO-03]

# Metrics
duration: 6min
completed: 2026-03-15
---

# Phase 7 Plan 01: QA Coverage Extension Summary

**Extended phase3, phase4, and phase5 render-check scripts to cover all 5 dossier routes and all 8 service routes, eliminating the silent regression window for the full v1.0 site surface**

## Performance

- **Duration:** 6 min
- **Started:** 2026-03-15T14:40:02Z
- **Completed:** 2026-03-15T14:46:00Z
- **Tasks:** 3
- **Files modified:** 3

## Accomplishments

- phase3_render_checks.mjs now checks apartment-system-renovation, wet-zone-control, and controlled-handover in both routeChecks (uk + en) and metadataPairs
- phase4_render_checks.mjs now checks the same 3 dossiers in both routeChecks and parityPairs — premium shell surface parity enforced on all 5 dossiers
- phase5_render_checks.mjs now covers all 8 service routes (electrical, finishing, rough-works, procurement, site-supervision added) in checkedRoutes, serviceDetailRoutes, and bilingualPairs — Service schema validated on all 8
- qa.sh exits 0 with all six render check scripts green

## Task Commits

1. **Task 1: Add 3 missing dossier routes to phase3_render_checks.mjs** - `36c0035` (feat)
2. **Task 2: Add 3 missing dossier routes to phase4_render_checks.mjs** - `192da74` (feat)
3. **Task 3: Add 5 missing service routes to phase5_render_checks.mjs** - `e69e30b` (feat)

## Files Created/Modified

- `scripts/phase3_render_checks.mjs` - Added 6 dossier route entries to routeChecks and 3 pairs to metadataPairs
- `scripts/phase4_render_checks.mjs` - Added 6 dossier route entries to routeChecks and 3 pairs to parityPairs
- `scripts/phase5_render_checks.mjs` - Added 10 service route entries to checkedRoutes and serviceDetailRoutes, and 5 pairs to bilingualPairs

## Decisions Made

- Extended scripts additively only — no existing entries or check logic changed to preserve green baseline
- Service schema gate in phase5 automatically applies to the 5 newly added routes because `checkServiceSchema` checks against `serviceDetailRoutes`

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- All render check scripts now cover the full v1.0 site surface
- qa.sh is the single regression gate for all routes before any future deploy
- Phase 7 plan 02 can proceed (or v1.0 may be considered complete pending phase 07-02 scope)

---
*Phase: 07-qa-coverage-extension*
*Completed: 2026-03-15*
