import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { createSeededRandom } from "../../../utils/seededRandom";

export default function GalaxyNucleus({ motionScale = 1 }) {
  const points = useRef();

  const { positions, colors } = useMemo(() => {
    const count = 480;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const random = createSeededRandom(24680);
    const color = new THREE.Color();

    for (let index = 0; index < count; index += 1) {
      const radius = 0.08 + Math.pow(random(), 2.2) * 1.35;
      const angle = random() * Math.PI * 2;
      const i3 = index * 3;

      positions[i3] = Math.cos(angle) * radius;
      positions[i3 + 1] = (random() - 0.5) * 0.48;
      positions[i3 + 2] = Math.sin(angle) * radius;

      color.setHSL(0.59 + random() * 0.03, 0.24, 0.58 + random() * 0.18);
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }

    return { positions, colors };
  }, []);

  useFrame(({ clock }, delta) => {
    if (!points.current) return;

    points.current.rotation.y += delta * 0.045 * motionScale;
    points.current.rotation.x = 0.55 + Math.sin(clock.elapsedTime * 0.08) * 0.008 * motionScale;
  });

  return (
    <points ref={points} position={[0, -4, -60]} scale={0.7} rotation={[0.55, 0.15, -0.4]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={positions.length / 3} itemSize={3} />
        <bufferAttribute attach="attributes-color" array={colors} count={colors.length / 3} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.018}
        vertexColors
        transparent
        opacity={0.2}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
