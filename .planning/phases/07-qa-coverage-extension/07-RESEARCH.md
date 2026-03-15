# Phase 7: QA Coverage Extension - Research

**Researched:** 2026-03-15
**Domain:** Render-check scripting (Node.js ESM), Jekyll static site test coverage
**Confidence:** HIGH

---

## Summary

The project has an established pattern of per-phase render check scripts (`phase{N}_render_checks.mjs`) that run as a sequential pipeline from `scripts/qa.sh`. Each script reads `_site/**` HTML files directly via Node.js `fs` and fails with a non-zero exit code when a marker, surface, schema, or metadata contract is violated.

Phase 7 has one task: extend three existing render check scripts so that every built route in `_site/` is covered. The gaps are pure additions — no existing checks need to be removed or modified. All 5 dossier routes exist as real pages in the site; all 8 service detail routes exist as real pages. The scripts simply do not yet reference them.

**Primary recommendation:** Add the 3 missing dossier routes to `phase3_render_checks.mjs` and `phase4_render_checks.mjs`, and add the 5 unchecked service routes to `phase5_render_checks.mjs serviceDetailRoutes`, then verify `./scripts/qa.sh` exits 0.

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| CASE-01 | Visitor can browse structured project proof that explains scope, stages, decisions, and outcomes rather than only viewing isolated images | 3 dossier routes (`apartment-system-renovation`, `wet-zone-control`, `controlled-handover`) are built and have full data contracts in `_data/case_studies.yml` — adding them to phase3/phase4 route matrices enforces that their dossier structure markers are present |
| CASE-04 | Visitor can understand why a featured project or proof block is relevant to their own renovation concerns | Phase 3 checks enforce `buyer-relevance` and `dossier-snapshot` markers on dossier routes — adding the 3 unchecked dossiers to those checks gates this requirement |
| SEO-02 | Visitor landing from search can find pages that match specific renovation intents | Phase 5 checks enforce canonical, hreflang, and distinct meta descriptions per service — adding all 5 unchecked service routes to `serviceDetailRoutes` and `checkedRoutes` catches regressions on those intent-specific pages |
| SEO-03 | Search engines can read richer business and page context through maintained metadata and structured data | Phase 5 checks enforce `@type: "Service"` schema on every route in `serviceDetailRoutes` — adding unchecked service routes enforces schema presence there |
</phase_requirements>

---

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Node.js ESM | project default | Render check runner | All existing scripts use `#!/usr/bin/env node` with `import` syntax |
| `node:fs` | built-in | Read `_site/**` HTML synchronously | Used in every existing phase check script |
| `node:path` | built-in | Resolve `_site` paths | Same pattern throughout |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| Ruby `yaml` + `json` (via `spawnSync`) | project default | Load YAML data files from Node scripts | Already used in `phase3_render_checks.mjs` for contract validation |

No new dependencies are needed. This phase is pure script extension within the established pattern.

**Installation:** None required.

---

## Architecture Patterns

### Render Check Script Pattern (established)

Every phase check script follows this structure:

```javascript
#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const repoRoot = process.cwd();
const siteRoot = path.join(repoRoot, "_site");

// Declarative route/check lists at top of file
const routeChecks = [ { route, lang, markers, surfaces }, ... ];

function fail(message) {
  console.error(`Phase N render checks failed: ${message}`);
  process.exit(1);
}

function readRoute(route) { /* path join + existsSync check */ }

// Named, single-purpose check functions
function ensureXxx(route, html) { ... }

// Main execution loop
for (const check of routeChecks) { ... }
console.log("Phase N render checks passed.");
```

Key conventions:
- `fail()` always calls `process.exit(1)` immediately
- Route arrays are **declarative** — checked in a loop, not individually
- Functions named `ensure*` or `check*`, one concern each
- `console.log("Phase N render checks passed.")` as the final line

### Route-to-file Convention
```javascript
function routeToFile(route) {
  const cleanRoute = route.replace(/^\/+/, "");
  if (!cleanRoute) return path.join(siteRoot, "index.html");
  return path.join(siteRoot, cleanRoute, "index.html");
}
```
This is duplicated across all scripts — it must be replicated, not imported, because these are standalone scripts with no shared module.

### Anti-Patterns to Avoid
- **Importing from other phase scripts:** Scripts are standalone. No shared module convention exists; don't introduce one.
- **Modifying existing check logic:** Phase 7 is additive only. Changing existing marker/surface assertions could break passing checks.
- **Adding routes without EN pairs:** Every dossier and bilingual service route requires both `uk` and `en` variants in the route matrix.

---

## Gap Analysis (HIGH confidence)

### phase3_render_checks.mjs — Dossier Route Coverage

Currently covered dossier routes:
- `/projects/compact-apartment-engineering/` (uk + en)
- `/projects/house-stage-coordination/` (uk + en)

Missing (3 dossiers × 2 locales = 6 route entries):
- `/projects/apartment-system-renovation/` + `/en/projects/apartment-system-renovation/`
- `/projects/wet-zone-control/` + `/en/projects/wet-zone-control/`
- `/projects/controlled-handover/` + `/en/projects/controlled-handover/`

Each missing dossier must be added to:
1. `routeChecks` array with `markers: requiredPhase3Markers` and `surfaces: ["case-study-dossier"]`
2. `metadataPairs` array as `["/projects/X/", "/en/projects/X/"]`

The `requiredPhase3Markers` constant is already defined:
```javascript
const requiredPhase3Markers = [
  "dossier-snapshot",
  "buyer-relevance",
  "stage-proof-timeline",
  "related-route-bridge",
  "proof-source-status"
];
```

### phase4_render_checks.mjs — Dossier Route Coverage

Currently covered dossier routes:
- `/projects/compact-apartment-engineering/` (uk + en)
- `/projects/house-stage-coordination/` (uk + en)

Missing (same 3 dossiers × 2 locales = 6 route entries):
- `/projects/apartment-system-renovation/` + `/en/projects/apartment-system-renovation/`
- `/projects/wet-zone-control/` + `/en/projects/wet-zone-control/`
- `/projects/controlled-handover/` + `/en/projects/controlled-handover/`

Each missing dossier must be added to:
1. `routeChecks` with `markers: ["premium-shell", "layout-parity", "scan-rhythm", "cta-stability"]` and `surfaces: ["premium-shell", "case-study-hero", "case-study-snapshot", "case-study-stage-map", "contact-shell", "sticky-phone-cta"]`
2. `parityPairs` array as `["/projects/X/", "/en/projects/X/"]`

### phase5_render_checks.mjs — Service Route Coverage

Currently in `checkedRoutes` (service subset):
- `/services/plumbing/` + `/en/services/plumbing/`
- `/services/apartment-renovation/` + `/en/services/apartment-renovation/`
- `/services/house-renovation/` + `/en/services/house-renovation/`

Currently in `serviceDetailRoutes`:
- Same 3 service pairs (6 routes total)

Currently in `bilingualPairs`:
- Same 3 service pairs

Missing services (5 × 2 locales = 10 route entries across the three arrays):
- `/services/electrical/` + `/en/services/electrical/`
- `/services/finishing/` + `/en/services/finishing/`
- `/services/rough-works/` + `/en/services/rough-works/`
- `/services/procurement/` + `/en/services/procurement/`
- `/services/site-supervision/` + `/en/services/site-supervision/`

Each missing service must be added to:
1. `checkedRoutes` array
2. `serviceDetailRoutes` array (triggers `@type: "Service"` schema check)
3. `bilingualPairs` array (triggers hreflang check)

Note: `electrical` is already in `phase3_render_checks.mjs` routeChecks for service-featured-case-studies surface, but it is not in `phase5_render_checks.mjs` — it needs to be added to phase5 independently.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Reading HTML from `_site` | Custom file-reading abstraction | The existing `readRoute`/`readHtml` pattern (copy-paste into script extensions) | All scripts are standalone; introducing shared modules adds build complexity without benefit |
| Schema detection | Regex HTML parser | Simple `html.includes('"@type": "Service"')` string search | Already established in phase5; string match is sufficient for JSON-LD in `<script>` blocks |

---

## Common Pitfalls

### Pitfall 1: Missing EN pair for a route
**What goes wrong:** Adding only the `uk` route to a check list causes the parity or hreflang check to fail, or silently leaves the EN route uncovered.
**Why it happens:** The routes are manually listed; easy to forget the `/en/` prefix.
**How to avoid:** For every route added, immediately add its counterpart. Add both to `metadataPairs`/`parityPairs` as a pair tuple at the same time.
**Warning signs:** A check script passes only the `uk` assertion; the `en` file is never opened.

### Pitfall 2: Wrong surface names for new dossier routes
**What goes wrong:** Adding a dossier route to `phase4_render_checks.mjs` with incorrect surface names causes false failures if the built page doesn't emit those specific `data-phase4-surface` values.
**Why it happens:** The surface names must match what the `case_study` layout actually emits.
**How to avoid:** Confirm the two existing dossier routes pass with the same surface list before applying to new entries. The Phase 4 surfaces for dossiers are: `["premium-shell", "case-study-hero", "case-study-snapshot", "case-study-stage-map", "contact-shell", "sticky-phone-cta"]`.

### Pitfall 3: `electrical` is already in phase3 but not phase5
**What goes wrong:** Assuming that because `electrical` appears in phase3 checks it is already covered everywhere. Phase 5's `serviceDetailRoutes` and `checkedRoutes` do not include it.
**Why it happens:** Coverage was added piecemeal as services were introduced across phases.
**How to avoid:** Add `electrical` (both locales) to all three phase5 arrays regardless of its presence in other scripts.

### Pitfall 4: Service routes not in `service_pages.yml` breaking `ensureCaseStudyRefs`
**What goes wrong:** phase3's `ensureCaseStudyRefs` checks `apartment-renovation`, `house-renovation`, `plumbing`, `electrical` against `service_pages.yml`. If new service keys were expected but not present, it would fail.
**Why it happens:** Phase 3 has a hard-coded list of 4 required service keys.
**How to avoid:** Phase 7 does not change `ensureCaseStudyRefs`. The phase5 additions are to `checkedRoutes`/`serviceDetailRoutes`/`bilingualPairs` only — no change to phase3's data contract checks.

---

## Code Examples

Verified patterns from existing scripts:

### Adding a dossier to phase3_render_checks.mjs routeChecks
```javascript
// Source: scripts/phase3_render_checks.mjs (existing pattern)
{ route: "/projects/apartment-system-renovation/", lang: "uk", markers: requiredPhase3Markers, surfaces: ["case-study-dossier"] },
{ route: "/en/projects/apartment-system-renovation/", lang: "en", markers: requiredPhase3Markers, surfaces: ["case-study-dossier"] },
```

### Adding a dossier to phase3 metadataPairs
```javascript
// Source: scripts/phase3_render_checks.mjs (existing pattern)
["/projects/apartment-system-renovation/", "/en/projects/apartment-system-renovation/"],
```

### Adding a dossier to phase4_render_checks.mjs routeChecks
```javascript
// Source: scripts/phase4_render_checks.mjs (existing pattern)
{
  route: "/projects/apartment-system-renovation/",
  lang: "uk",
  markers: ["premium-shell", "layout-parity", "scan-rhythm", "cta-stability"],
  surfaces: ["premium-shell", "case-study-hero", "case-study-snapshot", "case-study-stage-map", "contact-shell", "sticky-phone-cta"]
},
{
  route: "/en/projects/apartment-system-renovation/",
  lang: "en",
  markers: ["premium-shell", "layout-parity", "scan-rhythm", "cta-stability"],
  surfaces: ["premium-shell", "case-study-hero", "case-study-snapshot", "case-study-stage-map", "contact-shell", "sticky-phone-cta"]
},
```

### Adding a dossier to phase4 parityPairs
```javascript
// Source: scripts/phase4_render_checks.mjs (existing pattern)
["/projects/apartment-system-renovation/", "/en/projects/apartment-system-renovation/"],
```

### Adding a service to phase5_render_checks.mjs
```javascript
// Source: scripts/phase5_render_checks.mjs (existing pattern)

// In checkedRoutes:
"/services/electrical/",
"/en/services/electrical/",

// In serviceDetailRoutes:
"/services/electrical/",
"/en/services/electrical/",

// In bilingualPairs:
["/services/electrical/", "/en/services/electrical/"],
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Ad-hoc manual QA per phase | Additive render check pipeline (`qa.sh` → phase{N}_render_checks.mjs) | Phase 1 onwards | Every check that passes is a regression gate — extending coverage is purely additive |
| Only 2 of 5 dossiers checked | All 5 dossiers in check matrix | Phase 7 target | Silent regression on 3 dossiers becomes impossible |
| Only 3 of 8 services checked | All 8 services in check matrix | Phase 7 target | Service schema, canonical, and hreflang regressions on 5 services become detectable |

---

## Open Questions

1. **Do all 3 new dossier pages emit the exact `data-phase3-marker` and `data-phase4-surface` values required?**
   - What we know: The `case_study` layout is shared; the two existing dossiers emit these attributes and pass checks.
   - What's unclear: Whether the 3 new dossiers (added in Phase 3 but not verified by Phase 3 checks) were ever tested against the full marker set.
   - Recommendation: Run `node ./scripts/phase3_render_checks.mjs` and `node ./scripts/phase4_render_checks.mjs` after adding the new routes, before `qa.sh`. If they fail, the fix is in the page source or layout, not in the check script.

2. **Do all 5 new service pages emit `"@type": "Service"` JSON-LD?**
   - What we know: The `service_detail` layout is shared; the 3 existing checked services pass. All 5 unchecked services use `layout: service_detail`.
   - What's unclear: Whether the JSON-LD block was present before Phase 5 introduced schema.
   - Recommendation: Same as above — run the extended phase5 check in isolation first. If a service fails the schema check, the issue is in the service data or layout, not the check script.

---

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Custom Node.js ESM render check scripts (no test runner) |
| Config file | none — scripts are invoked directly |
| Quick run command | `node ./scripts/phase3_render_checks.mjs && node ./scripts/phase4_render_checks.mjs && node ./scripts/phase5_render_checks.mjs` |
| Full suite command | `./scripts/qa.sh` |

### Phase Requirements → Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| CASE-01 | All 5 dossier routes render with dossier-snapshot, buyer-relevance, stage-proof-timeline, related-route-bridge, proof-source-status markers | smoke (render check) | `node ./scripts/phase3_render_checks.mjs` | ✅ (needs route additions) |
| CASE-04 | All 5 dossier routes render with buyer-relevance marker and dossier structure attributes | smoke (render check) | `node ./scripts/phase3_render_checks.mjs` | ✅ (needs route additions) |
| SEO-02 | All 8 service routes have distinct canonical, hreflang pairs, and non-duplicate meta descriptions | smoke (render check) | `node ./scripts/phase5_render_checks.mjs` | ✅ (needs route additions) |
| SEO-03 | All 8 service routes emit `@type: "Service"` JSON-LD | smoke (render check) | `node ./scripts/phase5_render_checks.mjs` | ✅ (needs route additions) |

### Sampling Rate
- **Per task commit:** `node ./scripts/phase3_render_checks.mjs` or the specific script being extended
- **Per wave merge:** `./scripts/qa.sh`
- **Phase gate:** `./scripts/qa.sh` exits 0 before `/gsd:verify-work`

### Wave 0 Gaps
None — existing test infrastructure covers all phase requirements. The work is adding route entries to existing scripts, not creating new infrastructure.

---

## Sources

### Primary (HIGH confidence)
- Direct file inspection: `scripts/phase3_render_checks.mjs` — route matrix, marker requirements, metadataPairs structure
- Direct file inspection: `scripts/phase4_render_checks.mjs` — routeChecks, parityPairs, surface requirements for dossier routes
- Direct file inspection: `scripts/phase5_render_checks.mjs` — checkedRoutes, serviceDetailRoutes, bilingualPairs arrays
- Direct file inspection: `scripts/qa.sh` — pipeline order, all scripts invoked sequentially
- Direct file inspection: `_site/projects/` directory listing — confirms all 5 dossier routes are built
- Direct file inspection: `_site/services/` directory listing — confirms all 8 service routes are built
- Direct file inspection: `_data/case_studies.yml` — confirms all 5 dossiers have full data contracts (routes, stages, buyer_relevance, proof_source, gallery)
- Direct file inspection: `_data/service_pages.yml` — confirms all 8 service keys are present

### Secondary (MEDIUM confidence)
- Project decisions log (`.planning/STATE.md`) — confirms Phase 6 render check pattern and additive qa.sh wiring convention
- Phase 6 summary (`.planning/phases/06-identity-contact-and-navigation-completion/06-01-SUMMARY.md`) — confirms "Phase N render check pattern: standalone .mjs script with fail() helper, readHtml(), and named check functions — wired into qa.sh sequentially"

---

## Metadata

**Confidence breakdown:**
- Gap analysis (which routes are missing): HIGH — direct script + directory inspection
- Implementation pattern (how to add entries): HIGH — exact patterns visible in existing scripts
- Correctness of marker/surface names for new routes: MEDIUM — shared layout is used but new routes not yet run through checks
- No new infrastructure needed: HIGH — pure additive extension of declarative lists

**Research date:** 2026-03-15
**Valid until:** 2026-04-14 (stable pattern; valid as long as script structure is unchanged)
