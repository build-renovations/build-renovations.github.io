#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const repoRoot = process.cwd();
const siteRoot = path.join(repoRoot, "_site");
const requiredLocales = ["uk", "en"];
const requiredPhase3Markers = [
  "dossier-snapshot",
  "buyer-relevance",
  "stage-proof-timeline",
  "related-route-bridge",
  "proof-source-status"
];
const routeChecks = [
  { route: "/", lang: "uk", markers: ["project-index-visibility", "related-route-bridge"], surfaces: ["home-featured-case-studies"] },
  { route: "/process/", lang: "uk", markers: ["project-index-visibility", "related-route-bridge"], surfaces: ["process-featured-case-studies"] },
  { route: "/services/plumbing/", lang: "uk", markers: ["project-index-visibility", "related-route-bridge"], surfaces: ["service-featured-case-studies"] },
  { route: "/services/electrical/", lang: "uk", markers: ["project-index-visibility", "related-route-bridge"], surfaces: ["service-featured-case-studies"] },
  { route: "/services/apartment-renovation/", lang: "uk", markers: ["project-index-visibility", "related-route-bridge"], surfaces: ["service-featured-case-studies"] },
  { route: "/projects/", lang: "uk", markers: ["project-index-visibility"], surfaces: ["projects-index-featured"] },
  { route: "/projects/compact-apartment-engineering/", lang: "uk", markers: requiredPhase3Markers, surfaces: ["case-study-dossier"] },
  { route: "/projects/house-stage-coordination/", lang: "uk", markers: requiredPhase3Markers, surfaces: ["case-study-dossier"] },
  { route: "/en/", lang: "en", markers: ["project-index-visibility", "related-route-bridge"], surfaces: ["home-featured-case-studies"] },
  { route: "/en/process/", lang: "en", markers: ["project-index-visibility", "related-route-bridge"], surfaces: ["process-featured-case-studies"] },
  { route: "/en/services/plumbing/", lang: "en", markers: ["project-index-visibility", "related-route-bridge"], surfaces: ["service-featured-case-studies"] },
  { route: "/en/services/electrical/", lang: "en", markers: ["project-index-visibility", "related-route-bridge"], surfaces: ["service-featured-case-studies"] },
  { route: "/en/services/apartment-renovation/", lang: "en", markers: ["project-index-visibility", "related-route-bridge"], surfaces: ["service-featured-case-studies"] },
  { route: "/en/projects/", lang: "en", markers: ["project-index-visibility"], surfaces: ["projects-index-featured"] },
  { route: "/en/projects/compact-apartment-engineering/", lang: "en", markers: requiredPhase3Markers, surfaces: ["case-study-dossier"] },
  { route: "/en/projects/house-stage-coordination/", lang: "en", markers: requiredPhase3Markers, surfaces: ["case-study-dossier"] }
];
const metadataPairs = [
  ["/projects/", "/en/projects/"],
  ["/projects/compact-apartment-engineering/", "/en/projects/compact-apartment-engineering/"],
  ["/projects/house-stage-coordination/", "/en/projects/house-stage-coordination/"]
];

function fail(message) {
  console.error(`Phase 3 render checks failed: ${message}`);
  process.exit(1);
}

function routeToFile(route) {
  const cleanRoute = route.replace(/^\/+/, "");
  if (!cleanRoute) {
    return path.join(siteRoot, "index.html");
  }
  return path.join(siteRoot, cleanRoute, "index.html");
}

function readRoute(route) {
  const filePath = routeToFile(route);
  if (!fs.existsSync(filePath)) {
    fail(`missing built route ${route}`);
  }
  return fs.readFileSync(filePath, "utf8");
}

function normalizePathname(href) {
  return href
    .replace(/^https?:\/\/[^/]+/i, "")
    .replace(/\/index\.html$/i, "/")
    .replace(/([^/])$/, "$1/");
}

function readYamlAsJson(filePath) {
  const rubyScript = `
    require "yaml"
    require "json"
    data = YAML.load_file(ARGV[0])
    puts JSON.generate(data)
  `;
  const result = spawnSync("ruby", ["-e", rubyScript, filePath], {
    cwd: repoRoot,
    encoding: "utf8"
  });

  if (result.status !== 0) {
    fail(`could not load YAML from ${path.relative(repoRoot, filePath)}: ${result.stderr.trim()}`);
  }

  return JSON.parse(result.stdout);
}

function ensureLanguageMetadata(route, html, expectedLang) {
  const htmlLangMatch = html.match(/<html[^>]*lang="([^"]+)"/i);
  if (!htmlLangMatch || htmlLangMatch[1] !== expectedLang) {
    fail(`${route} is missing the expected html lang="${expectedLang}" attribute`);
  }

  const canonicalMatch = html.match(/<link rel="canonical" href="([^"]+)"/i);
  if (!canonicalMatch) {
    fail(`${route} is missing a canonical tag`);
  }

  const canonicalPath = normalizePathname(canonicalMatch[1]);
  if (canonicalPath !== route) {
    fail(`${route} canonical points to ${canonicalPath}`);
  }
}

function ensureLanguageSwitcher(route, html, expectedUa, expectedEn) {
  const switcherMatch = html.match(/<div class="language-switcher"[\s\S]*?<\/div>/i);
  if (!switcherMatch) {
    fail(`${route} is missing the language switcher`);
  }

  const links = [...switcherMatch[0].matchAll(/<a[^>]*href="([^"]+)"[^>]*>/gi)].map((match) => normalizePathname(match[1]));
  if (!links.includes(expectedUa)) {
    fail(`${route} language switcher is missing the Ukrainian route ${expectedUa}`);
  }
  if (!links.includes(expectedEn)) {
    fail(`${route} language switcher is missing the English route ${expectedEn}`);
  }
}

function ensureAlternates(route, html, expectedUa, expectedEn) {
  const alternates = [...html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/gi)].map((match) => ({
    hreflang: match[1],
    href: normalizePathname(match[2])
  }));

  const ukAlt = alternates.find((entry) => entry.hreflang === "uk");
  const enAlt = alternates.find((entry) => entry.hreflang === "en");
  const xDefault = alternates.find((entry) => entry.hreflang === "x-default");

  if (!ukAlt || ukAlt.href !== expectedUa) {
    fail(`${route} is missing hreflang="uk" for ${expectedUa}`);
  }
  if (!enAlt || enAlt.href !== expectedEn) {
    fail(`${route} is missing hreflang="en" for ${expectedEn}`);
  }
  if (!xDefault || xDefault.href !== expectedUa) {
    fail(`${route} must point x-default to ${expectedUa}`);
  }
}

function ensureMarkers(route, html, markers) {
  for (const marker of markers) {
    if (!html.includes(`data-phase3-marker="${marker}"`)) {
      fail(`${route} is missing the Phase 3 marker ${marker}`);
    }
  }
}

function ensureSurfaces(route, html, surfaces = []) {
  for (const surface of surfaces) {
    if (!html.includes(`data-phase3-surface="${surface}"`)) {
      fail(`${route} is missing the Phase 3 surface ${surface}`);
    }
  }
}

function ensureCardLinks(route, html) {
  if (!html.includes("data-case-study-card")) {
    fail(`${route} should render at least one case-study card`);
  }
  if (!html.includes('href="/projects/') && !html.includes('href="/en/projects/')) {
    fail(`${route} should link to dossier routes`);
  }
}

function ensureDossierStructure(route, html) {
  for (const attr of [
    "data-case-study-stage",
    "data-case-study-proof-status",
    "data-case-study-buyer-relevance",
    "data-case-study-related-route"
  ]) {
    if (!html.includes(attr)) {
      fail(`${route} is missing dossier structure marker ${attr}`);
    }
  }
}

function ensureCaseStudyContracts(data) {
  if (!Array.isArray(data.required_locales)) {
    fail("_data/case_studies.yml must declare required_locales");
  }

  for (const locale of requiredLocales) {
    if (!data.required_locales.includes(locale)) {
      fail(`_data/case_studies.yml is missing ${locale} in required_locales`);
    }
  }

  if (!data.schema?.statuses || !data.schema?.proof_source_types || !data.schema?.stage_types) {
    fail("_data/case_studies.yml must declare statuses, proof_source_types, and stage_types");
  }

  const entries = data.items || {};
  for (const [key, item] of Object.entries(entries)) {
    if (!item.route || !item.route.uk || !item.route.en) {
      fail(`case study ${key} must declare bilingual routes`);
    }
    if (!Array.isArray(item.related_services) || item.related_services.length === 0) {
      fail(`case study ${key} must declare related services`);
    }
    if (!Array.isArray(item.related_property_types) || item.related_property_types.length === 0) {
      fail(`case study ${key} must declare related property types`);
    }
    if (!Array.isArray(item.stages) || item.stages.length < 2) {
      fail(`case study ${key} must declare at least two project stages`);
    }
    if (!Array.isArray(item.gallery) || item.gallery.length < 2) {
      fail(`case study ${key} must include gallery assets`);
    }
    if (!item.proof_source || !item.proof_source.type || !item.proof_source.status) {
      fail(`case study ${key} must define proof_source status and type`);
    }
    if (!item.buyer_relevance || !item.buyer_relevance.uk?.title || !item.buyer_relevance.en?.title) {
      fail(`case study ${key} must define bilingual buyer relevance`);
    }
  }
}

function ensureCaseStudyRefs(data, filePath, dataKeys) {
  const items = data.items || {};
  const requiredItemKeys = ["apartment-renovation", "house-renovation", "plumbing", "electrical"];
  for (const itemKey of requiredItemKeys) {
    const item = items[itemKey];
    if (!item) {
      fail(`${filePath}:${itemKey} is missing`);
    }
    if (!Array.isArray(item.case_study_refs) || item.case_study_refs.length === 0) {
      fail(`${filePath}:${itemKey} must define case_study_refs`);
    }
    if (!item.case_study_bridge || !item.case_study_bridge.uk?.title || !item.case_study_bridge.en?.title) {
      fail(`${filePath}:${itemKey} must define bilingual case_study_bridge copy`);
    }
    for (const ref of item.case_study_refs) {
      if (!dataKeys.has(ref)) {
        fail(`${filePath}:${itemKey} references missing case study ${ref}`);
      }
    }
  }
}

function ensureProcessCaseStudyRefs(data, dataKeys) {
  if (!Array.isArray(data.case_study_refs) || data.case_study_refs.length === 0) {
    fail("_data/process_page.yml must define case_study_refs");
  }
  if (!data.case_study_bridge || !data.case_study_bridge.uk?.title || !data.case_study_bridge.en?.title) {
    fail("_data/process_page.yml must define bilingual case_study_bridge copy");
  }
  for (const ref of data.case_study_refs) {
    if (!dataKeys.has(ref)) {
      fail(`_data/process_page.yml references missing case study ${ref}`);
    }
  }
}

function ensureTrustProofPolicy(data) {
  for (const locale of requiredLocales) {
    const branch = data[locale];
    if (!branch?.proof?.items || !Array.isArray(branch.proof.items)) {
      fail(`trust_foundation.${locale}.proof.items must exist`);
    }
    for (const item of branch.proof.items) {
      if (!item.proof_source_status || !item.proof_source_label) {
        fail(`trust_foundation.${locale}.proof.items.${item.key} must declare proof_source_status and proof_source_label`);
      }
    }
  }
}

for (const check of routeChecks) {
  const html = readRoute(check.route);
  ensureLanguageMetadata(check.route, html, check.lang);
  ensureMarkers(check.route, html, check.markers);
  ensureSurfaces(check.route, html, check.surfaces);
  ensureCardLinks(check.route, html);
  if (check.surfaces.includes("case-study-dossier")) {
    ensureDossierStructure(check.route, html);
  }
}

for (const [uaRoute, enRoute] of metadataPairs) {
  ensureLanguageSwitcher(uaRoute, readRoute(uaRoute), uaRoute, enRoute);
  ensureLanguageSwitcher(enRoute, readRoute(enRoute), uaRoute, enRoute);
  ensureAlternates(uaRoute, readRoute(uaRoute), uaRoute, enRoute);
  ensureAlternates(enRoute, readRoute(enRoute), uaRoute, enRoute);
}

const caseStudies = readYamlAsJson(path.join(repoRoot, "_data/case_studies.yml"));
const servicePages = readYamlAsJson(path.join(repoRoot, "_data/service_pages.yml"));
const processPage = readYamlAsJson(path.join(repoRoot, "_data/process_page.yml"));
const trustFoundation = readYamlAsJson(path.join(repoRoot, "_data/trust_foundation.yml"));
const caseStudyKeys = new Set(Object.keys(caseStudies.items || {}));

ensureCaseStudyContracts(caseStudies);
ensureCaseStudyRefs(servicePages, "_data/service_pages.yml", caseStudyKeys);
ensureProcessCaseStudyRefs(processPage, caseStudyKeys);
ensureTrustProofPolicy(trustFoundation);

console.log("Phase 3 render checks passed.");
