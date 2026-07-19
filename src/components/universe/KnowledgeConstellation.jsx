import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import KnowledgeStar from "./KnowledgeStar";

export default function KnowledgeConstellation({ cluster, visibility, motionScale = 1 }) {
  const group = useRef();
  const lineMaterial = useRef();
  const worldPosition = useRef(new THREE.Vector3());
  const neighborResponse = useRef(0);

  const linePositions = useMemo(() => {
    const positions = cluster.links.flatMap(([from, to]) => [
      ...cluster.stars[from].position,
      ...cluster.stars[to].position,
    ]);

    return new Float32Array(positions);
  }, [cluster]);

  useFrame(({ camera }, delta) => {
    if (!group.current) return;

    group.current.getWorldPosition(worldPosition.current);
    const distance = camera.position.distanceTo(worldPosition.current);
    const proximity = 1 - THREE.MathUtils.smoothstep(distance, 9, 22);
    neighborResponse.current = THREE.MathUtils.damp(neighborResponse.current, proximity, 0.6 * motionScale, delta);

    if (lineMaterial.current) {
      const targetOpacity = visibility.current * (0.028 + neighborResponse.current * 0.028);
      lineMaterial.current.opacity = THREE.MathUtils.damp(lineMaterial.current.opacity, targetOpacity, 1.1, delta);
    }
  });

  return (
    <group ref={group} position={cluster.position}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" array={linePositions} count={linePositions.length / 3} itemSize={3} />
        </bufferGeometry>
        <lineBasicMaterial ref={lineMaterial} color="#93c5fd" transparent opacity={0} depthWrite={false} />
      </lineSegments>
      {cluster.stars.map((star) => (
        <KnowledgeStar
          key={star.id}
          star={star}
          constellationVisibility={visibility}
          neighborResponse={neighborResponse}
          labelDistance={cluster.labelDistance}
          motionScale={motionScale}
        />
      ))}
    </group>
  );
}
