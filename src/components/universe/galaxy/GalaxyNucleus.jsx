import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { createSeededRandom } from "../../../utils/seededRandom";

export default function GalaxyNucleus({ motionScale = 1 }) {
  const group = useRef();

  const particles = useMemo(() => {
    const random = createSeededRandom(24680);

    return Array.from({ length: 650 }, () => {
      const r = Math.pow(random(), 2);

      return {
        radius: 0.08 + r * 1.4,

        angle: random() * Math.PI * 2,

        height: (random() - 0.5) * 0.8,

        size:
          0.005 +
          (1 - r) * 0.03 +
          random() * 0.004,

        speed:
          (0.4 + random() * 0.8) /
          (0.3 + r * 2),

        phase: random() * Math.PI * 2,

        color: new THREE.Color().setHSL(
          0.58 + random() * 0.05,
          0.35,
          0.86 + random() * 0.1
        ),
      };
    });
  }, []);

  useFrame(({ clock }, delta) => {
    if (!group.current) return;

    const t = clock.elapsedTime;

    group.current.children.forEach((mesh, i) => {
      const particle = particles[i];

      particle.angle +=
        particle.speed *
        delta *
        0.45 *
        motionScale;

      const radius =
        particle.radius +
        Math.sin(
          t * 0.8 +
            particle.phase
        ) *
          0.02;

      const x =
        Math.cos(particle.angle) *
        radius;

      const y =
        particle.height +
        Math.sin(
          t * 0.8 +
            particle.phase
        ) *
          0.03;

      const z =
        Math.sin(particle.angle) *
        radius;

      const wobbleX =
        Math.sin(
          t * particle.speed +
            particle.phase
        ) * 0.025;

      const wobbleZ =
        Math.cos(
          t * particle.speed * 1.3 +
            particle.phase
        ) * 0.025;

      mesh.position.set(
        x + wobbleX,
        y,
        z + wobbleZ
      );

      mesh.material.opacity =
        0.55 +
        Math.sin(
          t * 2 +
            particle.phase
        ) *
          0.25;

      const pulse =
        1 +
        Math.sin(
          t * 1.5 +
            particle.phase
        ) *
          0.08;

      mesh.scale.setScalar(pulse);
    });
  });

  return (
    <group ref={group}>
      {particles.map((particle, index) => (
        <mesh key={index}>
          <sphereGeometry
            args={[
              particle.size,
              8,
              8,
            ]}
          />

          <meshBasicMaterial
            color={particle.color}
            transparent
            opacity={0.8}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  );
}