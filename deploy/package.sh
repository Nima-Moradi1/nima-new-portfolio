#!/usr/bin/env bash
set -euo pipefail

[[ "$(uname -s)" == Linux ]] || { echo 'Package production on Linux.' >&2; exit 1; }
test -n "${GITHUB_SHA:-}" || { echo 'GITHUB_SHA is required.' >&2; exit 1; }
# Next 16 uses a constant BUILD_ID when deploymentId enables version-skew
# protection. Validate the embedded deployment ID, not that internal BUILD_ID.
node -e 'const assert = require("node:assert/strict"); const {config} = require("./.next/required-server-files.json"); assert.equal(config.deploymentId, process.env.GITHUB_SHA, "Build belongs to another commit"); assert.equal(config.env.DEPLOYMENT_SHA, process.env.GITHUB_SHA);'
test -f .next/standalone/server.js || { echo 'Standalone server is missing.' >&2; exit 1; }
# Never reuse generated runtime files from a previous build.
test ! -e build/liara || { echo 'Refusing to reuse an existing runtime bundle.' >&2; exit 1; }
mkdir -p build/liara .next/standalone/.next
cp -a public .next/standalone/public
cp -a .next/static .next/standalone/.next/static
cp deploy/healthcheck.cjs .next/standalone/healthcheck.cjs
tar --exclude='.env*' --exclude='*.tsbuildinfo' \
  -czf build/liara/runtime.tar.gz -C .next/standalone .
cp deploy/Dockerfile deploy/.liaraignore liara.json build/liara/
sha256sum build/liara/runtime.tar.gz > build/runtime.sha256
du -h build/liara/runtime.tar.gz
