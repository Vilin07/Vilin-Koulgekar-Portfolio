import { JOURNEY_MILESTONES } from "../experience/config/journey";
import { OPENING_TIMELINE } from "../experience/config/universe";

function mapTimeToProgress(elapsed, start, end, from, to) {
  const progress = Math.min(1, Math.max(0, (elapsed - start) / (end - start)));
  return from + (to - from) * progress;
}

export function getAutoplayJourneyProgress(elapsed, phase) {
  if (phase !== "journey") return 0;

  if (elapsed <= OPENING_TIMELINE.identityArrivalAt) {
    return mapTimeToProgress(
      elapsed,
      OPENING_TIMELINE.journeyStart,
      OPENING_TIMELINE.identityArrivalAt,
      0,
      JOURNEY_MILESTONES.identity,
    );
  }

  return mapTimeToProgress(
    elapsed,
    OPENING_TIMELINE.identityArrivalAt,
    OPENING_TIMELINE.chapterOneArrivalAt,
    JOURNEY_MILESTONES.identity,
    JOURNEY_MILESTONES.chapterOneArrival,
  );
}

export function getActiveJourneyProgress(elapsed, phase, scrollProgress) {
  if (phase !== "journey") return 0;
  // The cinematic opening can advance on its own; after the first intentional
  // scroll, native scroll is the single source of truth for camera and content.
  if (scrollProgress > 0.01) return scrollProgress;
  return getAutoplayJourneyProgress(elapsed, phase);
}
