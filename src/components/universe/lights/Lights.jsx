import * as THREE from "three";

export default function Lights() {
  return (
    <>
      <ambientLight
        intensity={0.22}
        color="#b8d8ff"
      />

      <directionalLight
        position={[10, 12, 8]}
        intensity={0.35}
        color="#9fc5ff"
      />

      <pointLight
        position={[0, 0, 0]}
        intensity={2}
        distance={40}
        color="#7ea6ff"
      />
    </>
  );
}