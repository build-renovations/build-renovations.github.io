# Phase 2 Research: Content Architecture Expansion

**Phase:** 02 - Content Architecture Expansion  
**Researched:** 2026-03-11  
**Tool mode:** `repo_only`  
**MCP used:** None intentionally. This research is primarily about existing repo architecture, bilingual content contracts, and Jekyll-safe implementation patterns.  
**Fallback note:** The dedicated `gsd-phase-researcher` specialist was unavailable in-session, so this artifact was produced directly from repository inspection.

## Executive Summary

Phase 2 should be planned as a structured content-system expansion, not as a copy dump and not as a net-new design phase.

The repo already has the correct foundation for this work:
- bilingual page pairs with `translation_key`
- centralized canonical and `hreflang` handling in `_includes/head.html`
- reusable layouts for homepage, process, generic pages, and service detail pages
- shared trust and call modules already established in Phase 1
- substantial bilingual data already living in `_data/service_pages.yml`, `_data/process_page.yml`, `_data/faqs.yml`, and related shared files

The planning question is not whether the site needs more text. It does. The real planning question is where that text should live so Phase 2 improves buyer trust, scanning, and fit-detection without creating duplicated bilingual markup or weak validation coverage.

The strongest Phase 2 approach is:
1. deepen service-detail and process surfaces first
2. refactor FAQ and commercial-clarity content into more structured data contracts
3. use property-type pages as fit-orientation surfaces rather than inventing a separate segmentation system
4. preserve the current page footprint unless one small support page family becomes clearly necessary during planning

## What You Need To Know To Plan This Phase Well

### 1. The repo already favors the right implementation pattern

Current content architecture is already data-first:
- service detail pages are thin frontmatter wrappers around `_layouts/service_detail.html`
- process page is driven by `_layouts/process.html` plus `_data/process_page.yml`
- homepage and simpler pages rely on shared layouts and includes
- shared bilingual UI strings live in `_data/translations.yml`

That means Phase 2 should mostly expand data contracts and layout rendering rules, not write long duplicated Markdown into every page pair.

### 2. The density increase should not be uniform

The phase context is explicit: service pages and process page should become the primary “depth” surfaces.

Current page roles:
- homepage: framing, scope, trust, direction to deeper pages
- services index: route selection and scope overview
- service detail pages: best place for scope, process, objections, fit, and commercial expectations
- process page: best place for delivery logic, control, timing logic, change-handling posture, procurement framing, and handoff expectations
- FAQ: support layer for objections that do not deserve top-page placement
- about/contact: should stay supportive, not become the main long-form reading surfaces

If planning spreads the same depth evenly across all pages, page purpose will blur and the site will become harder to scan.

### 3. CONT-04 is partly present already, but not finished

The repo already contains bilingual property-type pages:
- `/services/apartment-renovation/`
- `/services/house-renovation/`
- English mirrors under `/en/services/`

Those pages currently use the same `service_detail` architecture as trade-specific pages. This is useful because it means Phase 2 does not need a new multilingual routing system to satisfy `CONT-04`.

The gap is content depth:
- apartment vs house fit logic is still too light
- there is no richer decision-support structure around project type, scope complexity, and “when this format is or is not a fit”
- cross-links between property-type pages, process, and stage-specific services are still mostly structural rather than editorial

### 4. FAQ is currently too flat for the phase goal

`faq/index.md` and `en/faq/index.md` simply loop through `_data/faqs.yml`.

That is fine for a small Phase 1 FAQ, but weak for Phase 2 because `CONT-02` and `CONT-03` need:
- stronger objection clustering
- priority ordering by buyer anxiety, not just generic Q&A accumulation
- a way to promote the highest-value objections inline on service/process pages while retaining a full FAQ destination

Planning should assume `_data/faqs.yml` will need a richer schema instead of only an array of question-answer pairs.

### 5. Commercial clarity must stay visible but controlled

The phase context gives a strong constraint:
- planning, procurement, changes, and handoff should be explained more clearly
- public content should not read like a full operating manual
- procurement stays a supporting topic, not the dominant public narrative

So the plan should define a public-commercial layer that answers:
- how a project is framed before work starts
- how materials/procurement affect scheduling and readiness
- how adjacent decisions are coordinated
- how handoff/readiness is judged

It should avoid overexposing:
- internal workflow minutiae
- heavy change-order process detail
- excessive budget mechanics that create false precision

### 6. This phase depends on content hierarchy more than on new visuals

Phase 4 owns the bigger UX/density polish. Phase 2 still needs scan-first structure, but its job is mainly information architecture:
- section sequencing
- section labels
- short intros and summaries
- repeated but controlled objection handling
- strong cross-link logic between related pages

That means the plan can use current layout families with modest section expansion instead of waiting for a visual-system overhaul.

## Current Repository Reality

### What already helps

- `_layouts/service_detail.html` already renders hero, trust strip, service summary, process/proof block, related work, project-fit, and call-expectations.
- `_layouts/process.html` already renders process stages, risk framing, proof, trust, project-fit, and call expectations.
- `_layouts/page.html` already supports modular trust/proof/fit/call sections under frontmatter flags.
- `_includes/head.html` already centralizes canonical, `hreflang`, and JSON-LD logic.
- `_data/service_pages.yml` already stores substantial per-service bilingual content and can absorb richer section contracts.
- `_data/process_page.yml` already models stages and risk logic in a way that can be expanded cleanly.
- property-type service pages already exist in both languages.

### What is missing

- no deeper service-page section model beyond summary/scope/process/proof
- no structured inline objection-handling model per page family
- no structured commercial-clarity model for planning, procurement, changes posture, and handoff
- no richer property-type fit model beyond current summary/scope text
- no Phase 2-specific render checks
- no content-depth validation contract that proves key sections exist on key routes

## Standard Stack

Use the current stack. Do not introduce unsupported translation plugins or CMS complexity for this phase.

- GitHub Pages-safe Jekyll
- Liquid layouts and includes
- `_data/`-driven bilingual content
- page frontmatter only for route metadata and page selection
- lightweight JS only if a small interaction clearly improves scanning
- `./scripts/qa.sh` plus a new Phase 2 render-check helper

## Architecture Patterns

### 1. Keep page files thin and move Phase 2 depth into `_data/`

Continue using page files mainly for:
- `layout`
- `lang`
- `translation_key`
- `permalink`
- `seo_title`
- `seo_description`
- page selector keys like `service_key`

Put the deeper Phase 2 content into structured shared data so UA and EN remain synchronized.

Recommended direction:
- extend `_data/service_pages.yml` for service-detail and property-type depth
- extend `_data/process_page.yml` for commercial clarity and objection handling on process page
- replace or refactor `_data/faqs.yml` into grouped FAQ clusters
- add at most one new `_data/` file if the current files become semantically overloaded

### 2. Prefer section contracts over long uncontrolled prose

The phase context prefers a hybrid model: modular structure with selective editorial passages.

That means page contracts should support:
- short section intros
- summary bullets
- compact list blocks
- objection cards
- “who this is for / not for” blocks
- commercial clarity explainer blocks
- longer paragraphs only where narrative trust matters

This is stronger than dropping a long Markdown blob into each page because it preserves scanning and makes validation realistic.

### 3. Expand layouts by adding optional content modules, not by forking layouts

Do not create separate layouts for “deep service page”, “property page”, and “commercial page” unless planning proves the existing layout cannot carry them.

Better pattern:
- extend `_layouts/service_detail.html` to render optional richer sections when the data exists
- extend `_layouts/process.html` with explicit commercial-clarity and objection modules
- use `_layouts/page.html` only for lighter supporting pages

This keeps translated parity and lowers maintenance cost.

### 4. Treat property-type pages as fit pages with service bridges

`CONT-04` does not require a separate segmentation engine.

The most repo-compatible solution is to deepen existing apartment/house pages so they explain:
- typical project conditions
- where complexity usually comes from
- which stage clusters matter most
- how the route differs from a smaller or simpler project
- which related services the buyer should read next

This keeps property-type content inside the current route model and makes the existing service graph more useful.

### 5. Handle objections inline first, FAQ second

The phase context is explicit that major objections should not be hidden inside the FAQ page.

Recommended distribution:
- highest-value objections about cost drift, control, communication, timing, and coordination appear inline on service and process pages
- FAQ page remains the full reference destination
- inline objection blocks should point to the FAQ page only for deeper follow-up, not as the first and only answer

### 6. Build cross-linking as a content architecture concern

Phase 2 will work better if cross-link logic is intentional:
- trade services should link to process and to the most relevant property-type page
- property-type pages should link back to the stage-specific services most likely needed
- process page should point to both property-type and service-detail routes
- FAQ clusters should reinforce the same decision path

This is useful now for buyer clarity and later for SEO, without making Phase 2 an SEO-page-expansion phase.

## Recommended Data Model Changes

### Service pages

Extend each item in `_data/service_pages.yml` to support richer modules such as:
- `intro` or `overview`
- `outcomes`
- `fit`
- `not_fit` or boundary conditions
- `objections`
- `commercial_clarity`
- `timeline_signals`
- `coordination_notes`
- `faq_refs` or `related_question_keys`

Do not require every service to fill every field on day one. Optional modules are fine if the layout fails gracefully.

### Process page

Extend `_data/process_page.yml` with sections aimed at `CONT-02` and `CONT-03`, for example:
- planning expectations
- procurement as schedule support
- changes posture in public-facing language
- handoff/readiness criteria
- inline objections around chaos, delays, and hidden rework

The process page is the best place to explain how commercial and execution logic stay controlled without making every service page carry the full burden.

### FAQ

Refactor `_data/faqs.yml` from a flat list to a grouped model, for example:
- `risk_and_control`
- `timing_and_sequence`
- `materials_and_procurement`
- `fit_and_scope`
- `handoff_and_readiness`

Each item should have stable keys so inline page modules can reference the same answers without copy-pasting.

### Property-type content

Keep apartment and house content inside `_data/service_pages.yml` unless that file becomes too unwieldy. If it does, split property-type content into a dedicated `_data/property_pages.yml` only when there is a clear planning benefit.

Default recommendation: stay in `service_pages.yml` for Phase 2 to minimize moving parts.

## Requirement-by-Requirement Implications

### CONT-01: Richer text on key pages for scope, process, quality, timing, coordination

Primary delivery surfaces:
- process page
- plumbing, electrical, rough works, finishing pages
- apartment and house renovation pages

Secondary surfaces:
- services index
- homepage

Do not try to make about/contact the primary answer surfaces for `CONT-01`.

Planning implication:
- define exactly which page families get “deep” modules in this phase
- prioritize service-detail and process pages in the first plan wave

### CONT-02: Objection-handling FAQ content for renovation risk, communication, project control

This must be split across:
- inline objection blocks on service/process pages
- grouped FAQ destination page

Highest-priority objection themes from the phase context:
- cost drift and budget surprises
- weak coordination between trades
- unclear communication and accountability
- fear that visible beauty hides process disorder

Planning implication:
- create one shared objection taxonomy first
- then decide which objections belong inline and which remain FAQ-only

### CONT-03: Commercial expectations for planning, procurement, changes, handoff

This is mainly a process-page and selected service-page requirement.

Best public framing:
- planning establishes order and reduces expensive surprises
- procurement supports readiness and sequencing
- changes are acknowledged as real but not centered as the dominant story
- handoff means the property is ready for use, not merely visually complete

Planning implication:
- avoid creating a separate “commercial policy” page unless absolutely necessary
- keep the strongest commercial logic on `/process/`

### CONT-04: Property-type or scope-specific fit content

Current route inventory already supports this requirement through:
- apartment renovation page
- house renovation page
- service-specific pages for trade/stage scope

Planning implication:
- deepen fit logic on existing property-type pages first
- improve internal linking between property type and service scope
- only add more fit pages if a clear unsupported high-value segment emerges during planning

## Don’t Hand-Roll

- Do not invent a custom multilingual system. The current `translation_key` plus mirrored page-pair model is sufficient.
- Do not hand-maintain duplicated UA and EN section markup across page files when `_data/` can own the content.
- Do not create a separate route family for every objection or commercial topic in Phase 2.
- Do not turn the FAQ into the only objection layer.
- Do not overfit the public site into a detailed internal operations manual.

## Common Pitfalls

- adding too much copy to homepage and flattening page hierarchy
- expanding every page equally instead of choosing primary depth surfaces
- duplicating objection answers across service pages with no shared source of truth
- adding property-type content that feels like SEO scaffolding instead of real fit guidance
- introducing new routes without mirrored EN pages, `translation_key`, and metadata parity
- storing richer content in page Markdown where validation and bilingual maintenance become weak
- treating procurement as a dominant sales pillar instead of supporting commercial clarity

## Planning Dependencies

### Content decisions needed before task breakdown

- Which service pages receive the deepest pass first: recommended priority is plumbing, electrical, rough works, finishing, then apartment/house, then procurement/site supervision if still needed inside the phase budget.
- Whether grouped FAQs remain in `_data/faqs.yml` or move to a new more descriptive filename.
- Whether commercial-clarity modules live only on process page or also appear in trimmed form on selected service pages.
- Whether the services index needs only a modest rewrite or a new structured intro/fit layer.

### Editorial inputs needed

- the strongest approved public language for budget-risk and cost-drift discussion
- how explicit to be about procurement ownership in public-facing copy
- how the business wants to describe changes without making the site feel defensive
- what counts as “ready for use” at handoff in language that is accurate but not overly legalistic

## Recommended Planning Shape

Plan this phase as a small number of system-oriented workstreams, not page-by-page random edits.

Suggested planning sequence:
1. define Phase 2 shared content contracts and update data schemas
2. extend layouts/includes to render richer optional content sections
3. deepen process page and top-priority service pages
4. deepen apartment and house pages plus internal cross-links
5. refactor FAQ into grouped objection architecture and wire inline references
6. add Phase 2 validation checks and run full QA

## Validation Architecture

Phase 2 needs its own validation artifact because this work is not reliably testable through “build passes” alone.

### Test infrastructure

Use the existing baseline:
- `./scripts/qa.sh`
- Jekyll build output checks
- a new Phase 2 render-check script, similar in role to `scripts/phase1_render_checks.mjs`

Recommended new validation entry:
- add `scripts/phase2_render_checks.mjs`
- call it from `./scripts/qa.sh` once the Phase 2 work lands

### What should be automated

Add route-level checks for core UA and EN pages, at minimum:
- `/`
- `/services/`
- `/process/`
- `/faq/`
- `/services/plumbing/`
- `/services/electrical/`
- `/services/rough-works/`
- `/services/finishing/`
- `/services/apartment-renovation/`
- `/services/house-renovation/`
- mirrored `/en/` equivalents

Automated checks should verify:
- required routes still build in both languages
- canonical and `hreflang` remain present
- required deep-content modules render on target pages
- inline objection-handling content exists on process and priority service pages
- property-type pages contain explicit fit-oriented sections
- FAQ data includes both `uk` and `en` content for each required item/group
- pages intended to stay lighter did not accidentally lose trust/call modules from Phase 1

### Recommended validation markers

To make automated checks realistic, the implementation should render stable markers such as:
- `data-content-depth`
- `data-objection-block`
- `data-commercial-clarity`
- `data-fit-guide`
- `data-faq-group`

This is better than checking fragile exact phrases.

### Per-requirement validation intent

- `CONT-01`: verify richer structured sections exist on process and priority service/property pages
- `CONT-02`: verify inline objection modules plus grouped FAQ destination coverage
- `CONT-03`: verify commercial-clarity modules render on process page and any selected service pages
- `CONT-04`: verify apartment/house pages expose explicit fit guidance and related route linking

### Manual review still required

Automation will not prove that the content is good. Manual review must still confirm:
- pages remain scannable despite added density
- objection-handling tone is calm and concrete rather than defensive
- procurement and changes are explained clearly but do not dominate
- property-type pages genuinely help self-qualification
- UA and EN remain semantically aligned, not mechanically literal

### Validation artifact expectations

The later validation file for this phase should include:
- route matrix for UA/EN coverage
- per-task or per-plan mapping to `CONT-01` through `CONT-04`
- list of automated commands
- explicit manual-only review items
- sign-off that Phase 1 trust and call behavior was preserved

## Bottom Line

Plan Phase 2 as a bilingual content-system expansion centered on existing service-detail and process architecture.

The most important planning decision is to keep depth structured:
- data-driven, not page-local
- inline objections first, FAQ second
- process and service pages first, homepage second
- property-type fit guidance through existing apartment/house routes, not a new segmentation engine

If the phase is planned this way, it can satisfy `CONT-01` through `CONT-04` while staying compatible with GitHub Pages, current bilingual patterns, and a realistic validation strategy.
