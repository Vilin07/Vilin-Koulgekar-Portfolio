// Legacy/inactive canvas entry point. The live runtime uses
// App → Background → components/universe/UniverseCanvas instead.
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Universe from "./Universe";


export default function Experience() {
  return (
    <Canvas
      dpr={[1, 2]}
     camera={{
      position:[0,3,14],
      fov: 38,
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
