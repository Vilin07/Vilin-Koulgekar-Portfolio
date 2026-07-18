import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Universe from "./universe/Universe";


export default function Experience() {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{
        position: [0, 0, 8],
        fov: 50,
      }}
      gl={{
        antialias: true,
        alpha: false,
      }}
    >
      <color attach="background" args={["#020617"]} />

      <fog attach="fog" args={["#020617", 12, 70]} />

      <Suspense fallback={null}>
        <Universe />
      </Suspense>
    </Canvas>
  );
}