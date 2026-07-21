import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function DustLanes() {
  const group = useRef();

  const lanes = useMemo(() => {
    const data = [];

    const branches = 5;
    const radius = 42;

    for (let arm = 0; arm < branches; arm++) {
      for (let i = 0; i < 18; i++) {
        const r = (i / 18) * radius;

        const angle =
          arm * ((Math.PI * 2) / branches) +
          r * 0.26;

        data.push({
          position: [
            Math.cos(angle) * r,
            0,
            Math.sin(angle) * r,
          ],

          rotation: angle,

          width: 2.8,

          height: 0.55,
        });
      }
    }

    return data;
  }, []);

  useFrame((state, delta) => {
    if (!group.current) return;

    group.current.rotation.y += delta * 0.0018;
  });

  return (
    <group
      ref={group}
      rotation={[0.55, 0.15, -0.4]}
      scale={5.2}
      position={[0, -2, -18]}
    >
      {lanes.map((lane, i) => (
        <mesh
          key={i}
          position={lane.position}
          rotation={[
            Math.PI / 2,
            0,
            lane.rotation,
          ]}
        >
          <planeGeometry
            args={[
              lane.width,
              lane.height,
            ]}
          />

          <meshBasicMaterial
            color="#020408"
            transparent
            opacity={0.18}
            depthWrite={false}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}
