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
  const transitionDuration = prefersReducedMotion ? 0.01 : welcomeDuration;

  return (
    <div className="pointer-events-none fixed inset-0 z-30">
      <motion.div
        initial={false}
        animate={{ opacity: showUniverse ? 0 : 1 }}
        transition={{ duration: prefersReducedMotion ? 0.01 : revealDuration, ease: [0.4, 0, 0.2, 1] }}
        className="absolute inset-0 bg-black"
      />
      <div className="absolute inset-0 flex items-center justify-center px-6">
        <motion.div
          initial={false}
          animate={showWelcome ? { opacity: 1, y: 0 } : { opacity: 0, y: prefersReducedMotion ? 0 : -5 }}
          transition={{ duration: showWelcome ? 0.9 : 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="flex max-w-[28rem] flex-col items-center text-center"
        >
          <motion.p
            initial={false}
            animate={showWelcome ? { opacity: 0.58, y: 0 } : { opacity: 0, y: -4 }}
            transition={{ duration: transitionDuration, delay: showWelcome ? 0.1 : 0, ease: [0.22, 1, 0.36, 1] }}
            className="font-[Cormorant_Garamond] text-xl font-medium tracking-[0.2em] text-blue-100/70 sm:text-2xl"
          >
            {PROFILE.intro.symbol}
          </motion.p>
          <motion.h1
            initial={false}
            animate={showWelcome ? { opacity: 0.94, y: 0 } : { opacity: 0, y: prefersReducedMotion ? 0 : -6 }}
            transition={{ duration: transitionDuration, delay: showWelcome ? 0.28 : 0, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 font-[Cormorant_Garamond] text-[clamp(3rem,10vw,6.1rem)] font-medium leading-none tracking-[0.05em] text-white/92 sm:tracking-[0.075em]"
            style={{ textShadow: "0 0 18px rgba(191, 219, 254, 0.12)" }}
          >
            {PROFILE.welcome}
          </motion.h1>
          <motion.p
            initial={false}
            animate={showWelcome ? { opacity: 0.58, y: 0 } : { opacity: 0, y: prefersReducedMotion ? 0 : -4 }}
            transition={{ duration: transitionDuration, delay: showWelcome ? 0.6 : 0, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 text-[0.62rem] font-light tracking-[0.22em] text-blue-100/60 sm:text-xs sm:tracking-[0.3em]"
          >
            {PROFILE.intro.tagline}
          </motion.p>
          <motion.p
            initial={false}
            animate={showWelcome ? { opacity: 0.35, y: 0 } : { opacity: 0, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.9, delay: showWelcome ? 1.15 : 0, ease: [0.22, 1, 0.36, 1] }}
            className="mt-14 text-[0.5rem] font-light tracking-[0.28em] text-blue-100/50 sm:text-[0.55rem] sm:tracking-[0.38em]"
          >
            {PROFILE.intro.prompt}
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
