# Phase 2: Content Architecture Expansion - Context

**Gathered:** 2026-03-11
**Status:** Ready for planning

<domain>
## Phase Boundary

Expand the site's textual depth and trust content through stronger page structure, clearer page roles, richer buyer-facing explanations, and more decision-supporting information across the existing bilingual site. This phase is about what visitors read and how they scan it. It is not the case-study/proof-system phase, and it is not a broad visual redesign phase.

</domain>

<decisions>
## Implementation Decisions

### Content structure
- Phase 2 should use a hybrid content model: modular sections should carry most of the page structure, but longer editorial passages are acceptable where trust depends on narrative flow.
- The biggest increase in text depth should land on service pages and the process page first, before equally densifying every top-level page.
- Moderate repetition is acceptable between homepage, services, and process so visitors can still encounter the key trust arguments from multiple entry points.
- Dense pages should scan through short section intros, summaries, lists, and subsections rather than long uninterrupted prose.

### Objection handling
- The expanded content should address fear of cost drift, budget surprises, and unclear commercial logic more directly than other hesitation themes.
- Objection-handling tone should stay calm and concrete rather than fear-heavy or soft/generic.
- Process logic should carry the weight of objection handling more than visual beauty or convenience framing.
- Objection-handling content should live inline on key pages, especially service and process surfaces, rather than being hidden mainly inside FAQ-only sections.

### Commercial clarity
- Phase 2 should be moderately explicit about how the work is run, but not read like a public operations manual.
- Procurement should stay a light supporting topic rather than a dominant public content pillar.
- Public-facing content should avoid centering mid-project changes as a major topic.
- Handoff and "ready for use" expectations can appear as a secondary trust signal, but should not dominate the page structure.

### Claude's Discretion
- Exact section sequencing and how much editorial flow each page needs, as long as the hybrid model and scan-first structure are preserved.
- Which specific service pages receive the deepest expansion first, provided service and process surfaces lead the Phase 2 density increase.
- How objection-handling and FAQ content are distributed across inline modules versus the dedicated FAQ page, as long as key objections stay visible on the main decision path.
- Whether a light segmentation layer is needed inside Phase 2 planning without turning segmentation into a new capability or its own content system.

</decisions>

<specifics>
## Specific Ideas

- The user wants the site to feel much richer in real information, not just visually polished.
- Content should help a renovation buyer trust the team enough to call, but without burying the call path under content bloat.
- Hybrid page composition is preferred over pure long-form editorial pages or purely card-based modular pages.
- Service and process pages should become the main "depth" surfaces because that is where buyers judge scope, control, and seriousness.
- Objection handling should be strongest around money surprises and commercial clarity, but answered through calm process discipline rather than aggressive fear language.
- Procurement and change-order detail should not dominate public pages.

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- `_layouts/page.html` already supports stacking shared trust, proof, project-fit, and call-expectation modules through frontmatter flags.
- `_layouts/service_detail.html` already combines trust-strip, proof, project-fit, related-work, and call-expectation sections around service-specific content.
- `_layouts/home.html` already uses section-heading, accent-band, trust, proof, and CTA blocks that can be expanded rather than replaced.
- `_data/service_pages.yml`, `_data/process_page.yml`, `_data/call_flow.yml`, and `_data/trust_foundation.yml` already hold substantial structured bilingual content and can support Phase 2 depth through shared data rather than one-off page copy.

### Established Patterns
- The repo prefers data-driven bilingual content in `_data/` over duplicated long-form markup inside pages.
- Shared layouts and includes already separate page roles reasonably well: home for brand/scope framing, service pages for scope evaluation, process for delivery logic, page layout for simpler informational routes.
- Phase 1 already established trust-first, phone-first, CTA-adjacent explanatory modules, so Phase 2 should deepen reading surfaces without breaking that hierarchy.

### Integration Points
- `_data/translations.yml` for homepage and shared section headings.
- `_data/service_pages.yml` for deeper service-specific buyer-facing copy and objection handling.
- `_data/process_page.yml` for commercial/process clarity and risk/control explanations.
- `faq/index.md` and `en/faq/index.md` for any FAQ expansion that still needs a standalone destination.
- `_layouts/service_detail.html`, `_layouts/process.html`, `_layouts/home.html`, and `_layouts/page.html` as the main surfaces where new content architecture decisions will land.

</code_context>

<deferred>
## Deferred Ideas

- A fully developed property-type or buyer-situation segmentation system is deferred unless planning finds a light Phase 2 version that stays within the current scope.
- Deeper case-study storytelling and stronger before/during/after proof remain Phase 3 work.
- Larger visual-system overhaul and layout-premiumization remain Phase 4 work.
- SEO-driven page-family expansion remains later roadmap work unless a Phase 2 content structure decision clearly requires a limited support page.

</deferred>

---
*Phase: 02-content-architecture-expansion*
*Context gathered: 2026-03-11*
