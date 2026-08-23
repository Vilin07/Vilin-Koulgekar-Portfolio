import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { ORIGIN_STAR } from "../../experience/config/journey";

const RING_OPACITIES = [0.032, 0.018, 0.009];

export default function OriginStar({ phase, motionScale = 1 }) {
  const group = useRef();
  const coreMaterial = useRef();
  const haloMaterial = useRef();
  const ring = useRef();
  const ringMaterials = useRef([]);

  useFrame(({ clock }, delta) => {
    if (!group.current || !coreMaterial.current || !haloMaterial.current) return;

    const targetOpacity = phase === "journey" ? 0.3 : phase === "welcome" ? 0.055 : 0;
    const opacity = THREE.MathUtils.damp(coreMaterial.current.opacity, targetOpacity, 0.8, delta);
    const pulse = phase === "journey"
      ? 1 + Math.sin(clock.elapsedTime * 0.38) * 0.012 * motionScale
      : 1;

    coreMaterial.current.opacity = opacity;
    haloMaterial.current.opacity = opacity * 0.07;
    group.current.scale.setScalar(pulse);
    ringMaterials.current.forEach((material, index) => {
      if (material) {
        const targetRingOpacity = phase === "journey" ? opacity * RING_OPACITIES[index] : 0;
        material.opacity = THREE.MathUtils.damp(material.opacity, targetRingOpacity, 0.7, delta);
      }
    });
    if (ring.current) {
      ring.current.rotation.y += delta * 0.012 * motionScale;
      ring.current.rotation.z += delta * 0.004 * motionScale;
    }
  });

  return (
    <group ref={group} position={ORIGIN_STAR.position}>
      <mesh>
        <sphereGeometry args={[0.13, 16, 16]} />
        <meshBasicMaterial
          ref={coreMaterial}
          color="#dbeafe"
          transparent
          opacity={0}
          toneMapped={false}
          depthWrite={false}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.62, 20, 20]} />
        <meshBasicMaterial
  ref={haloMaterial}
  color="#7ea6ff"
  transparent
  opacity={0}
  blending={THREE.AdditiveBlending}
  toneMapped={false}
  depthWrite={false}
/>
      </mesh>


    <group ref={ring}>

    <mesh rotation={[1.15, 0.35, 0]}>

        <ringGeometry args={[0.62, 0.66, 64]} />

        <meshBasicMaterial
            ref={(material) => { ringMaterials.current[0] = material; }}
            color="#9ac8ff"
            transparent
            opacity={0}
            blending={THREE.AdditiveBlending}
            side={THREE.DoubleSide}
            depthWrite={false}
            toneMapped={false}
        />

    </mesh>

    <mesh rotation={[0.82, -0.45, 0]}>

        <ringGeometry args={[0.78, 0.82, 64]} />

        <meshBasicMaterial
            ref={(material) => { ringMaterials.current[1] = material; }}
            color="#6da4ff"
            transparent
            opacity={0}
            blending={THREE.AdditiveBlending}
            side={THREE.DoubleSide}
            depthWrite={false}
            toneMapped={false}
        />

    </mesh>

    <mesh rotation={[1.42, 0.8, 0]}>

        <ringGeometry args={[1.04, 1.08, 64]} />

        <meshBasicMaterial
            ref={(material) => { ringMaterials.current[2] = material; }}
            color="#d4e7ff"
            transparent
            opacity={0}
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
