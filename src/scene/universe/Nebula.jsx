import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

function Layer({ position, scale, color, opacity, speed }) {
  const mesh = useRef();

  useFrame((state) => {
    if (!mesh.current) return;

    mesh.current.rotation.z = state.clock.elapsedTime * speed;

    mesh.current.position.y =
      position[1] +
      Math.sin(state.clock.elapsedTime * speed * 2) * 0.15;
  });

  return (
    <mesh ref={mesh} position={position}>
      <planeGeometry args={[scale, scale]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={opacity}
        depthWrite={false}
      />
    </mesh>
  );
}

export default function Nebula() {
  return (
    <>
      <Layer
        position={[-7, 3, -18]}
        scale={20}
        color="#1e3a8a"
        opacity={0.05}
        speed={0.01}
      />

      <Layer
        position={[6, -2, -22]}
        scale={16}
        color="#3b82f6"
        opacity={0.04}
        speed={0.015}
      />

      <Layer
        position={[2, 5, -26]}
        scale={24}
        color="#2563eb"
        opacity={0.03}
        speed={0.008}
      />
    </>
  );
}