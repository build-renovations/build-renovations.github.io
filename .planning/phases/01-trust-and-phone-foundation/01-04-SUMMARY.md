---
phase: 01-trust-and-phone-foundation
plan: 04
subsystem: ui
tags: [jekyll, copy, translations, trust, qa]
requires:
  - phase: 01-03
    provides: shared trust-strip, proof, and service-detail trust modules
provides:
  - tighter homepage service heading copy on UA and EN routes
  - more natural service-detail bridge copy for related renovation stages
  - neutral company labeling in the shared trust strip
affects: [homepage, service pages, trust strip, phase-01-validation]
tech-stack:
  added: []
  patterns: [shared bilingual copy updates through _data, validation recorded in phase artifact]
key-files:
  created: []
  modified:
    - _data/translations.yml
    - _data/trust_foundation.yml
    - _layouts/service_detail.html
    - .planning/phases/01-trust-and-phone-foundation/01-VALIDATION.md
key-decisions:
  - "Kept the trust-strip structure intact and replaced the company label with a neutral 'Company/Компанія' label instead of redesigning the module."
  - "Treated the copy polish as a shared-data pass so UA and EN remained aligned from centralized sources rather than page-specific overrides."
patterns-established:
  - "Shared homepage and service-detail copy stays in centralized translation/layout contracts."
  - "Gap-closure plans still update the phase validation artifact and rerun the full QA contract."
requirements-completed: [TRST-01, TRST-03, TRST-04]
duration: 18 min
completed: 2026-03-11
---

# Phase 01 Plan 04: Trust Copy Gap Closure Summary

**Trust-first Phase 01 copy now reads more naturally on the homepage and plumbing detail routes, while the shared trust strip uses a neutral company label and the validation log covers the gap-closure wave.**

## Performance

- **Duration:** 18 min
- **Started:** 2026-03-11T12:15:00Z
- **Completed:** 2026-03-11T12:33:35Z
- **Tasks:** 3
- **Files modified:** 4

## Accomplishments
- Replaced the awkward bilingual homepage services heading with tighter trust-first scope wording.
- Rewrote the service-detail related-work bridge sentence so it reads naturally on plumbing and other service pages.
- Removed the awkward brand-status label from the shared trust strip and recorded full 01-04 validation coverage.

## Task Commits

Each task was committed atomically:

1. **Task 1: Replace the two shared off-tone copy strings with tighter buyer-facing wording** - `e81ebf8` (fix)
2. **Task 2: Remove the awkward trust-strip company label without reopening the trust module system** - `bb83ec0` (fix)
3. **Task 3: Confirm the gap closure stays narrow and renders cleanly on the affected routes** - `b0a0e6d` (docs)

## Files Created/Modified
- `_data/translations.yml` - updated the shared UA/EN homepage services heading.
- `_layouts/service_detail.html` - replaced the shared related-work bridge sentence.
- `_data/trust_foundation.yml` - changed the trust-strip company label copy to a neutral term.
- `.planning/phases/01-trust-and-phone-foundation/01-VALIDATION.md` - marked 01-04 checks green and documented wave-4 rendered review coverage.

## Decisions Made
- Kept the trust-strip card structure unchanged and solved the trust-label issue through shared data only.
- Limited the copy pass to the exact UAT gaps so no CTA hierarchy, layout, or unrelated trust copy drifted.

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
The plain `bundle exec jekyll build` command fails under the local Ruby 4 toolchain because Liquid 4 still calls `tainted?`. The repo already ships `scripts/jekyll_compat.rb`, so verification used the existing compatibility shim for the standalone build and `./scripts/qa.sh`.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
Phase 01 is now fully covered through `01-04`, including the post-UAT copy polish wave. The shared trust and contact layer is stable and ready for phase verification or transition into Phase 2 work.

## Self-Check: PASSED

- Summary file exists on disk.
- Task commits `e81ebf8`, `bb83ec0`, and `b0a0e6d` are present in git history.
