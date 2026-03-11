---
phase: 1
slug: trust-and-phone-foundation
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-11
---

# Phase 1 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | repo QA scripts + browser automation |
| **Config file** | `scripts/qa.sh` |
| **Quick run command** | `./scripts/qa.sh` |
| **Full suite command** | `./scripts/qa.sh` + rendered browser checks for UA/EN conversion surfaces |
| **Estimated runtime** | ~60-180 seconds |

---

## Sampling Rate

- **After every task commit:** Run `./scripts/qa.sh`
- **After every plan wave:** Run `./scripts/qa.sh` + rendered browser checks for Phase 1 routes
- **Before `$gsd-verify-work`:** Full suite must be green
- **Max feedback latency:** 180 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 01-01-01 | 01 | 1 | CALL-01 | build + rendered | `./scripts/qa.sh` | ✅ | ⬜ pending |
| 01-01-02 | 01 | 1 | CALL-03 | rendered mobile | `./scripts/qa.sh` + mobile sticky CTA check | ✅ | ⬜ pending |
| 01-01-03 | 01 | 1 | TRST-01 | data integrity | `./scripts/qa.sh` + placeholder policy check | ✅ | ⬜ pending |
| 01-02-01 | 02 | 2 | TRST-02 | content + rendered | `./scripts/qa.sh` + project-fit visibility check | ✅ | ⬜ pending |
| 01-02-02 | 02 | 2 | CALL-02 | content + rendered | `./scripts/qa.sh` + call-brief visibility check | ✅ | ⬜ pending |
| 01-02-03 | 02 | 2 | CALL-04 | rendered | `./scripts/qa.sh` + messenger-secondary check | ✅ | ⬜ pending |
| 01-03-01 | 03 | 3 | TRST-03 | rendered | `./scripts/qa.sh` + accountability-block check | ✅ | ⬜ pending |
| 01-03-02 | 03 | 3 | TRST-04 | data + rendered | `./scripts/qa.sh` + sourced-proof-or-placeholder-label check | ✅ | ⬜ pending |
| 01-03-03 | 03 | 3 | TRST-01 | validation artifact | `test -f .planning/phases/01-trust-and-phone-foundation/01-VALIDATION.md` | ✅ | ⬜ pending |
| 01-03-04 | 03 | 3 | TRST-04 | sign-off gate | `./scripts/qa.sh` + sourced-proof-or-placeholder-label check | ✅ | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] Extend `scripts/qa.sh` or add a Phase 1 validation helper to fail on unlabeled placeholder phone/email/business identity data.
- [ ] Add checks that new trust/contact data files contain both `uk` and `en`.
- [ ] Add rendered browser checks for visible `a[href^="tel:"]` across `/`, `/about/`, `/services/`, `/process/`, `/contact/`, `/services/plumbing/`, `/services/electrical/`, `/services/finishing/`, `/services/site-supervision/`, and their `/en/` equivalents.
- [ ] Add rendered browser checks that sticky mobile CTA does not cover readable content or footer actions.
- [ ] Add rendered browser checks that messenger links exist and remain visually secondary to phone.

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| CTA tone feels confident and direct rather than vague or pushy | CALL-02 | Tone quality is editorial, not binary | Review homepage, service page, and contact copy in both languages and confirm it clearly pushes direct contact with “clear next steps” framing |
| Messenger hierarchy feels first-class but still secondary to phone | CALL-04 | Visual emphasis judgment is hard to reduce to one binary DOM check | Inspect mobile and desktop CTA zones and confirm phone is primary while Telegram/Viber/WhatsApp remain prominent and legitimate |
| Trust signals feel concrete rather than generic | TRST-01 / TRST-03 / TRST-04 | Credibility depends on content specificity and sourcing quality | Review core pages and confirm trust blocks cite business facts, fit criteria, accountability language, and either sourced proof or clearly labeled placeholder proof |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 guardrails cover placeholder identity policy, bilingual shared-data completeness, required tel-link route coverage, sticky CTA overlap, and messenger-secondary hierarchy checks
- [ ] No watch-mode flags
- [ ] Feedback latency < 180s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
