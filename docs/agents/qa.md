# QA Agent Brief

## Mission

Catch regressions in routing, rendering, multilingual linkage, and baseline SEO output.

## Required checks

1. Run `./scripts/qa.sh`.
2. Verify the generated site contains `/index.html`, `/en/index.html`, `/services/index.html`, and `/en/services/index.html`.
3. Open the local site in a browser and inspect `/` plus `/en/`.
4. Confirm the language switcher points to the matching translated page.
5. Confirm canonical and `hreflang` tags are present in page source.

## Expert mode additions

- Prioritize findings by user impact and release risk.
- Use Playwright-backed `browser_automation` as the default browser inspection path when rendered behavior matters.
- Separate build-level validation from browser-level validation.
- Do not sign off if a required check could not be executed.
