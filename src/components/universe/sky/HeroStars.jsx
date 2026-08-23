import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { createSeededRandom } from "../../../utils/seededRandom";

export default function HeroStars({
  count = 96,
  motionScale = 1,
}) {
  const group = useRef();

  const stars = useMemo(() => {
    const random = createSeededRandom(98765);

    return Array.from({ length: count }, () => ({
      position: [
        (random() - 0.5) * 180,
        (random() - 0.5) * 120,
        -20 - random() * 120,
      ],
      scale: 0.12 + random() * 0.34,
      phase: random() * Math.PI * 2,
      color: new THREE.Color().setHSL(
        0.58 + random() * 0.05,
        0.45,
        0.72 + random() * 0.12
      ),
    }));
  }, [count]);

  useFrame(({ clock }) => {
    if (!group.current) return;

    const t = clock.elapsedTime;

    group.current.children.forEach((mesh, i) => {
      const star = stars[i];

      mesh.material.opacity =
        0.34 +
        Math.sin(t * 0.18 + star.phase) *
          0.045 *
          motionScale;

      const pulse =
        star.scale *
        (1 +
          Math.sin(
            t * 0.16 + star.phase
          ) *
            0.025 *
            motionScale);

      mesh.scale.setScalar(pulse);
    });
  });

  return (
    <group ref={group}>
      {stars.map((star, index) => (
        <mesh
          key={index}
          position={star.position}
        >
          <sphereGeometry args={[1, 18, 18]} />

          <meshBasicMaterial
            color={star.color}
            transparent
            opacity={0.34}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  );
}
