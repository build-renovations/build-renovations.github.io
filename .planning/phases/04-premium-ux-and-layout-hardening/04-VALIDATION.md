---
phase: 4
slug: premium-ux-and-layout-hardening
status: complete
nyquist_compliant: true
wave_0_complete: true
created: 2026-03-12
---

# Phase 4 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | repo QA scripts + rendered route checks + browser review |
| **Config file** | `scripts/qa.sh` |
| **Quick run command** | `bundle exec ruby -e 'require "yaml"; %w[_data/translations.yml _data/service_pages.yml _data/process_page.yml _data/case_studies.yml].each { |path| YAML.load_file(path) if File.exist?(path) }'` |
| **Full suite command** | `./scripts/qa.sh` |
| **Rendered review tool** | MCP browser automation on local built output |
| **Estimated runtime** | ~120-240 seconds plus browser pass |

---

## Sampling Rate

- **After every task commit:** Run the task-level `<verify>` command, plus the quick run command when the task mainly changes shared contracts
- **After every plan wave:** Run `./scripts/qa.sh` + a browser review on the routes touched by that wave
- **Before `$gsd-verify-work`:** Full suite must be green and browser review must be current
- **Max feedback latency:** 240 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 04-01-01 | 01 | 1 | UX-02 | rendered + metadata | `./scripts/qa.sh` (`scripts/phase4_render_checks.mjs` validates premium-shell, scan-rhythm, cta-stability, and layout-parity on target routes) | ✅ | ✅ green |
| 04-01-02 | 01 | 1 | UX-01 | shared-style integrity | `./scripts/qa.sh` plus rendered browser spot-check on built output | ✅ | ✅ green |
| 04-01-03 | 01 | 1 | UX-02 | validation artifact | `rg -n "phase4_render_checks|premium-shell|scan-rhythm|cta-stability|layout-parity" .planning/phases/04-premium-ux-and-layout-hardening/04-VALIDATION.md` | ✅ | ✅ green |
| 04-02-01 | 02 | 2 | UX-01 | rendered | `./scripts/qa.sh` | ✅ | ✅ green |
| 04-02-02 | 02 | 2 | UX-02 | browser review | `./scripts/qa.sh` | ✅ | ✅ green |
| 04-02-03 | 02 | 2 | UX-03 | rendered parity | `./scripts/qa.sh` | ✅ | ✅ green |
| 04-03-01 | 03 | 3 | UX-04 | rendered | `./scripts/qa.sh` | ✅ | ✅ green |
| 04-03-02 | 03 | 3 | UX-01 | browser review | `./scripts/qa.sh` | ✅ | ✅ green |
| 04-03-03 | 03 | 3 | UX-03 | rendered parity | `./scripts/qa.sh` | ✅ | ✅ green |
| 04-04-01 | 04 | 4 | UX-02 | browser matrix | `./scripts/qa.sh` | ✅ | ✅ green |
| 04-04-02 | 04 | 4 | UX-03 | rendered + browser | `./scripts/qa.sh` | ✅ | ✅ green |
| 04-04-03 | 04 | 4 | UX-04 | sign-off gate | `./scripts/qa.sh` | ✅ | ✅ green |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [x] Add `scripts/phase4_render_checks.mjs` and wire it into `./scripts/qa.sh`
- [x] Add checks for `/`, `/en/`, `/process/`, `/en/process/`, representative service routes, representative dossier routes, and `/projects/` plus `/en/projects/`
- [x] Add stable rendered markers for premium-shell, scan-rhythm, cta-stability, and layout-parity surfaces
- [x] Add assertions that touched routes retain visible primary CTA, language-switch links, and sticky CTA shell where applicable
- [x] Add parity assertions so touched UA and EN route pairs keep the same premium surface set
- [x] Encode the browser-review matrix for mobile and desktop sign-off inside this validation file

**Wave 0 owner:** Plan `04-01`

**Wave 0 route coverage now implemented:** `/`, `/en/`, `/process/`, `/en/process/`, `/services/plumbing/`, `/en/services/plumbing/`, `/services/apartment-renovation/`, `/en/services/apartment-renovation/`, `/projects/`, `/en/projects/`, `/projects/compact-apartment-engineering/`, `/en/projects/compact-apartment-engineering/`, `/projects/house-stage-coordination/`, `/en/projects/house-stage-coordination/`.

## Wave 0 Browser Matrix

| Viewport | UA Route | EN Route | What must be reviewed | Owner | Status |
|----------|----------|----------|------------------------|-------|--------|
| Desktop `1440x1100` | `/` | `/en/` | premium-shell spacing, hero hierarchy, proof rhythm, and persistent CTA clarity | Plan `04-04` final sign-off | ✅ reviewed 2026-03-12 |
| Desktop `1440x1100` | `/process/` | `/en/process/` | scan-rhythm on long sections, stage-map composure, no CTA drift | Plan `04-04` final sign-off | ✅ reviewed 2026-03-12 |
| Desktop `1440x1100` | `/services/plumbing/` | `/en/services/plumbing/` | service hero parity, section pacing, and long-route shell consistency | Plan `04-04` final sign-off | ✅ reviewed 2026-03-12 |
| Desktop `1440x1100` | `/projects/` | `/en/projects/` | projects-index shell parity, route clarity, and CTA continuity | Plan `04-04` final sign-off | ✅ reviewed 2026-03-12 |
| Desktop `1440x1100` | `/projects/compact-apartment-engineering/` | `/en/projects/compact-apartment-engineering/` | dossier shell parity, snapshot readability, and stage timeline rhythm | Plan `04-04` final sign-off | ✅ reviewed 2026-03-12 |
| Mobile `390x844` | `/` | `/en/` | stacked rhythm, no cramped card wall, sticky CTA remains clear and unobtrusive | Plan `04-04` final sign-off | ✅ reviewed 2026-03-12 |
| Mobile `390x844` | `/process/` | `/en/process/` | long-page calmness, no overflow, sticky CTA and menu stay readable | Plan `04-04` final sign-off | ✅ reviewed 2026-03-12 |
| Mobile `390x844` | `/services/apartment-renovation/` | `/en/services/apartment-renovation/` | property-fit sections remain scannable and CTA behavior stays stable | Plan `04-04` final sign-off | ✅ reviewed 2026-03-12 |
| Mobile `390x844` | `/projects/` | `/en/projects/` | projects-index shell parity, route clarity, and sticky CTA continuity | Plan `04-04` final sign-off | ✅ reviewed 2026-03-12 |
| Mobile `390x844` | `/projects/house-stage-coordination/` | `/en/projects/house-stage-coordination/` | dossier parity, stage density, and bottom CTA spacing | Plan `04-04` final sign-off | ✅ reviewed 2026-03-12 |

## Wave 0 Sign-Off Expectations

- Automation owner: Plan `04-01` must keep `scripts/phase4_render_checks.mjs` green in the default `./scripts/qa.sh` path.
- Browser owner: final sign-off was completed in Plan `04-04` with MCP browser automation against a Bundler/Jekyll-served local site.
- Parity rule: touched UA and EN routes must keep the same `data-phase4-surface` set and keep language switching plus primary phone CTA intact.
- Final phase sign-off remains blocked until the matrix above is reviewed after the later layout-polish plans land.

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Site feels materially more premium instead of merely more decorated | UX-01 | Premium quality is experiential | Review `/` and `/en/` on desktop and confirm hierarchy, contrast, and rhythm feel stronger without losing trust |
| Mobile layouts stay calm and uncluttered on long pages | UX-02 | Cramped-state quality is visual | Review `/`, `/process/`, a representative service page, and a dossier page at phone width and confirm there is no overflow, collision, or CTA confusion |
| UA and EN premium surfaces stay aligned | UX-03 | Parity is more than DOM presence | Compare home, process, and one dossier pair in UA and EN and confirm matching layout treatment and CTA presence |
| Long pages scan better after the polish pass | UX-04 | Scannability is editorial and compositional | Review service, process, and dossier routes and confirm the section order, contrast, and spacing create visible reading rhythm rather than a card wall |

---

## Validation Sign-Off

- [x] All tasks have `<verify>` commands or Wave 0 dependencies
- [x] Sampling continuity: no 3 consecutive tasks without automated verify
- [x] Wave 0 owns the new layout and parity rendered checks
- [x] No watch-mode flags
- [x] Feedback latency < 240s
- [x] `nyquist_compliant: true` was set only after all four Phase 4 plans landed and browser review confirmed premium quality, layout stability, and parity

**Approval:** Phase 4 execution is complete. Automated render checks and final browser review both confirmed premium-shell quality, route scannability, CTA stability, and UA/EN parity before Nyquist closure.

## Phase 4 Closure Notes

- `./scripts/qa.sh` passed after the final `04-04` sign-off pass on 2026-03-12.
- Final browser review used MCP browser automation against `bundle exec jekyll serve --host 127.0.0.1 --port 4012 --no-watch --skip-initial-build`; no Python HTTP server was used for local verification.
- Desktop review covered `/`, `/en/`, `/process/`, `/en/process/`, `/services/plumbing/`, `/en/services/plumbing/`, `/projects/`, `/en/projects/`, `/projects/compact-apartment-engineering/`, and `/en/projects/compact-apartment-engineering/`.
- Mobile review covered `/`, `/en/`, `/process/`, `/en/process/`, `/services/apartment-renovation/`, `/en/services/apartment-renovation/`, `/projects/`, `/en/projects/`, `/projects/house-stage-coordination/`, and `/en/projects/house-stage-coordination/`.
- All reviewed routes rendered with `overflowX = 0`; sticky phone CTA stayed hidden on desktop and visible on mobile, while visible `tel:` links and language-switcher parity remained intact on every reviewed route.
- Browser automation MCP was used for rendered validation. `ui-ux-pro-max` was intentionally not used in `04-04` because the final wave closed evidence and sign-off rather than reopening design-concept exploration.
- UX-01 through UX-04 are now covered by implemented premium surfaces, additive rendered QA, and browser-reviewed route parity, so Phase 4 is ready for verification.
