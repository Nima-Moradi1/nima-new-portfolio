import { afterAll, describe, expect, it } from "vitest";
import { Mesh, MeshBasicMaterial, Raycaster, Vector3 } from "three";
import { createOutlineSymbols, outlineStation } from "@/components/kinetic/outline-symbols";

const symbols = createOutlineSymbols();
afterAll(() => symbols.forEach(symbol => symbol.dispose()));

describe("open physical engineering symbols", () => {
  it("leaves the center of every silhouette physically empty", () => {
    const ray = new Raycaster(new Vector3(0, 0, 3), new Vector3(0, 0, -1));
    const material = new MeshBasicMaterial();
    for (const geometry of symbols) {
      const mesh = new Mesh(geometry, material);
      mesh.updateMatrixWorld(true);
      expect(ray.intersectObject(mesh), geometry.name).toHaveLength(0);
    }
    material.dispose();
  });

  it("retains real volume with a bounded combined mobile geometry budget", () => {
    let triangles = 0;
    for (const geometry of symbols) {
      const size = geometry.boundingBox!.getSize(new Vector3());
      expect(size.z).toBeGreaterThan(0.045);
      expect(size.x).toBeGreaterThan(0.8);
      expect(size.y).toBeGreaterThan(0.8);
      expect(Array.from(geometry.attributes.position.array).every(Number.isFinite)).toBe(true);
      triangles += geometry.index!.count / 3;
    }
    expect(triangles).toBeLessThan(30000);
  });

  it("brings each corresponding symbol to the same foreground station", () => {
    for (let index = 0; index < 4; index++) {
      expect(outlineStation(index, index)).toEqual(outlineStation(0, 0));
    }
  });

  it("keeps four distinct stations through a full forward and reverse turn", () => {
    for (let turn = 0; turn <= 4; turn += 0.05) {
      const stations = symbols.map((_, index) => outlineStation(index, turn));
      for (let i = 0; i < 4; i++) {
        const a = stations[i];
        const b = stations[(i + 1) % 4];
        expect(Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z)).toBeGreaterThan(2.6);
        expect(a.scale).toBeGreaterThanOrEqual(0.67);
        expect(a.scale).toBeLessThanOrEqual(1.45 + 1e-10);
        expect(Math.abs(a.yaw)).toBeLessThanOrEqual(0.5);
      }
    }
  });

  it("has no orientation or position discontinuity at chapter boundaries", () => {
    for (let turn = 1; turn < 4; turn++) {
      const before = outlineStation(0, turn - 0.00001);
      const after = outlineStation(0, turn + 0.00001);
      for (const key of ["x", "y", "z", "yaw", "pitch", "scale"] as const) {
        expect(Math.abs(before[key] - after[key])).toBeLessThan(0.0001);
      }
    }
  });
});
