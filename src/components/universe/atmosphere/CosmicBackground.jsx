import * as THREE from "three";

export default function CosmicBackground() {
  return (
    <>
      {/* Deep Space */}
      <mesh>
        <sphereGeometry args={[260, 64, 64]} />

        <meshBasicMaterial
          side={THREE.BackSide}
          color="#010208"
          depthWrite={false}
          fog={false}
        />
      </mesh>

      {/* Very Soft Blue */}
      <mesh rotation={[0.22, 0.35, 0]}>
        <sphereGeometry args={[245, 64, 64]} />

        <meshBasicMaterial
          side={THREE.BackSide}
          color="#041026"
          transparent
          opacity={0.012}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      {/* Indigo */}
      <mesh rotation={[-0.32, -0.28, 0]}>
        <sphereGeometry args={[235, 64, 64]} />

        <meshBasicMaterial
          side={THREE.BackSide}
          color="#0a1030"
          transparent
          opacity={0.008}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      {/* Cyan Tint */}
      <mesh rotation={[0.4, -0.18, 0]}>
        <sphereGeometry args={[225, 64, 64]} />

        <meshBasicMaterial
          side={THREE.BackSide}
          color="#09233d"
          transparent
          opacity={0.004}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
    </>
  );
}
