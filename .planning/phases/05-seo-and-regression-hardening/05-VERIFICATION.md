---
phase: 05-seo-and-regression-hardening
verified: 2026-03-13T14:00:00Z
status: passed
score: 12/12 must-haves verified
re_verification:
  previous_status: gaps_found
  previous_score: 11/12
  gaps_closed:
    - "_site/robots.txt allows crawlers: Plan 03 artifact spec revised to `contains: Disallow:` (canonical empty-Disallow form); rendered file contains `Disallow:` on line 3 and `Sitemap:` on line 4 — spec and implementation now agree"
  gaps_remaining: []
  regressions: []
human_verification:
  - test: "Paste _site/faq/index.html content into https://search.google.com/test/rich-results"
    expected: "FAQPage structured data recognized as valid; all question/answer pairs parsed without errors"
    why_human: "Google's rich results validator applies schema.org semantics beyond what grep can assert"
  - test: "Submit site to Google Search Console and use the robots.txt tester tool against the deployed URL"
    expected: "Googlebot shows Allowed for all submitted routes; no crawl blocks triggered"
    why_human: "The Disallow: (empty) form is spec-compliant allow-all, but live validation against Google's parser confirms behavior on the deployed URL"
  - test: "Run Lighthouse audit against the deployed production URL (not localhost)"
    expected: "SEO score >= 95 (SUMMARY-03 documents score of 100 on pre-deployment build)"
    why_human: "Lighthouse scores on deployed URLs can differ from local build scores due to canonical URL resolution, HTTPS, and CDN behavior"
---

# Phase 05: SEO and Regression Hardening Verification Report

**Phase Goal:** Make the expanded site more discoverable and more safely maintainable through stronger metadata coverage, broader intent pages, and rendered QA.
**Verified:** 2026-03-13T14:00:00Z
**Status:** passed
**Re-verification:** Yes — after gap closure (Plan 03 artifact spec updated to match canonical `Disallow:` robots.txt form)

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | Running `./scripts/qa.sh` after build exercises Phase 5 checks and passes with clear messages | VERIFIED | `node ./scripts/phase5_render_checks.mjs` exits 0 with "Phase 5 render checks passed."; qa.sh line 49 runs phase4, line 50 runs phase5 |
| 2 | Service-detail pages emit a valid `Service` JSON-LD block | VERIFIED | `"@type": "Service"` count=1 in `_site/services/plumbing/index.html`, `_site/services/apartment-renovation/index.html`, `_site/services/house-renovation/index.html` |
| 3 | FAQ page emits a `FAQPage` JSON-LD block; non-FAQ pages do not | VERIFIED | Count=1 in `_site/faq/index.html`; count=0 in `_site/index.html` |
| 4 | Render check asserts canonical, hreflang pairs, sitemap, no-noindex, no placeholder identity, and distinct descriptions | VERIFIED | All 8 check functions present in `scripts/phase5_render_checks.mjs` (207 lines) at lines 63-202; script passes against current build |
| 5 | No page emits a `noindex` directive | VERIFIED | `grep -c "noindex" _site/index.html` returns 0; `checkNotNoindex` passes all 14 routes |
| 6 | Business identity in `_config.yml` contains real company name and phone — no placeholders | VERIFIED | company.name: "Рівень", company.phone: "+380977878523"; no placeholder strings in built HTML |
| 7 | `robots.txt` references the sitemap URL | VERIFIED | `_site/robots.txt` line 4: `Sitemap: https://build-renovations.github.io/sitemap.xml` |
| 8 | `_site/robots.txt` allows all crawlers in canonical form | VERIFIED | Rendered file contains `Disallow:` (empty argument — spec-compliant allow-all) as the canonical single-line form; Plan 03 artifact spec updated to `contains: "Disallow:"` — spec and implementation agree |
| 9 | `./scripts/qa.sh` passes in full (all phase checks green) | VERIFIED | `node ./scripts/phase5_render_checks.mjs` exits 0; phase ordering confirmed at lines 49-50 in qa.sh |
| 10 | Service pages for apartment and house renovation have distinct `seo_description` values | VERIFIED | UA apartment: "Комплексний ремонт квартир..." / UA house: "Ремонт будинків..." — confirmed distinct in source files; `checkDistinctRenovationDescriptions` enforces this as a hard fail |
| 11 | `_site/sitemap.xml` present and non-empty | VERIFIED | 126-line valid XML sitemap at `_site/sitemap.xml` |
| 12 | Hreflang pair coverage correct across bilingual route pairs | VERIFIED | Home: `hreflang="en"` in `_site/index.html`, `hreflang="uk"` in `_site/en/index.html`; `checkHreflangPair` covers 7 bilingual pairs and passes |

**Score:** 12/12 truths verified

---

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `scripts/phase5_render_checks.mjs` | SEO render check script (min 80 lines) | VERIFIED | 207 lines; all 8 check functions present and wired; script passes against current build |
| `scripts/qa.sh` | Calls `node ./scripts/phase5_render_checks.mjs` | VERIFIED | Line 50 invokes phase5 checks immediately after phase4 at line 49 |
| `_includes/head.html` | Conditional Service and FAQPage JSON-LD blocks | VERIFIED | Service block guards on `page.layout == 'service_detail'` (line 73); FAQPage block guards on `page.translation_key == faq_page_key` (line 91); `site.data.faqs.groups` loop at line 98 |
| `_config.yml` | Real business identity and `allow_indexing: true` | VERIFIED | `allow_indexing: true` at line 58; company.name "Рівень", company.phone "+380977878523"; no placeholder strings in built pages |
| `_site/robots.txt` | Crawler access with canonical `Disallow:` and `Sitemap:` reference | VERIFIED | `Disallow:` (empty, allow-all) at line 3; `Sitemap:` at line 4; Plan 03 spec `contains: "Disallow:"` matches rendered output |
| `_site/sitemap.xml` | Full page index for search engine discovery | VERIFIED | 126-line valid XML sitemap present |

---

### Key Link Verification

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| `scripts/qa.sh` | `scripts/phase5_render_checks.mjs` | `node ./scripts/phase5_render_checks.mjs` call | VERIFIED | Line 50 in qa.sh; phase4 at line 49, phase5 at line 50 |
| `_includes/head.html` | `_data/faqs.yml` | Liquid loop over `site.data.faqs.groups` | VERIFIED | Line 98: `{% for group in site.data.faqs.groups %}`; uses `item[page.lang]` for locale |
| `_config.yml seo.allow_indexing` | `_includes/head.html` robots meta conditional | `{% unless site.seo.allow_indexing %}` toggle | VERIFIED | `allow_indexing: true` in config; `_site/index.html` contains no noindex tag |
| `_config.yml seo.allow_indexing` | `robots.txt` Liquid template | `{% if site.seo.allow_indexing %}` toggle | VERIFIED | Source template uses `{% if site.seo.allow_indexing %}` branch; rendered output allows crawling |
| `_config.yml company.*` | `_includes/head.html` JSON-LD | `site.company.name`, `site.company.phone` | VERIFIED | Real values render in built JSON-LD at lines 59 and 64 of head.html; no placeholder identity in `_site/index.html` |
| `_site/robots.txt` | `_site/sitemap.xml` | `Sitemap:` directive | VERIFIED | `_site/robots.txt` line 4: `Sitemap: https://build-renovations.github.io/sitemap.xml` |

---

### Requirements Coverage

| Requirement | Source Plan(s) | Description | Status | Evidence |
|-------------|---------------|-------------|--------|----------|
| SEO-01 | 05-01, 05-02, 05-03 | Search engines can crawl a broader set of trust and service-supporting pages with correct canonical and hreflang behavior | SATISFIED | `allow_indexing: true`; canonical tags verified on all 14 checked routes; hreflang pairs verified across 7 bilingual pairs; sitemap.xml present at 126 lines; robots.txt allows all crawlers |
| SEO-02 | 05-01, 05-02, 05-03 | Visitor landing from search can find pages matching specific renovation intents | SATISFIED | Distinct seo_description values confirmed on apartment-renovation and house-renovation source files (UA and EN); `checkDistinctRenovationDescriptions` enforces this as a hard fail going forward |
| SEO-03 | 05-01, 05-02, 05-03 | Search engines can read richer business and page context through maintained metadata and structured data | SATISFIED | Service JSON-LD present on all 6 service-detail routes (3 UA + 3 EN); FAQPage JSON-LD present on both faq routes; real business identity ("Рівень", live phone) in JSON-LD; no placeholder identity in any built page |

No orphaned requirements: all three Phase 5 requirement IDs (SEO-01, SEO-02, SEO-03) are claimed by all three plans, tracked in REQUIREMENTS.md as Complete, and verified by codebase evidence.

---

### Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
|------|------|---------|----------|--------|
| `_config.yml` | 47-52 | `phase1_placeholder` block with `status: "approved-phase-1"` note | Info | Policy-approved placeholder marker for `service_area.uk` and `service_area.en` only; company name and phone are now real values |

No stub implementations, no TODO/FIXME markers, no empty return values found in phase-modified files (`scripts/phase5_render_checks.mjs`, `_includes/head.html`, `_config.yml`, `assets/css/site.css`, `scripts/gates.sh`, `robots.txt`).

All five phase commits verified in git history: `81fc54c`, `6749800`, `29906ce`, `1a272aa`, `2e900e7`.

---

### Human Verification Required

The following items cannot be verified programmatically against the static build:

#### 1. Rich Results Schema Validation

**Test:** Paste `_site/faq/index.html` content into https://search.google.com/test/rich-results
**Expected:** FAQPage structured data recognized as valid; all question/answer pairs parsed without errors
**Why human:** Google's rich results validator applies schema.org semantics beyond what grep can assert

#### 2. robots.txt Interpretation by Search Engine Crawlers

**Test:** Submit site to Google Search Console and use the robots.txt tester tool against the deployed URL
**Expected:** Googlebot shows "Allowed" for all submitted routes; no crawl blocks triggered
**Why human:** The `Disallow:` (empty) form is spec-compliant allow-all, but live validation against Google's parser confirms behavior on the deployed URL; SUMMARY-03 notes Lighthouse SEO=100 after the canonical format fix

#### 3. Lighthouse SEO Score Post-Deployment

**Test:** Run Lighthouse audit against the deployed production URL (not localhost)
**Expected:** SEO score >= 95 (SUMMARY-03 documents score of 100 on pre-deployment build)
**Why human:** Lighthouse scores on deployed URLs can differ from local build scores due to canonical URL resolution, HTTPS, and CDN behavior

---

### Re-verification Summary

**Previous gap closed:** The initial verification found that `_site/robots.txt` did not contain the literal string `Allow: /` that Plan 03's must-have artifact spec required. This was a spec-vs-implementation wording mismatch — the rendered file used the technically equivalent canonical `Disallow:` (empty argument) form, which all crawlers interpret as "allow all". Plan 03 was revised after the initial verification: its artifact spec was updated to `contains: "Disallow:"`, matching the canonical format that was deliberately chosen in commit `2e900e7` to resolve a Lighthouse robots.txt validity warning.

The re-verification confirms the rendered `_site/robots.txt` contains `Disallow:` (line 3) and `Sitemap:` (line 4). The Plan 03 spec and the actual output now agree. The gap is closed.

**No regressions detected** across all previously verified truths.

---

_Verified: 2026-03-13T14:00:00Z_
_Re-verification: Yes — after Plan 03 artifact spec update_
_Verifier: Claude (gsd-verifier)_
