import { SITE } from "../../constants/site";

function Hero() {

    return (

        <section className="flex min-h-screen items-center justify-center">

            <div className="text-center">

                <h1 className="text-7xl md:text-9xl font-bold">

                    {SITE.name}

                </h1>

                <p className="mt-10 text-xl text-gray-400">

                    {SITE.tagline}

                    <br />

                    {SITE.subtitle}

                </p>

            </div>

        </section>

    );

}

export default Hero;