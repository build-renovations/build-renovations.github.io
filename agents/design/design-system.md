# Gate 2 Design System

Status: DONE
Owner: Design Agent
Tool mode: repo_only
MCP usage: browser automation used to review rendered desktop and mobile pages before finalizing the system.

## Objective

Define the approved visual direction for the bilingual renovation site so development can scale new pages without drifting into generic contractor or SaaS styling.

## Design intent

- Present the company as an accountable renovation operator, not a directory of trades.
- Use an editorial, trust-heavy interface with real work imagery and disciplined spacing.
- Keep the site warm, calm, and premium without looking luxurious for its own sake.
- Make mobile scanning fast enough for users deciding relevance within the first screen or two.

## Brand direction

- Positioning:
  - full-scope renovation for apartments and houses
  - engineering, preparation, finishing, procurement, and supervision under one control
- Emotional tone:
  - competent
  - warm
  - measured
  - specific
- Avoid:
  - generic construction yellow-black styling
  - glossy real-estate luxury tropes
  - startup-dashboard UI patterns

## Core visual language

### Color system

- Base background:
  - `#ece6de`
- Main surface:
  - `rgba(251, 247, 241, 0.9)`
- Primary ink:
  - `#18201d`
- Muted text:
  - `#5f5a54`
- Accent:
  - `#ca6a34`
- Accent dark:
  - `#9a4b20`

### Usage rules

- Backgrounds should feel material and architectural, not flat.
- Accent color should signal action and emphasis, not decorate every component.
- Dark panels are reserved for high-value framing such as offer interpretation or key trust blocks.

### Typography

- Display serif:
  - `Canela`, fallback to `Iowan Old Style`, `Palatino Linotype`, serif
- Interface sans:
  - `Avenir Next`, fallback to `Segoe UI`, sans-serif

### Type behavior

- `h1` carries the commercial promise and should remain compact enough to scan in 3 to 5 lines on desktop.
- `h2` introduces sections with strategic meaning, not just content buckets.
- Supporting copy should stay practical and concise, usually one short paragraph per block.

## Layout system

- Max width:
  - `1180px`
- Section rhythm:
  - generous vertical spacing with consistent card padding
- Card language:
  - soft, warm surfaces
  - deep but subtle shadow
  - large radii
- Media treatment:
  - cropped, structured, and intentional
  - no random thumbnail grids

## Component principles

- Hero:
  - must pair positioning copy with real examples of work
- Service cards:
  - describe scope clearly and stay skimmable
- Work examples:
  - must explain what was controlled, not only show visual outcomes
- Trust section:
  - should reduce buyer anxiety with operational clarity
- CTA zones:
  - should ask for a project discussion or brief, never a vague callback

## Responsive behavior

- Mobile header collapses to a menu button plus language switcher.
- Media mosaics become single-column stacks.
- Stats and action blocks wrap without losing hierarchy.
- Dense sections should preserve clear card boundaries on narrow screens.

## Content-design coupling

- Copy and visuals must support one another:
  - proof imagery confirms service claims
  - section intros explain why the section matters
  - CTA text should sound like the start of a real renovation conversation

## Asset direction

- Source imagery should come from real projects whenever possible.
- Imported assets must be optimized and stripped of metadata.
- Alt text should describe stage and category, not decorative appearance alone.

## Files aligned to this system

- `assets/css/site.css`
- `_layouts/home.html`
- `_includes/header.html`
- `_includes/footer.html`
- `_includes/work-examples.html`
- `_data/work_examples.yml`

## Approval note

This design system reflects the implemented Gate 2 concept already present in the site, not a speculative future direction.
