---
phase: 02-content-architecture-expansion
plan: 02
subsystem: content
tags: [jekyll, liquid, yaml, qa, bilingual, process, services]
requires:
  - phase: 02-content-architecture-expansion
    provides: phase 2 render guardrails, grouped FAQ keys, richer shared service and process contracts
provides:
  - deeper service-detail content for priority trade and property routes
  - stronger public-facing process content around planning, coordination, readiness, procurement, and handoff
  - lightweight route-bridge surfaces on home, service, and process pages
affects: [02-03, 02-04, content-architecture, service-pages, process-page, qa]
tech-stack:
  added: []
  patterns: [sequence-signals, route-bridge surfaces, process readiness modules]
key-files:
  created: [.planning/phases/02-content-architecture-expansion/02-02-SUMMARY.md]
  modified: [_data/service_pages.yml, _data/process_page.yml, _data/translations.yml, _layouts/service_detail.html, _layouts/process.html, _layouts/home.html, scripts/phase2_render_checks.mjs]
key-decisions:
  - "The heaviest Phase 2 text expansion stays on service-detail and process routes, while the homepage only bridges into deeper pages."
  - "Commercial clarity remains public-facing and calm: planning, procurement, and handoff are visible without turning the site into an operations manual."
  - "Property-type pages keep their Phase 4 fit-guidance role, but they now expose sequencing signals so the Phase 2 route system stays structurally consistent."
patterns-established:
  - "Pattern 1: use sequence_signals on service routes to explain which decisions must be closed before later layers start."
  - "Pattern 2: expose editorial route bridges as rendered Phase 2 surfaces so QA can verify navigation depth, not only raw copy presence."
requirements-completed: [CONT-01, CONT-03]
duration: 33m
completed: 2026-03-11
---

# Phase 2 Plan 2: Content Architecture Expansion Summary

**Richer service and process decision-support content with route bridges and stronger rendered coverage**

## Performance

- **Duration:** 33m
- **Tasks:** 3
- **Files modified:** 7

## Accomplishments

- Expanded `_data/service_pages.yml` so priority routes carry deeper buyer-facing content for outcomes, fit boundaries, sequencing, objections, coordination, and commercial clarity.
- Expanded `_data/process_page.yml` with coordination logic, readiness criteria, and route-bridge content, plus shared translation labels required by the new wrappers.
- Rendered the new content on service-detail, process, and home routes while keeping the homepage lighter than the deeper service/process pages.
- Tightened `scripts/phase2_render_checks.mjs` so representative routes must keep the new process and service surfaces in both languages.

## Task Commits

1. **Task 1: Deepen service-page data around scope, fit, outcomes, and coordination** - `a7462e3` `feat(02-02): deepen service content contracts`
2. **Task 2: Expand process-page commercial clarity without turning it into an operations manual** - `350129e` `feat(02-02): expand process content clarity`
3. **Task 3: Render the deeper service and process modules with scan-first composition** - `f4d77f1` `feat(02-02): render richer phase 2 content routes`

## Files Created/Modified

- `_data/service_pages.yml` - deepens the priority service contracts and extends sequencing guidance across the service-detail system.
- `_data/process_page.yml` - adds coordination, readiness, and route-bridge modules to the process content contract.
- `_data/translations.yml` - adds shared labels for new sequence and route-bridge wrappers.
- `_layouts/service_detail.html` - renders sequence-signals and connected route bridges on service pages.
- `_layouts/process.html` - renders coordination, readiness, and next-route sections alongside the existing process depth modules.
- `_layouts/home.html` - adds a compact route-bridge section that points visitors to the deeper pages without turning the homepage into a copy wall.
- `scripts/phase2_render_checks.mjs` - verifies the new service/process/home surfaces in UA and EN builds.

## Decisions Made

- Kept this plan `repo_only`; no MCP capability was needed because the work was a local content-architecture rollout on top of already-locked repo decisions.
- Preserved the heaviest density on service-detail and process routes and used the homepage only as a routing surface into those pages.
- Added process and service route bridges as explicit rendered surfaces so future phases can build on them without weakening QA coverage.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Added sequencing surfaces for apartment and house routes to satisfy the new route-level render checks**
- **Found during:** Task 3 (Render the deeper service and process modules with scan-first composition)
- **Issue:** The first full `./scripts/qa.sh` run failed because apartment and house routes did not emit the new `service-sequence` surface required by the tightened Phase 2 checks.
- **Fix:** Completed the property-type service contracts with `sequence_signals`, which keeps those pages structurally compatible with the new service-detail rendering while leaving their larger fit-guidance deepening for Plan `02-04`.
- **Files modified:** `_data/service_pages.yml`
- **Verification:** `./scripts/qa.sh`
- **Committed in:** `f4d77f1`

**Total deviations:** 1 auto-fixed (1 blocking)

## Verification

- `bundle exec ruby -e 'require "yaml"; YAML.load_file("_data/service_pages.yml")'`
- `bundle exec ruby -e 'require "yaml"; %w[_data/process_page.yml _data/translations.yml].each { |path| YAML.load_file(path) }'`
- `./scripts/qa.sh`
- Rendered spot-checks on `_site/process/index.html`, `_site/en/process/index.html`, representative service routes, and their `/en/` equivalents for required Phase 2 surfaces

## User Setup Required

None.

## Next Phase Readiness

- `02-03` can now attach inline objection handling and grouped FAQ routing to the stronger service/process structure instead of inventing another content layer.
- `02-04` can deepen apartment and house fit-guidance without needing to revisit the shared sequencing or route-bridge scaffolding.

## Self-Check: PASSED

- Verified summary and key implementation files exist on disk.
- Verified commits `a7462e3`, `350129e`, and `f4d77f1` exist in git history.
- Verified `./scripts/qa.sh` passes after the final render-check update.

---
*Phase: 02-content-architecture-expansion*
*Completed: 2026-03-11*
