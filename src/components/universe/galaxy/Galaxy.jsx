import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { createSeededRandom } from "../../../utils/seededRandom";

export default function Galaxy({ count = 30000, motionScale = 1 }) {
  const points = useRef();

  const galaxy = useMemo(() => {
    const radius = 46;
    const branches = 5;
    const spin = 12;
    const randomnessPower = 5;

    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const random = createSeededRandom(20260719);

    const insideColor = new THREE.Color("#ffffff");
    const midColor = new THREE.Color("#d9ebff");
    const outsideColor = new THREE.Color("#356bff");

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Dense center
      const r = Math.pow(random(), 2.4) * radius;

      const spinAngle = r * spin;

      const branchAngle =
        ((i % branches) / branches) *
        Math.PI *
        2;

      // Much tighter spiral arms
      const spread =
        0.015 +
        r * 0.0024;

      const randomX =
        Math.pow(random(), randomnessPower) *
        (random() < 0.5 ? -1 : 1) *
        spread *
        r;

      const randomZ =
        Math.pow(random(), randomnessPower) *
        (random() < 0.5 ? -1 : 1) *
        spread *
        r;

      const thickness =
        Math.exp(-r * 0.08);

      // Gentle galaxy warp
      const warp =
        Math.sin(
          branchAngle + spinAngle
        ) * 0.45;

      const randomY =
        ((random() - 0.5) *
          (0.18 + thickness * 2.5)) +
        warp *
          (1 - r / radius);

      positions[i3] =
        Math.cos(
          branchAngle + spinAngle
        ) *
          r +
        randomX;

      positions[i3 + 1] = randomY;

      positions[i3 + 2] =
        Math.sin(
          branchAngle + spinAngle
        ) *
          r +
        randomZ;

      const mixed =
        insideColor.clone();

      if (r < radius * 0.3) {
        mixed.lerp(
          midColor,
          r /
            (radius * 0.3)
        );
      } else {
        mixed
          .copy(midColor)
          .lerp(
            outsideColor,
            (r -
              radius * 0.3) /
              (radius * 0.7)
          );
      }

      // Bright nucleus
      if (r < radius * 0.18) {
        const boost =
          2 -
          (r /
            (radius * 0.18)) *
            0.6;

        mixed.multiplyScalar(boost);
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

    const t =
      state.clock.elapsedTime;

    // Slow galaxy rotation
    points.current.rotation.y +=
      delta * 0.0022;

    // Floating motion
    points.current.rotation.x =
      Math.sin(t * 0.015) *
      0.015 *
      motionScale;

    points.current.rotation.z =
      Math.sin(t * 0.02) *
      0.02 *
      motionScale;

    points.current.position.y =
      Math.sin(t * 0.04) *
      0.05 *
      motionScale;

    const scale =
      2.65 +
      Math.sin(t * 0.18) *
        0.03;

    points.current.scale.setScalar(
      scale
    );
  });

  return (
    <points
      ref={points}
      scale={5.2}
      rotation={[0.55, 0.15, -0.4]}
      position={[0, -2, -18]}
    >
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={galaxy.positions}
          count={
            galaxy.positions.length / 3
          }
          itemSize={3}
        />

        <bufferAttribute
          attach="attributes-color"
          array={galaxy.colors}
          count={
            galaxy.colors.length / 3
          }
          itemSize={3}
        />
      </bufferGeometry>

      <pointsMaterial
        size={0.016}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.96}
        depthWrite={false}
        blending={
          THREE.AdditiveBlending
        }
      />
    </points>
  );
}