# Phase 3 Research: Case Study And Proof System

**Phase:** 03 - Case Study And Proof System  
**Researched:** 2026-03-11  
**Tool mode:** `repo_only`  
**MCP used:** None intentionally. This research is grounded in the current repo structure, existing proof modules, and GitHub Pages-safe Jekyll patterns already in production.  
**Fallback note:** The dedicated `gsd-phase-researcher` specialist was unavailable in-session, so this artifact was produced directly from repository inspection.

## Executive Summary

Phase 3 should turn the site from "proof-aware" into "proof-structured."

The repo already contains strong raw material for that shift:
- real image-backed service galleries in `_data/work_examples.yml`
- page-level proof framing in `_data/service_pages.yml` and `_data/process_page.yml`
- shared placeholder proof cards in `_data/trust_foundation.yml` rendered through `_includes/sourced-proof.html`
- reusable layouts for homepage, process, generic content pages, and service detail pages

What is missing is the layer between gallery content and conversion surfaces:
- no project-level case study routes
- no shared case-study data model with challenge, stage logic, decisions, and outcomes
- no durable way for homepage or service pages to route buyers into deeper proof that matches their concern
- no systematic replacement path for the temporary proof cards introduced in Phase 1

The strongest Phase 3 approach is:
1. create a bilingual, data-driven case-study contract backed by existing site-owned imagery and real process framing
2. add dedicated case-study routes and an index destination in both languages
3. connect homepage, process, and service pages to relevant case studies through shared keys rather than hand-written duplication
4. replace placeholder proof cards only where publishable, attributed project evidence now exists, while keeping honesty rules explicit for any remaining temporary surfaces

## What You Need To Know To Plan This Phase Well

### 1. The repo already has two proof systems, but neither is enough alone

Current proof layers:
- `_data/work_examples.yml` plus `_includes/work-examples.html` provide strong image-backed service galleries
- `_data/trust_foundation.yml` plus `_includes/sourced-proof.html` provide the current trust/proof cards used on core routes

These layers solve different problems:
- `work_examples` shows service categories with photos and process notes
- `sourced-proof` shows compact trust cards with source and attribution labels

Phase 3 should not replace one with the other. It should add a middle layer: structured project dossiers that turn raw gallery material into buyer-facing evidence.

### 2. There is no project-level route model yet

The current site has:
- service index and service detail routes
- process, FAQ, about, and contact pages
- bilingual parity through explicit UA/EN page files and shared data contracts

It does not yet have:
- `/projects/` or equivalent index routes
- `/projects/<slug>/` and `/en/projects/<slug>/` case-study routes
- a dedicated project-proof layout

That means Phase 3 should introduce thin route files with shared data, not a CMS-like system or risky plugin dependency.

### 3. Existing layouts already expose the right insertion points

Current opportunities:
- `_layouts/home.html` already carries trust and proof sections near the primary conversion path
- `_layouts/service_detail.html` already renders page-specific proof framing and a sourced-proof include
- `_layouts/process.html` already uses process-specific proof framing and a sourced-proof include
- `_layouts/page.html` can expose shared supporting modules under frontmatter flags

This is a good fit for Phase 3 because deeper proof can be integrated through:
- a new dedicated case-study layout for full dossiers
- a shared featured-case-study include for index, homepage, process, and service routes
- updated `proof_module` or `case_study_refs` data contracts on services and process pages

### 4. The repo already contains usable raw material for publishable case studies

`_data/work_examples.yml` is the main source of existing evidence:
- image groups already have bilingual alt text and captions
- categories already describe stages, checkpoints, and image-story logic
- some categories already show before/during/after-style progression, even if they are currently organized by service rather than project

This matters because Phase 3 can build the first proof system from site-owned material already in the repo rather than blocking on new asset collection.

Constraint:
- the phase must not fabricate client claims, review quotes, or measurable outcomes that are not grounded in the existing material
- where a true "before" state does not exist, the dossier should honestly use stage language like `before finishing`, `during concealed work`, and `after controlled handover`

### 5. Proof honesty is a product rule, not just a copy preference

Phase 1 introduced intentionally labeled temporary proof. Phase 3 is the first scheduled replacement point.

The planning implication is strict:
- publishable proof can replace placeholders only when the evidence is actually grounded in existing project material and attributed honestly
- no fake testimonials
- no fake review sources
- no invented numeric outcomes
- any remaining temporary module must stay visibly labeled until replaced later

That makes provenance and labeling part of the implementation contract, not optional polish.

### 6. CASE-04 should shape every case study, not sit in a separate FAQ box

The requirement is not only to show projects. It is to show why a project matters to the buyer reading it.

Each dossier should therefore carry explicit relevance framing such as:
- what kind of buyer concern this project resolves
- what complexity was controlled
- what decisions had to be locked before the next stage
- why this project is the right next read from a given service or property page

If that framing is missing, the site will still look like a gallery with more text.

### 7. The safest Phase 3 implementation pattern is page-thin, data-thick

Recommended structure:
- keep page files thin with `layout`, `lang`, `translation_key`, route metadata, and one case-study selector key
- store dossier content in a new `_data/case_studies.yml`
- optionally add one small support data file only if service-to-project mapping becomes too noisy inside existing files

Avoid:
- duplicating long bilingual markdown blobs inside every page pair
- introducing a plugin-backed translation or portfolio generator
- relying on free-text route checks instead of stable rendered markers

## Current Repository Reality

### What already helps

- `_includes/work-examples.html` already renders structured visual proof with captions and service routing.
- `_includes/sourced-proof.html` already enforces explicit source and attribution display.
- `_data/service_pages.yml` already contains service-specific proof framing and can absorb `case_study_refs`.
- `_data/process_page.yml` already frames proof in terms of stage control rather than only polished finishes.
- `_layouts/service_detail.html` and `_layouts/process.html` already include proof modules in meaningful buyer-decision positions.
- Bilingual parity is already handled through paired routes, shared `_data/` branches, and head metadata includes.

### What is missing

- no shared case-study dataset
- no project index routes in either language
- no case-study page layout
- no route-level proof relevance mapping from service/property pages into specific dossiers
- no Phase 3 rendered checks for project routes, buyer-relevance markers, or placeholder-to-publishable replacement coverage

## Standard Stack

Use the current stack. Phase 3 does not need a framework change.

- GitHub Pages-safe Jekyll
- Liquid layouts and includes
- explicit bilingual page pairs
- `_data/`-driven content contracts
- existing QA shell plus one new Phase 3 rendered-check helper

## Architecture Patterns

### 1. Add a case-study destination, not a loose gallery expansion

Recommended route family:
- `/projects/`
- `/en/projects/`
- `/projects/<slug>/`
- `/en/projects/<slug>/`

The index page should curate proof by buyer relevance, not just list everything chronologically.

### 2. Build dossiers around decisions and stages

Each case study should have structured sections for:
- project snapshot
- scope and context
- buyer concern or project risk
- decision route before active installation
- stage-by-stage proof
- outcome or readiness state
- related services / property-type bridge

This directly supports `CASE-01` and `CASE-02`.

### 3. Reuse service and process mappings instead of inventing a new taxonomy

The current service and property pages already describe where complexity comes from.

Phase 3 should attach case studies to those existing routes through stable keys:
- `case_study_refs` on service/property pages
- a homepage featured set for broad trust entry
- a process featured set for stage-control evidence

That is enough to satisfy `CASE-03` without bloating the route model.

### 4. Keep proof provenance visible

Case-study content should identify the evidence type:
- site-owned photo record
- project stage documentation
- internal control/checklist proof

If a quote or testimonial is later added, it should live as an additional field with real attribution, not as a replacement for image-backed project evidence.

### 5. Make Phase 3 validation additive

Phase 1 and Phase 2 checks already guard trust/call and content-depth behavior. Phase 3 validation should add:
- project route existence
- bilingual parity on project routes
- rendered markers for buyer relevance, stage proof, and related-route bridges
- checks that placeholder proof cards are retired on routes now backed by publishable project evidence

## Recommended Data Model Changes

### `_data/case_studies.yml`

Add a new bilingual shared contract with entries that can support:
- `key`
- `slug`
- `translation_key`
- `status`
- `source_type`
- `service_refs`
- `property_refs`
- `homepage_feature`
- `process_feature`
- `snapshot`
- `buyer_relevance`
- `timeline` or `stages`
- `gallery`
- `outcomes`
- `related_routes`

Optional fields are fine if the layout fails gracefully.

### `_data/service_pages.yml`

Add lightweight linking metadata such as:
- `case_study_refs`
- `featured_case_study_intro`
- `buyer_relevance_bridge`

This keeps service pages as entry points into deeper proof.

### `_data/process_page.yml`

Add:
- featured project references for process-level proof
- short copy explaining why the selected projects prove stage control

### `_data/trust_foundation.yml`

Update the proof items so Phase 3 can:
- replace placeholder cards with publishable project-backed cards where available
- keep any unreplaced item explicitly temporary
- point publishable proof toward deeper case-study routes

## Validation Architecture

Phase 3 should be planned with a Wave 0 validation layer first.

Minimum coverage:
- YAML parse checks for `_data/case_studies.yml` and touched shared data files
- rendered checks for `/projects/`, `/en/projects/`, selected case-study routes, and the homepage/process/service routes that surface case studies
- metadata parity on project-route pairs
- explicit assertions that buyer-relevance and stage-proof markers render on case-study pages
- explicit assertions that placeholder proof is removed only on routes where publishable case-study evidence now exists

## Planning Recommendations

Split the phase into four execution waves:

1. foundation and QA
   - add the shared case-study data contract
   - add project routes and layout scaffolding
   - add Phase 3 rendered checks

2. dossier rollout
   - create the first real bilingual case-study pages from existing site-owned material
   - ensure before/during/after logic is explicit where supported

3. route integration and placeholder replacement
   - connect homepage, process, and service pages to relevant dossiers
   - replace temporary proof cards with publishable project-backed modules where possible

4. relevance framing and sign-off
   - tighten buyer-concern framing
   - finish cross-linking quality
   - close validation and execution sign-off

## Risks To Control During Execution

- treating service galleries as if they were already project dossiers
- inventing proof claims that are not supported by repo assets
- creating bilingual copy drift by storing too much content in page files
- adding project routes without extending QA coverage
- replacing all placeholder proof at once even where publishable evidence still does not exist

## Bottom Line

Phase 3 is ready to plan now. The repo has enough real structure and image-backed content to create the first honest case-study system without waiting for a redesign or a CMS.

The key is discipline:
- one shared case-study contract
- thin bilingual route files
- explicit provenance
- buyer-relevance framing on every dossier
- additive rendered QA from the start
