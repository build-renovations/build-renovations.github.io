---
phase: 01-trust-and-phone-foundation
plan: 02
subsystem: ui
tags: [jekyll, liquid, bilingual-content, cta, qa]
requires:
  - phase: 01-01
    provides: phone-first CTA shell, messenger hierarchy, sticky phone CTA
provides:
  - bilingual project-fit and first-call content contract in shared data
  - reusable project-fit and call-expectations includes for core layouts
  - route-level render checks for call-flow completeness and guidance visibility
affects: [01-03, phase-1-qa, content-architecture]
tech-stack:
  added: []
  patterns: [shared bilingual data contracts in _data, reusable guidance includes, rendered route assertions for trust surfaces]
key-files:
  created: [_data/call_flow.yml, _includes/project-fit.html, _includes/call-expectations.html]
  modified: [_data/translations.yml, _layouts/home.html, _layouts/page.html, _layouts/process.html, _layouts/service_detail.html, about/index.md, en/about/index.md, services/index.md, en/services/index.md, contact/index.md, en/contact/index.md, assets/css/site.css, scripts/phase1_render_checks.mjs]
key-decisions:
  - "Centralized project-fit and first-call guidance in _data/call_flow.yml so UA and EN layouts read from one reusable contract."
  - "Kept generic page-layout rollout opt-in via frontmatter flags while wiring home, process, and service-detail layouts directly."
  - "Extended phase render checks to enforce bilingual call-flow completeness and module visibility on required decision-path routes."
patterns-established:
  - "Call-flow content pattern: shared bilingual data feeds reusable hesitation-reduction modules instead of page-local copy."
  - "Decision-path enforcement pattern: phase QA asserts both CTA hierarchy and route-level trust-module presence."
requirements-completed: [TRST-02, CALL-02, CALL-04]
duration: 3min
completed: 2026-03-11
---

# Phase 01 Plan 02: Trust And Phone Foundation Summary

**Shared bilingual project-fit and first-call guidance modules now sit across the core decision path with render-time QA enforcing phone-first hierarchy and content completeness.**

## Performance

- **Duration:** 3 min
- **Started:** 2026-03-11T10:51:50Z
- **Completed:** 2026-03-11T10:54:42Z
- **Tasks:** 3
- **Files modified:** 16

## Accomplishments
- Added `_data/call_flow.yml` as the reusable UA/EN source for fit criteria, first-call prep, return expectations, and messenger-support microcopy.
- Built reusable `project-fit` and `call-expectations` includes with editorial styling that preserves the existing phone-primary conversion system.
- Deployed both modules across home, process, service-detail, about, services, and contact routes, then hardened render checks to verify module presence and bilingual completeness.

## Task Commits

Each task was committed atomically:

1. **Task 1: Define bilingual project-fit and first-call content contracts** - `ae454da` (feat)
2. **Task 2: Build reusable fit and call-guidance includes** - `35cd6b7` (feat)
3. **Task 3: Deploy fit and first-call guidance across key decision pages** - `40942a9` (feat)

**Plan metadata:** Recorded in the final docs commit that captures summary and planning artifacts.

## Files Created/Modified
- `_data/call_flow.yml` - Shared bilingual project-fit and first-call guidance contract.
- `_data/translations.yml` - Shared UI labels for the new modules.
- `_includes/project-fit.html` - Reusable fit module driven by shared data.
- `_includes/call-expectations.html` - Reusable first-call expectations module with phone CTA.
- `_layouts/home.html` - Adds both modules around homepage CTA and trust sections.
- `_layouts/page.html` - Renders modules for flagged generic content pages.
- `_layouts/process.html` - Inserts fit and call guidance into the process route.
- `_layouts/service_detail.html` - Adds both modules to service-detail decision pages.
- `about/index.md` - Enables shared modules and reinforces brief-first framing.
- `en/about/index.md` - English parity for about-page framing.
- `services/index.md` - Enables shared modules and adds buyer-facing call-prep framing.
- `en/services/index.md` - English parity for services-page framing.
- `contact/index.md` - Enables shared modules and aligns messenger copy with the phone-first brief.
- `en/contact/index.md` - English parity for contact-page framing.
- `assets/css/site.css` - Styles reusable fit and call-guidance modules within the established warm editorial system.
- `scripts/phase1_render_checks.mjs` - Verifies call-flow completeness, route coverage, module visibility, and messenger hierarchy.

## Decisions Made
- Centralized the new hesitation-reduction content in `_data/call_flow.yml` instead of duplicating long-form copy in multiple layouts.
- Used frontmatter flags on generic pages so the shared layout stays reusable without forcing the new modules onto unrelated page types.
- Relied on repo-local render checks rather than browser automation for signoff because the plan’s required evidence was structural route coverage and CTA hierarchy across the generated static site.

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
- None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- Phase 1 now has reusable project-fit and first-call guidance infrastructure ready for any remaining trust or proof surfaces in `01-03`.
- QA now guards the required bilingual routes against losing fit guidance, first-call guidance, or the phone-first messenger hierarchy.

## Self-Check
PASSED

- Found `.planning/phases/01-trust-and-phone-foundation/01-02-SUMMARY.md`
- Found task commits `ae454da`, `35cd6b7`, and `40942a9` in `git log --oneline --all`

---
*Phase: 01-trust-and-phone-foundation*
*Completed: 2026-03-11*
