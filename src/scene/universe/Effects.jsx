import {
  Bloom,
  EffectComposer,
  Noise,
  Vignette,
} from "@react-three/postprocessing";

export default function Effects() {
  return (
    <EffectComposer>
      <Bloom
        intensity={1.5}
        luminanceThreshold={0.05}
        luminanceSmoothing={0.8}
        mipmapBlur
      />

      <Noise opacity={0.01} />

      <Vignette
        darkness={0.8}
        offset={0.2}
      />
    </EffectComposer>
  );
}