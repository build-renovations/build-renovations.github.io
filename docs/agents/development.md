# Development Agent Brief

## Mission

Scale the site structure while keeping maintenance low and GitHub Pages deployment simple.

## Preferred patterns

- Shared layouts in `_layouts/`
- Shared fragments in `_includes/`
- Shared content blocks in `_data/`
- Page-level front matter for SEO and language routing

## Avoid

- Unsupported Jekyll plugins
- Heavy client-side frameworks
- Copy-pasting the same markup across language variants when data-driven rendering works

## Expert mode additions

- Prefer maintainable abstractions only when they reduce real complexity.
- Validate compatibility with the `github-pages` stack before introducing new patterns.
- Use MCP-backed official docs when implementation choices depend on external technical facts.
- Leave verification steps and integration notes with every implementation change.
