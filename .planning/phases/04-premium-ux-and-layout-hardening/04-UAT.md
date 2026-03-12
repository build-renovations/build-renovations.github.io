---
status: complete
phase: 04-premium-ux-and-layout-hardening
source:
  - 04-01-SUMMARY.md
  - 04-02-SUMMARY.md
  - 04-03-SUMMARY.md
  - 04-04-SUMMARY.md
started: 2026-03-12T14:22:44Z
updated: 2026-03-12T14:22:44Z
---

## Current Test

[testing complete]

## Tests

### 1. Homepage premium shell and first-call clarity
expected: On `/` or `/en/`, the header, hero, proof blocks, and contact path should feel ordered and intentionally composed rather than crowded. The main phone CTA should be easy to find, the language switcher should be visible, and nothing should look broken, cramped, or visually noisy.
result: issue
reported: "in the header top menu overlaps \"Квартири та будинки • дзвінок як перший крок\" phrase"
severity: cosmetic

### 2. Mobile menu and sticky CTA behavior
expected: At phone width, opening the menu should reveal navigation cleanly and closing it should feel predictable. The sticky phone CTA should appear on mobile without covering content awkwardly, and it should stay hidden on desktop.
result: pass

### 3. Process and service pages scan as guided long-form routes
expected: On `/process/` and a representative service page such as `/services/apartment-renovation/`, sections should read like distinct chapters with clear spacing, proof/FAQ bridges, and no repeated-card wall feeling.
result: issue
reported: "there are visula issue on /process/ and representative service pages where areas overlaps, there are gaps/too big spacings"
severity: cosmetic

### 4. Projects index and dossier pages feel curated, not flat
expected: `/projects/` should feel like a guided selection page rather than a flat archive, and a dossier page such as `/projects/house-stage-coordination/` should surface proof status, route focus, and stage/story cues high enough to scan quickly.
result: issue
reported: "it does look like guided selection page, however the are a number of cosmetic issues like mismatches in spacings, titles of the sections looks off on desktop version even though it's fine on mobile, fills like there are more sections required and there are empty spaces"
severity: cosmetic

### 5. Ukrainian and English routes keep the same premium experience
expected: Switching between UA and EN on home, process, service, and project routes should preserve the same major layout surfaces, CTA presence, and overall reading rhythm rather than feeling like one polished route and one fallback route.
result: issue
reported: "a text wording also wishes to be better"
severity: minor

## Summary

total: 5
passed: 1
issues: 4
pending: 0
skipped: 0

## Gaps

- truth: "On `/` or `/en/`, the header, hero, proof blocks, and contact path should feel ordered and intentionally composed rather than crowded. The main phone CTA should be easy to find, the language switcher should be visible, and nothing should look broken, cramped, or visually noisy."
  status: failed
  reason: "User reported: in the header top menu overlaps \"Квартири та будинки • дзвінок як перший крок\" phrase"
  severity: cosmetic
  test: 1
  root_cause: ""
  artifacts: []
  missing: []
  debug_session: ""
- truth: "On `/process/` and a representative service page such as `/services/apartment-renovation/`, sections should read like distinct chapters with clear spacing, proof/FAQ bridges, and no repeated-card wall feeling."
  status: failed
  reason: "User reported: there are visula issue on /process/ and representative service pages where areas overlaps, there are gaps/too big spacings"
  severity: cosmetic
  test: 3
  root_cause: ""
  artifacts: []
  missing: []
  debug_session: ""
- truth: "`/projects/` should feel like a guided selection page rather than a flat archive, and a dossier page such as `/projects/house-stage-coordination/` should surface proof status, route focus, and stage/story cues high enough to scan quickly."
  status: failed
  reason: "User reported: it does look like guided selection page, however the are a number of cosmetic issues like mismatches in spacings, titles of the sections looks off on desktop version even though it's fine on mobile, fills like there are more sections required and there are empty spaces"
  severity: cosmetic
  test: 4
  root_cause: ""
  artifacts: []
  missing: []
  debug_session: ""
- truth: "Switching between UA and EN on home, process, service, and project routes should preserve the same major layout surfaces, CTA presence, and overall reading rhythm rather than feeling like one polished route and one fallback route."
  status: failed
  reason: "User reported: a text wording also wishes to be better"
  severity: minor
  test: 5
  root_cause: ""
  artifacts: []
  missing: []
  debug_session: ""
