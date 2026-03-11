---
phase: 03-case-study-and-proof-system
plan: 02
subsystem: ui
tags: [jekyll, case-studies, bilingual, proof-system, content]
requires:
  - phase: 03-case-study-and-proof-system
    provides: project-proof route family, case-study layout, and Phase 3 rendered QA checks
provides:
  - three new bilingual dossier route pairs for apartment systems, wet-zone control, and controlled handover
  - publishable dossier records grounded in repo-owned images and stage logic
  - buyer-relevance blocks with service and property route context high on each dossier
affects: [phase-03-plan-03, phase-03-plan-04, qa]
tech-stack:
  added: []
  patterns: [data-thick dossier entries, thin bilingual route wrappers, early buyer-relevance route linking]
key-files:
  created: [projects/apartment-system-renovation/index.md, en/projects/apartment-system-renovation/index.md, projects/wet-zone-control/index.md, en/projects/wet-zone-control/index.md, projects/controlled-handover/index.md, en/projects/controlled-handover/index.md, .planning/phases/03-case-study-and-proof-system/03-02-SUMMARY.md]
  modified: [_data/case_studies.yml, _layouts/case_study.html]
key-decisions:
  - "The first dossier rollout adds new publishable project keys instead of replacing the Phase 3 foundation examples, so existing proof integrations keep working while the named routes from this plan go live."
  - "Buyer relevance now includes linked service and property routes high on the page so visitors understand the practical fit before the detailed stage timeline."
patterns-established:
  - "Phase 3 dossier copy uses honest labels such as before finishing, during concealed work, and before controlled handover when a true starting photo does not exist."
  - "Thin dossier route files keep metadata and selector keys only; all long-form project proof stays in `_data/case_studies.yml`."
requirements-completed: [CASE-01, CASE-02, CASE-04]
duration: 6min
completed: 2026-03-11
---

# Phase 3 Plan 02: Dossier Rollout Summary

**Three publishable bilingual renovation dossiers grounded in real repo-owned images, honest stage labels, and buyer-facing relevance framing**

## Performance

- **Duration:** 6 min
- **Started:** 2026-03-11T19:36:06Z
- **Completed:** 2026-03-11T19:41:48Z
- **Tasks:** 3
- **Files modified:** 8

## Accomplishments
- Added three publishable bilingual dossier records to `_data/case_studies.yml` for an apartment-system route, a wet-zone control route, and a controlled-handover route.
- Published six thin route wrappers under `/projects/` and `/en/projects/` that preserve bilingual metadata parity while reading only from shared dossier data.
- Raised buyer relevance near the top of every dossier and exposed linked service and property routes before visitors reach the stage-by-stage breakdown.

## Task Commits

Each task was committed atomically:

1. **Task 1: Author the first dossier data from existing project material** - `a067e81` (feat)
2. **Task 2: Publish bilingual dossier route pairs with honest stage storytelling** - `be11ab6` (feat)
3. **Task 3: Embed explicit buyer-relevance framing in every dossier** - `3f0f675` (feat)

**Plan metadata:** recorded in the final docs commit for this plan

## Files Created/Modified
- `_data/case_studies.yml` - Shared dossier contract now includes three additional publishable project-backed entries with bilingual snapshot, stage, gallery, bridge, and buyer-relevance content.
- `_layouts/case_study.html` - Buyer-relevance section now also surfaces related service and property links high on the page.
- `projects/apartment-system-renovation/index.md` - Ukrainian dossier wrapper for the apartment system route.
- `en/projects/apartment-system-renovation/index.md` - English dossier wrapper for the apartment system route.
- `projects/wet-zone-control/index.md` - Ukrainian dossier wrapper for the wet-zone control route.
- `en/projects/wet-zone-control/index.md` - English dossier wrapper for the wet-zone control route.
- `projects/controlled-handover/index.md` - Ukrainian dossier wrapper for the controlled-handover route.
- `en/projects/controlled-handover/index.md` - English dossier wrapper for the controlled-handover route.

## Decisions Made
- Kept the earlier Phase 3 foundation dossiers in place and introduced the plan-specific slugs as additional publishable items, avoiding unrelated service-page or trust-bridge churn during this execution.
- Stored all long-form dossier content, stage logic, and proof-source framing in `_data/case_studies.yml` so the six route files remain thin bilingual wrappers.
- Used explicit, honest stage labels in dossier copy wherever the image set shows mid-stage or pre-handover conditions rather than a literal start-to-finish before/after pair.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Quoted colon-heavy dossier strings so YAML parsing succeeds**
- **Found during:** Task 1 (Author the first dossier data from existing project material)
- **Issue:** Several new bilingual copy strings contained additional `:` characters and broke `_data/case_studies.yml` parsing.
- **Fix:** Quoted the affected values and reran the YAML verification command.
- **Files modified:** `_data/case_studies.yml`
- **Verification:** `bundle exec ruby -e 'require "yaml"; YAML.load_file("_data/case_studies.yml")'`
- **Committed in:** `a067e81` (part of task commit)

---

**Total deviations:** 1 auto-fixed (1 blocking)
**Impact on plan:** The fix was required for data integrity and did not change scope.

## Issues Encountered
- A stale `.git/index.lock` briefly blocked the first commit attempt. No active Git process was running, and the follow-up commit succeeded without changing repository content.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- Phase 3 plan 03 can now connect these richer named dossiers into more entry surfaces and proof-replacement flows without creating additional route scaffolding.
- The route family, dossier contract, and QA suite remain green after the content rollout, so later plans can focus on integration depth rather than foundation repair.

## Self-Check: PASSED

- Verified `.planning/phases/03-case-study-and-proof-system/03-02-SUMMARY.md` exists.
- Verified task commits `a067e81`, `be11ab6`, and `3f0f675` exist in git history.

---
*Phase: 03-case-study-and-proof-system*
*Completed: 2026-03-11*
