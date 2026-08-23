import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { createSeededRandom } from "../../../utils/seededRandom";

export default function GalaxyArmsGlow() {
  const group = useRef();

  const clouds = useMemo(() => {
    const random = createSeededRandom(7777);

    const list = [];

    const branches = 5;
    const radius = 42;

    for (let arm = 0; arm < branches; arm++) {
      for (let i = 0; i < 18; i++) {
        const r = (i / 18) * radius;

        const angle =
          arm * ((Math.PI * 2) / branches) +
          r * 0.26;

        const armOffset =
          (random() - 0.5) * 2.2;

        list.push({
          position: [
            Math.cos(angle) * (r + armOffset),
            (random() - 0.5) * 0.4,
            Math.sin(angle) * (r + armOffset),
          ],

          rotation: random() * Math.PI,

          size: 2.5 + random() * 2.2,

          opacity:
            0.0015 + random() * 0.002,

          phase:
            random() *
            Math.PI *
            2,

          color: new THREE.Color().setHSL(
            0.60 + random() * 0.04,
            0.55,
            0.55 + random() * 0.08
          ),
        });
      }
    }

    return list;
  }, []);

  useFrame(({ clock }, delta) => {
    if (!group.current) return;

    const t = clock.elapsedTime;

    group.current.rotation.y +=
      delta * 0.0012;

    group.current.children.forEach(
      (mesh, i) => {
        const cloud = clouds[i];

        mesh.material.opacity =
          cloud.opacity +
          Math.sin(
            t * 0.25 +
              cloud.phase
          ) *
            0.0009;

        mesh.rotation.z +=
          delta * 0.002;

        mesh.position.y =
          cloud.position[1] +
          Math.sin(
            t * 0.18 +
              cloud.phase
          ) *
            0.08;
      }
    );
  });

  return (
    <group
      ref={group}
      rotation={[0.55, 0.15, -0.4]}
      scale={5.2}
      position={[0, -2, -28]}
    >
      {clouds.map((cloud, index) => (
        <mesh
          key={index}
          position={cloud.position}
          rotation={[
            Math.PI / 2,
            0,
            cloud.rotation,
          ]}
        >
          <circleGeometry
            args={[cloud.size, 48]}
          />

          <meshBasicMaterial
            color={cloud.color}
            transparent
            opacity={cloud.opacity}
            blending={THREE.NormalBlending}
            depthWrite={false}
            toneMapped={false}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}
