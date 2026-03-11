# Phase 1: Trust And Phone Foundation - Context

**Gathered:** 2026-03-11
**Status:** Ready for planning

<domain>
## Phase Boundary

Build the site’s first-layer trust system and a clearer direct-contact conversion path for the existing bilingual renovation website. This phase defines how trust and contact are presented across the current site surface. It does not add the larger case-study system or broader content-footprint expansion from later phases.

</domain>

<decisions>
## Implementation Decisions

### Contact-path framing
- The site copy should actively move a hesitant visitor into direct contact rather than staying neutral or purely informational.
- CTA language should be confident and direct, not soft-consultative and not high-pressure/urgent.
- The primary promise of the CTA is clear next steps: the visitor should feel they will quickly understand scope, stages, and what happens next.

### Contact-channel priority
- Phone should remain the visually primary contact action across the site.
- Telegram, Viber, and WhatsApp should be treated as real first-class contact paths, not hidden or fallback-only options.
- Messenger options should support the same contact intent as calling: starting a real project conversation, not a lighter or less serious path.

### Pre-contact guidance
- CTA-adjacent copy should encourage visitors to prepare project basics before contacting: property type, current condition, needed stages, and target timing.
- The first-contact framing should read as a practical project brief, not a vague consultation request and not an estimate-only promise.

### Claude's Discretion
- Exact placement and repetition cadence of phone and messenger CTAs across current pages.
- Whether messenger links are grouped beside the primary phone CTA or placed in a supporting trust/contact module.
- The final microcopy variants for home, service pages, and contact pages, as long as they preserve the direct tone and the project-brief framing.
- The exact supporting trust-module composition for this phase, provided it strengthens and does not dilute the direct-contact path.

</decisions>

<specifics>
## Specific Ideas

- The user wants text phrased in a way that triggers a real contact action from a potential customer.
- The preferred direct-contact set is: phone call, Telegram, Viber, and WhatsApp.
- Phone should still read as the main next step, but Telegram / Viber / WhatsApp should feel equally legitimate as ways to start the conversation.
- CTA copy should make visitors feel ready to reach out with project basics rather than waiting until they have every detail prepared.

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- `_includes/header.html`: already contains a top-level CTA button and the main bilingual navigation shell.
- `_layouts/home.html`: already includes hero CTA buttons and a lower contact banner that can be reworked into stronger trust/contact patterns.
- `contact/index.md` and `en/contact/index.md`: already frame first contact as a short practical brief and can be upgraded rather than replaced.
- `_data/translations.yml`: existing source for shared CTA labels and bilingual UI copy.

### Established Patterns
- Shared bilingual UI text is centralized in `_data/` and resolved in layouts/includes using `page.lang`.
- Conversion surfaces are currently page-template driven rather than centralized in a dedicated CTA include.
- The repo favors reusable includes and shared data contracts over one-off duplicated page markup.

### Integration Points
- Header CTA and navigation area
- Homepage hero CTA cluster
- Homepage contact banner
- Contact page content and any future shared CTA/trust include introduced in this phase
- Shared translation/data files for bilingual CTA parity

</code_context>

<deferred>
## Deferred Ideas

- Larger case-study and proof-system expansion belongs to Phase 3.
- Broader content-footprint expansion and new trust/support page families belong to Phase 2 and Phase 5.
- Premium visual-system overhaul beyond what is needed to support the trust/contact path belongs to Phase 4.

</deferred>

---
*Phase: 01-trust-and-phone-foundation*
*Context gathered: 2026-03-11*
