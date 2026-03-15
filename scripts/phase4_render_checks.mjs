#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const repoRoot = process.cwd();
const siteRoot = path.join(repoRoot, "_site");
const routeChecks = [
  {
    route: "/",
    lang: "uk",
    markers: ["premium-shell", "layout-parity", "scan-rhythm", "cta-stability"],
    surfaces: ["premium-shell", "home-hero", "home-service-teaser", "home-process-teaser", "home-route-bridge", "contact-shell", "sticky-phone-cta"]
  },
  {
    route: "/process/",
    lang: "uk",
    markers: ["premium-shell", "layout-parity", "scan-rhythm", "cta-stability"],
    surfaces: ["premium-shell", "process-hero", "process-planning", "process-stage-map", "process-route-bridges", "contact-shell", "sticky-phone-cta"]
  },
  {
    route: "/services/plumbing/",
    lang: "uk",
    markers: ["premium-shell", "layout-parity", "scan-rhythm", "cta-stability"],
    surfaces: ["premium-shell", "service-hero", "service-depth", "service-sequence", "service-route-bridge", "contact-shell", "sticky-phone-cta"]
  },
  {
    route: "/services/apartment-renovation/",
    lang: "uk",
    markers: ["premium-shell", "layout-parity", "scan-rhythm", "cta-stability"],
    surfaces: ["premium-shell", "service-hero", "service-depth", "service-property-fit", "service-route-bridge", "contact-shell", "sticky-phone-cta"]
  },
  {
    route: "/projects/",
    lang: "uk",
    markers: ["premium-shell", "cta-stability"],
    surfaces: ["premium-shell", "contact-shell", "sticky-phone-cta"]
  },
  {
    route: "/projects/compact-apartment-engineering/",
    lang: "uk",
    markers: ["premium-shell", "layout-parity", "scan-rhythm", "cta-stability"],
    surfaces: ["premium-shell", "case-study-hero", "case-study-snapshot", "case-study-stage-map", "contact-shell", "sticky-phone-cta"]
  },
  {
    route: "/projects/house-stage-coordination/",
    lang: "uk",
    markers: ["premium-shell", "layout-parity", "scan-rhythm", "cta-stability"],
    surfaces: ["premium-shell", "case-study-hero", "case-study-snapshot", "case-study-stage-map", "contact-shell", "sticky-phone-cta"]
  },
  {
    route: "/en/",
    lang: "en",
    markers: ["premium-shell", "layout-parity", "scan-rhythm", "cta-stability"],
    surfaces: ["premium-shell", "home-hero", "home-service-teaser", "home-process-teaser", "home-route-bridge", "contact-shell", "sticky-phone-cta"]
  },
  {
    route: "/en/process/",
    lang: "en",
    markers: ["premium-shell", "layout-parity", "scan-rhythm", "cta-stability"],
    surfaces: ["premium-shell", "process-hero", "process-planning", "process-stage-map", "process-route-bridges", "contact-shell", "sticky-phone-cta"]
  },
  {
    route: "/en/services/plumbing/",
    lang: "en",
    markers: ["premium-shell", "layout-parity", "scan-rhythm", "cta-stability"],
    surfaces: ["premium-shell", "service-hero", "service-depth", "service-sequence", "service-route-bridge", "contact-shell", "sticky-phone-cta"]
  },
  {
    route: "/en/services/apartment-renovation/",
    lang: "en",
    markers: ["premium-shell", "layout-parity", "scan-rhythm", "cta-stability"],
    surfaces: ["premium-shell", "service-hero", "service-depth", "service-property-fit", "service-route-bridge", "contact-shell", "sticky-phone-cta"]
  },
  {
    route: "/en/projects/",
    lang: "en",
    markers: ["premium-shell", "cta-stability"],
    surfaces: ["premium-shell", "contact-shell", "sticky-phone-cta"]
  },
  {
    route: "/en/projects/compact-apartment-engineering/",
    lang: "en",
    markers: ["premium-shell", "layout-parity", "scan-rhythm", "cta-stability"],
    surfaces: ["premium-shell", "case-study-hero", "case-study-snapshot", "case-study-stage-map", "contact-shell", "sticky-phone-cta"]
  },
  {
    route: "/en/projects/house-stage-coordination/",
    lang: "en",
    markers: ["premium-shell", "layout-parity", "scan-rhythm", "cta-stability"],
    surfaces: ["premium-shell", "case-study-hero", "case-study-snapshot", "case-study-stage-map", "contact-shell", "sticky-phone-cta"]
  },
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
  {
    route: "/projects/wet-zone-control/",
    lang: "uk",
    markers: ["premium-shell", "layout-parity", "scan-rhythm", "cta-stability"],
    surfaces: ["premium-shell", "case-study-hero", "case-study-snapshot", "case-study-stage-map", "contact-shell", "sticky-phone-cta"]
  },
  {
    route: "/en/projects/wet-zone-control/",
    lang: "en",
    markers: ["premium-shell", "layout-parity", "scan-rhythm", "cta-stability"],
    surfaces: ["premium-shell", "case-study-hero", "case-study-snapshot", "case-study-stage-map", "contact-shell", "sticky-phone-cta"]
  },
  {
    route: "/projects/controlled-handover/",
    lang: "uk",
    markers: ["premium-shell", "layout-parity", "scan-rhythm", "cta-stability"],
    surfaces: ["premium-shell", "case-study-hero", "case-study-snapshot", "case-study-stage-map", "contact-shell", "sticky-phone-cta"]
  },
  {
    route: "/en/projects/controlled-handover/",
    lang: "en",
    markers: ["premium-shell", "layout-parity", "scan-rhythm", "cta-stability"],
    surfaces: ["premium-shell", "case-study-hero", "case-study-snapshot", "case-study-stage-map", "contact-shell", "sticky-phone-cta"]
  },
];
const parityPairs = [
  ["/", "/en/"],
  ["/process/", "/en/process/"],
  ["/services/plumbing/", "/en/services/plumbing/"],
  ["/services/apartment-renovation/", "/en/services/apartment-renovation/"],
  ["/projects/", "/en/projects/"],
  ["/projects/compact-apartment-engineering/", "/en/projects/compact-apartment-engineering/"],
  ["/projects/house-stage-coordination/", "/en/projects/house-stage-coordination/"],
  ["/projects/apartment-system-renovation/", "/en/projects/apartment-system-renovation/"],
  ["/projects/wet-zone-control/", "/en/projects/wet-zone-control/"],
  ["/projects/controlled-handover/", "/en/projects/controlled-handover/"],
];

function fail(message) {
  console.error(`Phase 4 render checks failed: ${message}`);
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

function hasVisibleTelLink(html) {
  const telLinkPattern = /<a\b[^>]*href="tel:[^"]+"[^>]*>([\s\S]*?)<\/a>/gi;
  let match;
  while ((match = telLinkPattern.exec(html)) !== null) {
    const attrs = match[0];
    const text = match[1]
      .replace(/<[^>]+>/g, " ")
      .replace(/&nbsp;/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    if (!/aria-hidden="true"/.test(attrs) && text.length > 0) {
      return true;
    }
  }
  return false;
}

function ensureLanguageMetadata(route, html, expectedLang) {
  const htmlLangMatch = html.match(/<html[^>]*lang="([^"]+)"/i);
  if (!htmlLangMatch || htmlLangMatch[1] !== expectedLang) {
    fail(`${route} is missing the expected html lang="${expectedLang}" attribute`);
  }

  const bodyMatch = html.match(/<body[^>]*data-phase4-lang="([^"]+)"/i);
  if (!bodyMatch || bodyMatch[1] !== expectedLang) {
    fail(`${route} is missing data-phase4-lang="${expectedLang}" on the body`);
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

function ensureMarkers(route, html, markers) {
  for (const marker of markers) {
    if (!html.includes(`data-phase4-marker="${marker}"`)) {
      fail(`${route} is missing the Phase 4 marker ${marker}`);
    }
  }
}

function ensureSurfaces(route, html, surfaces) {
  for (const surface of surfaces) {
    if (!html.includes(`data-phase4-surface="${surface}"`)) {
      fail(`${route} is missing the Phase 4 surface ${surface}`);
    }
  }
}

function ensureStickyCta(route, html) {
  if (!html.includes("data-sticky-phone-cta")) {
    fail(`${route} is missing the sticky phone CTA shell`);
  }
  if (!html.includes('data-phase4-surface="sticky-phone-cta"')) {
    fail(`${route} is missing the Phase 4 sticky CTA surface`);
  }
}

function ensurePrimaryCta(route, html) {
  if (!hasVisibleTelLink(html)) {
    fail(`${route} does not render a visible tel: link`);
  }
  if (!html.includes("button--primary")) {
    fail(`${route} is missing the primary CTA button styling`);
  }
}

function collectPhase4Surfaces(html) {
  return new Set([...html.matchAll(/data-phase4-surface="([^"]+)"/g)].map((match) => match[1]));
}

function ensureParity(uaRoute, enRoute) {
  const uaSurfaces = [...collectPhase4Surfaces(readRoute(uaRoute))].sort();
  const enSurfaces = [...collectPhase4Surfaces(readRoute(enRoute))].sort();

  if (uaSurfaces.length !== enSurfaces.length) {
    fail(`surface parity mismatch between ${uaRoute} and ${enRoute}`);
  }

  for (let index = 0; index < uaSurfaces.length; index += 1) {
    if (uaSurfaces[index] !== enSurfaces[index]) {
      fail(`surface parity mismatch between ${uaRoute} and ${enRoute}: ${uaSurfaces[index]} vs ${enSurfaces[index]}`);
    }
  }
}

function main() {
  if (!fs.existsSync(siteRoot)) {
    fail("missing _site build output");
  }

  for (const check of routeChecks) {
    const html = readRoute(check.route);
    const expectedUa = check.lang === "en" ? check.route.replace(/^\/en/, "") : check.route;
    const expectedEn = check.lang === "en" ? check.route : `/en${check.route === "/" ? "/" : check.route}`;

    ensureLanguageMetadata(check.route, html, check.lang);
    ensureLanguageSwitcher(check.route, html, expectedUa, expectedEn);
    ensureMarkers(check.route, html, check.markers);
    ensureSurfaces(check.route, html, check.surfaces);
    ensureStickyCta(check.route, html);
    ensurePrimaryCta(check.route, html);
  }

  for (const [uaRoute, enRoute] of parityPairs) {
    ensureParity(uaRoute, enRoute);
  }

  console.log("Phase 4 render checks passed.");
}

main();
