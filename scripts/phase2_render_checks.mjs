#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const repoRoot = process.cwd();
const siteRoot = path.join(repoRoot, "_site");
const requiredLocales = ["uk", "en"];
const routeChecks = [
  { route: "/", lang: "uk", markers: ["content-depth", "fit-guidance", "faq-group-visibility"], surfaces: ["home-service-teaser", "home-process-teaser", "home-route-bridge"], keepTrust: true, keepCall: true },
  { route: "/services/", lang: "uk", markers: ["content-depth", "fit-guidance", "faq-group-visibility"], keepTrust: true, keepCall: true },
  { route: "/process/", lang: "uk", markers: ["content-depth", "objection-handling", "commercial-clarity", "fit-guidance", "faq-group-visibility"], surfaces: ["process-planning", "process-coordination", "process-readiness", "process-commercial-clarity", "process-objections", "process-procurement", "process-handoff", "process-route-bridges"], requireFaqKeys: true, keepTrust: true, keepCall: true },
  { route: "/faq/", lang: "uk", markers: ["faq-group-visibility"], surfaces: ["faq-reference-surface"], requireFaqKeys: true, keepTrust: false, keepCall: false },
  { route: "/services/plumbing/", lang: "uk", markers: ["content-depth", "objection-handling", "commercial-clarity", "fit-guidance", "faq-group-visibility"], surfaces: ["service-depth", "service-sequence", "service-commercial-clarity", "service-route-bridge"], requireFaqKeys: true, keepTrust: true, keepCall: true },
  { route: "/services/electrical/", lang: "uk", markers: ["content-depth", "objection-handling", "commercial-clarity", "fit-guidance", "faq-group-visibility"], surfaces: ["service-depth", "service-sequence", "service-commercial-clarity", "service-route-bridge"], requireFaqKeys: true, keepTrust: true, keepCall: true },
  { route: "/services/apartment-renovation/", lang: "uk", markers: ["content-depth", "objection-handling", "commercial-clarity", "fit-guidance", "faq-group-visibility"], surfaces: ["service-depth", "service-property-fit", "service-sequence", "service-commercial-clarity", "service-route-bridge"], requireFaqKeys: true, keepTrust: true, keepCall: true },
  { route: "/services/house-renovation/", lang: "uk", markers: ["content-depth", "objection-handling", "commercial-clarity", "fit-guidance", "faq-group-visibility"], surfaces: ["service-depth", "service-property-fit", "service-sequence", "service-commercial-clarity", "service-route-bridge"], requireFaqKeys: true, keepTrust: true, keepCall: true },
  { route: "/en/", lang: "en", markers: ["content-depth", "fit-guidance", "faq-group-visibility"], surfaces: ["home-service-teaser", "home-process-teaser", "home-route-bridge"], keepTrust: true, keepCall: true },
  { route: "/en/services/", lang: "en", markers: ["content-depth", "fit-guidance", "faq-group-visibility"], keepTrust: true, keepCall: true },
  { route: "/en/process/", lang: "en", markers: ["content-depth", "objection-handling", "commercial-clarity", "fit-guidance", "faq-group-visibility"], surfaces: ["process-planning", "process-coordination", "process-readiness", "process-commercial-clarity", "process-objections", "process-procurement", "process-handoff", "process-route-bridges"], requireFaqKeys: true, keepTrust: true, keepCall: true },
  { route: "/en/faq/", lang: "en", markers: ["faq-group-visibility"], surfaces: ["faq-reference-surface"], requireFaqKeys: true, keepTrust: false, keepCall: false },
  { route: "/en/services/plumbing/", lang: "en", markers: ["content-depth", "objection-handling", "commercial-clarity", "fit-guidance", "faq-group-visibility"], surfaces: ["service-depth", "service-sequence", "service-commercial-clarity", "service-route-bridge"], requireFaqKeys: true, keepTrust: true, keepCall: true },
  { route: "/en/services/electrical/", lang: "en", markers: ["content-depth", "objection-handling", "commercial-clarity", "fit-guidance", "faq-group-visibility"], surfaces: ["service-depth", "service-sequence", "service-commercial-clarity", "service-route-bridge"], requireFaqKeys: true, keepTrust: true, keepCall: true },
  { route: "/en/services/apartment-renovation/", lang: "en", markers: ["content-depth", "objection-handling", "commercial-clarity", "fit-guidance", "faq-group-visibility"], surfaces: ["service-depth", "service-property-fit", "service-sequence", "service-commercial-clarity", "service-route-bridge"], requireFaqKeys: true, keepTrust: true, keepCall: true },
  { route: "/en/services/house-renovation/", lang: "en", markers: ["content-depth", "objection-handling", "commercial-clarity", "fit-guidance", "faq-group-visibility"], surfaces: ["service-depth", "service-property-fit", "service-sequence", "service-commercial-clarity", "service-route-bridge"], requireFaqKeys: true, keepTrust: true, keepCall: true }
];
const metadataPairs = [
  ["/", "/en/"],
  ["/services/", "/en/services/"],
  ["/process/", "/en/process/"],
  ["/faq/", "/en/faq/"],
  ["/services/plumbing/", "/en/services/plumbing/"],
  ["/services/electrical/", "/en/services/electrical/"],
  ["/services/apartment-renovation/", "/en/services/apartment-renovation/"],
  ["/services/house-renovation/", "/en/services/house-renovation/"]
];
const faqRoutes = ["/faq/", "/en/faq/"];

function fail(message) {
  console.error(`Phase 2 render checks failed: ${message}`);
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

function countMatches(html, regex) {
  const matches = html.match(regex);
  return matches ? matches.length : 0;
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
    if (!html.includes(`data-phase2-marker="${marker}"`)) {
      fail(`${route} is missing the Phase 2 marker ${marker}`);
    }
  }
}

function ensureSurfaces(route, html, surfaces = []) {
  for (const surface of surfaces) {
    if (!html.includes(`data-phase2-surface="${surface}"`)) {
      fail(`${route} is missing the Phase 2 surface ${surface}`);
    }
  }
}

function ensurePhase1Surfaces(route, html, checkTrust, checkCall) {
  if (checkTrust && !html.includes("trust-strip")) {
    fail(`${route} lost the Phase 1 trust strip surface`);
  }
  if (checkCall && !html.includes("call-expectations")) {
    fail(`${route} lost the Phase 1 call expectations surface`);
  }
}

function ensureFaqGrouping(route, html) {
  if (countMatches(html, /data-faq-group=/g) < 2) {
    fail(`${route} should render at least two FAQ groups`);
  }
}

function ensureFaqKeyBinding(route, html) {
  if (countMatches(html, /data-faq-key=/g) < 2) {
    fail(`${route} should render shared FAQ-key bindings`);
  }
}

function ensureLocaleBranch(data, filePath) {
  if (!Array.isArray(data.required_locales)) {
    fail(`${filePath} must declare required_locales`);
  }

  for (const locale of requiredLocales) {
    if (!data.required_locales.includes(locale)) {
      fail(`${filePath} is missing ${locale} in required_locales`);
    }
  }
}

function ensureServiceContracts(data) {
  const requiredKeys = ["plumbing", "electrical", "apartment-renovation", "house-renovation"];

  for (const serviceKey of requiredKeys) {
    const item = data.items?.[serviceKey];
    if (!item) {
      fail(`_data/service_pages.yml is missing ${serviceKey}`);
    }

    for (const locale of requiredLocales) {
      const branch = item[locale];
      if (!branch) {
        fail(`service_pages.${serviceKey}.${locale} is missing`);
      }

      for (const key of ["overview", "outcomes", "fit_boundaries", "objection_cards", "coordination_notes", "commercial_clarity", "faq_refs"]) {
        if (!branch[key]) {
          fail(`service_pages.${serviceKey}.${locale}.${key} is required for Phase 2 priority routes`);
        }
      }
    }
  }
}

function ensureProcessContracts(data) {
  for (const key of ["planning", "procurement", "handoff", "objection_cards", "commercial_clarity"]) {
    const branch = data[key];
    if (!branch || !branch.uk || !branch.en) {
      fail(`process_page.${key} must contain uk and en branches`);
    }
  }
}

function ensureFaqContracts(data) {
  if (!Array.isArray(data.groups) || data.groups.length < 2) {
    fail("_data/faqs.yml must define grouped FAQ clusters");
  }

  for (const group of data.groups) {
    if (!group.key) {
      fail("every FAQ group requires a stable key");
    }
    for (const locale of requiredLocales) {
      if (!group[locale]?.title) {
        fail(`faq group ${group.key} is missing ${locale}.title`);
      }
    }
    if (!Array.isArray(group.items) || group.items.length === 0) {
      fail(`faq group ${group.key} must contain items`);
    }
    for (const item of group.items) {
      if (!item.key) {
        fail(`faq group ${group.key} contains an item without a stable key`);
      }
      for (const locale of requiredLocales) {
        if (!item[locale]?.question || !item[locale]?.answer) {
          fail(`faq item ${item.key} in ${group.key} is missing ${locale} question/answer`);
        }
      }
    }
  }
}

for (const check of routeChecks) {
  const html = readRoute(check.route);
  ensureLanguageMetadata(check.route, html, check.lang);
  ensureMarkers(check.route, html, check.markers);
  ensureSurfaces(check.route, html, check.surfaces);
  if (check.requireFaqKeys) {
    ensureFaqKeyBinding(check.route, html);
  }
  ensurePhase1Surfaces(check.route, html, check.keepTrust, check.keepCall);
}

for (const route of faqRoutes) {
  ensureFaqGrouping(route, readRoute(route));
}

for (const [uaRoute, enRoute] of metadataPairs) {
  const uaHtml = readRoute(uaRoute);
  const enHtml = readRoute(enRoute);

  ensureAlternates(uaRoute, uaHtml, uaRoute, enRoute);
  ensureAlternates(enRoute, enHtml, uaRoute, enRoute);
  ensureLanguageSwitcher(uaRoute, uaHtml, uaRoute, enRoute);
  ensureLanguageSwitcher(enRoute, enHtml, uaRoute, enRoute);
}

const servicePages = readYamlAsJson(path.join(repoRoot, "_data/service_pages.yml"));
const processPage = readYamlAsJson(path.join(repoRoot, "_data/process_page.yml"));
const faqs = readYamlAsJson(path.join(repoRoot, "_data/faqs.yml"));

ensureLocaleBranch(servicePages, "_data/service_pages.yml");
ensureLocaleBranch(processPage, "_data/process_page.yml");
ensureLocaleBranch(faqs, "_data/faqs.yml");
ensureServiceContracts(servicePages);
ensureProcessContracts(processPage);
ensureFaqContracts(faqs);

console.log("Phase 2 render checks passed.");
