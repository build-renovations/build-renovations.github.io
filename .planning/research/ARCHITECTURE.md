# Architecture Research

**Domain:** Brownfield bilingual renovation marketing site on GitHub Pages/Jekyll
**Researched:** 2026-03-10
**Confidence:** HIGH
**Recommended tool mode:** `mcp_preferred`

## Objective

Define the cleanest architecture for the next milestone of a content-heavy, phone-first, bilingual renovation site that already has working Jekyll layouts, shared `_data`, translated routing, and GitHub Pages deployment.

The goal is not a platform rewrite. The goal is to add more proof, more content density, more conversion surfaces, and more visual polish without increasing translation drift or delivery risk.

## Current Repo Reality

The current site already has the correct foundation for the next milestone:

- Shared layouts in `_layouts/` already separate homepage, generic page, process, and service-detail responsibilities.
- Shared `_data/` already drives navigation, services, process, proof, FAQs, translations, and work examples.
- The head include already outputs canonical, hreflang, locale metadata, and JSON-LD.
- Ukrainian is already the dominant source route at `/`, with English mirrors under `/en/`.
- The site is static-first, lightweight, and compatible with GitHub Pages constraints.

The next milestone should therefore optimize for extension, not reinvention.

## Architecture Position

For this repository, the best structure is:

1. Keep Jekyll pages + layouts + includes + `_data` as the primary system.
2. Increase reuse through section-level includes and page-family data contracts.
3. Keep translation pairing explicit per page through front matter and mirrored routes.
4. Move repeatable trust/conversion content into `_data`, but keep long-form persuasive copy in page Markdown where page-level nuance matters.
5. Treat phone CTA infrastructure as a shared system, not per-page custom markup.
6. Add new page families only when they support trust, proof, or high-intent search clusters.

## Standard Architecture

### System Overview

```text
┌──────────────────────────────────────────────────────────────┐
│ Routing Layer                                                │
├──────────────────────────────────────────────────────────────┤
│ /                /services/...       /process/ /faq/ ...     │
│ /en/             /en/services/...    /en/process/ /en/faq/   │
└───────────────┬──────────────────────────────────────────────┘
                │ front matter: lang + translation_key + SEO
┌───────────────▼──────────────────────────────────────────────┐
│ Layout Layer                                                 │
├──────────────────────────────────────────────────────────────┤
│ default.html  home.html  page.html  process.html             │
│ service_detail.html  future: case_study.html / landing.html  │
└───────────────┬──────────────────────────────────────────────┘
                │ include composition
┌───────────────▼──────────────────────────────────────────────┐
│ Section Component Layer                                      │
├──────────────────────────────────────────────────────────────┤
│ header  footer  head  work-examples  CTA bands  trust blocks │
│ proof strips  comparison tables  stage checklists  FAQs      │
└───────────────┬──────────────────────────────────────────────┘
                │ site.data lookups + page variables
┌───────────────▼──────────────────────────────────────────────┐
│ Content/Data Layer                                           │
├──────────────────────────────────────────────────────────────┤
│ _data/translations.yml   _data/navigation.yml                │
│ _data/services.yml       _data/service_pages.yml             │
│ _data/work_examples.yml  _data/faqs.yml                      │
│ future: _data/page_blocks/  _data/cta/  _data/proof_sets/    │
└──────────────────────────────────────────────────────────────┘
```

### Component Responsibilities

| Boundary | Owns | Should not own |
|----------|------|----------------|
| Page front matter | route, `lang`, `translation_key`, page-specific SEO, page-level hero copy | large repeated section content |
| Layouts | page family structure and section order | deeply specific copy or hard-coded bilingual strings |
| Includes | repeatable section markup and markup variants | routing logic for the full site |
| `_data/translations.yml` | UI strings, reusable labels, CTA labels, helper copy | long-form page narratives |
| `_data/services.yml` / `_data/service_pages.yml` | service catalog and reusable service proof content | generic navigation or unrelated editorial modules |
| New `_data/page_blocks/*` | repeatable proof-heavy sections for multiple pages | single-page narrative that differs strongly by language |
| CSS/JS assets | shared visual system and lightweight interactions | page-specific content decisions |

## Recommended Project Structure

```text
_layouts/
├── default.html              # global shell, metadata, header/footer handoff
├── home.html                 # homepage section order
├── page.html                 # long-form standard pages
├── process.html              # process family
├── service_detail.html       # service family
└── future case_study.html    # only if case studies become a page family

_includes/
├── head.html
├── header.html
├── footer.html
├── work-examples.html
├── sections/
│   ├── cta-band.html
│   ├── trust-grid.html
│   ├── stage-checklist.html
│   ├── proof-gallery.html
│   ├── comparison-table.html
│   └── faq-cluster.html
└── atoms/
    ├── phone-link.html
    ├── language-switch.html
    └── section-heading.html

_data/
├── translations.yml
├── navigation.yml
├── services.yml
├── service_pages.yml
├── work_examples.yml
├── faqs.yml
├── page_blocks/
│   ├── home.yml
│   ├── about.yml
│   ├── process.yml
│   ├── service_hub.yml
│   └── conversion.yml
└── cta/
    └── phone_brief.yml
```

### Structure Rationale

- `_layouts/` should stay small and define page family skeletons, not become content warehouses.
- `_includes/sections/` is the key missing maintainability layer for the next milestone because the site now needs many repeatable trust modules.
- `_data/page_blocks/` lets the team add section content without duplicating large HTML chunks across UA and EN page families.
- `_data/cta/` keeps phone-first conversion language consistent across home, service, FAQ, and contact surfaces.

## Recommended Content Model

Use three content tiers instead of putting everything in either Markdown or YAML.

### Tier 1: Global UI data

Use `_data/translations.yml` and similar global data for:

- navigation labels
- CTA labels
- shared reassurance microcopy
- labels such as “Process”, “Proof”, “Call now”, “What happens on the call”

### Tier 2: Reusable section data

Use `_data/page_blocks/*.yml` for:

- trust modules reused across multiple pages
- repeated “why clients call before starting” sections
- comparison tables like “single contractor vs managed renovation”
- phone-call brief checklists
- objection-handling blocks reused between FAQ, home, and service hubs

Each block should follow a stable contract:

```yaml
blocks:
  call_brief:
    uk:
      eyebrow: ""
      title: ""
      body: ""
      bullets: []
      cta_label: ""
    en:
      eyebrow: ""
      title: ""
      body: ""
      bullets: []
      cta_label: ""
```

### Tier 3: Page-specific narrative

Keep page Markdown for:

- page hero framing
- high-intent long-form persuasion
- page-specific FAQs or buyer scenarios
- region-specific or service-specific narrative nuance

This avoids the common mistake of forcing all persuasive copy into YAML, which becomes unreviewable quickly.

## Bilingual Maintenance Rules

The bilingual risk is not routing anymore. It is content drift.

Recommended rules:

1. Ukrainian remains the source language for editorial decisions.
2. Every mirrored page keeps its own front matter with the same `translation_key`.
3. Shared repeatable sections live in `_data` with both `uk` and `en` nested at the same key.
4. Long-form page copy remains in paired Markdown pages so each language can read naturally.
5. New page creation should happen in pairs in the same branch before merge.
6. No page is considered complete until canonical, hreflang, and language switch behavior exist in both versions.

Implication: reusable content belongs in `_data`; persuasive page narrative belongs in mirrored content files.

## Content and Data Flow

### Request Flow

```text
Visitor lands on page
  ↓
Front matter selects layout + lang + translation_key
  ↓
Layout assembles section includes
  ↓
Includes pull page variables + site.data blocks
  ↓
head.html emits canonical + hreflang + structured metadata
  ↓
Rendered static page ships with no runtime dependency on external data
```

### Authoring Flow

```text
Business / content decision
  ↓
Choose tier:
global UI / reusable section / page-specific narrative
  ↓
Edit matching _data file or mirrored page pair
  ↓
Preview both language routes
  ↓
Run QA for route parity, CTA parity, and metadata parity
```

### Conversion Flow

```text
Proof section or service section
  ↓
Shared CTA include
  ↓
tel: action + contact page fallback
  ↓
brief framing explains what to prepare for the call
```

Phone-first means the CTA system should be centrally controlled. Do not keep inventing new CTA phrasing in isolated pages.

## Suggested Build Order For The Next Milestone

1. Define page families and block contracts.
Create `_includes/sections/` and `_data/page_blocks/` before adding lots of new content.

2. Centralize phone-first CTA infrastructure.
Add one shared CTA data source and one or two CTA include variants for inline, banner, and sticky/mobile use.

3. Expand trust modules.
Build reusable sections for proof grids, stage checklists, what-happens-on-the-call, buyer-fit criteria, and cross-trade control explanations.

4. Expand high-intent page inventory.
Add the next page families only after the shared blocks exist. Likely candidates are case studies, service-cluster landing pages, and richer FAQ/topic pages.

5. Refactor existing pages onto the new blocks.
Move repeated hard-coded content from `home.html`, service layouts, and standard pages into includes + `_data`.

6. Finalize QA and rendered inspection.
Check both `/` and `/en/` for layout stability, CTA consistency, language links, metadata, and mobile readability.

## Page Family Recommendation

For the next milestone, the site should likely operate with five page families:

- Homepage: breadth + proof + primary CTA.
- Service hub / service detail: intent capture and scope clarity.
- Trust pages: about, process, FAQ, guarantees, supervision logic.
- Proof pages: case studies or work-story pages tied to real stages and outcomes.
- Conversion pages: contact and phone-brief support pages.

Do not create one custom layout per page unless the page becomes a repeated family. Add a new layout only when at least three pages share the same section grammar.

## Glitch-Free Delivery Implications

Content density usually breaks static sites through inconsistent section markup, not through Jekyll itself.

To reduce visual regressions:

- keep section wrappers and spacing tokens standardized
- create only a small number of section variants
- keep image aspect-ratio handling explicit in data and markup
- avoid bespoke one-off mobile exceptions unless a section becomes reusable
- use one sticky/mobile CTA pattern across the site instead of page-specific hacks
- keep JavaScript limited to navigation, CTA assist, and small interaction polish

If a section cannot be expressed through an existing include contract, decide whether it is truly one-off or whether the system needs a new reusable block.

## Architectural Patterns

### Pattern 1: Page-family layouts over one-off templates

**What:** Layouts define skeletons for repeated page types.
**When to use:** Service pages, case studies, topical FAQ clusters, comparison pages.
**Trade-off:** Slight upfront setup, much lower long-term drift.

### Pattern 2: Data-backed reusable sections

**What:** Sections read from `_data/page_blocks/*` and render through includes.
**When to use:** Trust strips, CTA banners, proof explainer blocks, repeated buyer objections.
**Trade-off:** Excellent reuse, but do not overload YAML with all editorial nuance.

### Pattern 3: Mirrored long-form pages with shared atoms

**What:** UA and EN pages stay separate for narrative quality while sharing includes and `_data`.
**When to use:** Pages where translation should be natural, not literal.
**Trade-off:** Two content files to maintain, but far better search and message quality.

## Anti-Patterns

### Anti-Pattern 1: Putting all future content into one giant `translations.yml`

**Why it fails:** It mixes UI strings, page copy, proof content, and CTA content into one fragile file.
**Do instead:** Reserve `translations.yml` for shared UI text and move editorial modules into focused data files.

### Anti-Pattern 2: Hard-coding repeated proof/CTA sections into layouts

**Why it fails:** Layouts become impossible to evolve and bilingual drift accelerates.
**Do instead:** Move repeated sections into includes with data contracts.

### Anti-Pattern 3: Introducing a new build stack for authoring convenience

**Why it fails:** It increases delivery risk and fights the already working GitHub Pages model.
**Do instead:** Extend the present Jekyll system unless a hard platform limitation appears.

### Anti-Pattern 4: Treating English as an afterthought

**Why it fails:** Hreflang integrity and trust quality both degrade.
**Do instead:** Ship new pages and new reusable blocks in UA and EN together.

## Implications For SEO And Bilingual Delivery

The current head include is directionally correct and should remain the enforcement point for canonical and alternates.

Important planning implications:

- Every new translated page must continue to list itself and its alternate versions in the head.
- `x-default` should continue to point to the Ukrainian default route unless strategy changes.
- The safest growth model is mirrored routes with explicit `translation_key`, not runtime language switching.
- Pages should be substantially translated, not only chrome-translated, because thinly localized content weakens both trust and search positioning.

## Recommendation Summary

The next milestone should be built as a section-system expansion on top of the existing Jekyll foundation:

- keep the current page routing model
- add section includes as the main scaling layer
- split reusable content into focused `_data` domains
- keep persuasive long-form copy in mirrored pages
- centralize phone-first CTA behavior
- add new page families only when they repeat enough to justify a layout

That is the cleanest path to more content, stronger trust density, and lower regression risk.

## MCP / Web Usage

- MCP usage: not used
- Reason: repository analysis plus official web documentation was sufficient for this architecture pass
- Web usage: used as fallback for current platform and multilingual-search guidance
- Source type: primary/official documentation only

## Sources

- Repository evidence: `_layouts/home.html`, `_layouts/service_detail.html`, `_includes/head.html`, `_data/translations.yml`, `agents/seo/site-architecture.md`, `agents/design/user-flows.md`
- GitHub Docs: https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/about-github-pages-and-jekyll
- Jekyll Data Files docs: https://jekyllrb.com/docs/datafiles/
- Google Search Central, localized versions: https://developers.google.com/search/docs/specialty/international/localized-versions

---
*Architecture research for: bilingual renovation marketing site*
*Researched: 2026-03-10*
