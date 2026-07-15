"use client";

import { AdaptiveDpr, ContactShadows } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

type LampModelProps = {
  isDark: boolean;
  reducedMotion: boolean;
};

const STEM_X = -0.58;
const STEM_TOP = 0.38;
const ARM_LENGTH = 1.26;
const ARM_ANGLE = -0.72;

function LampModel({ isDark, reducedMotion }: LampModelProps) {
  const model = useRef<THREE.Group>(null);
  const light = useRef<THREE.PointLight>(null);
  const bulb = useRef<THREE.MeshStandardMaterial>(null);

  useFrame((state, delta) => {
    const smoothing = 1 - Math.exp(-delta * 8);
    if (light.current) {
      light.current.intensity = THREE.MathUtils.lerp(
        light.current.intensity,
        isDark ? 10 : 0,
        smoothing,
      );
    }
    if (bulb.current) {
      bulb.current.emissiveIntensity = THREE.MathUtils.lerp(
        bulb.current.emissiveIntensity,
        isDark ? 4.5 : 0.04,
        smoothing,
      );
    }

    if (model.current && !reducedMotion) {
      model.current.rotation.y = THREE.MathUtils.lerp(
        model.current.rotation.y,
        state.pointer.x * 0.08 - 0.12,
        0.035,
      );
    }
  });

  return (
    <group
      ref={model}
      rotation={[0.07, -0.12, -0.015]}
      position={[0, -0.02, 0]}
    >
      <mesh position={[STEM_X, -1.45, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.7, 0.82, 0.16, 36]} />
        <meshStandardMaterial
          color={isDark ? "#293526" : "#485f36"}
          metalness={0.55}
          roughness={0.3}
        />
      </mesh>

      <mesh position={[STEM_X, -0.49, 0]} castShadow>
        <cylinderGeometry args={[0.075, 0.09, 1.74, 20]} />
        <meshStandardMaterial
          color={isDark ? "#b8ff45" : "#5f7d38"}
          metalness={0.68}
          roughness={0.22}
        />
      </mesh>

      <group position={[STEM_X, STEM_TOP, 0]} rotation={[0, 0, ARM_ANGLE]}>
        <mesh position={[0, ARM_LENGTH / 2, 0]} castShadow>
          <cylinderGeometry args={[0.065, 0.075, ARM_LENGTH, 20]} />
          <meshStandardMaterial
            color={isDark ? "#b8ff45" : "#5f7d38"}
            metalness={0.68}
            roughness={0.22}
          />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.115, 20, 20]} />
          <meshStandardMaterial
            color={isDark ? "#b8ff45" : "#456127"}
            metalness={0.62}
            roughness={0.24}
          />
        </mesh>

        <group
          position={[0, ARM_LENGTH, 0]}
          rotation={[0.04, 0, -ARM_ANGLE - 0.08]}
        >
          <mesh>
            <sphereGeometry args={[0.105, 20, 20]} />
            <meshStandardMaterial
              color={isDark ? "#b8ff45" : "#456127"}
              metalness={0.62}
              roughness={0.24}
            />
          </mesh>
          <mesh position={[0, -0.34, 0]} castShadow>
            <cylinderGeometry args={[0.19, 0.61, 0.64, 40, 1, true]} />
            <meshStandardMaterial
              color={isDark ? "#d9e5c7" : "#71875d"}
              side={THREE.DoubleSide}
              metalness={0.12}
              roughness={0.48}
            />
          </mesh>
          <mesh position={[0, -0.66, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.61, 0.027, 10, 40]} />
            <meshStandardMaterial
              color={isDark ? "#b8ff45" : "#456127"}
              metalness={0.55}
              roughness={0.25}
            />
          </mesh>
          <mesh position={[0, -0.53, 0]}>
            <sphereGeometry args={[0.155, 22, 22]} />
            <meshStandardMaterial
              ref={bulb}
              color={isDark ? "#fff8cf" : "#d6d2bc"}
              emissive="#ffd777"
              emissiveIntensity={isDark ? 4.5 : 0.04}
              roughness={0.18}
            />
          </mesh>
          <pointLight
            ref={light}
            color="#ffd777"
            intensity={isDark ? 10 : 0}
            distance={4.5}
            decay={1.7}
            position={[0, -0.58, 0.45]}
          />
        </group>
      </group>
    </group>
  );
}

type LampSceneProps = {
  isDark: boolean;
  reducedMotion: boolean;
};

export function LampScene({ isDark, reducedMotion }: LampSceneProps) {
  return (
    <Canvas
      aria-hidden="true"
      camera={{ position: [0, 0, 6.5], fov: 32, near: 0.1, far: 20 }}
      dpr={[1, 1.25]}
      frameloop={reducedMotion ? "demand" : "always"}
      gl={{ alpha: true, antialias: true, stencil: false }}
      shadows="percentage"
    >
      <ambientLight intensity={isDark ? 0.58 : 2.2} />
      <directionalLight
        castShadow
        color={isDark ? "#dfffb7" : "#fff5dc"}
        intensity={isDark ? 2.2 : 4.5}
        position={[-3, 4, 5]}
      />
      <LampModel isDark={isDark} reducedMotion={reducedMotion} />
      <ContactShadows
        position={[0, -1.56, 0]}
        opacity={isDark ? 0.46 : 0.22}
        scale={4.5}
        blur={2.6}
        far={3.5}
        resolution={256}
        frames={1}
      />
      <AdaptiveDpr pixelated />
    </Canvas>
  );
}
