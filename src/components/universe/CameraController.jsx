import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { JOURNEY_WAYPOINTS } from "../../experience/config/journey";
import { getActiveJourneyProgress } from "../../utils/journeyProgress";

function getJourneyState(progress) {
  const nextIndex = JOURNEY_WAYPOINTS.findIndex((point) => point.progress >= progress);
  const end = JOURNEY_WAYPOINTS[nextIndex === -1 ? JOURNEY_WAYPOINTS.length - 1 : nextIndex];
  const start = JOURNEY_WAYPOINTS[Math.max(0, JOURNEY_WAYPOINTS.indexOf(end) - 1)];
  const range = end.progress - start.progress || 1;
  const linearProgress = THREE.MathUtils.clamp((progress - start.progress) / range, 0, 1);
  const alpha = THREE.MathUtils.smootherstep(linearProgress, 0, 1);

  return { start, end, alpha };
}

export default function CameraController({ progress, motionScale, phase }) {
  const targetPosition = useRef(new THREE.Vector3());
  const targetLookAt = useRef(new THREE.Vector3());
  const startPosition = useRef(new THREE.Vector3());
  const endPosition = useRef(new THREE.Vector3());
  const startTarget = useRef(new THREE.Vector3());
  const endTarget = useRef(new THREE.Vector3());
  const currentLookAt = useRef(new THREE.Vector3(0, 0, -8));

  useFrame(({ camera, pointer, clock }, delta) => {
    const activeProgress = getActiveJourneyProgress(clock.elapsedTime, phase, progress);
    const journey = getJourneyState(activeProgress);
    targetPosition.current
      .copy(startPosition.current.fromArray(journey.start.position))
      .lerp(endPosition.current.fromArray(journey.end.position), journey.alpha);
    targetLookAt.current
      .copy(startTarget.current.fromArray(journey.start.target))
      .lerp(endTarget.current.fromArray(journey.end.target), journey.alpha);

    if (phase === "journey" && motionScale > 0) {

    const t = clock.elapsedTime;

    // gentle breathing
    const breathe =
        Math.sin(t * 0.16) * 0.055 * motionScale;

    // left-right drifting
    const driftX =
        Math.sin(t * 0.08) * 0.09 * motionScale;

    // slow forward/back movement
    const driftZ =
        Math.cos(t * 0.055) * 0.08 * motionScale;

    // tiny orbital movement
    const orbit =
        Math.sin(t * 0.045) * 0.06 * motionScale;

    targetPosition.current.x +=
        driftX +
        pointer.x * 0.08 * motionScale;

    targetPosition.current.y +=
        breathe +
        pointer.y * 0.055 * motionScale;

    targetPosition.current.z +=
        driftZ;

    targetLookAt.current.x +=
        orbit * 0.18;

    targetLookAt.current.y +=
        Math.sin(t * 0.065) * 0.03 * motionScale;
}

    const damping =
    1 - Math.exp(-delta * 1.15);
    camera.position.lerp(targetPosition.current, damping);
    currentLookAt.current.lerp(targetLookAt.current, damping);
    camera.lookAt(currentLookAt.current);
    camera.rotation.z =
    Math.sin(clock.elapsedTime * 0.045) * 0.001 * motionScale;

  });

  return null;
}
