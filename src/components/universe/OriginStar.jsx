import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { ORIGIN_STAR } from "../../experience/config/journey";

export default function OriginStar({ phase, motionScale = 1 }) {
  const group = useRef();
  const coreMaterial = useRef();
  const haloMaterial = useRef();

  useFrame(({ clock }, delta) => {
    if (!group.current || !coreMaterial.current || !haloMaterial.current) return;

    const targetOpacity = phase === "journey" ? 0.72 : 0;
    const opacity = THREE.MathUtils.damp(coreMaterial.current.opacity, targetOpacity, 1.15, delta);
    const pulse = phase === "journey" ? 1 + Math.sin(clock.elapsedTime * 0.45) * 0.018 * motionScale : 1;

    coreMaterial.current.opacity = opacity;
    haloMaterial.current.opacity = opacity * 0.12;
    group.current.scale.setScalar(pulse);
  });

  return (
    <group ref={group} position={ORIGIN_STAR.position}>
      <mesh>
        <sphereGeometry args={[0.15, 20, 20]} />
        <meshBasicMaterial ref={coreMaterial} color="#dbeafe" transparent opacity={0} depthWrite={false} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.48, 20, 20]} />
        <meshBasicMaterial ref={haloMaterial} color="#7ea6ff" transparent opacity={0} depthWrite={false} />
      </mesh>
    </group>
  );
}
