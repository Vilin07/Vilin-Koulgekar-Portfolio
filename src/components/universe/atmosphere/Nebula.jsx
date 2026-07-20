import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Cloud({
    position,
    scale,
    color,
    opacity,
    speed,
    rotationSpeed
}) {

    const mesh = useRef();

    useFrame((state) => {

        if (!mesh.current) return;

        const t = state.clock.elapsedTime;

        mesh.current.rotation.z += rotationSpeed;

        mesh.current.position.y =
            position[1] +
            Math.sin(t * speed) * 0.25;

        mesh.current.position.x =
            position[0] +
            Math.cos(t * speed * 0.7) * 0.18;
    });

    return (

        <mesh
            ref={mesh}
            position={position}
        >
            <planeGeometry args={[scale, scale]} />

            <meshBasicMaterial
                color={color}
                transparent
                opacity={opacity}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
                toneMapped={false}
            />

        </mesh>

    );

}

export default function Nebula() {

    return (

        <>

            <Cloud
                position={[-15,5,-40]}
                scale={45}
                color="#1e3a8a"
                opacity={0.03}
                speed={0.04}
                rotationSpeed={0.00005}
            />

            <Cloud
                position={[12,-6,-35]}
                scale={38}
                color="#2563eb"
                opacity={0.025}
                speed={0.05}
                rotationSpeed={-0.00008}
            />

            <Cloud
                position={[0,8,-50]}
                scale={60}
                color="#60a5fa"
                opacity={0.018}
                speed={0.03}
                rotationSpeed={0.00004}
            />

            <Cloud
                position={[18,4,-55]}
                scale={55}
                color="#312e81"
                opacity={0.02}
                speed={0.02}
                rotationSpeed={0.00003}
            />

            <Cloud
                position={[-20,-10,-48]}
                scale={70}
                color="#1d4ed8"
                opacity={0.015}
                speed={0.025}
                rotationSpeed={-0.00002}
            />

        </>

    );

}