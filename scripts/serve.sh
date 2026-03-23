#!/usr/bin/env bash
set -euo pipefail

if command -v rbenv >/dev/null 2>&1; then eval "$(rbenv init - bash)"; fi

if [ -d "_site" ]; then
  find "_site" -mindepth 1 -maxdepth 1 -exec rm -rf {} +
fi

RUBYOPT="-r./scripts/jekyll_compat.rb ${RUBYOPT:-}" bundle exec jekyll serve "$@"
