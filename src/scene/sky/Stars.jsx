import { Stars } from "@react-three/drei";

export default function StarsField() {
  return (
    <Stars
      radius={300}
      depth={120}
      count={1200}
      factor={2}
      fade
      speed={0.02}
    />
  );
}