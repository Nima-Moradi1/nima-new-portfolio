// The owner's original PDF is authoritative; do not synthesize a different CV.
import { copyFile, readFile } from "node:fs/promises";
import assert from "node:assert/strict";
const source = process.argv[2];
assert(
  source,
  "Usage: node scripts/generate-resume.mjs <owner-supplied.pdf>. Copy the original unchanged, then render its first page to the documented preview path.",
);
const bytes = await readFile(source);
assert(bytes.subarray(0, 5).toString() === "%PDF-", "Expected an original PDF");
await copyFile(source, "public/nima-moradirad-resume.pdf");
console.log(
  "Copied original PDF unchanged. Regenerate and inspect the preview before publication.",
);
