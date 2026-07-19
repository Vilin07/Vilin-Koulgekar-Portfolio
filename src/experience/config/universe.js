export const UNIVERSE_COLORS = {
  background: "#020617",
  star: "#dbeafe",
  starBlue: "#7ea6ff",
  deepBlue: "#1d4ed8",
  dust: "#cbd5ff",
};

export const UNIVERSE_QUALITY = {
  desktop: {
    dpr: [1, 1.75],
    farStars: 7000,
    stars: 9000,
    dust: 1600,
    galaxy: 32000,
    effects: true,
    motionScale: 1,
  },
  mobile: {
    dpr: [1, 1.25],
    farStars: 2800,
    stars: 3600,
    dust: 650,
    galaxy: 12000,
    effects: false,
    motionScale: 0.55,
  },
  reduced: {
    dpr: [1, 1.25],
    farStars: 2800,
    stars: 3600,
    dust: 650,
    galaxy: 12000,
    effects: false,
    motionScale: 0,
  },
};
