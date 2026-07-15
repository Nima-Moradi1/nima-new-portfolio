"use client";

import { AdaptiveDpr, Sparkles } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import type { Theme } from "@/components/theme/theme-provider";

const nodePositions: [number, number, number][] = [
  [2.45, 0.2, 0.1],
  [-2.1, 1.15, -0.4],
  [0.5, -2.05, 0.35],
  [-1.15, -1.7, -0.8],
  [1.35, 1.6, -0.6],
  [0.2, 2.25, 0.2],
];

type SignalCoreProps = {
  reducedMotion: boolean;
  theme: Theme;
};

function SignalCore({ reducedMotion, theme }: SignalCoreProps) {
  const group = useRef<THREE.Group>(null);
  const nodes = useRef<THREE.InstancedMesh>(null);
  const elapsed = useRef(0);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useLayoutEffect(() => {
    if (!nodes.current) return;
    nodePositions.forEach((position, index) => {
      dummy.position.set(...position);
      const scale = index % 2 === 0 ? 0.13 : 0.09;
      dummy.scale.setScalar(scale);
      dummy.updateMatrix();
      nodes.current?.setMatrixAt(index, dummy.matrix);
    });
    nodes.current.instanceMatrix.needsUpdate = true;
  }, [dummy]);

  useFrame((state, delta) => {
    if (!group.current || reducedMotion) return;
    elapsed.current += delta;
    group.current.rotation.y += delta * 0.09;
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      state.pointer.y * 0.16 + Math.sin(elapsed.current * 0.3) * 0.04,
      0.035,
    );
    group.current.rotation.z = THREE.MathUtils.lerp(
      group.current.rotation.z,
      -state.pointer.x * 0.12,
      0.035,
    );
  });

  return (
    <group ref={group} rotation={[0.14, -0.4, 0.08]}>
      <mesh>
        <icosahedronGeometry args={[1.22, 2]} />
        <meshStandardMaterial
          color={theme === "dark" ? "#b8ff45" : "#5c831e"}
          emissive={theme === "dark" ? "#315f0f" : "#c69243"}
          emissiveIntensity={1.4}
          metalness={0.34}
          roughness={0.24}
        />
      </mesh>

      <mesh scale={1.13}>
        <icosahedronGeometry args={[1.22, 2]} />
        <meshBasicMaterial
          color={theme === "dark" ? "#e7ffd1" : "#2f451e"}
          wireframe
          transparent
          opacity={0.18}
        />
      </mesh>

      <mesh rotation={[Math.PI / 2.4, 0.18, 0.12]}>
        <torusGeometry args={[1.92, 0.014, 8, 96]} />
        <meshBasicMaterial
          color={theme === "dark" ? "#b8ff45" : "#5c831e"}
          transparent
          opacity={0.62}
        />
      </mesh>
      <mesh rotation={[0.2, Math.PI / 2.1, -0.38]}>
        <torusGeometry args={[2.25, 0.01, 8, 96]} />
        <meshBasicMaterial
          color={theme === "dark" ? "#aa8cff" : "#7253b9"}
          transparent
          opacity={0.38}
        />
      </mesh>
      <mesh rotation={[-0.6, 0.3, Math.PI / 2]}>
        <torusGeometry args={[2.62, 0.007, 8, 96]} />
        <meshBasicMaterial
          color={theme === "dark" ? "#ff7e67" : "#b84f3f"}
          transparent
          opacity={0.2}
        />
      </mesh>

      <instancedMesh
        ref={nodes}
        args={[undefined, undefined, nodePositions.length]}
      >
        <sphereGeometry args={[1, 14, 14]} />
        <meshBasicMaterial color={theme === "dark" ? "#f4ffe8" : "#34482a"} />
      </instancedMesh>
    </group>
  );
}

type SignalSceneProps = {
  active: boolean;
  reducedMotion: boolean;
  theme: Theme;
};

export function SignalScene({
  active,
  reducedMotion,
  theme,
}: SignalSceneProps) {
  const isDark = theme === "dark";

  return (
    <Canvas
      aria-hidden="true"
      camera={{ position: [0, 0, 6.7], fov: 38, near: 0.1, far: 30 }}
      dpr={[1, 1.5]}
      frameloop={reducedMotion || !active ? "demand" : "always"}
      gl={{
        alpha: true,
        antialias: true,
        depth: true,
        powerPreference: "high-performance",
        stencil: false,
      }}
      performance={{ min: 0.55 }}
      shadows={false}
    >
      <ambientLight intensity={isDark ? 0.82 : 2.1} />
      <pointLight
        color={isDark ? "#b8ff45" : "#e4a854"}
        intensity={isDark ? 38 : 18}
        position={[2.5, 2, 3.5]}
      />
      <pointLight
        color={isDark ? "#8a6cff" : "#7253b9"}
        intensity={isDark ? 26 : 12}
        position={[-3, -1.5, 2]}
      />
      <SignalCore reducedMotion={reducedMotion} theme={theme} />
      <Sparkles
        count={reducedMotion ? 24 : 58}
        color={isDark ? "#dfffb5" : "#566e42"}
        opacity={0.5}
        scale={[7, 7, 4]}
        size={1.7}
        speed={reducedMotion ? 0 : 0.18}
      />
      <AdaptiveDpr pixelated />
    </Canvas>
  );
}
