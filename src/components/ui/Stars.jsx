const stars = Array.from({ length: 180 });

function Stars() {
  return (
    <>
      {stars.map((_, index) => {
        const size = Math.random() * 3 + 1;

        return (
          <span
            key={index}
            className="absolute rounded-full bg-white"
            style={{
              width: size,
              height: size,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random(),
            }}
          />
        );
      })}
    </>
  );
}

export default Stars;