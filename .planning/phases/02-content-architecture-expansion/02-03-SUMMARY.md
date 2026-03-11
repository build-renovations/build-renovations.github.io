---
phase: 02-content-architecture-expansion
plan: 03
subsystem: content
tags: [jekyll, liquid, yaml, qa, bilingual, faq, objections]
requires:
  - phase: 02-content-architecture-expansion
    provides: richer service/process depth, route bridges, and phase 2 render guardrails
provides:
  - grouped FAQ data as the shared source for objection handling
  - inline objection answers on process and representative service routes
  - a stronger bilingual FAQ destination with route-level validation
affects: [02-04, content-architecture, faq, objections, qa]
tech-stack:
  added: []
  patterns: [shared faq keys, inline objection refs, grouped faq reference surface]
key-files:
  created: [.planning/phases/02-content-architecture-expansion/02-03-SUMMARY.md]
  modified: [_data/faqs.yml, _data/process_page.yml, _data/service_pages.yml, _layouts/process.html, _layouts/service_detail.html, _layouts/page.html, faq/index.md, en/faq/index.md, assets/css/site.css, scripts/phase2_render_checks.mjs]
key-decisions:
  - "FAQ answers now act as the shared objection source instead of letting process and service pages drift into duplicated reassurance copy."
  - "Inline objection handling stays on the decision path, while the FAQ route becomes the grouped reference destination instead of a flat markdown list."
  - "Rendered checks now require FAQ-key bindings on the FAQ route and on representative objection surfaces."
patterns-established:
  - "Pattern 1: objection_refs on process and service data bind inline cards to shared FAQ item keys."
  - "Pattern 2: FAQ pages render through the page layout as a grouped reference surface rather than bespoke markdown loops."
requirements-completed: [CONT-02, CONT-03]
duration: 27m
completed: 2026-03-11
---

# Phase 2 Plan 3: Content Architecture Expansion Summary

**Grouped FAQ system with inline objection answers on the main decision routes**

## Accomplishments

- Rebuilt `_data/faqs.yml` into stronger buyer-centered groups covering start, fit, sequence, procurement, control, and handoff.
- Moved representative service and process objection handling onto shared FAQ keys instead of maintaining separate answer copy.
- Upgraded the FAQ route into a grouped reference surface through `_layouts/page.html` and simplified the thin UA/EN route files.
- Tightened `scripts/phase2_render_checks.mjs` so representative routes must render shared FAQ-key bindings.

## Task Commits

1. **Task 1: Reshape the FAQ data into grouped, referenceable buyer concerns** - `e3103f8` `feat(02-03): unify objection source data`
2. **Task 2: Build inline objection sections on process and service routes** - `b2074c5` `feat(02-03): render inline objection answers`
3. **Task 3: Upgrade the FAQ destination into a grouped bilingual reference surface** - `a95337a` `feat(02-03): upgrade grouped faq destination`

## Verification

- `bundle exec ruby -e 'require "yaml"; %w[_data/faqs.yml _data/process_page.yml _data/service_pages.yml].each { |path| YAML.load_file(path) }'`
- `./scripts/qa.sh`
- Manual rendered review on `/faq/`, `/en/faq/`, `/process/`, `/en/process/`, `/services/plumbing/`, and `/en/services/plumbing/`

## Self-Check: PASSED

- Verified summary and key implementation files exist on disk.
- Verified commits `e3103f8`, `b2074c5`, and `a95337a` exist in git history.
- Verified grouped FAQ and inline objection routes pass the Phase 2 render checks in both languages.

---
*Phase: 02-content-architecture-expansion*
*Completed: 2026-03-11*
