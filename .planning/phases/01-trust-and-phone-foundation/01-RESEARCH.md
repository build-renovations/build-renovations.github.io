# Phase 1 Research: Trust And Phone Foundation

**Phase:** 01 - Trust And Phone Foundation  
**Researched:** 2026-03-11  
**Tool mode:** `mcp_preferred`  
**MCP used:** `web` for current Google/MDN/W3C guidance, `browser_automation` for rendered mobile inspection of the current site  
**Fallback note:** This file was produced directly because the dedicated `gsd-phase-researcher` specialist was unavailable in-session.

## Executive Summary

Phase 1 should be planned as a shared trust-and-conversion infrastructure pass, not as a copy-only refresh.

The repo already has the right technical shape for this work:
- bilingual page pairs with `translation_key`
- shared UI copy in `_data/translations.yml`
- reusable layouts and includes
- JSON-LD, canonical, and `hreflang` already centralized in `_includes/head.html`

The current implementation is not yet meeting the phase requirements:
- primary CTAs still route to `/contact/` instead of starting a call
- only the footer exposes a real `tel:` link
- there is no persistent mobile phone CTA
- trust blocks are generic and unsourced
- visible business identity is still placeholder-level
- the contact page explains the brief, but not through a stronger conversion system

The biggest planning fact is that two requirements need explicit placeholder policy when business inputs are still missing:
- `TRST-01` becomes risky if `_config.yml` uses placeholder business name, phone, email, and broad service-area defaults without clearly tracking them as temporary.
- `TRST-04` becomes misleading if proof modules use invented reviews or testimonials without clearly labeling them as placeholder/demo content.

Plan this phase in two tracks:
1. Build the reusable phone-first and trust-module system now.
2. Allow clearly labeled placeholder identity and proof content now, then replace it with real business data and sourced proof in later phases before release.

## What You Need To Know To Plan This Phase Well

### 1. This phase is about systemizing trust, not adding isolated sections

The site already has trust-related content across home, about, process, services, and contact. The phase should turn that into a consistent system:
- one phone-primary CTA pattern
- one secondary messenger pattern
- one trust-identity pattern
- one project-fit pattern
- one call-expectations pattern
- one sourced-proof pattern

If the plan edits every page independently, the repo will drift fast across UA and EN.

### 2. The current site proves the architecture, but not the business

Repository inspection and rendered review show:
- Home hero, service pages, process pages, and header all use contact CTAs that point to contact pages, not `tel:`.
- Footer contains the only consistently rendered `tel:` link.
- Mobile contact page currently has no primary phone button above the fold.
- Structured data already injects `telephone`, `email`, locality, and service area from `_config.yml`, so placeholder data currently leaks into visible UI and JSON-LD.

This means Phase 1 is mostly an implementation of missing content contracts and shared components, not a platform problem.

### 3. Phone-first does not mean phone-only

The phase context is explicit:
- phone remains the visually primary action
- Telegram, Viber, and WhatsApp are legitimate first-contact options
- those options must not compete with the phone CTA

So the plan should implement a strict hierarchy:
- primary: `tel:`
- secondary: messenger cluster
- tertiary: contact page / email

The mistake to avoid is giving all contact methods equal visual weight.

### 4. The contact page stays important even after CTAs become `tel:`

`CALL-02` requires that buyers understand:
- what happens during the first call
- what information to prepare before calling

So the contact page should not remain the only conversion path, but it should remain the best detail page for the call brief. The primary CTA system should send users directly to a call from major pages while the contact page carries the full explanation.

### 5. Trust here is mostly commercial clarity

For this business, the trust layer should answer:
- who is responsible
- what scope is actually covered
- which projects fit
- how work is controlled across stages
- what proof is real and attributable

Do not plan a vague “premium trust” layer. Plan one that reduces buyer hesitation with concrete operational clarity.

### 6. Phase 1 should not depend on new pages

The requirement set can be met inside the current page footprint if shared modules are introduced across core pages:
- home
- about
- services index
- process
- contact
- key service-detail pages where conversion intent is strongest

Adding brand-new pages in Phase 1 would slow delivery and dilute the goal. New page-family expansion belongs to later phases.

## Requirement Interpretation

### Trust requirements

- `TRST-01`: show real business identity, service profile, service area, and legitimacy signals on core pages.
- `TRST-02`: explain project fit clearly enough that buyers can self-qualify.
- `TRST-03`: show how scope, sequencing, coordination, and accountability are managed.
- `TRST-04`: expose proof with source attribution while keeping the buyer on the main decision path.

### Conversion requirements

- `CALL-01`: every primary page needs an obvious tap/click path to call on both desktop and mobile.
- `CALL-02`: first-call expectations and prep checklist must be easy to find.
- `CALL-03`: mobile needs a persistent phone CTA that stays reachable without covering content.
- `CALL-04`: messenger/contact fallback must exist, but remain clearly secondary to phone.

## Current Repository Reality

### What already helps

- `_includes/head.html` already centralizes metadata and business schema inputs.
- `_includes/header.html` already gives a global site-wide insertion point for shared CTA logic.
- `_layouts/home.html`, `_layouts/process.html`, and `_layouts/service_detail.html` already expose repeated CTA zones.
- `_data/translations.yml` already centralizes shared bilingual UI strings.
- The contact pages already carry a useful “brief before contact” narrative.

### What is missing

- no shared CTA include
- no shared trust module include
- no messenger link model
- no sourced-proof data model
- no project-fit data model
- no QA guard against placeholder business data
- no rendered check that primary pages expose a real phone CTA

### Rendered mobile evidence

Browser inspection at `390x844` found:
- homepage hero primary CTA links to `/contact/`, not `tel:`
- homepage footer phone is currently the first real call target
- contact page has no `.button--primary` CTA above the fold
- header height is about `144px` on mobile, which matters for sticky CTA spacing and overlap planning

## Standard Stack

Use the current stack. Do not introduce new platform dependencies for this phase.

- GitHub Pages-safe Jekyll
- Liquid includes and layouts
- `_data/`-driven bilingual content contracts
- `site.company` in `_config.yml` for canonical identity fields already consumed by JSON-LD
- lightweight vanilla JS only if needed for sticky CTA behavior
- `./scripts/qa.sh` plus rendered browser checks for validation

## Architecture Patterns

### 1. Separate identity data from persuasive trust copy

Keep canonical business identity in `_config.yml` because it already feeds schema and global templates:
- company name
- phone
- email
- locality/country
- service area baseline

Create new `_data/` files for Phase 1 content that is editorial and reusable:
- `_data/contact_channels.yml`
- `_data/trust_foundation.yml`
- `_data/call_flow.yml`

Recommended responsibilities:
- `_config.yml`: canonical business facts used globally
- `_data/contact_channels.yml`: phone label, messenger URLs, platform labels, per-language intro text
- `_data/trust_foundation.yml`: identity bullets, project-fit bullets, accountability bullets, proof items with source labels
- `_data/call_flow.yml`: what to prepare, what happens on the first call, response expectations

### 2. Build reusable includes instead of page-local CTA markup

Add shared includes and use them across page families:
- `_includes/primary-phone-cta.html`
- `_includes/contact-options.html`
- `_includes/trust-strip.html`
- `_includes/call-expectations.html`
- `_includes/project-fit.html`
- `_includes/sourced-proof.html`

This is the cleanest way to satisfy the requirement set without duplicating UA/EN markup.

### 3. Use a consistent CTA hierarchy everywhere

Recommended pattern:
- primary CTA include renders a `tel:` link and short phone-first microcopy
- secondary contact include renders Telegram, Viber, and WhatsApp
- contact page link remains available as a supporting “how the first contact works” path

Recommended page placement:
- header: direct phone CTA on desktop, compact phone action on mobile
- homepage hero: primary phone CTA + secondary messenger cluster
- homepage lower banner: call expectations or brief-prep CTA, not another vague “contact us”
- process page: CTA tied to accountability and next steps
- service pages: CTA tied to project fit and scope discussion
- contact page: full brief guidance + phone CTA + messenger fallback

### 4. Treat sticky mobile CTA as a viewport-specific enhancement

Implement a small-screen sticky phone bar only where it improves access:
- visible on phone widths
- primary action is `tel:`
- secondary messenger expansion or adjacent link stays lower emphasis
- reserved bottom spacing must be added to the page so the bar does not cover content

Do not make the sticky bar the only phone path. It should reinforce, not replace, inline CTAs.

### 5. Keep trust proof inline with decision content

For `TRST-04`, sourced proof should appear close to major conversion moments:
- near hero or first trust section on home
- near project-fit / accountability content on service or process pages
- near contact expectations on contact page

Do not bury proof only in footer or only on a future proof page.

### 6. Keep schema changes conservative

Current Google documentation still expects accurate business identity and address/service-area data for local business markup. Because this repository currently uses placeholder and partial business data, Phase 1 should:
- keep schema aligned with verifiable business facts only
- avoid inventing full street-address detail if the business is service-area only
- avoid adding review rich-result markup for self-published business reviews

Use this phase to improve visible trust and accurate business fields first. Rich-result expansion can follow when the business data is real and compliant.

## Business Inputs Required Before Planning Final Task Estimates

Get these before treating the site as release-ready:

### Must-have identity inputs

- final public business name
- working phone number in production format
- production email or a deliberate decision to hide email from primary conversion
- true service area definition
- whether the business is storefront, service-area, or hybrid

### Must-have channel inputs

- Telegram URL
- Viber deep link / share link strategy
- WhatsApp link
- platform order and whether all three are live on both UA and EN pages

### Must-have trust inputs

- review/testimonial sources that can be cited
- credential, warranty, guarantee, or operating-history signals if they exist
- proof source labels such as Google reviews, direct client quote with project type, or documented process evidence

### Must-have conversion inputs

- what the team actually wants to know on the first call
- what the team can reliably promise after the first call
- whether site visit, estimate, or follow-up sequence is standard
- which project types should be politely disqualified or reframed

If these inputs are missing, implementation may use clearly labeled placeholders for layout and copy scaffolding, but later phases must replace them before release.

## Requirement-to-Implementation Map

| Requirement | What Phase 1 should build |
| --- | --- |
| `TRST-01` | shared identity/trust strip on core pages; centralized business fields in config; visible service area and business framing |
| `TRST-02` | reusable project-fit section with property type, scope type, and project-stage fit bullets |
| `TRST-03` | reusable accountability/process-control module tied to current process content |
| `TRST-04` | sourced proof block with attribution labels and outbound proof links where appropriate, or clearly labeled placeholder proof when real sources are not yet available |
| `CALL-01` | phone CTA include on every primary page and page family |
| `CALL-02` | reusable “what to prepare / what happens next” content on contact and CTA-adjacent modules |
| `CALL-03` | mobile sticky phone bar with content-safe spacing and tap-friendly target size |
| `CALL-04` | messenger cluster as secondary contact path with lower visual weight than phone |

## Recommended Task Shape For Planning

Plan the phase as 5 implementation tasks plus 1 validation task.

### Task 1. Define Phase 1 data contracts

Create or extend shared data for:
- contact channels
- trust foundation
- call flow

Completion criteria:
- bilingual data exists
- no page-local duplication is needed for core trust/contact content
- config/data boundary is documented by file ownership

### Task 2. Build shared CTA includes

Implement:
- primary phone CTA include
- contact-options include
- mobile sticky CTA

Completion criteria:
- every primary page family can render the same CTA contract
- desktop and mobile both expose real call actions
- messenger fallback stays secondary

### Task 3. Build shared trust includes

Implement:
- business identity / legitimacy strip
- project-fit block
- accountability / coordination block
- sourced-proof block

Completion criteria:
- trust sections are reusable
- trust content is visible on core pages without duplicating markup
- sourced proof has attribution fields, not plain quote text only

### Task 4. Rework core pages to use the shared system

Apply the new include layer to:
- header
- home
- about
- process
- contact
- service layout or selected high-intent service pages

Completion criteria:
- CTAs and trust framing are consistent across UA and EN
- contact page remains the deep explanation page for the first call

### Task 5. Add business-data guardrails

Implement one or more lightweight checks so placeholder data cannot quietly ship as if it were final:
- fail build if phone or email are unlabeled placeholders
- optionally fail if messenger URLs are missing when Phase 1 is enabled
- fail if sourced-proof items are present without attribution fields
- fail if placeholder proof items are presented without explicit placeholder/demo labeling

Completion criteria:
- trust and contact regressions become detectable before release

### Task 6. Validate rendered behavior

Run build and rendered checks against both language trees and mobile/desktop CTA behavior.

Completion criteria:
- every required page exposes a call path
- sticky CTA does not obscure content
- bilingual parity is intact

## Don't Hand-Roll

- Do not hand-roll per-page CTA markup when shared includes will do.
- Do not hardcode UA and EN CTA copy separately inside layouts when `_data/` can drive it.
- Do not present invented testimonials, ratings, guarantees, years in business, or service-area claims as real facts.
- Do not add unsupported Jekyll plugins for translation or schema generation.
- Do not add review rich-result markup for self-published business reviews on the business’s own pages.
- Do not make email or messenger visually equal to phone if the business goal is phone-first.
- Do not rely on JSON-LD alone for trust. Visible proof and visible business identity still matter.

## Common Pitfalls

### 1. Replacing “contact page only” with “phone button only”

That would improve `CALL-01` but weaken `CALL-02`. The phase needs both direct call access and clear call expectations.

### 2. Treating messenger links as an afterthought

The phase context says Telegram, Viber, and WhatsApp are real first-contact paths. Hide them too deeply and `CALL-04` becomes weak. Give them too much prominence and phone-first intent gets diluted.

### 3. Shipping placeholder trust

A polished trust module with fake or generic proof is worse than a thinner but honest one. Phase 1 planning must separate “UI component ready” from “real evidence loaded,” and any placeholder proof must read as temporary rather than factual.

### 4. Breaking bilingual parity through include shortcuts

The repo’s translation model is manual. Every new include and data file must be designed for both `uk` and `en` from the start.

### 5. Forgetting structured-data side effects

Because `_includes/head.html` already outputs business schema from `_config.yml`, any placeholder value or inaccurate service-area description affects both visible trust and machine-readable trust.

### 6. Letting the sticky CTA cover page content

`CALL-03` is not satisfied by simply fixing a button to the bottom. The page must reserve space for it and keep it accessible without obscuring content or footer actions.

## Current External Guidance That Matters

### Google Business Profile and business identity

Current Google Business Profile guidance still emphasizes:
- represent the business consistently in the real world
- keep address and/or service area precise
- use the fewest categories needed to describe the core business

For service-area businesses, Google’s help documentation says businesses that do not serve customers at their address should remove the public address and define service areas precisely, with up to 20 service areas and a practical coverage boundary.

Planning implication:
- the site should not claim a broader service footprint than the business can actually serve
- the business type decision matters for both visible trust and schema accuracy

### Google LocalBusiness structured data

Google Search Central still recommends using the most specific local business subtype possible and providing as many accurate address properties as possible where applicable.

Planning implication:
- only strengthen structured data with verified fields
- do not fabricate address detail for a service-area-only business

### Google review markup guidance

Google’s review snippet documentation and review-rich-result policy still exclude self-serving review snippets for `LocalBusiness` and `Organization` pages controlled by the business itself.

Planning implication:
- visible testimonials and linked review sources are valid trust content
- Phase 1 should not plan “review stars in search” as an outcome of adding testimonials to the site

### MDN telephone links

MDN still documents `tel:` anchors as the standard way to open telephone actions from links.

Planning implication:
- primary CTAs should be real `tel:` anchors, not buttons that only route to contact pages

### W3C target size guidance

WCAG 2.2 target-size guidance still uses `24x24 CSS pixels` as the minimum target threshold for adjacent controls.

Planning implication:
- sticky phone CTA controls and messenger buttons should be dimensioned as touch targets, not only styled as inline text links

## Code Examples

### Example: primary phone CTA include contract

```liquid
{% assign lang = include.lang | default: page.lang | default: 'uk' %}
{% assign t = site.data.translations[lang] | default: site.data.translations.uk %}
{% assign channels = site.data.contact_channels[lang] | default: site.data.contact_channels.uk %}

<a class="button button--primary" href="tel:{{ site.company.phone }}">
  {{ channels.phone_cta_label | default: t.cta_primary }}
</a>
```

### Example: messenger fallback contract

```liquid
{% for item in channels.messengers %}
  <a class="contact-option" href="{{ item.url }}">{{ item.label }}</a>
{% endfor %}
```

### Example: mobile sticky CTA logic

```liquid
{% if include.sticky %}
  <div class="mobile-call-bar">
    <a class="mobile-call-bar__phone" href="tel:{{ site.company.phone }}">
      {{ channels.phone_short_label }}
    </a>
    <a class="mobile-call-bar__more" href="{{ channels.contact_page_url | relative_url }}">
      {{ channels.more_options_label }}
    </a>
  </div>
{% endif %}
```

The implementation can stay JS-light if CSS handles visibility by breakpoint and the markup is rendered globally or per-layout.

## Validation Architecture

Use a three-layer validation strategy.

### Layer 1. Build and data integrity

Run `./scripts/qa.sh` and add one Phase 1-specific validation command or extension that checks:
- no placeholder phone or email in `_config.yml`
- messenger URLs exist when enabled
- proof items include source labels and URLs where required
- new data files contain both `uk` and `en`

### Layer 2. Rendered conversion checks

Use browser automation against the built site and verify at minimum:
- `/`
- `/about/`
- `/services/`
- `/process/`
- `/contact/`
- `/en/`
- `/en/about/`
- `/en/services/`
- `/en/process/`
- `/en/contact/`

Checks:
- each page has at least one visible `a[href^="tel:"]`
- mobile width shows persistent phone CTA on required pages
- sticky CTA does not overlap footer or hide page text
- messenger links are visible but visually secondary
- contact page clearly explains prep items and first-call outcome

### Layer 3. Metadata and bilingual integrity

Verify on representative UA and EN pages:
- canonical remains correct
- `hreflang` alternates still resolve
- JSON-LD uses real business fields
- no translation-key regressions

### Requirement-oriented signoff matrix

Use this matrix for final phase verification:

| Requirement | Validation signal |
| --- | --- |
| `TRST-01` | business identity block visible on core pages; config no longer placeholder |
| `TRST-02` | project-fit criteria visible on home/contact/service surfaces |
| `TRST-03` | accountability/process-control block visible and specific |
| `TRST-04` | at least one sourced proof module visible with attribution |
| `CALL-01` | every primary page exposes a `tel:` action |
| `CALL-02` | call-prep and next-step guidance visible on contact and/or CTA-adjacent modules |
| `CALL-03` | mobile sticky CTA works without obscuring content |
| `CALL-04` | messenger fallback exists and remains visually secondary |

## Planning Recommendations

Plan this phase only if the plan explicitly includes:
- a business-data collection subtask or confirmed business inputs
- shared `_data/` contracts for trust and contact
- shared include work before page rewiring
- a sticky mobile CTA implementation and spacing check
- QA guardrails for placeholder business data

Do not plan this phase as “update homepage and contact page copy.” That would miss most of the requirement surface and create rework in later phases.

## Confidence

| Area | Confidence | Notes |
| --- | --- | --- |
| Repo implementation approach | HIGH | Strong fit with existing include/data architecture |
| Conversion pattern direction | HIGH | Fully aligned with phase context and current rendered gaps |
| Trust-module structure | HIGH | Matches requirement set and current repo constraints |
| Final business-proof content | MEDIUM | Depends on real-world business assets not yet present in repo |
| Schema expansion specifics | MEDIUM | Must follow actual business type and verified data |

## Sources

### Repository sources

- `.planning/phases/01-trust-and-phone-foundation/01-CONTEXT.md`
- `.planning/REQUIREMENTS.md`
- `.planning/STATE.md`
- `.planning/PROJECT.md`
- `.planning/research/SUMMARY.md`
- `.planning/codebase/ARCHITECTURE.md`
- `.planning/codebase/CONVENTIONS.md`
- `.planning/codebase/TESTING.md`
- `.planning/codebase/CONCERNS.md`
- `_includes/header.html`
- `_layouts/home.html`
- `_layouts/service_detail.html`
- `contact/index.md`
- `en/contact/index.md`
- `_includes/head.html`
- `_config.yml`

### Current external guidance

- Google Search Central: Local Business structured data  
  https://developers.google.com/search/docs/appearance/structured-data/local-business
- Google Search Central: Review Snippet structured data  
  https://developers.google.com/search/docs/appearance/structured-data/review-snippet
- Google Search Central Blog: self-serving review rich results policy  
  https://developers.google.com/search/blog/2019/09/making-review-rich-results-more-helpful
- Google Business Profile Help: Guidelines for representing your business on Google  
  https://support.google.com/business/answer/3038177
- Google Business Profile Help: Manage service areas for service-area and hybrid businesses  
  https://support.google.com/business/answer/9157481
- MDN: `<a>` element and telephone links  
  https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/a
- W3C WAI: Understanding Success Criterion 2.5.8 Target Size (Minimum)  
  https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html
