import { Html } from "@react-three/drei";

export default function UniverseGlow() {
  return (
    <Html fullscreen>
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          overflow-hidden
        "
      >
        {/* Center Glow */}
        <div
          className="
            absolute
            left-1/2
            top-1/2
            w-[760px]
            h-[760px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            blur-[150px]
            opacity-[0.12]
            bg-blue-500
          "
        />

        {/* Left Nebula Glow */}
        <div
          className="
            absolute
            left-0
            top-1/4
            w-[620px]
            h-[620px]
            rounded-full
            blur-[180px]
            opacity-[0.07]
            bg-indigo-500
          "
        />

        {/* Right Nebula Glow */}
        <div
          className="
            absolute
            right-0
            bottom-0
            w-[540px]
            h-[540px]
            rounded-full
            blur-[150px]
            opacity-[0.06]
            bg-sky-500
          "
        />
      </div>
    </Html>
  );
}
