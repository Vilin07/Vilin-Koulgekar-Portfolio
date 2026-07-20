import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { createSeededRandom } from "../../../utils/seededRandom";

export default function StarsField({ count = 9000, motionScale = 1 }) {
  const stars = useRef();

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const color = new THREE.Color();
    const random = createSeededRandom(4831);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      positions[i3] = (random() - 0.5) * 300;
      positions[i3 + 1] = (random() - 0.5) * 300;
      positions[i3 + 2] = (random() - 0.5) * 300;

      const brightness = 0.55 + random() * 0.45;

      color.setRGB(brightness, brightness, brightness);

      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }

    return { positions, colors };
  }, [count]);

  useFrame(({ clock }) => {
    if (!stars.current) return;

    stars.current.rotation.y =
      clock.elapsedTime * 0.0008 * motionScale;

    stars.current.material.opacity =
      0.82 + Math.sin(clock.elapsedTime * 0.4) * 0.08 * motionScale;
  });

  return (
    <points ref={stars}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          array={colors}
          count={colors.length / 3}
          itemSize={3}
        />
      </bufferGeometry>

      <pointsMaterial
        size={0.18}
        vertexColors
        transparent
        opacity={0.68}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
