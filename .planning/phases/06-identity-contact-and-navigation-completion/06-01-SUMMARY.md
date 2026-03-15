---
phase: 06-identity-contact-and-navigation-completion
plan: 01
subsystem: ui
tags: [jekyll, navigation, seo, render-checks, brand]

# Dependency graph
requires:
  - phase: 05-seo-and-regression-hardening
    provides: phase5_render_checks.mjs pattern, qa.sh render check pipeline

provides:
  - Brand name corrected to Рівень in _config.yml, index.md, en/index.md seo titles
  - Projects nav link added to both uk and en navigation locales
  - phase6_render_checks.mjs with brand name, nav presence, and messenger placeholder gates
  - qa.sh wired with phase6 render checks
affects: [06-02, seo, contact-page-checks]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Phase N render check pattern: standalone .mjs script with fail() helper, readHtml(), and named check functions — wired into qa.sh sequentially"

key-files:
  created:
    - scripts/phase6_render_checks.mjs
  modified:
    - scripts/qa.sh
    - _config.yml
    - _data/navigation.yml
    - index.md
    - en/index.md

key-decisions:
  - "Phase 6 render checks include messenger placeholder gate (checkNoPlaceholderMessengers) that intentionally stays red until plan 06-02 supplies real handles from the owner"
  - "Brand name in page-level seo_title frontmatter (index.md, en/index.md) must be updated alongside _config.yml since page frontmatter overrides config seo title fallback"

patterns-established:
  - "seo_title frontmatter on home pages overrides _config.yml seo.uk.title fallback — both must be updated together when changing brand name"

requirements-completed: [TRST-01, CASE-03]

# Metrics
duration: 4min
completed: 2026-03-15
---

# Phase 6 Plan 01: Identity, Contact and Navigation Completion Summary

**Phase 6 render check script created with brand name, nav presence, and messenger placeholder gates; brand title corrected to Рівень across config and home page frontmatter; /projects/ nav links added to uk and en locales**

## Performance

- **Duration:** ~4 min
- **Started:** 2026-03-15T14:57:42Z
- **Completed:** 2026-03-15T15:01:22Z
- **Tasks:** 2
- **Files modified:** 6

## Accomplishments

- Created `scripts/phase6_render_checks.mjs` with `checkBrandName`, `checkProjectsNav`, and `checkNoPlaceholderMessengers` functions, following Phase 5 script pattern exactly
- Fixed brand name from "Remonty" to "Рівень" in `_config.yml` (title, seo.uk.title, seo.en.title) and home page frontmatter (index.md, en/index.md)
- Added "Проєкти" → `/projects/` and "Projects" → `/en/projects/` to `_data/navigation.yml` for both locales
- Wired `phase6_render_checks.mjs` into `scripts/qa.sh` after phase5 checks

## Task Commits

Each task was committed atomically:

1. **Task 1: Create phase6_render_checks.mjs and wire into qa.sh** - `3cb4e19` (feat)
2. **Task 2: Fix brand name in _config.yml and add projects to navigation.yml** - `8e962aa` (feat)

**Plan metadata:** TBD (docs: complete plan)

_Note: Task 1 was treated as TDD — script created first, then data changes in Task 2 turn most checks green._

## Files Created/Modified

- `scripts/phase6_render_checks.mjs` - Phase 6 automated render checks: brand name correctness, nav link presence, messenger placeholder detection
- `scripts/qa.sh` - Added `node ./scripts/phase6_render_checks.mjs` after phase5 invocation
- `_config.yml` - Updated `title`, `seo.uk.title`, `seo.en.title` from Remonty to Рівень
- `_data/navigation.yml` - Added Проєкти/projects entries before Контакти/Contact in uk and en arrays
- `index.md` - Updated `title` and `seo_title` frontmatter from Remonty to Рівень
- `en/index.md` - Updated `title` and `seo_title` frontmatter from Remonty to Рівень

## Decisions Made

- Phase 6 render checks include the `checkNoPlaceholderMessengers` gate which intentionally remains red until plan 06-02 (autonomous: false, owner-supplied messenger handles) runs. This is by design — the check functions as a gate enforcing that real handles are provided before the contact page is considered production-ready.
- Brand name in page-level seo_title frontmatter on home pages overrides the _config.yml seo title fallback — both must be updated together when rebranding.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed page-level seo_title frontmatter overriding _config.yml brand name**
- **Found during:** Task 2 (Fix brand name in _config.yml and add projects to navigation.yml)
- **Issue:** After updating `_config.yml` title fields, `_site/index.html` `<title>` still showed "Remonty" because `index.md` and `en/index.md` had hardcoded `seo_title: "Remonty | ..."` frontmatter that takes priority (line 6 of `_includes/head.html` checks `page.seo_title` first)
- **Fix:** Updated `title` and `seo_title` frontmatter in both `index.md` and `en/index.md` to use "Рівень"
- **Files modified:** `index.md`, `en/index.md`
- **Verification:** `grep -E '<title>|og:title' _site/index.html` and `_site/en/index.html` confirm "Рівень" in output
- **Committed in:** `8e962aa` (Task 2 commit)

---

**Total deviations:** 1 auto-fixed (Rule 1 - Bug)
**Impact on plan:** Essential fix — _config.yml alone was insufficient due to page-level frontmatter override. No scope creep.

## Issues Encountered

- `checkNoPlaceholderMessengers` check in `phase6_render_checks.mjs` causes `qa.sh` to exit non-zero because `_data/contact_channels.yml` still has placeholder messenger URLs (`telegram_phase1_contact`, `AQExamplePhase1`, `send?phone=380000000000`). This is the expected state at the end of plan 06-01 — the messenger gate is intentionally red, requiring plan 06-02 (autonomous: false) to supply real owner-provided handles. Brand name and nav checks pass cleanly.

## User Setup Required

None required for this plan. Plan 06-02 will require owner-supplied messenger handles (Telegram username, Viber invite link, WhatsApp phone number).

## Next Phase Readiness

- Plan 06-02 (autonomous: false) is ready to execute once the owner provides real Telegram, Viber, and WhatsApp handles
- Brand name corrections are in place; `qa.sh` will be fully green after 06-02 supplies real messenger handles
- Navigation structure is complete with /projects/ links in both locales

---
*Phase: 06-identity-contact-and-navigation-completion*
*Completed: 2026-03-15*
