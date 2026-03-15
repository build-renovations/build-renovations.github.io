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

function main() {
  if (!fs.existsSync(siteRoot)) {
    fail("_site build output not found — run jekyll build first");
  }

  const htmlCache = {};
  for (const route of ["/", "/en/", "/contact/", "/en/contact/"]) {
    htmlCache[route] = readHtml(route);
  }

  checkBrandName("/", htmlCache["/"]);
  checkBrandName("/en/", htmlCache["/en/"]);

  checkProjectsNav("/", htmlCache["/"]);
  checkProjectsNav("/en/", htmlCache["/en/"]);

  checkNoPlaceholderMessengers("/contact/", htmlCache["/contact/"]);
  checkNoPlaceholderMessengers("/en/contact/", htmlCache["/en/contact/"]);

  console.log("Phase 6 render checks passed.");
}

main();
