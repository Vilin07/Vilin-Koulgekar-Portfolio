import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { createSeededRandom } from "../../utils/seededRandom";
import { getActiveJourneyProgress } from "../../utils/journeyProgress";
import KnowledgeConstellation from "./KnowledgeConstellation";

function smoothstep(start, end, value) {
  const t = THREE.MathUtils.clamp((value - start) / (end - start), 0, 1);
  return t * t * (3 - 2 * t);
}

export default function KnowledgeGalaxy({ galaxy, phase, scrollProgress, motionScale = 1 }) {
  const galaxyGroup = useRef();
  const distantField = useRef();
  const fieldMaterial = useRef();
  const distantMaterial = useRef();
  const visibility = useRef(0);

  const positions = useMemo(() => {
    const count = 180;
    const values = new Float32Array(count * 3);
    const random = createSeededRandom(441);

    for (let index = 0; index < count; index += 1) {
      const branch = random() > 0.42 ? 0 : Math.PI + 0.38;
      const radius = 0.35 + random() * 3.4;
      const angle = radius * 1.45 + branch + (random() - 0.5) * 1.28;
      const i3 = index * 3;

      values[i3] = Math.cos(angle) * radius * (0.95 + random() * 0.35);
      values[i3 + 1] = (random() - 0.5) * (0.16 + radius * 0.07);
      values[i3 + 2] = Math.sin(angle) * radius * (0.7 + random() * 0.22);
    }

    return values;
  }, []);

  const distantPositions = useMemo(() => {
    const count = 74;
    const values = new Float32Array(count * 3);
    const random = createSeededRandom(917);

    for (let index = 0; index < count; index += 1) {
      const i3 = index * 3;
      values[i3] = (random() - 0.5) * 13;
      values[i3 + 1] = (random() - 0.5) * 4.5;
      values[i3 + 2] = -2.8 - random() * 7;
    }

    return values;
  }, []);

  useFrame(({ clock, pointer }, delta) => {
    const progress = getActiveJourneyProgress(clock.elapsedTime, phase, scrollProgress);
    const targetVisibility = smoothstep(galaxy.revealStart, galaxy.revealEnd, progress);
    visibility.current = THREE.MathUtils.damp(visibility.current, targetVisibility, 1.2, delta);

    if (fieldMaterial.current) fieldMaterial.current.opacity = visibility.current * 0.078;
    if (distantMaterial.current) distantMaterial.current.opacity = visibility.current * 0.034;
    if (galaxyGroup.current) galaxyGroup.current.rotation.y += delta * 0.0014 * motionScale;
    if (distantField.current) {
      distantField.current.position.x = THREE.MathUtils.damp(distantField.current.position.x, pointer.x * 0.1 * motionScale, 0.35, delta);
      distantField.current.position.y = THREE.MathUtils.damp(distantField.current.position.y, pointer.y * 0.05 * motionScale, 0.35, delta);
    }
  });

  return (
    <group ref={galaxyGroup} position={galaxy.position} rotation={[0.2, -0.28, 0]}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" array={positions} count={positions.length / 3} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial ref={fieldMaterial} color="#bfdbfe" size={0.026} transparent opacity={0} depthWrite={false} />
      </points>
      <points ref={distantField}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" array={distantPositions} count={distantPositions.length / 3} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial ref={distantMaterial} color="#dbeafe" size={0.018} transparent opacity={0} depthWrite={false} />
      </points>
      {galaxy.clusters.map((cluster) => (
        <KnowledgeConstellation key={cluster.id} cluster={cluster} visibility={visibility} motionScale={motionScale} />
      ))}
    </group>
  );
}
