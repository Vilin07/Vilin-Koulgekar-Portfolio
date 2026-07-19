import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { createSeededRandom } from "../../utils/seededRandom";

export default function KnowledgeParticle({ radius, opacityRef, rotate }) {
  const points = useRef();
  const material = useRef();

  const positions = useMemo(() => {
    const count = 120;
    const values = new Float32Array(count * 3);
    const random = createSeededRandom(109);

    for (let index = 0; index < count; index += 1) {
      const angle = (index / count) * Math.PI * 2;
      const offset = (random() - 0.5) * 0.06;
      const i3 = index * 3;

      values[i3] = Math.cos(angle) * (radius + offset);
      values[i3 + 1] = (random() - 0.5) * 0.04;
      values[i3 + 2] = Math.sin(angle) * (radius + offset);
    }

    return values;
  }, [radius]);

  useFrame((_, delta) => {
    if (!points.current || !material.current) return;

    material.current.opacity = opacityRef.current;
    if (rotate) points.current.rotation.y += delta * 0.035;
  });

  return (
    <points ref={points} rotation={[0.42, 0.1, -0.18]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={positions.length / 3} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        ref={material}
        color="#bfdbfe"
        size={0.022}
        transparent
        opacity={0}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
