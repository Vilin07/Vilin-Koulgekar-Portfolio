import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function GalaxyCore({ motionScale = 1 }) {
  const core = useRef();

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;

    if (!core.current) return;

    const pulse = 1 + Math.sin(t * 0.8) * 0.05 * motionScale;

    core.current.scale.setScalar(pulse);
  });

  return (
    <mesh scale={3}>
  <sphereGeometry args={[0.28, 32, 32]} />

  <meshBasicMaterial
    color="#7ea6ff"
    transparent
    opacity={0.08}
  />
</mesh>
  );
}
