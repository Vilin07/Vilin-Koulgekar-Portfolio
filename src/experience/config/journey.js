export const JOURNEY_WAYPOINTS = [
  {
    progress: 0,
    position: [0, 3, 14],
    target: [0, 0, -8],
  },
  {
    progress: 0.45,
    position: [0.35, 1.1, 9.5],
    target: [0, -0.1, -10],
  },
  {
    progress: 0.58,
    position: [0.8, 0.9, 7.5],
    target: [1.2, 0.15, -15.5],
  },
  {
    progress: 0.72,
    position: [1.4, 0.6, 1.8],
    target: [2.45, -0.35, -20],
  },
  {
    progress: 0.84,
    position: [2, 0.15, -10],
    target: [2.45, -0.35, -20],
  },
  {
    progress: 1,
    position: [6.2, 1.1, -17],
    target: [7, 0, -28],
  },
];

export const JOURNEY_MILESTONES = {
  identity: 0.45,
  chapterOneArrival: 0.84,
};

export const ORIGIN_STAR = {
  position: [0, -0.1, -10],
  waypointProgress: 0.45,
};

// These coordinates reserve a continuous path for future chapters.
export const JOURNEY_DESTINATIONS = {
  intro: [0, 0, -10],
  projects: [0, -8, -40],
  knowledge: [10, -16, -82],
  experience: [-9, -24, -124],
  contact: [0, -32, -168],
};
