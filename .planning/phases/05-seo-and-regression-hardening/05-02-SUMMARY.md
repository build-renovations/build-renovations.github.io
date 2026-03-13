---
phase: 05-seo-and-regression-hardening
plan: 02
subsystem: seo
tags: [jekyll, seo, structured-data, robots, indexing, business-identity]

requires:
  - phase: 05-01
    provides: Phase 5 render checks including noindex detection and distinct seo_description enforcement

provides:
  - Real business identity in _config.yml (name "Рівень", real phone)
  - Email removed from site entirely — not displayed anywhere
  - seo.allow_indexing flipped to true — site is now crawlable
  - JSON-LD schema emits real company name and phone (no email)
  - robots.txt allows all crawlers and references sitemap.xml
  - All qa.sh Phase 1-5 checks pass

affects: [deployment, seo-monitoring, google-search-console]

tech-stack:
  added: []
  patterns:
    - "_config.yml company block is the single source of truth for business identity — all templates reference it, no duplication"
    - "Email field is absent from _config.yml; templates reference nothing — clean omission, no broken references"

key-files:
  created: []
  modified:
    - _config.yml
    - _includes/head.html
    - _includes/footer.html
    - _includes/contact-options.html
    - contact/index.md
    - en/contact/index.md
    - _data/contact_channels.yml
    - _data/translations.yml

key-decisions:
  - "Email dropped from the website entirely at owner's request — removed from _config.yml, JSON-LD, footer, contact-options, contact pages, and data files; no broken references remain"
  - "phase1_placeholder.fields narrowed to only service_area.uk and service_area.en — name and phone are now real values and no longer need policy protection"

patterns-established:
  - "Removing a company field: remove from _config.yml, then grep all templates/includes/_data for references and remove each"

requirements-completed: [SEO-01, SEO-02, SEO-03]

duration: 15min
completed: 2026-03-13
---

# Phase 5 Plan 02: Business Identity and Indexing Enable Summary

**Real company identity ("Рівень", live phone) committed to _config.yml with email removed site-wide and seo.allow_indexing flipped to true — site is now fully crawlable**

## Performance

- **Duration:** 15 min
- **Started:** 2026-03-13T08:10:00Z
- **Completed:** 2026-03-13T08:25:00Z
- **Tasks:** 1 (Task 1 was the checkpoint resolved by user; Task 2 executed here)
- **Files modified:** 8

## Accomplishments

- Replaced all three placeholder company fields (name, phone, phone_display) with real values; email removed entirely
- Flipped `seo.allow_indexing: true` — site now sends `Allow: /` in robots.txt and includes sitemap reference
- Removed email from every surface: JSON-LD in head.html, footer link, contact-options panel, contact pages (UA and EN), contact_channels.yml, translations.yml
- `phase1_placeholder.fields` narrowed to only service_area entries — name and phone no longer need placeholder policy coverage
- All Phase 1-5 qa.sh checks pass green

## Task Commits

1. **Task 2: Update _config.yml with real business identity and enable indexing** - `29906ce` (feat)

**Plan metadata:** (docs commit follows)

## Files Created/Modified

- `_config.yml` - Real company name/phone, email removed, allow_indexing: true, placeholder fields narrowed
- `_includes/head.html` - Removed email field from JSON-LD structured data
- `_includes/footer.html` - Removed email mailto link
- `_includes/contact-options.html` - Removed email label and link block
- `contact/index.md` - Removed {{ site.company.email }} line
- `en/contact/index.md` - Removed {{ site.company.email }} line
- `_data/contact_channels.yml` - Removed email_label from UK and EN entries
- `_data/translations.yml` - Removed contact_email_label, updated contact_shell_secondary to drop email mention

## Decisions Made

- Email dropped entirely at owner's request. Removed from _config.yml and all template references simultaneously so the build produces zero broken references or empty mailto links.
- phase1_placeholder.fields narrowed: now only service_area.uk and service_area.en remain as policy-protected placeholder values since name and phone are now live.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 2 - Missing Critical] Email removal propagated to all templates, data files, and content pages**

- **Found during:** Task 2 (Update _config.yml)
- **Issue:** Plan only specified removing `company.email` from `_config.yml`, but email was referenced in `_includes/head.html` (JSON-LD), `_includes/footer.html`, `_includes/contact-options.html`, `contact/index.md`, `en/contact/index.md`, `_data/contact_channels.yml`, and `_data/translations.yml`. Leaving those references would produce empty/broken mailto links and orphaned email labels in the rendered site.
- **Fix:** Removed all email references from all site source files. Also removed orphaned translation keys (`contact_email_label`) and updated `contact_shell_secondary` copy to no longer mention email.
- **Files modified:** All 8 listed above
- **Verification:** `grep -r "company\.email\|hello@example"` returns no hits in site source; `qa.sh` passes all phases
- **Committed in:** 29906ce (Task 2 commit)

---

**Total deviations:** 1 auto-fixed (Rule 2 — missing critical completeness for email removal)
**Impact on plan:** Required for correctness — partial removal would have left broken mailto anchors. No scope creep.

## Issues Encountered

None — build succeeded on first attempt, all five phase checks passed.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

- Site is fully crawlable with real business identity
- Plan 03 (robots.txt and sitemap verification) is unblocked — Phase 5 render checks already enforce the indexing state
- Google Search Console submission can proceed after deployment

---
*Phase: 05-seo-and-regression-hardening*
*Completed: 2026-03-13*
