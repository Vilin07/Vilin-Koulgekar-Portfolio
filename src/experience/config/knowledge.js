import { PORTFOLIO } from "./portfolio";

const REGION_POSITIONS = [
  [-2.8, 1.4, 0], [0, 1.7, -0.4], [2.8, 1.1, 0],
  [-2.2, -1.5, -0.5], [0.5, -1.9, 0], [3.1, -1.4, -0.3], [4.6, 0.2, -0.8],
];

function constellation(skill, index) {
  const stars = skill.technologies.map((name, starIndex) => {
    const angle = (starIndex / skill.technologies.length) * Math.PI * 2 + 0.35;
    const radius = 0.5 + (starIndex % 2) * 0.22;
    return { id: `${skill.id}-${starIndex}`, name, position: [Math.cos(angle) * radius, Math.sin(angle) * radius, (starIndex % 3) * 0.04] };
  });
  return { id: skill.id, label: skill.label, position: REGION_POSITIONS[index], stars, links: stars.map((_, starIndex) => [starIndex, (starIndex + 1) % stars.length]), labelDistance: 13 };
}

export const KNOWLEDGE_GALAXY = {
  position: [-2.5, 0.2, -17],
  revealStart: 0.25,
  revealEnd: 0.4,
  clusters: PORTFOLIO.skills.map(constellation),
};
