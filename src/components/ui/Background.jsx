import UniverseCanvas from "../universe/UniverseCanvas";

function Background({ phase, scrollProgress }) {
  return (
    <div className="fixed inset-0 -z-10">
      <UniverseCanvas phase={phase} scrollProgress={scrollProgress} />
    </div>
  );
}

export default Background;
