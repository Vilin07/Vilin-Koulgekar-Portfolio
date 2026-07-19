import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { PROFILE } from "../config/profile";
import { OPENING_TIMELINE } from "../config/universe";
import useReducedMotion from "../../hooks/useReducedMotion";

const identityDelay = OPENING_TIMELINE.identityRevealStart - OPENING_TIMELINE.journeyStart;

export default function JourneyOverlay({ phase }) {
  const [showIdentity, setShowIdentity] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (phase !== "journey") {
      return undefined;
    }

    const revealTimer = window.setTimeout(
      () => setShowIdentity(true),
      identityDelay * 1000,
    );
    const exitTimer = window.setTimeout(
      () => setShowIdentity(false),
      (OPENING_TIMELINE.identityExitAt - OPENING_TIMELINE.journeyStart) * 1000,
    );

    return () => {
      window.clearTimeout(revealTimer);
      window.clearTimeout(exitTimer);
    };
  }, [phase]);

  return (
    <div className="pointer-events-none fixed inset-0 z-20 flex items-center justify-center px-6">
      <motion.div
        initial={false}
        animate={showIdentity ? { opacity: 1, y: 0 } : { opacity: 0, y: prefersReducedMotion ? 0 : 14 }}
        transition={{ duration: prefersReducedMotion ? 0.01 : 1.65, ease: [0.22, 1, 0.36, 1] }}
        className="text-center"
      >
        <h1 className="font-[Cormorant_Garamond] text-[clamp(2.35rem,8vw,6rem)] font-medium leading-none tracking-[0.075em] text-white/92 sm:tracking-[0.12em]">
          {PROFILE.name}
        </h1>
        <p className="mt-6 text-[0.62rem] font-light tracking-[0.24em] text-blue-100/60 sm:text-xs sm:tracking-[0.32em]">
          {PROFILE.role}
        </p>
      </motion.div>
    </div>
  );
}
