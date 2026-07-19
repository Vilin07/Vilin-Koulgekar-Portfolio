import { motion } from "framer-motion";
import { PROFILE } from "../config/profile";
import { OPENING_TIMELINE } from "../config/universe";
import useReducedMotion from "../../hooks/useReducedMotion";

const revealDuration = OPENING_TIMELINE.welcomeStart - OPENING_TIMELINE.spaceRevealStart;
const welcomeDuration = OPENING_TIMELINE.welcomeEnd - OPENING_TIMELINE.welcomeStart;

export default function IntroOverlay({ phase }) {
  const prefersReducedMotion = useReducedMotion();
  const showUniverse = phase !== "boot";
  const showWelcome = phase === "welcome";

  return (
    <div className="pointer-events-none fixed inset-0 z-30">
      <motion.div
        initial={false}
        animate={{ opacity: showUniverse ? 0 : 1 }}
        transition={{ duration: prefersReducedMotion ? 0.01 : revealDuration, ease: [0.4, 0, 0.2, 1] }}
        className="absolute inset-0 bg-black"
      />
      <div className="absolute inset-0 flex items-center justify-center px-6">
        <motion.h1
          initial={false}
          animate={showWelcome ? { opacity: [0, 1, 1, 0], y: prefersReducedMotion ? 0 : [14, 0, 0, -5] } : { opacity: 0, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0.01 : welcomeDuration, ease: [0.22, 1, 0.36, 1] }}
          className="font-[Cormorant_Garamond] text-[clamp(3.15rem,11vw,6.4rem)] font-medium leading-none tracking-[0.055em] text-white/96 sm:tracking-[0.08em]"
          style={{ textShadow: "0 0 22px rgba(219, 234, 254, 0.18)" }}
        >
          {PROFILE.welcome}
        </motion.h1>
      </div>
    </div>
  );
}
