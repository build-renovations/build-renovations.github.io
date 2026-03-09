# Audit Plan

Status: DONE
Owner: Performance Agent
Tool mode: mcp_preferred

## Current release audit method

- Build with `./scripts/qa.sh`
- Serve `_site/` locally
- Run Lighthouse on core template routes
- Run static broken-link sweep against generated HTML
- Spot-check desktop and mobile behavior in a real browser

## Required release checks

- Homepage
- Services hub
- About
- Contact
- Process
- FAQ
- At least one service detail template per shared layout

## Release note

If the visual system changes significantly or heavy third-party scripts are added, rerun the full Lighthouse sample before deployment.
