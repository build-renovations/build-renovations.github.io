#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
STATUS_DIR="$ROOT_DIR/agents/status"
REPORT_DIR="$ROOT_DIR/agents/status/reports"
GATE_REPORT="$STATUS_DIR/gates.md"

mkdir -p "$STATUS_DIR" "$REPORT_DIR"

require_file() {
  local path="$1"
  if [[ ! -f "$ROOT_DIR/$path" ]]; then
    echo "Missing required file: $path" >&2
    return 1
  fi
}

require_dir_nonempty() {
  local path="$1"
  if [[ ! -d "$ROOT_DIR/$path" ]]; then
    echo "Missing required directory: $path" >&2
    return 1
  fi

  if ! find "$ROOT_DIR/$path" -type f ! -name 'README.md' | grep -q .; then
    echo "Directory has no task outputs: $path" >&2
    return 1
  fi
}

run_gate_1() {
  require_file "agents/seo/keyword-map.md"
  require_file "agents/seo/site-architecture.md"
  require_file "agents/design/personas.md"
  require_file "agents/design/user-flows.md"
}

run_gate_2() {
  require_file "agents/design/design-system.md"
  require_file "agents/design/component-specs.md"
  require_file "agents/design/animation-guide.md"
  require_dir_nonempty "agents/content/page-copy"
  require_file "agents/content/microcopy.md"
  require_file "agents/seo/front-matter-templates.md"
}

run_gate_3() {
  "$ROOT_DIR/scripts/qa.sh"
  require_file "agents/status/dev.md"
  if ! grep -Eq '^Status:[[:space:]]*DONE$' "$ROOT_DIR/agents/status/dev.md"; then
    echo "Development status is not DONE in agents/status/dev.md" >&2
    return 1
  fi
}

start_server() {
  local port="${1:-4010}"
  (
    cd "$ROOT_DIR"
    RUBYOPT="-r./scripts/jekyll_compat.rb ${RUBYOPT:-}" \
      bundle exec jekyll serve \
      --host 127.0.0.1 \
      --port "$port" \
      --no-watch \
      --skip-initial-build
  ) >/tmp/remonty-gates-server.log 2>&1 &
  SERVER_PID=$!
  SERVER_PORT="$port"
  trap stop_server EXIT

  local attempts=0
  until curl -fsS "http://127.0.0.1:$SERVER_PORT/" >/dev/null 2>&1; do
    attempts=$((attempts + 1))
    if [[ "$attempts" -ge 20 ]]; then
      echo "Local gate server failed to start on port $SERVER_PORT" >&2
      return 1
    fi
    sleep 0.5
  done
}

stop_server() {
  if [[ -n "${SERVER_PID:-}" ]]; then
    kill "$SERVER_PID" >/dev/null 2>&1 || true
    wait "$SERVER_PID" 2>/dev/null || true
  fi
}

run_lighthouse() {
  local url="$1"
  local slug="$2"
  local out="$REPORT_DIR/lighthouse-$slug.json"

  npx --yes lighthouse "$url" \
    --output json \
    --output-path "$out" \
    --quiet \
    --chrome-flags="--headless=new --no-sandbox" >/dev/null

  node -e '
    const fs = require("fs");
    const path = process.argv[1];
    const report = JSON.parse(fs.readFileSync(path, "utf8"));
    const categories = ["performance", "accessibility", "best-practices", "seo"];
    const scores = categories.map((name) => ({
      name,
      score: Math.round((report.categories[name].score || 0) * 100)
    }));
    const failed = scores.filter((item) => item.score < 95);
    if (failed.length) {
      console.error(`Lighthouse threshold failed for ${path}: ${failed.map((x) => `${x.name}=${x.score}`).join(", ")}`);
      process.exit(1);
    }
  ' "$out"
}

run_pa11y() {
  local url="$1"
  local slug="$2"
  local out="$REPORT_DIR/pa11y-$slug.json"

  npx --yes pa11y "$url" \
    --standard WCAG2AA \
    --reporter json >"$out"

  node -e '
    const fs = require("fs");
    const path = process.argv[1];
    const report = JSON.parse(fs.readFileSync(path, "utf8"));
    if (Array.isArray(report) && report.length > 0) {
      console.error(`Accessibility violations found in ${path}: ${report.length}`);
      process.exit(1);
    }
  ' "$out"
}

run_link_check() {
  local url="$1"
  local out="$REPORT_DIR/link-check.json"

  npx --yes linkinator "$url" \
    --recurse \
    --skip "mailto:.*,tel:.*,build-renovations\.github\.io" \
    --format json >"$out"

  node -e '
    const fs = require("fs");
    const path = process.argv[1];
    const report = JSON.parse(fs.readFileSync(path, "utf8"));
    if ((report.links || []).some((item) => item.state === "BROKEN")) {
      console.error(`Broken links detected in ${path}`);
      process.exit(1);
    }
  ' "$out"
}

run_gate_4() {
  "$ROOT_DIR/scripts/qa.sh"
  start_server "${GATE_PORT:-4010}"
  run_lighthouse "http://127.0.0.1:$SERVER_PORT/" "uk-home"
  run_lighthouse "http://127.0.0.1:$SERVER_PORT/en/" "en-home"
  run_pa11y "http://127.0.0.1:$SERVER_PORT/" "uk-home"
  run_pa11y "http://127.0.0.1:$SERVER_PORT/en/" "en-home"
  run_link_check "http://127.0.0.1:$SERVER_PORT/"
}

write_report() {
  local gate="$1"
  local status="$2"
  local details="${3:-none}"

  cat >"$GATE_REPORT" <<EOF
# Gate Status

Last run: $(date -u +"%Y-%m-%d %H:%M:%S UTC")
Gate checked: $gate
Status: $status
Details: $details

Artifacts:

- Gate report: \`agents/status/gates.md\`
- Detailed reports: \`agents/status/reports/\`
EOF
}

main() {
  local gate="${1:-all}"
  local status="PASS"
  local details="none"

  if ! {
    case "$gate" in
      gate1)
        run_gate_1
        ;;
      gate2)
        run_gate_2
        ;;
      gate3)
        run_gate_3
        ;;
      gate4)
        run_gate_4
        ;;
      all)
        run_gate_1
        run_gate_2
        run_gate_3
        run_gate_4
        ;;
      *)
        echo "Usage: $0 [gate1|gate2|gate3|gate4|all]" >&2
        exit 1
        ;;
    esac
  }; then
    status="FAIL"
    details="See command output for the first failing requirement."
    write_report "$gate" "$status" "$details"
    exit 1
  fi

  write_report "$gate" "$status" "$details"
  echo "Gate check passed: $gate"
}

main "$@"
