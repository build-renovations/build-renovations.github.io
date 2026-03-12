#!/usr/bin/env bash
set -euo pipefail

check_image_policy() {
  local disallowed
  disallowed="$(find assets/images -type f \( -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.png' -o -iname '*.tif' -o -iname '*.tiff' \) | sort || true)"
  if [ -n "$disallowed" ]; then
    echo "Disallowed raster formats found in assets/images. Use metadata-free WebP instead:"
    echo "$disallowed"
    exit 1
  fi

  while IFS= read -r file; do
    [ -n "$file" ] || continue
    metadata="$(ffprobe -v error -show_entries format_tags:stream_tags -of default=nw=1:nk=1 "$file" 2>/dev/null || true)"
    if [ -n "$metadata" ]; then
      echo "Metadata detected in image file: $file"
      echo "$metadata"
      exit 1
    fi
  done < <(find assets/images -type f -iname '*.webp' | sort)

  while IFS= read -r file; do
    [ -n "$file" ] || continue
    if rg -n "<metadata|dc:|cc:|rdf:" "$file" >/dev/null 2>&1; then
      echo "Metadata-like block detected in SVG file: $file"
      exit 1
    fi
  done < <(find assets/images -type f -iname '*.svg' | sort)
}

check_image_policy

if [ -d "_site" ]; then
  find "_site" -mindepth 1 -maxdepth 1 -exec rm -rf {} +
fi

RUBYOPT="-r./scripts/jekyll_compat.rb ${RUBYOPT:-}" bundle exec jekyll build

test -f "_site/index.html"
test -f "_site/en/index.html"
test -f "_site/services/index.html"
test -f "_site/en/services/index.html"
test -f "_site/sitemap.xml"

node ./scripts/phase1_render_checks.mjs
node ./scripts/phase2_render_checks.mjs
node ./scripts/phase3_render_checks.mjs
node ./scripts/phase4_render_checks.mjs

echo "Build and file checks passed."
