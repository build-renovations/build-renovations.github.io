# Phase Gates

The orchestrator enforces these gates strictly. No downstream phase may be marked ready until the current gate requirements are satisfied.

## Gate 1 — Strategy Complete

Requires:

- `agents/seo/keyword-map.md`
- `agents/seo/site-architecture.md`
- `agents/design/personas.md`
- `agents/design/user-flows.md`

Unlocks:

- Design system work
- Content briefs

## Gate 2 — Design & Content Ready

Requires:

- `agents/design/design-system.md`
- `agents/design/component-specs.md`
- `agents/design/animation-guide.md`
- `agents/content/page-copy/`
- `agents/content/microcopy.md`
- `agents/seo/front-matter-templates.md`

Unlocks:

- Jekyll development

## Gate 3 — Development Complete

Requires:

- All layouts built and validated
- All pages rendering correctly
- `jekyll build` passes with no errors
- `agents/status/dev.md` marked `DONE`

Unlocks:

- QA
- Performance review
- SEO technical audit

## Gate 4 — All Audits Passed

Requires:

- Lighthouse `95+` in all required categories
- WCAG 2.1 AA compliance confirmed
- SEO technical audit passed
- `0` broken links

Unlocks:

- Production deployment to GitHub Pages

## Jekyll-specific enforcement

- Plugins must remain within the GitHub Pages supported set.
- `_config.yml` must remain GitHub Pages compatible.
- Internal links should use Jekyll URL filters such as `relative_url` or `absolute_url`, not hardcoded deploy-host assumptions.
- Images should declare width and height where practical to reduce layout shift.
- Every page should provide front matter compatible with `jekyll-seo-tag`.

