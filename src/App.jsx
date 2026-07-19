import Background from "./components/ui/Background";
import Navbar from "./components/layout/Navbar";
import Hero from "./components/sections/Hero";
import Intro from "./overlay/Welcome/Intro";

function App() {
  return (
    <>
      <Background />
      <Navbar />
       <Intro />

      <main className="relative z-10">
        
        <Hero />
      </main>
    </>
  );
}

export default App;