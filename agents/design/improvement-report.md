# UI, Typography, Copy, and SEO Review

Status: DONE
Owner: Design + UX + SEO synthesis
Tool mode: repo_only
MCP usage: browser automation used to inspect rendered desktop and mobile states before writing this report.

## What improved in this pass

### UI and UX

- The homepage now reads as a guided editorial flow instead of a stack of similar cards.
- Service cards became real navigation entry points with direct links into the corresponding detail pages.
- The hero now establishes relevance faster through chips, stronger proof framing, and a more structured visual hierarchy.
- The trust section now ends with a stronger quote-style reinforcement instead of only repeating short proof bullets.
- Motion now includes:
  - staggered reveal timing
  - subtle parallax on media-heavy elements
  - scroll progress feedback
  - stronger hover transitions on cards and images

### Typography

- Display hierarchy is stronger because:
  - `h1` spacing and width are tighter
  - section headings are more compact
  - body copy was normalized closer to `1.03rem` for better reading consistency
- Service card and process card typography now feels clearer and less generic.

### Copy

- The homepage lead no longer speaks about what the site should do.
- It now speaks as the renovation business itself, which is more credible and more useful for SEO intent.
- Microcopy is more action-oriented:
  - service discovery now uses explicit detail links
  - hero chips explain value fast
  - process cards introduce control as the key concept

### SEO

- Homepage copy is now more commercial and buyer-facing.
- Service cards now create stronger internal-link paths into service detail pages.
- More images now declare `width` and `height`, which supports layout stability and Core Web Vitals.
- The page structure still preserves bilingual `lang`, `translation_key`, canonical, and `hreflang` behavior.

## Font-size review

- `h1`:
  - strong and visually distinctive
  - still acceptable on mobile because the line length stays controlled
- `h2`:
  - appropriate for section framing
  - now reads more intentionally due to tighter max width
- Body text:
  - improved from a slightly soft, generic reading size to a steadier editorial rhythm
- Micro labels:
  - acceptable, but they should not get smaller than the current range

## Text review

### Stronger text areas

- homepage hero
- service card microcopy
- process framing
- final CTA framing

### Remaining text improvements recommended

- Several section intros are still slightly abstract and could become even more buyer-specific.
- Some service detail pages are still structurally good but text-light compared with the homepage.
- The footer still reads like a framing statement rather than a final trust or location cue.

## SEO improvement concepts

### Already in place

- bilingual routing
- translation linkage
- canonical and `hreflang`
- service detail internal links
- FAQ and process pages for informational intent
- image dimension declarations on key visuals

### Recommended next SEO improvements

- Replace placeholder business data in `_config.yml` with real company identity and contacts.
- Add FAQ schema once the FAQ content is finalized and stable.
- Add breadcrumb schema for service detail pages.
- Create a stronger OG image system than the current generic fallback.
- Expand service detail pages with:
  - scope tables
  - related FAQs
  - tighter local-intent phrasing where applicable
- Add region-specific landing pages once the real service area is confirmed.

## Recommended next design improvements

- Introduce one compact trust strip near the top with real project metrics once genuine data exists.
- Add light section-to-section anchor navigation on long service pages if content expands further.
- Replace placeholder brand name and contacts before any public release.
- Consider one stronger project-case-study template so the portfolio can move beyond category proof into narrative proof.
