"use client";

import { AdaptiveDpr, PerspectiveCamera, RoundedBox } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useLayoutEffect, useRef, type MutableRefObject } from "react";
import * as THREE from "three";
import type { Theme } from "@/components/theme/theme-provider";

const PAGE_WIDTH = 3.48;
const PAGE_HEIGHT = 4.46;

function ResponsiveCamera() {
  const size = useThree((state) => state.size);
  const aspect = size.width / Math.max(size.height, 1);
  const cameraDistance =
    size.width < 640 ? 10.3 : aspect < 1 ? 12.6 : aspect < 1.25 ? 11.8 : 11.2;

  return (
    <PerspectiveCamera
      makeDefault
      position={[0, 0.1, cameraDistance]}
      fov={39}
      near={0.1}
      far={30}
    />
  );
}

type TurningPageProps = {
  index: number;
  pageCount: number;
  progressRef: MutableRefObject<number>;
  paperColor: string;
};

function TurningPage({
  index,
  pageCount,
  progressRef,
  paperColor,
}: TurningPageProps) {
  const pivot = useRef<THREE.Group>(null);
  const geometry = useRef<THREE.PlaneGeometry>(null);
  const originalPositions = useRef<Float32Array | null>(null);

  useLayoutEffect(() => {
    if (!geometry.current) return;
    const positions = geometry.current.attributes.position;
    originalPositions.current = Float32Array.from(
      positions.array as ArrayLike<number>,
    );

    for (let vertex = 0; vertex < positions.count; vertex += 1) {
      positions.setX(vertex, positions.getX(vertex) + PAGE_WIDTH / 2);
    }
    positions.needsUpdate = true;
  }, []);

  useFrame(() => {
    if (!pivot.current || !geometry.current || !originalPositions.current)
      return;

    const bookPosition = progressRef.current * Math.max(pageCount - 1, 1);
    const localProgress = THREE.MathUtils.clamp(bookPosition - index, 0, 1);
    const eased = THREE.MathUtils.smootherstep(localProgress, 0, 1);
    pivot.current.rotation.y = -Math.PI * eased;

    const positions = geometry.current.attributes
      .position as THREE.BufferAttribute;
    const original = originalPositions.current;
    const curlStrength = Math.sin(localProgress * Math.PI) * 0.34;

    for (let vertex = 0; vertex < positions.count; vertex += 1) {
      const sourceIndex = vertex * 3;
      const sourceX = original[sourceIndex];
      const normalizedX = (sourceX + PAGE_WIDTH / 2) / PAGE_WIDTH;
      positions.setX(vertex, sourceX + PAGE_WIDTH / 2);
      positions.setY(vertex, original[sourceIndex + 1]);
      positions.setZ(
        vertex,
        original[sourceIndex + 2] +
          Math.sin(normalizedX * Math.PI) * curlStrength,
      );
    }

    positions.needsUpdate = true;
    geometry.current.computeVertexNormals();
  });

  return (
    <group ref={pivot} position={[0, 0, 0.055 + (pageCount - index) * 0.008]}>
      <mesh castShadow receiveShadow>
        <planeGeometry ref={geometry} args={[PAGE_WIDTH, PAGE_HEIGHT, 24, 1]} />
        <meshStandardMaterial
          color={paperColor}
          roughness={0.84}
          metalness={0}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

type BookModelProps = {
  pageCount: number;
  progressRef: MutableRefObject<number>;
  reducedMotion: boolean;
  theme: Theme;
};

function BookModel({
  pageCount,
  progressRef,
  reducedMotion,
  theme,
}: BookModelProps) {
  const book = useRef<THREE.Group>(null);
  const elapsed = useRef(0);
  const isDark = theme === "dark";
  const coverColor = isDark ? "#202a1d" : "#385327";
  const coverEdge = isDark ? "#b8ff45" : "#5b861f";
  const paperColor = isDark ? "#e7e8dc" : "#fffdf2";
  const pageEdge = isDark ? "#bfc4ae" : "#d6d2bd";

  useFrame((_, delta) => {
    if (!book.current || reducedMotion) return;
    elapsed.current += delta;
    book.current.rotation.x = 0.045 + Math.sin(elapsed.current * 0.35) * 0.012;
    book.current.rotation.z = -0.018 + Math.sin(elapsed.current * 0.24) * 0.008;
  });

  return (
    <group ref={book} rotation={[0.045, -0.04, -0.018]}>
      <RoundedBox
        args={[3.68, 4.72, 0.16]}
        radius={0.09}
        smoothness={3}
        position={[-1.84, 0, -0.3]}
        receiveShadow
      >
        <meshStandardMaterial
          color={coverColor}
          roughness={0.58}
          metalness={0.08}
        />
      </RoundedBox>
      <RoundedBox
        args={[3.68, 4.72, 0.16]}
        radius={0.09}
        smoothness={3}
        position={[1.84, 0, -0.3]}
        receiveShadow
      >
        <meshStandardMaterial
          color={coverColor}
          roughness={0.58}
          metalness={0.08}
        />
      </RoundedBox>

      <mesh position={[0, 0, -0.27]}>
        <cylinderGeometry args={[0.12, 0.12, 4.68, 28]} />
        <meshStandardMaterial
          color={coverEdge}
          roughness={0.48}
          metalness={0.16}
        />
      </mesh>

      <RoundedBox
        args={[3.46, 4.44, 0.22]}
        radius={0.055}
        smoothness={2}
        position={[-1.74, 0, -0.13]}
        receiveShadow
      >
        <meshStandardMaterial color={pageEdge} roughness={0.9} />
      </RoundedBox>
      <RoundedBox
        args={[3.46, 4.44, 0.22]}
        radius={0.055}
        smoothness={2}
        position={[1.74, 0, -0.13]}
        receiveShadow
      >
        <meshStandardMaterial color={pageEdge} roughness={0.9} />
      </RoundedBox>

      <mesh position={[-1.74, 0, 0.005]} receiveShadow>
        <planeGeometry args={[PAGE_WIDTH, PAGE_HEIGHT]} />
        <meshStandardMaterial color={paperColor} roughness={0.88} />
      </mesh>
      <mesh position={[1.74, 0, 0.004]} receiveShadow>
        <planeGeometry args={[PAGE_WIDTH, PAGE_HEIGHT]} />
        <meshStandardMaterial color={paperColor} roughness={0.88} />
      </mesh>

      {Array.from({ length: Math.max(pageCount - 1, 0) }, (_, index) => (
        <TurningPage
          key={index}
          index={index}
          pageCount={pageCount}
          progressRef={progressRef}
          paperColor={paperColor}
        />
      ))}

      <mesh position={[0, 0, 0.075]}>
        <boxGeometry args={[0.025, 4.35, 0.018]} />
        <meshBasicMaterial color={pageEdge} transparent opacity={0.7} />
      </mesh>
    </group>
  );
}

type ExperienceBookSceneProps = {
  active: boolean;
  pageCount: number;
  progressRef: MutableRefObject<number>;
  reducedMotion: boolean;
  theme: Theme;
};

export function ExperienceBookScene({
  active,
  pageCount,
  progressRef,
  reducedMotion,
  theme,
}: ExperienceBookSceneProps) {
  const isDark = theme === "dark";

  return (
    <Canvas
      aria-hidden="true"
      camera={{ position: [0, 0.15, 9.4], fov: 39, near: 0.1, far: 30 }}
      dpr={[1, 1.45]}
      frameloop={reducedMotion || !active ? "demand" : "always"}
      gl={{
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
        stencil: false,
      }}
      performance={{ min: 0.55 }}
      shadows="percentage"
    >
      <ResponsiveCamera />
      <ambientLight intensity={isDark ? 1.25 : 2.3} />
      <directionalLight
        castShadow
        color={isDark ? "#f0ffd9" : "#fff8df"}
        intensity={isDark ? 4.2 : 5.4}
        position={[2.5, 4.5, 6]}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <pointLight
        color={isDark ? "#b8ff45" : "#f6bf68"}
        intensity={isDark ? 18 : 6}
        position={[-4, 1, 5]}
      />
      <BookModel
        pageCount={pageCount}
        progressRef={progressRef}
        reducedMotion={reducedMotion}
        theme={theme}
      />
      <AdaptiveDpr pixelated />
    </Canvas>
  );
}
