import Background from "./components/ui/Background";
import Navbar from "./components/layout/Navbar";
import Welcome from "./components/sections/Welcome";
import Hero from "./components/sections/Hero";

function App() {
  return (
    <>
      <Background />
      <Navbar />

      <main className="relative z-10">
        <Welcome />
        <Hero />
      </main>
    </>
  );
}

export default App;