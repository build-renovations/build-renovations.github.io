# Repository Structure

## Scope

This document maps the directory structure of `/Users/mykhailomykhailenko/work/personal/vasyl/remonty` with emphasis on what is deployable, what is orchestration-only, and how the main folders relate to the GitHub Pages/Jekyll build.

MCP was not needed. Local file inspection was sufficient.

## Top-Level Layout

```text
.
|-- _config.yml
|-- Gemfile
|-- Gemfile.lock
|-- index.md
|-- 404.html
|-- robots.txt
|-- about/
|-- contact/
|-- faq/
|-- process/
|-- services/
|-- en/
|-- _data/
|-- _includes/
|-- _layouts/
|-- assets/
|-- scripts/
|-- agents/
|-- docs/
|-- .planning/
|-- .codex/
|-- _site/
`-- supporting root files and review artifacts
```

## Deployable Jekyll Site Inputs

These paths make up the published site or directly support the Jekyll build.

### Core Config and Dependency Files

- `_config.yml`: central site configuration, SEO defaults, business metadata, excludes, and plugin whitelist.
- `Gemfile`: Ruby dependency entrypoint using `github-pages`.
- `Gemfile.lock`: pinned Ruby dependency graph for local reproducibility.

### Root Content Files

- `index.md`: Ukrainian homepage using `layout: home`.
- `404.html`: Ukrainian not-found page rendered through Jekyll.
- `robots.txt`: Liquid-backed robots policy controlled by `_config.yml`.

### Ukrainian Content Directories

- `about/index.md`
- `contact/index.md`
- `faq/index.md`
- `process/index.md`
- `services/index.md`
- `services/apartment-renovation/index.md`
- `services/house-renovation/index.md`
- `services/plumbing/index.md`
- `services/electrical/index.md`
- `services/rough-works/index.md`
- `services/finishing/index.md`
- `services/procurement/index.md`
- `services/site-supervision/index.md`

### English Mirror

The English site lives under `en/` and mirrors the root structure.

- `en/index.md`
- `en/about/index.md`
- `en/contact/index.md`
- `en/faq/index.md`
- `en/process/index.md`
- `en/services/index.md`
- `en/services/apartment-renovation/index.md`
- `en/services/house-renovation/index.md`
- `en/services/plumbing/index.md`
- `en/services/electrical/index.md`
- `en/services/rough-works/index.md`
- `en/services/finishing/index.md`
- `en/services/procurement/index.md`
- `en/services/site-supervision/index.md`

### Shared Content Data

The `_data/` directory is the main content registry for repeated and bilingual blocks.

- `_data/navigation.yml`: locale-specific navigation link sets.
- `_data/translations.yml`: shared UI strings and microcopy keyed by locale.
- `_data/services.yml`: service-card summaries used in overview sections.
- `_data/service_pages.yml`: service-detail content keyed by service identifier.
- `_data/process.yml`: compact process cards.
- `_data/process_page.yml`: full process page sections and metrics.
- `_data/proof.yml`: trust-building proof cards.
- `_data/faqs.yml`: FAQ question-answer content.
- `_data/work_examples.yml`: image-led service storytelling and gallery metadata.

### Shared Templates

The template system is small and explicit.

- `_layouts/default.html`: base HTML shell.
- `_layouts/home.html`: homepage composition.
- `_layouts/page.html`: default markdown page wrapper.
- `_layouts/process.html`: process landing page.
- `_layouts/service_detail.html`: service-detail page family.

### Shared Includes

- `_includes/head.html`: metadata, canonical, `hreflang`, schema, and asset includes.
- `_includes/header.html`: main navigation and language switcher.
- `_includes/footer.html`: footer content.
- `_includes/work-examples.html`: reusable gallery/storytelling component.

### Front-End Assets

- `assets/css/site.css`: global design system and all page styling.
- `assets/js/site.js`: lightweight interactive behavior.
- `assets/images/favicon.svg`
- `assets/images/logo-mark.svg`
- `assets/images/og-cover.svg`
- `assets/images/work/`: service and portfolio imagery in WebP format.

## Build Output and Generated State

- `_site/`: generated Jekyll output. Disposable and rebuilt by scripts.

This directory is part of the local workflow, but it is not an authoritative source file location.

## Build and QA Tooling

The `scripts/` directory encapsulates local workflow and signoff checks.

- `scripts/serve.sh`: local development server entrypoint.
- `scripts/qa.sh`: build verification and image policy enforcement.
- `scripts/gates.sh`: staged gate automation including Lighthouse, Pa11y, and link checks.
- `scripts/jekyll_compat.rb`: Ruby compatibility shim for the GitHub Pages Jekyll toolchain.
- `scripts/mcp-bootstrap.sh`: MCP setup helper.
- `scripts/mcp-check.sh`: MCP environment validation helper.

These are excluded from Jekyll publication in `_config.yml`.

## Orchestration and Agent Workspace

The repository has a substantial non-site branch dedicated to planning, delegation, and validation.

### `docs/`

Process and role documentation lives in `docs/`.

- `docs/agents/`: role briefs and shared operating standards.
- `docs/orchestration/`: progress tracking, task ledger, phase gates, MCP setup, and task templates.

Important files include:

- `docs/orchestration/progress.md`
- `docs/orchestration/tasks.md`
- `docs/orchestration/phase-gates.md`
- `docs/agents/expert-mode.md`
- `docs/agents/mcp-policy.md`

### `agents/`

Persistent agent outputs and status artifacts live in `agents/`.

- `agents/design/`
- `agents/content/`
- `agents/seo/`
- `agents/qa/`
- `agents/performance/`
- `agents/status/`

Representative files:

- `agents/design/design-system.md`
- `agents/content/microcopy.md`
- `agents/seo/site-architecture.md`
- `agents/qa/wave1-checklist.md`
- `agents/performance/performance-budget.md`
- `agents/status/dev.md`

These folders are explicitly non-published.

### `.planning/`

`.planning/` is an internal analysis workspace. For this task, outputs are written to:

- `.planning/codebase/ARCHITECTURE.md`
- `.planning/codebase/STRUCTURE.md`

### `.codex/`

`.codex/` contains local skill and workflow infrastructure for Codex/GSD-style agent execution.

Subtrees observed in this repository include:

- `.codex/agents/`
- `.codex/get-shit-done/`
- `.codex/skills/`

This is operational tooling, not site content.

## Other Root-Level Files

Several files exist at the root that are not central to Jekyll structure but are part of the repository state.

- `AGENTS.md`: repository-wide coordination instructions.
- `README.md`: human-facing repository overview and workflow guide.
- `.mcp.example.json`: example MCP server configuration.
- `.gitignore`
- `.DS_Store`

There are also root-level image and review artifacts such as:

- `brand-system-header.png`
- `homepage-hero-review.png`
- `homepage-hero-review-2.png`
- `logo-header-review.png`
- `mobile-viewport-before.png`
- `mobile-viewport-after.png`
- `mobile-viewport-fixed.png`
- `og-cover-review.png`
- `uipro-home-brief.png`

These appear to support review, design discussion, or workflow documentation rather than the published site.

## Structural Patterns

### Page Family Pattern

The site uses a mirrored bilingual page tree rather than collections or plugin-backed localization.

- Root = Ukrainian
- `en/` = English mirror

This keeps URLs explicit and GitHub Pages safe, but it requires manual parity between paired files.

### Thin Pages, Thick Data Pattern

Most pages are intentionally small and rely on `_data/` plus layouts/includes for real content assembly.

The strongest examples are:

- `services/*/index.md` and `en/services/*/index.md`, which mostly declare `service_key`.
- `faq/index.md` and `en/faq/index.md`, which loop over `_data/faqs.yml`.
- homepage and process layouts, which pull from `_data/translations.yml`, `_data/services.yml`, `_data/process.yml`, `_data/process_page.yml`, and `_data/proof.yml`.

### Single CSS / Single JS Pattern

The published UI is structurally centralized.

- all styles in `assets/css/site.css`
- all browser behavior in `assets/js/site.js`

This reduces build complexity and keeps the static deployment model simple.

## Jekyll Exclusion Boundary

The most important structure boundary is defined in `_config.yml`.

Excluded from publishing:

- `AGENTS.md`
- `README.md`
- `agents/`
- `docs/`
- `scripts/`
- `Gemfile`
- `Gemfile.lock`
- `.gitignore`
- `.playwright-cli/`
- `vendor/`
- `node_modules/`

This boundary is what allows the repository to function as both a website and an operational workspace without leaking internal artifacts into the built site.

## Practical Reading Order

For someone new to the repository, the fastest structure-first reading path is:

1. `_config.yml`
2. `_layouts/default.html`
3. `_includes/head.html`
4. `_includes/header.html`
5. `_layouts/home.html`
6. `_layouts/process.html`
7. `_layouts/service_detail.html`
8. `_data/`
9. root and `en/` page front matter
10. `scripts/qa.sh` and `scripts/gates.sh`
11. `docs/orchestration/progress.md` and `docs/orchestration/tasks.md`

That sequence exposes the site structure, the content model, the verification model, and the orchestration layer with minimal wasted motion.
