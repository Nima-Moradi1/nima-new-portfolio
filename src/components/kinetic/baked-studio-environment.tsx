"use client";

import { useLayoutEffect } from "react";
import { useLoader, useThree } from "@react-three/fiber";
import { CubeUVReflectionMapping, HalfFloatType, LinearFilter, LinearSRGBColorSpace, type DataTexture } from "three";
import { EXRLoader } from "three/examples/jsm/loaders/EXRLoader.js";

export const NM_STUDIO_ENVIRONMENT = "/brand/nm-studio-pmrem-ca2c15880201.exr";

function configureLoader(loader: EXRLoader) {
  loader.setDataType(HalfFloatType);
}

function prepareCubeUV(texture: DataTexture) {
  texture.mapping = CubeUVReflectionMapping;
  texture.colorSpace = LinearSRGBColorSpace;
  texture.minFilter = texture.magFilter = LinearFilter;
  texture.generateMipmaps = false;
  texture.flipY = false;
  texture.needsUpdate = true;
}

/** Original four-light studio, captured at 128 and filtered once offline with
 * the installed Three r182 PMREM generator. The 384x512 HalfFloat ZIP EXR is a
 * lossless atlas, not an equirectangular source: CubeUV mapping makes Three use
 * its existing roughness levels directly without runtime capture/convolution.
 * SHA256 ca2c158802016429b8758bde941b5a381c051f269f5663650acc5d23c57f70b9.
 */
export function BakedStudioEnvironment() {
  const texture = useLoader(EXRLoader, NM_STUDIO_ENVIRONMENT, configureLoader);
  const invalidate = useThree(state => state.invalidate);

  useLayoutEffect(() => {
    prepareCubeUV(texture);
    invalidate();
  }, [texture, invalidate]);

  // R3F attaches/restores scene.environment. useLoader owns the shared texture
  // cache, so remounting a locale must not dispose that borrowed GPU resource.
  return <primitive object={texture} attach="environment" dispose={null} />;
}
