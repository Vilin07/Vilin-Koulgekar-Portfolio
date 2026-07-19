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
  intensity={0.72}
  luminanceThreshold={0.3}
  luminanceSmoothing={0.82}
/>

      <Noise opacity={0.01} />

      <Vignette
        darkness={0.8}
        offset={0.2}
      />
    </EffectComposer>
  );
}
