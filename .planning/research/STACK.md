# Stack Research

**Domain:** Brownfield bilingual renovation marketing site on GitHub Pages / Jekyll
**Repository:** `/Users/mykhailomykhailenko/work/personal/vasyl/remonty`
**Researched:** 2026-03-10
**Overall confidence:** HIGH

## Scope

This is not a greenfield stack decision. The current repository already uses the right platform shape for the business: static Jekyll, bilingual routing, `_data/`-driven content, lightweight front-end code, and GitHub Pages deployment. The next milestone should keep that architecture, update local runtime parity with current GitHub Pages dependencies, and extend the site in four directions:

- stronger visual polish
- richer trust and proof content
- phone-first conversion
- broader rendered-site QA coverage

## MCP / Web Usage

- MCP used: repository filesystem inspection for current stack, scripts, and configuration.
- Web used: yes, because this research informs present-day planning and current stack choices.
- Primary current sources checked:
  - GitHub Pages dependency matrix and Jekyll setup docs
  - Jekyll official docs
  - Google Search Central docs for multilingual SEO and LocalBusiness structured data
  - Chrome / web.dev / MDN docs for performance and media-loading guidance
  - Playwright official docs for regression and accessibility automation

## Executive Recommendation

The standard 2026 stack for this site is:

1. Keep GitHub Pages and Jekyll as the publishing runtime.
2. Keep manual bilingual routing with Ukrainian at `/` and English at `/en/`.
3. Keep `_data/` plus Liquid includes/layouts as the main content system.
4. Extend the design layer with stronger design tokens, self-hosted web fonts, responsive image handling, and more intentional section patterns.
5. Extend the trust stack with structured case studies, proof modules, credentials, guarantees, team/process transparency, and better LocalBusiness schema.
6. Make phone conversion first-class with persistent mobile `tel:` CTAs, repeated brief-call prompts, and page sections designed around a call decision.
7. Extend QA from shell smoke checks to rendered bilingual regression checks using Playwright plus existing Lighthouse/Pa11y/Linkinator gates.

This preserves GitHub Pages safety while materially improving conversion quality.

## Current Repo Assessment

## Keep

| Area | Current state | Recommendation | Rationale | Confidence |
|---|---|---|---|---|
| Hosting/runtime | GitHub Pages with `github-pages` gem | Keep | Still the simplest Pages-safe static runtime for this repo shape; avoids migration cost and preserves current deploy model. | HIGH |
| Site generator | Jekyll with Liquid and `_data/` | Keep | Jekyll remains a strong fit for bilingual static marketing sites with structured content and minimal client JS. | HIGH |
| Localization model | Manual mirrored URLs with `translation_key`, `lang`, canonical, `hreflang` | Keep | Google recommends separate URLs for language versions; current architecture already follows the right pattern. | HIGH |
| Content architecture | Shared YAML data and reusable layouts/includes | Keep | This is the main maintainability advantage of the repo and the right base for new trust modules. | HIGH |
| Front-end model | Custom CSS + lightweight vanilla JS | Keep | Best fit for performance, Pages compatibility, and low regression risk. | HIGH |
| QA baseline | `scripts/qa.sh` and gate scripts | Keep | Good base layer; should be expanded, not replaced. | HIGH |

## Change Soon

| Area | Current state | Recommendation | Rationale | Confidence |
|---|---|---|---|---|
| Pages runtime parity | Repo pins `github-pages 223`, `jekyll 3.9.0`; current GitHub Pages dependency list shows `github-pages 232`, `jekyll 3.10.0` | Update local gem parity first | Brownfield trust work should not be built on outdated local/runtime assumptions. | HIGH |
| Indexing config | `_config.yml` currently has `seo.allow_indexing: false` | Flip to launch-safe indexing when the site is ready | A trust/conversion expansion only matters if the site can index after launch. | HIGH |
| Schema depth | Current JSON-LD is present but thin | Expand to richer LocalBusiness/Organization data and page-specific schema where justified | Better entity clarity and richer business signals help trust and search interpretation. | HIGH |
| QA coverage | Current gate 4 hits only selected pages and mostly home routes | Add bilingual route coverage and visual regression checks | The next milestone is explicitly polish-sensitive, so regression detection must widen. | HIGH |

## Recommended Stack

### Core publishing stack

| Technology | Recommended version / mode | Keep / extend / avoid | Purpose | Why this is the 2026 standard for this repo |
|---|---|---|---|---|
| GitHub Pages | Keep as host | Keep | Static deployment | Lowest operational complexity for a brochure/marketing site; still officially supported. |
| `github-pages` gem | Pin to current Pages-supported release, currently `232` | Extend | Local parity with Pages build environment | GitHub’s official setup docs still direct Jekyll Pages users to pin the supported `github-pages` version from the dependency matrix. |
| Jekyll | Use Pages-supported `3.10.0` through `github-pages` | Keep + update | Static site generation | Keeps local and hosted behavior aligned. |
| Liquid | Use Pages-supported `4.0.4` indirectly | Keep | Templating | Mature, stable, and already embedded in the repo’s content model. |
| Kramdown | Use Pages-supported `2.4.0` indirectly | Keep | Markdown rendering | Sufficient for content-heavy service and trust pages. |
| `jekyll-seo-tag` | Use Pages-supported `2.8.0` or keep custom tags with parity checks | Keep + simplify where useful | Standard SEO metadata | Existing custom head logic is fine, but version parity matters and duplicated logic should be intentional. |
| `jekyll-sitemap` | `1.4.0` | Keep | Sitemap generation | Standard Pages-safe SEO baseline. |

### Content and localization stack

| Layer | Recommendation | Keep / extend / avoid | Rationale | Confidence |
|---|---|---|---|---|
| Page model | Keep thin front matter pages with `translation_key`, `lang`, `permalink`, `seo_title`, `seo_description` | Keep | Fits bilingual static routing well. | HIGH |
| Shared data | Extend `_data/` with `case_studies.yml`, `regions.yml`, `credentials.yml`, `team.yml`, `guarantees.yml`, `call_cta.yml`, `reviews.yml` if genuine | Extend | Trust growth should come from structured content, not copy-pasted sections. | HIGH |
| Includes/layouts | Add reusable trust and conversion partials instead of page-specific markup | Extend | Maintains brownfield consistency and bilingual parity. | HIGH |
| Translation flow | Continue manual UA source and EN mirror pattern | Keep | Plugin-free bilingual control remains safer on GitHub Pages than adding translation tooling. | HIGH |

### Design and front-end stack

| Layer | Recommendation | Keep / extend / avoid | Rationale | Confidence |
|---|---|---|---|---|
| CSS architecture | Keep one main stylesheet or split into Pages-safe partials compiled by Jekyll Sass only if it improves maintainability | Keep + optional extend | No build chain is required; Pages-safe Sass is acceptable if the CSS grows. | MEDIUM |
| Design tokens | Add CSS custom properties for type scale, spacing, radius, surfaces, accent colors, shadows, motion timings | Extend | This is the cleanest way to make the site feel more premium without introducing a framework. | HIGH |
| Typography | Add self-hosted WOFF2 font pair with `font-display: swap`; use expressive display serif or humanist sans only if performance stays controlled | Extend | Visual polish gains are large; self-hosting preserves control and avoids third-party dependency drift. | MEDIUM |
| Images | Keep WebP-first image policy; add responsive `srcset`/`sizes`, explicit width/height, selective `loading=\"lazy\"`, `decoding=\"async\"`, and `fetchpriority=\"high\"` for hero LCP image only | Extend | This is the modern static-site image stack for polish without sacrificing Core Web Vitals. | HIGH |
| JS | Keep lightweight vanilla JS; add only focused behaviors like sticky mobile call bar, gallery lightbox, before/after slider, and analytics-safe event hooks | Keep + extend | Supports polish and conversion without SPA complexity. | HIGH |
| Motion | Prefer CSS transforms/opacities and avoid layout-shifting animation | Extend | Better polish while protecting CLS and mobile smoothness. | HIGH |

### Trust and conversion stack

| Layer | Recommendation | Keep / extend / avoid | Rationale | Confidence |
|---|---|---|---|---|
| Primary CTA | Make `tel:` links the dominant CTA across hero, sticky mobile footer, service pages, portfolio, FAQ, and contact | Extend | Matches the business goal exactly: phone-first conversion. | HIGH |
| Call framing | Introduce a reusable “project brief call” component with scope, budget band, timing, property type, and next-step expectations | Extend | Better pre-qualification and higher-intent calls. | HIGH |
| Trust modules | Add case studies, scope checklists, supervision/process proof, materials/procurement transparency, guarantees, FAQs by objection, and “who is responsible on site” sections | Extend | Renovation buyers need specificity to trust a phone call. | HIGH |
| Contact stack | Keep a contact page, but treat forms or messenger as secondary to calling | Keep + avoid over-weighting forms | User goal is calls, not soft leads. | HIGH |
| Structured data | Upgrade from generic business schema to more complete `LocalBusiness` / `Organization` data and use specific business/service types only when accurate | Extend | Helps search engines understand the company and service footprint. | HIGH |

### QA and delivery stack

| Tool / pattern | Recommendation | Keep / extend / avoid | Rationale | Confidence |
|---|---|---|---|---|
| `./scripts/qa.sh` | Keep as base smoke/build gate | Keep | Good baseline for Pages-safe build verification. | HIGH |
| Lighthouse CLI | Keep | Keep | Still appropriate for static marketing pages and already integrated. | HIGH |
| Pa11y | Keep | Keep | Good CLI accessibility baseline, especially for CI gates. | MEDIUM |
| Linkinator | Keep | Keep | Good low-cost broken-link coverage. | HIGH |
| Playwright | Add for bilingual navigation, language switcher, CTA visibility, sticky-call-bar checks, and visual regression screenshots | Extend | Best current fit for real rendered regression coverage on a static site. | HIGH |
| `@axe-core/playwright` | Add | Extend | Gives stronger automated accessibility coverage than Pa11y alone for key flows. | HIGH |
| GitHub Actions | Use for CI QA even if Pages deploy source remains branch-based or Actions-based | Extend | GitHub now recommends Actions for Pages automation; ideal for repeatable brownfield QA. | HIGH |
| Evidence artifacts | Continue writing audit outputs to `agents/` or CI artifacts | Keep + extend | Fits the repo’s existing gate/evidence culture. | HIGH |

## Standard 2026 Brownfield Shape For This Repo

If this milestone is executed well, the stack should look like this:

- Publishing: GitHub Pages
- Static runtime: `github-pages` gem pinned to the current supported version
- Generator: Jekyll + Liquid + Kramdown
- Localization: manual mirrored URLs with `translation_key` and shared `_data/`
- Styling: custom CSS with explicit design tokens; optional Pages-safe Sass partials if CSS grows
- Media: self-hosted WOFF2 fonts, SVG brand assets, WebP-first photography, responsive image markup
- Interaction: minimal vanilla JS only for navigation, reveal, media, and call-focused conversion behaviors
- SEO: canonical, `hreflang`, sitemap, robust metadata, richer LocalBusiness schema
- Conversion: sticky mobile phone CTA, repeated call prompts, call-brief sections, service-specific phone framing
- QA: shell build gate + Lighthouse + Pa11y + Linkinator + Playwright + axe
- CI: GitHub Actions for automated checks on PRs / main branch

## What To Keep

- GitHub Pages as the host
- Jekyll and Liquid as the rendering stack
- `_data/`-driven bilingual content model
- manual `translation_key` + `lang` routing contract
- custom layouts/includes instead of a page builder
- lightweight client-side JavaScript
- existing asset discipline around SVG/WebP and metadata stripping
- current gate-script mindset

## What To Extend

- update `github-pages` local parity from `223` to `232` unless GitHub publishes a newer supported release before implementation
- expand `_data/` into structured trust, portfolio, region, process, and CTA datasets
- formalize a premium design system with stronger typography, spacing, surfaces, and motion rules
- use responsive image markup and LCP-aware loading priorities
- build reusable phone-first CTA components and sticky mobile call affordances
- add page-specific proof modules for every major service cluster
- expand schema coverage and launch indexing when ready
- add Playwright-based rendered regression coverage for both `/` and `/en/`

## What To Avoid

| Avoid | Why | Use instead | Confidence |
|---|---|---|---|
| Replatforming to React / Next.js / Astro only for aesthetics | High migration cost, breaks the “validated stack” constraint, and adds operational complexity without clear business upside here | Keep Jekyll and improve the design system, content model, and QA | HIGH |
| GitHub Pages-unsupported translation plugins | Risks breaking deployment and undermines a working bilingual architecture | Keep manual mirrored pages and shared data | HIGH |
| Heavy JS animation libraries for decorative effects | Raises regression risk, hurts INP, and is unnecessary for a trust-first marketing site | Use CSS-first motion and tiny targeted JS | HIGH |
| Tailwind/Vite/toolchain expansion by default | Adds build and maintenance complexity for a repo already using custom CSS successfully | Keep custom CSS; optionally adopt Pages-safe Sass partials only if maintainability requires it | MEDIUM |
| Auto-lazy-loading every image | Can hurt LCP when applied to hero or above-the-fold media | Lazy-load below-the-fold only; prioritize hero image correctly | HIGH |
| Generic lead forms as the main CTA | Conflicts with the stated business objective of direct phone calls | Make calling primary and forms secondary | HIGH |
| Fake review schema or unverifiable proof blocks | Trust damage outweighs any SEO upside | Publish only real credentials, real project evidence, real testimonials, and clear sourcing | HIGH |
| Leaving `noindex` enabled into launch | Blocks discovery and wastes SEO/content work | Turn indexing on as part of launch readiness | HIGH |

## Concrete Repo Recommendations

1. Update `Gemfile.lock` to current GitHub Pages dependency parity before the next major design/content pass.
2. Keep `_config.yml` plugin scope conservative: `jekyll-seo-tag` and `jekyll-sitemap` remain enough.
3. Leave localization plugin-free; do not change the current `/` and `/en/` URL strategy.
4. Add data files for case studies, testimonials, team/process proof, service-area pages, and conversion prompts.
5. Add reusable includes for:
   - sticky mobile call CTA
   - project brief call block
   - credential/proof strip
   - case study cards
   - FAQ by service/objection
   - before/after or work-gallery modules
6. Keep custom CSS, but refactor it around explicit tokens and section/component layers if the current file is getting too flat.
7. Add self-hosted WOFF2 fonts only after measuring the budget impact in Lighthouse.
8. Add responsive image attributes and explicit dimensions throughout the gallery and hero modules.
9. Extend gate coverage with Playwright tests for:
   - `/` and `/en/` rendering
   - language switcher correctness
   - canonical / `hreflang` presence
   - visible phone CTA on mobile and desktop
   - no hero overflow / obvious layout defects on common viewports
10. Plan launch readiness to include removing `noindex`, validating schema, and verifying bilingual sitemap/canonical behavior in the generated `_site/`.

## Confidence By Decision Area

| Decision area | Confidence | Notes |
|---|---|---|
| Keep GitHub Pages + Jekyll | HIGH | Strongest fit with current constraints and repo shape. |
| Keep manual bilingual architecture | HIGH | Supported by Google’s multilingual URL guidance and already working locally. |
| Upgrade local Pages dependency parity | HIGH | Directly supported by GitHub’s dependency matrix. |
| Add self-hosted premium typography | MEDIUM | Valuable, but should be budget-checked against performance. |
| Add Playwright + axe as QA expansion | HIGH | Best balance of coverage and implementation effort for static rendered pages. |
| Avoid framework migration | HIGH | Brownfield business value is weak relative to risk. |

## Sources

- GitHub Pages dependency versions: https://pages.github.com/versions/
  - Verified current published supported versions, including `github-pages 232`, `jekyll 3.10.0`, `jekyll-seo-tag 2.8.0`, and `jekyll-sitemap 1.4.0`.
- GitHub Docs, “Creating a GitHub Pages site with Jekyll”: https://docs.github.com/en/enterprise-cloud@latest/pages/setting-up-a-github-pages-site-with-jekyll/creating-a-github-pages-site-with-jekyll
  - Verified that GitHub Actions is now the recommended approach for Pages automation and that the `github-pages` gem remains supported for some workflows.
- Jekyll docs, data files: https://jekyllrb.com/docs/datafiles/
  - Verified `_data/` remains a first-class content-sharing pattern for structured static sites.
- Google Search Central, multilingual / regional guidance: https://developers.google.com/search/docs/advanced/crawling/managing-multi-regional-sites
  - Verified separate URLs plus `hreflang` remain the recommended search-friendly multilingual approach.
- Google Search Central, canonicalization guidance: https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
  - Verified canonical behavior considerations and interaction with localization clusters.
- Google Search Central, LocalBusiness structured data: https://developers.google.com/search/docs/appearance/structured-data/local-business
  - Verified current LocalBusiness guidance and property expectations.
- Chrome for Developers, Lighthouse overview: https://developer.chrome.com/docs/lighthouse/overview
  - Verified CLI/CI relevance for automated quality checks.
- Playwright docs, accessibility testing: https://playwright.dev/docs/next/accessibility-testing
  - Verified recommended use of `@axe-core/playwright` for automated accessibility coverage.
- web.dev, responsive images: https://web.dev/learn/design/responsive-images
  - Verified responsive image markup guidance.
- web.dev, optimize LCP: https://web.dev/articles/optimize-lcp
  - Verified hero-image prioritization guidance.
- MDN, `loading` attribute for images: https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/loading
  - Verified browser-level lazy loading behavior.
- MDN, `fetchpriority`: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/fetchpriority
  - Verified current browser hinting for LCP-sensitive images.
- MDN, web fonts: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Text_styling/Web_fonts
  - Verified self-hosted web font implementation patterns including `font-display`.

## Bottom Line

The right 2026 stack for this brownfield site is not “more framework.” It is a stricter GitHub Pages-safe Jekyll stack with current dependency parity, stronger structured content, a more intentional design system, explicit phone-first conversion components, and real rendered-site automation.

That is the lowest-risk path to a more premium, more credible, and more conversion-oriented renovation site.
