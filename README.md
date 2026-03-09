# Remonty

GitHub Pages compatible Jekyll bootstrap for a renovation website covering apartments and houses from plumbing and electrical work to final finishing. The repository is bilingual by default: Ukrainian at the root, English under `/en/`.

## Stack

- Jekyll with the `github-pages` gem
- Built-in GitHub Pages plugins only: `jekyll-seo-tag`, `jekyll-sitemap`
- Data-driven content blocks in `_data/`
- Custom layouts and assets, no unsupported multilingual plugins

## Local workflow

1. Install gems:

   ```bash
   bundle install
   ```

2. Run locally:

   ```bash
   ./scripts/serve.sh
   ```

3. Build for verification:

   ```bash
   ./scripts/qa.sh
   ```

4. Run orchestration gates:

   ```bash
   ./scripts/gates.sh gate1
   ./scripts/gates.sh gate2
   ./scripts/gates.sh gate3
   ./scripts/gates.sh gate4
   ```

The local scripts preload a small Ruby 4 compatibility shim because the current `github-pages` stack still depends on Jekyll 3.x, while GitHub Pages itself builds in its own managed runtime.

## Multilingual model

- `/` is the default Ukrainian experience.
- `/en/` mirrors the core pages in English.
- Each translated page shares a `translation_key` so the layout can render `hreflang` tags and language switching without extra plugins.

## Agent workflow

The repository includes a local [AGENTS.md](/Users/mykhailomykhailenko/work/personal/vasyl/remonty/AGENTS.md) plus role briefs in [docs/agents/](/Users/mykhailomykhailenko/work/personal/vasyl/remonty/docs/agents/) so separate LLM passes can operate consistently.

- Orchestrator agent: plans milestones, creates tasks, assigns specialist work, and updates progress.
- Design agent: extend visual language, imagery direction, and component system.
- UI/UX Pro agent: drives UX audits, user-flow design, wireframe direction, and higher-creativity interface concepts.
- SEO agent: expand information architecture, metadata, schema, and landing-page coverage.
- Content agent: write bilingual copy with matching intent across UA and EN.
- Development agent: implement pages and reusable components within GitHub Pages constraints.
- QA agent: run build checks and browser inspection.

Every agent is expected to run in expert mode, using the standards in [docs/agents/expert-mode.md](/Users/mykhailomykhailenko/work/personal/vasyl/remonty/docs/agents/expert-mode.md). MCP usage is governed by [docs/agents/mcp-policy.md](/Users/mykhailomykhailenko/work/personal/vasyl/remonty/docs/agents/mcp-policy.md), and each task must be marked as `repo_only`, `mcp_preferred`, or `mcp_required`.

Repository MCP setup artifacts:

- [.mcp.example.json](/Users/mykhailomykhailenko/work/personal/vasyl/remonty/.mcp.example.json)
- [docs/orchestration/mcp-registry.md](/Users/mykhailomykhailenko/work/personal/vasyl/remonty/docs/orchestration/mcp-registry.md)
- [docs/orchestration/mcp-setup.md](/Users/mykhailomykhailenko/work/personal/vasyl/remonty/docs/orchestration/mcp-setup.md)
- [scripts/mcp-bootstrap.sh](/Users/mykhailomykhailenko/work/personal/vasyl/remonty/scripts/mcp-bootstrap.sh)
- [scripts/mcp-check.sh](/Users/mykhailomykhailenko/work/personal/vasyl/remonty/scripts/mcp-check.sh)

## Agent outputs

Specialist artifacts are stored under [agents/](/Users/mykhailomykhailenko/work/personal/vasyl/remonty/agents/). The Jekyll development agent is the exception and writes implementation changes directly in the site root.

## Phase gates

The orchestrator uses strict phase gates defined in [docs/orchestration/phase-gates.md](/Users/mykhailomykhailenko/work/personal/vasyl/remonty/docs/orchestration/phase-gates.md). Work is only considered unlocked when the required gate artifacts and checks exist.

`gate4` automation runs Lighthouse, WCAG 2.1 AA checks via `pa11y`, and a broken-link crawl against the built site served locally from `_site/`.

## Orchestration workflow

Use the orchestrator as the entry point for every multi-agent session.

1. Read [docs/agents/orchestrator.md](/Users/mykhailomykhailenko/work/personal/vasyl/remonty/docs/agents/orchestrator.md).
2. Review [docs/orchestration/progress.md](/Users/mykhailomykhailenko/work/personal/vasyl/remonty/docs/orchestration/progress.md) and [docs/orchestration/tasks.md](/Users/mykhailomykhailenko/work/personal/vasyl/remonty/docs/orchestration/tasks.md).
3. Update the current phase, task ownership, and blockers before delegating work.
4. Dispatch one or more specialist-agent tasks with explicit definitions of done.
5. After each agent pass, update the tracker and move tasks across `todo`, `in_progress`, `review`, `blocked`, or `done`.
6. Run QA before closing a milestone.

Recommended rule: if progress is not written into `docs/orchestration/progress.md`, the work is not considered coordinated.

## Deployment

Set the GitHub Pages source to the default branch root. Keep the site within GitHub Pages safe-mode constraints unless deployment is moved to GitHub Actions with a custom build.
