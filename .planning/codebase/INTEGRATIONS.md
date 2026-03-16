# External Integrations

## Scope

This document maps runtime, build, deployment, SEO, and tooling integrations found in the repository.

MCP note: not needed for this mapping pass. Local repository inspection covered the required evidence.

## Deployment And Hosting

### GitHub Pages

- Primary deployment target is GitHub Pages, stated in `README.md` and reinforced by the `github-pages` gem in `Gemfile`.
- Site URL is configured as `https://build-renovations.github.io` in `_config.yml`.
- The codebase is designed around GitHub Pages safe-mode constraints:
  - supported plugins only
  - no translation plugin dependency
  - static layouts, includes, and `_data/` driven rendering

### GitHub Repository Linkage

- The `company.social` config in `_config.yml` links to `https://github.com/build-renovations/build-renovations.github.io`.
- This appears to be the repository or organization-facing public reference surfaced by site configuration.

## Jekyll Plugin Integrations

### `jekyll-sitemap`

- Enabled in `_config.yml`.
- `scripts/qa.sh` explicitly checks for generated `_site/sitemap.xml`.
- Purpose: sitemap generation for published pages.

### `jekyll-seo-tag`

- Enabled in `_config.yml`.
- Present in the Ruby dependency graph through `Gemfile.lock`.
- Operational caveat: the templates inspected do not call `{% seo %}`. Instead, metadata is manually rendered in `_includes/head.html`.

## Search And Metadata Integrations

### Search Engine Directives

- `_includes/head.html` emits `robots` and `googlebot` meta tags.
- Because `_config.yml` sets `seo.allow_indexing: false`, the current site is configured for `noindex, nofollow, noarchive`.

### Social Sharing Metadata

- `_includes/head.html` renders Open Graph tags:
  - `og:site_name`
  - `og:type`
  - `og:title`
  - `og:description`
  - `og:url`
  - `og:image`
  - `og:locale`
- `_includes/head.html` also renders Twitter card metadata:
  - `twitter:card`
  - `twitter:title`
  - `twitter:description`
  - `twitter:image`

### Structured Data

- `_includes/head.html` emits JSON-LD using `https://schema.org`.
- The schema type comes from `_config.yml` as `HomeAndConstructionBusiness`.
- Structured fields include:
  - business name
  - page description
  - canonical URL
  - image
  - language
  - telephone
  - email
  - postal locality/country
  - service area

### International SEO

- `translation_key` plus `lang` are used as the translation linkage model in page front matter such as `index.md` and `en/index.md`.
- `_includes/head.html` generates:
  - language-specific `hreflang`
  - `x-default`
  - alternate Open Graph locales
- `_includes/header.html` uses the same linkage to build the UA/EN language switcher.

## Contact And Business Surface Integrations

### Phone And Email Links

- `_includes/footer.html` outputs clickable `tel:` and `mailto:` links from `site.company.phone` and `site.company.email` in `_config.yml`.
- This is the only direct user contact integration present in the inspected code.

### No Form Backend Found

- No external form processor was found.
- No Formspree, Netlify Forms, email API, CRM embed, or JS form submission code was found in:
  - `_layouts/`
  - `_includes/`
  - `assets/js/site.js`
  - page content files

## Frontend Platform Integrations

### Browser APIs

`assets/js/site.js` integrates with standard browser APIs only:

- `DOMContentLoaded`
- `addEventListener`
- `getBoundingClientRect`
- `IntersectionObserver`
- CSS custom properties via `style.setProperty`

No frontend package ecosystem integration was found:

- no React/Vue/Svelte
- no npm app runtime
- no bundler
- no client-side API fetching
- no analytics snippet

### Static Asset Strategy

- The site integrates SVG and WebP assets from `assets/images/`.
- `assets/images/og-cover.svg` is used as the default social/SEO image in `_config.yml` and `_includes/head.html`.
- `scripts/qa.sh` integrates with `ffprobe` and `rg` to validate image policy and strip metadata risks.

## Local QA And Audit Tooling

### Ruby And Jekyll

- `scripts/serve.sh` runs `bundle exec jekyll serve`.
- `scripts/qa.sh` runs `bundle exec jekyll build`.
- Both scripts preload `scripts/jekyll_compat.rb` through `RUBYOPT`.

### Python HTTP Server

- `scripts/gates.sh` uses `bundle exec jekyll serve --skip-initial-build` to serve the site locally during gate 4 verification.

### Lighthouse

- `scripts/gates.sh` runs `npx --yes lighthouse` against the built site.
- It checks category scores for:
  - performance
  - accessibility
  - best-practices
  - seo

### Pa11y

- `scripts/gates.sh` runs `npx --yes pa11y` with `--standard WCAG2AA`.
- Purpose: accessibility regression detection against rendered pages.

### Linkinator

- `scripts/gates.sh` runs `npx --yes linkinator` with recursive crawl.
- `mailto:` and `tel:` links are skipped explicitly.

## MCP And Agent Tooling Integrations

These integrations support repository workflows, not the shipped website.

### MCP Server Definitions

`.mcp.example.json` declares four MCP servers:

- `filesystem_repo` via `@modelcontextprotocol/server-filesystem`
- `browser_automation` via `@playwright/mcp@latest`
- `docs_lookup` via `@upstash/context7-mcp`
- `memory` via `@modelcontextprotocol/server-memory`

### Codex MCP Bootstrap

`scripts/mcp-bootstrap.sh` registers those servers through `codex mcp add`.

### MCP Validation

`scripts/mcp-check.sh` validates:

- required repo docs exist
- `codex`, `node`, `npm`, and `npx` are installed
- the four MCP servers are registered
- expected local skills exist under `$CODEX_HOME/skills`

## Not Found

The following common integrations were not found in the inspected repository:

- GitHub Actions workflows in `.github/`
- analytics tags such as Google Analytics, GTM, Plausible, or Meta Pixel
- external font providers
- CMS or headless CMS hooks
- external database or API credentials
- payment integrations
- cookie banner or consent tooling
- external video embeds
- search service integration
