import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { UNIVERSE_COLORS } from "../../experience/config/universe";
import useScrollProgress from "../../hooks/useScrollProgress";
import useUniverseQuality from "../../hooks/useUniverseQuality";
import Universe from "./Universe";

export default function UniverseCanvas() {
  const quality = useUniverseQuality();
  const scrollProgress = useScrollProgress();

  return (
    <Canvas
      dpr={quality.dpr}
      camera={{ position: [0, 3, 14], fov: 38 }}
      gl={{ antialias: quality.level === "desktop", alpha: false, powerPreference: "high-performance" }}
    >
      <color attach="background" args={[UNIVERSE_COLORS.background]} />
      <fog attach="fog" args={[UNIVERSE_COLORS.background, 12, 70]} />
      <Suspense fallback={null}>
        <Universe quality={quality} scrollProgress={scrollProgress} />
      </Suspense>
    </Canvas>
  );
}
