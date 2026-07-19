import { Html } from "@react-three/drei";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { getActiveJourneyProgress } from "../../utils/journeyProgress";
import { createSeededRandom } from "../../utils/seededRandom";
import KnowledgeParticle from "./KnowledgeParticle";

function smoothstep(start, end, value) {
  const t = THREE.MathUtils.clamp((value - start) / (end - start), 0, 1);
  return t * t * (3 - 2 * t);
}

export default function ProjectPlanet({ chapter, phase, scrollProgress, motionScale = 1 }) {
  const planet = useRef();
  const surfaceMaterial = useRef();
  const atmosphereMaterial = useRef();
  const variationMaterial = useRef();
  const rimMaterial = useRef();
  const title = useRef();
  const ringOpacity = useRef(0);
  const titleOpacity = useRef(0);
  const surfaceVariation = useMemo(() => {
    const count = 42;
    const points = new Float32Array(count * 3);
    const random = createSeededRandom(2701);

    for (let index = 0; index < count; index += 1) {
      const theta = random() * Math.PI * 2;
      const phi = Math.acos(1 - random() * 1.25);
      const radius = chapter.radius * 1.012;
      const i3 = index * 3;

      points[i3] = Math.sin(phi) * Math.cos(theta) * radius;
      points[i3 + 1] = Math.cos(phi) * radius;
      points[i3 + 2] = Math.sin(phi) * Math.sin(theta) * radius;
    }

    return points;
  }, [chapter.radius]);

  useFrame(({ clock }, delta) => {
    if (!planet.current || !surfaceMaterial.current || !atmosphereMaterial.current || !variationMaterial.current || !rimMaterial.current || !title.current) return;

    const progress = getActiveJourneyProgress(clock.elapsedTime, phase, scrollProgress);
    const visibility = smoothstep(chapter.revealStart, chapter.revealEnd, progress);
    const titleIn = smoothstep(chapter.titleRevealStart, chapter.arrivalProgress, progress);
    const titleOut = 1 - smoothstep(chapter.titleExitStart, 1, progress);
    const interaction = smoothstep(chapter.ringRevealStart, 1, scrollProgress);

    surfaceMaterial.current.opacity = THREE.MathUtils.damp(surfaceMaterial.current.opacity, visibility * 0.7, 1.15, delta);
    atmosphereMaterial.current.opacity = THREE.MathUtils.damp(atmosphereMaterial.current.opacity, visibility * 0.075, 1, delta);
    variationMaterial.current.opacity = THREE.MathUtils.damp(variationMaterial.current.opacity, visibility * 0.045, 1, delta);
    rimMaterial.current.opacity = THREE.MathUtils.damp(rimMaterial.current.opacity, visibility * 0.026, 1, delta);
    ringOpacity.current = THREE.MathUtils.damp(ringOpacity.current, interaction * 0.2, 0.9, delta);
    planet.current.rotation.y += delta * 0.022 * interaction * motionScale;
    planet.current.rotation.x = Math.sin(clock.elapsedTime * 0.065) * 0.016 * motionScale;
    titleOpacity.current = THREE.MathUtils.damp(titleOpacity.current, titleIn * titleOut, 1.25, delta);
    title.current.style.opacity = `${titleOpacity.current}`;
    title.current.style.transform = `translateY(${(1 - titleOpacity.current) * 7}px)`;
  });

  return (
    <group position={chapter.position}>
      <group ref={planet}>
        <mesh>
          <sphereGeometry args={[chapter.radius, 36, 36]} />
          <meshBasicMaterial ref={surfaceMaterial} color="#101b3d" transparent opacity={0} depthWrite={false} />
        </mesh>
        <points rotation={[0.18, -0.32, 0]}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" array={surfaceVariation} count={surfaceVariation.length / 3} itemSize={3} />
          </bufferGeometry>
          <pointsMaterial ref={variationMaterial} color="#93c5fd" size={0.026} transparent opacity={0} depthWrite={false} />
        </points>
        <mesh scale={1.035}>
          <sphereGeometry args={[chapter.radius, 28, 28]} />
          <meshBasicMaterial ref={atmosphereMaterial} color="#40639b" transparent opacity={0} depthWrite={false} />
        </mesh>
        <mesh scale={1.115}>
          <sphereGeometry args={[chapter.radius, 24, 24]} />
          <meshBasicMaterial ref={rimMaterial} color="#93c5fd" transparent opacity={0} depthWrite={false} side={THREE.BackSide} />
        </mesh>
        <KnowledgeParticle radius={chapter.radius * 1.7} opacityRef={ringOpacity} rotate={scrollProgress > chapter.ringRevealStart} />
      </group>
      <Html position={[0, chapter.radius * 1.85, 0]} center distanceFactor={9} transform sprite>
        <div ref={title} className="pointer-events-none min-w-[15rem] max-w-[78vw] text-center transition-none">
          <p className="text-[0.5rem] uppercase tracking-[0.36em] text-blue-100/50 sm:text-[0.55rem] sm:tracking-[0.42em]">{chapter.numeral}</p>
          <h2 className="mt-3 font-[Cormorant_Garamond] text-2xl font-medium leading-[1.02] tracking-[0.06em] text-white/92 sm:text-3xl md:text-4xl">
            {chapter.title}
          </h2>
          <p className="mt-4 text-[0.58rem] leading-relaxed tracking-[0.12em] text-blue-100/58 sm:text-[0.62rem] md:text-xs">{chapter.subtitle}</p>
        </div>
      </Html>
    </group>
  );
}
