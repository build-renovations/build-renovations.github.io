#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
STATUS_FILE="$ROOT_DIR/agents/status/mcp.md"
SKILL_STATUS_FILE="$ROOT_DIR/agents/status/mcp-skills.md"

mkdir -p "$ROOT_DIR/agents/status"

check_file() {
  local path="$1"
  [[ -f "$ROOT_DIR/$path" ]]
}

check_codex_mcp() {
  local name="$1"
  codex mcp get "$name" >/dev/null 2>&1
}

check_skill_file() {
  local path="$1"
  [[ -f "$path" ]]
}

print_status() {
  local status="$1"
  local details="$2"

  cat >"$STATUS_FILE" <<EOF
# MCP Status

Last run: $(date -u +"%Y-%m-%d %H:%M:%S UTC")
Status: $status
Details: $details

Checks:

- .mcp.example.json
- docs/orchestration/mcp-registry.md
- docs/orchestration/mcp-setup.md
- docs/agents/mcp-policy.md
- codex mcp: filesystem_repo
- codex mcp: browser_automation
- codex mcp: docs_lookup
- codex mcp: memory
EOF
}

print_skill_status() {
  local status="$1"
  local details="$2"
  local codex_home="${CODEX_HOME:-$HOME/.codex}"

  cat >"$SKILL_STATUS_FILE" <<EOF
# MCP Skill Status

Last run: $(date -u +"%Y-%m-%d %H:%M:%S UTC")
Status: $status
Details: $details

Skill root: $codex_home/skills

Checks:

- preinstalled system skill: skill-installer
- user skill: playwright
- user skill: ui-ux-pro-max
- playwright wrapper: $codex_home/skills/playwright/scripts/playwright_cli.sh
- ui-ux skill: $codex_home/skills/ui-ux-pro-max/SKILL.md
- runtime prerequisites: codex, node, npm, npx

Recommended pairings:

- browser_automation -> playwright skill
- browser_automation + filesystem_repo + memory -> ui-ux-pro-max skill
- docs_lookup -> direct MCP usage
- filesystem_repo -> direct MCP usage
- memory -> direct MCP usage
EOF
}

missing=0

for path in \
  ".mcp.example.json" \
  "docs/orchestration/mcp-registry.md" \
  "docs/orchestration/mcp-setup.md" \
  "docs/agents/mcp-policy.md"
do
  if ! check_file "$path"; then
    echo "Missing MCP file: $path" >&2
    missing=1
  fi
done

if [[ "$missing" -ne 0 ]]; then
  print_status "FAIL" "Missing required repository MCP artifacts."
  exit 1
fi

if ! command -v npx >/dev/null 2>&1; then
  print_status "FAIL" "npx is not available; MCP server startup via Node-based tools may fail."
  echo "Missing required command: npx" >&2
  exit 1
fi

if ! command -v codex >/dev/null 2>&1; then
  print_skill_status "FAIL" "codex CLI is not available, so skill-backed MCP workflows cannot be validated."
  print_status "FAIL" "codex CLI is not available; MCP registration cannot be validated."
  echo "Missing required command: codex" >&2
  exit 1
fi

if ! command -v node >/dev/null 2>&1 || ! command -v npm >/dev/null 2>&1; then
  print_skill_status "FAIL" "Node.js tooling is incomplete; skill and MCP workflows that depend on npx may fail."
  print_status "FAIL" "Node.js tooling is incomplete; MCP server startup via Node-based tools may fail."
  echo "Missing required Node.js tooling." >&2
  exit 1
fi

for server in filesystem_repo browser_automation docs_lookup memory; do
  if ! check_codex_mcp "$server"; then
    print_skill_status "FAIL" "Codex MCP server '$server' is not registered, so its paired workflow cannot be relied on."
    print_status "FAIL" "Required Codex MCP server '$server' is not registered."
    echo "Missing required Codex MCP server: $server" >&2
    exit 1
  fi
done

CODEX_HOME_DIR="${CODEX_HOME:-$HOME/.codex}"
PLAYWRIGHT_SKILL="$CODEX_HOME_DIR/skills/playwright/SKILL.md"
PLAYWRIGHT_WRAPPER="$CODEX_HOME_DIR/skills/playwright/scripts/playwright_cli.sh"
UIPRO_SKILL="$CODEX_HOME_DIR/skills/ui-ux-pro-max/SKILL.md"
SKILL_INSTALLER="$CODEX_HOME_DIR/skills/.system/skill-installer/SKILL.md"

if ! check_skill_file "$SKILL_INSTALLER"; then
  print_skill_status "FAIL" "The preinstalled system skill 'skill-installer' is missing."
  print_status "FAIL" "Skill prerequisites are incomplete."
  echo "Missing required system skill: skill-installer" >&2
  exit 1
fi

if ! check_skill_file "$PLAYWRIGHT_SKILL"; then
  print_skill_status "FAIL" "The user-scoped 'playwright' skill is not installed."
  print_status "FAIL" "Skill prerequisites are incomplete."
  echo "Missing required skill: playwright" >&2
  exit 1
fi

if ! check_skill_file "$PLAYWRIGHT_WRAPPER"; then
  print_skill_status "FAIL" "The Playwright skill wrapper script is missing."
  print_status "FAIL" "Skill prerequisites are incomplete."
  echo "Missing Playwright wrapper script." >&2
  exit 1
fi

if ! check_skill_file "$UIPRO_SKILL"; then
  print_skill_status "FAIL" "The user-scoped 'ui-ux-pro-max' skill is not installed."
  print_status "FAIL" "Skill prerequisites are incomplete."
  echo "Missing required skill: ui-ux-pro-max" >&2
  exit 1
fi

print_skill_status "PASS" "Required MCP-aligned skills and runtime prerequisites are present."
print_status "PASS" "Repository MCP documentation and baseline tooling prerequisites are present."
echo "MCP repository check passed."
