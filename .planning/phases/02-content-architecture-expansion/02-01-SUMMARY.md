---
phase: 02-content-architecture-expansion
plan: 01
subsystem: ui
tags: [jekyll, liquid, yaml, qa, bilingual, metadata, faq]
requires:
  - phase: 01-trust-and-phone-foundation
    provides: phase 1 trust strips, call expectations, bilingual route parity, and route render checks
provides:
  - phase 2 rendered route checks wired into the default QA flow
  - bilingual shared content contracts for service, process, and grouped FAQ depth
  - stable Phase 2 layout surfaces for content depth, objections, commercial clarity, fit guidance, and FAQ reuse
affects: [02-02, 02-03, 02-04, content-architecture, qa]
tech-stack:
  added: [node render-check script]
  patterns: [data-phase2 markers, grouped faq keys, bilingual shared module contracts]
key-files:
  created: [scripts/phase2_render_checks.mjs, .planning/phases/02-content-architecture-expansion/02-01-SUMMARY.md]
  modified: [_data/service_pages.yml, _data/process_page.yml, _data/faqs.yml, _layouts/home.html, _layouts/page.html, _layouts/process.html, _layouts/service_detail.html, faq/index.md, en/faq/index.md, scripts/qa.sh, .planning/phases/02-content-architecture-expansion/02-VALIDATION.md]
key-decisions:
  - "Phase 2 validation stays additive: qa.sh now runs phase1 and phase2 render checks instead of replacing the earlier trust and phone coverage."
  - "Shared FAQ content moved to grouped stable keys so service, process, and FAQ routes can reuse the same answers without copy drift."
  - "Service-detail and process layouts carry the deepest new modules, while home and generic pages only surface lighter bridges into that content."
patterns-established:
  - "Pattern 1: mark durable rendered surfaces with data-phase2-marker and data-phase2-surface attributes so QA can validate structure without free-text matching."
  - "Pattern 2: require uk and en branches on every new shared content module used by Phase 2 priority routes."
requirements-completed: [CONT-01, CONT-02, CONT-03]
duration: 13m
completed: 2026-03-11
---

# Phase 2 Plan 1: Content Architecture Expansion Summary

**Phase 2 route guardrails with grouped FAQ keys, bilingual depth contracts, and reusable service/process layout surfaces**

## Performance

- **Duration:** 13m
- **Started:** 2026-03-11T14:47:40Z
- **Completed:** 2026-03-11T15:00:49Z
- **Tasks:** 4
- **Files modified:** 12

## Accomplishments
- Added `scripts/phase2_render_checks.mjs` and wired it into `./scripts/qa.sh` so Phase 2 route markers, metadata parity, and retained Phase 1 trust/call surfaces are checked automatically.
- Refactored `_data/service_pages.yml`, `_data/process_page.yml`, and `_data/faqs.yml` into richer bilingual contracts with grouped FAQ keys and priority-route modules for objections, fit, and commercial clarity.
- Extended the home, page, process, and service-detail layouts to expose stable scan-first Phase 2 hooks while keeping the homepage and generic pages lighter than the deeper service/process surfaces.
- Updated `02-VALIDATION.md` so Wave 0 ownership, route coverage, and current verification status are explicit.

## Task Commits

Each task was committed atomically:

1. **Task 1: Install Phase 2 QA guardrails and rendered markers first** - `1439649` (feat)
2. **Task 2: Refactor shared bilingual content contracts for richer depth** - `85677dd` (feat)
3. **Task 3: Add layout hooks that preserve scan-first page roles** - `dd2dce7` (refactor)
4. **Task 4: Update the phase validation artifact with Wave 0 ownership** - `0098f84` (docs)

**Plan metadata:** pending

## Files Created/Modified
- `scripts/phase2_render_checks.mjs` - Validates Phase 2 route markers, bilingual metadata parity, shared YAML contracts, and retained Phase 1 trust/call surfaces.
- `scripts/qa.sh` - Runs the new Phase 2 rendered-route checks after the existing build and Phase 1 validation.
- `_data/service_pages.yml` - Adds optional Phase 2 service modules for overview, outcomes, fit boundaries, objections, coordination, commercial clarity, and FAQ refs.
- `_data/process_page.yml` - Adds planning, procurement, handoff, objection, commercial-clarity, and FAQ bridge content for the process route.
- `_data/faqs.yml` - Replaces the flat FAQ list with grouped bilingual clusters and stable question keys.
- `_layouts/home.html` - Adds lightweight Phase 2 teaser markers for service depth, fit guidance, process context, and FAQ grouping.
- `_layouts/page.html` - Keeps generic pages scan-first while exposing lighter depth and FAQ bridge sections for the services index.
- `_layouts/process.html` - Renders the new planning, objection, commercial-clarity, procurement, handoff, fit, and FAQ bridge modules.
- `_layouts/service_detail.html` - Renders the new service-depth, fit, objections, commercial-clarity, and shared FAQ sections.
- `faq/index.md` - Renders grouped Ukrainian FAQ clusters with stable FAQ-group markers.
- `en/faq/index.md` - Renders grouped English FAQ clusters with stable FAQ-group markers.
- `.planning/phases/02-content-architecture-expansion/02-VALIDATION.md` - Records Wave 0 completion and green status for Plan 02-01 verification.

## Decisions Made
- Kept this plan `repo_only`; no MCP capability was needed because the work was entirely local Jekyll structure, shared YAML schema, and local rendered-output verification.
- Used a dedicated Node render-check script rather than extending the Phase 1 script so Phase 2 route coverage can grow independently without weakening the earlier trust and phone checks.
- Added grouped FAQ rendering on the actual FAQ pages, not only in shared data, because the route-level Phase 2 checks needed a real rendered FAQ-group surface on `/faq/` and `/en/faq/`.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Added grouped FAQ page rendering alongside the new shared FAQ schema**
- **Found during:** Task 1 (Install Phase 2 QA guardrails and rendered markers first)
- **Issue:** The plan required route-level checks for `/faq/` and `/en/faq/`, but the existing flat FAQ pages had no rendered group markers for the new Phase 2 validation surface.
- **Fix:** Updated `faq/index.md` and `en/faq/index.md` to render grouped FAQ clusters from the shared data model.
- **Files modified:** `faq/index.md`, `en/faq/index.md`
- **Verification:** `./scripts/qa.sh`
- **Committed in:** `1439649`

**2. [Rule 3 - Blocking] Hardened FAQ marker fallback in process and service layouts after the first Phase 2 QA failure**
- **Found during:** Task 1 (Install Phase 2 QA guardrails and rendered markers first)
- **Issue:** The first full QA run failed because `/services/plumbing/` did not emit the `faq-group-visibility` marker reliably when the shared FAQ refs were empty or not resolved.
- **Fix:** Switched the Process and Service Detail FAQ bridge sections to unconditional marker wrappers with defaulted ref arrays.
- **Files modified:** `_layouts/process.html`, `_layouts/service_detail.html`
- **Verification:** `./scripts/qa.sh`
- **Committed in:** `1439649`

---

**Total deviations:** 2 auto-fixed (2 blocking)
**Impact on plan:** Both deviations were required to satisfy the planned route coverage and keep the QA contract enforceable. No unrelated scope was added.

## Issues Encountered
- The first end-to-end QA run failed on a missing service-detail FAQ marker. The layout fallback was tightened immediately and the next `./scripts/qa.sh` run passed.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- Priority service and process routes now have stable shared-data contracts and DOM markers for later content-density work.
- Later Phase 2 plans can add deeper copy and route coverage without redefining the QA or metadata-parity baseline.
- `nyquist_compliant` correctly remains `false` in `02-VALIDATION.md` until Plans `02-02` through `02-04` complete.

## Self-Check: PASSED

- Verified summary and key implementation files exist on disk.
- Verified task commits `1439649`, `85677dd`, `dd2dce7`, and `0098f84` exist in git history.

---
*Phase: 02-content-architecture-expansion*
*Completed: 2026-03-11*
