# Phase 5: SEO And Regression Hardening - Research

**Researched:** 2026-03-13
**Domain:** Jekyll bilingual SEO (canonical / hreflang), Schema.org structured data, indexing posture, rendered QA via Node.js static-HTML checks
**Confidence:** HIGH

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| SEO-01 | Search engines can crawl a broader set of trust and service-supporting pages with correct canonical and `hreflang` behavior. | Canonical and hreflang mechanics in `_includes/head.html` are fully understood; new pages added in Phases 2-4 (projects, case studies, property-type services) must participate in the same `translation_key` pairing contract or they have no `hreflang` alternates. Indexing is currently disabled site-wide; enabling it with `allow_indexing: true` is the prerequisite for crawlability. |
| SEO-02 | Visitor landing from search can find pages that match specific renovation intents such as property type, service scope, or proof-oriented queries. | Existing service-detail pages already have distinct intents. The gap is intent coverage for property-type scoped queries (apartment vs. house), proof/quality-assurance type queries, and supporting trust pages. Research documents what makes a page non-thin and how to verify distinct footprint. |
| SEO-03 | Search engines can read richer business and page context through maintained metadata and structured data where accurate. | Current JSON-LD covers `HomeAndConstructionBusiness` entity only. Research identifies `Service`, `FAQPage`, `BreadcrumbList`, and `WebPage`/`Article` as the relevant additions. Current metadata infrastructure (canonical, OG, description) is intact; the gap is depth of structured data and accuracy of business identity fields now that Phase 5 must replace placeholder values. |
</phase_requirements>

---

## Summary

Phase 5 receives a site that has been structurally completed through four prior phases: trust and phone foundation, content depth, case study system, and premium UX. The site currently has `seo.allow_indexing: false` set in `_config.yml`, which emits `noindex, nofollow, noarchive` on every page and sets `robots.txt` to `Disallow: /`. No page on the site is currently indexed, regardless of metadata quality. The primary launch gate for this phase is flipping that setting to `true`.

The bilingual architecture is mature and well-tested: `translation_key` pairs drive `hreflang` generation in `_includes/head.html`, canonical URLs self-reference per page, and `jekyll-sitemap` produces `_site/sitemap.xml`. The main SEO structural risk is pages that have no `translation_key` set — those pages generate no `hreflang` alternates and get only an `x-default` pointing at `/`. The projects and case-study page family added in Phase 3 does carry `translation_key` pairs, as do all service-detail pages. Any new trust or support pages added in Phase 5 must follow the same front matter contract.

The QA side of this phase involves writing a `phase5_render_checks.mjs` that extends the established pattern from Phases 1-4. The check must validate: indexing directives have been flipped, canonical is present and self-referential on every checked route, `hreflang` alternates cover all bilingual pairs, structured data is present and parseable, the primary phone CTA is visible, and placeholder business identity fields have been replaced with real values. The Phase 4 UAT recorded four unresolved cosmetic issues (header overlap, spacing gaps on /process/ and service pages, projects index visual gaps, EN copy quality); Phase 5 should track these as known issues and verify that the rendered QA check does not regress them further.

**Primary recommendation:** Flip `allow_indexing` to `true`, extend structured data to `Service`/`FAQPage` types where accurate, add `phase5_render_checks.mjs` following the established pattern, and confirm every route family has correct `translation_key`-driven `hreflang` coverage before treating Phase 5 as complete.

---

## Standard Stack

### Core

| Library / Tool | Version | Purpose | Why Standard |
|----------------|---------|---------|--------------|
| Jekyll + `github-pages` gem | `jekyll 3.9.0` via `github-pages 223` (pinned in Gemfile.lock) | Static site generation and templating | Already in use; GitHub Pages safe-mode constraint locks this choice |
| `jekyll-sitemap` | `1.4.0` (via github-pages bundle) | Automatic `sitemap.xml` generation | Already enabled in `_config.yml`; verified present in `scripts/qa.sh` |
| `jekyll-seo-tag` | `2.8.0` (via github-pages bundle) | SEO helper — note: plugin is installed but `{% seo %}` is NOT called; all metadata is manual in `_includes/head.html` | Already installed; Phase 5 should continue using the manual approach rather than switching to `{% seo %}` since manual output is already correct and well-tested |
| Schema.org JSON-LD (manual) | Inline in `_includes/head.html` | Structured data for business and page context | Already present for `HomeAndConstructionBusiness`; Phase 5 expands to `Service` and `FAQPage` types |
| Node.js render checks (`.mjs`) | Node.js (existing) | Static HTML assertion scripts | Established pattern: `phase1_render_checks.mjs` through `phase4_render_checks.mjs` all run via `scripts/qa.sh` |
| `npx lighthouse` | Latest via npx | Rendered page audit (SEO, performance, accessibility) | Already integrated in `scripts/gates.sh gate4`; SEO score threshold is 95 |
| `npx linkinator` | Latest via npx | Broken-link crawl after build | Already integrated in `scripts/gates.sh gate4` |

### Supporting

| Tool | Purpose | When to Use |
|------|---------|-------------|
| `_config.yml` `seo.allow_indexing` flag | Master toggle for `robots` meta and `robots.txt` `Disallow: /` | Set to `true` as a Phase 5 launch task; all downstream SEO work is meaningless without this |
| `robots.txt` (Liquid template) | Emits `Disallow: /` when indexing off, `Allow: /` + Sitemap when on | Automatically correct once `allow_indexing` is flipped; no separate edit needed |
| `_data/translations.yml` | Bilingual copy strings | Use for any new UI copy that appears in shared layouts or includes |
| `_data/service_pages.yml` | Structured service content | Source of truth for service intents; extend rather than duplicate for any new intent pages |
| `_data/faqs.yml` | FAQ content grouped by topic | FAQPage schema should pull from this same data source |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Manual JSON-LD in `_includes/head.html` | `{% seo %}` from `jekyll-seo-tag` | `jekyll-seo-tag` does not support all schema types needed (Service, FAQPage) and switching now would discard verified canonical/hreflang/OG output; manual is correct choice |
| Node.js static HTML render checks | Playwright browser automation | Playwright is heavier and not installed; Node.js static checks are the established, lower-overhead pattern for this repo |
| `jekyll-sitemap` | Manual sitemap | `jekyll-sitemap` is already working and GitHub Pages safe; do not replace it |

**Installation note:** No new npm or Ruby dependencies are needed for Phase 5. All tooling is already present.

---

## Architecture Patterns

### Recommended Project Structure for Phase 5

```
scripts/
└── phase5_render_checks.mjs    # New: SEO/indexing/hreflang/schema assertions

_includes/
└── head.html                   # Extend: richer JSON-LD blocks (Service, FAQPage)

_config.yml                     # Change: seo.allow_indexing -> true
                                # Change: company.name, phone, email (replace placeholders)

_data/
└── service_pages.yml           # Possibly extend: structured-data-friendly fields

# New content pages (if needed for SEO-02):
services/apartment-renovation/index.md   # Already exists
services/house-renovation/index.md      # Already exists
# Verify existing pages cover distinct intents before adding new ones
```

### Pattern 1: Translation Key Pairing for hreflang Coverage

**What:** Every page that should participate in bilingual `hreflang` links must have a `translation_key` front matter value that matches exactly between the UA and EN versions. `_includes/head.html` uses `site.pages | where: "translation_key", translation_key` to find siblings.

**When to use:** Every new page added in Phase 5 — any trust or support page, any new intent page — must set `translation_key` and `lang`.

**Example:**
```yaml
# services/apartment-renovation/index.md
---
lang: uk
translation_key: apartment-renovation-service
permalink: /services/apartment-renovation/
---

# en/services/apartment-renovation/index.md
---
lang: en
translation_key: apartment-renovation-service
permalink: /en/services/apartment-renovation/
---
```

If the translation key is missing or mismatched, `_includes/head.html` will find zero siblings and will fall back to `x-default` pointing at `/` only. This is verified by Phase 5 render checks.

### Pattern 2: JSON-LD Structured Data in head.html

**What:** `_includes/head.html` emits a single `<script type="application/ld+json">` block using the global business entity from `_config.yml`. Phase 5 extends this with conditional page-type blocks.

**When to use:** Add `Service` schema when the page has `layout: service_detail`. Add `FAQPage` schema when the page has `layout: process` or is the FAQ page. Do not add schema types that cannot be verified as accurate (e.g., do not add `AggregateRating` without real verified review data).

**Example — Service page extension:**
```liquid
{% if page.layout == 'service_detail' %}
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "{{ page.title }}",
  "description": "{{ page_description }}",
  "url": "{{ page_url }}",
  "provider": {
    "@type": "{{ site.seo.type }}",
    "name": "{{ site.company.name }}",
    "telephone": "{{ site.company.phone }}",
    "areaServed": "{{ site.company.service_area[lang] | default: site.company.service_area.uk }}"
  }
}
</script>
{% endif %}
```

**Example — FAQPage schema:**
```liquid
{% if page.layout == 'page' and page.translation_key == 'faq' %}
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {% for group in site.data.faqs.groups %}
      {% for item in group.items %}
      {
        "@type": "Question",
        "name": {{ item[lang].question | jsonify }},
        "acceptedAnswer": {
          "@type": "Answer",
          "text": {{ item[lang].answer | jsonify }}
        }
      }{% unless forloop.last and forloop.parentloop.last %},{% endunless %}
      {% endfor %}
    {% endfor %}
  ]
}
</script>
{% endif %}
```

Note: Verify the `_data/faqs.yml` structure before writing the FAQPage Liquid. The data model uses grouped items with bilingual keys.

### Pattern 3: Phase Render Check Script

**What:** Each phase adds a `scripts/phaseN_render_checks.mjs` that reads built `_site/` HTML files and asserts phase-specific conditions. The script is added to `scripts/qa.sh` and called as `node ./scripts/phase5_render_checks.mjs`.

**When to use:** Write Phase 5 checks to verify the SEO/indexing conditions the planner will specify. The check should not overlap with what Phases 1-4 already verify.

**What Phase 5 checks should cover (mapped to requirements):**
- `allow_indexing` is `true` → `<meta name="robots">` is absent or contains `index` (not `noindex`) on all checked routes — maps to SEO-01
- Every checked route has a `<link rel="canonical">` pointing to the self URL — maps to SEO-01
- Every bilingual route pair has matching `hreflang` link tags (e.g., `/services/plumbing/` has `hreflang="uk"` and `hreflang="en"` pointing to `/en/services/plumbing/`) — maps to SEO-01
- `sitemap.xml` is present in `_site/` and is non-empty — maps to SEO-01
- Service-detail pages have a `Service` JSON-LD block — maps to SEO-03
- FAQ page has a `FAQPage` JSON-LD block — maps to SEO-03
- Business identity fields (phone, email, company name) do not contain placeholder values on any checked route — maps to final release readiness (carried over from Phase 1 placeholder-replacement intent)

**Example structure:**
```javascript
// scripts/phase5_render_checks.mjs
import fs from "node:fs";
import path from "node:path";

const siteRoot = path.join(process.cwd(), "_site");
const checkedRoutes = [
  { route: "/", lang: "uk" },
  { route: "/en/", lang: "en" },
  { route: "/services/plumbing/", lang: "uk" },
  { route: "/en/services/plumbing/", lang: "en" },
  // ... all major bilingual pairs
];
const bilingualPairs = [
  ["/services/plumbing/", "/en/services/plumbing/"],
  ["/services/apartment-renovation/", "/en/services/apartment-renovation/"],
  ["/projects/", "/en/projects/"],
  ["/faq/", "/en/faq/"],
  // ...
];

function fail(message) {
  console.error(`Phase 5 render checks failed: ${message}`);
  process.exit(1);
}

function ensureIndexable(route, html) {
  if (/noindex/i.test(html)) {
    fail(`${route} still contains noindex directive`);
  }
}

function ensureCanonical(route, html) {
  if (!/<link rel="canonical"/i.test(html)) {
    fail(`${route} missing canonical tag`);
  }
}

function ensureHreflang(route, html, expectedPairs) {
  for (const [lang, href] of expectedPairs) {
    const pattern = new RegExp(`hreflang="${lang}"[^>]*href="${href}"|href="${href}"[^>]*hreflang="${lang}"`, "i");
    if (!pattern.test(html)) {
      fail(`${route} missing hreflang="${lang}" pointing to ${href}`);
    }
  }
}
```

### Anti-Patterns to Avoid

- **Adding `translation_key` to only one side of a UA/EN pair:** The `hreflang` loop requires both `uk` and `en` pages to share the same key for alternates to appear.
- **Emitting schema types for data that does not exist:** Do not add `AggregateRating` without verified review data, do not add `OpeningHours` without a confirmed schedule. Inaccurate schema can trigger Google's "rich result manual actions."
- **Calling `{% seo %}` in templates:** The existing `_includes/head.html` manual approach is verified and tested. Mixing `jekyll-seo-tag` output with manual tags will produce duplicate `<title>`, duplicate canonical, and duplicate OG tags.
- **Flipping `allow_indexing` before placeholder identity fields are replaced:** The Phase 1 render checks (`phase1_render_checks.mjs`) already check for placeholder patterns in name/phone/email on rendered pages. Indexing should not go live with `company.name: "Business name pending confirmation"`.
- **Writing `phase5_render_checks.mjs` without adding it to `scripts/qa.sh`:** Every prior phase check is added to `qa.sh`. Phase 5 must follow the same pattern or its checks are invisible to the gate.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Sitemap generation | Custom sitemap template | `jekyll-sitemap` (already active) | Plugin handles all pages, respects `sitemap: false` front matter, generates correct XML |
| `hreflang` link generation | Page-by-page manual `<link>` tags | Existing loop in `_includes/head.html` using `translation_key` | Already works; hand-rolling per-page breaks when pages are added without updating all alternate references |
| Robots indexing toggle | Hardcoded `<meta name="robots" content="index">` per template | `_config.yml` `seo.allow_indexing` flag + `{% unless site.seo.allow_indexing %}` conditional | Single-point control; robots.txt is also driven by the same flag |
| Lighthouse SEO audit | Custom link/title checker | `npx lighthouse` already in `scripts/gates.sh gate4` with 95-score threshold | Covers canonical, description, hreflang, crawlability, and more |
| Schema.org validation | Custom validator | Google Rich Results Test (manual) or structured-data linter (out of scope for CI) | The rendered JSON-LD in `_site/` can be spot-checked manually; automated deep schema validation is not worth the tooling cost for a static site at this scale |

**Key insight:** The SEO infrastructure for this site is already largely in place and working. Phase 5 is an accuracy and coverage pass, not a ground-up build. The main risks are omission (missing `translation_key`, missing `allow_indexing` flip, missing schema for new page types) rather than wrong architecture.

---

## Common Pitfalls

### Pitfall 1: Indexing Never Gets Flipped

**What goes wrong:** The site ships with all SEO metadata in place but `seo.allow_indexing: false` still set, meaning `robots.txt` blocks all crawlers and every page emits `noindex`. The site is invisible to search engines regardless of content quality.

**Why it happens:** `allow_indexing` was intentionally kept `false` through all development phases. It must be explicitly changed as a conscious launch task, not assumed to have changed.

**How to avoid:** Make flipping `allow_indexing: true` in `_config.yml` a specific, named task in the Phase 5 plan. The Phase 5 render check should assert `noindex` is absent from all checked routes.

**Warning signs:** If `_site/index.html` contains `<meta name="robots" content="noindex"`, the flag has not been flipped.

### Pitfall 2: New Pages Added Without translation_key Pairing

**What goes wrong:** A new trust page or intent page is added in Phase 5 (e.g., a "why hire us" support page) with a Ukrainian version but no EN mirror, or with mismatched `translation_key` values. That page gets no `hreflang` alternates, which produces a Google Search Console signal of an orphaned page in the language cluster.

**Why it happens:** The bilingual mirroring requirement is enforced by convention, not by the build process. The build does not fail if a page has no sibling.

**How to avoid:** Add an explicit `hreflang pair coverage` check to `phase5_render_checks.mjs` that verifies every checked route's UA version has a matching EN sibling link and vice versa. The check should test both directions.

**Warning signs:** A page's rendered HTML contains only `<link rel="alternate" hreflang="x-default">` with no language-specific alternates.

### Pitfall 3: Schema Contains Placeholder Business Identity

**What goes wrong:** The `HomeAndConstructionBusiness` JSON-LD block emits `"name": "Business name pending confirmation"`, `"telephone": "+380000000000"`, or `"email": "hello@example.com"`. These values are currently in `_config.yml` under `company:`. Indexing while these values are present broadcasts placeholder content to search engines and could be flagged by Google as misleading structured data.

**Why it happens:** The placeholder identity was approved for Phases 1-4 and is checked by `phase1_render_checks.mjs` using placeholder-detection regexes. As long as `allow_indexing: false`, the impact was zero. Phase 5 requires actual values.

**How to avoid:** Replacing placeholder `company.name`, `company.phone`, and `company.email` in `_config.yml` must be a Phase 5 prerequisite task before the indexing flag is flipped. The Phase 5 render check should assert no placeholder patterns appear in the JSON-LD block on checked routes.

**Warning signs:** `_site/index.html` JSON-LD contains `Business name pending confirmation` or `+380000000000`.

### Pitfall 4: Thin Intent Pages That Duplicate Existing Service Coverage

**What goes wrong:** Phase 5 adds new "intent" pages (e.g., "kitchen renovation Lviv") that repeat the same content as existing service pages with minor wording changes. Google treats these as thin or duplicate pages, which can dilute the authority of the existing service pages rather than expanding it.

**Why it happens:** SEO-02 requires "pages that match specific renovation intents." The temptation is to add many short pages for each intent combination. This misreads the requirement.

**How to avoid:** Phase 5 intent pages must have meaningfully distinct content tied to a specific buyer concern or property type that is not already covered. The site already has `services/apartment-renovation/` and `services/house-renovation/` for property-type coverage. New intent pages should be added only when there is a real content gap, not as a thin-footprint play. The REQUIREMENTS.md description of SEO-02 says "distinct renovation intents rather than thin or duplicative footprint growth."

**Warning signs:** A new page shares more than ~70% of its paragraph text with an existing service page after filtering shared navigation.

### Pitfall 5: Duplicate JSON-LD Blocks on the Same Page

**What goes wrong:** Extending `_includes/head.html` to emit conditional `Service` or `FAQPage` blocks, while the global `HomeAndConstructionBusiness` block remains, produces two separate JSON-LD scripts. This is valid per the spec — multiple JSON-LD blocks are allowed — but a conditional that accidentally fires on pages where it shouldn't (e.g., `FAQPage` schema appearing on every `layout: page` rather than only the FAQ page) is a correctness error.

**Why it happens:** Liquid conditions in `head.html` are easy to get slightly wrong, and there are no build-level schema validators.

**How to avoid:** Test each new JSON-LD condition by inspecting the generated `_site/` HTML for a non-FAQ page and a FAQ page after build. The Phase 5 render check should assert that `"@type": "FAQPage"` does NOT appear on `/` or `/services/plumbing/`, and DOES appear on `/faq/`.

---

## Code Examples

Verified patterns from the existing codebase:

### Canonical and hreflang — Current Implementation in head.html

```liquid
<!-- Source: _includes/head.html (existing) -->
<link rel="canonical" href="{{ page_url }}">
{% assign translation_key = page.translation_key %}
{% if translation_key %}
  {% assign siblings = site.pages | where: "translation_key", translation_key %}
  {% for sibling in siblings %}
<link rel="alternate" hreflang="{{ sibling.lang }}" href="{{ sibling.url | absolute_url }}">
  {% endfor %}
{% endif %}
<link rel="alternate" hreflang="x-default" href="{{ x_default_url | absolute_url }}">
```

This pattern is correct and already covers all pages with `translation_key`. Phase 5 does not need to change it. The Phase 5 task is to ensure every new page has `translation_key` set and that the render check verifies the output.

### Indexing Toggle — Current Implementation

```liquid
<!-- Source: _includes/head.html (existing) -->
{% unless site.seo.allow_indexing %}
<meta name="robots" content="noindex, nofollow, noarchive">
<meta name="googlebot" content="noindex, nofollow, noarchive">
{% endunless %}
```

```liquid
<!-- Source: robots.txt (existing) -->
{% if site.seo.allow_indexing %}
User-agent: *
Allow: /
Sitemap: {{ '/sitemap.xml' | absolute_url }}
{% else %}
User-agent: *
Disallow: /
{% endif %}
```

The single `_config.yml` change `seo.allow_indexing: true` activates both. No template changes needed.

### Phase Render Check — Existing Pattern from phase4_render_checks.mjs

```javascript
// Source: scripts/phase4_render_checks.mjs (existing)
function ensureLanguageMetadata(route, html, expectedLang) {
  const canonicalMatch = html.match(/<link rel="canonical" href="([^"]+)"/i);
  if (!canonicalMatch) {
    fail(`${route} is missing a canonical tag`);
  }
  const canonicalPath = normalizePathname(canonicalMatch[1]);
  if (canonicalPath !== route) {
    fail(`${route} canonical points to ${canonicalPath}`);
  }
}
```

Phase 5 checks follow the same `fail()` + `process.exit(1)` pattern. Add `node ./scripts/phase5_render_checks.mjs` to `scripts/qa.sh` after the Phase 4 line.

### Frontmatter for New Pages — Required Fields

```yaml
# Any new page that must participate in hreflang must include:
---
lang: uk                           # or 'en'
translation_key: unique-page-key   # shared between UA and EN mirror
permalink: /path/to/page/
seo_title: "Page Title | Business Name"
seo_description: "150-160 char description targeting the specific intent."
---
```

---

## State of the Art

| Old Approach | Current Approach | Impact for Phase 5 |
|--------------|-----------------|-------------------|
| `noindex` during dev | Flip `allow_indexing: true` before launch | This is the Phase 5 launch gate — do it explicitly |
| Single `HomeAndConstructionBusiness` JSON-LD | Add `Service` and `FAQPage` blocks conditionally | Better search-engine page understanding without risking inaccurate data |
| GA4 / external analytics not present | No analytics currently in repo | Out of scope — not needed for Phase 5 |
| Gate 4 only covers UA/EN home routes via Lighthouse | Gate 4 can be extended to cover more routes | Phase 5 should extend gate4's Lighthouse + Pa11y sweep to include `/faq/`, `/projects/`, and representative service routes in both languages |

**Deprecated / outdated patterns to avoid:**
- `jekyll-seo-tag` `{% seo %}` tag: not called in this repo and should not be introduced in Phase 5 — it conflicts with the manual `_includes/head.html` approach.
- Submitting a sitemap to Google Search Console manually: out of scope for Phase 5, but the generated `sitemap.xml` will be at the `Sitemap:` URL in `robots.txt` once indexing is enabled.

---

## Validation Architecture

`nyquist_validation` is `true` in `.planning/config.json`.

### Test Framework

| Property | Value |
|----------|-------|
| Framework | Node.js static HTML assertion scripts (`.mjs`) — no external test framework |
| Config file | none — scripts run directly via `node` |
| Quick run command | `node ./scripts/phase5_render_checks.mjs` (after `bundle exec jekyll build`) |
| Full suite command | `./scripts/qa.sh` (runs all phase render checks including Phase 5) |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| SEO-01 | `allow_indexing: true` → all checked routes emit no `noindex` | static-HTML assertion | `node ./scripts/phase5_render_checks.mjs` | ❌ Wave 0 |
| SEO-01 | All checked routes have `<link rel="canonical">` pointing to self-URL | static-HTML assertion | `node ./scripts/phase5_render_checks.mjs` | ❌ Wave 0 |
| SEO-01 | All bilingual route pairs have matching `hreflang` link tags in both directions | static-HTML assertion | `node ./scripts/phase5_render_checks.mjs` | ❌ Wave 0 |
| SEO-01 | `_site/sitemap.xml` is present and non-empty | static-HTML assertion | `node ./scripts/phase5_render_checks.mjs` | ❌ Wave 0 |
| SEO-02 | Service-detail routes for apartment and house types exist with distinct `seo_description` values | static-HTML assertion (description uniqueness) | `node ./scripts/phase5_render_checks.mjs` | ❌ Wave 0 |
| SEO-03 | Service-detail pages contain `"@type": "Service"` JSON-LD block | static-HTML assertion | `node ./scripts/phase5_render_checks.mjs` | ❌ Wave 0 |
| SEO-03 | FAQ page contains `"@type": "FAQPage"` JSON-LD block | static-HTML assertion | `node ./scripts/phase5_render_checks.mjs` | ❌ Wave 0 |
| SEO-03 | No checked route contains placeholder company identity patterns in JSON-LD | static-HTML assertion | `node ./scripts/phase5_render_checks.mjs` | ❌ Wave 0 |
| All | Full Lighthouse SEO score >= 95 on UA and EN home routes | rendered audit | `./scripts/gates.sh gate4` | ✅ exists |
| All | No broken links after build | rendered crawl | `./scripts/gates.sh gate4` | ✅ exists |

### Sampling Rate

- **Per task commit:** `./scripts/qa.sh` (includes `phase5_render_checks.mjs` once added)
- **Per wave merge:** `./scripts/qa.sh` + `./scripts/gates.sh gate4`
- **Phase gate:** Full suite green before phase sign-off

### Wave 0 Gaps

- [ ] `scripts/phase5_render_checks.mjs` — covers SEO-01, SEO-02, SEO-03 assertions listed above
- [ ] Add `node ./scripts/phase5_render_checks.mjs` line to `scripts/qa.sh` after the Phase 4 line

---

## Open Questions

1. **Placeholder business identity replacement timing**
   - What we know: `_config.yml` has `company.name: "Business name pending confirmation"`, `company.phone: "+380000000000"`, `company.email: "hello@example.com"`. Phase 4 decision doc says placeholder identity "should be visually de-emphasized until Phase 5 replaces it with final business data."
   - What's unclear: Whether the actual business identity data is ready to be provided. If it is not, `allow_indexing` cannot be safely flipped.
   - Recommendation: Make placeholder replacement a named prerequisite task in the Phase 5 plan. If the data is not available, Phase 5 completes everything else and the indexing flip becomes a deferred launch gate rather than failing Phase 5 entirely.

2. **FAQPage schema and faqs.yml data structure compatibility**
   - What we know: `_data/faqs.yml` exists and is used by the FAQ page. The exact nested structure (groups, items, bilingual key shapes) needs to be read before writing the FAQPage JSON-LD Liquid.
   - What's unclear: Whether the FAQ data is organized in a way that maps cleanly to the `mainEntity` array in FAQPage schema without a complex Liquid transform.
   - Recommendation: Read `_data/faqs.yml` at the start of whichever task handles SEO-03 schema expansion, and write the JSON-LD accordingly. If the data structure is too nested for clean Liquid output, emit a simplified subset.

3. **Scope of new intent pages for SEO-02**
   - What we know: `services/apartment-renovation/index.md` and `services/house-renovation/index.md` already exist with distinct `seo_description` values. The site also has service-detail pages for plumbing, electrical, finishing, rough-works, procurement, and site-supervision — all with distinct intents.
   - What's unclear: Whether SEO-02 requires adding new pages beyond the existing footprint, or whether it is satisfied by verifying and improving the metadata on existing pages.
   - Recommendation: The requirement says "distinct renovation intents rather than thin or duplicative footprint growth." This reads as a quality check on existing pages plus small targeted additions only where a real content gap exists (e.g., a "trust and quality assurance" support page, not keyword-thin service-area pages). The planner should default to no new pages unless a specific gap is identified.

---

## Sources

### Primary (HIGH confidence)

- Repository inspection — `_includes/head.html`, `_config.yml`, `robots.txt`, `scripts/qa.sh`, `scripts/gates.sh`, `scripts/phase1_render_checks.mjs` through `phase4_render_checks.mjs` — all verified by direct file read
- `.planning/codebase/STACK.md` — verified SEO/integration architecture summary
- `.planning/codebase/TESTING.md` — verified testing patterns and gate structure
- `.planning/codebase/INTEGRATIONS.md` — verified plugin state and indexing config
- `.planning/research/STACK.md` — milestone-level stack research including SEO and QA recommendations (researched 2026-03-10)

### Secondary (MEDIUM confidence)

- Google Search Central multilingual guidance (referenced in `.planning/research/STACK.md`): separate URLs plus `hreflang` remain the recommended approach as of research date 2026-03-10
- Schema.org `HomeAndConstructionBusiness`, `Service`, `FAQPage` types: standard vocabulary, stable — HIGH confidence on type names, MEDIUM on specific property requirements (verify against Google's structured data docs before writing production schema)

### Tertiary (LOW confidence)

- None — all Phase 5 technical claims are grounded in direct codebase inspection or established project research.

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all tooling already exists in the repo; no new dependencies needed
- Architecture patterns: HIGH — `translation_key` + `hreflang` mechanics verified by reading live template code; render check pattern verified by reading four existing check scripts
- Pitfalls: HIGH — grounded in actual current state (placeholder values confirmed in `_config.yml`, `allow_indexing: false` confirmed, `translation_key` contract confirmed)
- Structured data expansion: MEDIUM — type names are stable schema.org vocabulary; specific Liquid implementation for `FAQPage` depends on `_data/faqs.yml` structure not fully read

**Research date:** 2026-03-13
**Valid until:** 2026-04-13 (stable domain; Jekyll/GitHub Pages/schema.org change slowly)
