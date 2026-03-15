# Phase 6: Identity, Contact and Navigation Completion - Research

**Researched:** 2026-03-15
**Domain:** Jekyll static site — config, data files, render checks, and navigation
**Confidence:** HIGH

---

## Summary

Phase 6 closes three runtime gaps identified in the v1.0 milestone audit. All three gaps exist in data and configuration layers, not in templates or layout logic. The fixes are narrow, surgical, and low risk.

**Gap 1 — TRST-01 (brand name):** `_config.yml` still has `title: "Remonty"` and both `seo.uk.title` / `seo.en.title` reference "Remonty". JSON-LD and in-page brand already use the correct name "Рівень" via `site.company.name`. The fix is updating the `title` and `seo.*.title` fields in `_config.yml`. The Phase 5 render checks (`phase5_render_checks.mjs`) do not yet assert the brand name in `<title>` tags, so a new check must be added.

**Gap 2 — CALL-04 (messenger handles):** `_data/contact_channels.yml` has three placeholder messenger URLs for both `uk` and `en` locales. Templates already render them correctly. Only the URL values need replacing with real Telegram/Viber/WhatsApp handles. The render check that catches the placeholder phone `+380000000000` in JSON-LD exists, but there is no current check for placeholder messenger URLs in contact_channels.yml; a new render check must enforce this.

**Gap 3 — CASE-03 (projects in nav):** `_data/navigation.yml` has no entry for `/projects/` or `/en/projects/`. Both route files exist at `projects/index.md` and `en/projects/index.md` with correct `translation_key: projects` and `permalink` values. The fix is adding a single entry to each locale's nav array. The header renders nav purely from `_data/navigation.yml` via a Liquid loop, so no template changes are needed.

**Primary recommendation:** All three gaps resolve through data/config edits only. Add a `phase6_render_checks.mjs` script to verify brand consistency, non-placeholder messenger URLs, and projects navigation link presence across both locales before closing.

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| TRST-01 | Visitor can see clear business identity and legitimacy signals on core pages, including company framing, service profile, and trust-supporting commercial context. | Brand name "Рівень" must appear consistently in `<title>`, `og:title`, JSON-LD, and in-page brand. Only `_config.yml` title fields need updating. |
| CALL-04 | Visitor can access a secondary fallback contact path without it competing with the primary phone conversion path. | Real Telegram, Viber, and WhatsApp handles must replace three placeholder URLs in `_data/contact_channels.yml` (both `uk` and `en` blocks). |
| CASE-03 | Visitor can move from a service page or homepage proof section into deeper project evidence relevant to that service or property type. | `/projects/` and `/en/projects/` must appear in `_data/navigation.yml` uk and en arrays respectively. Routes and pages already exist. |
</phase_requirements>

---

## Standard Stack

### Core

| Component | Location | Purpose | Notes |
|-----------|----------|---------|-------|
| `_config.yml` | repo root | Site-wide config — `title`, `company.name`, `seo.*` fields | Brand name fix lives here |
| `_data/contact_channels.yml` | `_data/` | Bilingual messenger URL data consumed by contact templates | Messenger URL replacement lives here |
| `_data/navigation.yml` | `_data/` | Top-level nav link list consumed by `_includes/header.html` | Projects nav link lives here |
| `_includes/header.html` | `_includes/` | Renders nav loop from `site.data.navigation[page.lang]` | No changes needed — already loops data |
| `_includes/head.html` | `_includes/` | Renders `<title>`, `og:title`, JSON-LD from `site.company.name`, `seo.*.title` | No changes needed — uses correct variables |
| `scripts/qa.sh` | `scripts/` | Build + render check runner | Must invoke new `phase6_render_checks.mjs` |
| `scripts/phase6_render_checks.mjs` | `scripts/` | New render check for Phase 6 gaps | Must be created |

### Supporting

| Component | Location | Purpose | When to Use |
|-----------|----------|---------|-------------|
| `scripts/phase5_render_checks.mjs` | `scripts/` | Reference implementation for render check patterns | Use as template for Phase 6 checks |
| `_data/translations.yml` | `_data/` | Localized copy keys including nav labels | May need `nav_projects` key added |

**Installation:** No new packages required. All tooling is already in the repo.

---

## Architecture Patterns

### Config-First Identity

The title chain is:

```
_config.yml → title (site.title)
_config.yml → seo.uk.title / seo.en.title
_config.yml → company.name (site.company.name)
```

`_includes/head.html` assembles `page_title` from:
1. `page.seo_title` (page-level front matter override)
2. `page.title | append: ' | ' | append: site.company.name` (page with brand suffix)
3. `seo.title` (locale SEO title from `_config.yml`)

The home page and catch-all fallback hit path #3, which means `seo.uk.title` and `seo.en.title` must say "Рівень", not "Remonty". `site.company.name` is already correct.

JSON-LD uses `site.company.name` directly — already correct. `og:site_name` uses `site.company.name` — already correct. Only the `seo.*.title` fields and `title:` at the top of `_config.yml` are wrong.

### Data-Driven Navigation

Navigation is purely data-driven:

```yaml
# _data/navigation.yml
uk:
  - title: "..."
    url: /path/
en:
  - title: "..."
    url: /en/path/
```

`_includes/header.html` loops `site.data.navigation[page.lang]` — no template logic to change. Adding a nav item is a YAML-only edit.

Navigation labels for the "Home" link come from `_data/translations.yml` (`nav_home` key). Other nav titles come from the `title:` field directly in `navigation.yml`. The "Проєкти" / "Projects" label should be added as the `title:` inline in `navigation.yml`, not as a `translations.yml` key — consistent with how all other nav items are defined.

### Messenger URL Format

The three messenger channel URL patterns in use:

```yaml
# Telegram — username format
url: "https://t.me/USERNAME"

# Viber — invite or deeplink format (community invite or direct message)
url: "https://viber.com/USERNAME"
# OR for direct message:
url: "viber://chat?number=PHONE_E164"

# WhatsApp — click-to-chat format
url: "https://api.whatsapp.com/send?phone=PHONE_E164_NO_PLUS"
# OR wa.me format (preferred, shorter):
url: "https://wa.me/PHONE_E164_NO_PLUS"
```

The existing placeholder pattern in `contact_channels.yml` already uses these exact URL schemes. Only the destination handle/phone values need replacing with real values.

Both `uk` and `en` blocks in `contact_channels.yml` share identical messenger URLs — the messenger handles are locale-agnostic, so the same three URLs appear in both blocks.

### Render Check Pattern (Phase 5 as Reference)

Phase 5 `phase5_render_checks.mjs` establishes the pattern:

```javascript
// Source: scripts/phase5_render_checks.mjs
function checkNoPlaceholderIdentity(route, html) {
  const scriptBlocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)].map((m) => m[1]);
  const combined = scriptBlocks.join("\n");
  if (combined.includes("Business name pending confirmation")) {
    fail(`${route} JSON-LD contains placeholder identity`);
  }
  if (/\+380000000000/.test(combined)) {
    fail(`${route} JSON-LD contains placeholder identity`);
  }
}
```

Phase 6 checks follow the same pattern: read `_site/*/index.html`, apply assertions, call `fail()` on mismatch.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Brand name consistency | Custom Liquid logic or includes | Update `_config.yml` values | `head.html` already reads from config correctly |
| Nav link addition | New layout or conditional include | Add YAML entry to `navigation.yml` | Header already loops data |
| URL validation for messengers | Runtime link-checking script | Write correct URLs to data file | QA only validates syntax, not destination — correctness is a data concern |

**Key insight:** Every gap in this phase is a data/config error, not a template error. The templates already do the right thing.

---

## Common Pitfalls

### Pitfall 1: Updating Only One Locale Block in contact_channels.yml
**What goes wrong:** The UK messenger URLs get real handles but EN block keeps placeholders, or vice versa.
**Why it happens:** The file has separate `uk:` and `en:` top-level keys; both need identical messenger URL updates.
**How to avoid:** Update both `uk.messengers` and `en.messengers` arrays in the same commit.
**Warning signs:** Render check passes for one language route but fails for the other.

### Pitfall 2: Inconsistent Title in seo.en vs seo.uk
**What goes wrong:** `seo.uk.title` is updated to "Рівень" but `seo.en.title` still says "Remonty", or the top-level `title:` is not updated.
**Why it happens:** Three separate config keys control the brand name display across locales.
**How to avoid:** Update all three: `title:`, `seo.uk.title`, `seo.en.title` together.
**Warning signs:** English `<title>` still renders "Remonty" in `_site/en/index.html`.

### Pitfall 3: Navigation Entry Uses Wrong URL Format
**What goes wrong:** Nav link added as `/projects` (no trailing slash) instead of `/projects/` causing a redirect or 404 under Jekyll's pretty permalink setting.
**Why it happens:** Jekyll with `permalink: pretty` generates `_site/projects/index.html`, served at `/projects/`. Links without trailing slash may redirect.
**How to avoid:** Use `/projects/` with trailing slash, consistent with all other nav entries.
**Warning signs:** Linkinator flags a redirect on the projects nav link.

### Pitfall 4: Render Check Not Added to qa.sh
**What goes wrong:** `phase6_render_checks.mjs` is created but not invoked in `scripts/qa.sh`, so checks never run automatically.
**Why it happens:** `qa.sh` must be updated to add each new render check script explicitly.
**How to avoid:** Add `node ./scripts/phase6_render_checks.mjs` to `qa.sh` alongside the other phase check invocations.
**Warning signs:** `./scripts/qa.sh` runs without error but the Phase 6 checks were never executed.

### Pitfall 5: Messenger URL for WhatsApp Using Plus-Prefixed Phone
**What goes wrong:** WhatsApp click-to-chat URL uses `+380...` format, breaking the URL.
**Why it happens:** `https://api.whatsapp.com/send?phone=` and `https://wa.me/` both require the number without the leading `+`.
**How to avoid:** Strip the `+` from the E.164 phone number in WhatsApp URLs.

---

## Code Examples

### Adding a Nav Entry (navigation.yml)

```yaml
# Source: _data/navigation.yml — existing pattern
uk:
  - title: "Послуги"
    url: /services/
  - title: "Процес"
    url: /process/
  - title: "FAQ"
    url: /faq/
  - title: "Про нас"
    url: /about/
  - title: "Проєкти"        # ADD THIS
    url: /projects/         # ADD THIS
  - title: "Контакти"
    url: /contact/
en:
  - title: "Services"
    url: /en/services/
  - title: "Process"
    url: /en/process/
  - title: "FAQ"
    url: /en/faq/
  - title: "About"
    url: /en/about/
  - title: "Projects"       # ADD THIS
    url: /en/projects/      # ADD THIS
  - title: "Contact"
    url: /en/contact/
```

### Brand Name Fix (_config.yml)

```yaml
# Current (wrong):
title: Remonty
seo:
  uk:
    title: "Remonty | Ремонт від сантехніки до фінального оздоблення"
  en:
    title: "Remonty | Renovation from plumbing to final finishing"

# Fixed:
title: Рівень
seo:
  uk:
    title: "Рівень | Ремонт від сантехніки до фінального оздоблення"
  en:
    title: "Рівень | Renovation from plumbing to final finishing"
```

### Phase 6 Render Check Structure (phase6_render_checks.mjs)

```javascript
// Follows pattern from scripts/phase5_render_checks.mjs
import fs from "node:fs";
import path from "node:path";

const repoRoot = process.cwd();
const siteRoot = path.join(repoRoot, "_site");

function fail(message) {
  console.error(`FAIL: ${message}`);
  process.exit(1);
}

function readHtml(route) {
  const cleanRoute = route.replace(/^\/+/, "");
  const filePath = cleanRoute
    ? path.join(siteRoot, cleanRoute, "index.html")
    : path.join(siteRoot, "index.html");
  if (!fs.existsSync(filePath)) {
    fail(`${route} not found at ${filePath}`);
  }
  return fs.readFileSync(filePath, "utf8");
}

// Check 1: <title> and og:title must not contain "Remonty"
function checkBrandName(route, html) {
  const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
  if (titleMatch && titleMatch[1].includes("Remonty")) {
    fail(`${route} <title> still contains "Remonty" — update _config.yml seo.*.title`);
  }
  const ogTitleMatch = html.match(/og:title[^>]*content="([^"]+)"/i)
    || html.match(/content="([^"]+)"[^>]*og:title/i);
  if (ogTitleMatch && ogTitleMatch[1].includes("Remonty")) {
    fail(`${route} og:title still contains "Remonty"`);
  }
}

// Check 2: Projects link present in nav HTML
function checkProjectsNav(route, html) {
  if (route === "/" || route === "/en/") {
    const expectedPath = route === "/" ? "/projects/" : "/en/projects/";
    if (!html.includes(`href="${expectedPath}"`)) {
      fail(`${route} nav missing link to ${expectedPath}`);
    }
  }
}

// Check 3: No placeholder messenger URLs in rendered HTML
function checkNoPlaceholderMessengers(route, html) {
  if (html.includes("telegram_phase1_contact")) {
    fail(`${route} contains placeholder Telegram handle — update _data/contact_channels.yml`);
  }
  if (html.includes("AQExamplePhase1")) {
    fail(`${route} contains placeholder Viber handle — update _data/contact_channels.yml`);
  }
  if (html.includes("send?phone=380000000000")) {
    fail(`${route} contains placeholder WhatsApp phone — update _data/contact_channels.yml`);
  }
}
```

Note: The exact assertion for projects nav link may need adjustment depending on how header generates href values (with or without `baseurl`). Inspect `_site/index.html` nav section to confirm the rendered attribute format before finalizing.

---

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | Custom Node.js render checks + bash qa.sh |
| Config file | `scripts/qa.sh` (invokes all render check scripts) |
| Quick run command | `./scripts/qa.sh` |
| Full suite command | `./scripts/gates.sh gate4` |

### Phase Requirements to Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| TRST-01 | `<title>` and `og:title` contain "Рівень" not "Remonty" on UA and EN home | smoke (render check) | `node ./scripts/phase6_render_checks.mjs` | Wave 0 |
| CALL-04 | No placeholder messenger URLs in rendered contact pages | smoke (render check) | `node ./scripts/phase6_render_checks.mjs` | Wave 0 |
| CASE-03 | `/projects/` link present in UA nav; `/en/projects/` link in EN nav | smoke (render check) | `node ./scripts/phase6_render_checks.mjs` | Wave 0 |

### Sampling Rate

- **Per task commit:** `./scripts/qa.sh`
- **Per wave merge:** `./scripts/qa.sh`
- **Phase gate:** Full suite green (`./scripts/gates.sh gate4`) before `/gsd:verify-work`

### Wave 0 Gaps

- [ ] `scripts/phase6_render_checks.mjs` — covers TRST-01, CALL-04, CASE-03
- [ ] `scripts/qa.sh` must gain `node ./scripts/phase6_render_checks.mjs` invocation line

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Placeholder identity values in `_config.yml` | Real business name "Рівень" in `company.name` since Phase 1; `title` and `seo.*.title` not updated | Phase 1 partial — v1.0 audit found gap | Phase 6 closes: `title` and `seo.*.title` must be updated |
| Phase 1 placeholder messenger URLs in `contact_channels.yml` | URLs still use placeholder handles | Phase 1 — flagged by v1.0 audit | Phase 6 closes: replace with real handles |
| `/projects/` route exists but not in navigation | Navigation built in Phase 3, nav not updated | Phase 3 — flagged by v1.0 audit | Phase 6 closes: add to `navigation.yml` |

**Deprecated/outdated:**
- Placeholder strings: `telegram_phase1_contact`, `AQExamplePhase1`, `send?phone=380000000000` — all must be replaced in `contact_channels.yml`
- `title: Remonty` in `_config.yml` — must be replaced with `title: Рівень`

---

## Open Questions

1. **Real messenger handles**
   - What we know: The owner has real Telegram, Viber, and WhatsApp channels for the business
   - What's unclear: The actual handles/phone numbers for those channels are not present in any project file
   - Recommendation: The planner must treat messenger handle values as owner-supplied inputs. Plan tasks should include a placeholder instruction to the owner to provide the three handles before execution. The plan can pre-fill with a named constant or comment in `contact_channels.yml`.

2. **WhatsApp URL format — api.whatsapp.com vs wa.me**
   - What we know: Both formats work; the existing placeholder uses `api.whatsapp.com/send?phone=`
   - What's unclear: Owner's preferred format
   - Recommendation: Keep the existing `api.whatsapp.com` pattern for minimal diff; both resolve correctly.

3. **Navigation order for "Проєкти"**
   - What we know: Current nav order is Послуги → Процес → FAQ → Про нас → Контакти
   - What's unclear: Whether "Проєкти" should appear before or after "Про нас"
   - Recommendation: Insert before "Контакти" to mirror the trust-building flow (services → process → proof → about → contact). The audit identified the gap as "missing from nav" not "wrong position", so any reasonable position closes CASE-03.

---

## Sources

### Primary (HIGH confidence)

- Direct inspection of `_config.yml` — confirmed `title: "Remonty"` and `seo.uk.title`/`seo.en.title` naming gap
- Direct inspection of `_data/contact_channels.yml` — confirmed three placeholder URLs in both locale blocks
- Direct inspection of `_data/navigation.yml` — confirmed `/projects/` absent from both `uk` and `en` arrays
- Direct inspection of `projects/index.md` and `en/projects/index.md` — confirmed routes exist with correct `translation_key: projects` and permalinks
- Direct inspection of `_includes/header.html` — confirmed nav is data-loop driven, no template changes needed
- Direct inspection of `_includes/head.html` — confirmed title chain logic; only config values need changing
- Direct inspection of `scripts/phase5_render_checks.mjs` — confirmed render check pattern to replicate
- Direct inspection of `scripts/qa.sh` — confirmed pattern for invoking render check scripts
- Direct inspection of `.planning/v1.0-MILESTONE-AUDIT.md` — authoritative source for all three gap descriptions
- Direct inspection of `.planning/codebase/CONVENTIONS.md` — confirmed data-driven nav and YAML patterns

### Secondary (MEDIUM confidence)

- WhatsApp click-to-chat URL format: `https://api.whatsapp.com/send?phone=PHONE` or `https://wa.me/PHONE` — both are documented by Meta; phone must omit `+` prefix. Existing placeholder already uses the correct scheme, only the number needs replacing.

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all components confirmed by direct codebase inspection
- Architecture: HIGH — template and data layer fully traced; no ambiguity
- Pitfalls: HIGH — derived from direct inspection of the exact files being changed
- Validation: HIGH — pattern from Phase 5 checks is directly reusable

**Research date:** 2026-03-15
**Valid until:** 2026-04-14 (stable config/data-driven site, 30-day window appropriate)
