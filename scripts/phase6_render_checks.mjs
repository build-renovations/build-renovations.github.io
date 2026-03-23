#!/usr/bin/env node

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

function checkBrandName(route, html) {
  const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
  if (titleMatch && titleMatch[1].includes("Remonty")) {
    fail(`${route} <title> contains "Remonty" — update title to Рівень`);
  }
  const ogTitleMatch = html.match(/<meta[^>]+property="og:title"[^>]+content="([^"]*)"[^>]*>/i)
    || html.match(/<meta[^>]+content="([^"]*)"[^>]+property="og:title"[^>]*>/i);
  if (ogTitleMatch && ogTitleMatch[1].includes("Remonty")) {
    fail(`${route} og:title contains "Remonty" — update title to Рівень`);
  }
}

function checkProjectsNav(route, html) {
  if (route === "/") {
    if (!html.includes('href="/projects/"')) {
      fail(`${route} nav does not contain href="/projects/"`);
    }
  } else if (route === "/en/") {
    if (!html.includes('href="/en/projects/"')) {
      fail(`${route} nav does not contain href="/en/projects/"`);
    }
  }
}

function checkNoPlaceholderMessengers(route, html) {
  if (html.includes("telegram_phase1_contact")) {
    fail(`${route} contains placeholder messenger token "telegram_phase1_contact"`);
  }
  if (html.includes("AQExamplePhase1")) {
    fail(`${route} contains placeholder messenger token "AQExamplePhase1"`);
  }
  if (html.includes("send?phone=380000000000")) {
    fail(`${route} contains placeholder phone link "send?phone=380000000000"`);
  }
}

function checkHeroStats(route, html) {
  const statBlocks = [...html.matchAll(/class="hero__stat"/g)];
  if (statBlocks.length < 5) {
    fail(`${route} expected 5 hero__stat blocks, found ${statBlocks.length}`);
  }

  const statsSection = html.match(/class="hero__stats"[\s\S]*?<\/div>\s*<\/div>/i);
  if (!statsSection) {
    fail(`${route} missing hero__stats section`);
  }
  const statsHtml = statsSection[0];

  if (!statsHtml.includes("300+")) {
    fail(`${route} hero stats missing "300+" projects value`);
  }
  if (!statsHtml.includes("15+")) {
    fail(`${route} hero stats missing "15+" years value`);
  }
  if (!statsHtml.includes("90%+")) {
    fail(`${route} hero stats missing "90%+" referral value`);
  }
  if (/warranty|гарантія/i.test(statsHtml)) {
    fail(`${route} hero stats still contains warranty reference`);
  }
}

function checkNoDuplicateBridgeNote(route, html) {
  const bridgeNoteCount = (html.match(/featured-case-studies__bridge-note/g) || []).length;
  if (bridgeNoteCount > 0) {
    fail(`${route} contains redundant featured-case-studies__bridge-note (${bridgeNoteCount} occurrences)`);
  }
}

function checkNoChMaxWidthOnHeadings(route, html) {
  // This is a CSS check — verify the built stylesheet doesn't constrain headings
}

function checkHeadingHierarchy(route, html) {
  const headings = [...html.matchAll(/<h([1-6])\b/gi)].map(m => parseInt(m[1]));
  if (headings.length === 0) return;
  if (headings[0] !== 1) {
    fail(`${route} first heading is h${headings[0]}, expected h1`);
  }
  const h1Count = headings.filter(h => h === 1).length;
  if (h1Count > 1) {
    fail(`${route} has ${h1Count} h1 elements, expected exactly 1`);
  }
  for (let i = 1; i < headings.length; i++) {
    if (headings[i] > headings[i - 1] + 1) {
      fail(`${route} heading hierarchy skips from h${headings[i - 1]} to h${headings[i]}`);
    }
  }
}

function checkImagesHaveAlt(route, html) {
  const images = [...html.matchAll(/<img\b([^>]*)>/gi)];
  for (const img of images) {
    const attrs = img[1];
    if (!/\balt="[^"]+"/i.test(attrs)) {
      const src = (attrs.match(/src="([^"]+)"/i) || [])[1] || "unknown";
      fail(`${route} <img src="${src}"> is missing a non-empty alt attribute`);
    }
  }
}

function checkInternalLinks(route, html, allRoutes) {
  const links = [...html.matchAll(/<a\b[^>]*href="(\/[^"#?]*)"/gi)].map(m => m[1]);
  for (const href of links) {
    const normalized = href.endsWith("/") ? href : href + "/";
    if (!allRoutes.has(normalized) && !allRoutes.has(href)) {
      // Check if the file exists in _site
      const cleanHref = href.replace(/^\/+/, "");
      const filePath = cleanHref
        ? path.join(siteRoot, cleanHref, "index.html")
        : path.join(siteRoot, "index.html");
      const directPath = path.join(siteRoot, cleanHref);
      if (!fs.existsSync(filePath) && !fs.existsSync(directPath)) {
        fail(`${route} has broken internal link: ${href}`);
      }
    }
  }
}

function checkCssNoChHeadings() {
  const cssPath = path.join(siteRoot, "assets", "css", "site.css");
  if (!fs.existsSync(cssPath)) {
    fail("site.css not found in _site/assets/css/");
  }
  const css = fs.readFileSync(cssPath, "utf8");

  // Check that h1/h2 selectors don't use ch-based max-width
  const rules = css.split("}");
  for (const rule of rules) {
    if (/\bh[12]\b/.test(rule) && /max-width:\s*[\d.]+ch/.test(rule)) {
      fail(`site.css contains ch-based max-width on a heading: ${rule.trim().slice(0, 80)}...`);
    }
  }
}

function main() {
  if (!fs.existsSync(siteRoot)) {
    fail("_site build output not found — run jekyll build first");
  }

  // Collect all built routes for link checking
  const allRoutes = new Set();
  function walkDir(dir, prefix) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.isDirectory()) {
        walkDir(path.join(dir, entry.name), prefix + entry.name + "/");
      } else if (entry.name === "index.html") {
        allRoutes.add("/" + prefix);
      }
    }
  }
  walkDir(siteRoot, "");

  const coreRoutes = ["/", "/en/", "/about/", "/en/about/", "/contact/", "/en/contact/",
    "/services/", "/en/services/", "/process/", "/en/process/", "/faq/", "/en/faq/",
    "/projects/", "/en/projects/"];

  const htmlCache = {};
  for (const route of coreRoutes) {
    try { htmlCache[route] = readHtml(route); } catch { /* route may not exist yet */ }
  }

  // Brand checks
  checkBrandName("/", htmlCache["/"]);
  checkBrandName("/en/", htmlCache["/en/"]);

  // Navigation checks
  checkProjectsNav("/", htmlCache["/"]);
  checkProjectsNav("/en/", htmlCache["/en/"]);

  // Placeholder checks
  checkNoPlaceholderMessengers("/contact/", htmlCache["/contact/"]);
  checkNoPlaceholderMessengers("/en/contact/", htmlCache["/en/contact/"]);

  // Hero stats regression checks
  checkHeroStats("/", htmlCache["/"]);
  checkHeroStats("/en/", htmlCache["/en/"]);

  // No duplicate bridge-note regression
  for (const [route, html] of Object.entries(htmlCache)) {
    checkNoDuplicateBridgeNote(route, html);
  }

  // Heading hierarchy on all core routes
  for (const [route, html] of Object.entries(htmlCache)) {
    checkHeadingHierarchy(route, html);
  }

  // Image alt text on all core routes
  for (const [route, html] of Object.entries(htmlCache)) {
    checkImagesHaveAlt(route, html);
  }

  // Internal link integrity on home pages
  checkInternalLinks("/", htmlCache["/"], allRoutes);
  checkInternalLinks("/en/", htmlCache["/en/"], allRoutes);

  // CSS regression: no ch-based max-width on headings
  checkCssNoChHeadings();

  console.log("Phase 6 render checks passed.");
}

main();
