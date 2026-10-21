import { CatmullRomCurve3, Path, SphereGeometry, TubeGeometry, Vector3, type BufferGeometry } from "three";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";

type Point = readonly [number, number, number];

/** Original NM symbols: round solid strokes, open centers and physical depth. */
export function createOutlineSymbols() {
  const symbols: BufferGeometry[] = [];
  let parts: BufferGeometry[] = [];
  const stroke = (points: readonly Point[], closed = false, radius = 0.036) => {
    const curve = new CatmullRomCurve3(points.map(point => new Vector3(...point)), closed, "centripetal");
    parts.push(new TubeGeometry(curve, points.length === 2 ? 1 : Math.max(48, points.length * 2), radius, 8, closed));
    if (!closed) {
      for (const point of [points[0], points[points.length - 1]]) {
        parts.push(new SphereGeometry(radius, 8, 6).translate(...point));
      }
    }
  };
  const line = (a: Point, b: Point, radius = 0.029) => stroke([a, b], false, radius);
  const circle = (x: number, y: number, z: number, radius: number, tube = 0.025) => {
    stroke(Array.from({ length: 32 }, (_, i) => {
      const angle = i / 32 * Math.PI * 2;
      return [x + Math.cos(angle) * radius, y + Math.sin(angle) * radius, z] as const;
    }), true, tube);
  };
  const rectangle = (x: number, y: number, w: number, h: number, r: number, z: number) => {
    const path = new Path();
    path.moveTo(x + r, y);
    path.lineTo(x + w - r, y);
    path.quadraticCurveTo(x + w, y, x + w, y + r);
    path.lineTo(x + w, y + h - r);
    path.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    path.lineTo(x + r, y + h);
    path.quadraticCurveTo(x, y + h, x, y + h - r);
    path.lineTo(x, y + r);
    path.quadraticCurveTo(x, y, x + r, y);
    stroke(path.getSpacedPoints(64).slice(0, -1).map(p => [p.x, p.y, z]), true);
  };
  const finish = (name: string) => {
    const geometry = mergeGeometries(parts);
    parts.forEach(part => part.dispose());
    parts = [];
    geometry.name = name;
    geometry.computeBoundingBox();
    geometry.computeBoundingSphere();
    symbols.push(geometry);
  };

  // Interface: one open window, a fine toolbar and two physical dots.
  rectangle(-0.85, -0.59, 1.7, 1.18, 0.15, 0);
  line([-0.82, 0.26, 0], [0.82, 0.26, 0], 0.021);
  for (const x of [-0.62, -0.46]) parts.push(new SphereGeometry(0.037, 10, 8).translate(x, 0.43, 0));
  finish("interface");

  // Services: hollow frames with return edges, no opaque server boxes.
  for (const y of [-0.29, 0.29]) {
    rectangle(-0.67, y - 0.20, 1.34, 0.40, 0.10, 0.17);
    rectangle(-0.67, y - 0.20, 1.34, 0.40, 0.10, -0.29);
    for (const x of [-0.64, 0.64]) {
      for (const dy of [-0.13, 0.13]) line([x, y + dy, 0.17], [x, y + dy, -0.29], 0.022);
    }
    circle(0.43, y, 0.18, 0.045, 0.018);
  }
  finish("systems");

  // Intelligence: chip perimeter, aligned pins and an open diamond core.
  rectangle(-0.46, -0.46, 0.92, 0.92, 0.13, 0);
  for (const offset of [-0.27, 0, 0.27]) {
    for (const side of [-1, 1]) {
      line([side * 0.47, offset, 0], [side * 0.66, offset, 0], 0.024);
      line([offset, side * 0.47, 0], [offset, side * 0.66, 0], 0.024);
    }
  }
  const diamond: Point[] = [[0, 0.25, 0.02], [0.22, 0, 0.02], [0, -0.25, 0.02], [-0.22, 0, 0.02]];
  diamond.forEach((point, index) => line(point, diamond[(index + 1) % 4], 0.023));
  finish("intelligence");

  // Delivery: outlined body, open fins, porthole and restrained exhaust.
  stroke([[0, 0.80, 0], [-0.21, 0.54, 0], [-0.29, 0.15, 0], [-0.25, -0.36, 0],
    [0, -0.45, 0], [0.25, -0.36, 0], [0.29, 0.15, 0], [0.21, 0.54, 0]], true);
  circle(0, 0.24, 0.01, 0.13, 0.024);
  stroke([[-0.28, 0, -0.02], [-0.48, -0.22, -0.02], [-0.52, -0.51, -0.02], [-0.25, -0.36, -0.02]], false, 0.025);
  stroke([[0.28, 0, -0.02], [0.48, -0.22, -0.02], [0.52, -0.51, -0.02], [0.25, -0.36, -0.02]], false, 0.025);
  stroke([[-0.11, -0.55, 0], [0, -0.78, 0], [0.11, -0.55, 0]], false, 0.023);
  finish("delivery");
  return symbols;
}

/** Four evenly spaced stations on a reversible, vertically separated orbit. */
export function outlineStation(index: number, turn: number) {
  const angle = (index - turn) * Math.PI / 2;
  const front = (Math.cos(angle) + 1) / 2;
  return {
    x: Math.sin(angle) * 2.10,
    y: 0.50 - Math.cos(angle) * 1.16 + Math.sin(angle) ** 2 * 0.38,
    z: Math.cos(angle) * 1.65,
    scale: 0.67 + front * front * 0.78,
    yaw: -0.32 - Math.sin(angle) * 0.18,
    pitch: -0.10 + Math.cos(angle) * 0.05,
  };
}
