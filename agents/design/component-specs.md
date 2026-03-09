# Gate 2 Component Specs

Status: DONE
Owner: Design Agent
Tool mode: repo_only
MCP usage: browser automation used to verify rendered hierarchy and mobile behavior.

## Objective

Define the reusable components that drive the approved Gate 2 homepage and core content pages.

## 1. Header

- Purpose:
  - immediate brand recognition
  - stable navigation
  - fast access to contact
- Required elements:
  - logo mark
  - brand name
  - tagline
  - primary nav
  - language switcher
  - mobile menu toggle
- Behavior:
  - sticky on scroll
  - collapses on mobile

## 2. Hero

- Purpose:
  - explain the offer and create immediate credibility
- Required elements:
  - eyebrow
  - `h1`
  - short lead
  - three key stats
  - primary and secondary CTA
  - image mosaic
  - dark interpretation panel
- Content rule:
  - promise must describe a controlled renovation system, not “quality work” in the abstract

## 3. Service Card Grid

- Purpose:
  - make service breadth legible in one scan
- Card fields:
  - numeric icon
  - micro eyebrow
  - title
  - one-sentence description
- Count:
  - six cards on homepage
- Responsive rule:
  - three columns desktop
  - one column mobile

## 4. Feature Band

- Purpose:
  - reinforce that the portfolio is tied to process
- Structure:
  - copy column
  - two supporting images
- Usage:
  - between service summary and deeper examples

## 5. Work Examples Block

- Purpose:
  - connect each service category to real proof and process language
- Source:
  - `_data/work_examples.yml`
- Per category:
  - index number
  - category name
  - summary
  - process note
  - two images
- Required categories:
  - plumbing
  - electrical
  - core construction
  - finishing
  - procurement
  - site supervision

## 6. Process Grid

- Purpose:
  - reduce uncertainty around delivery
- Fields:
  - numbered title
  - short description
- Count:
  - four stages

## 7. Trust Grid

- Purpose:
  - convert proof into reassurance before contact
- Card fields:
  - title
  - explanatory sentence
- Tone:
  - operational and concrete

## 8. Contact Banner

- Purpose:
  - provide a final low-friction move into enquiry
- Required elements:
  - eyebrow
  - title
  - short explanation
  - CTA button

## 9. Standard Page Hero

- Purpose:
  - frame inner pages with context before prose
- Required elements:
  - eyebrow
  - page title
  - optional lead

## 10. Prose Card

- Purpose:
  - make informational pages readable and visually consistent
- Use on:
  - about
  - contact
  - services hub
- Rules:
  - moderate line length
  - generous padding
  - headings separated by clear vertical rhythm

## Accessibility and UX rules

- Buttons and links must remain visually distinct.
- Interactive elements require large enough touch targets on mobile.
- Images should use descriptive alt text.
- Motion must remain secondary to readability.

## Implementation reference

- Layouts:
  - `_layouts/home.html`
  - `_layouts/page.html`
- Includes:
  - `_includes/header.html`
  - `_includes/footer.html`
  - `_includes/work-examples.html`
