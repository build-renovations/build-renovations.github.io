---
phase: 2
slug: content-architecture-expansion
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-11
---

# Phase 2 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | repo QA scripts + rendered route checks |
| **Config file** | `scripts/qa.sh` |
| **Quick run command** | `bundle exec ruby -e 'require "yaml"; %w[_data/service_pages.yml _data/process_page.yml _data/faqs.yml _data/translations.yml].each { |path| YAML.load_file(path) if File.exist?(path) }'` + Phase 2 metadata smoke checks |
| **Full suite command** | `./scripts/qa.sh` + Phase 2 rendered content checks |
| **Estimated runtime** | ~90-180 seconds |

---

## Sampling Rate

- **After every task commit:** Run the task-level `<verify>` command, plus the quick run command when the task only changes shared data
- **After every plan wave:** Run `./scripts/qa.sh` + Phase 2 rendered content checks
- **Before `$gsd-verify-work`:** Full suite must be green
- **Max feedback latency:** 180 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 02-01-01 | 01 | 1 | CONT-01 | rendered + metadata | `./scripts/qa.sh` + Phase 2 marker and metadata-parity check | ✅ | ⬜ pending |
| 02-01-02 | 01 | 1 | CONT-01 | data integrity | `bundle exec ruby -e 'require "yaml"; %w[_data/service_pages.yml _data/process_page.yml _data/faqs.yml].each { |path| YAML.load_file(path) }'` | ✅ | ⬜ pending |
| 02-01-03 | 01 | 1 | CONT-01 | rendered | `./scripts/qa.sh` | ✅ | ⬜ pending |
| 02-01-04 | 01 | 1 | CONT-01 | validation artifact | `rg -n "canonical|hreflang|language-switch|02-01-01|02-01-04" .planning/phases/02-content-architecture-expansion/02-VALIDATION.md` | ✅ | ⬜ pending |
| 02-02-01 | 02 | 2 | CONT-01 | data integrity | `bundle exec ruby -e 'require "yaml"; YAML.load_file("_data/service_pages.yml")'` | ✅ | ⬜ pending |
| 02-02-02 | 02 | 2 | CONT-03 | data integrity | `bundle exec ruby -e 'require "yaml"; %w[_data/process_page.yml _data/translations.yml].each { |path| YAML.load_file(path) }'` | ✅ | ⬜ pending |
| 02-02-03 | 02 | 2 | CONT-01 | rendered | `./scripts/qa.sh` | ✅ | ⬜ pending |
| 02-03-01 | 03 | 3 | CONT-02 | data integrity | `bundle exec ruby -e 'require "yaml"; %w[_data/faqs.yml _data/process_page.yml _data/service_pages.yml].each { |path| YAML.load_file(path) }'` | ✅ | ⬜ pending |
| 02-03-02 | 03 | 3 | CONT-02 | rendered | `./scripts/qa.sh` | ✅ | ⬜ pending |
| 02-03-03 | 03 | 3 | CONT-02 | rendered | `./scripts/qa.sh` | ✅ | ⬜ pending |
| 02-04-01 | 04 | 4 | CONT-04 | data integrity | `bundle exec ruby -e 'require "yaml"; YAML.load_file("_data/service_pages.yml")'` | ✅ | ⬜ pending |
| 02-04-02 | 04 | 4 | CONT-04 | rendered | `./scripts/qa.sh` | ✅ | ⬜ pending |
| 02-04-03 | 04 | 4 | CONT-01 | sign-off gate | `./scripts/qa.sh` | ✅ | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] Add `scripts/phase2_render_checks.mjs` and wire it into `./scripts/qa.sh`
- [ ] Add checks that richer shared data contracts contain both `uk` and `en`
- [ ] Add route-level checks for `/`, `/services/`, `/process/`, `/faq/`, priority service pages, property-type pages, and `/en/` equivalents
- [ ] Add stable rendered markers for content-depth, objection, commercial-clarity, fit-guide, and FAQ-group surfaces
- [ ] Add canonical, `hreflang`, `lang`, and language-switch parity checks on touched bilingual routes
- [ ] Add checks that Phase 1 trust/call modules remain present on pages that should retain them

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Dense pages stay readable rather than bloated | CONT-01 | Scan quality depends on editorial composition, not only DOM presence | Review `/process/`, `/services/plumbing/`, and `/services/apartment-renovation/` in UA and EN and confirm summaries, lists, and subsection rhythm make long content easy to scan |
| Objection handling feels calm and concrete | CONT-02 | Tone quality is editorial | Review representative inline objection sections and confirm they address budget/surprise risk directly without fear-heavy or defensive copy |
| Commercial clarity is visible but not over-explained | CONT-03 | Public-facing balance is qualitative | Review process and selected service pages and confirm planning/procurement/handoff are clear without reading like an operations manual |
| Property-type content feels like real fit guidance rather than SEO filler | CONT-04 | Relevance quality is contextual | Review apartment and house pages and confirm the content helps buyers self-qualify through meaningful fit distinctions |

---

## Validation Sign-Off

- [ ] All tasks have `<verify>` commands or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all missing Phase 2 rendered/content checks
- [ ] No watch-mode flags
- [ ] Feedback latency < 180s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
