# Performance Budget

Status: DONE
Owner: Performance Agent
Tool mode: mcp_preferred
MCP usage: Lighthouse run locally against the built site using Playwright Chromium.

## Budget targets

- Lighthouse performance:
  - `95+`
- Lighthouse accessibility:
  - `95+`
- Lighthouse best practices:
  - `95+`
- Lighthouse SEO:
  - `95+`
- Cumulative layout shift:
  - `0.1` or lower
- Total blocking time:
  - under `200ms`

## Measured results

### Homepage

- Performance:
  - `99`
- Accessibility:
  - `100`
- Best practices:
  - `100`
- SEO:
  - `100`
- LCP:
  - `2.0s`
- TBT:
  - `0ms`
- CLS:
  - `0`

### Core page-type sample

- Services hub:
  - `100 / 100 / 100 / 100`
- About:
  - `100 / 100 / 100 / 100`
- Contact:
  - `100 / 100 / 100 / 100`
- Process:
  - `100 / 100 / 100 / 100`
- FAQ:
  - `100 / 100 / 100 / 100`
- Service detail (`/services/plumbing/`):
  - `100 / 95 / 100 / 100`

## Evidence files

- `agents/status/reports/lighthouse-home.json`
- `agents/status/reports/lighthouse-services.json`
- `agents/status/reports/lighthouse-about.json`
- `agents/status/reports/lighthouse-contact.json`
- `agents/status/reports/lighthouse-process.json`
- `agents/status/reports/lighthouse-faq.json`
- `agents/status/reports/lighthouse-plumbing.json`
