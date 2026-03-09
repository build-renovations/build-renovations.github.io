# MCP Policy

Use MCP where it materially improves outcome quality. Do not invoke it by habit.

## Tool modes

- `repo_only`: work can be completed from repository state and local tooling.
- `mcp_preferred`: MCP should be used if available because it meaningfully improves quality, but fallback is allowed.
- `mcp_required`: the task depends on external or tool-backed evidence and should not be signed off without MCP.

## By agent

### Orchestrator

- Use MCP to gather current external constraints, references, or verification paths when specialist work depends on them.
- Record task tool mode in `docs/orchestration/tasks.md`.

### UI/UX Pro

- `mcp_preferred` for visual research, competitive references, interaction audits, or browser inspection.
- `mcp_required` when the task explicitly depends on design-system inspection, live UI capture, or flow evidence.
- When available in Codex, pair UI/UX work with the `ui-ux-pro-max` skill and ground it with `browser_automation` evidence from the actual rendered page.
- For repository-constrained work, prefer recommendations that can be implemented inside Jekyll, Liquid, `_data/`, and the existing site CSS rather than generic framework output.

### Design

- `mcp_preferred` for image/reference research, visual comparison, and asset direction.
- `repo_only` for pure CSS/layout implementation inside the repository.

### SEO

- `mcp_preferred` for search landscape checks and SERP-aware planning.
- `mcp_required` when the user asks for current keyword, competitor, or trend validation.

### Content

- `mcp_preferred` for market language research, source collection, or proof gathering.
- `repo_only` for adapting already-approved page briefs into site copy.

### Development

- `mcp_preferred` for external documentation lookups or implementation references.
- `repo_only` for straightforward Jekyll implementation from local requirements.

### QA

- `mcp_preferred` for browser automation and DOM-level inspection.
- `mcp_required` when sign-off depends on rendered UI behavior rather than static output alone.

## Handoff requirement

Each completed task must state:

- tool mode
- MCP used or not used
- evidence gathered
- fallback used if MCP was unavailable
