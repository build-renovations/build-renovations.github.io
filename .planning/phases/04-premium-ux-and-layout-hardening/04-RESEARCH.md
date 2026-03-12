# Phase 4 Research: Premium UX And Layout Hardening

**Phase:** 04 - Premium UX And Layout Hardening  
**Researched:** 2026-03-12  
**Tool mode:** `mcp_preferred`  
**MCP used:** `browser_automation` for rendered review of `/` and `/en/` in current built output, including mobile inspection.  
**Fallback note:** The planning research was produced directly from repository inspection plus rendered browser review because a dedicated `gsd-phase-researcher` pass was not used in-session.

## Executive Summary

Phase 4 should be planned as a visual-system hardening and composition-quality pass, not as a brand reset and not as another content expansion phase.

The site is already strong in structure:
- trust, call flow, FAQ, and proof routing are present
- service, process, and dossier routes have meaningful content depth
- bilingual route parity is structurally sound
- rendered QA already covers Phase 1 through Phase 3 markers

The main Phase 4 gap is that the premium layer is still uneven:
- the visual language is coherent but repetitive
- long pages feel dense because too many sections use the same card/grid rhythm
- placeholder identity surfaces still draw too much attention visually
- the mobile and desktop experiences are stable, but not yet intentionally polished enough to satisfy `UX-01`

Phase 4 should do four things:
1. strengthen the shared design system and page-shell rhythm
2. improve hierarchy and scannability on the longest route families
3. harden viewport behavior, sticky CTA behavior, and parity across UA/EN
4. add Phase 4-specific layout validation so premium polish does not regress later

## What You Need To Know To Plan This Phase Well

### 1. The site already looks intentional, but too many sections share the same visual weight

Current visual direction from `assets/css/site.css`:
- warm editorial palette
- serif display typography
- rounded translucent surfaces
- shadow-heavy cards
- grid-pattern background
- subtle motion and tilt effects

This foundation is good enough to keep. The problem is repetition:
- many sections use the same large rounded card treatment
- service cards, process cards, proof cards, and some support blocks read too similarly
- long pages stack many comparable surfaces with limited escalation or decompression

Planning implication:
- Phase 4 should tune hierarchy through spacing, card variation, contrast, and section composition
- it should not replace the visual language with a different aesthetic

### 2. The homepage is convincing, but still crowded

Rendered review of `/` and `/en/` shows:
- hero is visually strong and trustworthy
- proof and route-bridge sections are useful
- below the first screens, the page becomes long and card-dense quickly
- the placeholder business name remains highly visible in the header and trust strip, which makes the site feel less premium even when the structure is strong

Planning implication:
- Phase 4 should make the homepage feel more composed, not longer
- premium improvement should come from section pacing and hierarchy, not from adding more content
- placeholder identity should be visually de-emphasized where replacement is still deferred to Phase 5

### 3. Long-form routes need scannability work more than they need more copy

The repo now has rich long-form routes:
- `service_detail`
- `process`
- `case_study`
- `projects index`
- FAQ and support surfaces

The content is useful, but the scan rhythm is still too uniform:
- many sections start with wide intros followed by card grids
- proof, fit, FAQ, and route-bridge sections can blur together visually
- dossier pages are structurally good, but they still need a sharper premium reading rhythm

Planning implication:
- Phase 4 should focus on layout variation, section framing, and controlled density
- this is the main route to satisfying `UX-04`

### 4. Mobile stability is acceptable, but the phase still needs viewport-specific hardening

The current repo already includes:
- sticky mobile phone CTA
- mobile nav toggle
- mobile spacing compensation via `body.has-sticky-phone-cta`
- image dimensions on key visuals
- responsive breakpoints around `900px` and `640px`

Recent layout bugs were fixed earlier, but Phase 4 still owns:
- overflow and cramped-state prevention on long pages
- sticky CTA behavior across more complex page compositions
- mobile header/nav polish
- parity of premium surfaces across UA and EN

Planning implication:
- Phase 4 should include explicit mobile and desktop rendered review, not only static markup checks

### 5. Motion exists already, but it is generic and broad

Current JS in `assets/js/site.js` adds:
- scroll progress bar
- reveal-on-intersection
- pointer tilt on hero shots and some cards
- mobile nav toggle

This is enough to keep motion lightweight, but the current approach is broad rather than selective.

Planning implication:
- Phase 4 should refine motion to support hierarchy and calm rather than making every surface feel equally animated
- it should not introduce a JS-heavy interaction layer

### 6. Placeholder business identity is still a visual trust drag

Rendered inspection still shows:
- `Business name pending confirmation` in the header
- placeholder contact values
- placeholder trust cards in some surfaces

Phase 5 owns actual replacement. But Phase 4 still needs to prevent those temporary values from undermining the premium impression.

Planning implication:
- de-emphasize temporary identity visually where possible
- keep honesty intact
- do not introduce stronger visual emphasis around placeholder brand details

## Current Repository Reality

### What already helps

- `assets/css/site.css` already contains a coherent warm editorial visual system with tokens and responsive rules.
- `assets/js/site.js` already provides light motion, nav toggling, and sticky CTA state management.
- `_layouts/home.html`, `_layouts/service_detail.html`, `_layouts/process.html`, and `_layouts/case_study.html` already define the core page families Phase 4 needs to polish.
- `scripts/qa.sh` already runs Phase 1 through Phase 3 checks, so Phase 4 can extend an existing QA path.
- current content depth and proof routing mean Phase 4 can focus on experience quality instead of inventing page purpose.

### What is missing

- no Phase 4 render-check script
- no explicit layout-parity validation for premium surfaces
- no scannability-focused markers on long pages
- no browser-review matrix encoded in the phase validation contract
- no shared variation system to distinguish hero, trust, proof, FAQ, and route-bridge sections more clearly

## Standard Stack

Use the current stack:
- GitHub Pages-safe Jekyll
- shared CSS and lightweight JS
- data-driven layouts
- existing QA shell plus a new Phase 4 rendered check helper
- browser automation as preferred evidence during execution and sign-off

Do not introduce:
- a framework migration
- heavy front-end dependencies
- visual effects that compromise stability

## Rendered UX Findings

### Homepage

- strong hero and proof framing
- too many later sections use similar card geometry and similar background weight
- trust and placeholder identity are honest, but the visual emphasis on placeholder business name remains high
- page feels trustworthy, but not yet materially premium

### English parity

- `/en/` mirrors the structure correctly
- parity is functionally solid
- English route inherits the same density and visual repetition patterns as Ukrainian

### Mobile

- CTA remains visible and mobile nav is functional
- page is dense but usable
- premium feel drops faster on mobile because section rhythm compresses into repeated stacked cards

## Requirement-by-Requirement Implications

### UX-01: Premium and appealing design system without losing trust

This requires:
- stronger section hierarchy
- more deliberate card variation
- calmer premium emphasis around proof and trust
- improved shell, spacing, and typography rhythm

It does not require:
- a flashy redesign
- decorative effects disconnected from credibility

### UX-02: No layout glitches, overflow defects, unstable spacing, or confusing CTA behavior

This requires:
- explicit mobile and desktop QA
- shared shell and section spacing hardening
- sticky CTA and nav review on complex routes
- route-level checks on current key page families

### UX-03: UA/EN parity for trust content and primary CTA availability

This requires:
- parity checks on touched premium surfaces, not only structural route existence
- validation that layout variations land on both languages
- preservation of phone CTA and language-switch behavior during redesign work

### UX-04: Long pages remain scannable and composed

This requires:
- composition changes on service, process, dossier, and project-index routes
- section variation and stronger pacing
- route-specific scan aids where needed

## Common Pitfalls

- trying to solve premium feel through more copy or more sections
- over-darkening or over-stylizing the site and losing trust
- changing every component at once with no QA guardrails
- improving desktop polish while ignoring mobile stacked density
- making placeholder identity more visually loud while it is still temporary
- treating parity as translation-only instead of layout and CTA parity
- using motion everywhere instead of using it selectively

## Recommended Planning Shape

Plan Phase 4 in four waves:
1. shared design tokens, layout markers, and Phase 4 QA guardrails
2. shell, hero, header, footer, and homepage premium polish
3. long-route composition work across service, process, dossier, and support pages
4. responsive hardening, parity validation, browser review, and final sign-off

## Validation Architecture

Phase 4 needs both automated rendered checks and explicit browser review.

### Test infrastructure

Use:
- `./scripts/qa.sh`
- a new `scripts/phase4_render_checks.mjs`
- browser automation spot-checks during execution and sign-off

### What should be automated

At minimum validate:
- core UA and EN routes still build
- premium surfaces render on target routes
- primary CTA, language switcher, and sticky CTA remain present on touched routes
- new scan or layout markers exist on long-form routes
- dossier, process, service, and home layouts keep required trust/proof bridges after polish

### Recommended validation markers

Use stable markers such as:
- `data-phase4-marker="premium-shell"`
- `data-phase4-marker="scan-rhythm"`
- `data-phase4-marker="cta-stability"`
- `data-phase4-marker="layout-parity"`

### Manual review still required

Automation will not prove premium quality. Manual browser review should confirm:
- the site feels materially more premium
- long pages are easier to scan
- no route feels cramped or visually repetitive on mobile
- UA and EN remain visually aligned
- CTA behavior stays obvious and calm

## Bottom Line

Plan Phase 4 as a refinement and hardening pass over the existing trust, content, and proof system.

The right target is:
- stronger composition
- cleaner hierarchy
- explicit responsive hardening
- safer parity validation

That is enough to satisfy `UX-01` through `UX-04` without destabilizing the site or losing the conversion-first trust posture.
