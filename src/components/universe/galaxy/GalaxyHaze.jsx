import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import NebulaMaterial from "../atmosphere/NebulaMaterial";

export default function GalaxyHaze() {
  const innerHaze = useRef();
  const outerHaze = useRef();

  useFrame(({ clock }, delta) => {
    const t = clock.elapsedTime;

    if (innerHaze.current) {
      innerHaze.current.rotation.z += delta * 0.0015;
      innerHaze.current.rotation.x =
        Math.sin(t * 0.03) * 0.03;
    }

    if (outerHaze.current) {
      outerHaze.current.rotation.z -= delta * 0.001;
      outerHaze.current.rotation.y =
        Math.cos(t * 0.025) * 0.02;
    }
  });

  return (
    <>
      {/* Inner Haze */}

      <mesh
        ref={innerHaze}
        position={[0, -5, -15]}
        rotation={[0.55, 0.15, -0.4]}
      >
        <planeGeometry args={[140, 140]} />

        <NebulaMaterial />
      </mesh>

      {/* Outer Haze */}

      <mesh
        ref={outerHaze}
        position={[0, -5, -16]}
        rotation={[0.55, 0.15, -0.4]}
      >
        <planeGeometry args={[220, 220]} />

        <meshBasicMaterial
          color="#8ab8ff"
          transparent
       opacity={0.008}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
          side={THREE.DoubleSide}
        />
      </mesh>
    </>
  );
}