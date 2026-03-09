# Gate 2 Animation Guide

Status: DONE
Owner: Design Agent
Tool mode: repo_only
MCP usage: browser automation used to confirm motion stays secondary to content in the rendered UI.

## Objective

Define static-site-safe motion rules that improve perceived polish without harming readability, performance, or GitHub Pages compatibility.

## Motion principles

- Motion exists to reveal hierarchy, not to entertain.
- Every animation should feel architectural and restrained.
- Avoid continuous loops, parallax, or heavy scripted motion.

## Approved motion patterns

### Reveal on scroll

- Trigger:
  - first visibility in viewport
- Targets:
  - hero cards
  - service cards
  - process cards
  - trust cards
  - work example blocks
- Timing:
  - `500ms`
- Easing:
  - standard ease
- Movement:
  - low vertical offset only

### Button hover

- Trigger:
  - pointer hover
- Behavior:
  - subtle upward translation
- Timing:
  - `180ms`

### Mobile menu

- Trigger:
  - menu button tap
- Behavior:
  - simple show/hide state change
- Rule:
  - no sliding drawer required for Gate 2

## Prohibited patterns

- autoplay video backgrounds
- large transform chains
- scroll-jacked sections
- count-up animations
- anything requiring external animation libraries

## Accessibility rules

- Motion must not block reading or CTA discovery.
- Reveal effects should preserve content in the DOM from load.
- If a future reduced-motion mode is added, all reveal and hover motion should degrade cleanly to no movement.

## Implementation note

Current motion is implemented with lightweight JavaScript in `assets/js/site.js` and CSS transitions in `assets/css/site.css`.
