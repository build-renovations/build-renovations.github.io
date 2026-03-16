# Feature Research

**Domain:** Brownfield bilingual renovation marketing site for apartment and house buyers
**Repository:** `/Users/mykhailomykhailenko/work/personal/vasyl/remonty`
**Researched:** 2026-03-10
**Confidence:** HIGH

## Scope

This pass is for the next milestone after the current bilingual foundation. The site already has service pages, process, FAQ, contact, and work examples. The question here is what feature and content patterns should be added or expanded next to increase trust, portfolio strength, and phone-first conversion in 2026.

Key repo reality:
- The site is already strong on basic page coverage and bilingual structure.
- The biggest gap is not "more pages" by itself. It is deeper proof, clearer commercial framing, stronger local trust signals, and a better mobile call path.
- Recommendations below assume GitHub Pages-safe Jekyll, `_data/`-driven content, and strict UA/EN parity.

## What 2025-2026 Evidence Suggests

- Remodeling demand is still large and resilient, but buyers remain cautious and want clearer scope control, timing, and cost framing. Harvard JCHS reported the remodeling market remained above $600B in its March 20, 2025 release.
- Houzz's 2026 Renovation Plans report says the top improvement requests after completed projects were better schedule tracking (44%), clearer communication (35%), greater cost transparency (26%), better visualization tools (14%), and easier digital payments (12%).
- Houzz's 2025 Remodeling and Relationships report says couples most wanted transparent pricing (45%), clear communication (42%), and more accurate timelines (39%) from design and construction pros.
- Houzz's 2025 renovation trends report says 9 in 10 renovating homeowners hired pros, which means buyers are not trying to self-assemble the job; they are choosing who to trust.
- FTC and CFPB guidance both emphasize license and insurance checks, written estimates, written contracts, start and completion dates, payment schedules, references, receipts, and caution around contractor-arranged financing.
- Google Business Profile guidance still makes reviews, replies, complete business details, and real photos/videos core to local visibility and local trust. Also note that Google moved from the old `Google Guarantee` framing toward a `Google Verified` badge for Local Services effective October 20, 2025, so old badge language is already stale.

## Feature Landscape

### Table Stakes

These are now expected for a credible renovation/contractor site. Missing them makes the business feel risky or incomplete.

| Feature | Why Expected in 2026 | Complexity | Dependencies / Notes |
|---|---|---:|---|
| Verified identity and legitimacy block | Buyers now expect immediate proof of who they are hiring: real business name, service area, phone, hours, licensing status, insurance, warranty framing, and permit responsibility. This maps directly to FTC and Google trust expectations. | LOW | Needs shared `_data/company.yml` or similar; should feed footer, contact, service pages, and schema. |
| Phone-first mobile conversion system | For this project, phone calls are the main conversion. High-trust sites make calling obvious: sticky tap-to-call CTA, repeated number exposure, "what happens on the call" copy, and a low-friction header/footer call path. | MEDIUM | Needs shared CTA partial, mobile-safe sticky UI, and updated translations. |
| Real review proof with source attribution | Buyers expect reviews, but not anonymous praise. The minimum bar is selected sourced reviews with reviewer name/initial, service context, and a path to Google review credibility. | LOW | Needs review data model and source policy; strongest if tied to Business Profile. |
| Stronger portfolio structure, not just galleries | Photos alone are no longer enough. Buyers expect project type, scope, room list, stage breakdown, and what was solved. The current work examples are a base, but they need fuller case framing. | MEDIUM | Extend `_data/work_examples.yml` or create `_data/case_studies.yml`; requires consistent media curation. |
| Transparent process and commercial framing | Modern buyers want to know scope boundaries, change handling, procurement logic, site supervision, timeline shape, and what is excluded. This is now table stakes because cost and schedule anxiety are central. | MEDIUM | Best implemented as new sections on services/process plus a dedicated expectations page. |
| FAQ expansion around risk and decision points | High-trust contractor sites answer the uncomfortable questions: pricing method, rough timing ranges, materials sourcing, warranty logic, change orders, permits, staying in the property, and payment stages. | LOW | Can extend existing FAQ data; no new architecture required. |
| Local search trust layer | Complete and current Google Business Profile, review reply discipline, business-specific photos, service-area clarity, and matching website identity are baseline for local trust and rankings. | LOW | Depends partly on off-site operations, but the site should expose matching business facts and review prompts. |
| Bilingual trust parity | For this repo specifically, trust content cannot live only in one language. Every proof asset, CTA explanation, and case-study structure needs UA and EN parity with correct canonical and hreflang behavior. | MEDIUM | Requires disciplined content workflow and translation-aware data structures. |

### Differentiators

These are not universal minimums, but they create a materially stronger sales asset for this project.

| Feature | Why It Differentiates | Complexity | Dependencies / Notes |
|---|---|---:|---|
| Full case-study pages with challenge, decisions, stages, and outcome | Most contractor sites still stop at "here are photos." Detailed project dossiers show control, decision-making, and technical literacy. This is the strongest trust upgrade available to this site. | HIGH | Needs a repeatable collection or data model, per-project image sets, bilingual copy, and internal linking from service pages. |
| "Project fit" qualifier pages or blocks | A strong renovation site should say which projects are a fit, which are not, typical property types, starting conditions, and what information to prepare before calling. This improves lead quality and trust simultaneously. | LOW | Can be built as a reusable include on home, contact, and service pages. |
| Sample deliverables section | Showing sanitized examples of estimate structure, schedule stages, procurement checklist, handoff checklist, or change-order logic signals maturity better than generic promises. | MEDIUM | Needs careful redaction and bilingual explanation; ideal as trust content, not downloadable PDFs only. |
| Before-and-after plus in-progress storytelling | Many competitors show only finished beauty shots. Combining shell, rough-in, coordination, and final states proves that the team controls the full path from technical prep to finish. | MEDIUM | The repo already has stage imagery, so this is achievable by restructuring existing assets and adding captions. |
| Property-type and scope landing pages | Separate pages for apartment renovation, house renovation, bathroom, kitchen, full fit-out, engineer-first renovation, or owner-absent supervision help buyers self-identify faster and improve SEO depth. | MEDIUM | Works best if driven from shared data and linked to matching case studies and FAQs. |
| Trust microcopy around the first phone call | Sites that explain the first call as a project brief conversation outperform vague "contact us" language for serious buyers. This is especially aligned with the repo's explicit conversion goal. | LOW | Mostly copy and CTA integration. |
| Light visualization aids | Not a full 3D configurator, but finish-level comparisons, room package examples, sequence diagrams, or material decision guides reduce uncertainty without heavy product build. | MEDIUM | Strong design/content collaboration required; keep static and Jekyll-safe. |
| Post-completion assurance content | Warranty scope, snag-fix handling, maintenance advice, and "what handover includes" are underused trust builders in renovation marketing and matter to cautious buyers. | LOW | Can live in FAQ, case studies, and a dedicated assurance section. |

### Anti-Features

These are common requests that sound modern but would weaken this specific project.

| Anti-Feature | Why People Ask For It | Why It Is Problematic Here | Better Alternative |
|---|---|---|---|
| Instant renovation price calculator | Seems like a fast conversion tool | Renovation price ranges vary too much by condition, scope, engineering, and finish level. Bad estimates reduce trust fast and attract poor-fit leads. | Publish pricing method, example scope bands, and "what affects cost" explanations. |
| Generic chatbot or AI concierge | Feels modern and always-on | For a phone-first contractor site, chat often creates one more low-intent path and weakens the call CTA. It also reads as impersonal for high-trust work. | Use sticky tap-to-call plus optional short brief form only where needed. |
| Long multi-step lead forms as primary CTA | Teams want qualification data | Long forms suppress mobile conversion and fight the stated business goal of real calls. | Keep a short fallback brief form, but make the call path primary. |
| Portfolio hidden behind download gates | Marketing teams want to "capture leads" | Gating proof is the opposite of trust. Buyers want to verify quality before they surrender data. | Make proof public and frictionless; reserve optional downloadable checklists for later. |
| Heavy use of stock interiors or aspirational renders without labeling | Makes the site look prettier quickly | It damages trust once buyers notice the mismatch. Renovation buyers read visual authenticity very closely. | Use real project photos; label concept visuals explicitly if they ever appear. |
| Badge clutter and unverifiable claims | Feels like instant credibility | Unsupported badges, fake awards, and vague "best contractor" claims are easy to distrust. | Use only verifiable proof: reviews, licenses, insurance, service area, real partners, real case studies. |
| Financing-first messaging or contractor-steered lending | Can appear to reduce friction | FTC and CFPB guidance both make clear this area carries scam and compliance risk. It can also pull the brand downmarket. | If financing is ever mentioned, keep it secondary, transparent, and independent of contractor pressure. |
| Outdated `Google Guarantee` messaging | It used to be a recognizable trust signal | Google's badging changed in late 2025. Using old terminology makes the site feel stale or inaccurate. | Use current Google Business Profile / Local Services terminology only if actually applicable. |
| PDF-heavy experience for core trust content | Teams think PDFs feel professional | PDFs hide important proof from mobile users and from SEO, and they disrupt the call path. | Put critical trust content on pages first; offer PDF export only as a secondary convenience. |

## Complexity and Dependency Notes

### Low complexity, high impact

- Phone-first CTA rewrite and sticky call bar
- Expanded FAQ around cost, timing, warranty, permits, and changes
- Review proof blocks with source attribution
- Project-fit content and first-call framing
- Post-completion assurance content

### Medium complexity, likely next wave

- Restructured portfolio into before/in-progress/after narratives
- Property-type and scope landing pages
- Stronger local trust layer across contact, footer, schema, and service pages
- Light visualization aids such as finish-level comparisons or sequence diagrams

### High complexity, highest upside

- Full bilingual case-study system with reusable content model
- Sanitized sample deliverables library tied to process and trust content

## Feature Dependencies

```text
[Case-study pages]
    └──requires──> [Structured project data model]
                         └──requires──> [Bilingual content workflow]

[Phone-first CTA system]
    └──requires──> [Shared CTA partial]
                         └──requires──> [Consistent phone + call-copy data]

[Review proof blocks]
    └──requires──> [Verified source policy]

[Property-type landing pages]
    └──enhances──> [Local search trust layer]
    └──enhances──> [Phone-first qualification]

[Instant price calculator]
    └──conflicts──> [Trust-first commercial framing]
```

### Dependency Notes

- **Case-study pages require a structured project data model:** Without a stable schema for title, location/service area, scope, stages, images, and outcomes, bilingual maintenance will drift quickly.
- **Phone-first CTA system requires shared CTA data:** The site should not hardcode phone prompts in multiple templates because future wording and tracking changes will become brittle.
- **Review proof requires source discipline:** If the team cannot verify where a quote came from, it should not be published.
- **Property-type pages enhance both SEO and qualification:** They help buyers self-sort before the call and give Google clearer relevance signals.
- **Instant calculators conflict with trust-first positioning:** Precision theater is worse than transparent uncertainty in renovation sales.

## Recommended Next-Milestone Feature Stack

### Must ship in the next milestone

- Case-study framework, even if it launches with only 3 to 5 strong projects
- Phone-first CTA system with sticky mobile call path
- Review proof layer with source attribution
- Expanded trust FAQ and commercial expectations content
- Verified business identity block used site-wide

### Should follow immediately after

- Property-type / scope landing pages
- Before-and-after plus in-progress restructuring of portfolio
- Sample deliverables / process artifacts
- Post-completion assurance section

### Can wait

- Lighter visualization aids
- Digital payment convenience content
- Any financing references, only if handled carefully and legally

## Project-Specific Planning Conclusion

For this repo, the highest-value feature move is not adding flashy interactivity. It is building a stronger trust system around real projects, transparent process, and a clearer phone-first qualification path. In practice, that means:

1. Turn the existing work examples into a true case-study engine.
2. Add explicit proof of legitimacy and commercial clarity.
3. Make the first phone call feel specific, safe, and worth making.
4. Avoid fake precision, generic chat, and gated proof.

If the next milestone does only one major thing, it should be the case-study and trust-content system, because that improves conversion, SEO depth, and premium positioning at the same time.

## MCP / Web Usage

- **MCP used:** No dedicated research MCP server was used for this pass.
- **Fallback used:** Repository inspection plus built-in web research.
- **Why fallback was acceptable:** The task required current market evidence and repo-specific planning, and the available web tooling was sufficient to verify present-day homeowner expectations and search-platform realities.

## Sources

- Project context: `/Users/mykhailomykhailenko/work/personal/vasyl/remonty/.planning/PROJECT.md`
- Repo inspection: `_layouts/home.html`, `_includes/work-examples.html`, `_data/proof.yml`, `_data/work_examples.yml`
- Harvard JCHS, *Improving America's Housing 2025*: https://www.jchs.harvard.edu/improving-americas-housing-2025
- Harvard JCHS press release, March 20, 2025: https://www.jchs.harvard.edu/press-releases/remodeling-soars-new-heights-industry-struggles-address-labor-shortages-and-urgent
- Houzz, *2026 U.S. Houzz Renovation Plans Report*, December 11, 2025: https://www.houzz.com/press/1004/Houzz-Survey-Shows-Majority-of-Homeowners-Continuing-With-2026-Renovation-Plans-Despite-Economic-Uncertainty
- Houzz, *2025 U.S. Houzz & Home Renovation Trends*, April 22, 2025: https://www.houzz.com/magazine/2025-u-s-houzz-and-home-renovation-trends-stsetivw-vs~181188659
- Houzz, *2025 U.S. Houzz Remodeling and Relationships Report*, August 26, 2025: https://www.houzz.com/magazine/2025-u-s-houzz-remodeling-and-relationships-report-stsetivw-vs~182922273
- Houzz Pro, *What Homeowners Want During Home Renovation Projects*: https://pro.houzz.com/pro-learn/blog/what-homeowners-want-during-home-renovation-projects
- FTC, *How To Avoid a Home Improvement Scam*: https://consumer.ftc.gov/articles/how-avoid-home-improvement-scam
- CFPB, *How can I find and work with contractors to rebuild after a disaster?*: https://www.consumerfinance.gov/ask-cfpb/how-can-i-find-and-work-with-contractors-to-rebuild-after-a-disaster-en-1517/
- Google Business Profile Help, *Tips to improve your local ranking on Google*: https://support.google.com/business/answer/7091/improve-your-local-ranking-on-google
- Google Business Profile Help, *Tips for business-specific photos on your Business Profile*: https://support.google.com/business/answer/6123536?hl=en
- Google Business Profile Help, *Changes to Google Business Profile chat and call history*: https://support.google.com/business/answer/14919056?p=call_history_sunset
- Local Services Help, *Getting started with Local Services Ads*: https://support.google.com/localservices/answer/6224841?hl=en-AU
- Local Services Help, *The Google Guarantee*: https://support.google.com/localservices/answer/7549288?hl=en

---
*Feature research for: trust-first bilingual renovation marketing site*
*Researched: 2026-03-10*
