---
phase: 05-seo-and-regression-hardening
plan: 01
subsystem: seo
tags: [structured-data, json-ld, schema-org, service-schema, faqpage-schema, render-checks, qa]

requires:
  - phase: 04-premium-ux-and-layout-hardening
    provides: stable shell, phase4 render checks, hreflang and canonical tags in head.html

provides:
  - Phase 5 render check script (scripts/phase5_render_checks.mjs) with all SEO assertions
  - Service JSON-LD block on service_detail layout pages
  - FAQPage JSON-LD block on faq translation_key pages
  - qa.sh extended to include phase5 render checks

affects:
  - 05-02 (allow_indexing flag flip — phase5 checks will pass once indexing is enabled)
  - SEO-01 canonical and hreflang coverage assertions
  - SEO-02 distinct renovation page description enforcement
  - SEO-03 Service and FAQPage schema presence

tech-stack:
  added: []
  patterns:
    - Phase render check script pattern following phase4_render_checks.mjs structure (node:fs, node:path, fail/readHtml helpers)
    - Conditional JSON-LD in Liquid using page.layout and page.translation_key guards
    - jsonify filter for safe JSON string encoding (avoids broken escape filter in Ruby 4.0 / Liquid 4.0)

key-files:
  created:
    - scripts/phase5_render_checks.mjs
  modified:
    - scripts/qa.sh
    - _includes/head.html

key-decisions:
  - "Phase 5 render checks use noindex detection as a hard fail so the quality gate is RED before Plan 02 flips allow_indexing, confirming the gate exists and will enforce the flip"
  - "jsonify filter used for JSON-LD string values instead of escape to avoid the Ruby 4.0 untaint error in Liquid's standard escape filter"
  - "Service schema fires on page.layout == service_detail and FAQPage schema fires on page.translation_key == faq to keep schema leakage impossible"

patterns-established:
  - "Render check script: RED state expected before later plan flips the flag that makes it GREEN"
  - "JSON-LD conditional guards: use page.layout for layout-specific schema, use page.translation_key for page-specific schema"
  - "jsonify over escape in JSON-LD Liquid blocks for Ruby 4.0 compat"

requirements-completed:
  - SEO-01
  - SEO-02
  - SEO-03

duration: 2min
completed: 2026-03-13
---

# Phase 05 Plan 01: SEO Render Checks and Structured Data Summary

**Phase 5 quality gate script and Service/FAQPage JSON-LD blocks wired into the site before the allow_indexing flip**

## Performance

- **Duration:** ~2 min
- **Started:** 2026-03-13T07:55:50Z
- **Completed:** 2026-03-13T07:57:59Z
- **Tasks:** 2
- **Files modified:** 3

## Accomplishments

- Created `scripts/phase5_render_checks.mjs` (207 lines) with all SEO assertion functions: noindex, canonical, hreflang pairs, sitemap, Service schema, FAQPage schema, placeholder identity, distinct renovation descriptions
- Extended `scripts/qa.sh` to run phase5 checks after phase4 checks, making the automated quality gate continuous
- Added conditional Service JSON-LD block to `_includes/head.html` (fires only on service_detail layout pages)
- Added conditional FAQPage JSON-LD block to `_includes/head.html` (fires only on pages with translation_key == 'faq')

## Task Commits

Each task was committed atomically:

1. **Task 1: Write phase5_render_checks.mjs and register in qa.sh** - `81fc54c` (feat)
2. **Task 2: Add Service and FAQPage JSON-LD to head.html** - `6749800` (feat)

## Files Created/Modified

- `scripts/phase5_render_checks.mjs` - Phase 5 SEO render check script with noindex, canonical, hreflang, sitemap, Service schema, FAQPage schema, placeholder identity, and distinct description checks
- `scripts/qa.sh` - Added `node ./scripts/phase5_render_checks.mjs` after phase4 line
- `_includes/head.html` - Added Service JSON-LD block (service_detail guard) and FAQPage JSON-LD block (faq translation_key guard)

## Decisions Made

- Phase 5 render checks are intentionally RED on noindex (current state: `allow_indexing: false`). This confirms the quality gate is installed and will fail if Plan 02 does not flip the flag.
- Used `jsonify` filter instead of `escape` for JSON string values in JSON-LD Liquid blocks. The `escape` filter calls `.untaint` which is removed in Ruby 4.0 and throws `NoMethodError`. `jsonify` produces valid JSON-encoded strings without the compatibility issue.
- Service schema fires exclusively on `page.layout == 'service_detail'` and FAQPage schema fires exclusively on `page.translation_key == 'faq'` to prevent schema leakage to other pages.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Replaced escape filter with jsonify in Service JSON-LD block**
- **Found during:** Task 2 (Add Service and FAQPage JSON-LD to head.html)
- **Issue:** Plan specified `| escape` filter for JSON string values in JSON-LD Liquid, but Liquid 4.0.3 / Ruby 4.0 removed `.untaint` which the escape filter calls internally, causing `NoMethodError` and a build failure
- **Fix:** Replaced all `| escape` occurrences in the new JSON-LD blocks with `| jsonify`, which produces correctly JSON-encoded strings without the Ruby 4.0 incompatibility
- **Files modified:** `_includes/head.html`
- **Verification:** Build passed, Service schema present on plumbing/apartment/house pages, FAQPage schema present on faq page, FAQPage absent from home
- **Committed in:** `6749800` (Task 2 commit)

---

**Total deviations:** 1 auto-fixed (Rule 1 - Bug)
**Impact on plan:** Auto-fix essential for build to succeed on Ruby 4.0. No scope creep.

## Issues Encountered

- Ruby 4.0 removed `String#untaint` method, breaking Liquid's `escape` filter. Resolved by using `jsonify` filter, which the project already uses in FAQPage blocks as planned.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Phase 5 quality gate is installed and active (RED state — fails on noindex as expected)
- Service JSON-LD verified present on all three service-detail UA pages
- FAQPage JSON-LD verified present on faq UA page and absent from home
- Plan 02 can now flip `allow_indexing: true` and the phase5 checks will validate all SEO conditions pass

---
*Phase: 05-seo-and-regression-hardening*
*Completed: 2026-03-13*
