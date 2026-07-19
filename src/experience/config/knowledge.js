export const KNOWLEDGE_GALAXY = {
  position: [7, 0, -28],
  revealStart: 0.94,
  revealEnd: 1,
  clusters: [
    {
      id: "frontend",
      position: [0, 0, 0],
      stars: [
        { id: "javascript", name: "JavaScript", position: [-1.15, 0.3, 0] },
        { id: "react", name: "React", position: [-0.35, 0.92, 0.06] },
        { id: "three", name: "Three.js", position: [0.55, 0.42, -0.03] },
        { id: "tailwind", name: "Tailwind CSS", position: [1.04, -0.36, 0.04] },
      ],
      links: [[0, 1], [1, 2], [2, 3], [3, 0]],
      labelDistance: 14,
    },
  ],
};
