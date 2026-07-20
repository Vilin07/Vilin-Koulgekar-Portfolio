import {
  Bloom,
  ChromaticAberration,
  EffectComposer,
  Noise,
  Vignette,
} from "@react-three/postprocessing";

export default function Effects() {
  return (
    <EffectComposer>
    <Bloom
  intensity={1.35}
  luminanceThreshold={0.18}
  luminanceSmoothing={0.9}
/>

<ChromaticAberration
  offset={[0.0008, 0.0008]}
/>

      <Noise opacity={0.01} />

      <Vignette
        darkness={0.8}
        offset={0.2}
      />
    </EffectComposer>
  );
}
