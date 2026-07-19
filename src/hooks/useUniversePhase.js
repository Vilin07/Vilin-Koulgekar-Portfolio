import { useEffect, useState } from "react";
import { OPENING_TIMELINE } from "../experience/config/universe";

export default function useUniversePhase() {
  const [phase, setPhase] = useState("boot");

  useEffect(() => {
    const revealTimer = window.setTimeout(
      () => setPhase("space_reveal"),
      OPENING_TIMELINE.spaceRevealStart * 1000,
    );
    const welcomeTimer = window.setTimeout(
      () => setPhase("welcome"),
      OPENING_TIMELINE.welcomeStart * 1000,
    );
    const journeyTimer = window.setTimeout(
      () => setPhase("journey"),
      OPENING_TIMELINE.journeyStart * 1000,
    );

    return () => {
      window.clearTimeout(revealTimer);
      window.clearTimeout(welcomeTimer);
      window.clearTimeout(journeyTimer);
    };
  }, []);

  return phase;
}
