import { Html } from "@react-three/drei";

export default function UniverseGlow() {
  return (
    <Html fullscreen>
      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        {/* Deep Background */}
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-b
            from-[#020617]
            via-[#071327]
            to-[#01040d]
          "
        />

        {/* Galaxy Core Glow */}
       <div
  className="
    absolute
    left-1/2
    top-1/2
    w-[420px]
    h-[420px]
    -translate-x-1/2
    -translate-y-1/2
    rounded-full
    blur-[170px]
    opacity-[0.04]
    bg-sky-300
  "
/>

        {/* Inner Core */}
        <div
          className="
            absolute
            left-1/2
            top-1/2
            w-[520px]
            h-[520px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            blur-[120px]
            opacity-[0.22]
            bg-blue-300
          "
        />

        {/* Left Nebula */}
        <div
          className="
            absolute
            left-[-220px]
            top-[10%]
            w-[900px]
            h-[900px]
            rounded-full
            blur-[250px]
            opacity-[0.12]
            bg-indigo-500
          "
        />

        {/* Right Nebula */}
        <div
          className="
            absolute
            right-[-250px]
            bottom-[5%]
            w-[900px]
            h-[900px]
            rounded-full
            blur-[260px]
            opacity-[0.11]
            bg-cyan-400
          "
        />

        {/* Upper Blue Cloud */}
        <div
          className="
            absolute
            left-[35%]
            top-[-200px]
            w-[700px]
            h-[700px]
            rounded-full
            blur-[220px]
            opacity-[0.08]
            bg-blue-500
          "
        />

        {/* Lower Mist */}
        <div
          className="
            absolute
            left-[20%]
            bottom-[-260px]
            w-[1200px]
            h-[700px]
            rounded-full
            blur-[240px]
            opacity-[0.06]
            bg-sky-300
          "
        />

        <div
  className="
    absolute
    right-1/3
    top-1/3
    w-[800px]
    h-[800px]
    rounded-full
    blur-[220px]
    opacity-[0.018]
    bg-violet-500
  "
/>

<div
  className="
    absolute
    left-1/2
    top-1/2
    w-[180px]
    h-[180px]
    -translate-x-1/2
    -translate-y-1/2
    rounded-full
    blur-[80px]
    opacity-[0.04]
    bg-white
  "
/>

      </div>
    </Html>
  );
}