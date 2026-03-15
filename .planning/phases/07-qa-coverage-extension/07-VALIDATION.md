---
phase: 7
slug: qa-coverage-extension
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-15
---

# Phase 7 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Custom Node.js ESM render check scripts (no test runner) |
| **Config file** | none — scripts invoked directly |
| **Quick run command** | `node ./scripts/phase3_render_checks.mjs && node ./scripts/phase4_render_checks.mjs && node ./scripts/phase5_render_checks.mjs` |
| **Full suite command** | `./scripts/qa.sh` |
| **Estimated runtime** | ~5 seconds |

---

## Sampling Rate

- **After every task commit:** Run `node ./scripts/phase3_render_checks.mjs` or the specific script being extended
- **After every plan wave:** Run `./scripts/qa.sh`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 5 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 7-01-01 | 01 | 1 | CASE-01, CASE-04 | smoke | `node ./scripts/phase3_render_checks.mjs` | ✅ (needs route additions) | ⬜ pending |
| 7-01-02 | 01 | 1 | CASE-01, CASE-04 | smoke | `node ./scripts/phase4_render_checks.mjs` | ✅ (needs route additions) | ⬜ pending |
| 7-01-03 | 01 | 1 | SEO-02, SEO-03 | smoke | `node ./scripts/phase5_render_checks.mjs` | ✅ (needs route additions) | ⬜ pending |
| 7-01-04 | 01 | 1 | CASE-01, CASE-04, SEO-02, SEO-03 | smoke | `./scripts/qa.sh` | ✅ | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

Existing infrastructure covers all phase requirements. The work is adding route entries to existing scripts, not creating new infrastructure.

---

## Manual-Only Verifications

All phase behaviors have automated verification.

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 5s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
