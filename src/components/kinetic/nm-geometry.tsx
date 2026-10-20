"use client";

import { Suspense, useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { useTexture } from "@react-three/drei";
import { CanvasTexture, Color, ExtrudeGeometry, InstancedMesh, Object3D, Shape, SRGBColorSpace, type ColorRepresentation, type MeshPhysicalMaterial } from "three";

export const STUDIO = {
  void: "#05070b",
  titanium: "#727f8d",
  edge: "#b8c4ce",
  smoke: "#111923",
  ice: "#8be9f4",
  line: "#354153",
} as const;

const glassTime = { value: 0 };
export function setNMGlassTime(value: number) { glassTime.value = value; }

/** Light bands are evaluated on the authored letter surfaces, so every glint
 * stays inside the N/M silhouette and follows its actual depth and bevels. */
function glassReflections(shader: Parameters<MeshPhysicalMaterial["onBeforeCompile"]>[0]) {
  shader.uniforms.uNMGlassTime = glassTime;
  shader.vertexShader = shader.vertexShader.replace("#include <common>", `#include <common>
    varying vec3 vNMGlassPosition;
    varying vec3 vNMGlassNormal;
  `).replace("#include <begin_vertex>", `#include <begin_vertex>
    vNMGlassPosition = position;
    vNMGlassNormal = normal;
  `);
  shader.fragmentShader = shader.fragmentShader.replace("#include <common>", `#include <common>
    uniform float uNMGlassTime;
    varying vec3 vNMGlassPosition;
    varying vec3 vNMGlassNormal;
  `).replace("#include <opaque_fragment>", `
    vec2 nmP = vNMGlassPosition.xy;
    float nmFace = smoothstep(0.35, 0.92, abs(normalize(vNMGlassNormal).z));
    float nmSweep = sin(uNMGlassTime * 0.42) * 1.55;
    float nmDiagonal = nmP.x + nmP.y * 0.68 - nmSweep;
    float nmSoftDistance = nmDiagonal * 6.0;
    float nmWhiteDistance = (nmDiagonal + 0.032) * 65.0;
    float nmCyanDistance = (nmDiagonal - 0.12) * 42.0;
    float nmSecondDistance = (nmP.x - nmP.y * 0.36 + sin(uNMGlassTime * 0.27) * 1.2) * 30.0;
    float nmSoft = exp(-nmSoftDistance * nmSoftDistance);
    float nmWhite = exp(-nmWhiteDistance * nmWhiteDistance);
    float nmCyan = exp(-nmCyanDistance * nmCyanDistance);
    float nmSecond = exp(-nmSecondDistance * nmSecondDistance);
    float nmFresnelBase = 1.0 - clamp(abs(dot(normalize(normal), normalize(vViewPosition))), 0.0, 1.0);
    float nmFresnel = nmFresnelBase * nmFresnelBase;
    vec3 nmWarm = vec3(1.0, 0.86, 0.65);
    vec3 nmIce = vec3(0.44, 0.9, 1.0);
    vec3 nmInterior = vec3(0.012, 0.04, 0.058) + outgoingLight * 0.11;
    vec3 nmPolishedEdge = outgoingLight * 0.7 + vec3(0.15, 0.34, 0.43);
    outgoingLight = mix(nmPolishedEdge, nmInterior, nmFace)
      + nmFace * (nmWarm * nmSoft * 0.48 + vec3(1.0, 0.98, 0.91) * nmWhite * 2.4
      + nmIce * nmCyan * 1.05 + nmIce * nmSecond * 0.36)
      + nmFresnel * nmIce * 0.55;
    diffuseColor.a = mix(0.32, 0.94, clamp(1.0 - nmFace + nmWhite * 0.75 + nmSoft * 0.28 + nmFresnel, 0.0, 1.0));
    #include <opaque_fragment>
  `);
}

function polygon(points: readonly (readonly [number, number])[]) {
  const shape = new Shape();
  points.forEach(([x, y], index) => {
    if (index === 0) shape.moveTo(x, y);
    else shape.lineTo(x, y);
  });
  shape.closePath();
  return shape;
}

function extrude(shape: Shape | Shape[], depth: number, bevel = 0.035) {
  const geometry = new ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelSegments: 2,
    steps: 1,
    bevelSize: bevel,
    bevelThickness: bevel,
    curveSegments: 1,
  });
  geometry.translate(0, 0, -depth / 2);
  geometry.computeVertexNormals();
  return geometry;
}

export function useNMGeometry() {
  const geometry = useMemo(() => {
    const shell = extrude(polygon([
      [-0.61, -1.31], [0.40, -1.31], [0.66, -1.06],
      [0.66, 1.19], [0.52, 1.34], [-0.61, 1.34],
    ]), 0.25);
    const face = extrude(polygon([
      [-0.52, -1.20], [0.35, -1.20], [0.55, -1.00],
      [0.55, 1.15], [0.46, 1.23], [-0.52, 1.23],
    ]), 0.024, 0.012);
    const n = extrude(polygon([
      [-0.92, -0.58], [-0.92, 0.58], [-0.66, 0.58], [-0.17, -0.13],
      [-0.17, 0.58], [0.08, 0.58], [0.08, -0.58], [-0.17, -0.58],
      [-0.66, 0.12], [-0.66, -0.58],
    ]), 0.24, 0.035);
    const m = extrude(polygon([
      [0.18, -0.58], [0.18, 0.58], [0.42, 0.58], [0.68, 0.14],
      [0.94, 0.58], [1.18, 0.58], [1.18, -0.58], [0.93, -0.58],
      [0.93, 0.03], [0.68, -0.35], [0.43, 0.03], [0.43, -0.58],
    ]), 0.24, 0.035);
    // Four small physical engineering signatures, authored from the same metal
    // as the identity. They are language independent and share source geometry.
    const interfaceTrace = extrude([
      polygon([[-0.42, -0.2], [-0.42, 0.2], [0.42, 0.2], [0.42, 0.13], [-0.34, 0.13], [-0.34, -0.2]]),
      polygon([[-0.2, -0.15], [-0.2, 0.04], [-0.12, 0.04], [-0.12, -0.07], [0.42, -0.07], [0.42, -0.15]]),
    ], 0.025, 0.006);
    const serviceTrace = extrude([
      polygon([[-0.42, -0.16], [-0.42, 0.16], [-0.28, 0.16], [-0.28, 0.04], [0.28, 0.04], [0.28, 0.16], [0.42, 0.16], [0.42, -0.16], [0.28, -0.16], [0.28, -0.04], [-0.28, -0.04], [-0.28, -0.16]]),
      polygon([[-0.07, 0.09], [-0.07, 0.26], [0.07, 0.26], [0.07, 0.09]]),
    ], 0.025, 0.006);
    const intelligenceTrace = extrude([
      polygon([[-0.42, 0], [-0.14, 0.24], [0.14, 0], [0.06, -0.06], [-0.14, 0.11], [-0.34, -0.06]]),
      polygon([[-0.14, 0], [0.14, -0.24], [0.42, 0], [0.34, 0.06], [0.14, -0.11], [-0.06, 0.06]]),
    ], 0.025, 0.006);
    const deliveryTrace = extrude([
      polygon([[-0.4, -0.2], [-0.4, -0.08], [0, 0.2], [0.4, -0.08], [0.4, -0.2], [0, 0.08]]),
      polygon([[-0.4, 0.02], [-0.4, 0.14], [0, 0.42], [0.4, 0.14], [0.4, 0.02], [0, 0.3]]),
    ], 0.025, 0.006);
    return { shell, face, n, m, interfaceTrace, serviceTrace, intelligenceTrace, deliveryTrace };
  }, []);
  const lease = useRef({ active: 0, disposed: false });
  useEffect(() => {
    const lifetime = lease.current;
    lifetime.active++;
    return () => {
      lifetime.active--;
      // Strict Mode replays the effect before this microtask. Only final release
      // disposes the shared source geometry; JSX-created materials dispose in R3F.
      queueMicrotask(() => {
        if (lifetime.active || lifetime.disposed) return;
        lifetime.disposed = true;
        Object.values(geometry).forEach((item) => item.dispose());
      });
    };
  }, [geometry]);
  return geometry;
}

export type NMGeometry = ReturnType<typeof useNMGeometry>;

function IndexEtching({ index }: { index: number }) {
  const mesh = useRef<InstancedMesh>(null);
  useLayoutEffect(() => {
    if (!mesh.current) return;
    const marker = new Object3D();
    const color = new Color();
    for (let tick = 0; tick < 7; tick++) {
      marker.position.set(-0.4 + tick * 0.105, -0.82, 0.198);
      marker.scale.set(tick <= index ? 0.048 : 0.018, 0.11, 0.008);
      marker.updateMatrix();
      mesh.current.setMatrixAt(tick, marker.matrix);
      mesh.current.setColorAt(tick, color.set(tick <= index ? STUDIO.edge : STUDIO.line));
    }
    mesh.current.instanceMatrix.needsUpdate = true;
    if (mesh.current.instanceColor) mesh.current.instanceColor.needsUpdate = true;
  }, [index]);
  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, 7]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial metalness={0.65} roughness={0.38} />
    </instancedMesh>
  );
}

function RailClips() {
  const mesh = useRef<InstancedMesh>(null);
  useLayoutEffect(() => {
    if (!mesh.current) return;
    const clip = new Object3D();
    for (let index = 0; index < 12; index++) {
      const angle = (index / 12) * Math.PI * 2;
      clip.position.set(Math.sin(angle) * 3.45, 0, Math.cos(angle) * 3.45);
      clip.rotation.set(0, angle, 0);
      clip.updateMatrix();
      mesh.current.setMatrixAt(index, clip.matrix);
    }
    mesh.current.instanceMatrix.needsUpdate = true;
  }, []);
  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, 12]}>
      <boxGeometry args={[0.12, 0.16, 0.15]} />
      <meshStandardMaterial color={STUDIO.smoke} metalness={0.85} roughness={0.35} />
    </instancedMesh>
  );
}

export function NMMonogram({ geometry, accent = STUDIO.ice }: { geometry: NMGeometry; accent?: ColorRepresentation }) {
  return (
    <group position={[-0.13, 0, 0]}>
      <mesh geometry={geometry.n}>
        <meshPhysicalMaterial name="nm-glass" color="#d9f4fa" metalness={0.08} roughness={0.065} transmission={0.88} thickness={0.68} ior={1.46} clearcoat={1} clearcoatRoughness={0.045} envMapIntensity={2.1} attenuationColor="#a6e4ee" attenuationDistance={2.8} transparent depthWrite={false} onBeforeCompile={glassReflections} />
      </mesh>
      <mesh geometry={geometry.m}>
        <meshPhysicalMaterial name="nm-glass" color="#c7e9f2" metalness={0.06} roughness={0.085} transmission={0.9} thickness={0.74} ior={1.48} clearcoat={1} clearcoatRoughness={0.055} envMapIntensity={2.4} attenuationColor="#b5d9ed" attenuationDistance={2.5} transparent depthWrite={false} onBeforeCompile={glassReflections} />
      </mesh>
      <mesh position={[0.135, 0, -0.02]}>
        <boxGeometry args={[0.018, 1.16, 0.13]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={1.1} roughness={0.45} />
      </mesh>
    </group>
  );
}

/** A real owner-project capture, animated through its UV window by the scene. */
function ProjectScreen({ image, index }: { image: string; index: number }) {
  const source = useTexture(image);
  const texture = useMemo(() => {
    const map = source.clone();
    map.colorSpace = SRGBColorSpace;
    map.needsUpdate = true;
    return map;
  }, [source]);
  useEffect(() => () => texture.dispose(), [texture]);
  return (
    <mesh name={`nm-preview-${index}`} position={[0.015, 0.015, 0.183]} scale={[1.025, 2.2, 1]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial map={texture} toneMapped={false} />
    </mesh>
  );
}

function CompanyPlate({ company, index }: { company: string; index: number }) {
  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 384;
    canvas.height = 768;
    const context = canvas.getContext("2d")!;
    const background = context.createLinearGradient(0, 0, 384, 768);
    background.addColorStop(0, "#263947");
    background.addColorStop(1, STUDIO.smoke);
    context.fillStyle = background;
    context.fillRect(0, 0, 384, 768);
    context.fillStyle = STUDIO.ice;
    context.font = "20px monospace";
    context.fillText(String(index + 1).padStart(2, "0"), 32, 70);
    context.fillStyle = "#e7eff6";
    context.font = "600 48px sans-serif";
    context.textAlign = "center";
    const name = company.split(" · ")[0];
    context.direction = /[\u0600-\u06ff]/.test(name) ? "rtl" : "ltr";
    const words = name.split(" ");
    let line = "";
    let y = 350;
    words.forEach((word) => {
      const next = line ? `${line} ${word}` : word;
      if (line && context.measureText(next).width > 310) {
        context.fillText(line, 192, y, 320);
        y += 66;
        line = word;
      } else line = next;
    });
    context.fillText(line, 192, y, 320);
    const map = new CanvasTexture(canvas);
    map.colorSpace = SRGBColorSpace;
    return map;
  }, [company, index]);
  useEffect(() => () => texture.dispose(), [texture]);
  return (
    <mesh name="nm-company" position={[0.015, 0.015, 0.184]} scale={[1.025, 2.2, 1]} visible={false}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial map={texture} toneMapped={false} />
    </mesh>
  );
}

/** Shared original geometry with authentic project media, never repeated branding. */
export function NMCartridge({
  geometry,
  accent,
  index,
  image,
  company,
  onRendered,
}: {
  geometry: NMGeometry;
  accent: string;
  index: number;
  image?: string;
  company?: string;
  onRendered?: () => void;
}) {
  return (
    <group>
      <group name="nm-body">
        {[-1, 1].map((side) => (
          <group key={side} name={side < 0 ? "nm-wing-left" : "nm-wing-right"} position={[side * 0.63, 0, -0.16]} rotation={[0, side * Math.PI, 0]} visible={false}>
            <mesh geometry={geometry.shell} position={[side * 0.63, 0, 0]}>
              <meshStandardMaterial color={STUDIO.titanium} metalness={0.91} roughness={0.27} />
            </mesh>
            <mesh geometry={geometry.face} position={[side * 0.63, 0, 0.153]}>
              <meshPhysicalMaterial color={STUDIO.smoke} metalness={0.52} roughness={0.2} clearcoat={0.75} />
            </mesh>
          </group>
        ))}
        <mesh geometry={geometry.shell} onAfterRender={onRendered}>
          <meshStandardMaterial name="nm-shell" color={STUDIO.titanium} metalness={0.91} roughness={0.27} />
        </mesh>
        <mesh geometry={geometry.face} position={[0, 0, 0.153]}>
          <meshPhysicalMaterial name="nm-smoke" color={STUDIO.smoke} metalness={0.52} roughness={0.2} clearcoat={0.75} clearcoatRoughness={0.26} />
        </mesh>
        {image && <Suspense fallback={null}><ProjectScreen image={image} index={index} /></Suspense>}
        {company && <CompanyPlate company={company} index={index} />}
        <mesh position={[0.014, 0.94, 0.185]}>
          <boxGeometry args={[0.88, 0.014, 0.009]} />
          <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.9} />
        </mesh>
        <mesh position={[-0.34, -0.63, 0.2]}>
          <boxGeometry args={[0.19, 0.025, 0.012]} />
          <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.45} />
        </mesh>
        <IndexEtching index={index} />
        <mesh position={[0, 1.43, 0]}>
          <boxGeometry args={[0.35, 0.16, 0.23]} />
          <meshStandardMaterial color={STUDIO.smoke} metalness={0.85} roughness={0.28} />
        </mesh>
        <mesh position={[0, 1.52, 0]}>
          <boxGeometry args={[0.18, 0.035, 0.18]} />
          <meshStandardMaterial color={STUDIO.edge} metalness={0.8} roughness={0.25} />
        </mesh>
        <mesh position={[0, -1.43, 0]}>
          <boxGeometry args={[0.4, 0.2, 0.22]} />
          <meshStandardMaterial color={STUDIO.smoke} metalness={0.85} roughness={0.28} />
        </mesh>
        {[0, 1].map((side) => (
          <mesh key={side} position={[side === 0 ? -0.48 : 0.48, 1.1, 0.19]}>
            <cylinderGeometry args={[0.025, 0.025, 0.018, 8]} />
            <meshStandardMaterial color={STUDIO.edge} metalness={0.9} roughness={0.22} />
          </mesh>
        ))}
        <mesh name="nm-proof-mark" geometry={geometry.interfaceTrace} position={[0, -0.34, 0.2]} visible={false}>
          <meshStandardMaterial color={accent} metalness={0.72} roughness={0.3} emissive={accent} emissiveIntensity={0.25} />
        </mesh>
      </group>
      <group name="nm-identity" position={[-0.035, 0.21, 0.20]} scale={0.43}>
        <NMMonogram geometry={geometry} accent={accent} />
      </group>
    </group>
  );
}

export function EngineeredRail() {
  return (
    <group>
      {[-1, 1].map((side) => (
        <group key={side} position={[0, side * 1.6, 0]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[3.45, 0.052, 5, 72]} />
            <meshStandardMaterial color={STUDIO.titanium} metalness={0.88} roughness={0.35} />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, side * 0.07, 0]}>
            <torusGeometry args={[3.37, 0.012, 4, 72]} />
            <meshStandardMaterial color={STUDIO.ice} emissive={STUDIO.ice} emissiveIntensity={0.32} roughness={0.7} />
          </mesh>
          <RailClips />
        </group>
      ))}
    </group>
  );
}
