#!/usr/bin/env bash
set -euo pipefail

if [ -d "_site" ]; then
  find "_site" -mindepth 1 -maxdepth 1 -exec rm -rf {} +
fi

RUBYOPT="-r./scripts/jekyll_compat.rb ${RUBYOPT:-}" bundle exec jekyll build

test -f "_site/index.html"
test -f "_site/en/index.html"
test -f "_site/services/index.html"
test -f "_site/en/services/index.html"
test -f "_site/sitemap.xml"

echo "Build and file checks passed."
