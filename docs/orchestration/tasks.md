# Task Ledger

Use this file as the orchestrator-managed queue. Every task must have one owner and one status.

## Ready queue

| ID | Title | Owner | Status | Tool mode | Depends on | Definition of done |
| --- | --- | --- | --- | --- | --- | --- |
| PHASE3-001 | Execute Phase 3 Wave 1 foundation | development | ready | repo_only | ORCH-003 | Shared case-study contract, `/projects/` route family scaffold, and Phase 3 QA guardrails are implemented and passing |
| PHASE3-002 | Execute Phase 3 dossier rollout | content | ready | repo_only | PHASE3-001 | At least three bilingual project dossiers are live with honest stage logic and buyer-relevance framing |
| PHASE3-003 | Integrate case studies into entry routes | development | ready | repo_only | PHASE3-002 | Homepage, process, and representative service routes link into relevant dossiers and placeholder proof is selectively replaced where publishable evidence exists |
| PHASE4-001 | Execute Phase 4 premium shell and layout hardening | development | ready | mcp_preferred | none | Shared shell, core routes, long-page composition, and viewport hardening land with Phase 4 QA coverage and browser-reviewed parity |

## In progress

| ID | Title | Owner | Status | Tool mode | Depends on | Definition of done |
| --- | --- | --- | --- | --- | --- | --- |
| none | none | none | none | none | none | none |

## Blocked

| ID | Title | Owner | Status | Tool mode | Depends on | Blocker |
| --- | --- | --- | --- | --- | --- | --- |
| none | none | none | none | none | none | none |

## Review

| ID | Title | Owner | Status | Tool mode | Depends on | Review focus |
| --- | --- | --- | --- | --- | --- | --- |
| none | none | none | none | none | none | none |

## Done

| ID | Title | Owner | Status | Tool mode | Depends on | Outcome |
| --- | --- | --- | --- | --- | --- | --- |
| PHASE3-001 | Execute Phase 3 Wave 1 foundation | development | done | repo_only | ORCH-003 | Shared case-study contract, `/projects/` route family scaffold, and Phase 3 QA guardrails were implemented and passed |
| PHASE3-002 | Execute Phase 3 dossier rollout | content | done | repo_only | PHASE3-001 | Three bilingual dossier route pairs now exist with honest stage storytelling and buyer relevance |
| PHASE3-003 | Integrate case studies into entry routes | development | done | repo_only | PHASE3-002 | Home, process, and representative service routes now link into dossiers and upgraded proof can route into publishable evidence |
| ORCH-003 | Track placeholder replacement across later roadmap phases | orchestrator | done | repo_only | ORCH-002 | Phase 3 plans now define placeholder-proof replacement and preserve placeholder identity/contact replacement before release in Phase 5 |
| ORCH-002 | Map current codebase into planning reference docs | orchestrator | done | repo_only | none | `.planning/codebase/` populated with 7 reference docs; fallback default agents used because `gsd-codebase-mapper` was unavailable in session |
| CONTENT-004 | Expand image-led process content from sibling asset library | content | done | mcp_preferred | DEV-002 | Curated sibling assets imported as metadata-free WebP, shared work sections expanded bilingually, and QA now enforces image format plus metadata rules |
| DEV-002 | Repair responsive layout across shared site components | development | done | mcp_preferred | DEV-001 | Final responsive overrides added for shared layouts, with browser verification at phone, tablet, and desktop widths |
| BOOT-001 | Bootstrap GitHub Pages compatible bilingual Jekyll repository | development | done | repo_only | none | Base site, bilingual routing, SEO baseline, and QA scripts created |
| ORCH-000 | Establish orchestrator framework | orchestrator | done | repo_only | BOOT-001 | Added orchestrator brief, progress tracker, and task ledger |
| ORCH-001 | Define wave 1 milestone plan | orchestrator | done | repo_only | none | Gate 1 task sequence defined and Gate 1 successfully unlocked |
| SEO-000 | Create Gate 1 keyword map | seo | done | mcp_preferred | ORCH-001 | Baseline keyword clusters documented in `agents/seo/keyword-map.md` |
| SEO-002 | Create Gate 1 site architecture | seo | done | repo_only | ORCH-001 | Bilingual wave 1 page structure documented in `agents/seo/site-architecture.md` |
| DESIGN-000 | Create Gate 1 personas | design | done | repo_only | ORCH-001 | Buyer personas documented in `agents/design/personas.md` |
| UIUX-000 | Create Gate 1 user flows | ui-ux-pro | done | mcp_preferred | ORCH-001, DESIGN-000 | Baseline conversion flows documented in `agents/design/user-flows.md` |
| SEO-001 | Propose target information architecture | seo | done | mcp_preferred | ORCH-001 | Priority page map and Wave 1 responsibilities confirmed in `agents/seo/site-architecture.md` |
| UIUX-001 | Audit UX structure and propose high-leverage improvements | ui-ux-pro | done | mcp_preferred | ORCH-001 | UX review translated into the implemented homepage and core-page hierarchy |
| DESIGN-001 | Audit current visual system and propose next components | design | done | mcp_preferred | ORCH-001 | Gate 2 concept implemented in site files and documented for reuse |
| DESIGN-002 | Create Gate 2 design system | design | done | repo_only | UIUX-001 | `agents/design/design-system.md` created and aligned with the approved UX direction |
| DESIGN-003 | Create Gate 2 component specs | design | done | repo_only | DESIGN-002 | `agents/design/component-specs.md` created for core page sections and reusable elements |
| DESIGN-004 | Create Gate 2 animation guide | design | done | repo_only | DESIGN-002 | `agents/design/animation-guide.md` created with static-site-safe motion rules |
| CONTENT-001 | Create page copy brief for wave 1 pages | content | done | mcp_preferred | SEO-001 | Wave 1 copy briefs documented in `agents/content/page-copy/` |
| CONTENT-002 | Create Gate 2 microcopy guide | content | done | repo_only | UIUX-001 | `agents/content/microcopy.md` created for CTAs, forms, navigation, and trust prompts |
| CONTENT-003 | Create Gate 2 page-copy briefs | content | done | repo_only | CONTENT-001, SEO-001 | `agents/content/page-copy/` populated with homepage, trust-page, and template briefs |
| SEO-003 | Create Gate 2 front matter templates | seo | done | repo_only | SEO-001 | `agents/seo/front-matter-templates.md` created for planned page types |
| DEV-001 | Prepare reusable page patterns for service detail pages | development | done | repo_only | SEO-001, CONTENT-001, UIUX-001 | Reusable service detail layout and bilingual page set added in the site root |
| QA-001 | Define wave 1 verification checklist | qa | done | mcp_preferred | ORCH-001 | `agents/qa/wave1-checklist.md` created and backed by build plus browser verification |
| PERF-001 | Define performance budget and audit plan | performance | done | mcp_preferred | ORCH-001 | `agents/performance/performance-budget.md` and `agents/performance/audit-plan.md` created with Lighthouse evidence |
