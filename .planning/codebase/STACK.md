# Technology Stack

## Scope

This repository is a static bilingual renovation site built for GitHub Pages-safe Jekyll deployment. Ukrainian content lives at `/` and English mirrors it under `/en/`.

MCP note: not needed for this mapping pass. Repository inspection was sufficient.

## Core Runtime

- Static site generator: Jekyll via the `github-pages` gem in `Gemfile`.
- Effective GitHub Pages bundle version: `github-pages 223` from `Gemfile.lock`.
- Effective Jekyll version in that bundle: `jekyll 3.9.0` from `Gemfile.lock`.
- Liquid templating version: `liquid 4.0.3` from `Gemfile.lock`.
- Markdown engine: `kramdown 2.3.1` configured in `_config.yml`.
- Local Ruby additions in `Gemfile`: `csv`, `bigdecimal`, and `webrick`.

## Site Configuration

Primary configuration sits in `_config.yml`.

Key settings in `_config.yml`:

- `url: "https://build-renovations.github.io"`
- `baseurl: ""`
- `lang: uk`
- `timezone: Europe/Kyiv`
- `permalink: pretty`
- `theme: null`
- `plugins`: `jekyll-seo-tag`, `jekyll-sitemap`
- `exclude`: `agents/`, `docs/`, `scripts/`, `vendor/`, `node_modules/`, and other non-site paths

GitHub Pages context:

- The project intentionally avoids unsupported multilingual plugins and uses manual page mirroring plus front matter instead.
- `theme: null` means the site uses custom layouts and assets rather than a packaged Jekyll theme.
- The repository keeps to GitHub Pages safe-mode assumptions as documented in `README.md` and `AGENTS.md`.

## Content Model

The site is front matter and `_data/` driven rather than collection-heavy application logic.

Main content paths:

- Root-language entry pages: `index.md`, `services/index.md`, `process/index.md`, `faq/index.md`, `about/index.md`, `contact/index.md`
- English mirrors: `en/index.md`, `en/services/index.md`, `en/process/index.md`, `en/faq/index.md`, `en/about/index.md`, `en/contact/index.md`
- Service detail pages: `services/*/index.md` and `en/services/*/index.md`

Translation model:

- Each translated page uses front matter fields such as `lang` and `translation_key`; examples are in `index.md` and `en/index.md`.
- Language alternates and switcher links are computed in `_includes/head.html` and `_includes/header.html`.
- Shared localized copy lives in `_data/translations.yml`.

Shared structured content in `_data/`:

- `_data/navigation.yml`
- `_data/services.yml`
- `_data/service_pages.yml`
- `_data/process.yml`
- `_data/process_page.yml`
- `_data/proof.yml`
- `_data/faqs.yml`
- `_data/work_examples.yml`

## Templates And Rendering

Layouts:

- Base shell: `_layouts/default.html`
- Home page: `_layouts/home.html`
- Standard content page: `_layouts/page.html`
- Service detail page: `_layouts/service_detail.html`
- Process page: `_layouts/process.html`

Includes:

- Document head and metadata: `_includes/head.html`
- Global header/navigation: `_includes/header.html`
- Global footer: `_includes/footer.html`
- Reusable gallery/content block: `_includes/work-examples.html`

Rendering characteristics:

- Liquid loops build service cards from `_data/services.yml` in `_layouts/home.html`.
- Service detail pages resolve `page.service_key` into `_data/service_pages.yml` in `_layouts/service_detail.html`.
- The gallery include reads `_data/work_examples.yml` and supports filtering by service key.

## Frontend Layer

CSS:

- Single custom stylesheet: `assets/css/site.css`
- No Sass source tree is present despite GitHub Pages supporting Sass through the bundle.

JavaScript:

- Single custom script: `assets/js/site.js`
- No framework, bundler, or transpilation step is used.
- Behavior is lightweight DOM enhancement only:
  - mobile navigation toggle
  - scroll progress indicator
  - pointer-based tilt/parallax effects
  - reveal-on-scroll animation via `IntersectionObserver`
- `prefers-reduced-motion: reduce` is respected: when matched, all reveal nodes receive `is-visible` immediately and the observer is skipped entirely.
- IntersectionObserver reveal threshold is `0.05` (5% visibility required) with a `-6%` bottom root margin. This ensures elements already in the viewport on page load reveal immediately without requiring scroll.

Media/assets:

- Brand and OG assets are SVG-based in `assets/images/`.
- Photo assets are stored as `.webp` files under `assets/images/work/`.
- `scripts/qa.sh` enforces an image policy that rejects `.jpg`, `.jpeg`, `.png`, `.tif`, and `.tiff` in `assets/images/`, and checks for embedded metadata in `.webp` and `.svg`.

## SEO And Structured Data

The SEO layer is hybrid: plugin-assisted sitemap generation plus manually assembled metadata.

- GitHub Pages-safe plugins configured in `_config.yml`: `jekyll-seo-tag` and `jekyll-sitemap`
- Manual metadata output is assembled in `_includes/head.html`:
  - canonical
  - Open Graph
  - Twitter card tags
  - `hreflang` alternates
  - `x-default`
  - JSON-LD for `HomeAndConstructionBusiness`

Notable nuance:

- `jekyll-seo-tag` is installed but not invoked with a `{% seo %}` tag in the inspected templates. Metadata generation is currently custom markup in `_includes/head.html`.
- Indexing is disabled by config because `_config.yml` sets `seo.allow_indexing: false`, which emits `noindex` and `noarchive` directives.

## Tooling And Verification

Local development:

- Serve script: `scripts/serve.sh`
- Build/QA script: `scripts/qa.sh`
- Phase gate script: `scripts/gates.sh`

Compatibility shim:

- `scripts/jekyll_compat.rb` patches `Object#tainted?` for newer Ruby runtimes while still using the GitHub Pages Jekyll stack.
- Both `scripts/serve.sh` and `scripts/qa.sh` preload that shim through `RUBYOPT`.

Gate and QA toolchain:

- Jekyll build via `bundle exec jekyll build`
- Local gate serving via `bundle exec jekyll serve --skip-initial-build`
- Lighthouse via `npx --yes lighthouse`
- Accessibility checks via `npx --yes pa11y`
- Link crawl via `npx --yes linkinator`
- Shell tooling expects `bash`, `bundle`, `curl`, `node`, `npm`, `npx`, `ffprobe`, and `rg`

## Project Operations Context

This repository also contains a local agent orchestration layer, but it is excluded from the built site in `_config.yml`.

Relevant operational paths:

- `AGENTS.md`
- `docs/agents/`
- `docs/orchestration/`
- `agents/`
- `.mcp.example.json`
- `scripts/mcp-bootstrap.sh`
- `scripts/mcp-check.sh`

These files support planning, QA, and MCP setup, but they are not part of the published Jekyll output.
