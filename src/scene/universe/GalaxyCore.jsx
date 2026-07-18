import { Sphere } from "@react-three/drei";

export default function GalaxyCore() {
  return (
    <>
      {/* Bright white center */}
      <Sphere args={[0.35, 32, 32]}>
        <meshBasicMaterial
          color="#ffffff"
          toneMapped={false}
        />
      </Sphere>

      {/* Blue glow */}
      <Sphere args={[1.2, 32, 32]}>
        <meshBasicMaterial
          color="#7ea6ff"
          transparent
          opacity={0.08}
          toneMapped={false}
        />
      </Sphere>

      {/* Outer halo */}
      <Sphere args={[2.5, 32, 32]}>
        <meshBasicMaterial
          color="#2563eb"
          transparent
          opacity={0.03}
          toneMapped={false}
        />
      </Sphere>
    </>
  );
}