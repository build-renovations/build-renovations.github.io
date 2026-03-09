# UI/UX Pro Max Brief

Date: 2026-03-09

Scope:

- homepage `/`
- process page `/process/`

MCP used:

- `browser_automation` for rendered inspection on desktop
- `filesystem_repo` for repository-aware constraints

Skill used:

- `ui-ux-pro-max`

## Decision

Use `ui-ux-pro-max` as a structured idea source, not as a visual source of truth.

Accepted from the skill output:

- editorial typography direction
- trust-first information architecture
- above-the-fold CTA
- explicit accessibility and reduced-motion constraints

Rejected from the skill output:

- `Liquid Glass` styling
- pink CTA/color direction
- generic premium SaaS visual language
- `html-tailwind` implementation bias

Reason:

The repository is a warm editorial renovation site built in Jekyll. The UI should feel credible, tactile, and controlled, not glossy or app-like.

## Current Findings

### Homepage

What works:

- the hero now has stable composition and no top-of-page reveal jump
- the message is clearer than earlier versions
- the right-side imagery supports the offer better than generic marketing art

What still feels weak:

- the hero copy card is still visually taller and quieter than the image/panel side
- the trust panel below the right-side images is too dense and dark relative to the rest of the hero
- the first screen still reads as two parallel blocks rather than one guided sales story
- proof is present, but not prioritized strongly enough in the first viewport

### Process

What works:

- the page is materially more descriptive than before
- staged imagery and structured lists help credibility
- the logic of the process is understandable

What still feels weak:

- the page is informative, but not yet visually persuasive enough
- the opening section needs stronger visual proof of control, not only metric cards
- the stages read as a sequence of good cards, but not as a connected operating method
- the page needs more “why this protects the client” emphasis at each stage

## Recommended Direction

### Core concept

Shift the site from “beautiful renovation website” to “controlled renovation system with visible proof.”

This means:

- fewer decorative gestures
- stronger sequencing
- more visible evidence of decision-making
- tighter visual rhythm between text and imagery

### Homepage changes

1. Rebuild the hero as one narrative strip.

- left: proposition, short proof line, primary CTA
- right top: image triptych
- right bottom: compact proof rail instead of a large dark essay card

2. Replace the current dark hero panel with a tighter “proof stack”.

Recommended contents:

- `Фотофіксація етапів`
- `Один відповідальний маршрут`
- `Інженерія + підготовка + фініш`

Each item should be one line with a short supporting phrase, not a full paragraph block.

3. Move one trust artifact into the first viewport.

Options:

- “Що клієнт отримує на старті”
- mini checklist
- process snapshot with 4 stages

4. Reduce hero text height further.

- shorten the supporting paragraph by 10-15%
- keep stats to one row
- reduce vertical padding in the hero copy slightly more

5. Create a stronger sectional rhythm below the hero.

- services = operational coverage
- process = control method
- examples = visible proof
- CTA = briefing, not generic contact

The current order is close, but the section intros should be shorter and more contrastive.

### Process page changes

1. Add a visual timeline spine through the stages.

- not a heavy diagram
- a subtle vertical connector or numbered rail
- should make the sequence feel continuous rather than card-by-card

2. Add “client protection” sublabels under each stage.

Examples:

- audit -> avoids hidden rework
- planning -> prevents stage conflicts
- execution -> catches issues before they are covered
- handover -> confirms the object is usable, not just attractive

3. Strengthen the opening proof section.

Replace abstract metrics with one mixed proof row:

- stage count
- reporting model
- checkpoint logic
- one quote or principle

4. Add one compact “what can go wrong without this process” band.

This will increase trust faster than more generic benefit copy.

5. Tighten the hero.

The `/process` hero should feel like an operating model page, not a second homepage.

Recommended structure:

- title
- one strong explanatory paragraph
- two CTA links
- one compact proof strip

## Motion and Interaction Rules

- no reveal animation on hero-level blocks
- animate only secondary sections below the fold
- respect `prefers-reduced-motion`
- avoid parallax-like motion on proof or process sections
- hover should reinforce affordance, not become a visual event

## Typography and Spacing Rules

- hero headlines should stay compact enough to avoid dominating more than half the viewport height
- proof cards should use shorter line lengths than explanatory text blocks
- dark panels should be used sparingly and only when they emphasize one key claim
- service-business pages should prefer dense, readable layouts over airy luxury spacing

## Implementation Priorities

1. Replace the homepage dark hero panel with a compact proof stack.
2. Reduce hero copy height again and tighten the supporting paragraph.
3. Add a connected visual timeline treatment to `/process`.
4. Add “client protection” microcopy to each process stage.
5. Add one risk-prevention band to `/process`.

## Working Rule For Future UI/UX Passes

For this repository, `ui-ux-pro-max` should be used in this sequence:

1. generate direction with design-system and targeted `ux`/`landing` queries
2. reject any style recommendation that conflicts with renovation trust or Jekyll constraints
3. inspect the rendered page with `browser_automation`
4. implement only the repo-compatible subset
5. validate again in the browser
