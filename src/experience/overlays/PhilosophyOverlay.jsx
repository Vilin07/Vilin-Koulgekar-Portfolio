import { AnimatePresence, motion } from "framer-motion";
import useReducedMotion from "../../hooks/useReducedMotion";

export default function PhilosophyOverlay({ reflection }) {
  const prefersReducedMotion = useReducedMotion();
  return (
    <AnimatePresence mode="wait">
      {reflection && (
        <motion.div
          key={reflection.id}
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -6 }}
          transition={{ duration: prefersReducedMotion ? 0.01 : 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none fixed inset-0 z-20 flex items-center justify-center px-8 text-center"
        >
          <div>
            <p className="font-[Cormorant_Garamond] text-[clamp(2rem,6vw,3.5rem)] font-medium leading-tight tracking-[0.055em] text-white/84 sm:tracking-[0.08em]">
              {reflection.sanskrit}
            </p>
            <div className="mt-7 space-y-1.5 text-[0.65rem] font-light leading-relaxed tracking-[0.14em] text-blue-100/52 sm:text-xs sm:tracking-[0.18em]">
              {reflection.lines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
