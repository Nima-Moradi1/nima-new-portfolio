"use client";

import { memo, useEffect, useLayoutEffect, useMemo, useRef, type RefObject } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Color, Group, MathUtils, Mesh, MeshPhysicalMaterial, RectAreaLight } from "three";
import { RectAreaLightUniformsLib } from "three/addons/lights/RectAreaLightUniformsLib.js";
import { proofIllumination, proofSceneBlend, type KineticSceneState } from "@/lib/kinetic-model";
import { createOutlineSymbols, outlineStation } from "./outline-symbols";

type Finish = { material: MeshPhysicalMaterial; opacity: number; depthWrite: boolean };
const SILVER = new Color("#c6d1d8");
const INK = new Color("#405c68");

/** Four open symbols share the existing scene, scroll and demand-render owner. */
export const EngineeringSymbols = memo(function EngineeringSymbols({ state, transition }: {
  state: RefObject<KineticSceneState>;
  transition: RefObject<{ entrance: number; exit: number }>;
}) {
  const root = useRef<Group>(null);
  const symbols = useRef<(Mesh | null)[]>([]);
  const key = useRef<RectAreaLight>(null);
  const rim = useRef<RectAreaLight>(null);
  const finishes = useRef<Finish[]>([]);
  const motion = useRef({ turn: 0, light: 0, theme: 0, entered: false });
  const revealStyle = useRef<HTMLElement | null>(null);
  const lastReveal = useRef(-1);
  const geometry = useMemo(createOutlineSymbols, []);
  const size = useThree(state => state.size);
  const gl = useThree(state => state.gl);

  useEffect(() => () => geometry.forEach(symbol => symbol.dispose()), [geometry]);
  useLayoutEffect(() => {
    RectAreaLightUniformsLib.init();
    revealStyle.current = gl.domElement.closest<HTMLElement>("[data-scene-ready]");
    key.current?.lookAt(0, 0, 0);
    rim.current?.lookAt(0, 0, 0);
    root.current?.traverse(object => {
      if (object instanceof Mesh && object.material instanceof MeshPhysicalMaterial) {
        finishes.current.push({ material: object.material, opacity: object.material.opacity, depthWrite: object.material.depthWrite });
      }
    });
    return () => { finishes.current = []; };
  }, [gl]);

  useFrame((_, delta) => {
    const model = state.current;
    if (!root.current || !model.visible || document.hidden) return;
    const { entrance, exit } = transition.current;
    const appearance = proofSceneBlend(entrance, exit).solar;
    const reveal = appearance < 0.0001 ? 0 : appearance > 0.9999 ? 1 : appearance;
    if (Math.abs(reveal - lastReveal.current) > 0.002 || ((reveal === 0 || reveal === 1) && reveal !== lastReveal.current)) {
      revealStyle.current?.style.setProperty("--solar-reveal", String(reveal));
      lastReveal.current = reveal;
    }
    root.current.visible = appearance > 0.0001;
    root.current.userData.solarVisibility = appearance;
    if (!root.current.visible) { motion.current.entered = false; return; }

    const mobile = size.width < 768 && size.height > size.width;
    const step = model.reducedMotion || !motion.current.entered ? 1 : 1 - Math.exp(-Math.min(delta, 0.05) * 10);
    motion.current.entered = true;
    const index = entrance < 0.999 ? 0 : MathUtils.clamp(model.proofIndex, 0, 3);
    const progress = entrance < 0.999 && (model.phase !== "proof" || model.proofIndex !== 0) ? 0 : MathUtils.clamp(model.proofProgress, 0, 1);
    const schedule = proofIllumination(progress);
    const turn = index === 0 ? -0.30 * (1 - schedule.orbit) : index - 1 + schedule.orbit;
    motion.current.turn = MathUtils.lerp(motion.current.turn, turn, step);
    motion.current.light = MathUtils.lerp(motion.current.light, schedule.beam, step);
    const themeTarget = document.documentElement.dataset.theme === "light" ? 1 : 0;
    motion.current.theme = MathUtils.lerp(motion.current.theme, themeTarget, document.documentElement.dataset.themeReveal === "true" ? 1 : step);
    const pointer = model.reducedMotion ? 0 : MathUtils.clamp(model.pointerX, -1, 1);

    root.current.position.set(mobile ? 0 : (model.isRtl ? -1 : 1) * 2.15,
      (mobile ? 1.74 : 0.10) + exit * 0.35, -0.25 - (1 - entrance) * 6 - exit * 6);
    root.current.scale.setScalar((mobile ? 0.65 : 1.20) * (0.42 + MathUtils.smoothstep(entrance, 0, 1) * 0.58) * (1 - exit * 0.28));
    root.current.rotation.y = pointer * 0.025;
    for (let i = 0; i < 4; i++) {
      const symbol = symbols.current[i];
      if (!symbol) continue;
      const pose = outlineStation(i, motion.current.turn);
      symbol.position.set(pose.x, pose.y, pose.z);
      symbol.scale.setScalar(pose.scale);
      // Never billboard: the physical cross sections remain visible at rest.
      symbol.rotation.set(pose.pitch, pose.yaw, i === 3 ? -0.30 : -0.045);
      const material = symbol.material as MeshPhysicalMaterial;
      material.color.copy(SILVER).lerp(INK, motion.current.theme);
      material.roughness = 0.23 - (i === index ? motion.current.light * 0.045 : 0);
    }
    // Broad physical sources and the existing baked studio illuminate strokes.
    // No luminous face ink, fake cone or extra animation ticker.
    if (key.current) key.current.intensity = (5 + motion.current.light * 2) * appearance;
    if (rim.current) rim.current.intensity = 4 * appearance;
    for (const { material, opacity, depthWrite } of finishes.current) {
      const fading = appearance < 0.9999;
      if (material.transparent !== fading) { material.transparent = fading; material.needsUpdate = true; }
      material.opacity = opacity * appearance;
      material.depthWrite = depthWrite && !fading;
    }
  });

  return (
    <group ref={root} name="nm-outline-symbols" visible={false}>
      {geometry.map((symbol, index) => (
        <mesh key={symbol.name} name={`nm-outline-${symbol.name}`} ref={element => { symbols.current[index] = element; }} geometry={symbol}>
          <meshPhysicalMaterial color={SILVER} metalness={0.92} roughness={0.23} clearcoat={0.35} clearcoatRoughness={0.20} envMapIntensity={0.85} />
        </mesh>
      ))}
      <rectAreaLight ref={key} name="nm-symbol-softbox" color="#fff4e7" position={[-2.5, 4, 4.5]} width={4} height={3} intensity={5} />
      <rectAreaLight ref={rim} name="nm-symbol-rim" color="#b7eaf0" position={[4, 1, 1]} width={2} height={4} intensity={4} />
    </group>
  );
});
