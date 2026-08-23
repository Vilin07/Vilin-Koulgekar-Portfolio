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
        intensity={0.58}
        luminanceThreshold={0.38}
        luminanceSmoothing={0.86}
      />

      <Noise opacity={0.006} />

      <Vignette
        darkness={0.68}
        offset={0.28}
      />
    </EffectComposer>
  );
}
