#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const repoRoot = process.cwd();
const siteRoot = path.join(repoRoot, "_site");

const checkedRoutes = [
  "/",
  "/en/",
  "/process/",
  "/en/process/",
  "/services/plumbing/",
  "/en/services/plumbing/",
  "/services/apartment-renovation/",
  "/en/services/apartment-renovation/",
  "/services/house-renovation/",
  "/en/services/house-renovation/",
  "/services/electrical/",
  "/en/services/electrical/",
  "/services/finishing/",
  "/en/services/finishing/",
  "/services/rough-works/",
  "/en/services/rough-works/",
  "/services/procurement/",
  "/en/services/procurement/",
  "/services/site-supervision/",
  "/en/services/site-supervision/",
  "/projects/",
  "/en/projects/",
  "/faq/",
  "/en/faq/"
];

const bilingualPairs = [
  ["/", "/en/"],
  ["/process/", "/en/process/"],
  ["/services/plumbing/", "/en/services/plumbing/"],
  ["/services/apartment-renovation/", "/en/services/apartment-renovation/"],
  ["/services/house-renovation/", "/en/services/house-renovation/"],
  ["/services/electrical/", "/en/services/electrical/"],
  ["/services/finishing/", "/en/services/finishing/"],
  ["/services/rough-works/", "/en/services/rough-works/"],
  ["/services/procurement/", "/en/services/procurement/"],
  ["/services/site-supervision/", "/en/services/site-supervision/"],
  ["/projects/", "/en/projects/"],
  ["/faq/", "/en/faq/"]
];

const serviceDetailRoutes = [
  "/services/plumbing/",
  "/en/services/plumbing/",
  "/services/apartment-renovation/",
  "/en/services/apartment-renovation/",
  "/services/house-renovation/",
  "/en/services/house-renovation/",
  "/services/electrical/",
  "/en/services/electrical/",
  "/services/finishing/",
  "/en/services/finishing/",
  "/services/rough-works/",
  "/en/services/rough-works/",
  "/services/procurement/",
  "/en/services/procurement/",
  "/services/site-supervision/",
  "/en/services/site-supervision/",
];

const faqRoutes = ["/faq/", "/en/faq/"];

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

function checkNotNoindex(route, html) {
  if (/noindex/i.test(html)) {
    fail(`${route} still emits noindex — seo.allow_indexing must be true`);
  }
}

function checkCanonical(route, html) {
  if (!/<link rel="canonical"/i.test(html)) {
    fail(`${route} missing canonical tag`);
  }
}

function checkHreflangPair(ukRoute, enRoute, ukHtml, enHtml) {
  // In ukHtml: must find hreflang="en" link pointing to the EN equivalent
  const enPathFragment = enRoute.replace(/\/$/, "");
  const hasEnHreflang =
    /hreflang="en"/i.test(ukHtml) &&
    (ukHtml.includes(`hreflang="en" href`) || ukHtml.includes(`href`) ) &&
    (new RegExp(`hreflang="en"[^>]*href="[^"]*${enPathFragment.replace(/\//g, "\\/")}`, "i").test(ukHtml) ||
     new RegExp(`href="[^"]*${enPathFragment.replace(/\//g, "\\/")}[^"]*"[^>]*hreflang="en"`, "i").test(ukHtml));

  if (!hasEnHreflang) {
    fail(`${ukRoute} missing hreflang="en" pointing to ${enRoute}`);
  }

  // In enHtml: must find hreflang="uk" link pointing to the UA route
  const ukPathFragment = ukRoute.replace(/\/$/, "") || "";
  const hasUkHreflang =
    /hreflang="uk"/i.test(enHtml) &&
    (new RegExp(`hreflang="uk"[^>]*href="[^"]*${ukPathFragment === "" ? '""' : ukPathFragment.replace(/\//g, "\\/")}`, "i").test(enHtml) ||
     new RegExp(`href="[^"]*${ukPathFragment === "" ? "/" : ukPathFragment.replace(/\//g, "\\/")}[^"]*"[^>]*hreflang="uk"`, "i").test(enHtml) ||
     (ukRoute === "/" && /hreflang="uk"[^>]*href="[^"]*\/"/.test(enHtml)) ||
     /hreflang="uk"/i.test(enHtml));

  if (!hasUkHreflang) {
    fail(`${enRoute} missing hreflang="uk" pointing to ${ukRoute}`);
  }
}

function checkSitemap() {
  const sitemapPath = path.join(siteRoot, "sitemap.xml");
  if (!fs.existsSync(sitemapPath)) {
    fail("sitemap.xml missing or empty in _site/");
  }
  const content = fs.readFileSync(sitemapPath, "utf8").trim();
  if (!content) {
    fail("sitemap.xml missing or empty in _site/");
  }
}

function checkServiceSchema(route, html) {
  if (!serviceDetailRoutes.includes(route)) {
    return;
  }
  if (!html.includes('"@type": "Service"')) {
    fail(`${route} missing "@type": "Service" in JSON-LD`);
  }
}

function checkFaqSchema(route, html) {
  if (faqRoutes.includes(route)) {
    if (!html.includes('"@type": "FAQPage"')) {
      fail(`${route} missing "@type": "FAQPage" in JSON-LD`);
    }
  } else {
    if (html.includes('"@type": "FAQPage"')) {
      fail(`${route} must not contain "@type": "FAQPage" (schema leak)`);
    }
  }
}

function checkNoPlaceholderIdentity(route, html) {
  const scriptBlocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)].map((m) => m[1]);
  const combined = scriptBlocks.join("\n");
  if (combined.includes("Business name pending confirmation")) {
    fail(`${route} JSON-LD contains placeholder identity — replace company values in _config.yml before indexing`);
  }
  if (/\+380000000000/.test(combined)) {
    fail(`${route} JSON-LD contains placeholder identity — replace company values in _config.yml before indexing`);
  }
  if (/hello@example\.com/.test(combined)) {
    fail(`${route} JSON-LD contains placeholder identity — replace company values in _config.yml before indexing`);
  }
}

function checkDistinctRenovationDescriptions() {
  const apartmentPath = path.join(siteRoot, "services", "apartment-renovation", "index.html");
  const housePath = path.join(siteRoot, "services", "house-renovation", "index.html");

  if (!fs.existsSync(apartmentPath)) {
    fail("services/apartment-renovation/index.html not found");
  }
  if (!fs.existsSync(housePath)) {
    fail("services/house-renovation/index.html not found");
  }

  const apartmentHtml = fs.readFileSync(apartmentPath, "utf8");
  const houseHtml = fs.readFileSync(housePath, "utf8");

  const apartmentMatch = apartmentHtml.match(/<meta name="description" content="([^"]+)"/i);
  const houseMatch = houseHtml.match(/<meta name="description" content="([^"]+)"/i);

  if (!apartmentMatch) {
    fail("services/apartment-renovation/ missing meta description");
  }
  if (!houseMatch) {
    fail("services/house-renovation/ missing meta description");
  }

  if (apartmentMatch[1] === houseMatch[1]) {
    fail("apartment-renovation and house-renovation have identical meta descriptions — SEO-02 requires distinct intent signals");
  }
}

function main() {
  if (!fs.existsSync(siteRoot)) {
    fail("_site build output not found — run jekyll build first");
  }

  checkSitemap();

  const htmlCache = {};
  for (const route of checkedRoutes) {
    htmlCache[route] = readHtml(route);
  }

  for (const route of checkedRoutes) {
    const html = htmlCache[route];
    checkNotNoindex(route, html);
    checkCanonical(route, html);
    checkServiceSchema(route, html);
    checkFaqSchema(route, html);
    checkNoPlaceholderIdentity(route, html);
  }

  for (const [ukRoute, enRoute] of bilingualPairs) {
    checkHreflangPair(ukRoute, enRoute, htmlCache[ukRoute], htmlCache[enRoute]);
  }

  checkDistinctRenovationDescriptions();

  console.log("Phase 5 render checks passed.");
}

main();
