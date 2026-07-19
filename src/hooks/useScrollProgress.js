import { useEffect, useState } from "react";

export default function useScrollProgress() {
  // Future optimization: keep progress in a ref-driven store once the journey
  // has enough chapters that scroll-triggered React updates become measurable.
  // The current small foundation scene remains intentionally unchanged.
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frameId = 0;

    const updateProgress = () => {
      frameId = 0;
      const availableScroll = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(availableScroll > 0 ? window.scrollY / availableScroll : 0);
    };

    const requestUpdate = () => {
      if (!frameId) frameId = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, []);

  return Math.min(1, Math.max(0, progress));
}
