# Remonty Trust-First Website Expansion

## What This Is

This project is a bilingual GitHub Pages renovation website for apartment and house buyers who need a team that can handle plumbing, electrical work, rough construction, finishing, procurement, and site supervision under one accountable lead. The current site already presents services, process, FAQs, proof blocks, and real work examples in Ukrainian and English, and the next product direction is to turn it into a more premium, more persuasive, and more conversion-oriented sales asset.

The immediate goal is not to replace the business model or the static-site stack. It is to expand the existing website so it looks much more appealing, contains substantially richer trust-building information, removes visible layout defects or visual glitches across the full experience, and pushes visitors toward an actual phone call as the primary conversion event.

## Core Value

Make a renovation buyer feel enough trust, clarity, and urgency to call after seeing a polished, glitch-free site with concrete proof of how the work is controlled.

## Requirements

### Validated

- ✓ Bilingual Ukrainian-first renovation site with English mirror routing under `/en/` — existing
- ✓ GitHub Pages-safe Jekyll architecture with custom layouts, shared `_data/` content, and manual translation handling — existing
- ✓ Core marketing page set covering home, services, process, FAQ, about, and contact in both languages — existing
- ✓ Detailed service pages for plumbing, electrical, rough works, finishing, procurement, apartment renovation, house renovation, and site supervision — existing
- ✓ Shared trust content model with work examples, process blocks, proof sections, metadata, canonical tags, and hreflang handling — existing
- ✓ Lightweight front-end behavior for navigation and presentation enhancement without heavy client-side dependencies — existing

### Active

- [ ] Expand the visual system so the site feels significantly more premium, intentional, and appealing without breaking the current GitHub Pages/Jekyll constraints.
- [ ] Remove visible layout glitches, awkward responsive behavior, and polish gaps across the entire website so the experience feels controlled on mobile and desktop.
- [ ] Add substantially more textual information across key pages to build customer trust through specificity, process depth, proof, and clearer commercial framing.
- [ ] Strengthen portfolio and result storytelling so finished spaces and real project evidence carry more persuasive weight throughout the site.
- [ ] Rework conversion so phone calling becomes the primary call to action, supported by repeated, obvious prompts and clearer reasons to call now.
- [ ] Shape the call path around a project brief conversation where the buyer can discuss property type, scope, timing, and next steps.
- [ ] Expand the site footprint with additional trust, proof, and content-heavy pages or sections where they materially improve credibility, SEO depth, and conversion.

### Out of Scope

- Full rebuild away from Jekyll or GitHub Pages compatibility — the current deployment model already works and should remain stable.
- Heavy JavaScript application behavior or framework migration — the site should stay lightweight and static-first.
- Soft, generic lead capture as the main conversion path — the user explicitly wants actual phone calls to be the primary outcome.

## Context

The repository is a brownfield static site already deployed as a bilingual marketing experience for renovation services. Ukrainian is the default language at `/`, while English mirrors it under `/en/`. The architecture is data-driven through `_data/`, custom Liquid layouts, and manually mirrored translated pages with `translation_key`, `lang`, canonical, and `hreflang` behavior.

The current implementation already has a solid structural foundation: service coverage, process explanation, FAQ content, work examples, metadata handling, and a reusable design system in `assets/css/site.css`. Recent direct QA and browser inspection confirmed the site builds successfully and can be patched safely through the current stack. A mobile hero overflow issue was already fixed during the latest audit pass, which reinforces that this next wave is about raising the presentation and trust standard rather than rescuing a broken system.

The strongest new product direction from questioning is:
- the current site looks too plain
- the next wave should balance visual refresh, trust-building content, and conversion improvements together
- trust should be built primarily through stronger results and portfolio framing
- the main call to action should be phone-first
- the phone call should function as a project brief conversation, not a vague enquiry
- the site should expand meaningfully rather than only polishing the current pages

## Constraints

- **Tech stack**: Remain on GitHub Pages-safe Jekyll with custom layouts and `_data/` structures — the repo is already built around this deployment model.
- **Localization**: Ukrainian remains the default at `/` and English mirrors it under `/en/` — translation parity and `translation_key` behavior must remain intact.
- **Architecture**: Prefer extending shared layouts, includes, and `_data/` rather than duplicating markup or copy — this is how the current site stays maintainable.
- **Performance**: Keep front-end behavior lightweight and static-first — the site should feel polished without turning into a framework-heavy app.
- **Conversion**: Phone calls must become the clearest and strongest primary action — this is a core business goal, not a secondary enhancement.
- **Quality**: The redesigned experience must feel glitch-free across the entire site on mobile and desktop — visible layout defects directly undermine trust.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Treat the current website as a brownfield product, not a blank-slate redesign | The repo already contains a deployable bilingual service site with validated structure and content systems | — Pending |
| Balance visual refinement, trust content, and conversion work in the next roadmap | The user does not want a design-only pass or a copy-only pass; the site has to improve as a selling system | — Pending |
| Make the site feel more premium and appealing | The biggest perceived trust gap identified during questioning was that the current site looks too plain | — Pending |
| Use phone-first conversion throughout the site | The desired commercial outcome is an actual phone call rather than passive contact collection | — Pending |
| Frame the phone call as a project brief conversation | The call should qualify property, scope, timing, and next steps rather than function as a vague consultation request | — Pending |
| Expand the amount of trust-building and proof-oriented text substantially | The user explicitly wants much more textual information to build customer trust | — Pending |
| Expand the page footprint where necessary | Existing pages alone are not assumed to be enough to carry the desired level of trust, proof, and SEO depth | — Pending |

---
*Last updated: 2026-03-10 after initialization*
