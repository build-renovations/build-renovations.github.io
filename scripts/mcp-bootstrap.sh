#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
REPO_DIR="$ROOT_DIR"

ensure_codex() {
  if ! command -v codex >/dev/null 2>&1; then
    echo "Missing required command: codex" >&2
    exit 1
  fi
}

upsert_stdio_server() {
  local name="$1"
  shift

  if codex mcp get "$name" >/dev/null 2>&1; then
    codex mcp remove "$name" >/dev/null
  fi

  codex mcp add "$name" -- "$@"
}

ensure_codex

upsert_stdio_server filesystem_repo \
  npx --yes @modelcontextprotocol/server-filesystem "$REPO_DIR"

upsert_stdio_server browser_automation \
  npx --yes @playwright/mcp@latest --headless --isolated --caps vision,pdf,devtools --output-mode stdout

upsert_stdio_server docs_lookup \
  npx --yes @upstash/context7-mcp

upsert_stdio_server memory \
  npx --yes @modelcontextprotocol/server-memory

echo "Configured MCP servers:"
codex mcp list
