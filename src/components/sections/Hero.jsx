import { SITE } from "../../constants/site";

function Hero() {

    return (

        <section className="min-h-[200vh] relative">

         <div className="sticky top-0 h-screen flex items-center justify-center">

  <div className="text-center max-w-4xl">

    <p className="uppercase tracking-[0.8em] text-blue-300 mb-6">
      Developer • Designer • Problem Solver
    </p>

    <h1
      className="text-7xl md:text-9xl text-white"
      style={{ fontFamily: "Cormorant Garamond" }}
    >
      {SITE.name}
    </h1>

    <p className="mt-8 text-xl text-blue-100 leading-9">
      {SITE.tagline}
      <br />
      {SITE.subtitle}
    </p>

  </div>

</div>

        </section>

    );

}

export default Hero;