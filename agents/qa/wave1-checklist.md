# Wave 1 Verification Checklist

Status: DONE
Owner: QA Agent
Tool mode: mcp_preferred
MCP usage: browser automation used for rendered page review and mobile menu validation.

## Verified routes

- `/`
- `/services/`
- `/about/`
- `/contact/`
- `/process/`
- `/faq/`
- `/services/plumbing/`
- English mirrors for the same page types

## Checks completed

- Bilingual routing exists for core pages and service detail pages.
- Language switching resolves to the translated counterpart.
- Primary navigation includes Services, Process, FAQ, About, and Contact.
- Homepage, FAQ, Process, and a representative service detail page render correctly in a real browser.
- Mobile menu opens correctly.
- `./scripts/qa.sh` passes.
- Static broken-link sweep against `_site/` returned `0` missing references.

## Accessibility spot-checks

- Landmarks present:
  - header
  - main
  - footer
- Real text headings used throughout
- Decorative logo mark is not read as duplicate content
- Work-example images include descriptive alt text
- No layout shift observed in audited templates

## Remaining manual business check

- Replace placeholder company contact data and brand details before production deployment.
