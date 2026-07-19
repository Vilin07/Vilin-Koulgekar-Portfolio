import { useEffect, useMemo, useState } from "react";
import { UNIVERSE_QUALITY } from "../experience/config/universe";
import useReducedMotion from "./useReducedMotion";

const MOBILE_BREAKPOINT = 768;

export default function useUniverseQuality() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < MOBILE_BREAKPOINT);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    window.addEventListener("resize", onResize, { passive: true });

    return () => window.removeEventListener("resize", onResize);
  }, []);

  return useMemo(() => {
    if (prefersReducedMotion) return { ...UNIVERSE_QUALITY.reduced, level: "reduced" };
    if (isMobile) return { ...UNIVERSE_QUALITY.mobile, level: "mobile" };
    return { ...UNIVERSE_QUALITY.desktop, level: "desktop" };
  }, [isMobile, prefersReducedMotion]);
}
