#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const repoRoot = process.cwd();
const siteRoot = path.join(repoRoot, "_site");
const requiredRoutes = [
  "/",
  "/about/",
  "/services/",
  "/process/",
  "/contact/",
  "/services/plumbing/",
  "/services/electrical/",
  "/services/finishing/",
  "/services/site-supervision/",
  "/en/",
  "/en/about/",
  "/en/services/",
  "/en/process/",
  "/en/contact/",
  "/en/services/plumbing/",
  "/en/services/electrical/",
  "/en/services/finishing/",
  "/en/services/site-supervision/"
];
const messengerNames = ["telegram", "viber", "whatsapp"];
const placeholderRegexByField = {
  name: /(placeholder|temp|temporary|demo|example|tbd|pending|remonty)/i,
  phone: /(\+?3800{8,}|000[-\s]?000|example|placeholder|pending|tbd)/i,
  email: /(example\.com|placeholder|pending|tbd)/i,
  serviceAreaUk: /(область|уточнюється|placeholder|приклад)/i,
  serviceAreaEn: /(surrounding region|to be confirmed|placeholder|example)/i
};

function fail(message) {
  console.error(`Phase 1 render checks failed: ${message}`);
  process.exit(1);
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

function ensureFile(filePath) {
  if (!fs.existsSync(filePath)) {
    fail(`missing required file ${path.relative(repoRoot, filePath)}`);
  }
}

function routeToFile(route) {
  const cleanRoute = route.replace(/^\/+/, "");
  if (!cleanRoute) {
    return path.join(siteRoot, "index.html");
  }
  return path.join(siteRoot, cleanRoute, "index.html");
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

function normalizeHref(href) {
  return href
    .replace(/^https?:\/\/[^/]+/i, "")
    .replace(/\/index\.html$/, "/")
    .replace(/([^/])$/, "$1/");
}

function collectLinks(html) {
  const links = [];
  const hrefPattern = /<a\b([^>]*?)href="([^"]+)"([^>]*)>/gi;
  let match;
  while ((match = hrefPattern.exec(html)) !== null) {
    links.push({
      href: match[2],
      markup: match[0]
    });
  }
  return links;
}

function collectClasses(markup) {
  const classMatch = markup.match(/class="([^"]+)"/i);
  return classMatch ? classMatch[1].split(/\s+/).filter(Boolean) : [];
}

function checkPlaceholderPolicy(config) {
  const company = config.company || {};
  const placeholderPolicy = company.phase1_placeholder || {};
  const placeholderMatches = [];

  if (placeholderRegexByField.name.test(company.name || "")) {
    placeholderMatches.push("name");
  }
  if (placeholderRegexByField.phone.test(company.phone || "")) {
    placeholderMatches.push("phone");
  }
  if (placeholderRegexByField.email.test(company.email || "")) {
    placeholderMatches.push("email");
  }
  if (placeholderRegexByField.serviceAreaUk.test(company.service_area?.uk || "")) {
    placeholderMatches.push("service_area.uk");
  }
  if (placeholderRegexByField.serviceAreaEn.test(company.service_area?.en || "")) {
    placeholderMatches.push("service_area.en");
  }

  const hasPlaceholderValues = placeholderMatches.length > 0;
  if (!hasPlaceholderValues) {
    return;
  }

  if (placeholderPolicy.status !== "approved-phase-1") {
    fail(`placeholder company data detected without approved policy: ${placeholderMatches.join(", ")}`);
  }

  if (!Array.isArray(placeholderPolicy.fields) || placeholderPolicy.fields.length === 0) {
    fail("company.phase1_placeholder.fields must list the placeholder-backed values");
  }

  const missingFields = placeholderMatches.filter((field) => !placeholderPolicy.fields.includes(field));
  if (missingFields.length > 0) {
    fail(`placeholder policy is missing fields: ${missingFields.join(", ")}`);
  }

  if (typeof placeholderPolicy.note !== "string" || placeholderPolicy.note.trim().length < 12) {
    fail("company.phase1_placeholder.note must explain why placeholders are still present");
  }
}

function checkContactChannels(contactChannels) {
  for (const lang of ["uk", "en"]) {
    const channels = contactChannels[lang];
    if (!channels) {
      fail(`_data/contact_channels.yml is missing the ${lang} block`);
    }

    if (typeof channels.primary_label !== "string" || channels.primary_label.trim() === "") {
      fail(`contact_channels.${lang}.primary_label is required`);
    }

    if (typeof channels.secondary_heading !== "string" || channels.secondary_heading.trim() === "") {
      fail(`contact_channels.${lang}.secondary_heading is required`);
    }

    if (!Array.isArray(channels.messengers) || channels.messengers.length !== messengerNames.length) {
      fail(`contact_channels.${lang}.messengers must define Telegram, Viber, and WhatsApp`);
    }

    for (const name of messengerNames) {
      const messenger = channels.messengers.find((item) => item.name?.toLowerCase() === name);
      if (!messenger) {
        fail(`contact_channels.${lang}.messengers is missing ${name}`);
      }
      if (typeof messenger.label !== "string" || messenger.label.trim() === "") {
        fail(`contact_channels.${lang}.messengers.${name}.label is required`);
      }
      if (typeof messenger.url !== "string" || !/^https?:\/\//.test(messenger.url)) {
        fail(`contact_channels.${lang}.messengers.${name}.url must be absolute`);
      }
    }
  }
}

function checkCallFlow(callFlow) {
  for (const lang of ["uk", "en"]) {
    const branch = callFlow[lang];
    if (!branch) {
      fail(`_data/call_flow.yml is missing the ${lang} branch`);
    }

    const fit = branch.completeness?.fit;
    const call = branch.completeness?.call;
    if (!fit || !call) {
      fail(`call_flow.${lang}.completeness must contain fit and call sections`);
    }

    if (typeof fit.title !== "string" || fit.title.trim() === "") {
      fail(`call_flow.${lang}.completeness.fit.title is required`);
    }

    if (!Array.isArray(fit.items) || fit.items.length < 3) {
      fail(`call_flow.${lang}.completeness.fit.items must contain at least 3 items`);
    }

    if (!Array.isArray(call.prepare) || call.prepare.length < 3) {
      fail(`call_flow.${lang}.completeness.call.prepare must contain at least 3 items`);
    }

    if (!Array.isArray(call.clarify) || call.clarify.length < 3) {
      fail(`call_flow.${lang}.completeness.call.clarify must contain at least 3 items`);
    }

    if (!Array.isArray(call.return_items) || call.return_items.length < 3) {
      fail(`call_flow.${lang}.completeness.call.return_items must contain at least 3 items`);
    }

    if (typeof call.messenger_note !== "string" || call.messenger_note.trim() === "") {
      fail(`call_flow.${lang}.completeness.call.messenger_note is required`);
    }
  }
}

function checkRenderedRoutes(contactChannels, callFlow) {
  for (const route of requiredRoutes) {
    const filePath = routeToFile(route);
    ensureFile(filePath);
    const html = fs.readFileSync(filePath, "utf8");
    const links = collectLinks(html);

    if (!hasVisibleTelLink(html)) {
      fail(`route ${route} does not render a visible tel: link`);
    }

    const stickyCall = html.includes('data-sticky-phone-cta');
    if (!stickyCall) {
      fail(`route ${route} is missing the sticky phone CTA markup`);
    }

    const lang = route.startsWith("/en/") ? "en" : "uk";
    const expectedSecondaryHeading = contactChannels[lang].secondary_heading;
    if (!html.includes(expectedSecondaryHeading)) {
      fail(`route ${route} is missing the localized messenger/support heading`);
    }
    if (!html.includes("data-project-fit")) {
      fail(`route ${route} is missing the project-fit module`);
    }
    if (!html.includes("data-call-expectations")) {
      fail(`route ${route} is missing the first-call guidance module`);
    }
    if (!html.includes(callFlow[lang].completeness.fit.title)) {
      fail(`route ${route} is missing localized project-fit content`);
    }
    if (!html.includes(callFlow[lang].completeness.call.title)) {
      fail(`route ${route} is missing localized first-call content`);
    }

    const messengerLinks = links.filter((link) => {
      const href = link.href.toLowerCase();
      return messengerNames.some((name) => href.includes(name));
    });
    if (messengerLinks.length !== messengerNames.length) {
      fail(`route ${route} does not expose all secondary messenger links`);
    }

    const primaryTelLink = links.find((link) => link.href.startsWith("tel:") && collectClasses(link.markup).includes("button--primary"));
    if (!primaryTelLink) {
      fail(`route ${route} does not expose a primary tel: CTA`);
    }

    const secondaryPriorityConflict = messengerLinks.some((link) => collectClasses(link.markup).includes("button--primary"));
    if (secondaryPriorityConflict) {
      fail(`route ${route} renders a messenger action with primary CTA styling`);
    }
  }
}

function checkStickyCtaContract() {
  const cssPath = path.join(repoRoot, "assets/css/site.css");
  const jsPath = path.join(repoRoot, "assets/js/site.js");
  const defaultLayoutPath = path.join(repoRoot, "_layouts/default.html");
  const css = fs.readFileSync(cssPath, "utf8");
  const js = fs.readFileSync(jsPath, "utf8");
  const layout = fs.readFileSync(defaultLayoutPath, "utf8");

  if (!layout.includes("data-sticky-phone-cta")) {
    fail("_layouts/default.html must include sticky CTA markup");
  }

  if (!/body\.has-sticky-phone-cta\s+main/.test(css)) {
    fail("assets/css/site.css must reserve main-content space for the sticky CTA");
  }

  if (!/\.site-footer\s*\{[\s\S]*scroll-margin-bottom:\s*var\(--sticky-phone-offset\)/.test(css)) {
    fail("assets/css/site.css must protect footer access with sticky CTA scroll margin");
  }

  if (!/document\.body\.classList\.(add|toggle)\(\"has-sticky-phone-cta\"/.test(js)) {
    fail("assets/js/site.js must toggle body.has-sticky-phone-cta for sticky CTA spacing");
  }
}

function main() {
  ensureFile(siteRoot);
  const config = readYamlAsJson(path.join(repoRoot, "_config.yml"));
  const contactChannelsPath = path.join(repoRoot, "_data/contact_channels.yml");
  const callFlowPath = path.join(repoRoot, "_data/call_flow.yml");
  ensureFile(contactChannelsPath);
  ensureFile(callFlowPath);
  const contactChannels = readYamlAsJson(contactChannelsPath);
  const callFlow = readYamlAsJson(callFlowPath);

  checkPlaceholderPolicy(config);
  checkContactChannels(contactChannels);
  checkCallFlow(callFlow);
  checkRenderedRoutes(contactChannels, callFlow);
  checkStickyCtaContract();

  console.log("Phase 1 render checks passed.");
}

main();
