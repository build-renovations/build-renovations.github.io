---
phase: 4
slug: premium-ux-and-layout-hardening
status: planned
nyquist_compliant: false
wave_0_complete: false
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
| 04-01-01 | 01 | 1 | UX-02 | rendered + metadata | `./scripts/qa.sh` (`scripts/phase4_render_checks.mjs` validates premium markers, CTA stability, and parity hooks on target routes) | ⬜ | ⬜ pending |
| 04-01-02 | 01 | 1 | UX-01 | shared-style integrity | `bundle exec ruby -e 'require "yaml"; %w[_data/translations.yml _data/service_pages.yml _data/process_page.yml _data/case_studies.yml].each { |path| YAML.load_file(path) if File.exist?(path) }'` | ✅ | ⬜ pending |
| 04-01-03 | 01 | 1 | UX-02 | validation artifact | `rg -n "phase4_render_checks|premium-shell|layout-parity|cta-stability" .planning/phases/04-premium-ux-and-layout-hardening/04-VALIDATION.md` | ✅ | ⬜ pending |
| 04-02-01 | 02 | 2 | UX-01 | rendered | `./scripts/qa.sh` | ⬜ | ⬜ pending |
| 04-02-02 | 02 | 2 | UX-02 | browser review | `./scripts/qa.sh` | ⬜ | ⬜ pending |
| 04-02-03 | 02 | 2 | UX-03 | rendered parity | `./scripts/qa.sh` | ⬜ | ⬜ pending |
| 04-03-01 | 03 | 3 | UX-04 | rendered | `./scripts/qa.sh` | ⬜ | ⬜ pending |
| 04-03-02 | 03 | 3 | UX-01 | browser review | `./scripts/qa.sh` | ⬜ | ⬜ pending |
| 04-03-03 | 03 | 3 | UX-03 | rendered parity | `./scripts/qa.sh` | ⬜ | ⬜ pending |
| 04-04-01 | 04 | 4 | UX-02 | browser matrix | `./scripts/qa.sh` | ⬜ | ⬜ pending |
| 04-04-02 | 04 | 4 | UX-03 | rendered + browser | `./scripts/qa.sh` | ⬜ | ⬜ pending |
| 04-04-03 | 04 | 4 | UX-04 | sign-off gate | `./scripts/qa.sh` | ⬜ | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] Add `scripts/phase4_render_checks.mjs` and wire it into `./scripts/qa.sh`
- [ ] Add checks for `/`, `/en/`, `/process/`, `/en/process/`, representative service routes, representative dossier routes, and `/projects/` plus `/en/projects/`
- [ ] Add stable rendered markers for premium-shell, scan-rhythm, cta-stability, and layout-parity surfaces
- [ ] Add assertions that touched routes retain visible primary CTA, language-switch links, and sticky CTA shell where applicable
- [ ] Add parity assertions so touched UA and EN route pairs keep the same premium surface set
- [ ] Encode the browser-review matrix for mobile and desktop sign-off inside this validation file

**Wave 0 owner:** Plan `04-01`

**Expected route coverage:** `/`, `/en/`, `/process/`, `/en/process/`, `/services/plumbing/`, `/en/services/plumbing/`, `/projects/`, `/en/projects/`, representative dossier routes, and at least one support content page pair touched during execution.

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
- [ ] `nyquist_compliant: true` remains blocked until all four Phase 4 plans land and browser review confirms premium quality, layout stability, and parity

**Approval:** Planning complete. Phase 4 execution must not be marked Nyquist-compliant until the automated render checks and browser review both confirm premium-shell quality, route scannability, CTA stability, and UA/EN parity.
