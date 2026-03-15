---
phase: 6
slug: identity-contact-and-navigation-completion
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-15
---

# Phase 6 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Custom Node.js render checks + bash qa.sh |
| **Config file** | `scripts/qa.sh` (invokes all render check scripts) |
| **Quick run command** | `./scripts/qa.sh` |
| **Full suite command** | `./scripts/gates.sh gate4` |
| **Estimated runtime** | ~30 seconds |

---

## Sampling Rate

- **After every task commit:** Run `./scripts/qa.sh`
- **After every plan wave:** Run `./scripts/qa.sh`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 30 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 6-01-01 | 01 | 0 | TRST-01, CALL-04, CASE-03 | smoke | `node ./scripts/phase6_render_checks.mjs` | ❌ W0 | ⬜ pending |
| 6-01-02 | 01 | 1 | TRST-01 | smoke | `./scripts/qa.sh` | ✅ after W0 | ⬜ pending |
| 6-01-03 | 01 | 1 | CALL-04 | smoke | `./scripts/qa.sh` | ✅ after W0 | ⬜ pending |
| 6-01-04 | 01 | 1 | CASE-03 | smoke | `./scripts/qa.sh` | ✅ after W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `scripts/phase6_render_checks.mjs` — covers TRST-01 (brand name), CALL-04 (no placeholder messenger URLs), CASE-03 (projects in nav)
- [ ] `scripts/qa.sh` — must gain `node ./scripts/phase6_render_checks.mjs` invocation line

*Wave 0 installs test infrastructure before any data/config edits land.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Messenger handles resolve to real, active channels | CALL-04 | Render check can only assert non-placeholder syntax; live channel availability requires human verification | Click each messenger link in rendered `/contact/` and `/en/contact/`; confirm Telegram, Viber, WhatsApp open to real business profile |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 30s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
