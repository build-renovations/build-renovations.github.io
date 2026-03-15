# Roadmap: Remonty Trust-First Website Expansion

**Created:** 2026-03-11
**Mode:** yolo
**Granularity:** standard
**Requirements mapped:** 23 / 23
**Coverage:** 100%

## Roadmap Summary

This roadmap expands the existing bilingual renovation site into a stronger sales system in five phases. The order is intentional:

1. establish trust and the primary call path
2. deepen content and information architecture
3. turn proof and project storytelling into a real system
4. upgrade the visual and responsive experience without regressions
5. harden search coverage, metadata, and QA

## Phases

| Phase | Name | Goal | Requirements | Success Criteria |
|------|------|------|--------------|------------------|
| 1 | Trust And Phone Foundation | Make the site clearly trustworthy and phone-first before larger expansion work lands. | TRST-01, TRST-02, TRST-03, TRST-04, CALL-01, CALL-02, CALL-03, CALL-04 | 4 |
| 2 | Content Architecture Expansion | Add structured, higher-density trust content without turning pages into ungoverned copy piles. | CONT-01, CONT-02, CONT-03, CONT-04 | 4 |
| 3 | Case Study And Proof System | Turn portfolio content into deeper project evidence that answers real buyer hesitation. | CASE-01, CASE-02, CASE-03, CASE-04 | 4 |
| 4 | Premium UX And Layout Hardening | Make the site feel materially more premium while removing layout instability and parity drift. | UX-01, UX-02, UX-03, UX-04 | 4 |
| 5 | 3/3 | Complete   | 2026-03-13 | 4 |

## Phase Details

### Phase 1: Trust And Phone Foundation

**Goal:** Build a clear trust layer and a consistent phone-first conversion system that explains who the business is, what kinds of projects fit, and what happens when a buyer calls.

**Plan progress:** 4 / 4 complete (`01-01`, `01-02`, `01-03`, `01-04` finished on 2026-03-11)

**Requirements:** `TRST-01`, `TRST-02`, `TRST-03`, `TRST-04`, `CALL-01`, `CALL-02`, `CALL-03`, `CALL-04`

**Success criteria:**
1. A visitor can find a clear `tel:` action from the homepage, service pages, and contact surfaces on both mobile and desktop.
2. The site explains the first-call brief, expected inputs, and project-fit framing in a way that reduces hesitation.
3. Core pages show stronger identity, legitimacy, and accountability signals instead of relying on generic trust language.
4. Secondary contact options support the primary phone path rather than competing with it.

### Phase 2: Content Architecture Expansion

**Goal:** Expand the site's textual depth and trust content through reusable structures, clearer page roles, and stronger buyer-facing information design.

**Requirements:** `CONT-01`, `CONT-02`, `CONT-03`, `CONT-04`

**Success criteria:**
1. Key pages contain meaningfully richer, decision-supporting text about scope, process, quality, timing, and coordination.
2. FAQ and objection-handling content addresses real renovation risks and buyer concerns with concrete answers.
3. Commercial expectations such as planning, procurement, changes, and handoff are explained in a structured way.
4. Property-type or scope-specific content helps visitors identify whether their project is a fit.

### Phase 3: Case Study And Proof System

**Goal:** Turn the current gallery/proof baseline into a structured project-evidence system that shows how work is controlled from challenge to result.

**Plan progress:** 4 / 4 complete (`03-01`, `03-02`, `03-03`, `03-04` finished on 2026-03-11)

**Requirements:** `CASE-01`, `CASE-02`, `CASE-03`, `CASE-04`

**Success criteria:**
1. Visitors can browse structured project proof with scope, stage logic, and outcome context rather than image-only storytelling.
2. Proof content demonstrates before, during, and after logic where project material supports it, and placeholder proof modules from Phase 1 are replaced with publishable sourced material where available.
3. Service pages and homepage proof sections can route visitors into deeper, relevant case-study content.
4. Each featured project or proof module makes its relevance to buyer concerns explicit.

### Phase 4: Premium UX And Layout Hardening

**Goal:** Upgrade the design system, page composition, and responsive behavior so the site feels more premium and controlled without introducing visual drift or glitches.

**Plan progress:** 4 / 4 complete (`04-01`, `04-02`, `04-03`, `04-04` finished on 2026-03-12)

**Requirements:** `UX-01`, `UX-02`, `UX-03`, `UX-04`

**Success criteria:**
1. The visual system is materially more appealing and polished while preserving clarity and trust.
2. Core routes render without layout glitches, overflow defects, unstable spacing, or broken CTA behavior on common viewports.
3. Ukrainian and English routes maintain visual and functional parity for trust content and conversion surfaces.
4. Long pages remain scannable and composed rather than bloated.

### Phase 5: SEO And Regression Hardening

**Goal:** Make the expanded site more discoverable and more safely maintainable through stronger metadata coverage, broader intent pages, and rendered QA.

**Plans:** 3/3 plans complete

Plans:
- [x] 05-01-PLAN.md — Phase 5 render check script + Service and FAQPage JSON-LD structured data (completed 2026-03-13)
- [ ] 05-02-PLAN.md — Business identity replacement and indexing flag flip
- [ ] 05-03-PLAN.md — Final QA suite and human release sign-off

**Requirements:** `SEO-01`, `SEO-02`, `SEO-03`

**Success criteria:**
1. New trust and support pages preserve correct canonical and `hreflang` behavior across both languages.
2. Search-oriented pages target distinct renovation intents rather than thin or duplicative footprint growth.
3. Structured data and metadata are upgraded where accurate and useful to search engines.
4. Rendered QA covers root bilingual routes, primary CTA visibility, major layout regressions, and final replacement of placeholder identity/contact content before release.

### Phase 6: Identity, Contact and Navigation Completion

**Goal:** Close the three runtime gaps found in the v1.0 audit: real brand name in page titles, real messenger contact handles, and project evidence accessible from top-level navigation.

**Plans:** 2 plans

Plans:
- [ ] 06-01-PLAN.md — Phase 6 render checks + brand name fix (_config.yml) + projects nav links (navigation.yml)
- [ ] 06-02-PLAN.md — Real messenger handles in contact_channels.yml (requires owner input)

**Requirements:** `TRST-01`, `CALL-04`, `CASE-03`

**Gap Closure:** Closes gaps from v1.0 audit

**Success criteria:**
1. `<title>` and `og:title` display "Рівень" consistently with JSON-LD and in-page brand.
2. All three messenger channels (Telegram, Viber, WhatsApp) resolve to real, active handles.
3. `/projects/` and `/en/projects/` are linked in the top-level navigation for both locales.

### Phase 7: QA Coverage Extension

**Goal:** Extend rendered QA coverage to the full surface area of the site — 3 unchecked dossier routes and 5 unchecked service routes — so no page can silently regress.

**Requirements:** `CASE-01`, `CASE-04`, `SEO-02`, `SEO-03`

**Gap Closure:** Closes gaps from v1.0 audit

**Success criteria:**
1. `phase3_render_checks.mjs` covers all 5 dossier routes (+ EN pairs).
2. `phase4_render_checks.mjs` covers all 5 dossier routes in its route matrix.
3. `phase5_render_checks.mjs` `serviceDetailRoutes` covers all 8 service pages.
4. `./scripts/qa.sh` exits 0 after extensions.

## Ordering Rationale

- Phase 1 comes first because trust and call clarity directly support the project core value.
- Phase 2 comes before large proof expansion so richer content lands inside a maintainable structure.
- Phase 3 converts trust strategy into real project evidence, which is the most persuasive proof layer and the first planned replacement point for placeholder testimonials or reviews.
- Phase 4 refines the design system after trust and proof modules are structurally defined.
- Phase 5 hardens discoverability and regression prevention once the new page and component footprint exists, including final replacement of placeholder business identity/contact details before release.

## Research Flags

- **Research useful during Phase 3:** editorial structure and data model for case studies, proof modules, and review-source policy.
- **Research useful during Phase 5:** launch indexing posture, schema depth, and rendered QA implementation details.
- **Research probably unnecessary during Phase 1:** trust blocks and call-path framing are already well defined by current research.

## Ready Check

- Requirements mapped: **23 / 23**
- Unmapped requirements: **0**
- Roadmap ready for phase planning: **yes**

---
*Roadmap created: 2026-03-11*
