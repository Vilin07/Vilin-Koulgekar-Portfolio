import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { createSeededRandom } from "../../../utils/seededRandom";

export default function StarsField({ count = 9000, motionScale = 1 }) {
  const stars = useRef();

  const {
    farPositions,
    farColors,
    midPositions,
    midColors,
    nearPositions,
    nearColors,
  } = useMemo(() => {
    const farCount = Math.floor(count * 0.72);
    const midCount = Math.floor(count * 0.24);
    const nearCount = count - farCount - midCount;

    const farPositions = new Float32Array(farCount * 3);
    const farColors = new Float32Array(farCount * 3);

    const midPositions = new Float32Array(midCount * 3);
    const midColors = new Float32Array(midCount * 3);

    const nearPositions = new Float32Array(nearCount * 3);
    const nearColors = new Float32Array(nearCount * 3);

    const color = new THREE.Color();
    const random = createSeededRandom(4831);

    // FAR STARS
    for (let i = 0; i < farCount; i++) {
      const i3 = i * 3;

      farPositions[i3] = (random() - 0.5) * 420;
      farPositions[i3 + 1] = (random() - 0.5) * 420;
      farPositions[i3 + 2] = (random() - 0.5) * 420;

      const brightness = 0.30 + random() * 0.25;

      color.setRGB(brightness, brightness, brightness);

      farColors[i3] = color.r;
      farColors[i3 + 1] = color.g;
      farColors[i3 + 2] = color.b;
    }

    // MID STARS
    for (let i = 0; i < midCount; i++) {
      const i3 = i * 3;

      midPositions[i3] = (random() - 0.5) * 320;
      midPositions[i3 + 1] = (random() - 0.5) * 320;
      midPositions[i3 + 2] = (random() - 0.5) * 320;

      const brightness = 0.60 + random() * 0.25;

      color.setRGB(brightness, brightness, brightness);

      midColors[i3] = color.r;
      midColors[i3 + 1] = color.g;
      midColors[i3 + 2] = color.b;
    }

    // NEAR STARS
    for (let i = 0; i < nearCount; i++) {
      const i3 = i * 3;

      nearPositions[i3] = (random() - 0.5) * 250;
      nearPositions[i3 + 1] = (random() - 0.5) * 250;
      nearPositions[i3 + 2] = (random() - 0.5) * 250;

      color.setRGB(0.74, 0.79, 0.9);

      nearColors[i3] = color.r;
      nearColors[i3 + 1] = color.g;
      nearColors[i3 + 2] = color.b;
    }

    return {
      farPositions,
      farColors,
      midPositions,
      midColors,
      nearPositions,
      nearColors,
    };
  }, [count]);

  useFrame(({ clock }) => {
    if (!stars.current) return;

    const t = clock.elapsedTime;

stars.current.children[0].rotation.y =
  t * 0.0003 * motionScale;

stars.current.children[1].rotation.y =
  t * 0.0007 * motionScale;

stars.current.children[2].rotation.y =
  t * 0.0011 * motionScale;

stars.current.children[2].material.opacity =
  0.46 +
  Math.sin(t * 0.22) * 0.025 * motionScale;
  });

  return (
  <group ref={stars}>

    {/* FAR STARS */}
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={farPositions}
          count={farPositions.length / 3}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          array={farColors}
          count={farColors.length / 3}
          itemSize={3}
        />
      </bufferGeometry>

      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.22}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>

    {/* MID STARS */}
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={midPositions}
          count={midPositions.length / 3}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          array={midColors}
          count={midColors.length / 3}
          itemSize={3}
        />
      </bufferGeometry>

      <pointsMaterial
        size={0.11}
        vertexColors
        transparent
        opacity={0.28}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>

    {/* NEAR STARS */}
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={nearPositions}
          count={nearPositions.length / 3}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          array={nearColors}
          count={nearColors.length / 3}
          itemSize={3}
        />
      </bufferGeometry>

      <pointsMaterial
        size={0.14}
        vertexColors
        transparent
        opacity={0.46}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>

  </group>
);
}
