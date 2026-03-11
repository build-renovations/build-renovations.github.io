---
phase: 03-case-study-and-proof-system
plan: 04
subsystem: ui
tags: [jekyll, liquid, case-studies, qa]
requires:
  - phase: 03-01
    provides: Phase 3 route family, dossier layout scaffold, and rendered QA markers
  - phase: 03-02
    provides: Publishable dossier content, buyer-relevance framing, and bilingual route pairs
  - phase: 03-03
    provides: Featured dossier integrations and placeholder-proof replacement rules
provides:
  - Buyer-concern grouped project indexes in Ukrainian and English
  - Dossier pages with a tighter scan order for proof status, buyer relevance, stage logic, and evidence
  - Final Phase 3 validation sign-off with CASE coverage recorded as green
affects: [phase-04-premium-ux-and-layout-hardening, phase-05-seo-and-regression-hardening]
tech-stack:
  added: []
  patterns: [buyer-concern proof grouping, scan-first dossier sequencing, additive rendered validation]
key-files:
  created: [.planning/phases/03-case-study-and-proof-system/03-04-SUMMARY.md]
  modified: [_data/case_studies.yml, _includes/featured-case-studies.html, projects/index.md, en/projects/index.md, _layouts/case_study.html, .planning/phases/03-case-study-and-proof-system/03-VALIDATION.md]
key-decisions:
  - "Project indexes now group dossiers by buyer concern so visitors can choose proof by risk instead of scanning a flat list."
  - "Case-study pages surface snapshot and proof-status cues before deeper buyer-relevance and stage detail so dossier pages stay scannable."
  - "Phase 3 sign-off happens only after the full QA suite stays green with explicit CASE coverage and replacement-policy checks."
patterns-established:
  - "Buyer-concern grouping: projects index sections come from shared `_data/case_studies.yml` concern groups rather than page-local lists."
  - "Scan-first dossiers: snapshot, buyer relevance, stage logic, proof evidence, and next-route guidance stay in a stable reading order."
requirements-completed: [CASE-02, CASE-04]
duration: 5m
completed: 2026-03-11
---

# Phase 3 Plan 4: Relevance Framing And Sign-Off Summary

**Buyer-concern project grouping, scan-first dossier sequencing, and truthful Phase 3 CASE sign-off across the full proof route family**

## Performance

- **Duration:** 4m 47s
- **Started:** 2026-03-11T19:58:23Z
- **Completed:** 2026-03-11T20:03:10Z
- **Tasks:** 3
- **Files modified:** 6

## Accomplishments
- Reworked `/projects/` and `/en/projects/` into grouped proof-selection surfaces organized by buyer concern.
- Tightened case-study pages so the most important proof cues appear in a faster scan order without turning dossiers into text walls.
- Closed Phase 3 validation with green execution rows, explicit CASE closure notes, and `nyquist_compliant: true`.

## Task Commits

Each task was committed atomically:

1. **Task 1: Improve project-index scanning by buyer concern and route relevance** - `52e06d3` (feat)
2. **Task 2: Tighten dossier scannability and relevance language** - `4cb0c15` (feat)
3. **Task 3: Finalize Phase 3 validation and sign-off** - `5a5fe4a` (docs)

**Plan metadata:** recorded in the final docs commit after state and roadmap updates.

## Files Created/Modified
- `_data/case_studies.yml` - Added shared concern-group definitions and dossier scan labels used by the project index and dossier cards.
- `_includes/featured-case-studies.html` - Exposes clearer scan cues for each case-study card.
- `projects/index.md` - Ukrainian projects index now explains how to choose proof and renders grouped dossier sections.
- `en/projects/index.md` - English projects index mirrors the grouped proof-selection model.
- `_layouts/case_study.html` - Reordered dossier surfaces around snapshot, buyer relevance, stage logic, proof evidence, and next-route flow.
- `.planning/phases/03-case-study-and-proof-system/03-VALIDATION.md` - Records all Phase 3 execution rows as green and closes the Nyquist gate.

## Decisions Made
- Project selection by buyer concern is more useful than a single featured block because the user can identify a relevant dossier before opening every route.
- Dossier pages should surface proof-source status inside the opening scan section instead of burying it after longer narrative blocks.
- The validation artifact remains the source of truth for CASE closure, so final sign-off updates belong there rather than only in this summary.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Corrected Jekyll include syntax for grouped project sections**
- **Found during:** Task 1 (Improve project-index scanning by buyer concern and route relevance)
- **Issue:** Liquid include parameters cannot apply a filter inline, which broke `./scripts/qa.sh` on the first pass.
- **Fix:** Assigned the alternating section accent flag before each include call and passed the variable directly.
- **Files modified:** `projects/index.md`, `en/projects/index.md`
- **Verification:** `./scripts/qa.sh`
- **Committed in:** `52e06d3` (part of task commit)

---

**Total deviations:** 1 auto-fixed (1 blocking)
**Impact on plan:** The fix was required for Jekyll compatibility and kept the plan scope unchanged.

## Issues Encountered
- The first QA run failed on a Liquid include syntax error after the grouped index sections were introduced. The issue was fixed immediately and the suite passed on rerun.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- Phase 3 is fully closed and its proof routes are now ready for Phase 4 design and layout hardening work.
- The grouped project index and scan-first dossier order give Phase 4 a stable structure to refine visually without changing the proof contract.

## Self-Check
PASSED
- Found `.planning/phases/03-case-study-and-proof-system/03-04-SUMMARY.md`
- Found task commits `52e06d3`, `4cb0c15`, and `5a5fe4a`

---
*Phase: 03-case-study-and-proof-system*
*Completed: 2026-03-11*
