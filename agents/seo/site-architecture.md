# Site Architecture

Status: DONE
Owner: SEO Expert Agent
Tool mode: repo_only

## Objective

Define the bilingual page tree for the renovation website so the next content and development phases can proceed without structural ambiguity.

## Routing model

- Ukrainian default:
  - `/`
- English mirror:
  - `/en/`

## Wave 1 page tree

### Core pages

- `/`
  - homepage
- `/services/`
  - services hub
- `/about/`
  - trust and approach
- `/contact/`
  - enquiry entry point
- `/process/`
  - delivery method and stages
- `/faq/`
  - buyer objections and common questions

### Service detail pages

- `/services/apartment-renovation/`
- `/services/house-renovation/`
- `/services/plumbing/`
- `/services/electrical/`
- `/services/rough-works/`
- `/services/finishing/`
- `/services/procurement/`
- `/services/site-supervision/`

### English mirrors

- `/en/`
- `/en/services/`
- `/en/about/`
- `/en/contact/`
- `/en/process/`
- `/en/faq/`
- `/en/services/apartment-renovation/`
- `/en/services/house-renovation/`
- `/en/services/plumbing/`
- `/en/services/electrical/`
- `/en/services/rough-works/`
- `/en/services/finishing/`
- `/en/services/procurement/`
- `/en/services/site-supervision/`

## Page responsibilities

### Homepage

- Position the company as a full-scope renovation partner
- Route users toward service exploration or direct enquiry
- Establish trust through process, breadth, and control

### Services hub

- Summarize the full offer
- Link to all service detail pages
- Capture broad commercial intent

### Service detail pages

- Match service-specific search intent
- Explain scope, inclusions, process, and outcomes
- Lead to enquiry with project-specific CTA

### Process page

- Explain project stages
- Reduce uncertainty around execution and control
- Support conversion by showing structured delivery

### FAQ page

- Capture informational queries
- Address timing, scope, materials, supervision, and budgeting concerns

### About page

- Support trust and differentiation
- Explain methodology and accountability

### Contact page

- Gather qualified enquiry details
- Reduce vague leads by structuring the brief

## Navigation recommendation

- Home
- Services
- Process
- About
- FAQ
- Contact

## Template recommendation

- Shared layout for standard content pages
- Shared layout or include pattern for service detail pages
- Shared data structure for service summaries, FAQs, and proof blocks

## SEO requirements

- Every page needs:
  - `lang`
  - `translation_key`
  - `title`
  - language-specific description
  - canonical output
  - hreflang support
- Service detail pages should support:
  - breadcrumb-ready hierarchy later
  - schema only when content is sufficiently detailed

## Notes for development

- Build service detail pages from shared layouts and data-driven structures where practical.
- Keep page URLs stable and human-readable.
- Preserve GitHub Pages compatibility and current Jekyll conventions.

