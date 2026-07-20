import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { UNIVERSE_COLORS } from "../../experience/config/universe";
import useUniverseQuality from "../../hooks/useUniverseQuality";
import Universe from "./Universe";

export default function UniverseCanvas({ phase, scrollProgress }) {
  const quality = useUniverseQuality();

  return (
  <Canvas
  dpr={quality.dpr}
  camera={{ position: [0, 3, 14], fov: 38 }}
  gl={{
    antialias: quality.level === "desktop",
    alpha: false,
    powerPreference: "high-performance",
  }}
>
      
      <fog
  attach="fog"
  args={["#04111f", 35, 120]}
/>
      <Suspense fallback={null}>
        <Universe quality={quality} scrollProgress={scrollProgress} phase={phase} />
      </Suspense>
    </Canvas>
  );
}
