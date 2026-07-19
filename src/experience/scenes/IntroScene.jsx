import IntroOverlay from "../overlays/IntroOverlay";
import JourneyOverlay from "../overlays/JourneyOverlay";
import PhilosophyOverlay from "../overlays/PhilosophyOverlay";
import { useEffect, useRef, useState } from "react";
import { PHILOSOPHY } from "../config/philosophy";

export default function IntroScene({ phase, scrollProgress }) {
  const [reflection, setReflection] = useState(null);
  const knowledgeShown = useRef(false);

  useEffect(() => {
    if (phase !== "journey") return undefined;

    const revealTimer = window.setTimeout(() => setReflection(PHILOSOPHY.opening), 180);
    const hideTimer = window.setTimeout(() => setReflection(null), 3400);

    return () => {
      window.clearTimeout(revealTimer);
      window.clearTimeout(hideTimer);
    };
  }, [phase]);

  useEffect(() => {
    if (phase !== "journey" || scrollProgress < 0.985 || knowledgeShown.current) return undefined;

    knowledgeShown.current = true;
    const revealTimer = window.setTimeout(() => setReflection(PHILOSOPHY.knowledgeGalaxy), 0);
    const hideTimer = window.setTimeout(() => setReflection(null), 3800);

    return () => {
      window.clearTimeout(revealTimer);
      window.clearTimeout(hideTimer);
    };
  }, [phase, scrollProgress]);

  return (
    <>
      <IntroOverlay phase={phase} />
      <JourneyOverlay phase={phase} />
      <PhilosophyOverlay reflection={reflection} />
    </>
  );
}
