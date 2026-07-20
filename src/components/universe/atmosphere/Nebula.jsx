import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function NebulaCloud({
  position,
  radius,
  color,
  opacity,
  speed,
  rotationSpeed,
}) {
  const group = useRef();

  useFrame(({ clock }, delta) => {
    if (!group.current) return;

    const t = clock.elapsedTime;

    group.current.rotation.z += rotationSpeed * delta * 60;

    group.current.position.x =
      position[0] + Math.sin(t * speed) * 0.35;

    group.current.position.y =
      position[1] + Math.cos(t * speed * 0.8) * 0.28;

    group.current.position.z =
      position[2] + Math.sin(t * speed * 0.5) * 0.45;
  });

  return (
    <group ref={group} position={position}>
      {[1, 0.86, 0.7].map((scale, index) => (
        <mesh
          key={index}
          position={[0, 0, -index * 0.35]}
          scale={scale}
        >
          <circleGeometry args={[radius, 96]} />

          <meshBasicMaterial
            color={color}
            transparent
            opacity={opacity * (1 - index * 0.28)}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            depthTest={false}
            toneMapped={false}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

const CLOUDS = [
  // Left
  {
    position: [-38, 18, -90],
    radius: 52,
    color: "#294d9f",
    opacity: 0.030,
    speed: 0.015,
    rotationSpeed: 0.00002,
  },

  {
    position: [-48, -10, -120],
    radius: 75,
    color: "#204a9d",
    opacity: 0.020,
    speed: 0.010,
    rotationSpeed: -0.000015,
  },

  {
    position: [-18, 34, -135],
    radius: 95,
    color: "#6b8cff",
    opacity: 0.014,
    speed: 0.008,
    rotationSpeed: 0.000012,
  },

  // Right
  {
    position: [42, -14, -95],
    radius: 60,
    color: "#3f6ee8",
    opacity: 0.028,
    speed: 0.014,
    rotationSpeed: -0.00002,
  },

  {
    position: [55, 18, -125],
    radius: 90,
    color: "#8fc9ff",
    opacity: 0.016,
    speed: 0.009,
    rotationSpeed: 0.00001,
  },

  {
    position: [18, 32, -150],
    radius: 120,
    color: "#4c55b6",
    opacity: 0.010,
    speed: 0.007,
    rotationSpeed: 0.000008,
  },

  // Center
  {
    position: [0, 24, -105],
    radius: 72,
    color: "#8bc9ff",
    opacity: 0.022,
    speed: 0.012,
    rotationSpeed: 0.000015,
  },

  {
    position: [0, -34, -130],
    radius: 115,
    color: "#173a7d",
    opacity: 0.015,
    speed: 0.009,
    rotationSpeed: -0.00001,
  },

  {
    position: [0, 4, -165],
    radius: 160,
    color: "#dbeafe",
    opacity: 0.008,
    speed: 0.006,
    rotationSpeed: 0.000006,
  },

  // Foreground
  {
    position: [12, 6, 6],
    radius: 80,
    color: "#8fb8ff",
    opacity: 0.006,
    speed: 0.010,
    rotationSpeed: 0.00001,
  },

  {
    position: [-18, -8, 10],
    radius: 95,
    color: "#c9dcff",
    opacity: 0.005,
    speed: 0.008,
    rotationSpeed: -0.00001,
  },

  {
    position: [34, -2, 4],
    radius: 70,
    color: "#6aa6ff",
    opacity: 0.005,
    speed: 0.009,
    rotationSpeed: 0.000008,
  },
];

export default function Nebula() {
  return (
    <>
      {CLOUDS.map((cloud, index) => (
        <NebulaCloud
          key={index}
          position={cloud.position}
          radius={cloud.radius}
          color={cloud.color}
          opacity={cloud.opacity}
          speed={cloud.speed}
          rotationSpeed={cloud.rotationSpeed}
        />
      ))}
    </>
  );
}