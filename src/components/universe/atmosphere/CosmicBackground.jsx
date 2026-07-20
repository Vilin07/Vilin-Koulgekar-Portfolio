import * as THREE from "three";

export default function CosmicBackground() {
  return (
    <mesh>
      <sphereGeometry args={[140, 64, 64]} />

      <meshBasicMaterial
        side={THREE.BackSide}
        color="#04111f"
        transparent
        opacity={1}
        depthWrite={false}
      />
    </mesh>
  );
}