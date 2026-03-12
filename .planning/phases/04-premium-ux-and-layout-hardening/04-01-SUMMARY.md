---
phase: 04-premium-ux-and-layout-hardening
plan: 01
subsystem: ui
tags: [jekyll, css, javascript, qa, browser-review, ux]
requires:
  - phase: 03-case-study-and-proof-system
    provides: existing dossier routes, featured case-study bridges, and rendered QA scaffolding reused by Phase 4
provides:
  - phase 4 rendered QA coverage for premium shell markers and UA/EN parity
  - shared shell spacing and scan-rhythm hooks for core layout families
  - calmer motion defaults for reveal and tilt behavior
affects: [phase-04-plan-02, phase-04-plan-03, phase-04-plan-04, qa]
tech-stack:
  added: [node render check script]
  patterns: [data-phase4-marker layout contracts, additive rendered QA, calm-motion shell behavior]
key-files:
  created: [scripts/phase4_render_checks.mjs]
  modified: [assets/css/site.css, assets/js/site.js, _layouts/default.html, _layouts/home.html, _layouts/process.html, _layouts/service_detail.html, _layouts/case_study.html, scripts/qa.sh, .planning/phases/04-premium-ux-and-layout-hardening/04-VALIDATION.md]
key-decisions:
  - "Phase 4 QA stays additive: the default qa.sh path now runs Phase 1 through Phase 4 render checks together."
  - "Phase 4 parity is enforced through shared data-phase4-surface contracts so UA and EN route pairs must keep the same shell markers."
  - "Motion was narrowed to hero/media tilt and higher-level reveal groups so premium polish reads calmer instead of animating every card equally."
patterns-established:
  - "Phase 4 route guardrails: body, sticky CTA, and core layout shells expose stable data-phase4 markers for rendered QA."
  - "Phase 4 browser sign-off uses a desktop/mobile route matrix recorded in 04-VALIDATION.md rather than ad hoc review."
requirements-completed: [UX-01, UX-02, UX-03]
duration: 12m
completed: 2026-03-12
---

# Phase 4 Plan 1: Shared Shell Guardrails Summary

**Phase 4 rendered QA, shared premium-shell markers, and calmer motion hooks for the core bilingual layout families**

## Performance

- **Duration:** 12m
- **Started:** 2026-03-12T08:21:00Z
- **Completed:** 2026-03-12T08:33:22Z
- **Tasks:** 3
- **Files modified:** 10

## Accomplishments
- Added `scripts/phase4_render_checks.mjs` and wired it into `./scripts/qa.sh` so premium-shell, scan-rhythm, CTA stability, and UA/EN parity regressions fail in the default QA path.
- Tagged the default, home, process, service-detail, and case-study layout families with stable Phase 4 marker surfaces that later premium-polish plans can reuse safely.
- Introduced shared shell spacing hooks and calmer motion behavior in the shared CSS and JS without adding any GitHub Pages-incompatible dependencies.

## Task Commits

Each task was committed atomically:

1. **Task 1: Install Phase 4 render checks and layout markers** - `321a100` (feat)
2. **Task 2: Define shared shell and motion hardening hooks** - `06d18e1` (feat)
3. **Task 3: Record validation ownership and browser matrix** - `8f734c3` (docs)

## Files Created/Modified
- `scripts/phase4_render_checks.mjs` - validates Phase 4 markers, CTA stability, language switching, and parity across target route pairs.
- `scripts/qa.sh` - runs the new Phase 4 render checks as part of the default QA path.
- `_layouts/default.html` - exposes shared premium-shell, contact-shell, and sticky CTA markers plus the calm-motion root flag.
- `_layouts/home.html` - marks home hero and long-page rhythm surfaces for Phase 4 validation.
- `_layouts/process.html` - marks process hero and scannability surfaces for Phase 4 validation.
- `_layouts/service_detail.html` - marks service hero and long-route pacing surfaces for Phase 4 validation.
- `_layouts/case_study.html` - marks dossier hero and stage/snapshot surfaces for Phase 4 validation.
- `assets/css/site.css` - adds shared shell spacing tokens, scan-rhythm surface styling, and calmer motion timing.
- `assets/js/site.js` - reduces tilt scope and limits reveal behavior to higher-priority surfaces with reduced-motion handling.
- `.planning/phases/04-premium-ux-and-layout-hardening/04-VALIDATION.md` - records Wave 0 ownership, route coverage, and the desktop/mobile browser matrix.

## Decisions Made
- Kept Phase 4 QA additive to preserve earlier trust, content, and proof checks while adding premium-layout guardrails.
- Used shared `data-phase4-surface` contracts instead of route-specific string checks so later plans can extend the same parity model.
- Treated motion hardening as a shared-shell concern and narrowed animation scope before route-level redesign begins.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Resolved a transient git index lock during the Task 1 commit**
- **Found during:** Task 1 (Install Phase 4 render checks and layout markers)
- **Issue:** `git commit` failed once because `.git/index.lock` was reported as present.
- **Fix:** Verified no active git process remained, retried the commit once the stale lock cleared, and continued without changing repository content.
- **Files modified:** None
- **Verification:** Task 1 commit succeeded on retry and the full `./scripts/qa.sh` suite remained green.
- **Committed in:** `321a100` (part of task commit)

---

**Total deviations:** 1 auto-fixed (1 blocking)
**Impact on plan:** No scope creep. The only deviation was a repository-state blocker during commit, not an implementation change.

## Issues Encountered
- Browser automation blocks `file:` URLs, so rendered review used a temporary local HTTP server against `_site` for desktop and mobile spot-checks.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- Phase 4 now has shared shell hooks and render guardrails, so later plans can focus on route-level premium composition instead of inventing QA from scratch.
- `04-VALIDATION.md` now defines the browser-review matrix that later Phase 4 plans should update as they touch additional route pairs.

## Self-Check
PASSED

---
*Phase: 04-premium-ux-and-layout-hardening*
*Completed: 2026-03-12*
