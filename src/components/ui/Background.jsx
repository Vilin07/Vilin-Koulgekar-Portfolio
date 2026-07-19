import UniverseCanvas from "../universe/UniverseCanvas";

function Background() {
  return (
    <div className="fixed inset-0 -z-10">
      <UniverseCanvas />
    </div>
  );
}

export default Background;
