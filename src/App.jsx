import Background from "./components/ui/Background";
import IntroScene from "./experience/scenes/IntroScene";
import useUniversePhase from "./hooks/useUniversePhase";
import useScrollProgress from "./hooks/useScrollProgress";

function App() {
  const phase = useUniversePhase();
  const scrollProgress = useScrollProgress();

  return (
    <>
      <Background phase={phase} scrollProgress={scrollProgress} />
      <IntroScene phase={phase} scrollProgress={scrollProgress} />
      <div aria-hidden="true" className="relative h-[500vh]" />
    </>
  );
}

export default App;
