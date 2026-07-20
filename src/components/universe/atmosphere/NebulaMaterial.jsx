import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import vertexShader from "../shaders/nebulaVertex.glsl";
import fragmentShader from "../shaders/nebulaFragment.glsl";

export default function NebulaMaterial() {
  const material = useRef();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
    }),
    []
  );

  useFrame((_, delta) => {
    if (material.current) {
      material.current.uniforms.uTime.value += delta;
    }
  });

  return (
    <shaderMaterial
      ref={material}
      uniforms={uniforms}
      vertexShader={vertexShader}
      fragmentShader={fragmentShader}
      transparent
      depthWrite={false}
      blending={THREE.AdditiveBlending}
    />
  );
}