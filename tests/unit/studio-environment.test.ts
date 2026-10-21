import { readFileSync } from "node:fs";
import { gunzipSync } from "node:zlib";
import { describe, expect, it } from "vitest";
import { HalfFloatType } from "three";
import { EXRLoader } from "three/examples/jsm/loaders/EXRLoader.js";

describe("native-decoded studio environment", () => {
  it("preserves every half-float pixel of the authored EXR within the transfer budget", () => {
    const source = readFileSync("public/brand/nm-studio-pmrem-ca2c15880201.exr");
    const original = new EXRLoader().setDataType(HalfFloatType).parse(source.buffer.slice(source.byteOffset, source.byteOffset + source.byteLength));
    const encoded = readFileSync("public/brand/nm-studio-pmrem-2e044b9d72b8.bin");
    const decoded = gunzipSync(encoded);
    expect([original.width, original.height]).toEqual([384, 512]);
    expect(decoded.byteLength).toBe(384 * 512 * 4 * 2);
    expect(encoded.byteLength).toBeLessThan(80_000);
    expect(Buffer.compare(decoded, Buffer.from(original.data.buffer, original.data.byteOffset, original.data.byteLength))).toBe(0);
  });
});
