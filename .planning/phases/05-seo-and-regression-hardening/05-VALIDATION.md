---
phase: 5
slug: seo-and-regression-hardening
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-13
---

# Phase 5 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Node.js static HTML assertion scripts (`.mjs`) — no external test framework |
| **Config file** | none — scripts run directly via `node` |
| **Quick run command** | `node ./scripts/phase5_render_checks.mjs` (after `bundle exec jekyll build`) |
| **Full suite command** | `./scripts/qa.sh` |
| **Estimated runtime** | ~10 seconds |

---

## Sampling Rate

- **After every task commit:** Run `./scripts/qa.sh`
- **After every plan wave:** Run `./scripts/qa.sh` + `./scripts/gates.sh gate4`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** ~10 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 05-01-01 | 01 | 0 | SEO-01, SEO-02, SEO-03 | static-HTML | `node ./scripts/phase5_render_checks.mjs` | ❌ W0 | ⬜ pending |
| 05-01-02 | 01 | 1 | SEO-03 | static-HTML | `./scripts/qa.sh` | ✅ after W0 | ⬜ pending |
| 05-01-03 | 01 | 1 | SEO-03 | static-HTML | `./scripts/qa.sh` | ✅ after W0 | ⬜ pending |
| 05-02-01 | 02 | 1 | SEO-01 | static-HTML | `./scripts/qa.sh` | ✅ after W0 | ⬜ pending |
| 05-02-02 | 02 | 1 | SEO-01 | static-HTML | `./scripts/qa.sh` | ✅ after W0 | ⬜ pending |
| 05-02-03 | 02 | 1 | SEO-02 | static-HTML | `./scripts/qa.sh` | ✅ after W0 | ⬜ pending |
| 05-03-01 | 03 | 1 | SEO-01, SEO-03 | static-HTML + rendered | `./scripts/qa.sh` + `./scripts/gates.sh gate4` | ✅ after W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `scripts/phase5_render_checks.mjs` — covers SEO-01 (indexing, canonical, hreflang, sitemap), SEO-02 (distinct descriptions), SEO-03 (Service and FAQPage JSON-LD, no placeholder identity in JSON-LD)
- [ ] Add `node ./scripts/phase5_render_checks.mjs` line to `scripts/qa.sh` after the Phase 4 line

*Wave 0 must be the first task of the first plan.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Placeholder business identity replaced in `_config.yml` | SEO-03 / release gate | User must supply real company name, phone, email | Confirm `company.name`, `company.phone`, `company.email` in `_config.yml` are not placeholder values before `allow_indexing` is flipped |
| Google Rich Results Test on FAQ page | SEO-03 | External tool, not automatable in CI | After phase complete, paste `/faq/` HTML into Google Rich Results Test and confirm FAQPage passes |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 15s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
