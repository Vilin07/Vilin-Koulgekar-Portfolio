import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { JOURNEY_WAYPOINTS } from "../../experience/config/journey";

function getJourneyState(progress) {
  const nextIndex = JOURNEY_WAYPOINTS.findIndex((point) => point.progress >= progress);
  const end = JOURNEY_WAYPOINTS[nextIndex === -1 ? JOURNEY_WAYPOINTS.length - 1 : nextIndex];
  const start = JOURNEY_WAYPOINTS[Math.max(0, JOURNEY_WAYPOINTS.indexOf(end) - 1)];
  const range = end.progress - start.progress || 1;
  const alpha = THREE.MathUtils.clamp((progress - start.progress) / range, 0, 1);

  return { start, end, alpha };
}

export default function CameraController({ progress, motionScale }) {
  const targetPosition = useRef(new THREE.Vector3());
  const targetLookAt = useRef(new THREE.Vector3());
  const startPosition = useRef(new THREE.Vector3());
  const endPosition = useRef(new THREE.Vector3());
  const startTarget = useRef(new THREE.Vector3());
  const endTarget = useRef(new THREE.Vector3());
  const currentLookAt = useRef(new THREE.Vector3(0, 0, -8));

  useFrame(({ camera, pointer, clock }, delta) => {
    const journey = getJourneyState(progress);
    targetPosition.current
      .copy(startPosition.current.fromArray(journey.start.position))
      .lerp(endPosition.current.fromArray(journey.end.position), journey.alpha);
    targetLookAt.current
      .copy(startTarget.current.fromArray(journey.start.target))
      .lerp(endTarget.current.fromArray(journey.end.target), journey.alpha);

    if (motionScale > 0) {
      const drift = Math.sin(clock.elapsedTime * 0.15) * 0.08 * motionScale;
      targetPosition.current.x += pointer.x * 0.28 * motionScale;
      targetPosition.current.y += (pointer.y * 0.16 + drift) * motionScale;
    }

    const damping = 1 - Math.exp(-delta * 1.8);
    camera.position.lerp(targetPosition.current, damping);
    currentLookAt.current.lerp(targetLookAt.current, damping);
    camera.lookAt(currentLookAt.current);
  });

  return null;
}
