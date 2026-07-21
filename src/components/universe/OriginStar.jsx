import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { ORIGIN_STAR } from "../../experience/config/journey";

export default function OriginStar({ phase, motionScale = 1 }) {
  const group = useRef();
  const coreMaterial = useRef();
  const haloMaterial = useRef();
  const ring = useRef();

  useFrame(({ clock }, delta) => {
    if (!group.current || !coreMaterial.current || !haloMaterial.current) return;

    const targetOpacity = phase === "journey" ? 0.72 : 0;
    const opacity = THREE.MathUtils.damp(coreMaterial.current.opacity, targetOpacity, 1.15, delta);
   const pulse =
  phase === "journey"
    ? 1 + Math.sin(clock.elapsedTime * 0.6) * 0.04 * motionScale
    : 1;

    coreMaterial.current.opacity = opacity;
    haloMaterial.current.opacity = opacity * 0.22;
    group.current.scale.setScalar(pulse);
    if (ring.current) {

    ring.current.rotation.y += delta * 0.05;

    ring.current.rotation.z += delta * 0.015;

}
  });

  return (
    <group ref={group} position={ORIGIN_STAR.position}>
      <mesh>
        <sphereGeometry args={[0.15, 20, 20]} />
       <meshStandardMaterial
  ref={coreMaterial}
  color="#ffffff"
  emissive="#7ea6ff"
  emissiveIntensity={14}
  transparent
  opacity={0}
  toneMapped={false}
  depthWrite={false}
/>
      </mesh>
      <mesh>
        <sphereGeometry args={[0.75, 32, 32]} />
        <meshBasicMaterial
  ref={haloMaterial}
  color="#60a5fa"
  transparent
  opacity={0}
  blending={THREE.AdditiveBlending}
  toneMapped={false}
  depthWrite={false}
/>
      </mesh>


    <group ref={ring}>

    <mesh rotation={[1.15, 0.35, 0]}>

        <ringGeometry args={[0.62, 0.72, 96]} />

        <meshBasicMaterial
            color="#9ac8ff"
            transparent
            opacity={0.12}
            blending={THREE.AdditiveBlending}
            side={THREE.DoubleSide}
            depthWrite={false}
            toneMapped={false}
        />

    </mesh>

    <mesh rotation={[0.82, -0.45, 0]}>

        <ringGeometry args={[0.80, 0.90, 96]} />

        <meshBasicMaterial
            color="#6da4ff"
            transparent
            opacity={0.06}
            blending={THREE.AdditiveBlending}
            side={THREE.DoubleSide}
            depthWrite={false}
            toneMapped={false}
        />

    </mesh>

    <mesh rotation={[1.42, 0.8, 0]}>

        <ringGeometry args={[1.05, 1.14, 96]} />

        <meshBasicMaterial
            color="#d4e7ff"
            transparent
            opacity={0.03}
            blending={THREE.AdditiveBlending}
            side={THREE.DoubleSide}
            depthWrite={false}
            toneMapped={false}
        />

    </mesh>

</group>

    </group>
  );
}
