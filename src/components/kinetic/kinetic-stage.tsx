"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { Component, Suspense, useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactNode, type RefObject } from "react";
import { ACESFilmicToneMapping, SRGBColorSpace } from "three";
import { NMBrandMark } from "@/components/branding/nm-brand-mark";
import type { KineticSceneState } from "@/lib/kinetic-model";
import type { ExperienceItem, ProjectItem } from "@/types/portfolio";
import { MonolithScene } from "./monolith-scene";
import { BakedStudioEnvironment } from "./baked-studio-environment";

export type KineticStageProps = {
  state: RefObject<KineticSceneState>;
  accents: readonly string[];
  onReady: () => void;
  onFailure: () => void;
  projects: readonly ProjectItem[];
  experiences?: readonly ExperienceItem[];
  onProjectClick?: (index: number) => void;
};

function StaticSculpture() {
  // Canvas fallback children also mount when WebGL works. Keep them
  // effect-free; actual renderer errors reach SceneBoundary.
  return (
    <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", background: "radial-gradient(ellipse at 65% 40%, var(--nm-space) 0%, var(--nm-void) 65%)" }}>
      <NMBrandMark style={{ width: "min(43vw, 320px)", color: "var(--nm-copy)", transform: "perspective(800px) rotateY(-15deg) rotateZ(-5deg)", filter: "drop-shadow(18px 26px 0 var(--nm-line))" }} />
    </div>
  );
}

class SceneBoundary extends Component<{ children: ReactNode; onFailure: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onFailure(); }
  render() { return this.state.failed ? <StaticSculpture /> : this.props.children; }
}

export function KineticStage({ state, accents, projects, experiences, onProjectClick, onReady, onFailure }: KineticStageProps) {
  const [failed, setFailed] = useState(false);
  const [compiled, setCompiled] = useState(false);
  const onCompiled = useCallback(() => setCompiled(true), []);
  const failureReported = useRef(false);
  const failure = useRef(onFailure);
  useEffect(() => { failure.current = onFailure; }, [onFailure]);
  const fail = useCallback(() => {
    if (failureReported.current) return;
    failureReported.current = true;
    setFailed(true);
    failure.current();
  }, []);

  return (
    <div aria-hidden="true" data-nm-scene="single-stage" data-scene-failed={failed} style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      <SceneBoundary onFailure={fail}>
        {failed ? <StaticSculpture /> : <Canvas
          frameloop={compiled ? "demand" : "never"}
          dpr={[1, 1.5]}
          camera={{ position: [0, 0.25, 12.1], fov: 37, near: 0.1, far: 45 }}
          gl={{ antialias: true, alpha: false, powerPreference: "high-performance", stencil: false, depth: true }}
          fallback={<StaticSculpture />}
          onCreated={({ gl, setDpr }) => {
            gl.toneMapping = ACESFilmicToneMapping;
            gl.toneMappingExposure = 1.2;
            gl.outputColorSpace = SRGBColorSpace;
            gl.transmissionResolutionScale = 0.5;
            setDpr(Math.min(window.devicePixelRatio || 1, window.innerWidth < 768 ? 1.15 : 1.5));
          }}
          style={{ position: "absolute", inset: 0 }}
        >
          <ContextGuard onFailure={fail} />
          <MonolithScene state={state} accents={accents} projects={projects} experiences={experiences} onProjectClick={onProjectClick} onReady={onReady} />
          <Suspense fallback={null}>
            <BakedStudioEnvironment />
            <PrepareScene onCompiled={onCompiled} onFailure={fail} />
          </Suspense>
        </Canvas>}
      </SceneBoundary>
    </div>
  );
}

/** Compile with the driver's parallel extension before the demand loop starts.
 * The semantic page stays usable while the GPU prepares its real materials. */
function PrepareScene({ onCompiled, onFailure }: { onCompiled: () => void; onFailure: () => void }) {
  const gl = useThree(state => state.gl);
  const scene = useThree(state => state.scene);
  const camera = useThree(state => state.camera);
  useEffect(() => {
    let active = true;
    gl.compileAsync(scene, camera).then(() => { if (active) onCompiled(); }, () => { if (active) onFailure(); });
    return () => { active = false; };
  }, [gl, scene, camera, onCompiled, onFailure]);
  return null;
}

/** The renderer owns the native canvas before this effect can attach listeners. */
function ContextGuard({ onFailure }: { onFailure: () => void }) {
  const gl = useThree((scene) => scene.gl);
  useLayoutEffect(() => {
    const canvas = gl.domElement;
    const lost = (event: Event) => {
      event.preventDefault();
      onFailure();
    };
    canvas.addEventListener("webglcontextlost", lost, false);
    return () => canvas.removeEventListener("webglcontextlost", lost);
  }, [gl, onFailure]);
  return null;
}

