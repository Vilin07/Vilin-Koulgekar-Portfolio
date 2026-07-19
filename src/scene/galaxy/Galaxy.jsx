import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { createSeededRandom } from "../../utils/seededRandom";

export default function Galaxy({ count = 32000, motionScale = 1 }) {
  const points = useRef();

const galaxy = useMemo(() => {
  const radius = 36;
  const branches = 6;
  const spin = 5;
  const randomness = 0.08;
  const randomnessPower = 5;

  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const random = createSeededRandom(20260719);

  const insideColor = new THREE.Color("#ffffff");
  const midColor = new THREE.Color("#7ea6ff");
  const outsideColor = new THREE.Color("#1d4ed8");

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;

    const r = random() * radius;

    const spinAngle = r * spin;

    const branchAngle =
      ((i % branches) / branches) * Math.PI * 2;

    const randomX =
      Math.pow(random(), randomnessPower) *
      (random() < 0.5 ? -1 : 1) *
      randomness *
      r;

    const randomY =
      (random() - 0.5) *
      0.12;

    const randomZ =
      Math.pow(random(), randomnessPower) *
      (random() < 0.5 ? -1 : 1) *
      randomness *
      r;

    positions[i3] =
      Math.cos(branchAngle + spinAngle) * r + randomX;

    positions[i3 + 1] = randomY;

    positions[i3 + 2] =
      Math.sin(branchAngle + spinAngle) * r + randomZ;

    const mixed = insideColor.clone();

    if (r < radius * 0.3) {
      mixed.lerp(midColor, r / (radius * 0.3));
    } else {
      mixed
        .copy(midColor)
        .lerp(
          outsideColor,
          (r - radius * 0.3) / (radius * 0.7)
        );
    }

    colors[i3] = mixed.r;
    colors[i3 + 1] = mixed.g;
    colors[i3 + 2] = mixed.b;
  }

  return {
    positions,
    colors,
  };
}, [count]);

useFrame((state, delta) => {
  if (!points.current) return;

  const t = state.clock.elapsedTime;

  points.current.rotation.y += delta * 0.0015 * motionScale;

 points.current.rotation.z =
  Math.sin(t * 0.02) * 0.01 * motionScale;

 points.current.position.y =
  Math.sin(t * 0.04) * 0.04 * motionScale;
});

  return (
 <points
    ref={points}
    scale={3.4}
    rotation={[0.55, 0.15, -0.4]}
    position={[0, -5, -10]}
>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={galaxy.positions}
          count={galaxy.positions.length / 3}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          array={galaxy.colors}
          count={galaxy.colors.length / 3}
          itemSize={3}
        />
      </bufferGeometry>

     <pointsMaterial
 size={0.018}
  sizeAttenuation
  vertexColors
  transparent
  opacity={0.76}
  depthWrite={false}
  blending={THREE.AdditiveBlending}
/>

    </points>
  );
}
