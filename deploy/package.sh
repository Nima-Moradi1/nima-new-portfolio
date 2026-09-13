#!/usr/bin/env bash
set -euo pipefail

[[ "$(uname -s)" == Linux ]] || { echo 'Package production on Linux.' >&2; exit 1; }
test -n "${GITHUB_SHA:-}"
test "$(cat .next/BUILD_ID)" = "$GITHUB_SHA"
test -f .next/standalone/server.js
# Never reuse generated runtime files from a previous build.
test ! -e build/liara
mkdir -p build/liara .next/standalone/.next
cp -a public .next/standalone/public
cp -a .next/static .next/standalone/.next/static
cp deploy/healthcheck.cjs .next/standalone/healthcheck.cjs
tar --exclude='.env*' --exclude='*.tsbuildinfo' \
  -czf build/liara/runtime.tar.gz -C .next/standalone .
cp deploy/Dockerfile deploy/.liaraignore liara.json build/liara/
sha256sum build/liara/runtime.tar.gz > build/runtime.sha256
du -h build/liara/runtime.tar.gz
