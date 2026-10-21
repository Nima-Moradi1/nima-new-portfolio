"use client";

import { Component, Suspense, useEffect, useLayoutEffect, useMemo, useRef, type ReactNode } from "react";
import { useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { CanvasTexture, ExtrudeGeometry, InstancedMesh, Object3D, Shape, SRGBColorSpace, type ColorRepresentation, type MeshPhysicalMaterial } from "three";

export const STUDIO = {
  void: "#05070b",
  titanium: "#727f8d",
  edge: "#b8c4ce",
  smoke: "#111923",
  ice: "#8be9f4",
  line: "#354153",
} as const;

const glassTime = { value: 0 };
const glassTheme = { value: 0 };
export function setNMGlassTime(value: number) { glassTime.value = value; }
export function setNMGlassTheme(value: number) { glassTheme.value = value; }

/** Light bands are evaluated on the authored letter surfaces, so every glint
 * stays inside the N/M silhouette and follows its actual depth and bevels. */
function glassReflections(shader: Parameters<MeshPhysicalMaterial["onBeforeCompile"]>[0]) {
  shader.uniforms.uNMGlassTime = glassTime;
  shader.uniforms.uNMGlassTheme = glassTheme;
  shader.vertexShader = shader.vertexShader.replace("#include <common>", `#include <common>
    varying vec3 vNMGlassPosition;
    varying vec3 vNMGlassNormal;
  `).replace("#include <begin_vertex>", `#include <begin_vertex>
    vNMGlassPosition = position;
    vNMGlassNormal = normal;
  `);
  shader.fragmentShader = shader.fragmentShader.replace("#include <common>", `#include <common>
    uniform float uNMGlassTime;
    uniform float uNMGlassTheme;
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
    vec3 nmInterior = mix(vec3(0.012, 0.04, 0.058), vec3(0.025, 0.14, 0.18), uNMGlassTheme) + outgoingLight * 0.11;
    vec3 nmPolishedEdge = outgoingLight * mix(0.7, 0.38, uNMGlassTheme) + mix(vec3(0.15, 0.34, 0.43), vec3(0.08, 0.21, 0.27), uNMGlassTheme);
    outgoingLight = mix(nmPolishedEdge, nmInterior, nmFace)
      + nmFace * (nmWarm * nmSoft * 0.48 + vec3(1.0, 0.98, 0.91) * nmWhite * 2.4
      + nmIce * nmCyan * 1.05 + nmIce * nmSecond * 0.36)
      + nmFresnel * nmIce * 0.55;
    diffuseColor.a = mix(mix(0.32, 0.72, uNMGlassTheme), 0.94, clamp(1.0 - nmFace + nmWhite * 0.75 + nmSoft * 0.28 + nmFresnel, 0.0, 1.0));
    #include <opaque_fragment>
  `);
}

/** A narrow travelling reflection belongs to the metal track itself. It shares
 * the scene's existing clock and sleeps whenever that scene stops rendering. */
function railReflections(shader: Parameters<MeshPhysicalMaterial["onBeforeCompile"]>[0]) {
  shader.uniforms.uNMGlassTime = glassTime;
  shader.vertexShader = shader.vertexShader.replace("#include <common>", `#include <common>
    varying vec2 vNMRailPosition;
  `).replace("#include <begin_vertex>", `#include <begin_vertex>
    vNMRailPosition = position.xy;
  `);
  shader.fragmentShader = shader.fragmentShader.replace("#include <common>", `#include <common>
    uniform float uNMGlassTime;
    varying vec2 vNMRailPosition;
  `).replace("#include <opaque_fragment>", `
    float nmRailAngle = atan(vNMRailPosition.y, vNMRailPosition.x);
    float nmRailSweep = max(0.0, cos(nmRailAngle - uNMGlassTime * 0.24));
    float nmRailGlint = pow(nmRailSweep, 48.0);
    outgoingLight += vec3(0.38, 0.61, 0.68) * nmRailGlint * 0.7;
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
    ]), 0.34, 0.045);
    const face = extrude(polygon([
      [-0.52, -1.20], [0.35, -1.20], [0.55, -1.00],
      [0.55, 1.15], [0.46, 1.23], [-0.52, 1.23],
    ]), 0.024, 0.012);
    // Broader capture windows preserve the original faceted silhouette while
    // avoiding the narrow phone-shaped plates of the first rig.
    shell.scale(1.22, 1, 1);
    face.scale(1.22, 1, 1);
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

function CartridgeHardware() {
  const brackets = useRef<InstancedMesh>(null);
  const collars = useRef<InstancedMesh>(null);
  const fasteners = useRef<InstancedMesh>(null);
  useLayoutEffect(() => {
    if (!brackets.current || !collars.current || !fasteners.current) return;
    const part = new Object3D();
    for (let side = 0; side < 2; side++) {
      const direction = side === 0 ? -1 : 1;
      part.position.set(0, direction * 1.465, -0.015);
      part.scale.set(0.24, 0.29, 0.21);
      part.rotation.set(0, 0, 0);
      part.updateMatrix();
      brackets.current.setMatrixAt(side, part.matrix);
      part.position.set(0, direction * 1.6, -0.015);
      part.scale.set(1, 1, 1);
      part.rotation.set(0, 0, Math.PI / 2);
      part.updateMatrix();
      collars.current.setMatrixAt(side, part.matrix);
      for (let edge = 0; edge < 2; edge++) {
        part.position.set(edge === 0 ? -0.64 : 0.64, direction * 1.19, 0.254);
        part.rotation.set(Math.PI / 2, 0, 0);
        part.updateMatrix();
        fasteners.current.setMatrixAt(side * 2 + edge, part.matrix);
      }
    }
    brackets.current.instanceMatrix.needsUpdate = true;
    collars.current.instanceMatrix.needsUpdate = true;
    fasteners.current.instanceMatrix.needsUpdate = true;
  }, []);
  return (
    <>
      <instancedMesh ref={brackets} args={[undefined, undefined, 2]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={STUDIO.titanium} metalness={0.92} roughness={0.24} />
      </instancedMesh>
      <instancedMesh ref={collars} args={[undefined, undefined, 2]}>
        <cylinderGeometry args={[0.105, 0.105, 0.43, 10]} />
        <meshStandardMaterial color={STUDIO.smoke} metalness={0.86} roughness={0.27} />
      </instancedMesh>
      <instancedMesh ref={fasteners} args={[undefined, undefined, 4]}>
        <cylinderGeometry args={[0.026, 0.026, 0.018, 8]} />
        <meshStandardMaterial color={STUDIO.edge} metalness={0.95} roughness={0.19} />
      </instancedMesh>
    </>
  );
}

function RailBridges() {
  const mesh = useRef<InstancedMesh>(null);
  useLayoutEffect(() => {
    if (!mesh.current) return;
    const clip = new Object3D();
    for (let index = 0; index < 28; index++) {
      const angle = (index / 28) * Math.PI * 2;
      clip.position.set(Math.sin(angle) * 3.375, 0, Math.cos(angle) * 3.375);
      clip.rotation.set(0, angle, 0);
      clip.updateMatrix();
      mesh.current.setMatrixAt(index, clip.matrix);
    }
    mesh.current.instanceMatrix.needsUpdate = true;
  }, []);
  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, 28]}>
      <boxGeometry args={[0.044, 0.055, 0.17]} />
      <meshStandardMaterial color={STUDIO.titanium} metalness={0.9} roughness={0.3} />
    </instancedMesh>
  );
}

export function NMMonogram({ geometry, accent = STUDIO.ice }: { geometry: NMGeometry; accent?: ColorRepresentation }) {
  const compact = useThree(state => state.size.width < 1024);
  return (
    <group position={[-0.13, 0, 0]}>
      <mesh geometry={geometry.n}>
        {/* The authored surface bands and Fresnel alpha retain the dimensional
            glass silhouette on compact GPUs without Three's transmission pass. */}
        {compact
          ? <meshStandardMaterial name="nm-glass" color="#d9f4fa" metalness={0.12} roughness={0.085} envMapIntensity={2.1} transparent depthWrite={false} onBeforeCompile={glassReflections} />
          : <meshPhysicalMaterial name="nm-glass" color="#d9f4fa" metalness={0.08} roughness={0.065} transmission={0.88} thickness={0.68} ior={1.46} clearcoat={1} clearcoatRoughness={0.045} envMapIntensity={2.1} attenuationColor="#a6e4ee" attenuationDistance={2.8} transparent depthWrite={false} onBeforeCompile={glassReflections} />}
      </mesh>
      <mesh geometry={geometry.m}>
        {compact
          ? <meshStandardMaterial name="nm-glass" color="#c7e9f2" metalness={0.10} roughness={0.10} envMapIntensity={2.4} transparent depthWrite={false} onBeforeCompile={glassReflections} />
          : <meshPhysicalMaterial name="nm-glass" color="#c7e9f2" metalness={0.06} roughness={0.085} transmission={0.9} thickness={0.74} ior={1.48} clearcoat={1} clearcoatRoughness={0.055} envMapIntensity={2.4} attenuationColor="#b5d9ed" attenuationDistance={2.5} transparent depthWrite={false} onBeforeCompile={glassReflections} />}
      </mesh>
      <mesh position={[0.135, 0, -0.02]}>
        <boxGeometry args={[0.018, 1.16, 0.13]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={1.1} roughness={0.45} />
      </mesh>
    </group>
  );
}

/** A failed optional preview settles the readiness gate and retains its physical
 * smoked backing. It cannot tear down the rest of the portfolio's renderer. */
class ProjectAssetBoundary extends Component<{ children: ReactNode; onSettled?: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onSettled?.(); }
  render() { return this.state.failed ? null : this.props.children; }
}

/** A real owner-project capture, animated through its UV window by the scene. */
function ProjectScreen({ image, index, onAssetReady }: { image: string; index: number; onAssetReady?: () => void }) {
  const source = useTexture(image);
  const texture = useMemo(() => {
    const map = source.clone();
    map.colorSpace = SRGBColorSpace;
    map.needsUpdate = true;
    return map;
  }, [source]);
  useEffect(() => () => texture.dispose(), [texture]);
  useEffect(() => { onAssetReady?.(); }, [texture, onAssetReady]);
  return (
    <mesh name={`nm-preview-${index}`} position={[0.018, 0.015, 0.271]} scale={[1.25, 2.2, 1]}>
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
    <mesh name="nm-company" position={[0.018, 0.015, 0.272]} scale={[1.25, 2.2, 1]} visible={false}>
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
  onAssetReady,
}: {
  geometry: NMGeometry;
  accent: string;
  index: number;
  image?: string;
  company?: string;
  onRendered?: () => void;
  onAssetReady?: () => void;
}) {
  const compact = useThree(state => state.size.width < 1024);
  return (
    <group>
      <group name="nm-body">
        {[-1, 1].map((side) => (
          <group key={side} name={side < 0 ? "nm-wing-left" : "nm-wing-right"} position={[side * 0.77, 0, -0.16]} rotation={[0, side * Math.PI, 0]} visible={false}>
            <mesh geometry={geometry.shell} position={[side * 0.77, 0, 0]}>
              <meshStandardMaterial color={STUDIO.titanium} metalness={0.91} roughness={0.27} />
            </mesh>
            <mesh geometry={geometry.face} position={[side * 0.77, 0, 0.237]}>
              {compact
                ? <meshStandardMaterial color={STUDIO.smoke} metalness={0.52} roughness={0.2} />
                : <meshPhysicalMaterial color={STUDIO.smoke} metalness={0.52} roughness={0.2} clearcoat={0.75} />}
            </mesh>
          </group>
        ))}
        <mesh geometry={geometry.shell} position={[0, 0, -0.14]} scale={[0.965, 0.98, 0.7]}>
          <meshStandardMaterial color="#080e17" metalness={0.76} roughness={0.32} />
        </mesh>
        <mesh geometry={geometry.shell} onAfterRender={onRendered}>
          <meshStandardMaterial name="nm-shell" color={STUDIO.titanium} metalness={0.93} roughness={0.22} />
        </mesh>
        <mesh geometry={geometry.face} position={[0, 0, 0.207]} scale={[1.04, 1.025, 1]}>
          <meshStandardMaterial color="#c3d3db" metalness={0.94} roughness={0.2} />
        </mesh>
        <mesh geometry={geometry.face} position={[0, 0, 0.237]}>
          {compact
            ? <meshStandardMaterial name="nm-smoke" color={STUDIO.smoke} metalness={0.48} roughness={0.16} />
            : <meshPhysicalMaterial name="nm-smoke" color={STUDIO.smoke} metalness={0.48} roughness={0.16} clearcoat={0.85} clearcoatRoughness={0.18} />}
        </mesh>
        {image && <ProjectAssetBoundary key={image} onSettled={onAssetReady}><Suspense fallback={null}><ProjectScreen image={image} index={index} onAssetReady={onAssetReady} /></Suspense></ProjectAssetBoundary>}
        {company && <CompanyPlate company={company} index={index} />}
        <mesh position={[0.014, 1.258, 0.247]}>
          <boxGeometry args={[1.08, 0.012, 0.012]} />
          <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.65} />
        </mesh>
        <mesh position={[0.018, -1.252, 0.247]}>
          <boxGeometry args={[0.24, 0.022, 0.014]} />
          <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.45} />
        </mesh>
        <CartridgeHardware />
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
            <torusGeometry args={[3.45, 0.075, 8, 96]} />
            <meshStandardMaterial color={STUDIO.titanium} metalness={0.94} roughness={0.24} onBeforeCompile={railReflections} />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -side * 0.035, 0]}>
            <torusGeometry args={[3.3, 0.03, 6, 96]} />
            <meshStandardMaterial color="#233441" metalness={0.85} roughness={0.29} />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, side * 0.069, 0]}>
            <torusGeometry args={[3.45, 0.009, 4, 96]} />
            <meshStandardMaterial color={STUDIO.ice} emissive={STUDIO.ice} emissiveIntensity={0.23} metalness={0.7} roughness={0.3} onBeforeCompile={railReflections} />
          </mesh>
          <RailBridges />
        </group>
      ))}
    </group>
  );
}
