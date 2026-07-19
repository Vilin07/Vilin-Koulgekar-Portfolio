import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { getActiveJourneyProgress } from "../../utils/journeyProgress";

const nodes = [
  [-1.05, 0.22, 0],
  [-0.58, 0.62, 0.05],
  [-0.12, 0.18, -0.02],
  [0.36, 0.72, 0.04],
  [0.86, 0.28, 0],
  [0.5, -0.42, -0.03],
  [-0.36, -0.5, 0.02],
];

const links = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 2]];

function smoothstep(start, end, value) {
  const t = THREE.MathUtils.clamp((value - start) / (end - start), 0, 1);
  return t * t * (3 - 2 * t);
}

export default function Constellation({ chapter, phase, scrollProgress, motionScale = 1 }) {
  const group = useRef();
  const pointsMaterial = useRef();
  const linesMaterial = useRef();

  const { nodePositions, linePositions } = useMemo(() => {
    const nodePositions = new Float32Array(nodes.flat());
    const linePositions = new Float32Array(links.flatMap(([from, to]) => [...nodes[from], ...nodes[to]]));
    return { nodePositions, linePositions };
  }, []);

  useFrame(({ clock }, delta) => {
    if (!group.current || !pointsMaterial.current || !linesMaterial.current) return;

    const progress = getActiveJourneyProgress(clock.elapsedTime, phase, scrollProgress);
    const reveal = smoothstep(chapter.revealStart, chapter.revealEnd, progress);
    const fade = 1 - smoothstep(chapter.fadeEnd, 1, progress);
    const opacity = reveal * fade;

    pointsMaterial.current.opacity = THREE.MathUtils.damp(pointsMaterial.current.opacity, opacity * 0.4, 1.35, delta);
    linesMaterial.current.opacity = THREE.MathUtils.damp(linesMaterial.current.opacity, opacity * 0.055, 1.1, delta);
    group.current.rotation.z += delta * 0.002 * motionScale;
  });

  return (
    <group ref={group} position={chapter.position}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" array={nodePositions} count={nodePositions.length / 3} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial ref={pointsMaterial} color="#dbeafe" size={0.07} transparent opacity={0} depthWrite={false} />
      </points>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" array={linePositions} count={linePositions.length / 3} itemSize={3} />
        </bufferGeometry>
        <lineBasicMaterial ref={linesMaterial} color="#93c5fd" transparent opacity={0} depthWrite={false} />
      </lineSegments>
    </group>
  );
}
