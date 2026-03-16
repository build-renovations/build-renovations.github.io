---
phase: 07-qa-coverage-extension
verified: 2026-03-15T00:00:00Z
status: human_needed
score: 4/4 must-haves verified
re_verification: false
human_verification:
  - test: "Run ./scripts/qa.sh end-to-end in a clean environment"
    expected: "All six render check scripts pass and qa.sh exits 0"
    why_human: "Cannot execute qa.sh without a built _site/ — static wiring is confirmed but live script execution requires jekyll build and a working Ruby/Node environment"
---

# Phase 7: QA Coverage Extension Verification Report

**Phase Goal:** Extend rendered QA coverage to the full surface area of the site — 3 unchecked dossier routes and 5 unchecked service routes — so no page can silently regress.
**Verified:** 2026-03-15
**Status:** human_needed (all automated checks passed; live qa.sh run requires built _site)
**Re-verification:** No — initial verification

---

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | phase3_render_checks.mjs covers all 5 dossier routes (uk + en pairs) | VERIFIED | Lines 34-39: 6 entries for apartment-system-renovation, wet-zone-control, controlled-handover (uk + en each); lines 45-47: 3 new metadataPairs; total metadataPairs = 6 (all 5 dossiers + /projects/ index) |
| 2 | phase4_render_checks.mjs covers all 5 dossier routes (uk + en pairs) | VERIFIED | Lines 94-128: 6 entries for the 3 new dossiers (uk + en each) with correct premium-shell markers and surfaces; lines 138-140: 3 new parityPairs; total parityPairs = 10 |
| 3 | phase5_render_checks.mjs covers all 8 service routes across checkedRoutes, serviceDetailRoutes, and bilingualPairs | VERIFIED | checkedRoutes lines 20-29: 10 new entries (5 services x 2 locales); bilingualPairs lines 42-46: 5 new pairs; serviceDetailRoutes lines 58-67: 10 new entries — all 5 services (electrical, finishing, rough-works, procurement, site-supervision) present in all three arrays |
| 4 | qa.sh invokes phase3, phase4, and phase5 render check scripts in pipeline | VERIFIED | qa.sh lines 48-50: sequential node invocations; file uses set -euo pipefail so any non-zero exit propagates |

**Score:** 4/4 truths verified

---

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `scripts/phase3_render_checks.mjs` | Dossier marker and surface coverage for all 5 dossiers | VERIFIED | Contains apartment-system-renovation, wet-zone-control, controlled-handover in both routeChecks and metadataPairs; pattern match confirmed |
| `scripts/phase4_render_checks.mjs` | Premium shell surface coverage for all 5 dossiers | VERIFIED | Contains all 3 new dossiers in routeChecks with correct surface set; parityPairs extended to 10 entries |
| `scripts/phase5_render_checks.mjs` | SEO metadata and schema coverage for all 8 services | VERIFIED | All 5 new services present in checkedRoutes, serviceDetailRoutes, and bilingualPairs; checkServiceSchema function iterates over serviceDetailRoutes so schema gate automatically covers new routes |

---

### Key Link Verification

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| `scripts/phase3_render_checks.mjs` | `_site/projects/apartment-system-renovation/index.html` | routeChecks declarative array -> readRoute() | WIRED | Pattern "apartment-system-renovation" in routeChecks at line 34; readRoute() called for all routeChecks entries at line 280 |
| `scripts/phase5_render_checks.mjs` | `_site/services/electrical/index.html` | serviceDetailRoutes -> ensureServiceSchema() (checkServiceSchema) | WIRED | "electrical" in serviceDetailRoutes at lines 58-59; checkServiceSchema at line 139 guards on serviceDetailRoutes membership |
| `scripts/qa.sh` | `scripts/phase3_render_checks.mjs, phase4_render_checks.mjs, phase5_render_checks.mjs` | sequential pipeline invocation | WIRED | Lines 48-50 of qa.sh invoke all three scripts; set -euo pipefail propagates failures |

---

### Requirements Coverage

Requirements declared in PLAN frontmatter: CASE-01, CASE-04, SEO-02, SEO-03

| Requirement | Source Plan | Description | Status | Evidence |
|-------------|------------|-------------|--------|----------|
| CASE-01 | 07-01-PLAN.md | Dossier routes covered by render checks | SATISFIED | All 5 dossier routes now in phase3 and phase4 routeChecks |
| CASE-04 | 07-01-PLAN.md | Dossier parity checks (uk/en) | SATISFIED | metadataPairs and parityPairs both extended to cover all 5 dossier pairs |
| SEO-02 | 07-01-PLAN.md | Service SEO metadata and schema checks | SATISFIED | All 8 service routes in checkedRoutes (canonical, noindex, hreflang) and serviceDetailRoutes (Service JSON-LD schema) |
| SEO-03 | 07-01-PLAN.md | Bilingual hreflang coverage for service routes | SATISFIED | All 8 service route pairs in bilingualPairs; checkHreflangPair covers all pairs |

---

### Anti-Patterns Found

Scanned all three modified scripts for placeholders, stubs, and empty implementations.

| File | Pattern | Severity | Impact |
|------|---------|----------|--------|
| None found | — | — | All additions are substantive declarative array entries; no TODOs, placeholders, or empty handlers detected |

---

### Human Verification Required

#### 1. Full qa.sh pipeline execution

**Test:** From the repo root, run `./scripts/qa.sh`
**Expected:** Jekyll build completes, all six render check scripts (phase1 through phase6) pass, and the command exits 0 with "Build and file checks passed."
**Why human:** The qa.sh script requires a live jekyll build and a built `_site/` directory. Static analysis confirms all route entries are present and the pipeline wiring is correct, but actual HTML content in the built pages must satisfy each marker and schema assertion at runtime.

---

### Gaps Summary

No gaps found. All four must-have truths are satisfied in the codebase:

- phase3_render_checks.mjs: 6 new dossier route entries added to routeChecks (lines 34-39) and 3 new pairs added to metadataPairs (lines 45-47), bringing total dossier metadataPairs to 5.
- phase4_render_checks.mjs: 6 new dossier route entries added to routeChecks (lines 94-128) and 3 new pairs added to parityPairs (lines 138-140), bringing total dossier parityPairs to 5.
- phase5_render_checks.mjs: All 5 missing services (electrical, finishing, rough-works, procurement, site-supervision) added to all three arrays — checkedRoutes, bilingualPairs, and serviceDetailRoutes — with correct uk/en entries in each.
- qa.sh: Pipeline sequentially invokes phase3, phase4, and phase5 scripts at lines 48-50 under set -euo pipefail.

Three task commits verified in git history: 36c0035 (phase3), 192da74 (phase4), e69e30b (phase5).

The only remaining item is a live qa.sh run against a built `_site/`, which requires human execution.

---

_Verified: 2026-03-15_
_Verifier: Claude (gsd-verifier)_
