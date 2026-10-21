"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, type RefObject } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import {
  AdditiveBlending, DoubleSide, ExtrudeGeometry, Group, MathUtils, Mesh,
  MeshBasicMaterial, MeshStandardMaterial, Object3D, PointLight, Shape, SpotLight, Vector3,
} from "three";
import { proofIllumination, proofSceneBlend, type KineticSceneState } from "@/lib/kinetic-model";
import { STUDIO } from "./nm-geometry";

const HALF_PI = Math.PI / 2;
const TILT = 0.34;
const RADIUS = 2.28;
const PALETTE = [STUDIO.ice, STUDIO.edge, "#b29bff", "#e5b78e"] as const;
const WARM = "#e5b78e";
const smooth = (value: number) => MathUtils.smoothstep(value, 0, 1);
const angleDistance = (value: number) => Math.atan2(Math.sin(value), Math.cos(value));
const UP = new Vector3(0, 1, 0);
type FadeMaterial = { material: MeshBasicMaterial | MeshStandardMaterial; opacity: number; transparent: boolean; depthWrite: boolean };

/** Imperative Three material state; no React render values are changed. */
function applyOpacity({ material, opacity, transparent, depthWrite }: FadeMaterial, visibility: number) {
  const fading = visibility < 0.9999;
  const nextTransparent = transparent || fading;
  if (material.transparent !== nextTransparent) { material.transparent = nextTransparent; material.needsUpdate = true; }
  material.opacity = opacity * visibility;
  material.depthWrite = depthWrite && !fading;
}

function polygon(points: readonly (readonly [number, number])[]) {
  const shape = new Shape();
  points.forEach(([x, y], index) => index ? shape.lineTo(x, y) : shape.moveTo(x, y));
  shape.closePath();
  return shape;
}

function bar(x: number, y: number, width: number, height: number) {
  return polygon([[x, y], [x + width, y], [x + width, y + height], [x, y + height]]);
}

function dot(x: number, y: number, radius: number) {
  const shape = new Shape();
  shape.absarc(x, y, radius, 0, Math.PI * 2, false);
  return shape;
}

/** Original physical emblems: interface window, services, intelligence, launch.
 * Each is one beveled solid, rather than language-specific image artwork. */
function useEmblems() {
  const emblems = useMemo(() => {
    const silhouettes = [
      [
        bar(-0.21, -0.15, 0.035, 0.30), bar(0.175, -0.15, 0.035, 0.30),
        bar(-0.21, 0.115, 0.42, 0.035), bar(-0.21, -0.15, 0.42, 0.035),
        bar(-0.19, 0.035, 0.38, 0.025), bar(-0.13, -0.065, 0.10, 0.035),
        bar(0.015, -0.065, 0.115, 0.035), dot(-0.12, 0.085, 0.014),
      ],
      [
        bar(-0.195, 0.105, 0.39, 0.065), bar(-0.195, -0.0325, 0.39, 0.065),
        bar(-0.195, -0.17, 0.39, 0.065), bar(-0.12, -0.11, 0.025, 0.075),
        bar(0.095, 0.035, 0.025, 0.075),
      ],
      [
        dot(0, 0, 0.070), dot(-0.17, 0.15, 0.045), dot(0.17, 0.15, 0.045),
        dot(-0.17, -0.15, 0.045), dot(0.17, -0.15, 0.045),
        polygon([[-0.17, 0.135], [-0.15, 0.16], [0.17, -0.135], [0.15, -0.16]]),
        polygon([[-0.17, -0.135], [-0.15, -0.16], [0.17, 0.135], [0.15, 0.16]]),
      ],
      [
        polygon([[0, 0.225], [-0.075, 0.11], [-0.075, -0.075], [-0.16, -0.15],
          [-0.16, -0.205], [-0.035, -0.13], [0.035, -0.13], [0.16, -0.205],
          [0.16, -0.15], [0.075, -0.075], [0.075, 0.11]]),
        bar(-0.025, -0.225, 0.05, 0.065),
      ],
    ];
    return silhouettes.map(shapes => {
      const geometry = new ExtrudeGeometry(shapes, {
        depth: 0.025, bevelEnabled: true, bevelSize: 0.006,
        bevelThickness: 0.006, bevelSegments: 1, curveSegments: 10, steps: 1,
      });
      geometry.translate(0, 0, -0.0125);
      return geometry;
    });
  }, []);
  useEffect(() => () => emblems.forEach(geometry => geometry.dispose()), [emblems]);
  return emblems;
}

/** One native-scroll-driven solar instrument. The existing scene owns the
 * demand-render wake/sleep policy; this component never starts another ticker. */
export function SolarSystem({ state, transition }: {
  state: RefObject<KineticSceneState>;
  transition: RefObject<{ entrance: number; exit: number }>;
}) {
  const root = useRef<Group>(null);
  const sun = useRef<Group>(null);
  const corona = useRef<Group>(null);
  const orbit = useRef<Group>(null);
  const planets = useRef<(Group | null)[]>([]);
  const bodies = useRef<(Mesh | null)[]>([]);
  const emblems = useRef<(Mesh | null)[]>([]);
  const beam = useRef<Group>(null);
  const outerBeam = useRef<Mesh>(null);
  const innerBeam = useRef<Mesh>(null);
  const beamTarget = useRef<Object3D>(null);
  const beamLight = useRef<SpotLight>(null);
  const sunLight = useRef<PointLight>(null);
  const motion = useRef({ turn: 0, light: 0, entered: false });
  const fadeMaterials = useRef<FadeMaterial[]>([]);
  const revealStyle = useRef<HTMLElement | null>(null);
  const lastReveal = useRef(-1);
  const vectors = useMemo(() => ({ planet: new Vector3(), direction: new Vector3() }), []);
  const geometry = useEmblems();
  const { size, gl } = useThree();
  const solarUniforms = useRef({ time: { value: 0 }, light: { value: 0 } });
  const solarSurface = useMemo(() => (shader: Parameters<MeshStandardMaterial["onBeforeCompile"]>[0]) => {
    shader.uniforms.uNMSolarTime = solarUniforms.current.time;
    shader.uniforms.uNMSolarLight = solarUniforms.current.light;
    shader.vertexShader = shader.vertexShader.replace("#include <common>", `#include <common>
      varying vec3 vNMSolarPosition;
    `).replace("#include <begin_vertex>", `#include <begin_vertex>
      vNMSolarPosition = position;
    `);
    shader.fragmentShader = shader.fragmentShader.replace("#include <common>", `#include <common>
      varying vec3 vNMSolarPosition;
      uniform float uNMSolarTime;
      uniform float uNMSolarLight;
    `).replace("#include <opaque_fragment>", `
      float nmSolarCurl = sin(vNMSolarPosition.y * 29.0
        + sin(vNMSolarPosition.x * 11.0 + uNMSolarTime * 0.22) * 1.8
        + sin(vNMSolarPosition.z * 9.0 - uNMSolarTime * 0.17));
      float nmSolarFilament = pow(0.5 + nmSolarCurl * 0.5, 10.0);
      outgoingLight += vec3(1.0, 0.62, 0.30)
        * (0.16 + nmSolarFilament * 0.34 + uNMSolarLight * 0.16);
      #include <opaque_fragment>
    `);
  }, [solarUniforms]);

  useLayoutEffect(() => {
    revealStyle.current = gl.domElement.closest<HTMLElement>("[data-scene-ready]");
    if (beamLight.current && beamTarget.current) beamLight.current.target = beamTarget.current;
    const seen = new Set<MeshBasicMaterial | MeshStandardMaterial>();
    root.current?.traverse(object => {
      if (!(object instanceof Mesh) || object === outerBeam.current || object === innerBeam.current) return;
      for (const material of Array.isArray(object.material) ? object.material : [object.material]) {
        if (!(material instanceof MeshBasicMaterial || material instanceof MeshStandardMaterial) || seen.has(material)) continue;
        seen.add(material);
        fadeMaterials.current.push({ material, opacity: material.opacity, transparent: material.transparent, depthWrite: material.depthWrite });
      }
    });
    return () => { fadeMaterials.current = []; };
  }, [gl]);

  useFrame(({ clock, camera }, delta) => {
    const model = state.current;
    if (!root.current || !model.visible || document.hidden) return;
    const { entrance, exit } = transition.current;
    const appearance = proofSceneBlend(entrance, exit).solar;
    const reveal = appearance < 0.0001 ? 0 : appearance > 0.9999 ? 1 : appearance;
    if (Math.abs(reveal - lastReveal.current) > 0.002 || ((reveal === 0 || reveal === 1) && reveal !== lastReveal.current)) {
      revealStyle.current?.style.setProperty("--solar-reveal", String(reveal));
      lastReveal.current = reveal;
    }
    const visible = appearance > 0.0001;
    // Only skip a hierarchy after its materials and real lights are already
    // effectively transparent. Its lifetime crosses both chapter boundaries.
    root.current.visible = visible;
    root.current.userData.proofEntrance = entrance;
    root.current.userData.proofExit = exit;
    root.current.userData.solarVisibility = appearance;
    if (!visible) { motion.current.entered = false; return; }
    const mobile = size.width < 768 && size.height > size.width;
    const step = model.reducedMotion || !motion.current.entered ? 1 : 1 - Math.exp(-Math.min(delta, 0.05) * 13);
    motion.current.entered = true;
    const index = entrance < 0.999 ? 0 : MathUtils.clamp(model.proofIndex, 0, 3);
    const progress = entrance < 0.999 && (model.phase !== "proof" || model.proofIndex !== 0) ? 0 : MathUtils.clamp(model.proofProgress, 0, 1);
    const schedule = proofIllumination(progress);
    const arrival = schedule.orbit;
    // A stage begins at the previous planet and finishes its actual quarter
    // revolution before the sunbeam reveals the incoming stage's HTML copy.
    const turn = index === 0 ? -0.44 * (1 - arrival) : index - 1 + arrival;
    motion.current.turn = MathUtils.lerp(motion.current.turn, turn, step);
    const illumination = schedule.beam;
    motion.current.light = MathUtils.lerp(motion.current.light, illumination, step);
    const light = motion.current.light * appearance;
    const pointerX = model.reducedMotion ? 0 : MathUtils.clamp(model.pointerX, -1, 1);
    root.current.position.set(mobile ? 0 : (model.isRtl ? -1 : 1) * 1.85, (mobile ? 1.95 : 0.25) + exit * 0.35, -0.25 - (1 - entrance) * 6 - exit * 6);
    root.current.scale.setScalar((mobile ? 0.69 : 1.08) * (0.42 + smooth(entrance) * 0.58) * (1 - exit * 0.28));
    // Geometry stays in one legible orbital plane. Medallions face the real
    // camera while the sphere positions trace the plane in perspective.
    const yaw = -motion.current.turn * HALF_PI;
    for (let planetIndex = 0; planetIndex < 4; planetIndex++) {
      const planet = planets.current[planetIndex];
      if (!planet) continue;
      const angle = planetIndex * HALF_PI + yaw;
      const front = Math.pow(Math.max(0, Math.cos(angleDistance(angle))), 4);
      const radius = RADIUS + (planetIndex % 2) * 0.12;
      planet.position.set(Math.sin(angle) * radius, -Math.cos(angle) * radius * Math.sin(TILT), Math.cos(angle) * radius * Math.cos(TILT));
      planet.quaternion.copy(camera.quaternion);
      const selectedLight = planetIndex === index ? light : 0;
      planet.scale.setScalar(0.80 + front * 0.35 + selectedLight * 0.10);
      const body = bodies.current[planetIndex];
      if (body) {
        const material = body.material as MeshStandardMaterial;
        material.emissiveIntensity = 0.04 + selectedLight * 0.42;
        material.roughness = 0.32 - selectedLight * 0.10;
      }
      const emblem = emblems.current[planetIndex];
      if (emblem) (emblem.material as MeshStandardMaterial).emissiveIntensity = 0.16 + selectedLight * 1.3;
      if (planetIndex === index) vectors.planet.copy(planet.position);
    }
    if (beam.current) {
      const distance = vectors.planet.length();
      vectors.direction.copy(vectors.planet).normalize();
      const start = 0.74;
      const end = Math.max(start + 0.1, distance - 0.40);
      beam.current.position.copy(vectors.direction).multiplyScalar((start + end) * 0.5);
      beam.current.quaternion.setFromUnitVectors(UP, vectors.direction);
      beam.current.scale.set(1, end - start, 1);
      beam.current.visible = light > 0.005;
      if (outerBeam.current) (outerBeam.current.material as MeshBasicMaterial).opacity = light * 0.095;
      if (innerBeam.current) (innerBeam.current.material as MeshBasicMaterial).opacity = light * 0.34;
    }
    if (beamTarget.current) beamTarget.current.position.copy(vectors.planet);
    if (beamLight.current) beamLight.current.intensity = light * 17;
    if (sunLight.current) sunLight.current.intensity = (3.5 + motion.current.light * 2.5) * appearance;
    for (const material of fadeMaterials.current) applyOpacity(material, appearance);
    solarUniforms.current.time.value = model.reducedMotion ? 1 : clock.elapsedTime;
    solarUniforms.current.light.value = light;
    if (sun.current) {
      const pulse = model.reducedMotion ? 0 : Math.sin(progress * Math.PI) * 0.025 * light;
      sun.current.scale.setScalar(1 + pulse);
      sun.current.rotation.y = motion.current.turn * 0.20 + pointerX * 0.025;
    }
    if (corona.current) {
      corona.current.rotation.z = -motion.current.turn * 0.22;
      corona.current.rotation.y = motion.current.turn * 0.08;
    }
    if (orbit.current) orbit.current.rotation.z = pointerX * 0.012;
  });

  return (
    <group ref={root} name="nm-solar-system" visible={false}>
      <group ref={orbit} name="nm-solar-orbits">
        {[RADIUS, RADIUS + 0.12].map((radius, index) => (
          <mesh key={radius} rotation={[HALF_PI + TILT, 0, 0]}>
            <torusGeometry args={[radius, index ? 0.008 : 0.015, 6, 112]} />
            <meshStandardMaterial color={index ? STUDIO.line : STUDIO.titanium} metalness={0.85} roughness={0.30} emissive={STUDIO.ice} emissiveIntensity={index ? 0.02 : 0.08} />
          </mesh>
        ))}
        <mesh rotation={[HALF_PI + TILT, 0, 0]}>
          <torusGeometry args={[RADIUS + 0.25, 0.005, 5, 112]} />
          <meshBasicMaterial color={STUDIO.line} transparent opacity={0.48} />
        </mesh>
      </group>
      <group ref={sun} name="nm-solar-sun">
        <mesh>
          <sphereGeometry args={[0.68, 40, 28]} />
          <meshStandardMaterial color={WARM} metalness={0.62} roughness={0.30} emissive={WARM} emissiveIntensity={0.28} onBeforeCompile={solarSurface} customProgramCacheKey={() => "nm-solar-surface-v1"} />
        </mesh>
        <mesh scale={1.08}>
          <sphereGeometry args={[0.68, 28, 18]} />
          <meshBasicMaterial color={WARM} transparent opacity={0.045} blending={AdditiveBlending} depthWrite={false} />
        </mesh>
      </group>
      <group ref={corona} name="nm-solar-corona">
        <mesh rotation={[0.38, -0.26, 0.25]}>
          <torusGeometry args={[0.82, 0.014, 8, 88, Math.PI * 1.74]} />
          <meshStandardMaterial color={WARM} metalness={0.82} roughness={0.23} emissive={WARM} emissiveIntensity={0.4} />
        </mesh>
        <mesh rotation={[-0.75, 0.64, -0.32]}>
          <torusGeometry args={[0.91, 0.009, 6, 88, Math.PI * 1.65]} />
          <meshStandardMaterial color={STUDIO.edge} metalness={0.9} roughness={0.23} />
        </mesh>
      </group>
      {PALETTE.map((accent, index) => (
        <group key={accent} ref={element => { planets.current[index] = element; }} name={`nm-solar-planet-${index}`}>
          <mesh ref={element => { bodies.current[index] = element; }} scale={[1, 1, 0.86]}>
            <sphereGeometry args={[0.48, 32, 22]} />
            <meshStandardMaterial color={STUDIO.smoke} metalness={0.76} roughness={0.32} emissive={accent} emissiveIntensity={0.04} />
          </mesh>
          <mesh position={[0, 0, 0.407]} rotation={[HALF_PI, 0, 0]}>
            <cylinderGeometry args={[0.335, 0.355, 0.046, 40]} />
            <meshStandardMaterial color={STUDIO.titanium} metalness={0.88} roughness={0.25} />
          </mesh>
          <mesh position={[0, 0, 0.434]}>
            <circleGeometry args={[0.317, 40]} />
            <meshStandardMaterial color={STUDIO.void} metalness={0.58} roughness={0.33} />
          </mesh>
          <mesh position={[0, 0, 0.443]}>
            <torusGeometry args={[0.336, 0.010, 6, 56]} />
            <meshStandardMaterial color={accent} metalness={0.72} roughness={0.24} emissive={accent} emissiveIntensity={0.12} />
          </mesh>
          <mesh ref={element => { emblems.current[index] = element; }} geometry={geometry[index]} position={[0, 0, 0.455]}>
            <meshStandardMaterial color={STUDIO.edge} metalness={0.55} roughness={0.27} emissive={accent} emissiveIntensity={0.16} />
          </mesh>
          <mesh rotation={[0.35, -0.25, index * 0.45]}>
            <torusGeometry args={[0.49, 0.008, 6, 64, Math.PI * 1.65]} />
            <meshStandardMaterial color={STUDIO.titanium} metalness={0.85} roughness={0.28} />
          </mesh>
        </group>
      ))}
      <group ref={beam} name="nm-solar-beam">
        <mesh ref={outerBeam}>
          <cylinderGeometry args={[0.38, 0.045, 1, 24, 1, true]} />
          <meshBasicMaterial color={WARM} transparent opacity={0} blending={AdditiveBlending} side={DoubleSide} depthWrite={false} />
        </mesh>
        <mesh ref={innerBeam}>
          <cylinderGeometry args={[0.022, 0.012, 1, 10, 1, true]} />
          <meshBasicMaterial color={WARM} transparent opacity={0} blending={AdditiveBlending} side={DoubleSide} depthWrite={false} />
        </mesh>
      </group>
      <pointLight ref={sunLight} name="nm-solar-radiance" color={WARM} intensity={3.5} distance={6} decay={2} />
      <spotLight ref={beamLight} name="nm-solar-keylight" color={WARM} intensity={0} distance={5} angle={0.25} penumbra={0.65} decay={2} />
      <object3D ref={beamTarget} name="nm-solar-beam-target" />
    </group>
  );
}
