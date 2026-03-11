---
status: complete
phase: 01-trust-and-phone-foundation
source:
  - .planning/phases/01-trust-and-phone-foundation/01-01-SUMMARY.md
  - .planning/phases/01-trust-and-phone-foundation/01-02-SUMMARY.md
  - .planning/phases/01-trust-and-phone-foundation/01-03-SUMMARY.md
started: 2026-03-11T11:15:00Z
updated: 2026-03-11T11:23:00Z
---

## Current Test

[testing complete]

## Tests

### 1. Homepage phone-first CTA shell
expected: Open `/` and `/en/`. In the header and the main hero area, the primary action should clearly be a real phone-call CTA rather than a link that first sends you to the contact page. Messenger options can be visible nearby, but they should read as secondary to the phone action.
result: pass

### 2. Mobile sticky call access
expected: On a phone-width viewport for `/` and `/en/`, a sticky call action should stay reachable while scrolling, without covering readable text or blocking the footer/content end state.
result: pass

### 3. Project-fit and first-call guidance
expected: On `/about/`, `/services/`, `/process/`, `/contact/` and the `/en/` equivalents, the page should explain who the service is for, what the first call covers, and what the visitor should prepare before contacting.
result: pass

### 4. Service-page conversion flow
expected: On representative service pages such as `/services/plumbing/` and `/en/services/plumbing/`, the page should show a phone-first CTA, project-fit guidance, first-call expectations, and trust/accountability content without obvious layout glitches.
result: pass

### 5. Trust and placeholder-proof labeling
expected: On `/`, `/contact/`, `/services/`, `/process/` and `/en/` equivalents, trust/proof sections should be visible on the decision path. Any testimonial/review/proof content that is still placeholder content should be visibly labeled as demo/temporary rather than reading like a real sourced customer review.
result: pass

### 6. Contextual accountability details
expected: On `/process/`, `/en/process/`, and representative service pages, the trust/accountability block should feel specific to that page topic rather than repeating only one generic trust paragraph everywhere.
result: pass

## Summary

total: 6
passed: 6
issues: 3
pending: 0
skipped: 0

## Gaps

- truth: "On representative service pages such as `/services/plumbing/` and `/en/services/plumbing/`, the page should show a phone-first CTA, project-fit guidance, first-call expectations, and trust/accountability content without obvious copy-quality issues."
  status: failed
  reason: "User reported: \"on /services/plumbing/ page text \\\"Цей етап працює найкраще як частина пов'язаної системи\\\" looks off\""
  severity: minor
  test: 4
  artifacts: []
  missing: []
- truth: "On `/` and `/en/`, homepage trust and conversion copy should read naturally and credibly while supporting the phone-first CTA."
  status: failed
  reason: "User reported: \"on `/` \\\"Комплексні роботи для квартир і будинків\\\" looks off\""
  severity: minor
  test: 1
  artifacts: []
  missing: []
- truth: "On `/`, `/contact/`, `/services/`, `/process/` and `/en/` equivalents, trust/proof sections should use credible, natural labels and any placeholder proof should be visibly marked as demo/temporary."
  status: failed
  reason: "User reported: \"I would like to remove \\\"Статус бренду\\\"\""
  severity: minor
  test: 5
  artifacts: []
  missing: []
