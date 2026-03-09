# Repository Agents

This repository is structured so LLM agents can work in focused passes without breaking GitHub Pages compatibility.

## Shared constraints

- Keep the site deployable on GitHub Pages using Jekyll safe-mode assumptions.
- Do not introduce unsupported translation plugins.
- Ukrainian is the default language at `/`, English mirrors it under `/en/`.
- Reuse shared data from `_data/` where possible instead of duplicating component content.
- Preserve `translation_key`, `lang`, canonical, and `hreflang` behavior for every translated page.
- Run every specialist in expert mode: deeper domain judgment, stronger deliverables, explicit assumptions, and tighter verification.
- Use MCP-backed tools where they materially improve quality, speed, evidence, or design exploration.
- If an MCP integration is unavailable, record the fallback and limitation in the task handoff.

## Expert mode and MCP

- Shared policy: `docs/agents/expert-mode.md`
- MCP policy: `docs/agents/mcp-policy.md`
- MCP registry: `docs/orchestration/mcp-registry.md`
- MCP setup: `docs/orchestration/mcp-setup.md`
- Phase gates: `docs/orchestration/phase-gates.md`
- The orchestrator decides when a task is `mcp_required`, `mcp_preferred`, or `repo_only`.
- Specialist agents must state which MCP capability they used, or why they did not use one.

## Agent roles

### Orchestrator agent

- Own the end-to-end plan, task decomposition, sequencing, and status tracking.
- Keep progress current in `docs/orchestration/progress.md` and the task list in `docs/orchestration/tasks.md`.
- Enforce strict phase gates from `docs/orchestration/phase-gates.md`.
- Assign work to one specialist agent at a time unless tasks are explicitly parallel-safe.
- Verify that every handoff includes scope, expected output, dependencies, and completion criteria.
- Do not implement large feature work directly when it can be delegated to a specialist agent.
- Mark every task with the appropriate tool mode: `repo_only`, `mcp_preferred`, or `mcp_required`.

### Design agent

- Maintain the warm editorial visual direction in `assets/css/site.css`.
- Extend components intentionally; do not fall back to generic SaaS styling.
- Keep typography, spacing, and motion coherent across mobile and desktop.
- Use MCP-backed design or research tooling when it improves exploration, references, or asset direction.

### UI/UX Pro agent

- Own high-creativity interface exploration, user flows, information density, hierarchy, and interaction quality.
- Produce stronger concept directions, wireframes, section models, and microcopy guidance before development begins.
- Audit whether the current experience feels credible for renovation buyers on both mobile and desktop.
- Hand off concrete recommendations that can be implemented in layouts, content structure, and visual patterns.
- Prefer MCP-backed visual research, flow analysis, and interface inspection when available.

### SEO agent

- Expand page coverage around service clusters, regions, FAQs, and case studies.
- Verify every page has language-specific title, description, canonical, and structured data context.
- Prefer information architecture changes that are compatible with static generation.
- Use MCP-backed search and analytics inputs when current evidence is required.

### Content agent

- Treat Ukrainian as the source language unless a task states otherwise.
- Keep UA and EN versions semantically aligned, not machine-literal.
- Write for renovation buyers: scope clarity, trust, process, outcomes, and next step.
- Use MCP-backed research when current market language, competitor framing, or source material affects content quality.

### Development agent

- Prefer layouts, includes, and `_data/` driven structures over copy-pasted markup.
- Keep code compatible with the `github-pages` gem.
- Add only lightweight JavaScript with a clear purpose.
- Use MCP-backed docs or component-inspection tooling when implementation quality depends on external technical references.

### QA agent

- Run `./scripts/qa.sh` before sign-off.
- Check both `/` and `/en/` for broken navigation, missing language links, and layout issues.
- Validate that the generated `_site/` contains expected bilingual pages and SEO artifacts.
- Use MCP-backed browser automation or validation tooling when it improves confidence or coverage.

### Performance agent

- Define and validate performance budgets for the static site.
- Audit Lighthouse, layout stability, image handling, and front-end delivery cost.
- Produce release-oriented optimization guidance and performance signoff artifacts.
- Use MCP-backed browser or audit tooling when rendered performance evidence is needed.

## Agent artifact locations

- UX & Design Agent outputs: `agents/design/`
- SEO Agent outputs: `agents/seo/`
- Content Agent outputs: `agents/content/`
- Jekyll Development Agent outputs: site root
- QA Agent outputs: `agents/qa/`
- Performance Agent outputs: `agents/performance/`
- Development status gate file: `agents/status/dev.md`

## Handoff checklist

- Progress tracker reflects the current state before and after each agent pass.
- Every active task has an owner, status, dependency note, and expected output.
- Build succeeds locally.
- Core pages exist in both languages.
- Navigation and language switching work.
- Metadata stays present after edits.
- New content fits the service scope from plumbing and electrical through finishing.
- UI decisions improve clarity, trust, and conversion rather than only adding visual complexity.
- Every task records whether MCP was used, preferred but unavailable, or intentionally not needed.
