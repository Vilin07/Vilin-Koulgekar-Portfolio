import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Galaxy() {
  const points = useRef();

  const galaxy = useMemo(() => {
    const count = 40000;

    const radius = 12;
    const branches = 5;
    const spin = 1.5;
    const randomness = 0.35;

    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    const inside = new THREE.Color("#ffffff");
    const middle = new THREE.Color("#7ea6ff");
    const outside = new THREE.Color("#1035b8");

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      const r = Math.random() * radius;

      const spinAngle = r * spin;

      const branchAngle =
        ((i % branches) / branches) * Math.PI * 2;

      const randomX =
        Math.pow(Math.random(), 3) *
        (Math.random() < 0.5 ? -1 : 1) *
        randomness *
        r;

      const randomY =
        (Math.random() - 0.5) *
        0.15 *
        (radius - r);

      const randomZ =
        Math.pow(Math.random(), 3) *
        (Math.random() < 0.5 ? -1 : 1) *
        randomness *
        r;

      positions[i3] =
        Math.cos(branchAngle + spinAngle) * r + randomX;

      positions[i3 + 1] = randomY;

      positions[i3 + 2] =
        Math.sin(branchAngle + spinAngle) * r + randomZ;

      const mixed = inside.clone();

      if (r < radius / 2) {
        mixed.lerp(middle, r / (radius / 2));
      } else {
        mixed.copy(middle).lerp(outside, (r - radius / 2) / (radius / 2));
      }

      colors[i3] = mixed.r;
      colors[i3 + 1] = mixed.g;
      colors[i3 + 2] = mixed.b;

      sizes[i] = Math.random();
    }

    return { positions, colors, sizes };
  }, []);

useFrame((state, delta) => {
  if (!points.current) return;

  const t = state.clock.elapsedTime;

  points.current.rotation.y += delta * 0.01;

  points.current.rotation.z =
    Math.sin(t * 0.05) * 0.03;

  points.current.position.y =
    Math.sin(t * 0.08) * 0.15;
});

  return (
   <points
  ref={points}
  scale={1.8}
  rotation={[0.3, 0.2, 0]}
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
  size={0.028}
  sizeAttenuation
  vertexColors
  transparent
  opacity={0.9}
  depthWrite={false}
  blending={THREE.AdditiveBlending}
/>
    </points>
  );
}