---
phase: 3
slug: case-study-and-proof-system
status: ready
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-11
---

# Phase 3 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | repo QA scripts + rendered route checks |
| **Config file** | `scripts/qa.sh` |
| **Quick run command** | `bundle exec ruby -e 'require "yaml"; %w[_data/case_studies.yml _data/service_pages.yml _data/process_page.yml _data/trust_foundation.yml].each { |path| YAML.load_file(path) if File.exist?(path) }'` |
| **Full suite command** | `./scripts/qa.sh` |
| **Estimated runtime** | ~90-180 seconds |

---

## Sampling Rate

- **After every task commit:** Run the task-level `<verify>` command, plus the quick run command when the task only changes shared data
- **After every plan wave:** Run `./scripts/qa.sh` + Phase 3 rendered proof checks
- **Before `$gsd-verify-work`:** Full suite must be green
- **Max feedback latency:** 180 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 03-01-01 | 01 | 1 | CASE-01 | rendered + metadata | `./scripts/qa.sh` (`scripts/phase3_render_checks.mjs` validates project routes, metadata parity, and required proof markers) | ⬜ | ⬜ pending |
| 03-01-02 | 01 | 1 | CASE-01 | data integrity | `bundle exec ruby -e 'require "yaml"; %w[_data/case_studies.yml _data/service_pages.yml _data/process_page.yml _data/trust_foundation.yml].each { |path| YAML.load_file(path) }'` | ⬜ | ⬜ pending |
| 03-01-03 | 01 | 1 | CASE-03 | rendered | `./scripts/qa.sh` | ⬜ | ⬜ pending |
| 03-01-04 | 01 | 1 | CASE-01 | validation artifact | `rg -n "phase3_render_checks|buyer-relevance|project-route|placeholder" .planning/phases/03-case-study-and-proof-system/03-VALIDATION.md` | ✅ | ⬜ pending |
| 03-02-01 | 02 | 2 | CASE-01 | content + data integrity | `bundle exec ruby -e 'require "yaml"; YAML.load_file("_data/case_studies.yml")'` | ⬜ | ⬜ pending |
| 03-02-02 | 02 | 2 | CASE-02 | rendered | `./scripts/qa.sh` | ⬜ | ⬜ pending |
| 03-02-03 | 02 | 2 | CASE-04 | rendered | `./scripts/qa.sh` | ⬜ | ⬜ pending |
| 03-03-01 | 03 | 3 | CASE-03 | data integrity | `bundle exec ruby -e 'require "yaml"; %w[_data/case_studies.yml _data/service_pages.yml _data/process_page.yml _data/trust_foundation.yml].each { |path| YAML.load_file(path) }'` | ⬜ | ⬜ pending |
| 03-03-02 | 03 | 3 | CASE-03 | rendered | `./scripts/qa.sh` | ⬜ | ⬜ pending |
| 03-03-03 | 03 | 3 | CASE-01 | rendered + replacement policy | `./scripts/qa.sh` | ⬜ | ⬜ pending |
| 03-04-01 | 04 | 4 | CASE-04 | rendered | `./scripts/qa.sh` | ⬜ | ⬜ pending |
| 03-04-02 | 04 | 4 | CASE-02 | rendered parity | `./scripts/qa.sh` | ⬜ | ⬜ pending |
| 03-04-03 | 04 | 4 | CASE-01 / CASE-03 / CASE-04 | sign-off gate | `./scripts/qa.sh` | ⬜ | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] Add `scripts/phase3_render_checks.mjs` and wire it into `./scripts/qa.sh`
- [ ] Add checks that `_data/case_studies.yml` and every new bilingual branch used for Phase 3 contain both `uk` and `en`
- [ ] Add route-level checks for `/projects/`, `/en/projects/`, at least two representative case-study route pairs, and the homepage/process/service routes that surface them
- [ ] Add stable rendered markers for case-study snapshot, buyer relevance, stage-proof timeline, related-routes bridge, and proof-source status
- [ ] Add canonical, `hreflang`, `lang`, and language-switch parity checks on all touched project-route pairs
- [ ] Add checks that routes upgraded to publishable proof no longer render unlabeled placeholder proof cards
- [ ] Preserve existing Phase 1 and Phase 2 QA as additive coverage, not replacement

**Wave 0 owner:** Plan `03-01`

**Minimum route coverage:** `/`, `/process/`, `/services/plumbing/`, `/services/electrical/`, `/services/apartment-renovation/`, `/projects/`, and each `/en/` equivalent, plus at least two dossier route pairs.

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Case studies feel like credible project evidence rather than dressed-up galleries | CASE-01 | Credibility depends on editorial truthfulness and evidence quality | Review representative project pages and confirm they explain scope, decisions, and outcomes using real route logic instead of generic showroom copy |
| Before/during/after logic is honest and understandable | CASE-02 | Some projects may have incomplete state coverage | Confirm stage labels match the actual material shown and do not claim a true `before` when only mid-stage evidence exists |
| Service and homepage proof routing feels useful, not forced | CASE-03 | Link relevance is contextual | Review homepage, process, and key service pages and confirm the featured dossiers are the natural next read for that page's buyer concern |
| Buyer-relevance framing is explicit on every featured proof surface | CASE-04 | Relevance quality is qualitative | Confirm each featured case study or proof card states why it matters to a buyer's renovation concern rather than leaving the user to infer that alone |

---

## Validation Sign-Off

- [x] All tasks have `<verify>` commands or Wave 0 dependencies
- [x] Sampling continuity: no 3 consecutive tasks without automated verify
- [x] Wave 0 requirements defined for project routes, case-study markers, metadata parity, and placeholder-replacement policy
- [x] No watch-mode flags
- [x] Feedback latency < 180s
- [ ] `nyquist_compliant: true` set only after Phase 3 execution closes all CASE requirements

**Approval:** planning complete; execution may begin once Wave 0 is implemented in `03-01`.
