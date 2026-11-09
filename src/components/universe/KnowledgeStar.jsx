import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export default function KnowledgeStar({ star, category, constellationVisibility, neighborResponse, labelDistance, motionScale = 1 }) {
  const group = useRef();
  const label = useRef();
  const material = useRef();
  const worldPosition = useRef(new THREE.Vector3());
  const labelOpacity = useRef(0);
  const focused = useRef(false);

  useFrame(({ camera }, delta) => {
    if (!group.current || !label.current || !material.current) return;

    group.current.getWorldPosition(worldPosition.current);
    const distance = camera.position.distanceTo(worldPosition.current);
    const proximity = 1 - THREE.MathUtils.smoothstep(distance, labelDistance * 0.55, labelDistance);
    const targetLabelOpacity = focused.current ? proximity * constellationVisibility.current * 0.72 : 0;
    const targetStarOpacity = 0.035 + constellationVisibility.current * (0.16 + proximity * 0.3 + neighborResponse.current * 0.08);

    labelOpacity.current = THREE.MathUtils.damp(labelOpacity.current, targetLabelOpacity, 0.9 + motionScale * 0.2, delta);
    label.current.style.opacity = `${labelOpacity.current}`;
    material.current.opacity = THREE.MathUtils.damp(material.current.opacity, targetStarOpacity, 1.1 + motionScale * 0.2, delta);
  });

  return (
    <group ref={group} position={star.position} onPointerOver={() => { focused.current = true; }} onPointerOut={() => { focused.current = false; }} onClick={() => { focused.current = !focused.current; }}>
      <mesh>
        <sphereGeometry args={[0.055, 12, 12]} />
        <meshBasicMaterial ref={material} color="#dbeafe" transparent opacity={0} depthWrite={false} />
      </mesh>
      <Html position={[0, 0.16, 0]} center distanceFactor={8} transform sprite>
        <span ref={label} className="pointer-events-none whitespace-nowrap text-[0.5rem] font-light tracking-[0.22em] text-blue-100/55 sm:text-[0.52rem]">
          {star.name} · {category}
        </span>
      </Html>
    </group>
  );
}
