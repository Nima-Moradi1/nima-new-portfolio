"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, type RefObject } from "react";
import { addAfterEffect, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { Color, Group, MathUtils, Mesh, MeshBasicMaterial, MeshPhysicalMaterial, MeshStandardMaterial, PerspectiveCamera, PointLight, Vector3 } from "three";
import type { KineticSceneState } from "@/lib/kinetic-model";
import type { ExperienceItem, ProjectItem } from "@/types/portfolio";
import { EngineeredRail, NMCartridge, setNMGlassTime, STUDIO, useNMGeometry } from "./nm-geometry";

export type SceneProps = {
  state: RefObject<KineticSceneState>;
  accents: readonly string[];
  projects: readonly ProjectItem[];
  experiences?: readonly ExperienceItem[];
  onProjectClick?: (index: number) => void;
  onReady: () => void;
};

const TAU = Math.PI * 2;
const clamp = MathUtils.clamp;
const smooth = (value: number) => MathUtils.smoothstep(value, 0, 1);
const angleDistance = (value: number) => Math.atan2(Math.sin(value), Math.cos(value));

/** A single continuous rig: the same cartridges survive every chapter and mode. */
export function MonolithScene({ state, accents, projects, experiences, onProjectClick, onReady }: SceneProps) {
  const geometry = useNMGeometry();
  const rig = useRef<Group>(null);
  const pivot = useRef<Group>(null);
  const rails = useRef<Group>(null);
  const cartridges = useRef<(Group | null)[]>([]);
  const parts = useRef<{ body: Group; identity: Group; signature: Mesh; left: Group; right: Group; company?: Mesh; preview?: Mesh }[]>([]);
  const accentLight = useRef<PointLight>(null);
  const sunLight = useRef<PointLight>(null);
  const firstFrame = useRef(false);
  const exitSettled = useRef(false);
  const activityUntil = useRef(0);
  const modeChange = useRef({ revision: -1, elapsed: 2, count: 7, nextCount: 7, item: 0 });
  const target = useRef(new Vector3());
  const targetColor = useRef(new Color(STUDIO.ice));
  const adaptive = useRef({ frames: 0, total: 0, lowered: false });
  const displayedMode = useRef<string | null>(null);
  const { gl, size, invalidate, setDpr } = useThree();

  useLayoutEffect(() => {
    parts.current = cartridges.current.map((group) => ({
      body: group!.getObjectByName("nm-body") as Group,
      identity: group!.getObjectByName("nm-identity") as Group,
      signature: group!.getObjectByName("nm-proof-mark") as Mesh,
      left: group!.getObjectByName("nm-wing-left") as Group,
      right: group!.getObjectByName("nm-wing-right") as Group,
      company: group!.getObjectByName("nm-company") as Mesh | undefined,
    }));
  }, []);

  useEffect(() => {
    const mobile = size.width < 768;
    const cap = adaptive.current.lowered ? (mobile ? 1 : 1.15) : (mobile ? 1.15 : 1.5);
    setDpr(Math.min(window.devicePixelRatio || 1, cap));
    invalidate();
  }, [size.width, setDpr, invalidate]);

  const ready = useCallback(() => {
    if (firstFrame.current) return;
    firstFrame.current = true;
    onReady();
  }, [onReady]);

  useEffect(() => {
    // Deep links may initially place every cartridge outside the camera. The
    // renderer's completed frame still makes that semantic page ready to enter.
    const remove = addAfterEffect(() => {
      if (firstFrame.current) { remove(); return; }
      if (gl.info.render.frame > 0) { ready(); remove(); }
    });
    invalidate();
    return remove;
  }, [gl, invalidate, ready]);

  useEffect(() => {
    const wake = () => {
      const model = state.current;
      if (!model.visible || document.hidden) return;
      if (exitSettled.current && (model.phase === "faq" || model.phase === "contact") && modeChange.current.revision === model.modeRevision) return;
      activityUntil.current = performance.now() + 1500;
      invalidate();
    };
    const events = ["scroll", "pointermove", "resize", "nm:scene-update"];
    events.forEach((event) => window.addEventListener(event, wake, { passive: true }));
    document.addEventListener("visibilitychange", wake);
    wake();
    return () => {
      events.forEach((event) => window.removeEventListener(event, wake));
      document.removeEventListener("visibilitychange", wake);
    };
  }, [invalidate, state]);

  useFrame(({ clock, camera }, delta) => {
    const model = state.current;
    if (!rig.current || !pivot.current || !rails.current || !model) return;
    const mobile = size.width < 768;
    const reduced = model.reducedMotion;
    const step = reduced || !firstFrame.current ? 1 : 1 - Math.exp(-Math.min(delta, 0.05) * 10);
    const dormant = !model.visible || document.hidden;
    if (dormant) return;
    setNMGlassTime(reduced ? 1.8 : clock.elapsedTime);
    const transition = modeChange.current;
    const requestedCount = Math.max(1, Math.min(7, model.count));

    if (transition.revision !== model.modeRevision) {
      const initial = transition.revision === -1;
      transition.revision = model.modeRevision;
      transition.elapsed = initial || reduced ? 2 : 0;
      transition.nextCount = requestedCount;
      if (initial) transition.count = requestedCount;
    }
    // A demand renderer's first delta after sleep can span several seconds.
    // Do not let that skip a newly requested mode exchange in a single frame.
    transition.elapsed += Math.min(delta, 0.05);
    // Collect -> change count behind the central shell -> fan out. Last intent wins.
    const modeTime = transition.elapsed / (mobile ? 0.62 : 0.86);
    const collect = modeTime < 1 ? Math.sin(clamp(modeTime, 0, 1) * Math.PI) : 0;
    if (modeTime >= 0.5) {
      transition.count = transition.nextCount;
      if (displayedMode.current !== model.mode) {
        displayedMode.current = model.mode;
        const matte = model.mode === "experience";
        // The finish changes only at the occluded middle of a mode exchange.
        rig.current.traverse((object) => {
          if (!(object instanceof Mesh) || Array.isArray(object.material)) return;
          const material = object.material;
          if (material instanceof MeshStandardMaterial && material.name === "nm-shell") {
            material.roughness = matte ? 0.62 : 0.27;
            material.color.set(matte ? "#8b969f" : STUDIO.titanium);
          } else if (material instanceof MeshPhysicalMaterial && material.name === "nm-smoke") {
            material.color.set(matte ? "#29333e" : STUDIO.smoke);
            material.metalness = matte ? 0.74 : 0.52;
            material.roughness = matte ? 0.56 : 0.2;
            material.clearcoat = matte ? 0.15 : 0.75;
          }
        });
      }
    }
    const count = transition.count;
    const detailIndex = model.mode === "projects" ? model.detailIndex : -1;
    const detailActive = detailIndex >= 0 && model.detailProgress > 0 && model.detailProgress < 1 && model.phase === "carousel";
    const detailOpen = !detailActive ? 0 : smooth(Math.min(model.detailProgress / 0.18, (1 - model.detailProgress) / 0.18));
    const desiredItem = Math.max(0, Math.min(count - 1, detailActive ? detailIndex : model.itemProgress));
    const effectiveItem = collect > 0.92 ? Math.round(desiredItem) : desiredItem;
    transition.item = MathUtils.lerp(transition.item, effectiveItem, reduced ? 1 : step * 0.8);

    const phase = model.phase;
    const p = clamp(model.chapterProgress, 0, 1);
    // The single-mark opening is the original NM adaptation in docs/05; the
    // measured reference itself starts with its ring already assembled.
    const deployment = phase === "hero" ? 0 : phase === "assembly" ? smooth(p) : 1;
    const focus = phase === "proof" || phase === "statement" ? 1
        : phase === "recap" ? 1 - smooth(p) : 0;
    const exit = phase === "faq" || phase === "contact" ? 1 : 0;
    const recap = phase === "recap" ? smooth(p) : exit;
    const active = detailActive ? detailIndex : Math.round(transition.item) % count;
    const direction = model.isRtl ? -1 : 1;
    const centered = phase === "statement" ? smooth(p) : phase === "recap" || exit ? 1 : 0;
    const poseX = mobile ? 0 : direction * (1.7 + focus * 0.2) * (1 - centered) * (1 - detailOpen);
    const pointerX = reduced || dormant ? 0 : clamp(model.pointerX, -1, 1);
    const pointerY = reduced || dormant ? 0 : clamp(model.pointerY, -1, 1);
    const activityRemaining = activityUntil.current - performance.now();
    // Float only during an input wake; ease to a fixed pose before demand sleep.
    const idleWeight = smooth(activityRemaining / 600);
    const idle = reduced || dormant || exit ? 0 : Math.sin(clock.elapsedTime * 0.42) * 0.045 * idleWeight;
    target.current.set(poseX + pointerX * (mobile ? 0.05 : 0.13) * (1 - detailOpen), mobile ? MathUtils.lerp(1.8, 0.65, detailOpen) : 0.12, -0.3);
    rig.current.position.lerp(target.current, step);
    rig.current.rotation.x = MathUtils.lerp(rig.current.rotation.x, (-0.045 + pointerY * 0.035) * (1 - detailOpen), step);
    const glassYaw = deployment < 1 && !reduced ? Math.sin(clock.elapsedTime * 0.34) * 0.11 * (1 - deployment) : 0;
    rig.current.rotation.y = MathUtils.lerp(rig.current.rotation.y, (pointerX * 0.035 + glassYaw) * (1 - detailOpen), step);
    rig.current.rotation.z = MathUtils.lerp(rig.current.rotation.z, (-0.045 + idle * 0.1) * (1 - detailOpen), step);

    // Every radial node and both rails share one actual turntable. Individual
    // transforms only fold/deploy it or lift the selected solid out for proof.
    const pivotYaw = -transition.item * TAU / count;
    pivot.current.rotation.y = pivotYaw;
    const cosPivot = Math.cos(pivotYaw);
    const sinPivot = Math.sin(pivotYaw);

    for (let index = 0; index < 7; index++) {
      const group = cartridges.current[index];
      if (!group) continue;
      group.visible = index < count;
      if (!group.visible) continue;
      const baseAngle = index * TAU / count;
      const angle = angleDistance(baseAngle + pivotYaw);
      const closeness = Math.pow(Math.max(0, Math.cos(angle)), 5);
      const chosen = index === active;
      const radius = 3.45;
      let x = Math.sin(angle) * radius;
      let y = idle * closeness;
      let z = Math.cos(angle) * radius - 1.45;
      let yaw = angle;
      let scale = 0.91 + closeness * 0.1;
      if (mobile) {
        // Keep complete foreground geometry; distant pieces occupy depth, not copy.
        x *= 0.73;
        z -= (1 - closeness) * 1.5;
        scale *= 0.88 + closeness * 0.12;
      }
      x = MathUtils.lerp(chosen ? 0 : Math.sin(angle) * 0.035, x, deployment);
      y = MathUtils.lerp(chosen ? 0 : -0.02 * index, y, deployment);
      z = MathUtils.lerp(chosen ? 2 : 1.5 - index * 0.06, z, deployment);
      yaw = MathUtils.lerp(-0.2, yaw, deployment);
      if (!chosen) scale *= smooth((deployment - 0.12) / 0.88);
      if (focus > 0) {
        x = MathUtils.lerp(x, chosen ? 0 : Math.sin(angle) * 0.8, focus);
        z = MathUtils.lerp(z, chosen ? 2.3 : -2.8, focus);
        y = MathUtils.lerp(y, chosen ? 0 : 0.2 + index * 0.06, focus);
        scale = MathUtils.lerp(scale, chosen ? (mobile ? 1 : 1.16) : 0.42, focus);
        yaw = MathUtils.lerp(yaw, chosen ? -0.17 + model.proofIndex * 0.1 + model.proofProgress * 0.04 : angle, focus);
        if (chosen && phase === "statement") yaw = MathUtils.lerp(yaw, 0, smooth(p));
      }
      if (recap > 0) {
        const fan = (index - (count - 1) / 2) / Math.max(1, count - 1);
        x = MathUtils.lerp(x, fan * (mobile ? 5 : 10), recap);
        y = MathUtils.lerp(y, Math.abs(fan) * 0.65 + recap * 2.4 + exit * 7, recap);
        z = MathUtils.lerp(z, -1.2 - Math.abs(fan) * 2, recap);
        scale = MathUtils.lerp(scale, 0.74 - exit * 0.5, recap);
        yaw = MathUtils.lerp(yaw, -fan * 0.8, recap);
      }
      if (detailOpen > 0) {
        x = MathUtils.lerp(x, chosen ? 0 : Math.sin(angle) * 3.6, detailOpen);
        y = MathUtils.lerp(y, chosen ? 0 : 0.15, detailOpen);
        z = MathUtils.lerp(z, chosen ? 2.8 : -4, detailOpen);
        yaw = MathUtils.lerp(yaw, chosen ? 0 : angle, detailOpen);
        scale = MathUtils.lerp(scale, chosen ? (mobile ? 1.05 : 1.45) : 0.68, detailOpen);
      }
      // During the mode exchange the rail physically gathers its cartridges.
      x *= 1 - collect * 0.98;
      z = MathUtils.lerp(z, -0.5 - index * 0.055, collect);
      yaw = MathUtils.lerp(yaw, 0, collect);
      scale *= 1 - collect * 0.3;
      // Convert lifted/fanned world targets back into the rotating pivot space.
      // At a settled carousel pose this is exactly the original radial layout.
      const depthFromPivot = z + 1.45;
      target.current.set(cosPivot * x - sinPivot * depthFromPivot, y, sinPivot * x + cosPivot * depthFromPivot);
      group.position.lerp(target.current, step);
      group.rotation.y += angleDistance(yaw - pivotYaw - group.rotation.y) * step;
      group.rotation.z = MathUtils.lerp(group.rotation.z, chosen ? -0.05 * (1 - detailOpen) : 0, step);
      group.scale.setScalar(MathUtils.lerp(group.scale.x, scale, step));

      const part = parts.current[index];
      if (part) {
        const shellDeployment = smooth((deployment - 0.08) / 0.92);
        target.current.set(shellDeployment, shellDeployment * (1 - (chosen ? detailOpen * 0.18 : 0)), shellDeployment);
        part.body.scale.lerp(target.current, step);
        // Two hinges unfold from behind the same central cartridge. The image
        // window grows across them only after their physical opening is underway.
        const opening = chosen ? detailOpen : 0;
        part.left.visible = part.right.visible = opening > 0.005;
        part.left.rotation.y = MathUtils.lerp(part.left.rotation.y, -Math.PI * (1 - opening), step);
        part.right.rotation.y = MathUtils.lerp(part.right.rotation.y, Math.PI * (1 - opening), step);
        part.left.position.z = part.right.position.z = -0.16 * (1 - opening);
        part.preview ||= group.getObjectByName(`nm-preview-${index}`) as Mesh | undefined;
        if (part.preview) {
          const preview = part.preview;
          preview.visible = model.mode === "projects";
          const screenOpening = smooth((opening - 0.34) / 0.66);
          preview.scale.x = MathUtils.lerp(preview.scale.x, 1.025 + screenOpening * 2.5, step);
          const material = preview.material as MeshBasicMaterial;
          const map = material.map;
          if (map?.image) {
            const image = map.image as { width: number; height: number };
            const aspect = preview.scale.x / preview.scale.y;
            const imageAspect = image.width / image.height;
            const zoom = 1.025 + (!reduced && chosen ? Math.sin(clock.elapsedTime * 0.32 + index) * 0.018 : 0);
            const width = Math.min(1, aspect / imageAspect) / zoom;
            const height = Math.min(1, imageAspect / aspect) / zoom;
            map.repeat.set(width, height);
            map.offset.set((1 - width) * (0.5 + (!reduced && chosen ? Math.sin(clock.elapsedTime * 0.19 + index) * 0.16 : 0)), (1 - height) * 0.5);
          }
        }
        if (part.company) part.company.visible = model.mode === "experience";
        const identityScale = chosen ? MathUtils.lerp(mobile ? 0.94 : 1.52, 0.43, deployment) : 0.43;
        part.identity.scale.setScalar(MathUtils.lerp(part.identity.scale.x, identityScale, step));
        part.identity.visible = chosen && deployment < 0.98;
        target.current.set(-0.035 * deployment, 0.21 * deployment, 0.2);
        part.identity.position.lerp(target.current, step);
        part.signature.visible = chosen && phase === "proof";
        if (part.signature.visible) {
          part.signature.geometry = [geometry.interfaceTrace, geometry.serviceTrace, geometry.intelligenceTrace, geometry.deliveryTrace][clamp(model.proofIndex, 0, 3)];
          const reveal = smooth(model.proofProgress / 0.16) * smooth((1 - model.proofProgress) / 0.16);
          part.signature.scale.setScalar(reveal);
        }
      }
    }

    const railScale = deployment * (1 - collect * 0.78) * (1 - focus * 0.15);
    target.current.set(railScale * (mobile ? 0.73 : 1), railScale, railScale);
    rails.current.scale.lerp(target.current, step);
    rails.current.position.y = MathUtils.lerp(rails.current.position.y, focus * 0.2 + recap * 6 + exit * 5, step);
    // Compensate the fixed track depth inside the common rotating parent.
    const railDepth = -focus * 3.5 - detailOpen * 2.5;
    rails.current.position.x = MathUtils.lerp(rails.current.position.x, -sinPivot * railDepth, step);
    rails.current.position.z = MathUtils.lerp(rails.current.position.z, cosPivot * railDepth, step);

    const perspective = camera as PerspectiveCamera;
    const mobileLandscape = mobile && size.width / size.height > 0.8;
    // Reserve the lower mobile viewport for semantic copy. At 390×844 the
    // selected ~3.1-unit solid occupies about y140–420, including proof poses.
    const desiredZ = mobile ? (mobileLandscape ? 18 : 16) : size.width < 1100 ? 13.3 : 12.1;
    const heroApproach = mobile ? (mobileLandscape ? 2.4 : 3.4) : 0.75;
    perspective.position.z = MathUtils.lerp(perspective.position.z, desiredZ - heroApproach * (1 - deployment) + collect * 0.5 + exit * 1.6 - detailOpen * (mobile ? 0 : 1.2), step);
    perspective.position.y = MathUtils.lerp(perspective.position.y, 0.25 + pointerY * 0.08, step);
    perspective.lookAt(0, mobile ? 0.25 : 0, 0);
    if (accentLight.current) {
      targetColor.current.set(accents[model.activeIndex % Math.max(1, accents.length)] || STUDIO.ice);
      accentLight.current.color.lerp(targetColor.current, step * 0.5);
      accentLight.current.intensity = MathUtils.lerp(accentLight.current.intensity, 7 + focus * 4, step);
      const scan = phase === "proof" ? model.proofProgress : 0.75;
      accentLight.current.position.set(poseX - 1.5 + scan * 3.5, 1.7 - scan * 0.8, 3.8);
    }
    if (sunLight.current) {
      const time = reduced ? 0.5 : clock.elapsedTime * 0.35;
      sunLight.current.position.set(poseX + Math.sin(time) * 3.2, 2.5 + Math.cos(time * 0.7) * 1.3, 4 + Math.cos(time) * 1.4);
      sunLight.current.intensity = 12 * (1 - deployment) + 1.4;
    }

    // Lower quality once on a sustained slow rendering sample. No render-loop setState.
    if (!adaptive.current.lowered && !reduced && !dormant && delta > 0 && delta < 0.2) {
      adaptive.current.frames++;
      adaptive.current.total += delta;
      if (adaptive.current.frames === 90 && adaptive.current.total / 90 > 0.032) {
        adaptive.current.lowered = true;
        setDpr(mobile ? 1 : 1.15);
      }
    }
    const railTargetY = focus * 0.2 + recap * 6 + exit * 5;
    exitSettled.current = !!exit && Math.abs(rails.current.position.y - railTargetY) <= 0.01 && modeTime >= 1.3;
    const morphing = modeTime < 1.3;
    // Only visible animated media and glass reflections keep the existing frame
    // callback awake. Hidden, reduced-motion and later narrative poses sleep.
    const animatedMedia = phase === "hero" || phase === "assembly" || phase === "carousel" || detailActive;
    if (!reduced && (morphing || animatedMedia || (exit ? !exitSettled.current : activityRemaining > 0))) invalidate();
  });

  return (
    <>
      <color attach="background" args={[STUDIO.void]} />
      <fog attach="fog" args={[STUDIO.void, 13, 26]} />
      <Environment resolution={128} frames={1}>
        <Lightformer form="circle" intensity={6} color="#fff4df" position={[2.4, 3.2, 4]} scale={2.1} />
        <Lightformer form="rect" intensity={4} color="#e3edf6" position={[-4, 5, 4]} rotation={[0, Math.PI / 4, 0]} scale={[4, 7, 1]} />
        <Lightformer form="rect" intensity={2.5} color="#a6bdcf" position={[5, 1, -3]} rotation={[0, -Math.PI / 2, 0]} scale={[3, 6, 1]} />
        <Lightformer form="rect" intensity={1.1} color={STUDIO.ice} position={[0, -4, 2]} rotation={[Math.PI / 2, 0, 0]} scale={[6, 2, 1]} />
      </Environment>
      <ambientLight intensity={0.65} color="#a3b5c6" />
      <hemisphereLight args={["#eaf4ff", "#11151d", 1.15]} />
      <directionalLight position={[-3, 6, 5]} intensity={3.4} color="#e3edf6" />
      <directionalLight position={[6, -1, -2]} intensity={2.8} color="#a6bdcf" />
      <pointLight ref={accentLight} position={[2.8, 1.5, 3.8]} intensity={8} distance={10} decay={2} color={STUDIO.ice} />
      <pointLight ref={sunLight} position={[1, 4, 5]} intensity={14} distance={12} decay={2} color="#fff4df" />
      <pointLight position={[-5, 1.5, 0]} intensity={9} distance={12} color="#b29bff" />
      <group ref={rig} position={[1.7, 0.12, -0.3]}>
        <group ref={pivot} position={[0, 0, -1.45]}>
          <group ref={rails}>
            <EngineeredRail />
          </group>
          {Array.from({ length: 7 }, (_, index) => (
            <group key={index} ref={(element) => { cartridges.current[index] = element; }}
              onClick={(event) => {
                const model = state.current;
                const detailActive = model.detailIndex >= 0 && model.detailProgress > 0 && model.detailProgress < 1;
                if (model.mode !== "projects" || model.phase !== "carousel" || detailActive) return;
                event.stopPropagation();
                onProjectClick?.(index);
              }}
              onPointerOver={() => { if (state.current.mode === "projects" && state.current.phase === "carousel") gl.domElement.style.cursor = "pointer"; }}
              onPointerOut={() => { gl.domElement.style.cursor = ""; }}
            >
              <NMCartridge geometry={geometry} accent={accents[index % Math.max(1, accents.length)] || STUDIO.ice} image={projects[index]?.image} company={experiences?.[index]?.company} index={index} onRendered={index === 0 ? ready : undefined} />
            </group>
          ))}
        </group>
      </group>
    </>
  );
}
