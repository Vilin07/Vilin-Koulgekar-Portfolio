import { createSeededRandom } from "../../utils/seededRandom";

// Legacy/inactive CSS star layer retained from the pre-UniverseCanvas visual layer.
const random = createSeededRandom(9182);
const stars = Array.from({ length: 180 }, () => ({
  size: random() * 3 + 1,
  left: `${random() * 100}%`,
  top: `${random() * 100}%`,
  opacity: random(),
}));

function Stars() {
  return (
    <>
      {stars.map((star, index) => {
        return (
          <span
            key={index}
            className="absolute rounded-full bg-white"
            style={{
              width: star.size,
              height: star.size,
              left: star.left,
              top: star.top,
              opacity: star.opacity,
            }}
          />
        );
      })}
    </>
  );
}

export default Stars;
