# Codebase Conventions

## Scope

This repository is a GitHub Pages compatible Jekyll site. Conventions here are shaped more by safe-mode Jekyll constraints than by application-framework patterns.

## Platform constraints

- Keep `_config.yml` limited to GitHub Pages safe-mode compatible settings and supported plugins only. The current plugin set is `jekyll-seo-tag` and `jekyll-sitemap`.
- Treat the `github-pages` gem in `Gemfile` as the compatibility boundary. Do not add unsupported build-time dependencies without also changing deployment assumptions.
- Local Ruby compatibility is handled by `scripts/jekyll_compat.rb`, which is preloaded by `scripts/serve.sh` and `scripts/qa.sh`.

## Content architecture

- Ukrainian is the source language at `/`; English mirrors it under `/en/`. This is enforced in content files such as `index.md` and `en/index.md`.
- Every translated page carries `lang` and `translation_key` in front matter. English pages also set explicit `/en/.../` permalinks, for example `en/about/index.md`.
- Page-specific SEO fields are set in front matter when needed: `seo_title` and `seo_description`.
- The repo favors data-driven content over duplicated template logic. Shared copy and structured content live in `_data/`, especially `_data/translations.yml`, `_data/navigation.yml`, `_data/services.yml`, `_data/service_pages.yml`, `_data/process.yml`, `_data/process_page.yml`, `_data/work_examples.yml`, `_data/faqs.yml`, and `_data/proof.yml`.
- Layout selection is front-matter driven. Representative patterns:
  - `layout: home` in `index.md`
  - `layout: process` in `process/index.md`
  - `layout: service_detail` plus `service_key` in files under `services/*/index.md`
  - default `layout: page` inherited from `_config.yml` for simpler markdown pages like `about/index.md`

## Template and Liquid patterns

- Layouts are split by page type in `_layouts/default.html`, `_layouts/home.html`, `_layouts/page.html`, `_layouts/process.html`, and `_layouts/service_detail.html`.
- Shared chrome and SEO live in includes, mainly `_includes/head.html`, `_includes/header.html`, `_includes/footer.html`, and `_includes/work-examples.html`.
- URLs are built with Jekyll filters instead of hardcoded host assumptions:
  - `relative_url` for internal navigation and assets
  - `absolute_url` for canonical, hreflang, OG, Twitter, and sitemap references
- Bilingual behavior is resolved in Liquid by filtering `site.pages` on `translation_key`. This happens in `_includes/head.html` for `hreflang` and in `_includes/header.html` for the language switcher.
- Layouts usually compute a localized object once, then reuse it:
  - `{% assign t = site.data.translations[page.lang] | default: site.data.translations.uk %}`
  - `{% assign content = service[page.lang] | default: service.uk %}`
- Includes are parameterized rather than duplicated. `_includes/work-examples.html` uses `include.lang`, `include.compact`, and `include.filter_key`.

## Markup and styling conventions

- HTML is semantic and section-oriented. Layouts are composed from `section`, `article`, `figure`, `nav`, `blockquote`, and list elements rather than div-only wrappers.
- CSS class naming follows a BEM-like convention with block, element, and modifier segments, for example:
  - `site-header__inner`
  - `hero__shot--primary`
  - `proof-card--quote`
- State classes are explicit and minimal, mainly `is-open`, `is-active`, and `is-visible`.
- Shared visual tokens are centralized as CSS custom properties in `assets/css/site.css` under `:root`.
- Images usually declare intrinsic `width` and `height` in templates, which aligns with the gate requirement to reduce layout shift.
- Image policy is strict:
  - raster formats like `.jpg`, `.jpeg`, `.png`, `.tif`, `.tiff` are rejected under `assets/images/`
  - image assets are expected to be metadata-free `.webp` or clean `.svg`
  - this policy is enforced in `scripts/qa.sh`

## JavaScript conventions

- Client-side JavaScript is intentionally lightweight and centralized in `assets/js/site.js`.
- The script waits for `DOMContentLoaded`, queries DOM nodes once, and progressively enhances behavior.
- Current JS responsibilities are UI-only:
  - mobile nav toggle
  - scroll progress bar
  - pointer-based tilt/parallax
  - reveal-on-scroll via `IntersectionObserver`
- There is no bundler, transpiler, or module system. Any new JS should stay browser-native and deployment-safe for GitHub Pages.

## Copy and markdown conventions

- Simpler pages keep content in markdown bodies, as seen in `about/index.md`, `contact/index.md`, and `faq/index.md`.
- Repeated sections are generated from data files instead of duplicated markdown blocks. `faq/index.md` loops over `_data/faqs.yml`; service detail pages read `_data/service_pages.yml`.
- English copy mirrors intent, not just slug structure. The repo consistently keeps parallel content files such as `services/plumbing/index.md` and `en/services/plumbing/index.md`.

## Quality expectations for contributors

- Prefer changing data files and shared layouts before adding one-off page markup.
- Preserve `lang`, `translation_key`, canonical, and `hreflang` behavior whenever adding or moving pages.
- Preserve GitHub Pages compatibility. Avoid custom plugins, Node build steps, or Jekyll features that depend on unsupported deployment behavior.
- Keep internal links and asset references filter-based with `relative_url` or `absolute_url`.
- If a change affects both languages, update both page versions and the corresponding shared data structure together.
- Do not treat `_site/` as source. It is a generated output verified by scripts, not a place for manual edits.
