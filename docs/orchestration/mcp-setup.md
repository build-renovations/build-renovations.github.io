# MCP Setup

This repository does not assume one specific MCP client. The setup below is intentionally client-agnostic so it can be adapted to your preferred environment.

## Files

- Example config: `.mcp.example.json`
- Capability map: `docs/orchestration/mcp-registry.md`
- Bootstrap script: `scripts/mcp-bootstrap.sh`
- Validation script: `scripts/mcp-check.sh`

## Recommended capabilities

1. Filesystem access to this repository
2. Browser automation for UI, QA, and performance work
3. Web research for SEO and content tasks
4. Docs lookup for implementation decisions
5. Performance audit tooling for Gate 4 signoff

## Skill pairing for Codex

When working in Codex, install and use skills alongside MCPs instead of relying on ad-hoc terminal habits.

- `browser_automation`:
  - Pair with the `playwright` skill for repeatable browser workflows, snapshots, and artifact capture.
  - Verify the local wrapper exists at `~/.codex/skills/playwright/scripts/playwright_cli.sh`.
  - For UI/UX concept work, pair it with `ui-ux-pro-max` so design guidance is grounded in a rendered-page review instead of generic ideation.
- `docs_lookup`:
  - Use directly from MCP; no extra skill is required in this repository today.
- `filesystem_repo`:
  - Use directly from MCP for structured reads and edits.
- `memory`:
  - Use directly from MCP for durable task context and handoff notes.
- `skill-installer`:
  - This is preinstalled as a system skill and should be used when adding or refreshing Codex skills.
- `ui-ux-pro-max`:
  - Use for UI/UX direction generation, hierarchy review, typography/color exploration, and trust/conversion heuristics.
  - In this repository, it must follow the Jekyll-safe, `_data_`-driven, bilingual constraints already defined in `AGENTS.md`.
  - Do not use its generic `html-tailwind` default as the implementation target for this repository.

## Setup flow

1. Copy the example config to your client-specific MCP configuration location.
2. Or run `./scripts/mcp-bootstrap.sh` to register the working baseline with Codex CLI automatically.
3. Point filesystem access at this repository root if the path changes.
4. Add optional API keys only in local or secret-managed configuration.
5. Run `./scripts/mcp-check.sh` to confirm the repository-level expectations are satisfied.

## Validation standard

A machine should not be treated as fully ready until all of the following are true:

- `codex mcp list` shows `filesystem_repo`, `browser_automation`, `docs_lookup`, and `memory`
- `./scripts/mcp-check.sh` passes
- the Playwright skill exists at `~/.codex/skills/playwright/`
- the Playwright wrapper exists at `~/.codex/skills/playwright/scripts/playwright_cli.sh`
- the UI/UX skill exists at `~/.codex/skills/ui-ux-pro-max/SKILL.md`
- `node`, `npm`, and `npx` are available

## Required environment variables

The default baseline added by this repository does not require extra secrets.

Optional future integrations may require:

- `SEARCH_API_KEY`
- `OPENAI_API_KEY`
- provider-specific tokens such as Figma or external search credentials

## Repository policy

- Do not commit secrets.
- Keep reusable MCP policy in repository docs.
- Keep machine-specific credentials and client wiring outside version control where possible.
- If a task is marked `mcp_required`, do not sign it off without the needed MCP evidence.

## Recommended first-pass configuration

- UI/UX Pro:
  - browser automation
  - memory
- SEO:
  - memory
- Content:
  - memory
- Development:
  - docs lookup
  - filesystem access
- QA:
  - browser automation
  - memory
- Performance:
  - browser automation
  - memory
