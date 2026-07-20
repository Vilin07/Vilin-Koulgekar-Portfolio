import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { createSeededRandom } from "../../../utils/seededRandom";

export default function CosmicDust({ count = 1600, motionScale = 1 }) {
  const ref = useRef();

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const random = createSeededRandom(7319);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      positions[i3] = (random() - 0.5) * 80;
      positions[i3 + 1] = (random() - 0.5) * 40;
      positions[i3 + 2] = (random() - 0.5) * 60;
    }

    return positions;
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;

    ref.current.rotation.y =
  state.clock.elapsedTime * 0.0012 * motionScale;

   ref.current.rotation.x =
  Math.sin(state.clock.elapsedTime * 0.015) * 0.012 * motionScale;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={particles}
          count={particles.length / 3}
          itemSize={3}
        />
      </bufferGeometry>

     <pointsMaterial
  color="#dbeafe"
  size={0.018}
  transparent
  opacity={0.08}
  depthWrite={false}
  blending={THREE.AdditiveBlending}
/>
    </points>
  );
}
