# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Bilingual Jekyll static site for "Рівень" — a renovation company based in Lviv, Ukraine. Ukrainian at `/`, English mirror at `/en/`. Deployed on GitHub Pages with safe-mode constraints — no custom plugins allowed.

## Ruby Setup

The project requires Ruby 3.x (the `github-pages` gem has native extensions incompatible with Ruby 4.0). A `.ruby-version` file pins the project to Ruby 3.3.10 via rbenv. All shell scripts auto-init rbenv so the correct Ruby is used regardless of global default.

```bash
brew install rbenv ruby-build     # If not already installed
rbenv install 3.3.10              # One-time setup
```

## Build & Development Commands

```bash
bundle install              # Install Ruby dependencies
./scripts/serve.sh          # Local dev server (localhost:4000)
./scripts/qa.sh             # Build + image policy checks + phase render checks (6 phases)
./scripts/gates.sh gate4    # Full audit: Lighthouse 95+, WCAG 2.1 AA (pa11y), broken links
```

Gates 1-3 validate strategy/design/dev artifacts; gate 4 runs automated audits against a local server on port 4010.

## Architecture

**Static generation:** Jekyll 3.x via `github-pages` gem with Liquid templating. All content is data-driven through YAML files in `_data/` (services, case studies, FAQs, process steps, translations, work examples — 13 files total). Layouts and includes compose pages from this data.

**Bilingual model:** Each translated page shares a `translation_key` for automatic `hreflang` tags and language switching. Ukrainian is the source language; English must be semantically aligned, not machine-literal.

**Layouts** (`_layouts/`): `default.html` (base shell) → `home.html`, `page.html`, `service_detail.html`, `case_study.html`, `process.html`.

**CSS** (`assets/css/site.css`): Single unified stylesheet using CSS custom properties. Warm editorial palette (beige/brown/burnt-orange accent). Fluid typography via `clamp()`. No CSS framework.

**JS** (`assets/js/site.js`): Vanilla JS only — mobile menu, scroll effects, IntersectionObserver reveal animations, parallax tilt. Respects `prefers-reduced-motion`.

**Images:** WebP + SVG only. Metadata-free policy enforced by `qa.sh`.

## Key Constraints

- Must remain compatible with `github-pages` gem (Jekyll safe-mode). No unsupported plugins.
- No external JS libraries.
- Every page needs both UA and EN versions with matching `translation_key`, `lang`, canonical, and `hreflang`.
- Reuse `_data/` YAML as the single source of truth — avoid duplicating content in markup.
- Image policy: WebP and SVG only, no JPEG/PNG, no embedded metadata.

## Content & SEO Rules

- **Brand name** is "Рівень" (not "Remonty"). All `seo_title` fields must use "Рівень".
- **Company location** is Lviv (Львів), not Kyiv. Use "у Львові" / "in Lviv" in SEO fields.
- Every page must have `seo_title` and `seo_description` in its front matter with geographic targeting where appropriate.
- Service page SEO titles follow: `"[Service] у Львові — [keywords] | Рівень"`.
- Ukrainian is the source language. English must be semantically aligned, professional, and use natural homeowner language (not B2B "buyer" tone).
- Content tone: professional, direct, evidence-based. Sell through process transparency and proof, not slogans.
- Hero stats: 300+ projects, 15+ years, 90%+ referrals, Львів і область, 6 напрямів.

## QA & Regression Testing

Phase 6 render checks (`scripts/phase6_render_checks.mjs`) enforce:
- No "Remonty" in any `<title>` or `og:title` across all routes
- No Kyiv/Києві geographic references
- 5 hero stat blocks with correct values and no warranty references
- No duplicate `featured-case-studies__bridge-note` elements
- No `ch`-based `max-width` on h1/h2 in CSS
- Heading hierarchy: exactly one h1, no skipped levels
- All `<img>` tags must have non-empty `alt`
- Internal links on home pages resolve to built routes

**When fixing bugs, always add a corresponding QA check to prevent regression.**

## Content Routes

- `/services/[slug]/` — 8 service detail pages (plumbing, electrical, rough-works, finishing, procurement, site-supervision, apartment-renovation, house-renovation)
- `/projects/[slug]/` — 5 case study portfolio pages
- `/process/`, `/about/`, `/contact/`, `/faq/` — informational pages
- `/en/` — English mirror of all above

## Multi-Agent Workflow

The repo includes an orchestration system for multi-agent LLM sessions:

- **Entry point:** `docs/agents/orchestrator.md` — read this first for any multi-agent session.
- **Progress:** `docs/orchestration/progress.md` and `docs/orchestration/tasks.md` must be updated after every agent pass.
- **Role briefs:** `docs/agents/` contains briefs for orchestrator, design, UI/UX, SEO, content, development, QA, and performance agents.
- **Phase gates:** `docs/orchestration/phase-gates.md` — work is gated; artifacts must exist before proceeding.
- **Agent artifacts:** stored in `agents/` (excluded from Jekyll build). Development agent writes directly to site root.
- **MCP policy:** `docs/agents/mcp-policy.md` — tasks marked `repo_only`, `mcp_preferred`, or `mcp_required`.
