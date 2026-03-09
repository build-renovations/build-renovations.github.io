#!/usr/bin/env bash
set -euo pipefail

if [ -d "_site" ]; then
  find "_site" -mindepth 1 -maxdepth 1 -exec rm -rf {} +
fi

RUBYOPT="-r./scripts/jekyll_compat.rb ${RUBYOPT:-}" bundle exec jekyll serve "$@"
