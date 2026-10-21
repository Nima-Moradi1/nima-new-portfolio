"use client";

import { useLayoutEffect } from "react";
import { useLoader, useThree } from "@react-three/fiber";
import { CubeUVReflectionMapping, DataTextureLoader, HalfFloatType, LinearFilter, LinearSRGBColorSpace, RGBAFormat, type DataTexture } from "three";

export const NM_STUDIO_ENVIRONMENT = "/brand/nm-studio-pmrem-2e044b9d72b8.bin";

class StudioTextureLoader extends DataTextureLoader {
  parse(buffer: ArrayBuffer) {
    // The server delivers gzip Content-Encoding; the browser decompresses it
    // natively. No EXR/ZIP decoder executes on the page's main thread.
    if (buffer.byteLength !== 384 * 512 * 4 * 2) throw new Error("Invalid NM studio texture");
    return { width: 384, height: 512, data: new Uint16Array(buffer), format: RGBAFormat, type: HalfFloatType };
  }
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
 * lossless atlas, not an equirectangular source. The precompressed binary has
 * exactly the original EXR's decoded half-float pixels and roughness levels.
 * Native HTTP decompression avoids both runtime PMREM and JS ZIP decoding.
 */
export function BakedStudioEnvironment() {
  const texture = useLoader(StudioTextureLoader, NM_STUDIO_ENVIRONMENT);
  const invalidate = useThree(state => state.invalidate);

  useLayoutEffect(() => {
    prepareCubeUV(texture);
    invalidate();
  }, [texture, invalidate]);

  // R3F attaches/restores scene.environment. useLoader owns the shared texture
  // cache, so remounting a locale must not dispose that borrowed GPU resource.
  return <primitive object={texture} attach="environment" dispose={null} />;
}
