import { useFrame, useThree } from "@react-three/fiber";
import { easing } from "maath";

export default function CameraRig() {
  const { camera, mouse } = useThree();

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;

    easing.damp3(
      camera.position,
      [
        Math.sin(t * 0.08) * 0.25 + mouse.x * 0.4,
        Math.cos(t * 0.06) * 0.15 + mouse.y * 0.25,
        8,
      ],
      0.3,
      delta
    );

    camera.lookAt(0, 0, 0);
  });

  return null;
}