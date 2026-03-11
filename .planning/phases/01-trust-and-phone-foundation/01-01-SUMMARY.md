---
phase: 01-trust-and-phone-foundation
plan: 01
subsystem: ui
tags: [jekyll, github-pages, cta, phone, qa, localization]
requires: []
provides:
  - shared phone-first contact contract in config and data files
  - reusable primary phone CTA and secondary messenger shell includes
  - rendered QA guardrails for tel links, placeholder labeling, and sticky CTA spacing
affects: [phase-02-content-architecture-expansion, phase-04-premium-ux-and-layout-hardening, phase-05-seo-and-regression-hardening]
tech-stack:
  added: [node-render-check-script]
  patterns: [shared-contact-data-contract, reusable-liquid-cta-includes, rendered-route-validation]
key-files:
  created: [_data/contact_channels.yml, _includes/primary-phone-cta.html, _includes/contact-options.html, scripts/phase1_render_checks.mjs]
  modified: [_config.yml, _data/translations.yml, _includes/header.html, _includes/footer.html, _layouts/default.html, _layouts/home.html, _layouts/process.html, _layouts/service_detail.html, assets/css/site.css, assets/js/site.js, scripts/qa.sh]
key-decisions:
  - "Kept canonical business facts in _config.yml and moved bilingual channel presentation into _data/contact_channels.yml."
  - "Rendered the messenger block globally in the default shell so every primary route inherits the same secondary-contact hierarchy."
  - "Used CSS and lightweight JS body state to reserve mobile space for the sticky phone CTA instead of per-page spacing hacks."
patterns-established:
  - "Shared contact contract: canonical contact facts in site config, bilingual labels and channel URLs in _data/contact_channels.yml."
  - "Primary CTA include pattern: phone-first actions render through _includes/primary-phone-cta.html across layouts and shell surfaces."
  - "Rendered QA pattern: scripts/qa.sh now enforces route-level tel visibility and sticky CTA safety through scripts/phase1_render_checks.mjs."
requirements-completed: [TRST-01, CALL-01, CALL-03]
duration: 6min
completed: 2026-03-11
---

# Phase 1 Plan 1: Trust And Phone Foundation Summary

**Phone-first global shell with centralized placeholder-safe contact data, reusable CTA includes, and rendered QA for bilingual core routes**

## Performance

- **Duration:** 6 min
- **Started:** 2026-03-11T12:41:36+02:00
- **Completed:** 2026-03-11T12:47:22+02:00
- **Tasks:** 3
- **Files modified:** 15

## Accomplishments
- Added a CI-safe rendered QA layer that now blocks missing shared contact data, unlabeled placeholder identity, missing tel links, and sticky CTA regressions.
- Centralized Phase 1 business identity and bilingual channel presentation so visible CTA copy and canonical contact facts come from shared data.
- Replaced contact-page detours with direct call actions in the default shell, homepage, process page, and service-detail layout, with a mobile sticky CTA and clearly secondary messenger options.

## Task Commits

Each task was committed atomically:

1. **Task 1: Establish Phase 1 guardrail automation first** - `1c96458` (test)
2. **Task 2: Create the shared contact and identity contract** - `471d5fb` (feat)
3. **Task 3: Build the global phone-first CTA shell** - `8a26062` (feat)

**Plan metadata:** Pending state-doc commit

## Files Created/Modified
- `_data/contact_channels.yml` - Shared bilingual presentation contract for phone, messenger, and email CTA hierarchy.
- `_includes/primary-phone-cta.html` - Reusable tel CTA include for header, page heroes, banners, and sticky mobile action.
- `_includes/contact-options.html` - Global secondary contact shell with localized messenger and email support.
- `_layouts/default.html` - Inserts the shared contact shell and sticky CTA into every page using the default layout.
- `assets/css/site.css` - Adds contact-shell, phone-button, and sticky CTA styling plus mobile spacing safeguards.
- `assets/js/site.js` - Toggles mobile sticky CTA state and body spacing without introducing heavy client-side behavior.
- `scripts/phase1_render_checks.mjs` - Validates placeholder policy, bilingual contact completeness, route-level tel links, and sticky CTA contract.

## Decisions Made
- Kept `_config.yml` as the canonical source for business identity so existing schema and global template references continue to work.
- Used `_data/contact_channels.yml` for bilingual contact-surface presentation to avoid scattering messenger labels and URLs through templates.
- Rendered secondary contact options in the default shell instead of individual pages so route parity is enforced by construction.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Normalized messenger placeholder URLs to match the rendered validation contract**
- **Found during:** Task 3 (Build the global phone-first CTA shell)
- **Issue:** The initial Telegram and WhatsApp placeholder URLs did not satisfy the named-messenger route audit, so QA still failed after the shell was wired.
- **Fix:** Replaced those placeholder URLs with absolute Telegram and WhatsApp endpoints that preserve the same centralized data contract while satisfying rendered route validation.
- **Files modified:** `_data/contact_channels.yml`
- **Verification:** `./scripts/qa.sh`
- **Committed in:** `8a26062` (part of Task 3 commit)

---

**Total deviations:** 1 auto-fixed (1 blocking)
**Impact on plan:** The fix stayed inside the planned shared contact contract and was necessary for the route-level QA guardrail to pass.

## Issues Encountered
- The repository already loaded `assets/js/site.js` through `_includes/head.html`, so the initial default-layout script tag was removed to avoid duplicate execution.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- Phase 1 now has a reusable contact shell and guardrails that later trust and content work can build on without re-solving CTA placement.
- Production business name, phone, email, service-area values, and messenger handles still need replacement in a later pass before launch.

## Self-Check: PASSED
