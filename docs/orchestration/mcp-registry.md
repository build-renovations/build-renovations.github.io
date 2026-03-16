# MCP Registry

This file defines the intended MCP capability map for the repository. It is the orchestrator's source of truth for deciding when a task should run as `repo_only`, `mcp_preferred`, or `mcp_required`.

## Server inventory

| Capability | Suggested alias | Primary users | Purpose | Default mode |
| --- | --- | --- | --- | --- |
| Filesystem access | `filesystem_repo` | orchestrator, development | Structured repo access and file-aware tooling | `repo_only` |
| Browser automation | `browser_automation` | ui-ux-pro, qa, performance | Inspect rendered UI, flows, DOM state, and behavior through the Playwright MCP server | `mcp_preferred` |
| Docs lookup | `docs_lookup` | development, orchestrator | Official docs and implementation references | `mcp_preferred` |
| Working memory | `memory` | orchestrator, all specialists | Shared durable notes, context capture, and task memory | `mcp_preferred` |

## Agent-to-MCP mapping

### Orchestrator

- Preferred:
  - `docs_lookup`
  - `memory`
- Required when:
  - a task depends on current external constraints
  - a downstream agent task is marked `mcp_required`

### UI/UX Pro

- Preferred:
  - `browser_automation`
  - `filesystem_repo`
  - `memory`
- Required when:
  - evaluating real rendered behavior
  - collecting interface evidence for UX signoff

Expected skill pairing:

- `ui-ux-pro-max` for concept generation, hierarchy guidance, and design-system exploration
- `playwright` when the task needs step-by-step browser execution or artifact capture
- Preferred combined flow for rendered concept work: capture the live route state with Playwright-backed `browser_automation`, then generate or refine concepts through `ui-ux-pro-max`

### Design

- Preferred:
  - `browser_automation`
  - `memory`
- Required when:
  - visual comparison depends on live references rather than local design iteration

### SEO

- Preferred:
  - `memory`
- Required when:
  - validating current search-intent language, competitors, or trend-sensitive recommendations

### Content

- Preferred:
  - `memory`
- Required when:
  - copy depends on current external source material or market language validation

### Development

- Preferred:
  - `docs_lookup`
  - `memory`
- Required when:
  - implementation choices depend on official external technical documentation

### QA

- Preferred:
  - `browser_automation`
  - `memory`
- Required when:
  - signoff depends on actual rendered behavior rather than static output alone
- Default browser validation path:
  - `browser_automation` backed by Playwright MCP

### Performance

- Preferred:
  - `browser_automation`
  - `memory`
- Required when:
  - release readiness depends on measured rendering performance

## Task annotation rule

Every orchestrated task should state:

- tool mode
- MCP capability expected
- whether MCP was actually used
- fallback if MCP was unavailable

## Configuration file

The repository includes a working baseline example at `.mcp.example.json`. Adapt paths if the repository moves, and keep any machine-specific secrets out of version control.

## Skill expectation

For Codex-based work, the expected skill pairing is:

- `browser_automation` -> `playwright` skill
- `browser_automation` + rendered route capture + `filesystem_repo` + `memory` -> `ui-ux-pro-max` skill
- skill installation and refresh -> `skill-installer`

These pairings are part of the local readiness check and should be validated with `./scripts/mcp-check.sh`.
