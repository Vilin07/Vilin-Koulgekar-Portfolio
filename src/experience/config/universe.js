export const UNIVERSE_COLORS = {
  background: "#01030a",
  star: "#dbeafe",
  starBlue: "#7ea6ff",
  deepBlue: "#1d4ed8",
  dust: "#cbd5ff",
};

export const OPENING_TIMELINE = {
  spaceRevealStart: 1,
  welcomeStart: 2,
  welcomeEnd: 4,
  journeyStart: 5,
  identityRevealStart: 10,
  identityExitAt: 13,
  identityArrivalAt: 11,
  chapterOneArrivalAt: 18,
};

export const UNIVERSE_QUALITY = {
  desktop: {
    dpr: [1, 1.75],
    farStars: 2800,
    stars: 3600,
    dust: 500,
    galaxy: 14000,
    effects: true,
    motionScale: 1,
  },
  mobile: {
    dpr: [1, 1.25],
    farStars: 1200,
    stars: 1500,
    dust: 180,
    galaxy: 5000,
    effects: false,
    motionScale: 0.55,
  },
  reduced: {
    dpr: [1, 1.25],
    farStars: 1200,
    stars: 1500,
    dust: 180,
    galaxy: 5000,
    effects: false,
    motionScale: 0,
  },
};
