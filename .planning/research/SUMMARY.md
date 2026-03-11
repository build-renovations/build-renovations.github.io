# Project Research Summary

**Project:** Remonty Trust-First Website Expansion
**Domain:** Brownfield bilingual renovation marketing site
**Researched:** 2026-03-11
**Confidence:** HIGH

## Executive Summary

Research confirms that this project should not be treated as a platform rewrite. The repository already has the right foundation for a bilingual renovation marketing site: GitHub Pages-safe Jekyll, structured `_data/` content, mirrored UA/EN routing, and lightweight custom front-end code. The next milestone should keep that stack, but evolve it into a more premium, more evidence-rich, and more conversion-oriented sales system.

The strongest market signal is that renovation buyers still want the same core reassurance in 2025-2026: clear scope, strong process visibility, realistic timing and pricing framing, visible proof of execution quality, and trust that one accountable team can control the job. For this project, that means the roadmap should prioritize a trust architecture, a phone-first conversion system, richer case-study and portfolio storytelling, and better structured content before it prioritizes decorative design experimentation.

The main risk is confusing "premium" with "minimal and stylish." If the site gets prettier without becoming more specific, more evidence-backed, and easier to call from, it will look updated but convert weakly. The roadmap therefore needs to sequence trust, content structure, and CTA clarity ahead of or alongside the visual system work.

## Key Findings

### Recommended Stack

The recommended stack is conservative and brownfield-safe: keep GitHub Pages, Jekyll, mirrored UA/EN routing, `_data`-driven content, and lightweight JS. Extend the current stack rather than replacing it. The highest-value technical moves are updating local GitHub Pages dependency parity, formalizing design tokens and reusable section includes, adding more structured trust datasets, and widening rendered QA coverage through browser automation.

**Core technologies:**
- **GitHub Pages + `github-pages` gem**: keep as the publish/runtime base — lowest operational risk and already validated in the repo.
- **Jekyll + Liquid + `_data`**: keep as the content and rendering system — strongest fit for a bilingual, static, content-heavy marketing site.
- **Custom CSS + lightweight vanilla JS**: extend rather than replace — sufficient for premium polish, phone-first CTA behavior, and motion without framework complexity.
- **Playwright + existing QA scripts**: add as rendered regression coverage — needed because the next milestone is explicitly layout- and polish-sensitive.

### Expected Features

Research is clear that this site’s next major upgrade is a trust system, not a gadget layer. The highest-value additions are a stronger business-legitimacy layer, richer case-study and result storytelling, transparent process/commercial framing, phone-first CTA infrastructure, and more detailed proof modules that answer buyer hesitation before the call.

**Must have (table stakes):**
- Verified business identity, service area, and trust signals exposed clearly across the site.
- Phone-first mobile and desktop CTA system with repeated `tel:` prompts and clear first-call framing.
- Real review proof with source attribution and stronger trust/FAQ coverage.
- Portfolio structure that explains scope, stages, and outcomes rather than showing isolated images.
- Bilingual trust parity so proof and CTA quality do not collapse in one language version.

**Should have (competitive):**
- Full case-study pages with challenge, decisions, execution stages, and outcomes.
- Property-fit and project-fit framing so visitors self-qualify before calling.
- Sample deliverables, supervision artifacts, or sanitized process documents that prove operational maturity.
- Before / during / after storytelling instead of after-only project galleries.

**Defer (v2+):**
- Instant calculators or fake precision pricing tools.
- Chatbot-heavy lead capture as a primary path.
- Framework migration or heavier app-like interactions.

### Architecture Approach

The architecture research recommends one clear direction: keep layouts as page-family skeletons, move repeatable trust/conversion blocks into section includes and structured `_data`, and keep long-form persuasive page narrative in mirrored Markdown pages. This lets the site become much more content-rich without drifting into duplicated markup or translation inconsistency.

**Major components:**
1. **Page-family layouts**: define home, page, process, service detail, and future case-study / landing-page structures.
2. **Reusable trust/conversion section layer**: shared CTA bands, trust grids, proof modules, FAQ clusters, and phone-brief blocks.
3. **Structured content/data layer**: current `_data` extended with page blocks, CTA content, case-study data, reviews, guarantees, and identity proof.

### Critical Pitfalls

1. **Premium becomes abstract instead of credible** — pair visual polish with scope, process, and proof in every major section.
2. **Content expansion turns into page bloat** — add sections only when they serve a distinct decision-support purpose.
3. **Trust claims stay generic instead of evidential** — use case studies, sourced proof, and concrete process details instead of adjectives.
4. **Phone-first conversion becomes pushy or fragmented** — make calling easy and clear, not aggressive or split across competing lead paths.
5. **SEO expansion creates duplication** — only add new pages when intent, proof angle, and buyer need are materially distinct.

## Implications for Roadmap

Based on research, suggested phase structure:

### Phase 1: Trust Architecture And Conversion Strategy
**Rationale:** The biggest business risk is weak trust and an underpowered phone path, not missing technology.
**Delivers:** Shared phone-first CTA system, business legitimacy layer, call-brief framing, and trust block definitions.
**Addresses:** Phone-first conversion, verified identity, trust-first commercial framing.
**Avoids:** Pushy CTA patterns and vague premium positioning.

### Phase 2: Information Architecture And Content Model Expansion
**Rationale:** Content volume must be structured before it can scale cleanly across UA and EN.
**Delivers:** New page/section model, reusable `_data` contracts, page-block system, and trust-content page map.
**Uses:** Existing Jekyll/_data stack with stronger section boundaries.
**Implements:** Content/data architecture from research.

### Phase 3: Proof, Portfolio, And Case-Study System
**Rationale:** Real project evidence is the highest-leverage trust asset for this domain.
**Delivers:** Case-study framework, expanded work-example storytelling, review proof, and before/during/after logic.
**Implements:** Proof-heavy differentiators identified in feature research.

### Phase 4: Premium Visual System And Component Governance
**Rationale:** Visual refinement should be system-driven so the site looks more appealing without inconsistency or glitches.
**Delivers:** Stronger type, spacing, surfaces, component rules, media handling, and responsive layout discipline.
**Avoids:** One-off premium sections and design drift.

### Phase 5: SEO, Bilingual Coverage, And Regression Hardening
**Rationale:** Once content and conversion systems expand, bilingual parity and rendered QA need to catch up.
**Delivers:** Broader search coverage, metadata/schema improvements, route parity checks, and rendered browser regression coverage.
**Uses:** Playwright, existing shell QA, and the static routing contract.

### Phase Ordering Rationale

- Trust and call clarity come first because the core value is making a renovation buyer confident enough to call.
- Content-model work comes before large content expansion so the site does not become bloated or inconsistent.
- Proof/case-study work comes before or alongside premium visual work because evidence matters more than aesthetics alone in this domain.
- QA and bilingual parity hardening become more important as the site footprint and component count increase.

### Research Flags

Phases likely needing deeper research during planning:
- **Phase 3:** case-study and review-proof structure needs careful editorial and data-contract planning.
- **Phase 5:** launch indexing, schema depth, and regression automation details should be validated against current tooling and search guidance.

Phases with standard patterns (skip research-phase):
- **Phase 1:** CTA framing, trust blocks, and phone-first conversion are well enough understood from current research.
- **Phase 4:** premium-system implementation can follow established component and responsive-design patterns once the trust/content model is set.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | The repo already uses the right platform shape; recommendations are extension-oriented, not speculative. |
| Features | HIGH | Buyer expectation signals are consistent across current renovation/home-improvement research. |
| Architecture | HIGH | The repo’s current Jekyll/_data model already supports the recommended direction. |
| Pitfalls | HIGH | Risks are specific to brownfield contractor-site redesigns and align with the user’s stated goals. |

**Overall confidence:** HIGH

### Gaps to Address

- Real business proof assets still need confirmation: reviews, credentials, service area specificity, warranty/insurance detail, and project evidence.
- Final launch posture for indexing and schema should be validated when the business data is ready.
- The roadmap will need to distinguish what can be implemented immediately from what depends on real client/project material.

## Sources

### Primary (HIGH confidence)
- [`.planning/research/STACK.md`](/Users/mykhailomykhailenko/work/personal/vasyl/remonty/.planning/research/STACK.md) — runtime, QA, and static-site stack decisions.
- [`.planning/research/FEATURES.md`](/Users/mykhailomykhailenko/work/personal/vasyl/remonty/.planning/research/FEATURES.md) — trust, proof, and conversion feature landscape.
- [`.planning/research/ARCHITECTURE.md`](/Users/mykhailomykhailenko/work/personal/vasyl/remonty/.planning/research/ARCHITECTURE.md) — maintainability and bilingual content architecture.
- [`.planning/research/PITFALLS.md`](/Users/mykhailomykhailenko/work/personal/vasyl/remonty/.planning/research/PITFALLS.md) — redesign risks and prevention strategies.

### Secondary (MEDIUM confidence)
- GitHub Pages, Jekyll, Google Search Central, Google Business Profile, MDN, web.dev, Playwright, Harvard JCHS, Houzz, FTC, and CFPB sources summarized in the underlying research docs.

### Tertiary (LOW confidence)
- None beyond the underlying research notes; unclear areas are listed above as planning gaps rather than promoted as findings.

---
*Research completed: 2026-03-11*
*Ready for roadmap: yes*
