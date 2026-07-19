import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { createSeededRandom } from "../../utils/seededRandom";

export default function FarStars({ count = 7000, motionScale = 1 }) {
  const ref = useRef();

  const stars = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const random = createSeededRandom(1201);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      positions[i3] = (random() - 0.5) * 250;
      positions[i3 + 1] = (random() - 0.5) * 250;
      positions[i3 + 2] = -40 - random() * 120;
    }

    return positions;
  }, [count]);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.0008 * motionScale;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={stars}
          count={stars.length / 3}
          itemSize={3}
        />
      </bufferGeometry>

      <pointsMaterial
        color="#6fa8ff"
        size={0.04}
        opacity={0.24}
        transparent
        depthWrite={false}
      />
    </points>
  );
}
